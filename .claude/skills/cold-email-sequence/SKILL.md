---
name: cold-email-sequence
description: Build a complete multi-step cold email sequence (default 4 emails over about 2 weeks; 6–7 plus multichannel for tier-1) where every follow-up adds a new angle, value or referral ask, ending in a real breakup email. Use when the user asks for "a sequence", "follow-ups", "a 3/4/5-step campaign", or "what do I send if they don't reply".
---

# Build a cold email sequence

Read `cold-email/playbook.md` §6 (sequences) and §2 (rules). Use the campaign brief if one exists. If email 1 isn't written yet, write it with the `cold-email-write` recipe first.

## Default 4-step sequence (big lists, tier 2–3)
| Step | Day | Job | Rules |
|---|---|---|---|
| 1 | 0 | Open the loop | Full first-touch rules: 40–90 words, interest CTA |
| 2 | 3 | **New** angle or value | 15–50 words, same thread. A second problem, new proof, or an offer CTA ("want me to send the 3 ideas?"). A screenshot is OK here (Jed). |
| 3 | 7–8 | Referral / right person | 15–40 words: "If this sits with someone else, who should I ask?" |
| 4 | 12–14 | Breakup | 20–50 words. Take the offer away politely and leave a one-word reply option. Only send it if the sequence really stops. |

For lists of 50k+ (Nowoslawski): send steps 1–2 only, then rest the list for 45+ days and come back with a new angle.

## Tier-1 / multichannel variant
Use 6–7 emails over about 30 days (Gong's sweet spot), mixed with LinkedIn touches and calls (30MPC 10–14 touches). Switch to a second problem halfway through. Becc Holland reports her 5th email converts best, so don't stop too soon on high-value accounts.

## Follow-up rules
- **Every step must add something new.** Banned: "just following up", "bumping this", "circling back", "did you see my last email".
- Reply in the same thread (no new subject) unless you're deliberately switching angle.
- Each follow-up must make sense on its own, for someone who never read email 1.
- Keep shrinking the length and the ask as the sequence goes on.
- No guilt, sarcasm or passive aggression in breakups.

## Verify and deliver
1. Write all steps to `campaigns/<slug>/sequence.md`, with steps separated by `===` lines (step 1 first).
2. Run `python3 cold-email/lint_email.py campaigns/<slug>/sequence.md`. Steps 2 and later are linted as follow-ups.
3. Present a table showing each step's day, job and word count, then the full copy, with one line per step on what it adds.
4. Suggest a test plan: which step and which variable to A/B test first. Usually test email 1's angle or CTA first.
