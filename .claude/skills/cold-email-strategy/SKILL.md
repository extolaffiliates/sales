---
name: cold-email-strategy
description: Plans a cold email campaign before any copy is written. Gathers the brief (ICP, offer, real proof, goal, recipient countries), checks the higher layers first (deliverability, list, offer), segments the list, ranks 3–5 angles, and saves a campaign brief. Use when the user says "plan a cold email campaign", "who should we email", "new campaign for X", or when a campaign gets replies but no positive ones.
---

# Cold email strategy

**Load:** `agents/cold-email/knowledge/00-philosophy-hierarchy.md`, `01-intent-signals.md`, `02-offers.md`, `14-benchmarks-experiments.md`. **Libraries:** `agents/cold-email/libraries/proof-bank.md`, `offer-library.md`.

## 1. Brief (ask once, in one compact list; mark any assumptions `[ASSUMPTION]`)
- **Offer:** what we sell, the price model, and the outcome in numbers.
- **Proof:** check `proof-bank.md`. If it's empty, say so and plan free work or risk reversal instead. Never invent proof.
- **ICP:** industry, size, region, buyer role.
- **Goal:** meetings per month, and what one customer is worth.
- **TAM size:** an estimate is fine.
- **Recipient countries:** this drives compliance. Germany and Austria are excluded by default.
- **Sender:** who signs the emails, and their credibility in one line.

## 2. Check the higher layers first (`00`)
- **Deliverability:** do they have infrastructure? If not, hand off to `cold-email-deliverability` before copy.
- **Offer:** run the "why wouldn't they reply?" test. If the offer is weak or saturated, hand off to `cold-email-offer`.

## 3. Segment the list (`01`)
1. Build **6–10 segments of 80–400 contacts** from triggers and segment questions (Mark Colgan).
2. Pick the seniority by company size: founder or CEO under 50 staff; problem owner in enterprise.

## 4. Rank 3–5 angles
For each angle give:
- the segment and its signal (with the data source: Apollo, Clay, job boards, a site scrape, reviews, LinkedIn)
- the problem or loss it names
- the offer rung (`02`)
- the framework (`08-frameworks.md`)
- the proof line, or the risk reversal if there's no proof
- the CTA type

Score each angle: signal strength × pain intensity × proof strength (1–5 each). Recommend which one to A/B test first.

## 5. Volume maths (`09`, `14`)
1. Contacts per month = meetings target ÷ (positive replies per contact × 0.45). Start from 1 positive reply per 300 contacts.
2. Inboxes needed = daily sends ÷ 30.
3. Check that the TAM can sustain a 3-month reuse cycle.

## 6. Save
Write `agents/cold-email/campaigns/<slug>/brief.md` with these sections:
- Offer sentence: "We help {ICP} get {outcome} in {time} without {objection}."
- Segments
- Signals and data sources
- Proof (references to proof-bank IDs only)
- Objections and how the offer handles them
- Ranked angles
- Compliance by country
- Volume maths
- Test plan (one variable first)

Then hand off to `cold-email-write` or `cold-email-sequence`.
