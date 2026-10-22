# Cold Email Research: Master Index

This is the knowledge base behind the `cold-email-master` agent. Read the reports in this order. Each one has its own source list.

| # | Report | What it covers | Evidence quality | Sources |
|---|---|---|---|---|
| 01 | [Nick Saraev](01-nick-saraev.md) | His frameworks, personalization pipeline, offers, reply automation, metrics | Search extracts only. **Transcripts pending:** 28 are downloaded on the user's Mac, 62 more are rate-limited | inline |
| 02 | [Creators and benchmarks](02-creators-and-benchmarks.md) | Berman, Nowoslawski, Braun, Lavender/Allred, 30MPC/Gong, Jed Mahrle, Becc Holland, McKenna, Hormozi; Instantly, Smartlead and Belkins benchmarks; consensus and disagreements | Search extracts | inline |
| 03 | [Deliverability, compliance, psychology](03-deliverability-compliance-psychology.md) | Gmail/Yahoo/Outlook rules, infrastructure, CAN-SPAM/GDPR/PECR/CASL, Cialdini, Loewenstein, Langer, Kahneman, Oppenheimer | Search extracts, tagged official / vendor / secondary | inline |
| 04 | [Copywriting swipe library](web/04-copywriting-swipe-library.md) | Teardowns of every part of an email, plus **42 verbatim emails** with results | **71 full LinkedIn pages** plus GEX Wrapped 2024 (full files) | [references-04](web/references-04.md) |
| 05 | [AI personalization, signals, stack](web/05-ai-personalization-signals-stack.md) | **Verbatim prompt library** (Saraev #5388, Eric's locked prompts, LeadMagic, Harvey), signal → angle map, tool pricing, measurement, experiments, AI SDR lessons | **Full files**: n8n JSON, MIT repos, GEX docs; the rest search extracts | [references-05](web/references-05.md) |
| 06 | [Offers, niches, studies, replies](web/06-offers-niches-studies-replies.md) | Offer design and an **offer library** for an AI agency, niches, benchmarks by industry/seniority/region, **19 academic studies**, case studies, objection handling, DE/AT/India/scraping law | Search extracts (strong on academic citations) | [references-06](web/references-06.md) |

**Primary source files (MIT):** [`sources/`](sources/README.md) holds Eric Nowoslawski's coldoutboundskills (24 files), Harvey's frameworks and LeadMagic's prompt library.

**Transcripts:** `agents/cold-email/research/transcripts/<channel>/`. Fetch them with `agents/cold-email/tools/yt-transcripts/` and process them with the `cold-email-learn` skill.

**How sources rank when they disagree:** our own campaign results > full transcripts and primary files > randomized studies > practitioner data > vendor blogs > search snippets.

**How these reports were made:** report 01–03 came from the first research round. Reports 04–06 were written from the recovered material of three research agents that were stopped by accident on 2026-10-22. Their downloads and search results were salvaged from the session logs; no new research was run.
