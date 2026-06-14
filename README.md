# Viktor Baumarchitektur Static Website

Static multipage DE/EN site for Viktor Baumarchitektur. It opens directly from `index.html` and is ready for static hosting on Vercel.

## Edit checklist

- Replace WhatsApp `PLACEHOLDER_NUMBER` in `tools/generate-site.mjs` or directly in generated HTML.
- Replace phone `+41000000000` and visible `[PLATZHALTER]` phone/contact data.
- Replace GA4 `G-XXXXXXX`, Google Ads `AW-XXXXXXX`, Search Console verification and form backend.
- Complete `impressum.html` and `datenschutz.html` with Viktor's legal data before publication.
- Swap real images using filenames in `assets/img/MANIFEST.md`.

## Logo / wordmark assumption

The confirmed business/entity name in `project_brief` is **Viktor Baumarchitektur**. The supplied `Лого.jpg` was converted to a real PNG at `assets/img/logo.png`, but the image wordmark says **Viktor Bonsai**. The header therefore uses a text wordmark **Viktor Baumarchitektur** and keeps `logo.png` as an available asset until the final wordmark is redrawn or approved.

## Change theme

The active theme is loaded with:

```html
<link id="theme-link" rel="stylesheet" href="assets/theme-v4.css">
```

Switch to another design direction by replacing `theme-v4.css` with `theme-v1.css`, `theme-v2.css`, `theme-v3.css`, or `theme-v5.css`. Use `themes.html` to preview without editing files.

## Placeholders still requiring human approval

- WhatsApp number, phone, e-mail and form endpoint.
- Real before/after photos, master photos and Japan postcard.
- GA4, Google Ads, Search Console and consent wording review.
- Legal pages under Swiss/DSG/DSGVO requirements.
- Google rating/testimonial values.

## Local validation

Run:

```powershell
node tools/audit-site.mjs
```

No build step is required for visitors. The generator is kept only as a maintenance helper for consistent header/footer and EN mirrors.

