# Gallery Repair Goal Prompt

Use this prompt in a fresh Codex Goal Mode session.

## Objective

Rebuild Viktor Baumarchitektur's gallery case mapping so real before/after series are accurate, non-duplicate, well explained, visually verified, and easy for a future client to understand.

The goal is not to make the gallery bigger at any cost. The goal is to make it trustworthy: same tree or same work series, correct before/after/work labels, no misleading pairings, no promoted near-duplicates unless they add a clearly different angle or detail, and copy that reflects Viktor's real work.

## Required First Reads

Before doing any work in each batch, read these files in this folder:

1. `01_STATE.md`
2. `02_WORKFLOW.md`
3. `03_TASKS.md`
4. `04_DECISION_LOG.md`
5. `05_REVIEW_GATES.md` when the next task is a review gate or follows one
6. `06_NEGATIVE_PROMPTS.md`
7. `07_VISUAL_ROLE_GATE.md` before any task that touches active before/after cases or claims visual verification

Also check `git status --short` before editing. The repository may already contain user or previous-agent changes. Do not reset, revert, delete, or overwrite unrelated work.

## Operating Rules

- Work in one small task ID at a time from `03_TASKS.md`.
- Use the source hierarchy: Telegram exports -> photo catalog -> generator -> generated HTML -> visual QA.
- Work only on the V1 public static site. V2 is out of scope.
- Do not edit, regenerate intentionally, stage, review, or optimize `v2/index.html` or any `v2/**` file.
- Before any generator run, record the current `git diff -- v2` baseline. After the run, compare against that baseline. If V2 content changed relative to baseline, stop with `BLOCKED_V2_SIDE_EFFECT` and log it. A pre-existing V2 diff is not permission to edit V2.
- Treat `tools/generate-site.mjs` as the source of truth for gallery layout and case rendering.
- Treat `tools/photo-catalog.json` as the source of truth for catalog metadata.
- Do not manually edit `galerie.html`, `en/galerie.html`, or `uk/galerie.html` unless the generator is blocked and the decision log explains why.
- Do not delete image files. Mark duplicates, rejects, and uncertain images in the task output or catalog first.
- Strict before/after requires the same tree or the same work series with visible continuity. If uncertain, classify as `work_context` or `needs_viktor_confirmation`.
- Read Telegram HTML/JSON as UTF-8. If console output shows broken Cyrillic, fix the read method before copying source text.
- Use DeepSeek only for redacted drafts or second-opinion judging. Never send secrets, `.env`, raw private logs, full workspace dumps, or account data. Codex verifies all claims locally.
- Before editing, read the relevant negative prompt and negative examples from `06_NEGATIVE_PROMPTS.md`.
- Before claiming any active before/after case is correct, inspect the actual current images by pixels, update or verify `tasks/gallery-repair/visual-role-verdicts.json`, and run `node tools/audit-gallery-roles.mjs`.
- Do not trust filenames such as `vorher` or `nachher`, catalog stages, alt text, DOM order, or old screenshots as visual truth. They are clues only.
- Before claiming completion, prove the claim with files, command output, or visual evidence from this session.

## Microtask Envelope

For each task, keep the active prompt small:

```text
# Microtask
Step ID:
Objective:
Depends on:
Allowed files:
Must preserve:
Do:
Do not:
Stop conditions:
Validation:
Acceptance marker:
Rollback:
Final response shape:
```

Do not give a weak model the whole repository or the whole plan as an execution prompt. Give it one task ID, bounded files, and one acceptance marker.

## Anti-Hallucination Self-Check

Before any final response, answer these internally and report failures:

1. Did I read the required task files in this session?
2. Did I touch only allowed files?
3. Did I avoid changing `v2/**` relative to the pre-task baseline?
4. Did I base every photo label on local visual/source evidence?
5. Did I run `node tools/audit-gallery-roles.mjs` after any active case mapping/generation change?
6. Did I distinguish old visual-audit evidence from current truth?
7. Did I run the promised validation, or label the result honestly as not run?
8. Did I append to the decision log instead of rewriting history?
9. Did I avoid sending raw private source exports or secrets to hosted models?

## Batch Completion

At the end of each batch, update `04_DECISION_LOG.md` with an append-only row. Then answer with:

```text
Result label:
Completed task IDs:
Files changed:
Validation:
Acceptance markers:
Risks:
Next task ID:
```

Use these result labels only: `VERIFIED`, `VERIFIED_WITH_LIMITS`, `PRESENT_BUT_UNTESTED`, `NEEDS_REVIEW`, `BLOCKED`.

Do not claim `VERIFIED` unless the named validation commands or visual evidence actually ran in this session.

For gallery pair work, do not claim `VERIFIED` or `VERIFIED_WITH_LIMITS` unless `node tools/audit-gallery-roles.mjs` passed in this session, or unless the final answer explicitly says the visual role gate was not run and the result is therefore not verified.
