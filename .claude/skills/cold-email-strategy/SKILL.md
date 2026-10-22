---
name: cold-email-strategy
description: Build the foundation of a cold email campaign before any copy is written. Covers who to target and why now, an offer that's easy to say yes to, 3–5 angles to test, and a saved campaign brief. Use when starting a new campaign, when the user says "plan a cold email campaign", "who should we email", "what should we offer", or when a campaign gets replies but no positive ones (an offer or list problem).
---

# Cold email strategy

Read `cold-email/playbook.md` §1 (hierarchy), §4 (offers) and §5 (personalization tiers) first.

## 1. Intake: ask for anything missing, in one compact list
- **Offer:** what we sell, the price model, and the outcome it delivers, in numbers.
- **Proof:** real clients, results and timeframes; a guarantee or risk reversal; logos we're allowed to name. *Never invent proof.*
- **ICP:** industry, company size, geography, buyer role, and the pains that role owns.
- **Triggers:** events that make this offer timely, such as hiring, funding, launches, new executives, bad reviews or a tech change.
- **Goal and volume:** replies or meetings; number of contacts; tier mix (playbook §5).
- **Recipients' countries:** needed for the compliance footer.
- **Sender:** who signs the email, and their credibility in one line.

## 2. Pressure-test the offer
Run the **"why wouldn't they reply?"** test (Nowoslawski):
1. List the top 5 hidden objections: cost, risk, effort, timing, "we have someone".
2. Rewrite the offer so each objection is handled inside it:
   - **risk reversal:** Saraev's $250 gift card, pay on results, first one free
   - **lower effort:** "we do it, you approve it"
   - **a smaller first step:** "3 ideas", a Loom teardown, a free audit
3. Replace any "save time" framing with a **numeric business outcome**. Saraev: time-saved offers underperform.

Output the offer as one sentence: **"We help {ICP} get {specific outcome} in {timeframe} without {main objection}."**

## 3. Angles (3–5)
Each angle is a distinct reason this ICP should care now. For each, give:
- **Angle name** and the **problem/loss** it names
- **Trigger or signal** that identifies who gets it, and where that data comes from (Apollo, Clay, job boards, site scrape, LinkedIn)
- **Best framework** from playbook §3
- **Proof line** that fits it
- **CTA type:** interest or offer

Rank them by expected reply potential (how strong and timely the trigger is × how painful the problem is × how strong the proof is). Say what to A/B test first.

## 4. Save the brief
Write `campaigns/<slug>/brief.md` with these sections:
1. Offer sentence
2. ICP and tiers
3. Triggers
4. Proof bank (verbatim, user-supplied)
5. Objections and how the offer handles them
6. Ranked angles
7. Compliance notes by country
8. Test plan (one variable at a time; at least 200–300 contacts per variant; judge on positive replies and meetings per 1,000)

Then hand off to `cold-email-write` or `cold-email-sequence`.
