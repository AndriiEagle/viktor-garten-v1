# 08 · ФОРМУЛА ДЛЯ CODEX — послідовна генерація прототипів дизайну

> Мета: Codex генерує **5 різних self-contained прототипів** (статичний HTML+CSS, без білда), щоб Віктор відкрив і **порівняв** напрями. Усі ділять той самий контент/структуру/бренд — різниться ТІЛЬКИ дизайн.
> Промпти для Codex — **англійською** (кодинг-агент так сильніший), копі на сайті — німецька-плейсхолдер. Мої пояснення — українською.
> Зображення в прототипах = **підписані плейсхолдер-блоки** (реальні фото/AI-фони підставимо ПІСЛЯ вибору напряму). Так оцінюємо дизайн, а не картинки.

---

## Конкурентний аналіз (я зайшов на обидва) `[факт]`
| | Robert (база 70%) | Caesar (30%) |
|---|---|---|
| Палітра | білий/світлий + зелений акцент | темно-зелений #2D5F3F + золото |
| Хіро | лого + теглайн, **сірий оверлей** (Віктор хоче прибрати) | темно-зелений фон, золото, **Google-рейтинг 4.7 + 2 CTA** |
| Структура | single-page, сервіси-картки | багата: галерея, відгуки, історія, дрон-відео, про власника |
| Конверсія | м'яка (1 CTA) | **сильніша** (проруф у хіро) |
| Настрій | світлий мінімал | люкс/ексклюзив |

**Висновок у формулу:** беремо чисту світлу базу Robert + проруф/структуру Caesar; **без сірого оверлею**; проруф (рейтинг/відгук/before-after) рано; сильний один CTA над згином; sticky-CTA на мобілці.

---

## A. SHARED SPEC — пейститься в Codex ПЕРЕД будь-яким варіантом
Це інваріант. Кожен прототип зобов'язаний це поважати.

```
You are building static design PROTOTYPES (HTML + CSS only, no JS build, must open by double-clicking index.html). 
PROJECT: premium website for "Viktor Baumarchitektur" (brand confirmed by Viktor; domain viktor-baumarchitektur.ch). Use the wordmark "Viktor Baumarchitektur" in the logo placeholder (NOTE: an existing logo file says "Viktor Bonsai" — mismatch to reconcile later). A master of Japanese tree care in Switzerland (Zürich region). 
AUDIENCE: wealthy Swiss millionaires (German-speaking) with Japanese gardens; high ego, price-sensitive, value mastery and exclusivity.

NON-NEGOTIABLE RULES (apply to EVERY variant):
- Mobile-first. Must look great at 390px width first, then scale up. On mobile the hero text must be readable WITHOUT relying on a big background photo.
- NO flat grey semi-transparent overlay on the hero (the client dislikes it). For text legibility use: a soft bottom-to-top gradient, a side text panel, or a duotone — never a dull grey wash.
- Language of UI copy: GERMAN (use the placeholder copy below). Keep an English comment above each German string.
- Premium, calm, Japanese-influenced, but NOT esoteric ("no shaman with secateurs"). Swiss restraint + Japanese depth.
- GOVERNING PRINCIPLE (file 10): balance quality + speed + trust + content + sales. "Feels fast" on mobile — NOT fanatical score-chasing, but NEVER slow/heavy on a phone.
- ADD/CUT GATE for every element: keep it ONLY if it (makes it more beautiful OR builds trust OR helps the sale) AND does not hurt mobile speed. If it is merely "cool" but heavy/slow or does not help the client decide → cut it.
- Performance rules (concrete, not fanatical): images AVIF/WebP with srcset + width/height + lazy-load below the fold (hero eager/preload), ≤~300KB hero / ~100-200KB content imgs; max 1 Google font (font-display:swap) or system fonts; CSS-only animations (no GSAP/AOS), respect prefers-reduced-motion; NO autoplay heavy hero video (poster/click-to-play or none for v1); vanilla JS only, no jQuery/Bootstrap/React/heavy sliders (use CSS scroll-snap); multipage = separate light HTML pages, not an SPA; page weight guideline ~<1-1.5MB on mobile.

BRAND MOTTO (display prominently): "Schweizer Qualität in Verbindung mit japanischer Philosophie."
SECONDARY LINE: "Schnell ist nicht gleich Qualität."

PRIMARY CTA (above the fold, sticky on mobile): "Foto senden → kostenlose Diagnose" (links to WhatsApp placeholder #).
SECONDARY CTA: "Rückruf anfordern" (Viktor calls back).
TERTIARY CTA: "Vor-Ort-Termin ab 90 CHF".

3 CORE SERVICES (cards/section, with image slot each):
1) Niwaki (Garten-Bonsai) — Pflege & Formung.   [NOTE: Niwaki = garden trees, NOT pot bonsai]
2) Japanische Ahorne — Acer palmatum & Acer palmatum dissectum: Formung, Schnitt, Totholz-Entfernung, Architektur der Krone.
3) Nadelgehölze (alle) — Schwerpunkt Kiefer/Pinus; auch Taxus/Eibe, Juniperus/Wacholder, Tanne, Fichte.
Footnote: "Bäume bis 3 m. Weitere Arbeiten auf Anfrage." NO lawn-care, NO big planting.

REQUIRED SECTIONS (top → bottom):
1. Hero (brand, motto, services visible, primary CTA, trust chip e.g. "27 Jahre Erfahrung").
2. The client's pain → "Naturgesetze kann man nicht ignorieren" (storytelling: braune Nadeln → trockene Äste → Baum verliert die Form). Before/after slot.
3. Warum ein Meister ≠ ein Gärtner — energy-balance infographic (Krone ~70%, Stamm ~20%, Wurzeln ~10%) + 27 Jahre + Dao.
4. Leistungen (the 3 core services).
5. "Wie Ihr Baum über die Jahre Form annimmt" — VISION/PROCESS module: a 3-step timeline Jahr 1 → Jahr 2 → Jahr 3 showing how a maple/pine is shaped over years (ties to "I see what the tree will become"). Image slot per step (this is where AI vision-mockups will go later).
6. Galerie Vorher/Nachher (6 pairs) + Meister bei der Arbeit (3 photos).
7. "Blick in die Wurzeln" — soil/foundation section (akadama, pH, geprüfte Erden) — signature, no competitor has it.
8. Preise als Wert ("Warum 4 Stunden Qualität > 2 Stunden schnell") — ab 110 CHF/Std., Anfahrt ab 90 CHF (distanzabhängig).
9. Arbeitsgebiet (Kantone: Zürich + Zug, Schaffhausen, Aargau, Luzern, Appenzell, Schwyz, Glarus).
10. Vertrauen: 1 Rezension + Google-Rating chip + Instagram/Facebook links.
11. Kontakt / final CTA (Foto-Upload + WhatsApp + Anruf).
12. Footer + Impressum/Datenschutz placeholders + subtle "Website by Andrii".

IMAGE SLOTS — use LABELED placeholder boxes (colored div with centered caption), DO NOT fetch real images. Two kinds, style them differently:
- [FOTO — echt]  = real photo slot (before/after, master's face, testimonial). Caption in the box.
- [BG — AI, von Viktor geprüft] = AI/atmosphere background or vision-mockup slot. Caption in the box.
Mark for EACH slot whether it is FOREGROUND (inline, in a card/gallery) or BACKGROUND (full-bleed behind text).

OUTPUT CONVENTION:
- Create folder /site-prototypes/variant-XX-<name>/ with index.html + styles.css (self-contained).
- Also create /site-prototypes/index.html = a compare page that lists all variants with screenshots/links and lets the user open each (iframe or links).
- Each variant must be COMPLETE and standalone. Reuse the SAME content above; change ONLY the design system described in the variant prompt.
```

---

## B. ФОРМУЛА (параметризований шаблон одного варіанта)
Підставляєш значення `<...>` — отримуєш новий напрям. Це і є «формула послідовної генерації».

```
Build prototype "variant-XX-<short-name>" using the SHARED SPEC above. 
Design system for THIS variant:
- MOOD: <одне речення настрою>
- PALETTE: bg <#hex>, text <#hex>, primary <#hex>, accent <#hex> (give exact hex)
- TYPOGRAPHY: headings <font + weight>, body <font + weight>, scale <tight/airy>
- HERO TREATMENT: <що у хіро, як вирішено читабельність тексту БЕЗ сірого оверлею>
- LAYOUT DENSITY: <minimal single-scroll / rich multi-section / editorial asymmetric / full-bleed cinematic>
- IMAGERY LOGIC: <які слоти foreground vs background; де AI-фон, де реальні фото>
- SIGNATURE ELEMENT: <1 фішка, що відрізняє цей варіант>
Keep ALL sections and copy from SHARED SPEC. Output to /site-prototypes/variant-XX-<short-name>/.
After finishing, add this variant to /site-prototypes/index.html compare page.
```

---

## C. 5 ПОСЛІДОВНИХ ВАРІАНТІВ (готові до пейсту, по черзі)

**V1 — Robert Clean Light** (світла база, 70%)
```
MOOD: serene Swiss-minimal botanical, bright and airy.
PALETTE: bg #FAFAF7, text #1E1E1E, primary #3E5C3A (muted leaf-green), accent #8A9A5B.
TYPOGRAPHY: headings Inter/Helvetica 700, body Inter 400, airy scale.
HERO TREATMENT: light garden photo BG, legibility via soft white-to-transparent bottom gradient (NO grey). Centered brand + tagline (Niwaki · Garten-Bonsai · Formgehölze) + primary CTA.
LAYOUT DENSITY: minimal single-scroll, generous whitespace, 3 clean service cards.
IMAGERY LOGIC: mostly foreground photo cards; one light atmospheric BG in hero only.
SIGNATURE ELEMENT: ultra-clean cards with thin hairline borders.
```

**V2 — Caesar Luxe Dark** (преміум, 30% підсилено)
```
MOOD: exclusive, expensive, gold-on-green luxury.
PALETTE: bg #1F3D2E (forest green), text #F4F1E8, primary #C9A24B (gold), accent #2D5F3F.
TYPOGRAPHY: headings serif (Cormorant/Playfair) 600, body sans 400.
HERO TREATMENT: deep green hero, gold motto, Google-rating chip + two CTAs (like Caesar but fresher, no grey).
LAYOUT DENSITY: rich multi-section: image gallery 3-col, testimonials carousel (static), story, master portrait.
IMAGERY LOGIC: many foreground photos; gold-framed; dark BG sections.
SIGNATURE ELEMENT: gold hairline + serif headlines = jewellery feel.
```

**V3 — Japanese Editorial / Zen**
```
MOOD: museum-quiet, zen, high-craft, restrained.
PALETTE: bg #F2EDE3 (washi paper), text #14110E (sumi), accent #B23A2E (seal red) used sparingly.
TYPOGRAPHY: large editorial serif headings, very generous leading, asymmetric grid, vertical rhythm.
HERO TREATMENT: one striking off-center tree photo + big asymmetric headline; legibility via layout (text on paper area, not over photo).
LAYOUT DENSITY: editorial/magazine, lots of negative space; the Jahr 1→2→3 vision timeline is a hero feature.
IMAGERY LOGIC: few but large foreground photos; no busy backgrounds.
SIGNATURE ELEMENT: a thin vertical red accent line + Japanese-style section numbering.
```

**V4 — Improved Hybrid 70/30** ⭐ (саме мікс Віктора — моя рекомендація)
```
MOOD: premium + fresh + trustworthy; the synthesis of Robert (clean light) and Caesar (premium proof).
PALETTE: bg #F8F7F2, text #1E2A22, primary #24452F (deep green), accent #BE9B4E (warm gold), micro-accent #7FA45B (fresh leaf).
TYPOGRAPHY: serif headline accents + clean sans body.
HERO TREATMENT: GARDEN-IMMERSION photo (whole garden atmosphere near a house, blue sky) with a SIDE text panel for the motto+CTA (so NO overlay needed); services visible on first screen; trust chip (27 Jahre / Google rating).
LAYOUT DENSITY: rich multi-section + blog teaser + before/after storytelling + vision-mockup feature block + energy infographic + roots section.
IMAGERY LOGIC: hero BG = AI garden atmosphere [von Viktor geprüft]; before/after + master = real foreground photos; vision-mockups foreground in the Jahr1→3 module.
SIGNATURE ELEMENT: the "Blick in die Wurzeln" foundation section + the Jahr1→2→3 vision timeline.
```

**V5 — Photo-Immersive Cinematic**
```
MOOD: high-end cinematic, gallery-like, photography leads.
PALETTE: photography-driven; UI chrome minimal; text #FFFFFF over imagery / #14110E on white sections; thin neutral accent.
TYPOGRAPHY: light/thin large sans (e.g., 300 weight), big.
HERO TREATMENT: full-bleed cinematic garden photo/video slot; minimal text bottom-left; legibility via bottom gradient only.
LAYOUT DENSITY: full-bleed alternating sections (photo / content), big before/after slider.
IMAGERY LOGIC: background = full-bleed atmosphere [AI/echt]; foreground = before/after sliders.
SIGNATURE ELEMENT: scroll-driven full-bleed alternation + before/after drag slider.
```

---

## D. Логіка зображень: ПОРУЧ (foreground) vs ФОН (background)
Ось та «штука» про фото, яку ти питав:

| Контент | Тип | Де | Джерело |
|---|---|---|---|
| Before/After (6 пар) | **Foreground** (у галереї/слайдері) | секція 2, 6 | **реальні фото** Віктора |
| Майстер за роботою (3) | **Foreground** (картки довіри) | секція 3, про майстра | **реальні фото** (лице = довіра) |
| Відгук (1) | Foreground | секція 10 | реальний |
| Хіро-атмосфера саду | **Background** (full-bleed за текстом) | секція 1 | **AI** (von Viktor geprüft) або реальне фото саду |
| Vision-мокап «Jahr 1→2→3» | **Foreground** (3 кадри в таймлайні) | секція 5 | **AI-рендер** дерева, **візує Віктор** |
| Розділювачі секцій / текстура | Background | між секціями | AI/текстура, делікатно |
| Схема балансу енергії | Foreground (інфографіка/SVG) | секція 3 | малюємо в коді, не фото |

> Запобіжник проти мутантів (LOCK#015): **усі AI-картинки візує Віктор** як експерт ПЕРЕД публікацією. Реальні фото — для доказів (before/after, лице).

---

## E. Як ганяти послідовно в Codex
1. Встав **SHARED SPEC (A)** першим повідомленням — хай Codex підтвердить, що зрозумів і створив `/site-prototypes/`.
2. Далі по черзі: **V1 → V2 → V3 → V4 → V5** (розділ C), кожен окремим повідомленням. Після кожного проси Codex оновити `/site-prototypes/index.html` (порівнялку).
3. Відкрий `/site-prototypes/index.html` → покажи Віктору 5 напрямів → він обирає 1 (ймовірно V4) → тоді робимо повний COPY_DECK_DE + IMAGE_BRIEF + реальну збірку.

> Це і є дешеве «порівняння версій», про яке ти казав — 5 прототипів за ціну прототипів, а не 5 повних сайтів.
