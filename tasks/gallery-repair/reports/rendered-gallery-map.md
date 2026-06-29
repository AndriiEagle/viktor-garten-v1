# T002 Rendered Gallery Map

Acceptance marker: `T002_RENDERED_GALLERY_MAP_COMPLETE`

## Scope

This is a read-only map of the current V1 rendered gallery usage. It does not change `tools/generate-site.mjs`, `tools/photo-catalog.json`, generated gallery HTML, V2, or image files.

Evidence read in this session:

- `tools/generate-site.mjs`
- `tools/photo-catalog.json`
- `galerie.html`
- `en/galerie.html`
- `uk/galerie.html`
- `assets/img/foto/`

Generator was not run.

## Generator Rules Observed

Current gallery rendering is driven by `tools/generate-site.mjs`:

- `beforeAfterCases` starts at line 495 and currently contains 3 active case IDs.
- `galleryCaseStudies()` renders:
  - one `.case-card` per active case;
  - one shared `.case-modal`;
  - one `[data-case-panel]` per active case.
- `galleryPage()` renders, in order:
  - active before/after cases;
  - one collapsed `.gallery-archive` from `beforeAfterGalleryItems()`;
  - the main work grid from `workGalleryItems()`;
  - extra sections for garden context, low-crown context, Niwaki/cloud forms, conifers, maples, Viktor, and care details.
- `galleryExclusions` excludes active case assets and `03_galereya/sosna-bila-21.webp` from the normal grid.
- `lowCrownContextFiles` moves `case-terrace-after.webp` and `sosna-bila-do-pislya-30.webp` through `32.webp` out of the before/after archive and into the low-crown context section.

## Generated Page Cross-Check

Normalized `foto/...` image references were extracted from the three current gallery HTML files.

| Page | `foto/...` img references | Unique `foto/...` assets | Same normalized asset set as DE | Case cards | Case panels | Modal count |
| --- | ---: | ---: | --- | ---: | ---: | ---: |
| `galerie.html` | 149 | 137 | yes | 3 | 3 | 1 |
| `en/galerie.html` | 149 | 137 | yes | 3 | 3 | 1 |
| `uk/galerie.html` | 149 | 137 | yes | 3 | 3 | 1 |

Full page `img` references, including non-gallery images such as logos, were also checked:

| Page | Total `img` refs | Missing local files |
| --- | ---: | ---: |
| `galerie.html` | 151 | 0 |
| `en/galerie.html` | 151 | 0 |
| `uk/galerie.html` | 151 | 0 |

Image attribute check on `galerie.html`: 151 of 151 `img` tags have `alt`, `loading`, `decoding`, `width`, and `height`.

## Generator Vs Generated HTML Mismatch

No mismatch found in this session.

| Check | Result |
| --- | --- |
| Active case IDs in `tools/generate-site.mjs` vs `data-case-open` in all generated gallery pages | match |
| Active case IDs in `tools/generate-site.mjs` vs `data-case-panel` in all generated gallery pages | match |
| Expected generator-derived unique `foto/...` assets vs `galerie.html` unique `foto/...` assets | match, 137 assets |
| DE/EN/UK normalized gallery asset sets | match |
| Missing generated image files | none |

## Active Case IDs And Modal Panels

Each page has the same case-card and modal-panel IDs:

- `parviflora-crown-form`
- `watereri-crown-structure`
- `hedge-niwaki-structure`

Modal structure per language page:

- one `<div class="case-modal" data-case-modal hidden aria-hidden="true">`
- two `[data-case-close]` controls
- three `[data-case-panel]` panels matching the three `[data-case-open]` cards

## Active Case Image Map

These are rendered as prominent case cards and/or inside the modal. This table maps current usage only; it does not verify that each strict role is visually defensible.

| Case ID | Rendered role | Image path |
| --- | --- | --- |
| `parviflora-crown-form` | card preview before; modal pair before | `foto/02_pryklady-robit/case-parviflora-before.webp` |
| `parviflora-crown-form` | card preview after; modal pair after | `foto/02_pryklady-robit/case-parviflora-after.webp` |
| `parviflora-crown-form` | modal work context; also normal work grid | `foto/02_pryklady-robit/sosna-bila-20.webp` |
| `parviflora-crown-form` | modal after; also normal work grid | `foto/02_pryklady-robit/sosna-bila-19.webp` |
| `parviflora-crown-form` | modal after; also normal work grid | `foto/02_pryklady-robit/sosna-bila-22.webp` |
| `watereri-crown-structure` | card preview before; modal pair before | `foto/02_pryklady-robit/case-watereri-before.webp` |
| `watereri-crown-structure` | card preview after; modal pair after | `foto/02_pryklady-robit/case-watereri-after.webp` |
| `watereri-crown-structure` | modal before/work context; also before/after archive | `foto/02_pryklady-robit/sosna-watereri-do-pislya-01.webp` |
| `watereri-crown-structure` | modal after; also before/after archive | `foto/02_pryklady-robit/sosna-watereri-do-pislya-03.webp` |
| `watereri-crown-structure` | modal after; also before/after archive | `foto/02_pryklady-robit/sosna-watereri-do-pislya-04.webp` |
| `hedge-niwaki-structure` | modal before/work context | `foto/02_pryklady-robit/hecke-niwaki-vorher-01.webp` |
| `hedge-niwaki-structure` | card preview before; modal pair before | `foto/02_pryklady-robit/hecke-niwaki-vorher-02.webp` |
| `hedge-niwaki-structure` | modal work context | `foto/02_pryklady-robit/hecke-niwaki-diagnose-01.webp` |
| `hedge-niwaki-structure` | modal work context | `foto/02_pryklady-robit/hecke-niwaki-arbeit-01.webp` |
| `hedge-niwaki-structure` | card preview after; modal pair after | `foto/02_pryklady-robit/hecke-niwaki-nachher-01.webp` |

## Before/After Archive Images

Current `.gallery-archive` contains 35 unique image assets:

| # | Image path |
| ---: | --- |
| 1 | `foto/02_pryklady-robit/sosna-bila-do-pislya-01.webp` |
| 2 | `foto/02_pryklady-robit/sosna-bila-do-pislya-02.webp` |
| 3 | `foto/02_pryklady-robit/sosna-bila-do-pislya-03.webp` |
| 4 | `foto/02_pryklady-robit/sosna-bila-do-pislya-04.webp` |
| 5 | `foto/02_pryklady-robit/sosna-bila-do-pislya-05.webp` |
| 6 | `foto/02_pryklady-robit/sosna-bila-do-pislya-12.webp` |
| 7 | `foto/02_pryklady-robit/sosna-bila-do-pislya-13.webp` |
| 8 | `foto/02_pryklady-robit/sosna-bila-do-pislya-14.webp` |
| 9 | `foto/02_pryklady-robit/sosna-bila-do-pislya-15.webp` |
| 10 | `foto/02_pryklady-robit/sosna-bila-do-pislya-27.webp` |
| 11 | `foto/02_pryklady-robit/sosna-bila-do-pislya-28.webp` |
| 12 | `foto/02_pryklady-robit/sosna-bila-do-pislya-29.webp` |
| 13 | `foto/02_pryklady-robit/sosna-bila-do-pislya-33.webp` |
| 14 | `foto/02_pryklady-robit/sosna-bila-do-pislya-34.webp` |
| 15 | `foto/02_pryklady-robit/sosna-bila-do-pislya-35.webp` |
| 16 | `foto/02_pryklady-robit/sosna-bila-do-pislya-36.webp` |
| 17 | `foto/02_pryklady-robit/sosna-bila-do-pislya-37.webp` |
| 18 | `foto/02_pryklady-robit/sosna-bila-do-pislya-38.webp` |
| 19 | `foto/02_pryklady-robit/sosna-bila-do-pislya-39.webp` |
| 20 | `foto/02_pryklady-robit/sosna-bila-do-pislya-40.webp` |
| 21 | `foto/02_pryklady-robit/sosna-bila-do-pislya-41.webp` |
| 22 | `foto/02_pryklady-robit/sosna-bila-do-pislya-42.webp` |
| 23 | `foto/02_pryklady-robit/sosna-bila-do-pislya-43.webp` |
| 24 | `foto/02_pryklady-robit/sosna-watereri-do-pislya-01.webp` |
| 25 | `foto/02_pryklady-robit/sosna-watereri-do-pislya-02.webp` |
| 26 | `foto/02_pryklady-robit/sosna-watereri-do-pislya-03.webp` |
| 27 | `foto/02_pryklady-robit/sosna-watereri-do-pislya-04.webp` |
| 28 | `foto/02_pryklady-robit/tys-do-pislya-06.webp` |
| 29 | `foto/02_pryklady-robit/tys-do-pislya-07.webp` |
| 30 | `foto/02_pryklady-robit/tys-do-pislya-08.webp` |
| 31 | `foto/02_pryklady-robit/tys-do-pislya-09.webp` |
| 32 | `foto/02_pryklady-robit/tys-do-pislya-10.webp` |
| 33 | `foto/02_pryklady-robit/tys-do-pislya-11.webp` |
| 34 | `foto/02_pryklady-robit/tys-do-pislya-12.webp` |
| 35 | `foto/02_pryklady-robit/tys-do-pislya-13.webp` |

## Main Work Grid Images

Current main work grid contains 43 unique image assets:

| # | Image path |
| ---: | --- |
| 1 | `foto/03_galereya/sosna-bila-01.webp` |
| 2 | `foto/03_galereya/sosna-bila-02.webp` |
| 3 | `foto/03_galereya/sosna-bila-03.webp` |
| 4 | `foto/03_galereya/sosna-bila-04.webp` |
| 5 | `foto/03_galereya/sosna-bila-05.webp` |
| 6 | `foto/03_galereya/sosna-bila-06.webp` |
| 7 | `foto/03_galereya/sosna-bila-07.webp` |
| 8 | `foto/03_galereya/sosna-bila-08.webp` |
| 9 | `foto/03_galereya/sosna-bila-09.webp` |
| 10 | `foto/03_galereya/sosna-bila-10.webp` |
| 11 | `foto/03_galereya/sosna-bila-11.webp` |
| 12 | `foto/03_galereya/sosna-bila-12.webp` |
| 13 | `foto/03_galereya/sosna-bila-13.webp` |
| 14 | `foto/03_galereya/sosna-bila-14.webp` |
| 15 | `foto/03_galereya/sosna-bila-15.webp` |
| 16 | `foto/03_galereya/sosna-bila-16.webp` |
| 17 | `foto/03_galereya/sosna-bila-17.webp` |
| 18 | `foto/03_galereya/sosna-bila-18.webp` |
| 19 | `foto/03_galereya/sosna-bila-19.webp` |
| 20 | `foto/03_galereya/sosna-bila-20.webp` |
| 21 | `foto/03_galereya/sosna-girska-01.webp` |
| 22 | `foto/02_pryklady-robit/sosna-bila-06.webp` |
| 23 | `foto/02_pryklady-robit/sosna-bila-07.webp` |
| 24 | `foto/02_pryklady-robit/sosna-bila-08.webp` |
| 25 | `foto/02_pryklady-robit/sosna-bila-09.webp` |
| 26 | `foto/02_pryklady-robit/sosna-bila-10.webp` |
| 27 | `foto/02_pryklady-robit/sosna-bila-11.webp` |
| 28 | `foto/02_pryklady-robit/sosna-bila-16.webp` |
| 29 | `foto/02_pryklady-robit/sosna-bila-17.webp` |
| 30 | `foto/02_pryklady-robit/sosna-bila-18.webp` |
| 31 | `foto/02_pryklady-robit/sosna-bila-19.webp` |
| 32 | `foto/02_pryklady-robit/sosna-bila-20.webp` |
| 33 | `foto/02_pryklady-robit/sosna-bila-21.webp` |
| 34 | `foto/02_pryklady-robit/sosna-bila-22.webp` |
| 35 | `foto/02_pryklady-robit/sosna-bila-23.webp` |
| 36 | `foto/02_pryklady-robit/sosna-bila-24.webp` |
| 37 | `foto/02_pryklady-robit/sosna-bila-25.webp` |
| 38 | `foto/02_pryklady-robit/sosna-bila-26.webp` |
| 39 | `foto/02_pryklady-robit/tys-01.webp` |
| 40 | `foto/02_pryklady-robit/tys-02.webp` |
| 41 | `foto/02_pryklady-robit/tys-03.webp` |
| 42 | `foto/02_pryklady-robit/tys-04.webp` |
| 43 | `foto/02_pryklady-robit/tys-05.webp` |

## Extra Gallery Sections

| Section | Count | Image paths |
| --- | ---: | --- |
| Garden context | 2 | `foto/01_hero/hero-sad-01.webp`; `foto/01_hero/hero-sad-02.webp` |
| Low-crown garden context | 4 | `foto/02_pryklady-robit/case-terrace-after.webp`; `foto/02_pryklady-robit/sosna-bila-do-pislya-30.webp`; `foto/02_pryklady-robit/sosna-bila-do-pislya-31.webp`; `foto/02_pryklady-robit/sosna-bila-do-pislya-32.webp` |
| Niwaki/cloud forms | 21 | `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-01.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-02.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-03.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-04.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-05.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-06.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-07.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-08.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-09.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-10.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-11.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-12.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-13.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-14.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-15.webp`; `foto/05_nivaki-khmarky/sosna-watereri-do-pislya-16.webp`; `foto/05_nivaki-khmarky/yalivets-01.webp`; `foto/05_nivaki-khmarky/yalivets-02.webp`; `foto/05_nivaki-khmarky/yalivets-03.webp`; `foto/05_nivaki-khmarky/yalivets-04.webp`; `foto/06_yaponski-kleny/klen-yaponskyi-01.webp` |
| Conifers | 9 | `foto/04_khvoyni/sosna-avstr-01.webp`; `foto/04_khvoyni/sosna-avstr-02.webp`; `foto/04_khvoyni/sosna-chorna-01.webp`; `foto/04_khvoyni/sosna-chorna-02.webp`; `foto/04_khvoyni/sosna-chorna-03.webp`; `foto/04_khvoyni/sosna-chorna-04.webp`; `foto/04_khvoyni/sosna-chorna-05.webp`; `foto/04_khvoyni/sosna-girska-01.webp`; `foto/04_khvoyni/sosna-girska-02.webp` |
| Maples | 3 | `foto/06_yaponski-kleny/klen-yaponskyi-02.webp`; `foto/06_yaponski-kleny/klen-yaponskyi-03.webp`; `foto/06_yaponski-kleny/klen-yaponskyi-04.webp` |
| Viktor at work | 7 | `foto/07_viktor/viktor-01.webp`; `foto/07_viktor/viktor-02.webp`; `foto/07_viktor/viktor-03.webp`; `foto/07_viktor/viktor-07.webp`; `foto/07_viktor/viktor-08.webp`; `foto/07_viktor/viktor-09.webp`; `foto/07_viktor/viktor-10.webp` |
| Care details | 4 | `foto/09_pomylky/pomylka-svichka-01.webp`; `foto/09_pomylky/pomylka-svichka-02.webp`; `foto/09_pomylky/taxus-heckenschere-fehler-01.webp`; `foto/09_pomylky/taxus-heckenschere-fehler-02.webp` |

## Repeated Rendered Assets

These assets appear more than once on `galerie.html`. Some repetition is structural, for example card preview plus modal pair. Others are active-case images that also remain in normal archive/work grids and should be reviewed later for duplicate prominence.

| Occurrences | Image path | Current reason |
| ---: | --- | --- |
| 2 | `foto/02_pryklady-robit/case-parviflora-before.webp` | card preview + modal pair |
| 2 | `foto/02_pryklady-robit/case-parviflora-after.webp` | card preview + modal pair |
| 2 | `foto/02_pryklady-robit/case-watereri-before.webp` | card preview + modal pair |
| 2 | `foto/02_pryklady-robit/case-watereri-after.webp` | card preview + modal pair |
| 2 | `foto/02_pryklady-robit/hecke-niwaki-vorher-02.webp` | card preview + modal pair |
| 2 | `foto/02_pryklady-robit/hecke-niwaki-nachher-01.webp` | card preview + modal pair |
| 2 | `foto/02_pryklady-robit/sosna-bila-19.webp` | active case modal + main work grid |
| 2 | `foto/02_pryklady-robit/sosna-bila-20.webp` | active case modal + main work grid |
| 2 | `foto/02_pryklady-robit/sosna-bila-22.webp` | active case modal + main work grid |
| 2 | `foto/02_pryklady-robit/sosna-watereri-do-pislya-01.webp` | active case modal + before/after archive |
| 2 | `foto/02_pryklady-robit/sosna-watereri-do-pislya-03.webp` | active case modal + before/after archive |
| 2 | `foto/02_pryklady-robit/sosna-watereri-do-pislya-04.webp` | active case modal + before/after archive |

## Unmatched Assets

There are 154 local image files under `assets/img/foto/`. Of those, 137 unique `foto/...` assets are rendered by `galerie.html`; 17 are not rendered on the gallery page.

Gallery-repair-relevant unmatched files in `02_pryklady-robit`:

- `foto/02_pryklady-robit/case-taxus-after.webp`
- `foto/02_pryklady-robit/case-taxus-before.webp`
- `foto/02_pryklady-robit/case-terrace-before.webp`

Other unmatched files:

- `foto/01_hero/hero-viktor-bonsai-main.webp`
- `foto/01_hero/hero-viktor-bonsai-mobile.webp`
- `foto/03_galereya/sosna-bila-21.webp`
- `foto/07_viktor/viktor-04.webp`
- `foto/07_viktor/viktor-05.webp`
- `foto/07_viktor/viktor-06.webp`
- `foto/07_viktor/viktor-contact.jpg`
- `foto/08_fonovi/fon-foto-01.webp`
- `foto/08_fonovi/fon-foto-02.webp`
- `foto/08_fonovi/fon-sosna-bila-01.webp`
- `foto/10_vidkrytka-yaponiya/kyoto-garden-2009.webp`
- `foto/10_vidkrytka-yaponiya/kyoto-viktor-wife-2009.webp`
- `foto/10_vidkrytka-yaponiya/vidkrytka-yaponiya-01.webp`
- `foto/_brand/logo-viktor-01.webp`

## Duplicate-Looking Candidate Groups

This is filename/placement evidence only, not final duplicate classification. Later visual review must compare angle, focus, and client value.

| Candidate group | Files / folders | Why it needs later review |
| --- | --- | --- |
| Same `sosna-bila-*` basenames across `02_pryklady-robit` and `03_galereya` | `sosna-bila-06.webp` through `11.webp`, `16.webp` through `21.webp` appear across both folders | Same basename across two gallery contexts can hide near-duplicate promotion or folder-role confusion. |
| Watereri sequence duplicated across work/example folders | `sosna-watereri-do-pislya-01.webp` through `04.webp` appear in both `02_pryklady-robit` and `05_nivaki-khmarky` | Similar naming and subject can confuse archive vs Niwaki/cloud section usage. |
| Same mountain-pine basename across folders | `sosna-girska-01.webp` appears in `03_galereya` and `04_khvoyni` | May be a legitimate cross-section example or a duplicate display candidate. |
| Dormant Terrace/Taxus case files | `case-terrace-before.webp`, `case-taxus-before.webp`, `case-taxus-after.webp` | Current generator does not render these as active cases; T004 should decide whether they are context, mistake, reject, duplicate, or need Viktor confirmation. |

## Validation Evidence

- `git status --short` inspected before T002 edits; worktree was already dirty.
- `git diff -- v2` inspected before T002 edits; `v2/index.html` had a pre-existing diff.
- `tools/generate-site.mjs` was read directly; no generated source was changed.
- `galerie.html`, `en/galerie.html`, and `uk/galerie.html` were parsed read-only for `data-case-open`, `data-case-panel`, `data-case-modal`, `data-case-close`, `img src`, and image attributes.
- Local filesystem checked every generated `img src` path exists.
- No hosted model used.
- No generator command run, so there was no generator-side V2 risk in this task.

## Limits And Risks

- This report maps current rendering; it does not visually approve strict before/after labels.
- Repeated rendered assets are not automatically wrong, but `sosna-bila-19.webp`, `sosna-bila-20.webp`, `sosna-bila-22.webp`, and Watereri `do-pislya` files currently appear both in active cases and in broader grids/archive.
- Dormant `case-taxus-*` and `case-terrace-before.webp` remain unrendered gallery-repair candidates and should not be promoted without T004/T006 evidence.
