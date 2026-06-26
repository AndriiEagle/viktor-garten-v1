# Viktor Baumarchitektur Static Website

Static multipage DE/EN site for Viktor Baumarchitektur. It opens directly from `index.html` and is ready for static hosting on Vercel after human approval.

## Edit checklist

- Verify final WhatsApp/phone before publication: `+41 78 313 03 30`.
- Replace GA4 `G-XXXXXXX`, Google Ads `AW-XXXXXXX` and Search Console verification.
- Visible header/footer wordmark is **Viktor Baumarchitektur**.
- Complete `impressum.html` and `datenschutz.html` with Viktor's legal data before publication.
- Swap real images using filenames in `assets/img/MANIFEST.md`.
- TODO: create a final matching logo lockup for **Viktor Baumarchitektur**. The current `assets/img/logo.png` still reads "Viktor Bonsai", so the site crops it to the tree symbol and renders the approved text wordmark beside it.
- Synthetic planning files are visual direction only and must not be presented as real client proof.

## Blog / knowledge section

The blog now has seven DE articles plus EN/UK mirror pages:

- `blog/topiarschere.html` - tool choice and clean cuts.
- `blog/energie-krone.html` - crown energy, light and air.
- `blog/niwaki-bonsai-stile.html` - Niwaki, bonsai and cloud pruning style direction.
- `blog/kiefer-kerzen.html` - pine candles and timing.
- `blog/fehler-alte-nadeln-moos-pilzrisiko.html` - old needles, moss, dense crowns and fungal risk.
- `blog/boden-wurzeln.html` - Akadama, roots and substrate.
- `blog/klimastress.html` - Swiss heat/drought context for premium gardens.

## Future FR/IT localization

French and Italian are intentionally **not** full translations yet. The current generated files are noindex stubs only:

- `fr/index.html` - French coming-later mockup.
- `it/index.html` - Italian coming-later mockup.
- `handoff/fr-it-localization-reminder.md` - scope checklist for the later full localization.

Do not add full `fr/*` or `it/*` hreflang/sitemap coverage until the real translation, SEO adaptation, legal review and mobile QA are complete.

## Logo / wordmark assumption

The confirmed SEO/business/entity and visible name is **Viktor Baumarchitektur**. The supplied legacy logo says **Viktor Bonsai**; do not show the legacy text as the public wordmark. Keep the cropped symbol until a matching logo is approved.

## Change theme

The active theme is loaded with:

```html
<link id="theme-link" rel="stylesheet" href="assets/theme-v4.css">
```

Switch to another design direction by replacing `theme-v4.css` with `theme-v1.css`, `theme-v2.css`, `theme-v3.css`, or `theme-v5.css`. Use `themes.html` to preview without editing files.

## Placeholders still requiring human approval

- Contact callback production secrets: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
- Voice Lead production secrets: `OPENAI_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
- Real before/after photos, Japan postcard and testimonial.
- Final approval/originals for the supplied real Viktor master/work photos.
- Public Instagram/website photo usage permission and original files from Viktor.
- GA4, Google Ads, Search Console and consent wording review.
- Legal pages under Swiss/DSG/DSGVO requirements.
- Google rating/testimonial values.

## Local validation

Run:

```powershell
node tools/generate-site.mjs
node tools/audit-site.mjs
node tools/test-contact-api.mjs
node tools/qa-site-interactions.mjs
```

`kontakt.html` posts callback requests to `/api/contact`, which validates the phone number, blocks honeypot spam and sends a Telegram summary with server-side env only. `v2/index.html` includes a microphone lead flow. The browser records up to 300 seconds with `MediaRecorder`, sends the audio to `/api/voice-lead`, transcribes with OpenAI audio transcription, extracts lead fields locally and sends a Telegram summary to Viktor. The serverless functions do not store lead content; they only process the request and forward the message. Required server-side variables are documented in `.env.example`.

No build step is required for visitors. The generator is kept as the source of truth for consistent header/footer, DE pages and EN mirrors.

