# Cloudflare Pages Deployment

## Project

- Repository: `AndriiEagle/viktor-garten-v1`
- Production branch: `main`
- Build command: `node tools/generate-site.mjs && node tools/build-cloudflare-pages.mjs`
- Output directory: `dist`

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
