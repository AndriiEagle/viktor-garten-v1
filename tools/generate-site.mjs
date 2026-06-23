import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brand = "Viktor Baumarchitektur";
const brandWordmark = "Viktor Baumarchitektur";
const domain = "https://viktor-baumarchitektur.ch";
const phone = "+41783130330";
const phoneDisplay = "+41 78 313 03 30";
const telHref = `tel:${phone}`;
const instagramUrl = "https://www.instagram.com/viktor_bonsai_niwaki";
const facebookUrl = "https://www.facebook.com/viktor.bonsai.niwaki";
const assetVersion = "20260619-vivid-hero-balance";
const whatsappText = encodeURIComponent(
  "Guten Tag Viktor, ich sende Ihnen Fotos meines Baumes (Kanton: ..., Baumart: ...). Können Sie einschätzen, ob er zu retten ist?"
);
const whatsappHref = `https://wa.me/${phone.replace("+", "")}?text=${whatsappText}`;
const whatsappTextUk = encodeURIComponent(
  "Добрий день, Вікторе. Надсилаю фото свого дерева (кантон: ..., вид дерева: ...). Чи можете оцінити, чи його можна врятувати?"
);
const whatsappHrefUk = `https://wa.me/${phone.replace("+", "")}?text=${whatsappTextUk}`;
const ogImageFile = "foto/01_hero/hero-viktor-bonsai-main.webp";
const heroDesktopFile = "hero-viktor-bonsai-main.webp";
const heroMobileFile = "hero-viktor-bonsai-mobile.webp";
const ogImageUrl = `${domain}/assets/img/${ogImageFile}`;
const heroVariants = [
  {
    id: "1",
    names: { de: "Original", en: "Original", uk: "Оригінал" },
    desktop: photoPath("01_hero", heroDesktopFile),
    mobile: photoPath("01_hero", heroMobileFile),
    altPhoto: ["01_hero", heroDesktopFile]
  },
  {
    id: "2",
    names: { de: "Saftig", en: "Vivid", uk: "Соковито" },
    desktop: photoPath("01_hero", heroDesktopFile),
    mobile: photoPath("01_hero", heroMobileFile),
    altPhoto: ["01_hero", heroDesktopFile]
  },
  {
    id: "3",
    names: { de: "Hausbaum", en: "House tree", uk: "Біля дому" },
    desktop: photoPath("01_hero", "hero-sad-02.webp"),
    mobile: photoPath("01_hero", "hero-sad-02.webp"),
    altPhoto: ["01_hero", "hero-sad-02.webp"]
  },
  {
    id: "4",
    names: { de: "Gartenform", en: "Garden form", uk: "Форма саду" },
    desktop: photoPath("08_fonovi", "fon-foto-01.webp"),
    mobile: photoPath("08_fonovi", "fon-foto-01.webp"),
    altPhoto: ["08_fonovi", "fon-foto-01.webp"]
  },
  {
    id: "5",
    names: { de: "Solitaer", en: "Specimen", uk: "Солітер" },
    desktop: photoPath("08_fonovi", "fon-foto-02.webp"),
    mobile: photoPath("08_fonovi", "fon-foto-02.webp"),
    altPhoto: ["08_fonovi", "fon-foto-02.webp"]
  },
  {
    id: "6",
    names: { de: "Frisch", en: "Fresh", uk: "Свіжо" },
    desktop: photoPath("01_hero", heroDesktopFile),
    mobile: photoPath("01_hero", heroMobileFile),
    altPhoto: ["01_hero", heroDesktopFile]
  },
  {
    id: "7",
    names: { de: "Blauer Himmel", en: "Blue sky", uk: "Синє небо" },
    desktop: photoPath("08_fonovi", "fon-sosna-bila-01.webp"),
    mobile: photoPath("08_fonovi", "fon-sosna-bila-01.webp"),
    altPhoto: ["08_fonovi", "fon-sosna-bila-01.webp"]
  },
  {
    id: "8",
    names: { de: "Gartenflucht", en: "Garden escape", uk: "Садовий стан" },
    desktop: photoPath("03_galereya", "sosna-bila-01.webp"),
    mobile: photoPath("03_galereya", "sosna-bila-01.webp"),
    altPhoto: ["03_galereya", "sosna-bila-01.webp"]
  }
];
const photoCatalogPath = path.join(root, "tools", "photo-catalog.json");
const photoCatalog = fs.existsSync(photoCatalogPath)
  ? JSON.parse(fs.readFileSync(photoCatalogPath, "utf8"))
  : [];
const photoByPath = new Map(photoCatalog.map((item) => [item.path, item]));

function photoPath(folder, file) {
  return `foto/${folder}/${file}`;
}

function photo(folder, file) {
  return photoByPath.get(photoPath(folder, file)) || { folder, file, path: photoPath(folder, file), alt_de: "", alt_uk: "", species_lat: "", stage: "" };
}

function altEn(item, fallback) {
  if (item.path === ogImageFile) return "Japanese garden with niwaki and shaped trees in the Zurich region";
  if (item.folder === "07_viktor") return "I shape a pine by hand";
  if (item.folder === "08_fonovi") return "Quiet Swiss garden with shaped niwaki trees";
  if (item.folder === "09_pomylky") return "Close-up of pine candles and pruning detail";
  if (item.folder === "10_vidkrytka-yaponiya") return "Postcard from Japan with a bonsai motif";
  if (item.species_lat) return `${item.species_lat} as garden bonsai / niwaki, shaped by hand in the Zurich region`;
  return fallback;
}

function photoAlt(folder, file, lang = "de", fallback = "") {
  const item = photo(folder, file);
  if (lang === "uk") return item.alt_uk || fallback || item.alt_de || file;
  if (lang === "en") return altEn(item, fallback || item.alt_de || file);
  return item.alt_de || fallback || file;
}

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
  if (file === "fr/index.html") return "/fr/";
  if (file === "it/index.html") return "/it/";
  const without = file.replace(/\.html$/, "").replace(/\/index$/, "");
  return `/${without}`;
}

function fileFromCleanPath(urlPath) {
  if (urlPath === "/") return "index.html";
  if (urlPath === "/en/") return "en/index.html";
  if (urlPath === "/uk/") return "uk/index.html";
  if (urlPath === "/fr/") return "fr/index.html";
  if (urlPath === "/it/") return "it/index.html";
  const clean = urlPath.replace(/^\//, "");
  if (clean === "blog" || clean === "en/blog" || clean === "uk/blog") return `${clean}/index.html`;
  return `${clean}.html`;
}

function localizedFile(target, lang = "de") {
  if (lang === "de") return target;
  if (lang === "fr" || lang === "it") return target === "index.html" ? `${lang}/index.html` : target;
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

function assetSlot({ type = "real", file, label, ratio = "4 / 3", className = "", caption = null, kindLabel = null, loading = "lazy", fetchPriority = null }) {
  const assetPath = path.join(root, "assets", "img", file);
  const [widthRatio, heightRatio] = ratio.split("/").map((part) => Number.parseFloat(part.trim()));
  const width = Number.isFinite(widthRatio) ? Math.round(widthRatio * 300) : 1200;
  const height = Number.isFinite(heightRatio) ? Math.round(heightRatio * 300) : 900;
  const isAi = type === "ai";
  const priorityAttr = fetchPriority ? ` fetchpriority="${fetchPriority}"` : "";
  if (fs.existsSync(assetPath)) {
    return `
    <figure class="image-slot image-slot-real ${isAi ? "image-slot-ai" : ""} ${className}" style="--ratio:${ratio}" data-asset="${file}">
      <img src="__ASSET_PREFIX__assets/img/${file}" alt="${label}" loading="${loading}" decoding="async" width="${width}" height="${height}"${priorityAttr}>
    </figure>`;
  }
  const kind = kindLabel || "Bild";
  return `
    <figure class="image-slot ${isAi ? "image-slot-ai" : "image-slot-real"} ${className}" style="--ratio:${ratio}" data-asset="${file}">
      <div>
        <span>${kind}</span>
        <strong>${label}</strong>
        <small>${file}</small>
      </div>
    </figure>`;
}

function photoSlot({ folder, file, lang = "de", label = "", ratio = "4 / 3", className = "", loading = "lazy", fetchPriority = null }) {
  return assetSlot({
    file: photoPath(folder, file),
    label: photoAlt(folder, file, lang, label),
    ratio,
    className,
    loading,
    fetchPriority
  });
}

function heroVariantAlt(variant, lang, fallback) {
  const [folder, file] = variant.altPhoto;
  return photoAlt(folder, file, lang, fallback);
}

function heroPhotoSlot({ lang = "de", label = "Niwaki im Schweizer Garten" }) {
  const variant = heroVariants[0];
  const desktop = variant.desktop;
  const mobile = variant.mobile;
  const alt = heroVariantAlt(variant, lang, label);
  return `
    <figure class="image-slot image-slot-real hero-slot" style="--ratio:16 / 9" data-asset="${desktop}">
      <img class="hero-img-desktop" data-hero-desktop-image src="__ASSET_PREFIX__assets/img/${desktop}" alt="${alt}" loading="eager" decoding="async" width="2400" height="1350" fetchpriority="high">
      <img class="hero-img-mobile" data-hero-mobile-image src="__ASSET_PREFIX__assets/img/${mobile}" alt="${alt}" loading="eager" decoding="async" width="1200" height="1600" fetchpriority="high">
    </figure>`;
}

function heroVariantSwitcher(lang = "de", label = "Niwaki im Schweizer Garten") {
  const copy = {
    de: { label: "Hero", aria: "Hero-Foto Varianten", toggle: "Hero-Foto wählen" },
    en: { label: "Hero", aria: "Hero photo variants", toggle: "Choose hero photo" },
    uk: { label: "Hero", aria: "Варіанти hero-фото", toggle: "Вибрати hero-фото" }
  }[lang] || { label: "Hero", aria: "Hero photo variants" };
  const optionsId = `hero-variant-options-${lang}`;
  return `<div class="hero-variant-switcher" data-hero-switcher aria-label="${copy.aria}">
    <button class="hero-variant-toggle" type="button" data-hero-switcher-toggle aria-expanded="false" aria-controls="${optionsId}" aria-label="${copy.toggle}">
      <span>${copy.label}</span>
      <strong data-hero-active-label>1</strong>
    </button>
    <div class="hero-variant-options" id="${optionsId}" data-hero-variant-options hidden>
      ${heroVariants.map((variant) => `<button class="hero-variant-option" type="button" data-hero-variant-option="${variant.id}" data-hero-desktop-src="__ASSET_PREFIX__assets/img/${variant.desktop}" data-hero-mobile-src="__ASSET_PREFIX__assets/img/${variant.mobile}" data-hero-alt="${heroVariantAlt(variant, lang, label)}" aria-label="${copy.aria}: ${variant.names[lang] || variant.names.de}" aria-pressed="${variant.id === "1" ? "true" : "false"}">${variant.id}</button>`).join("")}
    </div>
  </div>`;
}

function photoImg({ folder, file, lang = "de", className = "", label = "", loading = "lazy", width = 1200, height = 900 }) {
  const src = photoPath(folder, file);
  return `<img${className ? ` class="${className}"` : ""} src="__ASSET_PREFIX__assets/img/${src}" alt="${photoAlt(folder, file, lang, label)}" loading="${loading}" decoding="async" width="${width}" height="${height}">`;
}

function contactPerson(lang = "de") {
  const copies = {
    de: {
      alt: "Ich mit Formschnittschere vor einem Niwaki",
      title: "Direkt mit mir",
      text: "Ihre Anfrage geht direkt an mich; ich schätze den Baum persönlich ein."
    },
    en: {
      alt: "Me with pruning shears in front of a Niwaki",
      title: "Directly with me",
      text: "Your request comes directly to me; I assess the tree personally."
    },
    uk: {
      alt: "Я із секатором біля Niwaki",
      title: "Напряму зі мною",
      text: "Запит потрапляє напряму до мене; я сам оцінюю дерево."
    }
  };
  const copy = copies[lang] || copies.de;
  return `<figure class="contact-person form-card"><img src="__ASSET_PREFIX__assets/img/foto/07_viktor/viktor-contact.jpg" alt="${copy.alt}" loading="eager" decoding="async" width="900" height="900"><figcaption><strong>${copy.title}</strong><span>${copy.text}</span></figcaption></figure>`;
}

function catalogItems(folders) {
  const wanted = new Set(folders);
  return photoCatalog.filter((item) => wanted.has(item.folder));
}

const galleryExclusions = new Set([
  "02_pryklady-robit/case-watereri-before.webp"
]);

const lowCrownContextFiles = [
  "case-terrace-after.webp",
  "sosna-bila-do-pislya-30.webp",
  "sosna-bila-do-pislya-31.webp",
  "sosna-bila-do-pislya-32.webp"
];

const beforeAfterArchiveExclusions = new Set(lowCrownContextFiles);

function publicGalleryItems(folders) {
  return catalogItems(folders).filter((item) => !galleryExclusions.has(`${item.folder}/${item.file}`));
}

function beforeAfterGalleryItems() {
  return publicGalleryItems(["02_pryklady-robit"]).filter((item) => item.file.includes("do-pislya") && !beforeAfterArchiveExclusions.has(item.file));
}

function workGalleryItems() {
  return [
    ...publicGalleryItems(["03_galereya"]),
    ...publicGalleryItems(["02_pryklady-robit"]).filter((item) => !item.file.includes("do-pislya"))
  ];
}

function selectedGalleryItems(folder, files) {
  return files.map((file) => photo(folder, file));
}

function gardenContextGalleryItems() {
  return selectedGalleryItems("01_hero", [
    "hero-sad-01.webp",
    "hero-sad-02.webp"
  ]);
}

function lowCrownContextGalleryItems() {
  return lowCrownContextFiles.map((file) => {
    const item = photo("02_pryklady-robit", file);
    return {
      ...item,
      alt_de: item.alt_de || "Low pine crown in a Japanese garden, pending before/after confirmation"
    };
  });
}

function niwakiCloudGalleryItems() {
  return [
    ...selectedGalleryItems("05_nivaki-khmarky", [
      "sosna-watereri-do-pislya-01.webp",
      "sosna-watereri-do-pislya-02.webp",
      "sosna-watereri-do-pislya-03.webp",
      "sosna-watereri-do-pislya-04.webp",
      "sosna-watereri-do-pislya-05.webp",
      "sosna-watereri-do-pislya-06.webp",
      "sosna-watereri-do-pislya-07.webp",
      "sosna-watereri-do-pislya-08.webp",
      "sosna-watereri-do-pislya-09.webp",
      "sosna-watereri-do-pislya-10.webp",
      "sosna-watereri-do-pislya-11.webp",
      "sosna-watereri-do-pislya-12.webp",
      "sosna-watereri-do-pislya-13.webp",
      "sosna-watereri-do-pislya-14.webp",
      "sosna-watereri-do-pislya-15.webp",
      "sosna-watereri-do-pislya-16.webp",
      "yalivets-01.webp",
      "yalivets-02.webp",
      "yalivets-03.webp",
      "yalivets-04.webp"
    ]),
    photo("06_yaponski-kleny", "klen-yaponskyi-01.webp")
  ];
}

function coniferGalleryItems() {
  return selectedGalleryItems("04_khvoyni", [
    "sosna-avstr-01.webp",
    "sosna-avstr-02.webp",
    "sosna-chorna-01.webp",
    "sosna-chorna-02.webp",
    "sosna-chorna-03.webp",
    "sosna-chorna-04.webp",
    "sosna-chorna-05.webp",
    "sosna-girska-01.webp",
    "sosna-girska-02.webp"
  ]);
}

function mapleGalleryItems() {
  return selectedGalleryItems("06_yaponski-kleny", [
    "klen-yaponskyi-02.webp",
    "klen-yaponskyi-03.webp",
    "klen-yaponskyi-04.webp"
  ]);
}

function viktorGalleryItems() {
  return selectedGalleryItems("07_viktor", [
    "viktor-01.webp",
    "viktor-02.webp",
    "viktor-03.webp",
    "viktor-07.webp",
    "viktor-08.webp",
    "viktor-09.webp",
    "viktor-10.webp"
  ]);
}

function detailGalleryItems() {
  return selectedGalleryItems("09_pomylky", [
    "pomylka-svichka-01.webp",
    "pomylka-svichka-02.webp"
  ]);
}

function photoGallery(items, lang = "de", limit = 42, options = {}) {
  const eagerCount = options.eagerCount ?? 12;
  const highPriorityCount = options.highPriorityCount ?? 2;
  return items.slice(0, limit).map((item, index) => {
    const loading = index < eagerCount ? "eager" : "lazy";
    const fetchPriority = index < highPriorityCount ? ' fetchpriority="high"' : "";
    return `
    <a class="gallery-photo" href="__ASSET_PREFIX__assets/img/${item.path}" data-lightbox>
      <img src="__ASSET_PREFIX__assets/img/${item.path}" alt="${photoAlt(item.folder, item.file, lang, item.alt_de)}" loading="${loading}" decoding="async" width="900" height="675"${fetchPriority}>
    </a>`;
  }).join("");
}

function galleryPhotoSection(copy, items, lang = "de") {
  if (!items.length) return "";
  return `
  <section class="section">
    <div class="section-head"><span class="eyebrow">${copy.eyebrow}</span><h2>${copy.title}</h2><p>${copy.text}</p></div>
    <div class="gallery-real-grid">${photoGallery(items, lang, items.length, { eagerCount: 0, highPriorityCount: 0 })}</div>
  </section>`;
}

const workPhoto = (file, position = "center center") => ({ folder: "02_pryklady-robit", file, position });
const workPhotos = (files, position = "center center") => files.map((file) => workPhoto(file, position));

const beforeAfterCases = [
  {
    id: "pinus-parviflora-ladder",
    preview: {
      before: workPhoto("case-parviflora-before.webp", "center center"),
      after: workPhoto("case-parviflora-after.webp", "center center")
    },
    series: {
      before: workPhotos(["case-parviflora-before.webp"]),
      after: workPhotos([
        "case-parviflora-after.webp",
        "sosna-bila-19.webp",
        "sosna-bila-20.webp",
        "sosna-bila-22.webp"
      ])
    },
    title: {
      de: "Pinus parviflora: vom dichten Block zur lesbaren Form",
      uk: "Pinus parviflora: з густого блоку в читабельну форму",
      en: "Pinus parviflora: from dense mass to readable form"
    },
    summary: {
      de: "Eine Pinus-parviflora-Arbeitsserie: nicht einfach kleiner geschnitten, sondern wieder in ruhige Ebenen gebracht.",
      uk: "Серія роботи з Pinus parviflora: не просто зменшити дерево, а повернути йому спокійні читабельні яруси.",
      en: "A Pinus parviflora work series: not simply cut smaller, but brought back into calm readable layers."
    },
    done: {
      de: "Dichte Partien geöffnet, störende Triebe selektiv entfernt und die Wolkenform wieder geordnet.",
      uk: "Відкрито густі місця, вибірково прибрано зайві пагони, повернуто ярусність крони.",
      en: "Dense areas were opened, distracting shoots were removed selectively and the cloud structure was restored."
    },
    why: {
      de: "So bekommen Licht, Luft und Kraft wieder Raum; die Form wirkt gepflegt, nicht hart gestutzt.",
      uk: "Дерево отримує світло і повітря, а форма не виглядає грубо підстриженою.",
      en: "Light and air can move through the crown again, so the result looks cared for, not roughly clipped."
    },
    value: {
      de: "Mein Wert liegt im Lesen der Struktur: Ich entscheide, was bleiben muss, damit der Baum in den nächsten Jahren schön weiterwächst.",
      uk: "Моя цінність - прочитати структуру дерева і не забрати зайве: результат має працювати не один день, а роками.",
      en: "My value is in reading the structure and keeping what the tree needs to grow well over the next years."
    }
  },
  {
    id: "terrace-niwaki-installation",
    preview: {
      before: workPhoto("case-terrace-before.webp", "center center"),
      after: workPhoto("sosna-bila-do-pislya-28.webp", "center center")
    },
    series: {
      before: workPhotos([
        "case-terrace-before.webp"
      ]),
      after: workPhotos([
        "sosna-bila-do-pislya-28.webp",
        "sosna-bila-do-pislya-29.webp"
      ])
    },
    title: {
      de: "Terrassen-Niwaki: vom Lieferzustand zur gesetzten Form",
      uk: "Terrassen-Niwaki: від доставленого дерева до поставленої форми",
      en: "Terrace Niwaki: from delivered tree to settled form"
    },
    summary: {
      de: "Diese Serie zeigt den Arbeitskontext: angeliefert, gesetzt und als ruhiger Solitär in die Terrasse integriert.",
      uk: "Ця серія показує робочий контекст: дерево доставлене, поставлене і включене в простір тераси.",
      en: "This series shows the work context: delivered, set in place and integrated into the terrace as a calm specimen."
    },
    done: {
      de: "Der Baum wurde vom Lieferzustand in die Gartensituation gebracht; die sichtbare Form bleibt ruhig und klar.",
      uk: "Дерево переведене з робочого/доставленого стану в садову ситуацію; видима форма стала спокійною і ясною.",
      en: "The tree moved from delivery/work context into the garden setting; the visible form stays calm and clear."
    },
    why: {
      de: "Ein wertvoller Niwaki wirkt nur dann hochwertig, wenn Baum, Terrasse, Blickachse und Pflanzplatz zusammenpassen.",
      uk: "Цінний Niwaki виглядає преміально тільки тоді, коли дерево, тераса, напрям погляду і місце посадки працюють разом.",
      en: "A valuable Niwaki only feels premium when tree, terrace, sightline and planting place work together."
    },
    value: {
      de: "Mein Wert liegt im Blick für das Ganze: Der Baum soll nicht nur schön sein, sondern an seinem Platz richtig wirken.",
      uk: "Моя цінність тут у баченні цілого: дерево має бути не просто красивим, а правильним у своєму місці.",
      en: "My value is in seeing the whole setting: the tree should not only be beautiful, but right in its place."
    }
  },
  {
    id: "taxus-topiary",
    preview: {
      before: workPhoto("case-taxus-before.webp", "center center"),
      after: workPhoto("tys-do-pislya-09.webp", "center center")
    },
    series: {
      before: workPhotos([
        "case-taxus-before.webp",
        "case-taxus-after.webp",
        "tys-do-pislya-08.webp",
        "tys-do-pislya-13.webp"
      ]),
      after: workPhotos([
        "tys-do-pislya-09.webp",
        "tys-do-pislya-10.webp",
        "tys-do-pislya-12.webp",
        "tys-do-pislya-07.webp"
      ])
    },
    title: {
      de: "Taxus baccata: Topiary ohne harte Wand",
      uk: "Taxus baccata: топіарій без грубої стінки",
      en: "Taxus baccata: topiary without a hard wall"
    },
    summary: {
      de: "Eibe hält Form gut, braucht aber einen ruhigen Aufbau statt schnellen Maschinenschnitt.",
      uk: "Тис добре тримає форму, але потребує спокійного ручного збору, а не швидкого машинного зрізу.",
      en: "Yew holds shape well, but needs calm hand correction instead of a quick mechanical cut."
    },
    done: {
      de: "Die Polster nachgearbeitet, der Umriss gesammelt und chaotischer Neuaustrieb entfernt.",
      uk: "Підчищено шапки, зібрано контур і прибрано хаотичний приріст.",
      en: "The pads were cleaned, the outline gathered and chaotic new growth removed."
    },
    why: {
      de: "So bleibt die Form präzise, ohne wie eine grob geschorene Hecke zu wirken.",
      uk: "Так форма лишається точною, але не виглядає як грубо підстрижена жива огорожа.",
      en: "The form stays precise without looking like a roughly clipped hedge."
    },
    value: {
      de: "Ich bringe die Linie zurück, ohne dem Baum seine lebendige Oberfläche zu nehmen.",
      uk: "Я повертаю лінію, але не забираю в дерева живу поверхню.",
      en: "I bring the line back without taking away the tree's living surface."
    }
  }
];

function localized(value, lang = "de") {
  return value[lang] || value.de;
}

function galleryCaseLabels(lang = "de") {
  if (lang === "uk") {
    return {
      before: "До",
      after: "Після",
      details: "Що зроблено",
      series: "Усі кадри цієї серії",
      beforeSeries: "До / робочий контекст",
      afterSeries: "Після",
      done: "Що зроблено",
      why: "Чому",
      value: "Моя цінність",
      close: "Закрити",
      modal: "Опис роботи до і після"
    };
  }
  if (lang === "en") {
    return {
      before: "Before",
      after: "After",
      details: "What was done",
      series: "All frames from this series",
      beforeSeries: "Before / work context",
      afterSeries: "After",
      done: "What was done",
      why: "Why",
      value: "My value",
      close: "Close",
      modal: "Before and after work description"
    };
  }
  return {
    before: "Vorher",
    after: "Nachher",
    details: "Was wurde gemacht",
    series: "Alle Bilder dieser Serie",
    beforeSeries: "Vorher / Arbeitskontext",
    afterSeries: "Nachher",
    done: "Was wurde gemacht",
    why: "Warum",
    value: "Mein Wert",
    close: "Schließen",
    modal: "Beschreibung der Vorher-Nachher-Arbeit"
  };
}

function caseImage(image, label, lang = "de", loading = "lazy", altText = "") {
  const item = photo(image.folder, image.file);
  const src = `__ASSET_PREFIX__assets/img/${item.path}`;
  const position = image.position || "center center";
  const style = ` style="--case-position:${position};--case-image:url('${src}')"`;
  return `<figure class="case-frame"${style}>
    <img src="${src}" alt="${altText || photoAlt(image.folder, image.file, lang, item.alt_de)}" loading="${loading}" decoding="async" width="900" height="675">
    <figcaption>${label}</figcaption>
  </figure>`;
}

function imageKey(image) {
  return `${image.folder}/${image.file}`;
}

function casePreview(item) {
  return item.preview || { before: item.before, after: item.after };
}

function caseSeriesImages(item, stage) {
  const preview = casePreview(item);
  const fallback = stage === "before" ? [preview.before] : [preview.after];
  return item.series?.[stage] || fallback;
}

function caseAdditionalSeries(item, stage) {
  const preview = casePreview(item);
  const previewKeys = new Set([imageKey(preview.before), imageKey(preview.after)]);
  return caseSeriesImages(item, stage).filter((image) => !previewKeys.has(imageKey(image)));
}

function caseSeriesGroup(title, images, imageLabel, item, lang = "de") {
  if (!images.length) return "";
  const titleText = localized(item.title, lang);
  const frames = images.map((image, index) =>
    caseImage(image, imageLabel, lang, "lazy", `${imageLabel}: ${titleText} ${index + 1}`)
  ).join("");
  return `<section class="case-series-group">
    <h3>${title}</h3>
    <div class="case-series-grid">${frames}</div>
  </section>`;
}

function caseSeriesBlock(item, labels, lang = "de") {
  const before = caseAdditionalSeries(item, "before");
  const after = caseAdditionalSeries(item, "after");
  if (!before.length && !after.length) return "";
  return `<div class="case-series">
    <h3>${labels.series}</h3>
    ${caseSeriesGroup(labels.beforeSeries, before, labels.before, item, lang)}
    ${caseSeriesGroup(labels.afterSeries, after, labels.after, item, lang)}
  </div>`;
}

function galleryCaseStudies(lang = "de") {
  const labels = galleryCaseLabels(lang);
  const cards = beforeAfterCases.map((item, index) => {
    const preview = casePreview(item);
    return `
    <a class="case-card" href="#case-${item.id}" data-case-open="${item.id}" aria-haspopup="dialog">
      <div class="case-pair">
        ${caseImage(preview.before, labels.before, lang, index < 2 ? "eager" : "lazy", `${labels.before}: ${localized(item.title, lang)}`)}
        ${caseImage(preview.after, labels.after, lang, index < 2 ? "eager" : "lazy", `${labels.after}: ${localized(item.title, lang)}`)}
      </div>
      <span class="case-copy">
        <strong>${localized(item.title, lang)}</strong>
        <span>${localized(item.summary, lang)}</span>
        <em>${labels.details} -></em>
      </span>
    </a>`;
  }).join("");
  const panels = beforeAfterCases.map((item) => {
    const preview = casePreview(item);
    return `
    <article class="case-detail" data-case-panel="${item.id}" hidden>
      <div class="case-detail-media">
        <div class="case-detail-pair">
          ${caseImage(preview.before, labels.before, lang, "lazy", `${labels.before}: ${localized(item.title, lang)}`)}
          ${caseImage(preview.after, labels.after, lang, "lazy", `${labels.after}: ${localized(item.title, lang)}`)}
        </div>
        ${caseSeriesBlock(item, labels, lang)}
      </div>
      <div class="case-detail-copy">
        <span class="eyebrow">${labels.details}</span>
        <h2>${localized(item.title, lang)}</h2>
        <p>${localized(item.summary, lang)}</p>
        <dl class="case-notes">
          <div><dt>${labels.done}</dt><dd>${localized(item.done, lang)}</dd></div>
          <div><dt>${labels.why}</dt><dd>${localized(item.why, lang)}</dd></div>
          <div><dt>${labels.value}</dt><dd>${localized(item.value, lang)}</dd></div>
        </dl>
      </div>
    </article>`;
  }).join("");
  return `
    <div class="case-grid">${cards}</div>
    <div class="case-modal" data-case-modal hidden aria-hidden="true">
      <button class="case-modal-backdrop" type="button" data-case-close aria-label="${labels.close}"></button>
      <div class="case-modal-panel" role="dialog" aria-modal="true" aria-label="${labels.modal}">
        <button class="case-modal-close" type="button" data-case-close aria-label="${labels.close}">&times;</button>
        ${panels}
      </div>
    </div>`;
}

function meisterImageCarousel(prefix = "__ASSET_PREFIX__assets/img/") {
  const slides = [
    ["baumarchitektur-korrektur.png", "Baumarchitektur: selektive Korrektur und Erhalt der lebenden Struktur"],
    ["baumarchitektur-live-crown-ratio.png", "Baumarchitektur: lebende Krone und Stammstruktur verstehen"]
  ];
  return `
    <figure class="image-carousel meister-carousel" data-image-carousel aria-label="Baumarchitektur Erklaerungen">
      <div class="image-carousel-track" data-carousel-track>
        ${slides.map(([file, alt]) => `<img class="image-carousel-slide" src="${prefix}${file}" alt="${alt}" loading="eager" decoding="async" fetchpriority="low" width="1448" height="1086">`).join("")}
      </div>
      <button class="image-carousel-btn image-carousel-prev" type="button" data-carousel-prev aria-label="Vorheriges Bild">&lsaquo;</button>
      <button class="image-carousel-btn image-carousel-next" type="button" data-carousel-next aria-label="Naechstes Bild">&rsaquo;</button>
      <div class="image-carousel-dots" aria-label="Bildauswahl">
        <button type="button" class="image-carousel-dot is-active" data-carousel-dot aria-label="Bild 1 anzeigen" aria-current="true"></button>
        <button type="button" class="image-carousel-dot" data-carousel-dot aria-label="Bild 2 anzeigen"></button>
      </div>
    </figure>`;
}

function assetSlotUk(options) {
  return assetSlot({
    ...options,
    kindLabel: options.kindLabel || "Зображення"
  });
}

function conceptRescueSlider(lang = "de") {
  const de = lang === "de";
  const uk = lang === "uk";
  const aria = de ? "Vorher-Nachher Vergleich" : uk ? "Порівняння до і після" : "Before and after comparison";
  const beforeLabel = de ? "Vorher" : uk ? "До" : "Before";
  const afterLabel = de ? "Nachher" : uk ? "Після" : "After";
  const rangeLabel = de ? "Vergleich schieben" : uk ? "Пересунути порівняння" : "Slide comparison";
  return `
    <figure class="before-after-slider" data-before-after-slider style="--split:52%" aria-label="${aria}">
      <div class="before-after-stage">
        ${photoImg({ folder: "02_pryklady-robit", file: "case-parviflora-after.webp", lang, className: "after-img", label: de ? "Japanische Weisskiefer nach Niwaki-Formschnitt" : "Japanese white pine after niwaki shaping", width: 900, height: 675 })}
        <div class="before-layer">
          ${photoImg({ folder: "02_pryklady-robit", file: "case-parviflora-before.webp", lang, label: de ? "Japanische Weisskiefer vor der Korrektur" : "Japanese white pine before correction", width: 900, height: 675 })}
        </div>
        <span class="slider-badge slider-badge-before">${beforeLabel}</span>
        <span class="slider-badge slider-badge-after">${afterLabel}</span>
      </div>
      <input class="before-after-range" type="range" min="8" max="92" value="52" aria-label="${rangeLabel}">
    </figure>`;
}

const serviceCardsDe = `
  <div class="card service-card">
    <span class="eyebrow">Niwaki</span>
    <h3>Garten-Bonsai</h3>
    <p>Pflege und Formung von Niwaki - Gartenbäumen wie Kiefer (Pinus), Eibe (Taxus) und Wacholder (Juniperus). Jede Wolke erhält Raum für Licht, Luft und Kraft.</p>
    <a href="leistungen.html#niwaki">Niwaki Schnitt ansehen</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Acer palmatum</span>
    <h3>Japanische Ahorne</h3>
    <p>Japanischer Ahorn (Acer palmatum) und Schlitzahorn (Acer palmatum Dissectum-Gruppe): saisonale Formung, Totholz, Moos und Pilzdruck.</p>
    <a href="leistungen.html#ahorn">Acer palmatum Pflege</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Pinus & Taxus</span>
    <h3>Nadelgehölze</h3>
    <p>Kiefer (Pinus), Eibe (Taxus baccata), Wacholder (Juniperus), Tanne (Abies) und Fichte (Picea). Sauberer Schnitt von Hand.</p>
    <a href="leistungen.html#nadelgehoelze">Kiefer-Formschnitt</a>
  </div>`;

const serviceCardsEn = `
  <div class="card service-card">
    <span class="eyebrow">Niwaki</span>
    <h3>Garden bonsai</h3>
    <p>Care and shaping of niwaki: pines (Pinus), yew (Taxus) and juniper (Juniperus) as living garden trees.</p>
    <a href="leistungen.html#niwaki">Niwaki care</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Acer palmatum</span>
    <h3>Japanese maples</h3>
    <p>Japanese maple (Acer palmatum) and dissected maple forms: seasonal shaping, deadwood, moss and fungal pressure.</p>
    <a href="leistungen.html#ahorn">Maple care</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Pinus & Taxus</span>
    <h3>Conifers</h3>
    <p>Pine (Pinus), yew (Taxus baccata), juniper (Juniperus), fir (Abies) and spruce (Picea). Clean hand cuts.</p>
    <a href="leistungen.html#nadelgehoelze">Pine shaping</a>
  </div>`;

const plantNameRows = [
  {
    de: "Japanischer Ahorn / Fächerahorn",
    botanical: "Acer palmatum",
    en: "Japanese maple",
    uk: "японський клен",
    noteDe: "Feine Kronenpflege, Licht, Totholz und Blattgesundheit.",
    noteEn: "Fine crown care, light, deadwood and leaf health.",
    noteUk: "Тонкий догляд за кроною, світло, суха деревина і здоровʼя листя."
  },
  {
    de: "Schlitzahorn",
    botanical: "Acer palmatum Dissectum-Gruppe",
    en: "dissected Japanese maple",
    uk: "розсіченолистий японський клен",
    noteDe: "Sehr feine Triebe, empfindliche Silhouette, vorsichtige Handarbeit.",
    noteEn: "Very fine shoots, sensitive silhouette and careful hand work.",
    noteUk: "Дуже тонкі пагони, чутлива силуетна форма, обережна ручна робота."
  },
  {
    de: "Waldkiefer",
    botanical: "Pinus sylvestris",
    en: "Scots pine",
    uk: "сосна звичайна",
    noteDe: "Formschnitt, Kronenöffnung und langfristige Wolkenstruktur.",
    noteEn: "Shaping, crown opening and long-term cloud structure.",
    noteUk: "Формування, відкриття крони і довга хмарна структура."
  },
  {
    de: "Bergkiefer",
    botanical: "Pinus mugo",
    en: "mountain pine",
    uk: "сосна гірська",
    noteDe: "Kompakte Wuchsform, gute Kandidatin für ruhige Niwaki-Pflege.",
    noteEn: "Compact growth, often suitable for calm niwaki care.",
    noteUk: "Компактний ріст, часто підходить для спокійного Niwaki-догляду."
  },
  {
    de: "Japanische Schwarzkiefer",
    botanical: "Pinus thunbergii",
    en: "Japanese black pine",
    uk: "японська чорна сосна",
    noteDe: "Kerzen, Nadelpflege und sehr bewusstes Timing.",
    noteEn: "Candles, needle care and very deliberate timing.",
    noteUk: "Свічки, догляд за хвоєю і дуже точний момент роботи."
  },
  {
    de: "Mädchen-Kiefer / Japanische Weisskiefer",
    botanical: "Pinus parviflora",
    en: "Japanese white pine",
    uk: "японська біла сосна",
    noteDe: "Feine Nadeln, elegante Silhouette und sensible Korrektur.",
    noteEn: "Fine needles, elegant silhouette and sensitive correction.",
    noteUk: "Тонка хвоя, елегантний силует і делікатна корекція."
  },
  {
    de: "Japanische Rotkiefer",
    botanical: "Pinus densiflora",
    en: "Japanese red pine",
    uk: "японська червона сосна",
    noteDe: "Ruhige Linienführung und selektive Triebpflege.",
    noteEn: "Calm line work and selective shoot care.",
    noteUk: "Спокійна лінія форми і вибірковий догляд за пагонами."
  },
  {
    de: "Weymouth-Kiefer",
    botanical: "Pinus strobus",
    en: "eastern white pine",
    uk: "веймутова сосна",
    noteDe: "Weicher Wuchs, braucht vorsichtige Form- und Gesundheitsdiagnose.",
    noteEn: "Softer growth, needs careful shape and health diagnosis.",
    noteUk: "Мʼякий ріст, потребує обережної діагностики форми і здоровʼя."
  },
  {
    de: "Europäische Eibe",
    botanical: "Taxus baccata",
    en: "European yew",
    uk: "тис ягідний",
    noteDe: "Sehr formstark, aber nicht als harte Wand behandeln.",
    noteEn: "Holds shape well, but should not be treated as a hard wall.",
    noteUk: "Добре тримає форму, але не має стригтися як жорстка стіна."
  },
  {
    de: "Wacholder",
    botanical: "Juniperus",
    en: "juniper",
    uk: "ялівець",
    noteDe: "Struktur, Licht und trockene Innenbereiche genau prüfen.",
    noteEn: "Structure, light and dry inner areas need close checking.",
    noteUk: "Потрібно уважно дивитися структуру, світло і сухість всередині."
  },
  {
    de: "Tanne",
    botanical: "Abies",
    en: "fir",
    uk: "ялиця",
    noteDe: "Nur mit Respekt vor Art, Austrieb und altem Holz schneiden.",
    noteEn: "Cut only with respect for species, new growth and old wood.",
    noteUk: "Різати тільки з повагою до виду, нового росту і старої деревини."
  },
  {
    de: "Fichte",
    botanical: "Picea",
    en: "spruce",
    uk: "смерека / ялина",
    noteDe: "Dichte Kronen, Nadelverlust und Feuchtigkeit früh einordnen.",
    noteEn: "Dense crowns, needle loss and moisture need early interpretation.",
    noteUk: "Щільну крону, втрату хвої і вологість треба оцінювати рано."
  }
];

function plantNameGuideDe() {
  return `<section class="section plant-name-guide" id="pflanzen">
    <div class="section-head">
      <span class="eyebrow">Pflanzen-Namen</span>
      <h2>Deutsche und botanische Namen.</h2>
      <p>Damit bei Foto-Diagnose, Angebot und Pflegeplan klar ist, über welches Gehölz wir sprechen, verwende ich deutsche Namen zusammen mit botanischen Namen.</p>
    </div>
    <div class="plant-table-wrap"><table class="plant-name-table">
      <thead><tr><th>Deutscher Name</th><th>Botanischer Name</th><th>Einordnung in meiner Arbeit</th></tr></thead>
      <tbody>${plantNameRows.map((row) => `<tr><td>${row.de}</td><td><em>${row.botanical}</em></td><td>${row.noteDe}</td></tr>`).join("")}</tbody>
    </table></div>
  </section>`;
}

function plantNameGuideEn() {
  return `<section class="section plant-name-guide" id="plants">
    <div class="section-head">
      <span class="eyebrow">Plant names</span>
      <h2>German and botanical names.</h2>
      <p>I use German names together with botanical names so diagnosis, offer and care plan stay precise.</p>
    </div>
    <div class="plant-table-wrap"><table class="plant-name-table">
      <thead><tr><th>German name</th><th>Botanical name</th><th>English / practical context</th></tr></thead>
      <tbody>${plantNameRows.map((row) => `<tr><td>${row.de}</td><td><em>${row.botanical}</em></td><td>${row.en}: ${row.noteEn}</td></tr>`).join("")}</tbody>
    </table></div>
  </section>`;
}

function plantNameGuideUk() {
  return `<section class="section plant-name-guide" id="pflanzen">
    <div class="section-head">
      <span class="eyebrow">Назви рослин</span>
      <h2>Німецькі та ботанічні назви.</h2>
      <p>Щоб у фото-діагностиці, пропозиції і плані догляду було зрозуміло, про яке дерево йдеться, я показую німецьку назву поруч із латинською.</p>
    </div>
    <div class="plant-table-wrap"><table class="plant-name-table">
      <thead><tr><th>Німецька назва</th><th>Ботанічна назва</th><th>Українське пояснення</th></tr></thead>
      <tbody>${plantNameRows.map((row) => `<tr><td>${row.de}</td><td><em>${row.botanical}</em></td><td>${row.uk}: ${row.noteUk}</td></tr>`).join("")}</tbody>
    </table></div>
  </section>`;
}

function frItPlaceholderPage(lang) {
  const isFr = lang === "fr";
  const copy = isFr
    ? {
        eyebrow: "Version future",
        h1: "Version française en préparation.",
        lead: "Cette page est une maquette locale. La version française complète sera préparée plus tard comme un projet séparé: traduction humaine, adaptation SEO, contrôle juridique et vérification mobile.",
        statusTitle: "Etat actuel",
        status: "Les versions allemandes, anglaises et ukrainiennes restent les seules versions de contenu réellement préparées.",
        scopeTitle: "Rappel du scope",
        scope: "Ne pas traduire automatiquement tout le site. La version française doit reprendre les services, prix, formulaire, pages légales et articles de savoir avec les bons mots horticoles.",
        todoTitle: "A faire plus tard",
        todos: ["Traduire les pages principales", "Adapter SEO local Suisse romande", "Relire les termes botaniques", "Verifier les pages legales", "Tester navigation, formulaires et mobile"],
        primary: "Voir la version allemande",
        secondary: "Envoyer des photos"
      }
    : {
        eyebrow: "Versione futura",
        h1: "Versione italiana in preparazione.",
        lead: "Questa pagina è una maquette locale. La versione italiana completa sarà preparata più tardi come progetto separato: traduzione umana, adattamento SEO, controllo legale e verifica mobile.",
        statusTitle: "Stato attuale",
        status: "Le versioni tedesca, inglese e ucraina restano le uniche versioni di contenuto realmente preparate.",
        scopeTitle: "Promemoria del scope",
        scope: "Non tradurre automaticamente tutto il sito. La versione italiana deve coprire servizi, prezzi, modulo, pagine legali e articoli tecnici con i termini orticoli corretti.",
        todoTitle: "Da fare più tardi",
        todos: ["Tradurre le pagine principali", "Adattare la SEO per la Svizzera italiana", "Controllare i termini botanici", "Verificare le pagine legali", "Testare navigazione, moduli e mobile"],
        primary: "Vedere la versione tedesca",
        secondary: "Inviare foto"
      };
  return `<section class="page-hero section language-placeholder">
    <span class="eyebrow">${copy.eyebrow}</span>
    <h1>${copy.h1}</h1>
    <p>${copy.lead}</p>
    <div class="btn-row"><a class="btn btn-primary" href="__ASSET_PREFIX__index.html">${copy.primary}</a><a class="btn btn-secondary" href="__ASSET_PREFIX__kontakt.html">${copy.secondary}</a></div>
  </section>
  <section class="section language-placeholder-grid">
    <article class="card"><span class="eyebrow">Status</span><h2>${copy.statusTitle}</h2><p>${copy.status}</p></article>
    <article class="card"><span class="eyebrow">Scope</span><h2>${copy.scopeTitle}</h2><p>${copy.scope}</p></article>
    <article class="card"><span class="eyebrow">Reminder</span><h2>${copy.todoTitle}</h2><ul>${copy.todos.map((todo) => `<li>${todo}</li>`).join("")}</ul></article>
  </section>`;
}

function frItLocalizationReminder() {
  return `# FR/IT Localization Reminder

Status: prepared as stubs only. Do not treat French or Italian as published content versions.

Current local stubs:
- fr/index.html - French coming-later mockup, noindex.
- it/index.html - Italian coming-later mockup, noindex.

Later full scope:
- Translate the core pages: home, services, philosophy, gallery, prices, contact.
- Decide whether blog/Wissen gets full FR/IT or only selected articles.
- Review horticultural terms: Niwaki, Garten-Bonsai, Acer palmatum, Pinus, Taxus baccata, Juniperus, Abies, Picea.
- Adapt SEO for Suisse romande and Svizzera italiana instead of direct word-for-word translation.
- Add full FR/IT hreflang sets only after real translated pages exist.
- Review legal pages and privacy language before publication.
- Run mobile/header/form checks for both new languages.

Approval gate: start full FR/IT only after Andrii explicitly says to build the real French/Italian versions.
`;
}

function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand,
    url: domain,
    image: ogImageUrl,
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
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Acer palmatum Pflege / Japanischer Ahorn" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pinus Formschnitt / Kiefer" } }
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
    knowsAbout: ["Niwaki", "Garten-Bonsai", "Acer palmatum", "Pinus", "Taxus baccata", "Juniperus", "Kiefer Formschnitt", "Topiarschere"],
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
          text: "Senden Sie Fotos vom ganzen Baum, der Problemstelle und einer Nahaufnahme. Ich prüfe zuerst kostenlos, ob der Baum zu retten ist und welcher Schnitt sinnvoll ist."
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
  if (lang === "fr") {
    return [
      ["Francais bientot", "fr/index.html"],
      ["Deutsch", "index.html"],
      ["Contact", "kontakt.html"]
    ].map(([label, target]) => `<a href="${prefix}${target}"${file === target ? " aria-current=\"page\"" : ""}>${label}</a>`).join("");
  }
  if (lang === "it") {
    return [
      ["Italiano presto", "it/index.html"],
      ["Deutsch", "index.html"],
      ["Contatto", "kontakt.html"]
    ].map(([label, target]) => `<a href="${prefix}${target}"${file === target ? " aria-current=\"page\"" : ""}>${label}</a>`).join("");
  }
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
  const preloadHero = file === "index.html" || file === "en/index.html" || file === "uk/index.html";
  const noindex = file === "fr/index.html" || file === "it/index.html";
  const canonicalPath = pagePathFromFile(file, lang);
  const basePath = canonicalPath.replace(/^\/(en|uk|fr|it)(?=\/|$)/, "") || "/";
  const dePath = basePath;
  const enPath = basePath === "/" ? "/en/" : `/en${basePath}`;
  const ukPath = basePath === "/" ? "/uk/" : `/uk${basePath}`;
  const frPath = "/fr/";
  const itPath = "/it/";
  const languageSwitch = [
    ["DE", dePath],
    ["EN", enPath],
    ["UA", ukPath],
    ["FR", frPath],
    ["IT", itPath]
  ].map(([label, targetPath]) => `<a href="${prefix}${fileFromCleanPath(targetPath)}"${targetPath === canonicalPath ? " aria-current=\"true\"" : ""}>${label}</a>`).join(" / ");
  const home = `${prefix}${localizedFile("index.html", lang)}`;
  const contact = `${prefix}${localizedFile("kontakt.html", lang)}`;
  const legal = `${prefix}${localizedFile("impressum.html", lang)}`;
  const privacy = `${prefix}${localizedFile("datenschutz.html", lang)}`;
  const services = `${prefix}${localizedFile("leistungen.html", lang)}`;
  const ui = lang === "fr"
    ? {
        htmlLang: "fr",
        skip: "Aller au contenu",
        menu: "Ouvrir le menu",
        photoDiagnosis: "Diagnostic photo gratuit",
        brandLine: "Arbres formes · Niwaki · Evergreen Design",
        footerDescription: "Art japonais de l'arbre, niwaki, bonsai de jardin et taille de forme dans la region de Zurich.",
        footerServices: "Services",
        footerNiwaki: "Niwaki",
        footerMaples: "Erables japonais",
        footerConifers: "Coniferes",
        footerAreas: "Cantons",
        footerContact: "Contact",
        legalLabel: "Mentions legales",
        mobilePhoto: "Envoyer une photo",
        whatsappHref,
        credit: "Website by Andrii · Statut: version francaise en attente; traduction, SEO et legal doivent etre valides avant publication.",
        quickBar: "Barre de contact rapide",
        call: "Appeler",
        consent: "Mesure analytics et ads seulement apres consentement. Standard: refuse.",
        privacyLabel: "Confidentialite",
        deny: "Refuser",
        accept: "Accepter"
      }
    : lang === "it"
      ? {
          htmlLang: "it",
          skip: "Vai al contenuto",
          menu: "Apri menu",
          photoDiagnosis: "Diagnosi fotografica gratuita",
          brandLine: "Alberi modellati · Niwaki · Evergreen Design",
          footerDescription: "Arte giapponese degli alberi, niwaki, bonsai da giardino e potatura di forma nella regione di Zurigo.",
          footerServices: "Servizi",
          footerNiwaki: "Niwaki",
          footerMaples: "Aceri giapponesi",
          footerConifers: "Conifere",
          footerAreas: "Cantoni",
          footerContact: "Contatto",
          legalLabel: "Note legali",
          mobilePhoto: "Invia foto",
          whatsappHref,
          credit: "Website by Andrii · Stato: versione italiana in attesa; traduzione, SEO e legale devono essere validati prima della pubblicazione.",
          quickBar: "Barra contatto rapida",
          call: "Chiamare",
          consent: "Analytics e ads solo dopo consenso. Standard: rifiutato.",
          privacyLabel: "Privacy",
          deny: "Rifiuta",
          accept: "Accetta"
        }
      : lang === "uk"
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
          brandLine: "Gartenbonsais · Gartengestaltung · Formgehölze",
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
          credit: "Website by Andrii · Status: legal data, contact delivery, GA4, Ads and final photos need review before publication.",
          quickBar: "Schnelle Kontaktleiste",
          call: "Anrufen",
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
          credit: "Website by Andrii · Status: legal data, contact delivery, GA4, Ads and final photos need review before publication.",
          quickBar: "Quick contact bar",
          call: "Call",
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
  ${noindex ? `<meta name="robots" content="noindex,follow">` : ""}
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
  <meta property="og:image" content="${ogImageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  ${preloadHero ? `<link rel="preload" as="image" href="${prefix}assets/img/${ogImageFile}" fetchpriority="high">` : ""}
  <link id="theme-link" rel="stylesheet" href="${prefix}assets/theme-v4.css">
  <link rel="stylesheet" href="${prefix}assets/base.css?v=${assetVersion}">
  <link rel="manifest" href="${prefix}site.webmanifest">
  ${renderJsonLd(jsonLd)}
</head>
<body class="${pageClass}">
  <a class="skip-link" href="#main">${ui.skip}</a>
  <header class="site-header" data-header>
    <a class="brand" href="${home}" aria-label="${brandWordmark}">
      <img class="brand-logo" src="${prefix}assets/img/logo.png" alt="${brandWordmark}" loading="eager" decoding="async" width="53" height="53">
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

  <div class="cookie-banner" data-consent-banner hidden>
    <p>${ui.consent} <a href="${privacy}">${ui.privacyLabel}</a></p>
    <div>
      <button class="btn btn-secondary" type="button" data-consent-deny>${ui.deny}</button>
      <button class="btn btn-primary" type="button" data-consent-accept>${ui.accept}</button>
    </div>
  </div>
  <div class="toast" data-toast hidden></div>
  <script src="${prefix}assets/main.js?v=${assetVersion}" defer></script>
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
      <p>Send a photo of the problem area. I will tell you honestly whether and how the tree can be saved.</p>
      <div class="btn-row">${cta("Send photo - free diagnosis")} <a class="btn btn-secondary" href="${contactPrefix}kontakt.html#rueckruf" data-event="cta_callback_click">Request callback</a></div>
    </div>
  </section>`;
}

function homeDe() {
  return `
  <section class="hero section" data-hero-root data-hero-variant="1">
    <div class="hero-media">${heroPhotoSlot({ lang: "de", label: "Niwaki im Schweizer Garten" })}</div>
    <div class="hero-panel">
      <span class="eyebrow">NIWAKI (GARTENBONSAIS) PFLEGE · BAUMARCHITEKTUR · PFLEGE JAPANISCHER AHORNE · KRONENGESTALTUNG · EXKLUSIVE GEHÖLZPFLEGE</span>
      <h1>Gartenbonsais (<span class="hero-accent">Niwaki</span>) & japanische Baumkunst in der Schweiz</h1>
      <p class="motto">Schweizer Qualität mit japanischer Philosophie.</p>
      <p class="hero-copy hero-copy-desktop">Als Meister für <strong>Niwaki und Garten-Bonsai</strong> in der <strong>Region Zürich</strong> forme und pflege ich seit 27 Jahren japanische Ahorne, Kiefern und Nadelgehölze - so, dass Ihr Baum über Jahre seine Form, seine Kraft und seine Gesundheit behält.</p>
      <p class="hero-copy hero-copy-mobile">27 Jahre Niwaki-Pflege in der Region Zürich: präzise Handarbeit für Form, Kraft und Gesundheit.</p>
      <div class="btn-row">${cta("Foto senden - kostenlose Diagnose")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Rückruf anfordern</a></div>
      <div class="trust-row"><span class="experience-pill"><strong>27</strong> Jahre Erfahrung</span><span>Region Zürich</span><span>Inspiriert in Japan</span></div>
    </div>
    ${heroVariantSwitcher("de", "Niwaki im Schweizer Garten")}
  </section>

  <section class="section rescue-section">
    <div class="section-head">
      <span class="eyebrow">Vorher / Nachher</span>
      <h2>Wenn der Schnitt wieder Luft, Licht und Ruhe zurückbringt.</h2>
      <p>Dieser Vergleich zeigt den Kern meiner Arbeit: nicht „grün machen“, sondern die Architektur des Baumes wieder lesbar machen.</p>
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
    ${photoSlot({ folder: "08_fonovi", file: "fon-foto-01.webp", lang: "de", label: "Ruhiger Gartenmoment nach praeziser Pflege", ratio: "16 / 9" })}
  </section>

  <section class="section split">
    <div>
      <span class="eyebrow">Naturgesetze</span>
      <h2>Naturgesetze kann man nicht ignorieren.</h2>
      <p>Zuerst braune Nadeln. Dann trockene Äste. Der Baum verliert einen Ast, dann zwei - und irgendwann seine Form. Der Grund ist fast immer derselbe: Es wurde an Zeit und Geld gespart. Doch Formschnitt ist Feinarbeit.</p>
      <p>Sie giessen, Sie pflegen - und trotzdem leidet der Baum. Es liegt fast nie am Besitzer. Es liegt am Schnitt: Wer vor mir an Ihrem Baum gearbeitet hat, hat gegen die Naturgesetze geschnitten.</p>
      <blockquote>Einen Ast abzuschneiden dauert eine Sekunde. Einen neuen wachsen zu lassen - Jahre.</blockquote>
    </div>
    ${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "de", label: "Wertvoller Gartenbaum vor der Diagnose", ratio: "16 / 9" })}
  </section>

  <section id="meisterarbeit" class="section split reverse meister-section">
    ${meisterImageCarousel()}
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
      <article>${photoSlot({ folder: "02_pryklady-robit", file: "sosna-bila-23.webp", lang: "de", label: "Jahr 1 - Diagnose und erster sauberer Schnitt", ratio: "3 / 2" })}<h3>Jahr 1</h3><p>Problemstellen lesen, Totholz rausnehmen, Kraft neu verteilen.</p></article>
      <article>${photoSlot({ folder: "09_pomylky", file: "pomylka-svichka-01.webp", lang: "de", label: "Jahr 2 - Wachstum selektiv fuehren", ratio: "3 / 2" })}<h3>Jahr 2</h3><p>Nur die richtigen Triebe bleiben. Licht und Luft öffnen die Krone.</p></article>
      <article>${photoSlot({ folder: "02_pryklady-robit", file: "sosna-bila-17.webp", lang: "de", label: "Jahr 3 - ruhige stabile Baumform", ratio: "3 / 2" })}<h3>Jahr 3</h3><p>Die Form trägt sich selbst, der Baum wirkt gewachsen, nicht geschnitten.</p></article>
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
    ${photoSlot({ folder: "08_fonovi", file: "fon-foto-02.webp", lang: "de", label: "Persoenliche Baum-Vision im Schweizer Garten", ratio: "16 / 9" })}
  </section>

  <section class="section split">
    <div>
      <span class="eyebrow">Blick in die Wurzeln</span>
      <h2>Gesundheit beginnt unter der Erde.</h2>
      <p>Wie beim Fundament eines Hauses beginnt alles unter der Erde. Der richtige Boden - Akadama, die passende Säure (pH 5,5-6,5), geprüfte Erden - ist die Basis für Gesundheit.</p>
      <a class="text-link" href="philosophie.html#wurzeln">Mehr über Boden und Wurzeln →</a>
    </div>
    ${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "de", label: "Ich beim Formschnitt einer Kiefer", ratio: "3 / 2" })}
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
    <p>Drei Kernbereiche: <strong>Niwaki-Schnitt</strong>, japanische Ahorne (<em>Acer palmatum</em>) und Kiefer-Formschnitt (<em>Pinus</em>). Alles Weitere auf Anfrage. Bäume bis 3 m; grösser nach Absprache.</p>
  </section>
  ${plantNameGuideDe()}
  <section class="section service-detail" id="niwaki">
    ${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "de", label: "Niwaki / Garten-Bonsai", ratio: "4 / 3" })}
    <div><span class="eyebrow">Service 1</span><h2>Niwaki (Garten-Bonsai)</h2><p>Pflege und Formung von Niwaki - Bäumen im Garten, nicht im Topf. Häufige Gehölze sind Kiefer (<em>Pinus</em>), Eibe (<em>Taxus baccata</em>) und Wacholder (<em>Juniperus</em>). Systematischer Schnitt lenkt die Kraft des Baumes dorthin, wo sie gebraucht wird, und gibt jeder Wolke ihren eigenen Raum für Licht und Luft.</p>${cta("Foto senden")}</div>
  </section>
  <section class="section service-detail reverse" id="ahorn">
    ${photoSlot({ folder: "06_yaponski-kleny", file: "klen-yaponskyi-02.webp", lang: "de", label: "Japanischer Ahorn in Pflege", ratio: "4 / 3" })}
    <div><span class="eyebrow">Service 2</span><h2>Japanische Ahorne - <em>Acer palmatum</em></h2><p>Japanischer Ahorn oder Fächerahorn (<em>Acer palmatum</em>) und Schlitzahorn (<em>Acer palmatum</em> Dissectum-Gruppe): saisonale Formung und Schnitt, Entfernung von Totholz aus dem Kroneninneren, Handarbeit gegen Pilze und Moos, architektonische Kronenarbeit. Viele Ahorne in der Schweiz wachsen ohne Pflege ein - ich öffne die Krone, bevor Pilze und Feuchtigkeit Schaden anrichten.</p>${cta("Ahorn-Foto senden")}</div>
  </section>
  <section class="section service-detail" id="nadelgehoelze">
    ${photoSlot({ folder: "04_khvoyni", file: "sosna-chorna-01.webp", lang: "de", label: "Kiefer Formschnitt mit Topiarschere", ratio: "4 / 3" })}
    <div><span class="eyebrow">Service 3</span><h2>Nadelgehölze - Schwerpunkt Kiefer (<em>Pinus</em>)</h2><p>Alle wichtigen Nadelgehölze: Waldkiefer (<em>Pinus sylvestris</em>), Bergkiefer (<em>Pinus mugo</em>), Japanische Schwarzkiefer (<em>Pinus thunbergii</em>), Mädchen-Kiefer / Japanische Weisskiefer (<em>Pinus parviflora</em>), Japanische Rotkiefer (<em>Pinus densiflora</em>) und Weymouth-Kiefer (<em>Pinus strobus</em>). Auch Europäische Eibe (<em>Taxus baccata</em>), Wacholder (<em>Juniperus</em>), Tanne (<em>Abies</em>) und Fichte (<em>Picea</em>). Geschnitten ausschliesslich mit feinsten japanischen Werkzeugen - von Hand.</p>${cta("Kiefer-Foto senden")}</div>
  </section>
  <section class="section note-block"><h2>Was nicht dazugehört.</h2><p>Weitere Arbeiten auf Anfrage. Kein gewöhnlicher Garten- oder Rasenunterhalt, keine grossen Pflanzungen. Ich arbeite gezielt - nicht für jeden, sondern für den, der seinen Baum ernst nimmt.</p><a class="text-link" href="blog/topiarschere.html">Warum die Topiarschere den Unterschied macht →</a></section>
  ${finalCtaDe()}`;
}

function philosophyDe() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Philosophie</span>
    <h1>Vom einfachen Schnitt zur japanischen Baumkunst.</h1>
    <p>Japanische Gartenkunst ist keine Dekoration. Sie ist Handwerk, Analyse und Respekt vor Naturgesetzen.</p>
  </section>
  <section class="section split">
    <div><h2>Kyoto 2009 hat meinen Blick verändert.</h2><p>Vor meiner Reise nach Japan habe ich Bäume vor allem geschnitten: Form korrigieren, dichter machen, kleiner halten. 2009 sah ich in Kyoto, dass japanische Baumpflege etwas anderes ist - ein eigenes Meisterhandwerk, das den Baum als lebendes Wesen ernst nimmt.</p><p>Seitdem interessiert mich nicht der schnelle Schnitt, sondern die Kunst japanischer Meister: den Baum lesen, seine Reaktion respektieren und mit ihm arbeiten, nicht gegen ihn. Jeder Schnitt ist eine Entscheidung für die nächsten Jahre.</p></div>
    ${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "de", label: "Ich bei der Arbeit - Portraet", ratio: "3 / 2" })}
  </section>
  <section class="section split reverse">
    ${photoSlot({ folder: "07_viktor", file: "viktor-02.webp", lang: "de", label: "Meisterhaende und japanisches Werkzeug", ratio: "3 / 2" })}
    <div><h2>Arbeiten nach Naturgesetzen.</h2><p>Ein Baum ist keine grüne Masse. Er ist ein lebendes System aus Krone, Stamm, Wurzeln, Licht, Wasser und Zeit. Wer jede Knospe nach Schema schneidet, kann gegen die Gesetze der Natur kein dauerhaftes Ergebnis erwarten.</p><p>Mein Anspruch: dass Sie nicht nur direkt nach der Arbeit zufrieden sind, sondern auch nach einem, zwei, drei Jahren. Dass wir uns in die Augen sehen können - ehrlich.</p></div>
  </section>
  <section class="section split" id="wurzeln">
    <div><span class="eyebrow">Blick in die Wurzeln</span><h2>Blick in die Wurzeln.</h2><p>Wie beim Fundament eines Hauses beginnt alles unter der Erde. Der richtige Boden - Akadama, die passende Säure (pH 5,5-6,5), geprüfte Erden - ist die Basis für Gesundheit.</p><p>Ich gebe kein Garantie-Versprechen über Ihren Kopf hinweg. Aber die Zusage, es richtig zu machen und Fehler zu korrigieren. Folgen Sie meinen Empfehlungen, und die Form hält über Jahre.</p></div>
    ${photoSlot({ folder: "10_vidkrytka-yaponiya", file: "vidkrytka-yaponiya-01.webp", lang: "de", label: "Japanische Inspiration und Bonsai-Werkzeugkultur", ratio: "3 / 2" })}
  </section>
  <section class="section note-block"><h2>Topiarschere statt Heckenschere.</h2><p>Eine Heckenschere reisst. Zurück bleiben Fasern - feine Härchen, die der Baum für verletzte Äste hält. Mit der schärfsten japanischen Topiarschere schneide ich sauber: minimaler Schaden, schnelle Erholung, volle Kraft für die Form.</p></section>
  ${finalCtaDe()}`;
}

function galleryPage(lang = "de") {
  const de = lang === "de";
  const uk = lang === "uk";
  const prefix = uk
    ? {
        eyebrow: "Галерея",
        h1: "До і після - реальні приклади робіт.",
        intro: "Спочатку показані зв'язані пари одного дерева або однієї серії. По кліку відкривається коротке пояснення: що зроблено, чому і в чому моя цінність.",
        beforeEyebrow: "До і після",
        beforeTitle: "Зв'язані пари до і після.",
        beforeText: "Це не випадковий набір красивих фото. Кожна картка показує пару або серію з каталогу робіт, де можна зрозуміти зміну форми.",
        archiveSummary: "Показати додаткові кадри з серій до/після",
        workEyebrow: "Інші приклади",
        workTitle: "Готові дерева, форма і процес.",
        workText: "Додаткові фото садових бонсаїв, Niwaki, сосен і робочих етапів. Пара до/після залишається окремо, щоб не змішувати результат із процесом."
      }
    : de
      ? {
          eyebrow: "Galerie",
          h1: "Vorher / Nachher - reale Arbeiten.",
          intro: "Zuerst stehen verbundene Paare desselben Baums oder derselben Serie. Beim Klick öffnet sich kurz: was gemacht wurde, warum und worin mein Wert liegt.",
          beforeEyebrow: "Vorher / Nachher",
          beforeTitle: "Verbundene Vorher-/Nachher-Paare.",
          beforeText: "Das ist keine zufällige Sammlung schöner Fotos. Jede Karte zeigt ein Paar oder eine Serie aus dem Arbeitskatalog, damit die Veränderung der Form verständlich wird.",
          archiveSummary: "Zusätzliche Bilder aus den Vorher-/Nachher-Serien anzeigen",
          workEyebrow: "Weitere Beispiele",
          workTitle: "Fertige Bäume, Form und Arbeit.",
          workText: "Weitere reale Fotos von Gartenbonsai, Niwaki, Kiefern und Arbeitsphasen. Die Vorher-/Nachher-Paare bleiben bewusst getrennt vom Arbeitskontext."
        }
      : {
          eyebrow: "Gallery",
          h1: "Before / after - real work examples.",
          intro: "First are connected pairs from the same tree or the same work series. Click a case to see what was done, why it mattered and where I add value.",
          beforeEyebrow: "Before / after",
          beforeTitle: "Connected before/after pairs.",
          beforeText: "This is not a random set of nice images. Each card shows a pair or series from the work catalogue, so the change in form is understandable.",
          archiveSummary: "Show additional frames from before/after series",
          workEyebrow: "More examples",
          workTitle: "Finished trees, form and process.",
          workText: "Additional real photos of garden bonsai, niwaki, pines and work stages. The before/after pairs stay separate from work context."
        };
  const beforeItems = beforeAfterGalleryItems();
  const workItems = workGalleryItems();
  const extraSections = uk
    ? [
        {
          copy: {
            eyebrow: "Садовий контекст",
            title: "Дерево в саду і навколо дому.",
            text: "Форма має працювати не тільки крупним планом, а й у реальному просторі: з терасою, доріжкою, будинком і видом з вікна."
          },
          items: gardenContextGalleryItems()
        },
        {
          copy: {
            eyebrow: "Контекст саду",
            title: "Низька крона в японському саду.",
            text: "Ці кадри залишаються звичайними прикладами садового контексту, доки Віктор не підтвердить реальну послідовність до/після."
          },
          items: lowCrownContextGalleryItems()
        },
        {
          copy: {
            eyebrow: "Niwaki",
            title: "Хмарні форми і зрілі садові бонсаї.",
            text: "Кадри однієї мови форми: відкриті яруси, світло всередині крони і спокійний силует без грубого зрізу."
          },
          items: niwakiCloudGalleryItems()
        },
        {
          copy: {
            eyebrow: "Хвойні",
            title: "Сосни, щільність і ручна форма.",
            text: "Хвойні потребують точного ритму догляду: не зрізати все рівно, а залишити майбутні бруньки, світло і повітря."
          },
          items: coniferGalleryItems()
        },
        {
          copy: {
            eyebrow: "Японські клени",
            title: "Acer: тонка крона і листя.",
            text: "Японський клен читається через легкість. Тут важливі світло, дрібні гілки і обережна робота з формою."
          },
          items: mapleGalleryItems()
        },
        {
          copy: {
            eyebrow: "Віктор за роботою",
            title: "Руки, інструмент і масштаб дерева.",
            text: "Портретні та робочі кадри показують, що ця робота робиться вручну, біля живого дерева, з відповідальністю за результат."
          },
          items: viktorGalleryItems()
        },
        {
          copy: {
            eyebrow: "Деталі догляду",
            title: "Свічки сосни і ризикові дрібниці.",
            text: "Іноді рішення починається не з великої форми, а з маленьких деталей: свічок, старої хвої, загущення і вентиляції крони."
          },
          items: detailGalleryItems()
        }
      ]
    : de
      ? [
          {
            copy: {
              eyebrow: "Gartenkontext",
              title: "Der Baum im Garten und am Haus.",
              text: "Die Form muss nicht nur im Detail funktionieren, sondern im echten Raum: Terrasse, Weg, Haus und Blick aus dem Fenster."
            },
            items: gardenContextGalleryItems()
          },
          {
            copy: {
              eyebrow: "Gartenkontext",
              title: "Niedrige Krone im japanischen Garten.",
              text: "Diese Bilder bleiben normale Gartenbeispiele, bis Viktor die echte Vorher-/Nachher-Serie bestaetigt."
            },
            items: lowCrownContextGalleryItems()
          },
          {
            copy: {
              eyebrow: "Niwaki",
              title: "Wolkenformen und reife Gartenbonsais.",
              text: "Eine ruhige Formsprache: offene Ebenen, Licht in der Krone und ein natürlicher Umriss statt harter Fläche."
            },
            items: niwakiCloudGalleryItems()
          },
          {
            copy: {
              eyebrow: "Nadelgehölze",
              title: "Kiefern, Dichte und Handform.",
              text: "Bei Kiefern zählt der Pflegerhythmus: nicht alles flach schneiden, sondern Knospen, Licht und Luft für die nächsten Jahre erhalten."
            },
            items: coniferGalleryItems()
          },
          {
            copy: {
              eyebrow: "Japanische Ahorne",
              title: "Acer: feine Krone und Blattstruktur.",
              text: "Ein japanischer Ahorn lebt von Leichtigkeit. Entscheidend sind Licht, feine Verzweigung und vorsichtige Formarbeit."
            },
            items: mapleGalleryItems()
          },
          {
            copy: {
              eyebrow: "Viktor bei der Arbeit",
              title: "Hände, Werkzeug und Baum-Massstab.",
              text: "Diese Fotos zeigen die Arbeit am lebenden Baum: von Hand, mit japanischem Werkzeug und mit Verantwortung für das Ergebnis."
            },
            items: viktorGalleryItems()
          },
          {
            copy: {
              eyebrow: "Pflegedetails",
              title: "Kiefernkerzen und kleine Risiken.",
              text: "Manchmal beginnt die richtige Entscheidung im Detail: Kerzen, alte Nadeln, Verdichtung und Luft in der Krone."
            },
            items: detailGalleryItems()
          }
        ]
      : [
          {
            copy: {
              eyebrow: "Garden context",
              title: "The tree in the garden and near the house.",
              text: "The form has to work in real space: terrace, path, house and the view from the window."
            },
            items: gardenContextGalleryItems()
          },
          {
            copy: {
              eyebrow: "Garden context",
              title: "Low crown in a Japanese garden.",
              text: "These frames stay as ordinary garden-context examples until Viktor confirms a true before/after sequence."
            },
            items: lowCrownContextGalleryItems()
          },
          {
            copy: {
              eyebrow: "Niwaki",
              title: "Cloud forms and mature garden bonsai.",
              text: "A calm visual language: open layers, light inside the crown and a natural outline instead of a hard surface."
            },
            items: niwakiCloudGalleryItems()
          },
          {
            copy: {
              eyebrow: "Conifers",
              title: "Pines, density and hand-shaped form.",
              text: "Pines need rhythm: not cutting everything flat, but keeping buds, light and air for the next years."
            },
            items: coniferGalleryItems()
          },
          {
            copy: {
              eyebrow: "Japanese maples",
              title: "Acer: fine crown and leaf structure.",
              text: "A Japanese maple depends on lightness. Light, fine branching and careful shaping matter more than force."
            },
            items: mapleGalleryItems()
          },
          {
            copy: {
              eyebrow: "Viktor at work",
              title: "Hands, tools and tree scale.",
              text: "These photos show the work beside the living tree: by hand, with Japanese tools and responsibility for the result."
            },
            items: viktorGalleryItems()
          },
          {
            copy: {
              eyebrow: "Care details",
              title: "Pine candles and small risks.",
              text: "Sometimes the right decision starts in the detail: candles, old needles, density and air inside the crown."
            },
            items: detailGalleryItems()
          }
        ];
  return `
  <section class="page-hero section">
    <span class="eyebrow">${prefix.eyebrow}</span>
    <h1>${prefix.h1}</h1>
    <p>${prefix.intro}</p>
  </section>
  <section class="section">
    <div class="section-head"><span class="eyebrow">${prefix.beforeEyebrow}</span><h2>${prefix.beforeTitle}</h2><p>${prefix.beforeText}</p></div>
    ${galleryCaseStudies(lang)}
    <details class="gallery-archive">
      <summary>${prefix.archiveSummary}</summary>
      <div class="gallery-real-grid">${photoGallery(beforeItems, lang, beforeItems.length, { eagerCount: 0, highPriorityCount: 0 })}</div>
    </details>
  </section>
  <section class="section">
    <div class="section-head"><span class="eyebrow">${prefix.workEyebrow}</span><h2>${prefix.workTitle}</h2><p>${prefix.workText}</p></div>
    <div class="gallery-real-grid">${photoGallery(workItems, lang, workItems.length, { eagerCount: 6, highPriorityCount: 0 })}</div>
  </section>
  ${extraSections.map((section) => galleryPhotoSection(section.copy, section.items, lang)).join("")}
  ${uk ? finalCtaUk() : de ? finalCtaDe() : finalCtaEn()}`;
}

function galleryDe() {
  return galleryPage("de");
}

function galleryEn() {
  return galleryPage("en");
}

function galleryUk() {
  return galleryPage("uk");
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
  <section class="section note-block speed-quality-note">
    <span class="eyebrow">Tempo gegen Qualität</span>
    <h2>Warum nicht schneller?</h2>
    <p>Einen Ast kann man in einer Sekunde abschneiden. Einen neuen Ast aufzubauen dauert Jahre. Deshalb ist Geschwindigkeit beim Formschnitt kein Qualitätsmerkmal, sondern oft ein Risiko.</p>
    <div class="speed-quality-contrast" aria-label="Zeitvergleich zwischen schnellem Schnitt und neuem Wachstum">
      <div><strong>1 Sekunde</strong><span>Ast abschneiden</span></div>
      <div class="speed-quality-vs">gegen</div>
      <div><strong>Jahre</strong><span>neuen Ast aufbauen</span></div>
    </div>
    <p class="speed-quality-warning">Ich arbeite lieber langsamer und sauber, damit der Baum Kraft behält, sauber verheilt und seine Form nicht für Jahre verliert.</p>
    ${cta("Foto senden - kostenlose Diagnose")}
  </section>
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
    <article class="card article-card">${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "de", label: "Topiarschere und sauberer Schnitt", ratio: "3 / 2" })}<h2>Warum ich mit der Topiarschere schneide</h2><p>Sauberer Schnitt statt gerissene Fasern: warum das Werkzeug die Gesundheit des Baumes beeinflusst.</p><a href="topiarschere.html">Artikel lesen</a></article>
    <article class="card article-card">${photoSlot({ folder: "10_vidkrytka-yaponiya", file: "vidkrytka-yaponiya-01.webp", lang: "de", label: "Akadama, Bonsai-Erde und Wurzeln", ratio: "3 / 2" })}<h2>Der Boden entscheidet: Akadama & Wurzeln</h2><p>Fundament-Metapher, Akadama, Kanuma, pH 5,5-6,5 und gesunde Wurzeln.</p><a href="boden-wurzeln.html">Artikel lesen</a></article>
  </section>
  ${finalCtaDe("../")}`;
}

function articleTopiaryDe() {
  return `
  <article class="article section">
    <span class="eyebrow">Topiarschere</span>
    <h1>Warum ich mit der Topiarschere schneide.</h1>
    ${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "de", label: "Ich beim Formschnitt mit Topiarschere", ratio: "16 / 9" })}
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
    ${photoSlot({ folder: "10_vidkrytka-yaponiya", file: "vidkrytka-yaponiya-01.webp", lang: "de", label: "Akadama Schweiz und gesunde Wurzeln", ratio: "16 / 9" })}
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
    image: "foto/07_viktor/viktor-01.webp",
    label: "Sauberer Schnitt mit japanischem Werkzeug"
  },
  {
    slug: "energie-krone",
    title: "Warum ich die Krone öffne",
    teaser: "Licht, Luft und Energieverteilung: warum ein wertvoller Baum nicht wie eine Hecke behandelt wird.",
    image: "foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp",
    label: "Geöffnete Niwaki-Krone mit Wolkenform"
  },
  {
    slug: "niwaki-bonsai-stile",
    title: "Niwaki, Bonsai und Cloud Pruning: welche Stilrichtung passt?",
    teaser: "Nicht jede Wolke ist Bonsai: wie ich Gartenbaum, Bonsai-Logik und ruhige Niwaki-Form unterscheide.",
    image: "foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp",
    label: "Niwaki-Stil und Wolkenform im Garten"
  },
  {
    slug: "kiefer-kerzen",
    title: "Kiefer-Kerzen: der richtige Moment",
    teaser: "Was die neuen Triebe einer Kiefer verraten und warum Timing wichtiger ist als Kraft.",
    image: "foto/09_pomylky/pomylka-svichka-01.webp",
    label: "Pinus-Kerzen als neues Wachstum"
  },
  {
    slug: "fehler-alte-nadeln-moos-pilzrisiko",
    title: "Alte Nadeln, Moos und dichte Kronen: typische Fehler",
    teaser: "Was braune Innenbereiche, Moos, alte Nadeln und kompakte Schalen über Licht, Luft und Pilzrisiko sagen.",
    image: "foto/08_fonovi/fon-sosna-bila-01.webp",
    label: "Alte Nadeln und Diagnose an wertvollen Nadelgehölzen"
  },
  {
    slug: "boden-wurzeln",
    title: "Der Boden entscheidet: Akadama & Wurzeln",
    teaser: "Das Fundament der Baumarchitektur: Wasser, Luft, Säure und gesunde Wurzeln.",
    image: "foto/10_vidkrytka-yaponiya/vidkrytka-yaponiya-01.webp",
    label: "Wurzel- und Substratkontrolle"
  },
  {
    slug: "klimastress",
    title: "Warum Premium-Gärten in der Schweiz mehr Diagnose brauchen",
    teaser: "Hitze, trockene Sommer und Starkregen machen wertvolle Solitärbäume empfindlicher.",
    image: "foto/08_fonovi/fon-sosna-bila-01.webp",
    label: "Stresszeichen an einem wertvollen Gartenbaum"
  }
];

function sourceListV2(items) {
  return `<aside class="source-list"><h2>Fachliche Einordnung</h2><p>Diese Seite ersetzt keine Vor-Ort-Diagnose. Die Einordnung kombiniert meine Praxis mit öffentlich zugänglichen Fachquellen.</p><ul>${items.map(([label, href]) => `<li><a href="${href}" target="_blank" rel="noopener">${label}</a></li>`).join("")}</ul></aside>`;
}

function sourceListEnV2(items) {
  return `<aside class="source-list"><h2>Technical context</h2><p>This page combines my practice with public horticultural sources and does not replace an on-site assessment.</p><ul>${items.map(([label, href]) => `<li><a href="${href}" target="_blank" rel="noopener">${label}</a></li>`).join("")}</ul></aside>`;
}

function sourceListUkV2(items) {
  return `<aside class="source-list"><h2>Фаховий контекст</h2><p>Це пояснення не замінює огляд на місці. Воно поєднує мою практику з відкритими садівничими джерелами.</p><ul>${items.map(([label, href]) => `<li><a href="${href}" target="_blank" rel="noopener">${label}</a></li>`).join("")}</ul></aside>`;
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
    <p>Mein 70/20/10-Merksatz ist kein Laborprotokoll. Er ist eine einfache Arbeitskarte: zuerst verstehen, wo der Baum Kraft verbraucht, dann schneiden.</p>
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
    <p>Sieben Artikel erklären meine Arbeit einfach, aber fachlich: Niwaki-Stile, Werkzeug, Kronenenergie, Kiefer-Kerzen, alte Nadeln, Moos, Pilzrisiko, Wurzeln und Klimastress in Schweizer Premium-Gärten.</p>
  </section>
  <section class="section article-grid">
    ${blogArticlesDeV2.map((article) => `<article class="card article-card">${assetSlot({ file: article.image, label: article.label, ratio: "3 / 2" })}<span class="eyebrow">Wissen</span><h2>${article.title}</h2><p>${article.teaser}</p><a href="${article.slug}.html">Artikel lesen</a></article>`).join("")}
  </section>
  ${finalCtaDe("../")}`;
}

function articleTopiaryDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Topiarschere</span>
    <h1>Warum ich mit der Topiarschere schneide.</h1>
    ${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "de", label: "Ich mit Topiarschere an einer Kiefer", ratio: "16 / 9" })}
    <p>Ein guter Formschnitt beginnt nicht mit Tempo, sondern mit der Entscheidung, was der Baum in Zukunft tragen soll. Bei Niwaki, Kiefer-Formschnitt und japanischer Baumpflege reicht es nicht, die äussere Kontur schnell zu glätten. Der Baum ist kein grüner Block. Er ist ein lebendes System aus Krone, Stamm und Wurzeln.</p>
    <div class="comparison-grid"><div><h2>Heckenschere</h2><p>Schnell, breit, mechanisch. Gut für eine Hecke, riskant für einen wertvollen Solitärbaum. Sie kann feine Triebe reissen und eine dichte Aussenhaut erzeugen.</p></div><div><h2>Topiarschere</h2><p>Langsam, präzise, bewusst. Jeder Schnitt entscheidet, welche Knospe bleibt, wo Luft hineinkommt und wie sich die Wolke nächstes Jahr entwickelt.</p></div></div>
    <p>Zurückgerissene Fasern sind für den Baum keine Kleinigkeit. Er reagiert auf Verletzung, schliesst Wunden und verteilt Kraft neu. Was im ersten Moment ordentlich aussieht, kann dem Baum über Monate Energie nehmen, wenn der Schnitt zu grob, zu flächig oder zur falschen Zeit gemacht wurde.</p>
    <p>Mit der Topiarschere arbeite ich anders. Ich öffne nicht einfach Oberfläche. Ich suche die innere Linie: Welche Triebe bauen Zukunft? Welche machen Schatten? Wo muss Licht in die Krone, damit innen kein trockenes Holz entsteht?</p>
    ${photoSlot({ folder: "07_viktor", file: "viktor-02.webp", lang: "de", label: "Japanische Werkzeuge und Feinarbeit an der Kiefer", ratio: "4 / 3" })}
    <h2>Ein Schnitt ist eine Anweisung an den Baum.</h2>
    <p>Wenn ich eine Knospe stehen lasse, sage ich dem Baum: hier darf Kraft hin. Wenn ich einen Ast entferne, nehme ich eine Möglichkeit weg, die Jahre gebraucht hat. Deshalb passt mein Satz so gut: Einen Ast abzuschneiden dauert eine Sekunde. Einen neuen wachsen zu lassen - Jahre.</p>
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
    ${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "de", label: "Niwaki-Krone mit Raum für Licht und Luft", ratio: "16 / 9" })}
    <p>Viele wertvolle Bäume verlieren nicht zuerst ihre Schönheit. Sie verlieren ihren inneren Raum. Aussen sieht die Krone noch grün aus, innen aber sammeln sich Schatten, Feuchtigkeit, Totholz und schwache Triebe. Genau dort beginnt der Unterschied zwischen Formschnitt und Baumarchitektur.</p>
    ${energyDiagramV2()}
    <p>Ich arbeite mit einem einfachen Bild: Die Krone ist der grosse Energieverbraucher, der Stamm leitet, die Wurzeln versorgen. Wenn die Krone zu dicht wird, verbraucht sie Kraft an den falschen Stellen. Wenn oben zu stark wächst, wird unten schwach. Wenn innen kein Licht mehr ankommt, stirbt die Struktur von innen heraus.</p>
    <h2>Die Krone wird nicht leer gemacht. Sie wird lesbar gemacht.</h2>
    <p>Öffnen bedeutet nicht, den Baum radikal auszudünnen. Es bedeutet, die richtigen Fenster zu schaffen: Luft durch die Krone, Licht auf innere Knospen, weniger Reibung zwischen Ästen, weniger Feuchtigkeit in engen Bereichen. Gute Arbeit sieht am Ende natürlich aus, nicht geschnitten.</p>
    <div class="process-grid"><div><strong>1. Lesen</strong><p>Wo fliesst Kraft? Welche Linie trägt den Charakter?</p></div><div><strong>2. Entlasten</strong><p>Totholz, falsche Triebe und Schattenzonen werden reduziert.</p></div><div><strong>3. Zukunft lassen</strong><p>Die Knospen, die Form aufbauen, bleiben bewusst stehen.</p></div></div>
    ${photoSlot({ folder: "06_yaponski-kleny", file: "klen-yaponskyi-03.webp", lang: "de", label: "Licht und Blattgesundheit am japanischen Ahorn", ratio: "3 / 2" })}
    <p>Für einen Premium-Garten ist das kein Detail. Die Krone bestimmt, wie der Baum vom Haus, von der Terrasse und vom Weg aus wirkt. Ein Meister sieht nicht nur das heutige Bild. Er sieht, was der Baum in einem, zwei und drei Jahren daraus macht.</p>
    ${sourceListV2([["RHS: Koniferen nur vorsichtig und meist am neuen Wachstum schneiden", "https://www.rhs.org.uk/plants/types/trees/pruning-guide"], ["Purdue Extension: Schnitt verändert Wachstum und Verzweigung", "https://ag.purdue.edu/department/hla/extension/extension-publications-library/ext-pubs/ho-4-w.html"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Foto senden - Kronenstruktur prüfen")}</div>
  </article>`;
}

function articleStylesDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Niwaki-Stil</span>
    <h1>Niwaki, Bonsai und Cloud Pruning: welche Stilrichtung passt?</h1>
    ${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "de", label: "Niwaki-Stil mit ruhiger Wolkenform im Garten", ratio: "16 / 9" })}
    <p>Wenn ich einen Gartenbaum ansehe, frage ich nicht zuerst: Wie stark kann ich ihn schneiden? Ich frage: Welche Sprache passt zu diesem Baum, zu diesem Garten und zu dem Blick aus dem Haus?</p>
    <p>Niwaki ist kein schneller Trend und auch kein kleiner Bonsai im Garten. Die RHS beschreibt Cloud Pruning als japanische Methode, Bäume und Sträucher in wolkenartige Formen zu erziehen; Niwaki bedeutet dabei Gartenbaum. Für mich heisst das: Der Baum bleibt ein lebendes Gartenwesen, aber seine Struktur wird lesbar, ruhig und bewusst geführt.</p>
    <div class="process-grid">
      <div><strong>Baum lesen</strong><p>Ich prüfe Art, Alter, Verzweigung, Reaktion und innere Kraft. Nicht jeder Baum will eine starke Wolkenform.</p></div>
      <div><strong>Gartenblick prüfen</strong><p>Die Form muss vom Haus, von der Terrasse und vom Weg aus wirken. Ein Niwaki lebt im Raum, nicht nur im Foto.</p></div>
      <div><strong>Pflege planen</strong><p>Je feiner die Form, desto wichtiger ist der jährliche Rhythmus. Ohne Pflege wird auch die beste Linie wieder schwer.</p></div>
    </div>
    <p>Cloud Pruning kann weich und frei wirken oder sehr klar und grafisch. Bonsai-Denken hilft mir, Proportion, Stammbewegung und Zukunftsknospen zu sehen. Aber im Garten arbeite ich nicht gegen den Baum. Ich suche eine Form, die seine Natur stärkt.</p>
    <p>Darum empfehle ich nicht jedem Kunden dieselbe Silhouette. Manche Bäume brauchen zuerst Luft und Gesundheit. Manche brauchen nur eine ruhigere Aussenlinie. Andere können über mehrere Jahre zu echten Garten-Skulpturen werden.</p>
    ${sourceListV2([["RHS: Cloud Pruning, Niwaki und geeignete Pflanzen", "https://www.rhs.org.uk/plants/types/trees/cloud-pruning"], ["RHS: Koniferen vorsichtig und meist am grünen Wachstum schneiden", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Foto senden - Stilrichtung prüfen")}</div>
  </article>`;
}

function articleCandlesDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Pinus</span>
    <h1>Kiefer-Kerzen: der richtige Moment entscheidet.</h1>
    ${photoSlot({ folder: "09_pomylky", file: "pomylka-svichka-01.webp", lang: "de", label: "Neue Pinus-Kerzen vor dem Schnitt", ratio: "16 / 9" })}
    <p>Bei Kiefern beginnt die Zukunft oft als Kerze: ein heller, weicher neuer Trieb. Für Laien sieht er unscheinbar aus. Für mich zeigt er, wie viel Kraft der Baum gerade nach oben, nach aussen oder in eine bestimmte Wolke schickt.</p>
    <p>Wer Kiefer-Kerzen zu grob, zu spät oder überall gleich behandelt, nimmt dem Baum die Balance. Wer sie liest, kann Wachstum bremsen, Kraft verteilen und die Wolken feiner machen. Genau deshalb ist Timing bei Pinus wichtiger als rohe Kraft.</p>
    <div class="process-grid"><div><strong>Früh</strong><p>Der neue Trieb ist weich. Der Baum zeigt Richtung und Energie.</p></div><div><strong>Selektiv</strong><p>Starke Zonen werden beruhigt, schwache Zonen werden geschützt.</p></div><div><strong>Langfristig</strong><p>Das Ziel ist keine kahle Form, sondern dichte, gesunde Verzweigung.</p></div></div>
    ${photoSlot({ folder: "04_khvoyni", file: "sosna-chorna-01.webp", lang: "de", label: "Geformte Kiefer im Schweizer Garten", ratio: "4 / 3" })}
    <h2>Nicht jede Kerze wird gleich behandelt.</h2>
    <p>Eine starke obere Zone braucht andere Arbeit als ein schwacher innerer Bereich. Manche Triebe bleiben, weil sie Zukunft bauen. Andere werden gekürzt, weil sie die Form dominieren. Genau hier entsteht der Unterschied zwischen Schema und Meisterarbeit.</p>
    <p>Für Kunden ist die einfache Regel: Wenn eine Kiefer innen trocken wird, braune Nadeln zeigt oder ihre Wolken schwer und dicht werden, sollte man nicht warten, bis grosse Äste absterben. Ein früher Foto-Check ist oft genug, um zu entscheiden, ob ein Vor-Ort-Termin sinnvoll ist.</p>
    ${sourceListV2([["NAJGA: Timing und Wirkung beim Schnitt japanischer Schwarzkiefer", "https://najga.org/pruning-japanese-black-pine/"], ["Chicago Botanic Garden: Was Candling bei Kiefern bedeutet", "https://www.chicagobotanic.org/blog/learning/candling-japanese-garden"], ["RHS: Koniferen und neues Wachstum", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Kiefer-Foto senden")}</div>
  </article>`;
}

function articleMistakesDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Fehler & Diagnose</span>
    <h1>Alte Nadeln, Moos und dichte Kronen: typische Fehler.</h1>
    ${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "de", label: "Dichte Krone mit möglichem Stress an einem wertvollen Nadelgehölz", ratio: "16 / 9" })}
    <p>Ein wertvoller Baum zeigt Probleme oft leise. Alte Nadeln im Inneren, braune Bereiche, Moos auf Ästen oder eine sehr dichte äussere Schale bedeuten nicht automatisch Krankheit. Aber sie sind Signale, die ich ernst nehme.</p>
    <p>Wichtig ist der Zusammenhang. Moos, Algen und Flechten sind nach RHS nicht automatisch schädlich. Sie mögen aber feuchte, schattige Bedingungen. Wenn eine Krone zu dicht ist, Luft fehlt und Nadeln lange nass bleiben, entsteht genau das Mikroklima, in dem Pilzdruck leichter zum Problem wird.</p>
    <div class="comparison-grid">
      <div><h2>Alte Nadeln</h2><p>Ältere Nadeln können natürlich abfallen. Wenn der Baum aber innen schnell dünn wird oder viele braune Nadeln zeigt, prüfe ich Licht, Luft, Schnittfehler und mögliche Nadelkrankheiten.</p></div>
      <div><h2>Moos und Belag</h2><p>Moos ist nicht automatisch der Feind. Es zeigt oft: hier ist es feucht, schattig oder wenig luftig. Dann muss man die Ursache lesen, nicht nur die Oberfläche reinigen.</p></div>
      <div><h2>Dichte Schale</h2><p>Eine schnell geschorene Aussenhaut sieht kurz ordentlich aus, hält innen aber Licht und Luft zurück. Bei manchen Nadelgehölzen bleibt die Krone dadurch länger nass.</p></div>
      <div><h2>Pilzrisiko</h2><p>Viele Nadelkrankheiten werden durch Feuchtigkeit, dichte Bestände, alte Nadeln und schlechte Luftbewegung begünstigt. Deshalb arbeite ich mit Öffnung, Hygiene und trockenem Timing.</p></div>
    </div>
    <p>Gefährlich ist die falsche Reaktion: zu schnell alles abschneiden, in altes braunes Holz schneiden oder die Krone jedes Jahr nur aussen verdichten. Bei vielen Koniferen wächst altes braunes Holz kaum oder gar nicht wieder. Ein Fehler kann deshalb viele Jahre sichtbar bleiben.</p>
    <p>Meine erste Empfehlung ist einfach: Foto vom ganzen Baum, vom Innenbereich und von den Nadeln senden. Dann lässt sich unterscheiden, ob es um normale Alterung, Pflegefehler, Standortstress oder einen Verdacht auf Krankheit geht.</p>
    ${sourceListV2([["RHS: Moos, Algen und Flechten auf Bäumen einordnen", "https://www.rhs.org.uk/biodiversity/algae-lichens-moss-on-trees-shrubs"], ["RHS: Koniferen nicht ins alte braune Holz schneiden", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"], ["University of Minnesota: Brown spot needle blight und Luftzirkulation", "https://extension.umn.edu/plant-diseases/brown-spot-needle-blight"], ["University of Minnesota: Rhizosphaera needle cast, Feuchtigkeit und dichte Kronen", "https://extension.umn.edu/plant-diseases/rhizosphaera-needle-cast"], ["University of Maine: Rhizosphaera Needlecast, Feuchtigkeit und dichte Belaubung", "https://extension.umaine.edu/ipm/ipddl/publications/5104e/"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Foto senden - Nadeln und Krone prüfen")}</div>
  </article>`;
}

function articleSoilDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Akadama & Wurzeln</span>
    <h1>Der Boden entscheidet: Akadama & Wurzeln.</h1>
    ${photoSlot({ folder: "10_vidkrytka-yaponiya", file: "vidkrytka-yaponiya-01.webp", lang: "de", label: "Japanische Inspiration fuer Baumgesundheit und Substrat", ratio: "16 / 9" })}
    <p>Ein Baum steht nicht nur auf dem Boden. Er lebt aus ihm. Wie bei einem Haus entscheidet das Fundament, ob die sichtbare Form stabil bleibt. Bei japanischen Ahornen, Garten-Bonsai und Niwaki beginnt Gesundheit deshalb unter der Erde: bei Struktur, Wasserführung, Luft und Säure.</p>
    <div class="science-card"><h2>Die einfache Formel</h2><p><strong>Wurzeln brauchen Wasser und Luft.</strong> Zu trocken ist Stress. Zu nass ist ebenfalls Stress. Zu verdichtet bedeutet: wenig Sauerstoff, schwache Feinwurzeln, schlechte Reaktion in der Krone.</p></div>
    <p>Akadama, Kanuma und Pemza sind nicht einfach schöne Namen aus Japan. Sie helfen, Wasser und Luft so zu führen, dass die Wurzeln arbeiten können. Für viele japanische Ahorne ist ein leicht saurer Bereich von etwa pH 5,5-6,5 sinnvoll. Ist der Boden zu schwer, zu nass oder zu verdichtet, steigen Stress, Moosdruck und Pilzrisiko.</p>
    ${photoSlot({ folder: "08_fonovi", file: "fon-foto-01.webp", lang: "de", label: "Feuchtigkeit und Mikroklima im Garten", ratio: "3 / 2" })}
    <h2>Warum ein Kronenproblem oft im Boden beginnt.</h2>
    <p>Wenn ein Baum Nadeln verliert, innen trocken wird oder nach dem Schnitt nicht sauber reagiert, reicht der Blick auf die Krone nicht. Standort, Substrat, Wasser und Pflege gehören zur Diagnose. Ein Schnitt kann viel korrigieren, aber er ersetzt kein gesundes Fundament.</p>
    <p>Darum frage ich nicht nur: Welche Form wünschen Sie? Ich frage: Wie steht der Baum? Wie fliesst Wasser ab? Wo ist Schatten? Wie wurde vorher geschnitten? Erst dann ist eine ehrliche Empfehlung möglich.</p>
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
    ${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "de", label: "Wertvolle Kiefer im Schweizer Garten", ratio: "16 / 9" })}
    <p>Ein schöner Schweizer Garten ist heute nicht nur Dekoration. Er ist ein kühler Raum, ein Rückzugsort, ein Teil des Hauses. Genau deshalb tut es weh, wenn ein Solitärbaum langsam seine Form verliert: Der Blick aus dem Wohnzimmer verändert sich, die Terrasse verliert Ruhe, und ein jahrelang gewachsener Wert wird unsicher.</p>
    ${stressChainV2()}
    <p>Die Schweiz ist vom Klimawandel stark betroffen. MeteoSwiss beschreibt mehr extreme Hitze, trockenere Sommer und intensivere Niederschläge als zentrale Risiken. Für Gartenbäume bedeutet das: Wasserstress, Hitze, verdichtete Böden und falscher Schnitt wirken nicht getrennt. Sie verstärken sich.</p>
    <p>Ein dichter, falsch geschnittener Baum leidet in solchen Phasen schneller. Innen bleibt Feuchtigkeit stehen, aussen trocknet die Krone, Wurzeln arbeiten unter Stress. Bei wertvollen Niwaki, Kiefern und japanischen Ahornen ist deshalb die frühe Diagnose wichtiger als ein später Rettungsversuch.</p>
    <div class="process-grid"><div><strong>Frühzeichen</strong><p>Braune Nadeln, trockene Innenäste, schwacher Austrieb.</p></div><div><strong>Kontext</strong><p>Standort, Hitze, Wasserführung, Substrat, vorheriger Schnitt.</p></div><div><strong>Entscheidung</strong><p>Foto-Diagnose zuerst, Vor-Ort-Termin nur wenn sinnvoll.</p></div></div>
    ${photoSlot({ folder: "08_fonovi", file: "fon-foto-02.webp", lang: "de", label: "Erholte Form nach ruhiger Kronenarbeit", ratio: "16 / 9" })}
    <h2>Premium heisst: nicht warten, bis es billig aussieht.</h2>
    <p>Wer viel in Haus, Terrasse und Garten investiert, sollte den wichtigsten Baum nicht wie eine Hecke behandeln lassen. Eine ehrliche Diagnose schützt vor zwei Fehlern: zu spät reagieren oder zu schnell schneiden. Beides kann Jahre kosten.</p>
    <p>Mein Ansatz passt zu dieser Realität: erst sehen, dann entscheiden. Drei Fotos reichen oft für die erste Einschätzung: ganzer Baum, Problemstelle, Nahaufnahme.</p>
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
    <form class="form-card" data-contact-form data-contact-kind="photo-diagnosis" data-event="contact_form_submit" action="/api/contact" method="post">
      <h2>Foto-Diagnose anfragen.</h2>
      <p class="form-note">Beschreiben Sie kurz den Baum. Für Fotos bleibt WhatsApp der schnellste Weg; dieses Formular sendet die Rückrufdaten sicher an mich.</p>
      <label class="hp-field" aria-hidden="true">Firma <input name="company" tabindex="-1" autocomplete="off"></label>
      <label>Name <input name="name" autocomplete="name"></label>
      <label>Telefon <input type="tel" name="phone" autocomplete="tel" required></label>
      <label>E-Mail <input type="email" name="email" autocomplete="email"></label>
      <label>Kanton <input name="kanton" autocomplete="address-level1" required></label>
      <label>Baumart <input name="baumart" placeholder="z.B. Japanischer Ahorn (Acer palmatum), Waldkiefer (Pinus sylvestris), Eibe (Taxus baccata)"></label>
      <label>Nachricht <textarea name="nachricht" rows="5" required></textarea></label>
      <button class="btn btn-primary" type="submit">Anfrage senden</button>
      <p class="form-note"><a class="text-link" href="${whatsappHref}" target="_blank" rel="noopener">Direkt per WhatsApp schreiben</a>, wenn Sie sofort Fotos mitsenden möchten.</p>
    </form>
    <div class="contact-side">
      ${contactPerson("de")}
      <form class="form-card" id="rueckruf" data-contact-form data-contact-kind="callback" data-event="cta_rueckruf_submit" action="/api/contact" method="post">
        <h2>Rückruf anfragen.</h2>
        <p class="form-note">Telefon genügt. Ich melde mich schnellstmöglich persönlich zurück.</p>
        <label class="hp-field" aria-hidden="true">Firma <input name="company" tabindex="-1" autocomplete="off"></label>
        <label>Name <input name="name" autocomplete="name"></label>
        <label>Telefon <input type="tel" name="phone" autocomplete="tel" required></label>
        <label>Wunsch-Zeitfenster <input name="desiredTime" placeholder="z.B. Mo 18-20 Uhr"></label>
        <button class="btn btn-secondary" type="submit">Rückruf anfragen</button>
      </form>
    </div>
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
    ${photoSlot({ folder: "01_hero", file: "hero-viktor-bonsai-main.webp", lang: "de", label: "Theme preview image slot", ratio: "16 / 9" })}
  </section>`;
}

function homeEn() {
  return `
  <section class="hero section" data-hero-root data-hero-variant="1">
    <div class="hero-media">${heroPhotoSlot({ lang: "en", label: "Niwaki in a Swiss garden" })}</div>
    <div class="hero-panel">
      <span class="eyebrow">NIWAKI · GARDEN BONSAI · EVERGREEN DESIGN · JAPANESE GARDEN ART</span>
      <h1><span class="hero-accent">Niwaki</span> and Japanese tree art.<br><span>With Swiss precision.</span></h1>
      <p class="motto">Swiss quality in resonance with Japanese philosophy.</p>
      <p class="hero-copy hero-copy-desktop">For clients in the Zurich region, I shape and care for Japanese maples, pines and conifers so that a valuable tree keeps its form, strength and health for years.</p>
      <p class="hero-copy hero-copy-mobile">I shape valuable garden trees around Zurich so their form stays clear, strong and healthy.</p>
      <div class="btn-row">${cta("Send photo - free diagnosis")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Request callback</a></div>
      <div class="trust-row"><span class="experience-pill"><strong>27</strong> years of experience</span><span>Zurich region</span><span>Inspired in Japan</span></div>
    </div>
    ${heroVariantSwitcher("en", "Niwaki in a Swiss garden")}
  </section>
  <section class="section rescue-section"><div class="section-head"><span class="eyebrow">Before / after</span><h2>When the right cut brings back air, light and calm.</h2><p>This comparison shows my core promise: not making a tree merely green, but making its living architecture readable again.</p></div>${conceptRescueSlider("en")}<div class="btn-row"><a class="btn btn-secondary" href="galerie.html">View gallery</a></div></section>
  <section class="section split sanctuary-section"><div><span class="eyebrow">The real value</span><h2>The garden is the quietest room of the house.</h2><p>A niwaki is not shaped only to look tidy. It changes the view from the house: morning coffee, an evening on the terrace, guests arriving and seeing a garden that feels calm, precise and alive.</p><p>I do not shape for a quick effect. A valuable tree should not look forced after the cut. It should look as if the form was already waiting inside it.</p><div class="quiet-moments"><span>Morning coffee</span><span>Evening terrace</span><span>Guests with a garden view</span></div></div>${photoSlot({ folder: "08_fonovi", file: "fon-foto-01.webp", lang: "en", label: "Quiet garden moment after precise care", ratio: "16 / 9" })}</section>
  <section class="section split"><div><h2>Nature's laws cannot be ignored.</h2><p>Brown needles, dry branches and lost shape usually have one cause: the tree was cut too quickly or too cheaply. Fine shaping respects light, air and the energy distribution of the crown.</p><blockquote>Cutting a branch takes a second. Growing a new one takes years.</blockquote></div>${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "en", label: "Stress signs on a pine before diagnosis", ratio: "16 / 9" })}</section>
  <section class="section"><div class="section-head"><h2>Core services.</h2><p>Niwaki, Japanese maples and conifers up to 3 m; larger trees by arrangement.</p></div><div class="card-grid three">${serviceCardsEn}</div></section>
  <section class="section" id="vision" data-event-section="vision_section_view"><div class="section-head"><h2>Three years of work, not three quick photos.</h2><p>These images show phases of the work, not the same tree. Real progress happens in the calendar: diagnosis and relief, selective growth, then a form that carries itself.</p></div><div class="timeline"><article>${photoSlot({ folder: "02_pryklady-robit", file: "sosna-bila-23.webp", lang: "en", label: "Year 1 - diagnosis and first clean cut", ratio: "3 / 2" })}<h3>Year 1</h3><p>Read problem areas, remove deadwood, redistribute strength.</p></article><article>${photoSlot({ folder: "09_pomylky", file: "pomylka-svichka-01.webp", lang: "en", label: "Year 2 - guide selective growth", ratio: "3 / 2" })}<h3>Year 2</h3><p>The right shoots remain. Light and air open the crown.</p></article><article>${photoSlot({ folder: "02_pryklady-robit", file: "sosna-bila-17.webp", lang: "en", label: "Year 3 - calm stable tree form", ratio: "3 / 2" })}<h3>Year 3</h3><p>The form carries itself and no longer looks forced.</p></article></div></section>
  <section class="section signature-block"><div><span class="eyebrow">Signature offer</span><h2>Your personal tree vision - free.</h2><p>Send a photo of your tree. You receive my honest assessment and a visual idea of how the tree can look in three years, if it is worth taking into the calendar.</p><div class="check-strip" aria-label="Tree check in three images"><span>1. Whole tree</span><span>2. Problem area</span><span>3. Close-up</span></div>${cta("Send photo - get personal tree vision")}</div>${photoSlot({ folder: "08_fonovi", file: "fon-foto-02.webp", lang: "en", label: "Personal tree vision", ratio: "16 / 9" })}</section>
  ${finalCtaEn()}`;
}

function servicesEn() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Services</span>
    <h1>Services - Niwaki, maples and conifers.</h1>
    <p>Three focused areas: <strong>Niwaki shaping</strong>, Japanese maples (<em>Acer palmatum</em>) and pine/conifer shaping (<em>Pinus</em>, <em>Taxus</em>, <em>Juniperus</em>). Larger trees by arrangement.</p>
  </section>
  ${plantNameGuideEn()}
  <section class="section service-detail" id="niwaki">
    ${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "en", label: "Niwaki garden bonsai", ratio: "4 / 3" })}
    <div><span class="eyebrow">Service 1</span><h2>Niwaki (garden bonsai)</h2><p>Care and shaping of garden trees, not pot bonsai. Common species include pine (<em>Pinus</em>), yew (<em>Taxus baccata</em>) and juniper (<em>Juniperus</em>). The goal is not a green wall, but a crown with space for light, air and long-term structure.</p>${cta("Send a Niwaki photo")}</div>
  </section>
  <section class="section service-detail reverse" id="ahorn">
    ${photoSlot({ folder: "06_yaponski-kleny", file: "klen-yaponskyi-02.webp", lang: "en", label: "Japanese maple care", ratio: "4 / 3" })}
    <div><span class="eyebrow">Service 2</span><h2>Japanese maples - <em>Acer palmatum</em></h2><p>Japanese maple and dissected maple forms need seasonal shaping, deadwood removal inside the crown, careful hand work against moss and fungal pressure, and architectural crown care before density becomes a visible problem.</p>${cta("Send a maple photo")}</div>
  </section>
  <section class="section service-detail" id="nadelgehoelze">
    ${photoSlot({ folder: "04_khvoyni", file: "sosna-chorna-01.webp", lang: "en", label: "Pine shaping with Japanese tools", ratio: "4 / 3" })}
    <div><span class="eyebrow">Service 3</span><h2>Conifers - especially pine (<em>Pinus</em>)</h2><p>Scots pine (<em>Pinus sylvestris</em>), mountain pine (<em>Pinus mugo</em>), Japanese black pine (<em>Pinus thunbergii</em>), Japanese white pine (<em>Pinus parviflora</em>), Japanese red pine (<em>Pinus densiflora</em>), eastern white pine (<em>Pinus strobus</em>), yew (<em>Taxus baccata</em>), juniper (<em>Juniperus</em>), fir (<em>Abies</em>) and spruce (<em>Picea</em>). I cut selectively by hand, preserving future buds, light and air.</p>${cta("Send a pine photo")}</div>
  </section>
  <section class="section note-block"><h2>What is not included.</h2><p>This is not ordinary garden maintenance, lawn work or fast hedge trimming. I work with trees where form, health and the next years matter.</p><a class="text-link" href="blog/topiarschere.html">Why Japanese scissors change the result -></a></section>
  ${finalCtaEn()}`;
}

function genericEnPage(kind) {
  const map = {
    services: {
      h1: "Services - Niwaki, maples and conifers.",
      body: `<p>The same focused work as the German service page: niwaki shaping, Acer palmatum care and pine/conifer shaping by hand.</p><div class="card-grid three">${serviceCardsEn}</div>`
    },
    philosophy: {
      h1: "From simple cutting to Japanese tree art.",
      body: `<p>Before my journey to Japan, I mostly cut trees: correct the shape, reduce density, keep them smaller. In Kyoto in 2009, I began to understand Japanese tree care as a master craft: reading a tree as a living being, respecting its reaction and working with nature's laws.</p><p>Since then, niwaki has been my path. I do not promise miracles. I promise to work correctly, correct errors and shape for the next years, not only for the first impression.</p>`
    },
    gallery: {
      h1: "Before / after - my work.",
      body: `<div class="gallery-teaser">${photoSlot({ folder: "03_galereya", file: "sosna-bila-09.webp", lang: "en", label: "Niwaki example", ratio: "4 / 3" })}${photoSlot({ folder: "02_pryklady-robit", file: "sosna-bila-17.webp", lang: "en", label: "Work result", ratio: "4 / 3" })}${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "en", label: "Me at work", ratio: "3 / 2" })}</div><div class="section-head"><span class="eyebrow">Garden impressions</span><h2>Calm Japanese garden direction.</h2><p>Real client and work photos from my approved photo set.</p></div><div class="gallery-teaser">${photoSlot({ folder: "10_vidkrytka-yaponiya", file: "vidkrytka-yaponiya-01.webp", lang: "en", label: "Japanese garden inspiration", ratio: "4 / 3" })}</div>`
    },
    prices: {
      h1: "Prices - quality before speed.",
      body: `<p>Professional Japanese tree care starts at 110 CHF per hour. Travel starts at 90 CHF depending on distance. The first photo diagnosis is free.</p><div class="price-grid"><article class="card"><h2>110 CHF/h</h2><p>Work from</p></article><article class="card"><h2>90 CHF</h2><p>Travel from</p></article><article class="card"><h2>Free</h2><p>Photo diagnosis</p></article></div>`
    }
  };
  return `<section class="page-hero section"><span class="eyebrow">English mirror</span><h1>${map[kind].h1}</h1>${map[kind].body}</section>${kind === "services" ? plantNameGuideEn() : ""}${finalCtaEn()}`;
}

function contactEn() {
  return `<section class="page-hero section"><span class="eyebrow">Contact</span><h1>Send a photo.</h1><p>Three photos are enough for a first assessment: the whole tree, the problem area and a close-up.</p><div class="btn-row">${cta("Open WhatsApp - send photos")} <a class="btn btn-secondary" href="${telHref}" data-event="cta_call_click">Call: ${phoneDisplay}</a></div></section>
  <section class="section contact-grid"><form class="form-card" data-contact-form data-contact-kind="photo-diagnosis" data-event="contact_form_submit" action="/api/contact" method="post"><h2>Photo diagnosis.</h2><p class="form-note">Describe the tree briefly. Use WhatsApp when you want to send photos immediately; this form safely sends your callback details to me.</p><label class="hp-field" aria-hidden="true">Company <input name="company" tabindex="-1" autocomplete="off"></label><label>Name <input name="name"></label><label>Phone <input name="phone" type="tel" required></label><label>Email <input type="email" name="email"></label><label>Canton <input name="canton" required></label><label>Tree type <input name="tree" placeholder="e.g. Japanischer Ahorn (Acer palmatum), Waldkiefer (Pinus sylvestris), Eibe (Taxus baccata)"></label><label>Message <textarea name="message" rows="5"></textarea></label><button class="btn btn-primary" type="submit">Send request</button><p class="form-note"><a class="text-link" href="${whatsappHref}" target="_blank" rel="noopener">Write directly on WhatsApp</a> if you want to attach photos now.</p></form><div class="contact-side">${contactPerson("en")}<form class="form-card" id="rueckruf" data-contact-form data-contact-kind="callback" data-event="cta_rueckruf_submit" action="/api/contact" method="post"><h2>Request callback.</h2><p class="form-note">Phone number is enough. I will get back to you personally as soon as possible.</p><label class="hp-field" aria-hidden="true">Company <input name="company" tabindex="-1" autocomplete="off"></label><label>Name <input name="name"></label><label>Phone <input name="phone" type="tel" required></label><label>Preferred time <input name="desiredTime"></label><button class="btn btn-secondary" type="submit">Request callback</button></form></div></section>`;
}

const blogArticlesEnV2 = [
  ["topiarschere", "Why I cut with topiary scissors", "Clean cuts, less tearing and more control than a hedge trimmer.", "foto/07_viktor/viktor-01.webp"],
  ["energie-krone", "Why the crown must be opened", "Light, air and energy distribution explained in simple language.", "foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp"],
  ["niwaki-bonsai-stile", "Niwaki, bonsai and cloud pruning styles", "How I choose a style by tree, garden view and maintenance rhythm.", "foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp"],
  ["kiefer-kerzen", "Pine candles: timing matters", "How new pine shoots guide the next year of shape.", "foto/09_pomylky/pomylka-svichka-01.webp"],
  ["fehler-alte-nadeln-moos-pilzrisiko", "Old needles, moss and dense crowns: common mistakes", "Why air, light and dry needles matter before fungal risk grows.", "foto/08_fonovi/fon-sosna-bila-01.webp"],
  ["boden-wurzeln", "The soil decides: Akadama and roots", "Water, air, pH and root health as the foundation of tree architecture.", "foto/10_vidkrytka-yaponiya/vidkrytka-yaponiya-01.webp"],
  ["klimastress", "Why Swiss premium gardens need diagnosis", "Heat, dry summers and heavy rain make early assessment more valuable.", "foto/08_fonovi/fon-sosna-bila-01.webp"]
];

function articleNavEnV2() {
  return `<nav class="article-nav" aria-label="More knowledge articles">${blogArticlesEnV2.map(([slug, title]) => `<a href="${slug}.html">${title}</a>`).join("")}</nav>`;
}

function blogIndexEnV2() {
  return `<section class="page-hero section"><span class="eyebrow">Knowledge</span><h1>Knowledge about niwaki, maples and valuable garden trees.</h1><p>Seven English mirror articles explain my craft: styles, tools, crown energy, pine candles, old needles, moss, roots and climate stress in Swiss premium gardens.</p></section><section class="section article-grid">${blogArticlesEnV2.map(([slug, title, teaser, image]) => `<article class="card article-card">${assetSlot({ file: image, label: title, ratio: "3 / 2" })}<span class="eyebrow">Knowledge</span><h2>${title}</h2><p>${teaser}</p><a href="${slug}.html">Read article</a></article>`).join("")}</section>${finalCtaEn("../")}`;
}

function articleEnV2(type) {
  const sources = `<aside class="source-list"><h2>Technical context</h2><p>This page combines my practice with public technical sources and does not replace an on-site assessment.</p><ul><li><a href="https://www.rhs.org.uk/plants/types/trees/pruning-guide" target="_blank" rel="noopener">RHS pruning guide</a></li><li><a href="https://www.meteoswiss.admin.ch/climate/climate-change.html" target="_blank" rel="noopener">MeteoSwiss climate change in Switzerland</a></li></ul></aside>`;
  if (type === "topiary") {
    return `<article class="article section"><span class="eyebrow">Topiary scissors</span><h1>Why I cut with topiary scissors.</h1>${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "en", label: "Me with topiary scissors on a pine", ratio: "16 / 9" })}<p>A valuable niwaki is not a hedge. A hedge trimmer works fast over a surface; topiary scissors allow one deliberate cut at a time. I decide which bud stays, where light should enter and how the cloud can develop next year.</p><p>The point is not romantic slowness. It is control. A clean, selective cut protects the future shape of the tree and prevents the quick outer shell that often leaves the inside weak and dry.</p>${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - check the cut")}</div></article>`;
  }
  if (type === "crown") {
    return `<article class="article section"><span class="eyebrow">Crown energy</span><h1>Why the crown must be opened.</h1>${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "en", label: "Open niwaki crown", ratio: "16 / 9" })}<p>The crown is where a tree spends much of its visible energy. If it becomes too dense, the outside stays green while the inside loses light, air and structure. I open the crown so the tree can breathe and keep its form over years, not only after the first cut.</p>${energyDiagramV2()}${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - check crown structure")}</div></article>`;
  }
  if (type === "styles") {
    return `<article class="article section"><span class="eyebrow">Niwaki style</span><h1>Niwaki, bonsai and cloud pruning styles.</h1>${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "en", label: "Niwaki style with calm cloud form", ratio: "16 / 9" })}<p>When I look at a garden tree, I do not start with how much I can cut. I ask which language fits the tree, the garden and the view from the house.</p><p>Cloud pruning is described by the RHS as a Japanese method of training trees and shrubs into cloud-like forms; Niwaki means garden tree. I use bonsai thinking for proportion, movement and future buds, but I shape a living garden tree, not a decorative object.</p><div class="process-grid"><div><strong>Read the tree</strong><p>Species, age, branch structure and reaction decide the possible style.</p></div><div><strong>Read the garden</strong><p>The form must work from the terrace, path and windows.</p></div><div><strong>Plan care</strong><p>The finer the style, the more important the annual rhythm becomes.</p></div></div>${sourceListEnV2([["RHS: cloud pruning and Niwaki", "https://www.rhs.org.uk/plants/types/trees/cloud-pruning"], ["RHS: conifers and careful pruning", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"]])}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - check style direction")}</div></article>`;
  }
  if (type === "candles") {
    return `<article class="article section"><span class="eyebrow">Pinus</span><h1>Pine candles: timing matters.</h1>${photoSlot({ folder: "09_pomylky", file: "pomylka-svichka-01.webp", lang: "en", label: "New pine candles", ratio: "16 / 9" })}<p>New pine shoots, or candles, show where the tree is pushing strength. Treating every candle the same is a mistake. Strong areas may need calming; weak areas may need protection. Timing and selectivity build refinement without exhausting the tree.</p><div class="process-grid"><div><strong>Read</strong><p>Where is the strongest push?</p></div><div><strong>Select</strong><p>Which shoots build the next cloud?</p></div><div><strong>Preserve</strong><p>Leave enough strength for recovery.</p></div></div>${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send pine photo")}</div></article>`;
  }
  if (type === "mistakes") {
    return `<article class="article section"><span class="eyebrow">Mistakes and diagnosis</span><h1>Old needles, moss and dense crowns: common mistakes.</h1>${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "en", label: "Dense crown and possible stress on a valuable conifer", ratio: "16 / 9" })}<p>Old needles, brown inner areas or moss on branches do not automatically mean disease. They are signals. I read the whole pattern: light, air, water, previous cuts and how long needles stay wet.</p><p>RHS sources treat moss, algae and lichens as generally harmless on bark. But damp, shaded and congested conditions can make them more visible. Plant disease sources also point to moisture, poor air movement and dense growth as risk factors for needle problems.</p><div class="comparison-grid"><div><h2>Old needles</h2><p>Natural ageing is possible. Rapid thinning or heavy browning needs a closer check.</p></div><div><h2>Moss and coating</h2><p>The coating is often a symptom of local conditions, not the root cause.</p></div><div><h2>Dense shell</h2><p>Fast shearing can trap shade and moisture inside the crown.</p></div><div><h2>Fungal risk</h2><p>Air movement, dry timing and hygiene matter before a small issue becomes structural.</p></div></div>${sourceListEnV2([["RHS: algae, lichens and moss on trees", "https://www.rhs.org.uk/biodiversity/algae-lichens-moss-on-trees-shrubs"], ["RHS: conifers and old brown wood", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"], ["University of Minnesota: brown spot needle blight", "https://extension.umn.edu/plant-diseases/brown-spot-needle-blight"], ["University of Minnesota: Rhizosphaera needle cast", "https://extension.umn.edu/plant-diseases/rhizosphaera-needle-cast"], ["University of Maine: Rhizosphaera Needlecast", "https://extension.umaine.edu/ipm/ipddl/publications/5104e/"]])}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - check needles and crown")}</div></article>`;
  }
  if (type === "soil") {
    return `<article class="article section"><span class="eyebrow">Roots</span><h1>The soil decides: Akadama and roots.</h1>${photoSlot({ folder: "10_vidkrytka-yaponiya", file: "vidkrytka-yaponiya-01.webp", lang: "en", label: "Roots and substrate", ratio: "16 / 9" })}<p>A tree lives from its foundation. Water, air, pH and root health decide whether the crown can react. If the soil is too dense, too wet or too dry, the visible problem often starts below the surface.</p><p>I check the tree as a system: crown, trunk, roots, water and location. A cut can correct a lot, but it cannot replace a healthy foundation.</p>${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send tree and soil photo")}</div></article>`;
  }
  return `<article class="article section"><span class="eyebrow">Swiss climate stress</span><h1>Why Swiss premium gardens need diagnosis.</h1>${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "en", label: "Stress signs on a valuable tree", ratio: "16 / 9" })}<p>Swiss gardens face more heat, drier summers and heavier rain events. For valuable solitary trees, this means water stress, dense crowns, compacted soil and old pruning mistakes can reinforce each other.</p>${stressChainV2()}<p>Early photo diagnosis protects value: the whole tree, the problem area and a close-up are often enough to decide whether an on-site visit makes sense.</p>${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - assess stress")}</div></article>`;
}

function blogIndexEn() {
  return `<section class="page-hero section"><span class="eyebrow">Knowledge</span><h1>Knowledge about niwaki, maples and conifers.</h1><p>Two starter articles translated for English visitors.</p></section><section class="section card-grid two"><article class="card article-card"><h2>Why I cut with topiary scissors</h2><p>Clean cuts, energy and Japanese tools.</p><a href="topiarschere.html">Read article</a></article><article class="card article-card"><h2>The soil decides</h2><p>Akadama, pH and healthy roots.</p><a href="boden-wurzeln.html">Read article</a></article></section>${finalCtaEn("../")}`;
}

function articleEn(type) {
  if (type === "topiary") {
    return `<article class="article section"><span class="eyebrow">Topiary scissors</span><h1>Why I cut with topiary scissors.</h1>${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "en", label: "Topiary scissors and clean cut", ratio: "16 / 9" })}<p>A clean cut is not a detail. A hedge trimmer tears fibres and makes the tree send energy into wounds. With sharp Japanese topiary scissors, each cut is deliberate: where light must enter, which bud should stay, and how the cloud will develop next year.</p><p>This is the difference between quick garden maintenance and precise niwaki work. If you suspect your tree was cut too hard or too schematically, send photos for a free first assessment.</p>${cta("Send photo - free diagnosis")}</article>`;
  }
  return `<article class="article section"><span class="eyebrow">Akadama & roots</span><h1>The soil decides: Akadama and roots.</h1>${photoSlot({ folder: "10_vidkrytka-yaponiya", file: "vidkrytka-yaponiya-01.webp", lang: "en", label: "Akadama and healthy roots", ratio: "16 / 9" })}<p>A tree lives from its foundation. Akadama, Kanuma, pumice, water flow and pH all influence whether a Japanese maple or niwaki can stay healthy. Many visible problems in the crown begin below the surface.</p><p>Send photos of the tree, location and soil area. Often this is enough to decide whether the crown needs work or the roots are the real key.</p>${cta("Send photo - free diagnosis")}</article>`;
}

function finalCtaUk(contactPrefix = "") {
  return `<section class="section final-cta">
    <div>
      <span class="eyebrow">Безкоштовна перша оцінка</span>
      <h2>Готові зрозуміти, чи можна врятувати дерево?</h2>
      <p>Надішліть фото дерева і проблемної зони. Я чесно скажу, чи має сенс виїзд і який підхід може допомогти.</p>
      <div class="btn-row">${ctaUk("Надіслати фото - безкоштовна діагностика")} <a class="btn btn-secondary" href="${contactPrefix}kontakt.html#rueckruf" data-event="cta_callback_click">Запросити дзвінок</a></div>
    </div>
  </section>`;
}

const serviceCardsUk = `
  <div class="card service-card">
    <span class="eyebrow">Niwaki</span>
    <h3>Садовий бонсай</h3>
    <p>Формування садових дерев: Kiefer (Pinus), Eibe (Taxus) і Wacholder (Juniperus). Крона відкривається для світла, повітря і довгої форми.</p>
    <a href="leistungen.html#niwaki">Детальніше про Niwaki</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Acer palmatum</span>
    <h3>Японські клени</h3>
    <p>Japanischer Ahorn / Fächerahorn (Acer palmatum) і Schlitzahorn: сезонний ручний догляд, суха деревина, мох і грибкові ризики.</p>
    <a href="leistungen.html#ahorn">Догляд за японським кленом</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Pinus & Taxus</span>
    <h3>Хвойні дерева</h3>
    <p>Kiefer (Pinus), Eibe (Taxus baccata), Wacholder (Juniperus), Tanne (Abies) і Fichte (Picea). Чистий ручний зріз.</p>
    <a href="leistungen.html#nadelgehoelze">Формування сосни та хвойних</a>
  </div>`;

function homeUk() {
  return `
  <section class="hero section" data-hero-root data-hero-variant="1">
    <div class="hero-media">${heroPhotoSlot({ lang: "uk", label: "Niwaki у швейцарському саду" })}</div>
    <div class="hero-panel">
      <span class="eyebrow">FORMGEHÖLZE · NIWAKI · EVERGREEN DESIGN · ЯПОНСЬКЕ САДОВЕ МИСТЕЦТВО</span>
      <h1><span class="hero-accent">Niwaki</span> і японська деревна архітектура.<br><span>Зі швейцарською точністю.</span></h1>
      <p class="motto">Швейцарська якість у резонансі з японською філософією.</p>
      <p class="hero-copy hero-copy-desktop">Я формую і доглядаю <strong>Niwaki, садовий бонсай, японські клени, сосни і хвойні</strong> у регіоні Цюриха так, щоб дерево роками зберігало форму, силу і здоров'я.</p>
      <p class="hero-copy hero-copy-mobile">Я формую цінні дерева в регіоні Цюриха: чиста ручна робота для форми, сили й здоров'я.</p>
      <div class="btn-row">${ctaUk("Надіслати фото - безкоштовна діагностика")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Запросити дзвінок</a></div>
      <div class="trust-row"><span class="experience-pill"><strong>27</strong> років досвіду</span><span>Регіон Цюриха</span><span>Натхнення з Японії</span></div>
    </div>
    ${heroVariantSwitcher("uk", "Niwaki у швейцарському саду")}
  </section>

  <section class="section rescue-section">
    <div class="section-head">
      <span class="eyebrow">До / після</span>
      <h2>Правильний зріз повертає дереву повітря, світло і спокій.</h2>
      <p>Ці зображення показують напрям роботи: не просто зробити дерево зеленим, а знову зробити його живу архітектуру читабельною. Реальні клієнтські фото підставляються після погодження.</p>
    </div>
    ${conceptRescueSlider("uk")}
    <div class="btn-row"><a class="btn btn-secondary" href="galerie.html">Подивитися галерею робіт</a></div>
  </section>

  <section class="section split sanctuary-section">
    <div>
      <span class="eyebrow">Справжня цінність</span>
      <h2>Сад - це найтихіша кімната дому.</h2>
      <p>Niwaki доглядають не лише заради акуратності. Він змінює вид із дому: ранкова кава, вечір на терасі, гості, які бачать спокійний, точний і живий сад.</p>
      <p>Тому я не працюю заради швидкого ефекту. Цінне дерево після зрізу не має виглядати чужим. Воно має виглядати так, ніби ця форма вже жила всередині.</p>
      <div class="quiet-moments"><span>Ранкова кава</span><span>Вечір на терасі</span><span>Гості з видом на сад</span></div>
    </div>
    ${photoSlot({ folder: "08_fonovi", file: "fon-foto-01.webp", lang: "uk", label: "Спокійний сад після точного догляду", ratio: "16 / 9" })}
  </section>

  <section class="section split">
    <div>
      <span class="eyebrow">Закони природи</span>
      <h2>Закони природи не можна ігнорувати.</h2>
      <p>Спочатку коричневі голки. Потім сухі гілки. Дерево втрачає одну гілку, потім другу, а згодом і форму. Часто причина проста: дерево різали швидко, дешево і без розуміння його енергії.</p>
      <blockquote>Відрізати гілку можна за секунду. Виростити нову - це роки.</blockquote>
    </div>
    ${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "uk", label: "Цінне дерево перед діагностикою", ratio: "16 / 9" })}
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
      <article>${photoSlot({ folder: "02_pryklady-robit", file: "sosna-bila-23.webp", lang: "uk", label: "Рік 1 - діагностика і перший чистий зріз", ratio: "3 / 2" })}<h3>Рік 1</h3><p>Прочитати проблему, забрати сухе, перерозподілити силу.</p></article>
      <article>${photoSlot({ folder: "09_pomylky", file: "pomylka-svichka-01.webp", lang: "uk", label: "Рік 2 - вибірково вести новий ріст", ratio: "3 / 2" })}<h3>Рік 2</h3><p>Залишаються правильні пагони. Світло і повітря відкривають крону.</p></article>
      <article>${photoSlot({ folder: "02_pryklady-robit", file: "sosna-bila-17.webp", lang: "uk", label: "Рік 3 - спокійна стабільна форма дерева", ratio: "3 / 2" })}<h3>Рік 3</h3><p>Форма тримається сама і виглядає вирощеною, а не примусово вистриженою.</p></article>
    </div>
  </section>

  <section class="section signature-block">
    <div>
      <span class="eyebrow">Сигнатурна пропозиція</span>
      <h2>Ваше персональне бачення дерева - безкоштовно.</h2>
      <p>Надішліть фото дерева. Ви отримаєте мою чесну оцінку і напрям, як дерево може виглядати через три роки, якщо його варто брати в роботу.</p>
      <div class="check-strip" aria-label="Перевірка дерева у трьох зображеннях"><span>1. Все дерево</span><span>2. Проблемна зона</span><span>3. Крупний план</span></div>
      ${ctaUk("Надіслати фото - отримати бачення дерева")}
    </div>
    ${photoSlot({ folder: "08_fonovi", file: "fon-foto-02.webp", lang: "uk", label: "Персональне бачення дерева", ratio: "16 / 9" })}
  </section>
  ${finalCtaUk()}`;
}

function servicesUk() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Послуги</span>
    <h1>Послуги - Niwaki, японські клени і хвойні.</h1>
    <p>Три основні напрями: <strong>Niwaki</strong>, догляд за японськими кленами (<em>Acer palmatum</em>) і формування сосен та інших хвойних дерев (<em>Pinus</em>, <em>Taxus</em>, <em>Juniperus</em>).</p>
  </section>
  ${plantNameGuideUk()}
  <section class="section service-detail" id="niwaki">
    ${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "uk", label: "Niwaki / садовий бонсай", ratio: "4 / 3" })}
    <div><span class="eyebrow">Напрям 1</span><h2>Niwaki - садовий бонсай</h2><p>Ручне формування дерев у саду: Kiefer (<em>Pinus</em>), Eibe (<em>Taxus baccata</em>), Wacholder (<em>Juniperus</em>) та інші форми. Завдання не зробити зелену стіну, а направити силу дерева туди, де вона створює форму, світло і довгий спокій.</p>${ctaUk("Надіслати фото Niwaki")}</div>
  </section>
  <section class="section service-detail reverse" id="ahorn">
    ${photoSlot({ folder: "06_yaponski-kleny", file: "klen-yaponskyi-02.webp", lang: "uk", label: "Я працюю з японським кленом", ratio: "4 / 3" })}
    <div><span class="eyebrow">Напрям 2</span><h2>Японські клени - <em>Acer palmatum</em></h2><p>Japanischer Ahorn / Fächerahorn (<em>Acer palmatum</em>) і Schlitzahorn (<em>Acer palmatum</em> Dissectum-Gruppe): сезонне формування, суха деревина всередині крони, ручна робота проти моху і грибкових ризиків. Крону треба відкривати до того, як проблема стане видимою.</p>${ctaUk("Надіслати фото клена")}</div>
  </section>
  <section class="section service-detail" id="nadelgehoelze">
    ${photoSlot({ folder: "04_khvoyni", file: "sosna-chorna-01.webp", lang: "uk", label: "Формування сосни японськими ножицями", ratio: "4 / 3" })}
    <div><span class="eyebrow">Напрям 3</span><h2>Хвойні дерева - особливо сосна (<em>Pinus</em>)</h2><p>Waldkiefer (<em>Pinus sylvestris</em>), Bergkiefer (<em>Pinus mugo</em>), Japanische Schwarzkiefer (<em>Pinus thunbergii</em>), Mädchen-Kiefer / Japanische Weisskiefer (<em>Pinus parviflora</em>), Japanische Rotkiefer (<em>Pinus densiflora</em>), Weymouth-Kiefer (<em>Pinus strobus</em>), Eibe (<em>Taxus baccata</em>), Wacholder (<em>Juniperus</em>), Tanne (<em>Abies</em>) і Fichte (<em>Picea</em>). Робота виконується вибірково і вручну, щоб не зламати майбутню структуру дерева.</p>${ctaUk("Надіслати фото сосни")}</div>
  </section>
  <section class="section note-block"><h2>Що сюди не входить.</h2><p>Це не звичайне прибирання саду і не швидке підрівнювання живоплоту. Я працюю з деревами, для яких важливі форма, здоров'я і довга перспектива.</p><a class="text-link" href="blog/topiarschere.html">Чому японські ножиці змінюють результат →</a></section>
  ${finalCtaUk()}`;
}

function genericUkPage(kind) {
  const pages = {
    philosophy: {
      eyebrow: "Філософія",
      h1: "Від простого зрізу до японського мистецтва дерева.",
      body: `<p>До поїздки в Японію я здебільшого просто стриг дерева: поправити форму, зменшити густоту, втримати розмір. У Кіото в 2009 році я побачив інший рівень - японське майстерство догляду за деревами, де дерево сприймають як живу істоту.</p><p>Відтоді для мене Niwaki - це не швидкий зріз, а ремесло: прочитати дерево, поважати його реакцію і працювати за законами природи. Форма має мати сенс через рік, два і три, а не тільки в день після роботи.</p>`
    },
    gallery: {
      eyebrow: "Галерея",
      h1: "До і після - реальні приклади робіт.",
      body: `<p>Галерея показує реальні робочі фото, готові дерева і приклади формування.</p><div class="gallery-teaser">${photoSlot({ folder: "03_galereya", file: "sosna-bila-09.webp", lang: "uk", label: "Готове дерево Niwaki", ratio: "4 / 3" })}${photoSlot({ folder: "02_pryklady-robit", file: "sosna-bila-17.webp", lang: "uk", label: "Результат роботи", ratio: "4 / 3" })}</div>`
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
    ["topiarschere", "Чому я ріжу японськими ножицями", "Чистий зріз, менше травми і більше контролю, ніж у звичайного тримера.", "foto/07_viktor/viktor-01.webp"],
    ["energie-krone", "Чому крону треба відкривати", "Світло, повітря і розподіл сили в дереві простими словами.", "foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp"],
    ["niwaki-bonsai-stile", "Стилі Niwaki, Bonsai і cloud pruning", "Як я вибираю стиль за деревом, садом і ритмом догляду.", "foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp"],
    ["kiefer-kerzen", "Свічки сосни: важливий момент", "Нові пагони Pinus показують, куди дерево віддає силу.", "foto/09_pomylky/pomylka-svichka-01.webp"],
    ["fehler-alte-nadeln-moos-pilzrisiko", "Стара хвоя, мох і щільна крона: типові помилки", "Чому повітря, світло і суха хвоя важливі до появи грибкового ризику.", "foto/08_fonovi/fon-sosna-bila-01.webp"],
    ["boden-wurzeln", "Ґрунт вирішує: Akadama і коріння", "Вода, повітря, pH і здорове коріння як фундамент форми.", "foto/10_vidkrytka-yaponiya/vidkrytka-yaponiya-01.webp"],
    ["klimastress", "Кліматичний стрес у преміум-саді", "Спека, сухі літа і сильні дощі роблять ранню діагностику важливішою.", "foto/08_fonovi/fon-sosna-bila-01.webp"]
  ];
  return `<section class="page-hero section"><span class="eyebrow">Знання</span><h1>Знання про Niwaki, клени і цінні садові дерева.</h1><p>Сім коротких матеріалів пояснюють мій підхід: стилі Niwaki, інструмент, енергія крони, свічки сосни, стара хвоя, мох, коріння і кліматичний стрес у Швейцарії.</p></section><section class="section article-grid">${articles.map(([slug, title, teaser, image]) => `<article class="card article-card">${assetSlotUk({ file: image, label: title, ratio: "3 / 2" })}<span class="eyebrow">Знання</span><h2>${title}</h2><p>${teaser}</p><a href="${slug}.html">Читати статтю</a></article>`).join("")}</section>${finalCtaUk("../")}`;
}

function articleNavUk() {
  const links = [
    ["topiarschere", "Японські ножиці"],
    ["energie-krone", "Енергія крони"],
    ["niwaki-bonsai-stile", "Стилі Niwaki"],
    ["kiefer-kerzen", "Свічки сосни"],
    ["fehler-alte-nadeln-moos-pilzrisiko", "Хвоя і мох"],
    ["boden-wurzeln", "Ґрунт і коріння"],
    ["klimastress", "Кліматичний стрес"]
  ];
  return `<nav class="article-nav" aria-label="Інші статті">${links.map(([slug, title]) => `<a href="${slug}.html">${title}</a>`).join("")}</nav>`;
}

function articleUk(type) {
  const sourceNote = sourceListUkV2([
    ["RHS: pruning guide", "https://www.rhs.org.uk/plants/types/trees/pruning-guide"],
    ["RHS: cloud pruning і Niwaki", "https://www.rhs.org.uk/plants/types/trees/cloud-pruning"],
    ["RHS: conifers", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"],
    ["NAJGA: Japanese black pine pruning", "https://najga.org/pruning-japanese-black-pine/"],
    ["Chicago Botanic Garden: pine candling", "https://www.chicagobotanic.org/blog/learning/candling-japanese-garden"],
    ["RHS: algae, lichens and moss", "https://www.rhs.org.uk/biodiversity/algae-lichens-moss-on-trees-shrubs"],
    ["University of Minnesota: brown spot needle blight", "https://extension.umn.edu/plant-diseases/brown-spot-needle-blight"],
    ["University of Minnesota: Rhizosphaera needle cast", "https://extension.umn.edu/plant-diseases/rhizosphaera-needle-cast"],
    ["University of Maine: Rhizosphaera Needlecast", "https://extension.umaine.edu/ipm/ipddl/publications/5104e/"]
  ]);
  const map = {
    topiary: `<span class="eyebrow">Японські ножиці</span><h1>Чому я ріжу topiary scissors.</h1>${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "uk", label: "Я з японськими ножицями біля сосни", ratio: "16 / 9" })}<p>Цінне Niwaki - не живопліт. Тример швидко проходить по поверхні, але японські ножиці дають один свідомий зріз за раз: яка брунька лишається, куди заходить світло і як хмара дерева розвиватиметься наступного року.</p><p>Суть не в романтичній повільності. Суть у контролі. Чистий вибірковий зріз береже майбутню форму дерева.</p>`,
    crown: `<span class="eyebrow">Крона і енергія</span><h1>Чому крону треба відкривати.</h1>${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "uk", label: "Відкрита крона Niwaki", ratio: "16 / 9" })}<p>Коли крона стає занадто щільною, зовні вона ще зелена, але всередині втрачає світло, повітря і структуру. Я відкриваю крону так, щоб дерево дихало і тримало форму роками.</p><div class="process-grid"><div><strong>1. Прочитати</strong><p>Де дерево витрачає силу?</p></div><div><strong>2. Розвантажити</strong><p>Забрати сухе, зайве і затінене.</p></div><div><strong>3. Залишити майбутнє</strong><p>Зберегти бруньки, які будують форму.</p></div></div>`,
    styles: `<span class="eyebrow">Стиль Niwaki</span><h1>Стилі Niwaki, Bonsai і cloud pruning.</h1>${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "uk", label: "Спокійна хмарна форма Niwaki у саду", ratio: "16 / 9" })}<p>Коли я дивлюся на садове дерево, я не починаю з питання, скільки можна зрізати. Я питаю: яка мова форми підходить цьому дереву, саду і виду з дому?</p><p>Cloud pruning - це японський метод ведення дерев і кущів у хмарні форми; Niwaki означає garden tree. Я використовую bonsai-мислення для пропорції, руху стовбура і майбутніх бруньок, але в саду працюю з живим деревом, а не з декорацією.</p><div class="process-grid"><div><strong>Прочитати дерево</strong><p>Вид, вік, гілки і реакція визначають можливий стиль.</p></div><div><strong>Прочитати сад</strong><p>Форма має працювати з тераси, доріжки і вікон.</p></div><div><strong>Планувати догляд</strong><p>Чим тонший стиль, тим важливіший щорічний ритм.</p></div></div>`,
    candles: `<span class="eyebrow">Pinus</span><h1>Свічки сосни: момент вирішує.</h1>${photoSlot({ folder: "09_pomylky", file: "pomylka-svichka-01.webp", lang: "uk", label: "Нові свічки сосни перед роботою", ratio: "16 / 9" })}<p>Нові пагони сосни показують, куди дерево зараз штовхає силу. Якщо ставитися до всіх свічок однаково, легко збити баланс. Сильні зони треба заспокоїти, слабкі - захистити.</p><p>Раннє фото часто достатнє, щоб зрозуміти, чи потрібен виїзд.</p>`,
    mistakes: `<span class="eyebrow">Помилки і діагностика</span><h1>Стара хвоя, мох і щільна крона: типові помилки.</h1>${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "uk", label: "Щільна крона і можливий стрес у цінного хвойного дерева", ratio: "16 / 9" })}<p>Стара хвоя всередині, коричневі зони або мох на гілках не завжди означають хворобу. Але це сигнали, які треба читати разом: світло, повітря, вода, попередній зріз і те, як довго хвоя залишається мокрою.</p><p>Мох і лишайники часто не шкодять корі самі по собі. Проблема в іншому: вологе, затінене і загущене місце може створювати умови, де грибковий тиск легше стає проблемою.</p><div class="comparison-grid"><div><h2>Стара хвоя</h2><p>Природне старіння можливе, але швидке прорідження потребує перевірки.</p></div><div><h2>Мох і наліт</h2><p>Часто це симптом умов, а не головна причина.</p></div><div><h2>Щільна оболонка</h2><p>Швидке стриження може закрити всередині тінь і вологу.</p></div><div><h2>Грибковий ризик</h2><p>Повітря, сухий момент роботи і гігієна важливі до структурної проблеми.</p></div></div>`,
    soil: `<span class="eyebrow">Akadama і коріння</span><h1>Ґрунт вирішує: Akadama і коріння.</h1>${photoSlot({ folder: "10_vidkrytka-yaponiya", file: "vidkrytka-yaponiya-01.webp", lang: "uk", label: "Коріння і субстрат", ratio: "16 / 9" })}<p>Дерево живе з фундаменту. Вода, повітря, кислотність і стан коріння визначають, чи може крона реагувати. Якщо ґрунт занадто щільний, мокрий або сухий, видима проблема часто починається нижче поверхні.</p><p>Я дивлюся на дерево як на систему: крона, стовбур, коріння, вода і місце.</p>`,
    climate: `<span class="eyebrow">Швейцарія і клімат</span><h1>Чому преміум-сади потребують діагностики.</h1>${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "uk", label: "Ознаки стресу на цінному дереві", ratio: "16 / 9" })}<p>Швейцарські сади стикаються з більшою спекою, сухішими літами і сильнішими опадами. Для цінних солітерних дерев це означає водний стрес, щільні крони, ущільнений ґрунт і старі помилки обрізки, які підсилюють одна одну.</p><p>Рання фото-діагностика захищає цінність: все дерево, проблемна зона і крупний план часто достатні для першого рішення.</p>`
  };
  return `<article class="article section">${map[type]}${sourceNote}${articleNavUk()}<div class="btn-row">${ctaUk("Надіслати фото - отримати оцінку")}</div></article>`;
}

function contactUk() {
  return `<section class="page-hero section"><span class="eyebrow">Контакт</span><h1>Надішліть фото дерева.</h1><p>Для першої оцінки достатньо трьох фото: все дерево, проблемна зона і крупний план.</p><div class="btn-row">${ctaUk("Відкрити WhatsApp - надіслати фото")} <a class="btn btn-secondary" href="${telHref}" data-event="cta_call_click">Подзвонити: ${phoneDisplay}</a></div></section>
  <section class="section contact-grid"><form class="form-card" data-contact-form data-contact-kind="photo-diagnosis" data-event="contact_form_submit" action="/api/contact" method="post"><h2>Фото-діагностика.</h2><p class="form-note">Коротко опишіть дерево. Якщо треба одразу надіслати фото, WhatsApp залишається найшвидшим шляхом; ця форма безпечно передає мені дані для звʼязку.</p><label class="hp-field" aria-hidden="true">Компанія <input name="company" tabindex="-1" autocomplete="off"></label><label>Ім'я <input name="name" autocomplete="name"></label><label>Телефон <input type="tel" name="phone" autocomplete="tel" required></label><label>E-mail <input type="email" name="email" autocomplete="email"></label><label>Кантон <input name="kanton" autocomplete="address-level1" required></label><label>Вид дерева <input name="baumart" placeholder="наприклад Japanischer Ahorn (Acer palmatum), Waldkiefer (Pinus sylvestris), Eibe (Taxus baccata)"></label><label>Повідомлення <textarea name="nachricht" rows="5" required></textarea></label><button class="btn btn-primary" type="submit">Надіслати запит</button><p class="form-note"><a class="text-link" href="${whatsappHrefUk}" target="_blank" rel="noopener">Написати напряму в WhatsApp</a>, якщо хочете додати фото зараз.</p></form><div class="contact-side">${contactPerson("uk")}<form class="form-card" id="rueckruf" data-contact-form data-contact-kind="callback" data-event="cta_rueckruf_submit" action="/api/contact" method="post"><h2>Запросити дзвінок.</h2><p class="form-note">Достатньо телефону. Я звʼяжуся з вами особисто якнайшвидше.</p><label class="hp-field" aria-hidden="true">Компанія <input name="company" tabindex="-1" autocomplete="off"></label><label>Ім'я <input name="name" autocomplete="name"></label><label>Телефон <input type="tel" name="phone" autocomplete="tel" required></label><label>Зручний час <input name="desiredTime" placeholder="наприклад Пн 18-20"></label><button class="btn btn-secondary" type="submit">Запросити дзвінок</button></form></div></section>`;
}

function legalUk(kind) {
  const isPrivacy = kind === "datenschutz";
  return `<section class="page-hero section legal"><span class="eyebrow">Чернетка</span><h1>${isPrivacy ? "Політика приватності" : "Юридична інформація"}.</h1><p>Ця сторінка структурована, але не фінальна. Юридичні дані треба перевірити і доповнити перед публікацією.</p></section><section class="section legal-content"><h2>${isPrivacy ? "Відповідальна сторона" : "Дані за швейцарськими вимогами"}</h2><p>${brand}<br>Адреса після погодження<br>Швейцарія</p><h2>Контакт</h2><p>Телефон і e-mail додаються після фінального погодження.</p><h2>${isPrivacy ? "Персональні дані, форми і аналітика" : "Відповідальність за контент"}</h2><p>${isPrivacy ? "Форми, фото-завантаження, Analytics і Ads вимірювання вмикаються тільки після фінальної технічної та юридичної перевірки. Consent Mode підготовлений у коді; зовнішні IDs ще не активні." : "Контент підготовлений уважно, але до фінального погодження не є юридично завершеним документом."}</p></section>`;
}

function themesPageUk() {
  return `<section class="page-hero section"><span class="eyebrow">Внутрішній перегляд</span><h1>Theme Preview V1-V5.</h1><p>Для Андрія/Віктора: можна перемикати дизайн-напрям без перебудови layout.</p><div class="theme-buttons">${[1, 2, 3, 4, 5].map((n) => `<button class="btn btn-secondary" type="button" data-theme-option="theme-v${n}.css">V${n}</button>`).join("")}</div></section><section class="section"><div class="card-grid three">${serviceCardsUk}</div></section><section class="section split"><div><h2>Приклад блоку.</h2><p>Ця сторінка показує токени теми: фон, поверхню, текст, основний колір, акцент, лінії, тіні і кнопки.</p><div class="btn-row">${ctaUk("Надіслати фото - тест CTA")} <a class="btn btn-secondary" href="kontakt.html">Контакт</a></div></div>${photoSlot({ folder: "01_hero", file: "hero-viktor-bonsai-main.webp", lang: "uk", label: "Зображення для перевірки теми", ratio: "16 / 9" })}</section>`;
}

function cssBase() {
  return `*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-body);font-size:16px;line-height:1.65;padding-bottom:0}body.menu-open{overflow:hidden}img,svg{max-width:100%;display:block}a{color:inherit}a:hover{text-decoration-color:var(--accent)}:focus-visible{outline:3px solid var(--accent);outline-offset:3px}.skip-link{position:absolute;left:12px;top:-80px;z-index:20;background:var(--primary);color:var(--primary-ink);padding:10px 14px;border-radius:8px}.skip-link:focus{top:12px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.site-header{position:sticky;top:0;z-index:15;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:12px max(16px,calc((100vw - var(--maxw))/2));background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}.brand{display:flex;align-items:center;gap:14px;text-decoration:none;min-width:0}.brand-symbol{width:42px;height:42px;border-radius:50%;background:radial-gradient(circle at 45% 28%,var(--leaf) 0 18%,transparent 19%),radial-gradient(circle at 60% 42%,var(--leaf) 0 20%,transparent 21%),linear-gradient(160deg,var(--primary),var(--accent));box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--surface) 70%,transparent)}.brand-text{display:grid;line-height:1.16}.brand-name{font-family:var(--font-head);font-size:1.32rem;font-weight:760}.brand-line{font-size:.92rem;font-weight:720;color:var(--muted)}.site-nav{display:flex;align-items:center;gap:16px;font-size:.94rem}.site-nav a{text-decoration:none;color:var(--muted);font-weight:650}.site-nav a[aria-current=page],.site-nav a:hover{color:var(--primary)}.lang-switch{border:1px solid var(--line);border-radius:999px;padding:7px 10px}.nav-toggle{display:none;background:var(--surface);border:1px solid var(--line);border-radius:8px;width:44px;height:44px;padding:10px}.nav-toggle span:not(.sr-only){display:block;height:2px;background:var(--text);margin:5px 0}.section{max-width:var(--maxw);margin:0 auto;padding:64px 18px}.hero{max-width:none;display:grid;grid-template-columns:minmax(18px,1fr) minmax(0,var(--maxw)) minmax(18px,1fr);gap:0;padding-top:22px}.hero>*{grid-column:2}.hero-media{grid-column:1 / -1;grid-row:1;min-height:330px}.hero-slot{height:100%;border-radius:0}.hero-panel{grid-row:1;margin:34px 0 28px;width:min(620px,100%);background:color-mix(in srgb,var(--surface) 94%,transparent);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:var(--radius);padding:30px}.hero-services{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}.page-hero{padding-top:74px;padding-bottom:38px}.page-hero p{max-width:760px}.eyebrow{display:inline-flex;align-items:center;gap:8px;color:var(--primary);font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:0}.hero-panel .eyebrow{font-size:.86rem}.eyebrow:before{content:"";width:28px;height:1px;background:var(--accent)}h1,h2,h3{font-family:var(--font-head);line-height:1.05;margin:12px 0 14px;font-weight:700;color:var(--text);letter-spacing:0}h1{font-size:2.45rem;max-width:900px}h2{font-size:2rem}h3{font-size:1.35rem}p{margin:0 0 16px}.motto{font-family:var(--font-head);font-size:1.35rem;color:var(--primary);border-left:3px solid var(--accent);padding-left:14px}blockquote{margin:20px 0;padding:18px 20px;border-left:4px solid var(--accent);background:color-mix(in srgb,var(--surface) 72%,var(--bg));font-family:var(--font-head);font-size:1.35rem}.btn-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:11px 16px;border-radius:8px;text-decoration:none;border:1px solid transparent;font-weight:750;cursor:pointer;font:inherit}.btn-primary{background:var(--primary);color:var(--primary-ink)}.btn-secondary{background:transparent;color:var(--primary);border-color:var(--primary)}.btn-ghost{background:transparent;color:var(--muted);border-color:var(--line)}.text-link{font-weight:800;color:var(--primary);text-decoration-thickness:2px;text-underline-offset:4px}.trust-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.trust-row span{display:inline-flex;border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:7px 10px;color:var(--muted);font-size:.86rem}.section-head{max-width:760px;margin-bottom:24px}.split,.service-detail,.signature-block,.contact-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:center}.reverse>*:first-child{order:2}.card-grid{display:grid;gap:16px}.card-grid.three{grid-template-columns:repeat(3,1fr)}.card-grid.two{grid-template-columns:repeat(2,1fr)}.card,.form-card,.note-block,.price-teaser,.energy-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px}.service-card a,.article-card a{color:var(--primary);font-weight:800}.image-slot{aspect-ratio:var(--ratio);background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;margin:0}.image-slot>div{height:100%;display:grid;place-content:center;text-align:center;padding:22px;background:linear-gradient(135deg,color-mix(in srgb,var(--surface) 76%,var(--leaf)),color-mix(in srgb,var(--surface) 78%,#2f87b8));color:var(--text)}.image-slot-real>div{background:linear-gradient(135deg,var(--surface),color-mix(in srgb,var(--bg) 78%,var(--accent)))}.image-slot span{font-size:.76rem;font-weight:850;text-transform:uppercase;color:var(--primary)}.image-slot strong{font-family:var(--font-head);font-size:1.28rem}.image-slot small{color:var(--muted)}.timeline,.gallery-teaser,.price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.timeline article{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:14px}.signature-block{background:linear-gradient(135deg,color-mix(in srgb,var(--primary) 94%,#0f172a),color-mix(in srgb,var(--primary) 70%,#2f87b8));max-width:none;padding:64px max(18px,calc((100vw - var(--maxw))/2));color:var(--primary-ink)}.signature-block h2,.signature-block .eyebrow,.signature-block p{color:var(--primary-ink)}.signature-block .eyebrow:before{background:var(--accent)}.signature-block .image-slot{box-shadow:none}.price-teaser{text-align:center}.faq details{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:16px 18px;margin:10px 0}.faq summary{font-weight:800;cursor:pointer}.energy-card svg{width:100%;height:auto}.svg-leaf{fill:color-mix(in srgb,var(--leaf) 75%,var(--accent));opacity:.9}.svg-stem,.svg-root{fill:none;stroke:var(--primary);stroke-width:16;stroke-linecap:round}.svg-root{stroke-width:8}.energy-card text{font:700 18px system-ui;fill:var(--text);text-anchor:middle}.gallery-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.before-after{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:14px}.before-after>div{display:grid;grid-template-columns:1fr 1fr;gap:10px}.article{max-width:860px}.article .image-slot{margin:24px 0}.form-card label{display:grid;gap:6px;margin:13px 0;font-weight:750}.form-card input,.form-card textarea{width:100%;border:1px solid var(--line);border-radius:8px;padding:12px;background:var(--bg);color:var(--text);font:inherit}.form-note{font-size:.9rem;color:var(--muted)}.legal-content{max-width:860px}.theme-buttons{display:flex;flex-wrap:wrap;gap:10px}.site-footer{background:color-mix(in srgb,var(--primary) 94%,#000);color:var(--primary-ink);padding:44px max(18px,calc((100vw - var(--maxw))/2)) 82px}.footer-grid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:28px}.site-footer a{display:block;color:var(--primary-ink);text-decoration:none;margin:7px 0}.site-footer h2{font-size:1.1rem;color:var(--primary-ink)}.footer-brand{font-family:var(--font-head);font-size:1.35rem;font-weight:800}.site-credit{border-top:1px solid color-mix(in srgb,var(--primary-ink) 20%,transparent);padding-top:18px;color:color-mix(in srgb,var(--primary-ink) 72%,transparent)}.mobile-cta{display:none}.cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:30;max-width:860px;margin:auto;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:var(--radius);padding:16px;gap:14px;align-items:center;justify-content:space-between}.cookie-banner:not([hidden]){display:flex}.cookie-banner p{margin:0}.cookie-banner div{display:flex;gap:10px}.toast{position:fixed;right:16px;bottom:16px;background:var(--primary);color:var(--primary-ink);padding:12px 14px;border-radius:8px;z-index:35;box-shadow:var(--shadow)}@media (min-width:900px){h1{font-size:3.4rem}h2{font-size:2.35rem}.page-hero{padding-top:92px}}@media (max-width:920px){.nav-toggle{display:block}.site-nav{position:fixed;inset:67px 12px auto 12px;display:none;flex-direction:column;align-items:stretch;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:16px}.site-nav.is-open{display:flex}.site-nav a{padding:10px}.hero-services,.card-grid.three,.timeline,.gallery-teaser,.price-grid,.footer-grid,.gallery-grid{grid-template-columns:1fr 1fr}.split,.service-detail,.signature-block,.contact-grid{grid-template-columns:1fr}.reverse>*:first-child{order:0}.hero-panel{margin:20px 0}.mobile-cta{position:fixed;left:0;right:0;bottom:0;z-index:25;display:grid;grid-template-columns:1fr 58px;background:var(--surface);border-top:1px solid var(--line);box-shadow:0 -10px 22px rgba(0,0,0,.08)}.mobile-cta a{min-height:58px;display:grid;place-items:center;text-decoration:none;font-weight:850}.mobile-cta a:first-child{background:var(--primary);color:var(--primary-ink)}body{padding-bottom:58px}.cookie-banner{bottom:72px;display:block}.cookie-banner:not([hidden]){display:block}.cookie-banner div{margin-top:12px}}@media (max-width:620px){.brand-line{display:none}.brand-name{font-size:1rem}.hero-media{min-height:390px}.hero-panel{padding:22px}.hero-services,.card-grid.three,.card-grid.two,.timeline,.gallery-teaser,.price-grid,.footer-grid,.gallery-grid,.before-after>div{grid-template-columns:1fr}.section{padding:50px 16px}h1{font-size:2.2rem}h2{font-size:1.75rem}.btn{width:100%}.btn-row{align-items:stretch}.trust-row span{width:100%;justify-content:center}}@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important;transition:none!important}}`;
}

function cssResponsiveFixes() {
  return `html,body{max-width:100%;overflow-x:hidden}h1,h2,h3,p,.brand-name{overflow-wrap:break-word}.hero-panel,.card,.form-card,.note-block,.price-teaser,.image-slot,.site-nav{min-width:0}.brand-logo{width:53px;height:53px;border-radius:50%;object-fit:cover;object-position:center 24%;background:var(--surface);border:1px solid var(--line);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--surface) 70%,transparent)}.footer-logo{width:min(240px,100%);height:auto;max-height:120px;object-fit:contain;margin-top:18px;padding:12px;background:#fff;border:1px solid color-mix(in srgb,var(--primary-ink) 22%,transparent);border-radius:8px;box-shadow:0 10px 28px rgba(0,0,0,.16)}.image-slot>img{width:100%;height:100%;object-fit:cover}.image-slot{position:relative}.hero-slot>img{object-position:70% center}.hero-img-mobile{display:none}.hero-slot>div{place-content:center end;text-align:right;padding-right:max(24px,10vw)}.hero-slot span,.hero-slot strong,.hero-slot small{max-width:280px}.gallery-real-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.gallery-photo{display:block;aspect-ratio:4/3;overflow:hidden;border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow)}.gallery-photo img{width:100%;height:100%;object-fit:cover;transition:transform .45s ease}.gallery-photo:hover img{transform:scale(1.04)}.article-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.article-card .image-slot{margin-bottom:16px}.comparison-grid,.process-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:24px 0}.process-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.comparison-grid>div,.process-grid>div,.science-card,.source-list,.article-nav{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:18px}.science-card{margin:24px 0}.source-list{margin:28px 0;color:var(--muted)}.source-list h2{color:var(--text);font-size:1.35rem}.source-list ul{margin:10px 0 0;padding-left:20px}.source-list a{color:var(--primary);font-weight:800}.article-nav{display:flex;flex-wrap:wrap;gap:10px;margin:28px 0}.article-nav a{border:1px solid var(--line);border-radius:999px;padding:8px 10px;text-decoration:none;color:var(--primary);font-weight:800}.stress-chain{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;align-items:center;text-align:center}.stress-chain span,.stress-chain strong{border:1px solid var(--line);border-radius:8px;padding:10px;background:color-mix(in srgb,var(--surface) 70%,var(--bg))}.stress-chain strong{background:var(--primary);color:var(--primary-ink)}.cookie-banner .btn{white-space:nowrap;min-width:110px}@media (max-width:1100px){.gallery-real-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media (max-width:920px){.article-grid,.gallery-real-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.comparison-grid,.process-grid,.stress-chain{grid-template-columns:1fr}}@media (max-width:620px){.site-header{width:100%;min-height:84px;padding:10px 76px 10px 16px;gap:12px}.nav-toggle{display:block;position:fixed;right:16px;top:20px;width:44px;height:44px;z-index:40;background:var(--primary);border-color:var(--primary);box-shadow:var(--shadow)}.nav-toggle span:not(.sr-only){background:var(--primary-ink)}.brand{flex:1 1 auto;max-width:none;min-width:0;gap:12px}.brand-logo{flex:0 0 53px}.brand-text{min-width:0;max-width:calc(100vw - 158px);line-height:1.16}.brand-name{display:block;font-size:1.05rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.brand-line{display:block;font-size:.78rem;font-weight:720;line-height:1.18;white-space:normal;overflow-wrap:anywhere;color:color-mix(in srgb,var(--muted) 88%,var(--text))}.hero{display:block;padding:32px 16px 50px}.hero>*{grid-column:auto}.hero-media{display:block;min-height:180px;margin:0 0 14px}.hero-slot{border-radius:var(--radius)}.hero-slot>img{object-position:78% center}.hero-img-desktop{display:none}.hero-img-mobile{display:block}.hero-panel{width:100%;max-width:none;margin:0;padding:22px;overflow:hidden}.hero-panel h1{font-size:1.85rem;line-height:1.08}.hero-panel .motto{font-size:1.15rem}.hero-services{grid-template-columns:1fr;margin-top:14px}.hero-slot>div{place-content:center;text-align:center;padding-right:22px}.article-grid,.gallery-real-grid{grid-template-columns:1fr}.footer-logo{width:min(200px,100%);max-height:100px}.cookie-banner div{flex-direction:column}.cookie-banner .btn{width:100%;white-space:normal}}`;
}

function cssWowPass() {
  return `.hero{position:relative;display:grid;grid-template-columns:minmax(18px,1fr) minmax(0,var(--maxw)) minmax(18px,1fr);height:min(760px,calc(100svh - 112px));min-height:620px;padding:0;align-items:end;overflow:hidden;background:#0f1d14}.hero>*{grid-column:2}.hero-media{position:absolute;inset:0;grid-column:1 / -1;grid-row:1;height:100%;min-height:0}.hero-media:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,18,13,.66) 0%,rgba(9,18,13,.38) 34%,rgba(9,18,13,.05) 68%,rgba(9,18,13,.16) 100%),linear-gradient(0deg,rgba(9,18,13,.42),rgba(9,18,13,0) 42%)}.hero-slot{height:100%;border-radius:0;border:0;box-shadow:none}.hero-slot>img{object-position:48% center}.hero-panel{grid-column:2;grid-row:1;align-self:end;width:min(1040px,100%);margin:0 0 48px;padding:0;background:transparent;border:0;box-shadow:none;color:#fff;text-shadow:0 2px 24px rgba(0,0,0,.48)}.hero-panel h1{font-size:3.45rem;line-height:1.02;max-width:1040px;color:#fff}.hero-panel h1 span{font-size:.96em}.hero-panel p,.hero-panel .motto,.hero-panel .eyebrow{color:#fff}.hero-panel .motto{max-width:620px;border-left-color:var(--accent)}.hero-panel>p:not(.motto){max-width:660px}.hero-panel .eyebrow:before{background:var(--accent)}.hero .btn-primary{box-shadow:0 18px 42px rgba(0,0,0,.28)}.hero .btn-secondary{color:#fff;border-color:rgba(255,255,255,.82);background:rgba(255,255,255,.08);backdrop-filter:blur(12px)}.hero .trust-row span{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.28);color:#fff}.rescue-section{padding-top:70px}.before-after-slider{position:relative;max-width:1040px;margin:0 auto;color:#fff}.before-after-stage{position:relative;aspect-ratio:4/3;overflow:hidden;border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow);border:1px solid var(--line)}.before-after-stage img{width:100%;height:100%;object-fit:cover}.before-layer{position:absolute;inset:0;clip-path:inset(0 calc(100% - var(--split)) 0 0)}.before-layer img{position:absolute;inset:0}.before-after-stage:after{content:"";position:absolute;top:0;bottom:0;left:var(--split);width:2px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.18),0 0 26px rgba(0,0,0,.28)}.before-after-range{width:100%;margin:14px 0 0;accent-color:var(--primary);cursor:ew-resize}.slider-badge{position:absolute;top:14px;z-index:2;border:1px solid rgba(255,255,255,.42);border-radius:999px;background:rgba(9,18,13,.58);backdrop-filter:blur(10px);padding:7px 10px;font-size:.78rem;font-weight:850}.slider-badge-before{left:14px}.slider-badge-after{right:14px}.before-after-slider body.presentation-clean @media (max-width:920px){.hero{height:min(740px,calc(100svh - 104px));min-height:650px}.hero-panel{margin-bottom:34px}.hero-panel h1{font-size:3.35rem}.before-after-stage{aspect-ratio:3/4}.timeline article .image-slot{aspect-ratio:3/2}}@media (max-width:620px){.hero{display:grid;grid-template-columns:1fr;height:auto;min-height:calc(100svh - 118px);padding:0 16px 34px}.hero>*{grid-column:1}.hero-media{display:block;position:absolute;inset:0;margin:0;min-height:0;height:100%}.hero-slot{border-radius:0}.hero-slot>img{object-position:43% center}.hero-panel{grid-column:1;grid-row:1;align-self:end;width:100%;max-width:none;margin:0;padding:0 4px 8px;overflow:visible}.hero-panel h1{font-size:2.45rem;line-height:1}.hero-panel .motto{font-size:1.1rem}.hero-panel .eyebrow{font-size:.66rem}.hero-panel .btn{width:100%}.hero .trust-row span{width:auto;justify-content:flex-start}.before-after-slider .slider-badge{top:10px;font-size:.68rem}.slider-badge-before{left:10px}.slider-badge-after{right:10px}}`;
}

function heroCopyResponsiveFixCss() {
  return `@media (max-width:620px){.hero{padding-left:20px;padding-right:20px}.hero-slot>img,.hero-slot>picture>img{object-position:center center}.hero-panel{width:min(100%,calc(100vw - 40px));max-width:calc(100vw - 40px)}.hero-panel h1{font-size:clamp(1.9rem,8.8vw,2.24rem);line-height:1.02;max-width:12.5ch;overflow-wrap:normal}.hero-panel .motto{max-width:24ch;font-size:1.04rem;overflow-wrap:anywhere}.hero-panel>p:not(.motto){max-width:33ch;font-size:.95rem;line-height:1.55;overflow-wrap:anywhere}.hero-panel .eyebrow{display:flex;flex-wrap:wrap;max-width:34ch;font-size:.6rem;line-height:1.35;gap:7px;overflow-wrap:anywhere}.hero-panel .eyebrow:before{flex:0 0 22px;width:22px}}`;
}

function heroVariantCss() {
  return `.hero{--hero-desktop-pos:48% center;--hero-mobile-pos:center center;--hero-filter:none;--hero-scale:1;--hero-origin:center center;--hero-mobile-scale:1;--hero-mobile-origin:center center;--hero-overlay-left:rgba(9,18,13,.66);--hero-overlay-mid:rgba(9,18,13,.38);--hero-overlay-right:rgba(9,18,13,.05);--hero-overlay-edge:rgba(9,18,13,.16);--hero-overlay-bottom:rgba(9,18,13,.42)}.hero-media:after{background:linear-gradient(90deg,var(--hero-overlay-left) 0%,var(--hero-overlay-mid) 34%,var(--hero-overlay-right) 68%,var(--hero-overlay-edge) 100%),linear-gradient(0deg,var(--hero-overlay-bottom),rgba(9,18,13,0) 42%)}.hero-slot{width:100%}.hero-slot>img{filter:var(--hero-filter);object-position:var(--hero-desktop-pos);transform:scale(var(--hero-scale));transform-origin:var(--hero-origin)}.hero-copy-mobile{display:none}.hero-accent{color:#ffe6a8;text-shadow:0 2px 20px rgba(0,0,0,.38)}.hero-variant-switcher{position:absolute;top:18px;right:max(18px,calc((100vw - var(--maxw))/2));z-index:4;display:flex;align-items:center;gap:7px;padding:7px 8px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(9,18,13,.34);color:#fff;box-shadow:0 14px 34px rgba(0,0,0,.22);backdrop-filter:blur(12px)}.hero-variant-switcher span{font-size:.68rem;font-weight:850;letter-spacing:0;text-transform:uppercase;color:rgba(255,255,255,.84)}.hero-variant-option{display:grid;place-items:center;width:32px;height:32px;border:1px solid rgba(255,255,255,.32);border-radius:999px;background:rgba(255,255,255,.10);color:#fff;font:850 .82rem/1 var(--font-body);cursor:pointer}.hero-variant-option:hover,.hero-variant-option:focus-visible,.hero-variant-option.is-active{background:linear-gradient(135deg,#ffe6a8,#c99c45);border-color:rgba(255,230,168,.95);color:#132218;text-shadow:none}.hero[data-hero-variant="1"]{--hero-desktop-pos:48% center;--hero-mobile-pos:center center}.hero[data-hero-variant="2"]{--hero-desktop-pos:47% center;--hero-mobile-pos:56% center;--hero-mobile-scale:1.10;--hero-mobile-origin:58% center;--hero-filter:saturate(1.22) contrast(1.09) brightness(1.04);--hero-overlay-left:rgba(8,17,11,.48);--hero-overlay-mid:rgba(8,17,11,.18);--hero-overlay-right:rgba(8,17,11,.02);--hero-overlay-edge:rgba(8,17,11,.08);--hero-overlay-bottom:rgba(8,17,11,.34)}.hero[data-hero-variant="3"]{--hero-desktop-pos:50% center;--hero-mobile-pos:52% center;--hero-mobile-scale:1.04;--hero-mobile-origin:52% center;--hero-filter:saturate(1.18) contrast(1.08) brightness(1.03);--hero-overlay-left:rgba(8,17,11,.52);--hero-overlay-mid:rgba(8,17,11,.20);--hero-overlay-right:rgba(8,17,11,.03);--hero-overlay-edge:rgba(8,17,11,.10);--hero-overlay-bottom:rgba(8,17,11,.36)}.hero[data-hero-variant="4"]{--hero-desktop-pos:46% center;--hero-mobile-pos:40% center;--hero-mobile-scale:1.24;--hero-mobile-origin:38% 54%;--hero-filter:saturate(1.20) contrast(1.08) brightness(1.04);--hero-overlay-left:rgba(8,17,11,.54);--hero-overlay-mid:rgba(8,17,11,.22);--hero-overlay-right:rgba(8,17,11,.03);--hero-overlay-edge:rgba(8,17,11,.10);--hero-overlay-bottom:rgba(8,17,11,.36)}.hero[data-hero-variant="5"]{--hero-desktop-pos:54% center;--hero-mobile-pos:54% center;--hero-mobile-scale:1.22;--hero-mobile-origin:55% 38%;--hero-filter:saturate(1.16) contrast(1.08) brightness(1.04);--hero-overlay-left:rgba(8,17,11,.56);--hero-overlay-mid:rgba(8,17,11,.24);--hero-overlay-right:rgba(8,17,11,.04);--hero-overlay-edge:rgba(8,17,11,.12);--hero-overlay-bottom:rgba(8,17,11,.38)}@media (max-width:620px){.hero{display:grid;grid-template-columns:1fr;min-height:calc(100svh - 69px);padding:0;overflow:hidden}.hero>*{grid-column:1}.hero-media{position:absolute;inset:0;display:block;height:100%;min-height:0;margin:0}.hero-media:after{background:linear-gradient(0deg,rgba(7,16,10,.70) 0%,rgba(7,16,10,.46) 42%,rgba(7,16,10,.10) 100%),linear-gradient(90deg,rgba(7,16,10,.36) 0%,rgba(7,16,10,.10) 54%,rgba(7,16,10,.02) 100%)}.hero-slot{height:100%;border-radius:0}.hero-slot>img{object-position:var(--hero-mobile-pos);transform:scale(var(--hero-mobile-scale));transform-origin:var(--hero-mobile-origin)}.hero-panel{grid-column:1;grid-row:1;align-self:end;width:100%;max-width:100%;margin:0;padding:0 20px calc(88px + env(safe-area-inset-bottom));overflow:visible}.hero-panel h1{max-width:12.8ch;font-size:clamp(1.76rem,7.6vw,2.06rem);line-height:1.02;margin-bottom:10px;overflow-wrap:normal}.hero-panel .motto{max-width:23ch;font-size:.98rem;line-height:1.34;margin-bottom:12px;padding-left:10px}.hero-copy-desktop{display:none}.hero-copy-mobile{display:block;max-width:30ch;font-size:.9rem;line-height:1.44;margin-bottom:0;overflow-wrap:normal}.hero-panel .eyebrow{display:flex;flex-wrap:wrap;max-width:30ch;font-size:.52rem;line-height:1.35;gap:6px;margin-bottom:8px}.hero-panel .eyebrow:before{flex:0 0 20px;width:20px}.hero-panel .btn-row{margin-top:14px}.hero .trust-row{margin-top:10px}.hero .trust-row span:not(.experience-pill){display:none}.hero .trust-row .experience-pill{width:auto;justify-content:flex-start}.hero-variant-switcher{top:12px;right:12px;gap:5px;padding:5px 6px}.hero-variant-switcher span{display:none}.hero-variant-option{width:30px;height:30px;font-size:.78rem}.hero[data-hero-variant="2"] .hero-media:after{background:linear-gradient(0deg,rgba(7,16,10,.60) 0%,rgba(7,16,10,.34) 42%,rgba(7,16,10,.04) 100%),linear-gradient(90deg,rgba(7,16,10,.30) 0%,rgba(7,16,10,.08) 54%,rgba(7,16,10,0) 100%)}.hero[data-hero-variant="3"] .hero-media:after,.hero[data-hero-variant="4"] .hero-media:after,.hero[data-hero-variant="5"] .hero-media:after{background:linear-gradient(0deg,rgba(7,16,10,.64) 0%,rgba(7,16,10,.36) 42%,rgba(7,16,10,.06) 100%),linear-gradient(90deg,rgba(7,16,10,.34) 0%,rgba(7,16,10,.08) 54%,rgba(7,16,10,0) 100%)}}`;
}

function heroVividVariantCss() {
  return `.hero-variant-switcher{position:absolute;top:18px;right:max(18px,calc((100vw - var(--maxw))/2));z-index:6;display:block;padding:0;border:0;border-radius:0;background:transparent;color:#fff;box-shadow:none;backdrop-filter:none}.hero-variant-toggle{display:inline-flex;align-items:center;gap:8px;min-height:38px;padding:7px 9px 7px 12px;border:1px solid rgba(255,255,255,.34);border-radius:999px;background:rgba(8,22,13,.40);color:#fff;box-shadow:0 14px 34px rgba(0,0,0,.22);backdrop-filter:blur(14px);font:850 .76rem/1 var(--font-body);cursor:pointer}.hero-variant-toggle span{font-size:.68rem;font-weight:850;letter-spacing:0;text-transform:uppercase;color:rgba(255,255,255,.84)}.hero-variant-toggle strong{display:grid;place-items:center;width:26px;height:26px;border-radius:999px;background:linear-gradient(135deg,#ffe6a8,#c99c45);color:#132218;text-shadow:none}.hero-variant-options{position:absolute;top:46px;right:0;display:grid;grid-template-columns:repeat(4,32px);gap:7px;padding:8px;border:1px solid rgba(255,255,255,.30);border-radius:16px;background:rgba(8,22,13,.48);box-shadow:0 18px 44px rgba(0,0,0,.28);backdrop-filter:blur(16px)}.hero-variant-options[hidden]{display:none}.hero-variant-option{display:grid;place-items:center;width:32px;height:32px;border:1px solid rgba(255,255,255,.32);border-radius:999px;background:rgba(255,255,255,.10);color:#fff;font:850 .82rem/1 var(--font-body);cursor:pointer}.hero-variant-option:hover,.hero-variant-option:focus-visible,.hero-variant-option.is-active{background:linear-gradient(135deg,#e7ffb7,#72c346);border-color:rgba(231,255,183,.94);color:#102214;text-shadow:none}.hero[data-hero-variant="6"]{--hero-desktop-pos:48% center;--hero-mobile-pos:50% 42%;--hero-mobile-scale:1.04;--hero-mobile-origin:50% 42%;--hero-filter:saturate(1.34) contrast(1.12) brightness(1.07);--hero-overlay-left:rgba(8,17,11,.46);--hero-overlay-mid:rgba(8,17,11,.12);--hero-overlay-right:rgba(8,17,11,.01);--hero-overlay-edge:rgba(8,17,11,.06);--hero-overlay-bottom:rgba(8,17,11,.22)}.hero[data-hero-variant="7"]{--hero-desktop-pos:51% center;--hero-mobile-pos:50% center;--hero-mobile-scale:1.02;--hero-mobile-origin:50% center;--hero-filter:saturate(1.28) contrast(1.11) brightness(1.07);--hero-overlay-left:rgba(8,17,11,.44);--hero-overlay-mid:rgba(8,17,11,.12);--hero-overlay-right:rgba(8,17,11,.01);--hero-overlay-edge:rgba(8,17,11,.05);--hero-overlay-bottom:rgba(8,17,11,.20)}.hero[data-hero-variant="8"]{--hero-desktop-pos:52% 42%;--hero-mobile-pos:50% 45%;--hero-mobile-scale:1.03;--hero-mobile-origin:50% 45%;--hero-filter:saturate(1.38) contrast(1.13) brightness(1.08);--hero-overlay-left:rgba(8,17,11,.42);--hero-overlay-mid:rgba(8,17,11,.10);--hero-overlay-right:rgba(8,17,11,.01);--hero-overlay-edge:rgba(8,17,11,.05);--hero-overlay-bottom:rgba(8,17,11,.18)}@media (max-width:620px){.hero-variant-switcher{top:12px;right:12px}.hero-variant-toggle{min-width:48px;min-height:38px;justify-content:center;padding:6px 8px;background:rgba(8,24,14,.36)}.hero-variant-toggle span{display:none}.hero-variant-toggle strong{width:28px;height:28px}.hero-variant-options{top:44px;right:0;grid-template-columns:repeat(4,31px);gap:6px;max-width:calc(100vw - 24px);padding:7px}.hero-variant-option{width:31px;height:31px}.hero[data-hero-variant="6"] .hero-media:after,.hero[data-hero-variant="7"] .hero-media:after,.hero[data-hero-variant="8"] .hero-media:after{background:radial-gradient(ellipse 74% 46% at 24% 78%,rgba(5,18,10,.48) 0%,rgba(5,18,10,.28) 42%,rgba(5,18,10,0) 74%),linear-gradient(0deg,rgba(5,15,9,.16) 0%,rgba(5,15,9,0) 46%)}.hero[data-hero-variant="6"] .hero-panel,.hero[data-hero-variant="7"] .hero-panel,.hero[data-hero-variant="8"] .hero-panel{text-shadow:0 2px 18px rgba(0,0,0,.58),0 0 2px rgba(0,0,0,.64)}.hero[data-hero-variant="6"] .hero-panel:before,.hero[data-hero-variant="7"] .hero-panel:before,.hero[data-hero-variant="8"] .hero-panel:before{content:"";position:absolute;left:10px;right:10px;top:-12px;bottom:calc(72px + env(safe-area-inset-bottom));z-index:0;border:1px solid rgba(255,255,255,.16);border-radius:18px;background:linear-gradient(135deg,rgba(5,22,12,.44),rgba(6,34,18,.24) 58%,rgba(255,255,255,.08));box-shadow:0 20px 60px rgba(0,0,0,.22);backdrop-filter:blur(7px);pointer-events:none}.hero[data-hero-variant="6"] .hero-panel>*,
.hero[data-hero-variant="7"] .hero-panel>*,
.hero[data-hero-variant="8"] .hero-panel>*{position:relative;z-index:1}.hero[data-hero-variant="6"] .hero-panel .eyebrow,.hero[data-hero-variant="7"] .hero-panel .eyebrow,.hero[data-hero-variant="8"] .hero-panel .eyebrow,.hero[data-hero-variant="6"] .hero-panel .motto,.hero[data-hero-variant="7"] .hero-panel .motto,.hero[data-hero-variant="8"] .hero-panel .motto,.hero[data-hero-variant="6"] .hero-copy-mobile,.hero[data-hero-variant="7"] .hero-copy-mobile,.hero[data-hero-variant="8"] .hero-copy-mobile{width:max-content;max-width:min(100%,30ch);padding:6px 9px;border:1px solid rgba(255,255,255,.13);border-radius:10px;background:rgba(5,24,12,.28);backdrop-filter:blur(5px)}.hero[data-hero-variant="6"] .hero-panel .motto,.hero[data-hero-variant="7"] .hero-panel .motto,.hero[data-hero-variant="8"] .hero-panel .motto{border-left:3px solid #d7ff8a}.hero[data-hero-variant="6"] .hero .btn-primary,.hero[data-hero-variant="7"] .hero .btn-primary,.hero[data-hero-variant="8"] .hero .btn-primary{box-shadow:none}.hero[data-hero-variant="6"] .btn-primary,.hero[data-hero-variant="7"] .btn-primary,.hero[data-hero-variant="8"] .btn-primary{background:linear-gradient(135deg,#1f6b30,#8fdc50);color:#fff;box-shadow:0 16px 34px rgba(0,0,0,.30),0 0 26px rgba(142,220,80,.22)}.hero[data-hero-variant="6"] .btn-secondary,.hero[data-hero-variant="7"] .btn-secondary,.hero[data-hero-variant="8"] .btn-secondary{background:rgba(6,30,15,.40);border-color:rgba(255,255,255,.72);color:#fff;box-shadow:0 12px 28px rgba(0,0,0,.22);backdrop-filter:blur(12px)}}`;
}

function heroVividReadabilityCss() {
  return `@media (max-width:620px){.hero[data-hero-variant="6"] .hero-panel:before,.hero[data-hero-variant="7"] .hero-panel:before,.hero[data-hero-variant="8"] .hero-panel:before{content:none}.hero[data-hero-variant="6"] .hero-panel,.hero[data-hero-variant="7"] .hero-panel,.hero[data-hero-variant="8"] .hero-panel{display:grid;grid-template-columns:minmax(0,1fr);justify-items:center;padding-left:clamp(16px,5vw,22px);padding-right:clamp(16px,5vw,22px);text-align:left}.hero[data-hero-variant="6"] .hero-panel .eyebrow,.hero[data-hero-variant="7"] .hero-panel .eyebrow,.hero[data-hero-variant="8"] .hero-panel .eyebrow{justify-self:center;max-width:min(100%,31ch)}.hero[data-hero-variant="6"] .hero-panel h1,.hero[data-hero-variant="7"] .hero-panel h1,.hero[data-hero-variant="8"] .hero-panel h1{justify-self:center;width:min(100%,15.4ch);max-width:calc(100vw - 42px);font-size:clamp(1.66rem,6.95vw,1.94rem);line-height:1.045;margin:10px auto 12px;padding:10px 14px 12px;border:1px solid rgba(255,255,255,.14);border-radius:15px;background:linear-gradient(135deg,rgba(5,22,12,.36),rgba(5,22,12,.13));box-shadow:0 14px 34px rgba(0,0,0,.20);backdrop-filter:blur(3px);overflow-wrap:normal}.hero[data-hero-variant="6"] .hero-accent,.hero[data-hero-variant="7"] .hero-accent,.hero[data-hero-variant="8"] .hero-accent{color:#ffe58a;text-shadow:0 2px 20px rgba(0,0,0,.44),0 0 18px rgba(255,229,138,.26)}.hero[data-hero-variant="6"] .hero-panel .motto,.hero[data-hero-variant="7"] .hero-panel .motto,.hero[data-hero-variant="8"] .hero-panel .motto,.hero[data-hero-variant="6"] .hero-copy-mobile,.hero[data-hero-variant="7"] .hero-copy-mobile,.hero[data-hero-variant="8"] .hero-copy-mobile{justify-self:center;width:min(100%,33ch);max-width:calc(100vw - 42px)}.hero[data-hero-variant="6"] .hero-panel .eyebrow,.hero[data-hero-variant="7"] .hero-panel .eyebrow,.hero[data-hero-variant="8"] .hero-panel .eyebrow,.hero[data-hero-variant="6"] .hero-panel .motto,.hero[data-hero-variant="7"] .hero-panel .motto,.hero[data-hero-variant="8"] .hero-panel .motto,.hero[data-hero-variant="6"] .hero-copy-mobile,.hero[data-hero-variant="7"] .hero-copy-mobile,.hero[data-hero-variant="8"] .hero-copy-mobile{background:linear-gradient(135deg,rgba(5,24,12,.42),rgba(5,24,12,.20));box-shadow:0 10px 26px rgba(0,0,0,.18);backdrop-filter:blur(3px)}.hero[data-hero-variant="6"] .hero-panel .btn-row,.hero[data-hero-variant="7"] .hero-panel .btn-row,.hero[data-hero-variant="8"] .hero-panel .btn-row,.hero[data-hero-variant="6"] .hero-panel .trust-row,.hero[data-hero-variant="7"] .hero-panel .trust-row,.hero[data-hero-variant="8"] .hero-panel .trust-row{justify-self:center;width:min(100%,35ch);max-width:calc(100vw - 42px)}.hero[data-hero-variant="6"] .hero-panel .btn-primary,.hero[data-hero-variant="7"] .hero-panel .btn-primary,.hero[data-hero-variant="8"] .hero-panel .btn-primary{box-shadow:0 16px 34px rgba(0,0,0,.30),0 0 30px rgba(142,220,80,.28)}.hero[data-hero-variant="6"] .hero-panel .experience-pill,.hero[data-hero-variant="7"] .hero-panel .experience-pill,.hero[data-hero-variant="8"] .hero-panel .experience-pill{justify-self:start;box-shadow:0 14px 34px rgba(0,0,0,.24),0 0 28px rgba(255,226,142,.28)}}`;
}

function meisterCarouselResponsiveCss() {
  return `.meister-section{align-items:center}.meister-carousel{width:min(100%,680px);justify-self:center;align-self:center;background:#f8f5ee}.meister-carousel .image-carousel-slide{object-fit:contain;padding:clamp(10px,1.4vw,18px);background:#f8f5ee}@media (min-width:921px) and (max-width:1320px){.meister-section{grid-template-columns:minmax(0,1fr) minmax(360px,.76fr);gap:28px}.meister-section h2{font-size:clamp(2.15rem,3.6vw,3.05rem)}.meister-carousel{max-width:540px}.meister-carousel .image-carousel-btn{width:38px;height:38px;font-size:1.45rem}.meister-carousel .image-carousel-prev{left:10px}.meister-carousel .image-carousel-next{right:10px}}@media (min-width:1321px){.meister-carousel{max-width:640px}}@media (max-width:920px){.meister-carousel{max-width:680px;margin:0 auto}.meister-carousel .image-carousel-slide{padding:10px}}`;
}

function experienceAccentCss() {
  return `.hero .trust-row .experience-pill{position:relative;align-items:center;gap:7px;background:linear-gradient(135deg,rgba(198,155,72,.96),rgba(255,235,176,.88));border-color:rgba(255,229,156,.78);color:#142417;text-shadow:none;box-shadow:0 12px 32px rgba(0,0,0,.24),inset 0 0 0 1px rgba(255,255,255,.28),0 0 24px rgba(214,168,83,.24);animation:experienceGlow 5.4s ease-in-out infinite}.hero .trust-row .experience-pill strong{font-family:var(--font-head);font-size:1.08rem;line-height:1;color:#0d2a17}.hero .trust-row .experience-pill:after{content:"";position:absolute;inset:-2px;border-radius:999px;border:1px solid rgba(255,225,150,.42);opacity:.58;pointer-events:none}@keyframes experienceGlow{0%,100%{transform:translateY(0);box-shadow:0 12px 32px rgba(0,0,0,.24),inset 0 0 0 1px rgba(255,255,255,.28),0 0 20px rgba(214,168,83,.2)}50%{transform:translateY(-1px);box-shadow:0 16px 38px rgba(0,0,0,.3),inset 0 0 0 1px rgba(255,255,255,.34),0 0 34px rgba(238,190,95,.34)}}@media (max-width:620px){.hero .trust-row .experience-pill{padding:7px 11px}.hero .trust-row .experience-pill strong{font-size:1.02rem}}@media (prefers-reduced-motion:reduce){.hero .trust-row .experience-pill{animation:none!important;transform:none!important}}`;
}

function galleryCaseCss() {
  return `.case-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.case-card{display:block;overflow:hidden;width:100%;padding:0;border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow);color:inherit;text-align:left;text-decoration:none;cursor:pointer}.case-card:hover .case-frame img,.case-card:focus-visible .case-frame img{transform:scale(1.035)}.case-card:focus-visible{outline:3px solid var(--accent);outline-offset:4px}.case-pair,.case-detail-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;background:#102016}.case-frame{position:relative;aspect-ratio:16/10;overflow:hidden;margin:0;background-color:var(--surface);background-image:var(--case-image);background-size:cover;background-position:var(--case-position,center center)}.case-frame+.case-frame{border-left:1px solid rgba(255,255,255,.72)}.case-frame img{width:100%;height:100%;object-fit:cover;object-position:var(--case-position,center center);transition:transform .45s ease}.case-frame figcaption{position:absolute;left:10px;top:10px;border:1px solid rgba(255,255,255,.42);border-radius:999px;background:rgba(9,18,13,.62);color:#fff;padding:6px 9px;font-size:.74rem;font-weight:850;line-height:1;backdrop-filter:blur(10px)}.case-copy{display:grid;gap:8px;padding:17px 18px 19px}.case-copy strong{font-family:var(--font-head);font-size:1.28rem;line-height:1.12;color:var(--text)}.case-copy span{color:var(--muted);line-height:1.5}.case-copy em{font-style:normal;font-weight:850;color:var(--primary);text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:4px}.gallery-archive{margin-top:24px;border:1px solid var(--line);border-radius:var(--radius);background:color-mix(in srgb,var(--surface) 76%,var(--bg));box-shadow:var(--shadow);padding:14px}.gallery-archive summary{cursor:pointer;font-weight:850;color:var(--primary)}.gallery-archive .gallery-real-grid{margin-top:14px}.case-modal[hidden],.case-detail[hidden]{display:none!important}body.case-modal-open{overflow:hidden}.case-modal{position:fixed;inset:0;z-index:90;display:grid;place-items:center;padding:18px}.case-modal-backdrop{position:absolute;inset:0;border:0;background:rgba(9,18,13,.66);backdrop-filter:blur(8px);cursor:pointer}.case-modal-panel{position:relative;width:min(1120px,100%);max-height:calc(100svh - 36px);overflow:auto;border:1px solid color-mix(in srgb,var(--primary) 18%,var(--line));border-radius:var(--radius);background:var(--surface);box-shadow:0 28px 90px rgba(0,0,0,.34);padding:18px}.case-modal-close{position:sticky;top:0;z-index:3;display:grid;place-items:center;width:42px;height:42px;margin-left:auto;margin-bottom:10px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--surface) 90%,transparent);color:var(--primary);font:800 1.6rem/1 var(--font-body);cursor:pointer;backdrop-filter:blur(10px)}.case-detail{display:grid;grid-template-columns:minmax(0,1.18fr) minmax(320px,.82fr);gap:24px;align-items:start}.case-detail-media{display:grid;gap:18px;min-width:0}.case-detail-pair{gap:10px;background:transparent}.case-detail-pair .case-frame{border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}.case-detail-pair .case-frame+.case-frame{border-left:1px solid var(--line)}.case-series{display:grid;gap:14px;border-top:1px solid var(--line);padding-top:16px}.case-series>h3,.case-series-group h3{font-size:1.05rem;margin:0;color:var(--primary)}.case-series-group{display:grid;gap:10px}.case-series-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.case-series-grid .case-frame{aspect-ratio:4/3;border:1px solid var(--line);border-radius:8px}.case-series-grid .case-frame+.case-frame{border-left:1px solid var(--line)}.case-detail-copy{padding:4px 4px 12px}.case-detail-copy h2{font-size:clamp(1.8rem,3vw,2.55rem)}.case-notes{display:grid;gap:12px;margin:22px 0 0}.case-notes div{border-top:1px solid var(--line);padding-top:12px}.case-notes dt{font-weight:900;color:var(--primary)}.case-notes dd{margin:4px 0 0;color:var(--muted)}@media (max-width:920px){.case-grid{grid-template-columns:1fr}.case-detail{grid-template-columns:1fr}.case-modal-panel{padding:14px}.case-detail-copy h2{font-size:2rem}.case-series-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width:620px){.case-grid{gap:14px}.case-copy{padding:15px}.case-copy strong{font-size:1.14rem}.case-pair,.case-detail-pair{gap:0}.case-detail-pair{gap:8px}.case-frame{aspect-ratio:4/3}.case-pair .case-frame{aspect-ratio:1/1}.case-frame figcaption{left:7px;top:7px;font-size:.66rem;padding:5px 7px}.case-modal{padding:10px}.case-modal-panel{max-height:calc(100svh - 20px);border-radius:10px}.case-modal-close{width:40px;height:40px;margin-bottom:8px}.case-detail-copy h2{font-size:1.72rem}.case-notes{gap:10px}.case-series-grid{grid-template-columns:1fr}}`;
}

function contactPersonCss() {
  return `.contact-side{display:grid;gap:18px;align-self:start}.contact-person{margin:0}.contact-person.form-card{padding:0;overflow:hidden}.contact-person img{width:100%;height:clamp(310px,32vw,430px);object-fit:cover;object-position:center center}.contact-person figcaption{display:grid;gap:4px;padding:16px 18px 18px}.contact-person strong{font-family:var(--font-head);font-size:1.25rem;line-height:1.15;color:var(--text)}.contact-person span{color:var(--muted);font-size:.95rem;line-height:1.45}@media (max-width:620px){.contact-person img{height:310px}}`;
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

  $$('[data-image-carousel]').forEach((carousel) => {
    const slides = $$('[data-carousel-track] > img', carousel);
    const dots = $$('[data-carousel-dot]', carousel);
    const prev = $('[data-carousel-prev]', carousel);
    const next = $('[data-carousel-next]', carousel);
    if (slides.length < 2) return;
    let index = 0;
    let timer = 0;
    let startX = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const go = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      carousel.style.setProperty('--carousel-index', String(index));
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === index);
        dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
      });
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = 0;
    };
    const play = () => {
      if (reducedMotion || timer) return;
      timer = window.setInterval(() => go(index + 1), 5200);
    };
    prev?.addEventListener('click', () => { stop(); go(index - 1); play(); });
    next?.addEventListener('click', () => { stop(); go(index + 1); play(); });
    dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => { stop(); go(dotIndex); play(); }));
    carousel.addEventListener('pointerdown', (event) => { startX = event.clientX; stop(); });
    carousel.addEventListener('pointerup', (event) => {
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 42) go(index + (delta < 0 ? 1 : -1));
      play();
    });
    carousel.addEventListener('pointercancel', play);
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', play);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', play);
    go(0);
    play();
  });

  const caseModal = $('[data-case-modal]');
  if (caseModal) {
    const panels = $$('[data-case-panel]', caseModal);
    const closeButtons = $$('[data-case-close]', caseModal);
    let lastFocused = null;
    const openCase = (id) => {
      const activePanel = panels.find((panel) => panel.dataset.casePanel === id);
      if (!activePanel) return;
      lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      panels.forEach((panel) => { panel.hidden = panel !== activePanel; });
      caseModal.hidden = false;
      caseModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('case-modal-open');
      $('[data-case-close]', caseModal)?.focus();
    };
    const closeCase = () => {
      caseModal.hidden = true;
      caseModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('case-modal-open');
      panels.forEach((panel) => { panel.hidden = true; });
      lastFocused?.focus?.();
      lastFocused = null;
    };
    $$('[data-case-open]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        openCase(button.dataset.caseOpen);
      });
    });
    closeButtons.forEach((button) => button.addEventListener('click', closeCase));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !caseModal.hidden) closeCase();
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

  const CONSENT_KEY = 'viktor_cookie_consent';
  const LEGACY_CONSENT_KEY = 'viktor-consent';
  const consentBanner = $('[data-consent-banner]');
  const readConsent = () => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.version === 1 && (parsed.status === 'accepted' || parsed.status === 'rejected')) return parsed;
      }
      const legacy = window.localStorage.getItem(LEGACY_CONSENT_KEY);
      if (legacy === 'granted' || legacy === 'denied') {
        const migrated = {
          status: legacy === 'granted' ? 'accepted' : 'rejected',
          version: 1,
          timestamp: new Date().toISOString()
        };
        window.localStorage.setItem(CONSENT_KEY, JSON.stringify(migrated));
        window.localStorage.removeItem(LEGACY_CONSENT_KEY);
        return migrated;
      }
    } catch (error) {
      return null;
    }
    return null;
  };
  const writeConsent = (status) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ status, version: 1, timestamp: new Date().toISOString() }));
    } catch (error) {
      // If storage is blocked, keep the privacy-safe default and still close the banner for this page view.
    }
  };
  const setConsentBannerVisible = (visible) => {
    if (!consentBanner) return;
    consentBanner.hidden = !visible;
    consentBanner.setAttribute('aria-hidden', String(!visible));
  };
  const storedConsent = readConsent();
  if (storedConsent?.status === 'accepted') enableTags();
  setConsentBannerVisible(!storedConsent);
  const applyConsentChoice = (status) => {
    writeConsent(status);
    setConsentBannerVisible(false);
    if (status === 'accepted') enableTags();
  };
  const bindConsentChoice = (selector, status) => {
    const button = $(selector);
    if (!button) return;
    const handler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      applyConsentChoice(status);
    };
    button.addEventListener('click', handler);
    button.addEventListener('pointerup', handler);
    button.addEventListener('touchend', handler, { passive: false });
  };
  bindConsentChoice('[data-consent-accept]', 'accepted');
  bindConsentChoice('[data-consent-deny]', 'rejected');

  const toast = $('[data-toast]');
  const currentLang = document.documentElement.lang || 'de-CH';
  const formMessages = currentLang.startsWith('uk')
    ? {
        loading: 'Надсилається...',
        success: 'Дякуємо - я звʼяжуся з вами якнайшвидше.',
        error: 'Запит зараз не вдалося надіслати. Будь ласка, скористайтеся WhatsApp або спробуйте пізніше.'
      }
    : currentLang.startsWith('en')
      ? {
          loading: 'Sending...',
          success: 'Thank you - I will get back to you as soon as possible.',
          error: 'The request could not be sent right now. Please use WhatsApp or try again later.'
        }
      : {
          loading: 'Wird gesendet...',
          success: 'Danke - ich melde mich schnellstmöglich.',
          error: 'Die Anfrage konnte gerade nicht gesendet werden. Bitte nutzen Sie WhatsApp oder versuchen Sie es später erneut.'
        };
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

  $$('form[data-contact-form]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const submit = form.querySelector('button[type="submit"]');
      const originalText = submit?.textContent || '';
      const fields = new FormData(form);
      const payload = Object.fromEntries(fields.entries());
      payload.sourceUrl = location.href;
      payload.language = currentLang;
      payload.kind = form.dataset.contactKind || 'contact';
      track(form.dataset.event || 'contact_form_submit', { path: location.pathname, kind: payload.kind });
      if (submit) {
        submit.disabled = true;
        submit.textContent = formMessages.loading;
      }
      try {
        const response = await fetch(form.getAttribute('action') || '/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) throw new Error(result.error || 'contact_failed');
        form.reset();
        showToast(formMessages.success);
      } catch (error) {
        showToast(formMessages.error);
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.textContent = originalText;
        }
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

  const HERO_VARIANT_KEY = 'viktor_hero_variant';
  const hero = $('[data-hero-root]');
  const heroSwitcher = hero ? $('[data-hero-switcher]', hero) : null;
  if (hero && heroSwitcher) {
    const desktopImage = $('[data-hero-desktop-image]', hero);
    const mobileImage = $('[data-hero-mobile-image]', hero);
    const toggle = $('[data-hero-switcher-toggle]', heroSwitcher);
    const options = $('[data-hero-variant-options]', heroSwitcher);
    const activeLabel = $('[data-hero-active-label]', heroSwitcher);
    const buttons = $$('[data-hero-variant-option]', heroSwitcher);
    const validVariants = new Set(buttons.map((button) => button.dataset.heroVariantOption));
    const setSwitcherOpen = (open) => {
      heroSwitcher.classList.toggle('is-open', open);
      toggle?.setAttribute('aria-expanded', String(open));
      if (options) options.hidden = !open;
    };
    const readStoredHeroVariant = () => {
      try {
        const stored = window.localStorage.getItem(HERO_VARIANT_KEY);
        return validVariants.has(stored) ? stored : null;
      } catch (error) {
        return null;
      }
    };
    const writeStoredHeroVariant = (variant) => {
      try {
        window.localStorage.setItem(HERO_VARIANT_KEY, variant);
      } catch (error) {
        // Storage can be disabled in private browsing; the current page still switches.
      }
    };
    const applyHeroVariant = (variant, { persist = true, announce = false } = {}) => {
      if (!validVariants.has(variant)) return;
      const activeButton = buttons.find((button) => button.dataset.heroVariantOption === variant);
      if (!activeButton) return;
      hero.dataset.heroVariant = variant;
      hero.style.setProperty('--active-hero-variant', variant);
      if (desktopImage && activeButton.dataset.heroDesktopSrc && desktopImage.getAttribute('src') !== activeButton.dataset.heroDesktopSrc) {
        desktopImage.setAttribute('src', activeButton.dataset.heroDesktopSrc);
      }
      if (mobileImage && activeButton.dataset.heroMobileSrc && mobileImage.getAttribute('src') !== activeButton.dataset.heroMobileSrc) {
        mobileImage.setAttribute('src', activeButton.dataset.heroMobileSrc);
      }
      if (activeButton.dataset.heroAlt) {
        desktopImage?.setAttribute('alt', activeButton.dataset.heroAlt);
        mobileImage?.setAttribute('alt', activeButton.dataset.heroAlt);
      }
      buttons.forEach((button) => {
        const isActive = button === activeButton;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
      if (activeLabel) activeLabel.textContent = variant;
      if (persist) writeStoredHeroVariant(variant);
      if (announce) showToast('Hero V' + variant);
    };
    const requestedHeroVariant = new URLSearchParams(window.location.search).get('hero');
    const initialHeroVariant = validVariants.has(requestedHeroVariant) ? requestedHeroVariant : readStoredHeroVariant() || hero.dataset.heroVariant || '1';
    applyHeroVariant(initialHeroVariant, { persist: validVariants.has(requestedHeroVariant), announce: false });
    setSwitcherOpen(false);
    toggle?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setSwitcherOpen(options ? options.hidden : true);
    });
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        applyHeroVariant(button.dataset.heroVariantOption, { persist: true, announce: true });
        setSwitcherOpen(false);
        toggle?.focus?.();
      });
    });
    document.addEventListener('click', (event) => {
      if (!heroSwitcher.contains(event.target)) setSwitcherOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setSwitcherOpen(false);
    });
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
  return manifestV2();
}

function manifestV2() {
  return `# Image Manifest

The public site now uses Viktor's supplied real WebP photo set for hero, services, gallery, trust, blog and garden-context imagery. Educational Baumarchitektur diagrams remain supplied graphics, not client proof. Legacy AI/concept JPG files stay in the archive but are no longer used by generated public pages.

| File / folder | Source | Used for | Status |
|---|---|---|---|
| logo.png | Existing legacy logo | Header/footer mark | PRESENT_LEGACY_LOGO |
| foto/01_hero/hero-viktor-bonsai-main.webp | Supplied real photo from IMG_1547.HEIC | Home hero desktop and social preview | PRESENT_REAL_PHOTO |
| foto/01_hero/hero-viktor-bonsai-mobile.webp | Supplied real photo from IMG_1547.HEIC | Home hero mobile source | PRESENT_REAL_PHOTO |
| foto/01_hero/hero-sad-02.webp | Supplied real photo | Previous hero, retained as alternate | PRESENT_REAL_PHOTO |
| foto/01_hero/hero-sad-01.webp | Supplied real photo | Alternate hero/social preview | PRESENT_REAL_PHOTO |
| foto/02_pryklady-robit/*.webp | Supplied real photos | Before/after direction, timeline, gallery | PRESENT_REAL_PHOTO_SET |
| foto/03_galereya/*.webp | Supplied real photos | Gallery grid | PRESENT_REAL_PHOTO_SET |
| foto/04_khvoyni/*.webp | Supplied real photos | Conifer service and articles | PRESENT_REAL_PHOTO_SET |
| foto/05_nivaki-khmarky/*.webp | Supplied real photos | Niwaki service and crown article | PRESENT_REAL_PHOTO_SET |
| foto/06_yaponski-kleny/klen-yaponskyi-01.webp | Supplied real photo, visual QA classified as pine/Niwaki, not Acer | Niwaki/cloud-form gallery | PRESENT_REAL_PHOTO_WITH_LIMITS |
| foto/06_yaponski-kleny/klen-yaponskyi-02.webp | Supplied real photo, visual QA classified as Japanese maple/Acer | Ahorn service and article imagery | PRESENT_REAL_PHOTO |
| foto/07_viktor/*.webp | Supplied real photos | Viktor/trust/topiary article | PRESENT_REAL_PHOTO_SET |
| foto/08_fonovi/*.webp | Supplied real photos | Garden context backgrounds | PRESENT_REAL_PHOTO_SET |
| foto/09_pomylky/*.webp | Supplied real photos | Pine candle/detail article | PRESENT_REAL_PHOTO_SET |
| foto/10_vidkrytka-yaponiya/vidkrytka-yaponiya-01.webp | Supplied real photo | Japan trust/soil context | PRESENT_REAL_PHOTO |
| baumarchitektur-korrektur.png | Supplied educational graphic | Home Meisterarbeit carousel | PRESENT_SUPPLIED_GRAPHIC |
| baumarchitektur-live-crown-ratio.png | Supplied educational graphic | Home Meisterarbeit carousel | PRESENT_SUPPLIED_GRAPHIC |
| _video/video-sosna-bila-01.mp4 / 02.mp4 | Supplied video files | Potential before-frame source | PRESENT_BUT_UNUSABLE_FFMPEG_MOOV_MISSING |
| assets/img/concepts/*.jpg | Legacy archive | Not used in generated public pages | ARCHIVE_NOT_PUBLIC_PROOF |
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
    "/", "/leistungen", "/philosophie", "/galerie", "/preise", "/blog", "/blog/topiarschere", "/blog/energie-krone", "/blog/niwaki-bonsai-stile", "/blog/kiefer-kerzen", "/blog/fehler-alte-nadeln-moos-pilzrisiko", "/blog/boden-wurzeln", "/blog/klimastress", "/kontakt", "/impressum", "/datenschutz", "/themes",
    "/en/", "/en/leistungen", "/en/philosophie", "/en/galerie", "/en/preise", "/en/blog", "/en/blog/topiarschere", "/en/blog/energie-krone", "/en/blog/niwaki-bonsai-stile", "/en/blog/kiefer-kerzen", "/en/blog/fehler-alte-nadeln-moos-pilzrisiko", "/en/blog/boden-wurzeln", "/en/blog/klimastress", "/en/kontakt", "/en/impressum", "/en/datenschutz", "/en/themes",
    "/uk/", "/uk/leistungen", "/uk/philosophie", "/uk/galerie", "/uk/preise", "/uk/blog", "/uk/blog/topiarschere", "/uk/blog/energie-krone", "/uk/blog/niwaki-bonsai-stile", "/uk/blog/kiefer-kerzen", "/uk/blog/fehler-alte-nadeln-moos-pilzrisiko", "/uk/blog/boden-wurzeln", "/uk/blog/klimastress", "/uk/kontakt", "/uk/impressum", "/uk/datenschutz", "/uk/themes"
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
- Public pages now use Viktor's supplied real WebP photo set under \`assets/img/foto/\`. Legacy concept files are archive-only and must not be presented as real client proof.

## Logo / wordmark assumption

The confirmed SEO/business/entity name in \`project_brief\` is **Viktor Baumarchitektur**. The supplied \`Лого.jpg\` was converted to a real PNG at \`assets/img/logo.png\`, and the visible header/footer wordmark is **Bonsai** per the latest naming instruction. Keep SEO, JSON-LD and canonical entity names as **Viktor Baumarchitektur** until Viktor changes the business name.

## Change theme

The active theme is loaded with:

\`\`\`html
<link id="theme-link" rel="stylesheet" href="assets/theme-v4.css">
\`\`\`

Switch to another design direction by replacing \`theme-v4.css\` with \`theme-v1.css\`, \`theme-v2.css\`, \`theme-v3.css\`, or \`theme-v5.css\`. Use \`themes.html\` to preview without editing files.

## Placeholders still requiring human approval

- Contact delivery uses \`/api/contact\` and needs production \`TELEGRAM_BOT_TOKEN\` plus \`TELEGRAM_CHAT_ID\`.
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
- Replace GA4 \`G-XXXXXXX\`, Google Ads \`AW-XXXXXXX\` and Search Console verification.
- Visible header/footer wordmark is **Viktor Baumarchitektur**.
- Complete \`impressum.html\` and \`datenschutz.html\` with Viktor's legal data before publication.
- Swap real images using filenames in \`assets/img/MANIFEST.md\`.
- TODO: create a final matching logo lockup for **Viktor Baumarchitektur**. The current \`assets/img/logo.png\` still reads "Viktor Bonsai", so the site crops it to the tree symbol and renders the approved text wordmark beside it.
- Synthetic planning files are visual direction only and must not be presented as real client proof.

## Blog / knowledge section

The blog now has seven DE articles plus EN/UK mirror pages:

- \`blog/topiarschere.html\` - tool choice and clean cuts.
- \`blog/energie-krone.html\` - crown energy, light and air.
- \`blog/niwaki-bonsai-stile.html\` - Niwaki, bonsai and cloud pruning style direction.
- \`blog/kiefer-kerzen.html\` - pine candles and timing.
- \`blog/fehler-alte-nadeln-moos-pilzrisiko.html\` - old needles, moss, dense crowns and fungal risk.
- \`blog/boden-wurzeln.html\` - Akadama, roots and substrate.
- \`blog/klimastress.html\` - Swiss heat/drought context for premium gardens.

## Future FR/IT localization

French and Italian are intentionally **not** full translations yet. The current generated files are noindex stubs only:

- \`fr/index.html\` - French coming-later mockup.
- \`it/index.html\` - Italian coming-later mockup.
- \`handoff/fr-it-localization-reminder.md\` - scope checklist for the later full localization.

Do not add full \`fr/*\` or \`it/*\` hreflang/sitemap coverage until the real translation, SEO adaptation, legal review and mobile QA are complete.

## Logo / wordmark assumption

The confirmed SEO/business/entity and visible name is **Viktor Baumarchitektur**. The supplied legacy logo says **Viktor Bonsai**; do not show the legacy text as the public wordmark. Keep the cropped symbol until a matching logo is approved.

## Change theme

The active theme is loaded with:

\`\`\`html
<link id="theme-link" rel="stylesheet" href="assets/theme-v4.css">
\`\`\`

Switch to another design direction by replacing \`theme-v4.css\` with \`theme-v1.css\`, \`theme-v2.css\`, \`theme-v3.css\`, or \`theme-v5.css\`. Use \`themes.html\` to preview without editing files.

## Placeholders still requiring human approval

- Contact callback production secrets: \`TELEGRAM_BOT_TOKEN\`, \`TELEGRAM_CHAT_ID\`.
- Voice Lead production secrets: \`OPENAI_API_KEY\`, \`TELEGRAM_BOT_TOKEN\`, \`TELEGRAM_CHAT_ID\`.
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
node tools/test-contact-api.mjs
node tools/qa-site-interactions.mjs
\`\`\`

\`kontakt.html\` posts callback requests to \`/api/contact\`, which validates the phone number, blocks honeypot spam and sends a Telegram summary with server-side env only. \`v2/index.html\` includes a microphone lead flow. The browser records up to 300 seconds with \`MediaRecorder\`, sends the audio to \`/api/voice-lead\`, transcribes with OpenAI audio transcription, extracts lead fields locally and sends a Telegram summary to Viktor. The serverless functions do not store lead content; they only process the request and forward the message. Required server-side variables are documented in \`.env.example\`.

No build step is required for visitors. The generator is kept as the source of truth for consistent header/footer, DE pages and EN mirrors.
`;
}

function auditScript() {
  return `import fs from "node:fs";
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
  "assets/img/logo.png","assets/img/foto/01_hero/hero-viktor-bonsai-main.webp","assets/img/foto/01_hero/hero-viktor-bonsai-mobile.webp","assets/img/foto/02_pryklady-robit/sosna-bila-17.webp","assets/img/foto/02_pryklady-robit/sosna-bila-18.webp","assets/img/foto/03_galereya/sosna-bila-01.webp","assets/img/foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp","assets/img/foto/06_yaponski-kleny/klen-yaponskyi-01.webp","assets/img/foto/07_viktor/viktor-01.webp","assets/img/foto/08_fonovi/fon-foto-01.webp","assets/img/foto/09_pomylky/pomylka-svichka-01.webp","assets/img/foto/10_vidkrytka-yaponiya/vidkrytka-yaponiya-01.webp","assets/img/MANIFEST.md","site.webmanifest","robots.txt","sitemap.xml","llms.txt","vercel.json","README.md",".env.example","api/contact.js","api/voice-lead.js"
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
    if (!html.includes("data-before-after-slider")) errors.push(file + " missing homepage before/after slider");
  }
  const imgs = [...html.matchAll(/<img\\b[^>]*>/gi)].map((m) => m[0]);
  for (const img of imgs) {
    if (!/loading=\\"(?:lazy|eager)\\"/.test(img)) errors.push(file + " image missing loading attribute -> " + img);
    for (const attr of ["decoding=\\"async\\"", "width=\\"", "height=\\""]) {
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
    if (!form.includes('action="/api/contact"')) errors.push(file + " form does not submit to /api/contact");
    if (!form.includes('method="post"')) errors.push(file + " form missing POST method");
    if (!form.includes("data-contact-form")) errors.push(file + " form missing data-contact-form marker");
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
  const h1 = [...html.matchAll(/<h1\\b/gi)].length;
  if (h1 !== 1) errors.push(file + " has " + h1 + " H1 tags");
  const previewRefs = [
    ...html.matchAll(/(?:src|href)="([^"]+)"/g),
    ...html.matchAll(/url\\(["']?([^"')]+)["']?\\)/g)
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
for (const file of ["foto/01_hero/hero-viktor-bonsai-main.webp","foto/01_hero/hero-viktor-bonsai-mobile.webp","foto/02_pryklady-robit/*.webp","foto/03_galereya/*.webp","foto/05_nivaki-khmarky/*.webp","foto/06_yaponski-kleny/klen-yaponskyi-01.webp","foto/06_yaponski-kleny/klen-yaponskyi-02.webp","foto/07_viktor/*.webp","foto/08_fonovi/*.webp","foto/09_pomylky/*.webp","foto/10_vidkrytka-yaponiya/vidkrytka-yaponiya-01.webp","baumarchitektur-korrektur.png","baumarchitektur-live-crown-ratio.png"]) {
  if (!manifest.includes(file)) errors.push("MANIFEST missing " + file);
}

if (errors.length) {
  console.error("AUDIT FAILED");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}
console.log("AUDIT PASSED: required files, SEO tags, JSON-LD, internal links, events and image manifest are present.");`;
}

function plantNameCss() {
  return `.plant-name-guide{padding-top:34px}.plant-table-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow)}.plant-name-table{width:100%;min-width:780px;border-collapse:collapse}.plant-name-table th,.plant-name-table td{padding:13px 15px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}.plant-name-table th{font-size:.78rem;text-transform:uppercase;color:var(--primary);letter-spacing:0;background:color-mix(in srgb,var(--surface) 74%,var(--bg));font-weight:900}.plant-name-table td:first-child{font-weight:850;color:var(--text)}.plant-name-table em{font-style:italic;color:var(--primary);font-weight:760}.plant-name-table tr:last-child td{border-bottom:0}@media (max-width:620px){.plant-name-guide{padding-top:24px}.plant-table-wrap{margin-left:-16px;margin-right:-16px;border-left:0;border-right:0;border-radius:0}.plant-name-table{min-width:720px}.plant-name-table th,.plant-name-table td{padding:12px 14px}}`;
}

function languagePlaceholderCss() {
  return `.language-placeholder{min-height:54svh;display:grid;align-content:center}.language-placeholder-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.language-placeholder-grid ul{margin:0;padding-left:20px;color:var(--muted)}.language-placeholder-grid li+li{margin-top:6px}@media (max-width:920px){.language-placeholder-grid{grid-template-columns:1fr}}`;
}

function speedQualityCss() {
  return `.speed-quality-note{position:relative;overflow:hidden;border-left:6px solid var(--accent);background:linear-gradient(135deg,color-mix(in srgb,var(--surface) 88%,var(--accent)),var(--surface))}.speed-quality-note h2{margin-top:6px}.speed-quality-contrast{display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:stretch;margin:18px 0}.speed-quality-contrast>div{min-width:0;border:1px solid var(--line);border-radius:8px;background:color-mix(in srgb,var(--surface) 72%,var(--bg));padding:14px}.speed-quality-contrast strong{display:block;font-family:var(--font-head);font-size:1.45rem;line-height:1.05;color:var(--primary)}.speed-quality-contrast span{display:block;margin-top:6px;color:var(--muted);font-weight:750}.speed-quality-vs{display:grid!important;place-items:center;border:0!important;background:transparent!important;color:var(--accent)!important;font-weight:900;text-transform:uppercase;font-size:.78rem;letter-spacing:0}.speed-quality-warning{border-top:1px solid var(--line);padding-top:14px;font-weight:760}@media (max-width:620px){.speed-quality-contrast{grid-template-columns:1fr}.speed-quality-vs{min-height:26px}}`;
}

function publicCss() {
  return `${cssBase().replace(/\.brand-symbol\{[^}]+\}/, "")}
${cssResponsiveFixes()}
${plantNameCss()}
${languagePlaceholderCss()}
${speedQualityCss()}
.hero-panel,.hero-services{position:relative;z-index:2}
.quiet-moments,.check-strip{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.quiet-moments span,.check-strip span{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;background:var(--surface);padding:8px 11px;color:var(--muted);font-size:.88rem;font-weight:800}.signature-block .check-strip span{background:color-mix(in srgb,var(--primary-ink) 14%,transparent);border-color:color-mix(in srgb,var(--primary-ink) 24%,transparent);color:var(--primary-ink)}
.hp-field{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important}
.image-carousel{--carousel-index:0;position:relative;aspect-ratio:4/3;overflow:hidden;margin:0;border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow);touch-action:pan-y}.image-carousel-track{display:flex;height:100%;transform:translateX(calc(var(--carousel-index)*-100%));transition:transform .52s cubic-bezier(.2,.7,.2,1);will-change:transform}.image-carousel-slide{flex:0 0 100%;width:100%;height:100%;object-fit:cover;background:var(--surface)}.image-carousel-btn{position:absolute;top:50%;z-index:2;display:grid;place-items:center;width:44px;height:44px;border:1px solid color-mix(in srgb,var(--primary) 22%,transparent);border-radius:999px;background:color-mix(in srgb,var(--surface) 88%,transparent);color:var(--primary);box-shadow:0 10px 28px rgba(0,0,0,.18);font:800 1.8rem/1 var(--font-body);cursor:pointer;transform:translateY(-50%);backdrop-filter:blur(10px)}.image-carousel-prev{left:14px}.image-carousel-next{right:14px}.image-carousel-dots{position:absolute;left:0;right:0;bottom:13px;z-index:2;display:flex;justify-content:center;gap:8px}.image-carousel-dot{width:9px;height:9px;border:1px solid color-mix(in srgb,var(--primary) 55%,transparent);border-radius:999px;background:color-mix(in srgb,var(--surface) 70%,transparent);padding:0;cursor:pointer}.image-carousel-dot.is-active{width:28px;background:var(--primary)}@media (max-width:620px){.image-carousel{border-radius:12px}.image-carousel-btn{width:40px;height:40px;font-size:1.55rem}.image-carousel-prev{left:10px}.image-carousel-next{right:10px}.image-carousel-dots{bottom:10px}}
${contactPersonCss()}
${galleryCaseCss()}
.cookie-banner[hidden],.toast[hidden]{display:none!important}.cookie-banner{max-height:calc(100svh - 32px);overflow:auto;pointer-events:auto}.mobile-cta{padding-bottom:env(safe-area-inset-bottom)}
@media (max-width:920px){body{padding-bottom:calc(58px + env(safe-area-inset-bottom))}.cookie-banner{bottom:calc(74px + env(safe-area-inset-bottom))}.toast{bottom:calc(74px + env(safe-area-inset-bottom));left:16px;right:16px}}
${cssWowPass().replace(".before-after-slider body." + "presentation-clean @media", "@media")}
${heroCopyResponsiveFixCss()}
${heroVariantCss()}
${heroVividVariantCss()}
${heroVividReadabilityCss()}
${experienceAccentCss()}
${meisterCarouselResponsiveCss()}`;
}

writeFile("assets/base.css", publicCss());
for (const n of [1, 2, 3, 4, 5]) writeFile(`assets/theme-v${n}.css`, themeCss(n));
writeFile("assets/main.js", jsMain());
writeFile("assets/img/MANIFEST.md", manifestV2());
writeFile("assets/icons/leaf.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true"><path fill="#24452F" d="M52 8C31 9 12 21 12 42c0 8 6 14 14 14 21 0 32-26 26-48Zm-34 38c9-14 18-22 30-31-8 11-16 21-30 31Z"/></svg>`);
writeFile("handoff/fr-it-localization-reminder.md", frItLocalizationReminder());

const pages = [
  ["index.html", "de", "Gartenbonsais, Formgehölze & japanische Baumkunst Schweiz", "Meister für Gartenbonsais, Niwaki, Gartengestaltung und Formgehölze in der Schweiz. 27 Jahre Erfahrung, kostenlose Foto-Diagnose.", homeDe(), [localBusinessLd(), personLd(), faqLd()]],
  ["leistungen.html", "de", "Niwaki, japanischer Ahorn & Kiefer-Formschnitt", "Leistungen für Niwaki Schnitt, Acer palmatum Pflege und Formschnitt von Nadelgehölzen in der Schweiz.", servicesDe(), [localBusinessLd(), serviceLd("Niwaki, Ahorn und Kiefer-Formschnitt", "Japanische Baumpflege, Niwaki Schnitt und Formschnitt für Nadelgehölze.")]],
  ["philosophie.html", "de", "Philosophie & Meister - japanische Gartenkunst", "Mein Weg vom einfachen Schnitt zur japanischen Baumkunst: Kyoto 2009, Respekt vor dem Baum und Arbeit nach Naturgesetzen.", philosophyDe(), [localBusinessLd(), personLd()]],
  ["galerie.html", "de", "Vorher / Nachher - Garten-Bonsai & Niwaki", "Reale Vorher-/Nachher-Fotos, Gartenbonsai, Niwaki-Beispiele und Arbeitsphasen aus meiner Arbeit.", galleryDe(), [localBusinessLd()]],
  ["preise.html", "de", "Japanische Baumpflege - Preise & Kosten", "Preise für japanische Baumpflege: Arbeit ab 110 CHF pro Stunde, Anfahrt ab 90 CHF, Foto-Diagnose kostenlos.", pricesDe(), [localBusinessLd(), faqLd()]],
  ["blog/index.html", "de", "Niwaki Wissen - Stil, Topiarschere, Kiefer & Diagnose", "Meine fachlichen Artikel zu Niwaki-Stilen, Topiarschere, Krone, Kiefer-Kerzen, alten Nadeln, Moos, Akadama, Wurzeln und Klimastress.", blogIndexDeV2(), [localBusinessLd()]],
  ["blog/topiarschere.html", "de", "Topiarschere vs. Heckenschere - sauberer Schnitt", "Warum ich beim Formschnitt mit der Topiarschere arbeite: sauberer Schnitt, weniger Energieverlust, japanisches Werkzeug.", articleTopiaryDeV2(), [localBusinessLd()]],
  ["blog/energie-krone.html", "de", "Krone öffnen - Energie, Licht und Luft im Niwaki", "Warum ich die Krone öffne: Energieverteilung, Licht, Luft und langfristige Form statt schneller Heckenlogik.", articleCrownDeV2(), [localBusinessLd()]],
  ["blog/niwaki-bonsai-stile.html", "de", "Niwaki, Bonsai & Cloud Pruning - Stilrichtung wählen", "Niwaki, Bonsai-Logik und Cloud Pruning: wie ich die passende Stilrichtung für Gartenbaum, Blickachse und Pflege-Rhythmus wähle.", articleStylesDeV2(), [localBusinessLd()]],
  ["blog/kiefer-kerzen.html", "de", "Kiefer-Kerzen schneiden - Timing bei Pinus", "Kiefer-Kerzen, Pinus-Formschnitt und warum der richtige Moment über die Zukunft der Wolkenform entscheidet.", articleCandlesDeV2(), [localBusinessLd()]],
  ["blog/fehler-alte-nadeln-moos-pilzrisiko.html", "de", "Alte Nadeln, Moos & Pilzrisiko - typische Fehler", "Alte Nadeln, Moos, dichte Kronen und Pilzrisiko bei wertvollen Nadelgehölzen richtig einordnen.", articleMistakesDeV2(), [localBusinessLd()]],
  ["blog/boden-wurzeln.html", "de", "Akadama & Bonsai-Erde - der richtige Boden", "Akadama Schweiz, Bonsai Erde, pH 5,5-6,5 und gesunde Wurzeln als Fundament für japanische Baumkunst.", articleSoilDeV2(), [localBusinessLd()]],
  ["blog/klimastress.html", "de", "Klimastress im Schweizer Premium-Garten", "Warum Hitze, trockene Sommer und Starkregen wertvolle Gartenbäume belasten und frühe Foto-Diagnose hilft.", articleClimateDeV2(), [localBusinessLd()]],
  ["kontakt.html", "de", "Kontakt & kostenlose Foto-Diagnose - Baumpflege", "Senden Sie mir Fotos, erhalten Sie eine kostenlose Diagnose und fordern Sie einen Rückruf an.", contactDe(), [localBusinessLd()]],
  ["impressum.html", "de", "Impressum - Viktor Baumarchitektur", "Platzhalter-Impressum für Viktor Baumarchitektur. Vor Veröffentlichung rechtlich ergänzen.", legalDe("impressum"), []],
  ["datenschutz.html", "de", "Datenschutz - Viktor Baumarchitektur", "Platzhalter-Datenschutzerklärung mit Consent Mode Hinweis. Vor Veröffentlichung rechtlich prüfen.", legalDe("datenschutz"), []],
  ["themes.html", "de", "Theme Preview - Viktor Baumarchitektur", "Interne Vorschau für Design Themes V1 bis V5.", themesPage(), []],
  ["en/index.html", "en", "Niwaki & Japanese Tree Art - Viktor Baumarchitektur", "Japanese tree care, niwaki and garden bonsai in the Zurich region. Free photo diagnosis.", homeEn(), [localBusinessLd(), personLd(), faqLd()]],
  ["en/leistungen.html", "en", "Services - Niwaki, Maples & Conifers", "English service page for niwaki, Japanese maple and conifer shaping services.", servicesEn(), [localBusinessLd(), serviceLd("Niwaki, maples and conifers", "Japanese tree care and shaping.")]],
  ["en/philosophie.html", "en", "Philosophy & Master - Japanese Garden Art", "My path from simple cutting to Japanese tree art: Kyoto 2009, respect for the tree and work with nature's laws.", genericEnPage("philosophy"), [localBusinessLd(), personLd()]],
  ["en/galerie.html", "en", "Before / After - Garden Bonsai & Niwaki", "Real before/after photos, niwaki examples, garden bonsai and work stages from my work.", galleryEn(), [localBusinessLd()]],
  ["en/preise.html", "en", "Japanese Tree Care - Prices & Costs", "Prices: work from 110 CHF per hour, travel from 90 CHF, free photo diagnosis.", genericEnPage("prices"), [localBusinessLd(), faqLd()]],
  ["en/blog/index.html", "en", "Niwaki Knowledge - Styles, Tools, Pines & Diagnosis", "English mirror articles about niwaki styles, topiary scissors, crown energy, pine candles, old needles, moss, roots and climate stress.", blogIndexEnV2(), [localBusinessLd()]],
  ["en/blog/topiarschere.html", "en", "Topiary Scissors vs Hedge Trimmer", "Why I cut with topiary scissors for cleaner tree shaping.", articleEnV2("topiary"), [localBusinessLd()]],
  ["en/blog/energie-krone.html", "en", "Opening the Crown - Energy, Light and Air", "Why I open a niwaki crown for light, air and long-term form.", articleEnV2("crown"), [localBusinessLd()]],
  ["en/blog/niwaki-bonsai-stile.html", "en", "Niwaki, Bonsai and Cloud Pruning Styles", "How I choose the right style direction for a garden tree, view line and maintenance rhythm.", articleEnV2("styles"), [localBusinessLd()]],
  ["en/blog/kiefer-kerzen.html", "en", "Pine Candles - Timing in Pinus Shaping", "Pine candles, timing and selective shaping for valuable conifers.", articleEnV2("candles"), [localBusinessLd()]],
  ["en/blog/fehler-alte-nadeln-moos-pilzrisiko.html", "en", "Old Needles, Moss and Fungal Risk", "How I read old needles, moss, dense crowns and fungal risk in valuable conifers.", articleEnV2("mistakes"), [localBusinessLd()]],
  ["en/blog/boden-wurzeln.html", "en", "Akadama & Bonsai Soil - Healthy Roots", "Akadama, pH and healthy roots for Japanese tree care.", articleEnV2("soil"), [localBusinessLd()]],
  ["en/blog/klimastress.html", "en", "Climate Stress in Swiss Premium Gardens", "Why Swiss climate stress makes early tree diagnosis more valuable.", articleEnV2("climate"), [localBusinessLd()]],
  ["en/kontakt.html", "en", "Contact & Free Photo Diagnosis", "Send photos of your tree and request a free first assessment.", contactEn(), [localBusinessLd()]],
  ["en/impressum.html", "en", "Legal Notice - Viktor Baumarchitektur", "Placeholder legal notice. Complete before publication.", legalDe("impressum").replaceAll("Impressum", "Legal Notice").replaceAll("Datenschutzerklärung", "Privacy Policy"), []],
  ["en/datenschutz.html", "en", "Privacy Policy - Viktor Baumarchitektur", "Placeholder privacy policy. Complete before publication.", legalDe("datenschutz").replaceAll("Datenschutzerklärung", "Privacy Policy"), []]
  ,["en/themes.html", "en", "Theme Preview - Viktor Baumarchitektur", "Internal preview for design themes V1 to V5.", themesPage(), []],
  ["fr/index.html", "fr", "Version française en préparation - Viktor Baumarchitektur", "Maquette noindex pour une future version française de Viktor Baumarchitektur. La traduction complète sera préparée plus tard.", frItPlaceholderPage("fr"), [localBusinessLd()]],
  ["it/index.html", "it", "Versione italiana in preparazione - Viktor Baumarchitektur", "Maquette noindex per una futura versione italiana di Viktor Baumarchitektur. La traduzione completa sarà preparata più tardi.", frItPlaceholderPage("it"), [localBusinessLd()]],
  ["uk/index.html", "uk", "Viktor Baumarchitektur - український перегляд", "Тимчасове українське дзеркало сайту Viktor Baumarchitektur для внутрішнього перегляду.", homeDe(), [localBusinessLd(), personLd(), faqLd()]],
  ["uk/leistungen.html", "uk", "Послуги - Niwaki, японські клени та хвойні", "Тимчасове українське дзеркало сторінки послуг Viktor Baumarchitektur.", servicesDe(), [localBusinessLd(), serviceLd("Niwaki, Ahorn und Kiefer-Formschnitt", "Japanische Baumpflege, Niwaki Schnitt und Formschnitt für Nadelgehölze.")]],
  ["uk/philosophie.html", "uk", "Філософія та майстерність - Viktor Baumarchitektur", "Тимчасове українське дзеркало сторінки філософії та майстерності.", philosophyDe(), [localBusinessLd(), personLd()]],
  ["uk/galerie.html", "uk", "Галерея - до і після, Garten-Bonsai та Niwaki", "Українська галерея Viktor Baumarchitektur: реальні фото до і після, Niwaki, садовий бонсай і етапи роботи.", galleryUk(), [localBusinessLd()]],
  ["uk/preise.html", "uk", "Ціни - японський догляд за деревами", "Тимчасове українське дзеркало сторінки цін Viktor Baumarchitektur.", pricesDe(), [localBusinessLd(), faqLd()]],
  ["uk/blog/index.html", "uk", "Знання Niwaki - стилі, інструменти, сосна і діагностика", "Тимчасове українське дзеркало блогу Viktor Baumarchitektur.", blogIndexDeV2(), [localBusinessLd()]],
  ["uk/blog/topiarschere.html", "uk", "Topiarschere vs. Heckenschere - чистий зріз", "Тимчасове українське дзеркало статті про інструмент і чистий зріз.", articleTopiaryDeV2(), [localBusinessLd()]],
  ["uk/blog/energie-krone.html", "uk", "Відкрити крону - енергія, світло і повітря", "Тимчасове українське дзеркало статті про енергію крони.", articleCrownDeV2(), [localBusinessLd()]],
  ["uk/blog/niwaki-bonsai-stile.html", "uk", "Стилі Niwaki, Bonsai і cloud pruning", "Тимчасове українське дзеркало статті про вибір стилю Niwaki.", articleStylesDeV2(), [localBusinessLd()]],
  ["uk/blog/kiefer-kerzen.html", "uk", "Свічки сосни - timing у Pinus shaping", "Тимчасове українське дзеркало статті про свічки сосни.", articleCandlesDeV2(), [localBusinessLd()]],
  ["uk/blog/fehler-alte-nadeln-moos-pilzrisiko.html", "uk", "Стара хвоя, мох і грибковий ризик", "Тимчасове українське дзеркало статті про стару хвою, мох, щільну крону і ризик грибків.", articleMistakesDeV2(), [localBusinessLd()]],
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
  ["uk/philosophie.html", ["uk/philosophie.html", "uk", "Філософія та майстерність - Viktor Baumarchitektur", "Українська сторінка про мою філософію, досвід і підхід до японської деревної архітектури.", genericUkPage("philosophy"), [localBusinessLd(), personLd()]]],
  ["uk/galerie.html", ["uk/galerie.html", "uk", "Галерея - до і після, Garten-Bonsai та Niwaki", "Українська галерея Viktor Baumarchitektur: реальні фото до і після, Niwaki, садовий бонсай і етапи роботи.", galleryUk(), [localBusinessLd()]]],
  ["uk/preise.html", ["uk/preise.html", "uk", "Ціни - японський догляд за деревами", "Українська сторінка цін Viktor Baumarchitektur: робота від 110 CHF/год, виїзд від 90 CHF, фото-діагностика безкоштовна.", genericUkPage("prices"), [localBusinessLd(), faqLd()]]],
  ["uk/blog/index.html", ["uk/blog/index.html", "uk", "Знання Niwaki - стилі, інструменти, сосна і діагностика", "Українські матеріали про Niwaki, стилі, японські ножиці, енергію крони, сосни, стару хвою, мох, коріння і кліматичний стрес.", blogIndexUk(), [localBusinessLd()]]],
  ["uk/blog/topiarschere.html", ["uk/blog/topiarschere.html", "uk", "Японські ножиці проти тримера - чистий зріз", "Українська стаття про чистий зріз, японські ножиці і контроль майбутньої форми дерева.", articleUk("topiary"), [localBusinessLd()]]],
  ["uk/blog/energie-krone.html", ["uk/blog/energie-krone.html", "uk", "Відкрити крону - енергія, світло і повітря", "Українська стаття про те, чому крону Niwaki треба відкривати для світла, повітря і довгої форми.", articleUk("crown"), [localBusinessLd()]]],
  ["uk/blog/niwaki-bonsai-stile.html", ["uk/blog/niwaki-bonsai-stile.html", "uk", "Стилі Niwaki, Bonsai і cloud pruning", "Українська стаття про те, як я вибираю стиль Niwaki за деревом, садом і ритмом догляду.", articleUk("styles"), [localBusinessLd()]]],
  ["uk/blog/kiefer-kerzen.html", ["uk/blog/kiefer-kerzen.html", "uk", "Свічки сосни - правильний момент у формуванні Pinus", "Українська стаття про свічки сосни, timing і вибіркове формування хвойних дерев.", articleUk("candles"), [localBusinessLd()]]],
  ["uk/blog/fehler-alte-nadeln-moos-pilzrisiko.html", ["uk/blog/fehler-alte-nadeln-moos-pilzrisiko.html", "uk", "Стара хвоя, мох і грибковий ризик", "Українська стаття про стару хвою, мох, щільну крону, повітря і грибкові ризики у хвойних дерев.", articleUk("mistakes"), [localBusinessLd()]]],
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
- Services: Niwaki / Garten-Bonsai, Japanischer Ahorn (Acer palmatum), Kiefer (Pinus), Eibe (Taxus baccata), Wacholder (Juniperus), Tanne (Abies) and Fichte (Picea).
- Area: Zürich, Zug, Luzern, Aargau, Schwyz, Schaffhausen, Appenzell, Glarus; other Swiss regions by arrangement.
- Prices: work from 110 CHF/hour, travel from 90 CHF, free photo diagnosis.
- Contact: ${domain}/kontakt
- French and Italian are only noindex coming-later stubs for now: ${domain}/fr/ and ${domain}/it/

Important pages:
- ${domain}/
- ${domain}/leistungen
- ${domain}/preise
- ${domain}/kontakt
- ${domain}/blog/topiarschere
- ${domain}/blog/energie-krone
- ${domain}/blog/niwaki-bonsai-stile
- ${domain}/blog/kiefer-kerzen
- ${domain}/blog/fehler-alte-nadeln-moos-pilzrisiko
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
