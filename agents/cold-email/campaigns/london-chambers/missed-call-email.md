# London Chambers: missed-call email (same day, after a no-answer)

Status: DRAFT. Not sent. Nothing has been added to any sending tool. A human approves every send.
CRITIC: scored independently (10 rounds, email text + persona only). **NOT CLEARED TO SHIP.** Best first email 84/100, best follow-up 81/100; the bar is 85. The gap is real data, not wording. See "Critic results" and "Needs real data".

Companion to `cold-call-script.md` (offer, tone, Section 10 cheat sheet). The email is the written version of Opener A or B: a new local business saying hello, owning up to the missed call, offering one free thing.

---

## Before you send (UK PECR, UK GDPR): every email, every time

1. **Limited companies only.** Send only to corporate subscribers: Ltd, LLP, PLC. **Do not email sole traders or ordinary partnerships** unless they have said yes to hearing from us. If the row doesn't say, check Companies House (find-and-update.company-information.service.gov.uk). No match there = treat as a sole trader = don't email.
2. **The call must be real, today.** Only send if you dialled this number today and it rang out. Pick `{{call_note}}` truthfully:
   - left a voicemail → `that missed call earlier was me (I left a short voicemail).`
   - no voicemail → `that missed call earlier was me.`
   - Never claim a voicemail you didn't leave. If someone answered (even a receptionist), don't use this email.
   - If it slips to the next day: change "earlier" to "yesterday" in the subject and `{{call_note}}`. Later than that, don't send it.
3. **Opener A only for chambers we have actually joined.** Every other chamber uses Opener B, which never says or implies membership. The script's "Chamber(s) we have actually joined" field is still `[e.g. Merton]`. **Fill it in before day 1.** Also: the 20-second voicemail in script 7b says "We've just joined [Chamber]". For Opener B leads, say "We're new to the London chambers" instead.
4. **Verify the address** (MillionVerifier or similar). Skip catch-alls. Never guess an address from a pattern. Generic `info@` / `hello@` addresses are fine for companies.
5. **No open or click tracking.** Plain text, no links in the body, no images or attachments.
6. **Footer on every email**, including the follow-up. The sending tool appends it, below the sign-off:
   ```
   --
   {{legal_name}} · Company no. {{company_number}} · {{registered_address}}
   You're getting this because {{company}} is listed in the {{chamber}} directory. Reply "no" and we won't email you again. Privacy notice: {{privacy_url}}
   ```
7. **Opt-outs:** a "no", "stop" or "unsubscribe" ends all contact (email and calls) the same day. Log it in the sheet.
8. **TPS/CTPS** was already checked before the call (script, "Before you dial"). If the number was on CTPS and they hadn't agreed to calls, there was no call, so there's no email either.
9. **Lint the filled email:** `python3 agents/cold-email/lint_email.py <file>`. It must show 0 errors. Fill every `[bracket]` in the follow-up sample from their own website, or rewrite that sentence. Never guess a price, a time or a name.
10. Germany/Austria rules don't apply here (UK recipients only). If a row has a non-UK registered address, skip it.

---

## Merge fields

| Field | What goes in | Rule |
|---|---|---|
| `{{first_name}}` | From the sheet's First Name | If blank, open with "Hi," and a line break (don't guess a name) |
| `{{call_note}}` | One of the two exact lines above | Truthful to what happened on the call |
| `{{listing_line}}` | Optional: `Saw you {{one true thing from their Description / Services Offered}}. ` (with trailing space) | **Only if it's on their listing and relevant to the slot.** Leave empty if unsure. A wrong specific is worse than none |
| `{{industry_problem}}`, `{{industry_automation}}`, `{{cta}}` | From the industry slot below, by Primary Category | One slot per email |
| `{{chamber}}` | Short name, e.g. "Merton Chamber" | A: a chamber we joined. B: the directory we found them in |
| `{{price}}` | The members' price, a number | Not yet set (script suggests £197–£297) |
| `{{running_cost}}` | True running terms, e.g. "one-off, no monthly fee" or "plus about £Y a month for texts" | **SMS/WhatsApp slots have per-message costs.** Say who pays |
| `{{n}}` | Real build time in days | Hospitality: only send the Christmas slot if `{{n}}` gets it live before party bookings peak |
| `{{channel}}` | Hospitality only: the channel they visibly take enquiries on (Instagram DMs, WhatsApp, website form) | Check their site/profile; if unclear, use "your enquiries" |
| `{{company_short}}` | "Rosewood", not "Rosewood Dental Care Ltd" | Used in the follow-up sample |
| `{{sender_name}}`, `{{phone}}` | Real caller's name and the number they dialled from | Same person who made the call |

---

## (1) Main email: Opener A, a chamber we've joined

```
Subject: my call earlier

{{first_name}}, {{call_note}}

{{listing_line}}{{industry_problem}} {{industry_automation}}

As a fellow {{chamber}} member, you'd pay £{{price}}, {{running_cost}}, live in {{n}} days. It's low because we're new and building local reviews.

{{cta}}

Thanks,
{{sender_name}}
Extol Affiliates · {{phone}}
```
Filled: 74–88 words · grade 3.0–5.8 · lint PASS/REVIEW, 0 errors on all 8 slots · critic 70–77 (see table)

**Example fill (accountant, voicemail left, no listing line):**
```
Subject: my call earlier

Sarah, that missed call earlier was me (I left a short voicemail).

With Self Assessment due 31 January, the next few weeks usually go on chasing clients for records. Each client could get a text naming what's missing, then nudges until it's in.

As a fellow Merton Chamber member, you'd pay £[price], one-off, no monthly fee, live in [n] days. It's low because we're new and building local reviews.

Want a free mock-up of the text your clients would get?

Thanks,
Sam
Extol Affiliates · 07700 900123
```

**Why it should work:** it answers the question the reader already has ("who rang me?"), so it reads as a reply, not a cold pitch. It gives a real reason for the low price (Langer: a real "because" raises compliance [R03], `knowledge/07`), offers free work first (offer ladder rung 1, Lieben/Saraev, `knowledge/02`), and ends on an interest question rather than a time ask (Gong 30% vs 15% [R02], `knowledge/06`).

---

## (2) Not-joined variant: Opener B, a London chamber we haven't joined

Never says "fellow", "we've joined" or "our chamber". "New to the London chambers" is true because we've joined at least one. The footer says where we found them.

```
Subject: my call earlier

{{first_name}}, {{call_note}}

{{listing_line}}{{industry_problem}} {{industry_automation}}

For chamber members it's £{{price}}, {{running_cost}}, live in {{n}} days. It's low because we're new to the London chambers and building local reviews.

{{cta}}

Thanks,
{{sender_name}}
Extol Affiliates · {{phone}}
```
Filled: 69–83 words · grade 3.0–5.5 · lint 0 errors on all 8 slots · critic 76–83

**Example fill (plumbing and heating, no voicemail, listing says 24/7 call-outs). Best-scoring first email, 83/100:**
```
Subject: my call earlier

Sarah, that missed call earlier was me.

Saw you do 24/7 call-outs. If that had been someone with no heating, they might have rung the next firm. A text back within a minute could tell them you'll ring back.

For chamber members it's £[price], one-off, no monthly fee, live in [n] days. It's low because we're new to the London chambers and building local reviews.

Want a free mock-up of the text a missed caller would get?

Thanks,
Sam
Extol Affiliates · 07700 900123
```
**Why it should work:** for missed-call businesses, our own missed call *is* the problem, shown on their own phone ("reveal the problem": record their missed call, `knowledge/02` [R06]). The critic rated this line the strongest in the set (why-now 17–18/20).

If they ask "are you a member?", use the script's line: "Not of [their chamber] yet. We've just joined [ours], and I'm getting to know people across London first."

---

## (3) Industry slots (from script Section 10, by Primary Category)

Paste one row's lines into `{{industry_problem}}`, `{{industry_automation}}` and `{{cta}}`. The follow-up fields are used in email (4). `{{listing_line}}` examples are **illustrations only**. Write your own from their real listing, or leave it empty.

### Hospitality: restaurants, pubs, bars, catering, hotels
- listing_line e.g.: `Saw you host private parties. `
- problem: `Christmas party enquiries tend to land mid-service, and a slow reply can lose the booking.`
- automation: `Your {{channel}} could answer them instantly with your party menu and pass anything else to you.`
- cta: `Want a free mock-up of the reply a guest would get?`
- follow-up: mockup_short `the reply a party enquiry would get` · sample `Thanks for messaging {{company_short}}. Our Christmas menu is [price from their site] a head. Send your date and numbers and we'll come back to you shortly.` · link `It would go out in seconds, even mid-service on a Saturday.` · cta `Close to how you'd want it to sound?`
- Timing: only send this before mid-December, and only if `{{n}}` gets it live in time. Otherwise the script says to book hospitality for January.

### Accountants, bookkeepers (Self Assessment, 31 January)
- listing_line e.g.: `Saw you look after landlords. `
- problem: `With Self Assessment due 31 January, the next few weeks usually go on chasing clients for records.`
- automation: `Each client could get a text naming what's missing, then nudges until it's in.`
- cta: `Want a free mock-up of the text your clients would get?`
- follow-up: mockup_short `the client reminder` · sample `Hi [client name], it's {{company_short}}. For your tax return we still need your [missing document]. Please send it over this week so we can file in good time.` · link `It would go to every client still missing something, so nobody on your team has to chase.` · cta `Worth trying on a few clients?`
- Send these **now**. They're the strongest angle, and accountants are unreachable in January.

### Trades and building services: plumbing, heating, electrical, pest control, construction
- listing_line e.g.: `Saw you do 24/7 call-outs. `
- problem (heating/plumbing): `If that had been someone with no heating, they might have rung the next firm.`
- problem (any other trade): `If that had been a customer, they might have rung the next firm.`
- automation: `A text back within a minute could tell them you'll ring back.`
- cta: `Want a free mock-up of the text a missed caller would get?`
- follow-up: mockup_short `the missed-call text` · sample `Sorry we missed your call, it's {{company_short}}. We'll ring you back shortly. If it's urgent, reply with your postcode and the problem.` · link `It goes to every call you miss, day or night, before they try the next firm.` · cta `Want this on your number?`
- Confirm first: what happens for landline callers (a text-back only reaches mobiles).

### Health and beauty, wellbeing, fitness, therapy
- listing_line e.g.: `Saw you take bookings online. `
- problem: `No-shows and late cancellations leave slots you can't sell again.`
- automation: `Your clients could get reminders, and a waitlist could fill the gaps they leave.`
- cta: `Want a free mock-up of the reminder your clients would get?`
- follow-up: mockup_short `the appointment reminder` · sample `Hi [client name], see you at {{company_short}} tomorrow at [time]. Reply YES to confirm, or CHANGE and we'll find you a new slot.` · link `If they reply CHANGE, the slot goes straight to your waitlist.` · cta `Close to how you'd want it to sound?`
- Therapy and clinical: keep health data out of AI tools unless a DPA is in place (script, Section 7).

### Estate and lettings agents, property
- listing_line e.g.: `Saw you do lettings too. `
- problem: `A portal enquiry that lands at 9pm tends to go to whichever agent replies first.`
- automation: `Your enquiries could get an instant reply offering viewing slots.`
- cta: `Want a free mock-up of the reply a new enquiry would get?`
- follow-up: mockup_short `the enquiry reply` · sample `Thanks for asking about [a live listing from their site]. We can show it on [day] at [time] or [day] at [time]. Reply 1 or 2 and we'll confirm.` · link `Your 9pm enquiries would get this before anyone else has replied.` · cta `Worth trying on a few listings?`
- The sample's listing comes from their site. The times can't, so write them as clearly marked examples ("e.g. Thursday at 6pm"). Never present them as their real diary.

### Retail (food and non-food), jewellers
- listing_line e.g.: `Saw you stock gifts and homeware. `
- problem: `Gift season brings a lot of 'are you open' and 'is it in stock' messages.`
- automation: `Your WhatsApp could answer those for you, day and night.`
- cta: `Want a free mock-up of the replies your customers would get?`
- follow-up: mockup_short `the stock reply` · sample `Thanks for messaging {{company_short}}. We're open [hours from their site] today. Tell us what you're after and we'll check stock and reply with a photo.` · link `It would answer the second a message lands, even when the shop is busy.` · cta `Close to how you'd want it to sound?`

### Professional and business services: consultants, coaches, HR, training
- listing_line e.g.: `Saw you run HR for small firms. `
- problem: `After a sales call, the notes and follow-up often wait until the evening.`
- automation: `Your notes could land in your CRM, with the follow-up drafted for you.`
- cta: `Want a free mock-up of the follow-up it would draft?`
- follow-up: mockup_short `the post-call follow-up` · sample `Hi [client name], thanks for your time today. Here's a short summary of what we covered and the next steps we agreed. I'll call you on [day] with any answers.` · link `It would be drafted from your call notes before you're back at your desk.` · cta `Close to how you'd write it?`
- AI, IT, web and marketing agencies: don't send this. Use the script's partner line instead.

### Fallback: unknown or unclear category
Before using this, spend 30 seconds on their website and pick the nearest row above. The fallback scored lowest (70) because it can't name their problem.
- listing_line: leave empty unless something is clearly true
- problem: `Most small firms answer the same handful of questions by email every week.`
- automation: `A tool could draft those replies in your inbox, in your tone, for you to approve.`
- cta: `Which question do you answer most?`
- follow-up: the dedicated fallback follow-up in (4).

---

## (4) Follow-up: day 4–5, only if no reply. Reply in the same thread.

The new thing it adds: **the free work itself.** It delivers a rough version of the mock-up we offered, unasked (reciprocity; offer ladder rung 1, "do the first thing for free", `knowledge/02`, `07`), plus the risk reversal from the script ("you see it working before it goes live"). It doesn't say "just checking in" and doesn't refer back to email 1. Same for A and B.

```
{{first_name}}, here's a rough version of {{mockup_short}}:

"{{sample}}"

{{followup_link}} You'd see it working before anything goes live.

{{followup_cta}}

Thanks,
{{sender_name}}
Extol Affiliates · {{phone}}
```
Filled: 59–69 words · grade 2.8–4.2 · lint PASS (as step 2 of the thread) · critic 73–81

**Example fill (hospitality). Best-scoring follow-up, 81/100:**
```
Sarah, here's a rough version of the reply a party enquiry would get:

"Thanks for messaging Rosewood. Our Christmas menu is £[their real price] a head. Send your date and numbers and we'll come back to you shortly."

It would go out in seconds, even mid-service on a Saturday. You'd see it working before anything goes live.

Close to how you'd want it to sound?

Thanks,
Sam
Extol Affiliates · 07700 900123
```

**Fallback follow-up (unknown category):**
```
{{first_name}}, an easier way to judge it: paste one question customers ask you every week, no names needed.

I'll send back the reply it would draft, in your tone, free. You'd see it working before anything goes live.

Worth a try?

Thanks,
{{sender_name}}
Extol Affiliates · {{phone}}
```
41 words · lint PASS · critic 70

After the follow-up, stop emailing. The next touch is the script's call-back (up to three tries, different days and times). Open that call with the email's first two lines (Sam Nelson, `knowledge/09`).

---

## A/B test: one variable, where the price appears

| Arm | Email 1 | Follow-up |
|---|---|---|
| **1 (control)**: price in email 1 | (1) / (2) above | (4) above |
| **2**: free mock-up first, price in the follow-up | Replace the price paragraph with A: `We've just joined {{chamber}}, so fellow members get a free mock-up first, built around how you work.` / B: `We're new to the London chambers, so chamber members get a free mock-up first, built around how you work.` CTA: `Want to see {{mockup}}?` (e.g. "Want to see the text a missed caller would get?") | Replace `You'd see it working before anything goes live.` with `For members it's £{{price}}, {{running_cost}}, live in {{n}} days. It's low because we're new and building local reviews.` (B: "For chamber members") |

Arm 2 scored 79 (accountants A) and **84** (trades B) on email 1, against 71–75 and 83 for arm 1 on the same slots. Its follow-up runs 73–83 words (over the 70-word follow-up target; lint WARN only).

**How to read it:** alternate arms by row within each chamber tab and log `email_arm` in the sheet. Measure the **positive reply rate** (interested or "how much?" replies ÷ sends), not opens (`knowledge/14`). Chamber lists are small, so you won't reach the 500+ sends per arm a real test needs. Treat the result as directional, and only switch if one arm leads clearly after about 100 sends each. Pause if hostile replies go over 0.3% or unsubscribes over 2%.

---

## Critic results (independent `cold-email-critic`, email text + persona only)

Persona: owner or director of a small London business (5–20 staff, Ltd) that is a member of a local chamber, with the industry matching the slot. They missed a call today from an unknown number (Sam at Extol) and are reading on their phone.

| Version (final wording) | Email 1 | Follow-up | Weakest dimension |
|---|---|---|---|
| A · accountants · with listing line | 71 | 75 | value |
| A · accountants · no listing line | 75 | 79 | why-now (email 1), CTA (follow-up) |
| B · trades · with listing line | 83 | 75 | value |
| A · hospitality · with listing line | 77 | 81 | personal (channel unconfirmed) |
| B · estate · with listing line | 76 | 73 | why-now / personal |
| A · fallback | 70 | 70 | why-now / value |
| Arm 2 · A · accountants · listing | 79 | 77* | value |
| Arm 2 · B · trades · listing | **84** | 72* | value |

\*Arm 2 follow-ups were scored in round 9. Earlier rounds scored 63–82 (round 1 started at 63–71 for email 1).

No hard fails in the final round, conditional on the membership, price and timing being true. Lint: 0 errors on every filled variant (64 sequences, arm 1).

**Why it stalls below 85:** value scores 12–16/20 because the proof bank is empty and the terms aren't confirmed yet. Personalisation scores 5–9/10 unless a real listing detail is used. Every fix the critic proposed in the last two rounds was either "needs real data" or would remove a truthful element (the voicemail note, the honest price reason). Further wording passes went sideways rather than up.

---

## Needs real data (each one lifts the score and removes a hard-fail risk)

1. **Which chambers Extol has actually joined.** Without this, Opener A can't be used at all ("fellow member" would be fake familiarity, a hard fail).
2. **`{{price}}`, `{{running_cost}}`, `{{n}}`.** Especially who pays the per-message cost of SMS/WhatsApp. "No monthly fee" is misleading if the client pays per text (CMA pricing, script Section 11). "Live in n days" must be a real commitment.
3. **How each automation actually works:** what it connects to (practice software, booking system, diary, Instagram), where client replies and documents go, what happens for landline callers, and the hand-off to a human. Critics' first question every time: "my software already does this, so what's different?"
4. **A risk reversal Extol will honour,** beyond "see it working before it goes live", e.g. "pay only once it's live". Only if it's true.
5. **Data protection position:** a DPA and where data is stored (UK/EU). Accountants and health businesses block on this.
6. **One real result in `libraries/proof-bank.md`.** Even one finished chamber build with a short review is estimated to lift value 4–6 points.
7. **Per lead:** one true listing detail (`{{listing_line}}`), their real enquiry channel, and the website facts for the follow-up sample's `[brackets]`.
8. **Footer details:** Extol's legal name, company number, registered address and privacy notice URL.
9. **Script fix:** the 7b voicemail says "We've just joined [Chamber]". Opener B leads need a "new to the London chambers" version.
