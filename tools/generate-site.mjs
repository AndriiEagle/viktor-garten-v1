import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brand = "Viktor Baumarchitektur";
const brandWordmark = "Viktor Garten";
const domain = "https://v-garten.ch";
const phone = "+41783130330";
const phoneDisplay = "+41 78 313 03 30";
const telHref = `tel:${phone}`;
const instagramUrl = "https://www.instagram.com/viktor_bonsai_niwaki";
const facebookUrl = "https://www.facebook.com/viktor.bonsai.niwaki";
const publicSameAs = [instagramUrl, facebookUrl];
const assetVersion = "20260630-header-lang-phone";
const whatsappText = encodeURIComponent(
  "Guten Tag Viktor, ich sende Ihnen Fotos meines Baumes (Kanton: ..., Baumart: ...). Können Sie einschätzen, welche Formung oder Kronenpflege sinnvoll ist?"
);
const whatsappHref = `https://wa.me/${phone.replace("+", "")}?text=${whatsappText}`;
const whatsappTextUk = encodeURIComponent(
  "Добрий день, Вікторе. Надсилаю фото свого дерева (кантон: ..., вид дерева: ...). Чи можете оцінити, яке формування або догляд крони потрібні?"
);
const whatsappHrefUk = `https://wa.me/${phone.replace("+", "")}?text=${whatsappTextUk}`;
const ogImageFile = "foto/01_hero/hero-viktor-bonsai-main.webp";
const heroCourtyardDesktopFile = "hero-courtyard-niwaki-desktop.webp";
const heroCourtyardMobileFile = "hero-courtyard-niwaki-mobile.webp";
const heroPreloadFile = "foto/01_hero/hero-courtyard-niwaki-desktop.webp";
const ogImageUrl = `${domain}/assets/img/${ogImageFile}`;
const activeHeroVariant = {
  id: "4",
  desktop: photoPath("01_hero", heroCourtyardDesktopFile),
  mobile: photoPath("01_hero", heroCourtyardMobileFile),
  altPhoto: ["01_hero", heroCourtyardMobileFile]
};
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
  if (item.folder === "02_pryklady-robit" && item.file.startsWith("hecke-niwaki-")) {
    return "Evergreen conifer hedge documented before, during and after hand shaping in the Zurich region";
  }
  if (item.folder === "07_viktor") return "I shape a pine by hand";
  if (item.folder === "08_fonovi") return "Quiet Swiss garden with shaped niwaki trees";
  if (item.folder === "09_pomylky" && item.file === "taxus-heckenschere-fehler-01.webp") return "Taxus baccata with protruding pale shoot tips after electric hedge trimmer cutting";
  if (item.folder === "09_pomylky" && item.file === "taxus-heckenschere-fehler-02.webp") return "Taxus baccata with an uneven surface after a rough motor hedge trimmer cut";
  if (item.folder === "09_pomylky" && item.file === "pomylka-svichka-02.webp") return "Pinus thunbergii mistake: hardened yearly shoot cut in the middle with no useful future bud";
  if (item.folder === "09_pomylky") return "Close-up of pine candles and pruning detail";
  if (item.folder === "02_pryklady-robit" && item.file === "case-svichky-before.webp") return "Pine candle close-up before hand shortening";
  if (item.folder === "02_pryklady-robit" && item.file === "case-svichky-after.webp") return "Pine candle being shortened by hand as a care detail";
  if (item.folder === "10_vidkrytka-yaponiya" && item.file === "kyoto-viktor-wife-2009.webp") return "Viktor with his wife in Kyoto in 2009, in front of a Japanese garden and the Golden Pavilion";
  if (item.folder === "10_vidkrytka-yaponiya") return "Postcard from Japan with a bonsai motif";
  if (item.species_lat) return `${item.species_lat} as garden bonsai / niwaki, shaped by hand in the Zurich region`;
  return fallback;
}

const galleryAltUk = {
  "02_pryklady-robit/sosna-bila-06.webp": "Формована сосна-нівакі з похилим «вітровим» силуетом і ярусними подушками — садовий бонсай",
  "02_pryklady-robit/sosna-bila-11.webp": "Садовий бонсай-сосна з товстим покрученим стовбуром і хмарними ярусами — ручне формування нівакі",
  "03_galereya/sosna-bila-01.webp": "Японська біла сосна Pinus parviflora з низькою хмарною кроною у світлому контейнері — садовий бонсай",
  "03_galereya/sosna-bila-02.webp": "Японська біла сосна Pinus parviflora у темній чаші — багатоярусна форма нівакі",
  "03_galereya/sosna-bila-14.webp": "Формована сосна-нівакі з кількома ярусами у темному горщику — садовий бонсай",
  "03_galereya/sosna-bila-15.webp": "Сосна-нівакі у дерев’яній діжці — ручне формування хмарних подушок",
  "03_galereya/sosna-bila-08.webp": "Високе формоване хвойне дерево у зеленому дерев’яному ящику — садовий нівакі",
  "02_pryklady-robit/sosna-bila-07.webp": "Формована сосна-нівакі з округлими ярусами на тлі забудови — садовий бонсай",
  "02_pryklady-robit/sosna-bila-08.webp": "Сосна-нівакі з широкими хмарними подушками — ручне формування крони",
  "02_pryklady-robit/sosna-bila-09.webp": "Сосна-нівакі з нахилом стовбура праворуч і відкритими ярусами — садовий бонсай",
  "02_pryklady-robit/sosna-bila-10.webp": "Висока сосна-нівакі з виразним стовбуром і багатьма ярусами — садовий бонсай",
  "02_pryklady-robit/sosna-bila-17.webp": "Сосна-нівакі поряд із квітучою азалією — формовані хмарні подушки",
  "02_pryklady-robit/sosna-bila-18.webp": "Висока сосна-нівакі з піднятою кроною — садовий бонсай у розсаднику",
  "02_pryklady-robit/sosna-bila-19.webp": "Сосна-нівакі з широкою нижньою подушкою і легкою кроною — ручне формування",
  "02_pryklady-robit/sosna-bila-22.webp": "Сосна-нівакі на тлі пагорбів — багатоярусна хмарна форма, садовий бонсай",
  "02_pryklady-robit/sosna-bila-23.webp": "Висока сосна-нівакі з округлими ярусами на тлі міської забудови — садовий бонсай",
  "03_galereya/sosna-bila-12.webp": "Формоване вічнозелене дерево з хмарними ярусами біля каменя у японському саду — нівакі",
  "03_galereya/sosna-bila-13.webp": "Формоване вічнозелене дерево-нівакі з округлою кроною — садовий бонсай",
  "02_pryklady-robit/tys-04.webp": "Тис Taxus як топіарі-нівакі з ярусними подушками у горщику — ручне формування",
  "02_pryklady-robit/tys-05.webp": "Тис Taxus із хмарною багатоярусною формою у горщику — садовий топіарі",
  "02_pryklady-robit/tys-01.webp": "Формоване хвойне дерево під час догляду з приставленою драбиною — садовий нівакі",
  "03_galereya/sosna-bila-03.webp": "Загальний план розсадника: ряди садових бонсаїв і нівакі у горщиках — садовий контекст",
  "02_pryklady-robit/sosna-bila-21.webp": "Ряд формованих дерев із квітучими азаліями — садовий контекст розсадника нівакі",
  "02_pryklady-robit/tys-03.webp": "Ряд тисів і хвойних топіарі у горщиках — асортимент формованих дерев",
  "02_pryklady-robit/tys-02.webp": "Тис Taxus із густою хвоєю біля гравійної доріжки — садовий контекст",
  "03_galereya/sosna-bila-04.webp": "Крупний план хвої та свічок японської білої сосни Pinus parviflora перед формуванням",
  "02_pryklady-robit/sosna-bila-20.webp": "Крупний план хвої й молодих свічок сосни знизу крони — деталь догляду",
  "02_pryklady-robit/sosna-bila-16.webp": "Віктор поряд із формованою сосною-нівакі та драбиною під час роботи в саду",
  "02_pryklady-robit/case-svichky-before.webp": "Крупний план свічок сосни перед ручним скороченням — деталь догляду, не повний кейс до/після",
  "02_pryklady-robit/case-svichky-after.webp": "Ручне скорочення свічки сосни — процес догляду, не готовий результат усього дерева",
  "03_galereya/sosna-girska-01.webp": "Сосна гірська Pinus mugo — низький розлогий садовий бонсай у чаші, ручне формування",
  "04_khvoyni/sosna-avstr-01.webp": "Сосна австрійська чорна Pinus nigra — садовий нівакі після сезонної обрізки крони",
  "04_khvoyni/sosna-avstr-02.webp": "Сосна австрійська чорна Pinus nigra — крона після чистки від старої сухої хвої зсередини",
  "04_khvoyni/sosna-chorna-01.webp": "Сосна японська чорна Pinus thunbergii — нівакі з проріджуванням крони",
  "04_khvoyni/sosna-chorna-02.webp": "Сосна японська чорна Pinus thunbergii — багатоярусна форма, ручне формування",
  "04_khvoyni/sosna-chorna-03.webp": "Сосна японська чорна Pinus thunbergii — вкорочення свічок для рівномірної сили крони",
  "04_khvoyni/sosna-chorna-04.webp": "Сосна японська чорна Pinus thunbergii — відкриті яруси, садовий бонсай",
  "04_khvoyni/sosna-chorna-05.webp": "Сосна японська чорна Pinus thunbergii — зріла крона нівакі",
  "04_khvoyni/sosna-girska-01.webp": "Сосна гірська Pinus mugo — низький садовий бонсай, ручне формування",
  "04_khvoyni/sosna-girska-02.webp": "Сосна гірська Pinus mugo — компактна формована крона нівакі",
  "05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp": "Сосна звичайна Pinus sylvestris 'Watereri' — формування хмар, профілактика загущення крони",
  "05_nivaki-khmarky/sosna-watereri-do-pislya-02.webp": "Pinus sylvestris 'Watereri' — розрідження шапок проти зайвої вологи й грибкових хвороб",
  "05_nivaki-khmarky/sosna-watereri-do-pislya-03.webp": "Pinus sylvestris 'Watereri' — хмарна форма, сезонна робота раз на 2–3 роки",
  "05_nivaki-khmarky/sosna-watereri-do-pislya-04.webp": "Pinus sylvestris 'Watereri' — відкриті яруси, більше світла й повітря в кроні",
  "05_nivaki-khmarky/sosna-watereri-do-pislya-05.webp": "Pinus sylvestris 'Watereri' — ручне формування хмарок нівакі",
  "05_nivaki-khmarky/sosna-watereri-do-pislya-06.webp": "Pinus sylvestris 'Watereri' — спокійний силует крони після розрідження",
  "05_nivaki-khmarky/sosna-watereri-do-pislya-07.webp": "Pinus sylvestris 'Watereri' — зріла хмарна крона садового бонсаю",
  "05_nivaki-khmarky/yalivets-01.webp": "Ялівець Juniperus — нівакі з хмарними ярусами, ручне формування",
  "05_nivaki-khmarky/yalivets-02.webp": "Ялівець Juniperus — формовані хмарки, садовий бонсай",
  "05_nivaki-khmarky/yalivets-03.webp": "Ялівець Juniperus — відкрита ярусна крона нівакі",
  "05_nivaki-khmarky/yalivets-04.webp": "Ялівець Juniperus — зріла формована крона у японському саду",
  "06_yaponski-kleny/klen-yaponskyi-01.webp": "Японський клен Acer palmatum — тонка крона, хмарне формування",
  "06_yaponski-kleny/klen-yaponskyi-02.webp": "Японський клен Acer palmatum — формування дрібних гілок і легкої крони",
  "06_yaponski-kleny/klen-yaponskyi-03.webp": "Японський клен Acer palmatum — обережна обрізка, прозора крона",
  "06_yaponski-kleny/klen-yaponskyi-04.webp": "Японський клен Acer palmatum — сезонний догляд і формування",
  "02_pryklady-robit/sosna-bila-do-pislya-01.webp": "Японська біла сосна Pinus parviflora — нівакі, ракурс ярусної крони, кадр 01 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-02.webp": "Японська біла сосна Pinus parviflora — нівакі, робочий контекстний кадр, кадр 02 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-03.webp": "Японська біла сосна Pinus parviflora — нівакі, етап формування крони, кадр 03 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-04.webp": "Японська біла сосна Pinus parviflora — нівакі, нижня лінія крони, кадр 04 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-05.webp": "Японська біла сосна Pinus parviflora — нівакі, форма після роботи, кадр 05 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-12.webp": "Японська біла сосна Pinus parviflora — нівакі, нижня лінія крони, кадр 12 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-13.webp": "Японська біла сосна Pinus parviflora — нівакі, форма після роботи, кадр 13 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-14.webp": "Японська біла сосна Pinus parviflora — нівакі, деталь подушок хвої, кадр 14 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-15.webp": "Японська біла сосна Pinus parviflora — нівакі, крона з бічного ракурсу, кадр 15 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-33.webp": "Японська біла сосна Pinus parviflora — нівакі, ракурс ярусної крони, кадр 33 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-34.webp": "Японська біла сосна Pinus parviflora — нівакі, робочий контекстний кадр, кадр 34 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-35.webp": "Японська біла сосна Pinus parviflora — нівакі, етап формування крони, кадр 35 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-36.webp": "Японська біла сосна Pinus parviflora — нівакі, нижня лінія крони, кадр 36 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-37.webp": "Японська біла сосна Pinus parviflora — нівакі, форма після роботи, кадр 37 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-38.webp": "Японська біла сосна Pinus parviflora — нівакі, деталь подушок хвої, кадр 38 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-39.webp": "Японська біла сосна Pinus parviflora — нівакі, крона з бічного ракурсу, кадр 39 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-40.webp": "Японська біла сосна Pinus parviflora — нівакі, загальний вигляд дерева на місці, кадр 40 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-41.webp": "Японська біла сосна Pinus parviflora — нівакі, ракурс ярусної крони, кадр 41 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-42.webp": "Японська біла сосна Pinus parviflora — нівакі, робочий контекстний кадр, кадр 42 серії до/після",
  "02_pryklady-robit/sosna-bila-do-pislya-43.webp": "Японська біла сосна Pinus parviflora — нівакі, етап формування крони, кадр 43 серії до/після",
  "02_pryklady-robit/tys-do-pislya-06.webp": "Тис Taxus baccata — топіарна стрижка до/після, ярусні подушки крони, кадр 06",
  "02_pryklady-robit/tys-do-pislya-07.webp": "Тис Taxus baccata — топіарна стрижка до/після, робочий кадр серії, кадр 07",
  "02_pryklady-robit/tys-do-pislya-08.webp": "Тис Taxus baccata — топіарна стрижка до/після, форма після стрижки, кадр 08",
  "02_pryklady-robit/tys-do-pislya-09.webp": "Тис Taxus baccata — топіарна стрижка до/після, загальний вигляд куща, кадр 09",
  "02_pryklady-robit/tys-do-pislya-10.webp": "Тис Taxus baccata — топіарна стрижка до/після, топіарна форма з боку, кадр 10",
  "02_pryklady-robit/tys-do-pislya-11.webp": "Тис Taxus baccata — топіарна стрижка до/після, ярусні подушки крони, кадр 11",
  "02_pryklady-robit/tys-do-pislya-12.webp": "Тис Taxus baccata — топіарна стрижка до/після, робочий кадр серії, кадр 12",
  "02_pryklady-robit/tys-do-pislya-13.webp": "Тис Taxus baccata — топіарна стрижка до/після, форма після стрижки, кадр 13",
  "02_pryklady-robit/sosna-bila-do-pislya-30.webp": "Японська біла сосна Pinus parviflora — нівакі, деталь подушок хвої, кадр 30 серії до/після",
  "07_viktor/viktor-01.webp": "Віктор за роботою — ручне формування нівакі секатором",
  "07_viktor/viktor-03.webp": "Віктор за роботою — художня обрізка крони сосни",
  "07_viktor/viktor-07.webp": "Віктор за роботою — формування садового бонсаю біля дерева",
  "07_viktor/viktor-08.webp": "Віктор за роботою — догляд за кроною нівакі вручну",
  "07_viktor/viktor-09.webp": "Віктор за роботою — обрізка та корекція форми дерева",
  "01_hero/hero-sad-01.webp": "Японський сад з нівакі та формованими деревами — загальний краєвид",
  "01_hero/hero-sad-02.webp": "Японський сад з нівакі — тераса, доріжка і формовані дерева",
  "09_pomylky/pomylka-svichka-01.webp": "Неправильний зріз свічки сосни — приклад помилки, задеревеніла частина",
  "09_pomylky/pomylka-svichka-02.webp": "Неправильний зріз свічки сосни — гілка без майбутньої бруньки",
};

function photoAlt(folder, file, lang = "de", fallback = "") {
  const item = photo(folder, file);
  if (folder === "04_khvoyni" && file === "energie-krone-pinus-crown-01.webp") {
    if (lang === "uk") return "Крупний план хвойної крони з молодим приростом після ручного читання структури";
    if (lang === "en") return "Close-up of a conifer crown with young growth after hand reading of the structure";
    return "Nahaufnahme einer Nadelgehölz-Krone mit jungem Austrieb nach dem Lesen der Struktur";
  }
  if (folder === "04_khvoyni" && file === "sosna-avstr-01.webp") {
    if (lang === "uk") return "Віктор поряд із великою чорною сосною Pinus nigra — масштаб дерева під час ручної роботи";
    if (lang === "en") return "Viktor beside a large black pine Pinus nigra, showing the scale of hand shaping work";
    return "Viktor neben einer grossen Schwarzkiefer Pinus nigra - Massstab der Handarbeit am Baum";
  }
  if (folder === "04_khvoyni" && file === "sosna-avstr-02.webp") {
    if (lang === "uk") return "Сосна австрійська чорна Pinus nigra після санітарної чистки крони від сухої хвої";
    if (lang === "en") return "Austrian black pine Pinus nigra after sanitary crown cleaning and seasonal care";
    return "Schwarzkiefer Pinus nigra nach sanitärer Kronenreinigung und saisonaler Pflege";
  }
  if (folder === "04_khvoyni" && /^sosna-girska-0[123]\.webp$/.test(file)) {
    const wintergoldAlt = {
      "sosna-girska-01.webp": {
        de: "Pinus mugo Wintergold mit gereinigter Kronenmitte nach der Herbstpflege",
        en: "Pinus mugo Wintergold with the inner crown cleaned during autumn care",
        uk: "Pinus mugo Wintergold з очищеною серединою крони після осіннього догляду"
      },
      "sosna-girska-02.webp": {
        de: "Pinus mugo Wintergold mit gelber Winterfaerbung nach der Kronenpflege",
        en: "Pinus mugo Wintergold with yellow winter colour after crown care",
        uk: "Pinus mugo Wintergold із жовтим зимовим забарвленням після чистки крони"
      },
      "sosna-girska-03.webp": {
        de: "Pinus mugo Wintergold im Gartenkontext nach der Herbstreinigung der Kronenmitte",
        en: "Pinus mugo Wintergold in the garden context after autumn cleaning of the crown centre",
        uk: "Pinus mugo Wintergold у садовому контексті після осінньої чистки середини крони"
      }
    };
    return wintergoldAlt[file][lang] || wintergoldAlt[file].de;
  }
  if (folder === "04_khvoyni" && file === "pinus-mugo-pumilio-pilzkrone-01.webp") {
    if (lang === "uk") return "Pinus mugo Pumilio у великій чаші з художньо сформованою грибоподібною кроною";
    if (lang === "en") return "Pinus mugo Pumilio in a large planter with an artistically shaped mushroom crown";
    return "Pinus mugo Pumilio in grosser Schale mit künstlerisch geformter Pilzkrone";
  }
  if (folder === "04_khvoyni" && /^pinus-thunbergii-krone-0[123]\.webp$/.test(file)) {
    const thunbergiiAlt = {
      "pinus-thunbergii-krone-01.webp": {
        de: "Japanische Schwarzkiefer Pinus thunbergii mit architektonisch aufgebauter Niwaki-Krone",
        en: "Japanese black pine Pinus thunbergii with an architectural niwaki crown",
        uk: "Сосна японська чорна Pinus thunbergii з архітектурною кроною Niwaki"
      },
      "pinus-thunbergii-krone-02.webp": {
        de: "Pinus thunbergii nach Kronenarbeit mit klaren Wolkenetagen",
        en: "Pinus thunbergii after crown work with clear cloud pads",
        uk: "Pinus thunbergii після роботи по кроні з читабельними хмарними ярусами"
      },
      "pinus-thunbergii-krone-03.webp": {
        de: "Detail der japanischen Schwarzkiefer Pinus thunbergii nach Auslichtung und Kerzenarbeit",
        en: "Detail of Japanese black pine after thinning and candle work",
        uk: "Деталь сосни японської чорної після прорідження і роботи зі свічками"
      }
    };
    return thunbergiiAlt[file][lang] || thunbergiiAlt[file].de;
  }
  if (folder === "04_khvoyni" && /^parviflora-kerzenabsenkung-0[1-4]\.webp$/.test(file)) {
    const parvifloraCandleAlt = {
      "parviflora-kerzenabsenkung-01.webp": {
        de: "Pinus parviflora im Garten nach der Arbeit an Kerzen und jungem Austrieb, Baum 1",
        en: "Pinus parviflora in the garden after candle and young shoot work, tree 1",
        uk: "Pinus parviflora в саду після роботи зі свічками і молодим приростом, дерево 1"
      },
      "parviflora-kerzenabsenkung-02.webp": {
        de: "Zweite Ansicht von Pinus parviflora nach dem Absenken des jungen Austriebs",
        en: "Second view of Pinus parviflora after settling the young growth",
        uk: "Другий ракурс Pinus parviflora після просідання молодого приросту"
      },
      "parviflora-kerzenabsenkung-03.webp": {
        de: "Pinus parviflora im Gartenbeet mit ruhiger Wolkenlinie nach Kerzenarbeit, Baum 2",
        en: "Pinus parviflora in the garden bed with a calm cloud line after candle work, tree 2",
        uk: "Pinus parviflora у садовій зоні зі спокійною хмарною лінією після роботи зі свічками, дерево 2"
      },
      "parviflora-kerzenabsenkung-04.webp": {
        de: "Pinus parviflora im Landschaftskontext nach Abendarbeit am jungen Austrieb",
        en: "Pinus parviflora in the landscape context after evening work on young growth",
        uk: "Pinus parviflora у ландшафтному контексті після вечірньої роботи з молодим приростом"
      }
    };
    return parvifloraCandleAlt[file][lang] || parvifloraCandleAlt[file].de;
  }
  if (folder === "04_khvoyni" && /^watereri-wolkenpflege-tree[12]-0[1-4]\.webp$/.test(file)) {
    const watereriTwoTreeAlt = {
      "watereri-wolkenpflege-tree1-01.webp": {
        de: "Pinus sylvestris Watereri Baum 1, Detail einer dichten Wolke bei der selektiven Pflege",
        en: "Pinus sylvestris Watereri tree 1, dense cloud pad detail during selective care",
        uk: "Pinus sylvestris Watereri, дерево 1: деталь густої хмарки під час вибіркового догляду"
      },
      "watereri-wolkenpflege-tree1-02.webp": {
        de: "Pinus sylvestris Watereri Baum 1, junger Austrieb und dichte Nadeln in der Wolke",
        en: "Pinus sylvestris Watereri tree 1, young growth and dense needles inside the cloud pad",
        uk: "Pinus sylvestris Watereri, дерево 1: молодий приріст і щільна хвоя всередині хмарки"
      },
      "watereri-wolkenpflege-tree1-03.webp": {
        de: "Handarbeit an Pinus sylvestris Watereri mit Schere und jungem Austrieb",
        en: "Hand work on Pinus sylvestris Watereri with shears and young growth",
        uk: "Ручна робота з Pinus sylvestris Watereri: ножиці і молодий приріст"
      },
      "watereri-wolkenpflege-tree1-04.webp": {
        de: "Detail einer Watereri-Wolke beim Auswaehlen der jungen Triebe",
        en: "Watereri cloud pad detail while selecting young shoots",
        uk: "Деталь хмарки Watereri під час вибору молодих пагонів"
      },
      "watereri-wolkenpflege-tree2-01.webp": {
        de: "Pinus sylvestris Watereri Baum 2, Kronenarchitektur mit dichten Wolkenpolstern",
        en: "Pinus sylvestris Watereri tree 2, crown architecture with dense cloud pads",
        uk: "Pinus sylvestris Watereri, дерево 2: архітектура крони з густими хмарними шапками"
      },
      "watereri-wolkenpflege-tree2-02.webp": {
        de: "Pinus sylvestris Watereri Baum 2 nach Wolkenpflege im Terrassengarten",
        en: "Pinus sylvestris Watereri tree 2 after cloud pad care in a terrace garden",
        uk: "Pinus sylvestris Watereri, дерево 2 після догляду за хмарними шапками на терасі"
      }
    };
    return watereriTwoTreeAlt[file]?.[lang] || watereriTwoTreeAlt[file]?.de || fallback;
  }
  if (lang === "uk" && galleryAltUk[`${folder}/${file}`]) return galleryAltUk[`${folder}/${file}`];
  if (folder === "02_pryklady-robit" && /^(sosna-bila|tys-|tys-do-pislya-)/.test(file)) {
    if (/^(Vorher|Nachher|Arbeit|Before|After|Work|До|Після|Робота):/.test(fallback)) return fallback;
    if (file.startsWith("sosna-bila")) {
      if (lang === "uk") return "Японська біла сосна Pinus parviflora як робочий або контекстний кадр Niwaki";
      if (lang === "en") return "Japanese white pine Pinus parviflora as a niwaki work or context view";
      return "Japanische Weisskiefer Pinus parviflora als Arbeits- oder Kontextansicht eines Niwaki";
    }
    if (lang === "uk") return "Тис Taxus baccata як робочий або контекстний кадр топіарної форми";
    if (lang === "en") return "Taxus baccata topiary work or context view, not a strict before-after proof";
    return "Eibe Taxus baccata als Arbeits- oder Kontextansicht der Topiary-Form";
  }
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

const aiCrawlerAgents = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot"
];

const answerPages = [
  {
    slug: "niwaki-schweiz",
    titleDe: "Niwaki Schweiz - Gartenbonsai richtig pflegen",
    titleEn: "Niwaki Switzerland - Garden Bonsai Care",
    descDe: "Niwaki und Gartenbonsai in der Schweiz: Pflege, Schnitt, Diagnose und kostenlose Foto-Einschätzung durch Viktor Baumarchitektur.",
    descEn: "Niwaki and garden bonsai care in Switzerland: shaping, diagnosis and free photo assessment by Viktor Baumarchitektur.",
    eyebrowDe: "Niwaki Schweiz",
    eyebrowEn: "Niwaki Switzerland",
    h1De: "Niwaki in der Schweiz: Wenn ein Baum Form, Luft und Ruhe braucht.",
    h1En: "Niwaki in Switzerland: when a tree needs form, air and calm.",
    introDe: "Niwaki sind keine schnell geschnittenen Kugeln. Ein Gartenbonsai wird gelesen: Stammbewegung, tragende Aeste, Lichtfenster, alte Nadeln und die Kraftverteilung der Krone. In der Schweiz kommen dazu Hitze, trockene Sommer und schwere, oft feuchte Gartenboeden.",
    introEn: "Niwaki are not quick clipped balls. A garden bonsai is read through trunk movement, supporting branches, light windows, old needles and crown energy. In Switzerland, heat, dry summers and heavy garden soils make that work more demanding.",
    image: ["05_nivaki-khmarky", "sosna-watereri-do-pislya-08.webp"],
    bulletsDe: ["Pinus, Taxus, Juniperus und andere wertvolle Formgehoelze.", "Handschnitt mit japanischem Werkzeug statt Motor-Heckenschere.", "Kostenlose Foto-Diagnose vor einem Vor-Ort-Termin."],
    bulletsEn: ["Pinus, Taxus, Juniperus and other valuable shaped trees.", "Hand cutting with Japanese tools instead of motor hedge trimming.", "Free photo diagnosis before an on-site appointment."],
    faqDe: [
      ["Was ist Niwaki?", "Niwaki bedeutet grob: ein im Garten gestalteter Baum. Entscheidend ist nicht die Groesse, sondern die bewusst gefuehrte Struktur."],
      ["Wie oft braucht ein Niwaki Pflege?", "Viele Baeume brauchen je nach Art, Standort und Wachstum jaehrliche oder mehrjaehrige Pflege. Die richtige Frequenz wird nach Fotos und Zustand entschieden."]
    ],
    faqEn: [
      ["What is niwaki?", "Niwaki is a garden tree shaped with intent. The key is not size, but structure, rhythm and long-term health."],
      ["How often does a niwaki need care?", "Depending on species, location and growth, a tree may need yearly or multi-year care. The frequency is decided after seeing its condition."]
    ]
  },
  {
    slug: "gartenbonsai-zuerich",
    titleDe: "Garten-Bonsai Zürich und Zürichsee - Niwaki Pflege",
    titleEn: "Garden Bonsai Zurich and Lake Zurich - Niwaki Care",
    descDe: "Garten-Bonsai und Niwaki im Raum Zürich und Zürichsee: Formkorrektur, Kronenpflege und Foto-Diagnose.",
    descEn: "Garden bonsai and niwaki care around Zurich and Lake Zurich: form correction, crown care and photo diagnosis.",
    eyebrowDe: "Garten-Bonsai Zürich",
    eyebrowEn: "Garden Bonsai Zurich",
    h1De: "Garten-Bonsai in Zürich: der Baum muss zum Haus, Garten und Blick passen.",
    h1En: "Garden bonsai in Zurich: the tree must fit the house, garden and view.",
    introDe: "In Zürich, am Zürichsee und in den Seegemeinden steht der Baum oft direkt im Blickfeld: Terrasse, Wohnzimmer, Einfahrt, Gartenraum. Ein Garten-Bonsai muss aus der Naehe sauber wirken und aus dem Haus ruhig lesbar bleiben.",
    introEn: "Around Zurich and Lake Zurich, the tree often sits in the main view: terrace, living room, entrance or garden room. A garden bonsai must look clean close up and calm from inside the house.",
    image: ["08_fonovi", "garden-view-chair-niwaki-01.webp"],
    bulletsDe: ["Fokus auf Zürich, Zürichsee, Küsnacht, Zollikon, Meilen, Herrliberg, Erlenbach, Kilchberg und Thalwil.", "Geeignet fuer hochwertige Einzelbaeume, Terrassenbaeume und praegende Blickachsen.", "Erster Schritt: drei Fotos per WhatsApp."],
    bulletsEn: ["Focus on Zurich, Lake Zurich, Küsnacht, Zollikon, Meilen, Herrliberg, Erlenbach, Kilchberg and Thalwil.", "Suitable for valuable individual trees, terrace trees and important garden views.", "First step: three photos by WhatsApp."],
    faqDe: [
      ["Kann ein Garten-Bonsai nachtraeglich verbessert werden?", "Oft ja, wenn noch tragende Aeste, Lichtfenster und gesunde Bereiche vorhanden sind. Die Foto-Diagnose klaert, ob sich ein Aufbau lohnt."],
      ["Arbeitet Viktor auch ausserhalb der Stadt Zürich?", "Ja. Schwerpunkt ist der Kanton Zürich und der Zürichsee, weitere Schweizer Regionen nach Absprache."]
    ],
    faqEn: [
      ["Can an existing garden bonsai be improved?", "Often yes, if supporting branches, light windows and healthy parts remain. The photo diagnosis shows whether rebuilding the form is worth it."],
      ["Does Viktor work outside Zurich city?", "Yes. The main area is Canton Zurich and Lake Zurich, with other Swiss regions by arrangement."]
    ]
  },
  {
    slug: "japanischer-ahorn-pflege-schweiz",
    titleDe: "Japanischer Ahorn Pflege Schweiz - Acer palmatum",
    titleEn: "Japanese Maple Care Switzerland - Acer palmatum",
    descDe: "Pflege und Schnitt von japanischem Ahorn in der Schweiz: Acer palmatum, Kronenstruktur, Totholz, Licht und Feuchtigkeit.",
    descEn: "Japanese maple care in Switzerland: Acer palmatum pruning, crown structure, dead wood, light and moisture.",
    eyebrowDe: "Acer palmatum Pflege",
    eyebrowEn: "Acer palmatum care",
    h1De: "Japanischer Ahorn in der Schweiz: leicht schneiden, bevor die Krone kippt.",
    h1En: "Japanese maple in Switzerland: cut lightly before the crown loses balance.",
    introDe: "Japanische Ahorne reagieren empfindlich auf falsche Eingriffe. Zu dichter Wuchs, alte trockene Aeste und fehlende Luft im Inneren machen die Krone schwer und unruhig. Ziel ist nicht ein harter Schnitt, sondern eine lesbare, leichte Architektur.",
    introEn: "Japanese maples react sensitively to wrong cuts. Dense growth, old dry twigs and a lack of air inside make the crown heavy and restless. The goal is not a hard cut, but a readable, light architecture.",
    image: ["06_yaponski-kleny", "klen-yaponskyi-02.webp"],
    bulletsDe: ["Acer palmatum und Dissectum-Gruppe.", "Totholz, Kreuzungen und zu dichte Innenkronen entfernen.", "Form mit Respekt vor Wuchsrichtung und Jahreszeit."],
    bulletsEn: ["Acer palmatum and dissectum group.", "Remove dead wood, crossings and overly dense inner crowns.", "Shape with respect for growth direction and season."],
    faqDe: [
      ["Wann wird japanischer Ahorn geschnitten?", "Der Zeitpunkt haengt vom Ziel, Zustand und Standort ab. Deshalb entscheidet Viktor nach Fotos, nicht nach einer pauschalen Regel."],
      ["Kann man einen alten Ahorn noch retten?", "Manchmal ja. Entscheidend sind Vitalitaet, Aststruktur und ob die Krone noch sinnvoll geoeffnet werden kann."]
    ],
    faqEn: [
      ["When should Japanese maple be pruned?", "Timing depends on goal, condition and location. Viktor decides after photos, not by a generic rule."],
      ["Can an old maple still be rescued?", "Sometimes. Vitality, branch structure and whether the crown can still be opened are decisive."]
    ]
  },
  {
    slug: "kiefer-kerzen-schneiden-schweiz",
    titleDe: "Kiefer Kerzen schneiden Schweiz - Pinus richtig pflegen",
    titleEn: "Pine Candle Pruning Switzerland - Pinus Care",
    descDe: "Kiefer-Kerzen in der Schweiz richtig schneiden: Pinus thunbergii, Pinus parviflora, Timing und Fehler vermeiden.",
    descEn: "Pine candle pruning in Switzerland: Pinus thunbergii, Pinus parviflora, timing and mistake prevention.",
    eyebrowDe: "Kiefer Kerzen schneiden",
    eyebrowEn: "Pine candle pruning",
    h1De: "Kiefer-Kerzen schneiden: Timing entscheidet ueber die naechste Verzweigung.",
    h1En: "Pine candle pruning: timing decides the next branching point.",
    introDe: "Bei Kiefern ist ein falscher Schnitt oft erst spaeter sichtbar. Wer einen verholzten Jahrestrieb blind in der Mitte kappt, verliert haeufig den naechsten Verzweigungspunkt. Kerzenarbeit ist deshalb keine kosmetische Kuerzung, sondern Steuerung von Kraft und Zukunftsknospen.",
    introEn: "With pines, a wrong cut often becomes visible later. Cutting a hardened yearly shoot blindly in the middle can lose the next branching point. Candle work is not cosmetic shortening, but control of energy and future buds.",
    image: ["09_pomylky", "pomylka-svichka-02.webp"],
    bulletsDe: ["Pinus thunbergii, Pinus parviflora, Pinus sylvestris und weitere Kiefern.", "Kerzen, alte Nadeln und Knospenposition gemeinsam beurteilen.", "Keine pauschale Motorarbeit an wertvollen Kiefern."],
    bulletsEn: ["Pinus thunbergii, Pinus parviflora, Pinus sylvestris and other pines.", "Assess candles, old needles and bud positions together.", "No generic motor trimming on valuable pines."],
    faqDe: [
      ["Kann ich Kiefer-Kerzen selbst schneiden?", "Bei einfachen Baeumen vielleicht. Bei wertvollen Niwaki-Kiefern ist ein Foto-Check sinnvoll, bevor ein falscher Schnitt Jahre kostet."],
      ["Warum ist Pinus thunbergii heikel?", "Weil Timing, Knospenposition und Jahreszuwachs entscheiden, ob neue Verzweigung entsteht oder ein blinder Abschnitt bleibt."]
    ],
    faqEn: [
      ["Can I prune pine candles myself?", "For simple trees, perhaps. For valuable niwaki pines, a photo check is safer before a wrong cut costs years."],
      ["Why is Pinus thunbergii delicate?", "Because timing, bud position and yearly growth decide whether new branching forms or a blind section remains."]
    ]
  },
  {
    slug: "kosten-japanische-baumpflege-zuerich",
    titleDe: "Was kostet japanische Baumpflege in Zürich?",
    titleEn: "What Does Japanese Tree Care Cost in Zurich?",
    descDe: "Kosten fuer japanische Baumpflege in Zürich: Arbeit ab 110 CHF pro Stunde, Anfahrt ab 90 CHF, Foto-Diagnose kostenlos.",
    descEn: "Japanese tree care costs in Zurich: work from 110 CHF per hour, travel from 90 CHF, free photo diagnosis.",
    eyebrowDe: "Preise Zürich",
    eyebrowEn: "Zurich prices",
    h1De: "Was kostet japanische Baumpflege in Zürich?",
    h1En: "What does Japanese tree care cost in Zurich?",
    introDe: "Die Arbeit beginnt ab 110 CHF pro Stunde, die Anfahrt ab 90 CHF. Der Preis haengt nicht nur von der Hoehe ab, sondern von Dichte, Art, Zustand, Zugang, Risiko und davon, ob eine Form erhalten, gerettet oder neu aufgebaut werden soll.",
    introEn: "Work starts from 110 CHF per hour, travel from 90 CHF. Price depends not only on height, but also density, species, condition, access, risk and whether the form must be maintained, rescued or rebuilt.",
    image: ["07_viktor", "viktor-01.webp"],
    bulletsDe: ["Kostenlose Foto-Diagnose als erster Filter.", "Vor-Ort-Termin erst, wenn der Baum zur Arbeit passt.", "Kein Billig-Gartenunterhalt und keine Notfall-Faellarbeiten."],
    bulletsEn: ["Free photo diagnosis as the first filter.", "On-site appointment only when the tree fits the work.", "Not cheap garden maintenance and not emergency tree removal."],
    faqDe: [
      ["Warum nicht pauschal pro Baum?", "Zwei gleich hohe Baeume koennen voellig unterschiedliche Dichte, Risiken und Pflegeziele haben."],
      ["Ist die Foto-Diagnose wirklich kostenlos?", "Ja. Sie senden drei Fotos, Viktor prueft, ob eine sinnvolle Arbeit erkennbar ist."]
    ],
    faqEn: [
      ["Why not a fixed price per tree?", "Two trees of the same height can have completely different density, risk and care goals."],
      ["Is the photo diagnosis really free?", "Yes. You send three photos and Viktor checks whether meaningful work is visible."]
    ]
  }
];

const geoPages = [
  {
    slug: "zuerichsee",
    titleDe: "Niwaki Zürichsee - Gartenbonsai Pflege am See",
    titleEn: "Niwaki Lake Zurich - Garden Bonsai Care",
    descDe: "Niwaki, Gartenbonsai und japanische Baumpflege am Zürichsee: Küsnacht, Zollikon, Meilen, Herrliberg, Erlenbach, Kilchberg, Thalwil.",
    descEn: "Niwaki, garden bonsai and Japanese tree care around Lake Zurich: Küsnacht, Zollikon, Meilen, Herrliberg, Erlenbach, Kilchberg, Thalwil.",
    h1De: "Niwaki und Gartenbonsai am Zürichsee.",
    h1En: "Niwaki and garden bonsai around Lake Zurich.",
    areaLineDe: "Küsnacht, Zollikon, Meilen, Herrliberg, Erlenbach, Kilchberg, Thalwil und weitere Orte am Zürichsee.",
    areaLineEn: "Küsnacht, Zollikon, Meilen, Herrliberg, Erlenbach, Kilchberg, Thalwil and other Lake Zurich locations.",
    image: ["08_fonovi", "garden-view-chair-niwaki-01.webp"]
  },
  {
    slug: "zug",
    titleDe: "Niwaki Zug - Japanische Baumpflege und Gartenbonsai",
    titleEn: "Niwaki Zug - Japanese Tree Care and Garden Bonsai",
    descDe: "Japanische Baumpflege, Niwaki und Gartenbonsai in Zug und Umgebung. Kostenlose Foto-Diagnose vor dem Termin.",
    descEn: "Japanese tree care, niwaki and garden bonsai in Zug and surrounding areas. Free photo diagnosis before the appointment.",
    h1De: "Niwaki und japanische Baumpflege in Zug.",
    h1En: "Niwaki and Japanese tree care in Zug.",
    areaLineDe: "Zug, Baar, Cham und Umgebung nach Absprache.",
    areaLineEn: "Zug, Baar, Cham and surrounding areas by arrangement.",
    image: ["05_nivaki-khmarky", "sosna-watereri-do-pislya-16.webp"]
  },
  {
    slug: "luzern-aargau",
    titleDe: "Niwaki Luzern & Aargau - Gartenbonsai Pflege",
    titleEn: "Niwaki Lucerne and Aargau - Garden Bonsai Care",
    descDe: "Niwaki, Gartenbonsai und japanische Baumpflege in Luzern und Aargau. Für aussergewöhnliche Bäume nach Foto-Diagnose.",
    descEn: "Niwaki, garden bonsai and Japanese tree care in Lucerne and Aargau. For exceptional trees after photo diagnosis.",
    h1De: "Niwaki-Pflege in Luzern und Aargau.",
    h1En: "Niwaki care in Lucerne and Aargau.",
    areaLineDe: "Luzern, Aargau und angrenzende Orte nach Absprache.",
    areaLineEn: "Lucerne, Aargau and nearby locations by arrangement.",
    image: ["04_khvoyni", "pinus-thunbergii-krone-01.webp"]
  }
];

const discoveryPaths = [
  ...answerPages.map((page) => `/${page.slug}`),
  ...geoPages.map((page) => `/${page.slug}`)
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

function heroServiceLine() {
  return `<span class="eyebrow hero-service-line"><span class="hero-service-line-row">NIWAKI-PFLEGE | BAUMARCHITEKTUR | JAPANISCHE AHORNE | KRONENGESTALTUNG |</span><span class="hero-service-line-row">EXKLUSIVE GEHÖLZPFLEGE | <span class="hero-service-accent">TERRASSENPFLEGE</span> | <span class="hero-service-accent">GARTENPFLEGE</span></span></span>`;
}

function heroPhotoSlot({ lang = "de", label = "Niwaki im Schweizer Garten" }) {
  const variant = activeHeroVariant;
  const desktop = variant.desktop;
  const mobile = variant.mobile;
  const alt = heroVariantAlt(variant, lang, label);
  return `
    <figure class="image-slot image-slot-real hero-slot" style="--ratio:16 / 9" data-asset="${desktop}">
      <img class="hero-img-desktop" data-hero-desktop-image src="__ASSET_PREFIX__assets/img/${desktop}" alt="${alt}" loading="eager" decoding="async" width="2400" height="1350" fetchpriority="high">
      <img class="hero-img-mobile" data-hero-mobile-image src="__ASSET_PREFIX__assets/img/${mobile}" alt="${alt}" loading="eager" decoding="async" width="1200" height="1600" fetchpriority="high">
    </figure>`;
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

const twoDigit = (number) => String(number).padStart(2, "0");

const galleryExclusions = new Set([
  ...[
    "case-parviflora-after.webp",
    "case-parviflora-before.webp",
    "case-terrace-after.webp",
    "case-terrace-before.webp",
    "case-taxus-after.webp",
    "case-taxus-before.webp",
    "case-watereri-after.webp",
    "case-watereri-before.webp",
    "case-svichky-before.webp",
    "case-svichky-after.webp",
    "case-taxus-baccata-topiary-before-01.webp",
    "case-taxus-baccata-topiary-before-02.webp",
    "case-taxus-baccata-topiary-love-01.webp",
    "case-taxus-baccata-topiary-after-01.webp",
    "case-taxus-baccata-topiary-after-02.webp",
    "hecke-niwaki-arbeit-01.webp",
    "hecke-niwaki-diagnose-01.webp",
    "hecke-niwaki-nachher-01.webp",
    "hecke-niwaki-vorher-01.webp",
    "hecke-niwaki-vorher-02.webp",
    "sosna-bila-16.webp",
    "sosna-bila-20.webp",
    "sosna-bila-21.webp",
    "sosna-bila-24.webp",
    "sosna-bila-25.webp",
    "sosna-bila-26.webp"
  ].map((file) => `02_pryklady-robit/${file}`),
  ...[1, 2, 3, 4, 5, 12, 13, 14, 15, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]
    .map((number) => `02_pryklady-robit/sosna-bila-do-pislya-${twoDigit(number)}.webp`),
  ...[1, 2, 3, 4, 5].map((number) => `02_pryklady-robit/tys-${twoDigit(number)}.webp`),
  ...[6, 7, 8, 9, 10, 11, 12, 13].map((number) => `02_pryklady-robit/tys-do-pislya-${twoDigit(number)}.webp`),
  ...[1, 2, 3, 4].map((number) => `02_pryklady-robit/sosna-watereri-do-pislya-${twoDigit(number)}.webp`),
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    .map((number) => `05_nivaki-khmarky/sosna-watereri-do-pislya-${twoDigit(number)}.webp`),
  ...[1, 2, 3, 4].map((number) => `05_nivaki-khmarky/yalivets-${twoDigit(number)}.webp`),
  ...[1, 2, 3, 4].map((number) => `06_yaponski-kleny/klen-yaponskyi-${twoDigit(number)}.webp`),
  "01_hero/hero-sad-01.webp",
  "03_galereya/sosna-bila-03.webp",
  "03_galereya/sosna-bila-04.webp",
  "03_galereya/sosna-bila-05.webp",
  "03_galereya/sosna-bila-06.webp",
  "03_galereya/sosna-bila-07.webp",
  "03_galereya/sosna-bila-09.webp",
  "03_galereya/sosna-bila-10.webp",
  "03_galereya/sosna-bila-11.webp",
  "03_galereya/sosna-bila-16.webp",
  "03_galereya/sosna-bila-17.webp",
  "03_galereya/sosna-bila-18.webp",
  "03_galereya/sosna-bila-19.webp",
  "03_galereya/sosna-bila-20.webp",
  "03_galereya/sosna-girska-01.webp",
  "04_khvoyni/sosna-avstr-01.webp"
]);

function publicGalleryItems(folders) {
  return catalogItems(folders).filter((item) => !galleryExclusions.has(`${item.folder}/${item.file}`));
}

function workGalleryItems() {
  return [
    ...selectedGalleryItems("03_galereya", [
      "sosna-bila-01.webp",
      "sosna-bila-02.webp",
      "sosna-bila-08.webp",
      "sosna-bila-12.webp",
      "sosna-bila-13.webp",
      "sosna-bila-14.webp",
      "sosna-bila-15.webp"
    ]),
    ...selectedGalleryItems("02_pryklady-robit", [
      "sosna-bila-22.webp",
      "sosna-bila-23.webp"
    ]),
    ...selectedGalleryItems("05_nivaki-khmarky", ["parviflora-niwaki-01.webp"])
  ];
}

function selectedGalleryItems(folder, files) {
  return files.map((file) => photo(folder, file));
}

function gardenContextGalleryItems() {
  return [
    ...selectedGalleryItems("01_hero", ["hero-sad-02.webp"]),
    ...selectedGalleryItems("02_pryklady-robit", [
      "sosna-bila-do-pislya-02.webp",
      "sosna-bila-do-pislya-04.webp",
      "sosna-bila-do-pislya-30.webp"
    ]),
    ...selectedGalleryItems("03_galereya", ["sosna-bila-03.webp"])
  ];
}

function niwakiCloudGalleryItems() {
  return [
    ...selectedGalleryItems("03_galereya", [
      "sosna-bila-01.webp",
      "sosna-bila-02.webp",
      "sosna-bila-08.webp",
      "sosna-bila-12.webp",
      "sosna-bila-13.webp",
      "sosna-bila-14.webp",
      "sosna-bila-15.webp"
    ]),
    ...selectedGalleryItems("02_pryklady-robit", [
      "sosna-bila-06.webp",
      "sosna-bila-11.webp",
      "sosna-bila-22.webp",
      "sosna-bila-23.webp"
    ]),
    ...selectedGalleryItems("05_nivaki-khmarky", ["parviflora-niwaki-01.webp"])
  ];
}

function taxusFormGalleryItems() {
  return [
    ...selectedGalleryItems("05_nivaki-khmarky", [
      "yalivets-01.webp",
      "yalivets-03.webp"
    ])
  ];
}

function coniferGalleryItems() {
  return [
    ...selectedGalleryItems("04_khvoyni", [
      "sosna-chorna-01.webp",
      "sosna-chorna-02.webp",
      "sosna-chorna-03.webp",
      "sosna-chorna-04.webp",
      "sosna-chorna-05.webp",
      "sosna-chorna-06.webp",
    ])
  ];
}

function mapleGalleryItems() {
  return selectedGalleryItems("06_yaponski-kleny", [
    "klen-yaponskyi-02.webp"
  ]);
}

function viktorGalleryItems() {
  return [
    ...selectedGalleryItems("07_viktor", [
      "viktor-10.webp",
      "viktor-03.webp",
      "viktor-07.webp"
    ])
  ];
}

function detailGalleryItems() {
  return [
    ...selectedGalleryItems("02_pryklady-robit", [
      "case-svichky-before.webp",
      "case-svichky-after.webp"
    ]),
    ...selectedGalleryItems("09_pomylky", [
      "pomylka-svichka-01.webp",
      "pomylka-svichka-02.webp"
    ]),
    ...selectedGalleryItems("03_galereya", ["sosna-bila-04.webp"]),
    ...selectedGalleryItems("02_pryklady-robit", ["sosna-bila-20.webp"])
  ];
}

function hedgeTrimmerMistakeBlock(lang = "de") {
  const copyByLang = {
    de: {
      title: "Viktors Beispiel: Taxus nach elektrischer Heckenschere.",
      body: "Viktors Hinweis zu diesen Fotos ist klar: Das ist Taxus baccata nach dem Schnitt mit gewöhnlichen elektrischen Heckenscheren. Diese zwei Bilder zeigen den technischen Unterschied: man sieht schlecht abgetrennte, herausstehende Triebe und eine unruhige Oberfläche. Mit einer Topiarschere wird der Schnitt vollständig, sauber und gleichmässig geführt.",
      why: "Der Unterschied ist kritisch: Eine elektrische oder benzinbetriebene Heckenschere fährt schnell über die Oberfläche und kappt viele Triebe an zufälligen Stellen. Beim Taxus bleiben helle Stummel, gequetschte Spitzen und eine unruhige Fläche zurück; der Strauch wirkt zwar kurz geschnitten, aber nicht wirklich geformt. Mit scharfen Hand-Topiarscheren entscheide ich jeden Schnitt, lege die Linie sauber, schone Knospen und vermeide diese verletzte, mechanische Aussenhaut.",
      label1: "Taxus baccata mit herausstehenden Triebspitzen nach elektrischem Schnitt",
      label2: "Taxus baccata: unruhige Oberfläche nach grober Motor-Heckenschere"
    },
    en: {
      title: "Viktor's example: Taxus after an electric hedge trimmer.",
      body: "Viktor's note on these photos is simple: this is Taxus baccata after cutting with ordinary electric hedge trimmers. These two images show the technical difference: badly cut shoots stick out and the surface stays restless. With topiary scissors, the cut is complete, clean and even.",
      why: "That difference is critical. An electric or petrol hedge trimmer runs quickly over the outside and cuts many shoots at random points. On Taxus it leaves pale stubs, crushed tips and a restless surface; the shrub may look shorter, but it is not truly shaped. With sharp hand topiary scissors I decide each cut, set the line cleanly, protect future buds and avoid this wounded mechanical outer shell.",
      label1: "Taxus baccata with protruding shoot tips after electric cutting",
      label2: "Taxus baccata with uneven surface after a rough motor hedge trimmer"
    },
    uk: {
      title: "Приклад Віктора: Taxus після електричних ножиць.",
      body: "Нотатка Віктора до цих фото проста: це Taxus baccata після стрижки звичайними електричними ножицями. Ці два кадри показують технічну різницю: стирчать погано обрізані пагони, поверхня лишається неспокійною. При обрізці топіарними ножицями зріз всюди повний, чистий і рівномірний.",
      why: "Це критична різниця. Електричні або бензинові ножиці швидко проходять по поверхні й зрізають багато пагонів у випадкових місцях. На Taxus після цього лишаються світлі пеньки, зім'яті кінчики і неспокійна поверхня: кущ ніби став коротшим, але форма не стала чистою. Ручними гострими топіарними ножицями я вирішую кожен зріз окремо, веду лінію рівно, бережу майбутні бруньки і не створюю травмовану механічну оболонку.",
      label1: "Taxus baccata зі стирчачими пагонами після електричного зрізу",
      label2: "Taxus baccata з нерівною поверхнею після грубих моторних ножиць"
    }
  };
  const copy = copyByLang[lang] || copyByLang.de;
  return `
    <h2>${copy.title}</h2>
    <p>${copy.body}</p>
    <div class="gallery-teaser taxus-mistake-grid">
      ${photoSlot({ folder: "09_pomylky", file: "taxus-heckenschere-fehler-01.webp", lang, label: copy.label1, ratio: "4 / 3" })}
      ${photoSlot({ folder: "09_pomylky", file: "taxus-heckenschere-fehler-02.webp", lang, label: copy.label2, ratio: "4 / 3" })}
    </div>
    <p>${copy.why}</p>`;
}

function pinusNigraFeatureSection(lang = "de") {
  const copyByLang = {
    de: {
      eyebrow: "Pinus nigra / Sanierung",
      title: "Schwarzkiefer nach saisonaler Pflege.",
      text: "Diese zwei Bilder zeigen denselben Fall ohne Vorher-Foto: eine geschwächte Pinus nigra nach selektiver Auslichtung, Reinigung und Kronenpflege.",
      more: "Mehr lesen",
      viktor: "Viktors Notiz: Vorher-Fotos fehlen, aber der Baum war schwer krank. Äste und Nadeln im Inneren waren zu etwa 40 Prozent bereits abgestorben. Bei der Pflege wurden rund 40 Prozent der Nadelmasse entfernt; danach hat der Baum wieder deutlich bessere Chancen auf ein gesundes und langes Leben.",
      why: "Der Punkt ist nicht, die Kiefer klein zu schneiden. Bei Pinus nigra muss totes Material raus, dichte Zonen müssen Licht und Luft bekommen, und gleichzeitig darf nicht zu viel lebende Masse verloren gehen. Alte innere Bereiche treiben ohne Licht nur schwach nach. Darum wird selektiv gearbeitet: genug öffnen, damit die Krone atmen kann, aber genug aktive Nadeln behalten, damit der Baum Kraft für neue Knospen hat.",
      label1: "Viktor neben der Schwarzkiefer Pinus nigra nach saisonaler Pflege",
      label2: "Schwarzkiefer Pinus nigra mit geöffneter Krone nach Reinigung"
    },
    en: {
      eyebrow: "Pinus nigra / recovery care",
      title: "Black pine after seasonal care.",
      text: "These two images show one case without a before photo: a weakened Pinus nigra after selective thinning, cleaning and crown care.",
      more: "Read more",
      viktor: "Viktor's note: there are no before photos, but the tree was seriously weakened. Branches and needles inside the crown were already about 40 percent dead. Around 40 percent of the needle mass was removed during the work; after that, the tree has a much better chance of a healthy, long life.",
      why: "The goal is not to cut the pine smaller. With Pinus nigra, dead material has to come out, dense zones need light and air, and too much living mass must not be removed at once. Old inner areas do not reliably restart without light. That is why the work is selective: open enough for the crown to breathe, but keep enough active needles so the tree still has energy for future buds.",
      label1: "Viktor beside the black pine Pinus nigra after seasonal care",
      label2: "Black pine Pinus nigra with opened crown after cleaning"
    },
    uk: {
      eyebrow: "Pinus nigra / відновлення",
      title: "Чорна австрійська сосна після сезонного догляду.",
      text: "Ці два фото показують один кейс без фото «до»: ослаблена Pinus nigra після вибіркового прорідження, чистки і догляду за кроною.",
      more: "Читати більше",
      viktor: "Нотатка Віктора: фото до стрижки немає, але дерево було важко хворе. Гілки та хвоя всередині приблизно на 40% були вже мертвими. Під час догляду було видалено близько 40% хвої; після цього дерево має значно більші шанси на здорове й довге життя.",
      why: "Суть не в тому, щоб просто зробити сосну меншою. У Pinus nigra треба забрати мертвий матеріал, відкрити загущені зони для світла й повітря і водночас не зняти забагато живої маси. Старі внутрішні ділянки без світла погано запускають новий ріст. Тому робота має бути вибірковою: відкрити крону настільки, щоб вона дихала, але залишити достатньо активної хвої для сили й майбутніх бруньок.",
      label1: "Віктор біля чорної сосни Pinus nigra після сезонного догляду",
      label2: "Чорна сосна Pinus nigra з відкритою кроною після чистки"
    }
  };
  const copy = copyByLang[lang] || copyByLang.de;
  return `
  <section class="section pinus-nigra-feature">
    <div class="section-head"><span class="eyebrow">${copy.eyebrow}</span><h2>${copy.title}</h2><p>${copy.text}</p></div>
    <div class="pinus-nigra-grid">
      ${photoSlot({ folder: "04_khvoyni", file: "sosna-avstr-01.webp", lang, label: copy.label1, ratio: "3 / 4" })}
      ${photoSlot({ folder: "04_khvoyni", file: "sosna-avstr-02.webp", lang, label: copy.label2, ratio: "3 / 4" })}
    </div>
    <details class="gallery-readmore">
      <summary>${copy.more}</summary>
      <div class="gallery-readmore-body">
        <p>${copy.viktor}</p>
        <p>${copy.why}</p>
      </div>
    </details>
  </section>`;
}

function wintergoldFeatureSection(lang = "de") {
  const copyByLang = {
    de: {
      eyebrow: "Pinus mugo Wintergold / Pflege",
      title: "Herbstreinigung im Inneren der Krone.",
      text: "Diese Bilder sind kein strenger Vorher-/Nachher-Fall. Sie zeigen die Pflege einer Pinus mugo 'Wintergold': alte Nadeln und trockene Zweige werden aus der Kronenmitte entfernt.",
      more: "Mehr lesen",
      viktor: "Viktors Notiz: Das ist eine Herbstreinigung der Kronenmitte einer Pinus mugo Wintergold. Durch das Entfernen alter trockener Nadeln und trockener Äste kann der Baum seine Wirkung behalten, und Pilze können sich nicht so leicht ausbreiten.",
      why: "Gerade bei dichten Bergkiefern sammelt sich im Inneren trockenes Material. Es hält Feuchtigkeit, nimmt der Krone Luft und verdeckt tote Zweige. Die Reinigung ist deshalb keine kosmetische Kleinigkeit, sondern Pflege für Luftzirkulation, Licht und langfristige Gesundheit. Bei 'Wintergold' bleibt die gelbliche Winterfärbung erhalten; entfernt wird vor allem altes, trockenes und krankheitsförderndes Material.",
      label1: "Pinus mugo Wintergold: Blick in die gereinigte Kronenmitte",
      label2: "Pinus mugo Wintergold mit gelber Winterfärbung nach der Pflege",
      label3: "Pinus mugo Wintergold im Gartenkontext nach der Herbstreinigung"
    },
    en: {
      eyebrow: "Pinus mugo Wintergold / care",
      title: "Autumn cleaning inside the crown.",
      text: "These images are not a strict before/after case. They document care for a Pinus mugo 'Wintergold': old needles and dry branches are removed from the middle of the crown.",
      more: "Read more",
      viktor: "Viktor's note: this is autumn cleaning inside the crown of a Pinus mugo Wintergold. By removing old dry needles and dry branches, the tree can keep its appearance, and fungi are less likely to spread.",
      why: "Dense mountain pines collect dry material inside the crown. That material holds moisture, blocks air movement and hides dead twigs. Cleaning it out is not just cosmetic; it supports airflow, light and long-term health. On 'Wintergold', the yellow winter colour remains part of the cultivar. What is removed is old, dry material that can encourage disease pressure.",
      label1: "Pinus mugo Wintergold: view into the cleaned crown centre",
      label2: "Pinus mugo Wintergold with yellow winter colour after care",
      label3: "Pinus mugo Wintergold in the garden context after autumn cleaning"
    },
    uk: {
      eyebrow: "Pinus mugo Wintergold / догляд",
      title: "Осіння чистка середини крони.",
      text: "Це не строгий кейс «до/після». Фото показують догляд за Pinus mugo 'Wintergold': із середини крони прибирається стара суха хвоя та сухі гілки.",
      more: "Читати більше",
      viktor: "Нотатка Віктора: це осіння чистка середини крони сосни Pinus mugo Wintergold. Завдяки видаленню старої сухої хвої та сухих гілок дерево буде й надалі мати такий вигляд, а грибки не будуть розповсюджуватись.",
      why: "У щільних гірських соснах всередині крони швидко накопичується сухий матеріал. Він тримає вологу, забирає повітря і ховає сухі гілки. Тому така чистка важлива не тільки для вигляду, а й для вентиляції, світла і довгого здоров'я дерева. У 'Wintergold' жовтий зимовий колір є нормальною особливістю сорту; прибирається саме старий сухий матеріал, який підсилює ризик грибків.",
      label1: "Pinus mugo Wintergold: очищена середина крони",
      label2: "Pinus mugo Wintergold із жовтим зимовим забарвленням після догляду",
      label3: "Pinus mugo Wintergold у садовому контексті після осінньої чистки"
    }
  };
  const copy = copyByLang[lang] || copyByLang.de;
  return `
  <section class="section wintergold-feature">
    <div class="section-head"><span class="eyebrow">${copy.eyebrow}</span><h2>${copy.title}</h2><p>${copy.text}</p></div>
    <div class="wintergold-grid">
      ${photoSlot({ folder: "04_khvoyni", file: "sosna-girska-01.webp", lang, label: copy.label1, ratio: "3 / 4", className: "wintergold-portrait" })}
      ${photoSlot({ folder: "04_khvoyni", file: "sosna-girska-02.webp", lang, label: copy.label2, ratio: "4 / 3" })}
      ${photoSlot({ folder: "04_khvoyni", file: "sosna-girska-03.webp", lang, label: copy.label3, ratio: "4 / 3" })}
    </div>
    <details class="gallery-readmore">
      <summary>${copy.more}</summary>
      <div class="gallery-readmore-body">
        <p>${copy.viktor}</p>
        <p>${copy.why}</p>
      </div>
    </details>
  </section>`;
}

function pumilioFeatureSection(lang = "de") {
  const copyByLang = {
    de: {
      eyebrow: "Pinus mugo 'Pumilio' / Pilzkrone",
      title: "Bergkiefer mit ruhiger Pilzkrone.",
      text: "Ein einzelnes Portfoliofoto, kein Vorher-/Nachher-Fall: Pinus mugo 'Pumilio' wird als kompakte, schirmartige Krone in einer grossen Schale aufgebaut.",
      more: "Mehr lesen",
      viktor: "Viktors Notiz: Das ist Pinus mugo 'Pumilio'. Die Arbeit ist eine künstlerisch-architektonische Kronenformung in Form eines Pilzes.",
      why: "Bei Pumilio entsteht die Wirkung nicht durch einen flachen Heckenschnitt. Die Krone braucht eine ruhige Aussenlinie, darunter aber klare Aststruktur, Luft und Licht. Die jungen Triebe werden selektiv geführt, damit die runde Pilzform dicht wirkt, innen aber nicht erstickt.",
      detail: "Wichtig ist auch der Massstab der Schale: Stammbasis, Astfächer und Schirmkante müssen zusammenpassen. So bleibt die Pflanze kompakt und skulptural, ohne wie ein harter grüner Block zu wirken.",
      label: "Pinus mugo Pumilio mit künstlerisch geformter Pilzkrone in grosser Schale"
    },
    en: {
      eyebrow: "Pinus mugo 'Pumilio' / mushroom crown",
      title: "Mountain pine with a calm mushroom-shaped crown.",
      text: "A single portfolio image, not a before/after case: Pinus mugo 'Pumilio' is shaped as a compact, umbrella-like crown in a large planter.",
      more: "Read more",
      viktor: "Viktor's note: this is Pinus mugo 'Pumilio'. The work is an artistic architectural crown formation in the shape of a mushroom.",
      why: "With Pumilio, the effect does not come from cutting the surface flat like a hedge. The crown needs a calm outer line, but underneath it still needs clear branch structure, light and air. Young shoots are guided selectively so the rounded form stays dense without suffocating inside.",
      detail: "The scale of the planter matters too: trunk base, branch fan and crown edge have to work together. That keeps the plant compact and sculptural instead of turning it into a hard green block.",
      label: "Pinus mugo Pumilio with an artistically shaped mushroom crown in a large planter"
    },
    uk: {
      eyebrow: "Pinus mugo 'Pumilio' / грибоподібна крона",
      title: "Гірська сосна Pumilio з м'якою грибоподібною кроною.",
      text: "Один портфоліо-кадр, не кейс «до/після»: Pinus mugo 'Pumilio' сформована як компактна, парасолькова крона у великій чаші.",
      more: "Читати більше",
      viktor: "Нотатка Віктора: це Pinus mugo Pumilio. Робота по художньо-архітектурному формуванню крони у вигляді гриба.",
      why: "У Pumilio такий ефект не робиться плоскою стрижкою, як живопліт. Кроні потрібна спокійна зовнішня лінія, але всередині мають залишатися читабельні гілки, світло й повітря. Молоді пагони ведуться вибірково, щоб округла форма була щільною, але не задихалася всередині.",
      detail: "Важливий і масштаб чаші: основа стовбура, розкриття гілок і край крони мають працювати разом. Так рослина лишається компактною й скульптурною, а не перетворюється на твердий зелений блок.",
      label: "Pinus mugo Pumilio з художньо сформованою грибоподібною кроною у великій чаші"
    }
  };
  const copy = copyByLang[lang] || copyByLang.de;
  return `
  <section class="section pumilio-feature">
    <div class="section-head"><span class="eyebrow">${copy.eyebrow}</span><h2>${copy.title}</h2><p>${copy.text}</p></div>
    <div class="pumilio-feature-layout">
      ${photoSlot({ folder: "04_khvoyni", file: "pinus-mugo-pumilio-pilzkrone-01.webp", lang, label: copy.label, ratio: "3 / 4" })}
      <div class="pumilio-feature-copy">
        <p>${copy.viktor}</p>
        <details class="gallery-readmore">
          <summary>${copy.more}</summary>
          <div class="gallery-readmore-body">
            <p>${copy.why}</p>
            <p>${copy.detail}</p>
          </div>
        </details>
      </div>
    </div>
  </section>`;
}

function pinusThunbergiiFeatureSection(lang = "de") {
  const copyByLang = {
    de: {
      eyebrow: "Pinus thunbergii / Kronenarchitektur",
      title: "Japanische Schwarzkiefer als architektonische Niwaki-Krone.",
      text: "Diese Serie ist kein Vorher-/Nachher-Fall. Sie zeigt eine künstlerisch-architektonische Arbeit an der Krone einer japanischen Schwarzkiefer: Auslichten und Kürzen junger Kerzen für eine gleichmässigere Kraftverteilung im Baum.",
      more: "Mehr lesen",
      viktor: "Viktors Notiz: Künstlerisch-architektonische Arbeit an der Krone der japanischen Schwarzkiefer Pinus thunbergii. Verwendet wird das Auslichten der Krone und das Einkürzen junger Kerzen, damit sich die Kraft gleichmässiger über den Baum verteilt.",
      why: "Wichtig ist die Balance: zu dichte Wolken nehmen innen Licht und Luft, zu harter Schnitt nimmt der Kiefer Energie. Deshalb werden starke Zonen beruhigt, schwächere Bereiche geschützt und die jungen Kerzen selektiv geführt. So bleibt die Krone lesbar, luftig und lebendig, ohne ihre Kraft zu verlieren.",
      label1: "Japanische Schwarzkiefer Pinus thunbergii mit architektonisch aufgebauter Niwaki-Krone",
      label2: "Pinus thunbergii nach Kronenarbeit mit klaren Wolkenetagen",
      label3: "Detail der japanischen Schwarzkiefer nach Auslichtung und Kerzenarbeit"
    },
    en: {
      eyebrow: "Pinus thunbergii / crown architecture",
      title: "Japanese black pine with an architectural niwaki crown.",
      text: "This series is not a before/after case. It shows artistic architectural work on the crown of a Japanese black pine: thinning and shortening young candles to distribute strength more evenly through the tree.",
      more: "Read more",
      viktor: "Viktor's note: artistic architectural work on the crown of the Japanese black pine Pinus thunbergii. The method combines crown thinning and shortening young candles so the tree's strength is distributed more evenly.",
      why: "The critical point is balance: dense pads block light and air inside the crown, while a cut that is too hard removes too much energy from the pine. Strong zones are calmed, weaker areas are protected and young candles are guided selectively. The result is a readable, airy and living crown that keeps its strength.",
      label1: "Japanese black pine Pinus thunbergii with an architectural niwaki crown",
      label2: "Pinus thunbergii after crown work with clear cloud pads",
      label3: "Detail of Japanese black pine after thinning and candle work"
    },
    uk: {
      eyebrow: "Pinus thunbergii / архітектура крони",
      title: "Японська чорна сосна з архітектурною кроною Niwaki.",
      text: "Це не кейс «до/після». Серія показує художньо-архітектурну роботу по кроні сосни японської чорної Pinus thunbergii: прорідження крони і укорочення молодих свічок для рівномірного розподілу сили по дереву.",
      more: "Читати більше",
      viktor: "Нотатка Віктора: художньо-архітектурна робота по кроні сосни японської чорної Pinus thunbergii. Використовується метод проріджування крони та укорочення молодих свічок з метою рівномірного розподілу сили по дереву.",
      why: "Важливо втримати баланс: загущені хмари забирають світло й повітря всередині, а надто жорсткий зріз забирає в сосни енергію. Тому сильні зони заспокоюються, слабші ділянки захищаються, а молоді свічки ведуться вибірково. Так крона залишається читабельною, повітряною і живою, без втрати сили.",
      label1: "Сосна японська чорна Pinus thunbergii з архітектурною кроною Niwaki",
      label2: "Pinus thunbergii після роботи по кроні з читабельними хмарними ярусами",
      label3: "Деталь сосни японської чорної після прорідження і роботи зі свічками"
    }
  };
  const copy = copyByLang[lang] || copyByLang.de;
  return `
  <section class="section pinus-thunbergii-feature">
    <div class="section-head"><span class="eyebrow">${copy.eyebrow}</span><h2>${copy.title}</h2><p>${copy.text}</p></div>
    <div class="pinus-thunbergii-grid">
      ${photoSlot({ folder: "04_khvoyni", file: "pinus-thunbergii-krone-01.webp", lang, label: copy.label1, ratio: "3 / 4" })}
      ${photoSlot({ folder: "04_khvoyni", file: "pinus-thunbergii-krone-02.webp", lang, label: copy.label2, ratio: "3 / 4" })}
      ${photoSlot({ folder: "04_khvoyni", file: "pinus-thunbergii-krone-03.webp", lang, label: copy.label3, ratio: "3 / 4" })}
    </div>
    <details class="gallery-readmore">
      <summary>${copy.more}</summary>
      <div class="gallery-readmore-body">
        <p>${copy.viktor}</p>
        <p>${copy.why}</p>
      </div>
    </details>
  </section>`;
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

function galleryPhotoSection(copy, items, lang = "de", options = {}) {
  if (!items.length) return "";
  const gridClass = ["gallery-real-grid", options.gridClass].filter(Boolean).join(" ");
  return `
  <section class="section">
    <div class="section-head"><span class="eyebrow">${copy.eyebrow}</span><h2>${copy.title}</h2><p>${copy.text}</p></div>
    <div class="${gridClass}">${photoGallery(items, lang, items.length, { eagerCount: 0, highPriorityCount: 0 })}</div>
  </section>`;
}

const workPhoto = (file, position = "center center") => ({ folder: "02_pryklady-robit", file, position });
const workPhotos = (files, position = "center center") => files.map((file) => workPhoto(file, position));
const cloudPhoto = (file, position = "center center") => ({ folder: "05_nivaki-khmarky", file, position });
const galleryPhotoFrame = (file, position = "center center") => ({ folder: "03_galereya", file, position });
const galleryPhotoFrames = (files, position = "center center") => files.map((file) => galleryPhotoFrame(file, position));

const watereriWorkSeries = {
  before: [
    cloudPhoto("sosna-watereri-do-pislya-11.webp", "center center"),
    cloudPhoto("sosna-watereri-do-pislya-13.webp", "center center")
  ],
  after: [
    cloudPhoto("sosna-watereri-do-pislya-09.webp", "center center"),
    cloudPhoto("sosna-watereri-do-pislya-10.webp", "center center")
  ]
};

function watereriStage(title, text, images, label, lang = "de") {
  const frames = images.map((image) =>
    caseImage(image, label, lang, "eager", `${label}: ${title}`)
  ).join("");
  return `<article class="watereri-stage">
      <div class="watereri-stage-copy"><h3>${title}</h3><p>${text}</p></div>
      <div class="watereri-photo-grid">${frames}</div>
    </article>`;
}

function watereriWorkSeriesBlock(lang = "de") {
  const copyByLang = {
    de: {
      eyebrow: "Watereri-Pflege",
      title: "Pinus sylvestris 'Watereri': Detailarbeit und fertige Wirkung.",
      text: "Diese Bilder stehen nicht als strenges Vorher/Nachher oben. Sie zeigen die von Viktor beschriebene Handarbeit an Watereri: Dichte, Kerzen und Schnittpunkte lesen, dann die Wolken öffnen und die Silhouette beruhigen.",
      beforeTitle: "Dichte lesen",
      beforeText: "Nah dran: dichte Nadeln, Kerzen und Triebe, die vor der Formarbeit gelesen und selektiv gekürzt werden.",
      afterTitle: "Geöffnete Wirkung",
      afterText: "Zwei Ergebniswinkel: die Wolken sind getrennt, die Krone wirkt leichter und die Form bleibt ruhig.",
      beforeLabel: "Detail",
      afterLabel: "Wirkung"
    },
    en: {
      eyebrow: "Watereri care",
      title: "Pinus sylvestris 'Watereri': detail work and finished effect.",
      text: "These images do not sit in the strict before/after block. They show Viktor's hand work on Watereri: reading density, candles and cut points, then opening the clouds and calming the silhouette.",
      beforeTitle: "Reading density",
      beforeText: "Close work: dense needles, candles and shoots that are read and selectively shortened before shaping.",
      afterTitle: "Opened effect",
      afterText: "Two result angles: the cloud pads are separated, the crown is lighter and the form reads calmly.",
      beforeLabel: "Detail",
      afterLabel: "Effect"
    },
    uk: {
      eyebrow: "Догляд Watereri",
      title: "Pinus sylvestris 'Watereri': детальна робота і готовий ефект.",
      text: "Ці кадри не стоять у строгому блоці до/після. Вони показують роботу Віктора з Watereri: прочитати густоту, свічки й точки зрізу, потім відкрити хмари та заспокоїти силует.",
      beforeTitle: "Прочитати густоту",
      beforeText: "Крупний план: густа хвоя, свічки й пагони, які перед формуванням треба прочитати та вибірково скоротити.",
      afterTitle: "Відкритий ефект",
      afterText: "Два ракурси результату: хмари розділені, крона легша, форма читається спокійно.",
      beforeLabel: "Деталь",
      afterLabel: "Ефект"
    }
  };
  const copy = copyByLang[lang] || copyByLang.de;
  return `
  <section class="section watereri-series" id="watereri-series">
    <div class="section-head"><span class="eyebrow">${copy.eyebrow}</span><h2>${copy.title}</h2><p>${copy.text}</p></div>
    <div class="watereri-stage-grid">
      ${watereriStage(copy.beforeTitle, copy.beforeText, watereriWorkSeries.before, copy.beforeLabel, lang)}
      ${watereriStage(copy.afterTitle, copy.afterText, watereriWorkSeries.after, copy.afterLabel, lang)}
    </div>
  </section>`;
}

const connectedGallerySeries = [
  {
    id: "parviflora-house-line",
    images: galleryPhotoFrames([
      "sosna-bila-20.webp",
      "sosna-bila-19.webp"
    ]),
    labels: {
      de: ["Dicht", "Geöffnet"],
      uk: ["Густо", "Відкрито"],
      en: ["Dense", "Opened"]
    },
    title: {
      de: "Pinus parviflora am Haus: dichter Austrieb und ruhigere Wolkenlinie.",
      uk: "Pinus parviflora біля дому: густий приріст і спокійніша хмарна лінія.",
      en: "Pinus parviflora beside the house: dense growth and a calmer cloud line."
    },
    species: {
      de: "Japanische Weisskiefer - Pinus parviflora",
      uk: "Японська біла сосна - Pinus parviflora",
      en: "Japanese white pine - Pinus parviflora"
    },
    summary: {
      de: "Die Gruppe zeigt denselben Arbeitskontext am Haus: dichter Austrieb, unruhige Aussenlinie und die geöffnetere, sauberere Wolkenform nach Handarbeit.",
      uk: "Група показує один робочий контекст біля дому: густий приріст, неспокійну зовнішню лінію і відкритішу, чистішу хмарну форму після ручної роботи.",
      en: "The group shows one work context beside the house: dense growth, a restless outer line and the opened, cleaner cloud form after hand work."
    },
    done: {
      de: "Der junge Austrieb wurde selektiv zurückgenommen, die Polster wurden geöffnet und die untere Linie so beruhigt, dass der Baum wieder klar neben Wand und Kies steht.",
      uk: "Молодий приріст вибірково скорочено, подушки відкрито, а нижню лінію заспокоєно так, щоб дерево знову чітко читалося біля стіни й гравію.",
      en: "Young growth was selectively reduced, the pads were opened and the lower line was calmed so the tree reads clearly beside the wall and gravel again."
    }
  },
  {
    id: "parviflora-boxed-crown",
    images: galleryPhotoFrames([
      "sosna-bila-05.webp",
      "sosna-bila-06.webp"
    ]),
    labels: {
      de: ["Ansicht 1", "Ansicht 2"],
      uk: ["Ракурс 1", "Ракурс 2"],
      en: ["View 1", "View 2"]
    },
    title: {
      de: "Pinus parviflora im Holzkasten: niedrige Krone, Standort und Proportion.",
      uk: "Pinus parviflora у дерев'яному контейнері: низька крона, місце і пропорція.",
      en: "Pinus parviflora in a wooden box: low crown, setting and proportion."
    },
    species: {
      de: "Japanische Weisskiefer - Pinus parviflora",
      uk: "Японська біла сосна - Pinus parviflora",
      en: "Japanese white pine - Pinus parviflora"
    },
    summary: {
      de: "Die Serie erklärt, warum ein grosser Gartenbonsai nicht nur frontal bewertet wird: Höhe, Kasten, Nachbarpflanzen und Blickrichtung gehören zusammen.",
      uk: "Серія пояснює, чому великий садовий бонсай не оцінюється тільки фронтально: висота, контейнер, сусідні рослини і напрям погляду працюють разом.",
      en: "The series explains why a large garden bonsai is not judged only from the front: height, container, surrounding plants and viewing direction belong together."
    },
    done: {
      de: "Die Form wurde so gelesen, dass die unteren Wolken nicht drücken, die oberen Ebenen sichtbar bleiben und der Baum am Standort Ruhe bekommt.",
      uk: "Форму прочитано так, щоб нижні хмари не тиснули, верхні яруси залишались видимими, а дерево на місці виглядало спокійно.",
      en: "The form was read so the lower clouds do not feel heavy, the upper layers stay visible and the tree gains calm in its setting."
    }
  },
  {
    id: "parviflora-work-context",
    images: galleryPhotoFrames([
      "sosna-bila-11.webp",
      "sosna-bila-09.webp",
      "sosna-bila-10.webp"
    ]),
    labels: {
      de: ["Dicht", "Geöffnet", "Wirkung"],
      uk: ["Густо", "Відкрито", "Ефект"],
      en: ["Dense", "Opened", "Effect"]
    },
    title: {
      de: "Pinus parviflora: dichte Krone, getrennte Wolken, fertige Wirkung.",
      uk: "Pinus parviflora: густа крона, розділені хмари, готовий ефект.",
      en: "Pinus parviflora: dense crown, separated clouds, finished effect."
    },
    species: {
      de: "Japanische Weisskiefer - Pinus parviflora",
      uk: "Японська біла сосна - Pinus parviflora",
      en: "Japanese white pine - Pinus parviflora"
    },
    summary: {
      de: "Diese Gruppe bleibt eine verbundene Arbeitsserie, nicht der obere Beweisblock: dichter Zustand, geöffnete Form und Wirkung aus dem zweiten Winkel.",
      uk: "Ця група лишається пов'язаною робочою серією, не верхнім доказовим блоком: густий стан, відкрита форма і ефект з другого ракурсу.",
      en: "This stays a connected work series, not the top proof block: dense state, opened form and the effect from a second angle."
    },
    done: {
      de: "Übervolle Partien wurden selektiv geöffnet, junge Triebe reduziert und die Wolken so getrennt, dass die Form nicht flach wirkt.",
      uk: "Переповнені частини вибірково відкрито, молодий приріст скорочено, а хмари розділено так, щоб форма не виглядала пласкою.",
      en: "Overfull areas were selectively opened, young growth was reduced and the clouds were separated so the form does not look flat."
    }
  },
  {
    id: "tall-pine-three-views",
    images: [
      { folder: "02_pryklady-robit", file: "sosna-bila-24.webp" },
      { folder: "02_pryklady-robit", file: "sosna-bila-25.webp" },
      { folder: "02_pryklady-robit", file: "sosna-bila-26.webp" }
    ],
    labels: {
      de: ["Ansicht 1", "Ansicht 2", "Ansicht 3"],
      uk: ["Ракурс 1", "Ракурс 2", "Ракурс 3"],
      en: ["View 1", "View 2", "View 3"]
    },
    title: {
      de: "Hohe Kiefer als Niwaki: ein Solitär aus drei Blickwinkeln.",
      uk: "Висока сосна-нівакі: один солітер із трьох ракурсів.",
      en: "Tall pine niwaki: one solitaire from three angles."
    },
    species: {
      de: "Formkiefer (Niwaki) - Garten-Solitär",
      uk: "Формована сосна (нівакі) - садовий солітер",
      en: "Shaped pine (niwaki) - garden solitaire"
    },
    summary: {
      de: "Kein Vorher/Nachher, sondern derselbe Baum aus verschiedenen Seiten: Stammbewegung, Höhe und wie der Solitär den Raum am Zaun hält.",
      uk: "Це не до/після, а одне й те саме дерево з різних боків: рух стовбура, висота й те, як солітер тримає простір біля паркана.",
      en: "Not before/after but the same tree from different sides: trunk movement, height and how the solitaire holds the space by the fence."
    },
    done: {
      de: "Ein Solitär aus mehreren Blickwinkeln gezeigt: die Etagenpolster sind getrennt, die Silhouette bleibt aus jeder Richtung ruhig.",
      uk: "Один солітер показано з кількох ракурсів: ярусні подушки розділені, силует читається спокійно з будь-якого боку.",
      en: "One solitaire shown from several angles: the layered pads are separated and the silhouette stays calm from every side."
    }
  }
];

function watereriTwoTreesFeatureSection(lang = "de") {
  const copyByLang = {
    de: {
      eyebrow: "Pinus sylvestris 'Watereri' / Wolkenpflege",
      title: "Zwei Watereri, gleiche Pflegeaufgabe.",
      text: "Diese Serie ist kein strenger Vorher-/Nachher-Fall. Sie zeigt zwei verschiedene Pinus sylvestris 'Watereri': einmal die Arbeit im Detail, einmal die ganze Krone im Terrassengarten.",
      more: "Mehr lesen",
      viktor: "Viktors Notiz: Das sind zwei verschiedene Bäume. Beide sind Pinus sylvestris 'Watereri', und die Arbeit ist dieselbe: Wolkenpflege, damit die Schappen nicht zu stark verdichten, keine stehende Feuchtigkeit halten und Pilzkrankheiten weniger Chancen bekommen. Für diese Kiefer ist das eine der wichtigsten Pflegemassnahmen und sollte je nach Wuchs mindestens alle 2-3 Jahre kontrolliert werden.",
      value: "Bei Watereri reicht ein runder Aussenschnitt nicht. Ich lese die Dichte jeder Wolke: wo junge Triebe bleiben, wo Luft hineinkommen muss und wo die Krone innen nicht dunkel werden darf. So bleibt der Baum kompakt, aber lebendig.",
      danger: "Wenn die Wolken nur aussen geschlossen werden, sammelt sich innen Feuchtigkeit. Dann sterben innere Nadeln und feine Zweige ab, die Polster werden schwer und Pilzdruck nimmt zu. Die saubere Arbeit ist deshalb selektiv, langsam und mit Blick auf die nächsten Jahre.",
      tree1Title: "Baum 1: Dichte am jungen Austrieb lesen.",
      tree1Text: "Die Nahaufnahmen zeigen, wie fein entschieden wird: nicht alles wird gekürzt, sondern starke und zu dichte Zonen werden geöffnet.",
      tree2Title: "Baum 2: dieselbe Logik an der ganzen Krone.",
      tree2Text: "Am zweiten Baum sieht man die Wirkung im Massstab: Wolkenpolster bleiben lesbar, aber Licht und Luft müssen zwischen den Etagen arbeiten können.",
      labels: [
        "Baum 1: dichte Watereri-Wolke bei der selektiven Pflege",
        "Baum 1: junger Austrieb und Nadeldichte in der Wolke",
        "Baum 1: Handarbeit mit Schere am jungen Austrieb",
        "Baum 1: Auswahl der Triebe in der Watereri-Wolke",
        "Baum 2: Watereri-Krone im Terrassengarten mit dichten Wolken",
        "Baum 2: Watereri mit geöffneten Wolkenpolstern im Gartenraum"
      ]
    },
    en: {
      eyebrow: "Pinus sylvestris 'Watereri' / cloud care",
      title: "Two Watereri pines, one care problem.",
      text: "This is not a strict before/after case. It shows two different Pinus sylvestris 'Watereri': one as close work detail, one as a full crown in a terrace garden.",
      more: "Read more",
      viktor: "Viktor's note: these are two different trees. Both are Pinus sylvestris 'Watereri', and the work is the same: cloud-pad care to prevent the pads from becoming too dense, holding moisture and encouraging fungal disease. For this pine, this is one of the most important procedures and should be checked at least every 2-3 years depending on growth.",
      value: "With Watereri, a rounded surface cut is not enough. I read the density of each cloud: which young shoots stay, where air must enter and where the inside of the crown must not become dark. The tree stays compact, but alive.",
      danger: "If the pads are closed only from the outside, moisture remains inside. Inner needles and fine twigs die back, the pads become heavy and fungal pressure rises. Good work is selective, slow and planned for the next years.",
      tree1Title: "Tree 1: reading density in young growth.",
      tree1Text: "The close-ups show the fine decision-making: not everything is shortened; strong and overly dense zones are opened selectively.",
      tree2Title: "Tree 2: the same logic at full-crown scale.",
      tree2Text: "The second tree shows the effect at garden scale: cloud pads stay readable, while light and air can still move between the layers.",
      labels: [
        "Tree 1: dense Watereri cloud during selective care",
        "Tree 1: young growth and needle density inside the cloud pad",
        "Tree 1: hand work with shears on young growth",
        "Tree 1: selecting shoots inside the Watereri cloud",
        "Tree 2: Watereri crown in a terrace garden with dense cloud pads",
        "Tree 2: Watereri with opened cloud pads in the garden space"
      ]
    },
    uk: {
      eyebrow: "Pinus sylvestris 'Watereri' / догляд за хмарками",
      title: "Дві Watereri, одна задача догляду.",
      text: "Це не строгий кейс «до/після». Серія показує два різні дерева Pinus sylvestris 'Watereri': на першому видно роботу в деталях, на другому - цілу крону в терасному саду.",
      more: "Читати більше",
      viktor: "Нотатка Віктора: це два різних дерева. Обидва Pinus sylvestris 'Watereri', але робота та сама: догляд за хмарками, щоб шапки не загущувались надмірно, не тримали вологу і не створювали умови для грибкових захворювань. Для цього виду сосни це одна з найважливіших процедур, яку варто перевіряти щонайменше раз на 2-3 роки, залежно від сили росту.",
      value: "У Watereri недостатньо просто округлити зовнішній контур. Треба читати густоту кожної хмарки: які молоді пагони залишити, де впустити повітря і де не допустити темряви всередині крони. Так дерево лишається компактним, але живим.",
      danger: "Якщо закривати шапки тільки зовні, всередині тримається волога. Відмирають внутрішня хвоя і тонкі гілочки, подушки стають важкими, а ризик грибка зростає. Тому правильна робота вибіркова, повільна і розрахована на наступні роки.",
      tree1Title: "Дерево 1: прочитати густоту молодого приросту.",
      tree1Text: "Крупні плани показують тонку логіку: не все скорочується; відкриваються саме сильні й надто загущені зони.",
      tree2Title: "Дерево 2: та сама логіка на масштабі всієї крони.",
      tree2Text: "На другому дереві видно ефект у просторі саду: хмарні шапки залишаються читабельними, але між ярусами мають працювати світло й повітря.",
      labels: [
        "Дерево 1: густа хмарка Watereri під час вибіркового догляду",
        "Дерево 1: молодий приріст і щільність хвої всередині хмарки",
        "Дерево 1: ручна робота ножицями по молодому приросту",
        "Дерево 1: вибір пагонів у хмарці Watereri",
        "Дерево 2: крона Watereri у терасному саду з густими хмарними шапками",
        "Дерево 2: Watereri з відкритими хмарними шапками у просторі саду"
      ]
    }
  };
  const copy = copyByLang[lang] || copyByLang.de;
  const tree1Files = [
    ["watereri-wolkenpflege-tree1-01.webp", "3 / 4"],
    ["watereri-wolkenpflege-tree1-02.webp", "3 / 4"],
    ["watereri-wolkenpflege-tree1-03.webp", "3 / 4"],
    ["watereri-wolkenpflege-tree1-04.webp", "4 / 3"]
  ];
  const tree2Files = [
    ["watereri-wolkenpflege-tree2-01.webp", "4 / 3"],
    ["watereri-wolkenpflege-tree2-02.webp", "7 / 5"]
  ];
  const tree1Images = tree1Files.map(([file, ratio], index) =>
    photoSlot({ folder: "04_khvoyni", file, lang, label: copy.labels[index], ratio })
  ).join("");
  const tree2Images = tree2Files.map(([file, ratio], index) =>
    photoSlot({ folder: "04_khvoyni", file, lang, label: copy.labels[index + tree1Files.length], ratio })
  ).join("");
  return `
  <section class="section watereri-two-trees-feature" id="watereri-two-trees">
    <div class="section-head"><span class="eyebrow">${copy.eyebrow}</span><h2>${copy.title}</h2><p>${copy.text}</p></div>
    <div class="watereri-two-trees-grid">
      <article class="watereri-tree-card">
        <h3>${copy.tree1Title}</h3>
        <p>${copy.tree1Text}</p>
        <div class="watereri-tree-media watereri-tree-media-detail">${tree1Images}</div>
      </article>
      <article class="watereri-tree-card watereri-tree-card-wide">
        <h3>${copy.tree2Title}</h3>
        <p>${copy.tree2Text}</p>
        <div class="watereri-tree-media watereri-tree-media-wide">${tree2Images}</div>
      </article>
    </div>
    <details class="gallery-readmore">
      <summary>${copy.more}</summary>
      <div class="gallery-readmore-body">
        <p>${copy.viktor}</p>
        <p>${copy.value}</p>
        <p>${copy.danger}</p>
      </div>
    </details>
  </section>`;
}

function connectedSeriesLabels(lang = "de") {
  if (lang === "uk") {
    return {
      eyebrow: "Пов'язані серії",
      title: "Окремі групи, де видно дерево, місце і логіку роботи.",
      text: "Ці кадри більше не лежать у загальній сітці. Я згрупував їх за одним деревом або одним робочим контекстом: частина показує реальну зміну форми, частина - результат із різних ракурсів.",
      species: "Дерево",
      done: "Що зроблено"
    };
  }
  if (lang === "en") {
    return {
      eyebrow: "Connected series",
      title: "Separate groups where the tree, place and work logic stay readable.",
      text: "These frames no longer sit loose in the general grid. They are grouped by the same tree or the same work context: some show a visible care effect, some show the finished result from several angles.",
      species: "Tree",
      done: "What was done"
    };
  }
  return {
    eyebrow: "Verbundene Serien",
    title: "Eigene Gruppen, in denen Baum, Ort und Arbeit lesbar bleiben.",
    text: "Diese Bilder stehen nicht mehr lose im Raster. Sie sind nach Baum oder Arbeitskontext gruppiert: teils mit sichtbarem Pflegeeffekt, teils als fertiges Ergebnis aus mehreren Blickwinkeln.",
    species: "Baum",
    done: "Was wurde gemacht"
  };
}

function connectedGallerySeriesBlock(lang = "de") {
  const labels = connectedSeriesLabels(lang);
  const cards = connectedGallerySeries.map((item) => {
    const imageLabels = item.labels[lang] || item.labels.de;
    const frames = item.images.map((image, index) =>
      caseImage(image, imageLabels[index] || String(index + 1), lang, "eager", `${imageLabels[index] || index + 1}: ${localized(item.title, lang)}`)
    ).join("");
    return `<article class="connected-series-card" id="series-${item.id}">
      <div class="connected-series-media connected-series-media-${item.images.length}">${frames}</div>
      <div class="connected-series-copy">
        <h3>${localized(item.title, lang)}</h3>
        <p>${localized(item.summary, lang)}</p>
        <dl class="connected-series-notes">
          <div><dt>${labels.species}</dt><dd>${localized(item.species, lang)}</dd></div>
          <div><dt>${labels.done}</dt><dd>${localized(item.done, lang)}</dd></div>
        </dl>
      </div>
    </article>`;
  }).join("");
  return `
  <section class="section connected-series" id="connected-series">
    <div class="section-head"><span class="eyebrow">${labels.eyebrow}</span><h2>${labels.title}</h2><p>${labels.text}</p></div>
    <div class="connected-series-grid">${cards}</div>
  </section>`;
}

function parvifloraCandleSetSection(lang = "de") {
  const copyByLang = {
    de: {
      eyebrow: "Pinus parviflora / Kerzenarbeit",
      title: "Zwei japanische Weisskiefern nach dem Setzen des jungen Austriebs.",
      text: "Diese Serie ist kein Vorher-/Nachher-Beweis. Sie zeigt zwei Pinus parviflora im Garten des Besitzers nach der abendlichen Arbeit an den Kerzen: Der junge Austrieb setzt sich, die Wolkenlinie wird ruhiger und die Bäume bleiben im Landschaftsraum lesbar.",
      more: "Mehr lesen",
      viktor: "Viktors Notiz: Das sind zwei Pinus parviflora im Garten- und Landschaftsinterieur des Besitzers nach der abendlichen Arbeit an den Kerzen, genauer: das Absenken beziehungsweise Setzen des jungen Austriebs.",
      value: "Der Wert dieser Arbeit liegt im Zeitpunkt. Junge Kerzen sind noch weich und lenkbar; wenn sie richtig geführt werden, verteilt sich die Kraft gleichmässiger und die Polster werden flacher, ruhiger und leichter lesbar. Wartet man zu lange, verholzt der Austrieb, lässt sich schlechter korrigieren und kann bei grober Arbeit brechen.",
      danger: "Die Gefahr ist, Kerzen wie eine Hecke zu schneiden. Dann verliert die Kiefer zukünftige Knospen, innere Bereiche werden dunkel und die Wolken können schwer nach unten hängen. Saubere Handarbeit hält genug Nadeln für Energie, nimmt aber Druck aus zu starken Zonen.",
      labels: [
        "Baum 1: Pinus parviflora nach Kerzenarbeit im Garten",
        "Baum 1: ruhige Etagen nach dem Setzen des jungen Austriebs",
        "Baum 2: Pinus parviflora im Gartenbeet nach Kerzenarbeit",
        "Baum 2: Landschaftsansicht mit gesetztem jungen Austrieb"
      ]
    },
    en: {
      eyebrow: "Pinus parviflora / candle work",
      title: "Two Japanese white pines after settling the young growth.",
      text: "This series is not before/after proof. It shows two Pinus parviflora in the owner's garden after evening candle work: the young growth settles, the cloud line becomes calmer and the trees remain readable in the landscape.",
      more: "Read more",
      viktor: "Viktor's note: these are two Pinus parviflora in the owner's garden landscape after evening work on the candles, specifically the settling of the young growth.",
      value: "The value is in the timing. Young candles are still soft and can be guided; handled correctly, strength is distributed more evenly and the pads become flatter, calmer and easier to read. If the work is too late, the shoot hardens, is harder to correct and can break under rough handling.",
      danger: "The danger is treating candles like a hedge surface. The pine can lose future buds, the inner crown becomes dark and the cloud pads can hang heavy. Clean hand work keeps enough needles for energy while reducing pressure in overly strong zones.",
      labels: [
        "Tree 1: Pinus parviflora after candle work in the garden",
        "Tree 1: calm layers after settling the young growth",
        "Tree 2: Pinus parviflora in the garden bed after candle work",
        "Tree 2: landscape view with settled young growth"
      ]
    },
    uk: {
      eyebrow: "Pinus parviflora / робота зі свічками",
      title: "Дві японські білі сосни після просідання молодого приросту.",
      text: "Це не доказовий кейс «до/після». Серія показує дві Pinus parviflora у садово-ландшафтному інтер'єрі власника після вечірньої роботи зі свічками: молодий приріст просідає, хмарна лінія стає спокійнішою, а дерева краще читаються в просторі.",
      more: "Читати більше",
      viktor: "Нотатка Віктора: це два дерева Pinus parviflora у садово-ландшафтному інтер'єрі саду на ділянці у власника після вечірньої роботи зі свічками, а саме просідання молодого приросту.",
      value: "Цінність цієї роботи в моменті. Молоді свічки ще м'які й керовані: якщо їх правильно вести, сила розподіляється рівніше, а подушки стають нижчими, спокійнішими й читабельнішими. Якщо запізнитися, приріст дерев'яніє, гірше коригується і може ламатися від грубого втручання.",
      danger: "Небезпека в тому, щоб різати свічки як поверхню живоплоту. Так сосна може втратити майбутні бруньки, середина крони темніє, а хмарні яруси стають важкими й провислими. Чиста ручна робота лишає достатньо хвої для енергії, але знімає надлишковий тиск із сильних зон.",
      labels: [
        "Дерево 1: Pinus parviflora після роботи зі свічками в саду",
        "Дерево 1: спокійні яруси після просідання молодого приросту",
        "Дерево 2: Pinus parviflora у садовій зоні після роботи зі свічками",
        "Дерево 2: ландшафтний ракурс із просілим молодим приростом"
      ]
    }
  };
  const copy = copyByLang[lang] || copyByLang.de;
  const files = [
    "parviflora-kerzenabsenkung-01.webp",
    "parviflora-kerzenabsenkung-02.webp",
    "parviflora-kerzenabsenkung-03.webp",
    "parviflora-kerzenabsenkung-04.webp"
  ];
  const images = files.map((file, index) =>
    photoSlot({ folder: "04_khvoyni", file, lang, label: copy.labels[index], ratio: "3 / 4" })
  ).join("");
  return `
  <section class="section parviflora-candle-set">
    <div class="section-head"><span class="eyebrow">${copy.eyebrow}</span><h2>${copy.title}</h2><p>${copy.text}</p></div>
    <div class="parviflora-candle-grid">${images}</div>
    <details class="gallery-readmore">
      <summary>${copy.more}</summary>
      <div class="gallery-readmore-body">
        <p>${copy.viktor}</p>
        <p>${copy.value}</p>
        <p>${copy.danger}</p>
      </div>
    </details>
  </section>`;
}

const beforeAfterCases = [
  {
    id: "parviflora-box-opening",
    preview: {
      before: workPhoto("case-parviflora-box-before-03.webp", "center center"),
      after: workPhoto("case-parviflora-box-after-02.webp", "center center")
    },
    series: {
      before: workPhotos([
        "case-parviflora-box-before-01.webp",
        "case-parviflora-box-before-02.webp",
        "case-parviflora-box-before-03.webp"
      ]),
      after: workPhotos([
        "case-parviflora-box-after-01.webp",
        "case-parviflora-box-after-02.webp"
      ])
    },
    title: {
      de: "Pinus parviflora: Kerzenarbeit am jungen Austrieb",
      uk: "Pinus parviflora: робота зі свічками молодого приросту",
      en: "Pinus parviflora: young candle growth guided"
    },
    summary: {
      de: "Diese Vorher/Nachher-Serie zeigt die saisonale Arbeit an der Japanischen Weisskiefer: vorher stehen viele junge Kerzen aufrecht, danach wirken die Polster ruhiger und kontrollierter.",
      uk: "Ця серія до/після показує сезонну роботу з японською білою сосною: до догляду молоді свічки стоять густо й вертикально, після яруси спокійніші та контрольованіші.",
      en: "This before/after series shows seasonal work on Japanese white pine: before care, many young candles stand upright; after it, the pads read calmer and more controlled."
    },
    diagnosis: {
      problem: {
        de: "Der junge Austrieb stand zu stark in den Polstern. Ohne Kontrolle wird die Wolkenlinie schwer und die innere Struktur bekommt zu wenig Licht.",
        uk: "Молодий приріст занадто сильно піднявся в ярусах. Без контролю хмарна лінія важчає, а внутрішня структура отримує замало світла.",
        en: "The young growth was pushing too strongly through the pads. Without control, the cloud line gets heavy and the inner structure receives too little light."
      },
      intervention: {
        de: "Die Kerzen wurden einzeln nach Staerke und Position gelesen, starke Spitzen gebremst und uebervolle Stellen von Hand zurueckgenommen.",
        uk: "Свічки прочитано окремо за силою й позицією, сильні верхівки пригальмовано, а переповнені місця вручну скорочено.",
        en: "The candles were read one by one by strength and position, strong tips were slowed and overfull areas were reduced by hand."
      },
      result: {
        de: "Die Kraft verteilt sich ruhiger, die Etagen bleiben lesbar und der Baum wirkt im Holzkasten wieder gepflegt statt ueberwachsen.",
        uk: "Сила росту розподіляється спокійніше, яруси лишаються читабельними, а дерево в контейнері виглядає доглянутим, а не перерослим.",
        en: "The growth energy reads calmer, the layers stay legible and the tree in the planter looks maintained rather than overgrown."
      }
    },
    done: {
      de: "Gearbeitet wurde am jungen Austrieb: Kerzen kuerzen, zu starke Triebe bremsen, ueberfuellte Spitzen oeffnen und die Kontur der Wolken von Hand nachfuehren.",
      uk: "Робота була саме з молодим приростом: скоротити свічки, пригальмувати надто сильні пагони, відкрити переповнені верхівки й вручну підвести контур хмар.",
      en: "The work focused on young growth: shortening candles, slowing overly strong shoots, opening crowded tips and guiding the cloud contour by hand."
    },
    why: {
      de: "Bei Pinus parviflora entscheidet der Zeitpunkt: zu frueh nimmt man Kraft, zu spaet verholzt der Austrieb und der naechste Aufbau wird ungenau.",
      uk: "Для Pinus parviflora вирішує момент: занадто рано - забирається сила, занадто пізно - приріст дерев'яніє і наступна структура стає неточною.",
      en: "With Pinus parviflora, timing decides the result: too early removes strength, too late lets the growth harden and makes the next structure less precise."
    },
    value: {
      de: "Nach 27 Jahren Niwaki-Pflege liegt mein Wert im Mass: nicht flach schneiden, sondern jede Kerze so fuehren, dass Form, Kraft und Zukunftsknospen zusammenpassen.",
      uk: "Після 27 років Niwaki-догляду моя цінність у мірі: не стригти пласко, а вести кожну свічку так, щоб форма, сила й майбутні бруньки працювали разом.",
      en: "After 27 years of niwaki care, my value is judgment: not flattening the tree, but guiding each candle so form, strength and future buds work together."
    }
  },
  {
    id: "parviflora-garden-solitaire",
    preview: {
      before: workPhoto("case-parviflora-garden-before-01.webp", "center center"),
      after: workPhoto("case-parviflora-garden-after-01.webp", "center center")
    },
    series: {
      before: workPhotos([
        "case-parviflora-garden-before-01.webp",
        "case-parviflora-garden-before-02.webp"
      ]),
      after: workPhotos([
        "case-parviflora-garden-after-01.webp",
        "case-parviflora-garden-after-02.webp",
        "case-parviflora-garden-after-03.webp"
      ])
    },
    title: {
      de: "Grosse Pinus parviflora: stärkere Silhouette beruhigt",
      uk: "Велика Pinus parviflora: сильний силует заспокоєно",
      en: "Large Pinus parviflora: strong silhouette calmed"
    },
    summary: {
      de: "Diese Serie zeigt dieselbe grosse Gartenkiefer aus der sortierten Vorher/Nachher-Quelle: Dichte und Detail vor der Arbeit, danach die ruhigere Wirkung aus drei Blickwinkeln.",
      uk: "Ця серія показує ту саму велику садову сосну з відсортованого джерела до/після: густоту й деталь до роботи, потім спокійніший ефект із трьох ракурсів.",
      en: "This series shows the same large garden pine from the sorted before/after source: density and detail before the work, then the calmer effect from three angles."
    },
    diagnosis: {
      problem: {
        de: "Die starke Krone brauchte Ordnung in Dichte, Etagen und Lesbarkeit.",
        uk: "Сильній кроні потрібен був порядок у густоті, ярусах і читабельності.",
        en: "The strong crown needed order in density, layers and readability."
      },
      intervention: {
        de: "Die Form wurde von Hand selektiv korrigiert, ohne den Charakter des grossen Solitärs zu verlieren.",
        uk: "Форму вибірково скориговано вручну, не втрачаючи характер великого солітера.",
        en: "The form was selectively corrected by hand without losing the character of the large specimen."
      },
      result: {
        de: "Die Wolken lesen klarer, die Krone wirkt leichter und der Baum bleibt ein starker Blickpunkt im Garten.",
        uk: "Хмари читаються ясніше, крона виглядає легше, а дерево лишається сильним акцентом у саду.",
        en: "The clouds read more clearly, the crown feels lighter and the tree remains a strong garden focal point."
      }
    },
    done: {
      de: "Dichte Partien wurden selektiv geöffnet, die Aussenlinie gesammelt und die vorhandenen Wolken so beruhigt, dass die grosse Kiefer aus mehreren Blickwinkeln funktioniert.",
      uk: "Густі частини вибірково відкрито, зовнішню лінію зібрано, а наявні хмари заспокоєно так, щоб велика сосна працювала з кількох ракурсів.",
      en: "Dense areas were selectively opened, the outer line gathered and the existing clouds calmed so the large pine works from several angles."
    },
    why: {
      de: "Grosse Gartenbonsai müssen nicht kleiner wirken; sie müssen kontrolliert, luftig und lesbar bleiben.",
      uk: "Великі садові бонсаї не мають виглядати меншими; вони мають лишатися контрольованими, повітряними й читабельними.",
      en: "Large garden bonsai do not need to look smaller; they need to stay controlled, airy and readable."
    },
    value: {
      de: "Mein Wert liegt im Mass: genug Eingriff für Ruhe und Luft, aber nicht so viel, dass der alte Charakter verloren geht.",
      uk: "Моя цінність у мірі: достатньо втручання для спокою й повітря, але не настільки, щоб втратити старий характер.",
      en: "My value is judgment: enough intervention for calm and air, but not so much that the mature character is lost."
    }
  },
  {
    id: "parviflora-compact-opening",
    preview: {
      before: workPhoto("case-parviflora-compact-before-01.webp", "center center"),
      after: workPhoto("case-parviflora-compact-after-02.webp", "center center")
    },
    series: {
      before: workPhotos([
        "case-parviflora-compact-before-01.webp",
        "case-parviflora-compact-before-02.webp"
      ]),
      after: workPhotos([
        "case-parviflora-compact-after-01.webp",
        "case-parviflora-compact-after-02.webp"
      ])
    },
    title: {
      de: "Kompakte Pinus parviflora: vom dichten Block zur lesbaren Form",
      uk: "Компактна Pinus parviflora: від густого блоку до читабельної форми",
      en: "Compact Pinus parviflora: from dense block to readable form"
    },
    summary: {
      de: "Zwei Vorher- und zwei Nachher-Bilder: die kompakte Pinus parviflora wurde nicht flach geschnitten, sondern innen kritisch geöffnet, damit Licht, Luft und Tiefe zurückkommen.",
      uk: "Два фото до і два після: компактну Pinus parviflora не підрізали пласко, а критично відкрили всередині, щоб повернути світло, повітря і глибину.",
      en: "Two before and two after images: the compact Pinus parviflora was not flattened, but critically opened inside so light, air and depth return."
    },
    diagnosis: {
      problem: {
        de: "Die Krone war zu dicht: aussen grün, innen dunkel. So verliert die Kiefer Tiefe, Licht und zukünftige Knospen.",
        uk: "Крона була занадто щільна: зовні зелена, всередині темна. Так сосна втрачає глибину, світло і майбутні бруньки.",
        en: "The crown was too dense: green outside, dark inside. That costs the pine depth, light and future buds."
      },
      intervention: {
        de: "Innen wurde selektiv ausgelichtet; aussen wurde nur so viel genommen, dass die Wolken wieder lesbar werden.",
        uk: "Всередині зроблено вибіркове прорідження; зовні знято тільки стільки, щоб хмари знову читались.",
        en: "The inside was selectively thinned; outside, only enough was taken for the cloud pads to read again."
      },
      result: {
        de: "Die Form bleibt kompakt, aber nicht blockig: mehr Luft, klarere Etagen und bessere Kontrolle für die nächste Pflege.",
        uk: "Форма лишається компактною, але вже не блоком: більше повітря, ясніші яруси і кращий контроль для наступного догляду.",
        en: "The form stays compact but no longer block-like: more air, clearer layers and better control for the next care cycle."
      }
    },
    done: {
      de: "Dichte Zonen wurden von Hand geöffnet, alte und überfüllte Partien reduziert und die Wolken so getrennt, dass Stamm und Tiefe sichtbar bleiben.",
      uk: "Густі зони відкрито вручну, старі й переповнені частини зменшено, а хмари розділено так, щоб стовбур і глибина лишались видимими.",
      en: "Dense zones were opened by hand, old and crowded areas reduced, and the clouds separated so trunk and depth stay visible."
    },
    why: {
      de: "Wenn eine kompakte Kiefer nur aussen geschlossen wird, staut sich innen Schatten und Feuchtigkeit. Dann wird die nächste Korrektur härter.",
      uk: "Якщо компактну сосну закривати тільки зовні, всередині накопичуються тінь і волога. Потім наступна корекція стає грубішою.",
      en: "If a compact pine is only closed on the outside, shade and moisture build up inside. The next correction then becomes harsher."
    },
    value: {
      de: "Mein Wert liegt darin, innen zu lesen und aussen nur so viel zu nehmen, wie die Form wirklich braucht.",
      uk: "Моя цінність у тому, щоб читати середину і зовні знімати лише стільки, скільки форма справді потребує.",
      en: "My value is reading the inside and taking only as much from the outside as the form truly needs."
    }
  },
  {
    id: "parviflora-low-crown-growth",
    preview: {
      before: workPhoto("case-parviflora-low-crown-before-01.webp", "center center"),
      after: workPhoto("case-parviflora-low-crown-after-03.webp", "center center")
    },
    series: {
      before: workPhotos([
        "case-parviflora-low-crown-before-01.webp",
        "case-parviflora-low-crown-before-02.webp"
      ]),
      after: workPhotos([
        "case-parviflora-low-crown-after-01.webp",
        "case-parviflora-low-crown-after-02.webp",
        "case-parviflora-low-crown-after-03.webp"
      ])
    },
    title: {
      de: "Pinus parviflora mit niedriger Krone: Wachstum kontrolliert",
      uk: "Pinus parviflora з низькою кроною: контроль росту",
      en: "Low-crown Pinus parviflora: growth brought under control"
    },
    summary: {
      de: "Viktors Notiz: Arbeit zur Kontrolle des Kronenwachstums an einer niedrigen Pinus parviflora. Die Serie zeigt die dichtere Krone vorher und die ruhigere Wirkung im Terrassengarten danach.",
      uk: "Нотатка Віктора: робота з контролю росту крони нівакі Pinus parviflora з низькою кроною. Серія показує густішу крону до роботи і спокійніший ефект у терасовому саду після.",
      en: "Viktor's note: growth-control work on a low-crown Pinus parviflora niwaki. The series shows the denser crown before and the calmer terrace-garden effect after."
    },
    diagnosis: {
      problem: {
        de: "Die niedrige Krone war dicht und das Wachstum drohte die klaren Wolken zu schliessen.",
        uk: "Низька крона була густою, і приріст починав закривати чисті хмарні яруси.",
        en: "The low crown was dense and the growth was starting to close the clean cloud layers."
      },
      intervention: {
        de: "Das Wachstum wurde selektiv kontrolliert, ohne die niedrige, breite Form zu zerstören.",
        uk: "Ріст вибірково проконтрольовано, не руйнуючи низьку широку форму дерева.",
        en: "The growth was selectively controlled without destroying the low, broad form."
      },
      result: {
        de: "Die Krone bleibt niedrig, lesbar und luftiger im modernen Terrassengarten.",
        uk: "Крона лишається низькою, читабельною і повітрянішою в сучасному терасовому саду.",
        en: "The crown stays low, readable and airier in the modern terrace garden."
      }
    },
    done: {
      de: "Junge Triebe und zu dichte Partien wurden von Hand reguliert, damit die Wolken nicht zu einem schweren Block zusammenwachsen.",
      uk: "Молодий приріст і надто густі частини вручну врегульовано, щоб хмари не зросталися у важкий блок.",
      en: "Young shoots and overly dense areas were regulated by hand so the clouds do not grow into one heavy block."
    },
    why: {
      de: "Gerade niedrige Kiefern verlieren schnell ihre Architektur, wenn Wachstum nur aussen stehen bleibt und innen Licht fehlt.",
      uk: "Низькі сосни швидко втрачають архітектуру, якщо приріст лишається тільки зовні, а всередині бракує світла.",
      en: "Low pines quickly lose their architecture when growth stays only on the outside and the inner crown lacks light."
    },
    value: {
      de: "Mein Wert liegt in ruhiger Wachstumskontrolle: die Kraft bremsen, Licht hineinlassen und die breite Krone als Niwaki lesbar halten.",
      uk: "Моя цінність у спокійному контролі росту: стримати силу, впустити світло і зберегти широку крону читабельною як niwaki.",
      en: "My value is calm growth control: slowing the force, letting in light and keeping the broad crown readable as niwaki."
    }
  },
  {
    id: "parviflora-terrace-growth",
    preview: {
      before: workPhoto("case-parviflora-terrace-growth-before-01.webp", "center center"),
      after: workPhoto("case-parviflora-terrace-growth-after-02.webp", "center center")
    },
    series: {
      before: workPhotos([
        "case-parviflora-terrace-growth-before-01.webp"
      ]),
      after: workPhotos([
        "case-parviflora-terrace-growth-after-01.webp",
        "case-parviflora-terrace-growth-after-02.webp"
      ])
    },
    title: {
      de: "Pinus parviflora auf der Terrasse: Jahreszuwachs begrenzt",
      uk: "Pinus parviflora на терасі: річний приріст обмежено",
      en: "Terrace Pinus parviflora: annual growth controlled"
    },
    summary: {
      de: "Dies ist ein feiner Pflegegang, kein harter Vorher-/Nachher-Sprung. Viktors Notiz: Auf der Terrasse wurde der Jahreszuwachs der Nadeln begrenzt, während die künstlerische Form unverändert blieb.",
      uk: "Це тонкий сезонний догляд, не різка трансформація. Нотатка Віктора: на терасі було проконтрольовано крону, річний приріст хвої обмежено, а художню форму дерева залишено без змін.",
      en: "This is subtle seasonal care, not a dramatic before/after jump. Viktor's note: on the terrace, the annual needle growth was controlled while the artistic form of the tree was left unchanged."
    },
    diagnosis: {
      problem: {
        de: "Die Form war bereits gut aufgebaut, aber der Jahreszuwachs begann die Wolkenkanten dichter und weicher zu machen.",
        uk: "Форма вже була добре вибудувана, але річний приріст почав ущільнювати й пом'якшувати краї хмар.",
        en: "The form was already well built, but annual growth was starting to thicken and soften the cloud edges."
      },
      intervention: {
        de: "Der frische Zuwachs wurde selektiv kontrolliert, ohne die bestehende künstlerische Linie neu zu erfinden.",
        uk: "Свіжий приріст вибірково проконтрольовано, не перебудовуючи вже існуючу художню лінію.",
        en: "Fresh growth was selectively controlled without reinventing the existing artistic line."
      },
      result: {
        de: "Die Form bleibt dieselbe, wirkt aber sauberer, ruhiger und für die nächste Pflege leichter kontrollierbar.",
        uk: "Форма лишилася тією самою, але виглядає чистіше, спокійніше і легше контролюється на наступному догляді.",
        en: "The form remains the same, but reads cleaner, calmer and easier to control at the next maintenance pass."
      }
    },
    done: {
      de: "Der Jahreszuwachs der Nadeln wurde von Hand begrenzt; die Etagen, Stammbewegung und künstlerische Struktur blieben bewusst unverändert.",
      uk: "Річний приріст хвої вручну обмежено; яруси, рух стовбура і художню структуру свідомо залишено без змін.",
      en: "The annual needle growth was limited by hand; the layers, trunk movement and artistic structure were deliberately preserved."
    },
    why: {
      de: "Bei einer reifen Pinus parviflora ist gute Pflege oft unspektakulaer: rechtzeitig bremsen, damit die Architektur nicht spaeter schwer korrigiert werden muss.",
      uk: "У зрілої Pinus parviflora добрий догляд часто непоказний: вчасно стримати ріст, щоб пізніше не довелося важко виправляти архітектуру.",
      en: "With a mature Pinus parviflora, good care is often quiet: slow the growth in time so the architecture does not need heavy correction later."
    },
    value: {
      de: "Der Wert liegt hier im Masshalten: erkennen, was nicht verändert werden soll, und nur den neuen Zuwachs präzise führen.",
      uk: "Цінність тут у мірі: побачити, що не треба змінювати, і точно повести лише новий приріст.",
      en: "The value here is restraint: seeing what should not be changed and guiding only the new growth precisely."
    }
  },
  {
    id: "parviflora-house-candle-control",
    preview: {
      before: workPhoto("case-parviflora-house-candle-before-01.webp", "center center"),
      after: workPhoto("case-parviflora-house-candle-after-01.webp", "center center")
    },
    series: {
      before: workPhotos([
        "case-parviflora-house-candle-before-01.webp"
      ]),
      after: workPhotos([
        "case-parviflora-house-candle-after-01.webp"
      ])
    },
    title: {
      de: "Pinus parviflora am Haus: Kerzenarbeit und ruhigere Wolken",
      uk: "Pinus parviflora біля дому: робота зі свічками і спокійніші хмари",
      en: "House-side Pinus parviflora: candle work and calmer clouds"
    },
    summary: {
      de: "Viktors Notiz: saisonale Arbeit an den Kerzen einer Pinus parviflora. Die Bilder zeigen denselben Baum am Haus; der Nachher-Winkel ist naeher, deshalb wird hier keine identische Kameraachse behauptet.",
      uk: "Нотатка Віктора: сезонна робота зі свічками Pinus parviflora. Фото показують те саме дерево біля дому; ракурс після ближчий, тому тут не заявляється ідентична камера.",
      en: "Viktor's note: seasonal candle work on a Pinus parviflora. The images show the same tree beside the house; the after angle is closer, so this case does not claim an identical camera position."
    },
    diagnosis: {
      problem: {
        de: "Der junge Austrieb war sichtbar stark und begann die flachen Wolken breiter und dichter wirken zu lassen.",
        uk: "Молодий приріст був помітно сильним і починав робити плоскі хмари ширшими та густішими.",
        en: "The young growth was visibly strong and was starting to make the flat cloud pads look broader and denser."
      },
      intervention: {
        de: "Die Kerzen wurden selektiv von Hand geführt, damit die Kraft nicht nur in die starken Aussenkanten geht.",
        uk: "Свічки вибірково пропрацьовано вручну, щоб сила не йшла тільки у сильні зовнішні краї.",
        en: "The candles were guided selectively by hand so the force does not run only into the strong outer edges."
      },
      result: {
        de: "Die Wolken bleiben voll, lesen sich aber ruhiger, kontrollierter und besser getrennt am Haus.",
        uk: "Хмари залишаються повними, але читаються спокійніше, контрольованіше і краще розділяються біля дому.",
        en: "The pads remain full, but read calmer, more controlled and better separated beside the house."
      }
    },
    done: {
      de: "Saisonale Kerzenarbeit: starke Spitzen wurden beruhigt, die Polster wurden nicht hart geschnitten und die bestehende Niwaki-Form blieb erhalten.",
      uk: "Сезонна робота зі свічками: сильні верхівки заспокоєно, подушки не підстрижено жорстко, а існуючу форму niwaki збережено.",
      en: "Seasonal candle work: strong tips were calmed, the pads were not hard-clipped and the existing niwaki form was preserved."
    },
    why: {
      de: "Bei Pinus parviflora entscheidet der richtige Moment: zu spaet wird der Austrieb hart, zu grob verliert der Ast kuenftige Knospen.",
      uk: "У Pinus parviflora вирішує правильний момент: запізно приріст дерев'яніє, а надто груба робота забирає майбутні бруньки.",
      en: "With Pinus parviflora, timing matters: too late and the growth hardens; too rough and the branch loses future buds."
    },
    value: {
      de: "Der Wert liegt im Lesen der Stärke: nicht alles gleich kürzen, sondern die Energie so verteilen, dass die Wolken lebendig bleiben.",
      uk: "Цінність у читанні сили: не скорочувати все однаково, а розподіляти енергію так, щоб хмари лишалися живими.",
      en: "The value is reading strength: not shortening everything equally, but distributing energy so the cloud pads stay alive."
    }
  },
  {
    id: "watereri-cloud-density",
    preview: {
      before: workPhoto("case-watereri-cloud-before-01.webp", "center center"),
      after: workPhoto("case-watereri-cloud-after-01.webp", "center center")
    },
    series: {
      before: workPhotos([
        "case-watereri-cloud-before-01.webp",
        "case-watereri-cloud-before-02.webp"
      ]),
      after: workPhotos([
        "case-watereri-cloud-after-01.webp",
        "case-watereri-cloud-after-02.webp"
      ])
    },
    title: {
      de: "Pinus sylvestris 'Watereri': dichte Wolken geöffnet",
      uk: "Pinus sylvestris 'Watereri': загущені хмарки відкрито",
      en: "Pinus sylvestris 'Watereri': dense cloud pads opened"
    },
    summary: {
      de: "Die Serie zeigt Watereri-Wolken vor und nach dem Öffnen: weniger stehende Feuchtigkeit, mehr Luft und eine klarere Pflegeform.",
      uk: "Ця серія показує Watereri до і після відкриття хмарок: менше застійної вологи, більше повітря і читабельніша форма догляду.",
      en: "This series shows Watereri cloud pads before and after opening: less trapped moisture, more air and a clearer maintenance form."
    },
    diagnosis: {
      problem: {
        de: "Die Polster waren stark verdichtet; in solchen Schappen stauen sich Feuchtigkeit und Pilzdruck.",
        uk: "Шапки були надмірно загущені; у таких хмарках накопичується волога і зростає ризик грибкових захворювань.",
        en: "The pads were too dense; moisture and fungal pressure build up inside these compact caps."
      },
      intervention: {
        de: "Die Wolken wurden selektiv geöffnet, ohne die Form nur oberflächlich wie eine Hecke zu schliessen.",
        uk: "Хмарки вибірково відкрито, без поверхневого закривання форми як звичайної живоплотної стрижки.",
        en: "The clouds were selectively opened instead of only closing the surface like a hedge cut."
      },
      result: {
        de: "Die Krone liest ruhiger, bekommt mehr Luft und bleibt für die nächsten Pflegeschritte besser kontrollierbar.",
        uk: "Крона читається спокійніше, отримує більше повітря і краще контролюється для наступних етапів догляду.",
        en: "The crown reads calmer, gets more air and stays easier to control in the next care cycles."
      }
    },
    done: {
      de: "Die Wolkenpolster von Pinus sylvestris 'Watereri' wurden ausgelichtet, damit sich in den dichten Schappen keine dauerhafte Feuchtigkeit sammelt. Bei dieser Kiefer sollte diese Kontrolle je nach Wuchs mindestens alle 2-3 Jahre eingeplant werden.",
      uk: "Хмарні шапки Pinus sylvestris 'Watereri' проріджено, щоб у щільній масі не трималася постійна волога. Для цього виду сосни таку перевірку варто планувати щонайменше раз на 2-3 роки, залежно від сили росту.",
      en: "The cloud pads of Pinus sylvestris 'Watereri' were thinned so permanent moisture does not stay inside the dense caps. For this pine, this check should be planned at least every 2-3 years, depending on growth strength."
    },
    why: {
      de: "Bei Watereri ist nicht nur die Silhouette wichtig. Wenn die Polster innen dunkel und feucht bleiben, entstehen trockene Bereiche, schwache Knospen und ein höheres Risiko für Pilzprobleme.",
      uk: "У Watereri важливий не лише силует. Якщо всередині шапок темно і волого, з'являються сухі зони, слабші бруньки і вищий ризик грибкових проблем.",
      en: "With Watereri, the silhouette alone is not enough. If the pads stay dark and wet inside, dry zones, weaker buds and a higher fungal risk follow."
    },
    value: {
      de: "Mein Wert liegt im Lesen der Dichte: welche jungen Triebe bleiben, wo Luft hineinkommen muss und wie die Wolke lebendig bleibt, statt nur rund abgeschnitten zu wirken.",
      uk: "Моя цінність тут у читанні густоти: які молоді пагони залишити, де впустити повітря і як зберегти хмарку живою, а не просто кругло підстриженою.",
      en: "My value is reading density: which young shoots stay, where air has to enter and how the cloud remains alive instead of merely looking rounded."
    }
  },
  {
    id: "taxus-baccata-topiary-growth",
    previewLayout: "feature",
    preview: {
      before: workPhoto("case-taxus-baccata-topiary-before-01.webp", "center center"),
      work: {
        ...workPhoto("case-taxus-baccata-topiary-love-01.webp", "center center"),
        label: {
          de: "Ich liebe diese Arbeit",
          uk: "Я люблю цю роботу",
          en: "I love this work"
        }
      },
      after: workPhoto("case-taxus-baccata-topiary-after-02.webp", "center center")
    },
    series: {
      before: workPhotos([
        "case-taxus-baccata-topiary-before-01.webp",
        "case-taxus-baccata-topiary-before-02.webp"
      ]),
      work: [
        {
          ...workPhoto("case-taxus-baccata-topiary-love-01.webp", "center center"),
          label: {
            de: "Ich liebe diese Arbeit",
            uk: "Я люблю цю роботу",
            en: "I love this work"
          }
        }
      ],
      after: workPhotos([
        "case-taxus-baccata-topiary-after-01.webp",
        "case-taxus-baccata-topiary-after-02.webp"
      ])
    },
    title: {
      de: "Taxus baccata: junger Austrieb topiarisch beruhigt",
      uk: "Taxus baccata: молодий приріст заспокоєно топіарно",
      en: "Taxus baccata: young growth calmed by topiary work"
    },
    summary: {
      de: "Die Quelle zeigt zwei Vorher-Bilder, Viktors Arbeitsmoment und zwei Nachher-Bilder: der junge Taxus-Austrieb wurde mit Topiarschere gesammelt, ohne die lebendige Wolkenstruktur flach zu machen.",
      uk: "Джерело має два фото до, робочий момент Віктора і два фото після: молодий приріст Taxus зібрано топіарними ножицями, не сплющуючи живу хмарну структуру.",
      en: "The source contains two before images, Viktor's work moment and two after images: the young Taxus growth was gathered with topiary shears without flattening the living cloud structure."
    },
    diagnosis: {
      problem: {
        de: "Der frische Austrieb machte die Wolken unruhig; die Aussenlinie verlor Präzision und einzelne Polster begannen zusammenzulaufen.",
        uk: "Свіжий приріст зробив хмари неспокійними: зовнішня лінія втратила точність, а окремі подушки почали зливатися.",
        en: "Fresh growth made the clouds restless; the outer line lost precision and individual pads started to merge."
      },
      intervention: {
        de: "Der junge Austrieb wurde topiarisch von Hand gelesen und gekürzt: nicht mit Motor, sondern kontrolliert mit Schere entlang der vorhandenen Form.",
        uk: "Молодий приріст прочитано і скорочено вручну топіарним способом: не мотором, а контрольовано ножицями по наявній формі.",
        en: "The young growth was read and shortened by hand in topiary method: not by motor, but with controlled shears along the existing form."
      },
      result: {
        de: "Die Wolkenpolster sind wieder ruhiger, die Etagen trennen sich klarer und der Taxus bleibt dicht, aber nicht grob blockig.",
        uk: "Шапки знову спокійніші, яруси ясніше розділені, а Taxus лишається щільним, але не грубим блоком.",
        en: "The caps read calmer again, the layers separate more clearly and the Taxus stays dense without becoming a rough block."
      }
    },
    done: {
      de: "Saisonale Arbeit am jungen Austrieb von Taxus baccata: die überstehenden Spitzen wurden gesammelt, die Wolkenlinie nachgeführt und die Tiefe zwischen den Etagen erhalten.",
      uk: "Сезонна робота з молодим приростом Taxus baccata: виступаючі кінчики зібрано, хмарну лінію підведено, а глибину між ярусами збережено.",
      en: "Seasonal work on young Taxus baccata growth: protruding tips were gathered, the cloud line was guided and depth between layers was preserved."
    },
    why: {
      de: "Bei Taxus ist die Gefahr, die Form nur aussen zuzukleben. Dann sieht sie kurz sauber aus, verliert aber Licht, Tiefe und die feine Architektur.",
      uk: "У Taxus ризик у тому, щоб просто заклеїти форму зовні. Вона ненадовго виглядає чисто, але втрачає світло, глибину і тонку архітектуру.",
      en: "With Taxus, the risk is simply sealing the outside. It looks clean for a moment, but loses light, depth and fine architecture."
    },
    value: {
      de: "Mein Wert liegt im Mass: die Wolke sauber beruhigen, aber genug Leben und innere Luft im Gehölz lassen.",
      uk: "Моя цінність у мірі: чисто заспокоїти хмару, але залишити достатньо життя й внутрішнього повітря в рослині.",
      en: "My value is judgment: calming the cloud cleanly while leaving enough life and inner air in the plant."
    }
  },
  {
    id: "hedge-niwaki-structure",
    preview: {
      before: workPhoto("hecke-niwaki-nachher-01.webp", "center center"),
      after: workPhoto("hecke-niwaki-vorher-02.webp", "center center")
    },
    series: {
      before: workPhotos([
        "hecke-niwaki-nachher-01.webp",
        "hecke-niwaki-vorher-01.webp"
      ]),
      work: workPhotos([
        "hecke-niwaki-diagnose-01.webp",
        "hecke-niwaki-arbeit-01.webp"
      ]),
      after: workPhotos([
        "hecke-niwaki-vorher-02.webp"
      ])
    },
    title: {
      de: "Nadelgehölz-Hecke: vom dichten Block zur kontrollierten Linie",
      uk: "Хвойна огорожа: від густого блоку до контрольованої лінії",
      en: "Evergreen hedge: from dense block to controlled line"
    },
    summary: {
      de: "Diese Serie zeigt eine reale Formhecke: dichte Masse, Diagnose im Inneren, Arbeit mit Leiter und die ruhigere Linie danach.",
      uk: "Ця серія показує реальну формовану огорожу: густу масу, діагностику всередині, роботу з драбиною і спокійнішу лінію після.",
      en: "This series shows a real shaped hedge: dense mass, internal diagnosis, ladder work and a calmer line afterwards."
    },
    diagnosis: {
      problem: {
        de: "Die Aussenlinie war dicht und unruhig; innen fehlten Licht und Luft.",
        uk: "Зовнішня лінія була щільною і неспокійною; всередині бракувало світла й повітря.",
        en: "The outer line was dense and restless; inside, light and air were missing."
      },
      intervention: {
        de: "Die Masse wurde kontrolliert zurückgenommen, die Linie gesammelt und der Innenbereich diagnostiziert.",
        uk: "Масу контрольовано знято, лінію зібрано, внутрішню частину продіагностовано.",
        en: "The mass was reduced in a controlled way, the line was gathered and the inside was diagnosed."
      },
      result: {
        de: "Die Hecke liest ruhiger, bekommt mehr Luft und bleibt langfristig pflegbar.",
        uk: "Огорожа читається спокійніше, отримує більше повітря і лишається доглядопридатною надовго.",
        en: "The hedge reads calmer, gets more air and remains maintainable long term."
      }
    },
    done: {
      de: "Die übervolle Aussenfläche wurde kontrolliert zurückgenommen, die Linie gesammelt und der trockene Innenbereich als Pflegehinweis dokumentiert.",
      uk: "Переповнену зовнішню масу контрольовано зібрано, лінію вирівняно, суху внутрішню зону зафіксовано як важливий сигнал догляду.",
      en: "The overfull outer mass was corrected, the line was gathered and the dry inner area was documented as an important care signal."
    },
    why: {
      de: "Bei dichten Nadelgehölzen entscheidet der Schnitt über Licht, Luft und zukünftige Regeneration; ein schneller Flächenschnitt reicht nicht.",
      uk: "У густих хвойних рослинах зріз вирішує питання світла, повітря і майбутнього відновлення; швидкого поверхневого зрізу недостатньо.",
      en: "With dense conifers, cutting affects light, air and future recovery; a fast surface trim is not enough."
    },
    value: {
      de: "Mein Wert liegt in der Diagnose vor dem Schnitt: Ich sehe nicht nur die Aussenkontur, sondern auch, was im Inneren des Gehölzes passiert.",
      uk: "Моя цінність у діагностиці перед зрізом: я дивлюся не тільки на зовнішній контур, а й на те, що відбувається всередині рослини.",
      en: "My value is diagnosis before cutting: I look beyond the outside contour and read what is happening inside the plant."
    }
  }
];

function localized(value, lang = "de") {
  return value[lang] || value.de;
}

function htmlAttr(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function galleryCaseLabels(lang = "de") {
  if (lang === "uk") {
    return {
      before: "До",
      after: "Після",
      work: "Робота",
      details: "Що зроблено",
      series: "Усі кадри цієї серії",
      beforeSeries: "До / робочий контекст",
      workSeries: "Робочий контекст",
      afterSeries: "Після",
      done: "Що зроблено",
      why: "Чому",
      value: "Моя цінність",
      problem: "Проблема",
      intervention: "Втручання",
      result: "Результат",
      close: "Закрити",
      zoom: "Збільшити фото",
      modal: "Опис роботи до і після"
    };
  }
  if (lang === "en") {
    return {
      before: "Before",
      after: "After",
      work: "Work",
      details: "What was done",
      series: "All frames from this series",
      beforeSeries: "Before / work context",
      workSeries: "Work context",
      afterSeries: "After",
      done: "What was done",
      why: "Why",
      value: "My value",
      problem: "Problem",
      intervention: "Intervention",
      result: "Result",
      close: "Close",
      zoom: "Enlarge image",
      modal: "Before and after work description"
    };
  }
  return {
    before: "Vorher",
    after: "Nachher",
    work: "Arbeit",
    details: "Was wurde gemacht",
    series: "Alle Bilder dieser Serie",
    beforeSeries: "Vorher / Arbeitskontext",
    workSeries: "Arbeitskontext",
    afterSeries: "Nachher",
    done: "Was wurde gemacht",
    why: "Warum",
    value: "Mein Wert",
    problem: "Problem",
    intervention: "Eingriff",
    result: "Ergebnis",
    close: "Schliessen",
    zoom: "Bild vergrössern",
    modal: "Beschreibung der Vorher-Nachher-Arbeit"
  };
}

function caseImage(image, label, lang = "de", loading = "lazy", altText = "", options = {}) {
  const item = photo(image.folder, image.file);
  const src = `__ASSET_PREFIX__assets/img/${item.path}`;
  const backgroundSrc = `/assets/img/${item.path}`;
  const position = image.position || "center center";
  const style = ` style="--case-position:${position};--case-image:url('${backgroundSrc}')"`;
  const alt = altText || photoAlt(image.folder, image.file, lang, item.alt_de);
  const img = `<img src="${src}" alt="${htmlAttr(alt)}" loading="${loading}" decoding="async" width="900" height="675">`;
  const frameClass = `case-frame${options.zoomable ? " case-frame-zoomable" : ""}${options.className ? ` ${options.className}` : ""}`;
  if (options.zoomable) {
    const caption = htmlAttr(label);
    const aria = htmlAttr(`${options.zoomLabel || "Bild vergrössern"}: ${alt}`);
    return `<figure class="${frameClass}"${style}>
    <button class="case-frame-zoom" type="button" data-image-lightbox-src="${src}" data-image-lightbox-alt="${htmlAttr(alt)}" data-image-lightbox-caption="${caption}" aria-label="${aria}">
      ${img}
    </button>
    <figcaption>${label}</figcaption>
  </figure>`;
  }
  return `<figure class="${frameClass}"${style}>
    ${img}
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
  const fallback = stage === "before" ? [preview.before] : stage === "after" ? [preview.after] : [];
  return item.series?.[stage] || fallback;
}

function caseAdditionalSeries(item, stage) {
  const preview = casePreview(item);
  const previewKeys = new Set(Object.values(preview).filter(Boolean).map(imageKey));
  return caseSeriesImages(item, stage).filter((image) => !previewKeys.has(imageKey(image)));
}

function caseComparisonClass(item) {
  if (item.previewLayout) return ` case-pair-${item.previewLayout}`;
  return casePreview(item).work ? " case-pair-three" : "";
}

function caseComparisonFrames(item, labels, lang = "de", loading = "lazy", options = {}) {
  const preview = casePreview(item);
  const titleText = localized(item.title, lang);
  return [
    [preview.before, labels.before, "before"],
    [preview.work, labels.work, "work"],
    [preview.after, labels.after, "after"]
  ].filter(([image]) => image).map(([image, fallbackLabel, frameRole], index) => {
    const label = image.label ? localized(image.label, lang) : fallbackLabel;
    return caseImage(image, label, lang, loading, `${label}: ${titleText} ${index + 1}`, {
      zoomable: options.zoomable,
      zoomLabel: labels.zoom,
      className: `case-frame-${frameRole}`
    });
  }).join("");
}

function caseSeriesGroup(title, images, imageLabel, item, lang = "de", labels = galleryCaseLabels(lang)) {
  if (!images.length) return "";
  const titleText = localized(item.title, lang);
  const frames = images.map((image, index) => {
    const label = image.label ? localized(image.label, lang) : imageLabel;
    return caseImage(image, label, lang, "eager", `${label}: ${titleText} ${index + 1}`, {
      zoomable: true,
      zoomLabel: labels.zoom
    });
  }).join("");
  return `<section class="case-series-group">
    <h3>${title}</h3>
    <div class="case-series-grid">${frames}</div>
  </section>`;
}

function caseSeriesBlock(item, labels, lang = "de") {
  const before = caseAdditionalSeries(item, "before");
  const work = caseAdditionalSeries(item, "work");
  const after = caseAdditionalSeries(item, "after");
  if (!before.length && !work.length && !after.length) return "";
  return `<div class="case-series">
    <h3>${labels.series}</h3>
    ${caseSeriesGroup(labels.beforeSeries, before, labels.before, item, lang, labels)}
    ${caseSeriesGroup(labels.workSeries, work, labels.work, item, lang, labels)}
    ${caseSeriesGroup(labels.afterSeries, after, labels.after, item, lang, labels)}
  </div>`;
}

function caseDiagnosis(item, labels, lang = "de", compact = false) {
  if (!item.diagnosis) return "";
  const rows = [
    [labels.problem, localized(item.diagnosis.problem, lang)],
    [labels.intervention, localized(item.diagnosis.intervention, lang)],
    [labels.result, localized(item.diagnosis.result, lang)]
  ];
  return `<dl class="case-diagnosis${compact ? " case-diagnosis-compact" : ""}">
    ${rows.map(([term, description]) => `<div><dt>${term}</dt><dd>${description}</dd></div>`).join("")}
  </dl>`;
}

function galleryCaseStudies(lang = "de") {
  const labels = galleryCaseLabels(lang);
  const cards = beforeAfterCases.map((item, index) => {
    return `
    <a class="case-card" href="#case-${item.id}" data-case-open="${item.id}" aria-haspopup="dialog">
      <div class="case-pair${caseComparisonClass(item)}">
        ${caseComparisonFrames(item, labels, lang, index < 2 ? "eager" : "lazy")}
      </div>
      <div class="case-copy">
        <strong>${localized(item.title, lang)}</strong>
        <span>${localized(item.summary, lang)}</span>
        ${caseDiagnosis(item, labels, lang, true)}
        <em>${labels.details} -></em>
      </div>
    </a>`;
  }).join("");
  const panels = beforeAfterCases.map((item) => {
    return `
    <article class="case-detail" data-case-panel="${item.id}" hidden>
      <div class="case-detail-media">
        <div class="case-detail-pair${caseComparisonClass(item)}">
          ${caseComparisonFrames(item, labels, lang, "eager", { zoomable: true })}
        </div>
        ${caseSeriesBlock(item, labels, lang)}
      </div>
      <div class="case-detail-copy">
        <span class="eyebrow">${labels.details}</span>
        <h2>${localized(item.title, lang)}</h2>
        <p>${localized(item.summary, lang)}</p>
        ${caseDiagnosis(item, labels, lang)}
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

function meisterImageCarousel(lang = "de", prefix = "__ASSET_PREFIX__assets/img/") {
  const labels = {
    de: {
      aria: "Baumarchitektur Erklaerungen",
      prev: "Vorheriges Bild",
      next: "Naechstes Bild",
      dots: "Bildauswahl",
      show: "Bild",
      slides: [
        ["baumarchitektur-korrektur.png", "Baumarchitektur: selektive Korrektur und Erhalt der lebenden Struktur"],
        ["baumarchitektur-live-crown-ratio.png", "Baumarchitektur: lebende Krone und Stammstruktur verstehen"]
      ]
    },
    en: {
      aria: "Tree architecture explanations",
      prev: "Previous image",
      next: "Next image",
      dots: "Image selection",
      show: "Show image",
      slides: [
        ["baumarchitektur-korrektur.png", "Tree architecture: selective correction while preserving the living structure"],
        ["baumarchitektur-live-crown-ratio.png", "Tree architecture: understanding the living crown and trunk structure"]
      ]
    },
    uk: {
      aria: "Пояснення деревної архітектури",
      prev: "Попереднє зображення",
      next: "Наступне зображення",
      dots: "Вибір зображення",
      show: "Показати зображення",
      slides: [
        ["baumarchitektur-korrektur.png", "Деревна архітектура: вибіркова корекція і збереження живої структури"],
        ["baumarchitektur-live-crown-ratio.png", "Деревна архітектура: розуміння живої крони і структури стовбура"]
      ]
    }
  };
  const copy = labels[lang] || labels.de;
  const slides = [
    ...copy.slides
  ];
  return `
    <figure class="image-carousel meister-carousel" data-image-carousel aria-label="${copy.aria}">
      <div class="image-carousel-track" data-carousel-track>
        ${slides.map(([file, alt]) => `<img class="image-carousel-slide" src="${prefix}${file}" alt="${alt}" loading="eager" decoding="async" fetchpriority="low" width="1448" height="1086">`).join("")}
      </div>
      <button class="image-carousel-btn image-carousel-prev" type="button" data-carousel-prev aria-label="${copy.prev}">&lsaquo;</button>
      <button class="image-carousel-btn image-carousel-next" type="button" data-carousel-next aria-label="${copy.next}">&rsaquo;</button>
      <div class="image-carousel-dots" aria-label="${copy.dots}">
        <button type="button" class="image-carousel-dot is-active" data-carousel-dot aria-label="${copy.show} 1" aria-current="true"></button>
        <button type="button" class="image-carousel-dot" data-carousel-dot aria-label="${copy.show} 2"></button>
      </div>
    </figure>`;
}

function kyotoImageCarousel(lang = "de", prefix = "__ASSET_PREFIX__assets/img/") {
  const labels = {
    de: {
      aria: "Kyoto 2009 Inspiration",
      prev: "Vorheriges Bild",
      next: "Naechstes Bild",
      dots: "Bildauswahl",
      show: "Bild",
      slides: [
        ["foto/10_vidkrytka-yaponiya/kyoto-garden-2009.webp", "Japanischer Garten in Kyoto mit Kiefer, Steinen und Wasser - Inspiration seit 2009"],
        ["foto/10_vidkrytka-yaponiya/kyoto-viktor-wife-2009.webp", "Viktor mit seiner Frau in Kyoto 2009 vor japanischem Garten und Goldenem Pavillon"],
        ["foto/10_vidkrytka-yaponiya/kyoto-zen-garden-wife-2009.webp", "Viktors Frau in Kyoto vor einem Zen-Garten - Inspiration für japanische Gartenkunst"],
        ["foto/10_vidkrytka-yaponiya/kyoto-golden-pavilion-pine-2009.webp", "Kiefer am Wasser beim Goldenen Pavillon in Kyoto - Form, Ruhe und Raumwirkung"],
        ["foto/10_vidkrytka-yaponiya/kyoto-sand-cone-garden-2009.webp", "Japanischer Garten in Kyoto mit Sandkegel und geschnittenen Kiefern"]
      ]
    },
    en: {
      aria: "Kyoto 2009 inspiration",
      prev: "Previous image",
      next: "Next image",
      dots: "Image selection",
      show: "Show image",
      slides: [
        ["foto/10_vidkrytka-yaponiya/kyoto-garden-2009.webp", "Japanese garden in Kyoto with pine, stones and water - inspiration since 2009"],
        ["foto/10_vidkrytka-yaponiya/kyoto-viktor-wife-2009.webp", "Viktor with his wife in Kyoto in 2009 in front of a Japanese garden and Golden Pavilion"],
        ["foto/10_vidkrytka-yaponiya/kyoto-zen-garden-wife-2009.webp", "Viktor's wife in Kyoto in front of a zen garden - inspiration for Japanese garden art"],
        ["foto/10_vidkrytka-yaponiya/kyoto-golden-pavilion-pine-2009.webp", "Pine by the water at the Golden Pavilion in Kyoto - form, calm and spatial effect"],
        ["foto/10_vidkrytka-yaponiya/kyoto-sand-cone-garden-2009.webp", "Japanese garden in Kyoto with sand cone and shaped pines"]
      ]
    },
    uk: {
      aria: "Натхнення з Кіото 2009",
      prev: "Попереднє зображення",
      next: "Наступне зображення",
      dots: "Вибір зображення",
      show: "Показати зображення",
      slides: [
        ["foto/10_vidkrytka-yaponiya/kyoto-garden-2009.webp", "Японський сад у Кіото з сосною, камінням і водою - натхнення з 2009 року"],
        ["foto/10_vidkrytka-yaponiya/kyoto-viktor-wife-2009.webp", "Віктор з дружиною у Кіото у 2009 році біля японського саду і Золотого павільйону"],
        ["foto/10_vidkrytka-yaponiya/kyoto-zen-garden-wife-2009.webp", "Дружина Віктора у Кіото біля дзен-саду - натхнення для японського садового мистецтва"],
        ["foto/10_vidkrytka-yaponiya/kyoto-golden-pavilion-pine-2009.webp", "Сосна біля води коло Золотого павільйону в Кіото - форма, спокій і простір"],
        ["foto/10_vidkrytka-yaponiya/kyoto-sand-cone-garden-2009.webp", "Японський сад у Кіото з піщаним конусом і формованими соснами"]
      ]
    }
  };
  const copy = labels[lang] || labels.de;
  const slides = copy.slides;
  return `
    <figure class="image-carousel kyoto-carousel" data-image-carousel style="aspect-ratio:3 / 2" aria-label="${copy.aria}">
      <div class="image-carousel-track" data-carousel-track>
        ${slides.map(([file, alt]) => `<img class="image-carousel-slide" src="${prefix}${file}" alt="${alt}" loading="lazy" decoding="async" width="900" height="600">`).join("")}
      </div>
      <button class="image-carousel-btn image-carousel-prev" type="button" data-carousel-prev aria-label="${copy.prev}">&lsaquo;</button>
      <button class="image-carousel-btn image-carousel-next" type="button" data-carousel-next aria-label="${copy.next}">&rsaquo;</button>
      <div class="image-carousel-dots" aria-label="${copy.dots}">
        ${slides.map((_, index) => `<button type="button" class="image-carousel-dot${index === 0 ? " is-active" : ""}" data-carousel-dot aria-label="${copy.show} ${index + 1}"${index === 0 ? ' aria-current="true"' : ""}></button>`).join("")}
      </div>
    </figure>`;
}

const inspirationBooks = [
  {
    id: "sakuteiki",
    title: "Sakuteiki",
    meta: "Visions of the Japanese Garden",
    author: "Jiro Takei & Marc P. Keane",
    amazon: "https://www.amazon.com/Sakuteiki-Japanese-Translation-Gardening-Classics/dp/0804839689",
    text: {
      de: "Ein altes Fundament japanischer Gartenkunst: Steinsetzung, Blickrichtung, Leere und Rhythmus. Nicht als Rezept, sondern als Haltung.",
      en: "An old foundation of Japanese garden art: stone placement, sight lines, emptiness and rhythm. Not as a recipe, but as an attitude.",
      uk: "Старий фундамент японського садового мистецтва: постановка каменів, напрям погляду, порожнеча і ритм. Не як рецепт, а як позиція."
    }
  },
  {
    id: "niwaki",
    title: "Niwaki",
    meta: "Pruning, Training and Shaping Trees the Japanese Way",
    author: "Jake Hobson",
    amazon: "https://www.amazon.com/Niwaki-Pruning-Training-Shaping-Japanese/dp/0881928356",
    text: {
      de: "Ein klares Buch über Form, Schnitt und Baumcharakter. Wichtig, weil es zeigt: Niwaki ist keine Hecke, sondern ein Baum mit Linie.",
      en: "A clear book about form, pruning and tree character. It matters because it shows that niwaki is not a hedge, but a tree with line.",
      uk: "Чітка книга про форму, зріз і характер дерева. Важлива тому, що показує: Niwaki - це не жива огорожа, а дерево з лінією."
    }
  },
  {
    id: "garden-design",
    title: "Japanese Garden Design",
    meta: "Structure, proportion and spatial calm",
    author: "Marc Peter Keane",
    amazon: "https://www.amazon.com/Japanese-Garden-Design-Peter-Keane/dp/4805319321",
    text: {
      de: "Hilft, Garten nicht als Sammlung von Pflanzen zu sehen, sondern als Raum aus Proportion, Weg, Blick und Ruhe.",
      en: "It helps to see a garden not as a collection of plants, but as a space built from proportion, path, view and calm.",
      uk: "Допомагає бачити сад не як набір рослин, а як простір з пропорції, шляху, погляду і тиші."
    }
  },
  {
    id: "stones",
    title: "The Art of Setting Stones",
    meta: "Material, weight and quiet composition",
    author: "Marc Peter Keane",
    amazon: "https://www.amazon.com/Art-Setting-Stones-Writings-Japanese/dp/1880656701",
    text: {
      de: "Steine lehren Gewicht und Zurückhaltung. Diese Logik ist auch beim Baum wichtig: nicht alles zeigen, sondern das Richtige stehen lassen.",
      en: "Stones teach weight and restraint. The same logic matters in tree work: do not show everything, leave the right things standing.",
      uk: "Камені вчать ваги і стриманості. Та сама логіка важлива в роботі з деревом: не показувати все, а залишати правильне."
    }
  },
  {
    id: "secret-teachings",
    title: "Secret Teachings in the Art of Japanese Gardens",
    meta: "Old principles translated into practice",
    author: "David A. Slawson",
    amazon: "https://www.amazon.com/Secret-Teachings-Art-Japanese-Gardens/dp/1568364946",
    text: {
      de: "Wichtig für das Verständnis von Naturbild, Asymmetrie und geführter Aufmerksamkeit im japanischen Garten.",
      en: "Useful for understanding nature image, asymmetry and guided attention in the Japanese garden.",
      uk: "Важлива для розуміння образу природи, асиметрії і керованої уваги в японському саду."
    }
  },
  {
    id: "shigemori",
    title: "Mirei Shigemori",
    meta: "Rebel in the Garden: Modern Japanese Landscape Architecture",
    author: "Christian Tschumi",
    amazon: "https://www.amazon.com/Mirei-Shigemori-Garden-Christian-Tschumi/dp/3035621756",
    text: {
      de: "Eine Erinnerung, dass Tradition nicht Stillstand ist. Gute Form respektiert Ursprung und bleibt trotzdem lebendig.",
      en: "A reminder that tradition is not standstill. Good form respects origin and still stays alive.",
      uk: "Нагадування, що традиція - це не застій. Добра форма поважає джерело і водночас лишається живою."
    }
  }
];

function inspirationBookSection(lang = "de") {
  const labels = {
    de: {
      eyebrow: "Inspiration aus Japan",
      title: "Bücher, die meine Arbeit prägen.",
      intro: "Ich arbeite nicht nach schnellen Mustern. Diese Quellen helfen mir, Form, Leere, Zeit und die Energie eines Baumes genauer zu lesen.",
      source: "Quelle",
      amazon: "Bei Amazon ansehen",
      note: "Diese Liste ist keine akademische Bibliothek. Sie zeigt, welche Denkweise hinter meiner Arbeit steht."
    },
    en: {
      eyebrow: "Inspiration from Japan",
      title: "Books that shape my eye.",
      intro: "I do not work from quick templates. These sources help me read form, emptiness, time and the energy of a tree more precisely.",
      source: "Source",
      amazon: "View on Amazon",
      note: "This is not an academic library. It shows the way of thinking behind my work."
    },
    uk: {
      eyebrow: "Натхнення з Японії",
      title: "Книги, які формують мій погляд.",
      intro: "Я не працюю за швидкими шаблонами. Ці джерела допомагають точніше читати форму, порожнечу, час і енергію дерева.",
      source: "Джерело",
      amazon: "Подивитися на Amazon",
      note: "Це не академічна бібліотека. Це коротко про мислення, яке стоїть за моєю роботою."
    }
  };
  const copy = labels[lang] || labels.de;
  return `
  <section class="section inspiration-books">
    <div class="section-head">
      <span class="eyebrow">${copy.eyebrow}</span>
      <h2>${copy.title}</h2>
      <p>${copy.intro}</p>
    </div>
    <div class="book-grid">
      ${inspirationBooks.map((book, index) => `
      <article class="book-card book-card-${book.id}">
        <img class="book-cover" src="__ASSET_PREFIX__assets/img/books/${book.id}.png" alt="${book.title} - ${book.author}" loading="eager" decoding="async" width="1024" height="1024">
        <span class="book-index">${copy.source} ${String(index + 1).padStart(2, "0")}</span>
        <h3>${book.title}</h3>
        <p>${book.text[lang] || book.text.de}</p>
        <span class="book-meta">${book.meta}<br>${book.author}</span>
        <a class="book-link" href="${book.amazon}" target="_blank" rel="noopener sponsored">${copy.amazon}</a>
      </article>`).join("")}
    </div>
    <p class="book-note">${copy.note}</p>
  </section>`;
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
  const aria = de
    ? "Vorher-Nachher Vergleich einer Pinus sylvestris Watereri"
    : uk
      ? "Порівняння до і після Pinus sylvestris Watereri"
      : "Before and after comparison of a Pinus sylvestris Watereri";
  const beforeLabel = de ? "Vorher" : uk ? "До" : "Before";
  const afterLabel = de ? "Nachher" : uk ? "Після" : "After";
  const rangeLabel = de ? "Vorher-Nachher Vergleich verschieben" : uk ? "Пересунути порівняння до і після" : "Move before and after comparison";
  const beforeAlt = de
    ? "Pinus sylvestris Watereri im Arbeitszustand vor der fertigen Niwaki-Form"
    : uk
      ? "Pinus sylvestris Watereri у робочому стані до готової форми Niwaki"
      : "Pinus sylvestris Watereri in the work state before the finished niwaki form";
  const afterAlt = de
    ? "Pinus sylvestris Watereri nach der Formkorrektur ohne Leiter im Bild"
    : uk
      ? "Pinus sylvestris Watereri після корекції форми без драбини в кадрі"
      : "Pinus sylvestris Watereri after shape correction with no ladder in the image";
  return `
    <figure class="before-after-slider" data-before-after-slider style="--split:40%" aria-label="${aria}">
      <div class="before-after-stage">
        ${photoImg({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-08.webp", lang, className: "after-img", label: afterAlt, loading: "eager", width: 1600, height: 1188 })}
        <div class="before-layer">
          ${photoImg({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-16.webp", lang, label: beforeAlt, loading: "eager", width: 1600, height: 1200 })}
        </div>
        <span class="slider-badge slider-badge-before">${beforeLabel}</span>
        <span class="slider-badge slider-badge-after">${afterLabel}</span>
      </div>
      <input class="before-after-range" type="range" min="0" max="100" value="40" aria-label="${rangeLabel}">
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

function aiLocalDiscoveryChecklist() {
  return `# AI / Local Discovery Handoff

Status: repo-side implementation is prepared. External accounts still need human access and approval.

## 1. Domain and Cloudflare Pages

- Deploy V1 through Cloudflare Pages Free from the GitHub repository.
- Add \`${domain.replace("https://", "")}\` and \`www.${domain.replace("https://", "")}\` as Cloudflare Pages custom domains.
- Keep Hostpoint mail MX/TXT/SPF/DMARC records as DNS-only records in Cloudflare.
- Do not publish \`v2/\`, \`/api/voice-lead\`, OpenAI transcription code, or raw handoff/transcription folders in the Cloudflare Pages output.
- Acceptance:
  - \`${domain}/\` returns 200.
  - \`${domain}/robots.txt\`, \`${domain}/sitemap.xml\`, and \`${domain}/llms.txt\` return 200.
  - \`www.${domain.replace("https://", "")}\` redirects or resolves consistently to the chosen canonical host.

## 2. Search Indexing

- Google Search Console: create a Domain property for \`${domain.replace("https://", "")}\`, verify by DNS, submit \`${domain}/sitemap.xml\`.
- Bing Webmaster Tools: add the domain, submit the sitemap, enable IndexNow if available.
- Run URL inspection for: \`${domain}/\`, \`${domain}/niwaki-schweiz\`, \`${domain}/gartenbonsai-zuerich\`, \`${domain}/kontakt\`.

## 3. Google Business Profile

- Default setup: service-area business, no private address displayed unless Viktor explicitly approves.
- Business name: Viktor Baumarchitektur.
- Primary category: Baumpflege / tree service equivalent available in GBP. Secondary categories only if accurate.
- Areas: Zürich, Zürichsee, Zug, Luzern, Aargau, Schwyz, Schaffhausen, Appenzell, Glarus.
- Services: Niwaki / Garten-Bonsai, Japanischer Ahorn Pflege, Kiefer Formschnitt, Nadelgehölze, kostenlose Foto-Diagnose.
- Add real photos only: Viktor at work, before/after, finished trees, garden context.
- Start review funnel after every completed job. Do not add fake or placeholder reviews.

## 4. Citations and Entity Profiles

Create or claim profiles only when Viktor can verify ownership:

- Apple Business Connect
- Bing Places
- local.ch / search.ch / localsearch
- Facebook
- Instagram
- Houzz or relevant Swiss garden/professional directories

Keep NAP consistent:

- Name: Viktor Baumarchitektur
- Phone: ${phoneDisplay}
- Website: ${domain}/
- Address: service-area only unless approved

Only add new profiles to JSON-LD \`sameAs\` after the public profile URL is live and controlled.

## 5. Monthly AI Monitoring

Check ChatGPT Search, Gemini/Google AI, Perplexity and Copilot with these query groups:

- "Niwaki Schweiz"
- "Gartenbonsai Zürich"
- "Japanischer Ahorn Pflege Schweiz"
- "Kiefer Kerzen schneiden Schweiz"
- "Was kostet japanische Baumpflege Zürich"
- "best niwaki specialist Zurich"

Log each result as: mentioned, cited, absent, wrong facts, action needed.
`;
}

function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${domain}/#business`,
        name: brand,
        url: domain,
        image: ogImageUrl,
        logo: `${domain}/assets/img/logo.png`,
        telephone: phone,
        priceRange: "ab 110 CHF/Std.",
        slogan: "Schweizer Qualität mit japanischer Philosophie.",
        description: "Spezialist für Niwaki, Garten-Bonsai, japanische Ahorne und Nadelgehölze in der Region Zürich und der Schweiz.",
        areaServed,
        address: {
          "@type": "PostalAddress",
          addressCountry: "CH",
          addressRegion: "Zürich"
        },
        contactPoint: {
          "@type": "ContactPoint",
          "@id": `${domain}/#contact`,
          telephone: phone,
          contactType: "customer service",
          areaServed: "CH",
          availableLanguage: ["de-CH", "en", "uk"]
        },
        founder: { "@id": `${domain}/#viktor` },
        hasOfferCatalog: { "@id": `${domain}/#offer-catalog` },
        sameAs: publicSameAs
      },
      {
        "@type": "Person",
        "@id": `${domain}/#viktor`,
        name: "Viktor",
        jobTitle: "Meister für japanische Baumkunst",
        worksFor: { "@id": `${domain}/#business` },
        knowsAbout: ["Niwaki", "Garten-Bonsai", "Acer palmatum", "Pinus", "Taxus baccata", "Juniperus", "Kiefer Formschnitt", "Topiarschere"],
        description: "27 Jahre Erfahrung in japanischer Baumkunst, Niwaki und Formschnitt."
      },
      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        name: brand,
        url: domain,
        publisher: { "@id": `${domain}/#business` },
        inLanguage: ["de-CH", "en", "uk"]
      },
      {
        "@type": "OfferCatalog",
        "@id": `${domain}/#offer-catalog`,
        name: "Japanische Baumpflege und Baumarchitektur",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${domain}/leistungen#niwaki`,
              name: "Niwaki Schnitt und Pflege",
              serviceType: "Niwaki / Garten-Bonsai"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${domain}/leistungen#ahorn`,
              name: "Acer palmatum Pflege / Japanischer Ahorn",
              serviceType: "Japanischer Ahorn Pflege"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${domain}/leistungen#nadelgehoelze`,
              name: "Pinus Formschnitt / Kiefer",
              serviceType: "Kiefer und Nadelgehölze"
            }
          }
        ]
      }
    ]
  };
}

function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${domain}/#viktor`,
    name: "Viktor",
    jobTitle: "Meister für japanische Baumkunst",
    worksFor: { "@id": `${domain}/#business` },
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
        name: "Welche Formung braucht mein Niwaki oder japanischer Ahorn?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Senden Sie Fotos vom ganzen Baum, der Problemstelle und einer Nahaufnahme. Ich prüfe zuerst kostenlos, welche Kronenpflege, Formkorrektur oder Schnittfolge sinnvoll ist."
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

function faqPageLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
}

function serviceLd(name, description) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    provider: { "@id": `${domain}/#business` },
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
  const hasUkAlternate = !discoveryPaths.includes(basePath);
  const languageSwitchEntries = [
    ["DE", dePath],
    ["EN", enPath],
    ...(hasUkAlternate ? [["UA", ukPath]] : []),
    ["FR", frPath],
    ["IT", itPath]
  ];
  const languageSwitchId = `language-switch-${lang}`;
  const currentLanguageLabel = languageSwitchEntries.find(([, targetPath]) => targetPath === canonicalPath)?.[0] || "DE";
  const languageToggleLabel = lang === "uk"
    ? "Вибрати мову"
    : lang === "en"
      ? "Choose language"
      : lang === "fr"
        ? "Choisir la langue"
        : lang === "it"
          ? "Scegli lingua"
          : "Sprache wählen";
  const languageSwitch = `<span class="lang-switch" data-lang-switch aria-label="${languageToggleLabel}">
        <button class="lang-current" type="button" data-lang-toggle aria-expanded="false" aria-controls="${languageSwitchId}">
          <span class="sr-only">${languageToggleLabel}</span><span aria-hidden="true">${currentLanguageLabel}</span>
        </button>
        <span class="lang-menu" id="${languageSwitchId}" data-lang-menu hidden>
          ${languageSwitchEntries.map(([label, targetPath]) => `<a href="${prefix}${fileFromCleanPath(targetPath)}"${targetPath === canonicalPath ? " aria-current=\"true\"" : ""}>${label}</a>`).join("")}
        </span>
      </span>`;
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
        brandLine: "Baumarchitektur · Arbres formes · Niwaki",
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
        credit: "",
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
          brandLine: "Baumarchitektur · Alberi modellati · Niwaki",
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
          credit: "",
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
        brandLine: "Baumarchitektur · Формовані дерева · Niwaki",
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
        credit: "",
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
          brandLine: "Baumarchitektur · Gartenbonsais · Gartengestaltung · Formgehölze",
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
          credit: "",
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
          brandLine: "Baumarchitektur · Shaped trees · Niwaki",
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
          credit: "",
          quickBar: "Quick contact bar",
          call: "Call",
          consent: "Analytics and ads measurement only run after consent. Default: denied.",
          privacyLabel: "Privacy",
          deny: "Deny",
          accept: "Accept"
        };
  const heroSwitcherLabel = lang === "uk"
    ? "Niwaki у швейцарському саду"
    : lang === "en"
      ? "Niwaki in a Swiss garden"
      : "Niwaki im Schweizer Garten";
  const headerHeroSwitcher = "";
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
  ${hasUkAlternate ? `<link rel="alternate" hreflang="uk" href="${cleanUrl(ukPath)}">` : ""}
  <link rel="alternate" hreflang="x-default" href="${cleanUrl("/")}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${brand}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${cleanUrl(canonicalPath)}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  ${preloadHero ? `<link rel="preload" as="image" href="${prefix}assets/img/${heroPreloadFile}" fetchpriority="high">` : ""}
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
      ${languageSwitch}
      <a class="header-phone" href="${telHref}" data-event="cta_call_click" aria-label="${ui.call}: ${phoneDisplay}" title="${ui.call}: ${phoneDisplay}"><span aria-hidden="true">☎</span><span class="sr-only">${ui.call}: ${phoneDisplay}</span></a>
      ${headerHeroSwitcher}
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
    ${ui.credit ? `<p class="site-credit">${ui.credit}</p>` : ""}
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
      <h2>Aus gewöhnlichen Bäumen besondere Gartenformen entwickeln.</h2>
      <p>Senden Sie mir drei Fotos. Ich prüfe, welche künstlerische Baumformung, Kronenstruktur-Korrektur oder Pflegefolge zu Ihrem Baum passt - ohne Schnell-Schnitt und ohne falsche Versprechen.</p>
      <div class="btn-row">${cta("Foto senden - Baumform einschätzen")} <a class="btn btn-secondary" href="${contactPrefix}kontakt.html#rueckruf" data-event="cta_callback_click">Rückruf anfordern</a></div>
    </div>
  </section>`;
}

function finalCtaEn(contactPrefix = "") {
  return `<section class="section final-cta">
    <div>
      <span class="eyebrow">Free first assessment</span>
      <h2>Turn an ordinary tree into a remarkable garden form.</h2>
      <p>Send three photos. I will assess which artistic tree shaping, crown-structure correction or care sequence fits your tree - no quick cuts and no false promises.</p>
      <div class="btn-row">${cta("Send photo - assess tree form")} <a class="btn btn-secondary" href="${contactPrefix}kontakt.html#rueckruf" data-event="cta_callback_click">Request callback</a></div>
    </div>
  </section>`;
}

function discoveryTeaserDe() {
  const answerLinks = answerPages.map((page) => `<a href="${page.slug}.html">${page.eyebrowDe}</a>`).join("");
  const geoLinks = geoPages.map((page) => `<a href="${page.slug}.html">${page.h1De.replace(/\.$/, "")}</a>`).join("");
  return `<section class="section discovery-hub">
    <div class="section-head">
      <span class="eyebrow">Antworten für Such- und KI-Systeme</span>
      <h2>Die wichtigsten Fragen klar beantwortet.</h2>
      <p>Diese Seiten bündeln konkrete Suchfragen: Niwaki Schweiz, Garten-Bonsai Zürich, japanischer Ahorn, Kiefer-Kerzen und Kosten. Jede Seite führt zurück zur Foto-Diagnose.</p>
    </div>
    <div class="link-cloud" aria-label="Fachthemen">${answerLinks}</div>
    <div class="link-cloud" aria-label="Arbeitsgebiete">${geoLinks}</div>
  </section>`;
}

function discoveryTeaserEn() {
  const answerLinks = answerPages.map((page) => `<a href="${page.slug}.html">${page.eyebrowEn}</a>`).join("");
  const geoLinks = geoPages.map((page) => `<a href="${page.slug}.html">${page.h1En.replace(/\.$/, "")}</a>`).join("");
  return `<section class="section discovery-hub">
    <div class="section-head">
      <span class="eyebrow">Answer pages</span>
      <h2>Clear answers for search and AI assistants.</h2>
      <p>These pages cover the practical questions people ask about niwaki, garden bonsai, Japanese maple care, pine candles and pricing in Switzerland.</p>
    </div>
    <div class="link-cloud" aria-label="Topics">${answerLinks}</div>
    <div class="link-cloud" aria-label="Service areas">${geoLinks}</div>
  </section>`;
}

function renderFaqDetails(faqItems) {
  return faqItems.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("");
}

function answerPage(page, lang = "de") {
  const isEn = lang === "en";
  const title = isEn ? page.h1En : page.h1De;
  const intro = isEn ? page.introEn : page.introDe;
  const bullets = isEn ? page.bulletsEn : page.bulletsDe;
  const faq = isEn ? page.faqEn : page.faqDe;
  const [folder, file] = page.image;
  const ctaMarkup = isEn ? finalCtaEn() : finalCtaDe();
  return `
  <section class="page-hero section">
    <span class="eyebrow">${isEn ? page.eyebrowEn : page.eyebrowDe}</span>
    <h1>${title}</h1>
    <p>${intro}</p>
  </section>
  <section class="section split">
    <div>
      <h2>${isEn ? "What matters first." : "Worauf es zuerst ankommt."}</h2>
      <ul class="check-list">${bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
      <p>${isEn ? "The first step is not a generic quote. Send three useful photos so Viktor can judge whether the tree is suitable for careful shaping or rescue." : "Der erste Schritt ist kein pauschales Angebot. Senden Sie drei brauchbare Fotos, damit Viktor beurteilen kann, ob der Baum fuer sorgfaeltige Formung oder Rettung geeignet ist."}</p>
      ${isEn ? cta("Send photos - free assessment") : cta("Fotos senden - kostenlose Einschätzung")}
    </div>
    ${photoSlot({ folder, file, lang, label: title, ratio: "4 / 3" })}
  </section>
  <section class="section faq">
    <div class="section-head">
      <span class="eyebrow">FAQ</span>
      <h2>${isEn ? "Short answers." : "Kurze Antworten."}</h2>
    </div>
    ${renderFaqDetails(faq)}
  </section>
  ${ctaMarkup}`;
}

function geoPage(page, lang = "de") {
  const isEn = lang === "en";
  const [folder, file] = page.image;
  return `
  <section class="page-hero section">
    <span class="eyebrow">${isEn ? "Service area" : "Arbeitsgebiet"}</span>
    <h1>${isEn ? page.h1En : page.h1De}</h1>
    <p>${isEn ? page.areaLineEn : page.areaLineDe}</p>
  </section>
  <section class="section split">
    <div>
      <h2>${isEn ? "For selected trees, not generic garden maintenance." : "Für ausgewählte Bäume, nicht für gewöhnlichen Gartenunterhalt."}</h2>
      <p>${isEn ? "Viktor travels when the tree is worth the work: niwaki, garden bonsai, Japanese maples, pines and other valuable shaped trees. The photo diagnosis filters whether an on-site visit makes sense." : "Viktor reist, wenn der Baum die Arbeit wert ist: Niwaki, Garten-Bonsai, japanische Ahorne, Kiefern und andere wertvolle Formgehoelze. Die Foto-Diagnose klaert, ob ein Vor-Ort-Termin Sinn ergibt."}</p>
      <ul class="check-list">
        <li>${isEn ? "Send one full tree photo, one problem area and one close-up." : "Senden Sie ein Foto vom ganzen Baum, eine Problemstelle und eine Nahaufnahme."}</li>
        <li>${isEn ? "Work from 110 CHF/hour, travel from 90 CHF." : "Arbeit ab 110 CHF/Std., Anfahrt ab 90 CHF."}</li>
        <li>${isEn ? "No emergency felling, no cheap hedge trimming, no lawn maintenance." : "Keine Notfall-Faellarbeiten, kein Billig-Heckenschnitt, kein Rasenunterhalt."}</li>
      </ul>
      ${isEn ? cta("Send photos from this area") : cta("Fotos aus dieser Region senden")}
    </div>
    ${photoSlot({ folder, file, lang, label: isEn ? page.h1En : page.h1De, ratio: "4 / 3" })}
  </section>
  ${isEn ? discoveryTeaserEn() : discoveryTeaserDe()}
  ${isEn ? finalCtaEn() : finalCtaDe()}`;
}

function homeDe() {
  return `
  <section class="hero section" data-hero-root data-hero-variant="4">
    <div class="hero-media">${heroPhotoSlot({ lang: "de", label: "Niwaki im Schweizer Garten" })}</div>
    <div class="hero-panel">
      ${heroServiceLine()}
      <h1>Gartenbonsais (<span class="hero-accent">Niwaki</span>) & japanische Baumkunst in der Schweiz</h1>
      <p class="motto">Schweizer Qualität mit japanischer Philosophie.</p>
      <p class="hero-copy hero-copy-variant hero-copy-v2">Schweizer Perfektion trifft auf japanische Philosophie. Ich schneide nicht einfach Bäume – ich erschaffe lebende Skulpturen durch präzise, meisterhafte Handarbeit für Form, Kraft und zeitlose Ästhetik.</p>
      <p class="hero-copy hero-copy-desktop">Als Meister für <strong>Niwaki und Garten-Bonsai</strong> in der <strong>Region Zürich</strong> forme und pflege ich seit 27 Jahren japanische Ahorne, Kiefern und Nadelgehölze - so, dass Ihr Baum über Jahre seine Form, seine Kraft und seine Gesundheit behält.</p>
      <p class="hero-copy hero-copy-mobile">27 Jahre Niwaki-Pflege in der Region Zürich: präzise Handarbeit für Form, Kraft und Gesundheit.</p>
      <div class="btn-row">${cta("Foto senden - kostenlose Diagnose")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Rückruf anfordern</a></div>
      <div class="trust-row"><span class="experience-pill"><strong>27</strong> Jahre Erfahrung</span><span>Region Zürich</span><span>Inspiriert in Japan</span></div>
    </div>
  </section>

  <section class="section rescue-section">
    <div class="section-head">
      <span class="eyebrow">Vorher / Nachher</span>
      <h2>Wenn der Schnitt wieder Luft, Licht und Ruhe zurückbringt.</h2>
      <p>Pinus sylvestris 'Watereri' im Vergleich: links der Arbeitszustand mit geschütztem Wurzelbereich, rechts die fertige Niwaki-Form - ohne Leiter und ohne Arbeitszeug im Nachher-Bild.</p>
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
    ${photoSlot({ folder: "08_fonovi", file: "garden-view-chair-niwaki-01.webp", lang: "de", label: "Ruhiger Gartenmoment mit Niwaki, Terrasse und Aussicht", ratio: "3 / 4" })}
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
    ${meisterImageCarousel("de")}
    <div>
      <span class="eyebrow">Künstlerische Baumformung</span>
      <h2>Aus einem gewöhnlichen Baum kann eine aussergewöhnliche Gartenform werden.</h2>
      <p>Ein Meister beginnt nicht mit der Schere, sondern mit dem Lesen: Stammbewegung, tragende Äste, leere Räume, Lichtfenster und die Energieverteilung in der Krone. Erst daraus entsteht eine Form, die nicht aufgesetzt wirkt.</p>
      <p>Ich nenne das Baumarchitektur, künstlerische Baumpflege und Kronenstruktur-Korrektur. Die Arbeit folgt nicht einem Schema, sondern dem Baum: was bleibt, was entlastet wird und welche Linie in den nächsten Jahren aufgebaut werden kann.</p>
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

  ${discoveryTeaserDe()}

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
    ${kyotoImageCarousel("de")}
  </section>
  ${inspirationBookSection("de")}
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

function philosophyEn() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Philosophy</span>
    <h1>From simple cutting to Japanese tree art.</h1>
    <p>Japanese garden art is not decoration. It is craft, analysis and respect for natural laws.</p>
  </section>
  <section class="section split">
    <div><h2>Kyoto 2009 changed my eye.</h2><p>Before my journey to Japan, I mostly cut trees: correct the shape, make them denser, keep them smaller. In Kyoto in 2009, I saw that Japanese tree care is something else - a master craft that treats the tree as a living being.</p><p>Since then, I am not interested in a quick cut. I read the tree, respect its reaction and work with it, not against it. Every cut is a decision for the next years.</p></div>
    ${kyotoImageCarousel("en")}
  </section>
  ${inspirationBookSection("en")}
  <section class="section split reverse">
    ${photoSlot({ folder: "07_viktor", file: "viktor-02.webp", lang: "en", label: "Master hands and Japanese tools", ratio: "3 / 2" })}
    <div><h2>Working with nature's laws.</h2><p>A tree is not a green mass. It is a living system of crown, trunk, roots, light, water and time. If every bud is cut by a fixed pattern, the result cannot stay strong against nature.</p><p>My standard is simple: you should be satisfied not only directly after the work, but also after one, two and three years. The form has to stay honest.</p></div>
  </section>
  <section class="section split" id="wurzeln">
    <div><span class="eyebrow">Looking at the roots</span><h2>Looking at the roots.</h2><p>As with the foundation of a house, everything starts below ground. The right soil, the right acidity and the right water-air balance are the base of health.</p><p>I do not promise miracles above your head. I promise to work correctly and correct mistakes. Follow the recommendations, and the form can stay for years.</p></div>
    ${photoSlot({ folder: "10_vidkrytka-yaponiya", file: "vidkrytka-yaponiya-01.webp", lang: "en", label: "Japanese inspiration and bonsai tool culture", ratio: "3 / 2" })}
  </section>
  <section class="section note-block"><h2>Topiary scissors instead of a hedge trimmer.</h2><p>A hedge trimmer tears. Fibres remain, and the tree reacts as if many small branches were injured. With sharp Japanese topiary scissors I cut cleanly: less damage, faster recovery and full strength for the form.</p></section>
  ${finalCtaEn()}`;
}

function philosophyUk() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Філософія</span>
    <h1>Від простого зрізу до японського мистецтва дерева.</h1>
    <p>Японське садове мистецтво - це не декорація. Це ремесло, аналіз і повага до законів природи.</p>
  </section>
  <section class="section split">
    <div><h2>Кіото 2009 змінило мій погляд.</h2><p>До поїздки в Японію я здебільшого просто стриг дерева: поправити форму, зробити щільніше, втримати розмір. У Кіото в 2009 році я побачив інший рівень - японське майстерство догляду за деревами, де дерево сприймають як живу істоту.</p><p>Відтоді мене цікавить не швидкий зріз, а мистецтво японських майстрів: прочитати дерево, поважати його реакцію і працювати з ним, а не проти нього. Кожен зріз - це рішення на наступні роки.</p></div>
    ${kyotoImageCarousel("uk")}
  </section>
  ${inspirationBookSection("uk")}
  <section class="section split reverse">
    ${photoSlot({ folder: "07_viktor", file: "viktor-02.webp", lang: "uk", label: "Руки майстра і японський інструмент", ratio: "3 / 2" })}
    <div><h2>Робота за законами природи.</h2><p>Дерево - це не зелена маса. Це жива система з крони, стовбура, коріння, світла, води і часу. Якщо різати кожну бруньку за схемою, проти законів природи не буде довгого результату.</p><p>Мій стандарт: щоб ви були задоволені не тільки одразу після роботи, а й через один, два і три роки. Щоб форма лишалася чесною.</p></div>
  </section>
  <section class="section split" id="wurzeln">
    <div><span class="eyebrow">Погляд у коріння</span><h2>Погляд у коріння.</h2><p>Як фундамент будинку, усе починається під землею. Правильний ґрунт, правильна кислотність і баланс води та повітря - це база здоров'я.</p><p>Я не обіцяю чудес через вашу голову. Я обіцяю працювати правильно і виправляти помилки. Якщо дотримуватись рекомендацій, форма може триматися роками.</p></div>
    ${photoSlot({ folder: "10_vidkrytka-yaponiya", file: "vidkrytka-yaponiya-01.webp", lang: "uk", label: "Японське натхнення і культура інструментів bonsai", ratio: "3 / 2" })}
  </section>
  <section class="section note-block"><h2>Японські ножиці замість тримера.</h2><p>Тример рве. Лишаються волокна, і дерево реагує так, ніби багато дрібних гілок травмовано. Гострими японськими топіарними ножицями я роблю чистий зріз: менше шкоди, швидше відновлення і більше сили для форми.</p></section>
  ${finalCtaUk()}`;
}

function galleryPage(lang = "de") {
  const de = lang === "de";
  const uk = lang === "uk";
  const prefix = uk
    ? {
        eyebrow: "Галерея",
        h1: "До і після - реальні приклади робіт.",
        intro: "Спочатку показані тільки строгі пари: той самий об'єкт або очевидно пов'язаний контекст, де зміна читається без пояснень. Нижче йдуть окремі категорії: процес, готові дерева, садовий контекст і робочі деталі.",
        beforeEyebrow: "Строге до і після",
        beforeTitle: "Пари, які витримали візуальну перевірку.",
        beforeText: "У верхньому блоці лишаються тільки підтверджені кейси. Contact sheet не є доказом; кожна пара перевіряється окремо.",
        workEyebrow: "Готові Niwaki",
        workTitle: "Найсильніші готові дерева і садові бонсаї.",
        workText: "Відібрані кадри без слабкого архіву: форма, пропорція, хмарні яруси і масштаб дерева. Це premium-секція готової роботи, не before/after-доказ."
      }
    : de
      ? {
          eyebrow: "Galerie",
          h1: "Vorher / Nachher - reale Arbeiten.",
          intro: "Zuerst stehen nur strenge Paare: gleicher Baum oder klar verbundener Kontext, bei dem die Veränderung ohne Erklärung lesbar bleibt. Darunter folgen getrennte Kategorien für Prozess, fertige Bäume, Gartenkontext und Details.",
          beforeEyebrow: "Strenges Vorher / Nachher",
          beforeTitle: "Paare, die die visuelle Prüfung bestehen.",
          beforeText: "Im oberen Block bleiben nur bestätigte Fälle. Ein Contact Sheet ist kein Beweis; jedes Paar wird einzeln geprüft.",
          workEyebrow: "Fertige Niwaki",
          workTitle: "Die stärksten fertigen Bäume und Gartenbonsais.",
          workText: "Kuratiert statt Foto-Lager: Form, Proportion, Wolkenetagen und Baum-Massstab. Diese Sektion zeigt fertige Wirkung, nicht Vorher-/Nachher-Beweis."
        }
      : {
          eyebrow: "Gallery",
          h1: "Before / after - real work examples.",
          intro: "First are strict pairs only: the same tree or an obviously connected context where the change reads without explanation. Below are separate categories for process, finished trees, garden context and details.",
          beforeEyebrow: "Strict before / after",
          beforeTitle: "Pairs that pass visual review.",
          beforeText: "Only confirmed cases remain in the top block. A contact sheet is not proof; each pair is checked separately.",
          workEyebrow: "Finished niwaki",
          workTitle: "The strongest finished trees and garden bonsai.",
          workText: "Curated instead of a photo dump: form, proportion, cloud layers and tree scale. This section shows finished effect, not before/after proof."
        };
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
            eyebrow: "Formgehölze",
            title: "Кулі і формальна структура саду.",
            text: "Формовані кущі стоять окремо від хмарних сосен і строгих пар до/після. Це інша мова форми: щільність, лінія і топіарна точність."
          },
          items: taxusFormGalleryItems()
        },
          {
            copy: {
            eyebrow: "Acer і листяні дерева",
            title: "Обрізка та формування дерев з листям.",
            text: "Для листяних дерев Віктор працює не по зеленій масі, а по скелету: прибирає зайві та перехресні пагони, відкриває світло всередину крони і залишає напрямки росту, які будуть будувати форму після нового листя."
          },
          items: mapleGalleryItems(),
          gridClass: "gallery-portrait-grid"
        },
        {
          copy: {
            eyebrow: "Віктор за роботою",
            title: "Руки, інструмент і масштаб дерева.",
            text: "Портретні та робочі кадри показують, що ця робота робиться вручну, біля живого дерева, з відповідальністю за результат."
          },
          items: viktorGalleryItems(),
          gridClass: "gallery-portrait-grid"
        },
        {
          copy: {
            eyebrow: "Процес і деталі",
            title: "Помилки догляду, свічки й деталі зрізу.",
            text: "Тут лежать крупні плани і технічні кадри: свічки, стара хвоя, загущення, вентиляція крони і приклади того, що не треба продавати як повний кейс до/після."
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
              eyebrow: "Formgehölze",
              title: "Kugeln und formale Gartenstruktur.",
              text: "Geschnittene Formen stehen hier separat von Wolkenkiefern und strengen Vorher/Nachher-Paaren. Das ist eine andere Formsprache: Dichte, Linie und Topiary-Präzision."
            },
            items: taxusFormGalleryItems()
          },
          {
            copy: {
              eyebrow: "Acer & Laubgehölze",
              title: "Schnitt und Formung von Bäumen mit Laub.",
              text: "Bei Laubgehölzen arbeitet Viktor nicht gegen eine grüne Masse, sondern mit dem Astgerüst: störende und kreuzende Triebe werden reduziert, Licht kommt in die Krone, und die Triebe bleiben dort, wo sie die nächste Form aufbauen."
            },
            items: mapleGalleryItems(),
            gridClass: "gallery-portrait-grid"
          },
          {
            copy: {
              eyebrow: "Viktor bei der Arbeit",
              title: "Hände, Werkzeug und Baum-Massstab.",
              text: "Diese Fotos zeigen die Arbeit am lebenden Baum: von Hand, mit japanischem Werkzeug und mit Verantwortung für das Ergebnis."
            },
            items: viktorGalleryItems(),
            gridClass: "gallery-portrait-grid"
          },
          {
            copy: {
              eyebrow: "Prozess und Details",
              title: "Pflegefehler, Kerzen und Schnittdetails.",
              text: "Hier stehen Nahaufnahmen und technische Bilder: Kerzen, alte Nadeln, Verdichtung, Luft in der Krone und Beispiele, die nicht als kompletter Vorher-/Nachher-Fall verkauft werden."
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
              eyebrow: "Shaped shrubs",
              title: "Topiary balls and formal garden structure.",
              text: "Clipped forms sit separately from cloud pines and strict before/after pairs. This is another formal language: density, line and topiary precision."
            },
            items: taxusFormGalleryItems()
          },
          {
            copy: {
              eyebrow: "Acer & deciduous trees",
              title: "Pruning and shaping trees with leaves.",
              text: "With deciduous trees, Viktor does not cut against a green mass. He reads the branch structure: reducing crossing or excessive shoots, bringing light into the crown and keeping the growth directions that will build the next shape."
            },
            items: mapleGalleryItems(),
            gridClass: "gallery-portrait-grid"
          },
          {
            copy: {
              eyebrow: "Viktor at work",
              title: "Hands, tools and tree scale.",
              text: "These photos show the work beside the living tree: by hand, with Japanese tools and responsibility for the result."
            },
            items: viktorGalleryItems(),
            gridClass: "gallery-portrait-grid"
          },
          {
            copy: {
              eyebrow: "Process and details",
              title: "Care mistakes, candles and cutting details.",
              text: "Close-ups and technical images live here: candles, old needles, density, air inside the crown and examples that should not be sold as full before/after cases."
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
  </section>
  ${watereriWorkSeriesBlock(lang)}
  ${watereriTwoTreesFeatureSection(lang)}
  ${connectedGallerySeriesBlock(lang)}
  ${parvifloraCandleSetSection(lang)}
  ${pinusNigraFeatureSection(lang)}
  ${wintergoldFeatureSection(lang)}
  ${pumilioFeatureSection(lang)}
  ${pinusThunbergiiFeatureSection(lang)}
  <section class="section">
    <div class="section-head"><span class="eyebrow">${prefix.workEyebrow}</span><h2>${prefix.workTitle}</h2><p>${prefix.workText}</p></div>
    <div class="gallery-real-grid">${photoGallery(workItems, lang, workItems.length, { eagerCount: 6, highPriorityCount: 0 })}</div>
  </section>
  ${extraSections.map((section) => galleryPhotoSection(section.copy, section.items, lang, { gridClass: section.gridClass })).join("")}
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
    <p>Was kostet professionelle <strong>japanische Baumpflege</strong>ss Vier Stunden gute Arbeit sind mehr wert als zwei Stunden schnelle. Wer am Schnitt spart, zahlt mit der Form und der Gesundheit des Baumes - oft über Jahre.</p>
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
    <div class="btn-row">${cta("Foto senden - kostenlose Diagnose")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Rückruf anfordern</a></div>
  </section>`;
}

function blogIndexDe() {
  return `
  <section class="page-hero section">
    <span class="eyebrow">Wissen</span>
    <h1>Wissen rund um Niwaki, Ahorne und Nadelgehölze.</h1>
    <p>Kurze, klare Artikel zu Topiarschere, Formschnitt und gesunder Baumarchitektur.</p>
  </section>
  <section class="section card-grid">
    <article class="card article-card">${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "de", label: "Topiarschere und sauberer Schnitt", ratio: "3 / 2" })}<h2>Warum ich mit der Topiarschere schneide</h2><p>Sauberer Schnitt statt gerissene Fasern: warum das Werkzeug die Gesundheit des Baumes beeinflusst.</p><a href="/blog/topiarschere.html">Artikel lesen</a></article>
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
    <p>Mit der Topiarschere arbeite ich anders. Jeder Schnitt ist sichtbar entschieden: Wo braucht die Wolke Lichtss Wo muss Luft durch die Kroness Welche Knospe bleibt, damit die Form in einem Jahr noch stimmtss Die scharfe japanische Schere macht einen sauberen Schnitt, der schneller verheilt und dem Baum weniger Kraft raubt.</p>
    <p>Das ist der Unterschied zwischen gewöhnlichem Gartenunterhalt und Feinarbeit. Ich schneide nicht jede Knospe nach Schema. Ich lese die Architektur des Baumes. Besonders bei Pinus, Taxus, Juniperus und Acer palmatum entscheidet diese Ruhe darüber, ob der Baum nur kurz gut aussieht - oder über Jahre Form und Gesundheit behält.</p>
    <p>Wenn Sie unsicher sind, ob Ihr Baum falsch geschnitten wurde, senden Sie mir Fotos. Oft erkennt man an Nadeln, trockenen Ästen und dichter Krone schon, ob ein sauberer Formschnitt helfen kann.</p>
    <div class="btn-row">${cta("Foto senden - kostenlose Diagnose")}</div>
  </article>`;
}

const blogArticlesDeV2 = [
  {
    slug: "topiarschere",
    title: "Warum ich mit der Topiarschere schneide",
    teaser: "Saubere Schnitte, weniger Faserverletzung und mehr Kontrolle als mit der Heckenschere.",
    image: "foto/07_viktor/viktor-topiarschere-2026-06-29.webp",
    label: "Viktor mit Topiarschere beim präzisen Formschnitt"
  },
  {
    slug: "energie-krone",
    title: "Warum ich die Krone öffne",
    teaser: "Licht, Luft und Energieverteilung: warum ein wertvoller Baum nicht wie eine Hecke behandelt wird.",
    image: "foto/04_khvoyni/energie-krone-pinus-crown-01.webp",
    label: "Nahaufnahme einer Nadelgehölz-Krone mit jungem Austrieb"
  },
  {
    slug: "niwaki-bonsai-stile",
    title: "Künstlerische Baumformung: Prinzipien und Methoden",
    teaser: "Wie aus einem gewöhnlichen Gartenbaum durch Lesen, Entlasten und Führen eine besondere Form entsteht.",
    image: "foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp",
    label: "Künstlerische Baumformung und ruhige Wolkenform im Garten"
  },
  {
    slug: "kiefer-kerzen",
    title: "Kiefer-Kerzen: der richtige Moment",
    teaser: "Warum verholzte Jahrestriebe bei Pinus thunbergii nicht einfach mittig geschnitten werden dürfen.",
    image: "foto/09_pomylky/pomylka-svichka-02.webp",
    label: "Pinus-Kerzen als neues Wachstum"
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
    <p>Sieben Artikel erklären meine Arbeit einfach, aber fachlich: künstlerische Baumformung, Werkzeug, Kronenenergie, Kiefer-Kerzen, alte Nadeln, Moos, Pilzrisiko, Wurzeln und Klimastress in Schweizer Premium-Gärten.</p>
  </section>
  <section class="section article-grid">
    ${blogArticlesDeV2.map((article) => `<article class="card article-card">${assetSlot({ file: article.image, label: article.label, ratio: "3 / 2" })}<span class="eyebrow">Wissen</span><h2>${article.title}</h2><p>${article.teaser}</p><a href="/blog/${article.slug}.html">Artikel lesen</a></article>`).join("")}
  </section>
  ${finalCtaDe("../")}`;
}

function articleTopiaryDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Topiarschere</span>
    <h1>Warum ich mit der Topiarschere schneide.</h1>
    ${photoSlot({ folder: "07_viktor", file: "viktor-topiarschere-2026-06-29.webp", lang: "de", label: "Ich mit Topiarschere an einer Kiefer", ratio: "4 / 3" })}
    <p>Ein guter Formschnitt beginnt nicht mit Tempo, sondern mit der Entscheidung, was der Baum in Zukunft tragen soll. Bei Niwaki, Kiefer-Formschnitt und japanischer Baumpflege reicht es nicht, die äussere Kontur schnell zu glätten. Der Baum ist kein grüner Block. Er ist ein lebendes System aus Krone, Stamm und Wurzeln.</p>
    <div class="comparison-grid"><div><h2>Heckenschere</h2><p>Schnell, breit, mechanisch. Gut für eine Hecke, riskant für einen wertvollen Solitärbaum. Sie kann feine Triebe reissen und eine dichte Aussenhaut erzeugen.</p></div><div><h2>Topiarschere</h2><p>Langsam, präzise, bewusst. Jeder Schnitt entscheidet, welche Knospe bleibt, wo Luft hineinkommt und wie sich die Wolke nächstes Jahr entwickelt.</p></div></div>
    <p>Zurückgerissene Fasern sind für den Baum keine Kleinigkeit. Er reagiert auf Verletzung, schliesst Wunden und verteilt Kraft neu. Was im ersten Moment ordentlich aussieht, kann dem Baum über Monate Energie nehmen, wenn der Schnitt zu grob, zu flächig oder zur falschen Zeit gemacht wurde.</p>
    ${hedgeTrimmerMistakeBlock("de")}
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
    ${photoSlot({ folder: "04_khvoyni", file: "energie-krone-pinus-crown-01.webp", lang: "de", label: "Detail einer Kiefernkrone mit jungem Austrieb", ratio: "4 / 3" })}
    <p>Ich arbeite mit einem einfachen Bild: Die Krone ist der grosse Energieverbraucher, der Stamm leitet, die Wurzeln versorgen. Wenn die Krone zu dicht wird, verbraucht sie Kraft an den falschen Stellen. Wenn oben zu stark wächst, wird unten schwach. Wenn innen kein Licht mehr ankommt, stirbt die Struktur von innen heraus.</p>
    <h2>Die Krone wird nicht leer gemacht. Sie wird lesbar gemacht.</h2>
    <p>Öffnen bedeutet nicht, den Baum radikal auszudünnen. Es bedeutet, die richtigen Fenster zu schaffen: Luft durch die Krone, Licht auf innere Knospen, weniger Reibung zwischen Ästen, weniger Feuchtigkeit in engen Bereichen. Gute Arbeit sieht am Ende natürlich aus, nicht geschnitten.</p>
    <div class="process-grid"><div><strong>1. Lesen</strong><p>Wo fliesst Kraft? Welche Linie trägt den Charakter?</p></div><div><strong>2. Entlasten</strong><p>Totholz, falsche Triebe und Schattenzonen werden reduziert.</p></div><div><strong>3. Zukunft lassen</strong><p>Die Knospen, die Form aufbauen, bleiben bewusst stehen.</p></div></div>
    <p>Für einen Premium-Garten ist das kein Detail. Die Krone bestimmt, wie der Baum vom Haus, von der Terrasse und vom Weg aus wirkt. Ein Meister sieht nicht nur das heutige Bild. Er sieht, was der Baum in einem, zwei und drei Jahren daraus macht.</p>
    ${sourceListV2([["RHS: Koniferen nur vorsichtig und meist am neuen Wachstum schneiden", "https://www.rhs.org.uk/plants/types/trees/pruning-guide"], ["Purdue Extension: Schnitt verändert Wachstum und Verzweigung", "https://ag.purdue.edu/department/hla/extension/extension-publications-library/ext-pubs/ho-4-w.html"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Foto senden - Kronenstruktur prüfen")}</div>
  </article>`;
}

function articleStylesDeV2() {
  return `
  <article class="article section">
    <span class="eyebrow">Künstlerische Baumformung</span>
    <h1>Künstlerische Baumformung: Prinzipien und Methoden.</h1>
    ${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "de", label: "Künstlerische Baumformung mit ruhiger Wolkenform im Garten", ratio: "16 / 9" })}
    <p>Aus einem gewöhnlichen Gartenbaum kann eine aussergewöhnliche, ruhige und lebendige Form entstehen. Nicht durch schnelle Schablone, sondern durch Lesen: Stammbewegung, Astgerüst, innere Leerräume, Lichtfenster und die Reaktion des Baumes.</p>
    <p>Niwaki ist dabei kein kleiner Bonsai im Garten. Die RHS beschreibt Cloud Pruning als japanische Methode, Bäume und Sträucher in wolkenartige Formen zu erziehen; Niwaki bedeutet Gartenbaum. Für mich heisst das: Der Baum bleibt ein lebendes Wesen im Garten, aber seine Struktur wird lesbar, bewusst korrigiert und über Jahre geführt.</p>
    <div class="process-grid">
      <div><strong>1. Struktur lesen</strong><p>Art, Alter, Stammbewegung, tragende Äste und innere Kraft zeigen, welche Form möglich ist.</p></div>
      <div><strong>2. Leere schaffen</strong><p>Nicht alles wird dichter gemacht. Gute Form braucht Luft, Licht, Abstand und ruhige Zwischenräume.</p></div>
      <div><strong>3. Zukunft führen</strong><p>Jeder Schnitt entscheidet, welche Knospe, welcher Ast und welche Silhouette die nächsten Jahre aufbauen.</p></div>
    </div>
    <p>Die wichtigste Methode ist selektives Arbeiten. Eine Heckenschere glättet Oberfläche; künstlerische Baumpflege entscheidet innen: welche Linie trägt den Charakter, welcher Ast nimmt Kraft weg, wo muss die Krone geöffnet werden, damit der Baum gesund reagiert.</p>
    <p>Darum empfehle ich nicht jedem Kunden dieselbe Silhouette. Manche Bäume brauchen zuerst Entlastung und Gesundheit. Manche brauchen eine ruhigere Aussenlinie. Andere können über mehrere Jahre zu echten Garten-Skulpturen werden.</p>
    ${sourceListV2([["RHS: Cloud Pruning, Niwaki und geeignete Pflanzen", "https://www.rhs.org.uk/plants/types/trees/cloud-pruning"], ["RHS: Koniferen vorsichtig und meist am grünen Wachstum schneiden", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"], ["Garden Group: Andrei Darusenkov, Bonsai- und Niwaki-Meister, Festival Sady i Lyudi 2023", "https://gardengroup.ru/stati/xvi-festival-sady-i-lyudi-2023-obzornye-ekskursii-i-master-klassy/"], ["YouTube: Festival Sady i Lyudi 2023 - Andrei Darusenkov", "https://www.youtube.com/watch?v=MAyh--g4f4g"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Foto senden - Baumform einschätzen")}</div>
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
    <div class="science-card">
      <h2>Fehlerbeispiel: verholzter Trieb bei <em>Pinus thunbergii</em>.</h2>
      ${photoSlot({ folder: "09_pomylky", file: "pomylka-svichka-02.webp", lang: "de", label: "Fehler bei Pinus thunbergii: verholzter Jahrestrieb mittig geschnitten", ratio: "3 / 4" })}
      <p>Bei der japanischen Schwarzkiefer ist der Zeitpunkt kritisch. Wird ein bereits verholzter Jahrestrieb in der Mitte abgeschnitten, bleibt oft ein blinder Abschnitt: an dieser Stelle entstehen keine brauchbaren neuen Knospen, und die Gabelung bleibt leer.</p>
      <p>Darum wird nicht einfach irgendwo im grünen Zuwachs gekürzt. Die Arbeit muss im richtigen Kerzenstadium oder bewusst an vorhandenen Knospen und Nadelbereichen passieren. Sonst verliert der Ast seine nächste Verzweigung.</p>
    </div>
    ${photoSlot({ folder: "04_khvoyni", file: "sosna-chorna-01.webp", lang: "de", label: "Geformte Kiefer im Schweizer Garten", ratio: "4 / 3" })}
    <h2>Nicht jede Kerze wird gleich behandelt.</h2>
    <p>Eine starke obere Zone braucht andere Arbeit als ein schwacher innerer Bereich. Manche Triebe bleiben, weil sie Zukunft bauen. Andere werden gekürzt, weil sie die Form dominieren. Genau hier entsteht der Unterschied zwischen Schema und Meisterarbeit.</p>
    <p>Für Kunden ist die einfache Regel: Wenn eine Kiefer innen trocken wird, braune Nadeln zeigt oder ihre Wolken schwer und dicht werden, sollte man nicht warten, bis grosse Äste absterben. Ein früher Foto-Check ist oft genug, um zu entscheiden, ob ein Vor-Ort-Termin sinnvoll ist.</p>
    ${sourceListV2([["NAJGA: Timing und Wirkung beim Schnitt japanischer Schwarzkiefer", "https://najga.org/pruning-japanese-black-pine/"], ["Chicago Botanic Garden: Was Candling bei Kiefern bedeutet", "https://www.chicagobotanic.org/blog/learning/candling-japanese-garden"], ["RHS: Koniferen und neues Wachstum", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"]])}
    ${articleNavDeV2()}
    <div class="btn-row">${cta("Kiefer-Foto senden")}</div>
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
    <p>Drei Fotos genügen für eine erste Einschätzung: der ganze Baum, die Problemstelle, eine Nahaufnahme. Ich sage Ihnen kostenlos, ob künstlerische Baumformung, Kronenstruktur-Korrektur oder ein ruhiger Pflegeplan sinnvoll ist.</p>
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
  <section class="hero section" data-hero-root data-hero-variant="4">
    <div class="hero-media">${heroPhotoSlot({ lang: "en", label: "Niwaki in a Swiss garden" })}</div>
    <div class="hero-panel">
      ${heroServiceLine()}
      <h1><span class="hero-accent">Niwaki</span> and Japanese tree art.<br><span>With Swiss precision.</span></h1>
      <p class="motto">Swiss quality in resonance with Japanese philosophy.</p>
      <p class="hero-copy hero-copy-variant hero-copy-v2">Swiss perfection meets Japanese philosophy. I do not simply cut trees - I create living sculptures through precise, masterful handwork for form, strength and timeless aesthetics.</p>
      <p class="hero-copy hero-copy-desktop">For clients in the Zurich region, I shape and care for Japanese maples, pines and conifers so that a valuable tree keeps its form, strength and health for years.</p>
      <p class="hero-copy hero-copy-mobile">I shape valuable garden trees around Zurich so their form stays clear, strong and healthy.</p>
      <div class="btn-row">${cta("Send photo - free diagnosis")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Request callback</a></div>
      <div class="trust-row"><span class="experience-pill"><strong>27</strong> years of experience</span><span>Zurich region</span><span>Inspired in Japan</span></div>
    </div>
  </section>
  <section class="section rescue-section"><div class="section-head"><span class="eyebrow">Before / after</span><h2>When the right cut brings back air, light and calm.</h2><p>Pinus sylvestris 'Watereri' comparison: the work state with protected root area on the left, the finished niwaki form on the right - with no ladder or work gear in the after image.</p></div>${conceptRescueSlider("en")}<div class="btn-row"><a class="btn btn-secondary" href="galerie.html">View gallery</a></div></section>
  <section class="section split sanctuary-section"><div><span class="eyebrow">The real value</span><h2>The garden is the quietest room of the house.</h2><p>A niwaki is not shaped only to look tidy. It changes the view from the house: morning coffee, an evening on the terrace, guests arriving and seeing a garden that feels calm, precise and alive.</p><p>I do not shape for a quick effect. A valuable tree should not look forced after the cut. It should look as if the form was already waiting inside it.</p><div class="quiet-moments"><span>Morning coffee</span><span>Evening terrace</span><span>Guests with a garden view</span></div></div>${photoSlot({ folder: "08_fonovi", file: "garden-view-chair-niwaki-01.webp", lang: "en", label: "Quiet garden moment with niwaki, terrace chair and view", ratio: "3 / 4" })}</section>
  <section class="section split"><div><h2>Nature's laws cannot be ignored.</h2><p>Brown needles, dry branches and lost shape usually have one cause: the tree was cut too quickly or too cheaply. Fine shaping respects light, air and the energy distribution of the crown.</p><blockquote>Cutting a branch takes a second. Growing a new one takes years.</blockquote></div>${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "en", label: "Stress signs on a pine before diagnosis", ratio: "16 / 9" })}</section>
  <section id="meisterarbeit" class="section split reverse meister-section">${meisterImageCarousel("en")}<div><span class="eyebrow">Artistic tree shaping</span><h2>An ordinary tree can become a remarkable garden form.</h2><p>A master does not start with cutting. He first reads trunk movement, supporting branches, empty spaces, light windows and how energy moves through the crown.</p><p>I call this tree architecture, artistic pruning and crown-structure correction. The work follows the tree: what must stay, what can be relieved and which line can be built over the next years.</p><a class="text-link" href="philosophie.html">How I work -></a></div></section>
  <section class="section"><div class="section-head"><h2>Core services.</h2><p>Niwaki, Japanese maples and conifers up to 3 m; larger trees by arrangement.</p></div><div class="card-grid three">${serviceCardsEn}</div></section>
  ${discoveryTeaserEn()}
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
  return `<section class="page-hero section"><span class="eyebrow">Contact</span><h1>Send a photo.</h1><p>Three photos are enough for a first assessment: the whole tree, the problem area and a close-up. I will tell you whether artistic tree shaping, crown-structure correction or a calmer care plan makes sense.</p><div class="btn-row">${cta("Open WhatsApp - send photos")} <a class="btn btn-secondary" href="${telHref}" data-event="cta_call_click">Call: ${phoneDisplay}</a></div></section>
  <section class="section contact-grid"><form class="form-card" data-contact-form data-contact-kind="photo-diagnosis" data-event="contact_form_submit" action="/api/contact" method="post"><h2>Photo diagnosis.</h2><p class="form-note">Describe the tree briefly. Use WhatsApp when you want to send photos immediately; this form safely sends your callback details to me.</p><label class="hp-field" aria-hidden="true">Company <input name="company" tabindex="-1" autocomplete="off"></label><label>Name <input name="name"></label><label>Phone <input name="phone" type="tel" required></label><label>Email <input type="email" name="email"></label><label>Canton <input name="canton" required></label><label>Tree type <input name="tree" placeholder="e.g. Japanischer Ahorn (Acer palmatum), Waldkiefer (Pinus sylvestris), Eibe (Taxus baccata)"></label><label>Message <textarea name="message" rows="5"></textarea></label><button class="btn btn-primary" type="submit">Send request</button><p class="form-note"><a class="text-link" href="${whatsappHref}" target="_blank" rel="noopener">Write directly on WhatsApp</a> if you want to attach photos now.</p></form><div class="contact-side">${contactPerson("en")}<form class="form-card" id="rueckruf" data-contact-form data-contact-kind="callback" data-event="cta_rueckruf_submit" action="/api/contact" method="post"><h2>Request callback.</h2><p class="form-note">Phone number is enough. I will get back to you personally as soon as possible.</p><label class="hp-field" aria-hidden="true">Company <input name="company" tabindex="-1" autocomplete="off"></label><label>Name <input name="name"></label><label>Phone <input name="phone" type="tel" required></label><label>Preferred time <input name="desiredTime"></label><button class="btn btn-secondary" type="submit">Request callback</button></form></div></section>`;
}

const blogArticlesEnV2 = [
  ["topiarschere", "Why I cut with topiary scissors", "Clean cuts, less tearing and more control than a hedge trimmer.", "foto/07_viktor/viktor-topiarschere-2026-06-29.webp"],
  ["energie-krone", "Why the crown must be opened", "Light, air and energy distribution explained in simple language.", "foto/04_khvoyni/energie-krone-pinus-crown-01.webp"],
  ["niwaki-bonsai-stile", "Artistic tree shaping: principles and methods", "How an ordinary garden tree becomes a remarkable form through reading, opening and guiding.", "foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp"],
  ["kiefer-kerzen", "Pine candles: timing matters", "Why hardened Pinus thunbergii extensions should not be cut blindly in the middle.", "foto/09_pomylky/pomylka-svichka-02.webp"],
  ["klimastress", "Why Swiss premium gardens need diagnosis", "Heat, dry summers and heavy rain make early assessment more valuable.", "foto/08_fonovi/fon-sosna-bila-01.webp"]
];

function articleNavEnV2() {
  return `<nav class="article-nav" aria-label="More knowledge articles">${blogArticlesEnV2.map(([slug, title]) => `<a href="${slug}.html">${title}</a>`).join("")}</nav>`;
}

function blogIndexEnV2() {
  return `<section class="page-hero section"><span class="eyebrow">Knowledge</span><h1>Knowledge about niwaki, maples and valuable garden trees.</h1><p>Five English mirror articles explain my craft: artistic tree shaping, tools, crown energy, pine candles and climate stress in Swiss premium gardens.</p></section><section class="section article-grid">${blogArticlesEnV2.map(([slug, title, teaser, image]) => `<article class="card article-card">${assetSlot({ file: image, label: title, ratio: "3 / 2" })}<span class="eyebrow">Knowledge</span><h2>${title}</h2><p>${teaser}</p><a href="/en/blog/${slug}.html">Read article</a></article>`).join("")}</section>${finalCtaEn("../")}`;
}

function articleEnV2(type) {
  const sources = `<aside class="source-list"><h2>Technical context</h2><p>This page combines my practice with public technical sources and does not replace an on-site assessment.</p><ul><li><a href="https://www.rhs.org.uk/plants/types/trees/pruning-guide" target="_blank" rel="noopener">RHS pruning guide</a></li><li><a href="https://www.meteoswiss.admin.ch/climate/climate-change.html" target="_blank" rel="noopener">MeteoSwiss climate change in Switzerland</a></li></ul></aside>`;
  if (type === "topiary") {
    return `<article class="article section"><span class="eyebrow">Topiary scissors</span><h1>Why I cut with topiary scissors.</h1>${photoSlot({ folder: "07_viktor", file: "viktor-topiarschere-2026-06-29.webp", lang: "en", label: "Me with topiary scissors on a pine", ratio: "4 / 3" })}<p>A valuable niwaki is not a hedge. A hedge trimmer works fast over a surface; topiary scissors allow one deliberate cut at a time. I decide which bud stays, where light should enter and how the cloud can develop next year.</p><p>The point is not romantic slowness. It is control. A clean, selective cut protects the future shape of the tree and prevents the quick outer shell that often leaves the inside weak and dry.</p>${hedgeTrimmerMistakeBlock("en")}${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - check the cut")}</div></article>`;
  }
  if (type === "crown") {
    return `<article class="article section"><span class="eyebrow">Crown energy</span><h1>Why the crown must be opened.</h1>${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "en", label: "Open niwaki crown", ratio: "16 / 9" })}<p>The crown is where a tree spends much of its visible energy. If it becomes too dense, the outside stays green while the inside loses light, air and structure. I open the crown so the tree can breathe and keep its form over years, not only after the first cut.</p>${photoSlot({ folder: "04_khvoyni", file: "energie-krone-pinus-crown-01.webp", lang: "en", label: "Conifer crown detail with young growth", ratio: "4 / 3" })}<p>I work with a simple idea: the crown spends energy, the trunk conducts it, the roots supply it. When the crown becomes too dense, strength is spent in the wrong places. Opening does not mean emptying the tree; it means creating the right windows for air, light, future buds and dry needles.</p><div class="process-grid"><div><strong>1. Read</strong><p>Where is strength flowing?</p></div><div><strong>2. Relieve</strong><p>Remove dead, shaded and wrongly placed growth.</p></div><div><strong>3. Leave future</strong><p>Keep the buds that build the next form.</p></div></div>${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - check crown structure")}</div></article>`;
  }
  if (type === "styles") {
    return `<article class="article section"><span class="eyebrow">Artistic tree shaping</span><h1>Artistic tree shaping: principles and methods.</h1>${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "en", label: "Artistic tree shaping with a calm cloud form", ratio: "16 / 9" })}<p>An ordinary garden tree can become a remarkable, calm and living form. Not by applying a quick template, but by reading the tree: trunk movement, branch structure, inner empty spaces, light windows and how the tree reacts.</p><p>Cloud pruning is described by the RHS as a Japanese method of training trees and shrubs into cloud-like forms; Niwaki means garden tree. I use bonsai thinking for proportion, movement and future buds, but I shape a living garden tree, not a decorative object.</p><div class="process-grid"><div><strong>1. Read structure</strong><p>Species, age, trunk movement, supporting branches and inner strength show what form is possible.</p></div><div><strong>2. Create space</strong><p>Good form needs air, light, distance and quiet empty areas between masses.</p></div><div><strong>3. Guide the future</strong><p>Every cut decides which bud, branch and silhouette will build the next years.</p></div></div><p>The key method is selective work. A hedge trimmer smooths the surface; artistic pruning decides inside the crown: which line carries character, which branch drains strength and where the crown must be opened so the tree can respond well.</p>${sourceListEnV2([["RHS: cloud pruning and Niwaki", "https://www.rhs.org.uk/plants/types/trees/cloud-pruning"], ["RHS: conifers and careful pruning", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"], ["Garden Group: Andrei Darusenkov, bonsai and niwaki master, Sady i Lyudi 2023", "https://gardengroup.ru/stati/xvi-festival-sady-i-lyudi-2023-obzornye-ekskursii-i-master-klassy/"], ["YouTube: Sady i Lyudi 2023 - Andrei Darusenkov", "https://www.youtube.com/watch?v=MAyh--g4f4g"]])}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - assess tree form")}</div></article>`;
  }
  if (type === "candles") {
    return `<article class="article section"><span class="eyebrow">Pinus</span><h1>Pine candles: timing matters.</h1>${photoSlot({ folder: "09_pomylky", file: "pomylka-svichka-01.webp", lang: "en", label: "New pine candles", ratio: "16 / 9" })}<p>New pine shoots, or candles, show where the tree is pushing strength. Treating every candle the same is a mistake. Strong areas may need calming; weak areas may need protection. Timing and selectivity build refinement without exhausting the tree.</p><div class="process-grid"><div><strong>Read</strong><p>Where is the strongest push?</p></div><div><strong>Select</strong><p>Which shoots build the next cloud?</p></div><div><strong>Preserve</strong><p>Leave enough strength for recovery.</p></div></div><div class="science-card"><h2>Mistake example: hardened growth on <em>Pinus thunbergii</em>.</h2>${photoSlot({ folder: "09_pomylky", file: "pomylka-svichka-02.webp", lang: "en", label: "Pinus thunbergii mistake: hardened yearly shoot cut in the middle", ratio: "3 / 4" })}<p>On Japanese black pine, the timing is critical. If an already hardened yearly extension is cut in the middle, it often becomes a blind section: no useful new buds form at that point, and the branch stays empty.</p><p>That is why candle work is not random shortening of green growth. It must happen at the right candle stage or deliberately around existing buds and needle areas. Otherwise the branch loses its next branching point.</p></div>${sourceListEnV2([["NAJGA: Japanese black pine pruning and timing", "https://najga.org/pruning-japanese-black-pine/"], ["Chicago Botanic Garden: pine candling", "https://www.chicagobotanic.org/blog/learning/candling-japanese-garden"], ["RHS: conifers and careful pruning", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"]])}${articleNavEnV2()}<div class="btn-row">${cta("Send pine photo")}</div></article>`;
  }
  return `<article class="article section"><span class="eyebrow">Swiss climate stress</span><h1>Why Swiss premium gardens need diagnosis.</h1>${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "en", label: "Stress signs on a valuable tree", ratio: "16 / 9" })}<p>Swiss gardens face more heat, drier summers and heavier rain events. For valuable solitary trees, this means water stress, dense crowns, compacted soil and old pruning mistakes can reinforce each other.</p>${stressChainV2()}<p>Early photo diagnosis protects value: the whole tree, the problem area and a close-up are often enough to decide whether an on-site visit makes sense.</p>${sources}${articleNavEnV2()}<div class="btn-row">${cta("Send photo - assess stress")}</div></article>`;
}

function blogIndexEn() {
  return `<section class="page-hero section"><span class="eyebrow">Knowledge</span><h1>Knowledge about niwaki, maples and conifers.</h1><p>Starter articles translated for English visitors.</p></section><section class="section card-grid"><article class="card article-card"><h2>Why I cut with topiary scissors</h2><p>Clean cuts, energy and Japanese tools.</p><a href="/en/blog/topiarschere.html">Read article</a></article></section>${finalCtaEn("../")}`;
}

function articleEn(type) {
  return `<article class="article section"><span class="eyebrow">Topiary scissors</span><h1>Why I cut with topiary scissors.</h1>${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "en", label: "Topiary scissors and clean cut", ratio: "16 / 9" })}<p>A clean cut is not a detail. A hedge trimmer tears fibres and makes the tree send energy into wounds. With sharp Japanese topiary scissors, each cut is deliberate: where light must enter, which bud should stay, and how the cloud will develop next year.</p><p>This is the difference between quick garden maintenance and precise niwaki work. If you suspect your tree was cut too hard or too schematically, send photos for a free first assessment.</p>${cta("Send photo - free diagnosis")}</article>`;
}

function finalCtaUk(contactPrefix = "") {
  return `<section class="section final-cta">
    <div>
      <span class="eyebrow">Безкоштовна перша оцінка</span>
      <h2>Зі звичайного дерева можна зробити виразну садову форму.</h2>
      <p>Надішліть три фото. Я подивлюся, яке художнє формування дерева, корекція структури крони або послідовність догляду має сенс - без швидкого зрізу і без фальшивих обіцянок.</p>
      <div class="btn-row">${ctaUk("Надіслати фото - оцінити форму дерева")} <a class="btn btn-secondary" href="${contactPrefix}kontakt.html#rueckruf" data-event="cta_callback_click">Запросити дзвінок</a></div>
    </div>
  </section>`;
}

const serviceCardsUk = `
  <div class="card service-card">
    <span class="eyebrow">Niwaki</span>
    <h3>Садовий бонсай</h3>
    <p>Формування садових дерев: сосна (Pinus), тис (Taxus) і ялівець (Juniperus). Крона відкривається для світла, повітря і довгої форми.</p>
    <a href="leistungen.html#niwaki">Детальніше про Niwaki</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Acer palmatum</span>
    <h3>Японські клени</h3>
    <p>Японський (віялолистий) клен (Acer palmatum) і розсіченолистий клен: сезонний ручний догляд, суха деревина, мох і грибкові ризики.</p>
    <a href="leistungen.html#ahorn">Догляд за японським кленом</a>
  </div>
  <div class="card service-card">
    <span class="eyebrow">Pinus & Taxus</span>
    <h3>Хвойні дерева</h3>
    <p>Сосна (Pinus), тис (Taxus baccata), ялівець (Juniperus), ялиця (Abies) і ялина (Picea). Чистий ручний зріз.</p>
    <a href="leistungen.html#nadelgehoelze">Формування сосни та хвойних</a>
  </div>`;

function homeUk() {
  return `
  <section class="hero section" data-hero-root data-hero-variant="4">
    <div class="hero-media">${heroPhotoSlot({ lang: "uk", label: "Niwaki у швейцарському саду" })}</div>
    <div class="hero-panel">
      ${heroServiceLine()}
      <h1><span class="hero-accent">Niwaki</span> і японська деревна архітектура.<br><span>Зі швейцарською точністю.</span></h1>
      <p class="motto">Швейцарська якість у резонансі з японською філософією.</p>
      <p class="hero-copy hero-copy-variant hero-copy-v2">Швейцарська довершеність зустрічається з японською філософією. Я не просто ріжу дерева - я створюю живі скульптури через точну майстерну ручну роботу для форми, сили й позачасової естетики.</p>
      <p class="hero-copy hero-copy-desktop">Я формую і доглядаю <strong>Niwaki, садовий бонсай, японські клени, сосни і хвойні</strong> у регіоні Цюриха так, щоб дерево роками зберігало форму, силу і здоров'я.</p>
      <p class="hero-copy hero-copy-mobile">Я формую цінні дерева в регіоні Цюриха: чиста ручна робота для форми, сили й здоров'я.</p>
      <div class="btn-row">${ctaUk("Надіслати фото - безкоштовна діагностика")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Запросити дзвінок</a></div>
      <div class="trust-row"><span class="experience-pill"><strong>27</strong> років досвіду</span><span>Регіон Цюриха</span><span>Натхнення з Японії</span></div>
    </div>
  </section>

  <section class="section rescue-section">
    <div class="section-head">
      <span class="eyebrow">До / після</span>
      <h2>Правильний зріз повертає дереву повітря, світло і спокій.</h2>
      <p>Порівняння Pinus sylvestris 'Watereri': ліворуч робочий стан із захищеною кореневою зоною, праворуч готова форма Niwaki - без драбини і без робочого інвентаря на фото після.</p>
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
    ${photoSlot({ folder: "08_fonovi", file: "garden-view-chair-niwaki-01.webp", lang: "uk", label: "Спокійний садовий момент з niwaki, терасою і краєвидом", ratio: "3 / 4" })}
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

  <section id="meisterarbeit" class="section split reverse meister-section">
    ${meisterImageCarousel("uk")}
    <div>
      <span class="eyebrow">Художнє формування дерев</span>
      <h2>Зі звичайного дерева можна зробити надзвичайну садову форму.</h2>
      <p>Майстер не починає з ножиць. Спершу він читає рух стовбура, опорні гілки, порожні місця, світлові вікна і те, як сила проходить через крону.</p>
      <p>Я називаю це деревною архітектурою, художньою обрізкою і корекцією структури крони. Робота йде не за шаблоном, а за деревом: що треба залишити, що розвантажити і яку лінію можна побудувати за наступні роки.</p>
      <a class="text-link" href="philosophie.html">Як я працюю →</a>
    </div>
  </section>

  <section class="section">
    <div class="section-head">
      <span class="eyebrow">Послуги</span>
      <h2>Три основні напрями - без компромісу.</h2>
      <p>Niwaki, японські клени і хвойні до 3 м; більші дерева - після узгодження.</p>
    </div>
    <div class="card-grid three">${serviceCardsUk}</div>
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

  <section class="section split">
    <div>
      <span class="eyebrow">Погляд у коріння</span>
      <h2>Здоров'я починається під землею.</h2>
      <p>Як і з фундаментом будинку, усе починається під землею. Правильний ґрунт - акадама, відповідна кислотність (pH 5,5-6,5), перевірені субстрати - це основа здоров'я.</p>
      <a class="text-link" href="philosophie.html#wurzeln">Більше про ґрунт і коріння →</a>
    </div>
    ${photoSlot({ folder: "07_viktor", file: "viktor-01.webp", lang: "uk", label: "Віктор за роботою з нівакі та формуванням", ratio: "3 / 2" })}
  </section>

  <section class="section price-teaser">
    <span class="eyebrow">Ціни</span>
    <h2>Якість замість поспіху.</h2>
    <p>Чотири години доброї роботи варті більше, ніж дві години швидкої. Робота від 110 CHF/год, виїзд від 90 CHF.</p>
    <a class="btn btn-secondary" href="preise.html">Переглянути ціни</a>
  </section>

  <section class="section">
    <div class="section-head">
      <span class="eyebrow">Регіон роботи</span>
      <h2>Де я працюю.</h2>
      <p>Основний регіон - кантон Цюрих. Також Цуг, Люцерн, Аргау, Швіц, Шаффгаузен, Аппенцель і Гларус. Решта Швейцарії - за домовленістю. Заради незвичайних дерев я готовий їхати далі.</p>
    </div>
  </section>

  <section class="section faq">
    <div class="section-head">
      <span class="eyebrow">FAQ</span>
      <h2>Часті питання про нівакі та японський догляд за деревами.</h2>
    </div>
    <details><summary>Як врятувати мій нівакі або японський клен?</summary><p>Надішліть три фото: усе дерево, проблемну зону і крупний план. Перша оцінка - безкоштовна.</p></details>
    <details><summary>Чому моє дерево втрачає форму?</summary><p>Найчастіше було проігноровано розподіл енергії в кроні. Тоді всередині накопичуються вологість, суховіття і неправильні пагони.</p></details>
    <details><summary>Скільки коштує японський догляд за деревами в регіоні Цюриха?</summary><p>Робота від 110 CHF/год, виїзд від 90 CHF. Зустріч на місці - після фото-діагностики.</p></details>
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
    <div><span class="eyebrow">Напрям 1</span><h2>Niwaki - садовий бонсай</h2><p>Ручне формування дерев у саду: сосна (<em>Pinus</em>), тис (<em>Taxus baccata</em>), ялівець (<em>Juniperus</em>) та інші форми. Завдання не зробити зелену стіну, а направити силу дерева туди, де вона створює форму, світло і довгий спокій.</p>${ctaUk("Надіслати фото Niwaki")}</div>
  </section>
  <section class="section service-detail reverse" id="ahorn">
    ${photoSlot({ folder: "06_yaponski-kleny", file: "klen-yaponskyi-02.webp", lang: "uk", label: "Я працюю з японським кленом", ratio: "4 / 3" })}
    <div><span class="eyebrow">Напрям 2</span><h2>Японські клени - <em>Acer palmatum</em></h2><p>Японський (віялолистий) клен (<em>Acer palmatum</em>) і розсіченолистий клен (<em>Acer palmatum</em>, група Dissectum): сезонне формування, суха деревина всередині крони, ручна робота проти моху і грибкових ризиків. Крону треба відкривати до того, як проблема стане видимою.</p>${ctaUk("Надіслати фото клена")}</div>
  </section>
  <section class="section service-detail" id="nadelgehoelze">
    ${photoSlot({ folder: "04_khvoyni", file: "sosna-chorna-01.webp", lang: "uk", label: "Формування сосни японськими ножицями", ratio: "4 / 3" })}
    <div><span class="eyebrow">Напрям 3</span><h2>Хвойні дерева - особливо сосна (<em>Pinus</em>)</h2><p>Сосна звичайна (<em>Pinus sylvestris</em>), сосна гірська (<em>Pinus mugo</em>), японська чорна сосна (<em>Pinus thunbergii</em>), японська біла сосна (<em>Pinus parviflora</em>), японська червона сосна (<em>Pinus densiflora</em>), веймутова сосна (<em>Pinus strobus</em>), тис ягідний (<em>Taxus baccata</em>), ялівець (<em>Juniperus</em>), ялиця (<em>Abies</em>) і ялина (<em>Picea</em>). Робота виконується вибірково і вручну, щоб не зламати майбутню структуру дерева.</p>${ctaUk("Надіслати фото сосни")}</div>
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

function pricesUk() {
  return `
  <section class="page-hero section"><span class="eyebrow">Ціни</span><h1>Ціни - якість замість поспіху.</h1><p>Професійний японський догляд за деревами стартує від 110 CHF за годину. Виїзд - від 90 CHF залежно від відстані. Перша фото-діагностика безкоштовна.</p><div class="price-grid"><article class="card"><h2>від 110 CHF/год</h2><p>Ручна робота</p></article><article class="card"><h2>від 90 CHF</h2><p>Виїзд</p></article><article class="card"><h2>Безкоштовно</h2><p>Фото-діагностика</p></article></div><p>Швидкий зріз часто коштує дорожче, якщо він забирає форму і здоров'я дерева на роки.</p></section>
  <section class="section note-block speed-quality-note">
    <span class="eyebrow">Швидкість проти якості</span>
    <h2>Чому не швидше?</h2>
    <p>Гілку можна зрізати за секунду. А виростити нову гілку - це роки. Тому швидкість у формувальному зрізі не є ознакою якості, а часто є ризиком.</p>
    <div class="speed-quality-contrast" aria-label="Порівняння часу між швидким зрізом і новим ростом">
      <div><strong>1 секунда</strong><span>зрізати гілку</span></div>
      <div class="speed-quality-vs">проти</div>
      <div><strong>Роки</strong><span>відростити нову гілку</span></div>
    </div>
    <p class="speed-quality-warning">Я волію працювати повільніше і чисто, щоб дерево зберегло силу, рана чисто загоїлася, а форма не втратилася на роки.</p>
    <div class="btn-row">${ctaUk("Надіслати фото - безкоштовна діагностика")} <a class="btn btn-secondary" href="kontakt.html#rueckruf" data-event="cta_callback_click">Запросити дзвінок</a></div>
  </section>
  ${finalCtaUk()}`;
}

function blogIndexUk() {
  const articles = [
    ["topiarschere", "Чому я ріжу японськими ножицями", "Чистий зріз, менше травми і більше контролю, ніж у звичайного тримера.", "foto/07_viktor/viktor-topiarschere-2026-06-29.webp"],
    ["energie-krone", "Чому крону треба відкривати", "Світло, повітря і розподіл сили в дереві простими словами.", "foto/04_khvoyni/energie-krone-pinus-crown-01.webp"],
    ["niwaki-bonsai-stile", "Художнє формування дерев: принципи і методи", "Як зі звичайного дерева через читання структури, світло і вибірковий зріз зробити виразну садову форму.", "foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp"],
    ["kiefer-kerzen", "Свічки сосни: важливий момент", "Чому задерев'янілий приріст Pinus thunbergii не можна просто різати посередині.", "foto/09_pomylky/pomylka-svichka-02.webp"],
    ["klimastress", "Кліматичний стрес у преміум-саді", "Спека, сухі літа і сильні дощі роблять ранню діагностику важливішою.", "foto/08_fonovi/fon-sosna-bila-01.webp"]
  ];
  return `<section class="page-hero section"><span class="eyebrow">Знання</span><h1>Знання про Niwaki, клени і цінні садові дерева.</h1><p>П'ять коротких матеріалів пояснюють мій підхід: художнє формування дерев, інструмент, енергія крони, свічки сосни і кліматичний стрес у Швейцарії.</p></section><section class="section article-grid">${articles.map(([slug, title, teaser, image]) => `<article class="card article-card">${assetSlotUk({ file: image, label: title, ratio: "3 / 2" })}<span class="eyebrow">Знання</span><h2>${title}</h2><p>${teaser}</p><a href="/uk/blog/${slug}.html">Читати статтю</a></article>`).join("")}</section>${finalCtaUk("../")}`;
}

function articleNavUk() {
  const links = [
    ["topiarschere", "Японські ножиці"],
    ["energie-krone", "Енергія крони"],
    ["niwaki-bonsai-stile", "Художнє формування"],
    ["kiefer-kerzen", "Свічки сосни"],
    ["klimastress", "Кліматичний стрес"]
  ];
  return `<nav class="article-nav" aria-label="Інші статті">${links.map(([slug, title]) => `<a href="${slug}.html">${title}</a>`).join("")}</nav>`;
}

function articleUk(type) {
  const sources = {
    topiary: sourceListUkV2([
      ["RHS: загальні правила обрізки дерев і хвойних", "https://www.rhs.org.uk/plants/types/trees/pruning-guide"],
      ["Purdue Extension: електричний тример призначений для живоплоту", "https://ag.purdue.edu/department/hla/extension/extension-publications-library/ext-pubs/ho-4-w.html"]
    ]),
    crown: sourceListUkV2([
      ["RHS: обережна обрізка хвойних по новому приросту", "https://www.rhs.org.uk/plants/types/trees/pruning-guide"],
      ["Purdue Extension: обрізка змінює ріст і розгалуження", "https://ag.purdue.edu/department/hla/extension/extension-publications-library/ext-pubs/ho-4-w.html"]
    ]),
    styles: sourceListUkV2([
      ["RHS: cloud pruning і Niwaki", "https://www.rhs.org.uk/plants/types/trees/cloud-pruning"],
      ["RHS: догляд за хвойними", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"],
      ["Garden Group: Андрей Дарусенков, майстер bonsai та niwaki, Sady i Lyudi 2023", "https://gardengroup.ru/stati/xvi-festival-sady-i-lyudi-2023-obzornye-ekskursii-i-master-klassy/"],
      ["YouTube: Sady i Lyudi 2023 - Андрей Дарусенков", "https://www.youtube.com/watch?v=MAyh--g4f4g"]
    ]),
    candles: sourceListUkV2([
      ["NAJGA: таймінг і дія обрізки японської чорної сосни", "https://najga.org/pruning-japanese-black-pine/"],
      ["Chicago Botanic Garden: що означає candling у сосен", "https://www.chicagobotanic.org/blog/learning/candling-japanese-garden"],
      ["RHS: хвойні і новий приріст", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"]
    ]),
    climate: sourceListUkV2([
      ["MeteoSwiss: зміна клімату у Швейцарії, спека і сухіші літа", "https://www.meteoswiss.admin.ch/climate/climate-change.html"],
      ["BAFU: посуха у Швейцарії посилюється", "https://www.bafu.admin.ch/en/drought"],
      ["WSL: погодні екстреми, посуха і адаптація", "https://www.wsl.ch/en/natural-hazards/weather-and-climate-extremes-and-drought/"]
    ])
  };
  const stressChainUk = `<div class="science-card stress-chain">
    <span>Спека</span><span>менше води</span><span>ущільнений грунт</span><span>щільна крона</span><strong>стрес у дереві</strong>
  </div>`;
  const map = {
    topiary: `<span class="eyebrow">Японські ножиці</span><h1>Чому я ріжу японськими ножицями.</h1>${photoSlot({ folder: "07_viktor", file: "viktor-topiarschere-2026-06-29.webp", lang: "uk", label: "Я з японськими ножицями біля сосни", ratio: "4 / 3" })}<p>Добре формування починається не зі швидкості, а з рішення, що дерево має нести в майбутньому. У Niwaki, формуванні сосни і японському догляді недостатньо швидко згладити зовнішній контур. Дерево - це не зелений блок, а жива система з крони, стовбура і коріння.</p><div class="comparison-grid"><div><h2>Електричний тример</h2><p>Швидкий, широкий, механічний. Добрий для живоплоту, але ризиковий для цінного солітерного дерева: може рвати тонкий приріст і створювати щільну зовнішню кірку.</p></div><div><h2>Японські ножиці</h2><p>Повільніше, точніше, свідомо. Кожен зріз вирішує, яка брунька лишиться, куди зайде повітря і як хмара розвиватиметься наступного року.</p></div></div><p>Рвані волокна - не дрібниця. Дерево реагує на травму, закриває рани і перерозподіляє силу. Те, що в перший день виглядає рівно, може місяцями забирати енергію, якщо зріз був грубий, плаский або зроблений не в той момент.</p>${hedgeTrimmerMistakeBlock("uk")}<p>З японськими ножицями я працюю інакше. Я не просто відкриваю поверхню. Я шукаю внутрішню лінію: які пагони будують майбутнє, які дають тінь і де має зайти світло, щоб усередині не виникала суха деревина.</p>${photoSlot({ folder: "07_viktor", file: "viktor-02.webp", lang: "uk", label: "Японські інструменти і точна робота біля сосни", ratio: "4 / 3" })}<h2>Зріз - це вказівка дереву.</h2><p>Коли я залишаю бруньку, я кажу дереву: сюди можна давати силу. Коли прибираю гілку, я забираю можливість, яка росла роками. Тому моя фраза проста: зрізати гілку можна за секунду, а виростити нову - це роки.</p><p>Для клієнта це важливо, бо цінне садове дерево не є витратним матеріалом. Воно формує терасу, вид з дому і спокій саду. Найдешевший зріз часто стає найдорожчим, якщо руйнує форму.</p>`,
    crown: `<span class="eyebrow">Крона і енергія</span><h1>Чому крону треба відкривати.</h1>${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "uk", label: "Відкрита крона Niwaki", ratio: "16 / 9" })}<p>Багато цінних дерев спочатку втрачають не красу, а внутрішній простір. Зовні крона ще зелена, але всередині накопичуються тінь, волога, сухі гілки і слабкий приріст. Саме тут починається різниця між простою стрижкою і деревною архітектурою.</p>${photoSlot({ folder: "04_khvoyni", file: "energie-krone-pinus-crown-01.webp", lang: "uk", label: "Крупний план хвойної крони з молодим приростом", ratio: "4 / 3" })}<p>Я працюю з простим принципом: крона витрачає силу, стовбур проводить, коріння забезпечує. Якщо крона занадто щільна, дерево витрачає енергію не там, де потрібно. Якщо всередину не заходить світло, структура слабшає зсередини.</p><h2>Крону не роблять порожньою. Її роблять читабельною.</h2><p>Відкрити крону не означає радикально прорідити дерево. Це означає створити правильні вікна: повітря через крону, світло на внутрішні бруньки, менше тертя між гілками і менше вологості в тісних місцях. Добра робота виглядає природно, а не “підстрижено”.</p><div class="process-grid"><div><strong>1. Прочитати</strong><p>Де дерево витрачає силу і яка лінія тримає характер?</p></div><div><strong>2. Розвантажити</strong><p>Забрати сухе, зайве, затінене і неправильний приріст.</p></div><div><strong>3. Залишити майбутнє</strong><p>Зберегти бруньки, які будуватимуть форму наступні роки.</p></div></div><p>Для преміум-саду це не дрібниця. Крона визначає, як дерево виглядає з дому, з тераси і з доріжки. Майстер бачить не тільки сьогоднішній кадр, а й те, що дерево зробить через один, два і три роки.</p>`,
    styles: `<span class="eyebrow">Художнє формування дерев</span><h1>Художнє формування дерев: принципи і методи.</h1>${photoSlot({ folder: "05_nivaki-khmarky", file: "sosna-watereri-do-pislya-01.webp", lang: "uk", label: "Художнє формування дерева у спокійну хмарну форму", ratio: "16 / 9" })}<p>Зі звичайного садового дерева можна зробити надзвичайну і живу форму. Але не через швидкий шаблон, а через читання дерева: рух стовбура, каркас гілок, порожні місця всередині крони, світлові вікна і реакцію дерева на зріз.</p><p>Cloud pruning - це японський метод ведення дерев і кущів у хмарні форми; Niwaki означає garden tree. Я використовую bonsai-мислення для пропорції, руху стовбура і майбутніх бруньок, але в саду працюю з живим деревом, а не з декорацією.</p><div class="process-grid"><div><strong>1. Прочитати структуру</strong><p>Вид, вік, рух стовбура, опорні гілки і внутрішня сила показують, яка форма можлива.</p></div><div><strong>2. Створити простір</strong><p>Добра форма потребує повітря, світла, дистанції між масами і спокійних порожніх місць.</p></div><div><strong>3. Вести майбутнє</strong><p>Кожен зріз вирішує, яка брунька, гілка і силует будуватимуть дерево наступні роки.</p></div></div><p>Ключовий метод - вибіркова робота. Тример рівняє поверхню; художня обрізка вирішує всередині крони: яка лінія несе характер, яка гілка забирає силу і де треба відкрити крону, щоб дерево здорово відповіло.</p>${sourceListUkV2([["RHS: cloud pruning і Niwaki", "https://www.rhs.org.uk/plants/types/trees/cloud-pruning"], ["RHS: conifers", "https://www.rhs.org.uk/plants/types/conifers/growing-guide"], ["Garden Group: Андрей Дарусенков, майстер bonsai та niwaki, Sady i Lyudi 2023", "https://gardengroup.ru/stati/xvi-festival-sady-i-lyudi-2023-obzornye-ekskursii-i-master-klassy/"], ["YouTube: Sady i Lyudi 2023 - Андрей Дарусенков", "https://www.youtube.com/watch?v=MAyh--g4f4g"]])}`,
    candles: `<span class="eyebrow">Pinus</span><h1>Свічки сосни: момент вирішує.</h1>${photoSlot({ folder: "09_pomylky", file: "pomylka-svichka-01.webp", lang: "uk", label: "Нові свічки сосни перед роботою", ratio: "16 / 9" })}<p>У сосен майбутня форма часто починається зі свічки: світлого, м'якого нового пагона. Для неспеціаліста він виглядає дрібницею. Для мене він показує, куди дерево зараз відправляє силу - вгору, назовні або в конкретну хмару.</p><p>Якщо поводитися зі свічками грубо, занадто пізно або однаково по всьому дереву, легко збити баланс. Якщо їх читати, можна пригальмувати сильні зони, захистити слабкі і зробити хмари тоншими. Саме тому таймінг для Pinus важливіший за силу.</p><div class="process-grid"><div><strong>Рано</strong><p>Новий пагін ще м'який. Дерево показує напрям і енергію.</p></div><div><strong>Вибірково</strong><p>Сильні зони заспокоюються, слабкі зони захищаються.</p></div><div><strong>Довгостроково</strong><p>Ціль - не гола форма, а щільне здорове розгалуження.</p></div></div><div class="science-card"><h2>Помилка: задерев'янілий приріст у <em>Pinus thunbergii</em>.</h2>${photoSlot({ folder: "09_pomylky", file: "pomylka-svichka-02.webp", lang: "uk", label: "Помилка у Pinus thunbergii: задерев'янілий приріст зрізаний посередині", ratio: "3 / 4" })}<p>На сосні японській чорній момент роботи зі свічками критичний. Якщо зрізати вже задерев'янілий приріст посередині, часто лишається сліпий відрізок: у місці зрізу не закладаються корисні нові бруньки, і розгалуження залишається порожнім.</p><p>Тому свічки не вкорочують випадково там, де зручно. Працювати треба у правильній м'якій фазі або свідомо біля наявних бруньок і хвої. Інакше гілка втрачає наступне розгалуження.</p></div>${photoSlot({ folder: "04_khvoyni", file: "sosna-chorna-01.webp", lang: "uk", label: "Сформована сосна у швейцарському саду", ratio: "4 / 3" })}<h2>Не кожну свічку обробляють однаково.</h2><p>Сильна верхня зона потребує іншої роботи, ніж слабке внутрішнє місце. Частина пагонів лишається, бо будує майбутнє. Інші вкорочуються, бо домінують над формою. Тут і виникає різниця між схемою і майстерною роботою.</p><p>Для клієнта проста ознака така: якщо сосна сохне всередині, показує бурі голки або її хмари стають важкими й щільними, не варто чекати, поки відмернуть великі гілки. Ранній фото-чек часто достатній, щоб вирішити, чи потрібен виїзд.</p>`,
    climate: `<span class="eyebrow">Швейцарія і клімат</span><h1>Чому преміум-сади потребують діагностики.</h1>${photoSlot({ folder: "08_fonovi", file: "fon-sosna-bila-01.webp", lang: "uk", label: "Цінна сосна у швейцарському саду", ratio: "16 / 9" })}<p>Гарний швейцарський сад сьогодні - не тільки декорація. Це прохолодний простір, місце відновлення і частина дому. Тому боляче, коли солітерне дерево поступово втрачає форму: вид з вітальні змінюється, тераса втрачає спокій, а цінність, яка росла роками, стає нестабільною.</p>${stressChainUk}<p>Швейцарія сильно відчуває зміну клімату. MeteoSwiss описує сильнішу спеку, сухіші літа і інтенсивніші опади як ключові ризики. Для садових дерев це означає: водний стрес, перегрів, ущільнений грунт і неправильна обрізка працюють не окремо, а підсилюють одне одного.</p><p>Щільне, неправильно підстрижене дерево в такі періоди страждає швидше. Усередині стоїть волога, зовні пересихає крона, коріння працює під стресом. Для цінних Niwaki, сосен і японських кленів рання діагностика важливіша за пізню спробу врятувати дерево.</p><div class="process-grid"><div><strong>Ранні ознаки</strong><p>Бурі голки, сухі внутрішні гілки, слабкий приріст.</p></div><div><strong>Контекст</strong><p>Місце, спека, вода, субстрат і попередній зріз.</p></div><div><strong>Рішення</strong><p>Спочатку фото-діагностика, виїзд тільки коли він справді потрібний.</p></div></div>${photoSlot({ folder: "08_fonovi", file: "fon-foto-02.webp", lang: "uk", label: "Відновлена форма після спокійної роботи з кроною", ratio: "16 / 9" })}<h2>Преміум означає: не чекати, поки стане дешево виглядати.</h2><p>Хто вкладається в будинок, терасу і сад, не має віддавати головне дерево на швидку стрижку як живопліт. Чесна діагностика захищає від двох помилок: реагувати запізно або різати занадто швидко. Обидві помилки можуть коштувати років.</p><p>Мій підхід простий: спочатку побачити, потім вирішити. Часто достатньо трьох фото: усе дерево, проблемне місце і крупний план.</p>`
  };
  return `<article class="article section">${map[type]}${type === "styles" ? "" : sources[type] || ""}${articleNavUk()}<div class="btn-row">${ctaUk("Надіслати фото - отримати оцінку")}</div></article>`;
}

function contactUk() {
  return `<section class="page-hero section"><span class="eyebrow">Контакт</span><h1>Надішліть фото дерева.</h1><p>Для першої оцінки достатньо трьох фото: все дерево, проблемна зона і крупний план. Я скажу, чи має сенс художнє формування дерева, корекція структури крони або спокійний план догляду.</p><div class="btn-row">${ctaUk("Відкрити WhatsApp - надіслати фото")} <a class="btn btn-secondary" href="${telHref}" data-event="cta_call_click">Подзвонити: ${phoneDisplay}</a></div></section>
  <section class="section contact-grid"><form class="form-card" data-contact-form data-contact-kind="photo-diagnosis" data-event="contact_form_submit" action="/api/contact" method="post"><h2>Фото-діагностика.</h2><p class="form-note">Коротко опишіть дерево. Якщо треба одразу надіслати фото, WhatsApp залишається найшвидшим шляхом; ця форма безпечно передає мені дані для звʼязку.</p><label class="hp-field" aria-hidden="true">Компанія <input name="company" tabindex="-1" autocomplete="off"></label><label>Ім'я <input name="name" autocomplete="name"></label><label>Телефон <input type="tel" name="phone" autocomplete="tel" required></label><label>E-mail <input type="email" name="email" autocomplete="email"></label><label>Кантон <input name="kanton" autocomplete="address-level1" required></label><label>Вид дерева <input name="baumart" placeholder="наприклад клен японський (Acer palmatum), сосна звичайна (Pinus sylvestris), тис ягідний (Taxus baccata)"></label><label>Повідомлення <textarea name="nachricht" rows="5" required></textarea></label><button class="btn btn-primary" type="submit">Надіслати запит</button><p class="form-note"><a class="text-link" href="${whatsappHrefUk}" target="_blank" rel="noopener">Написати напряму в WhatsApp</a>, якщо хочете додати фото зараз.</p></form><div class="contact-side">${contactPerson("uk")}<form class="form-card" id="rueckruf" data-contact-form data-contact-kind="callback" data-event="cta_rueckruf_submit" action="/api/contact" method="post"><h2>Запросити дзвінок.</h2><p class="form-note">Достатньо телефону. Я звʼяжуся з вами особисто якнайшвидше.</p><label class="hp-field" aria-hidden="true">Компанія <input name="company" tabindex="-1" autocomplete="off"></label><label>Ім'я <input name="name" autocomplete="name"></label><label>Телефон <input type="tel" name="phone" autocomplete="tel" required></label><label>Зручний час <input name="desiredTime" placeholder="наприклад Пн 18-20"></label><button class="btn btn-secondary" type="submit">Запросити дзвінок</button></form></div></section>`;
}

function legalUk(kind) {
  const isPrivacy = kind === "datenschutz";
  return `<section class="page-hero section legal"><span class="eyebrow">Чернетка</span><h1>${isPrivacy ? "Політика приватності" : "Юридична інформація"}.</h1><p>Ця сторінка структурована, але не фінальна. Юридичні дані треба перевірити і доповнити перед публікацією.</p></section><section class="section legal-content"><h2>${isPrivacy ? "Відповідальна сторона" : "Дані за швейцарськими вимогами"}</h2><p>${brand}<br>Адреса після погодження<br>Швейцарія</p><h2>Контакт</h2><p>Телефон і e-mail додаються після фінального погодження.</p><h2>${isPrivacy ? "Персональні дані, форми і аналітика" : "Відповідальність за контент"}</h2><p>${isPrivacy ? "Форми, фото-завантаження, Analytics і Ads вимірювання вмикаються тільки після фінальної технічної та юридичної перевірки. Consent Mode підготовлений у коді; зовнішні IDs ще не активні." : "Контент підготовлений уважно, але до фінального погодження не є юридично завершеним документом."}</p><h2>${isPrivacy ? "Cookies і згода" : "Відповідальність за посилання"}</h2><p>${isPrivacy ? "Аналітичні та маркетингові сховища за замовчуванням вимкнені і активуються лише після згоди. Зовнішні сервіси залишаються вимкненими до фінальної конфігурації." : "Зовнішні посилання перевіряються перед публікацією. За зміст зовнішніх сторінок відповідають виключно їхні оператори."}</p></section>`;
}

function themesPageUk() {
  return `<section class="page-hero section"><span class="eyebrow">Внутрішній перегляд</span><h1>Theme Preview V1-V5.</h1><p>Для Андрія/Віктора: можна перемикати дизайн-напрям без перебудови layout.</p><div class="theme-buttons">${[1, 2, 3, 4, 5].map((n) => `<button class="btn btn-secondary" type="button" data-theme-option="theme-v${n}.css">V${n}</button>`).join("")}</div></section><section class="section"><div class="card-grid three">${serviceCardsUk}</div></section><section class="section split"><div><h2>Приклад блоку.</h2><p>Ця сторінка показує токени теми: фон, поверхню, текст, основний колір, акцент, лінії, тіні і кнопки.</p><div class="btn-row">${ctaUk("Надіслати фото - тест CTA")} <a class="btn btn-secondary" href="kontakt.html">Контакт</a></div></div>${photoSlot({ folder: "01_hero", file: "hero-viktor-bonsai-main.webp", lang: "uk", label: "Зображення для перевірки теми", ratio: "16 / 9" })}</section>`;
}

function cssBase() {
  return `*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-body);font-size:16px;line-height:1.65;padding-bottom:0}body.menu-open{overflow:hidden}img,svg{max-width:100%;display:block}a{color:inherit}a:hover{text-decoration-color:var(--accent)}:focus-visible{outline:3px solid var(--accent);outline-offset:3px}.skip-link{position:absolute;left:12px;top:-80px;z-index:20;background:var(--primary);color:var(--primary-ink);padding:10px 14px;border-radius:8px}.skip-link:focus{top:12px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.site-header{position:sticky;top:0;z-index:15;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:12px max(16px,calc((100vw - var(--maxw))/2));background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}.brand{display:flex;align-items:center;gap:14px;text-decoration:none;min-width:0}.brand-symbol{width:42px;height:42px;border-radius:50%;background:radial-gradient(circle at 45% 28%,var(--leaf) 0 18%,transparent 19%),radial-gradient(circle at 60% 42%,var(--leaf) 0 20%,transparent 21%),linear-gradient(160deg,var(--primary),var(--accent));box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--surface) 70%,transparent)}.brand-text{display:grid;line-height:1.16}.brand-name{font-family:var(--font-head);font-size:1.32rem;font-weight:760}.brand-line{font-size:.92rem;font-weight:720;color:var(--muted)}.site-nav{display:flex;align-items:center;gap:16px;font-size:.94rem}.site-nav a{text-decoration:none;color:var(--muted);font-weight:650}.site-nav a[aria-current=page],.site-nav a:hover{color:var(--primary)}.lang-switch{border:1px solid var(--line);border-radius:999px;padding:7px 10px}.nav-toggle{display:none;background:var(--surface);border:1px solid var(--line);border-radius:8px;width:44px;height:44px;padding:10px}.nav-toggle span:not(.sr-only){display:block;height:2px;background:var(--text);margin:5px 0}.section{max-width:var(--maxw);margin:0 auto;padding:64px 18px}.hero{max-width:none;display:grid;grid-template-columns:minmax(18px,1fr) minmax(0,var(--maxw)) minmax(18px,1fr);gap:0;padding-top:22px}.hero>*{grid-column:2}.hero-media{grid-column:1 / -1;grid-row:1;min-height:330px}.hero-slot{height:100%;border-radius:0}.hero-panel{grid-row:1;margin:34px 0 28px;width:min(620px,100%);background:color-mix(in srgb,var(--surface) 94%,transparent);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:var(--radius);padding:30px}.hero-services{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}.page-hero{padding-top:74px;padding-bottom:38px}.page-hero p{max-width:760px}.eyebrow{display:inline-flex;align-items:center;gap:8px;color:var(--primary);font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:0}.hero-panel .eyebrow{font-size:.86rem}.eyebrow:before{content:"";width:28px;height:1px;background:var(--accent)}h1,h2,h3{font-family:var(--font-head);line-height:1.05;margin:12px 0 14px;font-weight:700;color:var(--text);letter-spacing:0}h1{font-size:2.45rem;max-width:900px}h2{font-size:2rem}h3{font-size:1.35rem}p{margin:0 0 16px}.motto{font-family:var(--font-head);font-size:1.35rem;color:var(--primary);border-left:3px solid var(--accent);padding-left:14px}blockquote{margin:20px 0;padding:18px 20px;border-left:4px solid var(--accent);background:color-mix(in srgb,var(--surface) 72%,var(--bg));font-family:var(--font-head);font-size:1.35rem}.btn-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:11px 16px;border-radius:8px;text-decoration:none;border:1px solid transparent;font-weight:750;cursor:pointer;font:inherit}.btn-primary{background:var(--primary);color:var(--primary-ink)}.btn-secondary{background:transparent;color:var(--primary);border-color:var(--primary)}.btn-ghost{background:transparent;color:var(--muted);border-color:var(--line)}.text-link{font-weight:800;color:var(--primary);text-decoration-thickness:2px;text-underline-offset:4px}.trust-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.trust-row span{display:inline-flex;border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:7px 10px;color:var(--muted);font-size:.86rem}.section-head{max-width:760px;margin-bottom:24px}.split,.service-detail,.signature-block,.contact-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:center}.reverse>*:first-child{order:2}.card-grid{display:grid;gap:16px}.card-grid.three{grid-template-columns:repeat(3,1fr)}.card-grid.two{grid-template-columns:repeat(2,1fr)}.card,.form-card,.note-block,.price-teaser,.energy-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px}.service-card a,.article-card a{color:var(--primary);font-weight:800}.image-slot{aspect-ratio:var(--ratio);background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;margin:0}.image-slot>div{height:100%;display:grid;place-content:center;text-align:center;padding:22px;background:linear-gradient(135deg,color-mix(in srgb,var(--surface) 76%,var(--leaf)),color-mix(in srgb,var(--surface) 78%,#2f87b8));color:var(--text)}.image-slot-real>div{background:linear-gradient(135deg,var(--surface),color-mix(in srgb,var(--bg) 78%,var(--accent)))}.image-slot span{font-size:.76rem;font-weight:850;text-transform:uppercase;color:var(--primary)}.image-slot strong{font-family:var(--font-head);font-size:1.28rem}.image-slot small{color:var(--muted)}.timeline,.gallery-teaser,.price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.timeline article{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:14px}.signature-block{background:linear-gradient(135deg,color-mix(in srgb,var(--primary) 94%,#0f172a),color-mix(in srgb,var(--primary) 70%,#2f87b8));max-width:none;padding:64px max(18px,calc((100vw - var(--maxw))/2));color:var(--primary-ink)}.signature-block h2,.signature-block .eyebrow,.signature-block p{color:var(--primary-ink)}.signature-block .eyebrow:before{background:var(--accent)}.signature-block .image-slot{box-shadow:none}.price-teaser{text-align:center}.faq details{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:16px 18px;margin:10px 0}.faq summary{font-weight:800;cursor:pointer}.energy-card svg{width:100%;height:auto}.svg-leaf{fill:color-mix(in srgb,var(--leaf) 75%,var(--accent));opacity:.9}.svg-stem,.svg-root{fill:none;stroke:var(--primary);stroke-width:16;stroke-linecap:round}.svg-root{stroke-width:8}.energy-card text{font:700 18px system-ui;fill:var(--text);text-anchor:middle}.gallery-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.before-after{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:14px}.before-after>div{display:grid;grid-template-columns:1fr 1fr;gap:10px}.article{max-width:860px}.article .image-slot{margin:24px 0}.form-card label{display:grid;gap:6px;margin:13px 0;font-weight:750}.form-card input,.form-card textarea{width:100%;border:1px solid var(--line);border-radius:8px;padding:12px;background:var(--bg);color:var(--text);font:inherit}.form-note{font-size:.9rem;color:var(--muted)}.legal-content{max-width:860px}.theme-buttons{display:flex;flex-wrap:wrap;gap:10px}.site-footer{background:color-mix(in srgb,var(--primary) 94%,#000);color:var(--primary-ink);padding:44px max(18px,calc((100vw - var(--maxw))/2)) 82px}.footer-grid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:28px}.site-footer a{display:block;color:var(--primary-ink);text-decoration:none;margin:7px 0}.site-footer h2{font-size:1.1rem;color:var(--primary-ink)}.footer-brand{font-family:var(--font-head);font-size:1.35rem;font-weight:800}.site-credit{border-top:1px solid color-mix(in srgb,var(--primary-ink) 20%,transparent);padding-top:18px;color:color-mix(in srgb,var(--primary-ink) 72%,transparent)}.mobile-cta{display:none}.cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:30;max-width:860px;margin:auto;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:var(--radius);padding:16px;gap:14px;align-items:center;justify-content:space-between}.cookie-banner:not([hidden]){display:flex}.cookie-banner p{margin:0}.cookie-banner div{display:flex;gap:10px}.toast{position:fixed;right:16px;bottom:16px;background:var(--primary);color:var(--primary-ink);padding:12px 14px;border-radius:8px;z-index:35;box-shadow:var(--shadow)}@media (min-width:900px){h1{font-size:3.4rem}h2{font-size:2.35rem}.page-hero{padding-top:92px}}@media (max-width:920px){.nav-toggle{display:block}.site-nav{position:fixed;inset:67px 12px auto 12px;display:none;flex-direction:column;align-items:stretch;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:16px}.site-nav.is-open{display:flex}.site-nav a{padding:10px}.hero-services,.card-grid.three,.timeline,.gallery-teaser,.price-grid,.footer-grid,.gallery-grid{grid-template-columns:1fr 1fr}.split,.service-detail,.signature-block,.contact-grid{grid-template-columns:1fr}.reverse>*:first-child{order:0}.hero-panel{margin:20px 0}.mobile-cta{position:fixed;left:0;right:0;bottom:0;z-index:25;display:grid;grid-template-columns:1fr 58px;background:var(--surface);border-top:1px solid var(--line);box-shadow:0 -10px 22px rgba(0,0,0,.08)}.mobile-cta a{min-height:58px;display:grid;place-items:center;text-decoration:none;font-weight:850}.mobile-cta a:first-child{background:var(--primary);color:var(--primary-ink)}body{padding-bottom:58px}.cookie-banner{bottom:72px;display:block}.cookie-banner:not([hidden]){display:block}.cookie-banner div{margin-top:12px}}@media (max-width:620px){.brand-line{display:none}.brand-name{font-size:1rem}.hero-media{min-height:390px}.hero-panel{padding:22px}.hero-services,.card-grid.three,.card-grid.two,.timeline,.gallery-teaser,.price-grid,.footer-grid,.gallery-grid,.before-after>div{grid-template-columns:1fr}.section{padding:50px 16px}h1{font-size:2.2rem}h2{font-size:1.75rem}.btn{width:100%}.btn-row{align-items:stretch}.trust-row span{width:100%;justify-content:center}}@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important;transition:none!important}}`;
}

function cssResponsiveFixes() {
  return `html,body{max-width:100%;overflow-x:hidden}h1,h2,h3,p,.brand-name{overflow-wrap:break-word}.hero-panel,.card,.form-card,.note-block,.price-teaser,.image-slot,.site-nav{min-width:0}.brand-logo{width:53px;height:53px;border-radius:50%;object-fit:cover;object-position:center 24%;background:var(--surface);border:1px solid var(--line);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--surface) 70%,transparent)}.footer-logo{width:min(240px,100%);height:auto;max-height:120px;object-fit:contain;margin-top:18px;padding:12px;background:#fff;border:1px solid color-mix(in srgb,var(--primary-ink) 22%,transparent);border-radius:8px;box-shadow:0 10px 28px rgba(0,0,0,.16)}.image-slot>img{width:100%;height:100%;object-fit:cover}.image-slot{position:relative}.hero-slot>img{object-position:70% center}.hero-img-mobile{display:none}.hero-slot>div{place-content:center end;text-align:right;padding-right:max(24px,10vw)}.hero-slot span,.hero-slot strong,.hero-slot small{max-width:280px}.gallery-real-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.gallery-photo{display:block;aspect-ratio:4/3;overflow:hidden;border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow)}.gallery-photo img{width:100%;height:100%;object-fit:cover;transition:transform .45s ease}.gallery-portrait-grid .gallery-photo{aspect-ratio:3/4}.gallery-portrait-grid .gallery-photo img{object-position:center center}.gallery-photo:hover img{transform:scale(1.04)}.article-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.article-card .image-slot{margin-bottom:16px}.comparison-grid,.process-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:24px 0}.process-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.comparison-grid>div,.process-grid>div,.science-card,.source-list,.article-nav{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:18px}.science-card{margin:24px 0}.source-list{margin:28px 0;color:var(--muted)}.source-list h2{color:var(--text);font-size:1.35rem}.source-list ul{margin:10px 0 0;padding-left:20px}.source-list a{color:var(--primary);font-weight:800}.article-nav{display:flex;flex-wrap:wrap;gap:10px;margin:28px 0}.article-nav a{border:1px solid var(--line);border-radius:999px;padding:8px 10px;text-decoration:none;color:var(--primary);font-weight:800}.stress-chain{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;align-items:center;text-align:center}.stress-chain span,.stress-chain strong{border:1px solid var(--line);border-radius:8px;padding:10px;background:color-mix(in srgb,var(--surface) 70%,var(--bg))}.stress-chain strong{background:var(--primary);color:var(--primary-ink)}.cookie-banner .btn{white-space:nowrap;min-width:110px}@media (max-width:1100px){.gallery-real-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media (max-width:920px){.article-grid,.gallery-real-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.comparison-grid,.process-grid,.stress-chain{grid-template-columns:1fr}}@media (max-width:620px){.site-header{width:100%;min-height:84px;padding:10px 76px 10px 16px;gap:12px}.nav-toggle{display:block;position:fixed;right:16px;top:20px;width:44px;height:44px;z-index:40;background:var(--primary);border-color:var(--primary);box-shadow:var(--shadow)}.nav-toggle span:not(.sr-only){background:var(--primary-ink)}.brand{flex:1 1 auto;max-width:none;min-width:0;gap:12px}.brand-logo{flex:0 0 53px}.brand-text{min-width:0;max-width:calc(100vw - 158px);line-height:1.16}.brand-name{display:block;font-size:1.05rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.brand-line{display:block;font-size:.78rem;font-weight:720;line-height:1.18;white-space:normal;overflow-wrap:anywhere;color:color-mix(in srgb,var(--muted) 88%,var(--text))}.hero{display:block;padding:32px 16px 50px}.hero>*{grid-column:auto}.hero-media{display:block;min-height:180px;margin:0 0 14px}.hero-slot{border-radius:var(--radius)}.hero-slot>img{object-position:78% center}.hero-img-desktop{display:none}.hero-img-mobile{display:block}.hero-panel{width:100%;max-width:none;margin:0;padding:22px;overflow:hidden}.hero-panel h1{font-size:1.85rem;line-height:1.08}.hero-panel .motto{font-size:1.15rem}.hero-services{grid-template-columns:1fr;margin-top:14px}.hero-slot>div{place-content:center;text-align:center;padding-right:22px}.article-grid,.gallery-real-grid{grid-template-columns:1fr}.footer-logo{width:min(200px,100%);max-height:100px}.cookie-banner div{flex-direction:column}.cookie-banner .btn{width:100%;white-space:normal}}`;
}

function headerCompactCss() {
  return `.lang-switch{position:relative;display:inline-flex;align-items:center;border:0!important;border-radius:999px;padding:0!important}.lang-current{display:inline-flex;align-items:center;justify-content:center;min-width:54px;min-height:38px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--surface) 88%,transparent);color:var(--primary);box-shadow:0 8px 22px rgba(0,0,0,.08);font:900 .82rem/1 var(--font-body);cursor:pointer}.lang-current:after{content:"";width:0;height:0;margin-left:7px;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid currentColor;display:inline-block;vertical-align:middle}.lang-current[aria-expanded=true]:after{transform:rotate(180deg)}.lang-menu{position:absolute;top:calc(100% + 8px);right:0;z-index:90;display:grid;grid-template-columns:repeat(2,minmax(42px,1fr));gap:6px;min-width:118px;padding:8px;border:1px solid var(--line);border-radius:12px;background:color-mix(in srgb,var(--surface) 96%,transparent);box-shadow:0 16px 42px rgba(0,0,0,.18);backdrop-filter:blur(16px)}.lang-menu[hidden]{display:none!important}.site-nav .lang-menu a{display:grid;place-items:center;min-height:34px;padding:7px 9px;border:1px solid color-mix(in srgb,var(--primary) 18%,var(--line));border-radius:8px;color:var(--primary);font-weight:900;text-decoration:none}.site-nav .lang-menu a:hover,.site-nav .lang-menu a:focus-visible,.site-nav .lang-menu a[aria-current=true]{background:var(--primary);border-color:var(--primary);color:var(--primary-ink)}.header-phone{display:grid!important;place-items:center;flex:0 0 auto;width:40px;height:40px;border:1px solid color-mix(in srgb,var(--primary) 28%,var(--line));border-radius:999px;background:var(--primary);color:var(--primary-ink)!important;text-decoration:none!important;box-shadow:0 8px 22px rgba(0,0,0,.10);font-size:1.02rem;line-height:1}.header-phone:hover,.header-phone:focus-visible{background:var(--accent);border-color:var(--accent);color:#102214!important}@media (min-width:921px){body{padding-top:78px}.site-header{position:fixed;inset:0 0 auto 0;z-index:80;min-height:78px;width:100%;background:color-mix(in srgb,var(--bg) 92%,transparent);box-shadow:0 10px 28px rgba(0,0,0,.08)}.site-nav{gap:10px}.site-nav>a{white-space:nowrap}.brand{flex:0 1 430px}.brand-line{white-space:normal;line-height:1.16}.nav-toggle{display:none!important}}@media (max-width:920px){.site-header{z-index:80}.site-nav{z-index:75}.lang-switch{align-self:flex-start}.lang-current{min-width:72px}.lang-menu{position:static;grid-template-columns:repeat(5,minmax(42px,1fr));width:100%;margin-top:8px;box-shadow:none;backdrop-filter:none}.header-phone{width:100%;height:44px;grid-template-columns:auto auto;gap:8px}.header-phone .sr-only{position:static;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal}}@media (max-width:620px){body{padding-top:0}.site-header{position:sticky}.lang-menu{grid-template-columns:repeat(3,minmax(42px,1fr))}.header-phone{display:none!important}}`;
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

function heroVariantTwoTypographyCss() {
  return `@media (min-width:621px){.hero[data-hero-variant="2"] .hero-panel{align-self:start;margin:clamp(14px,2vw,24px) 0 0}.hero[data-hero-variant="2"] .hero-panel .eyebrow{display:inline-flex;flex-wrap:wrap;width:fit-content;max-width:100%;margin-bottom:clamp(18px,2vw,26px);padding:8px 13px;border:1px solid rgba(255,230,168,.32);border-radius:999px;background:linear-gradient(135deg,rgba(9,27,15,.34),rgba(9,27,15,.18));box-shadow:0 10px 30px rgba(0,0,0,.16);backdrop-filter:blur(8px);color:#fff;font-size:clamp(.94rem,.86vw,1.04rem);line-height:1.2;font-weight:900;text-shadow:0 2px 14px rgba(0,0,0,.42)}.hero[data-hero-variant="2"] .hero-panel .eyebrow:before{flex:0 0 34px;width:34px;background:#ffe6a8}.hero[data-hero-variant="2"] .hero-panel h1{max-width:920px;font-size:clamp(2.55rem,3.8vw,2.85rem);line-height:1.01;margin-top:0;margin-bottom:16px}}@media (max-width:620px){.hero[data-hero-variant="2"] .hero-panel .eyebrow{max-width:min(100%,34ch);padding:6px 9px;border:1px solid rgba(255,230,168,.28);border-radius:12px;background:rgba(8,22,13,.28);font-size:clamp(.62rem,2.5vw,.78rem);line-height:1.32;font-weight:900}.hero[data-hero-variant="2"] .hero-panel .eyebrow:before{flex:0 0 22px;width:22px;background:#ffe6a8}.hero[data-hero-variant="2"] .hero-panel h1{max-width:13.4ch;font-size:clamp(1.58rem,6.6vw,1.9rem);line-height:1.04}}`;
}

function heroVariantThreeTypographyCss() {
  return `@media (min-width:621px){.hero[data-hero-variant="3"] .hero-panel{align-self:start;width:min(980px,100%);margin:clamp(52px,6vh,70px) 0 0}.hero[data-hero-variant="3"] .hero-panel .eyebrow{display:inline-flex;flex-wrap:wrap;width:fit-content;max-width:min(100%,86ch);margin-bottom:clamp(18px,2vw,24px);padding:8px 14px 8px 12px;border:1px solid rgba(255,230,168,.26);border-radius:999px;background:linear-gradient(135deg,rgba(6,23,12,.50),rgba(8,30,17,.24));box-shadow:0 12px 34px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.08);backdrop-filter:blur(7px);color:rgba(255,255,255,.94);font-size:clamp(.9rem,.78vw,1rem);line-height:1.22;font-weight:850;letter-spacing:0;text-shadow:0 2px 14px rgba(0,0,0,.44)}.hero[data-hero-variant="3"] .hero-panel .eyebrow:before{flex:0 0 36px;width:36px;background:#d7a84d;box-shadow:0 0 14px rgba(215,168,77,.38)}.hero[data-hero-variant="3"] .hero-panel h1{max-width:980px;font-size:clamp(2.55rem,3.15vw,3.05rem);line-height:1.04;margin-top:0;margin-bottom:16px}.hero[data-hero-variant="3"] .hero-accent{color:#ffe6a8;text-shadow:0 2px 18px rgba(0,0,0,.44),0 0 18px rgba(255,230,168,.24)}}@media (max-width:620px){.hero[data-hero-variant="3"] .hero-panel{align-self:start;display:grid;grid-template-columns:minmax(0,1fr);padding:clamp(62px,14vh,82px) 0 calc(88px + env(safe-area-inset-bottom));overflow:visible}.hero[data-hero-variant="3"] .hero-panel .eyebrow{position:relative;display:block;justify-self:center;width:calc(100% - 32px);max-width:calc(100% - 32px);margin:0 16px 16px;padding:18px 10px 10px;border:1px solid rgba(255,230,168,.26);border-radius:12px;background:rgba(6,23,12,.30);font-size:clamp(12px,3.1vw,14px);line-height:1.2;font-weight:850;letter-spacing:0;text-wrap:balance;white-space:normal;overflow-wrap:normal;word-break:normal;hyphens:none}.hero[data-hero-variant="3"] .hero-panel .eyebrow:before{position:absolute;left:10px;top:11px;display:block;flex:none;width:34px;height:1px;margin:0;background:#ffe6a8}.hero[data-hero-variant="3"] .hero-panel h1{justify-self:center;width:calc(100% - 32px);max-width:calc(100% - 32px);margin:0 16px 12px;font-size:clamp(29px,7.4vw,35px);line-height:1;text-wrap:balance;overflow-wrap:normal}.hero[data-hero-variant="3"] .hero-panel .motto,.hero[data-hero-variant="3"] .hero-copy-mobile,.hero[data-hero-variant="3"] .hero-panel .btn-row,.hero[data-hero-variant="3"] .hero-panel .trust-row{margin-left:20px;margin-right:20px}}`;
}

function heroThreeModeCss() {
  return `.hero{--hero-desktop-pos:48% center;--hero-mobile-pos:50% center;--hero-filter:saturate(1.2) contrast(1.07) brightness(1.04);--hero-scale:1;--hero-origin:center center;--hero-mobile-scale:1.05;--hero-mobile-origin:50% center;--hero-overlay-left:rgba(7,16,10,.54);--hero-overlay-mid:rgba(7,16,10,.24);--hero-overlay-right:rgba(7,16,10,.04);--hero-overlay-edge:rgba(7,16,10,.08);--hero-overlay-bottom:rgba(7,16,10,.34)}.hero-media:after{pointer-events:none;background:linear-gradient(90deg,var(--hero-overlay-left) 0%,var(--hero-overlay-mid) 34%,var(--hero-overlay-right) 70%,var(--hero-overlay-edge) 100%),linear-gradient(0deg,var(--hero-overlay-bottom),rgba(7,16,10,0) 44%)}.hero-slot{width:100%}.hero-slot>img{filter:var(--hero-filter);object-position:var(--hero-desktop-pos);transform:scale(var(--hero-scale));transform-origin:var(--hero-origin)}.hero-copy-mobile,.hero-copy-variant{display:none}.hero-accent{color:#ffe6a8;text-shadow:0 2px 20px rgba(0,0,0,.38)}.site-nav .hero-variant-switcher{position:relative;z-index:16;display:block;padding:0;border:0;background:transparent;color:var(--text);box-shadow:none;backdrop-filter:none}.site-nav .hero-variant-toggle{display:inline-flex;align-items:center;gap:8px;min-height:38px;padding:6px 8px 6px 11px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--surface) 86%,transparent);color:var(--primary);box-shadow:0 8px 22px rgba(0,0,0,.10);font:850 .75rem/1 var(--font-body);cursor:pointer}.site-nav .hero-variant-toggle span{font-size:.66rem;font-weight:850;letter-spacing:0;text-transform:uppercase;color:var(--muted)}.site-nav .hero-variant-toggle strong{display:grid;place-items:center;width:25px;height:25px;border-radius:999px;background:linear-gradient(135deg,#ffe6a8,#c99c45);color:#132218;text-shadow:none}.site-nav .hero-variant-options{position:absolute;top:calc(100% + 8px);right:0;display:grid;grid-template-columns:repeat(3,32px);gap:7px;padding:8px;border:1px solid var(--line);border-radius:14px;background:color-mix(in srgb,var(--surface) 94%,transparent);box-shadow:0 16px 42px rgba(0,0,0,.18);backdrop-filter:blur(16px)}.site-nav .hero-variant-options[hidden]{display:none}.site-nav .hero-variant-option{display:grid;place-items:center;width:32px;height:32px;border:1px solid color-mix(in srgb,var(--primary) 30%,var(--line));border-radius:999px;background:color-mix(in srgb,var(--surface) 88%,transparent);color:var(--primary);font:850 .82rem/1 var(--font-body);cursor:pointer}.site-nav .hero-variant-option:hover,.site-nav .hero-variant-option:focus-visible,.site-nav .hero-variant-option.is-active{background:linear-gradient(135deg,#e7ffb7,#72c346);border-color:rgba(114,195,70,.88);color:#102214;text-shadow:none}.hero[data-hero-variant="1"]{--hero-desktop-pos:48% center;--hero-mobile-pos:50% center;--hero-mobile-scale:1.06;--hero-mobile-origin:50% center;--hero-overlay-left:rgba(7,16,10,.50);--hero-overlay-mid:rgba(7,16,10,.22);--hero-overlay-right:rgba(7,16,10,.03);--hero-overlay-edge:rgba(7,16,10,.08);--hero-overlay-bottom:rgba(7,16,10,.34)}.hero[data-hero-variant="2"]{--hero-desktop-pos:47% center;--hero-mobile-pos:52% center;--hero-mobile-scale:1.08;--hero-mobile-origin:52% center;--hero-filter:saturate(1.12) contrast(1.05) brightness(.94);--hero-overlay-left:rgba(7,14,9,.70);--hero-overlay-mid:rgba(7,14,9,.42);--hero-overlay-right:rgba(7,14,9,.10);--hero-overlay-edge:rgba(7,14,9,.14);--hero-overlay-bottom:rgba(7,14,9,.50)}.hero[data-hero-variant="2"] .motto,.hero[data-hero-variant="2"] .hero-copy-desktop,.hero[data-hero-variant="2"] .hero-copy-mobile{display:none}.hero[data-hero-variant="2"] .hero-copy-v2{display:block}.hero[data-hero-variant="3"]{--hero-desktop-pos:50% 44%;--hero-mobile-pos:58% 44%;--hero-mobile-scale:1.02;--hero-mobile-origin:58% 44%;--hero-filter:saturate(1.08) contrast(1.03) brightness(1.02);--hero-overlay-left:rgba(7,16,10,.48);--hero-overlay-mid:rgba(7,16,10,.24);--hero-overlay-right:rgba(7,16,10,.02);--hero-overlay-edge:rgba(7,16,10,.04);--hero-overlay-bottom:rgba(7,16,10,.24)}@media (max-width:920px){.site-nav .hero-variant-switcher{align-self:flex-start}.site-nav .hero-variant-options{left:0;right:auto}}@media (max-width:620px){.hero{display:grid;grid-template-columns:1fr;min-height:calc(100svh - 84px);padding:0;overflow:hidden}.hero>*{grid-column:1}.hero-media{position:absolute;inset:0;display:block;height:100%;min-height:0;margin:0}.hero-media:after{background:linear-gradient(0deg,rgba(7,16,10,.62) 0%,rgba(7,16,10,.34) 44%,rgba(7,16,10,.06) 100%),linear-gradient(90deg,rgba(7,16,10,.30) 0%,rgba(7,16,10,.08) 58%,rgba(7,16,10,0) 100%)}.hero-slot{height:100%;border-radius:0}.hero-slot>img{object-position:var(--hero-mobile-pos);transform:scale(var(--hero-mobile-scale));transform-origin:var(--hero-mobile-origin)}.hero-panel{grid-column:1;grid-row:1;align-self:end;width:100%;max-width:100%;margin:0;padding:0 20px calc(88px + env(safe-area-inset-bottom));overflow:visible}.hero-panel .eyebrow{display:flex;flex-wrap:wrap;max-width:34ch;font-size:clamp(.64rem,2.6vw,.82rem);line-height:1.28;gap:7px;margin-bottom:10px;text-shadow:0 2px 14px rgba(0,0,0,.52)}.hero-panel .eyebrow:before{flex:0 0 22px;width:22px;background:#ffe6a8}.hero-panel h1{max-width:13.2ch;font-size:clamp(1.9rem,7.6vw,2.25rem);line-height:1.02;margin-bottom:10px;overflow-wrap:normal;text-shadow:0 2px 18px rgba(0,0,0,.64),0 0 2px rgba(0,0,0,.72)}.hero-panel .motto{width:max-content;max-width:min(100%,28ch);font-size:clamp(1rem,4.1vw,1.18rem);line-height:1.34;margin-bottom:12px;padding:7px 10px 7px 12px;border-left:3px solid #ffe6a8;border-radius:10px;background:linear-gradient(135deg,rgba(5,24,12,.46),rgba(5,24,12,.20));box-shadow:0 10px 24px rgba(0,0,0,.18);backdrop-filter:blur(3px)}.hero-copy-desktop{display:none}.hero-copy-mobile{display:block;width:max-content;max-width:min(100%,32ch);padding:8px 10px;border:1px solid rgba(255,255,255,.14);border-radius:10px;background:linear-gradient(135deg,rgba(5,24,12,.46),rgba(5,24,12,.22));box-shadow:0 10px 24px rgba(0,0,0,.18);backdrop-filter:blur(3px);font-size:clamp(.94rem,3.55vw,1.05rem);line-height:1.46;overflow-wrap:normal}.hero-panel .btn-row{margin-top:14px}.hero .trust-row{margin-top:10px}.hero .trust-row span:not(.experience-pill){display:none}.hero .trust-row .experience-pill{width:auto;justify-content:flex-start}.site-nav .hero-variant-toggle{min-width:78px}.site-nav .hero-variant-options{grid-template-columns:repeat(3,31px);gap:6px;max-width:calc(100vw - 32px);padding:7px}.site-nav .hero-variant-option{width:31px;height:31px}.hero[data-hero-variant="2"] .hero-media:after{background:linear-gradient(0deg,rgba(7,14,9,.72) 0%,rgba(7,14,9,.46) 46%,rgba(7,14,9,.12) 100%),linear-gradient(90deg,rgba(7,14,9,.42) 0%,rgba(7,14,9,.14) 58%,rgba(7,14,9,.02) 100%)}.hero[data-hero-variant="2"] .hero-panel{align-self:start;padding-top:18px}.hero[data-hero-variant="2"] .hero-copy-v2{display:block;max-width:min(100%,34ch);margin:2px 0 0;color:#fff;font-family:var(--font-head);font-style:italic;font-size:clamp(1.02rem,4.2vw,1.28rem);line-height:1.48;text-shadow:0 2px 18px rgba(0,0,0,.72),0 0 2px rgba(0,0,0,.78)}.hero[data-hero-variant="3"] .hero-media:after{background:radial-gradient(ellipse 92% 54% at 20% 22%,rgba(5,18,10,.52) 0%,rgba(5,18,10,.32) 42%,rgba(5,18,10,0) 76%),linear-gradient(90deg,rgba(5,18,10,.38) 0%,rgba(5,18,10,.12) 58%,rgba(5,18,10,0) 100%),linear-gradient(0deg,rgba(5,15,9,.18) 0%,rgba(5,15,9,0) 48%)}.hero[data-hero-variant="3"] .hero-panel h1{padding:8px 10px 10px;border:1px solid rgba(255,255,255,.13);border-radius:13px;background:linear-gradient(135deg,rgba(5,24,12,.34),rgba(5,24,12,.12));box-shadow:0 12px 28px rgba(0,0,0,.16);backdrop-filter:blur(2px)}}`;
}

function heroThreeModeTypographyCss() {
  return `@media (min-width:621px){.hero-panel h1{max-width:760px;font-size:clamp(2.7rem,4vw,3.55rem)}.hero-panel .motto,.hero-panel .hero-copy-desktop{width:max-content;max-width:660px;padding:8px 12px;border-radius:10px;background:linear-gradient(135deg,rgba(5,24,12,.34),rgba(5,24,12,.14));box-shadow:0 12px 30px rgba(0,0,0,.16);backdrop-filter:blur(3px)}.hero[data-hero-variant="1"] .hero-panel{width:min(760px,100%);margin-bottom:44px}.hero[data-hero-variant="1"] .hero-panel h1{max-width:13.8ch}.hero[data-hero-variant="2"] .hero-panel{align-self:start;width:min(980px,100%);margin:clamp(22px,4vh,44px) 0 0}.hero[data-hero-variant="2"] .hero-panel .eyebrow{display:block;width:auto;max-width:min(100%,68ch);margin-bottom:clamp(16px,2vw,24px);padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;backdrop-filter:none;color:#fff;font-size:clamp(.96rem,.92vw,1.12rem);line-height:1.28;font-weight:900;text-shadow:0 2px 14px rgba(0,0,0,.68),0 0 2px rgba(0,0,0,.78)}.hero[data-hero-variant="2"] .hero-panel .eyebrow:before{content:none}.hero[data-hero-variant="2"] .hero-panel h1{max-width:760px;font-size:clamp(2.62rem,3.6vw,3.2rem);line-height:.99;margin-top:0;margin-bottom:16px}.hero[data-hero-variant="2"] .hero-copy-v2{max-width:840px;color:#fff;font-family:var(--font-head);font-style:italic;font-size:clamp(1.18rem,1.65vw,1.55rem);line-height:1.52;text-shadow:0 2px 18px rgba(0,0,0,.68),0 0 2px rgba(0,0,0,.74)}.hero[data-hero-variant="3"] .hero-panel{width:min(760px,100%);margin-bottom:44px}.hero[data-hero-variant="3"] .hero-panel h1{width:max-content;max-width:min(13.8ch,100%);padding:10px 14px 12px;border:1px solid rgba(255,255,255,.13);border-radius:14px;background:linear-gradient(135deg,rgba(5,24,12,.28),rgba(5,24,12,.10));box-shadow:0 14px 34px rgba(0,0,0,.18);backdrop-filter:blur(2px)}}@media (max-width:620px){.hero[data-hero-variant="2"] .hero-panel h1{max-width:12.5ch;font-size:clamp(1.72rem,6.7vw,2.05rem);line-height:1.02}.hero[data-hero-variant="2"] .hero-panel .eyebrow{display:block;max-width:min(100%,36ch);margin-bottom:12px;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;backdrop-filter:none;color:#fff;font-size:clamp(.86rem,3.45vw,1rem);line-height:1.26;font-weight:850;text-shadow:0 2px 14px rgba(0,0,0,.72),0 0 2px rgba(0,0,0,.82);overflow-wrap:normal}.hero[data-hero-variant="2"] .hero-panel .eyebrow:before{content:none}.hero[data-hero-variant="3"] .hero-panel{padding-bottom:calc(88px + env(safe-area-inset-bottom))}.hero[data-hero-variant="3"] .hero-panel .motto,.hero[data-hero-variant="3"] .hero-copy-mobile{background:linear-gradient(135deg,rgba(5,24,12,.36),rgba(5,24,12,.14))}}`;
}

function heroThreeModePolishCss() {
  return `.hero[data-hero-variant="3"] .hero-panel h1{width:auto!important;max-width:13.8ch!important;padding:8px 10px 10px!important;border:1px solid rgba(255,255,255,.13)!important;border-radius:13px!important;background:linear-gradient(135deg,rgba(5,24,12,.34),rgba(5,24,12,.12))!important;box-shadow:0 12px 28px rgba(0,0,0,.16)!important;backdrop-filter:blur(2px)!important}@media (min-width:621px){.hero[data-hero-variant="3"] .hero-panel h1{max-width:760px!important;background:linear-gradient(90deg,rgba(5,24,12,.44),rgba(5,24,12,.12) 82%,rgba(5,24,12,0))!important;border:0!important;border-radius:10px!important}}`;
}

function heroFourModeCss() {
  return `.site-nav .hero-variant-options{grid-template-columns:repeat(4,32px)}.hero[data-hero-variant="4"]{--hero-desktop-pos:50% 44%;--hero-mobile-pos:58% 44%;--hero-mobile-scale:1.02;--hero-mobile-origin:58% 44%;--hero-filter:saturate(1.08) contrast(1.03) brightness(1.02);--hero-overlay-left:rgba(7,16,10,.46);--hero-overlay-mid:rgba(7,16,10,.22);--hero-overlay-right:rgba(7,16,10,.02);--hero-overlay-edge:rgba(7,16,10,.04);--hero-overlay-bottom:rgba(7,16,10,.20)}.hero[data-hero-variant="4"] .hero-copy-desktop,.hero[data-hero-variant="4"] .hero-copy-mobile{display:none!important}.hero[data-hero-variant="4"] .hero-accent{color:#ffe6a8;text-shadow:0 2px 18px rgba(0,0,0,.48),0 0 18px rgba(255,230,168,.22)}@media (min-width:621px){.hero[data-hero-variant="4"] .hero-panel{align-self:end;width:min(760px,100%);margin-bottom:52px;overflow:visible}.hero[data-hero-variant="4"] .hero-panel .eyebrow{position:relative;top:auto;display:inline-flex;flex-wrap:wrap;width:fit-content;max-width:min(100%,840px);margin-bottom:18px;padding:9px 14px;border:1px solid rgba(255,230,168,.24);border-radius:999px;background:linear-gradient(135deg,rgba(6,23,12,.42),rgba(8,30,17,.18));box-shadow:0 12px 30px rgba(0,0,0,.16);backdrop-filter:blur(6px);color:#fff;font-size:clamp(.95rem,.92vw,1.08rem);line-height:1.24;font-weight:900;text-shadow:0 2px 14px rgba(0,0,0,.56)}.hero[data-hero-variant="4"] .hero-panel .eyebrow:before{flex:0 0 38px;width:38px;background:#ffe6a8}.hero[data-hero-variant="4"] .hero-panel h1{width:auto!important;max-width:12.8ch!important;margin-bottom:16px;padding:10px 14px 12px!important;border:1px solid rgba(255,255,255,.13)!important;border-radius:13px!important;background:linear-gradient(90deg,rgba(5,24,12,.42),rgba(5,24,12,.12) 86%,rgba(5,24,12,0))!important;box-shadow:0 14px 34px rgba(0,0,0,.16)!important;backdrop-filter:blur(2px)!important;font-size:clamp(2.18rem,2.85vw,2.62rem)!important;line-height:1.025}.hero[data-hero-variant="4"] .hero-panel .motto{max-width:560px;margin-bottom:0;font-size:clamp(1.13rem,1.25vw,1.28rem)}}@media (max-width:620px){.site-nav .hero-variant-options{grid-template-columns:repeat(4,31px)}.hero[data-hero-variant="4"] .hero-media:after{background:radial-gradient(ellipse 92% 52% at 20% 22%,rgba(5,18,10,.48) 0%,rgba(5,18,10,.30) 40%,rgba(5,18,10,0) 74%),linear-gradient(90deg,rgba(5,18,10,.32) 0%,rgba(5,18,10,.10) 58%,rgba(5,18,10,0) 100%),linear-gradient(0deg,rgba(5,15,9,.12) 0%,rgba(5,15,9,0) 48%)}.hero[data-hero-variant="4"] .hero-panel{align-self:start;display:grid;grid-template-columns:minmax(0,1fr);padding:clamp(56px,12vh,74px) 0 calc(88px + env(safe-area-inset-bottom));overflow:visible;text-align:left}.hero[data-hero-variant="4"] .hero-panel .eyebrow{position:relative;display:block;justify-self:center;width:calc(100% - 32px);max-width:calc(100% - 32px);margin:0 16px 14px;padding:16px 10px 9px;border:1px solid rgba(255,230,168,.24);border-radius:12px;background:linear-gradient(135deg,rgba(6,23,12,.34),rgba(6,23,12,.16));box-shadow:0 10px 24px rgba(0,0,0,.16);backdrop-filter:blur(2px);color:#fff;font-size:clamp(14px,3.55vw,16px);line-height:1.2;font-weight:900;letter-spacing:0;text-wrap:balance;white-space:normal;overflow-wrap:normal;word-break:normal;hyphens:none;text-shadow:0 2px 14px rgba(0,0,0,.64),0 0 2px rgba(0,0,0,.70)}.hero[data-hero-variant="4"] .hero-panel .eyebrow:before{position:absolute;left:10px;top:10px;display:block;flex:none;width:36px;height:1px;margin:0;background:#ffe6a8}.hero[data-hero-variant="4"] .hero-panel h1{justify-self:center;width:calc(100% - 32px)!important;max-width:calc(100% - 32px)!important;margin:0 16px 12px;padding:8px 10px 10px!important;border:1px solid rgba(255,255,255,.13)!important;border-radius:13px!important;background:linear-gradient(135deg,rgba(5,24,12,.32),rgba(5,24,12,.12))!important;box-shadow:0 12px 28px rgba(0,0,0,.16)!important;backdrop-filter:blur(2px)!important;font-size:clamp(25px,6.25vw,30px)!important;line-height:1.03;text-wrap:balance;overflow-wrap:normal}.hero[data-hero-variant="4"] .hero-panel .motto{justify-self:center;width:calc(100% - 40px);max-width:calc(100% - 40px);margin:0 20px 16px;background:linear-gradient(135deg,rgba(5,24,12,.38),rgba(5,24,12,.16));font-size:clamp(1.02rem,4vw,1.14rem);line-height:1.35}.hero[data-hero-variant="4"] .hero-panel .btn-row,.hero[data-hero-variant="4"] .hero-panel .trust-row{justify-self:center;width:calc(100% - 40px);max-width:calc(100% - 40px);margin-left:20px;margin-right:20px}.hero[data-hero-variant="4"] .hero-panel .btn-row{margin-top:0}.hero[data-hero-variant="4"] .hero-panel .trust-row{margin-top:10px}}`;
}

function heroFourFixedLayoutCss() {
  return `.hero-variant-switcher{display:none!important}.hero-service-accent{color:#ffe6a8;text-shadow:0 0 18px rgba(255,230,168,.30),0 2px 14px rgba(0,0,0,.58)}.hero-service-line-row{display:block;white-space:nowrap}.hero[data-hero-variant="4"] .hero-panel .hero-service-line .hero-service-accent{color:#ffe6a8}@media (min-width:621px){.hero[data-hero-variant="4"] .hero-panel{width:min(1280px,calc(100vw - 120px));margin-bottom:52px}.hero[data-hero-variant="4"] .hero-panel .hero-service-line{left:0;top:-66px;display:inline-grid;grid-template-columns:max-content;row-gap:8px;width:max-content;max-width:calc(100vw - 44px);margin-bottom:-36px;padding:12px 18px 12px 68px;border-radius:28px;white-space:normal;font-size:clamp(11px,1.2vw,16px);line-height:1.12}.hero[data-hero-variant="4"] .hero-panel .hero-service-line:before{position:absolute;left:18px;top:19px;display:block;flex:none;width:42px;height:1px;margin:0;background:#ffe6a8}}@media (max-width:620px){.hero-service-line-row{display:inline;white-space:normal}.hero[data-hero-variant="4"] .hero-panel{padding:clamp(30px,7vh,48px) 0 calc(88px + env(safe-area-inset-bottom))}.hero[data-hero-variant="4"] .hero-panel .hero-service-line{width:calc(100% - 28px);max-width:calc(100% - 28px);margin:0 14px 12px;padding:16px 11px 10px;font-size:clamp(12px,3.05vw,14px);line-height:1.22;text-wrap:balance}.hero[data-hero-variant="4"] .hero-panel .hero-service-line:before{left:11px;top:10px;width:34px}.hero[data-hero-variant="4"] .hero-panel h1{margin-top:0}}`;
}

function meisterCarouselResponsiveCss() {
  return `.meister-section{align-items:center}.meister-carousel{width:min(100%,680px);justify-self:center;align-self:center;background:#f8f5ee}.meister-carousel .image-carousel-slide{object-fit:contain;padding:clamp(10px,1.4vw,18px);background:#f8f5ee}@media (min-width:921px) and (max-width:1320px){.meister-section{grid-template-columns:minmax(0,1fr) minmax(360px,.76fr);gap:28px}.meister-section h2{font-size:clamp(2.15rem,3.6vw,3.05rem)}.meister-carousel{max-width:540px}.meister-carousel .image-carousel-btn{width:38px;height:38px;font-size:1.45rem}.meister-carousel .image-carousel-prev{left:10px}.meister-carousel .image-carousel-next{right:10px}}@media (min-width:1321px){.meister-carousel{max-width:640px}}@media (max-width:920px){.meister-carousel{max-width:680px;margin:0 auto}.meister-carousel .image-carousel-slide{padding:10px}}`;
}

function experienceAccentCss() {
  return `.hero .trust-row .experience-pill{position:relative;align-items:center;gap:7px;background:linear-gradient(135deg,rgba(198,155,72,.96),rgba(255,235,176,.88));border-color:rgba(255,229,156,.78);color:#142417;text-shadow:none;box-shadow:0 12px 32px rgba(0,0,0,.24),inset 0 0 0 1px rgba(255,255,255,.28),0 0 24px rgba(214,168,83,.24);animation:experienceGlow 5.4s ease-in-out infinite}.hero .trust-row .experience-pill strong{font-family:var(--font-head);font-size:1.08rem;line-height:1;color:#0d2a17}.hero .trust-row .experience-pill:after{content:"";position:absolute;inset:-2px;border-radius:999px;border:1px solid rgba(255,225,150,.42);opacity:.58;pointer-events:none}@keyframes experienceGlow{0%,100%{transform:translateY(0);box-shadow:0 12px 32px rgba(0,0,0,.24),inset 0 0 0 1px rgba(255,255,255,.28),0 0 20px rgba(214,168,83,.2)}50%{transform:translateY(-1px);box-shadow:0 16px 38px rgba(0,0,0,.3),inset 0 0 0 1px rgba(255,255,255,.34),0 0 34px rgba(238,190,95,.34)}}@media (max-width:620px){.hero .trust-row .experience-pill{padding:7px 11px}.hero .trust-row .experience-pill strong{font-size:1.02rem}}@media (prefers-reduced-motion:reduce){.hero .trust-row .experience-pill{animation:none!important;transform:none!important}}`;
}

function galleryCaseCss() {
  return `.case-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.case-card{display:block;overflow:hidden;width:100%;padding:0;border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow);color:inherit;text-align:left;text-decoration:none;cursor:pointer}.case-card:hover .case-frame img,.case-card:focus-visible .case-frame img{transform:scale(1.035)}.case-card:focus-visible{outline:3px solid var(--accent);outline-offset:4px}.case-pair,.case-detail-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;background:#102016}.case-pair-three{grid-template-columns:repeat(3,minmax(0,1fr))}.case-pair-feature{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));grid-template-areas:"before work" "after after";aspect-ratio:16/10}.case-pair-feature .case-frame{aspect-ratio:auto}.case-pair-feature .case-frame-before{grid-area:before}.case-pair-feature .case-frame-work{grid-area:work}.case-pair-feature .case-frame-after{grid-area:after;grid-column:1 / -1;border-left:0;border-top:1px solid rgba(255,255,255,.72)}.case-frame{position:relative;aspect-ratio:16/10;overflow:hidden;margin:0;background-color:var(--surface);background-image:var(--case-image);background-size:cover;background-position:var(--case-position,center center)}.case-frame+.case-frame{border-left:1px solid rgba(255,255,255,.72)}.case-frame img{display:block;width:100%;height:100%;object-fit:cover;object-position:var(--case-position,center center);transition:transform .45s ease}.case-frame-zoom{display:block;width:100%;height:100%;padding:0;border:0;background:transparent;color:inherit;font:inherit;cursor:zoom-in}.case-frame-zoom:hover img,.case-frame-zoom:focus-visible img{transform:scale(1.035)}.case-frame-zoom:focus-visible{outline:3px solid var(--accent);outline-offset:-3px}.case-frame-zoomable figcaption{pointer-events:none}.case-frame figcaption{position:absolute;left:10px;top:10px;max-width:calc(100% - 20px);border:1px solid rgba(255,255,255,.42);border-radius:999px;background:rgba(9,18,13,.62);color:#fff;padding:6px 9px;font-size:.74rem;font-weight:850;line-height:1.05;white-space:normal;text-wrap:balance;backdrop-filter:blur(10px)}.case-copy{display:grid;gap:8px;padding:17px 18px 19px}.case-copy strong{font-family:var(--font-head);font-size:1.28rem;line-height:1.12;color:var(--text)}.case-copy span{color:var(--muted);line-height:1.5}.case-copy em{font-style:normal;font-weight:850;color:var(--primary);text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:4px}.case-modal[hidden],.case-detail[hidden]{display:none!important}body.case-modal-open{overflow:hidden}.case-modal{position:fixed;inset:0;z-index:90;display:grid;place-items:center;padding:18px}.case-modal-backdrop{position:absolute;inset:0;border:0;background:rgba(9,18,13,.66);backdrop-filter:blur(8px);cursor:pointer}.case-modal-panel{position:relative;width:min(1120px,100%);max-height:calc(100svh - 36px);overflow:auto;border:1px solid color-mix(in srgb,var(--primary) 18%,var(--line));border-radius:var(--radius);background:var(--surface);box-shadow:0 28px 90px rgba(0,0,0,.34);padding:18px}.case-modal-close{position:sticky;top:0;z-index:3;display:grid;place-items:center;width:42px;height:42px;margin-left:auto;margin-bottom:10px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--surface) 90%,transparent);color:var(--primary);font:800 1.6rem/1 var(--font-body);cursor:pointer;backdrop-filter:blur(10px)}.case-detail{display:grid;grid-template-columns:minmax(0,1.18fr) minmax(320px,.82fr);gap:24px;align-items:start}.case-detail-media{display:grid;gap:18px;min-width:0}.case-detail-pair{gap:10px;background:transparent}.case-detail-pair .case-frame{border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}.case-detail-pair .case-frame+.case-frame{border-left:1px solid var(--line)}.case-detail-pair.case-pair-feature .case-frame-after{border-left:1px solid var(--line);border-top:1px solid var(--line)}.case-series{display:grid;gap:14px;border-top:1px solid var(--line);padding-top:16px}.case-series>h3,.case-series-group h3{font-size:1.05rem;margin:0;color:var(--primary)}.case-series-group{display:grid;gap:10px}.case-series-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.case-series-grid .case-frame{aspect-ratio:4/3;border:1px solid var(--line);border-radius:8px}.case-series-grid .case-frame+.case-frame{border-left:1px solid var(--line)}.case-detail-copy{padding:4px 4px 12px}.case-detail-copy h2{font-size:clamp(1.8rem,3vw,2.55rem)}.case-notes{display:grid;gap:12px;margin:22px 0 0}.case-notes div{border-top:1px solid var(--line);padding-top:12px}.case-notes dt{font-weight:900;color:var(--primary)}.case-notes dd{margin:4px 0 0;color:var(--muted)}.watereri-series{padding-top:38px}.watereri-stage-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.watereri-stage{display:grid;gap:14px;min-width:0;border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow);padding:16px}.watereri-stage-copy h3{font-size:1.18rem;margin-top:0}.watereri-stage-copy p{color:var(--muted);font-size:.96rem;line-height:1.5}.watereri-photo-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.watereri-photo-grid .case-frame{aspect-ratio:4/3;border:1px solid var(--line);border-radius:8px}.watereri-photo-grid .case-frame+.case-frame{border-left:1px solid var(--line)}@media (max-width:920px){.case-grid{grid-template-columns:1fr}.case-detail{grid-template-columns:1fr}.case-modal-panel{padding:14px}.case-detail-copy h2{font-size:2rem}.case-series-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.watereri-stage-grid{grid-template-columns:1fr}}@media (max-width:620px){.case-grid{gap:14px}.case-copy{padding:15px}.case-copy strong{font-size:1.14rem}.case-pair,.case-detail-pair{gap:0}.case-detail-pair{gap:8px}.case-detail-pair.case-pair-three{grid-template-columns:1fr}.case-frame{aspect-ratio:4/3}.case-pair .case-frame{aspect-ratio:1/1}.case-pair-feature{aspect-ratio:4/3}.case-pair-feature .case-frame{aspect-ratio:auto}.case-frame figcaption{left:7px;top:7px;max-width:calc(100% - 14px);font-size:.66rem;padding:5px 7px}.case-modal{padding:10px}.case-modal-panel{max-height:calc(100svh - 20px);border-radius:10px}.case-modal-close{width:40px;height:40px;margin-bottom:8px}.case-detail-copy h2{font-size:1.72rem}.case-notes{gap:10px}.case-series-grid,.watereri-photo-grid{grid-template-columns:1fr}.watereri-stage{padding:14px}}`;
}

function imageLightboxCss() {
  return `.image-lightbox[hidden]{display:none!important}body.image-lightbox-open{overflow:hidden}.image-lightbox{position:fixed;inset:0;z-index:130;display:grid;place-items:center;padding:18px}.image-lightbox-backdrop{position:absolute;inset:0;border:0;background:rgba(3,9,6,.82);backdrop-filter:blur(10px);cursor:zoom-out}.image-lightbox-panel{position:relative;z-index:1;display:grid;gap:10px;max-width:min(1180px,calc(100vw - 28px));max-height:calc(100svh - 28px);color:#fff}.image-lightbox-panel img{display:block;max-width:100%;max-height:calc(100svh - 96px);width:auto;height:auto;object-fit:contain;border-radius:8px;box-shadow:0 28px 90px rgba(0,0,0,.52);background:#07100b}.image-lightbox-caption{margin:0;color:rgba(255,255,255,.86);font-weight:800;text-align:center;text-shadow:0 2px 18px rgba(0,0,0,.46)}.image-lightbox-close{position:absolute;right:-10px;top:-10px;z-index:2;display:grid;place-items:center;width:42px;height:42px;border:1px solid rgba(255,255,255,.34);border-radius:999px;background:rgba(9,18,13,.72);color:#fff;font:800 1.55rem/1 var(--font-body);cursor:pointer;backdrop-filter:blur(10px)}@media (max-width:620px){.image-lightbox{padding:10px}.image-lightbox-panel{max-width:calc(100vw - 18px);max-height:calc(100svh - 18px)}.image-lightbox-panel img{max-height:calc(100svh - 82px);border-radius:6px}.image-lightbox-close{right:0;top:0;width:40px;height:40px}.image-lightbox-caption{font-size:.9rem}}`;
}

function galleryDiagnosticCss() {
  return `.case-diagnosis{display:grid;gap:9px;margin:14px 0 0;padding:12px;border:1px solid color-mix(in srgb,var(--primary) 20%,var(--line));border-radius:8px;background:color-mix(in srgb,var(--primary) 5%,var(--surface))}.case-diagnosis div{display:grid;gap:3px}.case-diagnosis dt{font-size:.72rem;font-weight:900;letter-spacing:0;text-transform:uppercase;color:var(--primary)}.case-diagnosis dd{margin:0;color:var(--muted);font-size:.94rem;line-height:1.45}.case-diagnosis-compact{gap:7px;margin-top:2px;padding:10px;background:color-mix(in srgb,var(--bg) 42%,var(--surface))}.case-diagnosis-compact dd{font-size:.9rem}.case-detail-copy>.case-diagnosis{margin-top:18px}.case-notes{margin-top:18px}@media (max-width:620px){.case-diagnosis{padding:10px}.case-diagnosis dd{font-size:.88rem}}`;
}

function connectedSeriesCss() {
  return `.connected-series{padding-top:38px}.connected-series-grid{display:grid;gap:18px}.connected-series-card{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(300px,.88fr);gap:18px;align-items:stretch;border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow);padding:16px;overflow:hidden}.connected-series-media{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;min-width:0}.connected-series-media-3{grid-template-columns:repeat(3,minmax(0,1fr))}.connected-series-media-4{grid-template-columns:repeat(4,minmax(0,1fr))}.connected-series-media .case-frame{aspect-ratio:4/3;border:1px solid var(--line);border-radius:8px;background:#102016}.connected-series-media .case-frame+.case-frame{border-left:1px solid var(--line)}.connected-series-copy{display:grid;align-content:center;min-width:0;padding:4px 4px 4px 8px}.connected-series-copy h3{font-size:1.35rem;margin-top:0}.connected-series-copy p{color:var(--muted);line-height:1.55}.connected-series-notes{display:grid;gap:12px;margin:8px 0 0}.connected-series-notes div{border-top:1px solid var(--line);padding-top:11px}.connected-series-notes dt{font-weight:900;color:var(--primary)}.connected-series-notes dd{margin:4px 0 0;color:var(--muted)}@media (max-width:1100px){.connected-series-card{grid-template-columns:1fr}.connected-series-copy{padding:0}.connected-series-media-4{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width:620px){.connected-series-grid{gap:14px}.connected-series-card{padding:14px}.connected-series-media,.connected-series-media-3,.connected-series-media-4{grid-template-columns:1fr}.connected-series-copy h3{font-size:1.18rem}.connected-series-media .case-frame{aspect-ratio:4/3}}`;
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

  $$('[data-lang-switch]').forEach((switcher) => {
    const toggle = $('[data-lang-toggle]', switcher);
    const menu = $('[data-lang-menu]', switcher);
    if (!toggle || !menu) return;
    const setOpen = (open) => {
      switcher.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    };
    setOpen(false);
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(menu.hidden);
    });
    $$('a', menu).forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target || !switcher.contains(target)) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
  });

  $$('[data-before-after-slider]').forEach((slider) => {
    const input = $('.before-after-range', slider);
    if (!input) return;
    const update = () => slider.style.setProperty('--split', input.value + '%');
    input.addEventListener('input', update);
    update();
  });

  let imageLightbox = null;
  let imageLightboxLastFocused = null;
  const ensureImageLightbox = () => {
    if (imageLightbox) return imageLightbox;
    const pageLang = document.documentElement.lang || 'de-CH';
    const closeLabel = pageLang.startsWith('uk') ? 'Закрити' : pageLang.startsWith('en') ? 'Close' : 'Schliessen';
    const modal = document.createElement('div');
    modal.className = 'image-lightbox';
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = '<button class="image-lightbox-backdrop" type="button" data-image-lightbox-close aria-label="' + closeLabel + '"></button><figure class="image-lightbox-panel"><button class="image-lightbox-close" type="button" data-image-lightbox-close aria-label="' + closeLabel + '">&times;</button><img alt="" loading="eager" decoding="async"><figcaption class="image-lightbox-caption"></figcaption></figure>';
    document.body.appendChild(modal);
    $$('[data-image-lightbox-close]', modal).forEach((button) => button.addEventListener('click', closeImageLightbox));
    imageLightbox = modal;
    return modal;
  };
  const openImageLightbox = ({ src, alt = '', caption = '', trigger = null }) => {
    if (!src) return;
    const modal = ensureImageLightbox();
    const img = $('img', modal);
    const captionEl = $('.image-lightbox-caption', modal);
    const resolvedSrc = new URL(src, document.baseURI).href;
    imageLightboxLastFocused = trigger instanceof HTMLElement ? trigger : document.activeElement;
    img.decoding = 'async';
    img.loading = 'eager';
    img.src = resolvedSrc;
    img.alt = alt || caption || '';
    captionEl.textContent = caption || alt || '';
    captionEl.hidden = !(caption || alt);
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('image-lightbox-open');
    $('[data-image-lightbox-close]', modal)?.focus();
  };
  function closeImageLightbox() {
    if (!imageLightbox || imageLightbox.hidden) return;
    const img = $('img', imageLightbox);
    imageLightbox.hidden = true;
    imageLightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('image-lightbox-open');
    if (img) img.removeAttribute('src');
    imageLightboxLastFocused?.focus?.();
    imageLightboxLastFocused = null;
  }
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const zoomButton = target.closest('[data-image-lightbox-src]');
    if (zoomButton) {
      event.preventDefault();
      event.stopPropagation();
      openImageLightbox({
        src: zoomButton.dataset.imageLightboxSrc,
        alt: zoomButton.dataset.imageLightboxAlt,
        caption: zoomButton.dataset.imageLightboxCaption,
        trigger: zoomButton
      });
      return;
    }
    const lightboxLink = target.closest('a[data-lightbox]');
    if (lightboxLink) {
      event.preventDefault();
      openImageLightbox({
        src: lightboxLink.href,
        alt: $('img', lightboxLink)?.getAttribute('alt') || '',
        caption: lightboxLink.getAttribute('aria-label') || $('img', lightboxLink)?.getAttribute('alt') || '',
        trigger: lightboxLink
      });
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !imageLightbox || imageLightbox.hidden) return;
    event.preventDefault();
    event.stopPropagation();
    closeImageLightbox();
  }, true);

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
    const loadCaseImages = (panel) => {
      $$('img', panel).forEach((img) => {
        img.loading = 'eager';
        img.decoding = 'async';
        const src = img.getAttribute('src');
        if (!src) return;
        if (!img.currentSrc) img.src = src;
        img.decode?.().catch(() => {});
        if (img.complete) return;
        const preload = new Image();
        preload.decoding = 'async';
        preload.src = new URL(src, document.baseURI).href;
      });
    };
    const openCase = (id) => {
      const activePanel = panels.find((panel) => panel.dataset.casePanel === id);
      if (!activePanel) return;
      lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      panels.forEach((panel) => { panel.hidden = panel !== activePanel; });
      caseModal.hidden = false;
      caseModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('case-modal-open');
      loadCaseImages(activePanel);
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
      if (event.key === 'Escape' && !caseModal.hidden && !document.body.classList.contains('image-lightbox-open')) closeCase();
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
| foto/01_hero/hero-courtyard-niwaki-desktop.webp | Supplied real photo from IMG_1619.JPG | Home hero mode 3 desktop source | PRESENT_REAL_PHOTO |
| foto/01_hero/hero-courtyard-niwaki-mobile.webp | Supplied real photo from IMG_1619.JPG | Home hero mode 3 mobile source | PRESENT_REAL_PHOTO |
| foto/01_hero/hero-sad-02.webp | Supplied real photo | Previous hero, retained as alternate | PRESENT_REAL_PHOTO |
| foto/01_hero/hero-sad-01.webp | Supplied real photo | Alternate hero/social preview | PRESENT_REAL_PHOTO |
| foto/02_pryklady-robit/*.webp | Supplied real photos | Before/after direction, timeline, gallery | PRESENT_REAL_PHOTO_SET |
| foto/02_pryklady-robit/case-parviflora-house-candle-*.webp | Supplied JPGs from Pinus_Parviflora/Neuer Ordner (12), cropped and converted to WebP | Active seasonal Pinus parviflora house-side candle-control before/after case | PRESENT_REAL_PHOTO_SET_VERIFIED_WITH_LIMITS |
| foto/02_pryklady-robit/case-parviflora-terrace-growth-*.webp | Supplied JPGs from Pinus_Parviflora/Neuer Ordner (11), converted to WebP | Active subtle seasonal Pinus parviflora terrace growth-control before/after case | PRESENT_REAL_PHOTO_SET_VERIFIED_WITH_LIMITS |
| foto/03_galereya/*.webp | Supplied real photos | Gallery grid | PRESENT_REAL_PHOTO_SET |
| foto/04_khvoyni/*.webp | Supplied real photos | Conifer service and articles | PRESENT_REAL_PHOTO_SET |
| foto/04_khvoyni/energie-krone-pinus-crown-01.webp | Supplied HEIC from IMG_1714.HEIC, converted to WebP | Crown-energy blog article in DE/EN/UK | PRESENT_REAL_PHOTO |
| foto/05_nivaki-khmarky/*.webp | Supplied real photos | Niwaki service and crown article | PRESENT_REAL_PHOTO_SET |
| foto/06_yaponski-kleny/klen-yaponskyi-01.webp | Supplied real photo, visual QA classified as pine/Niwaki, not Acer | Niwaki/cloud-form gallery | PRESENT_REAL_PHOTO_WITH_LIMITS |
| foto/06_yaponski-kleny/klen-yaponskyi-02.webp | Supplied real photo, visual QA classified as Japanese maple/Acer | Ahorn service and article imagery | PRESENT_REAL_PHOTO |
| foto/06_yaponski-kleny/laubgehoelz-formschnitt-*.webp | Supplied HEICs from IMG_1721/IMG_1722, converted to WebP | Gallery Acer & deciduous-tree pruning/forming work block | PRESENT_REAL_PHOTO_SET |
| foto/07_viktor/*.webp | Supplied real photos | Viktor/trust/topiary article | PRESENT_REAL_PHOTO_SET |
| foto/08_fonovi/*.webp | Supplied real photos | Garden context backgrounds | PRESENT_REAL_PHOTO_SET |
| foto/09_pomylky/*.webp | Supplied real photos | Pine candle/detail article | PRESENT_REAL_PHOTO_SET |
| foto/10_vidkrytka-yaponiya/kyoto-garden-2009.webp | Supplied real photo | Philosophie Kyoto 2009 carousel | PRESENT_REAL_PHOTO |
| foto/10_vidkrytka-yaponiya/kyoto-viktor-wife-2009.webp | Supplied real photo from 24062026/photo_2026-06-24_17-53-02.jpg | Philosophie Kyoto 2009 carousel | PRESENT_REAL_PHOTO |
| foto/10_vidkrytka-yaponiya/kyoto-zen-garden-wife-2009.webp | Supplied real photo from Portfolio/photo_76 | Philosophie Kyoto 2009 carousel | PRESENT_REAL_PHOTO |
| foto/10_vidkrytka-yaponiya/kyoto-golden-pavilion-pine-2009.webp | Supplied real photo from Portfolio/photo_77 | Philosophie Kyoto 2009 carousel | PRESENT_REAL_PHOTO |
| foto/10_vidkrytka-yaponiya/kyoto-sand-cone-garden-2009.webp | Supplied real photo from Portfolio/photo_75 | Philosophie Kyoto 2009 carousel | PRESENT_REAL_PHOTO |
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
    "/", "/leistungen", "/philosophie", "/galerie", "/preise", "/blog", "/blog/topiarschere", "/blog/energie-krone", "/blog/niwaki-bonsai-stile", "/blog/kiefer-kerzen", "/blog/klimastress", "/kontakt", "/impressum", "/datenschutz", "/themes",
    ...discoveryPaths,
    "/en/", "/en/leistungen", "/en/philosophie", "/en/galerie", "/en/preise", "/en/blog", "/en/blog/topiarschere", "/en/blog/energie-krone", "/en/blog/niwaki-bonsai-stile", "/en/blog/kiefer-kerzen", "/en/blog/klimastress", "/en/kontakt", "/en/impressum", "/en/datenschutz", "/en/themes",
    ...discoveryPaths.map((p) => `/en${p}`),
    "/uk/", "/uk/leistungen", "/uk/philosophie", "/uk/galerie", "/uk/preise", "/uk/blog", "/uk/blog/topiarschere", "/uk/blog/energie-krone", "/uk/blog/niwaki-bonsai-stile", "/uk/blog/kiefer-kerzen", "/uk/blog/klimastress", "/uk/kontakt", "/uk/impressum", "/uk/datenschutz", "/uk/themes"
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

Static multipage DE/EN/UK V1 site for Viktor Baumarchitektur. It is prepared for Cloudflare Pages Free at \`${domain}\`.

## Edit checklist

- Verify final WhatsApp/phone before publication: \`${phoneDisplay}\`.
- Replace GA4 \`G-XXXXXXX\`, Google Ads \`AW-XXXXXXX\` and Search Console verification.
- Visible header/footer wordmark is **Viktor Baumarchitektur**.
- Complete \`impressum.html\` and \`datenschutz.html\` with Viktor's legal data before publication.
- Swap real images using filenames in \`assets/img/MANIFEST.md\`.
- TODO: create a final matching logo lockup for **Viktor Baumarchitektur**. The current \`assets/img/logo.png\` still reads "Viktor Bonsai", so the site crops it to the tree symbol and renders the approved text wordmark beside it.
- Synthetic planning files are visual direction only and must not be presented as real client proof.

## Blog / knowledge section

The blog now has five DE articles plus EN/UK mirror pages:

- \`blog/topiarschere.html\` - tool choice and clean cuts.
- \`blog/energie-krone.html\` - crown energy, light and air.
- \`blog/niwaki-bonsai-stile.html\` - Niwaki, bonsai and cloud pruning style direction.
- \`blog/kiefer-kerzen.html\` - pine candles and timing.
- \`blog/klimastress.html\` - Swiss heat/drought context for premium gardens.

## AI / local discovery pages

The site includes focused DE/EN answer and service-area pages for retrieval search and local SEO:

${answerPages.map((page) => `- \`${page.slug}.html\` / \`en/${page.slug}.html\` - ${page.eyebrowDe}.`).join("\n")}
${geoPages.map((page) => `- \`${page.slug}.html\` / \`en/${page.slug}.html\` - ${page.h1De.replace(/\.$/, "")}.`).join("\n")}

External launch steps are tracked in \`handoff/ai-local-discovery-checklist.md\`: Cloudflare Pages custom domain, Search Console, Bing Webmaster Tools, Google Business Profile, Apple/Bing/local.ch citations and monthly AI monitoring.

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

- Cloudflare Pages Function secrets for V1 contact delivery: \`TELEGRAM_BOT_TOKEN\`, \`TELEGRAM_CHAT_ID\`.
- V2 voice/OpenAI lead flow is intentionally excluded from Cloudflare Pages V1 deployment. Do not configure \`OPENAI_API_KEY\` for this launch.
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
node tools/build-cloudflare-pages.mjs
node tools/qa-site-interactions.mjs
\`\`\`

\`kontakt.html\` posts callback requests to \`/api/contact\`, which validates the phone number, blocks honeypot spam and sends a Telegram summary with Cloudflare Pages Function env only. \`v2/\` and \`/api/voice-lead\` are not copied to \`dist\` and are not part of the Cloudflare Pages V1 launch.

Cloudflare Pages build command: \`node tools/generate-site.mjs && node tools/build-cloudflare-pages.mjs\`. Output directory: \`dist\`.
`;
}

function auditScript() {
  return `import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "index.html","leistungen.html","philosophie.html","galerie.html","preise.html",
  "blog/index.html","blog/topiarschere.html","blog/energie-krone.html","blog/niwaki-bonsai-stile.html","blog/kiefer-kerzen.html","blog/klimastress.html",
  ${JSON.stringify([
    ...answerPages.map((page) => `${page.slug}.html`),
    ...geoPages.map((page) => `${page.slug}.html`)
  ]).slice(1, -1)},
  "kontakt.html","impressum.html","datenschutz.html","themes.html",
  "en/index.html","en/leistungen.html","en/philosophie.html","en/galerie.html","en/preise.html",
  "en/blog/index.html","en/blog/topiarschere.html","en/blog/energie-krone.html","en/blog/niwaki-bonsai-stile.html","en/blog/kiefer-kerzen.html","en/blog/klimastress.html",
  ${JSON.stringify([
    ...answerPages.map((page) => `en/${page.slug}.html`),
    ...geoPages.map((page) => `en/${page.slug}.html`)
  ]).slice(1, -1)},
  "en/kontakt.html","en/impressum.html","en/datenschutz.html","en/themes.html",
  "uk/index.html","uk/leistungen.html","uk/philosophie.html","uk/galerie.html","uk/preise.html",
  "uk/blog/index.html","uk/blog/topiarschere.html","uk/blog/energie-krone.html","uk/blog/niwaki-bonsai-stile.html","uk/blog/kiefer-kerzen.html","uk/blog/klimastress.html",
  "uk/kontakt.html","uk/impressum.html","uk/datenschutz.html","uk/themes.html",
  "fr/index.html","it/index.html",
  "assets/base.css","assets/main.js","assets/theme-v1.css","assets/theme-v2.css","assets/theme-v3.css","assets/theme-v4.css","assets/theme-v5.css",
  "assets/img/logo.png","assets/img/foto/01_hero/hero-viktor-bonsai-main.webp","assets/img/foto/01_hero/hero-viktor-bonsai-mobile.webp","assets/img/foto/01_hero/hero-courtyard-niwaki-desktop.webp","assets/img/foto/01_hero/hero-courtyard-niwaki-mobile.webp","assets/img/foto/02_pryklady-robit/case-parviflora-before.webp","assets/img/foto/02_pryklady-robit/case-parviflora-after.webp","assets/img/foto/02_pryklady-robit/case-watereri-before.webp","assets/img/foto/02_pryklady-robit/case-watereri-after.webp","assets/img/foto/02_pryklady-robit/sosna-bila-17.webp","assets/img/foto/02_pryklady-robit/sosna-bila-18.webp","assets/img/foto/03_galereya/sosna-bila-01.webp","assets/img/foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp","assets/img/foto/05_nivaki-khmarky/sosna-watereri-do-pislya-08.webp","assets/img/foto/05_nivaki-khmarky/sosna-watereri-do-pislya-16.webp","assets/img/foto/06_yaponski-kleny/klen-yaponskyi-01.webp","assets/img/foto/07_viktor/viktor-01.webp","assets/img/foto/08_fonovi/fon-foto-01.webp","assets/img/foto/09_pomylky/pomylka-svichka-01.webp","assets/img/foto/10_vidkrytka-yaponiya/kyoto-viktor-wife-2009.webp","assets/img/foto/10_vidkrytka-yaponiya/vidkrytka-yaponiya-01.webp","assets/img/MANIFEST.md","site.webmanifest","robots.txt","sitemap.xml","llms.txt","vercel.json","README.md","handoff/ai-local-discovery-checklist.md",".env.example","api/contact.js","api/voice-lead.js","functions/api/contact.js","tools/build-cloudflare-pages.mjs"
];

const errors = [];
const discoveryHtmlFiles = new Set(${JSON.stringify([
  ...answerPages.map((page) => `${page.slug}.html`),
  ...geoPages.map((page) => `${page.slug}.html`),
  ...answerPages.map((page) => `en/${page.slug}.html`),
  ...geoPages.map((page) => `en/${page.slug}.html`)
])});
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push("Missing " + file);
}

const brandWordmark = "Viktor Garten";
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
  const seoNeedles = ["<title>", "name=\\"description\\"", "rel=\\"canonical\\"", "property=\\"og:title\\"", "hreflang=\\"de-CH\\"", "hreflang=\\"en\\""];
  if (!discoveryHtmlFiles.has(file)) seoNeedles.push("hreflang=\\"uk\\"");
  for (const needle of seoNeedles) {
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
    if (!html.includes("data-before-after-slider") || !html.includes("before-after-range")) errors.push(file + " missing homepage before/after slider control");
    const homeSlider = html.match(/<figure class=\\"before-after-slider\\"[\\s\\S]*?<\\/figure>/i)?.[0] || "";
    if (!homeSlider.includes("sosna-watereri-do-pislya-08.webp") || !homeSlider.includes("sosna-watereri-do-pislya-16.webp")) errors.push(file + " missing deployed homepage slider pair sosna-watereri-do-pislya-08/16");
    if (!homeSlider.includes("--split:40%") || !homeSlider.includes('value=\\"40\\"')) errors.push(file + " homepage slider split is not the deployed 40% setting");
    for (const badSliderFile of ["case-parviflora-before.webp", "case-parviflora-after.webp", "sosna-bila-17.webp", "sosna-bila-18.webp"]) {
      if (homeSlider.includes(badSliderFile)) errors.push(file + " homepage slider still uses non-etalon file: " + badSliderFile);
    }
    if (html.includes("honest-before-after")) errors.push(file + " still uses static side-by-side before/after layout");
    if (html.includes("case-taxus-after.webp")) errors.push(file + " still uses ladder Taxus photo as a homepage after image");
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
    const resolved = clean.startsWith("/")
      ? path.normalize(path.join(root, clean.slice(1)))
      : path.normalize(path.join(path.dirname(full), clean));
    if (!fs.existsSync(resolved)) errors.push(file + " broken link -> " + href);
  }
}

const mainJs = fs.readFileSync(path.join(root, "assets/main.js"), "utf8");
for (const eventName of ["cta_whatsapp_click","cta_call_click","cta_rueckruf_submit","contact_form_submit"]) {
  const siteHas = htmlFiles.some((file) => fs.readFileSync(path.join(root, file), "utf8").includes(eventName)) || mainJs.includes(eventName);
  if (!siteHas) errors.push("Missing event " + eventName);
}

const baseCss = fs.readFileSync(path.join(root, "assets/base.css"), "utf8");
if (baseCss.includes(".brand-symbol")) errors.push("Unused .brand-symbol CSS is still present");

const robots = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
for (const agent of ${JSON.stringify(aiCrawlerAgents)}) {
  if (!robots.includes("User-agent: " + agent) || !robots.includes("Sitemap: ${domain}/sitemap.xml")) {
    errors.push("robots.txt missing explicit crawler policy or sitemap for " + agent);
  }
}

const sitemapXml = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
for (const urlPath of ${JSON.stringify([
  ...discoveryPaths,
  ...discoveryPaths.map((p) => `/en${p}`)
])}) {
  if (!sitemapXml.includes("${domain}" + urlPath)) {
    errors.push("sitemap.xml missing discovery URL " + urlPath);
  }
}

const llmsTxt = fs.readFileSync(path.join(root, "llms.txt"), "utf8");
for (const marker of ["Positioning:", "Not a general cheap gardening service.", "Not emergency tree removal", "Answer pages:", "Service-area pages:"]) {
  if (!llmsTxt.includes(marker)) errors.push("llms.txt missing AI/local marker: " + marker);
}

const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (!indexHtml.includes('"@graph"')) errors.push("index.html missing JSON-LD @graph entity schema");
if (indexHtml.includes("aggregateRating")) errors.push("index.html must not contain placeholder aggregateRating");

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
    const resolved = clean.startsWith("/")
      ? path.normalize(path.join(root, clean.slice(1)))
      : path.normalize(path.join(path.dirname(full), clean));
    if (!fs.existsSync(resolved)) errors.push(file + " broken preview ref -> " + ref);
  }
}

const manifest = fs.readFileSync(path.join(root, "assets/img/MANIFEST.md"), "utf8");
for (const file of ["foto/01_hero/hero-viktor-bonsai-main.webp","foto/01_hero/hero-viktor-bonsai-mobile.webp","foto/01_hero/hero-courtyard-niwaki-desktop.webp","foto/01_hero/hero-courtyard-niwaki-mobile.webp","foto/02_pryklady-robit/*.webp","foto/03_galereya/*.webp","foto/05_nivaki-khmarky/*.webp","foto/06_yaponski-kleny/klen-yaponskyi-01.webp","foto/06_yaponski-kleny/klen-yaponskyi-02.webp","foto/06_yaponski-kleny/laubgehoelz-formschnitt-*.webp","foto/07_viktor/*.webp","foto/08_fonovi/*.webp","foto/09_pomylky/*.webp","foto/10_vidkrytka-yaponiya/kyoto-garden-2009.webp","foto/10_vidkrytka-yaponiya/kyoto-viktor-wife-2009.webp","foto/10_vidkrytka-yaponiya/kyoto-zen-garden-wife-2009.webp","foto/10_vidkrytka-yaponiya/kyoto-golden-pavilion-pine-2009.webp","foto/10_vidkrytka-yaponiya/kyoto-sand-cone-garden-2009.webp","foto/10_vidkrytka-yaponiya/vidkrytka-yaponiya-01.webp","baumarchitektur-korrektur.png","baumarchitektur-live-crown-ratio.png"]) {
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

function homepageRescueSliderCss() {
  return `.before-after-slider{max-width:min(1040px,100%)}.before-after-stage .after-img{object-position:center center}.before-after-range{touch-action:pan-y}@media (max-width:620px){.before-after-stage{aspect-ratio:3 / 4}.before-after-range{height:34px}}`;
}

function pricePageCss() {
  return `.price-page .price-grid{max-width:none;margin:0;padding:clamp(42px,7vw,82px) max(18px,calc((100vw - var(--maxw))/2));background:linear-gradient(135deg,#16301f,#22452f);color:#f4f1e8;border-top:1px solid rgba(244,241,232,.14);border-bottom:1px solid rgba(244,241,232,.14)}.price-page .price-grid .card{background:rgba(244,241,232,.045);border:1px solid rgba(244,241,232,.22);box-shadow:0 18px 54px rgba(0,0,0,.18);color:#f4f1e8;border-radius:8px}.price-page .price-grid .eyebrow{color:#c9a24b}.price-page .price-grid .eyebrow:before{background:#c9a24b}.price-page .price-grid h2{color:#c9a24b;font-size:clamp(2rem,3.4vw,2.85rem)}.price-page .price-grid p{color:rgba(244,241,232,.78);font-weight:650}.price-page .page-hero .price-grid{margin-top:28px;border-radius:0}.price-page .page-hero .price-grid .card{box-shadow:none}@media (max-width:620px){.price-page .price-grid{padding:36px 16px}.price-page .price-grid h2{font-size:2rem}}`;
}

function mobileCookieBannerCss() {
  return `@media (max-width:620px){.cookie-banner{padding:14px}.cookie-banner p{font-size:.94rem;line-height:1.45}.cookie-banner div{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.cookie-banner .btn{width:100%;min-height:46px;padding:9px 10px;white-space:normal}}@media (max-width:340px){.cookie-banner div{grid-template-columns:1fr}}`;
}

function inspirationBooksCss() {
  return `.inspiration-books{position:relative}.book-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:22px}.book-card{min-width:0;display:flex;flex-direction:column;gap:11px;min-height:100%;border:1px solid var(--line);border-radius:8px;background:linear-gradient(180deg,color-mix(in srgb,var(--surface) 96%,#f0e5c3),var(--surface));box-shadow:var(--shadow);padding:16px;overflow:hidden}.book-cover{width:100%;aspect-ratio:1/1;height:auto;object-fit:cover;object-position:center;border:1px solid color-mix(in srgb,var(--primary) 14%,var(--line));border-radius:8px;background:var(--surface);box-shadow:0 14px 30px rgba(0,0,0,.10)}.book-index{display:inline-flex;align-self:flex-start;color:var(--primary);font-size:.76rem;line-height:1;text-transform:uppercase;font-weight:900;letter-spacing:0;border-bottom:2px solid var(--accent);padding-bottom:4px}.book-card h3{font-size:clamp(1.22rem,1.8vw,1.55rem);line-height:1.05;margin:0;color:var(--text)}.book-card p{margin:0;color:var(--muted);font-weight:650;line-height:1.58}.book-meta{margin-top:auto;color:color-mix(in srgb,var(--primary) 82%,var(--muted));font-size:.88rem;font-weight:850;line-height:1.45}.book-link{display:inline-flex;align-self:flex-start;align-items:center;min-height:42px;margin-top:2px;border:1px solid color-mix(in srgb,var(--primary) 24%,var(--line));border-radius:999px;background:var(--surface);color:var(--primary);padding:9px 13px;font-weight:900;text-decoration:none}.book-link:hover{border-color:var(--accent);color:var(--accent);text-decoration-color:var(--accent)}.book-note{max-width:760px;margin:18px 0 0;color:var(--muted);font-weight:720}@media (max-width:960px){.book-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width:620px){.book-grid{grid-template-columns:1fr;gap:14px}.book-card{padding:14px}.book-card h3{font-size:1.3rem}.book-card p{font-size:.98rem}.book-link{width:100%;justify-content:center}}`;
}

function publicCss() {
  return `${cssBase().replace(/\.brand-symbol\{[^}]+\}/, "")}
${cssResponsiveFixes()}
${headerCompactCss()}
${plantNameCss()}
${languagePlaceholderCss()}
${speedQualityCss()}
.hero-panel,.hero-services{position:relative;z-index:2}
.quiet-moments,.check-strip{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.quiet-moments span,.check-strip span{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;background:var(--surface);padding:8px 11px;color:var(--muted);font-size:.88rem;font-weight:800}.signature-block .check-strip span{background:color-mix(in srgb,var(--primary-ink) 14%,transparent);border-color:color-mix(in srgb,var(--primary-ink) 24%,transparent);color:var(--primary-ink)}
.discovery-hub{background:color-mix(in srgb,var(--surface) 76%,var(--bg));border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.link-cloud{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}.link-cloud a{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;background:var(--surface);padding:9px 12px;color:var(--primary);font-weight:850;text-decoration:none}.link-cloud a:hover{border-color:var(--accent);color:var(--accent)}.check-list{display:grid;gap:10px;margin:18px 0;padding:0;list-style:none}.check-list li{position:relative;padding-left:28px;color:var(--muted);font-weight:720}.check-list li:before{content:"";position:absolute;left:0;top:.28em;width:15px;height:15px;border-radius:999px;background:var(--accent);box-shadow:inset 0 0 0 4px color-mix(in srgb,var(--surface) 82%,transparent)}
.hp-field{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important}
.image-carousel{--carousel-index:0;position:relative;aspect-ratio:4/3;overflow:hidden;margin:0;border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);box-shadow:var(--shadow);touch-action:pan-y}.image-carousel-track{display:flex;height:100%;transform:translateX(calc(var(--carousel-index)*-100%));transition:transform .52s cubic-bezier(.2,.7,.2,1);will-change:transform}.image-carousel-slide{flex:0 0 100%;width:100%;height:100%;object-fit:cover;background:var(--surface)}.image-carousel-btn{position:absolute;top:50%;z-index:2;display:grid;place-items:center;width:44px;height:44px;border:1px solid color-mix(in srgb,var(--primary) 22%,transparent);border-radius:999px;background:color-mix(in srgb,var(--surface) 88%,transparent);color:var(--primary);box-shadow:0 10px 28px rgba(0,0,0,.18);font:800 1.8rem/1 var(--font-body);cursor:pointer;transform:translateY(-50%);backdrop-filter:blur(10px)}.image-carousel-prev{left:14px}.image-carousel-next{right:14px}.image-carousel-dots{position:absolute;left:0;right:0;bottom:13px;z-index:2;display:flex;justify-content:center;gap:8px}.image-carousel-dot{width:9px;height:9px;border:1px solid color-mix(in srgb,var(--primary) 55%,transparent);border-radius:999px;background:color-mix(in srgb,var(--surface) 70%,transparent);padding:0;cursor:pointer}.image-carousel-dot.is-active{width:28px;background:var(--primary)}@media (max-width:620px){.image-carousel{border-radius:12px}.image-carousel-btn{width:40px;height:40px;font-size:1.55rem}.image-carousel-prev{left:10px}.image-carousel-next{right:10px}.image-carousel-dots{bottom:10px}}
.taxus-mistake-grid{grid-template-columns:repeat(2,minmax(0,1fr))}@media (max-width:620px){.taxus-mistake-grid{grid-template-columns:1fr}}
.parviflora-candle-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:0 0 18px}.parviflora-candle-grid .image-slot{margin:0}.parviflora-candle-grid .image-slot>img{object-position:center center}@media (max-width:1100px){.parviflora-candle-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width:620px){.parviflora-candle-grid{grid-template-columns:1fr}}
.watereri-two-trees-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:18px;align-items:start;margin:0 0 18px}.watereri-tree-card{min-width:0;border:1px solid var(--line);border-radius:8px;background:var(--surface);box-shadow:var(--shadow);padding:16px}.watereri-tree-card h3{margin-top:0;font-size:1.45rem}.watereri-tree-card p{color:var(--muted);margin-bottom:0}.watereri-tree-media{display:grid;gap:10px;margin-top:14px}.watereri-tree-media-detail{grid-template-columns:repeat(2,minmax(0,1fr))}.watereri-tree-media-wide{grid-template-columns:1fr}.watereri-tree-media .image-slot{margin:0}.watereri-tree-media .image-slot>img{object-position:center center}@media (max-width:900px){.watereri-two-trees-grid{grid-template-columns:1fr}}@media (max-width:620px){.watereri-tree-media-detail{grid-template-columns:1fr}.watereri-tree-card{padding:14px}}
.pinus-nigra-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:0 0 18px}.pinus-nigra-grid .image-slot{margin:0}.pinus-nigra-grid .image-slot>img{object-position:center center}.gallery-readmore{max-width:860px;margin-top:18px;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:var(--shadow);overflow:hidden}.gallery-readmore summary{display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;color:var(--primary);font-weight:850;padding:14px 16px;list-style:none}.gallery-readmore summary::-webkit-details-marker{display:none}.gallery-readmore summary:after{content:"+";font-size:1.25rem;line-height:1}.gallery-readmore[open] summary{border-bottom:1px solid var(--line)}.gallery-readmore[open] summary:after{content:"-"}.gallery-readmore-body{padding:16px 16px 2px;color:var(--muted)}.gallery-readmore-body p{max-width:760px}@media (max-width:620px){.pinus-nigra-grid{grid-template-columns:1fr}}
.wintergold-grid{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1fr);gap:16px;margin:0 0 18px;align-items:start}.wintergold-grid .image-slot{margin:0}.wintergold-grid .wintergold-portrait{grid-row:span 2}.wintergold-grid .image-slot>img{object-position:center center}@media (max-width:760px){.wintergold-grid{grid-template-columns:1fr}.wintergold-grid .wintergold-portrait{grid-row:auto}}
.pumilio-feature-layout{display:grid;grid-template-columns:minmax(260px,.72fr) minmax(0,1fr);gap:24px;align-items:start}.pumilio-feature-layout .image-slot{margin:0}.pumilio-feature-layout .image-slot>img{object-position:center center}.pumilio-feature-copy>p{max-width:760px;color:var(--muted);margin-top:0}.pumilio-feature-copy .gallery-readmore{margin-top:16px}@media (max-width:820px){.pumilio-feature-layout{grid-template-columns:1fr}}
.pinus-thunbergii-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:0 0 18px}.pinus-thunbergii-grid .image-slot{margin:0}.pinus-thunbergii-grid .image-slot>img{object-position:center center}@media (max-width:820px){.pinus-thunbergii-grid{grid-template-columns:1fr}}
${contactPersonCss()}
${galleryCaseCss()}
${imageLightboxCss()}
${galleryDiagnosticCss()}
${connectedSeriesCss()}
.case-copy{min-width:0}.case-copy strong,.case-copy span{min-width:0;overflow-wrap:anywhere}
.cookie-banner[hidden],.toast[hidden]{display:none!important}.cookie-banner{max-height:calc(100svh - 32px);overflow:auto;pointer-events:auto}.mobile-cta{padding-bottom:env(safe-area-inset-bottom)}
@media (max-width:920px){body{padding-bottom:calc(58px + env(safe-area-inset-bottom))}.cookie-banner{bottom:calc(74px + env(safe-area-inset-bottom))}.toast{bottom:calc(74px + env(safe-area-inset-bottom));left:16px;right:16px}}
${mobileCookieBannerCss()}
${cssWowPass().replace(".before-after-slider body." + "presentation-clean @media", "@media")}
${homepageRescueSliderCss()}
${pricePageCss()}
${heroCopyResponsiveFixCss()}
${heroThreeModeCss()}
${heroThreeModeTypographyCss()}
${heroThreeModePolishCss()}
${heroFourModeCss()}
${heroFourFixedLayoutCss()}
${inspirationBooksCss()}
${experienceAccentCss()}
${meisterCarouselResponsiveCss()}`;
}

writeFile("assets/base.css", publicCss());
for (const n of [1, 2, 3, 4, 5]) writeFile(`assets/theme-v${n}.css`, themeCss(n));
writeFile("assets/main.js", jsMain());
writeFile("assets/img/MANIFEST.md", manifestV2());
writeFile("assets/icons/leaf.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true"><path fill="#24452F" d="M52 8C31 9 12 21 12 42c0 8 6 14 14 14 21 0 32-26 26-48Zm-34 38c9-14 18-22 30-31-8 11-16 21-30 31Z"/></svg>`);
writeFile("handoff/fr-it-localization-reminder.md", frItLocalizationReminder());
writeFile("handoff/ai-local-discovery-checklist.md", aiLocalDiscoveryChecklist());

const answerPageEntries = answerPages.flatMap((page) => [
  [
    `${page.slug}.html`,
    "de",
    page.titleDe,
    page.descDe,
    answerPage(page, "de"),
    [localBusinessLd(), serviceLd(page.eyebrowDe, page.descDe), faqPageLd(page.faqDe)]
  ],
  [
    `en/${page.slug}.html`,
    "en",
    page.titleEn,
    page.descEn,
    answerPage(page, "en"),
    [localBusinessLd(), serviceLd(page.eyebrowEn, page.descEn), faqPageLd(page.faqEn)]
  ]
]);

const geoPageEntries = geoPages.flatMap((page) => [
  [
    `${page.slug}.html`,
    "de",
    page.titleDe,
    page.descDe,
    geoPage(page, "de"),
    [localBusinessLd(), serviceLd(page.h1De.replace(/\.$/, ""), page.descDe)]
  ],
  [
    `en/${page.slug}.html`,
    "en",
    page.titleEn,
    page.descEn,
    geoPage(page, "en"),
    [localBusinessLd(), serviceLd(page.h1En.replace(/\.$/, ""), page.descEn)]
  ]
]);

const pages = [
  ["index.html", "de", "Gartenbonsais, Formgehölze & japanische Baumkunst Schweiz", "Meister für Gartenbonsais, Niwaki, Gartengestaltung und Formgehölze in der Schweiz. 27 Jahre Erfahrung, kostenlose Foto-Diagnose.", homeDe(), [localBusinessLd(), personLd(), faqLd()]],
  ["leistungen.html", "de", "Niwaki, japanischer Ahorn & Kiefer-Formschnitt", "Leistungen für Niwaki Schnitt, Acer palmatum Pflege und Formschnitt von Nadelgehölzen in der Schweiz.", servicesDe(), [localBusinessLd(), serviceLd("Niwaki, Ahorn und Kiefer-Formschnitt", "Japanische Baumpflege, Niwaki Schnitt und Formschnitt für Nadelgehölze.")]],
  ["philosophie.html", "de", "Philosophie & Meister - japanische Gartenkunst", "Mein Weg vom einfachen Schnitt zur japanischen Baumkunst: Kyoto 2009, Respekt vor dem Baum und Arbeit nach Naturgesetzen.", philosophyDe(), [localBusinessLd(), personLd()]],
  ["galerie.html", "de", "Vorher / Nachher - Garten-Bonsai & Niwaki", "Reale Vorher-/Nachher-Fotos, Gartenbonsai, Niwaki-Beispiele und Arbeitsphasen aus meiner Arbeit.", galleryDe(), [localBusinessLd()]],
  ["preise.html", "de", "Japanische Baumpflege - Preise & Kosten", "Preise für japanische Baumpflege: Arbeit ab 110 CHF pro Stunde, Anfahrt ab 90 CHF, Foto-Diagnose kostenlos.", pricesDe(), [localBusinessLd(), faqLd()]],
  ["blog/index.html", "de", "Niwaki Wissen - Stil, Topiarschere, Kiefer & Diagnose", "Meine fachlichen Artikel zu Niwaki-Stilen, Topiarschere, Krone, Kiefer-Kerzen, alten Nadeln, Moos, Akadama, Wurzeln und Klimastress.", blogIndexDeV2(), [localBusinessLd()]],
  ["blog/topiarschere.html", "de", "Topiarschere vs. Heckenschere - sauberer Schnitt", "Warum ich beim Formschnitt mit der Topiarschere arbeite: sauberer Schnitt, weniger Energieverlust, japanisches Werkzeug.", articleTopiaryDeV2(), [localBusinessLd()]],
  ["blog/energie-krone.html", "de", "Krone öffnen - Energie, Licht und Luft im Niwaki", "Warum ich die Krone öffne: Energieverteilung, Licht, Luft und langfristige Form statt schneller Heckenlogik.", articleCrownDeV2(), [localBusinessLd()]],
  ["blog/niwaki-bonsai-stile.html", "de", "Künstlerische Baumformung - Prinzipien & Methoden", "Wie aus einem gewöhnlichen Gartenbaum durch Lesen, Entlasten und Führen eine besondere Form entsteht.", articleStylesDeV2(), [localBusinessLd()]],
  ["blog/kiefer-kerzen.html", "de", "Kiefer-Kerzen schneiden - Fehler bei Pinus thunbergii", "Kiefer-Kerzen, Pinus-Formschnitt und warum verholzte Jahrestriebe nicht blind mittig geschnitten werden dürfen.", articleCandlesDeV2(), [localBusinessLd()]],
  ["blog/klimastress.html", "de", "Klimastress im Schweizer Premium-Garten", "Warum Hitze, trockene Sommer und Starkregen wertvolle Gartenbäume belasten und frühe Foto-Diagnose hilft.", articleClimateDeV2(), [localBusinessLd()]],
  ...answerPageEntries.filter(([file]) => !file.startsWith("en/")),
  ...geoPageEntries.filter(([file]) => !file.startsWith("en/")),
  ["kontakt.html", "de", "Kontakt & kostenlose Foto-Diagnose - Baumpflege", "Senden Sie mir Fotos, erhalten Sie eine kostenlose Diagnose und fordern Sie einen Rückruf an.", contactDe(), [localBusinessLd()]],
  ["impressum.html", "de", "Impressum - Viktor Baumarchitektur", "Platzhalter-Impressum für Viktor Baumarchitektur. Vor Veröffentlichung rechtlich ergänzen.", legalDe("impressum"), []],
  ["datenschutz.html", "de", "Datenschutz - Viktor Baumarchitektur", "Platzhalter-Datenschutzerklärung mit Consent Mode Hinweis. Vor Veröffentlichung rechtlich prüfen.", legalDe("datenschutz"), []],
  ["themes.html", "de", "Theme Preview - Viktor Baumarchitektur", "Interne Vorschau für Design Themes V1 bis V5.", themesPage(), []],
  ["en/index.html", "en", "Niwaki & Japanese Tree Art - Viktor Baumarchitektur", "Japanese tree care, niwaki and garden bonsai in the Zurich region. Free photo diagnosis.", homeEn(), [localBusinessLd(), personLd(), faqLd()]],
  ["en/leistungen.html", "en", "Services - Niwaki, Maples & Conifers", "English service page for niwaki, Japanese maple and conifer shaping services.", servicesEn(), [localBusinessLd(), serviceLd("Niwaki, maples and conifers", "Japanese tree care and shaping.")]],
  ["en/philosophie.html", "en", "Philosophy & Master - Japanese Garden Art", "My path from simple cutting to Japanese tree art: Kyoto 2009, respect for the tree and work with nature's laws.", philosophyEn(), [localBusinessLd(), personLd()]],
  ["en/galerie.html", "en", "Before / After - Garden Bonsai & Niwaki", "Real before/after photos, niwaki examples, garden bonsai and work stages from my work.", galleryEn(), [localBusinessLd()]],
  ["en/preise.html", "en", "Japanese Tree Care - Prices & Costs", "Prices: work from 110 CHF per hour, travel from 90 CHF, free photo diagnosis.", genericEnPage("prices"), [localBusinessLd(), faqLd()]],
  ["en/blog/index.html", "en", "Niwaki Knowledge - Styles, Tools, Pines & Diagnosis", "English mirror articles about niwaki styles, topiary scissors, crown energy, pine candles, old needles, moss, roots and climate stress.", blogIndexEnV2(), [localBusinessLd()]],
  ["en/blog/topiarschere.html", "en", "Topiary Scissors vs Hedge Trimmer", "Why I cut with topiary scissors for cleaner tree shaping.", articleEnV2("topiary"), [localBusinessLd()]],
  ["en/blog/energie-krone.html", "en", "Opening the Crown - Energy, Light and Air", "Why I open a niwaki crown for light, air and long-term form.", articleEnV2("crown"), [localBusinessLd()]],
  ["en/blog/niwaki-bonsai-stile.html", "en", "Artistic Tree Shaping - Principles & Methods", "How an ordinary garden tree becomes a remarkable form through reading, opening and guiding.", articleEnV2("styles"), [localBusinessLd()]],
  ["en/blog/kiefer-kerzen.html", "en", "Pine Candles - Timing and Pinus thunbergii Mistakes", "Pine candles, timing and why hardened yearly extensions should not be cut blindly in the middle.", articleEnV2("candles"), [localBusinessLd()]],
  ["en/blog/klimastress.html", "en", "Climate Stress in Swiss Premium Gardens", "Why Swiss climate stress makes early tree diagnosis more valuable.", articleEnV2("climate"), [localBusinessLd()]],
  ...answerPageEntries.filter(([file]) => file.startsWith("en/")),
  ...geoPageEntries.filter(([file]) => file.startsWith("en/")),
  ["en/kontakt.html", "en", "Contact & Free Photo Diagnosis", "Send photos of your tree and request a free first assessment.", contactEn(), [localBusinessLd()]],
  ["en/impressum.html", "en", "Legal Notice - Viktor Baumarchitektur", "Placeholder legal notice. Complete before publication.", legalDe("impressum").replaceAll("Impressum", "Legal Notice").replaceAll("Datenschutzerklärung", "Privacy Policy"), []],
  ["en/datenschutz.html", "en", "Privacy Policy - Viktor Baumarchitektur", "Placeholder privacy policy. Complete before publication.", legalDe("datenschutz").replaceAll("Datenschutzerklärung", "Privacy Policy"), []]
  ,["en/themes.html", "en", "Theme Preview - Viktor Baumarchitektur", "Internal preview for design themes V1 to V5.", themesPage(), []],
  ["fr/index.html", "fr", "Version française en préparation - Viktor Baumarchitektur", "Maquette noindex pour une future version française de Viktor Baumarchitektur. La traduction complète sera préparée plus tard.", frItPlaceholderPage("fr"), [localBusinessLd()]],
  ["it/index.html", "it", "Versione italiana in preparazione - Viktor Baumarchitektur", "Maquette noindex per una futura versione italiana di Viktor Baumarchitektur. La traduzione completa sarà preparata più tardi.", frItPlaceholderPage("it"), [localBusinessLd()]],
  ["uk/index.html", "uk", "Viktor Baumarchitektur - український перегляд", "Тимчасове українське дзеркало сайту Viktor Baumarchitektur для внутрішнього перегляду.", homeDe(), [localBusinessLd(), personLd(), faqLd()]],
  ["uk/leistungen.html", "uk", "Послуги - Niwaki, японські клени та хвойні", "Тимчасове українське дзеркало сторінки послуг Viktor Baumarchitektur.", servicesDe(), [localBusinessLd(), serviceLd("Niwaki, Ahorn und Kiefer-Formschnitt", "Japanische Baumpflege, Niwaki Schnitt und Formschnitt für Nadelgehölze.")]],
  ["uk/philosophie.html", "uk", "Філософія та майстерність - Viktor Baumarchitektur", "Українська сторінка про мою філософію, досвід і підхід до японської деревної архітектури.", philosophyUk(), [localBusinessLd(), personLd()]],
  ["uk/galerie.html", "uk", "Галерея - до і після, Garten-Bonsai та Niwaki", "Українська галерея Viktor Baumarchitektur: реальні фото до і після, Niwaki, садовий бонсай і етапи роботи.", galleryUk(), [localBusinessLd()]],
  ["uk/preise.html", "uk", "Ціни - японський догляд за деревами", "Тимчасове українське дзеркало сторінки цін Viktor Baumarchitektur.", pricesDe(), [localBusinessLd(), faqLd()]],
  ["uk/blog/index.html", "uk", "Знання Niwaki - стилі, інструменти, сосна і діагностика", "Тимчасове українське дзеркало блогу Viktor Baumarchitektur.", blogIndexDeV2(), [localBusinessLd()]],
  ["uk/blog/topiarschere.html", "uk", "Topiarschere vs. Heckenschere - чистий зріз", "Тимчасове українське дзеркало статті про інструмент і чистий зріз.", articleTopiaryDeV2(), [localBusinessLd()]],
  ["uk/blog/energie-krone.html", "uk", "Відкрити крону - енергія, світло і повітря", "Тимчасове українське дзеркало статті про енергію крони.", articleCrownDeV2(), [localBusinessLd()]],
  ["uk/blog/niwaki-bonsai-stile.html", "uk", "Художнє формування дерев - принципи і методи", "Тимчасове українське дзеркало статті про художнє формування дерев.", articleStylesDeV2(), [localBusinessLd()]],
  ["uk/blog/kiefer-kerzen.html", "uk", "Свічки сосни - помилка у Pinus thunbergii", "Тимчасове українське дзеркало статті про свічки сосни і помилки зі зрізом задерев'янілого приросту.", articleCandlesDeV2(), [localBusinessLd()]],
  ["uk/blog/klimastress.html", "uk", "Кліматичний стрес у преміум-саді Швейцарії", "Тимчасове українське дзеркало статті про кліматичний стрес.", articleClimateDeV2(), [localBusinessLd()]],
  ["uk/kontakt.html", "uk", "Контакт і безкоштовна фото-діагностика", "Тимчасове українське дзеркало контактної сторінки Viktor Baumarchitektur.", contactDe(), [localBusinessLd()]],
  ["uk/impressum.html", "uk", "Impressum - Viktor Baumarchitektur", "Тимчасове українське дзеркало legal notice. Перед публікацією перевірити юридично.", legalDe("impressum"), []],
  ["uk/datenschutz.html", "uk", "Datenschutz - Viktor Baumarchitektur", "Тимчасове українське дзеркало privacy policy. Перед публікацією перевірити юридично.", legalDe("datenschutz"), []],
  ["uk/themes.html", "uk", "Theme Preview - Viktor Baumarchitektur", "Внутрішній preview дизайн-тем V1-V5.", themesPage(), []]
];

const ukPageOverrides = new Map([
  ["uk/index.html", ["uk/index.html", "uk", "Viktor Baumarchitektur - український перегляд", "Українська версія сайту Viktor Baumarchitektur: Niwaki, японські клени, хвойні дерева і безкоштовна фото-діагностика.", homeUk(), [localBusinessLd(), personLd(), faqLd()]]],
  ["uk/leistungen.html", ["uk/leistungen.html", "uk", "Послуги - Niwaki, японські клени та хвойні", "Українська сторінка послуг Viktor Baumarchitektur: Niwaki, японські клени, сосни та хвойні дерева.", servicesUk(), [localBusinessLd(), serviceLd("Niwaki, Ahorn und Kiefer-Formschnitt", "Japanische Baumpflege, Niwaki Schnitt und Formschnitt für Nadelgehölze.")]]],
  ["uk/philosophie.html", ["uk/philosophie.html", "uk", "Філософія та майстерність - Viktor Baumarchitektur", "Українська сторінка про мою філософію, досвід і підхід до японської деревної архітектури.", philosophyUk(), [localBusinessLd(), personLd()]]],
  ["uk/galerie.html", ["uk/galerie.html", "uk", "Галерея - до і після, Garten-Bonsai та Niwaki", "Українська галерея Viktor Baumarchitektur: реальні фото до і після, Niwaki, садовий бонсай і етапи роботи.", galleryUk(), [localBusinessLd()]]],
  ["uk/preise.html", ["uk/preise.html", "uk", "Ціни - японський догляд за деревами", "Українська сторінка цін Viktor Baumarchitektur: робота від 110 CHF/год, виїзд від 90 CHF, фото-діагностика безкоштовна.", pricesUk(), [localBusinessLd(), faqLd()]]],
  ["uk/blog/index.html", ["uk/blog/index.html", "uk", "Знання Niwaki - стилі, інструменти, сосна і діагностика", "Українські матеріали про Niwaki, стилі, японські ножиці, енергію крони, сосни і кліматичний стрес.", blogIndexUk(), [localBusinessLd()]]],
  ["uk/blog/topiarschere.html", ["uk/blog/topiarschere.html", "uk", "Японські ножиці проти тримера - чистий зріз", "Українська стаття про чистий зріз, японські ножиці і контроль майбутньої форми дерева.", articleUk("topiary"), [localBusinessLd()]]],
  ["uk/blog/energie-krone.html", ["uk/blog/energie-krone.html", "uk", "Відкрити крону - енергія, світло і повітря", "Українська стаття про те, чому крону Niwaki треба відкривати для світла, повітря і довгої форми.", articleUk("crown"), [localBusinessLd()]]],
  ["uk/blog/niwaki-bonsai-stile.html", ["uk/blog/niwaki-bonsai-stile.html", "uk", "Художнє формування дерев - принципи і методи", "Українська стаття про те, як зі звичайного дерева через читання структури, світло і вибірковий зріз зробити виразну садову форму.", articleUk("styles"), [localBusinessLd()]]],
  ["uk/blog/kiefer-kerzen.html", ["uk/blog/kiefer-kerzen.html", "uk", "Свічки сосни - помилка у Pinus thunbergii", "Українська стаття про свічки сосни, правильний момент і помилку зі зрізом задерев'янілого приросту.", articleUk("candles"), [localBusinessLd()]]],
  ["uk/blog/klimastress.html", ["uk/blog/klimastress.html", "uk", "Кліматичний стрес у преміум-саді Швейцарії", "Українська стаття про спеку, сухі літа, сильні дощі і ранню фото-діагностику цінних садових дерев.", articleUk("climate"), [localBusinessLd()]]],
  ["uk/kontakt.html", ["uk/kontakt.html", "uk", "Контакт і безкоштовна фото-діагностика", "Українська контактна сторінка Viktor Baumarchitektur: надішліть фото дерева у WhatsApp або запросіть дзвінок.", contactUk(), [localBusinessLd()]]],
  ["uk/impressum.html", ["uk/impressum.html", "uk", "Юридична інформація - Viktor Baumarchitektur", "Українська чернетка юридичної сторінки. Перед публікацією потрібна юридична перевірка.", legalUk("impressum"), []]],
  ["uk/datenschutz.html", ["uk/datenschutz.html", "uk", "Політика приватності - Viktor Baumarchitektur", "Українська чернетка політики приватності. Перед публікацією потрібна юридична перевірка.", legalUk("datenschutz"), []]],
  ["uk/themes.html", ["uk/themes.html", "uk", "Theme Preview - Viktor Baumarchitektur", "Український внутрішній preview дизайн-тем V1-V5.", themesPageUk(), []]]
]);

const finalPages = pages.map((page) => ukPageOverrides.get(page[0]) || page);

for (const [file, lang, title, description, body, jsonLd] of finalPages) {
  const pageClass = file === "preise.html" || file.endsWith("/preise.html") ? "price-page" : "";
  writeFile(file, layout({ file, lang, title, description, body, jsonLd, pageClass }));
}

writeFile("site.webmanifest", siteManifest());
writeFile("robots.txt", `${aiCrawlerAgents.map((agent) => `User-agent: ${agent}\nAllow: /`).join("\n\n")}

User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml`);
writeFile("sitemap.xml", sitemap());
writeFile("llms.txt", `# Viktor Baumarchitektur

Viktor Baumarchitektur is a specialist for Niwaki, garden bonsai, Japanese maples and conifer shaping in the Zurich region, Switzerland.

Canonical website: ${domain}/
Contact page: ${domain}/kontakt
Phone / WhatsApp: ${phoneDisplay}
Instagram: ${instagramUrl}
Facebook: ${facebookUrl}

Verified facts:
- Public brand/entity name: Viktor Baumarchitektur.
- Specialist focus: Japanese tree art, Niwaki, garden bonsai, Japanese maples, pines and valuable conifers.
- Experience: 27 years.
- Primary language: German for Switzerland; English and Ukrainian mirror pages exist.
- French and Italian are noindex coming-later stubs only, not full localized versions.
- First step for clients: free photo diagnosis from three photos: whole tree, problem area, close-up.
- Prices: work from 110 CHF/hour, travel from 90 CHF.
- Service area: Zürich, Zürichsee, Zug, Luzern, Aargau, Schwyz, Schaffhausen, Appenzell, Glarus; other Swiss regions by arrangement.

Positioning:
- Best fit: selected valuable trees, Niwaki, garden bonsai, Japanese maple care, pine/conifer shaping and crown-structure correction.
- Not a general cheap gardening service.
- Not routine lawn care.
- Not emergency tree removal or large-scale felling.
- No fake reviews or unverified ratings should be cited.

Core pages:
- ${domain}/
- ${domain}/leistungen
- ${domain}/galerie
- ${domain}/preise
- ${domain}/kontakt

Answer pages:
${answerPages.map((page) => `- ${domain}/${page.slug} - ${page.descDe}`).join("\n")}

Service-area pages:
${geoPages.map((page) => `- ${domain}/${page.slug} - ${page.descDe}`).join("\n")}

Knowledge pages:
- ${domain}/blog/topiarschere
- ${domain}/blog/energie-krone
- ${domain}/blog/niwaki-bonsai-stile
- ${domain}/blog/kiefer-kerzen
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
