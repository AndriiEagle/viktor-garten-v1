# REVIEW-002 - Implementation Batch Review

Gate outcome: `PASS_VERIFIED_WITH_LIMITS`

## Reviewed Scope

- Tasks reviewed: `T005`, `T006`, `T007`
- Claimed markers:
  - `T005_CASE_SCHEMA_READY`
  - `T006_CONFIRMED_PHOTOS_ADDED`
  - `T007_PROMINENT_DUPLICATES_REMOVED`
- Current generator case IDs: `terrace-pinus-placement`, `hedge-niwaki-structure`
- Current generated pages reviewed: `galerie.html`, `en/galerie.html`, `uk/galerie.html`

## Findings

### P2 - Active/Support Image Assets Are Untracked In Git

Current `git status --short -- assets/img/foto/02_pryklady-robit assets/img/foto/09_pomylky` shows untracked image assets used or referenced by the repaired gallery/material:

- `assets/img/foto/02_pryklady-robit/hecke-niwaki-vorher-01.webp`
- `assets/img/foto/02_pryklady-robit/hecke-niwaki-vorher-02.webp`
- `assets/img/foto/02_pryklady-robit/hecke-niwaki-diagnose-01.webp`
- `assets/img/foto/02_pryklady-robit/hecke-niwaki-arbeit-01.webp`
- `assets/img/foto/02_pryklady-robit/hecke-niwaki-nachher-01.webp`
- `assets/img/foto/09_pomylky/taxus-heckenschere-fehler-01.webp`
- `assets/img/foto/09_pomylky/taxus-heckenschere-fehler-02.webp`

Impact:
- Local validation passes because the files exist on disk.
- A later commit/deploy handoff must explicitly include or otherwise account for these assets, or active/support image references may break outside this worktree.
- This is not a blocker for `T008` because `T008` is a regeneration/inspection task, not a publish or staging task.

### P3 - Some Older Catalog Slot Text Remains Broad

`tools/photo-catalog.json` now has `display_status` markers for `sosna-bila-do-pislya-27..32`, but some older `slot` strings still describe broad gallery usage.

Impact:
- Current rendering is correct because `tools/generate-site.mjs` controls display, and the generated pages confirm the duplicate frames are not prominent.
- This is a documentation/catalog-cleanup limit, not a rendering blocker.

## Checks

### Dependencies And Markers

PASS. Marker counts in `04_DECISION_LOG.md`:

- `T005_CASE_SCHEMA_READY`: 1
- `T006_CONFIRMED_PHOTOS_ADDED`: 1
- `T007_PROMINENT_DUPLICATES_REMOVED`: 1
- `REVIEW002_IMPLEMENTATION_BATCH_REVIEWED`: 0 before this report

### Allowed Files

PASS_WITH_LIMITS.

- T005 changed only `tasks/gallery-repair/04_DECISION_LOG.md`.
- T006 changed `tools/photo-catalog.json`, `tools/generate-site.mjs`, generated V1 gallery pages, and decision log.
- T007 changed `tools/photo-catalog.json`, `tools/generate-site.mjs`, generated V1 gallery pages, and decision log.
- No tracked image file diffs or tracked image deletions were detected with `git diff --name-status -- assets/img/foto` and `git diff --name-only --diff-filter=D -- assets/img/foto`.
- Untracked image assets are listed above as a packaging/handoff risk.

### Source Hierarchy

PASS. The implementation follows the intended hierarchy:

- T006 used T004 visual classification and local source images before promotion.
- `tools/photo-catalog.json` now contains catalog metadata for `case-terrace-before.webp` and `case-terrace-after.webp`.
- `tools/generate-site.mjs` defines the active cases and de-duplication display rules.
- Generated DE/EN/UK pages match the current generator case IDs.

### Strict Before/After Labels

PASS_WITH_LIMITS.

- `terrace-pinus-placement` is visually defensible as the same low Pinus parviflora placement series: `case-terrace-before.webp` shows protected/pre-placement context and `case-terrace-after.webp` shows the settled terrace placement. The copy stays limited to placement/installation, not pruning or rescue.
- `hedge-niwaki-structure` remains visually defensible as the same hedge/work series from dense block to calmer line, with work/diagnosis frames in context.
- Former Parviflora/Watereri/Taxus uncertain sequences remain out of strict before/after promotion.

### Duplicate Handling

PASS. Current DE/EN/UK generated pages show the intended Terrace duplicate handling:

- `sosna-bila-do-pislya-27.webp`: 0 rendered references
- `sosna-bila-do-pislya-28.webp`: 2 rendered references per page, only as Terrace modal support
- `sosna-bila-do-pislya-29.webp`: 0 rendered references
- `sosna-bila-do-pislya-30.webp`: 2 rendered references per page, single retained context frame
- `sosna-bila-do-pislya-31.webp`: 0 rendered references
- `sosna-bila-do-pislya-32.webp`: 0 rendered references

### Generated Pages And Image Attributes

PASS. Fresh checks:

- `node tools/audit-site.mjs`: `AUDIT PASSED: required files, SEO tags, JSON-LD, internal links, events and image manifest are present.`
- `galerie.html`, `en/galerie.html`, and `uk/galerie.html` have `data-case-open` and `data-case-panel` IDs matching `terrace-pinus-placement,hedge-niwaki-structure`.
- All three pages have 0 images missing `alt`, `width`, `height`, `loading`, or `decoding="async"` attributes in the review script.

### V2 Fence

PASS_WITH_LIMITS. `v2/index.html` remains pre-existing dirty. During this review, `node tools/audit-site.mjs` did not change the V2 diff:

- Before audit: 27-line `git diff -- v2`
- After audit: 27-line `git diff -- v2`
- Result: `V2_DIFF_UNCHANGED_DURING_AUDIT`

T006 and T007 decision-log rows also recorded successful generator runs with post-run V2 diff matching the 27-line baseline.

### No Hosted Model Or Secret Exposure

PASS. No DeepSeek or other hosted model was used in this review. No raw Telegram exports, full transcripts, `.env`, secrets, or workspace dumps were sent externally.

## Required Repair Task

None before `T008`.

Recommended later handoff note:

- Before any commit/publish handoff, explicitly handle the currently untracked image assets listed in the findings.
- If a catalog cleanup task is later allowed, narrow the older `slot` strings for `sosna-bila-do-pislya-27..32` to match their `display_status`.

## Can Continue To

`T008 - Regenerate Localized Gallery Pages`

Acceptance marker: `REVIEW002_IMPLEMENTATION_BATCH_REVIEWED`
