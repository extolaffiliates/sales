# 10 · Personalization and AI

**The core rule (Eric, LeadHaste, the 16,880-message field test) [R05]: AI fills slots; humans write the frame.** AI writes the first line or one specificity line. Never let the model write the whole email. Fully AI-written emails underperform: 2.4% vs 3.8%, plus more spam flags (secondhand) [R05].

## Depth by account tier
| Tier | Volume | Method |
|---|---|---|
| **Tier 1** | 10–50 a month | Hand research: Premise or SMYKM, a custom Loom, free work. Lieben: write the first 25 by hand to find the patterns [R04] |
| **Tier 2** | Hundreds | Saraev pipeline: scrape the site → summarize pages → a fixed-template icebreaker. Or Eric's specificity line or creative ideas (`libraries/prompt-library.md`) |
| **Tier 3** | Thousands | **No 1:1 personalization.** Segment relevance (Colgan): one sharp email per segment. Never fake personalization |

## When AI company context helps (Eric's decision framework) [SRC]
- **Use it when** the prospect's business changes how your product helps them: varied use cases, mission alignment, broad targeting.
- **Skip it when:**
  - the use case is identical everywhere ("vacuums clean floors the same way")
  - the list is narrow and uniform
  - it would feel forced
- **Checklist:** if removing the variable wouldn't make the email feel generic, cut it.

## Prompt engineering rules (from the locked prompts in report 05)
1. **Three-part prompt:**
   - a **static prefix** (the task, steps and rules)
   - a **client offer block**, which *must include "What they do NOT do"*, otherwise the model borrows promises next to yours
   - **8–10 hand-written few-shot examples, including 2+ abstains**
2. **Humans write the examples.** "AI never drafts the exemplars it is graded against."
3. **Fixed slots, not free-form.** Creative ideas were 91% usable with operator-named slots vs 40% free-form.
4. **Verify the evidence.** The model returns the exact substring it used, and you check it exists in the input. If it doesn't, blank the field.
5. **Abstain beats generic.** Empty is a valid answer. More than 30% blanks means the list is wrong, not the prompt. Under 5% blanks means the prompt is too loose, so read the thinnest rows.
6. **Grade the generated part:** Flesch-Kincaid grade 7 or below on the *variable*, not the whole sentence.
7. **Spartan tone, casual compression** ("Maki", not "Maki Agency"), non-obvious details (Saraev).
8. **Ban the AI tells in the prompt *and* explain why:** "If your line needs one of these, your anchor was too vague. Go back to step 2."
9. **Judge a batch, never a row.** Outputs are non-deterministic.
10. **Never use spintax to handle blanks.** Route abstaining rows to a different campaign.
11. **Model choice:** a nano or mini model at minimal reasoning. In Clay, use gpt-4o-mini; a reasoning model with its level unset costs about 19x and returns blanks.

## Approval loop (Eric's sub-agent pattern) [SRC]
1. Sample 1 lead.
2. Batches of 10 with human corrections.
3. **Stop after 2 consecutive batches with zero corrections.**
4. Fan out.

Spot-check 5 per variant for repetition, wrong facts, AI-speak and hedging.

## AI tells to ban (union of sources) [R05]
- **Punctuation and formatting:** em dashes; exclamation marks; bullets in email 1; parentheticals.
- **Phrases:**
  - "Picture this", "Imagine if", "What if I told you", "In today's…", "Here's what I keep seeing"
  - "I was intrigued / impressed by", generic "Love what you're doing", "I came across"
  - repeating their tagline back to them
  - "As a leader in…"
- **Patterns:** hedging ("might", "seem to"); stacking 2+ signals; the same sentence shape across every lead.

## Data sources for personalization
- Company website (several pages)
- LinkedIn posts (recency gaps, as in the Taplio example)
- Job posts and their wording
- Reviews (Google, G2, Glassdoor)
- Tech stack (BuiltWith)
- Funding (Crunchbase)
- Ads (ad library)
- AI-search rankings
- Case-study pages
- Pricing pages

These all appear as playbooks in Eric's repo [SRC].
