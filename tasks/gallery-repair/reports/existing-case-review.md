# T003 Existing Active Case Review

Timestamp: 2026-06-25 15:01

Acceptance marker: `T003_ACTIVE_CASES_VERIFIED`

## Scope

- Task: `T003 - Existing Active Case Review`
- V1-only files edited: `tools/generate-site.mjs`, generated `galerie.html`, `en/galerie.html`, `uk/galerie.html`, this report, and `04_DECISION_LOG.md`.
- V2 policy: `git diff -- v2` was recorded before `node tools/generate-site.mjs` and compared after generation. The post-run V2 diff matched the pre-run baseline.
- Images: no image files were deleted, renamed, compressed, or overwritten.
- Catalog: `tools/photo-catalog.json` was inspected but not edited.

## Evidence Checked

- Generator source: `tools/generate-site.mjs`
- Catalog source: `tools/photo-catalog.json`
- Generated pages: `galerie.html`, `en/galerie.html`, `uk/galerie.html`
- Active case image files in `assets/img/foto/02_pryklady-robit/`
- Local visual inspection with `view_image`

## Case Decisions

### `parviflora-crown-form`

Verdict: demoted from active strict before/after.

Evidence:
- `case-parviflora-before.webp` is a close crop with ladder/work context, not a clean strict before frame.
- `case-parviflora-after.webp` is a clean full-tree result image, but visible same-tree continuity from the cropped ladder frame is not strong enough for a strict client-facing before/after claim.
- `case-parviflora-before.webp` and `case-parviflora-after.webp` are not present in `tools/photo-catalog.json`.
- `sosna-bila-20.webp` is a detail/needle frame, not a work-context or after-result frame, so keeping it inside an active modal work series would be misleading.

Change:
- Removed `parviflora-crown-form` from `beforeAfterCases`.
- Kept the Parviflora files on disk unchanged.
- Left Parviflora case files excluded from normal gallery because the two `case-parviflora-*` files are not catalog-backed.

### `watereri-crown-structure`

Verdict: demoted from active strict before/after.

Evidence:
- `case-watereri-before.webp` and `case-watereri-after.webp` do not provide strong visible same-tree continuity as a strict pair; they appear to be different settings or at least insufficiently connected by the current evidence.
- `sosna-watereri-do-pislya-03.webp` and `sosna-watereri-do-pislya-04.webp` visually support the after/result setting, but they do not prove the strict before relation to `case-watereri-before.webp`.
- The catalog describes these as Watereri form/example photos, not as a verified strict before/after transformation.

Change:
- Removed `watereri-crown-structure` from `beforeAfterCases`.
- Removed `case-watereri-before.webp` and `case-watereri-after.webp` from `galleryExclusions`, so they now render as non-strict normal work-gallery examples instead of strict before/after proof.
- Kept all Watereri image files unchanged.

### `hedge-niwaki-structure`

Verdict: remains active and verified with limits.

Evidence:
- `hecke-niwaki-vorher-01.webp` and `hecke-niwaki-vorher-02.webp` show the same dense hedge/work series.
- `hecke-niwaki-diagnose-01.webp` shows internal condition/diagnosis and is correctly used as work context.
- `hecke-niwaki-arbeit-01.webp` shows ladder work on the same hedge series and is correctly used as work context.
- `hecke-niwaki-nachher-01.webp` shows the same hedge/site after work, with a calmer controlled line. The continuity is visually defensible for a client-facing before/work/after case.

Change:
- Kept `hedge-niwaki-structure` as the only active strict before/after case.

## Generated HTML Result

After generation, active case IDs in all localized V1 gallery pages are:

- `galerie.html`: `data-case-open=[hedge-niwaki-structure]`, `data-case-panel=[hedge-niwaki-structure]`
- `en/galerie.html`: `data-case-open=[hedge-niwaki-structure]`, `data-case-panel=[hedge-niwaki-structure]`
- `uk/galerie.html`: `data-case-open=[hedge-niwaki-structure]`, `data-case-panel=[hedge-niwaki-structure]`

Additional generated-page check:

- `parviflora-crown-form`: absent from generated gallery pages.
- `watereri-crown-structure`: absent from active case controls/panels.
- `case-watereri-before.webp` and `case-watereri-after.webp`: present in the normal work gallery in DE/EN/UK pages.

## Validation

- `git diff -- v2` before generation: pre-existing `v2/index.html` diff recorded.
- `node tools/generate-site.mjs`: passed, generated V1 static site.
- `git diff -- v2` after generation: matched pre-run baseline; no V2 side effect accepted.
- `node tools/audit-site.mjs`: `AUDIT PASSED: required files, SEO tags, JSON-LD, internal links, events and image manifest are present.`
- Inline generated-page check confirmed only `hedge-niwaki-structure` remains active in DE/EN/UK.

## Risks

- Parviflora and Watereri may still become usable as strict cases if Viktor supplies source confirmation or stronger same-tree/source-series evidence.
- The gallery now has one active strict case. That is more accurate, but visually less broad until T004/T006 evaluate and promote only confirmed candidates.
- `v2/index.html` remains pre-existing dirty and must be baselined before every later generator run.
