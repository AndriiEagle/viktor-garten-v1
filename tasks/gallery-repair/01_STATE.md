# Gallery Repair - Current State

This file is the compact state anchor for the gallery repair work. Re-check local files before trusting any old report.

## Verified Current State

- Source of truth for generated pages: `tools/generate-site.mjs`.
- Generated gallery pages include `galerie.html`, `en/galerie.html`, and `uk/galerie.html`.
- Gallery repair scope is V1 public static site only.
- `v2/index.html` and every `v2/**` file are out of scope and must not be changed.
- At the latest hardening check, `git status --short -- v2` showed `M v2/index.html`. Treat that as pre-existing worktree state, not permission to edit V2.
- Current active before/after case IDs in generated gallery:
  - `parviflora-crown-form`
  - `watereri-crown-structure`
  - `hedge-niwaki-structure`
- `tools/photo-catalog.json` has 147 catalog entries.
- `tools/photo-catalog.json` has 67 entries with `folder` = `02_pryklady-robit`.
- `assets/img/foto/02_pryklady-robit/` currently contains 73 image files.
- Source export folders exist:
  - `24062026/`
  - `Neuer Ordner/ChatExport_2026-06-22/`
- Telegram text must be read as UTF-8. Broken Cyrillic in terminal output is a read/display problem, not automatically bad source text.
- Git worktree is dirty in this project. Preserve user and previous-agent changes. Never run `git reset --hard`, `git checkout --`, broad deletion, or broad regeneration without checking scope.

## Source Hierarchy

Use this order when deciding truth:

1. Telegram exports and supplied original photos:
   - `24062026/messages.html`
   - `24062026/photos/`
   - `Neuer Ordner/ChatExport_2026-06-22/result.json`
   - `Neuer Ordner/ChatExport_2026-06-22/photos/`
   - `Neuer Ordner/_codex_local_audio_analysis/transcripts.md`
2. Public catalog and asset metadata:
   - `tools/photo-catalog.json`
   - `assets/img/MANIFEST.md`
3. Generator source:
   - `tools/generate-site.mjs`
4. Generated HTML:
   - `galerie.html`
   - `en/galerie.html`
   - `uk/galerie.html`
5. Visual QA evidence:
   - `output/visual-audit/`
   - fresh screenshots/contact sheets created during the current task

Old files in `output/visual-audit/` are evidence, not truth. They can be stale. Always compare them with the current generator and current generated HTML.

## V1-Only Scope Fence

Allowed gallery target:

- root V1 page: `galerie.html`
- localized V1 pages: `en/galerie.html`, `uk/galerie.html`
- shared V1 source and assets used by those pages: `tools/generate-site.mjs`, `tools/photo-catalog.json`, `assets/main.js`, `assets/img/foto/**`

Forbidden target:

- `v2/index.html`
- `v2/**`

Before any validation or generator command that might touch generated files, record the current `git diff -- v2` baseline. If the command changes V2 content relative to that baseline, stop and log `BLOCKED_V2_SIDE_EFFECT`. Do not hide, silently revert, or overwrite pre-existing V2 changes.

## Product Intent

The gallery should sell Viktor's real expertise without looking fake or overproduced:

- accurate before/after pairs;
- additional related photos visible inside the modal when they add real context;
- no prominent duplicates that show almost the same focus and angle;
- no wrong photos placed as after shots;
- no strict before/after label when the image is only work context, detail, mistake, or an uncertain candidate;
- text grounded in Viktor's source material and written for clients.

## Current UI Behavior To Preserve

- Gallery case cards open a modal.
- Card preview should show one clean before/after pair.
- Modal can show extra photos grouped by role.
- Existing language pages DE, EN, and UK should keep working.
- Existing local validation scripts in README remain the baseline:

```powershell
node tools/generate-site.mjs
node tools/audit-site.mjs
node tools/qa-site-interactions.mjs
```

For V1-only gallery work, also inspect:

```powershell
git diff -- v2
```

Expected result: unchanged from the pre-task baseline. The baseline may already be non-empty because the worktree is dirty.

## Known Risk Areas

- Some old visual audit notes mention four cases, including Terrace and Taxus, while the current generator shows only three active cases. Do not assume old case counts are current.
- Taxus electric-hedge-trimmer photos from `24062026` are negative/mistake evidence, not a positive before/after result unless explicitly reframed that way.
- Similar pine/Niwaki photos can look like duplicates. Promote only the best representative images unless another angle materially helps.
- Some transcript text is machine-transcribed and imperfect. Use it as context, not as a verbatim public quote unless manually checked.
