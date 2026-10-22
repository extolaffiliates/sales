# AI Personalization, Signals, Automation and the 2025–2026 Stack

Research track 2 of 3 for the cold-email-master agent. Compiled on 2026-10-22.

## How this was gathered (read first)

- **Origin:** a research agent ran 44 searches and downloaded files before it was accidentally stopped. This report was written from that recovered material. No new research was run.
- **Primary sources (best evidence in the knowledge base so far).** Unlike the earlier tracks, this agent **downloaded full files**:
  - Nick Saraev's n8n workflow #5388 JSON, including the live prompts.
  - Eric Nowoslawski's open-source **coldoutboundskills** repo (MIT licence): 31 skills and 19 signal playbooks.
  - Eric's **GEX Wrapped 2023** and **GEX Wrapped 2024** public Google Docs (about 17K and 33K words).
  - The **Harvey** (MIT), **cmj-hub/claude-cold-email**, **Frontal**, **Abhipaddy8/outreach-agent** and **OpenOutreach** (GPLv3) agent repos.
  - **LeadMagic's** MIT-licensed GTM prompt library.
  - Clay's public docs.

  Quotes from these files are marked **[V-FILE]** (verbatim from the downloaded file).
- **Search snippets:** everything else comes from search-engine extracts and is marked [V] (verbatim snippet) or [P] (paraphrase), with [VENDOR] and [SELF-REPORTED] flags.
- **Licences:** the MIT-licensed material may be reused with attribution. OpenOutreach is GPLv3: read it, but don't copy its code into our repo. Saraev's prompt is quoted for study; it's written for *his* offer and must be adapted.

---

## 1. Published AI personalization prompts (the prompt library)

### 1.1 Nick Saraev: "Deep Multiline Icebreaker System" (n8n workflow #5388)
**Source:** [n8n.io/workflows/5388](https://n8n.io/workflows/5388-cold-email-icebreaker-generator-with-apify-gpt-4-and-website-scraping/). The JSON was downloaded with the workflow tag "N8N Course", created 2025-07-19.

**Pipeline** [V-FILE + P]:
1. Apollo search URL → Apify scraper.
2. Filter to leads with an email **and** a website.
3. Scrape several pages per site.
4. **Prompt A** summarizes each page.
5. **Prompt B** writes a multi-line icebreaker.
6. Output to Google Sheets, then into Instantly.

The listing claims **5–10% reply rates vs 1–2% for standard campaigns** [SELF-REPORTED] and costs about $150/month in Apollo, Apify, OpenAI and email APIs.

**Prompt A, page summarizer** [V-FILE]:
```text
You're provided a Markdown scrape of a website page. Your task is to provide a two-paragraph abstract of what this page is about.

Return in this JSON format:

{"abstract":"your abstract goes here"}

Rules:
- Your extract should be comprehensive—similar level of detail as an abstract to a published paper.
- Use a straightforward, spartan tone of voice.
- If it's empty, just say "no content".
```

**Prompt B, multiline icebreaker** [V-FILE] (the offer sentences describe *his* product and must be replaced):
```text
We just scraped a series of web pages for a business called . Your task is to take their summaries and turn them into catchy, personalized openers for a cold email campaign to imply that the rest of the campaign is personalized.

You'll return your icebreakers in the following JSON format:

{"icebreaker":"Hey {name}. Love {thing}—also doing/like/a fan of {otherThing}. Wanted to run something by you.\n\nI hope you'll forgive me, but I creeped you/your site quite a bit, and know that {anotherThing} is important to you guys (or at least I'm assuming this given the focus on {fourthThing}). I put something together a few months ago that I think could help. To make a long story short, it's an outreach system that uses AI to find people hiring website devs. Then pitches them with templates (actually makes them a demo website). Costs just a few cents to run, very high converting, and I think it's in line with {someImpliedBeliefTheyHave}"}

Rules:
- Write in a spartan/laconic tone of voice.
- Make sure to use the above format when constructing your icebreakers. We wrote it this way on purpose.
- Shorten the company name wherever possible (say, "XYZ" instead of "XYZ Agency"). More examples: "Love AMS" instead of "Love AMS Professional Services", "Love Mayo" instead of "Love Mayo Inc.", etc.
- Do the same with locations. "San Fran" instead of "San Francisco", "BC" instead of "British Columbia", etc.
- For your variables, focus on small, non-obvious things to paraphrase. The idea is to make people think we *really* dove deep into their website, so don't use something obvious. Do not say cookie-cutter stuff like "Love your website!" or "Love your take on marketing!".
```

**Few-shot example output in the workflow** [V-FILE]:
> Hey Aina,
>
> Love what you're doing at Maki. Also doing some outsourcing right now, wanted to run something by you.
>
> So I hope you'll forgive me, but I creeped you/Maki quite a bit. I know that discretion is important to you guys (or at least I'm assuming this given the part on your website about white-labelling your services) and I put something together a few months ago that I think could help. To make a long story short, it's an outreach system that uses AI to find people hiring website devs. Then pitches them with templates (actually makes them a white-labelled demo website). Costs just a few cents to run, very high converting, and I think it's in line with Maki's emphasis on scalability.

**Teardown: what this teaches the agent**
- **Spartan/laconic tone**, a **fixed template the model may not change** ("We wrote it this way on purpose"), and **one worked example** (few-shot).
- **Casual compression** ("Maki", not "Maki Agency"; "San Fran") makes it sound like a human typed it.
- **Non-obvious details** signal deep research: discretion, inferred from a white-label page.
- **Self-aware humility** ("I hope you'll forgive me, but I creeped you…") disarms the reader and is honest that research happened.
- **Caveats:**
  - The example runs about 110 words. That's longer than our 90-word default, and the em dash and "Love {thing}" pattern conflict with Eric's and Harvey's rules (§1.3, §1.6).
  - "Love X" is a compliment opener, which Braun and Harvey call an AI tell at scale.
  - **Treat this as a [TEST] variant, not the default.** Saraev reports it works for agency offers; the generic-compliment risk grows with volume.
- **Implementation notes from a third-party build** [P] ([Unpromptable](https://unpromptable.substack.com/p/ai-cold-email-system-tested)): the video has about 119K views. The Apify Apollo scraper is now deprecated (100 leads per run on the free plan). The reviewer swapped Instantly ($47/mo) for Smartlead. Saraev's stated benchmark is about **1 customer per 100 personalized emails** [SELF-REPORTED].

### 1.2 Eric Nowoslawski / Growth Engine X: AI Specificity Line (locked prompt)
**Source:** `skills/playbooks/ai-specificity` in [growthenginenowoslawski/coldoutboundskills](https://github.com/growthenginenowoslawski/coldoutboundskills) (MIT). It personalizes **the offer, not the opener**.

- **Frame (lives in the copy, never inside the variable):** `I think we can help you {{specificity_line}}.`
- **Idea:** take the client's generic capability and say it back in the prospect's own nouns. For example, "know the landed cost of every pool float before you price it" instead of "margin reporting" [V-FILE].
- **Model choice** [V-FILE]:
  - Outside Clay, use a nano-class model at minimal reasoning: about 1,848 input and 59 output tokens per row.
  - Inside Clay, use `gpt-4o-mini`. A reasoning model with its level unset runs **about 19x more expensive and returns blanks** (2 of 5 rows empty).

**Part 1, static prefix** [V-FILE]:
```text
You write one short merge field that gets dropped into the middle of a cold email sentence.

The sentence it goes into is exactly this, and you are writing only the {{VAR}} part:
"Specifically, I think we can help you {{VAR}}."

STEP 1, FIT CHECK. Read the company data. Decide if the client offer below really applies
to how THIS company makes money. Say yes for any company that makes or sells a product, or
sells a service, that the offer list can plainly serve. Say no for schools, city and
government bodies, hospitals, churches, charities, and any company whose business you
cannot tell from the data. Write "yes" or "no" in "fits". If no, return empty strings for
the rest and stop.

STEP 2, ANCHOR. Pick one anchor: a word or short phrase for the thing this company makes,
sells, or counts. Copy it from the company data word for word. It must be a real thing,
like "pool float", "washable rug", "hard cooler", "pool contractor". It cannot be a
business word like "product", "margin", "channel", "SKU", "revenue", or "customer".

STEP 3, OFFER ITEM. Pick the ONE line from the client offer list below that fits this
company best, using evidence in the company data, not the first item on the list. Copy it
word for word into "offer_item". You may not write anything the offer list does not say.

STEP 4, LINE. Write the merge field. It must contain the anchor, and it must say what the
offer item does, in plain words, for this company's anchor. Do not copy the offer item
wording into the line. Say it the way this company would say it.

Rules:
1. Write at a 5th-grade reading level. Use short, common words.
2. Start with a plain verb, like "track", "see", "know", "build", "cut". Lowercase first
   word. No comma at the start. No period at the end. Never write the words "help you"
   or "specifically".
3. Never write the company's name. The email already says it.
4. Never use an em dash or an en dash. Use a comma, or "and", "so", or "because".
5. Never state a fact that is not in the company data. Do not guess what they probably do.
6. Between 6 and 14 words. One idea only.
7. Never promise sales, growth, demand, traffic, or customers unless the offer list says
   the client does that. You describe the work, not the result of their business.
8. Never write the words "channel", "platform", or "across". If the company data names a
   real place they sell, like dealers, gift shops, Amazon, or their own site, name that
   place instead. If it names none, leave the place out of the line.
9. Banned phrases, because they fit any company: "product margins", "gross margin",
   "your business", "your products", "boost margins", "improve efficiency", "grow faster",
   "grow sales", "more sales", "drive demand", "increase sales". If your line needs one of
   these, your anchor was too vague. Go back to step 2.
10. If step 1 said no, or you cannot find a real anchor in the data, return empty strings.
   Never write "N/A", "unknown", "none", or a placeholder in brackets.
11. Empty is only for "fits": "no", or data too vague to name a real thing. If "fits" is
   "yes" you must write an anchor and a line. Low confidence is fine, write it anyway.
   Marketing fluff in the data is normal. One real product word is enough to work with.

Return JSON only, no markdown fence:
{"fits": "yes|no", "anchor": "<words copied from the company data, or empty>", "offer_item": "<one line copied from the offer list, or empty>", "line": "<merge field, or empty>", "confidence": "high|low"}
```

**Part 2, client offer block (filled once per client, then locked)** [V-FILE]:
```text
CLIENT OFFER (the company sending this email):
Name: {one line, what kind of company they are, never the brand name}
Sells to: {who they serve and roughly what size}
What they actually do:
- {capability 1, concrete, the words a customer would use}
- {capability 2}
- {capability 3}
- {capability 4}
- {capability 5}
What they do NOT do: {the four or five nearby things people assume, listed plainly}
```

**Part 3:** 8–10 client-specific few-shot pairs as faux prior turns, **including at least two abstains** (an obvious non-fit, and a company whose description is pure fluff).

**Measured results and lessons** [V-FILE]:
- 8/10 usable lines, and 8/10 again on a re-run. Expect 10–20% blanks on SMB lists.
- **"Judge a batch, never a row"**, because outputs are non-deterministic.
- **The "do NOT do" line is load-bearing.** Without it, the model borrows adjacent promises.
- **Rule 9's "go back to step 2" works better than a banned list alone.**
- **Gate the reading level of the generated tail (grade ≤ 7), not the full sentence.** Dropping the word "Specifically" from the frame took the worst sentence from grade 9.1 to 6.3.
- **If more than 30% of a segment comes back blank, the list is wrong for the campaign, not the prompt.**
- **Spintax must never be used to handle blanks.**

### 1.3 Eric Nowoslawski: Creative Ideas (slot discipline)
**Source:** `skills/playbooks/creative-ideas` (MIT) [V-FILE].

- **The key finding:**

  | Approach | Usable outputs |
  |---|---|
  | Free-form "have three ideas about this company" | **2/5** |
  | Operator-named slots (bullet 1 is about X, bullet 2 about Y, bullet 3 about Z) | **21/23 (91%)** |

- **Hard gate:** the operator **hand-writes 3 complete bullet sets for 3 real companies** before any model call. "AI never drafts the exemplars it is graded against."
- **Built-in verifier:** each bullet returns `evidence_N`, which must be an actual substring of the input evidence. Otherwise the bullet was invented and is blanked.
- **Rules:**
  - 8–22 words per bullet.
  - No em dash and no trailing period.
  - Each bullet names a detail from the evidence.
  - **An empty bullet is better than a generic one.**
  - Never mention a competitor, a dollar figure, a headcount or a named customer.
  - Any empty bullet moves the lead to a non-ideas campaign.
- **Thin-data gate:** gate on evidence **length under 200 characters**, not on emptiness.
- **Results:** 27/32 (84%) usable on real production rows across 7 live campaigns.
- **Cost:** nano is about $0.12 per 1K rows, vs $0.27 for mini.
- **Campaign results** [P][SELF-REPORTED]:
  - Eric reportedly sends about 300 emails/day with creative ideas and gets about 3 positive replies for his own agency.
  - It is described as GEX's best-performing campaign type across clients ([antoinebuteau](https://www.antoinebuteau.com/lessons-from-eric-nowoslawski/), [Clay blog](https://www.clay.com/blog/ai-email-personalization-examples)).
  - A company-mission summary line took one marketing-agency client from 1.5% to 3.2% replies.

**Email format around the bullets** [V-FILE, from `campaign-copywriting`]:
```text
{{first_name}}, I was back on your site today and had some [marketing/creative] ideas for you.

• [Action] using [Feature 1] targeting [specific thing], would help with [benefit]
• [Action] using [Feature 2] targeting [specific thing], would help with [benefit]
• [Action] using [Feature 3] targeting [specific thing], would help with [benefit]

Of course, I wrote this without knowing your current bottlenecks and goals.

If it's interesting, happy to share what's working in {{industry}}.
```

### 1.4 Eric Nowoslawski: personalization sub-agent pattern (Claude Code)
**Source:** `skills/personalization-subagent-pattern` (MIT) [V-FILE].

**Approval loop:**
1. Sample on 1 lead.
2. Batches of 10 with human corrections.
3. **Stop after 2 consecutive rounds of 10 with zero corrections**, then fan out to the rest.

**Sub-agent prompt template** [V-FILE]:
```text
You are personalizing cold email fields for N leads.

CONTEXT:
- We sell: <one sentence from client-profile.yaml>
- Our ICP: <one sentence>
- Our offer: <the CTA we're asking them to respond to>
- Tone: <casual | formal | peer-to-peer>

FIELDS TO GENERATE (per lead):
- situation_line: <definition + 1 good example + 1 bad example>
- value_line: <definition + 1 good example + 1 bad example>
- cta_soft: <definition + 1 good example + 1 bad example>

RULES:
1. Never fabricate facts. If the company description is thin, say something generic but not false.
2. Never use em dashes (—). Use periods or commas.
3. Never use the word "leverage", "synergy", "ecosystem".
4. Maximum length: <N words per field>.
5. If a lead is missing company_description, return "<fields cannot be generated — skip>"

LEADS:
<JSON array>

RETURN:
A JSON array with the same lead_ids and the personalization fields. Save to /tmp/personalization-<batch-id>.json and print "DONE" when complete.
```

**Quality checks** [V-FILE]:

| Problem | Fix |
|---|---|
| Repetition across leads | Retry with a diversity instruction |
| Factually wrong claims | Strengthen the "never fabricate" rule |
| AI-speak ("I was intrigued by…") | Add a forbidden-phrases list |
| Hedging ("Your company might be…") | Add "assert, don't hedge" |

### 1.5 LeadMagic GTM prompt library (MIT)
**Source:** [LeadMagic/gtm-skills](https://github.com/LeadMagic/gtm-skills), `ai-prompts-toolkit/references/prompt-library.md` [V-FILE]. Useful excerpts:

```text
P03 — Signal Line (Cold Email Opener)
Write ONE personalization line (max 25 words) for outreach.
Signal: {{signal}}
Source: {{source_url}}
Prospect: {{title}} at {{company}}
Rules:
- Reference the signal specifically
- If source_url is empty, return {"line":"","usable":false}
- No invented news or metrics
Return JSON: {"line":"","usable":true|false}
```
```text
P04 — Cold Email Draft
Write a cold email for {{seller_company}} selling {{offer_one_liner}}.
Prospect: {{first_name}}, {{title}} at {{company}}
Personalization line: {{signal_line}} (source: {{source_url}})
ICP pain: {{icp_pain}}
Rules:
- Under 90 words total
- One pain, one proof point ({{proof_point}}), one low-friction CTA
- No "hope this finds you well", no fake "Re:", no invented ROI
- If proof_point empty, use category pain only
Return JSON: {"subject":"","body":"","word_count":0}
```
```text
P05 — Email Quality Score
Score this cold email 1–10 for B2B outbound quality.
Criteria:
- Relevance to signal/ICP (0–3)
- Brevity <90 words (0–2)
- One clear CTA (0–2)
- No banned claims or fluff (0–3)
Return JSON: {"score":0,"pass":false,"feedback":"","revision_hints":[]}
pass = true if score >= 7
```
```text
P06 — Reply Classification
Categories: interested, objection, not_interested, ooo, unsubscribe, referral, pricing, security
Return JSON: {"category":"","confidence":0.0,"suggested_owner":"sdr|ae|cs|stop","summary":""}
```
P02, "Work Email Find (No Guess)", sets a key rule [V-FILE]: "Do NOT construct emails from patterns (first.last@domain). If no verified source, return email="" and confidence="none"."

### 1.6 Harvey (open-source Claude Code sales agent, MIT)
**Source:** [ethanplusai/harvey](https://github.com/ethanplusai/harvey): `skills/email_frameworks.md` and `skills/signal_playbook.md` [V-FILE].

**Core rule:** "Write like a real person sending a real email. Not a marketer. Not AI… If you read the email out loud and it sounds like a sales pitch, delete it and start over."

**Banned patterns (selection):**
- em dashes ("Dead giveaway of AI writing")
- "Picture this", "Imagine if", "What if I told you"
- "Here's what I keep seeing"
- before/after lists, feature dumps, bullet points in cold email
- "Worth a quick look/chat/call?", "I'd love to", "Are you the right person?"
- starting with "I" or "We"
- more than one question
- exclamation marks ("One max per entire sequence. Zero is better.")
- parenthetical asides
- "No pressure" / "No obligation"
- bold, italics, headers

**Length:** under 75 words for email 1, under 60 for emails 2–3, under 40 for the breakup.

**Data it encodes** (secondhand stats it cites):
- Offer CTAs ("want the teardown?") lift replies about 28% over "do you have 30 minutes?".
- Bump emails of 1–2 sentences nearly double replies vs re-pitching at length.
- Tracking pixels cost 8–12% inbox placement.
- Segments of 50 or fewer reply about 5.8% vs about 2.1% for 1,000+.
- "Order of impact: **deliverability > list quality/relevance > copy**. Copy is the last 20%."

**Its good and bad examples** [V-FILE]:
```text
GOOD — Subject: {{company}} website
{{first_name}}, looked at {{company}}'s site. You're clearly doing good work but the site probably isn't converting the way it should given how strong your reviews are.

Curious how you're currently getting leads beyond word of mouth?
```
```text
BAD — Subject: {{first_name}}, quick question about {{company}}'s growth
Been looking at {{company}} — you've clearly built something real. Solid reputation.
Here's what I keep seeing though: great companies with websites that don't convert and no system to catch leads.
Picture this — a website built specifically for your industry that converts visitors, plus an AI agent that answers calls 24/7.
Worth a quick look?
```

**Breakup: good vs bad** [V-FILE]:
- **Good:** "{{first_name}}, sounds like the timing isn't right. Totally get it. If this ever becomes a priority, I'm around."
- **Bad:** a breakup that still pitches ("probably losing 5–10+ leads a month…"), plus fake rapport ("Hope storm season treats you well").

### 1.7 Other open-source cold email agents (for architecture ideas)

| Repo | What it is | Licence | Takeaway for us |
|---|---|---|---|
| [growthenginenowoslawski/coldoutboundskills](https://github.com/growthenginenowoslawski/coldoutboundskills) | 31 Claude Code skills in 5 tracks (Strategy, Infrastructure, List Building, Copy & Send, Iterate) plus 19 signal playbooks, each shipped as a skill, a Clay table and a Clay CLI workflow | MIT | **The closest model for our agent.** Key skills: `campaign-copywriting`, `positive-reply-scoring`, `experiment-design`, `spam-word-checker`, `cold-email-weekly-rhythm`, `lead-magnet-brainstorm` |
| [ethanplusai/harvey](https://github.com/ethanplusai/harvey) | Autonomous sales agent on Claude Code or Codex: finds businesses, learns one specific thing, writes email | MIT | Signal → angle map; compliance overrides style |
| [cmj-hub/claude-cold-email](https://github.com/cmj-hub/claude-cold-email) | Cold email skill with a Python linter (`score_letter.py`). Mechanism: **Signal → Pain → EVP (22 words) → binary Ask**, under 90 words. The **linter requires quoting at least 3 words of the public signal verbatim** | (see repo) | "'VP of Marketing at Series B' is not a reason to write. A job post four days ago is." [V-FILE]. A **verbatim-signal check** is worth adding to our linter |
| [Frontal-so/outbound-skills](https://github.com/Frontal-so/outbound-skills) | 7 master orchestrator skills plus 33 standalone skills (cold email, Clay, signals, list building) | (see repo) | Master-skill → sub-skill routing pattern |
| [Abhipaddy8/outreach-agent](https://github.com/Abhipaddy8/outreach-agent) | Autonomous multichannel agent on Claude Code: Tavily → Prospeo → Instantly verification → Gmail send → LinkedIn via Chrome. Memory lives in `MEMORY.md` and `missions.md` | (see repo) | File-based memory for multi-day sequences; test-send to yourself first. It sends HTML emails, which conflicts with plain-text best practice |
| [eracle/OpenOutreach](https://github.com/eracle/OpenOutreach) | Self-hosted CLI: describe product and market, the AI finds people, explains fit, emails them | **GPLv3** (don't copy code) | "Why each lead fits" explanations as a QA field |

---

## 2. AI personalization vs "AI slop"

### 2.1 Data (mostly secondhand, treat as directional)
- **Lavender's 2026 benchmark** (231,818 emails): A-graded emails got a **27% higher reply rate (3.4% → 4.3%)**. For technical buyers the lift was only 6% (5.2% → 5.5%) [P] ([Lavender](https://lavender.ai/blog/benchmark-learnings-emailing-technical-buyers), [Woodpecker review](https://woodpecker.co/blog/lavender-ai/)).
- **Fully AI-written vs human-written:**
  - 2.4% vs 3.8% (a Lavender figure via Phrasly; the dataset isn't public).
  - 4.1% vs 5.2% in a 100,000 paired-email vendor analysis.
  - AI emails reportedly "get spam-flagged at nearly 3x the rate" [SELF-REPORTED] ([Phrasly](https://phrasly.ai/blog/ai-vs-human-cold-email-reply-rates/)).
- **AI SDR vs human SDR** (sista.ai, 100K paired emails, late 2025 to early 2026; a hybrid vendor):

  | Metric | AI SDR | Human SDR |
  |---|---|---|
  | Reply rate | 4.1% | 5.2% |
  | **Meeting rate** | **0.7%** | **1.1%** |
  | **Inbox placement** | **71%** | **86%** |
  | Meeting → opportunity | about 15% | about 25% |

  Source: [sista.ai](https://sista.ai/en/insights/ai-sdr-vs-human-sdr-results-2026).
- **Laxis (vendor):** fully autonomous agents get 1–3% replies vs 15–25% for signal-driven, human-supervised outreach. AI-booked meetings show up 60–70% of the time vs 75–85% for human-booked [VENDOR] ([laxis](https://laxis.com/blog/state-of-ai-sdr-2026)).
- **A July 2026 randomized field experiment** (16,880 workplace messages): **AI rewriting on its own neither raised nor lowered reply rates** [P] (via [Phrasly](https://phrasly.ai/blog/ai-vs-human-cold-email-reply-rates/)). **What lifts replies is the input data (signal and relevance), not the AI wording.**
- **LeadHaste** (10M+ emails, vendor): AI-personalized campaigns got about 3.2% *positive* replies vs 1–1.5% for templates. It says AI should do research and personalization **on top of a human-written framework**, with a human review before sending, and that "treating merge fields as personalization fools no one" [SELF-REPORTED] ([LeadHaste](https://leadhaste.com/blog/ai-personalization-cold-email-examples)).
- **ColdIQ (Michel Lieben):**
  - "A first name dropped into a merge tag does not count anymore" [V].
  - The common signals (fundraising, new-role alerts, hiring sprees) are **saturated**, so build signals few others use.
  - Lemlist's CEO argues humans should still write the copy [P] ([ColdIQ](https://wf.coldiq.com/blog/how-the-top-1-make-cold-email-work-in-2026)).
- **Patrick Spychalski (The Kiln):** work backward from the client's value prop to find the Clay data points that quantify that benefit per prospect. "The offer matters more than the personalization" [P] ([Smartlead case](https://www.smartlead.ai/blog/case-study-patrick-spychalski-the-kiln)).

### 2.2 Guardrails practitioners publish
- **Get Wicked Growth's prompt rules** [P] ([getwickedgrowth](https://www.getwickedgrowth.com/use-cases/personalize-cold-email-clay/)):
  - Force one specific observation.
  - Ban generic praise *by example*.
  - Forbid mentioning that you researched them.
  - Output the literal `NEED_FALLBACK` when inputs are thin.
- **Another Clay workflow** [P]: one sentence of up to 25 words with a verifiable detail, output "SKIP" when the context is thin, and **a second AI column rates the opener from 1 (obvious AI) to 5 (sounds human).**
- **Instantly's "safe patterns"** [VENDOR] ([Instantly](https://instantly.ai/blog/ai-powered-cold-email-personalization-safe-patterns-prompt-examples-workflow-for-founders/)):
  - Ground the model in verified fields only.
  - Set clear constraints and give few-shot examples.
  - Keep a human review step.
  - Vary the structure to avoid content fingerprinting.
  - Thresholds: spam under 0.3%, hard bounces under 2%.
- **Glossary rule** [P] ([komo.ai](https://komo.ai/glossary/first-line-personalization)): generic praise like "Loved your LinkedIn post on…" is something "prospects mentally classify as mass-produced within two seconds". "I noticed your company works in [industry]" is *not* personalization.
- **Eric's decision framework (when AI company context helps)** [V-FILE]: use it only when "the prospect's business context changes how your product helps them". That means variable use cases, mission alignment, or broad targeting. Skip it for commodity offers or narrow, uniform lists. Checklist: if removing the variable wouldn't make the email feel generic, cut it.
- **Eric's "So you can focus on" pattern** [V-FILE]:
  ```text
  {{first_name}}, noticed {{company_name}} doesn't have a dedicated IT team.

  We handle IT support so growing companies don't need to hire in-house.

  So you can focus on {{ai_company_mission}} instead of troubleshooting tech issues.

  Worth a conversation?
  ```

### 2.3 AI tells to ban (union of Eric, Harvey, glossary and Instantly guidance)
- **Punctuation and formatting:**
  - **Em dashes** (Eric's hard rule #1; Harvey: "dead giveaway").
  - Bullets in email 1 (Harvey). Eric allows them only in creative-ideas emails.
  - Parentheticals.
  - Exclamation marks.
- **Phrases:**
  - "Picture this", "Imagine if", "In today's…", "Here's what I keep seeing".
  - "I was intrigued by", "I was impressed by", "Love what you're doing" (when generic), "I came across".
  - "Curious" as a subject line.
  - "Following up on my last note", "One more thought", "{{first_name}}, quick one", "Just checking in".
- **Patterns:**
  - Repeating their tagline back to them.
  - Hedging ("might", "perhaps", "seem to").
  - Stacking two or more signals ("you raised AND you're hiring AND you use X"), which reads as a dossier (Harvey).

---

## 3. Signal-based selling

### 3.1 Which signals work (no rigorous ranking exists; vendor data only)
- **Signal vs generic reply rates:**
  - 8–15% vs 2–3% (attributed to ZoomInfo).
  - 15–25% vs 1–5% (Salesmotion).
  - 25–40% vs 2–5% (Falora).
  - Harvey encodes **5–18% vs 1–3%** [VENDOR] ([salesmotion](https://salesmotion.io/blog/b2b-prospecting-guide), [falora](https://falora.ai/blog/signal-based-demand-capture), [zenbee](https://zenbee.io/blog/b2b-buying-signals-2026/)).
- **Stacking signals over time:**
  - One signal ≈ 20% true-positive rate; **two within 30 days ≈ 50–60%** (Zenbee).
  - 3–5 intent signals → 4–10% meeting conversion (Growleads, 200+ campaigns).
  - "New VP + recent funding at the same account" → **4–6x baseline replies** (Prospeo via GTM AI) [VENDOR].
- **Job changes and champion tracking:**
  - 42% positive response (Sendoso via Champify and Clay); 40–50% (Diligent via UserGems).
  - **Reaching buyers in their first 30 days in a new role: 3x conversion** (UserGems, 40K prospects) [VENDOR] ([Clay](https://clay.com/blog/track-job-changes-to-automate-personalized-outreach-using-champify-and-clay), [UserGems](https://www.usergems.com/blog/usertestings-pipeline-generation-strategy)).
- **Website visitors** (RB2B and similar): claims of 8–15% replies to recent visitors [VENDOR]. **Never mention the visit.** Use it only for timing and targeting, and open on the *problem the visited page addresses* ([Knock](https://www.knock2.ai/blog/how-to-reach-out-to-website-visitors), [Cleverly](https://www.cleverly.co/blog/how-to-use-rb2b-to-convert-website-visitors)).

### 3.2 Signal → angle map (Harvey [V-FILE] plus Eric's GEX Wrapped 2024 triggers)
| Signal | Angle | Good example | Bad example |
|---|---|---|---|
| **Hiring** (strongest) | The workload behind the hire, not the hire itself | "Saw you're hiring a second SDR. Usually means the first one is buried — how are you handling reply volume while the seat's open?" *(remove the em dash in our copy)* | "Congrats on the new role posting!" |
| **Tech stack (present)** | Integration with the workflow they already use | "You're on HubSpot, so this plugs into the workflow your team already lives in." | Listing their whole stack back at them |
| **Tech stack (gap)** | Point at the gap | "Noticed there's no chat widget on your pricing page. How are you catching the people who get that far but don't fill out the form?" | — |
| **Funding** (60–90 days after the raise) | The pressure the raise creates | "Post-Series-A usually means the pipeline target just doubled overnight. Is outbound the gap, or is it converting what's already coming in?" | "Congratulations on your recent funding!" |
| **New in role / first time in role** | Inherited problems, their first-90-day agenda | (Eric) "when you took over at {{company_name}}, did you inherit [specific problem]?" | — |
| **Past company is a current customer** | A familiar result | "You used X at {{previous_company}}…" | — |
| **Headcount growth or decline** | Scaling pains, or doing more with less | — | — |
| **Negative review** (problem sniffing) | Quote the specific issue | (Eric) "I saw the review from Mary mentioning [specific issue]…" | — |
| **AI-search ranking** (problem sniffing) | Show the gap | (Eric) "I asked ChatGPT [keyword] and you ranked 15th behind [competitors]…" | — |
| **No signal** | Be honest: a role or industry problem stated as an observation | "Most teams at your headcount still reconcile this by hand." | "I was looking at your website and love what you're doing." |

**Rules** [V-FILE, Harvey]:
- Rank signals as **hiring > funding > tech gap > tech present > industry problem > nothing**.
- Use **exactly ONE signal as the hook** and save the others for follow-ups.
- Never reference a stale signal, such as a filled four-month-old job post.
- "**A wrong specific is worse than a right generic.**"

**cmj-hub rule** [V-FILE]: quote at least 3 words of the public signal verbatim in the first line, so the signal is provably real.

### 3.3 Signal tools and pricing (2026; vendor pages, so verify before buying)
| Tool | Signal | Price as reported |
|---|---|---|
| Clay | Waterfall enrichment and Claygent research | Starter $149, Explorer $349, Pro $800/mo (50K credits) [P]; Clay's own tier names were unconfirmed |
| Apollo | Database plus basic signals | $49 / $79 / $119 per user per month (annual). Credits expire monthly |
| RB2B | Person-level website visitors (US) | Sources conflict: $79–$199/mo tiers, or $119–$999. The free plan stopped showing named people on 22 Jan 2026 |
| Trigify | LinkedIn engagement signals | Starter $40/mo (4,000 credits); Max $199/mo |
| Common Room | Community and product signals | About $2,100–$2,500/mo entry, ≈$30K/yr median. **Zoom agreed to acquire it on 2 Jul 2026.** Doesn't send outreach itself |
| UserGems / Champify | Job changes | UserGems is custom, about $1,200/mo in one listing |

---

## 4. The 2025–2026 cold email stack

### 4.1 Eric Nowoslawski's operating rules (GEX Wrapped 2024) [V-FILE]
**Copy framework (his "90% there" version):**
1. First sentence: why are you reaching out, and why now?
2. Second sentence: explain how you help.
3. Third sentence: show social proof.
4. Fourth sentence: the CTA. Ask whether they're interested in the next step.

"If you follow these instructions, the instructions set forth in the Instantly/Smartlead platforms for email deliverability and write concise copy, you are 90% there."

**Deliverability baseline:**
- 30 emails per day per inbox, at least a 10-minute delay between emails.
- 2 inboxes per domain.
- Warm up for 3 weeks.
- SPF, DKIM and DMARC aligned.
- Use custom tracking links if you track opens.
- Send from domains different from your main domain.

**What happened in 2024:**
- **1 May 2024:** "Outlook accounts were getting banned en masse." Even warmed domains couldn't get past 20% open rates, from about May to July.
- **Late 2024:** Outlook bounced a lot of Google-sent cold email, so many agencies **stopped sending to Outlook recipients**, which "by the numbers demonstrably worked".

**His fix, "insurance" batches:**
- For a client sending 1,000/day, he prepares **4x capacity** in 4 batches warmed at the same time: Google, Hypertide (Outlook), Google, Hypertide.
- When one batch burns, the next has been warming for 8–12 weeks.
- For non-agencies: keep **50% of sending capacity warming on the side**.
- GEX keeps **2,500 inboxes warming at all times** on generic, aged domains.

**Instantly vs Smartlead:** the same inboxes connected to both gave "the same reply rate and positive reply rate across 5 different campaigns. Pick the platform that aligns best with your goals and needs for integrations."

**Volume test:** he sent 1,000 emails from one inbox in a day to a semi-opted-in list and still landed in the primary inbox. The lesson: "NOT we can send more emails per inbox. It's that the amount of people marking you as spam is the most important metric." Good campaigns can be pushed to about 60/day per inbox.

**Health metric:** "The most important metric we look for though is if the campaign is getting around a **1% reply rate excluding out of office messages**. Even just having people tell us no is important to know we are landing in the primary inbox."

**Catch-alls:** "We just don't send to catch all domains for now."
- He double-verifies leads (Debounce plus others), then runs **a final check through Instantly's verification**, which also knows historical send success.
- **Any 550 bounce means the receiving server thinks you're a spammer.** Drastically change the copy and swap inboxes.

**ESP matching** (Google→Gmail, Outlook→Outlook): true, but "isn't your biggest worry". Add it after something works.

**Spintax:** GEX does little of it because AI-written parts already vary the copy. He expects AI-varied messaging may become *required*.

**Domain masking:** he has never used it and is skeptical.

**What's coming:** warmup using real campaign copy, OAuth masking, and **domain age** mattering more.

**"Think about what spammers do and do the opposite":**
- They send thousands of emails a day from one domain.
- They use cheap SMTP servers.
- They use domains immediately.
- They don't validate lists.
- They bait clicks.
- They use spam words like "Free" and "Guarantee".
- They don't warm up.

### 4.2 Tool landscape and pricing (2026, from vendor and comparison pages; verify before buying)
| Layer | Options and prices as reported |
|---|---|
| **Lead data** | Apollo (free tier with 10K email credits/mo per one review; paid from $49/user/mo). Apify Apollo scraper (deprecated). Prospeo, LeadMagic and Findymail as finders. Waterfalls raise match rates from 50–70% (one provider) to 80–92% [VENDOR]. One Clay user got 344 valid emails from a waterfall vs **793 from Findymail directly** on the same list, so test your own setup |
| **Verification** | MillionVerifier is cheapest (about $39 per 10K; doesn't resolve catch-alls). NeverBounce about $80 per 10K. Bouncer about $60 per 10K (deep-verifies Google and Microsoft catch-alls). ZeroBounce about $138 per 10K. LeadMagic claims it resolves catch-alls [VENDOR] |
| **Sending platform** | Instantly: Growth $47/mo ($37.60 annual), Hypergrowth $97; lead database billed separately. Smartlead: Base $39, Pro $94, Unlimited $174/$379; white-label $29/client. EmailBison: about $599/mo flat with dedicated servers and IPs, suited to agencies with 8–10+ clients. lemlist: about $69–$79/mo email, $109/user multichannel |
| **Inboxes** | Google Workspace or Microsoft (Hypertide was GEX's Outlook supplier). Mailforge about $2–3/mailbox. Infraforge about $3–4 (private SMTP, Microsoft). Maildoso $75 for 30 mailboxes, $225 for 300. Eric: avoid private SMTP |
| **Reply handling** | Instantly AI Reply Agent at 5 credits per reply; autopilot or human-in-the-loop, with Slack approvals. Smartlead Master Inbox with AI categorization. **Saraev's model:** classify, then fill the variables of an approved template only |
| **Orchestration** | n8n (Saraev, about $150/mo all-in for his icebreaker build), Make.com (same pattern: Sheets → HTTP fetch → text extract → OpenAI → Sheets), Clay, Claude Code skills (Eric's repo) |

**A minimum viable stack for Extol**, synthesized from the above:
- Apollo free or paid
- MillionVerifier, with catch-alls skipped
- Instantly Growth or Smartlead Base
- 2–3 secondary domains × 2 Google inboxes (+50% spare warming)
- Claude Code with these skills for research and copy

**Estimated cost:** under $150/month before inbox costs.

### 4.3 Measurement (Eric's `positive-reply-scoring`) [V-FILE]
**The metric:** `positive_reply_rate = positive replies / total sent`.

| Campaign | Reply rate | Share positive | **Positive reply rate** |
|---|---|---|---|
| A | 1% | 70% | **0.7%** |
| B | 5% | 10% | **0.5%** |

**Campaign A wins.**

**Reply labels:**

| Label | Counts as positive? |
|---|---|
| `positive_interested` | Yes |
| `positive_soft` ("send info", "Q3") | Yes |
| `positive_referral` | Yes |
| `neutral_question` | No (optionally half) |
| `negative_notnow` | No |
| `negative_notfit` | No |
| `negative_hostile` | No; also a risk signal |
| `unsubscribe` | No |
| `ooo`, `bounce` | Excluded from the denominator |

**Benchmarks:**
- **Good: positive reply rate of 1% or more. Great: 2% or more.**
- **Pause the campaign if hostile replies exceed 0.3% or unsubscribes exceed 2%.**
- Worked example: 5,284 sent → 212 replies (4.01%) → 61 positive → **1.15%**; 34.3% of net replies positive.

### 4.4 Experiment design (Eric's `experiment-design`) [V-FILE]
- **One variable per test.** Types are list-only, copy-only, or (rarely) combined.
- **The 1% rule:** if the baseline reply rate is under 1% after 200+ sends, fix infrastructure or copy first. Don't experiment on a broken baseline.

**Minimum sample per arm:**

| Baseline (positive reply rate) | Lift you want to detect | Sends per arm |
|---|---|---|
| 1% | 2x | ~500 |
| 1% | 1.5x | ~2,000 |
| 1% | 1.2x | ~10,000 |
| 2% | 2x | ~250 |

**Under 500 sends per arm can't separate signal from noise. Default to 2,000 per arm.**

- **Launch both arms at the same time** on split inboxes. **Measure at day 21**, after the full sequence.

**How to act on the result:**

| Result | Action |
|---|---|
| Lift of 20% or more, high confidence | Adopt as the new baseline |
| 10–20% lift | Replicate with fresh leads first |
| Under 10% | Inconclusive |
| A combined experiment wins | Never adopt it directly; split it into single-variable tests |

### 4.5 Weekly operating rhythm (Eric's `cold-email-weekly-rhythm`) [V-FILE, section headings]
| When | What |
|---|---|
| **Monday** | Deliverability audit (15 min) |
| **Wednesday** | Positive-reply sweep (30–60 min) |
| **Friday** | Campaign retrospectives (20 min per campaign) |
| **Every other Monday** | Inbox lifecycle: keep, cancel, promote or buy (30 min) |
| **Monthly** | Spam placement test |
| **Quarterly** | Experiment review (90 min) |

---

## 5. AI SDR products: what went wrong

- **11x (TechCrunch, 24 Mar 2025)** ([TechCrunch](https://techcrunch.com/2025/03/24/a16z-and-benchmark-backed-11x-has-been-claiming-customers-it-doesnt-have)):
  - It showed logos of non-customers. ZoomInfo said it ran only a one-month trial, "found the product performed far below its human SDRs", and threatened legal action.
  - An employee alleged 70–80% churn; 11x said 79% retention. Claimed ARR was disputed (about $14M vs about $3M after trials).
  - The CEO stepped down in May 2025.
- **Artisan:** briefly lost its LinkedIn page in December 2025 over data-broker compliance [P].
- **Recurring lessons** ([abmatic](https://abmatic.ai/blog/ai-sdr-meetings-dont-convert), [laxis](https://laxis.com/blog/state-of-ai-sdr-2026), [sista](https://sista.ai/en/insights/ai-sdr-vs-human-sdr-results-2026)):
  - AI SDRs optimize for a *booked slot*, not a *prepared buyer*, so show rates and opportunity conversion drop.
  - Over-sending burns domain reputation within about 90 days.
  - Winners keep **humans owning targeting, offer, copy framework and handoffs**. AI does research, fills slots and drafts replies.
- **Implication for our agent:**
  - **The agent is a co-pilot with locked templates and human approval, not an autonomous sender.**
  - It never claims results it doesn't have. That's the 11x lesson applied to our own proof.

---

## 6. Multichannel: video, LinkedIn, calls

- **Personalized video:**
  - Sendspark: AI-personalized video gets 15–20% replies vs 1–5% for text.
  - Vidyard: up to 3x.
  - Loom's own data: about 4x [VENDOR] ([Sendspark](https://blog.sendspark.com/cold-email-vs-video-email-replies), [FirstSales](https://firstsales.io/blog/video-cold-email-loom)).
  - **Put the video at step 2**, after a short text email (Sendspark).
  - Generic videos at scale perform like plain text.
  - Eric warns: "Pretending to have made someone a custom video… If you made the video, you would have sent it, no?" [V-FILE, GEX 2024 "Things we avoid"].
- **LinkedIn plus email:**
  - Cold email averages 3.43% replies vs about 10.3% on LinkedIn (vendor).
  - Combining the two gives about 50% more replies than either alone (QuickMail founder) [SELF-REPORTED].
  - The "287% lift" figure has **no traceable primary source**, so don't cite it.
  - Belkins 2025: the first email has the highest per-step reply rate (0.59%), but **follow-up emails produce 58.6% of all replies**. LinkedIn delivers 7%+ replies once the email sequence runs dry ([Belkins](https://belkins.io/blog/sales-follow-up-statistics.md)).
- **Calls:**
  - Dial-to-meeting conversion is about 2–3% (top performers 5–8%).
  - Connection rate is about 13% after about 8 attempts (Gong, secondhand).
  - The claim that multichannel lifts results 30–50% has no controlled study behind it ([Apollo](https://apollo.io/insights/whats-the-average-conversion-rate-for-cold-prospecting)).
- **Warm-up engagement:** engaging with a prospect's LinkedIn content before messaging reportedly gives 13.1% replies and 14 meetings per 200 leads [SELF-REPORTED] ([getfuzzy](https://getfuzzy.ai/blog/lemlist-review-linkedin-gap)).

---

## 7. Rules this research adds to the agent

1. **AI fills slots; humans write the frame.** Personalize the *first line* or *one specificity line*. Never let the model write the whole email (Eric, LeadHaste, the 16,880-message experiment).
2. **Locked prompts have 3 parts:**
   - a static prefix
   - a client offer block that includes **"What they do NOT do"**
   - hand-written few-shot examples that **include abstain cases**

   Never let AI write the examples it's graded against.
3. **Slots beat free-form ideas:** 91% vs 40% usable (Eric's creative ideas).
4. **Every generated fact must be verifiable.** Return the evidence substring, or quote at least 3 words of the signal verbatim (Eric, cmj-hub). If it's missing, abstain.
5. **Abstain beats generic.** An empty field is a valid answer. More than 30% blanks means the list is wrong. Never use spintax to handle blanks.
6. **One signal per email, ranked hiring > funding > tech gap > tech present > industry problem.** Never stale. Never mention a website visit.
7. **Ban the AI tells:** em dashes, "Picture this", generic "Love X", "I was impressed", bullets in email 1, more than one question, hedging.
8. **Measure positive reply rate per send.** Good is 1% or more, great 2% or more. Pause if hostile replies exceed 0.3% or unsubscribes exceed 2%. Health check: about 1% reply rate excluding auto-replies.
9. **Experiments:** one variable, 500–2,000 sends per arm, both arms launched together, read at day 21.
10. **Stack:**
    - Sending platform choice doesn't change results (Eric's test).
    - Keep 50% spare inboxes warming.
    - Skip catch-alls.
    - Treat 550 bounces as spam blocks.
    - The spam-complaint rate matters more than volume.
11. **The agent is a co-pilot, not an autonomous SDR** (the 11x lesson). Human approval before anything is sent.

## 8. Gaps

- Not retrieved:
  - Saraev's own "$50/mo cold email stack" and "Definitive 2025 Cold Email Stack" videos. These are in Nick Saraev Daily and were blocked by the YouTube rate limit; re-fetch them with the transcript tool.
  - Instantly's prompt-library text.
  - Clay's official Claygent "You are…" templates.
  - Regie.ai outcomes.
- Eric's GEX Wrapped 2023 and 2024 docs contain many more full campaign emails and teardowns. Those are extracted in report 04.
