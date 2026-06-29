# T001 Source Inventory

Acceptance marker: `T001_SOURCE_INVENTORY_COMPLETE`

## Scope

This inventory is evidence-only for gallery repair. It does not classify final gallery cases, does not promote any source photo into a strict before/after pair, and does not change catalog, generator, generated HTML, V2, or image files.

Read method used for Telegram text: PowerShell `Get-Content -Encoding UTF8` and `ConvertFrom-Json` for JSON. `24062026/messages.html` and `Neuer Ordner/_codex_local_audio_analysis/transcripts.md` were checked for the replacement-character mojibake marker `�`; none was found in this session.

## Source Files Checked

| Source | Current evidence found | Size / count evidence | Gallery-repair relation |
| --- | --- | --- | --- |
| `24062026/messages.html` | Telegram HTML export with 2 full photo references and 2 thumbnail references. | 2,820 bytes; 4 `photos/...` refs. | Direct text evidence for Taxus/electric-hedge-trimmer mistake example. |
| `24062026/photos/` | 2 full JPGs plus 2 thumbnails. | 4 files; 1,530,078 bytes total. | Taxus close-up source photos; useful as negative/mistake evidence, not a strict before/after pair from T001 alone. |
| `Neuer Ordner/ChatExport_2026-06-22/result.json` | Telegram JSON export named `Musik`. | 49 messages; 8 photo messages; 32 audio/voice file messages; 9 text messages. | Contains site-review screenshots, one phone-held tree reference photo, and positioning text. Mostly context, not clean gallery source photography. |
| `Neuer Ordner/ChatExport_2026-06-22/photos/` | 8 JPG photo exports. | 8 files; 1,377,493 bytes total. | Mostly screenshots of site/gallery/pricing pages; one phone-held niwaki/pine reference image. |
| `Neuer Ordner/ChatExport_2026-06-22/voice_messages/` | Voice files linked from `result.json`. | 32 files; 31,708,064 bytes total. | Raw audio evidence exists locally; not copied into report. |
| `Neuer Ordner/_codex_local_audio_analysis/transcripts.md` | Local machine transcript summary. | 30,812 bytes; 201 lines; no mojibake marker found. | Useful context only because transcript quality is noisy; do not treat as final quote without manual check. |
| `tools/photo-catalog.json` | Current catalog source of truth for public photo metadata. | 147 entries; 67 entries in `02_pryklady-robit`. | Shows existing gallery-repair-relevant metadata and candidates that later tasks must visually verify. |

## Source Photo Inventory

| Source photo | Message evidence | Dimensions / bytes | Direct visual note from this session | Likely relation for later tasks |
| --- | --- | --- | --- | --- |
| `24062026/photos/photo_78@23-06-2026_18-33-18.jpg` | `messages.html`, message `266285`, 2026-06-23 18:33 | 2560x1920; 670,817 bytes | Close-up of Taxus/topiary surface with many pale, rough, uneven cut tips. | Taxus tool-quality/mistake evidence; not a final before/after label in T001. |
| `24062026/photos/photo_78@23-06-2026_18-33-18_thumb.jpg` | thumbnail for `photo_78` | 520x390; 60,176 bytes | Thumbnail derivative of same source photo. | Navigation/display derivative only; do not use as separate source evidence. |
| `24062026/photos/photo_79@23-06-2026_18-33-18.jpg` | `messages.html`, message `266286`, same timestamp | 2560x1920; 735,034 bytes | Second angle of same Taxus/topiary issue with rough pale cut tips and rounded forms in background. | Taxus tool-quality/mistake evidence; likely same message series as `photo_78`. |
| `24062026/photos/photo_79@23-06-2026_18-33-18_thumb.jpg` | thumbnail for `photo_79` | 520x390; 64,051 bytes | Thumbnail derivative of same source photo. | Navigation/display derivative only; do not use as separate source evidence. |
| `Neuer Ordner/ChatExport_2026-06-22/photos/photo_515@20-06-2026_15-02-41.jpg` | `result.json`, id `3405`, 2026-06-20 15:02:41 | 1280x720; 221,287 bytes | Laptop screenshot of Viktor site home hero. | Site/UI review context; not original tree evidence. |
| `Neuer Ordner/ChatExport_2026-06-22/photos/photo_516@20-06-2026_15-20-07.jpg` | `result.json`, id `3408`, 2026-06-20 15:20:07 | 960x1280; 152,803 bytes | Phone photo of gallery case detail/card area for terrace before/after. | Old/current gallery UI evidence; not clean source image evidence. |
| `Neuer Ordner/ChatExport_2026-06-22/photos/photo_517@20-06-2026_15-20-07.jpg` | `result.json`, id `3409`, same timestamp | 960x1280; 222,305 bytes | Phone photo of gallery cards; includes terrace pair and another case below. | Old/current gallery UI evidence; useful for T002 mapping/context only. |
| `Neuer Ordner/ChatExport_2026-06-22/photos/photo_518@20-06-2026_15-23-57.jpg` | `result.json`, id `3413`, 2026-06-20 15:23:57 | 720x1280; 117,168 bytes | Phone photo of gallery detail area with ladder/work pair visible. | Old/current gallery UI evidence; not original source image evidence. |
| `Neuer Ordner/ChatExport_2026-06-22/photos/photo_519@20-06-2026_15-31-29.jpg` | `result.json`, id `3416`, 2026-06-20 15:31:29 | 1280x960; 270,656 bytes | Laptop screenshot of gallery grid (`Fertige Bäume, Form und Arbeit`). | Rendered gallery context; useful for T002, not source case proof. |
| `Neuer Ordner/ChatExport_2026-06-22/photos/photo_520@20-06-2026_15-43-52.jpg` | `result.json`, id `3421`, 2026-06-20 15:43:52 | 960x1280; 177,856 bytes | Phone photo of blog/card area about pine candles. | Site content context; not before/after source evidence. |
| `Neuer Ordner/ChatExport_2026-06-22/photos/photo_521@20-06-2026_15-48-03.jpg` | `result.json`, id `3424`, 2026-06-20 15:48:03 | 720x1280; 87,952 bytes | Phone photo of pricing page. | Pricing/copy context; outside gallery photo repair. |
| `Neuer Ordner/ChatExport_2026-06-22/photos/photo_522@20-06-2026_16-00-41.jpg` | `result.json`, id `3429`, 2026-06-20 16:00:41 | 720x1280; 127,466 bytes | Phone-held image showing another phone screen with a shaped pine/niwaki in a garden. | Possible reference/context image only; not a clean gallery source unless Viktor confirms and a clean original exists. |

## Telegram Text Snippets

Short source snippets only; no raw transcript dump.

| Source | Local evidence | Short snippet / paraphrase | Use limit |
| --- | --- | --- | --- |
| `24062026/messages.html` | message `266285`, associated with `photo_78`/`photo_79` | "приклади стрижки Taxus Bacata звичайними електричними ножицями" and result is rough, uneven shoots; topiary shears produce full/even cuts. | Strong context that the Taxus photos are negative/tool-method evidence, not a positive before/after result. |
| `Neuer Ordner/ChatExport_2026-06-22/result.json` | message `3448`, 2026-06-22 20:59:18 | Requested top wording includes `Niwaki (Gartenbonsais) Pflege`, `Baumarchitektur`, `Pflege japanischer Ahorne`, `Kronengestaltung`, `Exklusive Gehölzpflege`. | Site positioning/copy context; not photo classification evidence. |
| `Neuer Ordner/_codex_local_audio_analysis/transcripts.md` | `audio_139@20-06-2026_15-20-23.ogg`, lines 21-25 | Machine transcript appears to mention a wrong placement in an "after" category and finding better after photos. | Context for why gallery repair exists; transcript is noisy and must not be quoted publicly without manual check. |
| `Neuer Ordner/_codex_local_audio_analysis/transcripts.md` | lines 97 and 199 | Mentions careful branch decisions, not rushing, future look of the tree, and Niwaki crown cleaning/old needles/fungal-risk topics. | Service-value context for later copy, not strict case-pair proof. |

## Catalog Inventory

`tools/photo-catalog.json` is an array with 147 entries.

Folder distribution observed in this session:

| Folder | Entries | Gallery-repair relevance |
| --- | ---: | --- |
| `02_pryklady-robit` | 67 | Primary before/after and work-example catalog area. |
| `03_galereya` | 22 | Finished tree/gallery context. |
| `05_nivaki-khmarky` | 20 | Niwaki/cloud-pruning examples and Watereri-related assets. |
| `07_viktor` | 10 | Viktor portraits/context; not gallery case proof. |
| `04_khvoyni` | 9 | Conifer examples. |
| `09_pomylky` | 4 | Mistake examples, including Taxus electric-hedge-trimmer files. |
| `06_yaponski-kleny` | 4 | Japanese maple examples. |
| `10_vidkrytka-yaponiya` | 3 | Japan/Kyoto background and philosophy context. |
| `08_fonovi` | 3 | Background images. |
| `_video` | 2 | Video entries. |
| `01_hero` | 2 | Hero/background. |
| `_brand` | 1 | Brand/logo. |

Top stage values observed:

| Stage | Entries |
| --- | ---: |
| `процес` | 34 |
| `до+після` | 32 |
| `final` | 15 |
| `до+після/перевірити` | 11 |
| `після` | 11 |
| `портрет` | 9 |
| `серія/приклад форми` | 6 |
| `mistake / electric hedge trimmer` | 2 |
| `before` | 2 |
| `work context / ladder visible` | 2 |

Important catalog observations for later tasks:

- `02_pryklady-robit` contains many `Pinus parviflora` entries, including `до+після/перевірити`; later tasks must verify visual continuity before strict labels.
- `02_pryklady-robit` currently includes `case-watereri-before.webp` and `case-watereri-after.webp`, plus `sosna-watereri-do-pislya-01.webp` through `04.webp`.
- `02_pryklady-robit` includes `hecke-niwaki-vorher-01.webp`, `hecke-niwaki-vorher-02.webp`, `hecke-niwaki-diagnose-01.webp`, `hecke-niwaki-arbeit-01.webp`, and `hecke-niwaki-nachher-01.webp`; this looks like a structured hedge/Niwaki series, but T001 does not validate it.
- `09_pomylky` contains `taxus-heckenschere-fehler-01.webp` and `taxus-heckenschere-fehler-02.webp` with stage `mistake / electric hedge trimmer`, matching the Taxus message in `24062026/messages.html`.

## Validation Evidence

- Source file counts checked with local filesystem reads.
- Telegram text read with UTF-8 method and spot-checked for mojibake marker.
- `result.json` parsed locally with `ConvertFrom-Json`; no hosted model used.
- Source image dimensions and file sizes checked via local `System.Drawing.Image`.
- Full source photos were visually inspected in this session with `view_image`.
- No generator command was run.
- `git diff -- v2` was inspected before this report; it already showed a pre-existing `v2/index.html` diff. T001 made no V2 edits and did not run the generator.

## Limits And Risks

- This inventory is not a final visual QA pass and does not approve any strict before/after pair.
- The transcript is machine-generated and noisy; use only as context unless manually checked against audio.
- `ChatExport_2026-06-22/photos/` is mostly photos of screens, not clean source images.
- The repository was already dirty before T001, including `v2/index.html`; preserve that baseline for future generator tasks.
