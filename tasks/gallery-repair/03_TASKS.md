# Gallery Repair Tasks

Work one task at a time. Each task has a unique acceptance marker. Do not mark a task complete unless its acceptance marker is present in `04_DECISION_LOG.md` or in the named report artifact.

Every task inherits:

- V1-only scope: do not change `v2/index.html` or `v2/**` relative to the pre-task baseline.
- Negative prompt and negative examples from `06_NEGATIVE_PROMPTS.md`.
- Anti-hallucination controls from `02_WORKFLOW.md`.
- Decision log is append-only.
- If a task changes or verifies active before/after roles, it may edit `tasks/gallery-repair/visual-role-verdicts.json` and must run `node tools/audit-gallery-roles.mjs`.

## T001 - Source Inventory

- Depends on: none
- Touch policy: bounded multi-file docs/report
- Allowed files:
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - `tasks/gallery-repair/reports/source-inventory.md`
- Read-only evidence:
  - `24062026/messages.html`
  - `24062026/photos/`
  - `Neuer Ordner/ChatExport_2026-06-22/result.json`
  - `Neuer Ordner/ChatExport_2026-06-22/photos/`
  - `Neuer Ordner/_codex_local_audio_analysis/transcripts.md`
  - `tools/photo-catalog.json`
- Must preserve: existing source exports, current catalog, current generator, all images
- Do: create a compact inventory of source photos, Telegram text snippets, dimensions/sizes when available, and likely relation to gallery repair
- Do not: edit catalog, generator, generated HTML, or images
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `T001`.
- Stop conditions: `BLOCKED_MISSING_CONTEXT`, `BLOCKED_SECRET_RISK`
- Validation: inventory names the source files, counts source images, and notes UTF-8 read method
- Acceptance marker: `T001_SOURCE_INVENTORY_COMPLETE`
- Rollback: delete only `reports/source-inventory.md` and append a correction row if needed

## T002 - Rendered Gallery Map

- Depends on: `T001_SOURCE_INVENTORY_COMPLETE`
- Touch policy: bounded multi-file docs/report
- Allowed files:
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - `tasks/gallery-repair/reports/rendered-gallery-map.md`
- Read-only evidence:
  - `tools/generate-site.mjs`
  - `tools/photo-catalog.json`
  - `galerie.html`
  - `en/galerie.html`
  - `uk/galerie.html`
  - `assets/img/foto/`
- Must preserve: generated pages, source files, all current gallery behavior
- Do: map every rendered gallery image, active case ID, modal panel, archive image, and unmatched/duplicate-looking asset candidate
- Do not: change any site source
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `T002`.
- Stop conditions: `BLOCKED_MISSING_CONTEXT`
- Validation: report lists active case IDs and any mismatch between generator and generated HTML
- Acceptance marker: `T002_RENDERED_GALLERY_MAP_COMPLETE`
- Rollback: delete only the report and append a correction row if needed

## T003 - Existing Active Case Review

- Depends on: `T002_RENDERED_GALLERY_MAP_COMPLETE`
- Touch policy: bounded multi-file
- Allowed files:
  - `tools/generate-site.mjs`
  - `tools/photo-catalog.json`
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - `tasks/gallery-repair/reports/existing-case-review.md`
  - generated pages only via `node tools/generate-site.mjs`
- Read-only evidence:
  - active case images in `assets/img/foto/02_pryklady-robit/`
  - current generated gallery HTML
  - relevant visual-audit contact sheets
- Must preserve: active case IDs unless a clear conflict is logged; modal open/close behavior; DE/EN/UK page generation
- Do: review `parviflora-crown-form`, `watereri-crown-structure`, and `hedge-niwaki-structure`; fix labels or series only when visual evidence supports it
- Do not: add dormant Terrace/Taxus cases in this task; do not delete images
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `T003`.
- Stop conditions: `BLOCKED_SCOPE_CONFLICT`, `BLOCKED_VALIDATION_IMPOSSIBLE`
- Validation:
  - `node tools/generate-site.mjs`
  - `node tools/audit-site.mjs`
  - `node tools/audit-gallery-roles.mjs`
- Acceptance marker: `T003_ACTIVE_CASES_VERIFIED`
- Rollback: restore only changed generator/catalog entries and regenerate pages

## T004 - Dormant Candidate Evaluation

- Depends on: `T002_RENDERED_GALLERY_MAP_COMPLETE`
- Touch policy: bounded multi-file docs/report
- Allowed files:
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - `tasks/gallery-repair/reports/dormant-candidates.md`
- Read-only evidence:
  - `tools/generate-site.mjs`
  - `tools/photo-catalog.json`
  - `assets/img/foto/02_pryklady-robit/`
  - `24062026/`
  - `Neuer Ordner/ChatExport_2026-06-22/`
  - `output/visual-audit/`
- Must preserve: no promotion of uncertain cases; no source changes
- Do: evaluate Terrace, Taxus, and other dormant candidates; classify each as `promote_ready`, `work_context_only`, `mistake_section`, `duplicate`, `reject`, or `needs_viktor_confirmation`
- Do not: edit generator or catalog in this task
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `T004`.
- Stop conditions: `BLOCKED_MISSING_CONTEXT`
- Validation: report includes evidence image filenames and reason for each recommendation
- Acceptance marker: `T004_DORMANT_CANDIDATES_CLASSIFIED`
- Rollback: delete only the report and append a correction row if needed

## REVIEW-001 - Review First Evidence And Active-Case Batch

- Depends on:
  - `T001_SOURCE_INVENTORY_COMPLETE`
  - `T002_RENDERED_GALLERY_MAP_COMPLETE`
  - `T003_ACTIVE_CASES_VERIFIED`
  - `T004_DORMANT_CANDIDATES_CLASSIFIED`
- Touch policy: report only
- Allowed files:
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - `tasks/gallery-repair/reports/review-001.md`
- Must preserve: completed reports and decision-log rows
- Do: review evidence consistency and active-case edits before schema or promotion tasks continue
- Do not: implement gallery changes
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `REVIEW`.
- Stop conditions: `BLOCKED`, `NEEDS_REWORK`
- Validation: reviewer confirms allowed files, evidence, acceptance markers, and unresolved risks
- Acceptance marker: `REVIEW001_EVIDENCE_BATCH_REVIEWED`
- Rollback: append correction row; do not rewrite old review rows

## T005 - Case Schema Extension If Needed

- Depends on:
  - `T003_ACTIVE_CASES_VERIFIED`
  - `REVIEW001_EVIDENCE_BATCH_REVIEWED`
- Touch policy: bounded multi-file
- Allowed files:
  - `tools/generate-site.mjs`
  - `assets/main.js`
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - generated pages only via `node tools/generate-site.mjs`
- Must preserve: existing case cards, modal open/close behavior, existing labels, current language support
- Do: extend gallery case schema/rendering only if multiple before/after columns cannot be expressed by existing `series.before`, `series.work`, and `series.after`
- Do not: redesign the full gallery; do not add new photo decisions in this task
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `T005`.
- Stop conditions: `BLOCKED_SCOPE_CONFLICT`, `BLOCKED_VALIDATION_IMPOSSIBLE`
- Validation:
  - `node tools/generate-site.mjs`
  - `node tools/audit-site.mjs`
  - `node tools/audit-gallery-roles.mjs`
- Acceptance marker: `T005_CASE_SCHEMA_READY`
- Rollback: restore only changed schema/rendering/JS blocks and regenerate pages

## T006 - Add Confirmed High-Quality Photos

- Depends on:
  - `T004_DORMANT_CANDIDATES_CLASSIFIED`
  - `T005_CASE_SCHEMA_READY`
- Touch policy: bounded multi-file
- Allowed files:
  - `tools/generate-site.mjs`
  - `tools/photo-catalog.json`
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - generated pages only via `node tools/generate-site.mjs`
- Must preserve: strict label rules, active case behavior, source image files
- Do: add only confirmed non-duplicate, high-quality images into the correct case or normal gallery section
- Do not: promote `needs_viktor_confirmation` images into strict before/after; do not delete image files
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `T006`.
- Stop conditions: `NEEDS_HUMAN_APPROVAL`, `BLOCKED_SCOPE_CONFLICT`
- Validation:
  - `node tools/generate-site.mjs`
  - `node tools/audit-site.mjs`
  - `node tools/audit-gallery-roles.mjs`
- Acceptance marker: `T006_CONFIRMED_PHOTOS_ADDED`
- Rollback: remove only the newly added references/metadata and regenerate pages

## T007 - De-Duplicate Prominent Display

- Depends on: `T006_CONFIRMED_PHOTOS_ADDED`
- Touch policy: bounded multi-file
- Allowed files:
  - `tools/generate-site.mjs`
  - `tools/photo-catalog.json`
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - generated pages only via `node tools/generate-site.mjs`
- Must preserve: source files, at least one best representative per confirmed work series
- Do: remove near-duplicate images from prominent display by removing references or marking catalog status; keep files on disk
- Do not: delete, rename, or compress originals
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `T007`.
- Stop conditions: `NEEDS_HUMAN_APPROVAL` for deletion; `BLOCKED_SCOPE_CONFLICT`
- Validation:
  - `node tools/generate-site.mjs`
  - `node tools/audit-site.mjs`
- Acceptance marker: `T007_PROMINENT_DUPLICATES_REMOVED`
- Rollback: restore removed references/metadata and regenerate pages

## REVIEW-002 - Review Implementation Batch

- Depends on:
  - `T005_CASE_SCHEMA_READY`
  - `T006_CONFIRMED_PHOTOS_ADDED`
  - `T007_PROMINENT_DUPLICATES_REMOVED`
- Touch policy: report only
- Allowed files:
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - `tasks/gallery-repair/reports/review-002.md`
- Do: verify dependencies, changed files, acceptance markers, labels, and rollback notes
- Do not: implement fixes directly; create a repair task recommendation if needed
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `REVIEW`.
- Stop conditions: `NEEDS_REWORK`, `BLOCKED`
- Validation: report states `PASS_VERIFIED`, `PASS_VERIFIED_WITH_LIMITS`, `NEEDS_REWORK`, or `BLOCKED`
- Acceptance marker: `REVIEW002_IMPLEMENTATION_BATCH_REVIEWED`
- Rollback: append correction row only

## T008 - Regenerate Localized Gallery Pages

- Depends on: `REVIEW002_IMPLEMENTATION_BATCH_REVIEWED`
- Touch policy: bounded multi-file
- Allowed files:
  - `tools/generate-site.mjs`
  - generated V1 site files produced by `node tools/generate-site.mjs`, excluding `v2/**`
  - `tasks/gallery-repair/04_DECISION_LOG.md`
- Must preserve: DE/EN/UK localization, header/footer, contact links, legal pages, blog pages
- Do: regenerate pages from source and inspect diffs for unintended unrelated churn
- Do not: manually hand-edit generated gallery pages; do not accept a `v2/**` content diff relative to pre-run baseline
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `T008`.
- Stop conditions: `BLOCKED_VALIDATION_IMPOSSIBLE`
- Validation:
  - `node tools/generate-site.mjs`
  - inspect `git diff -- galerie.html en/galerie.html uk/galerie.html tools/generate-site.mjs`
  - `node tools/audit-gallery-roles.mjs`
  - inspect `git diff -- v2` before and after generation; require no V2 change relative to baseline
- Acceptance marker: `T008_LOCALIZED_PAGES_REGENERATED`
- Rollback: restore source changes from prior task rollback and regenerate pages

## T009 - Local Audit And Browser QA

- Depends on: `T008_LOCALIZED_PAGES_REGENERATED`
- Touch policy: report only plus generated QA artifacts
- Allowed files:
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - `tasks/gallery-repair/reports/local-qa.md`
  - `output/visual-audit/`
- Must preserve: source and generated site files
- Do: run local audit and browser QA; capture or reference gallery desktop/mobile and modal evidence
- Do not: fix issues in this task unless explicitly converted into a repair task
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `T009`.
- Stop conditions: `BLOCKED_VALIDATION_IMPOSSIBLE`
- Validation:
  - `node tools/audit-site.mjs`
  - `node tools/audit-gallery-roles.mjs`
  - `node tools/qa-site-interactions.mjs`
- Acceptance marker: `T009_LOCAL_QA_COMPLETE`
- Rollback: remove only newly created QA report/artifacts if wrong

## T010 - Final Visual Review And Handoff

- Depends on: `T009_LOCAL_QA_COMPLETE`
- Touch policy: report only
- Allowed files:
  - `tasks/gallery-repair/04_DECISION_LOG.md`
  - `tasks/gallery-repair/reports/final-handoff.md`
- Must preserve: all previous decision-log history
- Do: summarize final gallery state, remaining uncertain images, validation commands/results, and any human review questions for Viktor
- Do not: make new gallery changes
- Negative prompt: see `06_NEGATIVE_PROMPTS.md`, section `T010`.
- Stop conditions: `NEEDS_REWORK`, `NEEDS_HUMAN_APPROVAL`
- Validation: final report references screenshots/contact sheets, `node tools/audit-gallery-roles.mjs`, and validation results
- Acceptance marker: `T010_FINAL_HANDOFF_COMPLETE`
- Rollback: append correction row only

## Task Selection Rule

If the next task depends on a missing acceptance marker, stop with `BLOCKED_MISSING_CONTEXT` and name the missing marker. Do not skip ahead.
