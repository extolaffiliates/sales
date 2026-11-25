# a2-real-estate-media-free-test

> **DRAFT for the founders to rewrite in their own words.** CRITIC (final, round 4): **79 / 72 / 70**. **Not at 85; do not load.** The gap is missing real data (listed below), not wording.

- **Niche:** A. Real estate photo/video businesses
- **Persona:** Owner of a small (1-5 person) real estate photo/video business in a US or UK city.
- **Offer:** O10 free test campaign: Dev emails {{city}} agents who don't use the prospect yet, pitching the prospect's shoots. The prospect approves every word; agents who reply go straight to the prospect. Costs nothing.
- **Proof used:** B001 only, worded "a London production house". It is background, not a client result, and no client is implied. The "building case studies" free-reason is the angle `proof-bank.md` allows when no results exist.
- **Signal / why now:** **`{{icebreaker}}`:** the same gallery-credits line as a1 (who they shoot for most). Why-now is seasonal at the segment level: winter listings slow until spring. **Rows where it can't be built are excluded.** `[street]` in email 2 is a visible placeholder inside the quoted sample, not a merge field.

**Illustrative icebreaker rows.** These are INVENTED to show the format and are not real prospects. Never send them.
- "Your gallery credits most of your recent shoots to Harbor & Main Realty."
- "Most shoots on your listings page since September are for the same three agents."

## Structure: how Nick's Day 16 order was reconciled with the critic
Nick: personalization → who I am → why trust me → offer, kept short. Critic round 1: don't open on "I'm Dev"; open on their situation, then put the credential **after** the offer. Final order: **personalization (the icebreaker plus a hedged pain) → offer → why it's free plus who I am/why trust me (B001, worded "a London production house") → one small question.** The name and company sit in the signature.

**Sequence:** Nick runs 2 emails until a campaign shows 2%+ replies. The critic requires a clean, short close, so this is **3 steps**: 1 new thread (day 0) → 2 reply in thread (day 3-4, adds something new) → 3 close in thread (day 8-10). To follow Nick strictly, switch step 3 off; it doesn't change emails 1-2.

## Emails (load-ready copy in `a2-real-estate-media-free-test.txt`; round 1 kept in `a2-real-estate-media-free-test-r1.txt`)
```
Subject: winter shoots

Hi {{first_name}},

{{icebreaker}} If they slow down this winter, so does your calendar.

I'd email {{city}} agents who don't use you yet and offer your shoots, free. You approve every word; agents who reply go straight to you.

It's free: I'm building case studies, and I used to run outreach in-house at a London production house.

Worth a try before spring?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. I found you via your gallery credits. Reply "no" and I won't email again.
===
Hi {{first_name}},

Here's the first line I'd send agents for you:

"Saw your listing on [street]. For your next one, {{company}} shoots homes like it in {{city}}."

It would only go to {{city}} agents you don't shoot for yet, to fill the quiet weeks.

Want me to draft the rest?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll stop.
===
Hi {{first_name}},

I'll stop here. If a quiet week does show up, reply "test" and I'll send the draft for you to approve.

Either way, thanks for reading.

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll remove you.
```

## Linter (`lint_email.py --template`)
```
Email 1: PASS  | subject: 'winter shoots' | 84 words | grade 4.5 | 1 question(s) | you:me 7:5
Email 2: PASS  | subject: None | 63 words | grade 2.5 | 1 question(s) | you:me 4:3
Email 3: REVIEW  | subject: None | 42 words | grade 2.8 | 0 question(s) | you:me 2:3
  [WARN] cta: No question mark; is there a clear yes/no CTA?
  [WARN] focus: Sender-focused: I/we/our=3 vs you/your=2.
```
No ERRORs. The remaining WARNs are judgment calls: the closes have no question mark by design, and "I" leads in the signature and close lines.

## Independent critic scores (cold-email-critic; given only the email text and persona; logs in `critic/`)
| Round | Email 1 | Email 2 | Email 3 (close) |
|---|---|---|---|
| 1 (original) | 63 | 51 | n/a |
| 2 | 75 | 72 | 59 |
| 3 | 81 | 73 | 67 |
| 4 (final, saved) | **79** | **72** | **70** |

No hard fails in rounds 2-4.

## Why it stops below 85: real data still missing
1. **The test size and length**: how many agents Dev will email and over how many days, plus which domain or inbox it sends from. The critic can't score value above about 14/20 while the offer is unsized.
2. **A matched client result** in `proof-bank.md`.
3. **A per-prospect shoot field** from the gallery (for example a recent shoot's street or area), so email 2's sample line is built on their real work rather than a generic line.
4. **The true lead source per row.**

## Copy fixes the critic gave in round 4 that need no new data (apply in the founders' rewrite)
- Email 1: replace "offer your shoots, free" with "pitch your shoots" plus "No charge." (it can read as giving shoots away free); change the CTA to "Worth a test this winter?"
- Email 2: tie the line to the gallery signal: "agents who aren't in your gallery yet".
- Email 3: "If the agents in your gallery do go quiet, reply 'test' and I'll send the full agent email for you to approve."

## Compliance (guidance, not legal advice; `knowledge/11-deliverability-legal.md`)
- **Recipients:** US businesses and UK limited companies only. **UK sole traders and partnerships are excluded: PECR requires prior consent for them.** Germany and Austria are excluded by default. Check each row's company type (Companies House) before loading.
- **Every email** carries the sender's name with the company ("Dev, Extol Affiliates"), a light opt-out line, and the footer `{{sender_postal_address}} · {{privacy_url}}`.
- **`{{sender_postal_address}}` is a placeholder.** CAN-SPAM requires a valid physical postal address (a street address, a registered PO box or a commercial mail receiving agency) in every commercial email to US recipients. Fill it with Extol's real address before any US send. `{{privacy_url}}` must point to a live privacy notice (UK GDPR Art. 14: data source and right to object). Render it as plain text, not a tracked link.
- **The data-source P.S.** ("I found you via your …") must be true for each row. If a row came from Google Maps, a directory or Apollo, change the line to name that source.
- Honor opt-outs immediately, and never send step 3 after a reply. Nothing runs after step 3, so "I'll stop here" stays true.

## Founders' note (Nick, Month 1 Day 16)
Nick's strongest Day 16 warning is **"do not use AI for this"**: write cold email by hand. These are **AI drafts for the founders to put into their own words**; imperfect wording is fine. Keep the facts, signals and compliance lines; change the voice.
