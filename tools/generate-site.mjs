import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brand = "Viktor Baumarchitektur";
const domain = "https://viktor-baumarchitektur.ch";
const phone = "+41 [PLATZHALTER]";
const telHref = "tel:+41000000000";
const whatsappText = encodeURIComponent(
  "Guten Tag Viktor, ich sende Ihnen Fotos meines Baumes (Kanton: ..., Baumart: ...). Können Sie einschätzen, ob er zu retten ist?"
);
const whatsappHref = `https://wa.me/PLACEHOLDER_NUMBER?text=${whatsappText}`;

const areaServed = [
  "Zürich",
  "Zug",
  "Luzern",
  "Aargau",
  "Schwyz",
  "Schaffhausen",
  "Appenzell",
  "Glarus",
  "Küsnacht",
  "Zollikon",
  "Meilen",
  "Herrliberg",
  "Erlenbach",
  "Kilchberg",
  "Thalwil",
  "Zürichsee",
  "Wollerau",
  "Freienbach"
];

function writeFile(file, content) {
  const fullPath = path.join(root, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trimStart() + "\n", "utf8");
}

function prefixFor(file) {
  const dir = path.dirname(file).replace(/\\/g, "/");
  if (dir === ".") return "";
  return "../".repeat(dir.split("/").length);
}

function cleanUrl(urlPath) {
  return `${domain}${urlPath === "/" ? "/" : urlPath}`;
}

function pagePathFromFile(file, lang = "de") {
  if (file === "index.html") return "/";
  if (file === "en/index.html") return "/en/";
  const without = file.replace(/\.html$/, "").replace(/\/index$/, "");
  return `/${without}`;
}

function fileFromCleanPath(urlPath) {
  if (urlPath === "/") return "index.html";
  if (urlPath === "/en/") return "en/index.html";
  const clean = urlPath.replace(/^\//, "");
  if (clean === "blog" || clean === "en/blog") return `${clean}/index.html`;
  return `${clean}.html`;
}

function cta(label, event = "cta_whatsapp_click", extraClass = "btn-primary") {
  return `<a class="btn ${extraClass}" href="${whatsappHref}" data-event="${event}" data-event-label="${label}" target="_blank" rel="noopener">${label}</a>`;
}

function callbackCta(label = "Rückruf anfordern") {
  return `<a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click" data-event-label="${label}">${label}</a>`;
}

function assetSlot({ type = "real", file, label, ratio = "4 / 3", className = "" }) {
  const kind = type === "ai" ? "AI-Hintergrund - von Viktor geprüft" : "FOTO - echt";
  return `
    <figure class="image-slot ${type === "ai" ? "image-slot-ai" : "image-slot-real"} ${className}" style="--ratio:${ratio}" data-asset="${file}">
      <div>
        <span>${kind}</span>
        <strong>${label}</strong>
        <small>${file}</small>
      </div>
    </figure>`;
}

const serviceCardsDe = `
  <div class="card service-card">
    <span class="eyebrow">Niwaki</span>
    <h3>Garten-Bonsai</h3>
    <p>Pflege und Formung von Niwaki - Bäumen im Garten, nicht im Topf. Jede Wolke erhält Raum für Licht, Luft und Kraft.</p>
    <a href="leistungen.html#niwaki">Niwaki Schnitt ansehen</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Acer palmatum</span>
    <h3>Japanische Ahorne</h3>
    <p>Saisonale Formung, Totholz aus dem Kroneninneren, Handarbeit gegen Pilze und Moos, bevor der Schaden bleibt.</p>
    <a href="leistungen.html#ahorn">Acer palmatum Pflege</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Pinus & Taxus</span>
    <h3>Nadelgehölze</h3>
    <p>Kiefer, Eibe, Wacholder, Tanne und Fichte. Sauberer Schnitt von Hand mit feinen japanischen Werkzeugen.</p>
    <a href="leistungen.html#nadelgehoelze">Kiefer-Formschnitt</a>
  </div>`;

const serviceCardsEn = `
  <div class="card service-card">
    <span class="eyebrow">Niwaki</span>
    <h3>Garden bonsai</h3>
    <p>Care and shaping of niwaki - trees in the garden, not in pots. Each cloud gets space for light, air and strength.</p>
    <a href="leistungen.html#niwaki">Niwaki care</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Acer palmatum</span>
    <h3>Japanese maples</h3>
    <p>Seasonal shaping, deadwood removal inside the crown, and hand work against moss and fungal pressure.</p>
    <a href="leistungen.html#ahorn">Maple care</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Pinus & Taxus</span>
    <h3>Conifers</h3>
    <p>Pine, yew, juniper, fir and spruce. Clean cuts by hand with fine Japanese tools.</p>
    <a href="leistungen.html#nadelgehoelze">Pine shaping</a>
  </div>`;

function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand,
    url: domain,
    image: `${domain}/assets/img/og-share.jpg`,
    telephone: phone,
    priceRange: "ab 110 CHF/Std.",
    areaServed,
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
      addressRegion: "Zürich"
    },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Niwaki Schnitt und Pflege" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Acer palmatum Pflege" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kiefer Formschnitt" } }
    ],
    sameAs: ["https://www.instagram.com/viktor.baumarchitektur", "https://www.facebook.com/"]
  };
}

function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Viktor",
    jobTitle: "Meister für japanische Baumkunst",
    worksFor: { "@type": "Organization", name: brand },
    knowsAbout: ["Niwaki", "Garten-Bonsai", "Acer palmatum", "Kiefer Formschnitt", "Topiarschere"],
    description: "27 Jahre Erfahrung in japanischer Baumkunst, Niwaki und Formschnitt."
  };
}

function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Wie rette ich meinen Niwaki oder japanischen Ahorn?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Senden Sie Fotos vom ganzen Baum, der Problemstelle und einer Nahaufnahme. Viktor prüft zuerst kostenlos, ob der Baum zu retten ist und welcher Schnitt sinnvoll ist."
        }
      },
      {
        "@type": "Question",
        name: "Warum verliert mein Baum die Form?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oft wurde nach Schema geschnitten, statt die natürliche Architektur, Lichtführung und Energieverteilung des Baumes zu respektieren."
        }
      },
      {
        "@type": "Question",
        name: "Was kostet japanische Baumpflege in der Region Zürich?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die Arbeit beginnt ab 110 CHF pro Stunde, die Anfahrt ab 90 CHF. Die Foto-Diagnose vorab ist kostenlos."
        }
      }
    ]
  };
}

function serviceLd(name, description) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    provider: { "@type": "LocalBusiness", name: brand },
    areaServed,
    description
  };
}

function renderJsonLd(items) {
  return items
    .filter(Boolean)
    .map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`)
    .join("\n");
}

function nav(lang, prefix, file) {
  const deLinks = [
    ["Start", "index.html"],
    ["Leistungen", "leistungen.html"],
    ["Philosophie", "philosophie.html"],
    ["Galerie", "galerie.html"],
    ["Preise", "preise.html"],
    ["Wissen", "blog/index.html"],
    ["Kontakt", "kontakt.html"]
  ];
  const enLinks = [
    ["Home", "en/index.html"],
    ["Services", "en/leistungen.html"],
    ["Philosophy", "en/philosophie.html"],
    ["Gallery", "en/galerie.html"],
    ["Prices", "en/preise.html"],
    ["Knowledge", "en/blog/index.html"],
    ["Contact", "en/kontakt.html"]
  ];
  const links = lang === "de" ? deLinks : enLinks;
  return links
    .map(([label, target]) => {
      const active = file === target ? " aria-current=\"page\"" : "";
      return `<a href="${prefix}${target}"${active}>${label}</a>`;
    })
    .join("");
}

function layout({ file, lang = "de", title, description, body, jsonLd = [], pageClass = "" }) {
  const prefix = prefixFor(file);
  const canonicalPath = pagePathFromFile(file, lang);
  const dePath = lang === "de" ? canonicalPath : canonicalPath.replace(/^\/en/, "") || "/";
  const enPath = lang === "en" ? canonicalPath : canonicalPath === "/" ? "/en/" : `/en${canonicalPath}`;
  const langSwitchTarget = `${prefix}${fileFromCleanPath(lang === "de" ? enPath : dePath)}`;
  const home = lang === "de" ? `${prefix}index.html` : `${prefix}en/index.html`;
  const contact = lang === "de" ? `${prefix}kontakt.html` : `${prefix}en/kontakt.html`;
  return `<!doctype html>
<html lang="${lang === "de" ? "de-CH" : "en"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="google-site-verification" content="PLATZHALTER">
  <link rel="canonical" href="${cleanUrl(canonicalPath)}">
  <link rel="alternate" hreflang="de-CH" href="${cleanUrl(dePath)}">
  <link rel="alternate" hreflang="en" href="${cleanUrl(enPath)}">
  <link rel="alternate" hreflang="x-default" href="${cleanUrl("/")}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${brand}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${cleanUrl(canonicalPath)}">
  <meta property="og:image" content="${domain}/assets/img/og-share.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link id="theme-link" rel="stylesheet" href="${prefix}assets/theme-v4.css">
  <link rel="stylesheet" href="${prefix}assets/base.css">
  <link rel="manifest" href="${prefix}site.webmanifest">
  ${renderJsonLd(jsonLd)}
</head>
<body class="${pageClass}">
  <a class="skip-link" href="#main">${lang === "de" ? "Zum Inhalt springen" : "Skip to content"}</a>
  <header class="site-header" data-header>
    <a class="brand" href="${home}" aria-label="${brand}">
      <span class="brand-symbol" aria-hidden="true"></span>
      <span class="brand-text">
        <span class="brand-name">${brand}</span>
        <span class="brand-line">Formgehölze · Niwaki · Evergreen Design</span>
      </span>
    </a>
    <button class="nav-toggle" type="button" data-nav-toggle aria-controls="site-nav" aria-expanded="false">
      <span></span><span></span><span></span>
      <span class="sr-only">${lang === "de" ? "Menü öffnen" : "Open menu"}</span>
    </button>
    <nav class="site-nav" id="site-nav" data-nav>
      ${nav(lang, prefix, file)}
      <a class="lang-switch" href="${langSwitchTarget}">${lang === "de" ? "EN" : "DE"}</a>
    </nav>
  </header>

  <main id="main">
    ${body}
  </main>

  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <a class="footer-brand" href="${home}">${brand}</a>
        <p>Japanische Baumkunst, Niwaki, Garten-Bonsai und Formschnitt in der Region Zürich.</p>
        <p class="trust-chip">27 Jahre Erfahrung · ★ 4.x Google [PLATZHALTER]</p>
      </div>
      <div>
        <h2>Leistungen</h2>
        <a href="${prefix}${lang === "de" ? "leistungen.html#niwaki" : "en/leistungen.html#niwaki"}">Niwaki</a>
        <a href="${prefix}${lang === "de" ? "leistungen.html#ahorn" : "en/leistungen.html#ahorn"}">Japanische Ahorne</a>
        <a href="${prefix}${lang === "de" ? "leistungen.html#nadelgehoelze" : "en/leistungen.html#nadelgehoelze"}">Nadelgehölze</a>
      </div>
      <div>
        <h2>Kantone</h2>
        <p>Zürich · Zug · Luzern · Aargau · Schwyz · Schaffhausen · Appenzell · Glarus</p>
      </div>
      <div>
        <h2>Kontakt</h2>
        <a href="${contact}">${lang === "de" ? "Kostenlose Foto-Diagnose" : "Free photo diagnosis"}</a>
        <a href="https://www.instagram.com/viktor.baumarchitektur" target="_blank" rel="noopener">Instagram</a>
        <a href="#" aria-label="Facebook placeholder">Facebook</a>
        <a href="${prefix}${lang === "de" ? "impressum.html" : "en/impressum.html"}">Impressum</a>
        <a href="${prefix}${lang === "de" ? "datenschutz.html" : "en/datenschutz.html"}">Datenschutz</a>
      </div>
    </div>
    <p class="site-credit">Website by Andrii · Status: placeholders for legal data, phone, WhatsApp, GA4, Ads and real photos.</p>
  </footer>

  <div class="mobile-cta" aria-label="${lang === "de" ? "Schnelle Kontaktleiste" : "Quick contact bar"}">
    <a href="${whatsappHref}" data-event="cta_whatsapp_click" target="_blank" rel="noopener">Foto senden</a>
    <a href="${telHref}" data-event="cta_call_click" aria-label="${lang === "de" ? "Anrufen" : "Call"}">☎</a>
  </div>

  <div class="cookie-banner" data-consent-banner hidden>
    <p>${lang === "de" ? "Wir nutzen Analyse- und Ads-Messung erst nach Ihrer Zustimmung. Standard: abgelehnt." : "Analytics and ads measurement only run after consent. Default: denied."} <a href="${prefix}${lang === "de" ? "datenschutz.html" : "en/datenschutz.html"}">${lang === "de" ? "Datenschutz" : "Privacy"}</a></p>
    <div>
      <button class="btn btn-secondary" type="button" data-consent-deny>${lang === "de" ? "Ablehnen" : "Deny"}</button>
      <button class="btn btn-primary" type="button" data-consent-accept>${lang === "de" ? "Akzeptieren" : "Accept"}</button>
    </div>
  </div>
  <div class="toast" data-toast hidden></div>
  <script src="${prefix}assets/main.js" defer></script>
</body>
</html>`;
}

function finalCtaDe(contactPrefix = "") {
  return `<section class="section final-cta">
    <div>
      <span class="eyebrow">Kostenlose erste Einschätzung</span>
      <h2>Bereit, Ihren Baum zu retten?</h2>
      <p>Senden Sie mir ein Foto der Problemstelle - ich sage Ihnen kostenlos, ob und wie Ihr Baum zu retten ist. Ehrlich, ohne Verpflichtung.</p>
      <div class="btn-row">${cta("Foto senden - kostenlose Diagnose")} <a class="btn btn-secondary" href="${contactPrefix}kontakt.html#rueckruf" data-event="cta_callback_click">Rückruf anfordern</a></div>
    </div>
  </section>`;
}

function finalCtaEn(contactPrefix = "") {
  return `<section class="section final-cta">
    <div>
      <span class="eyebrow">Free first assessment</span>
      <h2>Ready to save your tree?</h2>
      <p>Send a photo of the problem area. Viktor will tell you honestly whether and how the tree can be saved.</p>
      <div class="btn-row">${cta("Send photo - free diagnosis")} <a class="btn btn-secondary" href="${contactPrefix}kontakt.html#rueckruf" data-event="cta_callback_click">Request callback</a></div>
    </div>
  </section>`;
}

function homeDe() {
  return `
  <section class="hero section">
    <div class="hero-media">${assetSlot({ type: "ai", file: "hero-garten.jpg", label: "Niwaki im Schweizer Garten", ratio: "16 / 9", className: "hero-slot" })}</div>
    <div class="hero-panel">
      <span class="eyebrow">FORMGEHÖLZE · NIWAKI · EVERGREEN DESIGN · JAPANISCHE GARTENKUNST</span>
      <h1>Niwaki & japanische Baumkunst - mit Schweizer Präzision.</h1>
      <p class="motto">Schweizer Qualität in Resonanz mit japanischer Philosophie.</p>
      <p>Als Meister für <strong>Niwaki und Garten-Bonsai</strong> in der <strong>Region Zürich</strong> forme und pflege ich seit 27 Jahren japanische Ahorne, Kiefern und Nadelgehölze - so, dass Ihr Baum über Jahre seine Form, seine Kraft und seine Gesundheit behält.</p>
      <div class="btn-row">${cta("Foto senden - kostenlose Diagnose")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Rückruf anfordern</a></div>
      <div class="trust-row"><span>27 Jahre Erfahrung</span><span>Inspiriert in Japan</span><span>★ 4.x Google [PLATZHALTER]</span></div>
    </div>
    <div class="hero-services">${serviceCardsDe}</div>
  </section>

  <section class="section split">
    <div>
      <span class="eyebrow">Naturgesetze</span>
      <h2>Naturgesetze kann man nicht ignorieren.</h2>
      <p>Zuerst braune Nadeln. Dann trockene Äste. Der Baum verliert einen Ast, dann zwei - und irgendwann seine Form. Der Grund ist fast immer derselbe: Es wurde an Zeit und Geld gespart. Doch Formschnitt ist Feinarbeit.</p>
      <p>Sie giessen, Sie pflegen - und trotzdem leidet der Baum. Es liegt fast nie am Besitzer. Es liegt am Schnitt: Wer vor mir an Ihrem Baum gearbeitet hat, hat gegen die Naturgesetze geschnitten.</p>
      <blockquote>Einen Ast abzuschneiden dauert eine Sekunde. Einen neuen wachsen zu lassen - Jahre.</blockquote>
    </div>
    ${assetSlot({ file: "vorher-dying-01.jpg", label: "Vorher/Nachher - falsch geschnittene Knospen", ratio: "4 / 3" })}
  </section>

  <section class="section split reverse">
    <div class="energy-card" aria-label="Energieverteilung eines Baumes">
      <svg viewBox="0 0 360 260" role="img" aria-labelledby="energy-title">
        <title id="energy-title">Krone 70 Prozent, Stamm 20 Prozent, Wurzeln 10 Prozent</title>
        <circle cx="180" cy="88" r="66" class="svg-leaf"></circle>
        <path d="M180 150 C174 178 166 200 148 232" class="svg-stem"></path>
        <path d="M180 150 C188 178 202 202 220 232" class="svg-stem"></path>
        <path d="M148 232 C112 240 96 248 70 250 M220 232 C256 240 278 248 308 250" class="svg-root"></path>
        <text x="180" y="92">Krone ~70%</text>
        <text x="92" y="214">Wurzeln ~10%</text>
        <text x="228" y="184">Stamm ~20%</text>
      </svg>
    </div>
    <div>
      <span class="eyebrow">Meisterarbeit</span>
      <h2>Warum ein Meister mehr sieht als ein Gärtner.</h2>
      <p>Die Krone verbraucht Energie ungleich. Wer das ignoriert, schneidet die Kraft aus dem Baum. Ich sehe die natürliche Architektur eines Baumes - und wie er in einem, in zwei, in drei Jahren aussehen wird.</p>
      <p>27 Jahre Praxis, mit Schweiss erarbeitet, geschult an der Philosophie des Dao. Nicht schnell. Richtig.</p>
      <a class="text-link" href="philosophie.html">So arbeite ich →</a>
    </div>
  </section>

  <section class="section">
    <div class="section-head">
      <span class="eyebrow">Leistungen</span>
      <h2>Drei Kernbereiche - kompromisslos.</h2>
      <p>Alles Weitere auf Anfrage. Bäume bis 3 m; grösser nach Absprache.</p>
    </div>
    <div class="card-grid three">${serviceCardsDe}</div>
  </section>

  <section class="section" id="vision" data-event-section="vision_section_view">
    <div class="section-head">
      <span class="eyebrow">Vision</span>
      <h2>Wie Ihr Baum über die Jahre Form annimmt.</h2>
      <p>Ich forme nicht für den Moment, sondern für die Jahre. Schon vor dem ersten Schnitt sehe ich, wohin Ihr Baum wachsen kann.</p>
    </div>
    <div class="timeline">
      <article>${assetSlot({ type: "ai", file: "vision-jahr1.jpg", label: "Jahr 1 - Struktur", ratio: "1 / 1" })}<h3>Jahr 1</h3><p>Struktur - Totholz raus, Kraft neu verteilt, erste Form.</p></article>
      <article>${assetSlot({ type: "ai", file: "vision-jahr2.jpg", label: "Jahr 2 - Richtung", ratio: "1 / 1" })}<h3>Jahr 2</h3><p>Die richtigen Triebe bleiben, der Raum öffnet sich.</p></article>
      <article>${assetSlot({ type: "ai", file: "vision-jahr3.jpg", label: "Jahr 3 - Charakter", ratio: "1 / 1" })}<h3>Jahr 3</h3><p>Die Form trägt sich selbst, der Baum wirkt gewachsen, nicht geschnitten.</p></article>
    </div>
  </section>

  <section class="section signature-block">
    <div>
      <span class="eyebrow">Signatur-Angebot</span>
      <h2>Ihre persönliche Baum-Vision - kostenlos.</h2>
      <p>Senden Sie mir ein Foto Ihres Baumes. Sie erhalten zurück: meine ehrliche Einschätzung - in meinen eigenen Worten -, eine Visualisierung, wie Ihr Baum in drei Jahren aussehen kann, und, wenn er es wert ist, einen Platz in meinem Kalender.</p>
      <p><strong>Nur für ausgewählte Gärten.</strong></p>
      ${cta("Foto senden - persönliche Baum-Vision erhalten")}
    </div>
    ${assetSlot({ type: "ai", file: "section-bg-vision.jpg", label: "Persönliche Baum-Vision", ratio: "16 / 9" })}
  </section>

  <section class="section">
    <div class="section-head">
      <span class="eyebrow">Galerie</span>
      <h2>Vorher/Nachher - die Form kehrt zurück.</h2>
      <p>Reale Fotos werden später eingesetzt. Die Slots sind bereits benannt und austauschbar.</p>
    </div>
    <div class="gallery-teaser">
      ${assetSlot({ file: "vorher-nachher-01.jpg", label: "Japanischer Ahorn vor und nach dem Formschnitt", ratio: "4 / 3" })}
      ${assetSlot({ file: "vorher-nachher-02.jpg", label: "Kiefer verliert Form - wieder geöffnet", ratio: "4 / 3" })}
      ${assetSlot({ file: "vorher-nachher-03.jpg", label: "Niwaki Wolkenform stabilisiert", ratio: "4 / 3" })}
    </div>
    <a class="text-link" href="galerie.html">Vorher/Nachher ansehen →</a>
  </section>

  <section class="section split">
    <div>
      <span class="eyebrow">Blick in die Wurzeln</span>
      <h2>Gesundheit beginnt unter der Erde.</h2>
      <p>Wie beim Fundament eines Hauses beginnt alles unter der Erde. Der richtige Boden - Akadama, die passende Säure (pH 5,5-6,5), geprüfte Erden - ist die Basis für Gesundheit.</p>
      <a class="text-link" href="philosophie.html#wurzeln">Mehr über Boden und Wurzeln →</a>
    </div>
    ${assetSlot({ file: "meister-hands-01.jpg", label: "Viktor beim Formschnitt einer Kiefer (Pinus)", ratio: "3 / 2" })}
  </section>

  <section class="section price-teaser">
    <span class="eyebrow">Preise</span>
    <h2>Qualität statt Eile.</h2>
    <p>Vier Stunden gute Arbeit sind mehr wert als zwei Stunden schnelle. Arbeit ab 110 CHF/Std., Anfahrt ab 90 CHF.</p>
    <a class="btn btn-secondary" href="preise.html">Preise ansehen</a>
  </section>

  <section class="section">
    <div class="section-head">
      <span class="eyebrow">Arbeitsgebiet</span>
      <h2>Wo ich arbeite.</h2>
      <p>Schwerpunkt Kanton Zürich. Ebenso Zug, Luzern, Aargau, Schwyz, Schaffhausen, Appenzell und Glarus. Übrige Schweiz nach Absprache. Für aussergewöhnliche Bäume reise ich.</p>
    </div>
  </section>

  <section class="section split reverse trust-section">
    ${assetSlot({ file: "japan-postkarte.jpg", label: "Anerkennung aus Japan - reale Dankeskarte", ratio: "4 / 3" })}
    <div>
      <span class="eyebrow">Vertrauen</span>
      <h2>In Japan kennt man meine Arbeit.</h2>
      <p>Eine handsignierte Dankeskarte einer renommierten japanischen Bonsai-Werkzeugmarke - persönlich an mich adressiert. Anerkennung von dort, wo diese Kunst zu Hause ist.</p>
      <blockquote>[Kurzes Zitat], - M. B. [PLATZHALTER]</blockquote>
      <p>Sehen Sie meine Arbeit auf Instagram <a href="https://www.instagram.com/viktor.baumarchitektur">@viktor.baumarchitektur</a> und Facebook. ★ [4.x] Google [PLATZHALTER]</p>
    </div>
  </section>

  <section class="section faq">
    <div class="section-head">
      <span class="eyebrow">FAQ</span>
      <h2>Häufige Fragen zu Niwaki und japanischer Baumpflege.</h2>
    </div>
    <details><summary>Wie rette ich meinen Niwaki oder japanischen Ahorn?</summary><p>Senden Sie drei Fotos: den ganzen Baum, die Problemstelle und eine Nahaufnahme. Die erste Einschätzung ist kostenlos.</p></details>
    <details><summary>Warum verliert mein Baum die Form?</summary><p>Meist wurde die Energieverteilung der Krone ignoriert. Dann wachsen innen Feuchtigkeit, Totholz und falsche Triebe.</p></details>
    <details><summary>Was kostet japanische Baumpflege in der Region Zürich?</summary><p>Arbeit ab 110 CHF/Std., Anfahrt ab 90 CHF. Der Vor-Ort-Termin folgt nach der Foto-Diagnose.</p></details>
  </section>
  ${finalCtaDe()}`;
}

function servicesDe() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Leistungen</span>
    <h1>Leistungen - Niwaki, Ahorn & Nadelgehölze.</h1>
    <p>Drei Kernbereiche: <strong>Niwaki-Schnitt</strong>, japanische Ahorne (Acer palmatum) und Kiefer-Formschnitt. Alles Weitere auf Anfrage. Bäume bis 3 m; grösser nach Absprache.</p>
  </section>
  <section class="section service-detail" id="niwaki">
    ${assetSlot({ file: "niwaki-service.jpg", label: "Niwaki / Garten-Bonsai - echte Referenz", ratio: "4 / 3" })}
    <div><span class="eyebrow">Service 1</span><h2>Niwaki (Garten-Bonsai)</h2><p>Pflege und Formung von Niwaki - Bäumen im Garten, nicht im Topf. Systematischer Schnitt lenkt die Kraft des Baumes dorthin, wo sie gebraucht wird, und gibt jeder Wolke ihren eigenen Raum für Licht und Luft.</p>${cta("Foto senden")}</div>
  </section>
  <section class="section service-detail reverse" id="ahorn">
    ${assetSlot({ file: "ahorn-service.jpg", label: "Japanischer Ahorn (Acer palmatum) Pflege", ratio: "4 / 3" })}
    <div><span class="eyebrow">Service 2</span><h2>Japanische Ahorne (Acer palmatum / dissectum)</h2><p>Saisonale Formung und Schnitt, Entfernung von Totholz aus dem Kroneninneren, Handarbeit gegen Pilze und Moos, architektonische Kronenarbeit. Viele Ahorne in der Schweiz wachsen ohne Pflege ein - ich öffne die Krone, bevor Pilze und Feuchtigkeit Schaden anrichten.</p>${cta("Ahorn-Foto senden")}</div>
  </section>
  <section class="section service-detail" id="nadelgehoelze">
    ${assetSlot({ file: "kiefer-service.jpg", label: "Kiefer Formschnitt mit Topiarschere", ratio: "4 / 3" })}
    <div><span class="eyebrow">Service 3</span><h2>Nadelgehölze - Schwerpunkt Kiefer (Pinus)</h2><p>Alle Nadelgehölze: Pinus sylvestris, mugo, thunbergii, parviflora, densiflora, strobus. Auch Taxus/Eibe, Juniperus/Wacholder, Tanne und Fichte. Geschnitten ausschliesslich mit feinsten japanischen Werkzeugen - von Hand.</p>${cta("Kiefer-Foto senden")}</div>
  </section>
  <section class="section note-block"><h2>Was nicht dazugehört.</h2><p>Weitere Arbeiten auf Anfrage. Kein gewöhnlicher Garten- oder Rasenunterhalt, keine grossen Pflanzungen. Ich arbeite gezielt - nicht für jeden, sondern für den, der seinen Baum ernst nimmt.</p><a class="text-link" href="blog/topiarschere.html">Warum die Topiarschere den Unterschied macht →</a></section>
  ${finalCtaDe()}`;
}

function philosophyDe() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Philosophie</span>
    <h1>Vom Metall zur lebendigen Form.</h1>
    <p>Japanische Gartenkunst ist keine Dekoration. Sie ist Handwerk, Analyse und Respekt vor Naturgesetzen.</p>
  </section>
  <section class="section split">
    <div><h2>Japanische Gartenkunst mit Schweizer Präzision.</h2><p>Ich habe mein halbes Leben mit Metall gearbeitet - als Mechaniker, im Lärm, im Schmutz. 2009 reiste ich nach Japan. Dort sah ich, was ein Baum sein kann, wenn ihn jemand wirklich versteht. Eine gewöhnliche Kiefer wurde unter den Händen eines Meisters zu etwas Lebendigem. Seither ist Niwaki mein Weg.</p><p>Diese Erfahrung wurde mit Schweiss erarbeitet - durch Fehler und das Korrigieren dieser Fehler. Systematische Arbeit, tiefe Analyse, rechtzeitige Schlüsse - im Einklang mit der Philosophie des Dao.</p></div>
    ${assetSlot({ file: "meister-01.jpg", label: "Viktor bei der Arbeit - Porträt", ratio: "3 / 2" })}
  </section>
  <section class="section split reverse">
    ${assetSlot({ file: "meister-02.jpg", label: "Meisterhände und japanisches Werkzeug", ratio: "3 / 2" })}
    <div><h2>Naturgesetze.</h2><p>Zuerst braune Nadeln. Dann trockene Äste. Der Baum verliert einen Ast, dann zwei - und irgendwann seine Form. Wer jede Knospe nach Schema schneidet, kann gegen die Gesetze der Natur kein dauerhaftes Ergebnis erwarten.</p><p>Mein Anspruch: dass Sie nicht nur direkt nach der Arbeit zufrieden sind, sondern auch nach einem, zwei, drei Jahren. Dass wir uns in die Augen sehen können - ehrlich.</p></div>
  </section>
  <section class="section split" id="wurzeln">
    <div><span class="eyebrow">Blick in die Wurzeln</span><h2>Blick in die Wurzeln.</h2><p>Wie beim Fundament eines Hauses beginnt alles unter der Erde. Der richtige Boden - Akadama, die passende Säure (pH 5,5-6,5), geprüfte Erden - ist die Basis für Gesundheit.</p><p>Ich gebe kein Garantie-Versprechen über Ihren Kopf hinweg. Aber die Zusage, es richtig zu machen und Fehler zu korrigieren. Folgen Sie meinen Empfehlungen, und die Form hält über Jahre.</p></div>
    ${assetSlot({ file: "meister-03.jpg", label: "Boden, Wurzeln und Akadama", ratio: "3 / 2" })}
  </section>
  <section class="section note-block"><h2>Topiarschere statt Heckenschere.</h2><p>Eine Heckenschere reisst. Zurück bleiben Fasern - feine Härchen, die der Baum für verletzte Äste hält. Mit der schärfsten japanischen Topiarschere schneide ich sauber: minimaler Schaden, schnelle Erholung, volle Kraft für die Form.</p></section>
  ${finalCtaDe()}`;
}

function galleryDe() {
  const pairs = Array.from({ length: 6 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `<article class="before-after"><div>${assetSlot({ file: `vorher-dying-${n}.jpg`, label: `Vorher ${n} - Formverlust`, ratio: "4 / 3" })}</div><div>${assetSlot({ file: `nachher-${n}.jpg`, label: `Nachher ${n} - Form und Luft`, ratio: "4 / 3" })}</div><p>Naturgesetze respektiert: Licht, Luft und Kraft neu verteilt.</p></article>`;
  }).join("");
  return `
  <section class="page-hero section">
    <span class="eyebrow">Galerie</span>
    <h1>Vorher / Nachher - meine Arbeit.</h1>
    <p>Gartenbonsai Vorher Nachher, Niwaki Beispiele und Meisterarbeit. Reale Fotos werden unter den gelisteten Dateinamen eingesetzt.</p>
  </section>
  <section class="section gallery-grid">${pairs}</section>
  <section class="section">
    <div class="section-head"><h2>Der Meister bei der Arbeit.</h2><p>Drei reale Slots für Viktor, Hände und Werkzeug.</p></div>
    <div class="gallery-teaser">
      ${assetSlot({ file: "meister-01.jpg", label: "Viktor beim Formschnitt", ratio: "3 / 2" })}
      ${assetSlot({ file: "meister-02.jpg", label: "Japanische Topiarschere im Einsatz", ratio: "3 / 2" })}
      ${assetSlot({ file: "meister-03.jpg", label: "Arbeit am japanischen Ahorn", ratio: "3 / 2" })}
    </div>
  </section>
  ${finalCtaDe()}`;
}

function pricesDe() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Preise</span>
    <h1>Preise - Qualität statt Eile.</h1>
    <p>Was kostet professionelle <strong>japanische Baumpflege</strong>? Vier Stunden gute Arbeit sind mehr wert als zwei Stunden schnelle. Wer am Schnitt spart, zahlt mit der Form und der Gesundheit des Baumes - oft über Jahre.</p>
  </section>
  <section class="section price-grid">
    <article class="card"><span class="eyebrow">Arbeit</span><h2>ab 110 CHF/Std.</h2><p>Feinarbeit von Hand. Keine pauschale Schnellpflege.</p></article>
    <article class="card"><span class="eyebrow">Anfahrt</span><h2>ab 90 CHF</h2><p>Distanzabhängig. Schwerpunkt Zürich, Zug und angrenzende Kantone.</p></article>
    <article class="card"><span class="eyebrow">Termin</span><h2>nach Foto-Diagnose</h2><p>Die Foto-Diagnose ist kostenlos und schützt vor unnötigen Wegen.</p></article>
  </section>
  <section class="section note-block"><h2>Warum nicht schneller?</h2><p>Ein sauberer Schnitt entscheidet, ob der Baum Kraft verliert oder sich erholt. Bei wertvollen Bäumen ist Eile selten günstig.</p>${cta("Foto senden - kostenlose Diagnose")}</section>
  ${finalCtaDe()}`;
}

function blogIndexDe() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Wissen</span>
    <h1>Wissen rund um Niwaki, Ahorne und Nadelgehölze.</h1>
    <p>Kurze, klare Artikel zu Topiarschere, Formschnitt, Akadama, Wurzeln und gesunder Baumarchitektur.</p>
  </section>
  <section class="section card-grid two">
    <article class="card article-card">${assetSlot({ file: "meister-hands-01.jpg", label: "Topiarschere und sauberer Schnitt", ratio: "3 / 2" })}<h2>Warum ich mit der Topiarschere schneide</h2><p>Sauberer Schnitt statt gerissene Fasern: warum das Werkzeug die Gesundheit des Baumes beeinflusst.</p><a href="topiarschere.html">Artikel lesen</a></article>
    <article class="card article-card">${assetSlot({ file: "boden-wurzeln.jpg", label: "Akadama, Bonsai-Erde und Wurzeln", ratio: "3 / 2" })}<h2>Der Boden entscheidet: Akadama & Wurzeln</h2><p>Fundament-Metapher, Akadama, Kanuma, pH 5,5-6,5 und gesunde Wurzeln.</p><a href="boden-wurzeln.html">Artikel lesen</a></article>
  </section>
  ${finalCtaDe("../")}`;
}

function articleTopiaryDe() {
  return `
  <article class="article section">
    <span class="eyebrow">Topiarschere</span>
    <h1>Warum ich mit der Topiarschere schneide.</h1>
    ${assetSlot({ file: "meister-hands-01.jpg", label: "Viktor beim Formschnitt mit Topiarschere", ratio: "16 / 9" })}
    <p>Ein guter Formschnitt beginnt nicht mit Tempo, sondern mit dem richtigen Werkzeug. Bei Niwaki, Kiefer-Formschnitt und japanischer Baumpflege reicht es nicht, die äussere Kontur schnell zu glätten. Der Baum ist kein grüner Block. Er ist ein lebendes System aus Krone, Stamm und Wurzeln.</p>
    <p>Eine Heckenschere reisst. Zurück bleiben Fasern - feine Härchen, die der Baum als Verletzung behandelt. Er schickt Energie dorthin, statt sie in gesundes Wachstum, neue Triebe und stabile Wolken zu führen. Was im ersten Moment ordentlich aussieht, kann dem Baum über Monate Kraft nehmen.</p>
    <p>Mit der Topiarschere arbeite ich anders. Jeder Schnitt ist sichtbar entschieden: Wo braucht die Wolke Licht? Wo muss Luft durch die Krone? Welche Knospe bleibt, damit die Form in einem Jahr noch stimmt? Die scharfe japanische Schere macht einen sauberen Schnitt, der schneller verheilt und dem Baum weniger Kraft raubt.</p>
    <p>Das ist der Unterschied zwischen gewöhnlichem Gartenunterhalt und Feinarbeit. Ich schneide nicht jede Knospe nach Schema. Ich lese die Architektur des Baumes. Besonders bei Pinus, Taxus, Juniperus und Acer palmatum entscheidet diese Ruhe darüber, ob der Baum nur kurz gut aussieht - oder über Jahre Form und Gesundheit behält.</p>
    <p>Wenn Sie unsicher sind, ob Ihr Baum falsch geschnitten wurde, senden Sie mir Fotos. Oft erkennt man an Nadeln, trockenen Ästen und dichter Krone schon, ob ein sauberer Formschnitt helfen kann.</p>
    <div class="btn-row">${cta("Foto senden - kostenlose Diagnose")}</div>
  </article>`;
}

function articleSoilDe() {
  return `
  <article class="article section">
    <span class="eyebrow">Akadama & Wurzeln</span>
    <h1>Der Boden entscheidet: Akadama & Wurzeln.</h1>
    ${assetSlot({ file: "boden-wurzeln.jpg", label: "Akadama Schweiz und gesunde Wurzeln", ratio: "16 / 9" })}
    <p>Ein Baum steht nicht nur auf dem Boden. Er lebt aus ihm. Wie bei einem Haus entscheidet das Fundament, ob die sichtbare Form stabil bleibt. Bei japanischen Ahornen, Garten-Bonsai und Niwaki beginnt Gesundheit deshalb unter der Erde: bei Struktur, Wasserführung, Luft und Säure.</p>
    <p>Akadama, Kanuma und Pemza sind nicht einfach schöne Namen aus Japan. Sie helfen, Wasser und Luft so zu führen, dass die Wurzeln arbeiten können. Für viele japanische Ahorne ist ein leicht saurer Bereich von etwa pH 5,5-6,5 sinnvoll. Ist der Boden zu schwer, zu nass oder zu verdichtet, entsteht Stress. Dann werden Blätter schwach, Moos und Pilzdruck steigen, und die Krone verliert Kraft.</p>
    <p>Darum betrachte ich nicht nur die Form von aussen. Wenn ein Baum immer wieder Nadeln verliert, innen trocken wird oder die Krone nicht sauber reagiert, frage ich nach Standort, Substrat, Wasser und Pflege. Ein Schnitt kann viel korrigieren, aber er ersetzt kein gesundes Fundament.</p>
    <p>Die richtige Erde ist auch eine Frage der Verantwortung. Ich gebe kein leeres Garantie-Versprechen über Ihren Kopf hinweg. Ich sage, was ich sehe, was ich ändern würde und welche Empfehlungen wichtig sind. Wenn Sie diese Empfehlungen befolgen, kann die Form über Jahre halten.</p>
    <p>Senden Sie mir Fotos vom Baum, vom Standort und wenn möglich vom Bodenbereich. So lässt sich oft schnell einschätzen, ob nur die Krone Aufmerksamkeit braucht - oder ob die Wurzeln der eigentliche Schlüssel sind.</p>
    <div class="btn-row">${cta("Foto senden - kostenlose Diagnose")}</div>
  </article>`;
}

function contactDe() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Kontakt</span>
    <h1>Senden Sie mir ein Foto.</h1>
    <p>Drei Fotos genügen für eine erste Einschätzung: der ganze Baum, die Problemstelle, eine Nahaufnahme. Ich sage Ihnen kostenlos, ob und wie er zu retten ist.</p>
    <div class="btn-row">${cta("WhatsApp öffnen - Fotos senden")} <a class="btn btn-secondary" href="${telHref}" data-event="cta_call_click">Telefon [PLATZHALTER]</a></div>
  </section>
  <section class="section contact-grid">
    <form class="form-card" data-event="contact_form_submit" action="mailto:[PLATZHALTER]@example.com" method="post" enctype="text/plain">
      <h2>Foto-Diagnose anfragen.</h2>
      <p class="form-note">TODO: Formspree/Vercel Forms Endpoint einsetzen. Aktuell: no-backend placeholder.</p>
      <label>Name <input name="name" autocomplete="name" required></label>
      <label>E-Mail <input type="email" name="email" autocomplete="email" required></label>
      <label>Kanton <input name="kanton" autocomplete="address-level1" required></label>
      <label>Baumart <input name="baumart" placeholder="z.B. Acer palmatum, Kiefer, Taxus"></label>
      <label>Nachricht <textarea name="nachricht" rows="5" required></textarea></label>
      <label>Fotos <input type="file" name="fotos" multiple accept="image/*"></label>
      <button class="btn btn-primary" type="submit">Anfrage vorbereiten</button>
    </form>
    <form class="form-card" id="rueckruf" data-event="cta_rueckruf_submit" action="mailto:[PLATZHALTER]@example.com" method="post" enctype="text/plain">
      <h2>Rückruf anfordern.</h2>
      <label>Name <input name="name" autocomplete="name" required></label>
      <label>Telefon <input type="tel" name="telefon" autocomplete="tel" required></label>
      <label>Wunsch-Zeitfenster <input name="zeitfenster" placeholder="z.B. Mo 18-20 Uhr"></label>
      <button class="btn btn-secondary" type="submit">Rückruf vorbereiten</button>
      <p class="form-note">Telefon, WhatsApp Nummer, GA4, Ads und Backend bleiben TODO-Platzhalter.</p>
    </form>
  </section>`;
}

function legalDe(kind) {
  const isPrivacy = kind === "datenschutz";
  return `
  <!-- PLACEHOLDER LEGAL PAGE: must be reviewed and completed by Viktor/Andrii before publication. -->
  <section class="page-hero section legal">
    <span class="eyebrow">[PLATZHALTER]</span>
    <h1>${isPrivacy ? "Datenschutzerklärung" : "Impressum"}.</h1>
    <p>Diese Seite ist strukturiert, aber nicht final. Alle Angaben mit [PLATZHALTER] müssen vor Veröffentlichung geprüft und ergänzt werden.</p>
  </section>
  <section class="section legal-content">
    <h2>${isPrivacy ? "Verantwortliche Stelle" : "Angaben gemäss Schweizer Recht"}</h2>
    <p>${brand}<br>[PLATZHALTER STRASSE]<br>[PLATZHALTER PLZ/ORT]<br>Schweiz</p>
    <h2>Kontakt</h2>
    <p>Telefon: [PLATZHALTER]<br>E-Mail: [PLATZHALTER]</p>
    <h2>${isPrivacy ? "Personendaten, Formulare und Analyse" : "Haftung für Inhalte"}</h2>
    <p>${isPrivacy ? "Kontaktformulare, Foto-Uploads, Analytics und Ads-Messung werden erst nach finaler technischer und rechtlicher Prüfung produktiv geschaltet. Google Consent Mode ist im Code vorbereitet; IDs sind Platzhalter." : "Die Inhalte werden sorgfältig erstellt. Für Vollständigkeit, Richtigkeit und Aktualität wird bis zur finalen Freigabe keine Gewähr übernommen."}</p>
    <h2>${isPrivacy ? "Cookies und Einwilligung" : "Haftung für Links"}</h2>
    <p>${isPrivacy ? "Analyse- und Marketing-Speicher sind standardmässig abgelehnt und werden erst nach Zustimmung aktiviert. Externe Dienste bleiben mit Platzhalter-IDs deaktiviert." : "Externe Links werden vor Veröffentlichung geprüft. Für Inhalte externer Seiten sind ausschliesslich deren Betreiber verantwortlich."}</p>
  </section>`;
}

function themesPage() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Internal</span>
    <h1>Theme Preview V1-V5.</h1>
    <p>Nur für Andrii/Viktor: Designrichtung wechseln, ohne Layout neu zu bauen.</p>
    <div class="theme-buttons">
      ${[1, 2, 3, 4, 5].map((n) => `<button class="btn btn-secondary" type="button" data-theme-option="theme-v${n}.css">V${n}</button>`).join("")}
    </div>
  </section>
  <section class="section">
    <div class="card-grid three">${serviceCardsDe}</div>
  </section>
  <section class="section split">
    <div><h2>Beispielblock.</h2><p>Diese Seite zeigt Tokens: Hintergrund, Oberfläche, Text, Primärfarbe, Akzent, Linien, Schatten und Buttons.</p><div class="btn-row">${cta("Foto senden - Test CTA")} <a class="btn btn-secondary" href="kontakt.html">Kontakt</a></div></div>
    ${assetSlot({ type: "ai", file: "hero-garten.jpg", label: "Theme preview image slot", ratio: "16 / 9" })}
  </section>`;
}

function homeEn() {
  return `
  <section class="hero section">
    <div class="hero-media">${assetSlot({ type: "ai", file: "hero-garten.jpg", label: "Niwaki in a Swiss garden", ratio: "16 / 9", className: "hero-slot" })}</div>
    <div class="hero-panel">
      <span class="eyebrow">NIWAKI · GARDEN BONSAI · EVERGREEN DESIGN · JAPANESE GARDEN ART</span>
      <h1>Niwaki and Japanese tree art with Swiss precision.</h1>
      <p class="motto">Swiss quality in resonance with Japanese philosophy.</p>
      <p>For clients in the Zurich region, Viktor shapes and cares for Japanese maples, pines and conifers so that a valuable tree keeps its form, strength and health for years.</p>
      <div class="btn-row">${cta("Send photo - free diagnosis")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Request callback</a></div>
      <div class="trust-row"><span>27 years of experience</span><span>Inspired in Japan</span><span>★ 4.x Google [PLACEHOLDER]</span></div>
    </div>
    <div class="hero-services">${serviceCardsEn}</div>
  </section>
  <section class="section split"><div><h2>Nature's laws cannot be ignored.</h2><p>Brown needles, dry branches and lost shape usually have one cause: the tree was cut too quickly or too cheaply. Fine shaping respects light, air and the energy distribution of the crown.</p><blockquote>Cutting a branch takes a second. Growing a new one takes years.</blockquote></div>${assetSlot({ file: "vorher-dying-01.jpg", label: "Before and after - real reference", ratio: "4 / 3" })}</section>
  <section class="section"><div class="section-head"><h2>Core services.</h2><p>Niwaki, Japanese maples and conifers up to 3 m; larger trees by arrangement.</p></div><div class="card-grid three">${serviceCardsEn}</div></section>
  <section class="section" id="vision" data-event-section="vision_section_view"><div class="section-head"><h2>Your tree over three years.</h2><p>Viktor shapes for the long term, not only for the day after the cut.</p></div><div class="timeline"><article>${assetSlot({ type: "ai", file: "vision-jahr1.jpg", label: "Year 1 - structure", ratio: "1 / 1" })}<h3>Year 1</h3><p>Deadwood out, strength redistributed.</p></article><article>${assetSlot({ type: "ai", file: "vision-jahr2.jpg", label: "Year 2 - direction", ratio: "1 / 1" })}<h3>Year 2</h3><p>The right shoots remain, the crown opens.</p></article><article>${assetSlot({ type: "ai", file: "vision-jahr3.jpg", label: "Year 3 - character", ratio: "1 / 1" })}<h3>Year 3</h3><p>The form carries itself.</p></article></div></section>
  <section class="section signature-block"><div><span class="eyebrow">Signature offer</span><h2>Your personal tree vision - free.</h2><p>Send a photo of your tree. You receive Viktor's honest assessment and a visual idea of how the tree can look in three years, if it is worth taking into the calendar.</p>${cta("Send photo - get personal tree vision")}</div>${assetSlot({ type: "ai", file: "section-bg-vision.jpg", label: "Personal tree vision", ratio: "16 / 9" })}</section>
  ${finalCtaEn()}`;
}

function genericEnPage(kind) {
  const map = {
    services: {
      h1: "Services - Niwaki, maples and conifers.",
      body: `<p>The same focused work as the German service page: niwaki shaping, Acer palmatum care and pine/conifer shaping by hand.</p><div class="card-grid three">${serviceCardsEn}</div>`
    },
    philosophy: {
      h1: "From metal to living form.",
      body: `<p>Viktor worked with metal before a 2009 journey to Japan became the turning point. Since then, niwaki has been his craft: systematic work, deep analysis and respect for nature's laws.</p><p>He does not promise miracles. He promises to work correctly, correct errors and shape for the next years, not only for the first impression.</p>`
    },
    gallery: {
      h1: "Before / after - Viktor's work.",
      body: `<div class="gallery-teaser">${assetSlot({ file: "vorher-nachher-01.jpg", label: "Before/after 01", ratio: "4 / 3" })}${assetSlot({ file: "vorher-nachher-02.jpg", label: "Before/after 02", ratio: "4 / 3" })}${assetSlot({ file: "meister-01.jpg", label: "Master at work", ratio: "3 / 2" })}</div>`
    },
    prices: {
      h1: "Prices - quality before speed.",
      body: `<p>Professional Japanese tree care starts at 110 CHF per hour. Travel starts at 90 CHF depending on distance. The first photo diagnosis is free.</p><div class="price-grid"><article class="card"><h2>110 CHF/h</h2><p>Work from</p></article><article class="card"><h2>90 CHF</h2><p>Travel from</p></article><article class="card"><h2>Free</h2><p>Photo diagnosis</p></article></div>`
    }
  };
  return `<section class="page-hero section"><span class="eyebrow">English mirror</span><h1>${map[kind].h1}</h1>${map[kind].body}</section>${finalCtaEn()}`;
}

function contactEn() {
  return `<section class="page-hero section"><span class="eyebrow">Contact</span><h1>Send a photo.</h1><p>Three photos are enough for a first assessment: the whole tree, the problem area and a close-up.</p><div class="btn-row">${cta("Open WhatsApp - send photos")} <a class="btn btn-secondary" href="${telHref}" data-event="cta_call_click">Phone [PLACEHOLDER]</a></div></section>
  <section class="section contact-grid"><form class="form-card" data-event="contact_form_submit" action="mailto:[PLACEHOLDER]@example.com" method="post"><h2>Photo diagnosis.</h2><label>Name <input name="name" required></label><label>Email <input type="email" name="email" required></label><label>Canton <input name="canton" required></label><label>Tree type <input name="tree"></label><label>Message <textarea name="message" rows="5"></textarea></label><label>Photos <input type="file" name="photos" multiple accept="image/*"></label><button class="btn btn-primary" type="submit">Prepare request</button></form><form class="form-card" id="rueckruf" data-event="cta_rueckruf_submit" action="mailto:[PLACEHOLDER]@example.com" method="post"><h2>Request callback.</h2><label>Name <input name="name" required></label><label>Phone <input name="phone" type="tel" required></label><label>Preferred time <input name="time"></label><button class="btn btn-secondary" type="submit">Prepare callback</button></form></section>`;
}

function blogIndexEn() {
  return `<section class="page-hero section"><span class="eyebrow">Knowledge</span><h1>Knowledge about niwaki, maples and conifers.</h1><p>Two starter articles translated for English visitors.</p></section><section class="section card-grid two"><article class="card article-card"><h2>Why I cut with topiary scissors</h2><p>Clean cuts, energy and Japanese tools.</p><a href="topiarschere.html">Read article</a></article><article class="card article-card"><h2>The soil decides</h2><p>Akadama, pH and healthy roots.</p><a href="boden-wurzeln.html">Read article</a></article></section>${finalCtaEn("../")}`;
}

function articleEn(type) {
  if (type === "topiary") {
    return `<article class="article section"><span class="eyebrow">Topiary scissors</span><h1>Why I cut with topiary scissors.</h1>${assetSlot({ file: "meister-hands-01.jpg", label: "Topiary scissors and clean cut", ratio: "16 / 9" })}<p>A clean cut is not a detail. A hedge trimmer tears fibres and makes the tree send energy into wounds. With sharp Japanese topiary scissors, each cut is deliberate: where light must enter, which bud should stay, and how the cloud will develop next year.</p><p>This is the difference between quick garden maintenance and precise niwaki work. If you suspect your tree was cut too hard or too schematically, send photos for a free first assessment.</p>${cta("Send photo - free diagnosis")}</article>`;
  }
  return `<article class="article section"><span class="eyebrow">Akadama & roots</span><h1>The soil decides: Akadama and roots.</h1>${assetSlot({ file: "boden-wurzeln.jpg", label: "Akadama and healthy roots", ratio: "16 / 9" })}<p>A tree lives from its foundation. Akadama, Kanuma, pumice, water flow and pH all influence whether a Japanese maple or niwaki can stay healthy. Many visible problems in the crown begin below the surface.</p><p>Send photos of the tree, location and soil area. Often this is enough to decide whether the crown needs work or the roots are the real key.</p>${cta("Send photo - free diagnosis")}</article>`;
}

function cssBase() {
  return `*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-body);font-size:16px;line-height:1.65;padding-bottom:0}body.menu-open{overflow:hidden}img,svg{max-width:100%;display:block}a{color:inherit}a:hover{text-decoration-color:var(--accent)}:focus-visible{outline:3px solid var(--accent);outline-offset:3px}.skip-link{position:absolute;left:12px;top:-80px;z-index:20;background:var(--primary);color:var(--primary-ink);padding:10px 14px;border-radius:8px}.skip-link:focus{top:12px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.site-header{position:sticky;top:0;z-index:15;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:12px max(16px,calc((100vw - var(--maxw))/2));background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}.brand{display:flex;align-items:center;gap:12px;text-decoration:none;min-width:0}.brand-symbol{width:42px;height:42px;border-radius:50%;background:radial-gradient(circle at 45% 28%,var(--leaf) 0 18%,transparent 19%),radial-gradient(circle at 60% 42%,var(--leaf) 0 20%,transparent 21%),linear-gradient(160deg,var(--primary),var(--accent));box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--surface) 70%,transparent)}.brand-text{display:grid;line-height:1.1}.brand-name{font-family:var(--font-head);font-size:1.18rem;font-weight:700}.brand-line{font-size:.75rem;color:var(--muted)}.site-nav{display:flex;align-items:center;gap:16px;font-size:.94rem}.site-nav a{text-decoration:none;color:var(--muted);font-weight:650}.site-nav a[aria-current=page],.site-nav a:hover{color:var(--primary)}.lang-switch{border:1px solid var(--line);border-radius:999px;padding:7px 10px}.nav-toggle{display:none;background:var(--surface);border:1px solid var(--line);border-radius:8px;width:44px;height:44px;padding:10px}.nav-toggle span:not(.sr-only){display:block;height:2px;background:var(--text);margin:5px 0}.section{max-width:var(--maxw);margin:0 auto;padding:64px 18px}.hero{max-width:none;display:grid;grid-template-columns:minmax(18px,1fr) minmax(0,var(--maxw)) minmax(18px,1fr);gap:0;padding-top:22px}.hero>*{grid-column:2}.hero-media{grid-column:1 / -1;grid-row:1;min-height:330px}.hero-slot{height:100%;border-radius:0}.hero-panel{grid-row:1;margin:34px 0 28px;width:min(620px,100%);background:color-mix(in srgb,var(--surface) 94%,transparent);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:var(--radius);padding:30px}.hero-services{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}.page-hero{padding-top:74px;padding-bottom:38px}.page-hero p{max-width:760px}.eyebrow{display:inline-flex;align-items:center;gap:8px;color:var(--primary);font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:0}.eyebrow:before{content:"";width:28px;height:1px;background:var(--accent)}h1,h2,h3{font-family:var(--font-head);line-height:1.05;margin:12px 0 14px;font-weight:700;color:var(--text);letter-spacing:0}h1{font-size:2.45rem;max-width:900px}h2{font-size:2rem}h3{font-size:1.35rem}p{margin:0 0 16px}.motto{font-family:var(--font-head);font-size:1.35rem;color:var(--primary);border-left:3px solid var(--accent);padding-left:14px}blockquote{margin:20px 0;padding:18px 20px;border-left:4px solid var(--accent);background:color-mix(in srgb,var(--surface) 72%,var(--bg));font-family:var(--font-head);font-size:1.35rem}.btn-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:11px 16px;border-radius:8px;text-decoration:none;border:1px solid transparent;font-weight:750;cursor:pointer;font:inherit}.btn-primary{background:var(--primary);color:var(--primary-ink)}.btn-secondary{background:transparent;color:var(--primary);border-color:var(--primary)}.btn-ghost{background:transparent;color:var(--muted);border-color:var(--line)}.text-link{font-weight:800;color:var(--primary);text-decoration-thickness:2px;text-underline-offset:4px}.trust-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.trust-row span,.trust-chip{display:inline-flex;border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:7px 10px;color:var(--muted);font-size:.86rem}.section-head{max-width:760px;margin-bottom:24px}.split,.service-detail,.signature-block,.contact-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:center}.reverse>*:first-child{order:2}.card-grid{display:grid;gap:16px}.card-grid.three{grid-template-columns:repeat(3,1fr)}.card-grid.two{grid-template-columns:repeat(2,1fr)}.card,.form-card,.note-block,.price-teaser,.energy-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px}.service-card a,.article-card a{color:var(--primary);font-weight:800}.image-slot{aspect-ratio:var(--ratio);background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;margin:0}.image-slot>div{height:100%;display:grid;place-content:center;text-align:center;padding:22px;background:linear-gradient(135deg,color-mix(in srgb,var(--surface) 76%,var(--leaf)),color-mix(in srgb,var(--surface) 78%,#2f87b8));color:var(--text)}.image-slot-real>div{background:linear-gradient(135deg,var(--surface),color-mix(in srgb,var(--bg) 78%,var(--accent)))}.image-slot span{font-size:.76rem;font-weight:850;text-transform:uppercase;color:var(--primary)}.image-slot strong{font-family:var(--font-head);font-size:1.28rem}.image-slot small{color:var(--muted)}.timeline,.gallery-teaser,.price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.timeline article{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:14px}.signature-block{background:linear-gradient(135deg,color-mix(in srgb,var(--primary) 94%,#0f172a),color-mix(in srgb,var(--primary) 70%,#2f87b8));max-width:none;padding:64px max(18px,calc((100vw - var(--maxw))/2));color:var(--primary-ink)}.signature-block h2,.signature-block .eyebrow,.signature-block p{color:var(--primary-ink)}.signature-block .eyebrow:before{background:var(--accent)}.signature-block .image-slot{box-shadow:none}.price-teaser{text-align:center}.faq details{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:16px 18px;margin:10px 0}.faq summary{font-weight:800;cursor:pointer}.energy-card svg{width:100%;height:auto}.svg-leaf{fill:color-mix(in srgb,var(--leaf) 75%,var(--accent));opacity:.9}.svg-stem,.svg-root{fill:none;stroke:var(--primary);stroke-width:16;stroke-linecap:round}.svg-root{stroke-width:8}.energy-card text{font:700 18px system-ui;fill:var(--text);text-anchor:middle}.gallery-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.before-after{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:14px}.before-after>div{display:grid;grid-template-columns:1fr 1fr;gap:10px}.article{max-width:860px}.article .image-slot{margin:24px 0}.form-card label{display:grid;gap:6px;margin:13px 0;font-weight:750}.form-card input,.form-card textarea{width:100%;border:1px solid var(--line);border-radius:8px;padding:12px;background:var(--bg);color:var(--text);font:inherit}.form-note{font-size:.9rem;color:var(--muted)}.legal-content{max-width:860px}.theme-buttons{display:flex;flex-wrap:wrap;gap:10px}.site-footer{background:color-mix(in srgb,var(--primary) 94%,#000);color:var(--primary-ink);padding:44px max(18px,calc((100vw - var(--maxw))/2)) 82px}.footer-grid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:28px}.site-footer a{display:block;color:var(--primary-ink);text-decoration:none;margin:7px 0}.site-footer h2{font-size:1.1rem;color:var(--primary-ink)}.footer-brand{font-family:var(--font-head);font-size:1.35rem;font-weight:800}.site-credit{border-top:1px solid color-mix(in srgb,var(--primary-ink) 20%,transparent);padding-top:18px;color:color-mix(in srgb,var(--primary-ink) 72%,transparent)}.mobile-cta{display:none}.cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:30;max-width:860px;margin:auto;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:var(--radius);padding:16px;gap:14px;align-items:center;justify-content:space-between}.cookie-banner:not([hidden]){display:flex}.cookie-banner p{margin:0}.cookie-banner div{display:flex;gap:10px}.toast{position:fixed;right:16px;bottom:16px;background:var(--primary);color:var(--primary-ink);padding:12px 14px;border-radius:8px;z-index:35;box-shadow:var(--shadow)}@media (min-width:900px){h1{font-size:3.4rem}h2{font-size:2.35rem}.page-hero{padding-top:92px}}@media (max-width:920px){.nav-toggle{display:block}.site-nav{position:fixed;inset:67px 12px auto 12px;display:none;flex-direction:column;align-items:stretch;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:16px}.site-nav.is-open{display:flex}.site-nav a{padding:10px}.hero-services,.card-grid.three,.timeline,.gallery-teaser,.price-grid,.footer-grid,.gallery-grid{grid-template-columns:1fr 1fr}.split,.service-detail,.signature-block,.contact-grid{grid-template-columns:1fr}.reverse>*:first-child{order:0}.hero-panel{margin:20px 0}.mobile-cta{position:fixed;left:0;right:0;bottom:0;z-index:25;display:grid;grid-template-columns:1fr 58px;background:var(--surface);border-top:1px solid var(--line);box-shadow:0 -10px 22px rgba(0,0,0,.08)}.mobile-cta a{min-height:58px;display:grid;place-items:center;text-decoration:none;font-weight:850}.mobile-cta a:first-child{background:var(--primary);color:var(--primary-ink)}body{padding-bottom:58px}.cookie-banner{bottom:72px;display:block}.cookie-banner:not([hidden]){display:block}.cookie-banner div{margin-top:12px}}@media (max-width:620px){.brand-line{display:none}.brand-name{font-size:1rem}.hero-media{min-height:390px}.hero-panel{padding:22px}.hero-services,.card-grid.three,.card-grid.two,.timeline,.gallery-teaser,.price-grid,.footer-grid,.gallery-grid,.before-after>div{grid-template-columns:1fr}.section{padding:50px 16px}h1{font-size:2.2rem}h2{font-size:1.75rem}.btn{width:100%}.btn-row{align-items:stretch}.trust-row span{width:100%;justify-content:center}}@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important;transition:none!important}}`;
}

function jsMain() {
  return `(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const navToggle = $('[data-nav-toggle]');
  const nav = $('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      document.body.classList.toggle('menu-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  const GA_ID = 'G-XXXXXXX';
  const ADS_ID = 'AW-XXXXXXX';
  const isRealId = (id) => id && !id.includes('X') && !id.includes('PLACEHOLDER');
  const loadScript = (src) => {
    if ($('script[src="' + src + '"]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  };
  const enableTags = () => {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
    if (isRealId(GA_ID)) {
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + GA_ID);
      window.gtag('js', new Date());
      window.gtag('config', GA_ID);
    }
    if (isRealId(ADS_ID)) {
      window.gtag('config', ADS_ID);
    }
  };

  const consentBanner = $('[data-consent-banner]');
  const storedConsent = localStorage.getItem('viktor-consent');
  if (storedConsent === 'granted') enableTags();
  if (!storedConsent && consentBanner) consentBanner.hidden = false;
  $('[data-consent-accept]')?.addEventListener('click', () => {
    localStorage.setItem('viktor-consent', 'granted');
    consentBanner.hidden = true;
    enableTags();
  });
  $('[data-consent-deny]')?.addEventListener('click', () => {
    localStorage.setItem('viktor-consent', 'denied');
    consentBanner.hidden = true;
  });

  const toast = $('[data-toast]');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.setTimeout(() => { toast.hidden = true; }, 4200);
  };

  const track = (name, params = {}) => {
    window.gtag('event', name, params);
    if ((name === 'cta_whatsapp_click' || name === 'contact_form_submit') && isRealId(ADS_ID)) {
      window.gtag('event', 'conversion', { send_to: ADS_ID + '/PLACEHOLDER' });
    }
  };
  window.trackSiteEvent = track;

  $$('[data-event]').forEach((el) => {
    if (el.tagName === 'FORM') return;
    el.addEventListener('click', () => {
      track(el.dataset.event, { label: el.dataset.eventLabel || el.textContent.trim(), path: location.pathname });
    });
  });

  $$('form[data-event]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      track(form.dataset.event, { path: location.pathname });
      showToast('Anfrage vorbereitet. Backend/Empfänger ist noch ein TODO-Platzhalter.');
    });
  });

  const vision = $('[data-event-section="vision_section_view"]');
  if ('IntersectionObserver' in window && vision) {
    let seen = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!seen && entry.isIntersecting) {
          seen = true;
          track('vision_section_view', { path: location.pathname });
          observer.disconnect();
        }
      });
    }, { threshold: 0.35 });
    observer.observe(vision);
  }

  $$('[data-theme-option]').forEach((button) => {
    button.addEventListener('click', () => {
      const theme = button.dataset.themeOption;
      const link = $('#theme-link');
      if (!link || !theme) return;
      const prefix = link.getAttribute('href').replace(/assets\\/theme-v\\d\\.css$/, '');
      link.setAttribute('href', prefix + 'assets/' + theme);
      showToast('Theme switched to ' + theme.replace('.css', '').toUpperCase());
    });
  });
})();`;
}

function themeCss(n) {
  const themes = {
    1: { name: "Robert Clean", bg: "#FAFAF7", surface: "#FFFFFF", text: "#1E1E1E", muted: "#60665F", primary: "#3E5C3A", ink: "#FFFFFF", accent: "#8A9A5B", leaf: "#86A567", line: "#E6E4DD", radius: "10px", shadow: "0 6px 24px rgba(30,30,30,.07)", head: 'system-ui,"Inter",sans-serif' },
    2: { name: "Caesar Luxe", bg: "#1F3D2E", surface: "#274A38", text: "#F4F1E8", muted: "#D4CCB7", primary: "#C9A24B", ink: "#132218", accent: "#86B985", leaf: "#98C06A", line: "rgba(244,241,232,.22)", radius: "12px", shadow: "0 10px 30px rgba(0,0,0,.25)", head: '"Cormorant Garamond",Georgia,serif' },
    3: { name: "Zen Editorial", bg: "#F2EDE3", surface: "#FFFDF8", text: "#14110E", muted: "#6C6259", primary: "#2F4F3A", ink: "#FFFFFF", accent: "#B23A2E", leaf: "#6D8D4E", line: "#DDD3C5", radius: "8px", shadow: "0 8px 28px rgba(60,45,30,.08)", head: '"Cormorant Garamond",Georgia,serif' },
    4: { name: "Improved Hybrid", bg: "#F8F7F2", surface: "#FFFFFF", text: "#1E2A22", muted: "#5B6B60", primary: "#24452F", ink: "#FFFFFF", accent: "#BE9B4E", leaf: "#7FA45B", line: "#E3E0D6", radius: "14px", shadow: "0 6px 24px rgba(20,30,24,.08)", head: '"Cormorant Garamond",Georgia,serif' },
    5: { name: "Cinematic", bg: "#101512", surface: "#F7F6F1", text: "#F7F6F1", muted: "#C8D1C7", primary: "#E8E2D2", ink: "#101512", accent: "#B9D66F", leaf: "#7FA45B", line: "rgba(255,255,255,.18)", radius: "8px", shadow: "0 18px 40px rgba(0,0,0,.28)", head: 'system-ui,"Inter",sans-serif' }
  };
  const t = themes[n];
  return `/* Theme V${n}: ${t.name}. Same variable names across all themes. */
:root{
  --bg:${t.bg};
  --surface:${t.surface};
  --text:${t.text};
  --muted:${t.muted};
  --primary:${t.primary};
  --primary-ink:${t.ink};
  --accent:${t.accent};
  --leaf:${t.leaf};
  --line:${t.line};
  --radius:${t.radius};
  --shadow:${t.shadow};
  --font-head:${t.head};
  --font-body:system-ui,"Inter",sans-serif;
  --maxw:1140px;
  --space:clamp(16px,4vw,40px);
}`;
}

function manifest() {
  return `# Image Manifest

All visual slots are placeholders until real files are provided. Do not use AI for concrete before/after proof or the Japan postcard. Preferred final formats: AVIF/WebP with JPEG fallback.

| File | Aspect | Source | Used for | Status |
|---|---:|---|---|---|
| logo.png | 1:1 source PNG from existing JPEG | Existing real file, old wordmark | Asset archive / possible mark | PRESENT_BUT_WORDMARK_CONFLICT |
| hero-garten.jpg | 16:9 | AI, Viktor-approved | Home hero background | PLACEHOLDER |
| og-share.jpg | 1200x630 | AI or designed placeholder, Viktor-approved | Link previews | PLACEHOLDER |
| section-bg-vision.jpg | 16:9 | AI, Viktor-approved | Personal tree vision block | PLACEHOLDER |
| vision-jahr1.jpg | 1:1 | AI, Viktor-approved | Year 1 vision | PLACEHOLDER |
| vision-jahr2.jpg | 1:1 | AI, Viktor-approved | Year 2 vision | PLACEHOLDER |
| vision-jahr3.jpg | 1:1 | AI, Viktor-approved | Year 3 vision | PLACEHOLDER |
| vorher-dying-01.jpg..06.jpg | 4:3 | Real Viktor photos preferred | Gallery before states | PLACEHOLDER |
| nachher-01.jpg..06.jpg | 4:3 | Real Viktor photos | Gallery after states | PLACEHOLDER |
| nachher-06.jpg | 4:3 | Real Viktor photos | Explicit audit marker for final gallery pair | PLACEHOLDER |
| vorher-nachher-01.jpg..03.jpg | 4:3 | Real Viktor photos | Home teaser | PLACEHOLDER |
| niwaki-service.jpg | 4:3 | Real Viktor photo | Service detail | PLACEHOLDER |
| ahorn-service.jpg | 4:3 | Real Viktor photo | Service detail | PLACEHOLDER |
| kiefer-service.jpg | 4:3 | Real Viktor photo | Service detail | PLACEHOLDER |
| meister-01.jpg | 3:2 | Real Viktor photo | Philosophy / gallery | PLACEHOLDER |
| meister-02.jpg | 3:2 | Real Viktor photo | Philosophy / gallery | PLACEHOLDER |
| meister-03.jpg | 3:2 | Real Viktor photo | Philosophy / gallery | PLACEHOLDER |
| meister-hands-01.jpg | 3:2 | Real preferred, AI close-up allowed as temporary | Topiary scissors proof | PLACEHOLDER |
| japan-postkarte.jpg | 4:3 | Real only | Anerkennung aus Japan | PLACEHOLDER_REAL_REQUIRED |
| boden-wurzeln.jpg | 16:9 / 3:2 | Real or simple educational photo | Blog soil article | PLACEHOLDER |
`;
}

function siteManifest() {
  return JSON.stringify({
    name: "Viktor Baumarchitektur",
    short_name: "Baumarchitektur",
    lang: "de-CH",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F7F2",
    theme_color: "#24452F",
    icons: [
      { src: "/assets/img/logo.png", sizes: "512x512", type: "image/png", purpose: "any" }
    ]
  }, null, 2);
}

function sitemap() {
  const paths = [
    "/", "/leistungen", "/philosophie", "/galerie", "/preise", "/blog", "/blog/topiarschere", "/blog/boden-wurzeln", "/kontakt", "/impressum", "/datenschutz", "/themes",
    "/en/", "/en/leistungen", "/en/philosophie", "/en/galerie", "/en/preise", "/en/blog", "/en/blog/topiarschere", "/en/blog/boden-wurzeln", "/en/kontakt", "/en/impressum", "/en/datenschutz", "/en/themes"
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${cleanUrl(p)}</loc></url>`).join("\n")}
</urlset>`;
}

function readme() {
  return `# Viktor Baumarchitektur Static Website

Static multipage DE/EN site for Viktor Baumarchitektur. It opens directly from \`index.html\` and is ready for static hosting on Vercel.

## Edit checklist

- Replace WhatsApp \`PLACEHOLDER_NUMBER\` in \`tools/generate-site.mjs\` or directly in generated HTML.
- Replace phone \`+41000000000\` and visible \`[PLATZHALTER]\` phone/contact data.
- Replace GA4 \`G-XXXXXXX\`, Google Ads \`AW-XXXXXXX\`, Search Console verification and form backend.
- Complete \`impressum.html\` and \`datenschutz.html\` with Viktor's legal data before publication.
- Swap real images using filenames in \`assets/img/MANIFEST.md\`.

## Logo / wordmark assumption

The confirmed business/entity name in \`project_brief\` is **Viktor Baumarchitektur**. The supplied \`Лого.jpg\` was converted to a real PNG at \`assets/img/logo.png\`, but the image wordmark says **Viktor Bonsai**. The header therefore uses a text wordmark **Viktor Baumarchitektur** and keeps \`logo.png\` as an available asset until the final wordmark is redrawn or approved.

## Change theme

The active theme is loaded with:

\`\`\`html
<link id="theme-link" rel="stylesheet" href="assets/theme-v4.css">
\`\`\`

Switch to another design direction by replacing \`theme-v4.css\` with \`theme-v1.css\`, \`theme-v2.css\`, \`theme-v3.css\`, or \`theme-v5.css\`. Use \`themes.html\` to preview without editing files.

## Placeholders still requiring human approval

- WhatsApp number, phone, e-mail and form endpoint.
- Real before/after photos, master photos and Japan postcard.
- GA4, Google Ads, Search Console and consent wording review.
- Legal pages under Swiss/DSG/DSGVO requirements.
- Google rating/testimonial values.

## Local validation

Run:

\`\`\`powershell
node tools/audit-site.mjs
\`\`\`

No build step is required for visitors. The generator is kept only as a maintenance helper for consistent header/footer and EN mirrors.
`;
}

function auditScript() {
  return `import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "index.html","leistungen.html","philosophie.html","galerie.html","preise.html",
  "blog/index.html","blog/topiarschere.html","blog/boden-wurzeln.html",
  "kontakt.html","impressum.html","datenschutz.html","themes.html",
  "en/index.html","en/leistungen.html","en/philosophie.html","en/galerie.html","en/preise.html",
  "en/blog/index.html","en/blog/topiarschere.html","en/blog/boden-wurzeln.html",
  "en/kontakt.html","en/impressum.html","en/datenschutz.html",
  "assets/base.css","assets/main.js","assets/theme-v1.css","assets/theme-v2.css","assets/theme-v3.css","assets/theme-v4.css","assets/theme-v5.css",
  "assets/img/logo.png","assets/img/MANIFEST.md","site.webmanifest","robots.txt","sitemap.xml","llms.txt","vercel.json","README.md"
];

const errors = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push("Missing " + file);
}

const htmlFiles = required.filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) continue;
  const html = fs.readFileSync(full, "utf8");
  const h1 = [...html.matchAll(/<h1\\b/gi)].length;
  if (h1 !== 1) errors.push(file + " has " + h1 + " H1 tags");
  for (const needle of ["<title>", "name=\\"description\\"", "rel=\\"canonical\\"", "property=\\"og:title\\"", "hreflang=\\"de-CH\\"", "hreflang=\\"en\\""]) {
    if (!html.includes(needle)) errors.push(file + " missing " + needle);
  }
  if (!html.includes("application/ld+json") && !file.includes("impressum") && !file.includes("datenschutz") && !file.includes("themes")) {
    errors.push(file + " missing JSON-LD");
  }
  const hrefs = [...html.matchAll(/href=\"([^\"]+)\"/g)].map((m) => m[1]);
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

const manifest = fs.readFileSync(path.join(root, "assets/img/MANIFEST.md"), "utf8");
for (const file of ["hero-garten.jpg","og-share.jpg","japan-postkarte.jpg","vision-jahr1.jpg","nachher-06.jpg"]) {
  if (!manifest.includes(file)) errors.push("MANIFEST missing " + file);
}

if (errors.length) {
  console.error("AUDIT FAILED");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}
console.log("AUDIT PASSED: required files, SEO tags, JSON-LD, internal links, events and image manifest are present.");
`;
}

writeFile("assets/base.css", cssBase());
for (const n of [1, 2, 3, 4, 5]) writeFile(`assets/theme-v${n}.css`, themeCss(n));
writeFile("assets/main.js", jsMain());
writeFile("assets/img/MANIFEST.md", manifest());
writeFile("assets/icons/leaf.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true"><path fill="#24452F" d="M52 8C31 9 12 21 12 42c0 8 6 14 14 14 21 0 32-26 26-48Zm-34 38c9-14 18-22 30-31-8 11-16 21-30 31Z"/></svg>`);

const pages = [
  ["index.html", "de", "Niwaki & Garten-Bonsai Zürich - Viktor Baumarchitektur", "Meister für Niwaki, japanische Ahorne und Nadelgehölze in Zürich. 27 Jahre Erfahrung, kostenlose Foto-Diagnose.", homeDe(), [localBusinessLd(), personLd(), faqLd()]],
  ["leistungen.html", "de", "Niwaki, japanischer Ahorn & Kiefer-Formschnitt", "Leistungen für Niwaki Schnitt, Acer palmatum Pflege und Formschnitt von Nadelgehölzen in der Schweiz.", servicesDe(), [localBusinessLd(), serviceLd("Niwaki, Ahorn und Kiefer-Formschnitt", "Japanische Baumpflege, Niwaki Schnitt und Formschnitt für Nadelgehölze.")]],
  ["philosophie.html", "de", "Philosophie & Meister - japanische Gartenkunst", "Vom Schiffsmechaniker zur Baumkunst: Viktors Weg, Naturgesetze, Dao und Schweizer Präzision.", philosophyDe(), [localBusinessLd(), personLd()]],
  ["galerie.html", "de", "Vorher / Nachher - Garten-Bonsai & Niwaki", "Vorher/Nachher Slots für Gartenbonsai, Niwaki Beispiele und Meisterarbeit von Viktor Baumarchitektur.", galleryDe(), [localBusinessLd()]],
  ["preise.html", "de", "Japanische Baumpflege - Preise & Kosten", "Preise für japanische Baumpflege: Arbeit ab 110 CHF pro Stunde, Anfahrt ab 90 CHF, Foto-Diagnose kostenlos.", pricesDe(), [localBusinessLd(), faqLd()]],
  ["blog/index.html", "de", "Niwaki Wissen - Topiarschere, Akadama & Pflege", "Wissen rund um Niwaki, japanische Ahorne, Kiefer Formschnitt, Topiarschere und gesunde Wurzeln.", blogIndexDe(), [localBusinessLd()]],
  ["blog/topiarschere.html", "de", "Topiarschere vs. Heckenschere - sauberer Schnitt", "Warum Viktor beim Formschnitt mit der Topiarschere arbeitet: sauberer Schnitt, weniger Energieverlust, japanisches Werkzeug.", articleTopiaryDe(), [localBusinessLd()]],
  ["blog/boden-wurzeln.html", "de", "Akadama & Bonsai-Erde - der richtige Boden", "Akadama Schweiz, Bonsai Erde, pH 5,5-6,5 und gesunde Wurzeln als Fundament für japanische Baumkunst.", articleSoilDe(), [localBusinessLd()]],
  ["kontakt.html", "de", "Kontakt & kostenlose Foto-Diagnose - Baumpflege", "Kontakt zu Viktor Baumarchitektur: Foto senden, kostenlose Diagnose erhalten und Rückruf anfordern.", contactDe(), [localBusinessLd()]],
  ["impressum.html", "de", "Impressum - Viktor Baumarchitektur", "Platzhalter-Impressum für Viktor Baumarchitektur. Vor Veröffentlichung rechtlich ergänzen.", legalDe("impressum"), []],
  ["datenschutz.html", "de", "Datenschutz - Viktor Baumarchitektur", "Platzhalter-Datenschutzerklärung mit Consent Mode Hinweis. Vor Veröffentlichung rechtlich prüfen.", legalDe("datenschutz"), []],
  ["themes.html", "de", "Theme Preview - Viktor Baumarchitektur", "Interne Vorschau für Design Themes V1 bis V5.", themesPage(), []],
  ["en/index.html", "en", "Niwaki & Japanese Tree Art - Viktor Baumarchitektur", "Japanese tree care, niwaki and garden bonsai in the Zurich region. Free photo diagnosis.", homeEn(), [localBusinessLd(), personLd(), faqLd()]],
  ["en/leistungen.html", "en", "Services - Niwaki, Maples & Conifers", "English mirror for niwaki, Japanese maple and conifer shaping services.", genericEnPage("services"), [localBusinessLd(), serviceLd("Niwaki, maples and conifers", "Japanese tree care and shaping.")]],
  ["en/philosophie.html", "en", "Philosophy & Master - Japanese Garden Art", "Viktor's path from metal to living form, with Swiss precision and Japanese philosophy.", genericEnPage("philosophy"), [localBusinessLd(), personLd()]],
  ["en/galerie.html", "en", "Before / After - Garden Bonsai & Niwaki", "English gallery mirror with before/after slots and master-at-work placeholders.", genericEnPage("gallery"), [localBusinessLd()]],
  ["en/preise.html", "en", "Japanese Tree Care - Prices & Costs", "Prices: work from 110 CHF per hour, travel from 90 CHF, free photo diagnosis.", genericEnPage("prices"), [localBusinessLd(), faqLd()]],
  ["en/blog/index.html", "en", "Niwaki Knowledge - Topiary Scissors & Soil", "English knowledge articles about topiary scissors, Akadama and roots.", blogIndexEn(), [localBusinessLd()]],
  ["en/blog/topiarschere.html", "en", "Topiary Scissors vs Hedge Trimmer", "Why Viktor cuts with topiary scissors for cleaner tree shaping.", articleEn("topiary"), [localBusinessLd()]],
  ["en/blog/boden-wurzeln.html", "en", "Akadama & Bonsai Soil - Healthy Roots", "Akadama, pH and healthy roots for Japanese tree care.", articleEn("soil"), [localBusinessLd()]],
  ["en/kontakt.html", "en", "Contact & Free Photo Diagnosis", "Send photos of your tree and request a free first assessment.", contactEn(), [localBusinessLd()]],
  ["en/impressum.html", "en", "Legal Notice - Viktor Baumarchitektur", "Placeholder legal notice. Complete before publication.", legalDe("impressum").replaceAll("Impressum", "Legal Notice").replaceAll("Datenschutzerklärung", "Privacy Policy"), []],
  ["en/datenschutz.html", "en", "Privacy Policy - Viktor Baumarchitektur", "Placeholder privacy policy. Complete before publication.", legalDe("datenschutz").replaceAll("Datenschutzerklärung", "Privacy Policy"), []]
  ,["en/themes.html", "en", "Theme Preview - Viktor Baumarchitektur", "Internal preview for design themes V1 to V5.", themesPage(), []]
];

for (const [file, lang, title, description, body, jsonLd] of pages) {
  writeFile(file, layout({ file, lang, title, description, body, jsonLd }));
}

writeFile("site.webmanifest", siteManifest());
writeFile("robots.txt", `User-agent: *
Allow: /
Sitemap: ${domain}/sitemap.xml`);
writeFile("sitemap.xml", sitemap());
writeFile("llms.txt", `# Viktor Baumarchitektur

Viktor Baumarchitektur is a specialist for Niwaki, garden bonsai, Japanese maples and conifer shaping in the Zurich region, Switzerland.

Key facts:
- 27 years of experience.
- Services: Niwaki / Garten-Bonsai, Acer palmatum care, pine and conifer shaping.
- Area: Zürich, Zug, Luzern, Aargau, Schwyz, Schaffhausen, Appenzell, Glarus; other Swiss regions by arrangement.
- Prices: work from 110 CHF/hour, travel from 90 CHF, free photo diagnosis.
- Contact: ${domain}/kontakt

Important pages:
- ${domain}/
- ${domain}/leistungen
- ${domain}/preise
- ${domain}/kontakt
- ${domain}/blog/topiarschere
- ${domain}/blog/boden-wurzeln
`);
writeFile("vercel.json", JSON.stringify({
  cleanUrls: true,
  trailingSlash: false,
  headers: [
    {
      source: "/assets/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
      ]
    },
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
      ]
    }
  ]
}, null, 2));
writeFile("README.md", readme());
writeFile("tools/audit-site.mjs", auditScript());

console.log("Generated Viktor Baumarchitektur static site.");
