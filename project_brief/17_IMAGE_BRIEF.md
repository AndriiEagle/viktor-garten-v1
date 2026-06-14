# 17 · IMAGE BRIEF — єдиний візуальний ДНК + промпти генерації

> Усі зображення мають ОДИН корінь (тип/жанр/настрій), щоб дизайн відчувався цілісним. Промпти — англійською (для gpt-image-1 / Midjourney). Імена файлів = з `MANIFEST.md` ([12](12_MASTER_BUILD_PROMPT.md) §7).
> 🛡️ **Анти-мутант (LOCK#015):** AI = для **атмосфери/фону/настрою/візій**; **реальні фото Віктора** = для доказового before/after конкретного дерева й обличчя. **Кожну AI-картинку візує Віктор** (ботанічна правильність). Close-up краще за повне складне дерево (AI менше галюцинує).

## 🎨 ВІЗУАЛЬНИЙ ДНК (передчуття всього дизайну)
- **Меседж кольором:** ЖИТТЯ, енергія, весна. Яскраво-живий зелений бонсай × глибоке синє швейцарське літнє небо × тепле сонце. Природні сильні контрасти зелене+синє+сонце.
- **Медіум:** фотореалізм, «знято на камеру» (full-frame, 35–85mm), редакторська садова фотографія. НЕ ілюстрація, НЕ очевидне CGI.
- **Світло:** ранкове-полуденне натуральне сонце, роса, прозоре повітря.
- **Сетинг:** преміум, але стриманий швейцарський — доглянутий сад/тераса біля елегантної сучасної вілли, натяк на Цюрихське озеро/пагорби. **Сад як святилище**: куточок із кріслом і кавою, місце відновлення енергії.
- **Грейд/консистентність:** однакова температура світла, однаковий «об'єктив», однаковий колор-грейд по всьому набору — наче один фотограф зняв усе.

## 🔑 SHARED PROMPT PREFIX (вставляти на початок КОЖНОГО промпта)
```
Photorealistic editorial photograph, shot on a full-frame camera 35–85mm, natural morning-to-midday Swiss summer light, vibrant living fresh-green foliage against a deep blue sky, crisp natural contrast, premium yet understated Swiss garden setting, calm and full of life-energy, fine detail, shallow depth of field where natural, no text, no watermark, no logo —
```
**SHARED NEGATIVE (додавати до всіх):**
```
cartoon, illustration, 3D render look, plastic, oversaturated HDR, mutated or unnatural foliage, botanically impossible branches, deformed, extra limbs, blurry, lowres, text, watermark, signature
```

## 🖼️ ПРОМПТИ ПО СЛОТАХ (PREFIX + специфіка)

**hero-garten.jpg** — фон героя (16:9, BG)
```
…a beautifully shaped Japanese garden-bonsai (niwaki pine, Pinus) on a manicured terrace beside an elegant modern Swiss villa, a quiet coffee corner with one chair, hints of Lake Zürich and distant green hills, morning sunlight and dew on vibrant green needles, deep blue sky, sense of a personal sanctuary.  --ar 16:9
```

**og-share.jpg** — прев'ю при шарингу (1200×630)
```
…a single striking, perfectly balanced niwaki pine in bright sunlight against deep blue sky, premium Swiss garden, generous empty space on one side for a wordmark, clean and high-end.  --ar 1.91:1
```

**vorher-dying-0X.jpg** — «до» (4:3, префер РЕАЛЬНЕ; AI лише як настрій, без конкретного дерева)
```
…a neglected garden conifer / bonsai losing its form: browning needles, dry dead inner branches, moss, dense thicketed crown, soft overcast light, melancholic but photorealistic, a once-valuable tree in decline.  --ar 4:3
```

**nachher-0X.jpg** — «після» (4:3, **префер РЕАЛЬНЕ фото Віктора**)
```
…the same type of tree restored: a vibrant, balanced, healthy niwaki with sculpted cloud-forms, fresh green needles, open airy crown, bright sunlight, deep blue sky, full of life.  --ar 4:3
```

**vision-jahr1.jpg / jahr2 / jahr3** — таймлайн візії (1:1, AI, Віктор візує)
```
…the same pine progressively refined over three years — Jahr 1: structured, dead wood removed; Jahr 2: directed, open form; Jahr 3: mature self-carrying cloud-form — consistent tree, same angle, vibrant green, blue sky.  --ar 1:1
```

**meister-hands-0X.jpg** — майстер за роботою (3:2, close-up = AI-safe; префер реальне для обличчя)
```
…close-up of weathered expert hands using fine sharp Japanese topiary scissors to pinch a young pine candle (Trieb), sunlit green needles, shallow depth of field, craftsmanship and precision.  --ar 3:2
```

**section-bg-XX.jpg** — делікатні фони секцій (16:9, дуже субтильні)
```
…soft, slightly out-of-focus background texture of sunlit green foliage and blue sky bokeh, calm, premium, lots of breathing space (for text overlay).  --ar 16:9
```

## 🇯🇵 РЕАЛЬНИЙ актив — НЕ генерувати
`japan-postkarte.jpg` — фото справжньої підписаної листівки-подяки від японського бренду бонсай-інструментів (Андрій має). Це **реальне фото**, кладеться як є в секцію «Anerkennung aus Japan». AI тут не потрібен.

## Розподіл AI vs РЕАЛЬНЕ (чесно)
| Слот | Джерело |
|---|---|
| hero / section-bg / og / vision-jahr | **AI** (атмосфера/настрій) — Віктор візує |
| vorher/nachher конкретного дерева | **РЕАЛЬНІ фото Віктора** (6 пар) — AI лише дубль настрою, де бракує |
| обличчя/руки майстра | **РЕАЛЬНІ** (довіра); AI close-up лише як заповнювач |

## Прив'язка
Імена файлів = `MANIFEST.md`. Аспекти вище. Формат AVIF/WebP, стиснення під принцип швидкості [10](10_PRINCIPLES.md). Дизайн-токени V4 ([12](12_MASTER_BUILD_PROMPT.md) §3) узгоджені з цим ДНК (зелений+небо+сонце+тепле золото).
