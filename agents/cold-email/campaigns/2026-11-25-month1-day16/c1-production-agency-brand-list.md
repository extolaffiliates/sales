# c1-production-agency-brand-list

> **DRAFT for the founders to rewrite in their own words.** CRITIC (final, round 4): **82 / 82 / 73**. **Not at 85; do not load.** The gap is missing real data (listed below), not wording.

- **Niche:** C. Video production companies / editing agencies
- **Persona:** Owner or MD of a small (2-15 person) video production company or editing agency in a US or UK city.
- **Offer:** O13 free list: {{vertical}} brands near {{city}} that post video every week, with the marketing lead's work email and the video count for the past month; anyone on the prospect's client page is left out; 5 rows first. Round 1's "no obvious in-house editor" was dropped because it couldn't be checked.
- **Proof used:** B001 only, worded "a London production house". It is background, not a client result, and no client is implied. The "building case studies" free-reason is the angle `proof-bank.md` allows when no results exist.
- **Signal / why now:** **`{{icebreaker}}`:** one sentence from the prospect's work or case-studies page naming their newest case-study client. `{{vertical}}` is a 1-2 word label for that client's industry that reads naturally before "brands". **Rows that are non-commercial (council, charity, school) or that have no case study are excluded.**

**Illustrative icebreaker rows.** These are INVENTED to show the format and are not real prospects. Never send them.
- "Your newest case study is the opening film for the Larkfield Hotel." ({{vertical}} = hotel)
- "The latest project on your site is a launch video for Peak Form Gym." ({{vertical}} = fitness)

## Structure: how Nick's Day 16 order was reconciled with the critic
Nick: personalization → who I am → why trust me → offer, kept short. Critic round 1: don't open on "I'm Dev"; open on their situation, then put the credential **after** the offer. Final order: **personalization (the icebreaker plus a hedged pain) → offer → why it's free plus who I am/why trust me (B001, worded "a London production house") → one small question.** The name and company sit in the signature.

**Sequence:** Nick runs 2 emails until a campaign shows 2%+ replies. The critic requires a clean, short close, so this is **3 steps**: 1 new thread (day 0) → 2 reply in thread (day 3-4, adds something new) → 3 close in thread (day 8-10). To follow Nick strictly, switch step 3 off; it doesn't change emails 1-2.

## Emails (load-ready copy in `c1-production-agency-brand-list.txt`; round 1 kept in `c1-production-agency-brand-list-r1.txt`)
```
Subject: {{vertical}} brands

Hi {{first_name}},

{{icebreaker}} I'd guess it came through someone you know, which is hard to plan around.

You could have a free list of {{vertical}} brands near {{city}} that post video weekly, with each marketing lead.

It's free because I'm building case studies in client-finding. I ran outreach in-house at a London production house.

Want the list?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. I found you via your work page. Reply "no" and I won't email again.
===
Hi {{first_name}},

Each row would show a {{vertical}} brand, its video count this past month, and the marketing lead's work email.

Anyone on your client page is left out, so new work doesn't hang on who you know.

I can send 5 first, so you can judge it before I build the rest. Want the 5?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll stop.
===
Hi {{first_name}},

I'll stop here. If the timing's just off, the 5 {{vertical}} rows are yours whenever you ask.

Either way, thanks for reading.

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll remove you.
```

## Linter (`lint_email.py --template`)
```
Email 1: REVIEW  | subject: '{{vertical}} brands' | 81 words | grade 3.9 | 1 question(s) | you:me 4:5
  [WARN] focus: Sender-focused: I/we/our=5 vs you/your=4.
Email 2: PASS  | subject: None | 69 words | grade 2.5 | 1 question(s) | you:me 3:3
Email 3: REVIEW  | subject: None | 38 words | grade 3.7 | 0 question(s) | you:me 3:2
  [WARN] cta: No question mark; is there a clear yes/no CTA?
```
No ERRORs. The remaining WARNs are judgment calls: the closes have no question mark by design, and "I" leads in the signature and close lines.

## Independent critic scores (cold-email-critic; given only the email text and persona; logs in `critic/`)
| Round | Email 1 | Email 2 | Email 3 (close) |
|---|---|---|---|
| 1 (original) | 63 | 49 | n/a |
| 2 | 78 | 73 | 70 |
| 3 | 81 | 80 | 73 |
| 4 (final, saved) | **82** | **82** | **73** |

No hard fails in rounds 2-4.

## Why it stops below 85: real data still missing
1. **A dated signal per prospect** (for example the month the case study was published) to lift why-now above about 15/20.
2. **A matched client result** in `proof-bank.md`.
3. **Confirmation that each {{city}} × {{vertical}} pair yields at least 5 weekly-posting brands**; otherwise widen "near {{city}}".
4. **A lawful basis for passing named UK marketing leads' work emails** to the prospect (their addresses are personal data).
5. **The true lead source per row.**

## Copy fixes the critic gave in round 4 that need no new data (apply in the founders' rewrite)
- Email 1: "I can build you a list of {{vertical}} brands near {{city}} that post video weekly, with each marketing lead's name and work email." and "It's free: I ran outreach in-house at a London production house and I'm building case studies."
- Email 2: open with "Smaller ask: I send 5 rows first..."; say "Each row is...".
- Email 3: add "Or is someone else better for new business?"

## Compliance (guidance, not legal advice; `knowledge/11-deliverability-legal.md`)
- **Recipients:** US businesses and UK limited companies only. **UK sole traders and partnerships are excluded: PECR requires prior consent for them.** Germany and Austria are excluded by default. Check each row's company type (Companies House) before loading.
- **Every email** carries the sender's name with the company ("Dev, Extol Affiliates"), a light opt-out line, and the footer `{{sender_postal_address}} · {{privacy_url}}`.
- **`{{sender_postal_address}}` is a placeholder.** CAN-SPAM requires a valid physical postal address (a street address, a registered PO box or a commercial mail receiving agency) in every commercial email to US recipients. Fill it with Extol's real address before any US send. `{{privacy_url}}` must point to a live privacy notice (UK GDPR Art. 14: data source and right to object). Render it as plain text, not a tracked link.
- **The data-source P.S.** ("I found you via your …") must be true for each row. If a row came from Google Maps, a directory or Apollo, change the line to name that source.
- Honor opt-outs immediately, and never send step 3 after a reply. Nothing runs after step 3, so "I'll stop here" stays true.

## Founders' note (Nick, Month 1 Day 16)
Nick's strongest Day 16 warning is **"do not use AI for this"**: write cold email by hand. These are **AI drafts for the founders to put into their own words**; imperfect wording is fine. Keep the facts, signals and compliance lines; change the voice.
