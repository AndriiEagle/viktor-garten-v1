# Legal Data Required Before Production Handoff

Legal data is not available yet. Do not invent it and do not publish the production custom domains for client handoff while `impressum.html` or `datenschutz.html` still contain placeholder text.

## Required From Viktor

- Official legal/company/person name to display in the Impressum.
- Full postal address.
- Responsible person for the website and legal/privacy notices.
- Public contact email.
- Public contact phone.
- UID/MWST/VAT number, if one exists and should be displayed.
- Privacy contact, if different from the public contact.
- Final approval of German `Impressum` wording.
- Final approval of German `Datenschutz` wording.
- Decision whether English and Ukrainian legal pages should be final translations, short mirrors, or noindex/internal pages.

## Services And Processors To Mention In Privacy Wording

- Cloudflare Pages for website hosting.
- Cloudflare DNS for DNS/proxy/security.
- Hostpoint for email and mail-related DNS records.
- Telegram lead notifications for contact/callback requests.
- Google Search Console later, after DNS TXT verification is added.
- GA4 later, only if a real GA4 ID is activated.
- Google Ads later, only if a real Ads ID and conversion label are activated.

## Production Gate

- Preview deployment on Cloudflare Pages is OK for testing.
- Do not add `v-garten.ch` or `www.v-garten.ch` as production custom domains until legal placeholders are replaced with approved legal text, unless Viktor explicitly approves publishing the draft legal pages.
- Run `node tools/audit-production-handoff.mjs` after `node tools/build-cloudflare-pages.mjs`.
- The handoff audit must pass before client handoff.
