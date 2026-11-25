# c2-production-agency-loom-teardown

> **DRAFT for the founders to rewrite in their own words.** CRITIC (final, round 4): **77 / 71 / 68**. **Not at 85; do not load.** The gap is missing real data (listed below), not wording.

- **Niche:** C. Video production companies / editing agencies
- **Persona:** Owner or MD of a small (2-15 person) video production company or editing agency in a US or UK city.
- **Offer:** O4 free 3-minute video: three brands like {{case_study_client}} that posted video in the last 30 days, plus an opening line for each; no call. Email 2 rotates to a lower-effort text version (three brands plus who to email).
- **Proof used:** B001 only, worded "a London production house". It is background, not a client result, and no client is implied. The "building case studies" free-reason is the angle `proof-bank.md` allows when no results exist.
- **Signal / why now:** **`{{icebreaker}}`:** one sentence from the prospect's work or case-studies page naming their most recent case-study client (`{{case_study_client}}`). Brand selection rule: brands in the same category as {{case_study_client}} that posted at least one video on their own social channels in the last 30 days. **Rows where it can't be built are excluded.**

**Illustrative icebreaker rows.** These are INVENTED to show the format and are not real prospects. Never send them.
- "Your latest case study is the launch film for Northside Coffee." ({{case_study_client}} = Northside Coffee)
- "The newest project on your site is a recruitment film for Brightwell Dental." ({{case_study_client}} = Brightwell Dental)

## Structure: how Nick's Day 16 order was reconciled with the critic
Nick: personalization → who I am → why trust me → offer, kept short. Critic round 1: don't open on "I'm Dev"; open on their situation, then put the credential **after** the offer. Final order: **personalization (the icebreaker plus a hedged pain) → offer → why it's free plus who I am/why trust me (B001, worded "a London production house") → one small question.** The name and company sit in the signature.

**Sequence:** Nick runs 2 emails until a campaign shows 2%+ replies. The critic requires a clean, short close, so this is **3 steps**: 1 new thread (day 0) → 2 reply in thread (day 3-4, adds something new) → 3 close in thread (day 8-10). To follow Nick strictly, switch step 3 off; it doesn't change emails 1-2.

## Emails (load-ready copy in `c2-production-agency-loom-teardown.txt`; round 1 kept in `c2-production-agency-loom-teardown-r1.txt`)
```
Subject: clients like {{case_study_client}}

Hi {{first_name}},

{{icebreaker}} Finding more clients like them is usually the slow part.

You'd get a free 3-minute video: three brands like {{case_study_client}} that posted video this month, and an opening line for each.

It's free because I'm building case studies in client-finding. I ran outreach in-house at a London production house.

Want me to record it?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. I found you via your work page. Reply "no" and I won't email again.
===
Hi {{first_name}},

If you'd rather skip the video, I can send the three brands like {{case_study_client}} in a reply, with who to email at each.

Want the three names?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll stop.
===
Hi {{first_name}},

I'll stop here. The three brands like {{case_study_client}} are yours if you ever want them. Just reply "brands".

Either way, thanks for reading.

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll remove you.
```

## Linter (`lint_email.py --template`)
```
Email 1: REVIEW  | subject: 'clients like {{case_study_client}}' | 84 words | grade 4.0 | 1 question(s) | you:me 3:5
  [WARN] clarity: Long sentence (21 words): "You'd get a free 3-minute video: three brands like {{case_study_client..."
  [WARN] focus: Sender-focused: I/we/our=5 vs you/your=3.
Email 2: REVIEW  | subject: None | 44 words | grade 2.8 | 1 question(s) | you:me 1:2
  [WARN] clarity: Long sentence (23 words): "If you'd rather skip the video, I can send the three brands like {{cas..."
  [WARN] focus: Sender-focused: I/we/our=2 vs you/your=1.
Email 3: REVIEW  | subject: None | 41 words | grade 2.5 | 0 question(s) | you:me 3:2
  [WARN] cta: No question mark; is there a clear yes/no CTA?
```
No ERRORs. The remaining WARNs are judgment calls: the closes have no question mark by design, and "I" leads in the signature and close lines.

## Independent critic scores (cold-email-critic; given only the email text and persona; logs in `critic/`)
| Round | Email 1 | Email 2 | Email 3 (close) |
|---|---|---|---|
| 1 (original) | 57 | 47 | n/a |
| 2 | 77 | 67 | 56 |
| 3 | 79 | 72 | 64 |
| 4 (final, saved) | **77** | **71** | **68** |

No hard fails in rounds 2-4.

## Why it stops below 85: real data still missing
1. **One real, pre-researched brand per prospect** (`{{brand_1}}`, chosen by the selection rule before sending), so email 3 can give one away and "the three brands" is literally true.
2. **A matched client result** in `proof-bank.md`.
3. **The true lead source per row.**

## Copy fixes the critic gave in round 4 that need no new data (apply in the founders' rewrite)
- Email 1: replace "Finding more clients like them is usually the slow part." with a line on why one case study makes the next client in that category easier; say "in the last 30 days", not "this month".
- Email 2: add "Each one posted video in the last 30 days, so you're not selling them on video itself."; change the CTA to "Want the list?"
- Email 3: give {{brand_1}} away; "Reply 'brands' any time and I'll pick a fresh three."

## Compliance (guidance, not legal advice; `knowledge/11-deliverability-legal.md`)
- **Recipients:** US businesses and UK limited companies only. **UK sole traders and partnerships are excluded: PECR requires prior consent for them.** Germany and Austria are excluded by default. Check each row's company type (Companies House) before loading.
- **Every email** carries the sender's name with the company ("Dev, Extol Affiliates"), a light opt-out line, and the footer `{{sender_postal_address}} · {{privacy_url}}`.
- **`{{sender_postal_address}}` is a placeholder.** CAN-SPAM requires a valid physical postal address (a street address, a registered PO box or a commercial mail receiving agency) in every commercial email to US recipients. Fill it with Extol's real address before any US send. `{{privacy_url}}` must point to a live privacy notice (UK GDPR Art. 14: data source and right to object). Render it as plain text, not a tracked link.
- **The data-source P.S.** ("I found you via your …") must be true for each row. If a row came from Google Maps, a directory or Apollo, change the line to name that source.
- Honor opt-outs immediately, and never send step 3 after a reply. Nothing runs after step 3, so "I'll stop here" stays true.

## Founders' note (Nick, Month 1 Day 16)
Nick's strongest Day 16 warning is **"do not use AI for this"**: write cold email by hand. These are **AI drafts for the founders to put into their own words**; imperfect wording is fine. Keep the facts, signals and compliance lines; change the voice.
