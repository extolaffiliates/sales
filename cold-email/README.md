# Cold Email Master

This is Extol's cold email system: a specialist agent, 8 skills, a rulebook built from research, and an automatic checker for drafts.

## How to use it (in Claude Code, inside this repo)

Ask in plain English. The `cold-email-master` agent picks up any cold-outreach task.

| Say | What happens |
|---|---|
| "Plan a cold email campaign for {offer} to {ICP}" | `cold-email-strategy` asks for what it needs (the brief), stress-tests the offer, ranks 3–5 angles, and saves `campaigns/<slug>/brief.md` |
| "Write a cold email to {role} at {company type}" | `cold-email-write` writes 2 A/B variants and checks and scores each one |
| "Build a 4-step sequence" | `cold-email-sequence` writes every step, each adding something new and ending in a real breakup email |
| "Personalize this lead list" + a CSV | `cold-email-personalize` uses Saraev-style website research to write fact-checked first lines |
| "Review this email" + a draft, or "why isn't my campaign working" + stats | `cold-email-review` scores it, rewrites it, and diagnoses which layer is failing |
| "How many domains/inboxes do I need?", "is this legal in the UK?" | `cold-email-deliverability` |
| "They replied with {X}. What do I say?" | `cold-email-replies` |
| "Learn from the new transcripts" | `cold-email-learn` updates the playbook from primary sources |

You can also call the agent directly: *"Use the cold-email-master agent to …"*.

## What's in here

| Path | What it is |
|---|---|
| `.claude/agents/cold-email-master.md` | The agent: its role, workflow and non-negotiables |
| `.claude/skills/cold-email-*/SKILL.md` | The 8 skills |
| `cold-email/playbook.md` | **The rulebook.** The hierarchy of what matters, hard rules, 10 frameworks, offers, personalization tiers, sequences, deliverability, replies, a 10-point quality bar and testing |
| `cold-email/swipe-file.md` | Annotated example emails for each framework |
| `cold-email/lint_email.py` | Automatic checker covering word count, reading grade, subject rules, banned phrases and buzzwords, links, unfilled placeholders, meeting-ask detection and the you-vs-me ratio. `python3 cold-email/lint_email.py draft.txt` |
| `research/cold-email/` | Sourced research: Nick Saraev; 10 creators and the 2025–26 benchmark reports; deliverability, compliance and psychology |
| `tools/yt-transcripts/` | Downloads full YouTube channel transcripts into `research/transcripts/` |

## Research basis and its limits

v1 was built from web search results. The research tools couldn't open full pages or YouTube transcripts from the cloud environment. Every claim in the research files has a source URL and is marked as verbatim or paraphrase. The rules that come from measured studies (Gong, Lavender, Instantly, Smartlead, Belkins, Boomerang) are solid. The creator-specific details are thinner, especially Nick Saraev's exact prompts, subject lines and follow-up cadence.

**To make it complete:**
1. Run `tools/yt-transcripts/fetch_channel_transcripts.py` on your own computer and push the results. See `tools/yt-transcripts/README.md`.
2. Ask Claude to "learn from the new transcripts".
3. Add your real campaign results to `campaigns/<slug>/results.md`. Our own data outranks every creator.
