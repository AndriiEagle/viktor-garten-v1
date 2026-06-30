import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile, stat, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const HANDOFF = path.join(ROOT, "handoff");
const LIVE_DIR = path.join(HANDOFF, "live-qa");
const LIVE_SCREENSHOT_DIR = path.join(LIVE_DIR, "screenshots");
const REPORT = path.join(HANDOFF, "LIVE_QA.md");
const RESULT_JSON = path.join(LIVE_DIR, "site-interaction-results.json");
const EXPECTED_BRAND = "Viktor Garten";

const EDGE_CANDIDATES = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const PAGES = [
  ["home", "/index.html"],
  ["leistungen", "/leistungen.html"],
  ["philosophie", "/philosophie.html"],
  ["galerie", "/galerie.html"],
  ["preise", "/preise.html"],
  ["blog", "/blog/index.html"],
  ["blog-topiary", "/blog/topiarschere.html"],
  ["blog-krone", "/blog/energie-krone.html"],
  ["blog-kerzen", "/blog/kiefer-kerzen.html"],
  ["blog-klima", "/blog/klimastress.html"],
  ["kontakt", "/kontakt.html"],
  ["themes", "/themes.html"],
  ["en-home", "/en/index.html"],
  ["en-blog", "/en/blog/index.html"],
  ["en-blog-krone", "/en/blog/energie-krone.html"],
  ["en-kontakt", "/en/kontakt.html"],
];

const VISUAL_SCREENSHOT_PAGES = new Set(["home", "leistungen", "philosophie", "galerie", "blog", "blog-topiary", "blog-krone", "blog-klima"]);

const VIEWPORTS = [
  ["desktop", 1440, 1200, false],
  ["mobile-360", 360, 1200, true],
  ["mobile-375", 375, 1200, true],
  ["mobile-390", 390, 1200, true],
  ["mobile-414", 414, 1200, true],
];

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".ico", "image/x-icon"],
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function edgePath() {
  const found = EDGE_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) throw new Error("Microsoft Edge executable not found.");
  return found;
}

function startStaticServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || "/", "http://127.0.0.1");
      const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
      const target = path.resolve(ROOT, "." + pathname.replaceAll("/", path.sep));
      if (!target.startsWith(ROOT)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      const info = await stat(target);
      if (!info.isFile()) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": contentTypes.get(path.extname(target).toLowerCase()) || "application/octet-stream" });
      res.end(await readFile(target));
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function fetchJson(url, tries = 60) {
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

async function openCdp(port) {
  const pages = await fetchJson(`http://127.0.0.1:${port}/json/list`);
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
  return cdp;
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "Runtime.evaluate failed");
  }
  return result.result?.value;
}

async function waitReady(cdp) {
  for (let i = 0; i < 80; i += 1) {
    const state = await evaluate(cdp, "document.readyState");
    if (state === "complete") break;
    await sleep(100);
  }
  await sleep(250);
}

async function waitVisibleImages(cdp) {
  await evaluate(cdp, `new Promise((resolve) => {
    const timeout = window.setTimeout(() => resolve(false), 6000);
    const visibleImages = Array.from(document.images).filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.top <= window.innerHeight && rect.right >= 0 && rect.left <= window.innerWidth;
    });
    Promise.allSettled(visibleImages.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      if (typeof img.decode === "function") return img.decode().catch(() => undefined);
      return new Promise((done) => {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
        window.setTimeout(done, 5000);
      });
    })).then(() => {
      window.clearTimeout(timeout);
      resolve(true);
    });
  })`);
}

async function navigate(cdp, url, width, height, mobile) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });
  await cdp.send("Page.navigate", { url });
  await waitReady(cdp);
  await waitVisibleImages(cdp);
}

async function screenshot(cdp, outFile, settleMs = 1000) {
  await evaluate(cdp, `new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  })`);
  await sleep(settleMs);
  const shot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await writeFile(outFile, Buffer.from(shot.data, "base64"));
}

const pageAuditExpression = `(() => {
  const text = document.body?.innerText || "";
  const doc = document.documentElement;
  const scrollWidth = Math.max(doc.scrollWidth, document.body?.scrollWidth || 0);
  const clientWidth = doc.clientWidth;
  const imgs = Array.from(document.images).map((img) => ({
    src: img.getAttribute("src") || "",
    alt: img.getAttribute("alt") || "",
    loading: img.getAttribute("loading"),
    decoding: img.getAttribute("decoding"),
    width: img.getAttribute("width"),
    height: img.getAttribute("height"),
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    visible: Boolean(img.offsetWidth || img.offsetHeight || img.getClientRects().length),
  }));
  const brokenImages = imgs.filter((img) => img.visible && img.complete && img.naturalWidth === 0).map((img) => img.src);
  const imageAttrIssues = imgs
    .filter((img) => img.visible && !img.src.startsWith("data:"))
    .filter((img) => !img.width || !img.height || !["lazy", "eager"].includes(img.loading) || img.decoding !== "async")
    .map((img) => ({ src: img.src, loading: img.loading, decoding: img.decoding, width: img.width, height: img.height }));
  const forms = Array.from(document.forms).map((form) => ({
    action: form.action,
    method: form.method,
    enctype: form.enctype,
    fileInputs: form.querySelectorAll('input[type="file"]').length,
    note: form.querySelector(".form-note")?.innerText || "",
  }));
  return {
    title: document.title,
    path: location.pathname,
    clientWidth,
    scrollWidth,
    overflowX: scrollWidth > clientWidth + 2,
    brandHeader: document.querySelector(".brand-name")?.innerText?.trim() || "",
    brandFooter: document.querySelector(".footer-brand")?.innerText?.trim() || "",
    logoAlt: document.querySelector(".brand-logo")?.getAttribute("alt") || "",
    placeholderHit: /БРЕНД|PLATZHALTER|PLACEHOLDER/.test(text),
    brokenImages,
    imageAttrIssues,
    forms,
    inactiveNoteVisible: new RegExp([
      "inactive until",
      "Formular ist " + "inaktiv",
      "Dieses Formular ist " + "inaktiv",
      "Form" + "spree"
    ].join("|"), "i").test(text),
  };
})()`;

const navExpression = `(() => {
  const btn = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!btn || !nav) return { ok: false, reason: "nav toggle or nav not found" };
  const before = btn.getAttribute("aria-expanded");
  btn.click();
  const after = btn.getAttribute("aria-expanded");
  const styles = getComputedStyle(nav);
  const rect = nav.getBoundingClientRect();
  return {
    ok: before === "false" && after === "true" && nav.classList.contains("is-open") && document.body.classList.contains("menu-open") && rect.height > 0 && styles.visibility !== "hidden",
    before,
    after,
    navOpen: nav.classList.contains("is-open"),
    bodyOpen: document.body.classList.contains("menu-open"),
    navHeight: rect.height,
    display: styles.display,
    visibility: styles.visibility,
  };
})()`;

const formSubmitExpression = `(async () => {
  const forms = Array.from(document.querySelectorAll('form[data-contact-form]'));
  const requests = [];
  window.fetch = async (url, options = {}) => {
    requests.push({ url: String(url), method: options.method || "GET", body: String(options.body || "") });
    return { ok: true, json: async () => ({ ok: true }) };
  };
  const results = [];
  for (const form of forms) {
    for (const field of Array.from(form.querySelectorAll("input, textarea"))) {
      if (field.type === "file") continue;
      if (field.name === "email") field.value = "qa@example.com";
      else if (field.name === "phone") field.value = "+41 79 000 00 00";
      else if (field.name === "company") field.value = "";
      else if (field.required || field.tagName === "TEXTAREA") field.value = "QA Test";
    }
    const event = new Event("submit", { bubbles: true, cancelable: true });
    const allowed = form.dispatchEvent(event);
    await new Promise((resolve) => window.setTimeout(resolve, 80));
    const toast = document.querySelector("[data-toast]");
    results.push({
      event: form.dataset.event,
      kind: form.dataset.contactKind,
      action: form.action,
      method: form.method,
      contactForm: form.hasAttribute("data-contact-form"),
      prevented: !allowed,
      toastText: toast?.textContent || "",
      toastVisible: toast ? !toast.hidden : false,
      request: requests[requests.length - 1] || null,
    });
  }
  return results;
})()`;

function status(ok) {
  return ok ? "VERIFIED" : "NEEDS_REVIEW";
}

function mdTable(rows) {
  return rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
}

async function main() {
  await mkdir(LIVE_DIR, { recursive: true });
  await mkdir(LIVE_SCREENSHOT_DIR, { recursive: true });
  const server = await startStaticServer();
  const serverPort = server.address().port;
  const cdpPort = 9400 + Math.floor(Math.random() * 500);
  const profile = path.join(os.tmpdir(), `viktor-bonsai-cdp-${Date.now()}`);
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

  let cdp;
  const pageResults = [];
  const formResults = [];
  const visualScreenshots = [];
  let navResult = null;

  try {
    await fetchJson(`http://127.0.0.1:${cdpPort}/json/list`);
    cdp = await openCdp(cdpPort);
    const base = `http://127.0.0.1:${serverPort}`;

    for (const [pageName, pagePath] of PAGES) {
      for (const [viewportName, width, height, mobile] of VIEWPORTS) {
        await navigate(cdp, `${base}${pagePath}`, width, height, mobile);
        const audit = await evaluate(cdp, pageAuditExpression);
        pageResults.push({ pageName, viewportName, width, height, ...audit });
        if (VISUAL_SCREENSHOT_PAGES.has(pageName)) {
          const outFile = path.join(LIVE_SCREENSHOT_DIR, `${pageName}-${viewportName}.png`);
          await screenshot(cdp, outFile, pageName === "galerie" ? 6000 : 1000);
          visualScreenshots.push(path.relative(ROOT, outFile).replaceAll("\\", "/"));
        }
      }
    }

    await navigate(cdp, `${base}/index.html`, 390, 1200, true);
    navResult = await evaluate(cdp, navExpression);
    await sleep(150);
    await screenshot(cdp, path.join(LIVE_DIR, "mobile-nav-open-home.png"));

    for (const contactPath of ["/kontakt.html", "/en/kontakt.html"]) {
      await navigate(cdp, `${base}${contactPath}`, 390, 1200, true);
      const submitResults = await evaluate(cdp, formSubmitExpression);
      formResults.push({ path: contactPath, results: submitResults });
    }
  } finally {
    if (cdp) cdp.close();
    edge.kill();
    await new Promise((resolve) => server.close(resolve));
  }

  const pageIssues = pageResults.flatMap((result) => {
    const issues = [];
    if (result.overflowX) issues.push("horizontal overflow");
    if (result.brandHeader !== EXPECTED_BRAND) issues.push(`header brand=${result.brandHeader}`);
    if (result.brandFooter !== EXPECTED_BRAND) issues.push(`footer brand=${result.brandFooter}`);
    if (result.logoAlt !== EXPECTED_BRAND) issues.push(`logo alt=${result.logoAlt}`);
    if (result.placeholderHit) issues.push("visible placeholder text");
    if (result.brokenImages.length) issues.push(`broken images: ${result.brokenImages.join(", ")}`);
    if (result.imageAttrIssues.length) issues.push(`image attr issues: ${result.imageAttrIssues.length}`);
    return issues.map((issue) => `${result.pageName}/${result.viewportName}: ${issue}`);
  });

  const formIssues = formResults.flatMap((entry) => entry.results.flatMap((form) => {
    const issues = [];
    if (!form.action.endsWith("/api/contact")) issues.push(`${entry.path}/${form.event}: action ${form.action}`);
    if (form.method !== "post") issues.push(`${entry.path}/${form.event}: method ${form.method}`);
    if (!form.contactForm) issues.push(`${entry.path}/${form.event}: missing data-contact-form`);
    if (!form.prevented) issues.push(`${entry.path}/${form.event}: submit was not handled by JS`);
    if (!form.request || !form.request.url.endsWith("/api/contact") || form.request.method !== "POST") issues.push(`${entry.path}/${form.event}: fetch request missing`);
    if (!form.toastVisible) issues.push(`${entry.path}/${form.event}: success toast missing`);
    return issues;
  }));

  const navIssues = navResult?.ok ? [] : [`mobile nav failed: ${JSON.stringify(navResult)}`];
  const allIssues = [...pageIssues, ...formIssues, ...navIssues];

  const md = [
    "# Viktor Garten Live Interaction QA",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    mdTable([
      ["Area", "Status", "Evidence"],
      ["---", "---", "---"],
      ["Static server", "VERIFIED", `Node static server on localhost during QA run`],
      ["Desktop/mobile pages", status(pageIssues.length === 0), `${pageResults.length} page/viewport checks`],
      ["Mobile nav click", status(navIssues.length === 0), "`handoff/live-qa/mobile-nav-open-home.png`"],
      ["Contact form submit behavior", status(formIssues.length === 0), "DE/EN contact forms post to /api/contact with mocked fetch and show success toast"],
      ["No install", "VERIFIED", "CDP used directly; no npx package download"],
    ]),
    "",
    "## Page Checks",
    "",
    mdTable([
      ["Page", "Viewport", "Overflow X", "Broken Images", "Image Attr Issues", "Brand"],
      ["---", "---", "---:", "---:", "---:", "---"],
      ...pageResults.map((result) => [
        result.pageName,
        `${result.viewportName} ${result.width}x${result.height}`,
        String(result.overflowX),
        String(result.brokenImages.length),
        String(result.imageAttrIssues.length),
        `${result.brandHeader}/${result.brandFooter}/${result.logoAlt}`,
      ]),
    ]),
    "",
    "## Forms",
    "",
    mdTable([
      ["Path", "Event", "Method", "Kind", "JS Submit Handled", "Toast"],
      ["---", "---", "---", "---", "---:", "---"],
      ...formResults.flatMap((entry) => entry.results.map((form) => [
        entry.path,
        form.event,
        form.method,
        form.kind,
        String(form.prevented),
        form.toastVisible ? "visible" : "missing",
      ])),
    ]),
    "",
    "## Issues",
    "",
    ...(allIssues.length ? allIssues.map((issue) => `- NEEDS_REVIEW: ${issue}`) : ["- VERIFIED: no live interaction issues found in this pass."]),
    "",
    "## Artifacts",
    "",
    "- `handoff/live-qa/mobile-nav-open-home.png`",
    "- `handoff/live-qa/site-interaction-results.json`",
    ...visualScreenshots.map((file) => `- \`${file}\``),
    "",
  ];

  await writeFile(RESULT_JSON, JSON.stringify({ pageResults, navResult, formResults, visualScreenshots, issues: allIssues }, null, 2), "utf8");
  await writeFile(REPORT, md.join("\n"), "utf8");

  console.log(JSON.stringify({
    report: REPORT,
    resultJson: RESULT_JSON,
    checked: pageResults.length,
    issues: allIssues.length,
  }, null, 2));

  if (allIssues.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
