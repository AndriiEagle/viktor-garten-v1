import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const DEFAULT_VERDICT_FILE = path.join(ROOT, "tasks", "gallery-repair", "visual-role-verdicts.json");
const VERDICT_FILE = process.env.GALLERY_ROLE_VERDICT_FILE
  ? path.resolve(process.env.GALLERY_ROLE_VERDICT_FILE)
  : DEFAULT_VERDICT_FILE;
const CATALOG_FILE = path.join(ROOT, "tools", "photo-catalog.json");

const PAGES = [
  { file: "galerie.html", beforePrefix: "Vorher:", afterPrefix: "Nachher:" },
  { file: path.join("en", "galerie.html"), beforePrefix: "Before:", afterPrefix: "After:" },
  { file: path.join("uk", "galerie.html") }
];

const REQUIRED_IMG_ATTRS = ["src", "alt", "width", "height", "loading", "decoding"];
const ACCEPTED_STATUSES = new Set(["VERIFIED_VISUAL", "VERIFIED_VISUAL_WITH_LIMITS"]);

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readUtf8(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  if (!existsSync(fullPath)) {
    fail(`Missing file: ${relativePath}`);
    return "";
  }
  return readFileSync(fullPath, "utf8");
}

function readJson(fullPath) {
  return JSON.parse(readFileSync(fullPath, "utf8").replace(/^\uFEFF/, ""));
}

function basenameFromSrc(src) {
  return path.basename(src.split("?")[0].replaceAll("\\", "/"));
}

function getAttr(attrs, name) {
  const match = attrs.match(new RegExp(`${name}="([^"]*)"`));
  return match ? match[1] : "";
}

function imgTags(fragment) {
  return [...fragment.matchAll(/<img\s+([^>]+)>/g)].map((match) => {
    const attrs = match[1];
    return {
      attrs,
      src: getAttr(attrs, "src"),
      alt: getAttr(attrs, "alt"),
      file: basenameFromSrc(getAttr(attrs, "src"))
    };
  });
}

function extractCaseCard(html, id) {
  const marker = `data-case-open="${id}"`;
  const markerIndex = html.indexOf(marker);
  if (markerIndex === -1) return "";
  const start = html.lastIndexOf("<a", markerIndex);
  const end = html.indexOf("</a>", markerIndex);
  if (start === -1 || end === -1) return "";
  return html.slice(start, end + "</a>".length);
}

function extractCasePanel(html, id) {
  const marker = `data-case-panel="${id}"`;
  const markerIndex = html.indexOf(marker);
  if (markerIndex === -1) return "";
  const start = html.lastIndexOf("<article", markerIndex);
  const end = html.indexOf("</article>", markerIndex);
  if (start === -1 || end === -1) return "";
  return html.slice(start, end + "</article>".length);
}

function activeCaseIds(html) {
  return [...html.matchAll(/data-case-open="([^"]+)"/g)].map((match) => match[1]);
}

function sha256(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  if (!existsSync(fullPath)) {
    fail(`Missing image file: ${relativePath}`);
    return "";
  }
  return createHash("sha256").update(readFileSync(fullPath)).digest("hex").toUpperCase();
}

function requireVisualReviewFields(item) {
  if (!ACCEPTED_STATUSES.has(item.status)) {
    fail(`${item.case_id}: status must be VERIFIED_VISUAL or VERIFIED_VISUAL_WITH_LIMITS`);
  }
  if (!item.visual_reviewed_at || !item.visual_reviewer) {
    fail(`${item.case_id}: missing visual_reviewed_at or visual_reviewer`);
  }
  if (!Array.isArray(item.evidence) || item.evidence.length < 2) {
    fail(`${item.case_id}: evidence must list at least two current visual/source checks`);
  }
  if (!Array.isArray(item.before_visual_signs) || item.before_visual_signs.length < 1) {
    fail(`${item.case_id}: before_visual_signs is required`);
  }
  if (!Array.isArray(item.after_visual_signs) || item.after_visual_signs.length < 1) {
    fail(`${item.case_id}: after_visual_signs is required`);
  }
  if (item.filename_is_authoritative !== false) {
    fail(`${item.case_id}: filename_is_authoritative must be false`);
  }
}

function checkImageAttrs(scope, images) {
  for (const image of images) {
    for (const attr of REQUIRED_IMG_ATTRS) {
      if (!getAttr(image.attrs, attr)) {
        fail(`${scope}: image ${image.src || "(missing src)"} missing ${attr}`);
      }
    }
  }
}

function checkCatalog(catalogByFile, item) {
  const before = catalogByFile.get(item.before_file);
  const after = catalogByFile.get(item.after_file);
  if (!before) fail(`${item.case_id}: before file missing in tools/photo-catalog.json: ${item.before_file}`);
  if (!after) fail(`${item.case_id}: after file missing in tools/photo-catalog.json: ${item.after_file}`);
  const beforeNeedles = item.catalog_before_stage_must_include || ["before"];
  const afterNeedles = item.catalog_after_stage_must_include || ["after"];
  const beforeStage = String(before?.stage || "").toLowerCase();
  const afterStage = String(after?.stage || "").toLowerCase();
  for (const needle of beforeNeedles) {
    if (!beforeStage.includes(String(needle).toLowerCase())) {
      fail(`${item.case_id}: catalog stage for ${item.before_file} must include "${needle}", got "${before?.stage || ""}"`);
    }
  }
  for (const needle of afterNeedles) {
    if (!afterStage.includes(String(needle).toLowerCase())) {
      fail(`${item.case_id}: catalog stage for ${item.after_file} must include "${needle}", got "${after?.stage || ""}"`);
    }
  }
}

function checkHashes(item) {
  const beforeHash = sha256(item.before_path);
  const afterHash = sha256(item.after_path);
  if (beforeHash && beforeHash !== item.before_sha256) {
    fail(`${item.case_id}: before image hash changed for ${item.before_path}`);
  }
  if (afterHash && afterHash !== item.after_sha256) {
    fail(`${item.case_id}: after image hash changed for ${item.after_path}`);
  }
}

function checkCaseOnPage(page, html, item) {
  const card = extractCaseCard(html, item.case_id);
  const panel = extractCasePanel(html, item.case_id);
  if (!card) {
    fail(`${page.file}: missing card for ${item.case_id}`);
    return;
  }
  if (!panel) {
    fail(`${page.file}: missing modal panel for ${item.case_id}`);
    return;
  }

  const cardImages = imgTags(card);
  const panelImages = imgTags(panel);
  if (cardImages.length < 2) {
    fail(`${page.file}: ${item.case_id} card needs at least two images`);
    return;
  }
  if (panelImages.length < 2) {
    fail(`${page.file}: ${item.case_id} modal needs at least two lead images`);
    return;
  }

  checkImageAttrs(`${page.file} ${item.case_id} card`, cardImages);
  checkImageAttrs(`${page.file} ${item.case_id} modal`, panelImages);

  const cardBefore = cardImages[0].file;
  const cardAfter = cardImages[1].file;
  const modalBefore = panelImages[0].file;
  const modalAfter = panelImages[1].file;

  if (cardBefore !== item.before_file || modalBefore !== item.before_file) {
    fail(`${page.file}: ${item.case_id} before mismatch. card=${cardBefore}, modal=${modalBefore}, expected=${item.before_file}`);
  }
  if (cardAfter !== item.after_file || modalAfter !== item.after_file) {
    fail(`${page.file}: ${item.case_id} after mismatch. card=${cardAfter}, modal=${modalAfter}, expected=${item.after_file}`);
  }

  if (page.beforePrefix && !cardImages[0].alt.startsWith(page.beforePrefix)) {
    fail(`${page.file}: ${item.case_id} first card alt must start with ${page.beforePrefix}`);
  }
  if (page.afterPrefix && !cardImages[1].alt.startsWith(page.afterPrefix)) {
    fail(`${page.file}: ${item.case_id} second card alt must start with ${page.afterPrefix}`);
  }

  for (const requiredFile of item.required_modal_context_files || []) {
    if (!panelImages.some((image) => image.file === requiredFile)) {
      fail(`${page.file}: ${item.case_id} modal missing required context image ${requiredFile}`);
    }
  }
}

function main() {
  if (!existsSync(VERDICT_FILE)) {
    fail(`Missing visual role verdict file: ${path.relative(ROOT, VERDICT_FILE)}`);
  }

  const verdict = existsSync(VERDICT_FILE) ? readJson(VERDICT_FILE) : { cases: [] };
  const catalog = readJson(CATALOG_FILE);
  const catalogByFile = new Map(catalog.map((item) => [item.file, item]));
  const cases = verdict.cases || [];
  const verdictById = new Map();

  if (verdict.schema_version !== 1) {
    fail("visual-role-verdicts.json schema_version must be 1");
  }
  if (!Array.isArray(cases) || cases.length === 0) {
    fail("visual-role-verdicts.json must contain at least one active case verdict");
  }

  for (const item of cases) {
    if (verdictById.has(item.case_id)) fail(`Duplicate verdict case_id: ${item.case_id}`);
    verdictById.set(item.case_id, item);
    requireVisualReviewFields(item);
    checkHashes(item);
    checkCatalog(catalogByFile, item);
  }

  let expectedActiveIds = null;
  for (const page of PAGES) {
    const html = readUtf8(page.file);
    const ids = activeCaseIds(html);
    if (!expectedActiveIds) {
      expectedActiveIds = ids;
    } else if (ids.join("|") !== expectedActiveIds.join("|")) {
      fail(`${page.file}: active case IDs differ from galerie.html. got ${ids.join(", ")}`);
    }
    for (const id of ids) {
      if (!verdictById.has(id)) {
        fail(`${page.file}: active case ${id} has no visual role verdict`);
      }
    }
    for (const item of cases) {
      if (!ids.includes(item.case_id)) {
        fail(`${page.file}: verdict case ${item.case_id} is not active on this page`);
      } else {
        checkCaseOnPage(page, html, item);
      }
    }
  }

  if (warnings.length) {
    console.warn("GALLERY ROLE AUDIT WARNINGS:");
    for (const message of warnings) console.warn(`- ${message}`);
  }

  if (errors.length) {
    console.error("GALLERY ROLE AUDIT FAILED:");
    for (const message of errors) console.error(`- ${message}`);
    process.exit(1);
  }

  console.log(`GALLERY ROLE AUDIT PASSED: ${cases.length} active case verdict(s), ${PAGES.length} localized page(s).`);
  console.log("Note: this audit enforces current visual verdict evidence; it does not replace direct pixel review when changing any pair.");
}

main();
