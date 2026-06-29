# REVIEW-001 - Evidence And Active-Case Batch Review

Timestamp: 2026-06-25 15:25

Acceptance marker: `REVIEW001_EVIDENCE_BATCH_REVIEWED`

Gate outcome: `PASS_VERIFIED_WITH_LIMITS`

## Reviewed Scope

- Reviewed task IDs: `T001`, `T002`, `T003`, `T004`
- Required dependency markers checked in `04_DECISION_LOG.md`:
  - `T001_SOURCE_INVENTORY_COMPLETE`: present once
  - `T002_RENDERED_GALLERY_MAP_COMPLETE`: present once
  - `T003_ACTIVE_CASES_VERIFIED`: present once
  - `T004_DORMANT_CANDIDATES_CLASSIFIED`: present once
- Review files allowed for this task:
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - `tasks/gallery-repair/reports/review-001.md`

## Findings

### P2 - `01_STATE.md` Active Case List Is Stale

`tasks/gallery-repair/01_STATE.md` still lists `parviflora-crown-form`, `watereri-crown-structure`, and `hedge-niwaki-structure` as current active case IDs. Current generator and generated HTML now show only `hedge-niwaki-structure` after T003.

Evidence:
- Current `tools/generate-site.mjs`: `beforeAfterCases` contains only `hedge-niwaki-structure`.
- Current `galerie.html`, `en/galerie.html`, and `uk/galerie.html`: `data-case-open` and `data-case-panel` contain only `hedge-niwaki-structure`.

Impact:
- Non-blocking for T005 because the workflow explicitly says to re-check current files before trusting state docs, and T003/T004 reports plus current generator/HTML are consistent.
- Future workers should treat `01_STATE.md` active IDs as stale until a later docs/state maintenance task is allowed.

### P2 - T004 Has One Promote-Ready Candidate With Strict Framing Limits

Terrace / low Pinus parviflora is classified `promote_ready`, but only as a placement/installation before/after story. It is not evidence of pruning, crown correction, or rescue.

Evidence:
- `case-terrace-before.webp`, `case-terrace-after.webp`, `sosna-bila-do-pislya-27.webp`, `sosna-bila-do-pislya-28.webp`, and `sosna-bila-do-pislya-29.webp` visually support the same terrace placement series.
- `case-terrace-before.webp` and `case-terrace-after.webp` are missing from `tools/photo-catalog.json`.

Impact:
- Non-blocking for T005.
- T006 must add/fix catalog metadata before promoting this candidate, and copy must say placement/installation, not pruning.

### P3 - Dirty Worktree Requires Continued File-Ownership Discipline

The worktree is already dirty in many V1 files and `v2/index.html`. This review did not attempt to attribute all pre-existing changes.

Evidence:
- `git status --short -- tasks/gallery-repair tools/generate-site.mjs tools/photo-catalog.json galerie.html en/galerie.html uk/galerie.html v2` shows modified V1 source/generated files, modified `tools/photo-catalog.json`, modified `v2/index.html`, and untracked `tasks/gallery-repair/`.

Impact:
- Non-blocking. Future tasks must keep using the task allowlists and avoid reverting unrelated work.

## Verified Checks

### Dependencies

PASS. `T001`, `T002`, `T003`, and `T004` acceptance markers are present exactly once in `04_DECISION_LOG.md`.

### Allowed Files

PASS_WITH_LIMITS.

- T001 changed only source-inventory report and decision log.
- T002 changed only rendered-gallery-map report and decision log.
- T003 changed allowed generator/generated V1 files plus report and decision log.
- T004 changed only dormant-candidates report and decision log.
- Current dirty `tools/photo-catalog.json` is present in the worktree, but this review found no T004 claim that it was edited.

### Source Hierarchy

PASS. Reports follow the intended hierarchy:

- T001 used Telegram exports and catalog inventory.
- T002 mapped current generator and generated HTML.
- T003 used current active case images, catalog metadata, generator, generated HTML, visual inspection, generator run, and audit.
- T004 classified candidates from current catalog/generator/assets and fresh visual inspection, with Telegram Taxus source evidence.

### V2 Fence

PASS_WITH_LIMITS. `git diff -- v2` currently shows the same pre-existing `v2/index.html` diff already logged in earlier tasks. This review did not edit V2 and did not run the generator.

### Generated Pages And Image Attributes

PASS. Fresh read-only checks:

- `node tools/audit-site.mjs`: `AUDIT PASSED: required files, SEO tags, JSON-LD, internal links, events and image manifest are present.`
- Current generator active IDs: `hedge-niwaki-structure`
- `galerie.html`: open/panel IDs match generator; 139 images; 0 images missing `alt`, `width`, `height`, `loading`, or `decoding="async"`.
- `en/galerie.html`: open/panel IDs match generator; 139 images; 0 missing image attributes.
- `uk/galerie.html`: open/panel IDs match generator; 139 images; 0 missing image attributes.

### Before/After Label Defensibility

PASS_WITH_LIMITS.

- Active strict case `hedge-niwaki-structure` is visually defensible from T003 evidence.
- Parviflora and Watereri were demoted from strict active cases because visual/catalog evidence was not strong enough.
- T004 keeps Taxus source close-ups as `mistake_section`, not positive after images.
- T004 marks uncertain Parviflora, Watereri, and pine archive ranges as `needs_viktor_confirmation` or non-strict context.

### No Image Deletions/Renames

PASS. No task report or current review evidence indicates image deletion, rename, compression, or overwrite.

### Old Reports And Visual Audit

PASS. T004 explicitly treats old `output/visual-audit/` files as stale supporting evidence and bases final classifications on current files and fresh visual inspection.

## Required Repair Task

None before T005.

Recommended later cleanup:

- Update `01_STATE.md` when a docs/state-maintenance task is allowed, because its active case IDs are stale.
- Keep `case-terrace-before.webp` and `case-terrace-after.webp` out of active promotion until T006 can add/fix catalog metadata and implementation copy.

## Can Continue To

`T005 - Case Schema Extension If Needed`

Limit for T005:

- Do not make photo-selection decisions in T005.
- Existing `series.before`, `series.work`, and `series.after` likely can express the currently confirmed hedge case and future Terrace placement case; T005 should verify whether any schema change is actually needed rather than adding complexity by default.
