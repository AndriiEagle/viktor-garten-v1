import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const contact = require("../api/contact.js");
const { normalizeLead, sanitize, telegramMessage, validateLead } = contact._private;

assert.equal(sanitize("  A\nB\tC  "), "A B C");
assert.equal(sanitize("x".repeat(1300)).length, 1200);

const req = {
  headers: {
    referer: "https://example.test/kontakt",
    "user-agent": "test-agent"
  }
};
const lead = normalizeLead({
  kind: "callback",
  name: "Anna Beispiel",
  phone: "+41 79 000 00 00",
  desiredTime: "Mo 18-20",
  sourceUrl: "https://example.test/kontakt",
  company: ""
}, req);
assert.equal(lead.phone, "+41 79 000 00 00");
assert.equal(validateLead(lead).ok, true);
assert.equal(validateLead({ ...lead, phone: "" }).error, "phone_required");
assert.equal(validateLead({ ...lead, honeypot: "bot" }).spam, true);

const message = telegramMessage(lead);
assert.match(message, /Neue Rückruf-Anfrage/);
assert.match(message, /Telefon: \+41 79 000 00 00/);
assert.doesNotMatch(message, /TELEGRAM_BOT_TOKEN|TELEGRAM_CHAT_ID/);

const mainJs = fs.readFileSync("assets/main.js", "utf8");
assert.match(mainJs, /viktor_cookie_consent/);
assert.match(mainJs, /fetch\(form\.getAttribute\('action'\)/);

const contactHtml = fs.readFileSync("kontakt.html", "utf8");
assert.match(contactHtml, /data-contact-form/);
assert.match(contactHtml, /action="\/api\/contact"/);
const removedMarkers = [
  "Formular " + "inaktiv",
  "Formspree" + "-Endpunkt",
  "Konzept" + "-Labels",
  "data-" + "presentation-toggle",
  "asset-" + "caption"
];
assert.equal(removedMarkers.some((marker) => contactHtml.includes(marker)), false);

console.log("CONTACT API TESTS PASSED");
