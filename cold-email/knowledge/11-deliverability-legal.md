# 11 · Deliverability, infrastructure and law

> "Good deliverability doesn't guarantee you'll succeed. But bad deliverability guarantees you'll fail." (Lieben) [R04]
>
> "To get past spam filters, think about what spammers do, and do the opposite." (Eric) [R05]

## Provider rules (hard requirements) [R03]
- **SPF, DKIM and DMARC** aligned with the From domain.
  - Gmail and Yahoo: from Feb 2024. Gmail enforcement tightened in Nov 2025.
  - Outlook consumer mailboxes: from 5 May 2025.
- **Spam complaint rate under 0.1%; never 0.3% or more.**
- **One-click unsubscribe (RFC 8058)** for bulk senders. Honor opt-outs within 2 days.
- **The spam complaint rate is the most important metric** (Eric's 1,000-emails-from-one-inbox test still landed in the inbox) [R05].

## Infrastructure defaults (GEX 2024, consensus) [R05]
| Setting | Default |
|---|---|
| Domains | Secondary domains only (never the main brand domain), each redirecting to the main site |
| Inboxes | **2 per domain**; Google Workspace plus Microsoft/Outlook; **avoid private SMTP** |
| Volume | **30 emails per inbox per day** (good campaigns up to about 60); at least 10 minutes between sends |
| Warmup | **3 weeks** minimum before cold sends |
| Spare capacity | **Keep 50% of sending capacity warming** (agencies: 4 batches, Google/Outlook alternating) |
| Tracking | **No open or click tracking** (pixels cost 8–12% inbox placement, Harvey). If you must, use a custom tracking domain |
| Format | Plain text; no links, images or attachments in email 1 |
| Spintax | Not needed when AI-written lines already vary the copy. Never swap single words |
| ESP matching (Google→Gmail, Outlook→Outlook) | Helps, but add it only once something works |
| Warmup copy | Use your real campaign copy in warmup where the tool supports it (Eric's prediction) |

## Lists [R05]
- **Verify** every list (MillionVerifier is cheapest; then a second verifier; then Instantly's verification for questionable addresses).
- **Skip catch-all domains** by default (Eric). Keep hard bounces under 2%.
- **Any 550 bounce = the receiving server thinks you're a spammer.** Change the copy drastically and swap inboxes.
- Re-verify every 60–90 days.
- **Never guess emails from patterns** like first.last@ (LeadMagic P02).

## Health checks
- About **1% reply rate excluding out-of-office after 200+ sends** = you're landing in the inbox ("even people telling us no").
- Under that, audit before you test copy.
- Seed tests (GlockApps etc.) are directional only.

## Which platform
Instantly and Smartlead gave identical reply and positive-reply rates on the same inboxes across 5 campaigns (Eric). Pick on integrations and price [R05].

## Law: footer and targeting by country [R03][R06]
| Country | Rule | What to include |
|---|---|---|
| **US (CAN-SPAM)** | No opt-in needed, B2B included | Real sender identity, non-deceptive subject, **physical postal address**, opt-out honored within 10 business days |
| **UK (PECR + UK GDPR)** | Limited companies: legitimate interest plus opt-out. **Sole traders and partnerships need consent** | Right-to-object line, data source, privacy link |
| **EU (GDPR + ePrivacy)** | Documented legitimate-interest assessment; some countries stricter | Right to object **in email 1**, data source, privacy link (Art. 14/21) |
| **Germany (UWG §7)** | **Prior express consent required for B2B email too.** A single unsolicited ad email can be unlawful (BGH I ZR 218/07) | **Default: do not cold email German recipients** |
| **Austria (TKG 2021 §174)** | **Prior consent required.** Fines up to €50K; a managing director was fined personally in 2023 | **Default: exclude Austria** |
| **Canada (CASL)** | Implied consent only if the address was conspicuously published and the message relates to their role | Sender ID, unsubscribe |
| **India (DPDP Act 2023, Rules 2025)** | No email anti-spam law; DPDP consent duties in force by 13 May 2027. The §3(c)(ii) exemption for self-published data is narrow | Transparency, opt-out, use data the person published themselves |

- **Scraping:** don't scrape behind a login or with accounts. hiQ v. LinkedIn: anti-scraping terms are enforceable as contract. Logged-out scraping of public data fared better (Meta v. Bright Data 2024) [R06].
- **Bought lists:** use only data with provable provenance, and keep the source for each contact [R06].

**Light opt-out lines that keep the tone:**
- "P.S. If this isn't relevant, let me know and I'll stop."
- "Not relevant? Reply 'no' and I won't email again."

*This is guidance, not legal advice.*
