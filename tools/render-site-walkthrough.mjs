import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { appendFile, mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const HANDOFF = path.join(ROOT, "handoff");
const VIDEO_DIR = path.join(HANDOFF, "video");
const OUT_VIDEO = path.join(VIDEO_DIR, "viktor-site-walkthrough.mp4");
const OUT_SRT = path.join(VIDEO_DIR, "viktor-site-walkthrough.srt");
const OUT_STORYBOARD = path.join(VIDEO_DIR, "storyboard.md");
const OUT_CONTACT_SHEET = path.join(VIDEO_DIR, "contact-sheet.jpg");
const OUT_REPORT = path.join(VIDEO_DIR, "render-report.json");

const EDGE_CANDIDATES = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const FFMPEG_CANDIDATES = [
  process.env.FFMPEG_PATH,
  "C:\\Users\\Andrii\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe",
].filter(Boolean);

const FFPROBE_CANDIDATES = [
  process.env.FFPROBE_PATH,
  "C:\\Users\\Andrii\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffprobe.exe",
].filter(Boolean);

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".ico", "image/x-icon"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
]);

const SEGMENTS = [
  {
    id: "hero",
    page: "/index.html",
    duration: 25,
    from: { type: "top", offset: 0 },
    to: { type: "top", offset: 160 },
    side: "right",
    box: { x: 122, y: 120, w: 930, h: 820 },
    title: "1/8. Перший кадр: майстерність + Швейцарія",
    body: "Не просто садівник. Niwaki, японська форма і швейцарська точність одразу ставлять Віктора в позицію майстра.",
  },
  {
    id: "sanctuary",
    page: "/index.html",
    duration: 30,
    from: { type: "selector", value: ".sanctuary-section", offset: -145 },
    to: { type: "selector", value: ".sanctuary-section", offset: 145 },
    side: "left",
    box: { x: 1020, y: 310, w: 690, h: 450 },
    title: "2/8. Справжня покупка - це стан саду",
    body: "Клієнт купує не стрижку. Він купує ранкову каву, вечірню терасу, гостей і тихий вид з дому.",
  },
  {
    id: "diagnosis",
    page: "/index.html",
    duration: 35,
    from: { type: "heading", value: "Naturgesetze kann man", offset: -170 },
    to: { type: "heading", value: "Naturgesetze kann man", offset: 260 },
    side: "right",
    box: { x: 140, y: 220, w: 780, h: 520 },
    title: "3/8. Діагностика замість грубої сили",
    body: "Сайт пояснює головне: дерево страждає не тому, що власник поганий, а тому що його часто ріжуть проти природи.",
  },
  {
    id: "master",
    page: "/index.html",
    duration: 40,
    from: { type: "heading", value: "Warum ein Meister", offset: -170 },
    to: { type: "heading", value: "Drei Kernbereiche", offset: -150 },
    side: "left",
    box: { x: 965, y: 170, w: 770, h: 640 },
    title: "4/8. Від садівника до майстра живої архітектури",
    body: "Віктор бачить систему: світло, повітря, корені, сезон і довгий горизонт. Саме тут народжується довіра.",
  },
  {
    id: "vision",
    page: "/index.html",
    duration: 40,
    from: { type: "heading", value: "Ihre persönliche Baum-Vision", offset: -230 },
    to: { type: "heading", value: "Ihre persönliche Baum-Vision", offset: 180 },
    side: "right",
    box: { x: 112, y: 170, w: 860, h: 700 },
    title: "5/8. Baum-Vision як conversion hook",
    body: "Три фото дерева перетворюються на персональну оцінку. Це простий перший крок до дорогого, довгого замовлення.",
  },
  {
    id: "blog",
    page: "/blog/index.html",
    duration: 45,
    from: { type: "top", offset: 0 },
    to: { type: "top", offset: 720 },
    side: "right",
    box: { x: 160, y: 480, w: 1300, h: 510 },
    title: "6/8. Wissen показує експертність до першого дзвінка",
    body: "П'ять статей пояснюють інструмент, крону, свічки сосни, корені й кліматичний стрес простою мовою.",
  },
  {
    id: "proof-gaps",
    page: "/index.html",
    duration: 45,
    from: { type: "heading", value: "Vorher/Nachher", offset: -170 },
    to: { type: "heading", value: "Referenztext folgt", offset: -170 },
    side: "left",
    box: { x: 980, y: 190, w: 760, h: 640 },
    title: "7/8. Чесність сильніша за фейковий proof",
    body: "AI concept підписаний як concept. Реальні фото, Japan postcard і testimonials лишаються задачами для Віктора, а не вигадкою.",
  },
  {
    id: "closing",
    page: "/index.html",
    duration: 25,
    from: { type: "heading", value: "Bereit, Ihren Baum", offset: -260 },
    to: { type: "bottom", offset: 0 },
    side: "right",
    box: { x: 130, y: 255, w: 900, h: 520 },
    title: "8/8. Демо вже готове для розмови",
    body: "Сайт уже передає стан, смак і експертність. Після реальних фото, контактів і юридичних даних він стає launch-ready.",
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function argValue(name, fallback) {
  const prefix = `${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

const quick = process.argv.includes("--quick");
const width = Number(argValue("--width", quick ? "1280" : "1920"));
const height = Number(argValue("--height", quick ? "720" : "1080"));
const captureFps = Number(argValue("--capture-fps", quick ? "4" : "8"));
const outputFps = Number(argValue("--output-fps", "30"));
const durationScale = Number(argValue("--duration-scale", quick ? "0.08" : "1"));
const jpegQuality = Number(argValue("--jpeg-quality", "78"));
const keepFrames = process.argv.includes("--keep-frames");

function edgePath() {
  const found = EDGE_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) throw new Error("Microsoft Edge executable not found.");
  return found;
}

function commandPath(name, candidates) {
  const found = candidates.find((candidate) => existsSync(candidate));
  if (found) return found;
  const where = spawnSync("where.exe", [name], { encoding: "utf8" });
  if (where.status === 0) {
    const first = where.stdout.split(/\r?\n/).map((line) => line.trim()).find(Boolean);
    if (first) return first;
  }
  return name;
}

function startStaticServer(framesDir) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || "/", "http://127.0.0.1");
      if (url.pathname.startsWith("/__walkthrough_frames/")) {
        const frameName = path.basename(decodeURIComponent(url.pathname));
        const target = path.resolve(framesDir, frameName);
        if (!target.startsWith(path.resolve(framesDir))) {
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
        res.writeHead(200, { "Content-Type": "image/jpeg", "Cache-Control": "no-store" });
        res.end(await readFile(target));
        return;
      }
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
      res.writeHead(200, {
        "Content-Type": contentTypes.get(path.extname(target).toLowerCase()) || "application/octet-stream",
      });
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
    const timeout = window.setTimeout(() => resolve(false), 2200);
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
        window.setTimeout(done, 1400);
      });
    })).then(() => {
      window.clearTimeout(timeout);
      resolve(true);
    });
  })`);
}

function overlayInstallScript() {
  return `(() => {
    if (window.__walkthroughSet) return true;
    const style = document.createElement("style");
    style.id = "walkthrough-overlay-style";
    style.textContent = \`
      #walkthrough-overlay{position:fixed;inset:0;z-index:999999;pointer-events:none;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#f7f3e9}
      #walkthrough-highlight{position:fixed;border:3px solid rgba(210,164,74,.96);border-radius:18px;box-shadow:0 0 0 9999px rgba(9,18,12,.22),0 0 0 7px rgba(210,164,74,.14),0 18px 50px rgba(0,0,0,.24);transition:left .18s ease,top .18s ease,width .18s ease,height .18s ease,opacity .18s ease}
      #walkthrough-callout{position:fixed;top:96px;right:72px;width:min(560px,calc(100vw - 144px));background:rgba(22,48,33,.94);border:1px solid rgba(210,164,74,.42);border-radius:14px;padding:22px 24px;box-shadow:0 22px 60px rgba(0,0,0,.28);transition:opacity .16s ease,transform .16s ease}
      #walkthrough-callout[data-side="left"]{left:72px;right:auto}
      #walkthrough-callout[data-side="bottom"]{top:auto;left:50%;right:auto;bottom:52px;transform:translateX(-50%);width:min(760px,calc(100vw - 144px))}
      #walkthrough-kicker{display:flex;align-items:center;gap:10px;color:#d2a44a;font-size:15px;font-weight:850;text-transform:uppercase;letter-spacing:.02em}
      #walkthrough-kicker:before{content:"";display:block;width:34px;height:2px;background:#d2a44a}
      #walkthrough-title{margin:10px 0 8px;font-size:31px;line-height:1.05;font-weight:850;letter-spacing:0}
      #walkthrough-body{font-size:19px;line-height:1.45;color:rgba(247,243,233,.9);margin:0}
      #walkthrough-progress{position:fixed;left:72px;right:72px;bottom:24px;height:6px;border-radius:999px;background:rgba(247,243,233,.18);overflow:hidden;box-shadow:0 8px 22px rgba(0,0,0,.24)}
      #walkthrough-progress span{display:block;height:100%;width:0;background:linear-gradient(90deg,#d2a44a,#7ca66a);border-radius:999px}
      #walkthrough-watermark{position:fixed;right:72px;bottom:42px;color:rgba(247,243,233,.72);font-size:13px;font-weight:800;background:rgba(22,48,33,.74);border:1px solid rgba(247,243,233,.16);border-radius:999px;padding:7px 10px}
    \`;
    document.head.append(style);
    const overlay = document.createElement("div");
    overlay.id = "walkthrough-overlay";
    overlay.innerHTML = '<div id="walkthrough-highlight"></div><aside id="walkthrough-callout" data-side="right"><div id="walkthrough-kicker"></div><h2 id="walkthrough-title"></h2><p id="walkthrough-body"></p></aside><div id="walkthrough-progress"><span></span></div><div id="walkthrough-watermark">approval_required · Viktor demo</div>';
    document.body.append(overlay);
    window.__walkthroughSet = (data) => {
      const highlight = document.getElementById("walkthrough-highlight");
      const callout = document.getElementById("walkthrough-callout");
      const kicker = document.getElementById("walkthrough-kicker");
      const title = document.getElementById("walkthrough-title");
      const body = document.getElementById("walkthrough-body");
      const progress = document.querySelector("#walkthrough-progress span");
      const box = data.box || { x: 90, y: 90, w: 620, h: 420 };
      highlight.style.left = box.x + "px";
      highlight.style.top = box.y + "px";
      highlight.style.width = box.w + "px";
      highlight.style.height = box.h + "px";
      highlight.style.opacity = String(data.highlightOpacity ?? 1);
      callout.dataset.side = data.side || "right";
      kicker.textContent = data.kicker || "Viktor Baumarchitektur";
      title.textContent = data.title || "";
      body.textContent = data.body || "";
      progress.style.width = Math.max(0, Math.min(100, data.progress || 0)) + "%";
      return true;
    };
    localStorage.setItem("viktor-consent", "denied");
    const banner = document.querySelector("[data-consent-banner]");
    if (banner) banner.hidden = true;
    return true;
  })()`;
}

async function preparePage(cdp, url) {
  await cdp.send("Page.navigate", { url });
  await waitReady(cdp);
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await evaluate(cdp, `localStorage.setItem("viktor-consent", "denied"); document.querySelector("[data-consent-banner]")?.setAttribute("hidden", ""); true;`);
  await evaluate(cdp, overlayInstallScript());
  await waitVisibleImages(cdp);
}

function anchorExpression(anchor) {
  const anchorJson = JSON.stringify(anchor);
  return `(() => {
    const anchor = ${anchorJson};
    const clamp = (value) => Math.max(0, Math.min(value, document.documentElement.scrollHeight - window.innerHeight));
    const topOf = (el) => el ? el.getBoundingClientRect().top + window.scrollY : 0;
    if (anchor.type === "top") return clamp(anchor.offset || 0);
    if (anchor.type === "bottom") return clamp(document.documentElement.scrollHeight - window.innerHeight + (anchor.offset || 0));
    if (anchor.type === "selector") return clamp(topOf(document.querySelector(anchor.value)) + (anchor.offset || 0));
    if (anchor.type === "heading") {
      const headings = Array.from(document.querySelectorAll("h1,h2,h3"));
      const found = headings.find((node) => node.textContent.includes(anchor.value));
      return clamp(topOf(found) + (anchor.offset || 0));
    }
    return 0;
  })()`;
}

async function scrollTarget(cdp, anchor) {
  const value = await evaluate(cdp, anchorExpression(anchor));
  return Number(value || 0);
}

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function srtTime(seconds) {
  const ms = Math.round((seconds % 1) * 1000);
  const total = Math.floor(seconds);
  const hh = Math.floor(total / 3600);
  const mm = Math.floor((total % 3600) / 60);
  const ss = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

function frameName(index) {
  return `frame-${String(index).padStart(5, "0")}.jpg`;
}

function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"], ...options });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(`${command} exited ${code}\n${stderr || stdout}`));
    });
  });
}

async function stopProcess(child) {
  if (!child) return;
  if (child.exitCode !== null || child.signalCode) return;
  child.kill();
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    sleep(2500),
  ]);
  await sleep(350);
}

async function removeTempDir(tempRoot) {
  const resolvedTemp = path.resolve(tempRoot);
  const resolvedOsTemp = path.resolve(os.tmpdir());
  if (!resolvedTemp.startsWith(resolvedOsTemp)) return;
  for (let i = 0; i < 6; i += 1) {
    try {
      await rm(tempRoot, { recursive: true, force: true });
      return;
    } catch (error) {
      if (error?.code !== "EBUSY" && error?.code !== "ENOTEMPTY" && error?.code !== "EPERM") throw error;
      await sleep(650);
    }
  }
}

async function captureFrame(cdp, framesDir, frameIndex) {
  const shot = await cdp.send("Page.captureScreenshot", {
    format: "jpeg",
    quality: jpegQuality,
    captureBeyondViewport: false,
  });
  const file = path.join(framesDir, frameName(frameIndex));
  await writeFile(file, Buffer.from(shot.data, "base64"));
}

async function renderFrames(cdp, baseUrl, framesDir) {
  let currentPage = "";
  let frameIndex = 1;
  let elapsed = 0;
  const timeline = [];
  const totalDuration = SEGMENTS.reduce((sum, segment) => sum + segment.duration * durationScale, 0);

  for (const [segmentIndex, segment] of SEGMENTS.entries()) {
    const pageUrl = `${baseUrl}${segment.page}`;
    if (currentPage !== pageUrl) {
      await preparePage(cdp, pageUrl);
      currentPage = pageUrl;
    } else {
      await evaluate(cdp, overlayInstallScript());
    }

    const fromY = await scrollTarget(cdp, segment.from);
    const toY = await scrollTarget(cdp, segment.to);
    await evaluate(cdp, `window.scrollTo(0, ${Math.round(toY)}); true;`);
    await sleep(220);
    await waitVisibleImages(cdp);
    await evaluate(cdp, `window.scrollTo(0, ${Math.round(fromY)}); true;`);
    await sleep(160);
    await waitVisibleImages(cdp);

    const scaledDuration = Math.max(1.5, segment.duration * durationScale);
    const segmentFrames = Math.max(2, Math.round(scaledDuration * captureFps));
    timeline.push({ ...segment, start: elapsed, end: elapsed + scaledDuration });

    for (let i = 0; i < segmentFrames; i += 1) {
      const localProgress = segmentFrames <= 1 ? 1 : i / (segmentFrames - 1);
      const eased = easeInOut(localProgress);
      const y = Math.round(fromY + (toY - fromY) * eased);
      const globalProgress = ((elapsed + localProgress * scaledDuration) / totalDuration) * 100;
      const payload = {
        kicker: `Viktor walkthrough · ${segmentIndex + 1}/${SEGMENTS.length}`,
        title: segment.title,
        body: segment.body,
        side: segment.side,
        box: segment.box,
        progress: globalProgress,
      };
      await evaluate(cdp, `new Promise((resolve) => {
        window.scrollTo(0, ${y});
        window.__walkthroughSet(${JSON.stringify(payload)});
        window.requestAnimationFrame(() => resolve(true));
      })`);
      await captureFrame(cdp, framesDir, frameIndex);
      frameIndex += 1;
      if (frameIndex % Math.max(1, Math.round(captureFps * 10)) === 0) {
        console.log(`Captured ${frameIndex - 1} frames...`);
      }
    }
    elapsed += scaledDuration;
  }

  return { frameCount: frameIndex - 1, timeline, totalDuration };
}

function storyboardMarkdown(timeline) {
  const lines = [
    "# Viktor Baumarchitektur Site Walkthrough",
    "",
    "Status: `approval_required`",
    "",
    "Format: desktop/laptop walkthrough, on-screen Ukrainian subtitles/callouts, no voiceover.",
    "",
    "| Time | Segment | Page | Purpose |",
    "|---|---|---|---|",
  ];
  for (const segment of timeline) {
    lines.push(`| ${srtTime(segment.start).slice(3, 8)}-${srtTime(segment.end).slice(3, 8)} | ${segment.title} | \`${segment.page}\` | ${segment.body} |`);
  }
  lines.push(
    "",
    "Notes:",
    "- AI concept visuals stay visibly labelled on the site.",
    "- Real proof gaps are intentionally called out instead of hidden.",
    "- This video is a review asset, not a published advertisement."
  );
  return `${lines.join("\n")}\n`;
}

function srtText(timeline) {
  return `${timeline
    .map((segment, index) => `${index + 1}\n${srtTime(segment.start)} --> ${srtTime(segment.end)}\n${segment.title}\n${segment.body}\n`)
    .join("\n")}\n`;
}

async function encodeVideoWithFfmpeg(framesDir) {
  await runProcess(commandPath("ffmpeg", FFMPEG_CANDIDATES), [
    "-y",
    "-framerate",
    String(captureFps),
    "-i",
    path.join(framesDir, "frame-%05d.jpg"),
    "-vf",
    `fps=${outputFps},format=yuv420p`,
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "20",
    "-movflags",
    "+faststart",
    OUT_VIDEO,
  ]);
}

async function encodeVideoWithBrowser(cdp, baseUrl, frameCount) {
  console.log("FFmpeg unavailable; encoding MP4 with Edge MediaRecorder fallback...");
  const result = await evaluate(cdp, `new Promise(async (resolve, reject) => {
    try {
      const mimeCandidates = ["video/mp4;codecs=avc1.42E01E", "video/mp4", "video/webm;codecs=vp9", "video/webm"];
      const mimeType = mimeCandidates.find((candidate) => MediaRecorder.isTypeSupported(candidate));
      if (!mimeType) throw new Error("MediaRecorder has no supported video MIME type.");
      const canvas = document.createElement("canvas");
      canvas.width = ${width};
      canvas.height = ${height};
      document.body.innerHTML = "";
      document.body.style.margin = "0";
      document.body.style.background = "#111";
      document.body.append(canvas);
      const ctx = canvas.getContext("2d");
      const stream = canvas.captureStream(${outputFps});
      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 9000000 });
      const chunks = [];
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size) chunks.push(event.data);
      };
      const stopped = new Promise((done) => { recorder.onstop = done; });
      const wait = (ms) => new Promise((done) => setTimeout(done, ms));
      const frameDelay = 1000 / ${captureFps};
      recorder.start(1000);
      const startedAt = performance.now();
      for (let i = 1; i <= ${frameCount}; i += 1) {
        const name = "frame-" + String(i).padStart(5, "0") + ".jpg";
        const response = await fetch("/__walkthrough_frames/" + name, { cache: "no-store" });
        if (!response.ok) throw new Error("Missing frame " + name);
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);
        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();
        const targetTime = startedAt + i * frameDelay;
        await wait(Math.max(0, targetTime - performance.now()));
      }
      recorder.stop();
      await stopped;
      const blob = new Blob(chunks, { type: mimeType });
      window.__walkthroughVideoBytes = new Uint8Array(await blob.arrayBuffer());
      resolve({ mimeType, byteLength: window.__walkthroughVideoBytes.byteLength });
    } catch (error) {
      reject(error);
    }
  })`);
  const byteLength = Number(result?.byteLength || 0);
  if (!byteLength) throw new Error("Browser encoder produced an empty video.");
  await writeFile(OUT_VIDEO, Buffer.alloc(0));
  const chunkSize = 768 * 1024;
  for (let offset = 0; offset < byteLength; offset += chunkSize) {
    const end = Math.min(byteLength, offset + chunkSize);
    const base64 = await evaluate(cdp, `(() => {
      const bytes = window.__walkthroughVideoBytes.subarray(${offset}, ${end});
      let binary = "";
      const block = 0x8000;
      for (let i = 0; i < bytes.length; i += block) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + block));
      }
      return btoa(binary);
    })()`);
    await appendFile(OUT_VIDEO, Buffer.from(base64, "base64"));
    if (offset === 0 || end === byteLength || Math.floor(offset / chunkSize) % 20 === 0) {
      console.log(`Wrote browser video bytes ${end}/${byteLength}`);
    }
  }
  return result;
}

async function encodeVideo(framesDir, cdp, baseUrl, frameCount) {
  try {
    await encodeVideoWithFfmpeg(framesDir);
    return { encoder: "ffmpeg" };
  } catch (error) {
    console.warn(`FFmpeg encode unavailable: ${error.message.split("\n")[0]}`);
    await cdp.send("Page.navigate", { url: `${baseUrl}/index.html` });
    await waitReady(cdp);
    const browserResult = await encodeVideoWithBrowser(cdp, baseUrl, frameCount);
    return { encoder: "edge-mediarecorder", ...browserResult };
  }
}

async function makeContactSheetWithFfmpeg() {
  await runProcess(commandPath("ffmpeg", FFMPEG_CANDIDATES), [
    "-y",
    "-i",
    OUT_VIDEO,
    "-vf",
    "fps=1/25,scale=480:-1,tile=4x3:padding=12:margin=12:color=0xf6f3ea",
    "-frames:v",
    "1",
    OUT_CONTACT_SHEET,
  ]);
}

async function makeContactSheetWithBrowser(cdp, frameCount) {
  const dataUrl = await evaluate(cdp, `new Promise(async (resolve, reject) => {
    try {
      const cols = 4;
      const rows = 3;
      const thumbW = 420;
      const thumbH = Math.round(thumbW * ${height} / ${width});
      const pad = 18;
      const canvas = document.createElement("canvas");
      canvas.width = cols * thumbW + (cols + 1) * pad;
      canvas.height = rows * thumbH + (rows + 1) * pad;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#f6f3ea";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const picks = Array.from({ length: cols * rows }, (_, index) => Math.max(1, Math.min(${frameCount}, Math.round(1 + index * (${frameCount} - 1) / (cols * rows - 1)))));
      for (let index = 0; index < picks.length; index += 1) {
        const frame = picks[index];
        const name = "frame-" + String(frame).padStart(5, "0") + ".jpg";
        const response = await fetch("/__walkthrough_frames/" + name, { cache: "no-store" });
        if (!response.ok) throw new Error("Missing frame " + name);
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);
        const x = pad + (index % cols) * (thumbW + pad);
        const y = pad + Math.floor(index / cols) * (thumbH + pad);
        ctx.drawImage(bitmap, x, y, thumbW, thumbH);
        bitmap.close();
      }
      resolve(canvas.toDataURL("image/jpeg", 0.88));
    } catch (error) {
      reject(error);
    }
  })`);
  const base64 = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
  await writeFile(OUT_CONTACT_SHEET, Buffer.from(base64, "base64"));
}

async function makeContactSheet(cdp, frameCount) {
  try {
    await makeContactSheetWithFfmpeg();
    return "ffmpeg";
  } catch (error) {
    console.warn(`FFmpeg contact sheet unavailable: ${error.message.split("\n")[0]}`);
    await makeContactSheetWithBrowser(cdp, frameCount);
    return "edge-canvas";
  }
}

async function probeVideoWithFfprobe() {
  const { stdout } = await runProcess(commandPath("ffprobe", FFPROBE_CANDIDATES), [
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=width,height,r_frame_rate,duration,nb_frames",
    "-of",
    "json",
    OUT_VIDEO,
  ]);
  return JSON.parse(stdout);
}

async function probeVideo(cdp, baseUrl) {
  try {
    return await probeVideoWithFfprobe();
  } catch (error) {
    console.warn(`FFprobe unavailable: ${error.message.split("\n")[0]}`);
    return evaluate(cdp, `new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => resolve({
        fallbackProbe: "browser-video-metadata",
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration,
      });
      video.onerror = () => reject(new Error("Could not load rendered video metadata"));
      video.src = ${JSON.stringify(`${baseUrl}/handoff/video/viktor-site-walkthrough.mp4?cache=`)} + Date.now();
    })`);
  }
}

async function main() {
  await mkdir(VIDEO_DIR, { recursive: true });
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "viktor-walkthrough-"));
  const framesDir = path.join(tempRoot, "frames");
  await mkdir(framesDir, { recursive: true });

  let server;
  let edge;
  let cdp;

  try {
    server = await startStaticServer(framesDir);
    const port = server.address().port;
    const cdpPort = 10240 + Math.floor(Math.random() * 1200);
    const profile = path.join(tempRoot, "edge-profile");
    edge = spawn(edgePath(), [
      "--headless=new",
      "--disable-gpu",
      `--remote-debugging-port=${cdpPort}`,
      `--user-data-dir=${profile}`,
      `http://127.0.0.1:${port}/index.html`,
    ], { stdio: "ignore" });
    cdp = await openCdp(cdpPort);

    console.log(`Rendering ${width}x${height}, capture ${captureFps}fps, output ${outputFps}fps`);
    const { frameCount, timeline, totalDuration } = await renderFrames(cdp, `http://127.0.0.1:${port}`, framesDir);

    await writeFile(OUT_STORYBOARD, storyboardMarkdown(timeline), "utf8");
    await writeFile(OUT_SRT, srtText(timeline), "utf8");
    const encoder = await encodeVideo(framesDir, cdp, `http://127.0.0.1:${port}`, frameCount);
    const contactSheetEncoder = await makeContactSheet(cdp, frameCount);
    const probe = await probeVideo(cdp, `http://127.0.0.1:${port}`);
    const report = {
      status: "approval_required",
      generatedAt: new Date().toISOString(),
      mode: quick ? "quick" : "full",
      width,
      height,
      captureFps,
      outputFps,
      durationScale,
      frameCount,
      expectedDurationSeconds: totalDuration,
      encoder,
      contactSheetEncoder,
      outputs: {
        video: path.relative(ROOT, OUT_VIDEO).replaceAll("\\", "/"),
        srt: path.relative(ROOT, OUT_SRT).replaceAll("\\", "/"),
        storyboard: path.relative(ROOT, OUT_STORYBOARD).replaceAll("\\", "/"),
        contactSheet: path.relative(ROOT, OUT_CONTACT_SHEET).replaceAll("\\", "/"),
      },
      ffprobe: probe,
    };
    await writeFile(OUT_REPORT, JSON.stringify(report, null, 2), "utf8");
    console.log(JSON.stringify(report, null, 2));
  } finally {
    cdp?.close();
    await stopProcess(edge);
    if (server) await new Promise((resolve) => server.close(resolve));
    if (!keepFrames) {
      await removeTempDir(tempRoot);
    } else {
      console.log(`Frames kept at ${framesDir}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
