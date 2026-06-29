# Gallery Repair Negative Prompts And Failure Examples

Use this file before every task. Copy the relevant task section into a weak-model microtask. These are prohibitions, not suggestions.

## Global Negative Prompt

Do not guess. Do not beautify uncertainty. Do not turn a plausible photo pair into a strict before/after pair unless local visual evidence supports same tree or same work series. Do not change V2 relative to its pre-task baseline. Do not delete images. Do not trust filenames, old reports, catalog stages, alt text, or DOM order without checking current pixels. Do not send raw private source exports to hosted models. Do not claim verification without fresh evidence from this session.

## Global Forbidden Actions

- Do not edit `v2/index.html` or any `v2/**` file.
- Do not accept a generator run that changes `v2/**` relative to the pre-run baseline.
- Do not use `git reset --hard`, broad checkout, broad clean, or broad deletion.
- Do not delete, rename, compress, or overwrite original/source images.
- Do not manually edit generated gallery HTML unless the generator is blocked and the log says why.
- Do not label a ladder/tool/process image as strict `after` just because it looks nicer.
- Do not label two similar but uncertain trees as a pair because they have the same species.
- Do not promote near-duplicates into prominent cards.
- Do not use old `output/visual-audit/` files as final truth.
- Do not invent Viktor quotes, species, dates, services, or work descriptions.
- Do not send `.env`, secrets, raw Telegram exports, full transcripts, or full workspace dumps to DeepSeek or any hosted model.
- Do not mark `VERIFIED` if the validation command or visual check did not run.
- Do not mark active before/after roles as verified unless `node tools/audit-gallery-roles.mjs` passed in the same task after direct visual inspection.
- Do not continue to the next task when an acceptance marker dependency is missing.

## Hallucination Tripwires

Stop and use `BLOCKED_MISSING_CONTEXT` or `needs_viktor_confirmation` when:

- the same tree cannot be visually confirmed;
- the source text does not clearly belong to the photo series;
- the model is relying on memory instead of a local file;
- a photo is plausible but could be a different tree, angle, year, or client site;
- old audit evidence conflicts with current generator/HTML;
- the task requires touching files outside its allowed files;
- `git diff -- v2` changes relative to the pre-task/pre-generator baseline;
- hosted-model output is the only evidence.
- `node tools/audit-site.mjs` passed but `node tools/audit-gallery-roles.mjs` failed or was not run for active case changes.

## Bad Examples To Avoid

1. Bad: "This looks like after" without naming the image file and visual reason.
2. Bad: Pairing two pines only because both are `Pinus parviflora`.
3. Bad: Putting a work ladder frame into `after` because the crown looks trimmed.
4. Bad: Promoting three almost identical angles into the card preview.
5. Bad: Moving uncertain Terrace/Taxus candidates into active cases without review.
6. Bad: Treating `before-after-case-contact-sheet.png` as current truth after `tools/generate-site.mjs` changed.
7. Bad: Editing `galerie.html` manually while leaving the generator stale.
8. Bad: Running the generator, seeing `v2/index.html` changed relative to baseline, and ignoring it.
9. Bad: Asking DeepSeek to classify raw Telegram exports or private transcripts.
10. Bad: Claiming "audit passed" after only reading files.
11. Bad: Removing old decision-log rows to make the workflow look cleaner.
12. Bad: Deleting source photos because they are duplicates in display.
13. Bad: Trusting `vorher` or `nachher` in the filename after the pixels show the opposite.
14. Bad: Calling browser QA passed when the script timed out or was killed.
15. Bad: Closing a final handoff while the current screenshots/contact sheet still show a reversed before/after card.

## T001

Negative prompt: Do not classify final gallery cases in the source inventory. Do not edit catalog, generator, generated HTML, V2, or images. Do not copy broken Cyrillic from a bad terminal decode. Do not paste long private transcript text into the report.

Negative examples:

- Bad: "Taxus is a before/after case" from source inventory alone.
- Bad: Copying mojibake Cyrillic text into `source_text`.
- Bad: Sending the whole Telegram `result.json` to DeepSeek.

## T002

Negative prompt: Do not change the site while mapping rendered gallery usage. Do not assume generated HTML is current if it conflicts with `tools/generate-site.mjs`; report the mismatch.

Negative examples:

- Bad: Editing `beforeAfterCases` while making the rendered map.
- Bad: Counting old visual-audit screenshots as currently rendered images.
- Bad: Ignoring duplicate image references because they are in different languages.

## T003

Negative prompt: Do not add new dormant cases. Do not relabel existing active images unless direct visual evidence supports the new role. Do not break modal behavior or localized generation.

Negative examples:

- Bad: Moving Terrace into active cases during active-case review.
- Bad: Calling a close-up/detail frame `after`.
- Bad: Changing a case ID and breaking `data-case-open`.

## T004

Negative prompt: Do not promote dormant candidates. This task is classification and evidence only. Use `needs_viktor_confirmation` when uncertain.

Negative examples:

- Bad: Adding Taxus to `beforeAfterCases` from this report task.
- Bad: Marking a candidate `promote_ready` without naming before/after filenames.
- Bad: Treating a mistake-section photo as a positive result.

## T005

Negative prompt: Do not redesign the gallery. Do not create a new gallery system if existing `series.before`, `series.work`, and `series.after` can express the need. Do not make photo-selection decisions here.

Negative examples:

- Bad: Replacing modal JS instead of extending data rendering.
- Bad: Adding a carousel because it feels more cinematic.
- Bad: Editing `v2/index.html` to test the new layout.

## T006

Negative prompt: Do not add uncertain photos to strict before/after. Do not add duplicates for volume. Do not invent copy not grounded in source evidence.

Negative examples:

- Bad: Adding every unused `do-pislya` image to a modal.
- Bad: Using "Viktor saved this tree" when the source only says the form improved.
- Bad: Promoting a photo because it is beautiful but unrelated to the case.

## T007

Negative prompt: Do not delete duplicate files. Remove only display references or mark catalog status. Preserve at least one best representative per confirmed work series.

Negative examples:

- Bad: Deleting source images from `assets/img/foto/`.
- Bad: Removing all alternate angles and losing useful context.
- Bad: Marking an image duplicate without comparing angle/focus/client value.

## T008

Negative prompt: Do not manually hand-edit generated gallery pages. Do not accept V2 diffs. Do not let unrelated generated churn hide gallery changes.

Negative examples:

- Bad: Running generator and accepting a new `v2/index.html` diff.
- Bad: Ignoring changes outside `galerie.html`, `en/galerie.html`, `uk/galerie.html`, and expected source files.
- Bad: Fixing generated HTML directly instead of source.

## T009

Negative prompt: Do not fix QA failures inside the QA task. Capture evidence, label failures honestly, and create a repair task if needed.

Negative examples:

- Bad: Editing CSS during QA to make a screenshot pass.
- Bad: Reporting browser QA as passed when the command failed.
- Bad: Checking only desktop and skipping mobile modal behavior.

## T010

Negative prompt: Do not make last-minute gallery changes in final handoff. Do not hide uncertain images. Do not call the gallery client-ready if validation or Viktor confirmation is still missing.

Negative examples:

- Bad: "Everything is done" while `needs_viktor_confirmation` items remain.
- Bad: Omitting failed audit output from the handoff.
- Bad: Summarizing old screenshots as final evidence.

## REVIEW

Negative prompt: Do not rubber-stamp. Do not review intent; review evidence. Do not let a task pass if allowed files were exceeded, V2 changed, labels are visually weak, validation did not run, or rollback notes are vague.

Negative examples:

- Bad: `PASS_VERIFIED` because the worker sounds confident.
- Bad: Ignoring a `PRESENT_BUT_UNTESTED` label on working UI behavior.
- Bad: Continuing after missing acceptance markers.
