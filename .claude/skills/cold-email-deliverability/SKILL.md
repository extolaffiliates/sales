---
name: cold-email-deliverability
description: Audit and plan cold email infrastructure and compliance. Covers SPF/DKIM/DMARC, secondary domains, inboxes, warmup, sending volumes, tracking settings, list verification, Gmail/Yahoo/Outlook sender rules, and the legal footer by country (CAN-SPAM, GDPR, UK PECR, CASL). Use when the user asks "how many domains do I need", "set up cold email infrastructure", "are my emails going to spam", "is this legal", or before launching any campaign.
---

# Cold email deliverability and compliance

Read `cold-email/playbook.md` §7 and `research/cold-email/03-deliverability-compliance-psychology.md` §A. That file marks which rules come from mailbox providers (**[Official]**) and which are vendor advice (**[Vendor]**). Keep that distinction when you advise.

## 1. Size the infrastructure
Ask for target new contacts per day and the sequence length. Then:
1. Daily sends ≈ new contacts per day × average steps actually sent.
2. Inboxes = daily sends ÷ 20 (safe range 10–30 per inbox).
3. Domains = inboxes ÷ 2–3.
4. Add about 20% spare capacity for rotation.

Show the maths. Example: Saraev's earlier plan was 20 domains with 60 mailboxes, or 3 per domain.

## 2. Setup checklist (pass/fail for each)
- [ ] Sending from secondary domains, never the main brand domain. Each one redirects to the main site.
- [ ] SPF, DKIM (2048-bit) and DMARC (start with `p=none`, add reporting) all aligned with the From domain.
- [ ] One-click unsubscribe headers (RFC 8058) if any domain could reach about 5,000 a day to Gmail. The opt-out is honored within 2 days.
- [ ] Inboxes warmed up for 14–28 days before cold sends, with sends ramped from 5–10 a day.
- [ ] Plain text. Click tracking off. Open tracking off, or on a custom tracking domain only.
- [ ] No links, images or attachments in email 1.
- [ ] List verified within the last 60–90 days. Catch-all addresses excluded or sent separately. Hard bounces under 2%.
- [ ] Spam complaints monitored (Google Postmaster Tools) and kept under 0.1%, never reaching 0.3%.
- [ ] Sending window set to recipients' business hours, with randomized gaps between sends.
- [ ] Wording varies only at the sentence level, never by swapping single words. Real per-lead first lines are better.

## 3. Legal footer by the recipient's country
| Country | Must include |
|---|---|
| US (CAN-SPAM) | A real sender name and company, a non-deceptive subject, a physical postal address, and a working opt-out honored within 10 business days (2 days for Gmail/Yahoo bulk senders) |
| EU (GDPR + ePrivacy) | A documented legitimate-interest assessment, a right-to-object line in email 1, where the data came from, and a privacy notice link. Some EU countries require prior consent for B2B email, so check the country. |
| UK (PECR + UK GDPR) | Limited companies are fine with legitimate interest plus an opt-out; sole traders and partnerships need consent. Include a right-to-object line. |
| Canada (CASL) | Implied consent only if the address was conspicuously published *and* the message relates to their role. Include sender identification and an unsubscribe. |

A light opt-out line that keeps the tone: "Not relevant? Reply 'no' and I won't email again."

**This is guidance, not legal advice.** Flag EU country rules and the exact dates for Outlook and Yahoo requirements as things to check against official pages.

## 4. Output
A pass/fail checklist, the sizing maths, the top 3 fixes in priority order, and the footer text for each target country.
