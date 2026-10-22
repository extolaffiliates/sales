# Extol Affiliates: sales repo

## Cold email system
For any cold email or outbound task (writing, sequences, personalization, review, offers, deliverability, replies, campaign stats):

1. Delegate to the **`cold-email-master`** agent, or use the `cold-email-*` skills directly. The knowledge base lives in `cold-email/` (start at `cold-email/README.md`).
2. **Before showing any drafted email to the user, have the `cold-email-critic` agent score it**, passing only the email text and the persona. Ship at 85/100 or above; otherwise revise. This independent review is required.
3. Proof may come only from `cold-email/libraries/proof-bank.md`. Never invent clients, numbers or signals.
4. Never send email or add contacts to a sending tool without the user's explicit go-ahead.

## Research and transcripts
- `research/cold-email/REFERENCES.md` indexes all the research.
- YouTube transcripts go in `research/transcripts/` via `tools/yt-transcripts/` (run it locally; YouTube blocks cloud IPs). Process new ones with the `cold-email-learn` skill.
