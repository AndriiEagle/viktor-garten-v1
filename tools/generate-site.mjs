import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brand = "Viktor Baumarchitektur";
const brandWordmark = "Viktor Baumarchitektur";
const domain = "https://viktor-baumarchitektur.ch";
const phone = "+41783130330";
const phoneDisplay = "+41 78 313 03 30";
const telHref = `tel:${phone}`;
const formspreeAction = "https://formspree.io/f/REPLACE";
const instagramUrl = "https://www.instagram.com/viktor_bonsai_niwaki";
const facebookUrl = "https://www.facebook.com/viktor.bonsai.niwaki";
const whatsappText = encodeURIComponent(
  "Guten Tag Viktor, ich sende Ihnen Fotos meines Baumes (Kanton: ..., Baumart: ...). Können Sie einschätzen, ob er zu retten ist?"
);
const whatsappHref = `https://wa.me/${phone.replace("+", "")}?text=${whatsappText}`;
const whatsappTextUk = encodeURIComponent(
  "Добрий день, Вікторе. Надсилаю фото свого дерева (кантон: ..., вид дерева: ...). Чи можете оцінити, чи його можна врятувати?"
);
const whatsappHrefUk = `https://wa.me/${phone.replace("+", "")}?text=${whatsappTextUk}`;

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
  const normalized = String(content).replace(/[ \t]+$/gm, "").trimStart();
  fs.writeFileSync(fullPath, normalized + "\n", "utf8");
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
  if (file === "uk/index.html") return "/uk/";
  const without = file.replace(/\.html$/, "").replace(/\/index$/, "");
  return `/${without}`;
}

function fileFromCleanPath(urlPath) {
  if (urlPath === "/") return "index.html";
  if (urlPath === "/en/") return "en/index.html";
  if (urlPath === "/uk/") return "uk/index.html";
  const clean = urlPath.replace(/^\//, "");
  if (clean === "blog" || clean === "en/blog" || clean === "uk/blog") return `${clean}/index.html`;
  return `${clean}.html`;
}

function localizedFile(target, lang = "de") {
  if (lang === "de") return target;
  return `${lang}/${target}`;
}

function cta(label, event = "cta_whatsapp_click", extraClass = "btn-primary") {
  return `<a class="btn ${extraClass}" href="${whatsappHref}" data-event="${event}" data-event-label="${label}" target="_blank" rel="noopener">${label}</a>`;
}

function ctaUk(label, event = "cta_whatsapp_click", extraClass = "btn-primary") {
  return `<a class="btn ${extraClass}" href="${whatsappHrefUk}" data-event="${event}" data-event-label="${label}" target="_blank" rel="noopener">${label}</a>`;
}

function callbackCta(label = "Rückruf anfordern") {
  return `<a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click" data-event-label="${label}">${label}</a>`;
}

function assetSlot({ type = "real", file, label, ratio = "4 / 3", className = "", caption = null, kindLabel = null }) {
  const assetPath = path.join(root, "assets", "img", file);
  const [widthRatio, heightRatio] = ratio.split("/").map((part) => Number.parseFloat(part.trim()));
  const width = Number.isFinite(widthRatio) ? Math.round(widthRatio * 300) : 1200;
  const height = Number.isFinite(heightRatio) ? Math.round(heightRatio * 300) : 900;
  const isAi = type === "ai";
  const conceptCaption = isAi
    ? `<figcaption class="asset-caption">${caption || "AI-Konzeptvisualisierung - von Viktor botanisch zu prüfen."}</figcaption>`
    : "";
  if (fs.existsSync(assetPath)) {
    return `
    <figure class="image-slot image-slot-real ${isAi ? "image-slot-ai" : ""} ${className}" style="--ratio:${ratio}" data-asset="${file}">
      <img src="__ASSET_PREFIX__assets/img/${file}" alt="${label}" loading="lazy" decoding="async" width="${width}" height="${height}">
      ${conceptCaption}
    </figure>`;
  }
  const kind = kindLabel || (type === "ai" ? "AI-Hintergrund - von Viktor geprüft" : "FOTO - echt");
  return `
    <figure class="image-slot ${isAi ? "image-slot-ai" : "image-slot-real"} ${className}" style="--ratio:${ratio}" data-asset="${file}">
      <div>
        <span>${kind}</span>
        <strong>${label}</strong>
        <small>${file}</small>
      </div>
    </figure>`;
}

function assetSlotUk(options) {
  return assetSlot({
    ...options,
    caption: options.caption || "AI-концепт для напряму дизайну. Не є реальним доказом роботи.",
    kindLabel: options.kindLabel || (options.type === "ai" ? "AI-концепт - потребує перевірки Віктора" : "Реальне фото")
  });
}

function conceptRescueSlider(lang = "de") {
  const de = lang === "de";
  return `
    <figure class="before-after-slider" data-before-after-slider style="--split:52%" aria-label="${de ? "AI-Konzept Vorher Nachher Vergleich" : "AI concept before after comparison"}">
      <div class="before-after-stage">
        <img class="after-img" src="__ASSET_PREFIX__assets/img/concepts/nachher-concept.jpg" alt="${de ? "AI-Konzept: mögliche Erholung nach korrekter Niwaki-Pflege" : "AI concept: possible recovery after correct niwaki care"}" loading="lazy" decoding="async" width="1200" height="900">
        <div class="before-layer">
          <img src="__ASSET_PREFIX__assets/img/concepts/vorher-dying-concept.jpg" alt="${de ? "AI-Konzept: Problemzustand mit trockenen Nadeln und Formverlust" : "AI concept: stressed tree with dry needles and lost form"}" loading="lazy" decoding="async" width="1200" height="900">
        </div>
        <span class="slider-badge slider-badge-before">${de ? "Vorher-Konzept" : "Before concept"}</span>
        <span class="slider-badge slider-badge-after">${de ? "Nachher-Konzept" : "After concept"}</span>
      </div>
      <input class="before-after-range" type="range" min="8" max="92" value="52" aria-label="${de ? "Vergleich schieben" : "Slide comparison"}">
      <figcaption class="asset-caption">AI-Konzeptvisualisierung - nicht reale Kundenarbeit. Reale Vorher/Nachher-Fotos werden nach Freigabe ersetzt.</figcaption>
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
    sameAs: [instagramUrl, facebookUrl]
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
    ["Home", "index.html"],
    ["Services", "leistungen.html"],
    ["Philosophy", "philosophie.html"],
    ["Gallery", "galerie.html"],
    ["Prices", "preise.html"],
    ["Knowledge", "blog/index.html"],
    ["Contact", "kontakt.html"]
  ];
  const ukLinks = [
    ["Головна", "index.html"],
    ["Послуги", "leistungen.html"],
    ["Філософія", "philosophie.html"],
    ["Галерея", "galerie.html"],
    ["Ціни", "preise.html"],
    ["Знання", "blog/index.html"],
    ["Контакт", "kontakt.html"]
  ];
  const links = lang === "en" ? enLinks : lang === "uk" ? ukLinks : deLinks;
  return links
    .map(([label, target]) => {
      const localizedTarget = localizedFile(target, lang);
      const active = file === localizedTarget ? " aria-current=\"page\"" : "";
      return `<a href="${prefix}${localizedTarget}"${active}>${label}</a>`;
    })
    .join("");
}

function layout({ file, lang = "de", title, description, body, jsonLd = [], pageClass = "" }) {
  const prefix = prefixFor(file);
  const bodyWithAssetPrefix = body.replaceAll("__ASSET_PREFIX__", prefix);
  const canonicalPath = pagePathFromFile(file, lang);
  const basePath = canonicalPath.replace(/^\/(en|uk)(?=\/|$)/, "") || "/";
  const dePath = basePath;
  const enPath = basePath === "/" ? "/en/" : `/en${basePath}`;
  const ukPath = basePath === "/" ? "/uk/" : `/uk${basePath}`;
  const languageSwitch = [
    ["DE", dePath],
    ["EN", enPath],
    ["UA", ukPath]
  ].map(([label, targetPath]) => `<a href="${prefix}${fileFromCleanPath(targetPath)}"${targetPath === canonicalPath ? " aria-current=\"true\"" : ""}>${label}</a>`).join(" / ");
  const home = `${prefix}${localizedFile("index.html", lang)}`;
  const contact = `${prefix}${localizedFile("kontakt.html", lang)}`;
  const legal = `${prefix}${localizedFile("impressum.html", lang)}`;
  const privacy = `${prefix}${localizedFile("datenschutz.html", lang)}`;
  const services = `${prefix}${localizedFile("leistungen.html", lang)}`;
  const ui = lang === "uk"
    ? {
        htmlLang: "uk",
        skip: "Перейти до змісту",
        menu: "Відкрити меню",
        photoDiagnosis: "Безкоштовна фото-діагностика",
        brandLine: "Формовані дерева · Niwaki · Evergreen Design",
        footerDescription: "Японська деревна архітектура, niwaki, садовий бонсай і формування дерев у регіоні Цюриха.",
        footerServices: "Послуги",
        footerNiwaki: "Niwaki",
        footerMaples: "Японські клени",
        footerConifers: "Хвойні дерева",
        footerAreas: "Кантони",
        footerContact: "Контакт",
        legalLabel: "Юридична інформація",
        mobilePhoto: "Надіслати фото",
        whatsappHref: whatsappHrefUk,
        credit: "Website by Andrii · Статус: юридичні дані, endpoint форми, GA4, Ads і фінальні фото потребують перевірки перед публікацією.",
        quickBar: "Швидка панель контакту",
        call: "Подзвонити",
        hideLabels: "Сховати concept-labels",
        showLabels: "Показати concept-labels",
        consent: "Аналітика й Ads-вимірювання працюють тільки після згоди. Стандарт: відхилено.",
        privacyLabel: "Приватність",
        deny: "Відхилити",
        accept: "Прийняти"
      }
    : lang === "de"
      ? {
          htmlLang: "de-CH",
          skip: "Zum Inhalt springen",
          menu: "Menü öffnen",
          photoDiagnosis: "Kostenlose Foto-Diagnose",
          brandLine: "Formgehölze · Niwaki · Evergreen Design",
          footerDescription: "Japanische Baumkunst, Niwaki, Garten-Bonsai und Formschnitt in der Region Zürich.",
          footerServices: "Leistungen",
          footerNiwaki: "Niwaki",
          footerMaples: "Japanische Ahorne",
          footerConifers: "Nadelgehölze",
          footerAreas: "Kantone",
          footerContact: "Kontakt",
          legalLabel: "Impressum",
          mobilePhoto: "Foto senden",
          whatsappHref,
          credit: "Website by Andrii · Status: legal data, form endpoint, GA4, Ads and final photos need review before publication.",
          quickBar: "Schnelle Kontaktleiste",
          call: "Anrufen",
          hideLabels: "Konzept-Labels aus",
          showLabels: "Konzept-Labels an",
          consent: "Wir nutzen Analyse- und Ads-Messung erst nach Ihrer Zustimmung. Standard: abgelehnt.",
          privacyLabel: "Datenschutz",
          deny: "Ablehnen",
          accept: "Akzeptieren"
        }
      : {
          htmlLang: "en",
          skip: "Skip to content",
          menu: "Open menu",
          photoDiagnosis: "Free photo diagnosis",
          brandLine: "Shaped trees · Niwaki · Evergreen Design",
          footerDescription: "Japanese tree art, niwaki, garden bonsai and shaping in the Zurich region.",
          footerServices: "Services",
          footerNiwaki: "Niwaki",
          footerMaples: "Japanese maples",
          footerConifers: "Conifers",
          footerAreas: "Cantons",
          footerContact: "Contact",
          legalLabel: "Legal Notice",
          mobilePhoto: "Send photo",
          whatsappHref,
          credit: "Website by Andrii · Status: legal data, form endpoint, GA4, Ads and final photos need review before publication.",
          quickBar: "Quick contact bar",
          call: "Call",
          hideLabels: "Hide concept labels",
          showLabels: "Show concept labels",
          consent: "Analytics and ads measurement only run after consent. Default: denied.",
          privacyLabel: "Privacy",
          deny: "Deny",
          accept: "Accept"
        };
  return `<!doctype html>
<html lang="${ui.htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="google-site-verification" content="PLATZHALTER">
  <link rel="canonical" href="${cleanUrl(canonicalPath)}">
  <link rel="alternate" hreflang="de-CH" href="${cleanUrl(dePath)}">
  <link rel="alternate" hreflang="en" href="${cleanUrl(enPath)}">
  <link rel="alternate" hreflang="uk" href="${cleanUrl(ukPath)}">
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
  <a class="skip-link" href="#main">${ui.skip}</a>
  <header class="site-header" data-header>
    <a class="brand" href="${home}" aria-label="${brandWordmark}">
      <img class="brand-logo" src="${prefix}assets/img/logo.png" alt="${brandWordmark}" loading="lazy" decoding="async" width="44" height="44">
      <span class="brand-text">
        <span class="brand-name">${brandWordmark}</span>
        <span class="brand-line">${ui.brandLine}</span>
      </span>
    </a>
    <button class="nav-toggle" type="button" data-nav-toggle aria-controls="site-nav" aria-expanded="false">
      <span></span><span></span><span></span>
      <span class="sr-only">${ui.menu}</span>
    </button>
    <nav class="site-nav" id="site-nav" data-nav>
      ${nav(lang, prefix, file)}
      <span class="lang-switch" aria-label="Language switcher">${languageSwitch}</span>
    </nav>
  </header>

  <main id="main">
    ${bodyWithAssetPrefix}
  </main>

  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <a class="footer-brand" href="${home}">${brandWordmark}</a>
        <p>${ui.footerDescription}</p>
        <img class="footer-logo" src="${prefix}assets/img/logo.png" alt="${brandWordmark} logo" loading="lazy" decoding="async" width="240" height="120">
      </div>
      <div>
        <h2>${ui.footerServices}</h2>
        <a href="${services}#niwaki">${ui.footerNiwaki}</a>
        <a href="${services}#ahorn">${ui.footerMaples}</a>
        <a href="${services}#nadelgehoelze">${ui.footerConifers}</a>
      </div>
      <div>
        <h2>${ui.footerAreas}</h2>
        <p>Zürich · Zug · Luzern · Aargau · Schwyz · Schaffhausen · Appenzell · Glarus</p>
      </div>
      <div>
        <h2>${ui.footerContact}</h2>
        <a href="${contact}">${ui.photoDiagnosis}</a>
        <a href="${instagramUrl}" target="_blank" rel="noopener">Instagram</a>
        <a href="${facebookUrl}" target="_blank" rel="noopener">Facebook</a>
        <a href="${legal}">${ui.legalLabel}</a>
        <a href="${privacy}">${ui.privacyLabel}</a>
      </div>
    </div>
    <p class="site-credit">${ui.credit}</p>
  </footer>

  <div class="mobile-cta" aria-label="${ui.quickBar}">
    <a href="${ui.whatsappHref}" data-event="cta_whatsapp_click" target="_blank" rel="noopener">${ui.mobilePhoto}</a>
    <a href="${telHref}" data-event="cta_call_click" aria-label="${ui.call}">☎</a>
  </div>

  <button class="presentation-toggle" type="button" data-presentation-toggle aria-pressed="false" data-label-hide="${ui.hideLabels}" data-label-show="${ui.showLabels}">${ui.hideLabels}</button>

  <div class="cookie-banner" data-consent-banner hidden>
    <p>${ui.consent} <a href="${privacy}">${ui.privacyLabel}</a></p>
    <div>
      <button class="btn btn-secondary" type="button" data-consent-deny>${ui.deny}</button>
      <button class="btn btn-primary" type="button" data-consent-accept>${ui.accept}</button>
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
    <div class="hero-media">${assetSlot({ type: "ai", file: "hero-garten-alt.jpg", label: "Niwaki im Schweizer Garten", ratio: "16 / 9", className: "hero-slot" })}</div>
    <div class="hero-panel">
      <span class="eyebrow">FORMGEHÖLZE · NIWAKI · EVERGREEN DESIGN · JAPANISCHE GARTENKUNST</span>
      <h1>Niwaki & japanische Baumkunst.<br><span>Mit Schweizer Präzision.</span></h1>
      <p class="motto">Schweizer Qualität in Resonanz mit japanischer Philosophie.</p>
      <p>Als Meister für <strong>Niwaki und Garten-Bonsai</strong> in der <strong>Region Zürich</strong> forme und pflege ich seit 27 Jahren japanische Ahorne, Kiefern und Nadelgehölze - so, dass Ihr Baum über Jahre seine Form, seine Kraft und seine Gesundheit behält.</p>
      <div class="btn-row">${cta("Foto senden - kostenlose Diagnose")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Rückruf anfordern</a></div>
      <div class="trust-row"><span>27 Jahre Erfahrung</span><span>Region Zürich</span><span>Inspiriert in Japan</span></div>
    </div>
  </section>

  <section class="section rescue-section">
    <div class="section-head">
      <span class="eyebrow">Vorher / Nachher als Konzept</span>
      <h2>Wenn der Schnitt wieder Luft, Licht und Ruhe zurückbringt.</h2>
      <p>Für die Präsentation zeigt diese AI-Konzeptvisualisierung den Kern von Viktors Arbeit: nicht „grün machen“, sondern die Architektur des Baumes wieder lesbar machen. Reale Kundenfotos ersetzen diese Bilder nach Freigabe.</p>
    </div>
    ${conceptRescueSlider("de")}
    <div class="btn-row"><a class="btn btn-secondary" href="galerie.html">Galerie und reale Foto-Slots ansehen</a></div>
  </section>

  <section class="section split sanctuary-section">
    <div>
      <span class="eyebrow">Der eigentliche Wert</span>
      <h2>Der Garten ist der ruhigste Raum des Hauses.</h2>
      <p>Ein Niwaki wird nicht nur gepflegt, damit er „ordentlich“ aussieht. Er verändert den Blick aus dem Haus: morgens beim Kaffee, abends auf der Terrasse, wenn Gäste kommen und der Garten still wirkt, präzise und lebendig zugleich.</p>
      <p>Darum arbeite ich nicht für den schnellen Effekt. Ein wertvoller Baum soll nach dem Schnitt nicht fremd wirken. Er soll so aussehen, als hätte er diese Form immer schon in sich getragen.</p>
      <div class="quiet-moments">
        <span>Morgens Kaffee</span>
        <span>Abends Terrasse</span>
        <span>Gäste mit Blick in den Garten</span>
      </div>
    </div>
    ${assetSlot({ type: "ai", file: "section-bg-soft.jpg", label: "Ruhiger Gartenmoment nach präziser Pflege", ratio: "16 / 9" })}
  </section>

  <section class="section split">
    <div>
      <span class="eyebrow">Naturgesetze</span>
      <h2>Naturgesetze kann man nicht ignorieren.</h2>
      <p>Zuerst braune Nadeln. Dann trockene Äste. Der Baum verliert einen Ast, dann zwei - und irgendwann seine Form. Der Grund ist fast immer derselbe: Es wurde an Zeit und Geld gespart. Doch Formschnitt ist Feinarbeit.</p>
      <p>Sie giessen, Sie pflegen - und trotzdem leidet der Baum. Es liegt fast nie am Besitzer. Es liegt am Schnitt: Wer vor mir an Ihrem Baum gearbeitet hat, hat gegen die Naturgesetze geschnitten.</p>
      <blockquote>Einen Ast abzuschneiden dauert eine Sekunde. Einen neuen wachsen zu lassen - Jahre.</blockquote>
    </div>
    ${assetSlot({ type: "ai", file: "sanctuary-coffee.jpg", label: "Stresszeichen an einer Kiefer vor der Diagnose", ratio: "16 / 9" })}
  </section>

  <section class="section split reverse">
    ${assetSlot({ file: "baumarchitektur-energiefluss-verstehen.png", label: "Baumarchitektur: Energiefluss verstehen", ratio: "4 / 3" })}
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
      <h2>Drei Jahre Arbeit - nicht drei schnelle Fotos.</h2>
      <p>Diese Bilder zeigen Phasen der Arbeit, nicht denselben Baum. Der echte Fortschritt entsteht im Kalender: erst Diagnose und Entlastung, dann selektives Wachstum, dann eine Form, die sich selbst trägt.</p>
    </div>
    <div class="timeline">
      <article>${assetSlot({ file: "meister-hands-01-v2.jpg", label: "Jahr 1 - Diagnose und erster sauberer Schnitt", ratio: "3 / 2" })}<h3>Jahr 1</h3><p>Problemstellen lesen, Totholz rausnehmen, Kraft neu verteilen.</p></article>
      <article>${assetSlot({ type: "ai", file: "detail-kerzen.jpg", label: "Jahr 2 - Wachstum selektiv führen", ratio: "3 / 2" })}<h3>Jahr 2</h3><p>Nur die richtigen Triebe bleiben. Licht und Luft öffnen die Krone.</p></article>
      <article>${assetSlot({ type: "ai", file: "section-bg-vision.jpg", label: "Jahr 3 - ruhige stabile Baumform", ratio: "3 / 2" })}<h3>Jahr 3</h3><p>Die Form trägt sich selbst, der Baum wirkt gewachsen, nicht geschnitten.</p></article>
    </div>
  </section>

  <section class="section signature-block">
    <div>
      <span class="eyebrow">Signatur-Angebot</span>
      <h2>Ihre persönliche Baum-Vision - kostenlos.</h2>
      <p>Senden Sie mir ein Foto Ihres Baumes. Sie erhalten zurück: meine ehrliche Einschätzung - in meinen eigenen Worten -, eine Visualisierung, wie Ihr Baum in drei Jahren aussehen kann, und, wenn er es wert ist, einen Platz in meinem Kalender.</p>
      <p><strong>Nur für ausgewählte Gärten.</strong></p>
      <div class="check-strip" aria-label="Baum-Check in drei Bildern">
        <span>1. Ganzer Baum</span>
        <span>2. Problemstelle</span>
        <span>3. Nahaufnahme</span>
      </div>
      ${cta("Foto senden - persönliche Baum-Vision erhalten")}
    </div>
    ${assetSlot({ type: "ai", file: "section-bg-vision.jpg", label: "Persönliche Baum-Vision", ratio: "16 / 9" })}
  </section>

  <section class="section split">
    <div>
      <span class="eyebrow">Blick in die Wurzeln</span>
      <h2>Gesundheit beginnt unter der Erde.</h2>
      <p>Wie beim Fundament eines Hauses beginnt alles unter der Erde. Der richtige Boden - Akadama, die passende Säure (pH 5,5-6,5), geprüfte Erden - ist die Basis für Gesundheit.</p>
      <a class="text-link" href="philosophie.html#wurzeln">Mehr über Boden und Wurzeln →</a>
    </div>
    ${assetSlot({ file: "meister-hands-01-v2.jpg", label: "Viktor beim Formschnitt einer Kiefer (Pinus)", ratio: "3 / 2" })}
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
    ${assetSlot({ type: "ai", file: "niwaki-service.jpg", label: "Niwaki / Garten-Bonsai - Konzeptvisualisierung", ratio: "4 / 3" })}
    <div><span class="eyebrow">Service 1</span><h2>Niwaki (Garten-Bonsai)</h2><p>Pflege und Formung von Niwaki - Bäumen im Garten, nicht im Topf. Systematischer Schnitt lenkt die Kraft des Baumes dorthin, wo sie gebraucht wird, und gibt jeder Wolke ihren eigenen Raum für Licht und Luft.</p>${cta("Foto senden")}</div>
  </section>
  <section class="section service-detail reverse" id="ahorn">
    ${assetSlot({ file: "ahorn-service.jpg", label: "Viktor bei der Arbeit am japanischen Ahorn", ratio: "4 / 3" })}
    <div><span class="eyebrow">Service 2</span><h2>Japanische Ahorne (Acer palmatum / dissectum)</h2><p>Saisonale Formung und Schnitt, Entfernung von Totholz aus dem Kroneninneren, Handarbeit gegen Pilze und Moos, architektonische Kronenarbeit. Viele Ahorne in der Schweiz wachsen ohne Pflege ein - ich öffne die Krone, bevor Pilze und Feuchtigkeit Schaden anrichten.</p>${cta("Ahorn-Foto senden")}</div>
  </section>
  <section class="section service-detail" id="nadelgehoelze">
    ${assetSlot({ type: "ai", file: "kiefer-service.jpg", label: "Kiefer Formschnitt mit Topiarschere", ratio: "4 / 3" })}
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
    ${assetSlot({ file: "boden-wurzeln.jpg", label: "Akadama Schweiz und gesunde Wurzeln", ratio: "3 / 2" })}
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
      ${assetSlot({ file: "meister-03.jpg", label: "Kieferpflege mit Topiarschere", ratio: "3 / 2" })}
    </div>
  </section>
  <section class="section">
    <div class="section-head"><span class="eyebrow">Konzeptvisualisierung</span><h2>Konzeptbilder für Beratung und Trust-Slot.</h2><p>Diese Bilder sind bewusst als AI-Konzeptvisualisierung markiert. Die Postkarte zeigt nur die gewünschte Richtung für den Japan-Trust-Slot; das reale Foto bleibt erforderlich.</p></div>
    <div class="gallery-teaser">
      ${assetSlot({ type: "ai", file: "concepts/vorher-dying-concept.jpg", label: "AI-Konzept: Problemzustand", ratio: "4 / 3" })}
      ${assetSlot({ type: "ai", file: "concepts/nachher-concept.jpg", label: "AI-Konzept: mögliche Erholung", ratio: "4 / 3" })}
      ${assetSlot({ type: "ai", file: "concepts/japan-postkarte-concept.jpg", label: "AI-Konzept: Japan-Trust-Slot / Postkarte", ratio: "4 / 3" })}
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

const blogArticlesDeV2 = [
  {
    slug: "topiarschere",
    title: "Warum ich mit der Topiarschere schneide",
    teaser: "Saubere Schnitte, weniger Faserverletzung und mehr Kontrolle als mit der Heckenschere.",
    image: "detail-schnitt.jpg",
    label: "Sauberer Schnitt mit japanischem Werkzeug"
  },
  {
    slug: "energie-krone",
    title: "Warum ich die Krone öffne",
    teaser: "Licht, Luft und Energieverteilung: warum ein wertvoller Baum nicht wie eine Hecke behandelt wird.",
    image: "niwaki-service.jpg",
    label: "Geöffnete Niwaki-Krone mit Wolkenform"
  },
  {
    slug: "kiefer-kerzen",
    title: "Kiefer-Kerzen: der richtige Moment",
    teaser: "Was die neuen Triebe einer Kiefer verraten und warum Timing wichtiger ist als Kraft.",
    image: "detail-kerzen.jpg",
    label: "Pinus-Kerzen als neues Wachstum"
  },
  {
    slug: "boden-wurzeln",
    title: "Der Boden entscheidet: Akadama & Wurzeln",
    teaser: "Das Fundament der Baumarchitektur: Wasser, Luft, Säure und gesunde Wurzeln.",
    image: "boden-wurzeln-v2.jpg",
    label: "Wurzel- und Substratkontrolle"
  },
  {
    slug: "klimastress",
    title: "Warum Premium-Gärten in der Schweiz mehr Diagnose brauchen",
    teaser: "Hitze, trockene Sommer und Starkregen machen wertvolle Solitärbäume empfindlicher.",
    image: "sanctuary-coffee.jpg",
    label: "Stresszeichen an einem wertvollen Gartenbaum"
  }
];

function sourceListV2(items) {
  return `<aside class="source-list"><h2>Fachliche Einordnung</h2><p>Diese Seite ersetzt keine Vor-Ort-Diagnose. Die Einordnung kombiniert Viktors Praxis mit öffentlich zugänglichen Fachquellen.</p><ul>${items.map(([label, href]) => `<li><a href="${href}" target="_blank" rel="noopener">${label}</a></li>`).join("")}</ul></aside>`;
}

function articleNavDeV2() {
  return `<nav class="article-nav" aria-label="Weitere Wissensartikel">${blogArticlesDeV2.map((article) => `<a href="${article.slug}.html">${article.title}</a>`).join("")}</nav>`;
}

function energyDiagramV2() {
  return `<div class="science-card diagram-card" aria-label="Energieverteilung im Baum">
    <svg viewBox="0 0 420 250" role="img" aria-labelledby="crown-energy-title">
      <title id="crown-energy-title">Krone, Stamm und Wurzeln als Energie-System</title>
      <path d="M210 36 C138 42 98 84 105 132 C110 174 154 182 210 160 C266 182 310 174 315 132 C322 84 282 42 210 36Z" class="svg-leaf"></path>
      <path d="M210 155 C204 180 194 204 178 232 M210 155 C218 182 232 205 250 232" class="svg-stem"></path>
      <path d="M178 232 C138 236 106 244 70 248 M250 232 C292 236 326 244 356 248" class="svg-root"></path>
      <text x="210" y="105">Krone: Hauptverbraucher</text>
      <text x="102" y="215">Wurzeln: Versorgung</text>
      <text x="298" y="195">Stamm: Leitung</text>
    </svg>
    <p>Viktors 70/20/10-Merksatz ist kein Laborprotokoll. Er ist eine einfache Arbeitskarte: zuerst verstehen, wo der Baum Kraft verbraucht, dann schneiden.</p>
  </div>`;
}

function stressChainV2() {
  return `<div class="science-card stress-chain">
    <span>Hitze</span><span>weniger Wasser</span><span>verdichteter Boden</span><span>dichte Krone</span><strong>Stress im Baum</strong>
  </div>`;
}

function blogIndexDeV2() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Wissen</span>
    <h1>Wissen für Niwaki, Ahorne und wertvolle Gartenbäume.</h1>
    <p>Fünf Artikel erklären Viktors Arbeit einfach, aber fachlich: Werkzeug, Kronenenergie, Kiefer-Kerzen, Wurzeln und Klimastress in Schweizer Premium-Gärten.</p>
  </section>
  <section class="section article-grid">
    ${blogArticlesDeV2.map((article) => `<article class="card article-card">${assetSlot({ type: "ai", file: article.image, label: article.label, ratio: "3 / 2" })}<span class="eyebrow">Wissen</span><h2>${article.title}</h2><p>${article.teaser}</p><a href="${article.slug}.html">Artikel lesen</a></article>`).join("")}
  </section>
  ${finalCtaDe("../")}`;
}

function articleTopiaryDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Topiarschere</span>
    <h1>Warum ich mit der Topiarschere schneide.</h1>
    ${assetSlot({ file: "meister-hands-01-v2.jpg", label: "Viktor mit Topiarschere an einer Kiefer", ratio: "16 / 9" })}
    <p>Ein guter Formschnitt beginnt nicht mit Tempo, sondern mit der Entscheidung, was der Baum in Zukunft tragen soll. Bei Niwaki, Kiefer-Formschnitt und japanischer Baumpflege reicht es nicht, die äussere Kontur schnell zu glätten. Der Baum ist kein grüner Block. Er ist ein lebendes System aus Krone, Stamm und Wurzeln.</p>
    <div class="comparison-grid"><div><h2>Heckenschere</h2><p>Schnell, breit, mechanisch. Gut für eine Hecke, riskant für einen wertvollen Solitärbaum. Sie kann feine Triebe reissen und eine dichte Aussenhaut erzeugen.</p></div><div><h2>Topiarschere</h2><p>Langsam, präzise, bewusst. Jeder Schnitt entscheidet, welche Knospe bleibt, wo Luft hineinkommt und wie sich die Wolke nächstes Jahr entwickelt.</p></div></div>
    <p>Zurückgerissene Fasern sind für den Baum keine Kleinigkeit. Er reagiert auf Verletzung, schliesst Wunden und verteilt Kraft neu. Was im ersten Moment ordentlich aussieht, kann dem Baum über Monate Energie nehmen, wenn der Schnitt zu grob, zu flächig oder zur falschen Zeit gemacht wurde.</p>
    <p>Mit der Topiarschere arbeite ich anders. Ich öffne nicht einfach Oberfläche. Ich suche die innere Linie: Welche Triebe bauen Zukunft? Welche machen Schatten? Wo muss Licht in die Krone, damit innen kein trockenes Holz entsteht?</p>
    ${assetSlot({ type: "ai", file: "werkzeug.jpg", label: "Japanische Werkzeuge für Feinarbeit", ratio: "4 / 3" })}
    <h2>Ein Schnitt ist eine Anweisung an den Baum.</h2>
    <p>Wenn ich eine Knospe stehen lasse, sage ich dem Baum: hier darf Kraft hin. Wenn ich einen Ast entferne, nehme ich eine Möglichkeit weg, die Jahre gebraucht hat. Deshalb passt Viktors Satz so gut: Einen Ast abzuschneiden dauert eine Sekunde. Einen neuen wachsen zu lassen - Jahre.</p>
    <p>Für Kunden ist das wichtig, weil ein wertvoller Gartenbaum kein Verbrauchsobjekt ist. Er prägt die Terrasse, den Blick aus dem Haus und die Ruhe des Gartens. Der billigste Schnitt ist oft der teuerste, wenn er die Form zerstört.</p>
    ${sourceListV2([["RHS: allgemeine Schnittregeln für Bäume und Koniferen", "https://www.rhs.org.uk/plants/types/trees/pruning-guide"], ["Purdue Extension: Heckenscheren sind für Hecken gedacht", "https://ag.purdue.edu/department/hla/extension/extension-publications-library/ext-pubs/ho-4-w.html"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Foto senden - Schnitt prüfen lassen")}</div>
  </article>`;
}

function articleCrownDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Krone & Energie</span>
    <h1>Warum ich die Krone öffne.</h1>
    ${assetSlot({ type: "ai", file: "niwaki-service.jpg", label: "Niwaki-Krone mit Raum für Licht und Luft", ratio: "16 / 9" })}
    <p>Viele wertvolle Bäume verlieren nicht zuerst ihre Schönheit. Sie verlieren ihren inneren Raum. Aussen sieht die Krone noch grün aus, innen aber sammeln sich Schatten, Feuchtigkeit, Totholz und schwache Triebe. Genau dort beginnt der Unterschied zwischen Formschnitt und Baumarchitektur.</p>
    ${energyDiagramV2()}
    <p>Viktor arbeitet mit einem einfachen Bild: Die Krone ist der grosse Energieverbraucher, der Stamm leitet, die Wurzeln versorgen. Wenn die Krone zu dicht wird, verbraucht sie Kraft an den falschen Stellen. Wenn oben zu stark wächst, wird unten schwach. Wenn innen kein Licht mehr ankommt, stirbt die Struktur von innen heraus.</p>
    <h2>Die Krone wird nicht leer gemacht. Sie wird lesbar gemacht.</h2>
    <p>Öffnen bedeutet nicht, den Baum radikal auszudünnen. Es bedeutet, die richtigen Fenster zu schaffen: Luft durch die Krone, Licht auf innere Knospen, weniger Reibung zwischen Ästen, weniger Feuchtigkeit in engen Bereichen. Gute Arbeit sieht am Ende natürlich aus, nicht geschnitten.</p>
    <div class="process-grid"><div><strong>1. Lesen</strong><p>Wo fliesst Kraft? Welche Linie trägt den Charakter?</p></div><div><strong>2. Entlasten</strong><p>Totholz, falsche Triebe und Schattenzonen werden reduziert.</p></div><div><strong>3. Zukunft lassen</strong><p>Die Knospen, die Form aufbauen, bleiben bewusst stehen.</p></div></div>
    ${assetSlot({ type: "ai", file: "detail-ahorn-blatt.jpg", label: "Licht und Blattgesundheit am japanischen Ahorn", ratio: "3 / 2" })}
    <p>Für einen Premium-Garten ist das kein Detail. Die Krone bestimmt, wie der Baum vom Haus, von der Terrasse und vom Weg aus wirkt. Ein Meister sieht nicht nur das heutige Bild. Er sieht, was der Baum in einem, zwei und drei Jahren daraus macht.</p>
    ${sourceListV2([["RHS: Koniferen nur vorsichtig und meist am neuen Wachstum schneiden", "https://www.rhs.org.uk/plants/types/trees/pruning-guide"], ["Purdue Extension: Schnitt verändert Wachstum und Verzweigung", "https://ag.purdue.edu/department/hla/extension/extension-publications-library/ext-pubs/ho-4-w.html"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Foto senden - Kronenstruktur prüfen")}</div>
  </article>`;
}

function articleCandlesDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Pinus</span>
    <h1>Kiefer-Kerzen: der richtige Moment entscheidet.</h1>
    ${assetSlot({ type: "ai", file: "detail-kerzen.jpg", label: "Neue Pinus-Kerzen vor dem Schnitt", ratio: "16 / 9" })}
    <p>Bei Kiefern beginnt die Zukunft oft als Kerze: ein heller, weicher neuer Trieb. Für Laien sieht er unscheinbar aus. Für Viktor zeigt er, wie viel Kraft der Baum gerade nach oben, nach aussen oder in eine bestimmte Wolke schickt.</p>
    <p>Wer Kiefer-Kerzen zu grob, zu spät oder überall gleich behandelt, nimmt dem Baum die Balance. Wer sie liest, kann Wachstum bremsen, Kraft verteilen und die Wolken feiner machen. Genau deshalb ist Timing bei Pinus wichtiger als rohe Kraft.</p>
    <div class="process-grid"><div><strong>Früh</strong><p>Der neue Trieb ist weich. Der Baum zeigt Richtung und Energie.</p></div><div><strong>Selektiv</strong><p>Starke Zonen werden beruhigt, schwache Zonen werden geschützt.</p></div><div><strong>Langfristig</strong><p>Das Ziel ist keine kahle Form, sondern dichte, gesunde Verzweigung.</p></div></div>
    ${assetSlot({ type: "ai", file: "kiefer-service.jpg", label: "Geformte Kiefer im Schweizer Garten", ratio: "4 / 3" })}
    <h2>Nicht jede Kerze wird gleich behandelt.</h2>
    <p>Eine starke obere Zone braucht andere Arbeit als ein schwacher innerer Bereich. Manche Triebe bleiben, weil sie Zukunft bauen. Andere werden gekürzt, weil sie die Form dominieren. Genau hier entsteht der Unterschied zwischen Schema und Meisterarbeit.</p>
    <p>Für Kunden ist die einfache Regel: Wenn eine Kiefer innen trocken wird, braune Nadeln zeigt oder ihre Wolken schwer und dicht werden, sollte man nicht warten, bis grosse Äste absterben. Ein früher Foto-Check ist oft genug, um zu entscheiden, ob ein Vor-Ort-Termin sinnvoll ist.</p>
    ${sourceListV2([["NAJGA: Timing und Wirkung beim Schnitt japanischer Schwarzkiefer", "https://najga.org/pruning-japanese-black-pine/"], ["Chicago Botanic Garden: Was Candling bei Kiefern bedeutet", "https://www.chicagobotanic.org/blog/learning/candling-japanese-garden"], ["RHS: Koniferen und neues Wachstum", "https://www.rhs.org.uk/plants/types/trees/pruning-guide"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Kiefer-Foto senden")}</div>
  </article>`;
}

function articleSoilDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Akadama & Wurzeln</span>
    <h1>Der Boden entscheidet: Akadama & Wurzeln.</h1>
    ${assetSlot({ type: "ai", file: "boden-wurzeln-v2.jpg", label: "Akadama, Wasserführung und gesunde Wurzeln", ratio: "16 / 9" })}
    <p>Ein Baum steht nicht nur auf dem Boden. Er lebt aus ihm. Wie bei einem Haus entscheidet das Fundament, ob die sichtbare Form stabil bleibt. Bei japanischen Ahornen, Garten-Bonsai und Niwaki beginnt Gesundheit deshalb unter der Erde: bei Struktur, Wasserführung, Luft und Säure.</p>
    <div class="science-card"><h2>Die einfache Formel</h2><p><strong>Wurzeln brauchen Wasser und Luft.</strong> Zu trocken ist Stress. Zu nass ist ebenfalls Stress. Zu verdichtet bedeutet: wenig Sauerstoff, schwache Feinwurzeln, schlechte Reaktion in der Krone.</p></div>
    <p>Akadama, Kanuma und Pemza sind nicht einfach schöne Namen aus Japan. Sie helfen, Wasser und Luft so zu führen, dass die Wurzeln arbeiten können. Für viele japanische Ahorne ist ein leicht saurer Bereich von etwa pH 5,5-6,5 sinnvoll. Ist der Boden zu schwer, zu nass oder zu verdichtet, steigen Stress, Moosdruck und Pilzrisiko.</p>
    ${assetSlot({ type: "ai", file: "detail-moos.jpg", label: "Moos, Feuchtigkeit und Mikroklima am Stamm", ratio: "3 / 2" })}
    <h2>Warum ein Kronenproblem oft im Boden beginnt.</h2>
    <p>Wenn ein Baum Nadeln verliert, innen trocken wird oder nach dem Schnitt nicht sauber reagiert, reicht der Blick auf die Krone nicht. Standort, Substrat, Wasser und Pflege gehören zur Diagnose. Ein Schnitt kann viel korrigieren, aber er ersetzt kein gesundes Fundament.</p>
    <p>Darum fragt Viktor nicht nur: Welche Form wünschen Sie? Er fragt: Wie steht der Baum? Wie fliesst Wasser ab? Wo ist Schatten? Wie wurde vorher geschnitten? Erst dann ist eine ehrliche Empfehlung möglich.</p>
    ${sourceListV2([["WSL: Wetterextreme und Trockenheit setzen Bäume unter Stress", "https://www.wsl.ch/en/natural-hazards/weather-and-climate-extremes-and-drought/"], ["BAFU: Dürre-Monitoring und Warnsystem Schweiz", "https://www.bafu.admin.ch/en/drought"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Foto vom Baum und Boden senden")}</div>
  </article>`;
}

function articleClimateDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Schweiz & Klimastress</span>
    <h1>Warum Premium-Gärten in der Schweiz mehr Diagnose brauchen.</h1>
    ${assetSlot({ type: "ai", file: "sanctuary-coffee.jpg", label: "Stresszeichen an einer wertvollen Kiefer", ratio: "16 / 9" })}
    <p>Ein schöner Schweizer Garten ist heute nicht nur Dekoration. Er ist ein kühler Raum, ein Rückzugsort, ein Teil des Hauses. Genau deshalb tut es weh, wenn ein Solitärbaum langsam seine Form verliert: Der Blick aus dem Wohnzimmer verändert sich, die Terrasse verliert Ruhe, und ein jahrelang gewachsener Wert wird unsicher.</p>
    ${stressChainV2()}
    <p>Die Schweiz ist vom Klimawandel stark betroffen. MeteoSwiss beschreibt mehr extreme Hitze, trockenere Sommer und intensivere Niederschläge als zentrale Risiken. Für Gartenbäume bedeutet das: Wasserstress, Hitze, verdichtete Böden und falscher Schnitt wirken nicht getrennt. Sie verstärken sich.</p>
    <p>Ein dichter, falsch geschnittener Baum leidet in solchen Phasen schneller. Innen bleibt Feuchtigkeit stehen, aussen trocknet die Krone, Wurzeln arbeiten unter Stress. Bei wertvollen Niwaki, Kiefern und japanischen Ahornen ist deshalb die frühe Diagnose wichtiger als ein später Rettungsversuch.</p>
    <div class="process-grid"><div><strong>Frühzeichen</strong><p>Braune Nadeln, trockene Innenäste, schwacher Austrieb.</p></div><div><strong>Kontext</strong><p>Standort, Hitze, Wasserführung, Substrat, vorheriger Schnitt.</p></div><div><strong>Entscheidung</strong><p>Foto-Diagnose zuerst, Vor-Ort-Termin nur wenn sinnvoll.</p></div></div>
    ${assetSlot({ type: "ai", file: "section-bg-soft.jpg", label: "Erholte Form nach ruhiger Kronenarbeit", ratio: "16 / 9" })}
    <h2>Premium heisst: nicht warten, bis es billig aussieht.</h2>
    <p>Wer viel in Haus, Terrasse und Garten investiert, sollte den wichtigsten Baum nicht wie eine Hecke behandeln lassen. Eine ehrliche Diagnose schützt vor zwei Fehlern: zu spät reagieren oder zu schnell schneiden. Beides kann Jahre kosten.</p>
    <p>Viktors Ansatz passt zu dieser Realität: erst sehen, dann entscheiden. Drei Fotos reichen oft für die erste Einschätzung: ganzer Baum, Problemstelle, Nahaufnahme.</p>
    ${sourceListV2([["MeteoSwiss: Klimawandel in der Schweiz, Hitze und trockenere Sommer", "https://www.meteoswiss.admin.ch/climate/climate-change.html"], ["BAFU: Dürre nimmt in der Schweiz zu", "https://www.bafu.admin.ch/en/drought"], ["WSL: Wetterextreme, Dürre und Anpassung", "https://www.wsl.ch/en/natural-hazards/weather-and-climate-extremes-and-drought/"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Foto senden - Klimastress einschätzen")}</div>
  </article>`;
}

function contactDe() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Kontakt</span>
    <h1>Senden Sie mir ein Foto.</h1>
    <p>Drei Fotos genügen für eine erste Einschätzung: der ganze Baum, die Problemstelle, eine Nahaufnahme. Ich sage Ihnen kostenlos, ob und wie er zu retten ist.</p>
    <div class="btn-row">${cta("WhatsApp öffnen - Fotos senden")} <a class="btn btn-secondary" href="${telHref}" data-event="cta_call_click">Anrufen: ${phoneDisplay}</a></div>
  </section>
  <section class="section contact-grid">
    <form class="form-card" data-event="contact_form_submit" action="${formspreeAction}" method="post" enctype="multipart/form-data">
      <h2>Foto-Diagnose anfragen.</h2>
      <p class="form-note">Dieses Formular bleibt inaktiv, bis der Formspree-Endpunkt eingesetzt ist. WhatsApp ist aktuell der primäre Kontaktweg.</p>
      <label>Name <input name="name" autocomplete="name" required></label>
      <label>E-Mail <input type="email" name="email" autocomplete="email" required></label>
      <label>Kanton <input name="kanton" autocomplete="address-level1" required></label>
      <label>Baumart <input name="baumart" placeholder="z.B. Acer palmatum, Kiefer, Taxus"></label>
      <label>Nachricht <textarea name="nachricht" rows="5" required></textarea></label>
      <label>Fotos <input type="file" name="fotos" multiple accept="image/*"></label>
      <button class="btn btn-primary" type="submit">Anfrage vorbereiten</button>
    </form>
    <form class="form-card" id="rueckruf" data-event="cta_rueckruf_submit" action="${formspreeAction}" method="post" enctype="multipart/form-data">
      <h2>Rückruf anfordern.</h2>
      <label>Name <input name="name" autocomplete="name" required></label>
      <label>Telefon <input type="tel" name="telefon" autocomplete="tel" required></label>
      <label>Wunsch-Zeitfenster <input name="zeitfenster" placeholder="z.B. Mo 18-20 Uhr"></label>
      <button class="btn btn-secondary" type="submit">Rückruf vorbereiten</button>
      <p class="form-note">Dieses Formular bleibt inaktiv, bis der Formspree-Endpunkt eingesetzt ist. WhatsApp ist aktuell der primäre Kontaktweg.</p>
    </form>
  </section>`;
}

function legalDe(kind) {
  const isPrivacy = kind === "datenschutz";
  return `
  <!-- Draft legal page: must be reviewed and completed by Viktor/Andrii before publication. -->
  <section class="page-hero section legal">
    <span class="eyebrow">Entwurf</span>
    <h1>${isPrivacy ? "Datenschutzerklärung" : "Impressum"}.</h1>
    <p>Diese Seite ist strukturiert, aber nicht final. Alle rechtlichen Angaben müssen vor Veröffentlichung geprüft und ergänzt werden.</p>
  </section>
  <section class="section legal-content">
    <h2>${isPrivacy ? "Verantwortliche Stelle" : "Angaben gemäss Schweizer Recht"}</h2>
    <p>${brand}<br>Adresse folgt nach Freigabe<br>Schweiz</p>
    <h2>Kontakt</h2>
    <p>Telefon und E-Mail folgen nach Freigabe.</p>
    <h2>${isPrivacy ? "Personendaten, Formulare und Analyse" : "Haftung für Inhalte"}</h2>
    <p>${isPrivacy ? "Kontaktformulare, Foto-Uploads, Analytics und Ads-Messung werden erst nach finaler technischer und rechtlicher Prüfung produktiv geschaltet. Google Consent Mode ist im Code vorbereitet; externe IDs sind noch nicht aktiv." : "Die Inhalte werden sorgfältig erstellt. Für Vollständigkeit, Richtigkeit und Aktualität wird bis zur finalen Freigabe keine Gewähr übernommen."}</p>
    <h2>${isPrivacy ? "Cookies und Einwilligung" : "Haftung für Links"}</h2>
    <p>${isPrivacy ? "Analyse- und Marketing-Speicher sind standardmässig abgelehnt und werden erst nach Zustimmung aktiviert. Externe Dienste bleiben bis zur finalen Konfiguration deaktiviert." : "Externe Links werden vor Veröffentlichung geprüft. Für Inhalte externer Seiten sind ausschliesslich deren Betreiber verantwortlich."}</p>
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
    ${assetSlot({ type: "ai", file: "hero-garten-alt.jpg", label: "Theme preview image slot", ratio: "16 / 9" })}
  </section>`;
}

function homeEn() {
  return `
  <section class="hero section">
    <div class="hero-media">${assetSlot({ type: "ai", file: "hero-garten-alt.jpg", label: "Niwaki in a Swiss garden", ratio: "16 / 9", className: "hero-slot" })}</div>
    <div class="hero-panel">
      <span class="eyebrow">NIWAKI · GARDEN BONSAI · EVERGREEN DESIGN · JAPANESE GARDEN ART</span>
      <h1>Niwaki and Japanese tree art.<br><span>With Swiss precision.</span></h1>
      <p class="motto">Swiss quality in resonance with Japanese philosophy.</p>
      <p>For clients in the Zurich region, Viktor shapes and cares for Japanese maples, pines and conifers so that a valuable tree keeps its form, strength and health for years.</p>
      <div class="btn-row">${cta("Send photo - free diagnosis")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Request callback</a></div>
      <div class="trust-row"><span>27 years of experience</span><span>Zurich region</span><span>Inspired in Japan</span></div>
    </div>
  </section>
  <section class="section rescue-section"><div class="section-head"><span class="eyebrow">Before / after concept</span><h2>When the right cut brings back air, light and calm.</h2><p>For the presentation, this AI concept visualizes Viktor's core promise: not making a tree merely green, but making its living architecture readable again. Real client photos replace these images after approval.</p></div>${conceptRescueSlider("en")}<div class="btn-row"><a class="btn btn-secondary" href="galerie.html">View gallery and real photo slots</a></div></section>
  <section class="section split sanctuary-section"><div><span class="eyebrow">The real value</span><h2>The garden is the quietest room of the house.</h2><p>A niwaki is not shaped only to look tidy. It changes the view from the house: morning coffee, an evening on the terrace, guests arriving and seeing a garden that feels calm, precise and alive.</p><p>Viktor does not shape for a quick effect. A valuable tree should not look forced after the cut. It should look as if the form was already waiting inside it.</p><div class="quiet-moments"><span>Morning coffee</span><span>Evening terrace</span><span>Guests with a garden view</span></div></div>${assetSlot({ type: "ai", file: "section-bg-soft.jpg", label: "Quiet garden moment after precise care", ratio: "16 / 9" })}</section>
  <section class="section split"><div><h2>Nature's laws cannot be ignored.</h2><p>Brown needles, dry branches and lost shape usually have one cause: the tree was cut too quickly or too cheaply. Fine shaping respects light, air and the energy distribution of the crown.</p><blockquote>Cutting a branch takes a second. Growing a new one takes years.</blockquote></div>${assetSlot({ type: "ai", file: "sanctuary-coffee.jpg", label: "Stress signs on a pine before diagnosis", ratio: "16 / 9" })}</section>
  <section class="section"><div class="section-head"><h2>Core services.</h2><p>Niwaki, Japanese maples and conifers up to 3 m; larger trees by arrangement.</p></div><div class="card-grid three">${serviceCardsEn}</div></section>
  <section class="section" id="vision" data-event-section="vision_section_view"><div class="section-head"><h2>Three years of work, not three quick photos.</h2><p>These images show phases of the work, not the same tree. Real progress happens in the calendar: diagnosis and relief, selective growth, then a form that carries itself.</p></div><div class="timeline"><article>${assetSlot({ file: "meister-hands-01-v2.jpg", label: "Year 1 - diagnosis and first clean cut", ratio: "3 / 2" })}<h3>Year 1</h3><p>Read problem areas, remove deadwood, redistribute strength.</p></article><article>${assetSlot({ type: "ai", file: "detail-kerzen.jpg", label: "Year 2 - guide selective growth", ratio: "3 / 2" })}<h3>Year 2</h3><p>The right shoots remain. Light and air open the crown.</p></article><article>${assetSlot({ type: "ai", file: "section-bg-vision.jpg", label: "Year 3 - calm stable tree form", ratio: "3 / 2" })}<h3>Year 3</h3><p>The form carries itself and no longer looks forced.</p></article></div></section>
  <section class="section signature-block"><div><span class="eyebrow">Signature offer</span><h2>Your personal tree vision - free.</h2><p>Send a photo of your tree. You receive Viktor's honest assessment and a visual idea of how the tree can look in three years, if it is worth taking into the calendar.</p><div class="check-strip" aria-label="Tree check in three images"><span>1. Whole tree</span><span>2. Problem area</span><span>3. Close-up</span></div>${cta("Send photo - get personal tree vision")}</div>${assetSlot({ type: "ai", file: "section-bg-vision.jpg", label: "Personal tree vision", ratio: "16 / 9" })}</section>
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
      body: `<div class="gallery-teaser">${assetSlot({ file: "vorher-nachher-01.jpg", label: "Before/after 01", ratio: "4 / 3" })}${assetSlot({ file: "vorher-nachher-02.jpg", label: "Before/after 02", ratio: "4 / 3" })}${assetSlot({ file: "meister-01.jpg", label: "Master at work", ratio: "3 / 2" })}</div><div class="section-head"><span class="eyebrow">Concept visualization</span><h2>Japan trust-slot concept.</h2><p>This postcard image is an AI concept only. A real Japan postcard photo is still required before public proof use.</p></div><div class="gallery-teaser">${assetSlot({ type: "ai", file: "concepts/japan-postkarte-concept.jpg", label: "AI concept: Japan trust-slot postcard", ratio: "4 / 3" })}</div>`
    },
    prices: {
      h1: "Prices - quality before speed.",
      body: `<p>Professional Japanese tree care starts at 110 CHF per hour. Travel starts at 90 CHF depending on distance. The first photo diagnosis is free.</p><div class="price-grid"><article class="card"><h2>110 CHF/h</h2><p>Work from</p></article><article class="card"><h2>90 CHF</h2><p>Travel from</p></article><article class="card"><h2>Free</h2><p>Photo diagnosis</p></article></div>`
    }
  };
  return `<section class="page-hero section"><span class="eyebrow">English mirror</span><h1>${map[kind].h1}</h1>${map[kind].body}</section>${finalCtaEn()}`;
}

function contactEn() {
  return `<section class="page-hero section"><span class="eyebrow">Contact</span><h1>Send a photo.</h1><p>Three photos are enough for a first assessment: the whole tree, the problem area and a close-up.</p><div class="btn-row">${cta("Open WhatsApp - send photos")} <a class="btn btn-secondary" href="${telHref}" data-event="cta_call_click">Call: ${phoneDisplay}</a></div></section>
  <section class="section contact-grid"><form class="form-card" data-event="contact_form_submit" action="${formspreeAction}" method="post" enctype="multipart/form-data"><h2>Photo diagnosis.</h2><p class="form-note">This form is inactive until the Formspree endpoint is set. WhatsApp is the primary contact path for now.</p><label>Name <input name="name" required></label><label>Email <input type="email" name="email" required></label><label>Canton <input name="canton" required></label><label>Tree type <input name="tree"></label><label>Message <textarea name="message" rows="5"></textarea></label><label>Photos <input type="file" name="photos" multiple accept="image/*"></label><button class="btn btn-primary" type="submit">Prepare request</button></form><form class="form-card" id="rueckruf" data-event="cta_rueckruf_submit" action="${formspreeAction}" method="post" enctype="multipart/form-data"><h2>Request callback.</h2><p class="form-note">This form is inactive until the Formspree endpoint is set. WhatsApp is the primary contact path for now.</p><label>Name <input name="name" required></label><label>Phone <input name="phone" type="tel" required></label><label>Preferred time <input name="time"></label><button class="btn btn-secondary" type="submit">Prepare callback</button></form></section>`;
}

const blogArticlesEnV2 = [
  ["topiarschere", "Why Viktor cuts with topiary scissors", "Clean cuts, less tearing and more control than a hedge trimmer.", "detail-schnitt.jpg"],
  ["energie-krone", "Why the crown must be opened", "Light, air and energy distribution explained in simple language.", "niwaki-service.jpg"],
  ["kiefer-kerzen", "Pine candles: timing matters", "How new pine shoots guide the next year of shape.", "detail-kerzen.jpg"],
  ["boden-wurzeln", "The soil decides: Akadama and roots", "Water, air, pH and root health as the foundation of tree architecture.", "boden-wurzeln-v2.jpg"],
  ["klimastress", "Why Swiss premium gardens need diagnosis", "Heat, dry summers and heavy rain make early assessment more valuable.", "sanctuary-coffee.jpg"]
];

function articleNavEnV2() {
  return `<nav class="article-nav" aria-label="More knowledge articles">${blogArticlesEnV2.map(([slug, title]) => `<a href="${slug}.html">${title}</a>`).join("")}</nav>`;
}

function blogIndexEnV2() {
  return `<section class="page-hero section"><span class="eyebrow">Knowledge</span><h1>Knowledge about niwaki, maples and valuable garden trees.</h1><p>Five English mirror articles explain Viktor's craft: tools, crown energy, pine candles, roots and climate stress in Swiss premium gardens.</p></section><section class="section article-grid">${blogArticlesEnV2.map(([slug, title, teaser, image]) => `<article class="card article-card">${assetSlot({ type: "ai", file: image, label: title, ratio: "3 / 2" })}<span class="eyebrow">Knowledge</span><h2>${title}</h2><p>${teaser}</p><a href="${slug}.html">Read article</a></article>`).join("")}</section>${finalCtaEn("../")}`;
}

function articleEnV2(type) {
  const sources = `<aside class="source-list"><h2>Technical context</h2><p>This page combines Viktor's practice with public technical sources and does not replace an on-site assessment.</p><ul><li><a href="https://www.rhs.org.uk/plants/types/trees/pruning-guide" target="_blank" rel="noopener">RHS pruning guide</a></li><li><a href="https://www.meteoswiss.admin.ch/climate/climate-change.html" target="_blank" rel="noopener">MeteoSwiss climate change in Switzerland</a></li></ul></aside>`;
  if (type === "topiary") {
    return `<article class="article section"><span class="eyebrow">Topiary scissors</span><h1>Why Viktor cuts with topiary scissors.</h1>${assetSlot({ file: "meister-hands-01-v2.jpg", label: "Viktor with topiary scissors on a pine", ratio: "16 / 9" })}<p>A valuable niwaki is not a hedge. A hedge trimmer works fast over a surface; topiary scissors allow one deliberate cut at a time. Viktor decides which bud stays, where light should enter and how the cloud can develop next year.</p><p>The point is not romantic slowness. It is control. A clean, selective cut protects the future shape of the tree and prevents the quick outer shell that often leaves the inside weak and dry.</p>${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - check the cut")}</div></article>`;
  }
  if (type === "crown") {
    return `<article class="article section"><span class="eyebrow">Crown energy</span><h1>Why the crown must be opened.</h1>${assetSlot({ type: "ai", file: "niwaki-service.jpg", label: "Open niwaki crown", ratio: "16 / 9" })}<p>The crown is where a tree spends much of its visible energy. If it becomes too dense, the outside stays green while the inside loses light, air and structure. Viktor opens the crown so the tree can breathe and keep its form over years, not only after the first cut.</p>${energyDiagramV2()}${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - check crown structure")}</div></article>`;
  }
  if (type === "candles") {
    return `<article class="article section"><span class="eyebrow">Pinus</span><h1>Pine candles: timing matters.</h1>${assetSlot({ type: "ai", file: "detail-kerzen.jpg", label: "New pine candles", ratio: "16 / 9" })}<p>New pine shoots, or candles, show where the tree is pushing strength. Treating every candle the same is a mistake. Strong areas may need calming; weak areas may need protection. Timing and selectivity build refinement without exhausting the tree.</p><div class="process-grid"><div><strong>Read</strong><p>Where is the strongest push?</p></div><div><strong>Select</strong><p>Which shoots build the next cloud?</p></div><div><strong>Preserve</strong><p>Leave enough strength for recovery.</p></div></div>${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send pine photo")}</div></article>`;
  }
  if (type === "soil") {
    return `<article class="article section"><span class="eyebrow">Roots</span><h1>The soil decides: Akadama and roots.</h1>${assetSlot({ type: "ai", file: "boden-wurzeln-v2.jpg", label: "Roots and substrate", ratio: "16 / 9" })}<p>A tree lives from its foundation. Water, air, pH and root health decide whether the crown can react. If the soil is too dense, too wet or too dry, the visible problem often starts below the surface.</p><p>Viktor checks the tree as a system: crown, trunk, roots, water and location. A cut can correct a lot, but it cannot replace a healthy foundation.</p>${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send tree and soil photo")}</div></article>`;
  }
  return `<article class="article section"><span class="eyebrow">Swiss climate stress</span><h1>Why Swiss premium gardens need diagnosis.</h1>${assetSlot({ type: "ai", file: "sanctuary-coffee.jpg", label: "Stress signs on a valuable tree", ratio: "16 / 9" })}<p>Swiss gardens face more heat, drier summers and heavier rain events. For valuable solitary trees, this means water stress, dense crowns, compacted soil and old pruning mistakes can reinforce each other.</p>${stressChainV2()}<p>Early photo diagnosis protects value: the whole tree, the problem area and a close-up are often enough to decide whether an on-site visit makes sense.</p>${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - assess stress")}</div></article>`;
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

function finalCtaUk(contactPrefix = "") {
  return `<section class="section final-cta">
    <div>
      <span class="eyebrow">Безкоштовна перша оцінка</span>
      <h2>Готові зрозуміти, чи можна врятувати дерево?</h2>
      <p>Надішліть фото дерева і проблемної зони. Віктор чесно скаже, чи має сенс виїзд і який підхід може допомогти.</p>
      <div class="btn-row">${ctaUk("Надіслати фото - безкоштовна діагностика")} <a class="btn btn-secondary" href="${contactPrefix}kontakt.html#rueckruf" data-event="cta_callback_click">Запросити дзвінок</a></div>
    </div>
  </section>`;
}

const serviceCardsUk = `
  <div class="card service-card">
    <span class="eyebrow">Niwaki</span>
    <h3>Садовий бонсай</h3>
    <p>Формування дерев у саду, не в горщику. Крона відкривається так, щоб світло, повітря і сила дерева працювали на довгу форму.</p>
    <a href="leistungen.html#niwaki">Детальніше про Niwaki</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Acer palmatum</span>
    <h3>Японські клени</h3>
    <p>Сезонний ручний догляд, суха деревина всередині крони, мох, грибкові ризики і архітектура світла.</p>
    <a href="leistungen.html#ahorn">Догляд за японським кленом</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Pinus & Taxus</span>
    <h3>Хвойні дерева</h3>
    <p>Сосна, тис, ялівець, ялиця і смерека. Чистий ручний зріз тонким японським інструментом замість швидкого шаблону.</p>
    <a href="leistungen.html#nadelgehoelze">Формування сосни та хвойних</a>
  </div>`;

function homeUk() {
  return `
  <section class="hero section">
    <div class="hero-media">${assetSlotUk({ type: "ai", file: "hero-garten-alt.jpg", label: "Niwaki у швейцарському саду", ratio: "16 / 9", className: "hero-slot" })}</div>
    <div class="hero-panel">
      <span class="eyebrow">FORMGEHÖLZE · NIWAKI · EVERGREEN DESIGN · ЯПОНСЬКЕ САДОВЕ МИСТЕЦТВО</span>
      <h1>Niwaki і японська деревна архітектура.<br><span>Зі швейцарською точністю.</span></h1>
      <p class="motto">Швейцарська якість у резонансі з японською філософією.</p>
      <p>Віктор формує і доглядає <strong>Niwaki, садовий бонсай, японські клени, сосни і хвойні</strong> у регіоні Цюриха так, щоб дерево роками зберігало форму, силу і здоров'я.</p>
      <div class="btn-row">${ctaUk("Надіслати фото - безкоштовна діагностика")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Запросити дзвінок</a></div>
      <div class="trust-row"><span>27 років досвіду</span><span>Регіон Цюриха</span><span>Натхнення з Японії</span></div>
    </div>
  </section>

  <section class="section rescue-section">
    <div class="section-head">
      <span class="eyebrow">До / після як концепт</span>
      <h2>Правильний зріз повертає дереву повітря, світло і спокій.</h2>
      <p>Ці зображення показують напрям роботи: не просто зробити дерево зеленим, а знову зробити його живу архітектуру читабельною. Реальні клієнтські фото підставляються після погодження.</p>
    </div>
    <figure class="before-after-slider" data-before-after-slider style="--split:52%" aria-label="AI-концепт до і після">
      <div class="before-after-stage">
        <img class="after-img" src="__ASSET_PREFIX__assets/img/concepts/nachher-concept.jpg" alt="AI-концепт: можливе відновлення після правильного догляду Niwaki" loading="lazy" decoding="async" width="1200" height="900">
        <div class="before-layer">
          <img src="__ASSET_PREFIX__assets/img/concepts/vorher-dying-concept.jpg" alt="AI-концепт: проблемний стан з сухими голками і втратою форми" loading="lazy" decoding="async" width="1200" height="900">
        </div>
        <span class="slider-badge slider-badge-before">До - концепт</span>
        <span class="slider-badge slider-badge-after">Після - концепт</span>
      </div>
      <input class="before-after-range" type="range" min="8" max="92" value="52" aria-label="Пересунути порівняння">
      <figcaption class="asset-caption">AI-концепт для напряму дизайну. Не є реальним доказом виконаної роботи.</figcaption>
    </figure>
    <div class="btn-row"><a class="btn btn-secondary" href="galerie.html">Подивитися галерею і фото-слоти</a></div>
  </section>

  <section class="section split sanctuary-section">
    <div>
      <span class="eyebrow">Справжня цінність</span>
      <h2>Сад - це найтихіша кімната дому.</h2>
      <p>Niwaki доглядають не лише заради акуратності. Він змінює вид із дому: ранкова кава, вечір на терасі, гості, які бачать спокійний, точний і живий сад.</p>
      <p>Тому Віктор не працює заради швидкого ефекту. Цінне дерево після зрізу не має виглядати чужим. Воно має виглядати так, ніби ця форма вже жила всередині.</p>
      <div class="quiet-moments"><span>Ранкова кава</span><span>Вечір на терасі</span><span>Гості з видом на сад</span></div>
    </div>
    ${assetSlotUk({ type: "ai", file: "section-bg-soft.jpg", label: "Спокійний сад після точного догляду", ratio: "16 / 9" })}
  </section>

  <section class="section split">
    <div>
      <span class="eyebrow">Закони природи</span>
      <h2>Закони природи не можна ігнорувати.</h2>
      <p>Спочатку коричневі голки. Потім сухі гілки. Дерево втрачає одну гілку, потім другу, а згодом і форму. Часто причина проста: дерево різали швидко, дешево і без розуміння його енергії.</p>
      <blockquote>Відрізати гілку можна за секунду. Виростити нову - це роки.</blockquote>
    </div>
    ${assetSlotUk({ type: "ai", file: "sanctuary-coffee.jpg", label: "Ознаки стресу на цінному дереві перед діагностикою", ratio: "16 / 9" })}
  </section>

  <section class="section">
    <div class="section-head">
      <span class="eyebrow">Послуги</span>
      <h2>Три основні напрями - без компромісу.</h2>
      <p>Niwaki, японські клени і хвойні до 3 м; більші дерева - після узгодження.</p>
    </div>
    <div class="card-grid three">${serviceCardsUk}</div>
  </section>

  <section class="section" id="vision" data-event-section="vision_section_view">
    <div class="section-head">
      <span class="eyebrow">Бачення</span>
      <h2>Три роки роботи, а не три швидкі фото.</h2>
      <p>Справжній прогрес живе в календарі: спершу діагностика і розвантаження, потім вибірковий ріст, потім форма, яка тримає себе сама.</p>
    </div>
    <div class="timeline">
      <article>${assetSlotUk({ file: "meister-hands-01-v2.jpg", label: "Рік 1 - діагностика і перший чистий зріз", ratio: "3 / 2" })}<h3>Рік 1</h3><p>Прочитати проблему, забрати сухе, перерозподілити силу.</p></article>
      <article>${assetSlotUk({ type: "ai", file: "detail-kerzen.jpg", label: "Рік 2 - вибірково вести новий ріст", ratio: "3 / 2" })}<h3>Рік 2</h3><p>Залишаються правильні пагони. Світло і повітря відкривають крону.</p></article>
      <article>${assetSlotUk({ type: "ai", file: "section-bg-vision.jpg", label: "Рік 3 - спокійна стабільна форма дерева", ratio: "3 / 2" })}<h3>Рік 3</h3><p>Форма тримається сама і виглядає вирощеною, а не примусово вистриженою.</p></article>
    </div>
  </section>

  <section class="section signature-block">
    <div>
      <span class="eyebrow">Сигнатурна пропозиція</span>
      <h2>Ваше персональне бачення дерева - безкоштовно.</h2>
      <p>Надішліть фото дерева. Ви отримаєте чесну оцінку Віктора і напрям, як дерево може виглядати через три роки, якщо його варто брати в роботу.</p>
      <div class="check-strip" aria-label="Перевірка дерева у трьох зображеннях"><span>1. Все дерево</span><span>2. Проблемна зона</span><span>3. Крупний план</span></div>
      ${ctaUk("Надіслати фото - отримати бачення дерева")}
    </div>
    ${assetSlotUk({ type: "ai", file: "section-bg-vision.jpg", label: "Персональне бачення дерева", ratio: "16 / 9" })}
  </section>
  ${finalCtaUk()}`;
}

function servicesUk() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Послуги</span>
    <h1>Послуги - Niwaki, японські клени і хвойні.</h1>
    <p>Три основні напрями: <strong>Niwaki</strong>, догляд за японськими кленами Acer palmatum і формування сосен та інших хвойних дерев.</p>
  </section>
  <section class="section service-detail" id="niwaki">
    ${assetSlotUk({ type: "ai", file: "niwaki-service.jpg", label: "Niwaki / садовий бонсай - концепт", ratio: "4 / 3" })}
    <div><span class="eyebrow">Напрям 1</span><h2>Niwaki - садовий бонсай</h2><p>Ручне формування дерев у саду. Завдання не зробити зелену стіну, а направити силу дерева туди, де вона створює форму, світло і довгий спокій.</p>${ctaUk("Надіслати фото Niwaki")}</div>
  </section>
  <section class="section service-detail reverse" id="ahorn">
    ${assetSlotUk({ file: "ahorn-service.jpg", label: "Віктор працює з японським кленом", ratio: "4 / 3" })}
    <div><span class="eyebrow">Напрям 2</span><h2>Японські клени</h2><p>Сезонне формування, суха деревина всередині крони, ручна робота проти моху і грибкових ризиків. Крону треба відкривати до того, як проблема стане видимою.</p>${ctaUk("Надіслати фото клена")}</div>
  </section>
  <section class="section service-detail" id="nadelgehoelze">
    ${assetSlotUk({ type: "ai", file: "kiefer-service.jpg", label: "Формування сосни японськими ножицями", ratio: "4 / 3" })}
    <div><span class="eyebrow">Напрям 3</span><h2>Хвойні дерева - особливо сосна</h2><p>Pinus, Taxus, Juniperus, ялиця і смерека. Робота виконується вибірково і вручну, щоб не зламати майбутню структуру дерева.</p>${ctaUk("Надіслати фото сосни")}</div>
  </section>
  <section class="section note-block"><h2>Що сюди не входить.</h2><p>Це не звичайне прибирання саду і не швидке підрівнювання живоплоту. Віктор працює з деревами, для яких важливі форма, здоров'я і довга перспектива.</p><a class="text-link" href="blog/topiarschere.html">Чому японські ножиці змінюють результат →</a></section>
  ${finalCtaUk()}`;
}

function genericUkPage(kind) {
  const pages = {
    philosophy: {
      eyebrow: "Філософія",
      h1: "Від металу до живої форми.",
      body: `<p>Віктор багато років працював із металом, а подорож до Японії у 2009 році стала поворотом до живої форми. Niwaki для нього - це ремесло, аналіз і повага до законів природи.</p><p>Він не продає чудо. Він працює так, щоб форма дерева мала сенс через рік, два і три, а не тільки в день після зрізу.</p>`
    },
    gallery: {
      eyebrow: "Галерея",
      h1: "До / після - робота і фото-слоти.",
      body: `<p>Реальні клієнтські фото підставляються після дозволу. AI-зображення нижче позначені як концепти і не використовуються як доказ виконаної роботи.</p><div class="gallery-teaser">${assetSlotUk({ type: "ai", file: "concepts/vorher-dying-concept.jpg", label: "AI-концепт: проблемний стан", ratio: "4 / 3" })}${assetSlotUk({ type: "ai", file: "concepts/nachher-concept.jpg", label: "AI-концепт: можливе відновлення", ratio: "4 / 3" })}${assetSlotUk({ file: "meister-01.jpg", label: "Віктор за роботою", ratio: "3 / 2" })}</div>`
    },
    prices: {
      eyebrow: "Ціни",
      h1: "Ціни - якість замість поспіху.",
      body: `<p>Професійний японський догляд за деревами стартує від 110 CHF за годину. Виїзд - від 90 CHF залежно від відстані. Перша фото-діагностика безкоштовна.</p><div class="price-grid"><article class="card"><h2>від 110 CHF/год</h2><p>Ручна робота</p></article><article class="card"><h2>від 90 CHF</h2><p>Виїзд</p></article><article class="card"><h2>Безкоштовно</h2><p>Фото-діагностика</p></article></div><p>Швидкий зріз часто коштує дорожче, якщо він забирає форму і здоров'я дерева на роки.</p>`
    }
  };
  const page = pages[kind];
  return `<section class="page-hero section"><span class="eyebrow">${page.eyebrow}</span><h1>${page.h1}</h1>${page.body}</section>${finalCtaUk()}`;
}

function blogIndexUk() {
  const articles = [
    ["topiarschere", "Чому Віктор ріже японськими ножицями", "Чистий зріз, менше травми і більше контролю, ніж у звичайного тримера.", "detail-schnitt.jpg"],
    ["energie-krone", "Чому крону треба відкривати", "Світло, повітря і розподіл сили в дереві простими словами.", "niwaki-service.jpg"],
    ["kiefer-kerzen", "Свічки сосни: важливий момент", "Нові пагони Pinus показують, куди дерево віддає силу.", "detail-kerzen.jpg"],
    ["boden-wurzeln", "Ґрунт вирішує: Akadama і коріння", "Вода, повітря, pH і здорове коріння як фундамент форми.", "boden-wurzeln-v2.jpg"],
    ["klimastress", "Кліматичний стрес у преміум-саді", "Спека, сухі літа і сильні дощі роблять ранню діагностику важливішою.", "sanctuary-coffee.jpg"]
  ];
  return `<section class="page-hero section"><span class="eyebrow">Знання</span><h1>Знання про Niwaki, клени і цінні садові дерева.</h1><p>П'ять коротких матеріалів пояснюють підхід Віктора: інструмент, енергія крони, свічки сосни, коріння і кліматичний стрес у Швейцарії.</p></section><section class="section article-grid">${articles.map(([slug, title, teaser, image]) => `<article class="card article-card">${assetSlotUk({ type: "ai", file: image, label: title, ratio: "3 / 2" })}<span class="eyebrow">Знання</span><h2>${title}</h2><p>${teaser}</p><a href="${slug}.html">Читати статтю</a></article>`).join("")}</section>${finalCtaUk("../")}`;
}

function articleNavUk() {
  const links = [
    ["topiarschere", "Японські ножиці"],
    ["energie-krone", "Енергія крони"],
    ["kiefer-kerzen", "Свічки сосни"],
    ["boden-wurzeln", "Ґрунт і коріння"],
    ["klimastress", "Кліматичний стрес"]
  ];
  return `<nav class="article-nav" aria-label="Інші статті">${links.map(([slug, title]) => `<a href="${slug}.html">${title}</a>`).join("")}</nav>`;
}

function articleUk(type) {
  const sourceNote = `<aside class="source-list"><h2>Фаховий контекст</h2><p>Це пояснення не замінює огляд на місці. Воно поєднує практику Віктора з відкритими технічними джерелами.</p></aside>`;
  const map = {
    topiary: `<span class="eyebrow">Японські ножиці</span><h1>Чому Віктор ріже topiary scissors.</h1>${assetSlotUk({ file: "meister-hands-01-v2.jpg", label: "Віктор з японськими ножицями біля сосни", ratio: "16 / 9" })}<p>Цінне Niwaki - не живопліт. Тример швидко проходить по поверхні, але японські ножиці дають один свідомий зріз за раз: яка брунька лишається, куди заходить світло і як хмара дерева розвиватиметься наступного року.</p><p>Суть не в романтичній повільності. Суть у контролі. Чистий вибірковий зріз береже майбутню форму дерева.</p>`,
    crown: `<span class="eyebrow">Крона і енергія</span><h1>Чому крону треба відкривати.</h1>${assetSlotUk({ type: "ai", file: "niwaki-service.jpg", label: "Відкрита крона Niwaki", ratio: "16 / 9" })}<p>Коли крона стає занадто щільною, зовні вона ще зелена, але всередині втрачає світло, повітря і структуру. Віктор відкриває крону так, щоб дерево дихало і тримало форму роками.</p><div class="process-grid"><div><strong>1. Прочитати</strong><p>Де дерево витрачає силу?</p></div><div><strong>2. Розвантажити</strong><p>Забрати сухе, зайве і затінене.</p></div><div><strong>3. Залишити майбутнє</strong><p>Зберегти бруньки, які будують форму.</p></div></div>`,
    candles: `<span class="eyebrow">Pinus</span><h1>Свічки сосни: момент вирішує.</h1>${assetSlotUk({ type: "ai", file: "detail-kerzen.jpg", label: "Нові свічки сосни перед роботою", ratio: "16 / 9" })}<p>Нові пагони сосни показують, куди дерево зараз штовхає силу. Якщо ставитися до всіх свічок однаково, легко збити баланс. Сильні зони треба заспокоїти, слабкі - захистити.</p><p>Раннє фото часто достатнє, щоб зрозуміти, чи потрібен виїзд.</p>`,
    soil: `<span class="eyebrow">Akadama і коріння</span><h1>Ґрунт вирішує: Akadama і коріння.</h1>${assetSlotUk({ type: "ai", file: "boden-wurzeln-v2.jpg", label: "Коріння і субстрат", ratio: "16 / 9" })}<p>Дерево живе з фундаменту. Вода, повітря, кислотність і стан коріння визначають, чи може крона реагувати. Якщо ґрунт занадто щільний, мокрий або сухий, видима проблема часто починається нижче поверхні.</p><p>Віктор дивиться на дерево як на систему: крона, стовбур, коріння, вода і місце.</p>`,
    climate: `<span class="eyebrow">Швейцарія і клімат</span><h1>Чому преміум-сади потребують діагностики.</h1>${assetSlotUk({ type: "ai", file: "sanctuary-coffee.jpg", label: "Ознаки стресу на цінному дереві", ratio: "16 / 9" })}<p>Швейцарські сади стикаються з більшою спекою, сухішими літами і сильнішими опадами. Для цінних солітерних дерев це означає водний стрес, щільні крони, ущільнений ґрунт і старі помилки обрізки, які підсилюють одна одну.</p><p>Рання фото-діагностика захищає цінність: все дерево, проблемна зона і крупний план часто достатні для першого рішення.</p>`
  };
  return `<article class="article section">${map[type]}${sourceNote}${articleNavUk()}<div class="btn-row">${ctaUk("Надіслати фото - отримати оцінку")}</div></article>`;
}

function contactUk() {
  return `<section class="page-hero section"><span class="eyebrow">Контакт</span><h1>Надішліть фото дерева.</h1><p>Для першої оцінки достатньо трьох фото: все дерево, проблемна зона і крупний план.</p><div class="btn-row">${ctaUk("Відкрити WhatsApp - надіслати фото")} <a class="btn btn-secondary" href="${telHref}" data-event="cta_call_click">Подзвонити: ${phoneDisplay}</a></div></section>
  <section class="section contact-grid"><form class="form-card" data-event="contact_form_submit" action="${formspreeAction}" method="post" enctype="multipart/form-data"><h2>Фото-діагностика.</h2><p class="form-note">Форма неактивна, доки не підключено Formspree endpoint. Зараз основний контактний канал - WhatsApp.</p><label>Ім'я <input name="name" autocomplete="name" required></label><label>E-mail <input type="email" name="email" autocomplete="email" required></label><label>Кантон <input name="kanton" autocomplete="address-level1" required></label><label>Вид дерева <input name="baumart" placeholder="наприклад Acer palmatum, сосна, Taxus"></label><label>Повідомлення <textarea name="nachricht" rows="5" required></textarea></label><label>Фото <input type="file" name="fotos" multiple accept="image/*"></label><button class="btn btn-primary" type="submit">Підготувати запит</button></form><form class="form-card" id="rueckruf" data-event="cta_rueckruf_submit" action="${formspreeAction}" method="post" enctype="multipart/form-data"><h2>Запросити дзвінок.</h2><label>Ім'я <input name="name" autocomplete="name" required></label><label>Телефон <input type="tel" name="telefon" autocomplete="tel" required></label><label>Зручний час <input name="zeitfenster" placeholder="наприклад Пн 18-20"></label><button class="btn btn-secondary" type="submit">Підготувати дзвінок</button><p class="form-note">Форма неактивна, доки не підключено Formspree endpoint. WhatsApp зараз швидший.</p></form></section>`;
}

function legalUk(kind) {
  const isPrivacy = kind === "datenschutz";
  return `<section class="page-hero section legal"><span class="eyebrow">Чернетка</span><h1>${isPrivacy ? "Політика приватності" : "Юридична інформація"}.</h1><p>Ця сторінка структурована, але не фінальна. Юридичні дані треба перевірити і доповнити перед публікацією.</p></section><section class="section legal-content"><h2>${isPrivacy ? "Відповідальна сторона" : "Дані за швейцарськими вимогами"}</h2><p>${brand}<br>Адреса після погодження<br>Швейцарія</p><h2>Контакт</h2><p>Телефон і e-mail додаються після фінального погодження.</p><h2>${isPrivacy ? "Персональні дані, форми і аналітика" : "Відповідальність за контент"}</h2><p>${isPrivacy ? "Форми, фото-завантаження, Analytics і Ads вимірювання вмикаються тільки після фінальної технічної та юридичної перевірки. Consent Mode підготовлений у коді; зовнішні IDs ще не активні." : "Контент підготовлений уважно, але до фінального погодження не є юридично завершеним документом."}</p></section>`;
}

function themesPageUk() {
  return `<section class="page-hero section"><span class="eyebrow">Внутрішній перегляд</span><h1>Theme Preview V1-V5.</h1><p>Для Андрія/Віктора: можна перемикати дизайн-напрям без перебудови layout.</p><div class="theme-buttons">${[1, 2, 3, 4, 5].map((n) => `<button class="btn btn-secondary" type="button" data-theme-option="theme-v${n}.css">V${n}</button>`).join("")}</div></section><section class="section"><div class="card-grid three">${serviceCardsUk}</div></section><section class="section split"><div><h2>Приклад блоку.</h2><p>Ця сторінка показує токени теми: фон, поверхню, текст, основний колір, акцент, лінії, тіні і кнопки.</p><div class="btn-row">${ctaUk("Надіслати фото - тест CTA")} <a class="btn btn-secondary" href="kontakt.html">Контакт</a></div></div>${assetSlotUk({ type: "ai", file: "hero-garten-alt.jpg", label: "Зображення для перевірки теми", ratio: "16 / 9" })}</section>`;
}

function cssBase() {
  return `*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-body);font-size:16px;line-height:1.65;padding-bottom:0}body.menu-open{overflow:hidden}img,svg{max-width:100%;display:block}a{color:inherit}a:hover{text-decoration-color:var(--accent)}:focus-visible{outline:3px solid var(--accent);outline-offset:3px}.skip-link{position:absolute;left:12px;top:-80px;z-index:20;background:var(--primary);color:var(--primary-ink);padding:10px 14px;border-radius:8px}.skip-link:focus{top:12px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.site-header{position:sticky;top:0;z-index:15;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:12px max(16px,calc((100vw - var(--maxw))/2));background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}.brand{display:flex;align-items:center;gap:12px;text-decoration:none;min-width:0}.brand-symbol{width:42px;height:42px;border-radius:50%;background:radial-gradient(circle at 45% 28%,var(--leaf) 0 18%,transparent 19%),radial-gradient(circle at 60% 42%,var(--leaf) 0 20%,transparent 21%),linear-gradient(160deg,var(--primary),var(--accent));box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--surface) 70%,transparent)}.brand-text{display:grid;line-height:1.1}.brand-name{font-family:var(--font-head);font-size:1.18rem;font-weight:700}.brand-line{font-size:.75rem;color:var(--muted)}.site-nav{display:flex;align-items:center;gap:16px;font-size:.94rem}.site-nav a{text-decoration:none;color:var(--muted);font-weight:650}.site-nav a[aria-current=page],.site-nav a:hover{color:var(--primary)}.lang-switch{border:1px solid var(--line);border-radius:999px;padding:7px 10px}.nav-toggle{display:none;background:var(--surface);border:1px solid var(--line);border-radius:8px;width:44px;height:44px;padding:10px}.nav-toggle span:not(.sr-only){display:block;height:2px;background:var(--text);margin:5px 0}.section{max-width:var(--maxw);margin:0 auto;padding:64px 18px}.hero{max-width:none;display:grid;grid-template-columns:minmax(18px,1fr) minmax(0,var(--maxw)) minmax(18px,1fr);gap:0;padding-top:22px}.hero>*{grid-column:2}.hero-media{grid-column:1 / -1;grid-row:1;min-height:330px}.hero-slot{height:100%;border-radius:0}.hero-panel{grid-row:1;margin:34px 0 28px;width:min(620px,100%);background:color-mix(in srgb,var(--surface) 94%,transparent);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:var(--radius);padding:30px}.hero-services{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}.page-hero{padding-top:74px;padding-bottom:38px}.page-hero p{max-width:760px}.eyebrow{display:inline-flex;align-items:center;gap:8px;color:var(--primary);font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:0}.eyebrow:before{content:"";width:28px;height:1px;background:var(--accent)}h1,h2,h3{font-family:var(--font-head);line-height:1.05;margin:12px 0 14px;font-weight:700;color:var(--text);letter-spacing:0}h1{font-size:2.45rem;max-width:900px}h2{font-size:2rem}h3{font-size:1.35rem}p{margin:0 0 16px}.motto{font-family:var(--font-head);font-size:1.35rem;color:var(--primary);border-left:3px solid var(--accent);padding-left:14px}blockquote{margin:20px 0;padding:18px 20px;border-left:4px solid var(--accent);background:color-mix(in srgb,var(--surface) 72%,var(--bg));font-family:var(--font-head);font-size:1.35rem}.btn-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:11px 16px;border-radius:8px;text-decoration:none;border:1px solid transparent;font-weight:750;cursor:pointer;font:inherit}.btn-primary{background:var(--primary);color:var(--primary-ink)}.btn-secondary{background:transparent;color:var(--primary);border-color:var(--primary)}.btn-ghost{background:transparent;color:var(--muted);border-color:var(--line)}.text-link{font-weight:800;color:var(--primary);text-decoration-thickness:2px;text-underline-offset:4px}.trust-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.trust-row span{display:inline-flex;border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:7px 10px;color:var(--muted);font-size:.86rem}.section-head{max-width:760px;margin-bottom:24px}.split,.service-detail,.signature-block,.contact-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:center}.reverse>*:first-child{order:2}.card-grid{display:grid;gap:16px}.card-grid.three{grid-template-columns:repeat(3,1fr)}.card-grid.two{grid-template-columns:repeat(2,1fr)}.card,.form-card,.note-block,.price-teaser,.energy-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px}.service-card a,.article-card a{color:var(--primary);font-weight:800}.image-slot{aspect-ratio:var(--ratio);background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;margin:0}.image-slot>div{height:100%;display:grid;place-content:center;text-align:center;padding:22px;background:linear-gradient(135deg,color-mix(in srgb,var(--surface) 76%,var(--leaf)),color-mix(in srgb,var(--surface) 78%,#2f87b8));color:var(--text)}.image-slot-real>div{background:linear-gradient(135deg,var(--surface),color-mix(in srgb,var(--bg) 78%,var(--accent)))}.image-slot span{font-size:.76rem;font-weight:850;text-transform:uppercase;color:var(--primary)}.image-slot strong{font-family:var(--font-head);font-size:1.28rem}.image-slot small{color:var(--muted)}.timeline,.gallery-teaser,.price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.timeline article{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:14px}.signature-block{background:linear-gradient(135deg,color-mix(in srgb,var(--primary) 94%,#0f172a),color-mix(in srgb,var(--primary) 70%,#2f87b8));max-width:none;padding:64px max(18px,calc((100vw - var(--maxw))/2));color:var(--primary-ink)}.signature-block h2,.signature-block .eyebrow,.signature-block p{color:var(--primary-ink)}.signature-block .eyebrow:before{background:var(--accent)}.signature-block .image-slot{box-shadow:none}.price-teaser{text-align:center}.faq details{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:16px 18px;margin:10px 0}.faq summary{font-weight:800;cursor:pointer}.energy-card svg{width:100%;height:auto}.svg-leaf{fill:color-mix(in srgb,var(--leaf) 75%,var(--accent));opacity:.9}.svg-stem,.svg-root{fill:none;stroke:var(--primary);stroke-width:16;stroke-linecap:round}.svg-root{stroke-width:8}.energy-card text{font:700 18px system-ui;fill:var(--text);text-anchor:middle}.gallery-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.before-after{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:14px}.before-after>div{display:grid;grid-template-columns:1fr 1fr;gap:10px}.article{max-width:860px}.article .image-slot{margin:24px 0}.form-card label{display:grid;gap:6px;margin:13px 0;font-weight:750}.form-card input,.form-card textarea{width:100%;border:1px solid var(--line);border-radius:8px;padding:12px;background:var(--bg);color:var(--text);font:inherit}.form-note{font-size:.9rem;color:var(--muted)}.legal-content{max-width:860px}.theme-buttons{display:flex;flex-wrap:wrap;gap:10px}.site-footer{background:color-mix(in srgb,var(--primary) 94%,#000);color:var(--primary-ink);padding:44px max(18px,calc((100vw - var(--maxw))/2)) 82px}.footer-grid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:28px}.site-footer a{display:block;color:var(--primary-ink);text-decoration:none;margin:7px 0}.site-footer h2{font-size:1.1rem;color:var(--primary-ink)}.footer-brand{font-family:var(--font-head);font-size:1.35rem;font-weight:800}.site-credit{border-top:1px solid color-mix(in srgb,var(--primary-ink) 20%,transparent);padding-top:18px;color:color-mix(in srgb,var(--primary-ink) 72%,transparent)}.mobile-cta{display:none}.cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:30;max-width:860px;margin:auto;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:var(--radius);padding:16px;gap:14px;align-items:center;justify-content:space-between}.cookie-banner:not([hidden]){display:flex}.cookie-banner p{margin:0}.cookie-banner div{display:flex;gap:10px}.toast{position:fixed;right:16px;bottom:16px;background:var(--primary);color:var(--primary-ink);padding:12px 14px;border-radius:8px;z-index:35;box-shadow:var(--shadow)}@media (min-width:900px){h1{font-size:3.4rem}h2{font-size:2.35rem}.page-hero{padding-top:92px}}@media (max-width:920px){.nav-toggle{display:block}.site-nav{position:fixed;inset:67px 12px auto 12px;display:none;flex-direction:column;align-items:stretch;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:16px}.site-nav.is-open{display:flex}.site-nav a{padding:10px}.hero-services,.card-grid.three,.timeline,.gallery-teaser,.price-grid,.footer-grid,.gallery-grid{grid-template-columns:1fr 1fr}.split,.service-detail,.signature-block,.contact-grid{grid-template-columns:1fr}.reverse>*:first-child{order:0}.hero-panel{margin:20px 0}.mobile-cta{position:fixed;left:0;right:0;bottom:0;z-index:25;display:grid;grid-template-columns:1fr 58px;background:var(--surface);border-top:1px solid var(--line);box-shadow:0 -10px 22px rgba(0,0,0,.08)}.mobile-cta a{min-height:58px;display:grid;place-items:center;text-decoration:none;font-weight:850}.mobile-cta a:first-child{background:var(--primary);color:var(--primary-ink)}body{padding-bottom:58px}.cookie-banner{bottom:72px;display:block}.cookie-banner:not([hidden]){display:block}.cookie-banner div{margin-top:12px}}@media (max-width:620px){.brand-line{display:none}.brand-name{font-size:1rem}.hero-media{min-height:390px}.hero-panel{padding:22px}.hero-services,.card-grid.three,.card-grid.two,.timeline,.gallery-teaser,.price-grid,.footer-grid,.gallery-grid,.before-after>div{grid-template-columns:1fr}.section{padding:50px 16px}h1{font-size:2.2rem}h2{font-size:1.75rem}.btn{width:100%}.btn-row{align-items:stretch}.trust-row span{width:100%;justify-content:center}}@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important;transition:none!important}}`;
}

function cssResponsiveFixes() {
  return `html,body{max-width:100%;overflow-x:hidden}h1,h2,h3,p,.brand-name{overflow-wrap:break-word}.hero-panel,.card,.form-card,.note-block,.price-teaser,.image-slot,.site-nav{min-width:0}.brand-logo{width:44px;height:44px;border-radius:50%;object-fit:cover;object-position:center 24%;background:var(--surface);border:1px solid var(--line);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--surface) 70%,transparent)}.footer-logo{width:min(240px,100%);height:auto;max-height:120px;object-fit:contain;margin-top:18px;padding:12px;background:#fff;border:1px solid color-mix(in srgb,var(--primary-ink) 22%,transparent);border-radius:8px;box-shadow:0 10px 28px rgba(0,0,0,.16)}.image-slot>img{width:100%;height:100%;object-fit:cover}.asset-caption{position:absolute;left:10px;right:10px;bottom:10px;background:color-mix(in srgb,var(--surface) 92%,transparent);color:var(--muted);border:1px solid var(--line);border-radius:8px;padding:6px 8px;font-size:.72rem;font-weight:800;line-height:1.25}.image-slot{position:relative}.hero-slot>img{object-position:70% center}.hero-slot>div{place-content:center end;text-align:right;padding-right:max(24px,10vw)}.hero-slot span,.hero-slot strong,.hero-slot small{max-width:280px}.article-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.article-card .image-slot{margin-bottom:16px}.comparison-grid,.process-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:24px 0}.process-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.comparison-grid>div,.process-grid>div,.science-card,.source-list,.article-nav{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:18px}.science-card{margin:24px 0}.source-list{margin:28px 0;color:var(--muted)}.source-list h2{color:var(--text);font-size:1.35rem}.source-list ul{margin:10px 0 0;padding-left:20px}.source-list a{color:var(--primary);font-weight:800}.article-nav{display:flex;flex-wrap:wrap;gap:10px;margin:28px 0}.article-nav a{border:1px solid var(--line);border-radius:999px;padding:8px 10px;text-decoration:none;color:var(--primary);font-weight:800}.stress-chain{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;align-items:center;text-align:center}.stress-chain span,.stress-chain strong{border:1px solid var(--line);border-radius:8px;padding:10px;background:color-mix(in srgb,var(--surface) 70%,var(--bg))}.stress-chain strong{background:var(--primary);color:var(--primary-ink)}.cookie-banner .btn{white-space:nowrap;min-width:110px}@media (max-width:920px){.article-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.comparison-grid,.process-grid,.stress-chain{grid-template-columns:1fr}}@media (max-width:620px){.site-header{width:100%;min-height:69px;padding:12px 76px 12px 16px;gap:10px}.nav-toggle{display:block;position:fixed;right:16px;top:12px;width:44px;height:44px;z-index:40;background:var(--primary);border-color:var(--primary);box-shadow:var(--shadow)}.nav-toggle span:not(.sr-only){background:var(--primary-ink)}.brand{flex:1 1 auto;max-width:none;min-width:0}.brand-logo{flex:0 0 44px}.brand-text{min-width:0;max-width:calc(100vw - 144px)}.brand-name{display:block;font-size:.96rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hero{display:block;padding:32px 16px 50px}.hero>*{grid-column:auto}.hero-media{display:block;min-height:180px;margin:0 0 14px}.hero-slot{border-radius:var(--radius)}.hero-slot>img{object-position:78% center}.hero-panel{width:100%;max-width:none;margin:0;padding:22px;overflow:hidden}.hero-panel h1{font-size:1.85rem;line-height:1.08}.hero-panel .motto{font-size:1.15rem}.hero-services{grid-template-columns:1fr;margin-top:14px}.hero-slot>div{place-content:center;text-align:center;padding-right:22px}.article-grid{grid-template-columns:1fr}.footer-logo{width:min(200px,100%);max-height:100px}.asset-caption{position:static;border-width:1px 0 0;border-radius:0}.cookie-banner div{flex-direction:column}.cookie-banner .btn{width:100%;white-space:normal}}`;
}

function cssWowPass() {
  return `.hero{position:relative;display:grid;grid-template-columns:minmax(18px,1fr) minmax(0,var(--maxw)) minmax(18px,1fr);height:min(760px,calc(100svh - 112px));min-height:620px;padding:0;align-items:end;overflow:hidden;background:#0f1d14}.hero>*{grid-column:2}.hero-media{position:absolute;inset:0;grid-column:1 / -1;grid-row:1;height:100%;min-height:0}.hero-media:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,18,13,.66) 0%,rgba(9,18,13,.38) 34%,rgba(9,18,13,.05) 68%,rgba(9,18,13,.16) 100%),linear-gradient(0deg,rgba(9,18,13,.42),rgba(9,18,13,0) 42%)}.hero-slot{height:100%;border-radius:0;border:0;box-shadow:none}.hero-slot>img{object-position:48% center}.hero-panel{grid-column:2;grid-row:1;align-self:end;width:min(1040px,100%);margin:0 0 48px;padding:0;background:transparent;border:0;box-shadow:none;color:#fff;text-shadow:0 2px 24px rgba(0,0,0,.48)}.hero-panel h1{font-size:3.45rem;line-height:1.02;max-width:1040px;color:#fff}.hero-panel h1 span{font-size:.96em}.hero-panel p,.hero-panel .motto,.hero-panel .eyebrow{color:#fff}.hero-panel .motto{max-width:620px;border-left-color:var(--accent)}.hero-panel>p:not(.motto){max-width:660px}.hero-panel .eyebrow:before{background:var(--accent)}.hero .btn-primary{box-shadow:0 18px 42px rgba(0,0,0,.28)}.hero .btn-secondary{color:#fff;border-color:rgba(255,255,255,.82);background:rgba(255,255,255,.08);backdrop-filter:blur(12px)}.hero .trust-row span{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.28);color:#fff}.rescue-section{padding-top:70px}.before-after-slider{position:relative;max-width:1040px;margin:0 auto;color:#fff}.before-after-stage{position:relative;aspect-ratio:4/3;overflow:hidden;border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow);border:1px solid var(--line)}.before-after-stage img{width:100%;height:100%;object-fit:cover}.before-layer{position:absolute;inset:0;clip-path:inset(0 calc(100% - var(--split)) 0 0)}.before-layer img{position:absolute;inset:0}.before-after-stage:after{content:"";position:absolute;top:0;bottom:0;left:var(--split);width:2px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.18),0 0 26px rgba(0,0,0,.28)}.before-after-range{width:100%;margin:14px 0 0;accent-color:var(--primary);cursor:ew-resize}.slider-badge{position:absolute;top:14px;z-index:2;border:1px solid rgba(255,255,255,.42);border-radius:999px;background:rgba(9,18,13,.58);backdrop-filter:blur(10px);padding:7px 10px;font-size:.78rem;font-weight:850}.slider-badge-before{left:14px}.slider-badge-after{right:14px}.before-after-slider .asset-caption{bottom:14px;left:14px;right:14px}.presentation-toggle{position:fixed;right:16px;top:82px;z-index:34;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--surface) 92%,transparent);color:var(--text);box-shadow:var(--shadow);padding:8px 11px;font:inherit;font-size:.78rem;font-weight:800;cursor:pointer}.presentation-toggle[aria-pressed=true]{background:var(--primary);border-color:var(--primary);color:var(--primary-ink)}body.presentation-clean .asset-caption{display:none!important}@media (max-width:920px){.hero{height:min(740px,calc(100svh - 104px));min-height:650px}.hero-panel{margin-bottom:34px}.hero-panel h1{font-size:3.35rem}.before-after-stage{aspect-ratio:3/4}.timeline article .image-slot{aspect-ratio:3/2}}@media (max-width:620px){.hero{display:grid;grid-template-columns:1fr;height:auto;min-height:calc(100svh - 118px);padding:0 16px 34px}.hero>*{grid-column:1}.hero-media{display:block;position:absolute;inset:0;margin:0;min-height:0;height:100%}.hero-slot{border-radius:0}.hero-slot>img{object-position:43% center}.hero-panel{grid-column:1;grid-row:1;align-self:end;width:100%;max-width:none;margin:0;padding:0 4px 8px;overflow:visible}.hero-panel h1{font-size:2.45rem;line-height:1}.hero-panel .motto{font-size:1.1rem}.hero-panel .eyebrow{font-size:.66rem}.hero-panel .btn{width:100%}.hero .trust-row span{width:auto;justify-content:flex-start}.presentation-toggle{top:76px;right:12px;font-size:.72rem;padding:7px 9px}.before-after-slider .asset-caption{position:absolute!important;left:10px!important;right:10px!important;bottom:10px!important;border:1px solid var(--line)!important;border-radius:8px!important}.slider-badge{top:10px;font-size:.68rem}.slider-badge-before{left:10px}.slider-badge-after{right:10px}}`;
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

  $$('[data-before-after-slider]').forEach((slider) => {
    const input = $('.before-after-range', slider);
    if (!input) return;
    const update = () => slider.style.setProperty('--split', input.value + '%');
    input.addEventListener('input', update);
    update();
  });

  const presentationToggle = $('[data-presentation-toggle]');
  if (presentationToggle) {
    const params = new URLSearchParams(location.search);
    const stored = window.localStorage.getItem('viktorPresentationClean') === '1';
    const setClean = (clean) => {
      document.body.classList.toggle('presentation-clean', clean);
      presentationToggle.setAttribute('aria-pressed', String(clean));
      presentationToggle.textContent = clean ? presentationToggle.dataset.labelShow : presentationToggle.dataset.labelHide;
      window.localStorage.setItem('viktorPresentationClean', clean ? '1' : '0');
    };
    setClean(params.has('clean') || stored);
    presentationToggle.addEventListener('click', () => {
      setClean(!document.body.classList.contains('presentation-clean'));
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
  const currentLang = document.documentElement.lang || 'de-CH';
  const formInactiveMessage = currentLang.startsWith('uk')
    ? 'Форма неактивна: потрібно підключити Formspree endpoint. Будь ласка, скористайтеся WhatsApp.'
    : currentLang.startsWith('en')
      ? 'Form inactive: the Formspree endpoint still needs to be configured. Please use WhatsApp.'
      : 'Formular inaktiv: Formspree-Endpunkt muss noch eingesetzt werden. Bitte WhatsApp nutzen.';
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
      if (!form.reportValidity()) return;
      track(form.dataset.event, { path: location.pathname });
      if (form.action.includes('/REPLACE')) {
        event.preventDefault();
        showToast(formInactiveMessage);
      }
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

Most visual slots are placeholders until real files are provided. Do not use AI for concrete before/after proof or the Japan postcard. Preferred final formats: AVIF/WebP with JPEG fallback.

| File | Aspect | Source | Used for | Status |
|---|---:|---|---|---|
| logo.png | 1:1 source PNG from existing JPEG | Existing real file, old wordmark | Asset archive / possible mark | PRESENT_BUT_WORDMARK_CONFLICT |
| hero-garten.jpg | 16:9 | AI concept, needs Viktor botanical review | Home hero background | PRESENT_AI_CONCEPT |
| og-share.jpg | 1200x630 | Temporary branded static JPG | Link previews | PRESENT_TEMPORARY |
| section-bg-vision.jpg | 16:9 | AI concept, needs Viktor botanical review | Personal tree vision block | PRESENT_AI_CONCEPT |
| vision-jahr1.jpg | 1:1 | AI concept, needs Viktor botanical review | Year 1 vision | PRESENT_AI_CONCEPT |
| vision-jahr2.jpg | 1:1 | AI concept, needs Viktor botanical review | Year 2 vision | PRESENT_AI_CONCEPT |
| vision-jahr3.jpg | 1:1 | AI concept, needs Viktor botanical review | Year 3 vision | PRESENT_AI_CONCEPT |
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
| meister-hands-01.jpg | 3:2 | AI concept close-up, real preferred for final trust | Topiary scissors proof | PRESENT_AI_CONCEPT |
| japan-postkarte.jpg | 4:3 | Real only | Anerkennung aus Japan | PLACEHOLDER_REAL_REQUIRED |
| boden-wurzeln.jpg | 16:9 / 3:2 | AI concept educational photo | Blog soil article | PRESENT_AI_CONCEPT |
| concepts/vorher-dying-concept.jpg | 4:3 | AI concept visualization only | Dossier before/after direction | PRESENT_AI_CONCEPT_NOT_PROOF |
| concepts/nachher-concept.jpg | 4:3 | AI concept visualization only | Dossier before/after direction | PRESENT_AI_CONCEPT_NOT_PROOF |
`;
}

function manifestV2() {
  return `# Image Manifest

Most visual slots are placeholders until real files are provided. AI files are allowed for mood, education and Baum-Vision concepts, but never as proof of completed client work. Preferred final formats: AVIF/WebP with JPEG fallback.

| File | Aspect | Source | Used for | Status |
|---|---:|---|---|---|
| logo.png | 1:1 source PNG from existing logo | Existing legacy logo, reads Viktor Bonsai | Header symbol crop only; text wordmark rendered beside it | PRESENT_BUT_WORDMARK_CONFLICT |
| hero-garten-alt.jpg | 16:9 | AI concept, needs Viktor botanical review | Primary home hero background | PRESENT_AI_CONCEPT_NEEDS_VIKTOR_REVIEW |
| hero-garten.jpg | 16:9 | AI concept, needs Viktor botanical review | Secondary hero/archive | PRESENT_AI_CONCEPT_NEEDS_VIKTOR_REVIEW |
| og-share.jpg | 1200x630 | Temporary branded static JPG | Link previews | PRESENT_TEMPORARY |
| section-bg-vision.jpg | 16:9 | AI concept, needs Viktor botanical review | Personal tree vision block | PRESENT_AI_CONCEPT_NEEDS_VIKTOR_REVIEW |
| section-bg-soft.jpg | 16:9 | AI concept, needs Viktor botanical review | Concept recovery / soft section | PRESENT_AI_CONCEPT_NOT_PROOF |
| baumarchitektur-energiefluss-verstehen.png | 4:3 | Supplied educational graphic | Home Meisterarbeit energy-flow block | PRESENT_SUPPLIED_GRAPHIC |
| sanctuary-coffee.jpg | 16:9 | AI concept, looks like problem tree | Climate stress / concept before state | PRESENT_AI_CONCEPT_NOT_PROOF |
| vision-jahr1.jpg | 1:1 | AI concept, needs Viktor botanical review | Year 1 Baum-Vision | PRESENT_AI_CONCEPT_NOT_PROOF |
| vision-jahr2.jpg | 1:1 | AI concept, needs Viktor botanical review | Year 2 Baum-Vision | PRESENT_AI_CONCEPT_NOT_PROOF |
| vision-jahr3.jpg | 1:1 | AI concept, needs Viktor botanical review | Year 3 Baum-Vision | PRESENT_AI_CONCEPT_NOT_PROOF |
| niwaki-service.jpg | 4:3 | AI concept, needs Viktor botanical review | Niwaki service / crown article | PRESENT_AI_CONCEPT_NOT_PROOF |
| ahorn-service.jpg | 4:3 | Real Viktor work photo supplied by Andrii | Acer service | PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL |
| kiefer-service.jpg | 4:3 | AI concept, needs Viktor botanical review | Pine service / candle article | PRESENT_AI_CONCEPT_NOT_PROOF |
| detail-ahorn-blatt.jpg | 3:2 | AI concept detail | Crown/light article | PRESENT_AI_CONCEPT_NOT_PROOF |
| detail-kerzen.jpg | 3:2 | AI concept detail | Pine candle article | PRESENT_AI_CONCEPT_NOT_PROOF |
| detail-moos.jpg | 3:2 | AI concept detail | Soil/moisture article | PRESENT_AI_CONCEPT_NOT_PROOF |
| detail-schnitt.jpg | 3:2 | AI concept detail | Topiary scissors article | PRESENT_AI_CONCEPT_NOT_PROOF |
| werkzeug.jpg | 4:3 | AI concept flatlay | Tool article | PRESENT_AI_CONCEPT_NOT_PROOF |
| meister-hands-01.jpg | 3:2 / 16:9 | Real Viktor work photo supplied by Andrii | Topiary scissors proof slot | PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL |
| meister-hands-01-v2.jpg | 3:2 / 16:9 | Real Viktor work photo supplied by Andrii | Handwork / article hero | PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL |
| boden-wurzeln.jpg | 16:9 / 3:2 | AI concept educational photo | Blog soil article archive | PRESENT_AI_CONCEPT_NOT_PROOF |
| boden-wurzeln-v2.jpg | 16:9 / 3:2 | AI concept educational photo | Roots / soil article hero | PRESENT_AI_CONCEPT_NOT_PROOF |
| concepts/vorher-dying-concept.jpg | 4:3 | AI concept visualization only | Dossier/gallery concept before | PRESENT_AI_CONCEPT_NOT_PROOF |
| concepts/nachher-concept.jpg | 4:3 | AI concept visualization only | Dossier/gallery concept after | PRESENT_AI_CONCEPT_NOT_PROOF |
| concepts/japan-postkarte-concept.jpg | 4:3 | AI concept visualization only, not real recognition | Dossier/gallery Japan trust concept | PRESENT_AI_CONCEPT_NOT_PROOF |
| vorher-dying-01.jpg..06.jpg | 4:3 | Real Viktor photos preferred | Gallery before states | MISSING_REAL_REQUIRED |
| nachher-01.jpg..06.jpg | 4:3 | Real Viktor photos | Gallery after states | MISSING_REAL_REQUIRED |
| nachher-06.jpg | 4:3 | Real Viktor photos | Explicit audit marker for final gallery pair | MISSING_REAL_REQUIRED |
| vorher-nachher-01.jpg..03.jpg | 4:3 | Real Viktor photos | Home teaser | MISSING_REAL_REQUIRED |
| meister-01.jpg | 3:2 | Real Viktor portrait/work photo supplied by Andrii | Philosophy / gallery | PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL |
| meister-02.jpg | 3:2 | Real Viktor work photo supplied by Andrii | Philosophy / gallery | PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL |
| meister-03.jpg | 3:2 | Real Viktor work photo supplied by Andrii | Gallery / trust proof | PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL |
| japan-postkarte.jpg | 4:3 | Real only | Anerkennung aus Japan | MISSING_REAL_REQUIRED |
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
    "/", "/leistungen", "/philosophie", "/galerie", "/preise", "/blog", "/blog/topiarschere", "/blog/energie-krone", "/blog/kiefer-kerzen", "/blog/boden-wurzeln", "/blog/klimastress", "/kontakt", "/impressum", "/datenschutz", "/themes",
    "/en/", "/en/leistungen", "/en/philosophie", "/en/galerie", "/en/preise", "/en/blog", "/en/blog/topiarschere", "/en/blog/energie-krone", "/en/blog/kiefer-kerzen", "/en/blog/boden-wurzeln", "/en/blog/klimastress", "/en/kontakt", "/en/impressum", "/en/datenschutz", "/en/themes",
    "/uk/", "/uk/leistungen", "/uk/philosophie", "/uk/galerie", "/uk/preise", "/uk/blog", "/uk/blog/topiarschere", "/uk/blog/energie-krone", "/uk/blog/kiefer-kerzen", "/uk/blog/boden-wurzeln", "/uk/blog/klimastress", "/uk/kontakt", "/uk/impressum", "/uk/datenschutz", "/uk/themes"
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

- Verify final WhatsApp/phone before publication: \`${phoneDisplay}\`.
- Replace GA4 \`G-XXXXXXX\`, Google Ads \`AW-XXXXXXX\`, Search Console verification and form backend.
- Visible header/footer wordmark is currently **Bonsai**.
- Complete \`impressum.html\` and \`datenschutz.html\` with Viktor's legal data before publication.
- Swap real images using filenames in \`assets/img/MANIFEST.md\`.
- TODO: Create a final matching logo lockup for the approved public name and replace the temporary legacy logo if needed.
- AI before/after concept files in \`assets/img/concepts/\` are visual direction only and must not be presented as real client proof.

## Logo / wordmark assumption

The confirmed SEO/business/entity name in \`project_brief\` is **Viktor Baumarchitektur**. The supplied \`Лого.jpg\` was converted to a real PNG at \`assets/img/logo.png\`, and the visible header/footer wordmark is **Bonsai** per the latest naming instruction. Keep SEO, JSON-LD and canonical entity names as **Viktor Baumarchitektur** until Viktor changes the business name.

## Change theme

The active theme is loaded with:

\`\`\`html
<link id="theme-link" rel="stylesheet" href="assets/theme-v4.css">
\`\`\`

Switch to another design direction by replacing \`theme-v4.css\` with \`theme-v1.css\`, \`theme-v2.css\`, \`theme-v3.css\`, or \`theme-v5.css\`. Use \`themes.html\` to preview without editing files.

## Placeholders still requiring human approval

- E-mail and form endpoint.
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

function readmeV2() {
  return `# Viktor Baumarchitektur Static Website

Static multipage DE/EN site for Viktor Baumarchitektur. It opens directly from \`index.html\` and is ready for static hosting on Vercel after human approval.

## Edit checklist

- Verify final WhatsApp/phone before publication: \`${phoneDisplay}\`.
- Replace GA4 \`G-XXXXXXX\`, Google Ads \`AW-XXXXXXX\`, Search Console verification and form backend.
- Visible header/footer wordmark is **Viktor Baumarchitektur**.
- Complete \`impressum.html\` and \`datenschutz.html\` with Viktor's legal data before publication.
- Swap real images using filenames in \`assets/img/MANIFEST.md\`.
- TODO: create a final matching logo lockup for **Viktor Baumarchitektur**. The current \`assets/img/logo.png\` still reads "Viktor Bonsai", so the site crops it to the tree symbol and renders the approved text wordmark beside it.
- AI concept files are visual direction only and must not be presented as real client proof.

## Blog / knowledge section

The blog now has five DE articles plus EN mirror pages:

- \`blog/topiarschere.html\` - tool choice and clean cuts.
- \`blog/energie-krone.html\` - crown energy, light and air.
- \`blog/kiefer-kerzen.html\` - pine candles and timing.
- \`blog/boden-wurzeln.html\` - Akadama, roots and substrate.
- \`blog/klimastress.html\` - Swiss heat/drought context for premium gardens.

## Logo / wordmark assumption

The confirmed SEO/business/entity and visible name is **Viktor Baumarchitektur**. The supplied legacy logo says **Viktor Bonsai**; do not show the legacy text as the public wordmark. Keep the cropped symbol until a matching logo is approved.

## Change theme

The active theme is loaded with:

\`\`\`html
<link id="theme-link" rel="stylesheet" href="assets/theme-v4.css">
\`\`\`

Switch to another design direction by replacing \`theme-v4.css\` with \`theme-v1.css\`, \`theme-v2.css\`, \`theme-v3.css\`, or \`theme-v5.css\`. Use \`themes.html\` to preview without editing files.

## Placeholders still requiring human approval

- E-mail and form endpoint.
- Real before/after photos, Japan postcard and testimonial.
- Final approval/originals for the supplied real Viktor master/work photos.
- Public Instagram/website photo usage permission and original files from Viktor.
- GA4, Google Ads, Search Console and consent wording review.
- Legal pages under Swiss/DSG/DSGVO requirements.
- Google rating/testimonial values.

## Local validation

Run:

\`\`\`powershell
node tools/generate-site.mjs
node tools/audit-site.mjs
node tools/qa-site-interactions.mjs
\`\`\`

No build step is required for visitors. The generator is kept as the source of truth for consistent header/footer, DE pages and EN mirrors.
`;
}

function auditScript() {
  return `import fs from "node:fs";
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
  .replace(/<script[\\s\\S]*?<\\/script>/gi, " ")
  .replace(/<style[\\s\\S]*?<\\/style>/gi, " ")
  .replace(/<!--[\\s\\S]*?-->/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&amp;/g, "&")
  .replace(/\\s+/g, " ")
  .trim();

const sectionText = (html, tag) => {
  const match = html.match(new RegExp("<" + tag + "\\\\b[\\\\s\\\\S]*?<\\\\/" + tag + ">", "i"));
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
  const h1 = [...html.matchAll(/<h1\\b/gi)].length;
  if (h1 !== 1) errors.push(file + " has " + h1 + " H1 tags");
  for (const needle of ["<title>", "name=\\"description\\"", "rel=\\"canonical\\"", "property=\\"og:title\\"", "hreflang=\\"de-CH\\"", "hreflang=\\"en\\"", "hreflang=\\"uk\\""]) {
    if (!html.includes(needle)) errors.push(file + " missing " + needle);
  }
  if (!html.includes("application/ld+json") && !file.includes("impressum") && !file.includes("datenschutz") && !file.includes("themes")) {
    errors.push(file + " missing JSON-LD");
  }
  if (!html.includes("class=\\"brand-logo\\"") || !html.includes("assets/img/logo.png")) {
    errors.push(file + " header missing assets/img/logo.png brand logo");
  }
  if (!sectionText(html, "header").includes(brandWordmark)) {
    errors.push(file + " header missing visible " + brandWordmark + " wordmark");
  }
  if (!sectionText(html, "footer").includes(brandWordmark)) {
    errors.push(file + " footer missing visible " + brandWordmark + " wordmark");
  }
  const bodyMatch = html.match(/<body\\b[\\s\\S]*?<\\/body>/i);
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
  const imgs = [...html.matchAll(/<img\\b[^>]*>/gi)].map((m) => m[0]);
  for (const img of imgs) {
    for (const attr of ["loading=\\"lazy\\"", "decoding=\\"async\\"", "width=\\"", "height=\\""]) {
      if (!img.includes(attr)) errors.push(file + " image missing " + attr + " -> " + img);
    }
    const src = img.match(/src=\\"([^\\"]+)\\"/)?.[1] || "";
    if (src.includes("assets/img/")) {
      const local = src.startsWith("/")
        ? path.join(root, src.replace(/^\\//, ""))
        : path.normalize(path.join(path.dirname(full), src));
      if (!fs.existsSync(local)) errors.push(file + " image source missing -> " + src);
    }
  }
  const forms = [...html.matchAll(/<form\\b[^>]*>/gi)].map((m) => m[0]);
  for (const form of forms) {
    if (!form.includes('action="https://formspree.io/f/REPLACE"')) errors.push(file + " form is not Formspree-ready");
    if (!form.includes('method="post"')) errors.push(file + " form missing POST method");
    if (!form.includes('enctype="multipart/form-data"')) errors.push(file + " form missing multipart enctype");
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
`;
}

writeFile("assets/base.css", `${cssBase().replace(/\.brand-symbol\{[^}]+\}/, "")}\n${cssResponsiveFixes()}\n.hero-panel,.hero-services{position:relative;z-index:2}\n.quiet-moments,.check-strip{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.quiet-moments span,.check-strip span{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;background:var(--surface);padding:8px 11px;color:var(--muted);font-size:.88rem;font-weight:800}.signature-block .check-strip span{background:color-mix(in srgb,var(--primary-ink) 14%,transparent);border-color:color-mix(in srgb,var(--primary-ink) 24%,transparent);color:var(--primary-ink)}\n@media (max-width:620px){.asset-caption{position:absolute!important;left:10px!important;right:10px!important;bottom:10px!important;border:1px solid var(--line)!important;border-radius:8px!important}}\n${cssWowPass()}`);
for (const n of [1, 2, 3, 4, 5]) writeFile(`assets/theme-v${n}.css`, themeCss(n));
writeFile("assets/main.js", jsMain());
writeFile("assets/img/MANIFEST.md", manifestV2());
writeFile("assets/icons/leaf.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true"><path fill="#24452F" d="M52 8C31 9 12 21 12 42c0 8 6 14 14 14 21 0 32-26 26-48Zm-34 38c9-14 18-22 30-31-8 11-16 21-30 31Z"/></svg>`);

const pages = [
  ["index.html", "de", "Niwaki & Garten-Bonsai Zürich - Viktor Baumarchitektur", "Meister für Niwaki, japanische Ahorne und Nadelgehölze in Zürich. 27 Jahre Erfahrung, kostenlose Foto-Diagnose.", homeDe(), [localBusinessLd(), personLd(), faqLd()]],
  ["leistungen.html", "de", "Niwaki, japanischer Ahorn & Kiefer-Formschnitt", "Leistungen für Niwaki Schnitt, Acer palmatum Pflege und Formschnitt von Nadelgehölzen in der Schweiz.", servicesDe(), [localBusinessLd(), serviceLd("Niwaki, Ahorn und Kiefer-Formschnitt", "Japanische Baumpflege, Niwaki Schnitt und Formschnitt für Nadelgehölze.")]],
  ["philosophie.html", "de", "Philosophie & Meister - japanische Gartenkunst", "Vom Schiffsmechaniker zur Baumkunst: Viktors Weg, Naturgesetze, Dao und Schweizer Präzision.", philosophyDe(), [localBusinessLd(), personLd()]],
  ["galerie.html", "de", "Vorher / Nachher - Garten-Bonsai & Niwaki", "Vorher/Nachher Slots für Gartenbonsai, Niwaki Beispiele und Meisterarbeit von Viktor Baumarchitektur.", galleryDe(), [localBusinessLd()]],
  ["preise.html", "de", "Japanische Baumpflege - Preise & Kosten", "Preise für japanische Baumpflege: Arbeit ab 110 CHF pro Stunde, Anfahrt ab 90 CHF, Foto-Diagnose kostenlos.", pricesDe(), [localBusinessLd(), faqLd()]],
  ["blog/index.html", "de", "Niwaki Wissen - Topiarschere, Kronenenergie & Klimastress", "Fachliche Artikel von Viktor Baumarchitektur zu Topiarschere, Krone, Kiefer-Kerzen, Akadama, Wurzeln und Schweizer Klimastress.", blogIndexDeV2(), [localBusinessLd()]],
  ["blog/topiarschere.html", "de", "Topiarschere vs. Heckenschere - sauberer Schnitt", "Warum Viktor beim Formschnitt mit der Topiarschere arbeitet: sauberer Schnitt, weniger Energieverlust, japanisches Werkzeug.", articleTopiaryDeV2(), [localBusinessLd()]],
  ["blog/energie-krone.html", "de", "Krone öffnen - Energie, Licht und Luft im Niwaki", "Warum Viktor die Krone öffnet: Energieverteilung, Licht, Luft und langfristige Form statt schneller Heckenlogik.", articleCrownDeV2(), [localBusinessLd()]],
  ["blog/kiefer-kerzen.html", "de", "Kiefer-Kerzen schneiden - Timing bei Pinus", "Kiefer-Kerzen, Pinus-Formschnitt und warum der richtige Moment über die Zukunft der Wolkenform entscheidet.", articleCandlesDeV2(), [localBusinessLd()]],
  ["blog/boden-wurzeln.html", "de", "Akadama & Bonsai-Erde - der richtige Boden", "Akadama Schweiz, Bonsai Erde, pH 5,5-6,5 und gesunde Wurzeln als Fundament für japanische Baumkunst.", articleSoilDeV2(), [localBusinessLd()]],
  ["blog/klimastress.html", "de", "Klimastress im Schweizer Premium-Garten", "Warum Hitze, trockene Sommer und Starkregen wertvolle Gartenbäume belasten und frühe Foto-Diagnose hilft.", articleClimateDeV2(), [localBusinessLd()]],
  ["kontakt.html", "de", "Kontakt & kostenlose Foto-Diagnose - Baumpflege", "Kontakt zu Viktor Baumarchitektur: Foto senden, kostenlose Diagnose erhalten und Rückruf anfordern.", contactDe(), [localBusinessLd()]],
  ["impressum.html", "de", "Impressum - Viktor Baumarchitektur", "Platzhalter-Impressum für Viktor Baumarchitektur. Vor Veröffentlichung rechtlich ergänzen.", legalDe("impressum"), []],
  ["datenschutz.html", "de", "Datenschutz - Viktor Baumarchitektur", "Platzhalter-Datenschutzerklärung mit Consent Mode Hinweis. Vor Veröffentlichung rechtlich prüfen.", legalDe("datenschutz"), []],
  ["themes.html", "de", "Theme Preview - Viktor Baumarchitektur", "Interne Vorschau für Design Themes V1 bis V5.", themesPage(), []],
  ["en/index.html", "en", "Niwaki & Japanese Tree Art - Viktor Baumarchitektur", "Japanese tree care, niwaki and garden bonsai in the Zurich region. Free photo diagnosis.", homeEn(), [localBusinessLd(), personLd(), faqLd()]],
  ["en/leistungen.html", "en", "Services - Niwaki, Maples & Conifers", "English mirror for niwaki, Japanese maple and conifer shaping services.", genericEnPage("services"), [localBusinessLd(), serviceLd("Niwaki, maples and conifers", "Japanese tree care and shaping.")]],
  ["en/philosophie.html", "en", "Philosophy & Master - Japanese Garden Art", "Viktor's path from metal to living form, with Swiss precision and Japanese philosophy.", genericEnPage("philosophy"), [localBusinessLd(), personLd()]],
  ["en/galerie.html", "en", "Before / After - Garden Bonsai & Niwaki", "English gallery mirror with before/after slots and master-at-work placeholders.", genericEnPage("gallery"), [localBusinessLd()]],
  ["en/preise.html", "en", "Japanese Tree Care - Prices & Costs", "Prices: work from 110 CHF per hour, travel from 90 CHF, free photo diagnosis.", genericEnPage("prices"), [localBusinessLd(), faqLd()]],
  ["en/blog/index.html", "en", "Niwaki Knowledge - Tools, Crown Energy & Climate Stress", "English mirror articles about topiary scissors, crown energy, pine candles, roots and climate stress.", blogIndexEnV2(), [localBusinessLd()]],
  ["en/blog/topiarschere.html", "en", "Topiary Scissors vs Hedge Trimmer", "Why Viktor cuts with topiary scissors for cleaner tree shaping.", articleEnV2("topiary"), [localBusinessLd()]],
  ["en/blog/energie-krone.html", "en", "Opening the Crown - Energy, Light and Air", "Why Viktor opens a niwaki crown for light, air and long-term form.", articleEnV2("crown"), [localBusinessLd()]],
  ["en/blog/kiefer-kerzen.html", "en", "Pine Candles - Timing in Pinus Shaping", "Pine candles, timing and selective shaping for valuable conifers.", articleEnV2("candles"), [localBusinessLd()]],
  ["en/blog/boden-wurzeln.html", "en", "Akadama & Bonsai Soil - Healthy Roots", "Akadama, pH and healthy roots for Japanese tree care.", articleEnV2("soil"), [localBusinessLd()]],
  ["en/blog/klimastress.html", "en", "Climate Stress in Swiss Premium Gardens", "Why Swiss climate stress makes early tree diagnosis more valuable.", articleEnV2("climate"), [localBusinessLd()]],
  ["en/kontakt.html", "en", "Contact & Free Photo Diagnosis", "Send photos of your tree and request a free first assessment.", contactEn(), [localBusinessLd()]],
  ["en/impressum.html", "en", "Legal Notice - Viktor Baumarchitektur", "Placeholder legal notice. Complete before publication.", legalDe("impressum").replaceAll("Impressum", "Legal Notice").replaceAll("Datenschutzerklärung", "Privacy Policy"), []],
  ["en/datenschutz.html", "en", "Privacy Policy - Viktor Baumarchitektur", "Placeholder privacy policy. Complete before publication.", legalDe("datenschutz").replaceAll("Datenschutzerklärung", "Privacy Policy"), []]
  ,["en/themes.html", "en", "Theme Preview - Viktor Baumarchitektur", "Internal preview for design themes V1 to V5.", themesPage(), []],
  ["uk/index.html", "uk", "Viktor Baumarchitektur - український перегляд", "Тимчасове українське дзеркало сайту Viktor Baumarchitektur для внутрішнього перегляду.", homeDe(), [localBusinessLd(), personLd(), faqLd()]],
  ["uk/leistungen.html", "uk", "Послуги - Niwaki, японські клени та хвойні", "Тимчасове українське дзеркало сторінки послуг Viktor Baumarchitektur.", servicesDe(), [localBusinessLd(), serviceLd("Niwaki, Ahorn und Kiefer-Formschnitt", "Japanische Baumpflege, Niwaki Schnitt und Formschnitt für Nadelgehölze.")]],
  ["uk/philosophie.html", "uk", "Філософія та майстерність - Viktor Baumarchitektur", "Тимчасове українське дзеркало сторінки філософії та майстерності.", philosophyDe(), [localBusinessLd(), personLd()]],
  ["uk/galerie.html", "uk", "Галерея - до / після, Garten-Bonsai та Niwaki", "Тимчасове українське дзеркало галереї Viktor Baumarchitektur.", galleryDe(), [localBusinessLd()]],
  ["uk/preise.html", "uk", "Ціни - японський догляд за деревами", "Тимчасове українське дзеркало сторінки цін Viktor Baumarchitektur.", pricesDe(), [localBusinessLd(), faqLd()]],
  ["uk/blog/index.html", "uk", "Знання Niwaki - інструменти, крона та кліматичний стрес", "Тимчасове українське дзеркало блогу Viktor Baumarchitektur.", blogIndexDeV2(), [localBusinessLd()]],
  ["uk/blog/topiarschere.html", "uk", "Topiarschere vs. Heckenschere - чистий зріз", "Тимчасове українське дзеркало статті про інструмент і чистий зріз.", articleTopiaryDeV2(), [localBusinessLd()]],
  ["uk/blog/energie-krone.html", "uk", "Відкрити крону - енергія, світло і повітря", "Тимчасове українське дзеркало статті про енергію крони.", articleCrownDeV2(), [localBusinessLd()]],
  ["uk/blog/kiefer-kerzen.html", "uk", "Свічки сосни - timing у Pinus shaping", "Тимчасове українське дзеркало статті про свічки сосни.", articleCandlesDeV2(), [localBusinessLd()]],
  ["uk/blog/boden-wurzeln.html", "uk", "Akadama та коріння - правильний грунт", "Тимчасове українське дзеркало статті про Akadama, грунт і коріння.", articleSoilDeV2(), [localBusinessLd()]],
  ["uk/blog/klimastress.html", "uk", "Кліматичний стрес у преміум-саді Швейцарії", "Тимчасове українське дзеркало статті про кліматичний стрес.", articleClimateDeV2(), [localBusinessLd()]],
  ["uk/kontakt.html", "uk", "Контакт і безкоштовна фото-діагностика", "Тимчасове українське дзеркало контактної сторінки Viktor Baumarchitektur.", contactDe(), [localBusinessLd()]],
  ["uk/impressum.html", "uk", "Impressum - Viktor Baumarchitektur", "Тимчасове українське дзеркало legal notice. Перед публікацією перевірити юридично.", legalDe("impressum"), []],
  ["uk/datenschutz.html", "uk", "Datenschutz - Viktor Baumarchitektur", "Тимчасове українське дзеркало privacy policy. Перед публікацією перевірити юридично.", legalDe("datenschutz"), []],
  ["uk/themes.html", "uk", "Theme Preview - Viktor Baumarchitektur", "Внутрішній preview дизайн-тем V1-V5.", themesPage(), []]
];

const ukPageOverrides = new Map([
  ["uk/index.html", ["uk/index.html", "uk", "Viktor Baumarchitektur - український перегляд", "Українська версія сайту Viktor Baumarchitektur: Niwaki, японські клени, хвойні дерева і безкоштовна фото-діагностика.", homeUk(), [localBusinessLd(), personLd(), faqLd()]]],
  ["uk/leistungen.html", ["uk/leistungen.html", "uk", "Послуги - Niwaki, японські клени та хвойні", "Українська сторінка послуг Viktor Baumarchitektur: Niwaki, японські клени, сосни та хвойні дерева.", servicesUk(), [localBusinessLd(), serviceLd("Niwaki, Ahorn und Kiefer-Formschnitt", "Japanische Baumpflege, Niwaki Schnitt und Formschnitt für Nadelgehölze.")]]],
  ["uk/philosophie.html", ["uk/philosophie.html", "uk", "Філософія та майстерність - Viktor Baumarchitektur", "Українська сторінка про філософію, досвід і підхід Віктора до японської деревної архітектури.", genericUkPage("philosophy"), [localBusinessLd(), personLd()]]],
  ["uk/galerie.html", ["uk/galerie.html", "uk", "Галерея - до / після, Garten-Bonsai та Niwaki", "Українська галерея Viktor Baumarchitektur з фото-слотами та позначеними AI-концептами.", genericUkPage("gallery"), [localBusinessLd()]]],
  ["uk/preise.html", ["uk/preise.html", "uk", "Ціни - японський догляд за деревами", "Українська сторінка цін Viktor Baumarchitektur: робота від 110 CHF/год, виїзд від 90 CHF, фото-діагностика безкоштовна.", genericUkPage("prices"), [localBusinessLd(), faqLd()]]],
  ["uk/blog/index.html", ["uk/blog/index.html", "uk", "Знання Niwaki - інструменти, крона та кліматичний стрес", "Українські матеріали про Niwaki, японські ножиці, енергію крони, сосни, коріння і кліматичний стрес.", blogIndexUk(), [localBusinessLd()]]],
  ["uk/blog/topiarschere.html", ["uk/blog/topiarschere.html", "uk", "Японські ножиці проти тримера - чистий зріз", "Українська стаття про чистий зріз, японські ножиці і контроль майбутньої форми дерева.", articleUk("topiary"), [localBusinessLd()]]],
  ["uk/blog/energie-krone.html", ["uk/blog/energie-krone.html", "uk", "Відкрити крону - енергія, світло і повітря", "Українська стаття про те, чому крону Niwaki треба відкривати для світла, повітря і довгої форми.", articleUk("crown"), [localBusinessLd()]]],
  ["uk/blog/kiefer-kerzen.html", ["uk/blog/kiefer-kerzen.html", "uk", "Свічки сосни - правильний момент у формуванні Pinus", "Українська стаття про свічки сосни, timing і вибіркове формування хвойних дерев.", articleUk("candles"), [localBusinessLd()]]],
  ["uk/blog/boden-wurzeln.html", ["uk/blog/boden-wurzeln.html", "uk", "Akadama та коріння - правильний ґрунт", "Українська стаття про Akadama, ґрунт, pH і здорове коріння як фундамент японської деревної архітектури.", articleUk("soil"), [localBusinessLd()]]],
  ["uk/blog/klimastress.html", ["uk/blog/klimastress.html", "uk", "Кліматичний стрес у преміум-саді Швейцарії", "Українська стаття про спеку, сухі літа, сильні дощі і ранню фото-діагностику цінних садових дерев.", articleUk("climate"), [localBusinessLd()]]],
  ["uk/kontakt.html", ["uk/kontakt.html", "uk", "Контакт і безкоштовна фото-діагностика", "Українська контактна сторінка Viktor Baumarchitektur: надішліть фото дерева у WhatsApp або запросіть дзвінок.", contactUk(), [localBusinessLd()]]],
  ["uk/impressum.html", ["uk/impressum.html", "uk", "Юридична інформація - Viktor Baumarchitektur", "Українська чернетка юридичної сторінки. Перед публікацією потрібна юридична перевірка.", legalUk("impressum"), []]],
  ["uk/datenschutz.html", ["uk/datenschutz.html", "uk", "Політика приватності - Viktor Baumarchitektur", "Українська чернетка політики приватності. Перед публікацією потрібна юридична перевірка.", legalUk("datenschutz"), []]],
  ["uk/themes.html", ["uk/themes.html", "uk", "Theme Preview - Viktor Baumarchitektur", "Український внутрішній preview дизайн-тем V1-V5.", themesPageUk(), []]]
]);

const finalPages = pages.map((page) => ukPageOverrides.get(page[0]) || page);

for (const [file, lang, title, description, body, jsonLd] of finalPages) {
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
- ${domain}/blog/energie-krone
- ${domain}/blog/kiefer-kerzen
- ${domain}/blog/boden-wurzeln
- ${domain}/blog/klimastress
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
writeFile("README.md", readmeV2());
writeFile("tools/audit-site.mjs", auditScript());

console.log("Generated Viktor Baumarchitektur static site.");
