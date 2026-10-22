---
name: cold-email-personalize
description: Research prospects and write AI-personalized first lines and icebreakers grounded only in verified facts. Based on Nick Saraev's deep personalization pipeline (scrape the site, summarize, write a multi-line opener) and Becc Holland's premise ranking, with depth set by account tier. Use when the user says "personalize these leads", "write icebreakers", "first lines for this list", "research this prospect", or hands over a CSV of leads.
---

# Personalize cold emails

Read `cold-email/playbook.md` §5 first.

## Decide the depth by tier
- **Tier 1** (a few accounts): deep research by hand. Use SMYKM or Premise (the person's own words, posts or interviews), plus a custom offer (Loom or 3 ideas).
- **Tier 2** (hundreds): Saraev's pipeline (below). AI writes the first 1–3 lines; a human-written template carries the rest.
- **Tier 3** (thousands): no 1:1 personalization. Segment by industry, role and trigger and write one relevant email per segment. Never fake personalization at this tier.

## Saraev-style pipeline (tier 2, per lead)
1. **Filter:** keep only leads with a verified email *and* a website.
2. **Research:** fetch the homepage plus 2–4 key pages (about, services, case studies, careers, blog). Also check recent news, job posts or LinkedIn activity if available.
3. **Summarize** each page in 2–3 factual bullets.
4. **Extract 2–3 specific facts, each with its source URL.** Rank them using Becc Holland's premise buckets: things they wrote or said > company initiatives or triggers > role relevance > personal "junk drawer" details (use those last).
5. **Check fit:** does this lead actually match the ICP and the angle? If not, mark it `SKIP` with a reason.
6. **Write the opener:** 1–3 lines that use one fact and connect it to the problem the email solves ("If A, then B is probably true").

## Rules for openers
- Only use facts you read in a source, and keep the source URL. **If you're not sure, don't use it.** Fall back to a cohort line.
- **No compliments or AI tells:** "I was impressed by…", "Love what you're doing…", "As a leader in…", or repeating their tagline back to them.
- Name something specific and checkable: a number, a named initiative, a quote, a job title they're hiring for.
- Make it sound like a human noticed it: casual, short, lowercase-friendly.
- Under 30 words. Don't start with "I".

**Good:** "Saw you're hiring a second dispatcher in Leeds. Usually means the phones are outpacing the team."
**Bad:** "I was really impressed by your company's commitment to excellent customer service!"

## Output
Write `campaigns/<slug>/personalization.csv` with these columns: `email, first_name, company, fact, source_url, premise_bucket, opener, status`. `status` is `OK`, `SKIP` or `CHECK`.

Show a sample of 5 rows in chat, plus counts for OK, SKIP and CHECK.

## Tools
- Use WebFetch or WebSearch for research.
- If Apollo or Clay connectors are available, use them for enrichment and triggers.
- For a large list, process it in batches and report progress.
- Never send email from this skill. It only produces data for review.
