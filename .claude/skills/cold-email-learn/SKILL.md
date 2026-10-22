---
name: cold-email-learn
description: Make the cold email agent smarter by studying new sources, such as YouTube transcripts in research/transcripts/, newsletters, pasted posts or campaign results. Pulls out frameworks, rules, example emails and data, then proposes sourced updates to cold-email/playbook.md and swipe-file.md. Use when new transcripts are added, when the user says "learn from this video/creator", "update the playbook", or shares campaign results to learn from.
---

# Learn from new sources

## 1. Gather the sources
- **Transcripts:** `research/transcripts/<channel>/*.md`, created by `tools/yt-transcripts/fetch_channel_transcripts.py`. Check `index.md` for new files.
- **Material the user pastes:** articles, posts, or emails that worked.
- **Our own results:** campaign stats in `campaigns/*/results.md`, which are the strongest evidence for *our* market.

## 2. Extract from each source
Write `research/cold-email/notes/<source-slug>.md` with these sections:
- **Source:** title, URL, date and creator
- **Frameworks:** the structure, with the creator's own labels
- **Rules:** subject, opener, length, CTA, offer, follow-ups, personalization, infrastructure. Mark each one **[VERBATIM]** with a short quote and a timestamp if available, or **[PARAPHRASE]**.
- **Example emails** shown in the video or post, quoted as shown and attributed
- **Numbers:** reply rates, volumes and costs, marked as self-reported if they are
- **Contradictions** with `cold-email/playbook.md`

## 3. Propose playbook updates
1. Compare the notes against the playbook.
2. Produce a list of proposed changes. Each one needs: the section, the current rule, the proposed rule, the evidence (source, quote and timestamp), and a confidence level.
3. How evidence ranks: our own campaign results > full transcripts and primary sources > measured studies > search snippets.
   - Where a transcript confirms a rule, upgrade its tag. For example, "(Saraev)" becomes "(Saraev, video X @ 12:30)".
   - Where it contradicts a rule, give both sides. Only replace the rule if the evidence is stronger; otherwise mark it **[TEST]**.
4. Show the user the change list, then apply it once approved. Also:
   - Add new example emails to `cold-email/swipe-file.md`, attributed to the creator.
   - Add new banned phrases or buzzwords to `cold-email/lint_email.py`.
   - Update the playbook's status line with what was learned and when.

Never present a paraphrase as a quote, and never generalize one creator's opinion into a [CONSENSUS] rule.
