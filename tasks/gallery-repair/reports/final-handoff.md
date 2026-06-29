# T010 - Final Visual Review And Handoff

Result label: VERIFIED_WITH_LIMITS

Acceptance marker: T010_FINAL_HANDOFF_COMPLETE

Correction marker: REPAIR_HEDGE_ORDER_VERIFIED

## Correction 2026-06-26

The public hedge order was wrong. A later user screenshot showed the controlled close-up frame must be `Nachher` and the wider site-context frame must be `Vorher`. Current corrected hedge order is:

- `hecke-niwaki-nachher-01.webp`: before / `Vorher` lead frame.
- `hecke-niwaki-vorher-02.webp`: after / `Nachher` lead frame.

The old T009 screenshots are still evidence that the modal/browser flow worked, but they are superseded for hedge before/after visual order by this correction.

## Final Gallery State

Current V1 generated gallery pages render two active before/after case IDs:

| Case ID | Final status | Public framing | Evidence images |
| --- | --- | --- | --- |
| `terrace-pinus-placement` | VERIFIED_WITH_LIMITS | Strict placement/installation case, not pruning or rescue. The copy says the low Japanese white pine moved from delivery/pre-placement state into the terrace planting context. | `assets/img/foto/02_pryklady-robit/case-terrace-before.webp`; `assets/img/foto/02_pryklady-robit/case-terrace-after.webp`; modal support `sosna-bila-do-pislya-28.webp` |
| `hedge-niwaki-structure` | VERIFIED_WITH_LIMITS | Strict same hedge/work-series case with the lead frames corrected after user screenshot review. | before preview `assets/img/foto/02_pryklady-robit/hecke-niwaki-nachher-01.webp`; after preview `assets/img/foto/02_pryklady-robit/hecke-niwaki-vorher-02.webp`; modal context `hecke-niwaki-vorher-01.webp`, `hecke-niwaki-diagnose-01.webp`, `hecke-niwaki-arbeit-01.webp` |

The former Parviflora and Watereri strict cases are not active strict before/after cases. Their source files remain on disk, but they are not promoted as strict transformations because same-tree continuity was not strong enough in the local evidence.

## Current Rendered Checks

Fresh T010 read-only checks on current files:

- `galerie.html`, `en/galerie.html`, and `uk/galerie.html` all render `data-case-open` and `data-case-panel` IDs: `terrace-pinus-placement`, `hedge-niwaki-structure`.
- Each localized gallery page has 136 gallery image tags using `assets/img/foto/`.
- Missing image attributes across those gallery tags: 0. Checked `alt`, `width`, `height`, `loading`, and `decoding`.
- Terrace duplicate handling in each localized page:
  - `sosna-bila-do-pislya-27.webp`: 0 references.
  - `sosna-bila-do-pislya-28.webp`: 2 references, modal support only.
  - `sosna-bila-do-pislya-29.webp`: 0 references.
  - `sosna-bila-do-pislya-30.webp`: 2 references, single retained context frame.
  - `sosna-bila-do-pislya-31.webp`: 0 references.
  - `sosna-bila-do-pislya-32.webp`: 0 references.

## Validation Evidence

Fresh T010 command:

- `node tools/audit-site.mjs`: exit 0.
- Output: `AUDIT PASSED: required files, SEO tags, JSON-LD, internal links, events and image manifest are present.`
- `git diff -- v2` before and after the audit matched exactly; current V2 diff remains the same 27-line pre-existing diff.

T009 browser QA evidence still present and rechecked on disk:

- `output/visual-audit/t009-local-qa/validation-summary.json`: audit exit 0, browser QA exit 0, V2 after-audit and after-QA diffs matched the baseline.
- `output/visual-audit/t009-local-qa/qa-site-interactions.log`: browser QA reported 80 page/viewport checks and 0 issues.
- `output/visual-audit/t009-local-qa/gallery-desktop.png`: visually re-opened for final review.
- `output/visual-audit/t009-local-qa/gallery-mobile-390.png`: visually re-opened for final review.
- `output/visual-audit/t009-local-qa/modal-terrace-pinus-placement-desktop.png`: visually re-opened for final review.
- `output/visual-audit/t009-local-qa/modal-hedge-niwaki-structure-mobile-390.png`: visually re-opened for final review.
- `output/visual-audit/t009-local-qa/modal-evidence.json`: 4 modal records; both active cases opened on desktop and mobile-390, 0 broken modal images, no horizontal overflow.

## Excluded Or Uncertain Material

These items should not be promoted into strict before/after cases without new local evidence or Viktor confirmation:

- `case-parviflora-before.webp` / `case-parviflora-after.webp`: former Parviflora case demoted; the before frame is too close/work-context-like and continuity to the clean after frame is not strong enough.
- `case-watereri-before.webp` / `case-watereri-after.webp` and Watereri related images: useful example material, but not proven as one strict same-tree transformation.
- Taxus electric-shear source photos: classified as mistake/education evidence, not a positive result.
- Taxus topiary/nursery sequence: work context and useful examples, but no unambiguous clean before frame for a strict case.
- Early and later Pinus parviflora archive ranges: normal-gallery examples only unless Viktor confirms specific same-tree sequences.
- Terrace near-duplicates `sosna-bila-do-pislya-27.webp`, `29.webp`, `31.webp`, `32.webp`: excluded from prominent display; files preserved.

## Client-Facing Limits

- The active before/after section is defensible within the verified framing above.
- Do not describe `terrace-pinus-placement` as pruning, rescue, or crown transformation; it is a placement/installation story.
- Do not restore Parviflora, Watereri, or Taxus as strict cases without a new confirmation batch.
- First-load QA screenshots include the cookie banner, and the mobile screenshot also shows the sticky bottom CTA. Browser QA did not fail, but raw screenshot evidence is partially obscured.
- Several active/support image assets are untracked in git. They must be included before any commit/publish workflow, but T010 did not stage or publish anything.

## V2 Scope Check

- No generator was run during T010.
- No `v2/**` files were edited in T010.
- `git diff -- v2` remained unchanged before and after the fresh T010 audit command.
- `v2/index.html` remains pre-existing dirty and out of scope.

## Human Review Questions For Viktor

1. Does Viktor approve the Terrace case as a placement/installation before/after story, not pruning?
2. Can Viktor confirm whether the demoted Parviflora pair is the same tree/work sequence?
3. Can Viktor confirm whether the demoted Watereri pair is a real same-tree transformation?
4. Should the Taxus electric-shear mistake photos become part of an educational mistake section, separate from positive gallery cases?
5. Are there specific archive pine sequences Viktor can identify as same-tree before/after series for a future batch?

## Handoff

The V1 gallery repair task sequence is complete with limits. The current strict before/after section is smaller but more trustworthy: two active cases, no promoted uncertain Parviflora/Watereri/Taxus cases, and Terrace duplicates reduced to one modal support frame plus one retained context frame.

Next task ID: COMPLETE.
