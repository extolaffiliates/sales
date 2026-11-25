# b2-wedding-portrait-partner-list

> **DRAFT for the founders to rewrite in their own words.** CRITIC (final, round 4): **81 / 78 / 73**. **Not at 85; do not load.** The gap is missing real data (listed below), not wording.

- **Niche:** B. Wedding photo/video studios
- **Persona:** Owner of a small wedding photo/video studio in a US or UK city.
- **Offer:** O13 free list: {{city}} venues that publish a recommended- or preferred-suppliers page, who's on each and who adds new names (the coordinator). **This is checkable:** it replaces round 1's unverifiable "no go-to photographer". Email 2 offers 5 venues besides {{venue}} that don't list {{company}} yet.
- **Proof used:** B001 only, worded "a London production house". It is background, not a client result, and no client is implied. The "building case studies" free-reason is the angle `proof-bank.md` allows when no results exist.
- **Signal / why now:** **`{{icebreaker}}`:** one sentence from the prospect's blog or portfolio naming the venue they feature most; that venue also fills `{{venue}}`. **Rows where it can't be built are excluded.** Email 2's engagement-season line is dated: **send step 2 in November-December only.**

**Illustrative icebreaker rows.** These are INVENTED to show the format and are not real prospects. Never send them.
- "Your blog has three weddings at Oakridge Barn this year."
- "Most of the galleries on your site are from Hillcrest Manor."

## Structure: how Nick's Day 16 order was reconciled with the critic
Nick: personalization → who I am → why trust me → offer, kept short. Critic round 1: don't open on "I'm Dev"; open on their situation, then put the credential **after** the offer. Final order: **personalization (the icebreaker plus a hedged pain) → offer → why it's free plus who I am/why trust me (B001, worded "a London production house") → one small question.** The name and company sit in the signature.

**Sequence:** Nick runs 2 emails until a campaign shows 2%+ replies. The critic requires a clean, short close, so this is **3 steps**: 1 new thread (day 0) → 2 reply in thread (day 3-4, adds something new) → 3 close in thread (day 8-10). To follow Nick strictly, switch step 3 off; it doesn't change emails 1-2.

## Emails (load-ready copy in `b2-wedding-portrait-partner-list.txt`; round 1 kept in `b2-wedding-portrait-partner-list-r1.txt`)
```
Subject: {{city}} venues

Hi {{first_name}},

{{icebreaker}} If their coordinator sends couples your way, a lot of your bookings may ride on one person.

You could have a free list of {{city}} venues with a suppliers page: who's on each, and who adds names.

It's free because I'm building case studies in client-finding for wedding businesses. I ran outreach in-house at a London production house.

Want the {{city}} list?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. I found you via your blog. Reply "no" and I won't email again.
===
Hi {{first_name}},

Plenty of couples get engaged over Christmas and New Year. A venue's suppliers page is one place they'd find you.

Shorter version: 5 venues near {{city}} besides {{venue}}, with the coordinator's name for each.

Want the 5?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll stop.
===
Hi {{first_name}},

I'll stop here. The {{city}} venue list is still yours if you want it. Just reply "list".

Either way, thanks for reading.

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll take {{company}} off my list for good.
```

## Linter (`lint_email.py --template`)
```
Email 1: PASS  | subject: '{{city}} venues' | 88 words | grade 4.3 | 1 question(s) | you:me 5:4
Email 2: PASS  | subject: None | 52 words | grade 4.5 | 1 question(s) | you:me 1:1
Email 3: REVIEW  | subject: None | 43 words | grade 2.7 | 0 question(s) | you:me 2:3
  [WARN] cta: No question mark; is there a clear yes/no CTA?
  [WARN] focus: Sender-focused: I/we/our=3 vs you/your=2.
```
No ERRORs. The remaining WARNs are judgment calls: the closes have no question mark by design, and "I" leads in the signature and close lines.

## Independent critic scores (cold-email-critic; given only the email text and persona; logs in `critic/`)
| Round | Email 1 | Email 2 | Email 3 (close) |
|---|---|---|---|
| 1 (original) | 62 | 48 | n/a |
| 2 | 73 | 64 | 59 |
| 3 | 80 | 78 | 70 |
| 4 (final, saved) | **81** | **78** | **73** |

No hard fails in rounds 2-4.

## Why it stops below 85: real data still missing
1. **A matched client result** in `proof-bank.md`.
2. **Any sourced figure on when couples choose suppliers** (optional; it would firm up email 2's seasonal reason).
3. **The true lead source per row** (the P.S. says "your blog"; use "your site" where it was the portfolio).

## Copy fixes the critic gave in round 4 that need no new data (apply in the founders' rewrite)
- Email 1: "I can send you a free list of {{city}} venues that have a suppliers page: which photographers are on each, and the coordinator who decides." Start it with "So you're not relying on {{venue}} alone,".
- Email 2: lead with the 5-venue line; change the second line to "...one place they look for a photographer."
- Email 3: "The 5 venues near {{city}} besides {{venue}} are still yours if you want them."

## Compliance (guidance, not legal advice; `knowledge/11-deliverability-legal.md`)
- **Recipients:** US businesses and UK limited companies only. **UK sole traders and partnerships are excluded: PECR requires prior consent for them.** Germany and Austria are excluded by default. Check each row's company type (Companies House) before loading.
- **Every email** carries the sender's name with the company ("Dev, Extol Affiliates"), a light opt-out line, and the footer `{{sender_postal_address}} · {{privacy_url}}`.
- **`{{sender_postal_address}}` is a placeholder.** CAN-SPAM requires a valid physical postal address (a street address, a registered PO box or a commercial mail receiving agency) in every commercial email to US recipients. Fill it with Extol's real address before any US send. `{{privacy_url}}` must point to a live privacy notice (UK GDPR Art. 14: data source and right to object). Render it as plain text, not a tracked link.
- **The data-source P.S.** ("I found you via your …") must be true for each row. If a row came from Google Maps, a directory or Apollo, change the line to name that source.
- Honor opt-outs immediately, and never send step 3 after a reply. Nothing runs after step 3, so "I'll stop here" stays true.

## Founders' note (Nick, Month 1 Day 16)
Nick's strongest Day 16 warning is **"do not use AI for this"**: write cold email by hand. These are **AI drafts for the founders to put into their own words**; imperfect wording is fine. Keep the facts, signals and compliance lines; change the voice.
