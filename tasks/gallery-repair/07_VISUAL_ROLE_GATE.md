# Gallery Visual Role Gate

This file exists because a previous gallery repair run closed with a serious false verification: the active hedge case had its before/after preview order reversed. The ordinary site audit passed because it checked technical validity, not visual truth.

## Root Cause

The failure was process failure, not a site-rendering bug.

What went wrong:

- The workflow trusted filenames and catalog text too much.
- The final checks proved that images existed and had attributes, but did not prove the semantic role of the image.
- Old QA screenshots were treated as supporting evidence even though they still contained the wrong visual order.
- The review gate allowed `VERIFIED_WITH_LIMITS` without a fresh per-case visual role verdict tied to the current image files.
- The full browser QA script checks page behavior and screenshots, but it does not judge whether the left image is truly before and the right image is truly after.

## Non-Negotiable Rule

For every active before/after case, the agent must verify the actual current image pixels. The agent must not rely on:

- filenames;
- `stage` values in `tools/photo-catalog.json`;
- alt text;
- generated HTML order;
- old `output/visual-audit` screenshots;
- old decision-log rows;
- previous assistant confidence;
- a passing `node tools/audit-site.mjs`.

Those items are evidence only after they match direct visual inspection.

## Mandatory Files

The visual role gate uses:

- `tasks/gallery-repair/visual-role-verdicts.json`
- `tools/audit-gallery-roles.mjs`
- current active gallery pages: `galerie.html`, `en/galerie.html`, `uk/galerie.html`
- current catalog: `tools/photo-catalog.json`
- current image files under `assets/img/foto/`

## Required Command

Run this after any active case mapping change or final gallery claim:

```powershell
node tools/audit-gallery-roles.mjs
```

This command must pass before the agent can claim `VERIFIED` or `VERIFIED_WITH_LIMITS` for active before/after roles.

## What The Command Proves

It proves:

- every active case has a current visual verdict;
- DE/EN/UK card preview order matches that verdict;
- modal lead image order matches that verdict;
- required modal context images are present;
- required image attributes are present;
- catalog stages are consistent with the verdict;
- the image files still have the same SHA256 hashes as the visually reviewed files.

## What The Command Does Not Prove

It does not look at pixels. It does not know tree biology. It cannot decide whether a hedge is actually before or after.

The human/agent must inspect pixels first, then update `visual-role-verdicts.json`. The command prevents the next agent from silently drifting away from that verdict.

## How To Update A Case Safely

1. Open the actual image files or a fresh contact sheet.
2. Ignore filename words like `vorher`, `nachher`, `before`, `after`, `do`, `pislya`.
3. Decide role from visible state:
   - before: rougher, denser, uncorrected, pre-placement, diagnostic, or pre-work state;
   - after: calmer, clearer, controlled, settled, final placement, or completed work state;
   - work context: useful process/detail frame but not final proof.
4. If uncertain, do not promote. Use `work_context` or `needs_viktor_confirmation`.
5. Update `tools/generate-site.mjs` first.
6. Update `tools/photo-catalog.json` stages/captions if filenames or old stages are misleading.
7. Recompute SHA256 for every active before/after preview image:

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath 'assets\img\foto\02_pryklady-robit\IMAGE.webp'
```

8. Update `tasks/gallery-repair/visual-role-verdicts.json`.
9. Run:

```powershell
node tools/generate-site.mjs
node tools/audit-site.mjs
node tools/audit-gallery-roles.mjs
```

10. Append a decision-log row. Never rewrite old rows.

## Stop Conditions

Stop with `BLOCKED_VISUAL_ROLE_GATE` when:

- the agent cannot inspect the current images;
- `visual-role-verdicts.json` is missing or stale;
- SHA256 hashes changed and no new visual inspection was done;
- generated HTML conflicts with the visual verdict;
- the catalog says before/after but visual evidence is weaker or opposite;
- a full browser QA passed but the visual role gate failed.

## Current Known Trap

`hedge-niwaki-structure` has misleading filenames. Preserve this order:

- `hecke-niwaki-nachher-01.webp` is the `Vorher` lead frame.
- `hecke-niwaki-vorher-02.webp` is the `Nachher` lead frame.

Do not reintroduce the filename-based mapping where `vorher` is labeled `Vorher` and `nachher` is labeled `Nachher`.
