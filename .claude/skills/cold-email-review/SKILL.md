---
name: cold-email-review
description: Critique, score and rewrite any cold email or sequence against the 10-point quality bar and the automatic checker, explaining each fix with the principle behind it. Also diagnoses underperforming campaigns from their metrics. Use when the user says "review this email", "why isn't this getting replies", "make this better", "score my cold email", or pastes a draft or campaign stats.
---

# Review a cold email

Read `cold-email/playbook.md` §2 and §9.

## For a draft
1. Save the draft to a scratch file. Separate emails with `===` lines if it's a sequence. Run `python3 cold-email/lint_email.py <file>`.
2. Score it on the **10-point bar** (playbook §9). Give each point 0 or 1 with a short reason.
3. List the **top 3 problems by impact**, using the hierarchy: offer and relevance outrank wording.
4. **Rewrite it.** Keep the user's real facts and proof. Never invent new ones. Then lint and score the rewrite.
5. Show the **before and after** side by side, with the score and lint verdict for each, and one line per change naming the principle and its source.

## For a campaign that isn't working
Ask for these numbers, or read them from what the user provided:
- sends
- bounce rate
- reply rate
- **positive** reply rate
- meetings

Then diagnose, starting from the top layer:

| Symptom | Likely layer | Action |
|---|---|---|
| Bounces above 2%, or replies near 0% on a large send | Deliverability or list hygiene | Run the `cold-email-deliverability` skill |
| Replies but few positive ones | List or offer | Check ICP fit and the offer (`cold-email-strategy`) |
| 1,000+ sends with no meetings | Messaging (Saraev) | Change the angle or offer, not just the wording |
| Positive replies but no meetings | Reply handling | Run `cold-email-replies` |
| Started well, now dropping | Segment exhausted (Jed) | Find a new trigger or segment |

Benchmarks for context (playbook §7):
- Instantly average 3.43%, top 10% above 10.7%
- Smartlead median 0.74% per contact
- Judge on positive replies, not opens

Finish with the **single highest-leverage change** to test next.
