const MAX_BODY_BYTES = 64 * 1024;
const MAX_FIELD_LENGTH = 1200;

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex"
    }
  });
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

async function readBody(request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    const error = new Error("Request body is too large.");
    error.statusCode = 413;
    throw error;
  }

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      const error = new Error("Request body is too large.");
      error.statusCode = 413;
      throw error;
    }
    return Object.fromEntries(new URLSearchParams(raw));
  }

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    return Object.fromEntries([...form.entries()].map(([key, value]) => [key, typeof value === "string" ? value : value.name]));
  }

  const raw = await request.text();
  if (!raw) return {};
  if (raw.length > MAX_BODY_BYTES) {
    const error = new Error("Request body is too large.");
    error.statusCode = 413;
    throw error;
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

function normalizeLead(body, request) {
  const headers = request.headers;
  return {
    kind: sanitize(body.kind || "callback", 80),
    name: sanitize(body.name, 160),
    phone: sanitize(body.phone || body.telefon, 80),
    desiredTime: sanitize(body.desiredTime || body.zeitfenster || body.time, 160),
    sourceUrl: sanitize(body.sourceUrl || body.source || headers.get("referer") || "", 500),
    timestamp: new Date().toISOString(),
    userAgent: sanitize(headers.get("user-agent") || "", 500),
    canton: sanitize(body.kanton || body.canton, 120),
    treeType: sanitize(body.baumart || body.tree || body.treeType, 160),
    message: sanitize(body.nachricht || body.message, 1000),
    email: sanitize(body.email, 180),
    honeypot: sanitize(body.company || body.website || body.url, 160)
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
  return [
    "Neue Rueckruf-Anfrage - Viktor Baumarchitektur",
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
  ].filter(Boolean).join("\n").slice(0, 3900);
}

async function sendTelegram(message, env) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
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
  });

  const payload = await response.text();
  if (!response.ok) {
    const error = new Error(`Telegram delivery failed: ${payload.slice(0, 240)}`);
    error.statusCode = 502;
    throw error;
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Allow": "POST, OPTIONS",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex"
    }
  });
}

export async function onRequestGet() {
  return json({ ok: false, error: "method_not_allowed" }, 405);
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await readBody(request);
    const lead = normalizeLead(body, request);
    const validation = validateLead(lead);

    if (validation.spam) return json({ ok: true });
    if (!validation.ok) return json({ ok: false, error: validation.error }, 400);

    await sendTelegram(telegramMessage(lead), env);
    return json({ ok: true });
  } catch (error) {
    const status = Number(error.statusCode) || 500;
    console.error("contact_form_failed", {
      status,
      message: String(error.message || error).slice(0, 160)
    });
    return json({
      ok: false,
      error: status >= 500 ? "contact_failed" : "contact_rejected"
    }, status);
  }
}
