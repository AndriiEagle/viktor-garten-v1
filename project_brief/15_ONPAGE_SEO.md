# 15 · ON-PAGE SEO — прицільна розкладка ключів по сторінках

> Закриває дірку між «ключі досліджені» ([14](14_SEO_KEYWORDS.md)) і «ключі стоять у правильних місцях тексту». Codex зобов'язаний це виконати (вшито в [12](12_MASTER_BUILD_PROMPT.md) §10).
> Баланс: преміум-тон НЕ ламаємо — головний ключ заходить у `<title>`, slug, **H1 або перший підзаголовок**, перший абзац (перші ~100 слів), alt і внутрішні лінки. Не напихаємо.

## Золоті правила on-page
1. **1 сторінка = 1 головний ключ** (+2-3 вторинні). Не канібалізувати.
2. Головний ключ у: **title · slug · H1 (або H2 одразу під поетичним H1) · перший абзац · 1 alt · 1 внутрішній анкор.**
3. `<title>` ≤ ~60 знаків, meta-desc ≤ ~155, з ключем і CTA.
4. Alt = опис + ключ природно (не «keyword keyword»).
5. Внутрішні лінки анкором-ключем (не «hier klicken»).
6. URL — короткі, ключові, DE: `/leistungen`, `/japanischer-ahorn` тощо.
7. Латинські назви (Pinus, Acer palmatum, Taxus baccata) у тексті/alt — ловлять знавців.

## Карта сторінок
| Сторінка | Slug | Title (≤60) | H1 (SEO-tuned) | Головний ключ | Вторинні |
|---|---|---|---|---|---|
| Start | `/` | `Niwaki & Garten-Bonsai Zürich – Viktor Baumarchitektur` | **Niwaki & japanische Baumkunst – mit Schweizer Präzision** | Niwaki Zürich / Garten-Bonsai | japanische Gartenkunst, japanische Baumpflege |
| Leistungen | `/leistungen` | `Niwaki, japanischer Ahorn & Kiefer-Formschnitt` | **Leistungen – Niwaki, Ahorn & Nadelgehölze** | Formschnitt Nadelbäume | Kiefer Formschnitt, Niwaki Schnitt |
| Ahorn (опц. розділ/сторінка) | `/japanischer-ahorn` | `Japanischer Ahorn schneiden – Acer palmatum Pflege` | **Japanische Ahorne – Acer palmatum & dissectum** | japanischer Ahorn schneiden | Acer palmatum Pflege, Ahorn Pilz |
| Philosophie | `/philosophie` | `Philosophie & Meister – japanische Gartenkunst` | **Vom Metall zur lebendigen Form** (+ H2 з ключем) | japanische Gartenkunst | Niwaki Meister, Dao Baumkunst |
| Galerie | `/galerie` | `Vorher / Nachher – Garten-Bonsai & Niwaki` | **Vorher / Nachher – meine Arbeit** | Gartenbonsai Vorher Nachher | Niwaki Beispiele |
| Preise | `/preise` | `Japanische Baumpflege – Preise & Kosten` | **Preise – Qualität statt Eile** | japanische Baumpflege Kosten | Niwaki Preis, Anfahrt |
| Blog A | `/blog/topiarschere` | `Topiarschere vs. Heckenschere – sauberer Schnitt` | **Warum ich mit der Topiarschere schneide** | Topiarschere | Formschnitt, sauberer Schnitt |
| Blog B | `/blog/boden-wurzeln` | `Akadama & Bonsai-Erde – der richtige Boden` | **Der Boden entscheidet: Akadama & Wurzeln** | Akadama Schweiz | Bonsai Erde, pH Wurzeln |
| Kontakt | `/kontakt` | `Kontakt & kostenlose Foto-Diagnose – Baumpflege` | **Senden Sie mir ein Foto** | Niwaki Gärtner buchen | Baumpflege Zürich Kontakt |

## Перший абзац — мусить нести ключ (приклади)
- **Start:** *„Als Meister für **Niwaki und Garten-Bonsai** in der **Region Zürich** forme ich japanische Ahorne, Kiefern und Nadelgehölze – seit 27 Jahren…“*
- **Leistungen:** *„Drei Kernbereiche: **Niwaki-Schnitt**, **japanische Ahorne (Acer palmatum)** und **Kiefer-Formschnitt**…“*
- **Preise:** *„Was kostet professionelle **japanische Baumpflege**? Vier Stunden gute Arbeit sind mehr wert als zwei schnelle…“*

## Alt-патерни (приклади)
- hero: `Niwaki / Garten-Bonsai von Viktor Baumarchitektur in der Region Zürich`
- before/after: `Japanischer Ahorn (Acer palmatum) vor und nach dem Formschnitt`
- master: `Viktor beim Formschnitt einer Kiefer (Pinus) mit der Topiarschere`

## Внутрішня перелінковка (анкор = ключ)
- Start → Leistungen анкором **„Kiefer-Formschnitt“**; Start → Galerie **„Vorher/Nachher“**; Leistungen → Blog A **„Topiarschere“**; усі → Kontakt **„kostenlose Foto-Diagnose“**.

## Фаза 2 (локальне SEO — потужно під Ads/багаті міста)
Гео-лендинги під топ-міста з [14](14_SEO_KEYWORDS.md) §C: `/niwaki-kuesnacht`, `/baumpflege-zollikon`, `/gartenbonsai-zuerichsee` — title `Niwaki & Baumpflege [Stadt]`, локальний H1, той самий контент-кор + локальний абзац. JSON-LD `areaServed` = ці міста.

## Технічне (Codex — додатково до §10)
- Один H1 на сторінку. Логічна ієрархія H2/H3 з вторинними ключами.
- `hreflang` DE↔EN; canonical; OpenGraph з title/desc вище.
- `sitemap.xml` з усіма сторінками; внутрішні лінки без orphan-сторінок.
- Швидкість = частина SEO (принцип [10](10_PRINCIPLES.md)) — уже вшито.
