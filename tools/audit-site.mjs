import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "index.html","leistungen.html","philosophie.html","galerie.html","preise.html",
  "blog/index.html","blog/topiarschere.html","blog/energie-krone.html","blog/kiefer-kerzen.html","blog/boden-wurzeln.html","blog/klimastress.html",
  "kontakt.html","impressum.html","datenschutz.html","themes.html",
  "en/index.html","en/leistungen.html","en/philosophie.html","en/galerie.html","en/preise.html",
  "en/blog/index.html","en/blog/topiarschere.html","en/blog/energie-krone.html","en/blog/kiefer-kerzen.html","en/blog/boden-wurzeln.html","en/blog/klimastress.html",
  "en/kontakt.html","en/impressum.html","en/datenschutz.html","en/themes.html",
  "uk/index.html","uk/leistungen.html","uk/philosophie.html","uk/galerie.html","uk/preise.html",
  "uk/blog/index.html","uk/blog/topiarschere.html","uk/blog/energie-krone.html","uk/blog/kiefer-kerzen.html","uk/blog/boden-wurzeln.html","uk/blog/klimastress.html",
  "uk/kontakt.html","uk/impressum.html","uk/datenschutz.html","uk/themes.html",
  "assets/base.css","assets/main.js","assets/theme-v1.css","assets/theme-v2.css","assets/theme-v3.css","assets/theme-v4.css","assets/theme-v5.css",
  "assets/img/logo.png","assets/img/og-share.jpg","assets/img/MANIFEST.md","site.webmanifest","robots.txt","sitemap.xml","llms.txt","vercel.json","README.md"
];

const errors = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push("Missing " + file);
}

const brandWordmark = "Viktor Baumarchitektur";
const requiredContact = {
  phone: "+41783130330",
  whatsapp: "https://wa.me/41783130330",
  instagram: "https://www.instagram.com/viktor_bonsai_niwaki",
  facebook: "https://www.facebook.com/viktor.bonsai.niwaki"
};
const visibleText = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&amp;/g, "&")
  .replace(/\s+/g, " ")
  .trim();

const sectionText = (html, tag) => {
  const match = html.match(new RegExp("<" + tag + "\\b[\\s\\S]*?<\\/" + tag + ">", "i"));
  return match ? visibleText(match[0]) : "";
};

const htmlFiles = required.filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) continue;
  const html = fs.readFileSync(full, "utf8");
  for (const forbiddenRaw of ["PLACEHOLDER_NUMBER", "+41000000000", "viktor.baumarchitektur"]) {
    if (html.includes(forbiddenRaw)) errors.push(file + " still contains outdated contact/social placeholder: " + forbiddenRaw);
  }
  if (!html.includes(requiredContact.whatsapp)) errors.push(file + " missing real WhatsApp wa.me link");
  if (!html.includes('href="tel:' + requiredContact.phone + '"')) errors.push(file + " missing real phone tel link");
  if (!html.includes(requiredContact.instagram)) errors.push(file + " missing current Instagram link");
  if (!html.includes(requiredContact.facebook)) errors.push(file + " missing current Facebook link");
  const h1 = [...html.matchAll(/<h1\b/gi)].length;
  if (h1 !== 1) errors.push(file + " has " + h1 + " H1 tags");
  for (const needle of ["<title>", "name=\"description\"", "rel=\"canonical\"", "property=\"og:title\"", "hreflang=\"de-CH\"", "hreflang=\"en\"", "hreflang=\"uk\""]) {
    if (!html.includes(needle)) errors.push(file + " missing " + needle);
  }
  if (!html.includes("application/ld+json") && !file.includes("impressum") && !file.includes("datenschutz") && !file.includes("themes")) {
    errors.push(file + " missing JSON-LD");
  }
  if (!html.includes("class=\"brand-logo\"") || !html.includes("assets/img/logo.png")) {
    errors.push(file + " header missing assets/img/logo.png brand logo");
  }
  if (!sectionText(html, "header").includes(brandWordmark)) {
    errors.push(file + " header missing visible " + brandWordmark + " wordmark");
  }
  if (!sectionText(html, "footer").includes(brandWordmark)) {
    errors.push(file + " footer missing visible " + brandWordmark + " wordmark");
  }
  const bodyMatch = html.match(/<body\b[\s\S]*?<\/body>/i);
  const bodyText = bodyMatch ? visibleText(bodyMatch[0]) : "";
  for (const forbidden of ["БРЕНД", "PLATZHALTER", "PLACEHOLDER"]) {
    if (bodyText.includes(forbidden)) errors.push(file + " visible body text contains " + forbidden);
  }
  if (file === "index.html" || file === "en/index.html" || file === "uk/index.html") {
    for (const deadSignal of ["FOTO - echt", "Google-Bewertung folgt", "Google rating follows", "Referenztext folgt"]) {
      if (bodyText.includes(deadSignal)) errors.push(file + " home page still shows dead demo signal: " + deadSignal);
    }
    if (!html.includes("data-before-after-slider")) errors.push(file + " missing homepage before/after slider");
  }
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  for (const img of imgs) {
    for (const attr of ["loading=\"lazy\"", "decoding=\"async\"", "width=\"", "height=\""]) {
      if (!img.includes(attr)) errors.push(file + " image missing " + attr + " -> " + img);
    }
    const src = img.match(/src=\"([^\"]+)\"/)?.[1] || "";
    if (src.includes("assets/img/")) {
      const local = src.startsWith("/")
        ? path.join(root, src.replace(/^\//, ""))
        : path.normalize(path.join(path.dirname(full), src));
      if (!fs.existsSync(local)) errors.push(file + " image source missing -> " + src);
    }
  }
  const forms = [...html.matchAll(/<form\b[^>]*>/gi)].map((m) => m[0]);
  for (const form of forms) {
    if (!form.includes('action="https://formspree.io/f/REPLACE"')) errors.push(file + " form is not Formspree-ready");
    if (!form.includes('method="post"')) errors.push(file + " form missing POST method");
    if (!form.includes('enctype="multipart/form-data"')) errors.push(file + " form missing multipart enctype");
  }
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
    if (href.includes("PLACEHOLDER")) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (!clean || clean.endsWith(".css") || clean.endsWith(".webmanifest")) continue;
    const resolved = path.normalize(path.join(path.dirname(full), clean));
    if (!fs.existsSync(resolved)) errors.push(file + " broken link -> " + href);
  }
}

const mainJs = fs.readFileSync(path.join(root, "assets/main.js"), "utf8");
for (const eventName of ["cta_whatsapp_click","cta_call_click","cta_rueckruf_submit","contact_form_submit","vision_section_view"]) {
  const siteHas = htmlFiles.some((file) => fs.readFileSync(path.join(root, file), "utf8").includes(eventName)) || mainJs.includes(eventName);
  if (!siteHas) errors.push("Missing event " + eventName);
}

const baseCss = fs.readFileSync(path.join(root, "assets/base.css"), "utf8");
if (baseCss.includes(".brand-symbol")) errors.push("Unused .brand-symbol CSS is still present");

const manifest = fs.readFileSync(path.join(root, "assets/img/MANIFEST.md"), "utf8");
for (const file of ["hero-garten-alt.jpg","hero-garten.jpg","og-share.jpg","japan-postkarte.jpg","concepts/japan-postkarte-concept.jpg","baumarchitektur-energiefluss-verstehen.png","vision-jahr1.jpg","nachher-06.jpg"]) {
  if (!manifest.includes(file)) errors.push("MANIFEST missing " + file);
}

if (errors.length) {
  console.error("AUDIT FAILED");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}
console.log("AUDIT PASSED: required files, SEO tags, JSON-LD, internal links, events and image manifest are present.");

