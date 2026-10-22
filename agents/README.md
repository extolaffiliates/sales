# Agents

One folder per agent. Copy this layout for a new agent called `<agent>`:

```
.claude/agents/<agent>/            subagent definitions (.md, frontmatter name: <agent>-<role>)
.claude/skills/<agent>-<skill>/    one SKILL.md per skill (Claude Code needs them one level deep)
agents/<agent>/
  README.md                        what it does, how to ask for it, structure
  knowledge/                       numbered rule files, each rule source-tagged
  libraries/                       reusable banks (examples, templates, proof)
  research/                        sourced reports + REFERENCES.md index
  tools/                           scripts the agent or user runs
  campaigns/ (or work/)            outputs, one folder per job
```

Then add a section for it in the root `CLAUDE.md`.

| Agent | Folder | Entry point |
|---|---|---|
| Cold email | `agents/cold-email/` | `cold-email-master` (reviewed by `cold-email-critic`) |
