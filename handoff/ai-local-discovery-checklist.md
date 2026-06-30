# AI / Local Discovery Handoff

Status: repo-side implementation is prepared. External accounts still need human access and approval.

## 1. Domain and Cloudflare Pages

- Deploy V1 through Cloudflare Pages Free from the GitHub repository.
- Add `v-garten.ch` and `www.v-garten.ch` as Cloudflare Pages custom domains.
- Keep Hostpoint mail MX/TXT/SPF/DMARC records as DNS-only records in Cloudflare.
- Do not publish `v2/`, `/api/voice-lead`, OpenAI transcription code, or raw handoff/transcription folders in the Cloudflare Pages output.
- Acceptance:
  - `https://v-garten.ch/` returns 200.
  - `https://v-garten.ch/robots.txt`, `https://v-garten.ch/sitemap.xml`, and `https://v-garten.ch/llms.txt` return 200.
  - `www.v-garten.ch` redirects or resolves consistently to the chosen canonical host.

## 2. Search Indexing

- Google Search Console: create a Domain property for `v-garten.ch`, verify by DNS, submit `https://v-garten.ch/sitemap.xml`.
- Bing Webmaster Tools: add the domain, submit the sitemap, enable IndexNow if available.
- Run URL inspection for: `https://v-garten.ch/`, `https://v-garten.ch/niwaki-schweiz`, `https://v-garten.ch/gartenbonsai-zuerich`, `https://v-garten.ch/kontakt`.

## 3. Google Business Profile

- Default setup: service-area business, no private address displayed unless Viktor explicitly approves.
- Business name: Viktor Garden.
- Primary category: Baumpflege / tree service equivalent available in GBP. Secondary categories only if accurate.
- Areas: Zürich, Zürichsee, Zug, Luzern, Aargau, Schwyz, Schaffhausen, Appenzell, Glarus.
- Services: Niwaki / Garten-Bonsai, Japanischer Ahorn Pflege, Kiefer Formschnitt, Nadelgehölze, kostenlose Foto-Diagnose.
- Add real photos only: Viktor at work, before/after, finished trees, garden context.
- Start review funnel after every completed job. Do not add fake or placeholder reviews.

## 4. Citations and Entity Profiles

Create or claim profiles only when Viktor can verify ownership:

- Apple Business Connect
- Bing Places
- local.ch / search.ch / localsearch
- Facebook
- Instagram
- Houzz or relevant Swiss garden/professional directories

Keep NAP consistent:

- Name: Viktor Garden
- Phone: +41 78 313 03 30
- Website: https://v-garten.ch/
- Address: service-area only unless approved

Only add new profiles to JSON-LD `sameAs` after the public profile URL is live and controlled.

## 5. Monthly AI Monitoring

Check ChatGPT Search, Gemini/Google AI, Perplexity and Copilot with these query groups:

- "Niwaki Schweiz"
- "Gartenbonsai Zürich"
- "Japanischer Ahorn Pflege Schweiz"
- "Kiefer Kerzen schneiden Schweiz"
- "Was kostet japanische Baumpflege Zürich"
- "best niwaki specialist Zurich"

Log each result as: mentioned, cited, absent, wrong facts, action needed.

