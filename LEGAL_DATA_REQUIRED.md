# Legal Data Implemented For Production Handoff

Legal data approved by Viktor/Andrii has been implemented in the generated German, English and Ukrainian legal pages. Do not add invented UID/MWST/VAT, registration or legal entity data later unless Viktor provides exact real values.

## Implemented Public Legal Data

- Operator / responsible person: Viktor Kolesnikov.
- Business name used for legal pages: Viktor Garten.
- Address: Grosswiesenstrasse 63, 8422 Pfungen, Schweiz.
- Email: vik.garten@gmail.com.
- Phone: +41 78 313 03 30.
- Responsible for content: Viktor Kolesnikov.
- UID/MWST/VAT: omitted because no real number has been provided.

## Services And Processors Mentioned In Privacy Wording

- Cloudflare Pages/DNS/CDN/security.
- Hostpoint for email and mail-related DNS records.
- Telegram lead notifications for contact/callback requests.
- Google Search Console later via DNS TXT verification.
- GA4 and Google Ads are described as inactive until real IDs are configured; the privacy policy must be updated before activation.

## Production Gate

- Preview deployment on Cloudflare Pages is OK for testing.
- Run `node tools/audit-production-handoff.mjs` after `node tools/build-cloudflare-pages.mjs`.
- The handoff audit must pass before client handoff or production custom-domain launch.
- Before adding production custom domains, also verify Telegram delivery with real Cloudflare Pages env vars.
