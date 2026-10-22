# Prompt Library: AI personalization

The rules for using these are in `../knowledge/10-personalization-ai.md`. The originals, with sources and teardowns, are in report 05 §1 and `agents/cold-email/research/sources/`.

**Always:**
- Fill in the client offer block, including **What they do NOT do**.
- Hand-write 8–10 few-shot examples, including abstains.
- Run on a nano or mini model.
- Judge a batch, never a single row.
- Lint the rendered output.

---

## P1 · Nick Saraev: page summarizer (n8n #5388, verbatim)
```text
You're provided a Markdown scrape of a website page. Your task is to provide a two-paragraph abstract of what this page is about.

Return in this JSON format:

{"abstract":"your abstract goes here"}

Rules:
- Your extract should be comprehensive—similar level of detail as an abstract to a published paper.
- Use a straightforward, spartan tone of voice.
- If it's empty, just say "no content".
```

## P1b · Extol adaptation of Saraev's multiline icebreaker
The original is in report 05 §1.1 verbatim. This adaptation keeps its strengths (spartan tone, fixed template, non-obvious details, casual compression). It removes what our rules ban: em dashes, generic "Love X", length over 60 words, and invented beliefs.
```text
We scraped several pages of a business's website. Using ONLY the summaries below, write a 2–3 sentence opener for a cold email from {{sender_first_name}} at {{sender_company}}.

Return JSON: {"fits":"yes|no","fact_1":"<copied phrase from summaries>","fact_2":"<copied phrase or empty>","opener":"<text or empty>"}

Template (keep this shape, fill the braces):
"{{first_name}}, {non-obvious specific thing from their site}. {what that probably means for them, as a hedged guess: 'guessing…' / 'usually means…'}."

Rules:
- Spartan, laconic tone. Contractions. Under 45 words.
- Use small, non-obvious details that prove you read beyond the homepage. Never "love your website", "great work", "impressive".
- Shorten names: "Maki" not "Maki Agency Ltd", "San Fran" not "San Francisco".
- fact_1 and fact_2 must be copied word-for-word from the summaries. If you can't find a real, specific fact, return fits:"no" and empty fields.
- Never state a belief, goal or problem as fact. Hedge it ("guessing", "usually means", "if I had to bet").
- No em dashes, no exclamation marks, no "I" as the first word, no question marks.
- Do not mention our product. The rest of the email does that.

Profile: {{first_name}} {{last_name}}, {{title}} at {{company}}
Summaries:
{{abstracts}}
```

## P2 · Eric Nowoslawski: AI specificity line (locked prompt)
Use it to personalize **the offer, not the opener**. The frame lives in the copy: `I think we can help you {{specificity_line}}.`

The full verbatim prompt (static prefix, client offer block and few-shot guidance) is in report 05 §1.2 and `agents/cold-email/research/sources/growthenginex-coldoutboundskills/pb-ai-specificity.md`. Its key mechanics:
- **Step 1 FIT CHECK:** yes or no.
- **Step 2 ANCHOR:** a real product noun copied from their data.
- **Step 3 OFFER ITEM:** copied from the client offer list.
- **Step 4 LINE:** 6–14 words, a plain verb first, 5th-grade level.
- **Rule 9:** if a banned generic phrase is needed, "your anchor was too vague. Go back to step 2."

## P3 · Eric Nowoslawski: creative ideas, fixed slots (prompt shape)
- **Before any model call:** the operator names 3 slots and hand-writes 3 bullet sets for 3 real companies.
```text
SYSTEM: You write 3 idea bullets for a cold email from {{seller}}.
Seller offer: {{offer_block incl. What they do NOT do}}
Slot 1 is about: {{slot_1}}   Slot 2: {{slot_2}}   Slot 3: {{slot_3}}
Never mention: competitors, dollar figures, headcounts, named customers, anything not in the offer.
Rules: 8–22 words per bullet; no em/en dash; no trailing period; lowercase start; each bullet must name a detail from the evidence; an empty bullet is better than a generic one.
Return JSON: {"creative_idea_1":"","evidence_1":"","creative_idea_2":"","evidence_2":"","creative_idea_3":"","evidence_3":"","confidence":"high|low"}
evidence_N must be an exact substring of the EVIDENCE text.
[few-shot: operator's 3 hand-written sets as prior turns]
USER: Company: {{company}} ({{domain}})  EVIDENCE: {{evidence_text}}
```
- **Verify:** each `evidence_N` must exist in the input, otherwise blank that bullet.
- **Route:** any blank bullet moves the lead to a non-ideas campaign.
- **Gate:** if the evidence is under 200 characters, abstain.

## P4 · Eric Nowoslawski: personalization sub-agent (Claude Code, verbatim)
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
**Approval loop:**
1. Run on 1 lead.
2. Run batches of 10 with corrections.
3. Stop after 2 clean batches in a row.
4. Fan out to the rest.

## P5 · LeadMagic GTM prompts (MIT, verbatim excerpts)
**P5a, signal line:**
```text
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
**P5b, reply classification:**
```text
Classify this inbound sales reply.
Reply text:
{{reply_body}}
Categories: interested, objection, not_interested, ooo, unsubscribe, referral, pricing, security
Return JSON: {"category":"","confidence":0.0,"suggested_owner":"sdr|ae|cs|stop","summary":""}
```
**P5c, no-guess email finding:**

"Do NOT construct emails from patterns (first.last@domain). If no verified source, return email="" and confidence="none"."

## P6 · Extol: opener quality rater (second-pass column)
From the Clay-workflow pattern (rate how AI-like an opener reads, 1–5) [R05]:
```text
Rate this cold email opener from 1 (obviously AI or mass-produced) to 5 (sounds like a human who really looked).
Opener: {{opener}}
Fail it (score 1) if it: uses a generic compliment, repeats their tagline, starts with "I", uses an em dash or "!", could apply to another company, or states a guess as fact.
Return JSON: {"score":1-5,"reason":""}
```
Keep only openers that score 4 or more.
