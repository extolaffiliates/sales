# b1-wedding-portrait-reactivation

> **DRAFT for the founders to rewrite in their own words.** CRITIC (final, round 4): **79 / 75 / 72**. **Not at 85; do not load.** The gap is missing real data (listed below), not wording.

- **Niche:** B. Wedding photo/video studios (wedding only: the copy assumes wedding dates; portrait studios need their own variant)
- **Persona:** Owner of a small wedding photo/video studio in a US or UK city.
- **Offer:** O3 pay per booked couple (database reactivation): short notes in the studio's voice to past enquirers whose wedding date is still ahead. The studio approves every note and pays only when a couple books with a deposit. Email 2 offers three sample drafts.
- **Proof used:** B001 only, worded "a London production house". It is background, not a client result, and no client is implied. The "building case studies" free-reason is the angle `proof-bank.md` allows when no results exist.
- **Signal / why now:** **`{{icebreaker}}`:** one sentence from the prospect's contact or enquiry page describing what the form asks first. **Only studios whose form asks for the wedding date are included.** Wording: email 1 avoids "enquiries" vs "inquiries" (US/UK); the US spelling is "inquiries".

**Illustrative icebreaker rows.** These are INVENTED to show the format and are not real prospects. Never send them.
- "Your contact form asks couples for their wedding date before anything else."
- "Your enquiry form asks for the wedding date and venue up front."

## Structure: how Nick's Day 16 order was reconciled with the critic
Nick: personalization → who I am → why trust me → offer, kept short. Critic round 1: don't open on "I'm Dev"; open on their situation, then put the credential **after** the offer. Final order: **personalization (the icebreaker plus a hedged pain) → offer → why it's free plus who I am/why trust me (B001, worded "a London production house") → one small question.** The name and company sit in the signature.

**Sequence:** Nick runs 2 emails until a campaign shows 2%+ replies. The critic requires a clean, short close, so this is **3 steps**: 1 new thread (day 0) → 2 reply in thread (day 3-4, adds something new) → 3 close in thread (day 8-10). To follow Nick strictly, switch step 3 off; it doesn't change emails 1-2.

## Emails (load-ready copy in `b1-wedding-portrait-reactivation.txt`; round 1 kept in `b1-wedding-portrait-reactivation-r1.txt`)
```
Subject: couples who went quiet

Hi {{first_name}},

{{icebreaker}} So couples who went quiet left you a date, and some dates are likely still ahead.

I'd write each one a short note from {{company}}, in your voice. You approve every note, and pay only when a couple books with a deposit.

I ran outreach in-house at a London production house, so the writing is on me.

Worth a look?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. I found you via your contact page. Reply "no" and I won't email again.
===
Hi {{first_name}},

Here's how a note to one of those couples would start:

"Hi Sam, you asked us about a date in June. If you still need a photographer that day, we'd be glad to help."

Only couples whose date is still ahead would get one.

Want me to draft three for {{company}}?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll stop.
===
Hi {{first_name}},

More of those dates pass each month. The offer stands: notes in your voice, approved by you. You pay only when a couple books with a deposit.

Reply "yes" any time. I'll stop here.

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll remove you.
```

## Linter (`lint_email.py --template`)
```
Email 1: PASS  | subject: 'couples who went quiet' | 86 words | grade 4.2 | 1 question(s) | you:me 5:5
Email 2: REVIEW  | subject: None | 66 words | grade 2.6 | 1 question(s) | you:me 2:4
  [WARN] focus: Sender-focused: I/we/our=4 vs you/your=2.
Email 3: REVIEW  | subject: None | 50 words | grade 2.4 | 0 question(s) | you:me 4:2
  [WARN] cta: No question mark; is there a clear yes/no CTA?
```
No ERRORs. The remaining WARNs are judgment calls: the closes have no question mark by design, and "I" leads in the signature and close lines.

## Independent critic scores (cold-email-critic; given only the email text and persona; logs in `critic/`)
| Round | Email 1 | Email 2 | Email 3 (close) |
|---|---|---|---|
| 1 (original) | 59 | 48 | n/a |
| 2 | 73 | 73 | 70 |
| 3 | 80 | 75 | 66 |
| 4 (final, saved) | **79** | **75** | **72** |

No hard fails in rounds 2-4.

## Why it stops below 85: real data still missing
1. **The fee per booked couple** (a flat amount or a percentage). "Pay only when a couple books" without a price caps value at about 15/20.
2. **The delivery mechanics**: are notes sent from the studio's own address or inbox, and who handles the couples' data? The studio is the controller of its enquiry data, so a data processing agreement is needed.
3. **A matched client result** in `proof-bank.md`.
4. **One real tip from Dev's in-house outreach work** (not invented) to give the close something of use.

## Copy fixes the critic gave in round 4 that need no new data (apply in the founders' rewrite)
- Email 1: replace "so the writing is on me" (it reads as "free") with "I did this kind of outreach in-house at a London production house."; change the CTA to "Want to see one?"
- Email 2: make the sample say {{company}} and end on a one-word question for the couple; change the CTA to "Want three drafted for {{company}}, free, to judge the voice?"
- Email 3: carry email 2's offer forward ("The three free drafts are still yours").

## Compliance (guidance, not legal advice; `knowledge/11-deliverability-legal.md`)
- **Recipients:** US businesses and UK limited companies only. **UK sole traders and partnerships are excluded: PECR requires prior consent for them.** Germany and Austria are excluded by default. Check each row's company type (Companies House) before loading.
- **Every email** carries the sender's name with the company ("Dev, Extol Affiliates"), a light opt-out line, and the footer `{{sender_postal_address}} · {{privacy_url}}`.
- **`{{sender_postal_address}}` is a placeholder.** CAN-SPAM requires a valid physical postal address (a street address, a registered PO box or a commercial mail receiving agency) in every commercial email to US recipients. Fill it with Extol's real address before any US send. `{{privacy_url}}` must point to a live privacy notice (UK GDPR Art. 14: data source and right to object). Render it as plain text, not a tracked link.
- **The data-source P.S.** ("I found you via your …") must be true for each row. If a row came from Google Maps, a directory or Apollo, change the line to name that source.
- Honor opt-outs immediately, and never send step 3 after a reply. Nothing runs after step 3, so "I'll stop here" stays true.

## Founders' note (Nick, Month 1 Day 16)
Nick's strongest Day 16 warning is **"do not use AI for this"**: write cold email by hand. These are **AI drafts for the founders to put into their own words**; imperfect wording is fine. Keep the facts, signals and compliance lines; change the voice.
