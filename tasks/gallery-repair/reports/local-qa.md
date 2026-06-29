# T009 - Local Audit And Browser QA

Result label: PASS_VERIFIED_WITH_LIMITS

Acceptance marker: T009_LOCAL_QA_COMPLETE

## Scope

- Task: T009 only.
- Site scope: V1 public static site.
- Source/generator pages: preserved; no intentional source or generated HTML edits in this task.
- V2: inspected before and after validation; no change relative to the T009 baseline.

## Validation

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/audit-site.mjs` | VERIFIED, exit 0 | `output/visual-audit/t009-local-qa/audit-site.log` |
| `node tools/qa-site-interactions.mjs` | VERIFIED, exit 0 | 80 page/viewport checks, 0 issues; `output/visual-audit/t009-local-qa/qa-site-interactions.log` |
| Gallery desktop/mobile screenshots | VERIFIED | `output/visual-audit/t009-local-qa/gallery-desktop.png`, `output/visual-audit/t009-local-qa/gallery-mobile-390.png` |
| Modal desktop/mobile screenshots | VERIFIED | 4 screenshots under `output/visual-audit/t009-local-qa/modal-*.png` |
| Modal DOM checks | VERIFIED | `output/visual-audit/t009-local-qa/modal-evidence.json` |
| V2 diff guard | VERIFIED | `v2-before.diff`, `v2-after-audit.diff`, `v2-after-qa.diff`, and `v2-current-post-report.diff` match |

## Browser Evidence

`tools/qa-site-interactions.mjs` generated the full live QA output in `handoff/LIVE_QA.md` and `handoff/live-qa/site-interaction-results.json`; key gallery screenshots were copied into the allowed T009 QA artifact folder.

Gallery checks from the browser QA JSON:

- `galerie` desktop 1440x1200: no horizontal overflow, 0 broken images, 0 image attribute issues.
- `galerie` mobile 360/375/390/414: no horizontal overflow, 0 broken images, 0 image attribute issues.
- Whole-script result: 80 page/viewport checks, 0 issues.

Additional modal evidence was captured with a local Edge CDP script, without npm install:

- `terrace-pinus-placement` desktop: modal opened, active panel visible, 3 panel images, 0 broken images, no horizontal overflow.
- `hedge-niwaki-structure` desktop: modal opened, active panel visible, 5 panel images, 0 broken images, no horizontal overflow.
- `terrace-pinus-placement` mobile-390: modal opened, active panel visible, 3 panel images, 0 broken images, no horizontal overflow.
- `hedge-niwaki-structure` mobile-390: modal opened, active panel visible, 5 panel images, 0 broken images, no horizontal overflow.

## V2 Baseline Check

- T009 baseline `git diff -- v2`: 27 non-empty diff lines, pre-existing.
- After `node tools/audit-site.mjs`: exact diff string matched baseline.
- After `node tools/qa-site-interactions.mjs`: exact diff string matched baseline.
- Final post-report file-to-file check: `git diff --no-index -- output/visual-audit/t009-local-qa/v2-after-qa.diff output/visual-audit/t009-local-qa/v2-current-post-report.diff` produced no diff.
- `git diff -- v2` after T009 still reports the same 27-line pre-existing diff.

## Risks

- VERIFIED_WITH_LIMITS: First-load visual screenshots show the cookie banner, and mobile first-load gallery evidence also shows the sticky bottom CTA. This did not cause browser QA failures, broken images, or horizontal overflow, but it can obscure part of the first card in raw screenshots.
- PRESENT_BUT_UNTRACKED_GENERATED: The required browser QA script writes generated artifacts under `handoff/`; the T009 report references/copies key gallery evidence into `output/visual-audit/t009-local-qa/`.
- PRESENT_BUT_UNTOUCHED: `v2/index.html` and `tools/audit-site.mjs` were already dirty in the worktree; T009 did not edit them.

## Next

- Next task ID: T010.
