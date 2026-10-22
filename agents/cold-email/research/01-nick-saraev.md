# Nick Saraev: Cold Email Methodology Research

Compiled 2026-10-22. Subject: Nick Saraev (YouTube @nicksaraev, founder of LeftClick, runs the Maker School community on Skool).

## 0. How this was researched, and the limits (read first)

- **WebFetch did not work in this session.** Every call, including youtube.com, nicksaraev.com and even wikipedia.org, failed with `getaddrinfo ENOTFOUND`. Server-side fetching was down, not just blocked for YouTube. Container curl was also refused by the egress proxy (403 on CONNECT to nicksaraev.com). GitHub access is limited to the repositories configured for this session, so I could not search GitHub for his repos.
- **So I got no full transcripts.** All findings come from **WebSearch result snippets**: short excerpts the search tool pulls from pages, run through a summarizer. Text shown in quotes below is an excerpt as the search tool returned it. It is *probably* verbatim from the page, but I could not open any page to confirm the exact wording. Labels used:
  - **[SNIPPET-QUOTE]**: quoted text in a search excerpt of the named page. Likely verbatim, not verified.
  - **[PARAPHRASE]**: a search-tool summary of the page's content.
  - **[3RD-PARTY]**: someone else's description of Saraev's method, not his own words.
- **Not used on purpose:** `https://saraev.172-105-56-252.sslip.io/` showed up in search. It describes itself as a dump of transcript files from his **paid** Maker School course. It looks like an unauthorized copy of paid content, so I did not use it as a source.
- **Name collisions to avoid:** "Nick Abraham" (Leadbird.io) is behind the widely shared "cold email script that never stops working" and a 1.5M-emails/month podcast. That is NOT Saraev. Nick Cegelski (30 Minutes to President's Club) is not him either. One search summary wrongly tied the "never stops working" script to Saraev; the underlying sources credit Abraham or an unnamed "Nick" (https://www.linkedin.com/posts/nick-abraham_coldemail-leadgeneration-prospecting-activity-7113205808435261441-f2AK, https://saaswrites.substack.com/p/62-write-your-saas-growth).

**Bottom line:** the high-level framework, toolchain, benchmarks and offer philosophy are well sourced. **I could not get verbatim example emails or his exact icebreaker prompt.** Recommended next step: pull transcripts for the video IDs in section 1 from a machine with YouTube access (`yt-dlp --write-auto-subs --skip-download <url>`), and import the n8n template JSON for workflow 5388, which should hold his actual prompt.

---

## 1. His cold email videos and content (titles, URLs, dates)

| Title | URL | Date / notes | Source |
|---|---|---|---|
| I Deep-Personalized 1000+ Cold Emails Using THIS AI System (FREE TEMPLATE) | https://www.youtube.com/watch?v=oAWe5wFwHlo | **May 2025**, about 119k views, per a third-party write-up | https://unpromptable.substack.com/p/ai-cold-email-system-tested |
| Live Example of a Winning AI Agency Cold Email Campaign | https://www.youtube.com/watch?v=obMhNfJjIrk | About 547 days old as of search, so roughly **April 2025**. Description: he "launches a cold email campaign for AI agencies" [PARAPHRASE] | search snippet of the YouTube page |
| How I Cold Email Larger Companies ($2.4M Earned) | https://www.youtube.com/watch?v=ZcwBVwM_iWg | Date unknown. No transcript or description content retrieved | search snippet |
| The 4-Step Cold Email Copywriting System I Used To Make $150K Last Year | https://www.youtube.com/watch?v=v9f87-aHbzE | Older; the write-up describing it is about 944 days old, so roughly **2023–early 2024** | https://thecreatorsai.com/p/master-cold-emails-with-ai-cases |
| How I Personalize 1000 Cold Emails With AI (FREE TEMPLATE) | https://www.youtube.com/watch?v=UpaZkDeYd14 | Appeared next to his videos in results, but **authorship not confirmed** | search snippet |
| n8n template: "Cold email icebreaker generator with Apify, GPT-4 & website scraping" ("Deep Multiline Icebreaker System"), created by Nick Saraev | https://n8n.io/workflows/5388-cold-email-icebreaker-generator-with-apify-gpt-4-and-website-scraping/ | Companion to the May 2025 video | n8n listing snippet |
| n8n template: Personalized LinkedIn connection requests with Apollo, GPT-4, Apify & PhantomBuster | https://n8n.io/workflows/4803-personalized-linkedin-connection-requests-with-apollo-gpt-4-apify-and-phantombuster/ | Same toolchain, LinkedIn variant. Listed on his creator page (https://n8n.io/creators/nicksaraev/) | search snippet |
| Ask Nick Q&A #303: "How I Would Automate 10,000 Cold Email Replies a Day" | https://www.asknicksaraev.com/ | Reply-handling architecture (section 2.9) | search snippet |
| Ask Nick Q&A #301: "How to Sell a Guarantee Without Working for Free" | https://www.asknicksaraev.com/ | Risk reversal and guarantees (section 2.5) | search snippet |
| Daily Updates podcast episode: his "exact Instantly campaign settings" (send windows, emails per inbox, sequences per niche) plus Claude, Apify and Apollo for lead lists | https://music.amazon.com/es-co/podcasts/fd8fe407-3852-4579-9283-d6008ac954fb/nick-saraev-daily-updates | 2026. **The actual settings numbers were not in the snippet.** High-priority transcript target | search snippet |
| Daily Updates episode: "how to fix a cold email funnel converting 1 in 8,000" | same Amazon listing | About 61 days old as of search, so around **Aug 2026** | search snippet |
| Daily Update, Thursday July 3 (blog) | https://nick-saraev-daily-updates.ghost.io/nick-saraev-daily-update-thursday-july-3/ | 2025. Q&A on cold email diagnostics | search snippet |
| Blog: "Cold leads suck—but they make you a lot of money" | https://nicksaraev.com/warm-leads-cold-leads/ | About 778 days old, so roughly **2024** | search snippet |
| Blog: "5 More Automations You Can Sell Today for $1,500 (Or $10,000)" | https://nicksaraev.com/5-more-automations-you-can-sell-today-for-1-500-or-10-000/ | Contains his copywriting formula (section 2.1) | search snippet |
| Blog: "I Approached 400 Businesses In 10 Days — Heres What Happened" | https://nicksaraev.com/i-approached-400-businesses-in-10-days-heres-what-happened/ | Door-to-door, not email, but has conversion benchmarks | search snippet |
| Udemy: "Close Deals In Your Pyjamas: The B2B Cold Email Masterclass" (with Soma Marton) | https://www.classcentral.com/course/udemy-close-deals-while-sleeping-88231 | 3–4 hours. Marked "Sessions No Longer Offered" | search snippet |

I did **not** find a dedicated 2026 YouTube video on a Claude Code cold email agent. His 2026 channel focus is Claude Code, Codex and agents (https://nicksaraev.com/, https://podcasts.apple.com/co/podcast/nick-saraev-claude-codex-ai-agents/id6813881534?l=en-GB). His 2026 cold email material shows up mainly in the Daily Updates podcast Q&As.

---

## 2. Frameworks

### 2.1 Email structure: two documented versions

**(A) Current (2025) formula: icebreaker, then elevator pitch, then social proof, then CTA.**
- [SNIPPET-QUOTE], his own blog: the deep personalization system outputs "a Google Sheet filled with several deeply personalized outreach columns based on my winning copywriting formula: icebreaker -> elevator pitch -> social proof -> CTA." Source: https://nicksaraev.com/5-more-automations-you-can-sell-today-for-1-500-or-10-000/
- This is his own words and the clearest statement of structure found. The post does not explain what each stage should contain [PARAPHRASE, same source].

**(B) Older "4-Step Cold Email Copywriting System" (video v9f87-aHbzE): logistics, background, case study, risk reversal.** [3RD-PARTY]
- Per The Creators AI write-up (https://thecreatorsai.com/p/master-cold-emails-with-ai-cases):
  1. **Logistics**: where you found the prospect and why they should care.
  2. **Background**: who you are and your capabilities.
  3. **Case study**: proof.
  4. **Risk reversal**: a low-risk offer meant to make saying yes easy and lower the chance of a "no".
- Claimed result: about $150K in revenue the year before, per the video title. The write-up notes this is self-reported.

The two versions agree: a personal opener (icebreaker or logistics), a short pitch, proof, and a low-friction ask.

### 2.2 First line and AI-personalized icebreakers ("Deep Multiline Icebreaker System")
Sources: n8n listing https://n8n.io/workflows/5388-cold-email-icebreaker-generator-with-apify-gpt-4-and-website-scraping/ and the Unpromptable test https://unpromptable.substack.com/p/ai-cold-email-system-tested.
- **Pipeline** [PARAPHRASE]:
  1. Apollo search URLs go into a Google Sheet.
  2. An Apify Apollo scraper pulls the leads.
  3. Keep only leads with **both an email and a website**.
  4. Scrape **several pages** of each prospect's site.
  5. AI **summarizes each page**.
  6. AI writes a **multi-line** personalized opener (Unpromptable: "a few personal opening lines").
  7. Output goes to Google Sheets, then into Instantly for sending.
- [3RD-PARTY] The Unpromptable author describes the AI being asked whether the person fits the target, and to pull **three specific facts from their site with a source for each**. This is the reviewer's description of the build, which may include their own changes.
- Listing metadata [PARAPHRASE]: rated advanced, 3–4 hours to build, about **$150/month** running cost (Apollo, Apify, OpenAI, email APIs).
- Cost per lead: "a fraction of a cent per lead to research and draft" [3RD-PARTY, Unpromptable].
- Known weakness: a community user reported about 3 minutes per lead [3RD-PARTY, n8n community via search].
- **The exact icebreaker prompt was NOT retrieved.** It should be inside the workflow 5388 JSON. A popular "Hey {name}, Love {X}… Wanted to run something by you" multi-line template turned up (https://github.com/DottieBing/n8n-automations), but **nothing ties it to Saraev**, so it is excluded.

### 2.3 Subject lines
- **Nothing found** from Saraev on subject lines. Searches returned only generic vendor guidance. Gap.

### 2.4 Length rules
- **Nothing found** stated by Saraev. Gap. Generic benchmarks of 50–125 words show up in vendor blogs; do not attribute them to him.

### 2.5 Offer construction and risk reversal
- **Guarantee with a concrete risk reversal.** Ask Nick #301, "How to Sell a Guarantee Without Working for Free" [PARAPHRASE]: lead with a strong value pitch plus a concrete money-on-the-table example, then add a guarantee. His example is a **$250 gift card if you don't deliver**. Source: https://www.asknicksaraev.com/
- **"Time savings" is a weak offer.** Daily Update, July 3 [PARAPHRASE]: automations that "save owners 10 hours a week" underperform in cold email because time savings alone aren't a compelling enough problem. The fix is to test the offer and make the copy **"rawer and more personal."** Source: https://nick-saraev-daily-updates.ghost.io/nick-saraev-daily-update-thursday-july-3/
- 2026 podcast episode [PARAPHRASE]: "I'll save you time" is a weak offer. Instead, **sell ROI paired with social proof, or reduce friction**. Source: Amazon Music Daily Updates listing (above).
- **Avoid free trials and over-customization.** He designs no-brainer, low-risk offers instead [3RD-PARTY analysis of his content]. Source: https://www.viralbrain.ai/heroes/nick-saraev-7ge3obz4
- **Productized, one-and-done offers.** He narrowed services to a small set of leveraged templates, e.g. "one-and-done cold email systems" [PARAPHRASE]. Source: https://nicksaraev.com/biography/
- Earlier tactic: record a **Loom video** of an automation built for that business and cold email it, with a one-time setup fee [3RD-PARTY, 2024 eBiz post, via search]. A Maker School example is 15 personal Loom videos, 3 replies and a $1,900 deal [3RD-PARTY]. Source: https://aifunnelinsider.com/maker-school-review/
- "Free sample" tactic: build something small for the prospect before asking for money [3RD-PARTY, AI-generated report]. Source: https://buldrr.com/nick-saraev-ai-automation-master-report/

### 2.6 CTA style
- The CTA is the last stage of his formula (section 2.1A). The older framework ends on a **low-risk offer**, i.e. risk reversal (section 2.1B).
- **His exact CTA wording was not retrieved.** Gap.

### 2.7 Follow-up sequences and spintax
- **Nothing found** from Saraev on follow-up cadence or spintax. The 2026 podcast covers "sequences per niche" in his Instantly settings, but the snippet had no details. Gap; this is the top transcript target.

### 2.8 Infrastructure, volume, warmup
- **Sending tool: Instantly.** It is named in the May 2025 video description [PARAPHRASE]. Maker School costs list Instantly Growth at $47/month next to the $184/month membership [3RD-PARTY]. Source: https://aifunnelinsider.com/maker-school-review/
- **Earlier domain plan:** "purchase 20 domains & set up + warm up 60 mailboxes" [SNIPPET-QUOTE], from a podcast-outreach plan on his blog. That is 3 mailboxes per domain. Source: https://nicksaraev.com/the-next-few-months-of-my-career/
- **Cost of a cold outreach system:** about **$400/month**. He argues no existing audience is needed [PARAPHRASE]. Source: https://nicksaraev.com/warm-leads-cold-leads/
- He teaches the full technical setup: multiple domains and sender reputation, alongside AI personalization [3RD-PARTY, AI-generated]. Source: https://buldrr.com/nick-saraev-ai-automation-master-report/
- 2026 Instantly settings (send windows, emails per inbox, sequences per niche) **exist in a podcast episode, but the numbers were not retrieved**.

### 2.9 Reply handling (Ask Nick #303, "How I Would Automate 10,000 Cold Email Replies a Day")
[PARAPHRASE, with one SNIPPET-QUOTE] Source: https://www.asknicksaraev.com/
1. Start with **n8n** as a cheap inference and orchestration layer.
2. A workflow fires when an inbound reply arrives and pulls the **full conversation history**.
3. It checks a **knowledge base** for company context.
4. It searches a **library of reply templates** for the closest match.
5. The AI only fills that template's variables: "minimal freedom, just enough to fill in variables, so you retain control over tone and quality" [SNIPPET-QUOTE].
6. At about **100,000 emails/day**, replace n8n with lightweight **Python scripts on a serverless platform like Modal**, listening to webhook events from the email service.

This is directly usable as a design principle for the agent: **template-constrained AI replies, not free-form generation.**

### 2.10 List building
- **Apollo** (search URLs) scraped through **Apify**. Filter for leads with email plus website. Sources: n8n 5388 listing and the Unpromptable write-up.
- 2026: use **Claude with Apify and Apollo** to build lead lists [PARAPHRASE, podcast listing].
- Clay: **no mention** of him using Clay was found.

---

## 3. Metrics and benchmarks he cites

| Claim | Source | Type |
|---|---|---|
| Deep-personalized system gets **5–10% reply rates**, vs **1–2%** for standard campaigns | n8n 5388 listing; Unpromptable ("routinely" 5–10%) | His claim, self-reported |
| One pitch: **4% reply rate**, **30+ qualified leads** who wanted calls | https://unpromptable.substack.com/p/ai-cold-email-system-tested | 3RD-PARTY relaying his video |
| Sent "~200K cold emails with varying levels of success" and cold called thousands of businesses | https://nicksaraev.com/warm-leads-cold-leads/ (and/or biography) | SNIPPET-QUOTE |
| 1,000+ leads sent and no meetings booked means a **messaging problem** to iterate on immediately. "track your positive reply rates" | https://nick-saraev-daily-updates.ghost.io/nick-saraev-daily-update-thursday-july-3/ | SNIPPET-QUOTE / PARAPHRASE |
| 20,000 emails and 1 positive reply: a **copy or audience problem**, not a reason to quit cold email. Change the copy or the audience and iterate | same | PARAPHRASE |
| Cold outreach conversion of roughly 0.5–2% is "standard" (door-to-door context: 400 businesses, about 1%) | https://nicksaraev.com/i-approached-400-businesses-in-10-days-heres-what-happened/ | SNIPPET-QUOTE |
| Personalized system tied to scaling the agency to **$72K/month** | search summary of video/related pages | PARAPHRASE, weakly sourced |
| Upwork proposals: **25% reply rate** (not cold email) | ghost.io July daily update | PARAPHRASE |

Industry context, not Saraev: Instantly's 2026 benchmark puts the average reply rate at 3.43%, the top quartile above 5.5% and elite campaigns above 10%. 58% of replies come on step 1 (https://instantly.ai/cold-email-benchmark-report-2026).

---

## 4. Mindset and psychology points

- **Cold outreach is the best lever when you have no track record.** He calls it "probably your biggest bang for buck" for businesses without an established track record [SNIPPET-QUOTE]. Source: https://nicksaraev.com/warm-leads-cold-leads/
- **Cold email is a numbers-and-process game; don't be fazed by rejection.** Cold calling, door-to-door and cold email "are still a viable business strategy; you just have to stick to a process and learn not to be fazed by rejection" [SNIPPET-QUOTE]. Source: https://nicksaraev.com/i-approached-400-businesses-in-10-days-heres-what-happened/
- **Diagnose by layer.** No meetings on 1,000+ sends means messaging. One positive reply in 20K means copy or audience. Track **positive** reply rate, not just replies [PARAPHRASE]. Source: ghost.io July 3.
- **Copy should feel "rawer and more personal".** This is the closest documented statement to "doesn't sound like a cold email" [PARAPHRASE]. Source: ghost.io July 3.
- **Sell outcomes and ROI with proof, not time saved.** Lower perceived risk with guarantees and risk reversal, and reduce friction [PARAPHRASE]. Sources: Amazon podcast listing; asknicksaraev.com #301.
- **Constrain the AI.** In reply handling, give the model "minimal freedom" to protect tone and quality [SNIPPET-QUOTE]. Source: asknicksaraev.com #303.
- **Deep beats shallow personalization.** He uses multi-page website research to write multi-line, specific openers rather than one-variable merge tags [PARAPHRASE]. Source: n8n 5388.
- **Pair cold email with building in public.** Publishing builds and results on X, YouTube and LinkedIn creates inbound over time; each cold email is a single attempt [3RD-PARTY, AI-generated report]. Source: https://buldrr.com/nick-saraev-ai-automation-master-report/
- Caveat from a third-party review: he may earn affiliate commissions on tools he recommends, such as Instantly [3RD-PARTY, cut off in snippet]. Source: https://ippei.com/maker-school/ or the aifunnelinsider review.

---

## 5. Verbatim example emails and templates

**None retrieved.** I could not open any transcript, video description or template file. The only verbatim Saraev wording I have about copy structure is the formula line in section 2.1A. Do not use the "Hey {name}, Love…/Wanted to run something by you" template or Nick Abraham's "never stops working" script as Saraev's; neither is attributable to him.

---

## 6. Gaps, and how to close them

1. **Transcripts** for oAWe5wFwHlo, obMhNfJjIrk, ZcwBVwM_iWg and v9f87-aHbzE. Use `yt-dlp --write-auto-subs --sub-lang en --skip-download` from an unrestricted machine, or YouTube's "Show transcript" panel. These should give the live campaign copy, CTA wording, subject lines and the 4-step examples.
2. **n8n workflow 5388 JSON** (free on n8n.io). It should contain his exact icebreaker system prompt and the multi-line format.
3. **Daily Updates podcast episode** with his "exact Instantly campaign settings" (send windows, emails per inbox, sequences per niche). Rephonic says it hosts transcripts: https://rephonic.com/podcasts/nick-saraev-daily-updates
4. **asknicksaraev.com** entries #301 and #303 in full, plus any other cold email entries in the archive.
5. Subject lines, length, follow-up cadence and spintax: **no Saraev-attributed data found**. Treat them as unknown until the transcripts are in.
