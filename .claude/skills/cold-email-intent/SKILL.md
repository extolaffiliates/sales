---
name: cold-email-intent
description: Finds the buying signal and writes the "why you, why now" reason for a prospect or segment. Ranks signals (hiring > funding > tech gap > tech present > industry problem), maps each signal to an angle (the workload behind it, not the event), rejects stale or stacked signals, and falls back to an honest segment observation when there is no signal. Use when the user asks "why would they care now", "find a trigger", "what signal should we use", or before writing any first line.
---

# Intent and signals

**Load:** `agents/cold-email/knowledge/01-intent-signals.md`, `07-psychology.md` (the "because" principle, relevance over flattery). **Library:** `hook-bank.md`.

## For a single prospect
1. **Gather signals** from real sources you actually read: their site (careers, about, pricing, case studies), LinkedIn posts, job boards, news, reviews, tech-stack lookups, ads. **Record the source URL for every one.**
2. **Rank** what you found: hiring > new in role > funding > tech gap > tech present > reviews or content > industry problem > nothing.
   - Drop anything stale (a filled role, a raise more than 6 months ago).
   - **Never mention a website visit.**
3. **Pick ONE.** Save the others for follow-ups (email 2 or 3 can use a different signal).
4. **Translate signal → angle:** the *workload or pressure* the signal implies ("If A, then B is probably true"). Use `01`'s map.
5. **Verify:** quote at least 3 words of the signal exactly as it appears in the source. If you can't, it isn't a real signal.

## For a segment (list level)
Define the shared trigger or segment (Colgan's questions) and write one sentence that is true for every row ("Most {{segment}} teams your size still {{task}} by hand").

## Output
```
signal: "<exact quote>"  source: <url>  date: <YYYY-MM>  rank: hiring
angle: <workload/pressure implied>
why_now_line: <one sentence, starts with them, no "I">
backup_signals: [...]        # for follow-ups
confidence: high|low         # low → use segment fallback
```

If there's no real signal, say so and give the honest segment line. "A wrong specific is worse than a right generic."
