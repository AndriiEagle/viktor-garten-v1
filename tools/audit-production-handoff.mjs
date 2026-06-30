import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

const legalPagePattern = /(^|\/)(impressum|datenschutz)\.html$/;

const legalPlaceholderPatterns = [
  /\bPlatzhalter\b/i,
  /Placeholder (legal notice|privacy policy)/i,
  /Adresse folgt/i,
  /Complete before publication/i,
  /Vor Ver[öo]ffentlichung/i,
  /rechtlich erg[äa]nzen/i,
  /rechtlich pr[üu]fen/i,
  /must be reviewed and completed/i,
  /Draft legal page/i,
  /Telefon und E-Mail folgen nach Freigabe/i,
  /Українська чернетка/i,
  /Чернетка/i,
  /Адреса після погодження/i,
  /перед публікацією/i,
  /після фінального погодження/i
];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(absolute);
  }
  return files;
}

const findings = [];

try {
  const files = await walk(dist);
  for (const file of files) {
    const relative = path.relative(root, file).replaceAll(path.sep, "/");
    if (!legalPagePattern.test(relative)) continue;
    const html = await fs.readFile(file, "utf8");
    for (const pattern of legalPlaceholderPatterns) {
      const match = html.match(pattern);
      if (match) {
        findings.push({
          file: relative,
          marker: match[0]
        });
      }
    }
  }
} catch (error) {
  console.error("HANDOFF AUDIT FAILED: could not inspect dist.", error.message);
  process.exit(1);
}

if (findings.length) {
  console.error("HANDOFF AUDIT FAILED: legal placeholder content remains in production output.");
  for (const finding of findings) {
    console.error(`- ${finding.file}: ${finding.marker}`);
  }
  console.error("Provide real approved legal data and regenerate before client handoff or production custom-domain launch.");
  process.exit(1);
}

console.log("HANDOFF AUDIT PASSED: no legal placeholder content found in dist.");
