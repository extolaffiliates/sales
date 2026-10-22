---
name: cold-email-replies
description: Draft responses to cold email replies (positive, "send info", "not now", wrong person, objections, unsubscribe) and build a reply-template library for automation, using Nick Saraev's constrained-AI reply approach. Use when the user pastes a prospect's reply, asks "how do I respond to this", or wants to automate reply handling.
---

# Handle cold email replies

Read `cold-email/playbook.md` §8. The goal is the next step, with the least friction for them.

## Classify the reply first
Label it as one of: `POSITIVE`, `INFO_REQUEST`, `NOT_NOW`, `WRONG_PERSON` (referral), `OBJECTION` (and which one), `NEGATIVE`, `UNSUBSCRIBE`, `OOO`, or `AUTO`.

## Response rules by type
- **POSITIVE:** reply fast. Give 2 specific time slots in their timezone, *or* a calendar link (a specific-time ask now wins: 37% per Gong). Add one line that restates the value. Keep it under 50 words.
- **INFO_REQUEST:** send 3 bullets (outcome, how it works, proof) and one question that qualifies them. No attachments or decks unless asked.
- **NOT_NOW:** "Totally fair. Mind if I check back in {specific month}?" Then log the follow-up date.
- **WRONG_PERSON:** thank them and ask who owns it. Then email that person, mentioning the referral, but only if the referrer agreed or named them.
- **OBJECTION:** acknowledge it, ask one neutral question, and don't argue (Braun). Common ones:
  - "We already have someone" → "Makes sense. Out of curiosity, how are you handling {specific gap}?"
  - "No budget" → ask about timing and offer the smallest first step.
  - "Too expensive" → anchor on the outcome or the risk reversal.
- **NEGATIVE / UNSUBSCRIBE:** one polite line confirming they've been removed. Suppress them immediately and never argue.
- **OOO / AUTO:** don't reply. Note the return date and any alternative contact.

## Automation (Saraev's Ask Nick #303 design)
For volume, build a **reply-template library** in `campaigns/<slug>/replies.md`:
- one approved template per reply type
- each template has `{variables}`, such as first name, a detail from their reply, and time slots

The AI then:
1. classifies the reply
2. picks the closest template
3. fills in **only the variables**

In Saraev's words: "minimal freedom, just enough to fill in variables, so you retain control over tone and quality". Anything it can't classify confidently goes to a human.

## Output
Show the classification, the drafted reply, and the CRM next step (status, follow-up date, and the referral contact if there is one). Don't send anything without the user's go-ahead.
