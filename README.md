# Viktor Baumarchitektur Static Website

Static multipage DE/EN/UK V1 site for Viktor Baumarchitektur. It is prepared for Cloudflare Pages Free at `https://v-garten.ch`.

## Edit checklist

- Verify final WhatsApp/phone before publication: `+41 78 313 03 30`.
- Replace GA4 `G-XXXXXXX`, Google Ads `AW-XXXXXXX` and Search Console verification.
- Visible header/footer wordmark is **Viktor Baumarchitektur**.
- Complete `impressum.html` and `datenschutz.html` with Viktor's legal data before publication.
- Swap real images using filenames in `assets/img/MANIFEST.md`.
- TODO: create a final matching logo lockup for **Viktor Baumarchitektur**. The current `assets/img/logo.png` still reads "Viktor Bonsai", so the site crops it to the tree symbol and renders the approved text wordmark beside it.
- Synthetic planning files are visual direction only and must not be presented as real client proof.

## Blog / knowledge section

The blog now has five DE articles plus EN/UK mirror pages:

- `blog/topiarschere.html` - tool choice and clean cuts.
- `blog/energie-krone.html` - crown energy, light and air.
- `blog/niwaki-bonsai-stile.html` - Niwaki, bonsai and cloud pruning style direction.
- `blog/kiefer-kerzen.html` - pine candles and timing.
- `blog/klimastress.html` - Swiss heat/drought context for premium gardens.

## AI / local discovery pages

The site includes focused DE/EN answer and service-area pages for retrieval search and local SEO:

- `niwaki-schweiz.html` / `en/niwaki-schweiz.html` - Niwaki Schweiz.
- `gartenbonsai-zuerich.html` / `en/gartenbonsai-zuerich.html` - Garten-Bonsai Zürich.
- `japanischer-ahorn-pflege-schweiz.html` / `en/japanischer-ahorn-pflege-schweiz.html` - Acer palmatum Pflege.
- `kiefer-kerzen-schneiden-schweiz.html` / `en/kiefer-kerzen-schneiden-schweiz.html` - Kiefer Kerzen schneiden.
- `kosten-japanische-baumpflege-zuerich.html` / `en/kosten-japanische-baumpflege-zuerich.html` - Preise Zürich.
- `zuerichsee.html` / `en/zuerichsee.html` - Niwaki und Gartenbonsai am Zürichsee.
- `zug.html` / `en/zug.html` - Niwaki und japanische Baumpflege in Zug.
- `luzern-aargau.html` / `en/luzern-aargau.html` - Niwaki-Pflege in Luzern und Aargau.

External launch steps are tracked in `handoff/ai-local-discovery-checklist.md`: Cloudflare Pages custom domain, Search Console, Bing Webmaster Tools, Google Business Profile, Apple/Bing/local.ch citations and monthly AI monitoring.

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

- Cloudflare Pages Function secrets for V1 contact delivery: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
- V2 voice/OpenAI lead flow is intentionally excluded from Cloudflare Pages V1 deployment. Do not configure `OPENAI_API_KEY` for this launch.
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
node tools/build-cloudflare-pages.mjs
node tools/qa-site-interactions.mjs
```

`kontakt.html` posts callback requests to `/api/contact`, which validates the phone number, blocks honeypot spam and sends a Telegram summary with Cloudflare Pages Function env only. `v2/` and `/api/voice-lead` are not copied to `dist` and are not part of the Cloudflare Pages V1 launch.

Cloudflare Pages build command: `node tools/generate-site.mjs && node tools/build-cloudflare-pages.mjs`. Output directory: `dist`.

