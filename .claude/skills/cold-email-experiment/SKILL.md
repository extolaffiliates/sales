---
name: cold-email-experiment
description: Measures cold email campaigns the right way and designs proper A/B tests. Scores replies into positive/neutral/negative labels, computes the positive reply rate (positive replies ÷ sends; good ≥1%, great ≥2%; pause if hostile >0.3% or unsubscribes >2%), checks the 1% baseline, and plans single-variable experiments (500–2,000 sends per arm, both arms launched together, read at day 21, adopt at ≥20% lift). Use when the user asks "how is my campaign doing", "is this a good reply rate", "what should I test", "set up an A/B test", or shares replies or stats.
---

# Measure and experiment

**Load:** `agents/cold-email/knowledge/14-benchmarks-experiments.md`, `12-replies-objections.md` (labels).

## A. Score a campaign
1. **Get the data:** sends, and the replies (raw text if possible, otherwise counts by type). Exclude out-of-office and bounces from the denominators.
2. **Label every reply** with the `12` labels (interested / soft / referral = positive; neutral = half; not-now, not-fit, hostile, unsubscribe = negative).
3. **Compute:**
   - total reply rate
   - **positive reply rate per send**
   - positive share of replies
   - hostile rate
   - unsubscribe rate
   - meetings per 1,000 contacts
4. **Verdict:**
   - Positive reply rate of 1% or more is good; 2% or more is great.
   - **Pause the campaign** if hostile replies exceed 0.3% or unsubscribes exceed 2%.
   - Under 1% total replies after 200+ sends means a broken baseline, so audit deliverability first.
5. Save the results to `agents/cold-email/campaigns/<slug>/results.md`, as dated entries.

## B. Design a test
1. **Hypothesis:** "Changing {X} will lift positive reply rate from {baseline} to {target} because {principle}."
2. **One variable.** Name it, and list the constants (list, offer, copy, infrastructure, schedule). If anything else changes, it's a combined test and can't be adopted directly.
3. **Pick the variable to test** in priority order (`14`): offer > list or segment > angle or framework > CTA type > subject > P.S. > image > sequence length.
4. **Sample size per arm** from the `14` table. **Default to 2,000; never under 500.**
5. **Success, failure and inconclusive criteria, written before launch.**
6. **Launch both arms on the same day, on split inboxes. Read at day 21.**
7. **Decide:**

   | Result | Action |
   |---|---|
   | 20% lift or more | Adopt as the new baseline |
   | 10–20% lift | Replicate |
   | Under 10% | Inconclusive |
   | A loss | Write down why |

## Output
- **Scoring:** a metrics table plus a verdict plus the next action.
- **Test design:** an experiment card (hypothesis, variable, constants, arms, sample, criteria, read date), saved to `agents/cold-email/campaigns/<slug>/experiments.md`.
