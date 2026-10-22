---
name: cold-email-learn
description: Makes the cold email agent smarter from new evidence such as YouTube transcripts (research/transcripts/), pasted posts or articles, new research, or Extol's own campaign results. Extracts frameworks, rules, verbatim example emails and numbers with timestamps, compares them to the knowledge base, and proposes sourced updates to cold-email/knowledge/*.md, libraries and the linter for the user to approve. Use when new transcripts arrive, when the user says "learn from this video/creator/post", "update the knowledge base", or shares campaign results.
---

# Learn from new sources

## Evidence ranking (highest first)
1. **Extol's own campaign results**
2. Full transcripts and primary files
3. Randomized studies
4. Practitioner data
5. Vendor blogs
6. Search snippets

## 1. Gather
- **Transcripts:** `research/transcripts/<channel>/*.md`, fetched by `tools/yt-transcripts/fetch_channel_transcripts.py`. Diff against `research/cold-email/notes/` to find unprocessed ones.
- **Pasted material** from the user.
- **Results:** `campaigns/*/results.md` and `experiments.md`.

## 2. Extract (one notes file per source)
Write `research/cold-email/notes/<slug>.md`:
- **Source:** title, URL, creator, date.
- **Rules:** sorted by knowledge topic (00–14). Each is marked `[VERBATIM]` with a short quote and **timestamp** where available, or `[PARAPHRASE]`.
- **Example emails:** verbatim, with the claimed result.
- **Numbers:** volumes, reply rates, costs; marked self-reported where they are.
- **Contradictions** with the current knowledge base.

## 3. Propose updates
1. For each finding, give: the target file and section, the current rule, the proposed change, the evidence (quote and timestamp), and a confidence level.
2. **Confirmations** upgrade a rule's source tag (e.g. `(Saraev, video X @ 12:30)`).
3. **Contradictions:** replace the rule only if the new evidence ranks higher; otherwise mark it `[TEST]` and show both sides.
4. Show the change list. **Apply it only after the user approves.** Then:
   - add verbatim emails to `libraries/swipe-file.md` Part 2 (attributed)
   - add new banned phrases to `cold-email/lint_email.py`
   - add new offers or prompts to the libraries
   - append a dated line to `research/cold-email/REFERENCES.md`

## Rules
- Never present a paraphrase as a quote.
- Never promote one creator's opinion to `[CONSENSUS]`.
- Mark Saraev's own claims as self-reported.
- Results from Extol's campaigns outrank everything. Add them to `knowledge/14` benchmarks with dates and sample sizes.
