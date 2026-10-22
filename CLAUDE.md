# Extol Affiliates: sales repo

## How agents are organised
Each agent gets one home folder, `agents/<agent>/`, holding everything it uses: README, knowledge, libraries, research, tools, campaigns. Claude Code only loads agents and skills from `.claude/`, so those files live there, grouped by the agent's name:

| What | Where |
|---|---|
| Subagent definitions | `.claude/agents/<agent>/*.md` (subfolders are scanned) |
| Skills | `.claude/skills/<agent>-<skill>/SKILL.md` (must be one level deep, so prefix with the agent name) |
| Slash commands | `.claude/commands/<agent>/<agent>*.md` (filename = command name) |
| Everything else | `agents/<agent>/` |

See `agents/README.md` for the template for a new agent.

## Cold email system (`agents/cold-email/`)
For any cold email or outbound task (writing, sequences, personalization, review, offers, deliverability, replies, campaign stats):

Slash commands: `/cold-email <request>` (anything), `/cold-email-lead <lead row>` (research then write), `/cold-email-roast <email>` (score and rewrite).

1. Delegate to the **`cold-email-master`** agent, or use the `cold-email-*` skills directly. Start at `agents/cold-email/README.md`.
2. **Before showing any drafted email to the user, have the `cold-email-critic` agent score it**, passing only the email text and the persona. Ship at 85/100 or above; otherwise revise. This independent review is required.
3. Proof may come only from `agents/cold-email/libraries/proof-bank.md`. Never invent clients, numbers or signals.
4. Never send email or add contacts to a sending tool without the user's explicit go-ahead.

### Research and transcripts
- `agents/cold-email/research/REFERENCES.md` indexes all the research.
- YouTube transcripts go in `agents/cold-email/research/transcripts/` via `agents/cold-email/tools/yt-transcripts/` (run it locally; YouTube blocks cloud IPs). Process new ones with the `cold-email-learn` skill.
