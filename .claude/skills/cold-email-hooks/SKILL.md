---
name: cold-email-hooks
description: Writes the opening line and preview text of a cold email, the part that decides whether it gets read. Picks from 15 hook types (specific observation, problem spotted, curiosity question, Truth+implication, hedged hypothesis, poke the bear, inherited problem, honest no-signal, and more), starts on the prospect never on "I", and bans flattery and AI tells. Use when the user asks for a first line, icebreaker, opener, or preview text, or when an email starts with "I hope", "My name is" or "I came across".
---

# Hooks: opening line and preview

**Load:** `cold-email/knowledge/04-hooks.md`, `01-intent-signals.md`, `07-psychology.md` (curiosity, relevance, self-relevance). **Library:** `hook-bank.md`.

## Steps
1. **Take the why-now output from `cold-email-intent`:** the signal, the angle and the source. With no signal, use the honest segment fallback.
2. **Draft 3 hooks using 3 different hook types** from the taxonomy in `04`. Always include at least one of:
   - specific observation
   - problem spotted
   - hedged hypothesis
3. **Apply the rules:**
   - Start on them, never on "I" or "We".
   - No "Hi Jason," line that wastes the preview. Use "{{first_name}} –" followed by the point, or start straight on the observation.
   - Specific and checkable. Run the "could this apply to anyone else?" test.
   - Observation, not flattery. Nothing in the banned-openers list.
   - Casual compression ("Maki", not "Maki Agency"); contractions.
   - At most 2 sentences and about 30 words.
4. **Connect it to the problem.** The hook must set up the problem line ("usually means…", "guessing…").
5. **Preview check:** read only the first ~90 characters. Do they earn the open on their own?

## Output
The 3 hooks, each with:
- the hook type
- the source of the fact
- a predicted strength (and why)
- a recommended pick

Flag any hook that relies on a test the sender must actually do (calling them, submitting a form). **Never claim an action that wasn't taken.**
