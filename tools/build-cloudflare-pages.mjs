import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const excludedDistFiles = new Set([
  "themes.html",
  "en/themes.html",
  "uk/themes.html"
]);

const directories = ["assets", "blog", "en", "uk", "fr", "it"];
const rootFiles = [
  "datenschutz.html",
  "galerie.html",
  "gartenbonsai-zuerich.html",
  "impressum.html",
  "index.html",
  "japanischer-ahorn-pflege-schweiz.html",
  "kiefer-kerzen-schneiden-schweiz.html",
  "kontakt.html",
  "kosten-japanische-baumpflege-zuerich.html",
  "leistungen.html",
  "llms.txt",
  "luzern-aargau.html",
  "niwaki-schweiz.html",
  "philosophie.html",
  "preise.html",
  "robots.txt",
  "site.webmanifest",
  "sitemap.xml",
  "zuerichsee.html",
  "zug.html"
];

const forbiddenOutputPaths = [
  "v2",
  "api",
  "tools",
  "handoff",
  "_transcribe",
  "output",
  "project_brief",
  "tasks"
];

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function copyDirectory(name) {
  const source = path.join(root, name);
  if (!(await exists(source))) return;
  await fs.cp(source, path.join(dist, name), {
    recursive: true,
    filter: (sourcePath) => {
      const base = path.basename(sourcePath).toLowerCase();
      const relative = path.relative(root, sourcePath).replaceAll(path.sep, "/");
      if (excludedDistFiles.has(relative)) return false;
      return base !== ".ds_store" && base !== "thumbs.db";
    }
  });
}

async function copyRootFile(name) {
  const source = path.join(root, name);
  if (await exists(source)) await fs.copyFile(source, path.join(dist, name));
}

async function assertAbsent(relativePath) {
  if (await exists(path.join(dist, relativePath))) {
    throw new Error(`Cloudflare Pages output must not include ${relativePath}`);
  }
}

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });

for (const directory of directories) await copyDirectory(directory);
for (const file of rootFiles) await copyRootFile(file);

await fs.writeFile(path.join(dist, "_headers"), `/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
`, "utf8");

await fs.writeFile(path.join(dist, "_redirects"), `https://www.v-garten.ch/* https://v-garten.ch/:splat 301!
`, "utf8");

for (const relativePath of forbiddenOutputPaths) await assertAbsent(relativePath);
await assertAbsent("api/voice-lead.js");
for (const relativePath of excludedDistFiles) await assertAbsent(relativePath);

const outputText = await fs.readdir(dist);
if (!outputText.includes("index.html") || !outputText.includes("assets")) {
  throw new Error("Cloudflare Pages output is missing core V1 files.");
}

console.log("Cloudflare Pages V1 output written to dist.");
