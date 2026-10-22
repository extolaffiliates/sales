---
name: cold-email-replies
description: Handles cold email replies. Classifies each reply (interested, soft, referral, neutral, not-now, not-fit, hostile, unsubscribe, OOO), drafts the response within the 1-hour window using proven patterns (Josh Braun's "not interested" reply, mirror-and-qualify for "send info", gratitude for referrals), handles objections with one neutral question, and builds a pre-approved reply-template library for automation (Saraev #303: AI fills variables only). Use when the user pastes a prospect reply, asks "how do I respond", "they said X", or wants to automate reply handling.
---

# Replies and objections

**Load:** `cold-email/knowledge/12-replies-objections.md`, `07-psychology.md` (gratitude, mirroring, speed, detachment).

## Steps
1. **Classify** the reply into one label (`12`). If it's unclear, label it `neutral_question`, and flag low confidence.
2. **Mirror** their length and formality.
3. **Draft by label:**
   - **Interested:** under 50 words; 2 specific times in *their* time zone *or* a calendar link; one line restating the value.
   - **Send info:** mirror and qualify, then 2–3 lines plus ONE qualifying question. No deck unless they ask.
   - **Referral:** thank them genuinely, then draft the email to the named person, mentioning the referrer (only because the referrer named them).
   - **Not now:** "Totally fair. Mind if I check back in {{month}}?" Log the date.
   - **Objection:** acknowledge it, ask one neutral question, don't argue. Use the `12` patterns (Braun's "not interested", "we already have someone", "too expensive").
   - **Who are you / how did you get my email:** name the source, identify the sender, offer removal, link the privacy notice.
   - **Unsubscribe or hostile:** one line confirming removal; mark them for suppression **immediately**; never argue.
   - **OOO:** no reply; log the return date or the alternate contact.
4. **Check:** one question at most; no pressure; nothing invented (prices, results, availability).
5. **Next step:** CRM status, follow-up date, contacts to add or suppress.

## Automation mode (Saraev #303)
Build `campaigns/<slug>/replies.md`:
- one **approved template per label**
- `{{variables}}` for the name, a detail from their reply, times, and month

The AI only **classifies → picks the template → fills the variables**. Anything with low confidence, any pricing or legal question, and any hostile reply goes to a human. Start in human-approval mode (e.g. Instantly AI Reply Agent with approvals).

**Never send without the user's go-ahead.**
