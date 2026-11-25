# a1-real-estate-media-free-list

> **DRAFT for the founders to rewrite in their own words.** CRITIC (final, round 4): **83 / 79 / 70**. **Not at 85; do not load.** The gap is missing real data (listed below), not wording.

- **Niche:** A. Real estate photo/video businesses
- **Persona:** Owner of a small (1-5 person) real estate photo/video business in a US or UK city.
- **Offer:** O13 free list: agents near {{city}} who listed a home in the last 14 days (agent, office, listing address, work email), skipping agents already in their portfolio; 5 rows first as a lower-effort step. **Why recent listers still matter:** their current home is probably shot already; the list targets their *next* listing (active agents list repeatedly).
- **Proof used:** B001 only, worded "a London production house". It is background, not a client result, and no client is implied. The "building case studies" free-reason is the angle `proof-bank.md` allows when no results exist.
- **Signal / why now:** **`{{icebreaker}}`:** one sentence from the prospect's own portfolio or gallery page, which credits the agents or brokerages whose listings they shot. It names who is credited most. **Rows where it can't be built are excluded** (no fallback copy). Merge fields: `{{first_name}} {{company}} {{city}} {{icebreaker}} {{sender_postal_address}} {{privacy_url}}`.

**Illustrative icebreaker rows.** These are INVENTED to show the format and are not real prospects. Never send them.
- "Your gallery credits most of your recent shoots to Harbor & Main Realty."
- "Most shoots on your listings page since September are for the same three agents."

## Structure: how Nick's Day 16 order was reconciled with the critic
Nick: personalization → who I am → why trust me → offer, kept short. Critic round 1: don't open on "I'm Dev"; open on their situation, then put the credential **after** the offer. Final order: **personalization (the icebreaker plus a hedged pain) → offer → why it's free plus who I am/why trust me (B001, worded "a London production house") → one small question.** The name and company sit in the signature.

**Sequence:** Nick runs 2 emails until a campaign shows 2%+ replies. The critic requires a clean, short close, so this is **3 steps**: 1 new thread (day 0) → 2 reply in thread (day 3-4, adds something new) → 3 close in thread (day 8-10). To follow Nick strictly, switch step 3 off; it doesn't change emails 1-2.

## Emails (load-ready copy in `a1-real-estate-media-free-list.txt`; round 1 kept in `a1-real-estate-media-free-list-r1.txt`)
```
Subject: agents in {{city}}

Hi {{first_name}},

{{icebreaker}} If they have a slow month, so do you.

I can send you a free list of agents near {{city}} who listed a home in the last 14 days. It's for their next listing, not this one.

It's free because I'm building case studies in client-finding for photo businesses. I ran outreach in-house at a London production house.

Want the {{city}} list?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. I found you via your gallery credits. Reply "no" and I won't email again.
===
Hi {{first_name}},

The point of the list is fewer eggs in one basket. I'd skip any agent already in your portfolio. Each row: agent, office, the address they just listed and a work email.

I can send 5 first. You'll know in a minute if they're worth an email.

Want the 5?

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll stop.
===
Hi {{first_name}},

I'll stop here. The {{city}} agent list is yours if you ever want it. Just reply "list".

Either way, thanks for reading.

Dev, Extol Affiliates
{{sender_postal_address}} · {{privacy_url}}

P.S. Reply "no" and I'll remove you.
```

## Linter (`lint_email.py --template`)
```
Email 1: REVIEW  | subject: 'agents in {{city}}' | 89 words | grade 3.6 | 1 question(s) | you:me 4:5
  [WARN] focus: Sender-focused: I/we/our=5 vs you/your=4.
Email 2: REVIEW  | subject: None | 65 words | grade 2.8 | 1 question(s) | you:me 2:3
  [WARN] focus: Sender-focused: I/we/our=3 vs you/your=2.
Email 3: REVIEW  | subject: None | 38 words | grade 3.0 | 0 question(s) | you:me 3:2
  [WARN] cta: No question mark; is there a clear yes/no CTA?
```
No ERRORs. The remaining WARNs are judgment calls: the closes have no question mark by design, and "I" leads in the signature and close lines.

## Independent critic scores (cold-email-critic; given only the email text and persona; logs in `critic/`)
| Round | Email 1 | Email 2 | Email 3 (close) |
|---|---|---|---|
| 1 (original) | 59 | 45 | n/a |
| 2 | 79 | 71 | 64 |
| 3 | 84 | 82 | 72 |
| 4 (final, saved) | **83** | **79** | **70** |

No hard fails in rounds 2-4.

## Why it stops below 85: real data still missing
1. **A matched client result** in `proof-bank.md` (any real outcome for a photo/video business). Without it, value stays at about 15/20 on background alone (B001).
2. **`{{top_credit}}`**: the most-credited agent or brokerage, kept as its own field (already extracted for the icebreaker), so emails 2-3 can carry the signal ("so a quiet month at {{top_credit}} doesn't become yours").
3. **A real per-city row count** (`{{agent_count}}`: agents who listed in the last 14 days near {{city}}), computed at send time, to give email 2 or 3 something new.
4. **The true lead source per row** (the P.S. says "gallery credits").
5. **A listings data source** for the list itself (public listing portals or the MLS feed; check the terms) and a person to build it within 24 hours of a yes.

## Copy fixes the critic gave in round 4 that need no new data (apply in the founders' rewrite)
- Email 1: replace "It's for their next listing, not this one." with the row contents (agent, office, address, work email).
- Email 2: lead with "I can send 5 first"; replace the "eggs in one basket" idiom with the {{top_credit}} line.
- Email 3: "The 5 {{city}} agents are yours if you ever want them."

## Compliance (guidance, not legal advice; `knowledge/11-deliverability-legal.md`)
- **Recipients:** US businesses and UK limited companies only. **UK sole traders and partnerships are excluded: PECR requires prior consent for them.** Germany and Austria are excluded by default. Check each row's company type (Companies House) before loading.
- **Every email** carries the sender's name with the company ("Dev, Extol Affiliates"), a light opt-out line, and the footer `{{sender_postal_address}} · {{privacy_url}}`.
- **`{{sender_postal_address}}` is a placeholder.** CAN-SPAM requires a valid physical postal address (a street address, a registered PO box or a commercial mail receiving agency) in every commercial email to US recipients. Fill it with Extol's real address before any US send. `{{privacy_url}}` must point to a live privacy notice (UK GDPR Art. 14: data source and right to object). Render it as plain text, not a tracked link.
- **The data-source P.S.** ("I found you via your …") must be true for each row. If a row came from Google Maps, a directory or Apollo, change the line to name that source.
- Honor opt-outs immediately, and never send step 3 after a reply. Nothing runs after step 3, so "I'll stop here" stays true.

## Founders' note (Nick, Month 1 Day 16)
Nick's strongest Day 16 warning is **"do not use AI for this"**: write cold email by hand. These are **AI drafts for the founders to put into their own words**; imperfect wording is fine. Keep the facts, signals and compliance lines; change the voice.
