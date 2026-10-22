---
name: cold-email-subject-lines
description: Writes and tests cold email subject lines. Rules are 1–4 lowercase words a colleague could have sent, with {first_name} as the research-backed control (+20% opens in a randomized study). Uses three strategies (intrigue, whole offer, problem indicator) and bans fake Re:, "AI", "quick question" as a default, and salesy phrasing. Use when the user asks for subject lines, says open rates are low, or when writing any email 1 or email 3.
---

# Subject lines

**Load:** `agents/cold-email/knowledge/03-subject-lines.md`. **Library:** `subject-bank.md`.

## Steps
1. **Get the hook and angle first.** The subject must match the email; never bait-and-switch.
2. **Write 5 options** across the three strategies:
   - **A. 2–4 word intrigue** using the signal ("cheers to the role", "{{company}} equipment")
   - **B. Whole offer** (a subject plus a preview that self-selects)
   - **C. Problem indicator** ("looked you up on chatgpt", "review from {{name}}")
3. **Always include the control:** `{{first_name}}` or `question for {{first_name}}`. Optionally `quick question` as a **B-arm only**.
4. **Filter each option** through the checks:
   - Colleague test: could a colleague or customer plausibly send this?
   - 1–4 words, lowercase.
   - No "?" unless deliberately tested; no "!", "re:", "fwd:", "AI", emojis or caps.
   - Not misleading.
5. **Check the preview line.** The email's first line must continue the subject's promise (`cold-email-hooks`).

## Output
The top 3 subjects, each with:
- the strategy (A, B or C)
- why it fits this prospect
- which one is the control vs the test

Also note the subject for **email 3**, which starts a new thread: "question for {{first_name}}", "{{customer type}} case study" or "show and tell".
