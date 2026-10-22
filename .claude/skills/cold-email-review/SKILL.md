---
name: cold-email-review
description: Critiques, scores and rewrites any cold email or sequence, and diagnoses campaigns that aren't working. Runs the automatic linter, gets an independent 0–100 score from the cold-email-critic agent, applies the psychology lens, rewrites the weakest dimension first (keeping the user's real facts), and for campaigns maps metrics to the failing layer (deliverability, list, offer, copy, replies). Use when the user says "review/score/roast this email", "make this better", "why isn't this getting replies", or pastes a draft or campaign stats.
---

# Review and diagnose

**Load:** `cold-email/knowledge/13-quality-bar.md`, `00-philosophy-hierarchy.md`, `05-body-proof.md`, `14-benchmarks-experiments.md`.

## A. Reviewing a draft
1. Save it to a scratch file (separate sequence steps with `===`). Run `python3 cold-email/lint_email.py <file>`.
2. Send the email (and nothing else) to the **`cold-email-critic`** agent for the 100-point score, the weakest dimension and up to 3 fixes.
3. Run the `cold-email-psychology` lens: which principles are used, missing or violated.
4. **Rewrite**, weakest dimension first:
   - Keep every real fact the user gave.
   - **Never add new facts, proof or signals.** If one is needed, ask for it, or use risk reversal.
   - Lint the rewrite and get it re-scored.
5. **Show:**
   - before and after side by side, each with its lint verdict and critic score
   - one line per change naming the principle and source (e.g. "cut the 'I hope' opener; Coleman / Jason Bay")
6. **"Roast mode"** (if asked): be blunt line by line, still constructive. End with the rewrite.

## B. Diagnosing a campaign
Ask for: sends, bounce rate, reply rate (excluding out-of-office), positive replies, meetings, and the time window. Then map them to a layer (`00` diagnosis table):

| Symptom | Layer | Next skill |
|---|---|---|
| Bounces above 2%, 550s, or under 1% replies after 200+ sends | Deliverability or list | `cold-email-deliverability` |
| Replies but under 30% positive | List or offer | `cold-email-strategy` / `cold-email-offer` |
| 1,000+ sends, 0 meetings | Messaging | New angle or offer, not small wording edits |
| Positive replies, no meetings | Replies | `cold-email-replies` (speed, one next step) |
| Started well, now declining | Segment exhausted | `cold-email-intent` (new trigger), rest the list for 3 months |

**Compare to benchmarks with the denominator stated** (`14`). Finish with **the single highest-leverage test**, designed with `cold-email-experiment`.
