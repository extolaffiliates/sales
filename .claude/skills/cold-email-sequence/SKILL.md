---
name: cold-email-sequence
description: Builds a full cold email sequence. The default is Eric Nowoslawski's 4 emails as two threaded pairs (1 new, 2 replying, 3 new thread with a new offer type and lower-friction CTA, 4 "should I reach out to {named colleague}?"). Huge yes/no markets get 2 emails; tier-1 accounts get 6–7 multichannel touches. Every follow-up adds something new, with no "just checking in". Use when the user asks for a sequence, follow-ups, "what do I send if they don't reply", or a breakup email.
---

# Build a sequence

**Load:** `cold-email/knowledge/09-sequences.md`, `06-cta.md`, `07-psychology.md` (closure, consistency, reciprocity). **Libraries:** `swipe-file.md` (S11–S14, S22–S25), `subject-bank.md`.

## Steps
1. **Pick the sequence length (`09`):**
   - Huge market (80K+) and a yes/no offer → **2 emails**.
   - Standard → **4 emails (default)**.
   - Tier 1 → **6–7 emails plus LinkedIn and calls**.
2. **Email 1:** write it with `cold-email-write` if it doesn't exist yet.
3. **Email 2 (day 3–4, replies in thread 1, blank subject):** add depth (how the result happened) *or* a short new reason (Mouse Trap, stats hook, creative ideas, or a fresh post or signal). 15–60 words.
4. **Email 3 (day 7–8, new thread, new subject):**
   - Use a **different offer type** from email 1.
   - Use a lower-friction CTA ("if I made a 2-min video of how this would work for you, would you watch it?").
   - It must stand alone. Consider dropping AI personalization and going direct (inherited problem, whole offer, case-study story).
5. **Email 4 (day 11–12, replies in thread 3):**
   - The right-person redirect with a real colleague's **full name**, plus an opt-out P.S. (S22/S23).
   - Or a resource offer, or a value bomb.
   - No guilt.
6. **Checks across the whole sequence:**
   - Each step adds something new.
   - No banned follow-up openers.
   - The offer types rotate.
   - At most one image (email 2 or 3, a [TEST]).
   - Lengths shrink as the sequence goes on.
   - No step says "following up".
7. **Lint:** write `campaigns/<slug>/sequence.md` with steps separated by `===` lines, and run the linter (steps 2 and later are checked as follow-ups).
8. **Critic:** score email 1 and email 3 (the two new threads) to 85 or more.

## Output
- A table: step · day · thread (new / reply) · job · offer type · words · lint
- the full copy
- a one-line note per step on what's new
- the TAM reuse plan: re-contact in 3 months with fresh data, plus the volume maths if the brief has a target
