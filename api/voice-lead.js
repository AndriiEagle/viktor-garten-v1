const DEFAULT_MAX_SECONDS = 300;
const DEFAULT_MAX_AUDIO_BYTES = 4 * 1024 * 1024;
const DEFAULT_MAX_BODY_BYTES = 6 * 1024 * 1024;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
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

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  const maxBodyBytes = envNumber("VOICE_LEAD_MAX_BODY_BYTES", DEFAULT_MAX_BODY_BYTES);
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    const part = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += part.length;
    if (size > maxBodyBytes) {
      const error = new Error("Request body is too large.");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(part);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function decodeAudioBase64(value) {
  const raw = String(value || "");
  const base64 = raw.includes(",") ? raw.split(",").pop() : raw;
  if (!base64 || !/^[a-z0-9+/=\s]+$/i.test(base64)) {
    const error = new Error("Audio payload is missing or invalid.");
    error.statusCode = 400;
    throw error;
  }
  return Buffer.from(base64.replace(/\s/g, ""), "base64");
}

function normalizeMimeType(mimeType) {
  const clean = String(mimeType || "audio/webm").split(";")[0].toLowerCase();
  const allowed = new Set(["audio/webm", "audio/mp4", "audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg"]);
  return allowed.has(clean) ? clean : "audio/webm";
}

function extensionForMime(mimeType) {
  if (mimeType.includes("mp4")) return "m4a";
  if (mimeType.includes("mpeg") || mimeType.includes("mp3")) return "mp3";
  if (mimeType.includes("wav")) return "wav";
  if (mimeType.includes("ogg")) return "ogg";
  return "webm";
}

function includesAny(text, words) {
  const lower = text.toLowerCase();
  return words.some((word) => lower.includes(word));
}

function firstMatch(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return (match[1] || match[0]).trim();
  }
  return "";
}

function extractLead(transcript) {
  const text = String(transcript || "").replace(/\s+/g, " ").trim();
  const cantonWords = [
    "Zürich", "Zug", "Luzern", "Aargau", "Schwyz", "Schaffhausen",
    "Appenzell", "Glarus", "Thurgau", "St. Gallen", "Bern", "Basel"
  ];
  const treeMap = [
    ["Kiefer / Pinus", ["kiefer", "pinus", "föhre", "foehre", "sosna", "сосна"]],
    ["Japanischer Ahorn / Acer", ["ahorn", "acer", "palmatum", "клен"]],
    ["Niwaki / Garten-Bonsai", ["niwaki", "garten-bonsai", "bonsai", "бонсаї", "бонсай"]],
    ["Taxus / Eibe", ["taxus", "eibe"]],
    ["Juniperus / Wacholder", ["juniperus", "wacholder"]],
    ["Unklar", []]
  ];
  const problemMap = [
    ["braune Nadeln / trockene Stellen", ["braun", "nadeln", "trocken", "dry", "сух", "коричнев"]],
    ["Form verloren / Schnittproblem", ["form", "schnitt", "geschnitten", "schneiden", "shape", "обріз", "форма"]],
    ["Krankheit / Pilz / Moos", ["krank", "pilz", "moos", "fungus", "moss", "хвор", "гриб", "мох"]],
    ["Wasser / Boden / Wurzeln", ["wasser", "boden", "wurzel", "akadama", "soil", "root", "вода", "ґрунт", "корін"]],
    ["Allgemeine Diagnose", []]
  ];

  const treeType = treeMap.find(([, keys]) => keys.length && includesAny(text, keys))?.[0] || "Unklar";
  const problem = problemMap.find(([, keys]) => keys.length && includesAny(text, keys))?.[0] || "Allgemeine Diagnose";
  const canton = cantonWords.find((word) => text.toLowerCase().includes(word.toLowerCase())) || "";
  const budget = firstMatch(text, [
    /(?:budget|preis|kosten|price|cost|ціна|бюджет)\D{0,18}((?:CHF|Fr\.?|SFr\.?)?\s?[0-9][0-9'’.,\s]*(?:\s?(?:CHF|Fr\.?|SFr\.?))?)/i,
    /((?:CHF|Fr\.?|SFr\.?)\s?[0-9][0-9'’.,\s]*|[0-9][0-9'’.,\s]*\s?(?:CHF|Fr\.?|SFr\.?))/i
  ]);
  const urgency = includesAny(text, ["sofort", "dringend", "urgent", "diese woche", "today", "tomorrow", "терміново", "сьогодні"])
    ? "Dringend"
    : includesAny(text, ["frühling", "sommer", "herbst", "winter", "nächste", "next", "наступ"])
      ? "Geplant / Saison"
      : "";
  const email = firstMatch(text, [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i]);
  const phone = firstMatch(text, [/(\+?\d[\d\s().-]{6,}\d)/]);

  return {
    treeType,
    problem,
    canton: canton || "Nicht genannt",
    budget: budget || "Nicht genannt",
    urgency: urgency || "Nicht genannt",
    contact: email || phone || "Nicht genannt",
    other: text.slice(0, 1200)
  };
}

function telegramMessage({ transcript, lead, durationSec, source }) {
  const lines = [
    "[VOICE LEAD] Viktor Baumarchitektur V2",
    "",
    `Quelle: ${source || "v2"}`,
    `Dauer: ${Math.round(Number(durationSec) || 0)}s`,
    `Baum: ${lead.treeType}`,
    `Problem: ${lead.problem}`,
    `Kanton: ${lead.canton}`,
    `Budget/Preis: ${lead.budget}`,
    `Dringlichkeit: ${lead.urgency}`,
    `Kontakt: ${lead.contact}`,
    "",
    "Transkript:",
    transcript
  ];
  const message = lines.join("\n").slice(0, 3900);
  return message;
}

async function transcribeAudio(audioBuffer, mimeType) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const error = new Error("OPENAI_API_KEY is not configured.");
    error.statusCode = 503;
    throw error;
  }

  const form = new FormData();
  const filename = `voice-lead.${extensionForMime(mimeType)}`;
  form.append("file", new Blob([audioBuffer], { type: mimeType }), filename);
  form.append("model", process.env.OPENAI_TRANSCRIPTION_MODEL || "whisper-1");
  form.append("response_format", "text");
  form.append("prompt", "Swiss German, German, English or Ukrainian voice lead for Niwaki, Bonsai, Acer palmatum, Kiefer, Gartenpflege, Baumdiagnose.");

  const response = await fetchWithRetry("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form
  }, 2);
  const text = await response.text();
  if (!response.ok) {
    const error = new Error(`Transcription failed: ${text.slice(0, 240)}`);
    error.statusCode = response.status >= 400 && response.status < 500 ? 502 : 503;
    throw error;
  }
  return text.trim();
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
    if (!process.env.OPENAI_API_KEY || !process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      return sendJson(res, 503, { ok: false, error: "server_not_configured" });
    }

    const body = await readJson(req);
    if (body.consent !== true) {
      return sendJson(res, 400, { ok: false, error: "consent_required" });
    }

    const durationSec = Number(body.durationSec || 0);
    const maxSeconds = envNumber("VOICE_LEAD_MAX_SECONDS", DEFAULT_MAX_SECONDS);
    if (!Number.isFinite(durationSec) || durationSec < 1 || durationSec > maxSeconds + 5) {
      return sendJson(res, 400, { ok: false, error: "invalid_duration" });
    }

    const mimeType = normalizeMimeType(body.mimeType);
    const audioBuffer = decodeAudioBase64(body.audioBase64);
    const maxAudioBytes = envNumber("VOICE_LEAD_MAX_AUDIO_BYTES", DEFAULT_MAX_AUDIO_BYTES);
    if (audioBuffer.length < 1000) {
      return sendJson(res, 400, { ok: false, error: "audio_too_short" });
    }
    if (audioBuffer.length > maxAudioBytes) {
      return sendJson(res, 413, { ok: false, error: "audio_too_large" });
    }

    const transcript = await transcribeAudio(audioBuffer, mimeType);
    if (!transcript) {
      return sendJson(res, 422, { ok: false, error: "empty_transcript" });
    }

    const lead = extractLead(transcript);
    await sendTelegram(telegramMessage({
      transcript,
      lead,
      durationSec,
      source: body.source || "v2-voice-lead"
    }));

    return sendJson(res, 200, { ok: true, transcript, lead, delivered: true });
  } catch (error) {
    const status = Number(error.statusCode) || 500;
    return sendJson(res, status, {
      ok: false,
      error: status >= 500 ? "voice_lead_failed" : "voice_lead_rejected",
      detail: String(error.message || error).slice(0, 240)
    });
  }
};

module.exports._private = {
  extractLead,
  normalizeMimeType,
  decodeAudioBase64,
  telegramMessage
};
