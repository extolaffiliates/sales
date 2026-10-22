---
description: Score and rewrite a cold email with the independent critic
argument-hint: <paste the email, plus who it's for>
---

Roast this cold email:

$ARGUMENTS

1. Run `python3 agents/cold-email/lint_email.py` on it.
2. Send only the email text and the persona to the **`cold-email-critic`** agent. If no persona is given, infer it from the email and say what you assumed.
3. Show the critic's output exactly: score, verdict, weakest line, "would I reply", fixes.
4. Use the `cold-email-review` skill to write one rewrite that keeps every real fact and invents none, then score the rewrite with the critic.
5. Show the original score, the rewrite and the rewrite's score.
