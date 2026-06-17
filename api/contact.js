const MAX_BODY_BYTES = 64 * 1024;
const MAX_FIELD_LENGTH = 1200;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options, attempts = 2) {
  let lastResponse = null;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    lastResponse = await fetch(url, options);
    if (![429, 500, 502, 503, 504].includes(lastResponse.status)) return lastResponse;
    if (attempt < attempts - 1) await wait(700 * (attempt + 1));
  }
  return lastResponse;
}

async function readRawBody(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    const part = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += part.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error("Request body is too large.");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(part);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  const raw = await readRawBody(req);
  if (!raw) return {};

  const contentType = String(req.headers["content-type"] || "").toLowerCase();
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  return JSON.parse(raw);
}

function sanitize(value, maxLength = MAX_FIELD_LENGTH) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function normalizeLead(body, req) {
  const name = sanitize(body.name, 160);
  const phone = sanitize(body.phone || body.telefon, 80);
  const desiredTime = sanitize(body.desiredTime || body.zeitfenster || body.time, 160);
  const sourceUrl = sanitize(body.sourceUrl || body.source || req.headers.referer || "", 500);
  const kind = sanitize(body.kind || "callback", 80);
  const canton = sanitize(body.kanton || body.canton, 120);
  const treeType = sanitize(body.baumart || body.tree || body.treeType, 160);
  const message = sanitize(body.nachricht || body.message, 1000);
  const email = sanitize(body.email, 180);
  const honeypot = sanitize(body.company || body.website || body.url, 160);
  const timestamp = new Date().toISOString();
  const userAgent = sanitize(req.headers["user-agent"] || "", 500);

  return {
    kind,
    name,
    phone,
    desiredTime,
    sourceUrl,
    timestamp,
    userAgent,
    canton,
    treeType,
    message,
    email,
    honeypot
  };
}

function validateLead(lead) {
  if (lead.honeypot) return { ok: true, spam: true };
  if (!lead.phone || lead.phone.replace(/[^\d+]/g, "").length < 5) {
    return { ok: false, error: "phone_required" };
  }
  return { ok: true, spam: false };
}

function telegramMessage(lead) {
  const lines = [
    "🌲 Neue Rückruf-Anfrage — Viktor Baumarchitektur",
    "",
    `Art: ${lead.kind || "callback"}`,
    `Name: ${lead.name || "Nicht genannt"}`,
    `Telefon: ${lead.phone}`,
    `Wunsch-Zeitfenster: ${lead.desiredTime || "Nicht genannt"}`,
    lead.email ? `E-Mail: ${lead.email}` : "",
    lead.canton ? `Kanton: ${lead.canton}` : "",
    lead.treeType ? `Baumart: ${lead.treeType}` : "",
    lead.message ? `Nachricht: ${lead.message}` : "",
    `Seite: ${lead.sourceUrl || "Nicht genannt"}`,
    `Zeitpunkt: ${lead.timestamp}`
  ].filter(Boolean);

  return lines.join("\n").slice(0, 3900);
}

async function sendTelegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    const error = new Error("Telegram delivery is not configured.");
    error.statusCode = 503;
    throw error;
  }

  const response = await fetchWithRetry(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      disable_web_page_preview: true
    })
  }, 2);

  const payload = await response.text();
  if (!response.ok) {
    const error = new Error(`Telegram delivery failed: ${payload.slice(0, 240)}`);
    error.statusCode = 502;
    throw error;
  }
  return true;
}

module.exports = async function handler(req, res) {
  res.setHeader("X-Robots-Tag", "noindex");

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 204, {});
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 405, { ok: false, error: "method_not_allowed" });
  }

  try {
    const body = await readBody(req);
    const lead = normalizeLead(body, req);
    const validation = validateLead(lead);

    if (validation.spam) {
      return sendJson(res, 200, { ok: true });
    }
    if (!validation.ok) {
      return sendJson(res, 400, { ok: false, error: validation.error });
    }
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      console.error("contact_form_delivery_not_configured");
      return sendJson(res, 503, { ok: false, error: "server_not_configured" });
    }

    await sendTelegram(telegramMessage(lead));
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    const status = Number(error.statusCode) || 500;
    console.error("contact_form_failed", {
      status,
      message: String(error.message || error).slice(0, 160)
    });
    return sendJson(res, status, {
      ok: false,
      error: status >= 500 ? "contact_failed" : "contact_rejected"
    });
  }
};

module.exports._private = {
  sanitize,
  normalizeLead,
  validateLead,
  telegramMessage
};
