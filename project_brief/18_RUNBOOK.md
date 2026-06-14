# 18 · RUNBOOK — запуск Codex до живого сайту (Path A)

> Кроки для Андрія. Усе готове; це інструкція «натиснути кнопки».

## §0 · PRE-FLIGHT (зроблено мною ✅)
- Файли узгоджені. Виправлено: «one-page»→multipage. **Бренд = «Viktor Baumarchitektur»** (Віктор підтвердив 13.06; домен viktor-baumarchitektur.ch, IG @viktor.baumarchitektur, FB Viktor Baumarchitektur). ⚠️ Лого-файл каже «Viktor Bonsai» → узгодити wordmark.
- [12](12_MASTER_BUILD_PROMPT.md) коректно тягне канонічні: [13](13_COPY_DECK_DE.md) (копі), [14](14_SEO_KEYWORDS.md)/[15](15_ONPAGE_SEO.md) (SEO), [10](10_PRINCIPLES.md) (швидкість), [17](17_IMAGE_BRIEF.md) (картинки).
- 5 вершинок у плані, GEO+consent у §9/§10, acceptance-чеклист §14.

## §1 · ЩО ПОТРІБНО (акаунти)
- **GitHub** (репо для коду + твоє редагування).
- **Vercel** (безкоштовний деплой; логін через GitHub).
- **Codex** (доступ у тебе є).
- *(Пізніше: image-модель для §5, GA4/Google Ads/GBP-акаунти.)*

## §2 · КРОКИ
1. **Створи приватний репо** на GitHub, напр. `viktor-bonsai-site`.
2. **Поклади бриф у репо:** скопіюй усю папку `project_brief/` у репо як `/_brief/` (щоб Codex читав канонічні файли).
3. **Відкрий Codex** на цьому репо (cloud або CLI).
4. **Встав LAUNCH-PROMPT** (§3 нижче) — Codex почне будувати по §15, комітити, і самоперевірятись по §14.
5. **Дай йому доробити** (можливо кілька ітерацій — нормально, див. §8). Коли §14 зелений — каркас готовий.
6. **Деплой Vercel:** Add New Project → import репо → Deploy (статика, без налаштувань). Отримаєш URL.
7. **Кинь URL Віктору** на телефон → збирай фідбек ([16](16_GROWTH_LAYERS.md) §D: голос+скрін).

## §3 · LAUNCH-PROMPT (копіюй у Codex дослівно)
```
Read /_brief/12_MASTER_BUILD_PROMPT.md as your MASTER spec. Also read the files it references in /_brief/: 13_COPY_DECK_DE.md (canonical German copy — source of truth), 14_SEO_KEYWORDS.md, 15_ONPAGE_SEO.md, 10_PRINCIPLES.md, and 17_IMAGE_BRIEF.md (for image-slot NAMING only — do NOT generate images; use labeled placeholders per §7).

Build the COMPLETE multipage website (DE primary + EN mirror) exactly per file 12. Follow the EXECUTION ORDER in §15, commit after each step, and do NOT stop until every item in the §14 ACCEPTANCE CHECKLIST passes. Default theme = V4; generate theme-v1..v5 token files so themes are swappable. Where a real asset is missing, insert a clearly-labeled placeholder and list it in /assets/img/MANIFEST.md. Honor the GOAL FUNCTION and the ADD/CUT gate; keep it mobile-first and fast per file 10. Note any assumptions in README.md. Static HTML/CSS + minimal vanilla JS only, ready for Vercel.
```

## §4 · ПЛЕЙСХОЛДЕРИ ДЛЯ ЗАМІНИ (10 хв, коли матеріали від Віктора)
| Що | Де | Звідки |
|---|---|---|
| Лого | `/assets/img/logo.svg` | Віктор скине |
| Номер WhatsApp | `wa.me/<номер>` у CTA / main.js | Віктор |
| Фото 6 b/a + 3 майстер + 1 відгук | `/assets/img/` за іменами з `MANIFEST.md` | Віктор (Telegram) |
| GA4 ID | `G-XXXXXXX` | твій акаунт |
| Google Ads ID | `AW-XXXXXXX` | Віктор/Ads |
| Дані Impressum | `/impressum.html`, `/datenschutz.html` | Віктор |

## §5 · КАРТИНКИ (паралельно)
Бери промпти з [17](17_IMAGE_BRIEF.md) (з shared prefix) → image-модель (gpt-image-1 / Midjourney) → клади в `/assets/img/` за іменами `MANIFEST.md`. **Кожну AI-картинку візує Віктор** (ботаніка). Реальні фото — для before/after і обличчя.

## §6 · ЗМІНА ДИЗАЙН-НАПРЯМУ
Хочеш інший вигляд → у `<head>` поміняй лінк `theme-v4.css` → `theme-v2.css` (тощо), або відкрий `/themes.html`. Перебудова не потрібна.

## §7 · ФІНАЛЬНИЙ ЧЕКЛИСТ (handoff)
- [ ] Усі сторінки збудовані, навігація працює, 0 console-errors.
- [ ] Mobile-first ок на 390px; sticky-CTA; швидко на телефоні.
- [ ] CTA + аналітика-події + cookie-consent працюють.
- [ ] Theme-switch не ламає верстку.
- [ ] DE повний, EN дзеркало; SEO/schema/sitemap на місці.
- [ ] Задеплоєно на Vercel, лінк відкривається з телефона.

## §8 · ЧЕСНІ НОТАТКИ
- Codex може не зробити все за 1 хід — **нормально нудити «continue / fix the failing §14 items»**, поки не зелено. Це не баг.
- Перший вихід = дуже добра чернетка → **1 людський прохід-ревʼю** (дизайн-смак, німецькі слова Віктора).
- Реальний сайт оживає лише з реальними ассетами (§4) — але каркас можна показувати Віктору вже на плейсхолдерах.

---
**Готово до запуску. Усе сплановане — у файлах. Далі — твої руки на кнопці Codex.**
