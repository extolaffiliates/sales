---
name: cold-email-body
description: Writes the middle of a cold email (problem line, bridge, and proof) in 50–90 words at a grade 3–7 reading level. Names the pain in the prospect's own words, uses a dilemma or loss frame, adds one precise and matched proof point (only from the proof bank) or a risk reversal, keeps the product nearly absent, and runs Eric Nowoslawski's three cutting passes. Use when the user asks to write or tighten the body of an email, says an email is too long or salesy, or needs a proof or case-study line.
---

# Body: problem, bridge and proof

**Load:** `agents/cold-email/knowledge/05-body-proof.md`, `07-psychology.md` (loss aversion, social proof, fluency). **Libraries:** `proof-bank.md`, `swipe-file.md`.

## Steps
1. **Problem line (1–2 sentences).** Their pain, better than they could say it:
   - Use **their words**, mined from case studies, reviews or job posts.
   - Use a dilemma ("you either… or…") or a loss frame where it fits.
   - Use neutral, hedged wording ("not sure if this is on your radar", "I imagine").
   - **One problem only.**
2. **Bridge (optional, 1 sentence).**
   - Safe Space: "We see this across {{segment}}."
   - Or "So you can focus on {{their mission}} instead of {{our category}}."
3. **Proof (1 sentence).**
   - Pull from `proof-bank.md` only: a matched peer + a precise result + a timeframe.
   - **If the proof bank is empty or has no match:** use a risk reversal or free work from `cold-email-offer`. **Never invent a client or a number.**
4. **Keep the product nearly absent.** At most one plain-English clause on what you do (an outcome, not features).
5. **Cut it** (Eric's three passes):
   1. Delete fluff (−20%).
   2. Compress (−15%).
   3. Cut adjectives (−10%).

   Use numerals, active voice, and no "that" or "which".
6. **Check the "them : us" ratio is at least 3:1** and "you" outnumbers "I/we".

## Output
The body text, plus:
- the word count
- which proof-bank ID it uses (or "risk reversal: …")
- the one weakest phrase you'd test next

The full email gets assembled by `cold-email-write`.
