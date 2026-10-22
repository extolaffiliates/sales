---
name: cold-email-write
description: Writes a complete first-touch cold email as 2–3 A/B variants by assembling the specialist parts (intent → subject-lines → hooks → body → cta) inside a chosen framework, then runs the linter and the critic until the email scores 85+/100. Emails are 50–90 words, read like a peer's note, carry one signal, one problem, one proof or risk reversal, and one small question. Use when the user asks to "write a cold email", "draft outreach to X", "give me variants", or "rewrite this email".
---

# Write a cold email

**Load:** `cold-email/knowledge/00-philosophy-hierarchy.md`, `08-frameworks.md`, `13-quality-bar.md`. **Libraries:** `swipe-file.md`, `proof-bank.md`.

## Steps
1. **Brief check.** Use `campaigns/<slug>/brief.md` if it exists. Otherwise get the minimum:
   - who (role, company, niche)
   - the offer
   - the country
   - what's in the proof bank

   Mark any assumptions `[ASSUMPTION]`.
2. **Why now:** run `cold-email-intent` for the prospect or segment.
3. **Pick a framework** with the decision tree in `08` (signal? scrapeable site? killer proof? no signal?).
4. **Assemble the parts**, using each skill's recipe:
   - `cold-email-subject-lines`: 3 options including the `{{first_name}}` control
   - `cold-email-hooks`: the opening line or preview
   - `cold-email-body`: the problem + proof (or risk reversal), 50–90 words in total
   - `cold-email-cta`: one question, plus an optional P.S.
5. **Build 2–3 variants that differ in exactly ONE named variable:**
   - offer type (save time / make money / save money, as in Eric's S15–S17), or
   - framework, or
   - CTA type (interest vs offer), or
   - hook type
6. **Psychology pass:** run the `cold-email-psychology` lens once and fix any principle that's violated.
7. **Lint:** save to `campaigns/<slug>/emails.md` (or a scratch file) and run `python3 cold-email/lint_email.py <file>`. Fix every ERROR; fix WARNs unless deliberate.
8. **Critic:** send each variant (**the email only, not your reasoning**) to the `cold-email-critic` agent.
   - Score 85 or more: ship it.
   - 70–84: fix the named weakest dimension and re-score.
   - Under 70: change the framework or offer.
   - At most 3 rounds, then report the best version honestly.

## Output (per variant)
```
VARIANT A — tests: <variable>
Subject: ...
<body>
— words: 64 · grade: 4.8 · lint: PASS · critic: 88/100
— why it should work: <principle + source, one line>
```
End with: the A/B test plan (which variable, sample per arm per `14`) and anything that needs real data, such as a proof-bank entry or a signal to verify.

**Never:** invent proof, signals or prior contact; send anything (drafts only).
