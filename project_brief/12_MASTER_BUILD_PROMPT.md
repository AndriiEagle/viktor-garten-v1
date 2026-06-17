# 12 · MASTER BUILD PROMPT (для Codex — одна хірургічна інструкція)

> Як користуватись: встав УВЕСЬ цей файл у Codex одним завданням. Він самодостатній — Codex будує повний сайт за раз, по порядку (розділ §15), із самоперевіркою (§14). Інструкція — англійською (Codex так точніший), копі сайту — німецька, вже написана нижче.
> Дефолт-дизайн = **V4 (Improved Hybrid)**, але **tokenized** → інші напрями = окремі theme-файли (§3), перемикаються без перебудови.

---

```
ROLE: You are a senior front-end engineer. Build a COMPLETE, production-ready, multipage marketing website for "Viktor Baumarchitektur" — a master of Japanese tree care (Niwaki, Japanese maples, conifers) in the Zürich region, Switzerland. Build the WHOLE site in one go, page by page, then self-verify against the ACCEPTANCE CHECKLIST and fix anything that fails. Work autonomously; where a real asset is missing, insert a clearly-labeled placeholder — never block.

GOAL FUNCTION: maximize (beauty × trust × conversion × mobile-speed × uniqueness) within budget/time. Every element must pass the ADD/CUT gate: keep it only if it (adds beauty OR builds trust OR helps the sale) AND does not hurt mobile speed; if it is merely "cool" but heavy/slow or doesn't help the client decide — cut it. DONE = deployed-ready, all pages built, all CTAs wired to placeholders, real assets swappable in minutes, analytics events firing, passes the checklist.

AUDIENCE: wealthy, German-speaking Swiss clients (millionaires with Japanese gardens/terraces), high ego, price-sensitive, value mastery + exclusivity. Tone: premium, calm, Japanese-influenced, Swiss-restrained — NOT esoteric.
```

## §1 · TECH STACK & HARD CONSTRAINTS
```
- Static multipage site: plain semantic HTML + CSS + minimal vanilla JS. NO React/Vue/jQuery/Bootstrap. NO build step required (must open by double-click), but structured for Vercel static hosting.
- MOBILE-FIRST: design at 390px first, then scale up (breakpoints 768, 1024, 1280). Must FEEL fast on a real phone (see §12) — not score-chasing, but never slow/heavy.
- TOKENIZED DESIGN: all colors/type/spacing as CSS custom properties in /assets/theme-v4.css. Switching theme = swapping the theme file. Also generate theme-v1.css … theme-v5.css (token sets from §3) and a /themes.html switcher.
- Languages: DE (primary) + EN. DE pages at /, EN under /en/. Use hreflang. Build DE fully; EN may be a translated mirror of the same structure.
- Accessibility: semantic landmarks, alt on every image, focus states, prefers-reduced-motion, contrast AA.
```

## §2 · FILE / FOLDER STRUCTURE (create exactly)
```
/index.html              (Startseite)
/leistungen.html         (Leistungen — 3 services)
/philosophie.html        (Über mich & Philosophie)
/galerie.html            (Vorher/Nachher + Meister bei der Arbeit)
/preise.html             (Preise)
/blog/index.html         (Blog/Wissen — article list)
/blog/topiarschere.html  (sample article 1)
/blog/boden-wurzeln.html (sample article 2)
/kontakt.html            (Kontakt — form + WhatsApp + phone)
/impressum.html          (placeholder legal)
/datenschutz.html        (placeholder legal)
/themes.html             (internal: preview V1–V5 by swapping theme file)
/en/… (mirror of the above in English)
/assets/theme-v4.css     (active design tokens)
/assets/theme-v1.css … theme-v5.css
/assets/base.css         (reset + layout + components, uses tokens)
/assets/main.js          (sticky CTA, mobile nav, analytics events, simple gallery)
/assets/img/             (placeholder images live here; see §7)
/assets/icons/           (inline SVG preferred)
/site.webmanifest, /robots.txt, /sitemap.xml
/vercel.json
/README.md               (how to edit content + swap assets + change theme)
```

## §3 · DESIGN TOKENS (V4 = active; others as alt themes)
```
THEME V4 "Improved Hybrid" (DEFAULT, /assets/theme-v4.css):
  --bg:#F8F7F2; --surface:#FFFFFF; --text:#1E2A22; --muted:#5B6B60;
  --primary:#24452F;  --primary-ink:#FFFFFF;  --accent:#BE9B4E (warm gold);
  --leaf:#7FA45B;  --line:#E3E0D6;  --radius:14px; --shadow:0 6px 24px rgba(20,30,24,.08);
  --font-head:"Cormorant Garamond",Georgia,serif;  --font-body:system-ui,"Inter",sans-serif;
  --maxw:1140px; --space:clamp(16px,4vw,40px);
ALSO GENERATE (same variable names, different values):
  theme-v1 "Robert Clean": bg #FAFAF7, text #1E1E1E, primary #3E5C3A, accent #8A9A5B, sans headings.
  theme-v2 "Caesar Luxe": bg #1F3D2E, text #F4F1E8, primary #C9A24B, accent #2D5F3F, serif headings.
  theme-v3 "Zen Editorial": bg #F2EDE3, text #14110E, accent #B23A2E, large serif, airy.
  theme-v5 "Cinematic": near-monochrome, white-on-image, thin sans 300.
RULE: NO flat grey hero overlay (client dislikes). For legibility use a side text panel OR a soft bottom gradient OR a duotone — never a dull grey wash.
```

## §4 · GLOBAL COMPONENTS (shared across pages)
```
HEADER: sticky, slim. Left = logo placeholder (wordmark "Viktor Baumarchitektur" — a logo file will replace it; put <img src="/assets/img/logo.svg" alt="Viktor Baumarchitektur"> with a text fallback). Right nav (DE): Start · Leistungen · Philosophie · Galerie · Preise · Wissen · Kontakt. Lang switch DE/EN. On mobile: hamburger.
FOOTER: services list, Kantone, contact, Instagram + Facebook links (#), Impressum/Datenschutz, subtle "Website by Andrii".
BUTTONS: .btn-primary (filled --primary), .btn-secondary (outline), .btn-ghost. 44px min tap target.
STICKY MOBILE CTA BAR: fixed bottom on mobile only — primary "Foto senden" (WhatsApp) + phone icon. Hidden on desktop.
TRUST CHIP: small pill "27 Jahre Erfahrung" + Google-rating slot "★ 4.x (Google)" [placeholder].
SECTION wrapper with --maxw and vertical rhythm.
```

> 📌 CANONICAL COPY = file **13_COPY_DECK_DE.md** (full selling+philosophy German text for every page/section, incl. Philosophie, Kontakt, 2 blog articles, meta titles, exclusivity layer). Use file 13 as the source of truth; the snippets below are a subset. CANONICAL KEYWORDS = file **14_SEO_KEYWORDS.md** (titles/H1/JSON-LD areaServed).

## §5 · PAGE SPEC + §6 GERMAN COPY (use verbatim; expand where noted)

### /index.html (Startseite)
```
1. HERO: garden-immersion background [BG — AI, von Viktor geprüft] with a SIDE text panel (so no overlay).
   H1: "Japanische Baumkunst mit Schweizer Präzision."
   Tagline: "Garten-Bonsai · Niwaki · Formschnitt"
   Motto (highlighted): "Schweizer Qualität in Resonanz mit japanischer Philosophie."
   Sub: "Seit 27 Jahren forme und pflege ich Nadelgehölze, japanische Ahorne und Niwaki – damit Ihr Baum über Jahre seine Form und Gesundheit behält."
   Primary CTA: "Foto senden – kostenlose Diagnose"  Secondary: "Rückruf anfordern"
   Trust chip visible. Services teaser row (3 items) visible on first screen.
2. PAIN → NATURE'S LAWS:
   H2: "Naturgesetze kann man nicht ignorieren."
   Body: "Braune Nadeln, dann trockene Äste – der Baum verliert erst einen Ast, dann zwei, schliesslich seine Form. Der Grund ist fast immer derselbe: Es wurde an Zeit und Geld gespart. Doch Formschnitt ist Feinarbeit. Wer alle Knospen nach Schema schneidet, erhält gegen die Gesetze der Natur kein dauerhaftes Ergebnis."
   Pull-quote: "Einen Ast abzuschneiden dauert eine Sekunde. Einen neuen wachsen zu lassen – Jahre."
   Image slot: [FOTO — echt] Vorher/Nachher (falsch geschnittene Knospen).
3. WARUM EIN MEISTER ≠ EIN GÄRTNER:
   H2: "Warum ein Meister mehr sieht als ein Gärtner."
   Energy infographic (SVG, drawn in code, NOT a photo): Krone ~70 % · Stamm ~20 % · Wurzeln ~10 %.
   Body: "Die Krone verbraucht Energie ungleich. Wer das ignoriert, schneidet die Kraft aus dem Baum. Ich sehe die natürliche Architektur eines Baumes – und wie er in einem, zwei, drei Jahren aussehen wird. 27 Jahre Praxis, geschult an der Philosophie des Dao."
4. LEISTUNGEN (3 cards, link to /leistungen.html) — short versions from §5 leistungen.
5. VISION TIMELINE: H2 "Wie Ihr Baum über die Jahre Form annimmt." 3 steps Jahr 1 → Jahr 2 → Jahr 3, each an image slot [BG — AI, von Viktor geprüft] (this is where vision-mockups go) + 1 caption line.
5b. ★ PERSÖNLICHE BAUM-VISION (SIGNATURE centerpiece — combines all 4 cherries; copy in file 13 §5★): H2 "Ihre persönliche Baum-Vision – kostenlos." + body + primary CTA "Foto senden – persönliche Baum-Vision erhalten". Make this visually the strongest conversion block on the page.
6. GALERIE TEASER: 3 before/after [FOTO — echt] → link to /galerie.html.
7. BLICK IN DIE WURZELN teaser → link to /philosophie.html#wurzeln.
8. PREISE teaser: "Qualität statt Eile" + "ab 110 CHF/Std., Anfahrt ab 90 CHF" → /preise.html.
9. ARBEITSGEBIET: "Tätig in Zürich, Zug, Luzern, Aargau, Schwyz, Schaffhausen, Appenzell, Glarus – übrige Schweiz nach Absprache."
10. VERTRAUEN: "Anerkennung aus Japan" — a REAL photo (japan-postkarte.jpg, NOT AI) of a hand-signed thank-you postcard from a renowned Japanese bonsai-tool brand, personally addressed to Viktor, with caption "In Japan kennt man meine Arbeit." + 1 testimonial [initials] + Google rating slot + Instagram (https://www.instagram.com/viktor_bonsai_niwaki) / Facebook (https://www.facebook.com/viktor.bonsai.niwaki) links. (This authority signal is high-trust — feature it prominently.)
11. FINAL CTA: H2 "Bereit, Ihren Baum zu retten?" Body "Senden Sie mir ein Foto der Problemstelle – ich sage Ihnen kostenlos, ob und wie er zu retten ist." Primary CTA.
```

### /leistungen.html — full services (German)
```
INTRO: "Drei Kernbereiche. Alles andere auf Anfrage. Bäume bis 3 m; grösser nach Absprache."
SERVICE 1 — "Niwaki (Garten-Bonsai)": "Pflege und Formung von Niwaki – Bäumen im Garten, nicht im Topf. Systematischer Schnitt, der die Kraft des Baumes dorthin lenkt, wo sie gebraucht wird, und jeder ‚Wolke‘ ihren eigenen Raum für Licht und Luft gibt."
SERVICE 2 — "Japanische Ahorne (Acer palmatum / dissectum)": "Saisonale Formung und Schnitt, Entfernung von Totholz aus dem Kroneninneren, Handarbeit gegen Pilze und Moos, architektonische Kronenarbeit. Viele Ahorne in der Schweiz wachsen ohne Pflege ein – ich öffne die Krone, bevor Pilze und Feuchtigkeit Schaden anrichten."
SERVICE 3 — "Nadelgehölze": "Alle Nadelgehölze, Schwerpunkt Kiefer (Pinus sylvestris, mugo, thunbergii, parviflora, densiflora, strobus). Auch Taxus/Eibe, Juniperus/Wacholder, Tanne, Fichte. Geschnitten ausschliesslich mit feinsten japanischen Werkzeugen – von Hand, für einen sauberen Schnitt, der dem Baum die Kraft lässt."
NOTE block: "Weitere Arbeiten auf Anfrage. Kein gewöhnlicher Garten-/Rasenunterhalt, keine grossen Pflanzungen."
Each service: image slot [FOTO — echt] + CTA "Foto senden".
```

### /philosophie.html — About + Philosophy (expand from points)
```
Sections (write 1–2 warm German paragraphs each from these TRUE points — NO invented biography beyond them):
- "Vom Schiffsmechaniker zur Baumkunst": früher Schiffs-/Maschinenmechaniker (Metall, Stress) → 2009 Reise nach Japan = Wendepunkt → seither Niwaki. (do NOT mention war/family/religion/personal life)
- "27 Jahre, mit Schweiss erarbeitet": systematische Arbeit, tiefe Analyse, Philosophie des Dao.
- "Naturgesetze" (reuse home copy, deeper).
- #wurzeln "Blick in die Wurzeln": "Wie beim Fundament eines Hauses beginnt alles unter der Erde. Der richtige Boden – Akadama, die passende Säure (pH 5,5–6,5), geprüfte Erden – ist die Basis für Gesundheit. Mein Versprechen: kein Garantie-Versprechen über Ihren Kopf hinweg, aber die Zusage, es richtig zu machen und Fehler zu korrigieren – wenn Sie meinen Empfehlungen folgen, hält die Form über Jahre."
- "Topiarschere statt Heckenschere": clean vs torn cut, energy waste — short.
Image slots [FOTO — echt] master at work (3).
```

### /galerie.html
```
H1 "Vorher / Nachher". 6 before/after pairs [FOTO — echt] as a simple CSS grid or a drag slider (vanilla JS, lightweight). Each with a one-line caption tying to "Naturgesetze". Section "Der Meister bei der Arbeit" with 3 photos. CTA at the end.
```

### /preise.html
```
H1 "Preise – Qualität statt Eile."
Body: "Vier Stunden gute Arbeit sind mehr wert als zwei Stunden schnelle. Wer am Schnitt spart, zahlt mit der Form und Gesundheit des Baumes."
Table/cards: "Arbeit ab 110 CHF/Std." · "Anfahrt ab 90 CHF (distanzabhängig)" · "Vor-Ort-Termin nach Foto-Diagnose". Note: "Foto-Diagnose ist kostenlos." CTA.
```

### /blog/ (Wissen)
```
/blog/index.html: list of articles (cards). Intro "Wissen rund um Niwaki, Ahorne und Nadelgehölze."
Write 2 sample articles (300–500 words German each, from the transcript points):
 - topiarschere.html: "Warum ich mit der Topiarschere schneide – und nicht mit der Heckenschere." (sauberer vs gerissener Schnitt, ‚Härchen‘/Fasern, Energie, japanisches Werkzeug)
 - boden-wurzeln.html: "Der Boden entscheidet: Akadama, Säure und gesunde Wurzeln." (Fundament-Metapher, Akadama/Kanuma/Pemza, pH 5,5–6,5)
Each article: hero image slot, body, CTA at end. Designed for SEO (good headings, keywords: Niwaki schneiden, Acer palmatum Pflege, Kiefer Formschnitt, Topiarschere, Akadama).
```

### /kontakt.html
```
H1 "Kontakt – senden Sie mir ein Foto."
Primary path: WhatsApp button (deep link https://wa.me/41783130330?text=<prefilled DE template asking for photos of the whole tree, the problem area, and a close-up, plus canton & tree type>).
Form (works without backend now): fields Name, E-Mail, Kanton, Baumart, Nachricht, Foto-Upload (multiple). Submit via mailto: placeholder OR a Formspree/Vercel-forms endpoint placeholder (clearly marked TODO). On submit fire analytics event.
Also: Rückruf anfordern (name + phone + Zeitfenster). Phone click-to-call placeholder.
```

### /impressum.html & /datenschutz.html
```
Placeholder legal pages with realistic German structure (Angaben gemäss, Kontakt, Haftung, Datenschutz/DSG/DSGVO basics). Fill with [PLATZHALTER] for the data Viktor will provide. Make clear via an HTML comment these are placeholders.
```

## §7 · IMAGES (placeholders now, swap later)
```
DO NOT fetch real images. For every image slot create a styled placeholder: a div with the brand colors, centered caption text, and the correct aspect-ratio (use width/height). Two visual styles:
 - [FOTO — echt]: solid surface box, caption e.g. "FOTO: Vorher/Nachher (echt)".
 - [BG — AI, von Viktor geprüft]: subtle gradient box, caption e.g. "AI-Hintergrund — von Viktor geprüft".
Mark each as FOREGROUND (inline/card) or BACKGROUND (full-bleed). Real files will drop into /assets/img/ with the same filenames later — so name slots meaningfully (hero-garten.jpg, vorher-nachher-01.jpg, meister-01.jpg, vision-jahr1.jpg …). Provide a /assets/img/MANIFEST.md listing every expected file, its size/aspect, and source (real vs AI). The actual image-generation prompts + shared visual DNA are in file 17_IMAGE_BRIEF.md (used later when generating real/AI images; Codex only builds the labeled placeholders now).
```

## §8 · CONVERSION / FORMS / CTA LOGIC
```
- Primary CTA everywhere = "Foto senden – kostenlose Diagnose" → WhatsApp deep link with prefilled DE message.
- Secondary = "Rückruf anfordern". Tertiary = "Vor-Ort-Termin ab 90 CHF".
- Sticky mobile CTA bar (primary + call). 
- Contact form: graceful no-backend now (mailto or Formspree placeholder), photo upload input, validation. Mark backend wiring as TODO.
```

## §9 · ANALYTICS / ATTRIBUTION + ADS-READINESS (the referral-proof loop)
```
- COOKIE CONSENT (required CH/EU + Google): implement a lightweight consent banner with Google Consent Mode v2. Set analytics_storage/ad_storage to 'denied' by default; load GA4/Ads tags only after consent. No external CMP library — small vanilla JS. Link to /datenschutz.
- GA4: snippet with placeholder ID G-XXXXXXX (TODO), gated by consent.
- Google Ads conversion tag: placeholder AW-XXXXXXX (TODO), fire a conversion on contact_form_submit and cta_whatsapp_click (so Viktor's own Ads can optimize). Gated by consent.
- Google Search Console: <meta name="google-site-verification" content="PLATZHALTER"> (TODO).
- Custom events via data-attributes + main.js: cta_whatsapp_click, cta_call_click, cta_rueckruf_submit, contact_form_submit, vision_section_view.
- Each CTA has data-event="..."; main.js attaches listeners and calls gtag('event', ...).
- GOAL of this section: (a) be legally Ads-ready & professional; (b) prove which leads come from the site → so Viktor can credit Andrii (the referral engine).
```

## §10 · SEO
```
- Per page: unique <title>, meta description, canonical, OpenGraph, hreflang DE/EN.
- OG SHARE IMAGE (high-leverage): a designed og:image (1200×630) per key page — brand "Viktor Baumarchitektur" + best before/after + motto. CRITICAL: Viktor's #1 distribution is sending the link personally (WhatsApp / to clients). This preview IS the first impression of that channel. Use a labeled placeholder now (/assets/img/og-share.jpg) in MANIFEST.
- JSON-LD: LocalBusiness (name "Viktor Baumarchitektur", areaServed Kantone + wealthy towns, priceRange, serviceType) + Person (Viktor, 27 Jahre Erfahrung) + Service (per core service) on relevant pages.
- AI / ANSWER-ENGINE optimization (GEO): build an FAQ section/page with FAQPage schema that answers natural-language problem queries in German, e.g. "Wie rette ich meinen Niwaki / japanischen Ahorn?", "Warum verliert mein Baum die Form?", "Was kostet japanische Baumpflege in der Region Zürich?". Add /llms.txt (who Viktor is + key pages + contact) for AI crawlers. Keep entity facts explicit and consistent so retrieval-AI (Perplexity, Google AI Overviews, Copilot, browsing assistants) can cite Viktor.
- /sitemap.xml, /robots.txt. Semantic headings. Keyword targets in headings/copy: Niwaki Schweiz, Garten-Bonsai Zürich, Acer palmatum Pflege, Kiefer Formschnitt, japanische Gartenkunst.
- FOLLOW file 15_ONPAGE_SEO.md EXACTLY: per-page slug, <title>, meta, H1, secondary H2 keywords, first-paragraph keyword, alt patterns, and internal-link anchors. One H1 per page; primary keyword in title+slug+H1(or first H2)+first 100 words+1 alt+1 internal anchor. Do not keyword-stuff; keep premium tone.
```

## §11 · i18n DE/EN
```
DE under /, EN under /en/ (same structure, translated). Lang switch in header. hreflang tags. Keep one shared CSS/JS.
```

## §12 · PERFORMANCE CHECKLIST (self-enforce — principle file 10)
```
[ ] Images AVIF/WebP, srcset + width/height, lazy below fold, hero preload, ≤~300KB hero / ~100–200KB content.
[ ] Max 1 web font family (font-display:swap) or system fonts; preload hero font.
[ ] CSS-only animations (transform/opacity), prefers-reduced-motion honored; NO animation libs.
[ ] No autoplay heavy video.
[ ] Vanilla JS only, small; no jQuery/React/heavy sliders (CSS scroll-snap for galleries).
[ ] Each page weight ~<1–1.5MB on mobile. No render-blocking heavy resources.
[ ] Looks & feels right at 390px FIRST.
```

## §13 · DEPLOY
```
- /vercel.json for static hosting (clean URLs, headers for caching images/fonts).
- /README.md: how to (a) swap a placeholder image, (b) change WhatsApp number / GA4 ID / Impressum data, (c) switch theme (replace theme-v4.css link), (d) edit copy. Written for a non-developer (Andrii via GitHub).
```

## §14 · ACCEPTANCE CHECKLIST (verify, then fix, before declaring done)
```
[ ] All pages in §2 exist and are internally linked (header/footer nav works).
[ ] Every page valid HTML, has SEO meta + JSON-LD where required.
[ ] All CTAs present, wired, fire analytics events.
[ ] Cookie-consent banner works (Consent Mode v2, default denied); GA4/Ads/Search-Console placeholders present and consent-gated.
[ ] Mobile-first verified at 390px; sticky mobile CTA works; hamburger works.
[ ] Tokenized: switching theme-v4.css → theme-v2.css restyles the whole site with no broken layout.
[ ] All image slots are labeled placeholders with correct aspect-ratios; MANIFEST.md complete.
[ ] DE complete; EN mirror present.
[ ] Performance checklist §12 all green.
[ ] README explains every swap-in. No console errors.
```

## §15 · EXECUTION ORDER (build in this sequence; commit after each)
```
1. Scaffold structure §2 + base.css + theme-v4.css + tokens for v1–v5.
2. Global components §4 (header, footer, buttons, sticky CTA, main.js skeleton).
3. /index.html with all sections + German copy §5/§6.
4. /leistungen, /philosophie, /galerie, /preise.
5. /blog index + 2 articles.
6. /kontakt + forms + WhatsApp deep link + analytics events §8/§9.
7. /impressum, /datenschutz placeholders.
8. SEO §10 + sitemap/robots + JSON-LD. /themes.html switcher.
9. EN mirror under /en/.
10. vercel.json + README §13.
11. Run ACCEPTANCE CHECKLIST §14, fix every failing item, repeat until all green.
```
```
OUTPUT: the full repository. If anything is ambiguous, choose the option that best serves the GOAL FUNCTION and the ADD/CUT gate, and note the assumption in README. Do not stop until §14 is fully green.
```

---

### Примітка для Андрія
- **Плейсхолдери, які підставиш потім (10 хв):** `wa.me/<номер>`, GA4 `G-XXXX`, лого-файл `/assets/img/logo.svg`, реальні фото за іменами з `MANIFEST.md`, дані Impressum.
- **Зміна дизайн-напряму** = поміняти лінк `theme-v4.css` → `theme-v2.css` (або відкрити `/themes.html`). Перебудова не потрібна.
- **Блог/EN** Codex згенерує сам; Віктор потім підправить слова й дасть ключові.
