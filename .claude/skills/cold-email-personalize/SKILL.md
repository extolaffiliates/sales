---
name: cold-email-personalize
description: Researches prospects and writes verified, non-generic personalization at the right depth per tier. Tier 1 is hand research; tier 2 uses the prompt library (Saraev's site-scrape icebreaker, Eric Nowoslawski's specificity line or fixed-slot creative ideas); tier 3 uses segment relevance only. AI fills slots and humans own the frame. Every fact keeps its source, abstaining beats being generic, and batches go through an approval loop. Use when the user says "personalize these leads", "write icebreakers or first lines", "research this prospect", or hands over a lead CSV.
---

# Personalize at scale

**Load:** `cold-email/knowledge/10-personalization-ai.md`, `01-intent-signals.md`. **Library:** `prompt-library.md`.

## 1. Decide the tier
| Tier | Method |
|---|---|
| **Tier 1** (dream accounts) | Hand research: Premise or SMYKM, plus a free-work offer |
| **Tier 2** (hundreds) | Prompt library: P1/P1b (Saraev icebreaker), P2 (specificity line), or P3 (creative ideas) |
| **Tier 3** (thousands) | No 1:1 personalization. Segment line only |

Then run Eric's checklist: **does the company context change how our offer helps them?** If not, use the static copy plus the signal line only.

## 2. Pipeline (tier 2)
1. **Filter:** a verified email AND a website. Fit check against the ICP; mark misfits `SKIP` with a reason.
2. **Research:**
   - fetch the homepage plus 2–4 pages (about, services, case studies, careers, pricing)
   - summarize each with P1
   - optionally: job posts, reviews, recent posts
3. **Generate** with the chosen prompt. **Fill in the client offer block, including "What they do NOT do"**, and use hand-written few-shot examples that include abstains.
4. **Verify:**
   - every fact is a substring of the source, or quotes 3+ words of the signal
   - the reading grade of the generated part is 7 or below
   - none of the AI tells from `10`
   - run P6, the quality rater, and keep scores of 4 or more
5. **Approval loop:**
   1. Show 1 lead.
   2. Then batches of 10.
   3. **Stop after 2 consecutive batches with no corrections.**
   4. Then fan out.
6. **Judge the batch:** blanks over 30% means the list or source is wrong; under 5% means read the thinnest rows by hand.

## 3. Output
`campaigns/<slug>/personalization.csv` with these columns:
- `email, first_name, company, tier, signal, source_url, fact_quote, generated_field, field_type, grade, quality_score, status`
- `status` is OK, SKIP or CHECK.

In chat, show 5 sample rows plus the counts per status.

**Never:**
- invent facts or compliments
- mention website visits
- claim tests you didn't run
- send anything from this skill
