---
description: Cold email agent. Any outbound task (write, sequence, offer, personalize, deliverability, replies, stats)
argument-hint: <what you need, e.g. "write a cold email to dental clinics in Leeds">
---

Use the **`cold-email-master`** agent for this request:

$ARGUMENTS

Rules (from CLAUDE.md):
1. Pass the request and any lead data to `cold-email-master`. It reads `agents/cold-email/README.md` and uses the `cold-email-*` skills.
2. Before showing me any drafted email, send only the email text and the persona to the **`cold-email-critic`** agent. Show drafts only at 85/100 or above. Otherwise revise, or tell me exactly which missing facts block the score.
3. Proof may come only from `agents/cold-email/libraries/proof-bank.md`. Never invent clients, numbers or signals.
4. Never send anything or add contacts to a sending tool.
5. Save the work under `agents/cold-email/campaigns/<slug>/`.

If the request is empty, ask me what I want to do and list the options: write, sequence, lead, roast, offer, deliverability, replies, results.
