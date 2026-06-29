# Gallery Repair Workflow

Use this workflow for every batch. The purpose is to prevent context overload and prevent later work from overwriting earlier decisions.

## Micro-Batch Process

1. Pick exactly one task ID from `03_TASKS.md`.
2. Read that task, its dependencies, and the latest rows in `04_DECISION_LOG.md`.
3. Read the matching negative prompt and examples from `06_NEGATIVE_PROMPTS.md`.
4. Read only the task's allowed files and the minimum evidence needed.
5. Inspect photos visually, preferably with contact sheets or direct image viewing.
6. Classify every relevant photo as one of:
   - `before`
   - `after`
   - `work_context`
   - `detail`
   - `mistake`
   - `duplicate`
   - `reject`
   - `needs_viktor_confirmation`
7. Update source data or generator only inside the task's allowed files.
8. If an active before/after case changes, update `visual-role-verdicts.json` after direct pixel inspection of the current image files. Include the current image hashes.
9. Run the task's validation.
10. For any active before/after case claim, run `node tools/audit-gallery-roles.mjs`.
11. Compare `git diff -- v2` after any generator command against the pre-command baseline. If V2 changed relative to baseline, stop with `BLOCKED_V2_SIDE_EFFECT`.
12. Append a row to `04_DECISION_LOG.md`.
13. Stop. Do not continue into the next task unless explicitly asked.

If a task writes a report under `tasks/gallery-repair/reports/` and that directory does not exist yet, create only that directory as part of the report-writing task.

## Visual Judgment Rules

- `before`: tree or hedge is visibly uncorrected, dense, rough, overgrown, or in pre-work condition.
- `after`: tree or hedge is visibly improved, finished, calmer, clearer, or settled after Viktor's work.
- `work_context`: ladder, tools, close-up diagnosis, in-progress frame, delivery/placement context, or helpful but not final proof.
- `detail`: needles, candles, cut tips, bark, inner crown, roots, or small technical proof.
- `mistake`: evidence of wrong tool, rough cut, damage, bad previous work, disease/risk, or what not to do.
- `duplicate`: same tree with nearly same angle/focus and no extra client value.
- `reject`: poor quality, irrelevant, misleading, broken, unsafe, or not useful for the site.
- `needs_viktor_confirmation`: plausible but not enough evidence for a strict label.

If two labels are plausible, choose the less risky one. For example, choose `work_context` instead of `after`, or `needs_viktor_confirmation` instead of `before`.

Filenames are not evidence. A filename containing `vorher`, `nachher`, `before`, `after`, `do`, or `pislya` can be wrong. The actual pixels decide the role. If the filename conflicts with the visual state, document the conflict in `visual-role-verdicts.json` and `tools/photo-catalog.json`.

## Source Editing Rules

- V1-only rule: do not edit `v2/index.html` or any `v2/**` file.
- If `v2/**` is already dirty before the task, preserve that baseline exactly.
- Edit source of truth first:
  - `tools/photo-catalog.json` for metadata/classification/catalog facts.
  - `tools/generate-site.mjs` for case definitions, modal rendering, gallery sections, and generated copy.
- Generated pages should come from:

```powershell
node tools/generate-site.mjs
```

- Do not manually edit generated gallery pages unless blocked. If manual editing is unavoidable, log `BLOCKED_GENERATOR_LIMITATION` in `04_DECISION_LOG.md` first.
- Do not accept a generator run that changes `v2/**` relative to the pre-run baseline. Stop and log it.
- Do not delete image files. A delete requires human approval.
- Do not rename existing image files unless the task explicitly approves a migration and all references are updated.
- Do not change secrets, `.env`, deployment config, production systems, analytics IDs, or contact behavior during gallery repair.

## Visual Role Gate

`node tools/audit-gallery-roles.mjs` is mandatory after any task that:

- changes `beforeAfterCases`;
- changes active case preview images;
- changes `series.before` or `series.after`;
- changes active case catalog stages;
- regenerates gallery pages after active case changes;
- claims the final gallery before/after roles are correct.

This audit checks current generated DE/EN/UK gallery pages, modal lead images, required image attributes, catalog stage consistency, current image SHA256 hashes, and `tasks/gallery-repair/visual-role-verdicts.json`.

This audit is not a vision model. It cannot decide whether a tree is truly before or after. It prevents a known failure mode: claiming success after DOM/filename checks while the actual image role was never freshly verified.

If `node tools/audit-gallery-roles.mjs` fails, stop with `NEEDS_REWORK` or `BLOCKED_VISUAL_ROLE_GATE`. Do not continue by saying that `node tools/audit-site.mjs` passed.

## DeepSeek Policy

Route label: `deepseek_redacted_judge` or `deepseek_redacted_draft` only.

Use `DEEPSEEK_API_KEY` only for redacted drafts or judging, and only when the local environment already provides it. Respect `DEEPSEEK_DAILY_USD_CAP`. Do not install new clients, create new keys, or bypass the cap.

Allowed:

- redacted visual-classification criteria;
- small lists of public asset filenames;
- non-secret excerpts of generated gallery copy;
- anonymized notes like "image A appears to be same pine from left angle".

Forbidden:

- `.env` or any token/key;
- raw private chat logs;
- full Telegram exports;
- whole workspace dumps;
- account data, browser/session data, private screenshots, or private personal contact details;
- spending beyond `DEEPSEEK_DAILY_USD_CAP`.

DeepSeek output is never final evidence. Codex must verify locally through files, screenshots, generated HTML, and validation commands.

## Validation Labels

- `VERIFIED`: named command or visual evidence proves the claim.
- `VERIFIED_WITH_LIMITS`: evidence exists, but a stated limit remains.
- `PRESENT_BUT_UNTESTED`: file/artifact exists, but behavior was not verified.
- `NEEDS_REVIEW`: another reviewer or Viktor confirmation is needed.
- `BLOCKED`: stop condition triggered.

Do not use `PRESENT_BUT_UNTESTED` to complete a task that promised working UI behavior.

## Hallucination Controls

Use these checks before each decision:

- Filename evidence: every image claim must name the local file path.
- Source evidence: every Viktor-text claim must name the source export file and message/audio when known.
- Visual evidence: every `before` or `after` label must come from direct image inspection or a fresh/current contact sheet.
- Role-gate evidence: every active strict case must have a current row in `visual-role-verdicts.json`, and `node tools/audit-gallery-roles.mjs` must pass before completion.
- Currentness evidence: old `output/visual-audit/` reports must be cross-checked against current `tools/generate-site.mjs` and current HTML.
- Scope evidence: every changed file must appear in the task's allowed files.
- V1 evidence: `git diff -- v2` must be unchanged from the pre-task/pre-generator baseline.
- Hosted-model evidence: any DeepSeek use must be redacted and treated as draft only.

## Rollback Rules

- For Markdown task files: revert only the new rows or sections from the current task.
- For `tools/photo-catalog.json`: restore only the changed entries from git diff or the previous logged state.
- For `tools/generate-site.mjs`: restore only the changed case/schema/rendering block.
- For generated HTML: regenerate from source after rollback.
- Never rewrite old decision-log rows. Add a correction row.
