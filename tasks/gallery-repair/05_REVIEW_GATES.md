# Gallery Repair Review Gates

Reviewer gates prevent the gallery repair from drifting into fake completion. A weak executor's claim is draft until local evidence is checked.

## When A Review Is Required

Run a review gate:

- after the first evidence and active-case batch: `T001`, `T002`, `T003`, `T004`;
- after the first implementation batch: `T005`, `T006`, `T007`;
- after any task that changes validation, schema, modal behavior, case promotion rules, or acceptance markers;
- after any batch produced by a hosted or weaker model.

Do not continue past a required review gate when the gate result is `NEEDS_REWORK` or `BLOCKED`.

## Reviewer Inputs

Give the reviewer evidence, not the desired answer:

- task IDs reviewed;
- changed files;
- acceptance markers claimed;
- validation commands and exact results;
- screenshots/contact sheets or report paths;
- rollback notes;
- known risks and uncertain images.

## Reviewer Checks

The reviewer must verify:

- dependencies were respected;
- allowed files were not exceeded;
- old decision-log rows were not rewritten;
- source hierarchy was followed;
- `tools/generate-site.mjs` remained source of truth for generated gallery pages;
- no manual generated-page edit happened without logged generator blockage;
- no `v2/index.html` or `v2/**` content changed relative to the pre-task baseline;
- no image files were deleted or renamed without human approval;
- no duplicate case IDs or duplicate acceptance markers exist;
- strict `before` and `after` labels are visually defensible;
- `node tools/audit-gallery-roles.mjs` passed after any active before/after mapping or gallery regeneration;
- `tasks/gallery-repair/visual-role-verdicts.json` matches current active cases, current generated HTML, and current image hashes;
- filenames were not treated as authority when they conflict with actual image state;
- uncertain images are labeled `work_context` or `needs_viktor_confirmation`;
- generated images load and keep `alt`, `width`, `height`, `loading`, and `decoding` attributes;
- `PRESENT_BUT_UNTESTED` was not treated as working behavior.

## Gate Outcomes

Use exactly one:

- `PASS_VERIFIED`: continue.
- `PASS_VERIFIED_WITH_LIMITS`: continue only if the limits do not affect later tasks.
- `NEEDS_REWORK`: create a repair task before continuing.
- `BLOCKED`: stop until human input or new local evidence changes the situation.

## Review Prompt Template

```text
# Gallery Repair Review Gate
Review ID:
Task IDs reviewed:
Changed files:
Claimed acceptance markers:
Validation evidence:
Visual evidence:
Known risks:

Check:
- dependencies respected
- allowed files respected
- must-preserve items preserved
- no old log rows rewritten
- no image deletions/renames
- before/after labels defensible
- generated pages came from generator
- validation label matches evidence
- visual role gate passed or the task is explicitly marked not verified
- `git diff -- v2` is unchanged from the pre-task/pre-generator baseline

Return:
Gate outcome:
Findings:
Required repair task, if any:
Can continue to:
```

## Repair Rule

If review finds a problem, do not edit history. Add a new row to `04_DECISION_LOG.md` and create a repair report or repair task with a new acceptance marker.
