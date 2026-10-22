# Eldridge Estates: first-touch email (Razaul Hoque)

Status: DRAFT. Not sent. A human must approve before sending.
CRITIC: pending. cold-email-master could not call the Agent tool. The main session must run `cold-email-critic` on each variant using only the packet at the bottom of this file. Ship only at 85/100 or above.

## Brief
- **To:** Razaul Hoque, Founder & Director, Eldridge Estates, rhoque@eldridgeestates.co.uk, London (SE10 office; covers SE18/SE2/SE28/SE10/SE3/SE7). UK limited company, incorporated 14 Sept 2020.
- **From:** Extol Affiliates (AI automation agency). Signed "Sam", which is a placeholder: **swap in the real sender's first name.**
- **Offer:** an assistant that answers Rightmove/portal enquiries in minutes and books the viewing. Upsell later: Monday pipeline summary.
- **Proof:** `proof-bank.md` is EMPTY, so the emails cite no clients and no results. Risk reversal (B) and a free reveal (C) stand in for proof. Source: offer-library O1/O6 and O11.
- **Signal:** ESTAS "Best in Postcode" SE18 in 2025 (second year running) and a 2022 win, all based on landlord and tenant reviews [Confirmed].
  - **Freshness:** the 2025 award is about 17 months old and there is no 2026 news. That is stale under `knowledge/01` (no signals older than 6 months).
  - The emails therefore state the lasting fact (their wins come from reviews), not the event. They never say "again", "this year" or "congrats". The user's draft line "won ... again" would read as current news, so it was dropped.
- **Hypotheses (phrased as hedges, never as facts):** after-hours portal enquiries; lettings-heavy. "Chances are..." and "may have" carry the hedge.
- **Objection pre-empted:** "our service is personal" → "Your team still does every viewing and every call."
- **Framework:** GEX basic, with Truth+implication hook → hedged-hypothesis problem with a loss frame → one-line product → CTA (`knowledge/08`).

## Shared core (identical in all variants)
Subject: `razaul` (the `{first_name}` control; +20% opens in a randomized study, `knowledge/03`). Body lines 1 to 3 and the P.S. are the same in all three variants.

---

### VARIANT A (tests: CTA/offer = interest question only, the control)
```
Subject: razaul

Hi Razaul,

Eldridge's ESTAS wins come from landlord and tenant reviews, so reply speed matters.

Chances are some of your Rightmove enquiries land after hours and wait until morning. By then the applicant may have booked elsewhere.

An assistant can reply in minutes and book the viewing for you. Your team still does every viewing and every call.

Is evening follow-up a gap for you?

Sam

P.S. If this isn't relevant, reply "no" and I'll stop.
```
76 words · grade 4.8 · lint PASS · critic: pending

### VARIANT B (tests: offer = risk reversal / free 14-day trial)
```
Subject: razaul

Hi Razaul,

Eldridge's ESTAS wins come from landlord and tenant reviews, so reply speed matters.

Chances are some of your Rightmove enquiries land after hours and wait until morning. By then the applicant may have booked elsewhere.

An assistant can reply in minutes and book the viewing for you. Your team still does every viewing and every call.

Happy to set one up free for 14 days. Keep it only if it books viewings. Open to that?

Sam

P.S. If this isn't relevant, reply "no" and I'll stop.
```
87 words · grade 4.1 · lint PASS · critic: pending

### VARIANT C (tests: offer = free reveal / speed-to-lead test enquiry)
```
Subject: razaul

Hi Razaul,

Eldridge's ESTAS wins come from landlord and tenant reviews, so reply speed matters.

Chances are some of your Rightmove enquiries land after hours and wait until morning. By then the applicant may have booked elsewhere.

An assistant can reply in minutes and book the viewing for you. Your team still does every viewing and every call.

With your OK, I'll send a test enquiry one evening and show you what an applicant sees. Want that?

Sam

P.S. If this isn't relevant, reply "no" and I'll stop.
```
87 words · grade 4.6 · lint PASS · critic: pending

Note on C: the test enquiry happens only with his explicit OK. Never send an unannounced "mystery shopper" enquiry, because that would be deceptive.

---

## Why each should work
- **A:** an interest CTA in email 1 booked 30% vs 15% for a time ask (Gong, `knowledge/06`). The hook ties a true fact about how they win to the problem (relevance over flattery, `knowledge/04`).
- **B:** with no proof, risk reversal carries the value. "Keep it only if it books viewings" removes the downside (Hormozi/Saraev conditional guarantee, offer-library O1/O6, `knowledge/02`).
- **C:** give first and reveal the problem in their own pipeline. The work itself is the proof (offer-library O11; speed-to-lead within an hour is 7x, HBR).

## A/B plan
- **One prospect can't support a test.** For Razaul, send **B** if the team can deliver a 14-day trial; otherwise send A.
- **Run the A/B/C across the segment:** independent London/South-East letting agents, UK limited companies only.
  - Variable: the offer/CTA line only. Subject, hook, body and P.S. are held constant.
  - 500 to 2,000 sends per arm, all arms launched together, read at day 21, adopt the winner at a 20% or greater lift in positive reply rate (`knowledge/14`).
- **Next subject test:** `razaul` (control) vs `evening enquiries`.

## What real data would make it stronger
1. **One proof-bank entry** from any agency or property client (e.g. "replies in X min, Y viewings booked out of hours in 30 days"). That would let the body move to GEX with real proof.
2. **Verified after-hours behaviour.** Before sending, check the Eldridge Rightmove listing or website (logged out, public only): is there an auto-reply, live chat or out-of-hours line? If they already reply instantly, this angle fails and should switch to review-chasing or landlord compliance reminders.
3. **2026 ESTAS result.** If they won again in 2026, a fresh signal is available. Verify it before using it.
4. **Lettings share.** If confirmed, change "the applicant" to "the tenant" and lead with lettings.

## Call-first plan (research: call first, medium-high confidence)
1. **Call first,** during office hours. Ask Razaul one question: how are evening Rightmove enquiries handled now?
2. **If he answers:** use the email as the written follow-up the same day, opening with "Thanks for the call earlier" instead of the ESTAS line (one honest reference to the call, no new claims). Use the B offer.
3. **If no answer or gatekeeper:** send the email as written that day. Call again 2 to 3 days later and reference it ("sent you a short note about evening enquiries").
4. **Don't leave a voicemail pitch.** Leave your name and say "it's about evening Rightmove enquiries".

## UK compliance (PECR + UK GDPR)
- **Status:** Eldridge Estates is an incorporated company and the address is a corporate subscriber, so PECR allows B2B cold email on legitimate interest with an opt-out. Confirm on Companies House that it is a Ltd company and not a partnership; partnerships and sole traders need consent.
- **UK GDPR still applies** because rhoque@ is a named individual's personal data.
- **Footer required under the signature:**
  - the sender's full name and Extol's legal entity name, registered number and postal address
  - where the address came from (e.g. "the Eldridge Estates website")
  - a right-to-object line (the P.S. covers the opt-out; keep it)
  - access to a privacy notice
- **Conflict with the "no links" brief:** a privacy-notice link is the normal method (`knowledge/11`). Options:
  - (a) allow one plain-text footer URL as a deliberate exception, or
  - (b) "Privacy notice: reply 'privacy' and we'll send it."

  Option (b) is weaker. Decide before sending.
- Log the legitimate-interest assessment and data source. Honor any "no" immediately and suppress the address across all inboxes.

---

## Critic packet (send ONLY this to cold-email-critic, one variant at a time)
Persona: Razaul Hoque, Founder & Director of Eldridge Estates, an independent estate and letting agent in south-east London (Woolwich, Plumstead, Greenwich), team of 2 to 10, UK. Reads email on his phone between viewings.
Email: paste Variant A, B or C exactly as shown above.
