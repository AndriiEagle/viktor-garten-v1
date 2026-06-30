# Cloudflare Pages Deployment

## Project

- Repository: `AndriiEagle/viktor-garten-v1`
- Production branch: `main`
- Build command: `node tools/generate-site.mjs && node tools/build-cloudflare-pages.mjs`
- Output directory: `dist`

## Production Handoff Gate

- Legal data is not available yet.
- Cloudflare Pages preview deployment is OK for technical testing.
- Do not add production custom domains and do not hand over the site to the client while `impressum.html`, `datenschutz.html`, `en/impressum.html`, `en/datenschutz.html`, `uk/impressum.html`, or `uk/datenschutz.html` contain placeholder legal text.
- Required legal data is listed in `LEGAL_DATA_REQUIRED.md`.
- After building `dist`, run `node tools/audit-production-handoff.mjs`.
- The handoff audit must pass before production custom-domain launch, unless Viktor explicitly approves publishing draft legal pages.

## Environment Variables

Required for the V1 contact form:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Not required for this launch:

- `OPENAI_API_KEY`

Do not configure V2 voice, OpenAI transcription, or `/api/voice-lead` for the V1 Cloudflare Pages launch.

## Domain And DNS

- `v-garten.ch` is already active on Cloudflare.
- Hostpoint remains the registrar.
- Cloudflare is the DNS provider.
- The live domain may show Hostpoint parking until Cloudflare Pages custom domains are connected.

Add Cloudflare Pages custom domains:

- `v-garten.ch`
- `www.v-garten.ch`

Only add these production custom domains after:

- Pages preview has been tested.
- `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are configured and contact form delivery is verified.
- Legal placeholders are replaced with approved legal text or explicitly approved for publication by Viktor.

If Cloudflare reports DNS conflicts, remove or replace only old Hostpoint web records that point to parking/origin and are not needed:

- `A v-garten.ch`
- `AAAA v-garten.ch`
- `A www`
- `AAAA www`
- `A *`
- `AAAA *`

Keep mail/service records and keep them DNS-only:

- `MX`
- `TXT SPF`
- `TXT DMARC`
- `TXT DKIM` if present
- `CNAME autoconfig`
- `CNAME autodiscover`

## Search Console

- Use a Domain property.
- Verify with a DNS TXT record in Cloudflare.
- Do not add a fake `google-site-verification` meta tag.
- After launch, submit `https://v-garten.ch/sitemap.xml`.

## Analytics

- Real GA4 ID: TODO.
- Real Google Ads ID: TODO.
- Real Google Ads conversion label: TODO.
- Analytics and Ads stay disabled when IDs are absent.
- Test `generate_lead` events before ad spend.

## Remaining P2 Items

- Spam timing gate: the contact function already has a honeypot. A min-submit-time gate can be added later, but should be tested with real mobile form submissions before production enforcement.
- Heavy images to optimize after visual approval:
  - `assets/img/logo.png`
  - `assets/img/baumarchitektur-korrektur.png`
  - `assets/img/baumarchitektur-live-crown-ratio.png`
  - `assets/img/baumarchitektur-energiefluss-verstehen.png`
- Suggested optimization workflow:
  - Create optimized copies first, not destructive overwrites.
  - Compare desktop and mobile screenshots before replacing originals.
  - If converting PNG to WebP/AVIF, update references in `tools/generate-site.mjs`, regenerate, rebuild `dist`, and run broken-image checks.
  - Example with `cwebp` if installed: `cwebp -q 82 assets/img/baumarchitektur-korrektur.png -o assets/img/baumarchitektur-korrektur.webp`.
  - Example with ImageMagick if installed: `magick assets/img/logo.png -strip -resize 256x256 assets/img/logo-256.png`.

## Manual Launch Test

- Homepage: `https://v-garten.ch/`
- Gallery: `https://v-garten.ch/galerie`
- Contact: `https://v-garten.ch/kontakt`
- English: `https://v-garten.ch/en/`
- Ukrainian: `https://v-garten.ch/uk/`
- Sitemap: `https://v-garten.ch/sitemap.xml`
- Robots: `https://v-garten.ch/robots.txt`
- Canonical source uses `https://v-garten.ch/`
- `www.v-garten.ch` redirects to or consistently resolves with root domain.
- SSL certificate is active.
- Phone click fires a lead event.
- WhatsApp click fires a lead event.
- Contact form and callback form return success only after Telegram delivery.
- Telegram lead is received.
