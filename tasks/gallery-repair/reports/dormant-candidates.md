# T004 Dormant Candidate Evaluation

Timestamp: 2026-06-25 15:18

Acceptance marker: `T004_DORMANT_CANDIDATES_CLASSIFIED`

## Scope

- Task: `T004 - Dormant Candidate Evaluation`
- Files changed in this task: this report and `tasks/gallery-repair/04_DECISION_LOG.md`.
- Source/generator/catalog/site files were read only.
- No generator run was performed.
- No image files were deleted, renamed, compressed, overwritten, or promoted.
- V2 was not edited. `git diff -- v2` was inspected and still shows the pre-existing `v2/index.html` dirty diff.

## Evidence Checked

- Current generator: `tools/generate-site.mjs`
- Current catalog: `tools/photo-catalog.json`
- Current generated pages: `galerie.html`, `en/galerie.html`, `uk/galerie.html`
- Public assets: `assets/img/foto/02_pryklady-robit/`
- Taxus source export: `24062026/messages.html`, `24062026/photos/photo_78@23-06-2026_18-33-18.jpg`, `24062026/photos/photo_79@23-06-2026_18-33-18.jpg`
- Secondary export sample: `Neuer Ordner/ChatExport_2026-06-22/photos/`
- Old visual-audit folder was listed only as stale supporting evidence; final classifications below are based on current local files and fresh visual inspection.

## Current Generator Context

- Current active gallery case after T003: `hedge-niwaki-structure`.
- `galleryExclusions` still excludes `case-parviflora-before.webp`, `case-parviflora-after.webp`, and active hedge case images.
- `lowCrownContextFiles` currently includes `case-terrace-after.webp`, `sosna-bila-do-pislya-30.webp`, `sosna-bila-do-pislya-31.webp`, and `sosna-bila-do-pislya-32.webp`.
- Current generated gallery pages render `case-terrace-after.webp` and `sosna-bila-do-pislya-30..32.webp` as context, not as active case cards.
- Current generated gallery pages do not render `case-terrace-before.webp`, `case-taxus-before.webp`, `case-taxus-after.webp`, `case-parviflora-before.webp`, or `case-parviflora-after.webp`.

## Candidate Classifications

| Candidate | Classification | Evidence files | Reason | Next use |
| --- | --- | --- | --- | --- |
| Terrace / low Pinus parviflora placement case | `promote_ready` with framing limit | `assets/img/foto/02_pryklady-robit/case-terrace-before.webp`; `case-terrace-after.webp`; `sosna-bila-do-pislya-27.webp`; `sosna-bila-do-pislya-28.webp`; `sosna-bila-do-pislya-29.webp` | Visual continuity supports the same low pine on the same terrace/garden series. The safe story is placement/installation: pre-placement/container/wrapped base to settled terrace position. It is not evidence of pruning/crown transformation. | Candidate for T006 as a strict placement before/after case if copy says placement/installation, not pruning. Add/fix catalog metadata first because `case-terrace-before.webp` and `case-terrace-after.webp` are not catalog-backed. |
| Terrace low-crown context extras | `duplicate` / `work_context_only` | `sosna-bila-do-pislya-30.webp`; `sosna-bila-do-pislya-31.webp`; `sosna-bila-do-pislya-32.webp` | These are after/context views of the same terrace garden and repeat the settled low-crown result. They add context but are too similar for prominent cards. | Use at most one as modal/context support; do not promote all into cards. |
| Taxus electric-shear source mistake | `mistake_section` | `24062026/messages.html:81`; `24062026/photos/photo_78@23-06-2026_18-33-18.jpg`; `24062026/photos/photo_79@23-06-2026_18-33-18.jpg`; `assets/img/foto/09_pomylky/taxus-heckenschere-fehler-01.webp`; `assets/img/foto/09_pomylky/taxus-heckenschere-fehler-02.webp` | Telegram source text describes ordinary electric shears on Taxus baccata and a bad result with protruding, poorly cut shoots. The images visually show rough upright cut stubs. This is negative/mistake evidence, not a positive after photo. | Keep for a mistake/education section or article. Do not use as a positive before/after case. |
| Taxus topiary/nursery work sequence | `work_context_only` plus `needs_viktor_confirmation` for strict pairing | `case-taxus-before.webp`; `case-taxus-after.webp`; `tys-01.webp`; `tys-02.webp`; `tys-03.webp`; `tys-04.webp`; `tys-05.webp`; `tys-do-pislya-06.webp`; `tys-do-pislya-07.webp`; `tys-do-pislya-08.webp`; `tys-do-pislya-09.webp`; `tys-do-pislya-10.webp`; `tys-do-pislya-11.webp`; `tys-do-pislya-12.webp`; `tys-do-pislya-13.webp` | Several images show the same or related shaped Taxus/topiary tree with ladder, clippings, process, and clean result angles. No clean unambiguous before frame was found. `case-taxus-before.webp` and `tys-do-pislya-06.webp` are effectively the same ladder/work-context view. The clean result frames are useful but not strict after proof without a verified before. | Do not promote as strict before/after. For normal gallery, choose one or two best result examples and avoid duplicate ladder/result angles. |
| Parviflora demoted case | `needs_viktor_confirmation` | `case-parviflora-before.webp`; `case-parviflora-after.webp`; `sosna-bila-19.webp`; `sosna-bila-20.webp`; `sosna-bila-22.webp` | The "before" is a close ladder/work-context crop; the "after" is a clean full-tree display image. Same-tree continuity is not strong enough. `sosna-bila-20.webp` is technical/detail material, not an after/work proof. `case-parviflora-*` files are not catalog-backed. | Keep out of strict gallery case promotion until Viktor confirms the relation or stronger source evidence is found. |
| Watereri demoted case | `needs_viktor_confirmation` | `case-watereri-before.webp`; `case-watereri-after.webp`; `sosna-watereri-do-pislya-01.webp`; `sosna-watereri-do-pislya-02.webp`; `sosna-watereri-do-pislya-03.webp`; `sosna-watereri-do-pislya-04.webp` | Catalog describes these as Watereri form/example photos. Visual review shows useful examples, but the former before/after pair does not prove one same-tree transformation; settings and angles differ too much. | Keep as normal gallery/example material. Do not restore as active strict case without confirmation. |
| Early Pinus parviflora archive range | `needs_viktor_confirmation` for strict pairing; normal examples only | `sosna-bila-do-pislya-01.webp`; `sosna-bila-do-pislya-02.webp`; `sosna-bila-do-pislya-03.webp`; `sosna-bila-do-pislya-04.webp`; `sosna-bila-do-pislya-05.webp` | Catalog says `до+після`, but sampled images show different trees/sites or finished/example states rather than a defensible before/after sequence. | Do not promote as strict case. Use only as normal gallery examples after duplicate review. |
| Pinus parviflora candle/detail range | `work_context_only` | `sosna-bila-do-pislya-12.webp`; `sosna-bila-do-pislya-13.webp`; `sosna-bila-do-pislya-14.webp`; `sosna-bila-do-pislya-15.webp` | `13` and `14` are technical detail/candle frames. `12` and `15` are finished/example views. The subseries does not provide a strict before/after pair by itself. | Useful for educational/process context, not active before/after promotion. |
| Later nursery/display pine range | `needs_viktor_confirmation` with duplicate risk | `sosna-bila-do-pislya-33.webp`; `sosna-bila-do-pislya-34.webp`; `sosna-bila-do-pislya-35.webp`; `sosna-bila-do-pislya-36.webp`; `sosna-bila-do-pislya-37.webp`; `sosna-bila-do-pislya-38.webp`; `sosna-bila-do-pislya-39.webp`; `sosna-bila-do-pislya-40.webp`; `sosna-bila-do-pislya-41.webp`; `sosna-bila-do-pislya-42.webp`; `sosna-bila-do-pislya-43.webp` | Catalog says `до+після/перевірити`, and visual samples show nursery/display stock or multiple high-quality tree examples, not a verified transformation. Several frames are likely redundant for prominent display. | Do not promote as strict cases. Later duplicate review should keep only the best normal-gallery representatives. |
| 2026-06-22 source export photos | `reject` for gallery promotion | `Neuer Ordner/ChatExport_2026-06-22/photos/photo_515@20-06-2026_15-02-41.jpg`; `photo_520@20-06-2026_15-43-52.jpg`; `photo_522@20-06-2026_16-00-41.jpg` | Sampled files are site screenshots or a phone-screen reference image, not direct source photos suitable for a public before/after gallery case. | Do not use for gallery case promotion unless Viktor supplies the original underlying photo separately. |

## Promote-Ready Summary

Only one dormant candidate is promote-ready from this batch:

- Terrace / low Pinus parviflora placement case.

Limits:

- Promote only as before/after placement or installation, not as pruning/crown correction.
- Use one pre-placement frame and one clean after-placement frame.
- Add/fix catalog metadata before implementation because `case-terrace-before.webp` and `case-terrace-after.webp` are missing from `tools/photo-catalog.json`.
- Treat `sosna-bila-do-pislya-30..32.webp` as supporting context/duplicates, not as extra prominent proof.

## Not Promote-Ready

- Taxus source close-ups: `mistake_section`.
- Taxus topiary/tree sequence: `work_context_only` / `needs_viktor_confirmation`.
- Parviflora demoted pair: `needs_viktor_confirmation`.
- Watereri demoted pair: `needs_viktor_confirmation`.
- Pinus parviflora archive ranges `01..05`, `12..15`, `33..43`: not strict case material without confirmation and duplicate review.
- 2026-06-22 screenshots/phone-screen reference: `reject` for gallery promotion.

## Validation

- Confirmed T004 dependency marker `T002_RENDERED_GALLERY_MAP_COMPLETE` in `04_DECISION_LOG.md`.
- Read the T004 task and T004 negative prompt before classification.
- Parsed `tools/photo-catalog.json` for `02_pryklady-robit` entries and specific `case-*` files.
- Checked current generated DE/EN/UK gallery references for dormant candidate filenames.
- Inspected current image files visually with `view_image`.
- Inspected `git status --short` and `git diff -- v2`.
- Did not run `node tools/generate-site.mjs`; T004 is report-only and does not permit source/site edits.
