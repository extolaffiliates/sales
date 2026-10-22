---
name: cold-email-deliverability
description: Plans and audits cold email infrastructure and compliance. Covers SPF/DKIM/DMARC, secondary domains, 2 inboxes per domain, 30 sends per inbox per day, 3-week warmup, 50% spare warming capacity, no open/click tracking, list verification and skipping catch-alls, 550-bounce triage, spam-complaint limits, and the legal rules and footer per country (US, UK, EU, Germany and Austria consent, Canada, India DPDP). Use when the user asks "how many domains/inboxes", "set up cold email", "are we going to spam", "bounces are high", "is this legal in X", or before any launch.
---

# Deliverability and compliance

**Load:** `cold-email/knowledge/11-deliverability-legal.md`. Detail is in report 03 §A and report 05 §4.1.

## 1. Sizing
1. Ask for the target new contacts per day and the sequence length.
2. Daily sends ≈ new contacts per day × steps actually sent.
3. **Inboxes = daily sends ÷ 30.**
4. **Domains = inboxes ÷ 2.**
5. **Add 50% spare capacity, warming.** Agencies: 4 batches alternating Google and Outlook.
6. Show the maths, with the warmup timeline (3 weeks).

## 2. Audit checklist (pass/fail for each)
- [ ] Secondary domains only, each redirecting to the main site.
- [ ] SPF, DKIM and DMARC aligned.
- [ ] One-click unsubscribe if bulk; opt-outs honored within 48h.
- [ ] Google Workspace and/or Microsoft inboxes, no private SMTP; 2 per domain.
- [ ] 30 sends per inbox per day (up to 60 only for proven campaigns); 10+ minutes between sends.
- [ ] Warmed for at least 3 weeks; using real copy in warmup where possible.
- [ ] No open or click tracking (or a custom tracking domain).
- [ ] Plain text; email 1 has no links, images or attachments.
- [ ] List verified with 2 verifiers; **catch-alls skipped**; bounces under 2%; no pattern-guessed emails.
- [ ] Spam complaints under 0.1% (Postmaster Tools).
- [ ] Health: about 1% reply rate excluding out-of-office after 200+ sends.

## 3. Incident triage
| Symptom | Action |
|---|---|
| **550 bounces** | The receiver thinks you're spam. Pause, change the copy drastically, swap inboxes, re-verify the list |
| **Bounces above 2%** | Re-verify; skip catch-alls; check the data source |
| **Sudden zero replies** | Check placement with a seed test; rotate to the warmed spare batch |
| **Outlook rejecting** | Consider pausing sends to Outlook recipients (GEX late-2024 tactic) or matching mail providers |

## 4. Compliance by country
Output the footer and opt-out line for each target country. **Germany and Austria: recommend not cold emailing** (prior consent is required, even B2B). UK sole traders need consent. EU: right-to-object notice in email 1 plus the data source. India: be transparent, plan for DPDP by May 2027.

*Guidance, not legal advice.*

## Output
The sizing maths, the pass/fail checklist, the top 3 fixes in priority order, and footer text for each country.
