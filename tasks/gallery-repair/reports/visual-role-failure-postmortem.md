# Visual Role Failure Postmortem

Result label: VERIFIED_WITH_LIMITS

Marker: VISUAL_ROLE_GATE_ADDED

## What Failed

The previous final gallery handoff claimed the V1 gallery was visually verified while the active hedge case had the before/after preview order reversed.

Wrong state that was accepted:

- `hecke-niwaki-vorher-02.webp` was shown as `Vorher`.
- `hecke-niwaki-nachher-01.webp` was shown as `Nachher`.

Corrected state:

- `hecke-niwaki-nachher-01.webp` is the `Vorher` lead frame.
- `hecke-niwaki-vorher-02.webp` is the `Nachher` lead frame.

## Brutally Honest Cause

This was not a generator bug. It was a verification-design failure.

The weak points were:

1. Filename bias: the workflow accepted filename words like `vorher` and `nachher` as strong evidence. In the hedge case, those filename words are misleading.
2. Technical audit confusion: `node tools/audit-site.mjs` proves required files, links, metadata, and image attributes. It does not prove that the left image is semantically before and the right image is semantically after.
3. Browser QA overreach: the full browser QA checks page behavior and screenshots. It does not judge horticultural before/after truth.
4. Old screenshot trust: old `output/visual-audit` artifacts were treated as evidence after the mapping had changed, instead of being re-read as current visual truth.
5. No machine-readable visual verdict: there was no separate file saying "this exact image hash was visually inspected and is before/after for these reasons."
6. Final label too strong: `VERIFIED_WITH_LIMITS` was allowed even though the exact before/after semantic role had not been freshly verified case by case.

## What Was Not The Cause

There is no local evidence that a site generator swapped images by itself. There is also no local evidence that the audit scripts were designed to judge visual semantics. They were doing technical checks and were incorrectly treated as broader proof.

## New System Added

Files added:

- `tools/audit-gallery-roles.mjs`
- `tasks/gallery-repair/visual-role-verdicts.json`
- `tasks/gallery-repair/07_VISUAL_ROLE_GATE.md`
- `tasks/gallery-repair/reports/current-active-visual-role-check.html`

Files hardened:

- `tasks/gallery-repair/00_START_PROMPT.md`
- `tasks/gallery-repair/02_WORKFLOW.md`
- `tasks/gallery-repair/03_TASKS.md`
- `tasks/gallery-repair/05_REVIEW_GATES.md`
- `tasks/gallery-repair/06_NEGATIVE_PROMPTS.md`
- `tasks/gallery-repair/04_DECISION_LOG.md`
- `tasks/gallery-repair/reports/final-handoff.md`

## New Non-Negotiable Gate

Any future active before/after gallery claim must run:

```powershell
node tools/audit-gallery-roles.mjs
```

That command checks:

- active case IDs across DE/EN/UK gallery pages;
- card preview image order;
- modal lead image order;
- required modal context images;
- required image attributes;
- catalog stage consistency;
- SHA256 hashes of the visually reviewed preview image files;
- presence of current visual reasons in `visual-role-verdicts.json`.

## Remaining Limitation

`tools/audit-gallery-roles.mjs` still does not see pixels. It is a guardrail, not a vision model. It prevents silent drift after visual inspection. The direct pixel inspection step remains mandatory before updating `visual-role-verdicts.json`.

## Future Failure Rule

If a future agent cannot inspect the current images, it must not claim the gallery roles are verified. It must return:

```text
Result label: BLOCKED_VISUAL_ROLE_GATE
Reason: current pixels were not inspected
```

## Validation Run

Current validation after adding the gate:

- `node tools/audit-gallery-roles.mjs`: passed.
- `node tools/audit-site.mjs`: passed.
- Self-test with temporary swapped `hedge-niwaki-structure` verdict: failed as expected with DE/EN/UK before/after mismatch errors.

Full `node tools/qa-site-interactions.mjs` was attempted during the hedge fix but timed out and was stopped. It is not counted as passed.
