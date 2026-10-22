---
description: Research one lead, find the crux, then write a critic-approved first email
argument-hint: <paste the lead row or notes>
---

Write a first-touch cold email for this lead:

$ARGUMENTS

Work in this order:
1. **Probe before writing.** Do this with web search (`cold-email-intent` skill):
   - Check the company register (Companies House for UK) for the owner, directors and offices.
   - Read their public reviews for what customers praise and complain about.
   - Look for fresh signals under 6 months old: hiring, new office, funding, regulation in their area.
   - Never pitch a pain their reviews say they're good at.
   - Save the findings to `agents/cold-email/campaigns/<slug>/research.md`.
2. **State the crux** in one line: what costs them money or reputation now, in their customers' words, and how we fix it without touching what they're proud of.
3. **Write 2–3 variants** with `cold-email-master` (`cold-email-write` skill). Each variant differs in one variable.
4. **Run the linter**, then score each variant with **`cold-email-critic`**, sending only the email text and the persona. Revise until a variant scores 85+. If a variant stalls below 85 after 3 rounds, stop. Tell me which missing facts are capping the score (product specifics, offer terms, proof, an unverified pain).
5. Save to `agents/cold-email/campaigns/<slug>/emails.md`. Show me the best variant, its score, the call-first plan and the UK/EU footer needs.

Proof only from `proof-bank.md`. Never invent facts. Never send.
