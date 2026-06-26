import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "index.html","leistungen.html","philosophie.html","galerie.html","preise.html",
  "blog/index.html","blog/topiarschere.html","blog/energie-krone.html","blog/niwaki-bonsai-stile.html","blog/kiefer-kerzen.html","blog/fehler-alte-nadeln-moos-pilzrisiko.html","blog/boden-wurzeln.html","blog/klimastress.html",
  "kontakt.html","impressum.html","datenschutz.html","themes.html",
  "en/index.html","en/leistungen.html","en/philosophie.html","en/galerie.html","en/preise.html",
  "en/blog/index.html","en/blog/topiarschere.html","en/blog/energie-krone.html","en/blog/niwaki-bonsai-stile.html","en/blog/kiefer-kerzen.html","en/blog/fehler-alte-nadeln-moos-pilzrisiko.html","en/blog/boden-wurzeln.html","en/blog/klimastress.html",
  "en/kontakt.html","en/impressum.html","en/datenschutz.html","en/themes.html",
  "uk/index.html","uk/leistungen.html","uk/philosophie.html","uk/galerie.html","uk/preise.html",
  "uk/blog/index.html","uk/blog/topiarschere.html","uk/blog/energie-krone.html","uk/blog/niwaki-bonsai-stile.html","uk/blog/kiefer-kerzen.html","uk/blog/fehler-alte-nadeln-moos-pilzrisiko.html","uk/blog/boden-wurzeln.html","uk/blog/klimastress.html",
  "uk/kontakt.html","uk/impressum.html","uk/datenschutz.html","uk/themes.html",
  "fr/index.html","it/index.html",
  "assets/base.css","assets/main.js","assets/theme-v1.css","assets/theme-v2.css","assets/theme-v3.css","assets/theme-v4.css","assets/theme-v5.css",
  "assets/img/logo.png","assets/img/foto/01_hero/hero-viktor-bonsai-main.webp","assets/img/foto/01_hero/hero-viktor-bonsai-mobile.webp","assets/img/foto/02_pryklady-robit/case-parviflora-before.webp","assets/img/foto/02_pryklady-robit/case-parviflora-after.webp","assets/img/foto/02_pryklady-robit/case-watereri-before.webp","assets/img/foto/02_pryklady-robit/case-watereri-after.webp","assets/img/foto/02_pryklady-robit/sosna-bila-17.webp","assets/img/foto/02_pryklady-robit/sosna-bila-18.webp","assets/img/foto/03_galereya/sosna-bila-01.webp","assets/img/foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp","assets/img/foto/05_nivaki-khmarky/sosna-watereri-do-pislya-08.webp","assets/img/foto/05_nivaki-khmarky/sosna-watereri-do-pislya-16.webp","assets/img/foto/06_yaponski-kleny/klen-yaponskyi-01.webp","assets/img/foto/07_viktor/viktor-01.webp","assets/img/foto/08_fonovi/fon-foto-01.webp","assets/img/foto/09_pomylky/pomylka-svichka-01.webp","assets/img/foto/10_vidkrytka-yaponiya/kyoto-viktor-wife-2009.webp","assets/img/foto/10_vidkrytka-yaponiya/vidkrytka-yaponiya-01.webp","assets/img/MANIFEST.md","site.webmanifest","robots.txt","sitemap.xml","llms.txt","vercel.json","README.md",".env.example","api/contact.js","api/voice-lead.js"
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
  const removedPublicMarkers = [
    "Konzept" + "-Labels",
    "Concept " + "labels",
    "Formular " + "inaktiv",
    "Formspree" + "-Endpunkt muss",
    "AI-" + "Konzeptvisualisierung",
    "AI " + "concept only",
    "AI-" + "концепт"
  ];
  for (const forbidden of removedPublicMarkers) {
    if (html.includes(forbidden) || bodyText.includes(forbidden)) errors.push(file + " public page still contains removed marker: " + forbidden);
  }
  const removedToggleAttr = "data-" + "presentation-toggle";
  const removedCaptionClass = "asset" + "-caption";
  if (html.includes(removedToggleAttr)) errors.push(file + " still renders presentation toggle");
  if (html.includes(removedCaptionClass)) errors.push(file + " still renders asset caption labels");
  if (file === "index.html" || file === "en/index.html" || file === "uk/index.html") {
    for (const deadSignal of ["FOTO - echt", "Google-Bewertung folgt", "Google rating follows", "Referenztext folgt"]) {
      if (bodyText.includes(deadSignal)) errors.push(file + " home page still shows dead demo signal: " + deadSignal);
    }
    if (!html.includes("data-before-after-slider") || !html.includes("before-after-range")) errors.push(file + " missing homepage before/after slider control");
    const homeSlider = html.match(/<figure class=\"before-after-slider\"[\s\S]*?<\/figure>/i)?.[0] || "";
    if (!homeSlider.includes("sosna-watereri-do-pislya-08.webp") || !homeSlider.includes("sosna-watereri-do-pislya-16.webp")) errors.push(file + " missing deployed homepage slider pair sosna-watereri-do-pislya-08/16");
    if (!homeSlider.includes("--split:40%") || !homeSlider.includes('value=\"40\"')) errors.push(file + " homepage slider split is not the deployed 40% setting");
    for (const badSliderFile of ["case-parviflora-before.webp", "case-parviflora-after.webp", "sosna-bila-17.webp", "sosna-bila-18.webp"]) {
      if (homeSlider.includes(badSliderFile)) errors.push(file + " homepage slider still uses non-etalon file: " + badSliderFile);
    }
    if (html.includes("honest-before-after")) errors.push(file + " still uses static side-by-side before/after layout");
    if (html.includes("case-taxus-after.webp")) errors.push(file + " still uses ladder Taxus photo as a homepage after image");
  }
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  for (const img of imgs) {
    if (!/loading=\"(?:lazy|eager)\"/.test(img)) errors.push(file + " image missing loading attribute -> " + img);
    for (const attr of ["decoding=\"async\"", "width=\"", "height=\""]) {
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
    if (!form.includes('action="/api/contact"')) errors.push(file + " form does not submit to /api/contact");
    if (!form.includes('method="post"')) errors.push(file + " form missing POST method");
    if (!form.includes("data-contact-form")) errors.push(file + " form missing data-contact-form marker");
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

const previewFiles = ["v2/index.html"];
for (const file of previewFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    errors.push("Missing preview " + file);
    continue;
  }
  const html = fs.readFileSync(full, "utf8");
  if (!html.includes("Version 2") || !html.includes("V2")) errors.push(file + " missing V2 marker");
  if (!html.includes("<title>") || !html.includes('name="description"')) errors.push(file + " missing basic meta tags");
  if (html.includes('href="#"')) errors.push(file + ' contains dead href="#" link');
  const removedPreviewMarkers = [
    "generated " + "image",
    "AI-" + "Bilder",
    "Konzept" + "-Labels",
    "Concept " + "labels",
    "asset" + "-caption"
  ];
  for (const forbidden of removedPreviewMarkers) {
    if (html.includes(forbidden)) errors.push(file + " preview still contains removed public marker: " + forbidden);
  }
  for (const marker of ["data-voice-lead", "MediaRecorder", "getUserMedia", "/api/voice-lead", "data-voice-consent"]) {
    if (!html.includes(marker)) errors.push(file + " missing voice lead marker " + marker);
  }
  const h1 = [...html.matchAll(/<h1\b/gi)].length;
  if (h1 !== 1) errors.push(file + " has " + h1 + " H1 tags");
  const previewRefs = [
    ...html.matchAll(/(?:src|href)="([^"]+)"/g),
    ...html.matchAll(/url\(["']?([^"')]+)["']?\)/g)
  ].map((m) => m[1]);
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  for (const ref of previewRefs) {
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    if (ref.startsWith("%23")) continue;
    if (ref.startsWith("#")) {
      if (ref.length > 1 && !ids.has(ref.slice(1))) errors.push(file + " broken preview anchor -> " + ref);
      continue;
    }
    const clean = ref.split("#")[0].split("?")[0];
    if (!clean) continue;
    const resolved = path.normalize(path.join(path.dirname(full), clean));
    if (!fs.existsSync(resolved)) errors.push(file + " broken preview ref -> " + ref);
  }
}

const manifest = fs.readFileSync(path.join(root, "assets/img/MANIFEST.md"), "utf8");
for (const file of ["foto/01_hero/hero-viktor-bonsai-main.webp","foto/01_hero/hero-viktor-bonsai-mobile.webp","foto/02_pryklady-robit/*.webp","foto/03_galereya/*.webp","foto/05_nivaki-khmarky/*.webp","foto/06_yaponski-kleny/klen-yaponskyi-01.webp","foto/06_yaponski-kleny/klen-yaponskyi-02.webp","foto/07_viktor/*.webp","foto/08_fonovi/*.webp","foto/09_pomylky/*.webp","foto/10_vidkrytka-yaponiya/kyoto-viktor-wife-2009.webp","foto/10_vidkrytka-yaponiya/vidkrytka-yaponiya-01.webp","baumarchitektur-korrektur.png","baumarchitektur-live-crown-ratio.png"]) {
  if (!manifest.includes(file)) errors.push("MANIFEST missing " + file);
}

if (errors.length) {
  console.error("AUDIT FAILED");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}
console.log("AUDIT PASSED: required files, SEO tags, JSON-LD, internal links, events and image manifest are present.");
