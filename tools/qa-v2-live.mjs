import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const OUT_DIR = path.join(ROOT, "handoff", "v2-final-qa");
const LIVE_URL = process.env.V2_QA_URL || "https://viktor-baumarchitektur.vercel.app/v2";
const EDGE_CANDIDATES = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function edgePath() {
  const found = EDGE_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) throw new Error("Microsoft Edge executable not found.");
  return found;
}

async function fetchJson(url, tries = 80) {
  let lastError;
  for (let i = 0; i < tries; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(150);
  }
  throw lastError || new Error(`Timed out fetching ${url}`);
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result || {});
    };
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  close() {
    this.ws.close();
  }
}

async function launchBrowser(name) {
  const cdpPort = 12000 + Math.floor(Math.random() * 900);
  const profile = path.join(os.tmpdir(), `viktor-v2-${name}-${Date.now()}`);
  const edge = spawn(edgePath(), [
    "--headless=new",
    "--disable-gpu",
    "--disable-extensions",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ], { stdio: "ignore" });

  const pages = await fetchJson(`http://127.0.0.1:${cdpPort}/json/list`);
  const page = pages.find((entry) => entry.type === "page" && entry.webSocketDebuggerUrl);
  if (!page) throw new Error("No debuggable Edge page found.");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  const cdp = new Cdp(ws);
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  return { edge, cdp };
}

async function evaluate(cdp, expression, awaitPromise = false) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Runtime.evaluate failed");
  return result.result?.value;
}

async function navigate(cdp, width, height, mobile) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });
  await cdp.send("Page.navigate", { url: LIVE_URL });
  for (let i = 0; i < 100; i += 1) {
    if (await evaluate(cdp, "document.readyState") === "complete") break;
    await sleep(100);
  }
  await evaluate(cdp, `Promise.allSettled(Array.from(document.images).filter((img) => {
    const rect = img.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.top < innerHeight && rect.bottom > 0;
  }).map((img) => img.decode ? img.decode() : Promise.resolve())).then(() => true)`, true);
  await sleep(1200);
}

async function screenshot(cdp, file) {
  const shot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
    fromSurface: true,
  });
  await writeFile(file, Buffer.from(shot.data, "base64"));
}

const auditExpression = `(() => {
  const text = document.body.innerText;
  const images = Array.from(document.images).map((img) => ({
    src: img.currentSrc || img.src,
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    visible: Boolean(img.offsetWidth || img.offsetHeight || img.getClientRects().length),
  }));
  const root = document.querySelector('[data-voice-lead]');
  const start = document.querySelector('[data-voice-start]');
  const consent = document.querySelector('[data-voice-consent]');
  return {
    title: document.title,
    path: location.pathname,
    overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
    brokenImages: images.filter((img) => img.visible && img.complete && img.naturalWidth === 0).map((img) => img.src),
    mojibake: /Ã¼|Ã¤|Ã¶|ÃŸ|â€”|â€“|Â·|â˜/.test(document.documentElement.innerHTML),
    hasVoice: Boolean(root),
    voiceState: root?.dataset.state || "",
    startDisabled: Boolean(start?.disabled),
    consentChecked: Boolean(consent?.checked),
    fallbackWhatsApp: Boolean(document.querySelector('a[href^="https://wa.me/"]')),
    fallbackPhone: Boolean(document.querySelector('a[href^="tel:"]')),
    sloganOk: text.includes('Schweizer Qualität mit japanischer Philosophie.'),
    voiceCopyOk: text.includes('Maximal 5 Minuten') && text.includes('Telegram-Zusammenfassung'),
    internalBadgeAbsent: !text.includes('CLAUDE') && !text.includes('V2 ·'),
  };
})()`;

const mockVoiceScript = `(() => {
  const fakeTrack = { stop() {} };
  const fakeStream = { getTracks() { return [fakeTrack]; } };
  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: { getUserMedia: async () => fakeStream },
  });
  class FakeMediaRecorder {
    static isTypeSupported() { return true; }
    constructor(stream, options = {}) {
      this.stream = stream;
      this.mimeType = options.mimeType || 'audio/webm';
      this.state = 'inactive';
      this.ondataavailable = null;
      this.onerror = null;
      this.onstop = null;
    }
    start() { this.state = 'recording'; }
    stop() {
      if (this.state !== 'recording') return;
      this.state = 'inactive';
      setTimeout(() => {
        this.ondataavailable && this.ondataavailable({
          data: new Blob([new Uint8Array(1600)], { type: this.mimeType || 'audio/webm' }),
        });
        this.onstop && this.onstop();
      }, 30);
    }
  }
  Object.defineProperty(window, 'MediaRecorder', { configurable: true, value: FakeMediaRecorder });
  const originalFetch = window.fetch.bind(window);
  window.fetch = (url, options) => {
    if (String(url).includes('/api/voice-lead')) {
      window.__voiceLeadPayload = JSON.parse(options?.body || '{}');
      return Promise.resolve(new Response(JSON.stringify({
        ok: true,
        transcript: 'QA transcript Kiefer Zürich 800 CHF +41 79 123 45 67',
        lead: {
          treeType: 'Kiefer / Pinus',
          problem: 'braune Nadeln / trockene Stellen',
          canton: 'Zürich',
          budget: '800 CHF',
          urgency: 'Dringend',
          contact: '+41 79 123 45 67',
          other: 'QA',
        },
        delivered: true,
      }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    }
    return originalFetch(url, options);
  };
})();`;

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let cdp;
  let edge;
  try {
    ({ cdp, edge } = await launchBrowser("visual"));
    await navigate(cdp, 1440, 1200, false);
    const desktopAudit = await evaluate(cdp, auditExpression);
    await screenshot(cdp, path.join(OUT_DIR, "v2-live-desktop.png"));
    await navigate(cdp, 390, 1200, true);
    const mobileAudit = await evaluate(cdp, auditExpression);
    await screenshot(cdp, path.join(OUT_DIR, "v2-live-mobile.png"));
    cdp.close();
    edge.kill();

    ({ cdp, edge } = await launchBrowser("mock"));
    await cdp.send("Page.addScriptToEvaluateOnNewDocument", { source: mockVoiceScript });
    await navigate(cdp, 390, 1200, true);
    const initial = await evaluate(cdp, auditExpression);
    await evaluate(cdp, `document.querySelector('[data-voice-consent]').checked = true;
      document.querySelector('[data-voice-consent]').dispatchEvent(new Event('change', { bubbles: true }));`);
    const afterConsent = await evaluate(cdp, auditExpression);
    await evaluate(cdp, `document.querySelector('[data-voice-start]').click();`);
    await sleep(100);
    const recording = await evaluate(cdp, `(() => ({
      state: document.querySelector('[data-voice-lead]').dataset.state,
      stopHidden: document.querySelector('[data-voice-stop]').hidden,
      cancelHidden: document.querySelector('[data-voice-cancel]').hidden,
      status: document.querySelector('[data-voice-status]').textContent,
    }))()`);
    await evaluate(cdp, `document.querySelector('[data-voice-cancel]').click();`);
    await sleep(100);
    const afterCancel = await evaluate(cdp, auditExpression);
    await evaluate(cdp, `document.querySelector('[data-voice-start]').click();`);
    await sleep(100);
    await evaluate(cdp, `document.querySelector('[data-voice-stop]').click();`);
    await sleep(700);
    const done = await evaluate(cdp, `(() => ({
      state: document.querySelector('[data-voice-lead]').dataset.state,
      resultHidden: document.querySelector('[data-voice-result]').hidden,
      status: document.querySelector('[data-voice-status]').textContent,
      tree: document.querySelector('[data-lead-tree]').textContent,
      transcript: document.querySelector('[data-voice-transcript]').textContent,
      payload: window.__voiceLeadPayload,
    }))()`);
    await evaluate(cdp, "document.querySelector('#voice-lead').scrollIntoView({ block: 'start' })");
    await sleep(1400);
    await screenshot(cdp, path.join(OUT_DIR, "v2-live-voice-mock-done.png"));

    console.log(JSON.stringify({
      liveUrl: LIVE_URL,
      desktopAudit,
      mobileAudit,
      initial,
      afterConsent,
      recording,
      afterCancel,
      done,
      screenshots: OUT_DIR,
    }, null, 2));
  } finally {
    if (cdp) cdp.close();
    if (edge) edge.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
