# Cold Email Master (v2)

Extol's cold email system: **2 agents, 16 skills, 15 knowledge files, 6 libraries and an automatic checker**. Every rule traces back to sourced research in `agents/cold-email/research/` (index: `REFERENCES.md`).

## How to use it (Claude Code, inside this repo)
Ask in plain English. `CLAUDE.md` sends cold email work to the **`cold-email-master`** agent, and every draft gets an independent score from **`cold-email-critic`** before you see it.

| Say | What happens |
|---|---|
| "Plan a cold email campaign for {offer} to {ICP}" | `strategy` → brief, segments, ranked angles, volume maths → `agents/cold-email/campaigns/<slug>/brief.md` |
| "What should we offer dental clinics?" | `offer` → 2–3 offers from the library, strengthened with risk reversal |
| "Find a reason to email {company} now" | `intent` → one verified signal → the why-now line |
| "Write a cold email to {role} at {company}" | `write` → intent + subject + hook + body + CTA → 2–3 A/B variants → linter → critic ≥85 |
| "Build a sequence" | `sequence` → 4 emails as two threaded pairs, with a clean breakup |
| "Personalize this lead list" + CSV | `personalize` → verified first lines via the prompt library, with an approval loop |
| "Review / roast this email" | `review` → linter + critic score + psychology lens + rewrite |
| "Why isn't my campaign working?" + stats | `review` + `experiment` → the failing layer and the next test |
| "Set up an A/B test" / "is 2% good?" | `experiment` → positive reply rate, sample size, experiment card |
| "How many domains do I need?" / "is this legal in Germany?" | `deliverability` |
| "They replied {X}. What do I say?" | `replies` |
| "Learn from the new transcripts" | `learn` → proposes sourced updates for your approval |

You can also call any skill or agent directly (e.g. "use cold-email-hooks to give me 3 openers").

## Structure
Everything for this agent lives in `agents/cold-email/`, except the files Claude Code must find in `.claude/`.
```
.claude/agents/cold-email/        cold-email-master.md   lead writer, routes to the 16 skills
                                  cold-email-critic.md   independent 100-point reviewer (sees the email only)
.claude/skills/cold-email-*/      16 skills (Claude Code requires .claude/skills/<name>/SKILL.md)
                                  STRATEGY  strategy · offer · intent
                                  ANATOMY   subject-lines · hooks · body · cta · psychology
                                  ASSEMBLY  write · sequence · personalize
                                  QUALITY   review · experiment · deliverability · replies · learn
agents/cold-email/
  README.md         this guide
  lint_email.py     automatic checks: length, grade, subject rules, banned phrases, AI tells, links, CTA, placeholders
  knowledge/        00 philosophy · 01 intent · 02 offers · 03 subjects · 04 hooks · 05 body · 06 CTA · 07 psychology
                    08 frameworks · 09 sequences · 10 personalization/AI · 11 deliverability/law · 12 replies · 13 quality bar · 14 benchmarks
  libraries/        swipe-file · offer-library · prompt-library · subject-bank · hook-bank · proof-bank (← fill this in)
  research/         6 sourced reports + sources/ (MIT files) + REFERENCES.md + transcripts/
  tools/            yt-transcripts/ (YouTube transcript downloader; run locally)
  campaigns/<slug>/ brief · emails · research · sequence · personalization.csv · replies · results · experiments
```

## The checker
```bash
python3 agents/cold-email/lint_email.py draft.txt              # finished copy
python3 agents/cold-email/lint_email.py --template seq.txt     # allow {{merge_fields}} for sending tools
```
Separate the emails in a sequence with a line containing only `===`. It exits with code 1 on any ERROR.

## To make it stronger
1. **Fill in `libraries/proof-bank.md`** with Extol's real results. Until then the agent uses free work or risk reversal and never cites clients.
2. **Push Nick Saraev's transcripts** (28 downloaded locally, 62 pending) to `agents/cold-email/research/transcripts/`, then run `cold-email-learn`.
3. **Log campaign results** in `agents/cold-email/campaigns/<slug>/results.md`. Our own data outranks every creator.
