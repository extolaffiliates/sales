# Cold Email Agent: Deliverability/Compliance (A) and Persuasion Psychology (B)

Research date: 2026-10-22.

**Method caveat:** WebFetch could not resolve any host in this environment (DNS failures, and the proxy blocked direct curl), so every claim below comes from WebSearch result summaries of the cited pages, not from reading the full pages. Where sources conflict, both versions are shown. Most cold-email numbers come from vendors that sell sending tools or inboxes. Treat them as directional, and check primary pages (Google, Microsoft, Yahoo, FTC, ICO, CRTC) before encoding hard rules.

Confidence tags: **[Primary]** = the provider's, regulator's or study's own page or text. **[Secondary]** = a third-party summary. **[Vendor]** = a seller of cold-email tools reporting its own data or opinion.

---

## PART A: DELIVERABILITY, INFRASTRUCTURE, COMPLIANCE

### A1. Mailbox-provider sender requirements

#### Google / Gmail (announced Oct 2023, enforced from Feb 2024, tightened Nov 2025)

- **Who counts as a bulk sender:** anyone sending about 5,000 or more messages to personal Gmail accounts in 24 hours. **[Primary]** https://support.google.com/a/answer/14229414
  - Once a sender crosses the threshold, it is **permanently** treated as a bulk sender. **[Primary]** same FAQ
  - Messages from subdomains count toward the **primary domain's** total. Google's example: 2,500/day from solarmora.com plus 2,500/day from promotions.solarmora.com makes solarmora.com a bulk sender. **[Primary]** same FAQ. This matters for cold email: using a subdomain does not separate your sending volume from your main domain's.
  - The rules apply to personal Gmail recipients, not Google Workspace recipients. **[Secondary]** https://redsift.com/resources/blog/gmails-enforcement-ramps-up-what-bulk-senders-need-to-know
- **Spam-rate thresholds:** Google says a user-reported spam rate above **0.1%** hurts inbox delivery. A bulk sender above **0.3%** becomes ineligible for mitigation, and regains eligibility after staying below 0.3% for **7 consecutive days**. **[Primary]** https://support.google.com/a/answer/14229414?hl=ense. Practical rule: aim for under 0.1% and never reach 0.3%. **[Secondary]** https://blueshift.com/blog/google-postmaster-tools-v2/
  - The Postmaster Tools spam rate covers only mail that reached the inbox and that users then marked as spam. It excludes mail Gmail filtered to spam. **[Secondary]** https://www.suped.com/blog/understanding-google-postmaster-tools-v2-spam-rate-dashboard
  - Postmaster data can lag 24 to 48 hours. **[Secondary]** https://docs.customer.io/messaging/channels/email/deliverability/google-postmaster-tools/
- **Authentication:** bulk senders need SPF, DKIM and DMARC. The From domain must align with SPF or DKIM. Misalignment can trigger a 5.7.26 error. **[Secondary]** https://wpmailsmtp.com/gmail-bulk-sender-requirements/ and https://www.mailreach.co/blog/gmail-sender-guidelines
- **One-click unsubscribe:** required for marketing and promotional mail only. Transactional mail is excluded. Unsubscribes must be honored within 2 days. **[Primary FAQ via secondary summary]** https://support.google.com/a/answer/14229414?hl=ense and https://www.suped.com/knowledge/email-deliverability/compliance/how-to-comply-with-gmails-new-sending-rules-for-bulk-email-senders
- **Enforcement escalation (Nov 2025):** Google's page says Gmail is "ramping up enforcement on non-compliant traffic starting November 2025". **[Primary, via search excerpt]** https://support.google.com/a/answer/14229414. Secondary sources say non-compliant mail now gets permanent 550 rejections rather than temporary 421 deferrals. **[Secondary]** https://redsift.com/resources/blog/gmails-enforcement-ramps-up-what-bulk-senders-need-to-know and https://wpmailsmtp.com/gmail-bulk-sender-requirements/. Another source says Google's FAQ describes enforcement as "gradual and progressive". **[Secondary]** https://www.gmass.co/blog/gmail-bulk-sender-guidelines/
- **Postmaster Tools v2:** a Compliance Status dashboard launched in 2024 (Sweego dates the compliance view to June 2024 and the spam-rate page to August 2024). One-click unsubscribe and honor-unsubscribe checks were added around February 2025. The v1 reputation charts are reported as being retired. **[Secondary]** https://www.sweego.io/?p=4079, https://www.suped.com/knowledge/email-deliverability/tools/what-are-the-issues-and-rollout-details-of-the-new-google-postmaster-tools-dashboard, https://blueshift.com/blog/google-postmaster-tools-v2/
- **2026 updates:** I found no new official Google rule change dated 2026. The 2026 articles describe the November 2025 enforcement escalation. **[Secondary]** https://www.gmass.co/blog/gmail-bulk-sender-guidelines/ and https://www.reachly.co/blogs/gmail-bulk-sender-requirements-2026

#### Yahoo (enforced Feb 2024)

Yahoo's own site (senders.yahooinc.com) could not be fetched. Third-party summaries say:
- All senders need SPF or DKIM. Bulk senders need both, plus DMARC at p=none or stricter, which must pass with From-domain alignment. **[Secondary]** https://help.close.com/docs/requirements-for-bulk-email-senders and https://aws.amazon.com/blogs/messaging-and-targeting/an-overview-of-bulk-sender-changes-at-yahoo-gmail/
- RFC 8058 one-click unsubscribe is required for marketing mail. **[Secondary]** same sources
- The spam-rate ceiling is 0.3%. **[Secondary]** https://bird.com/explained/deliverability/what-are-the-gmail-and-yahoo-bulk-sender-requirements
- Yahoo does not publish a fixed bulk-volume threshold. The commonly cited 5,000 is informal. **[Secondary]** same

#### Microsoft Outlook consumer mail (outlook.com, hotmail.com, live.com), effective 5 May 2025

- **Scope:** domains sending more than 5,000 messages a day to Microsoft consumer mailboxes, counted by the 5322.From domain. **[Primary]** https://support.microsoft.com/en-us/outlook/fix-ndr-error-550-5-7-515-in-outlook-com and https://substrate.office.com/ip-domain-management-snds/Postmaster/Policies
- **Requirements:** SPF pass, DKIM pass, and DMARC at least p=none, aligned with SPF or DKIM. **[Primary]** https://techcommunity.microsoft.com/blog/outlook/strengthening-email-security-outlook-new-requirements-for-high-volume-senders/4399730. Microsoft also recommends, without requiring, a functional unsubscribe and list hygiene. **[Secondary]** https://www.mailgun.com/blog/deliverability/microsoft-sender-requirements/
- **Enforcement:** the original announcement said non-compliant mail would go to **Junk** after 5 May 2025, with **rejection** ("550; 5.7.515 Access denied, sending domain ... does not meet the required authentication level") to follow on a date to be announced. **[Primary]** techcommunity post above
  - **Conflict:** Mailercloud and uriports say Microsoft revised the post on 29 April 2025 and that mail has been rejected outright since 5 May 2025. **[Secondary]** https://www.uriports.com/blog/outlook-error-550-5-7-515-and-how-to-fix-it/ and https://www.mailercloud.com/blog/?p=5217. I could not confirm this. Build the agent to handle both outcomes: Junk placement and 5.7.515 bounces.
- Microsoft 365 business tenants (Exchange Online Protection) are not bound by this consumer rule. There SPF and DKIM act as strong signals rather than hard gates. **[Secondary]** https://www.mailercloud.com/blog/?p=5217

#### RFC 8058 one-click unsubscribe (technical specification)

- Send two headers: `List-Unsubscribe: <https://...>` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click`.
- The DKIM signature **must cover both headers**.
- The URI must identify the recipient and the list, so the unsubscribe completes without any further input.
- The POST request must carry no cookies or HTTP authorization. **[Primary]** https://www.rfc-editor.org/rfc/inline-errata/rfc8058.html. Summarized at https://wordtothewise.com/2024/01/one-click-unsubscribe and https://docs.customer.io/journeys/custom-unsubscribe-links/

**Implication for a cold-email agent:** most cold-email setups stay under 5,000 a day per primary domain, so the bulk-only rules may not legally apply. Even so, SPF, DKIM and DMARC alignment are de facto mandatory for everyone, and Google's "all senders" rules also require SPF or DKIM. Keeping complaints under 0.1% remains the main reputation lever. Adding the List-Unsubscribe headers costs little and lowers complaints.

### A2. Infrastructure best practice (consensus from practitioners and vendors, 2025–2026)

All of the figures in this section are **[Vendor]** opinions. None of them is a provider rule.

| Topic | Typical guidance | Source |
|---|---|---|
| Secondary ("sister") domains | Don't send cold email from the primary brand domain. Spread volume across look-alike domains. Example sizing: 4–10 inboxes across 2–3 domains for 200–1,000 sends/day. A burned domain can take about 90 days to rebuild. | https://www.scaledmail.com/blogs/how-many-cold-emails-per-day, https://growthengineer.ai/blog/cold-email-deliverability-2026 |
| Inboxes per domain | 2–3 at most for Google Workspace. Some Microsoft "bulk inbox" builds use 50–100 per domain, which is a contested practice. | https://www.scaledmail.com/blogs/inboxes-per-domain-cold-email, https://puzzleinbox.com/compare/how-many-inboxes-per-domain-cold-email/ |
| Cold sends per inbox per day | Google Workspace: 10–25. Microsoft: 5–25. A general "safe ceiling" of 20–50. Google's technical sending limit (about 2,000/day) is far above what is safe for cold email. | https://growthflare.io/blog/how-many-cold-emails-per-day/, https://ozigi.app/blog/how-many-cold-emails-per-day-without-spam, https://borks.io/blog/cold-email-infrastructure-stack-2026 |
| Warmup | 14–21 days at minimum. Some recommend 5–15 sends/day for the first 4 weeks before scaling. | https://moderninbound.com/blog/how-many-cold-emails-per-day-2026, https://growthengineer.ai/blog/cold-email-deliverability-2026 |
| Google vs Microsoft vs SMTP | Same-provider sending (Google to Gmail, Microsoft to Outlook) is claimed to place better, so many split volume to match the prospect's mail provider. Private or new SMTP servers start with no reputation and are the riskiest option. | https://emailbison.com/blogs/google-workspace-vs-microsoft-365, https://supersend.io/blog/a-comparison-of-google-and-outlook-for-cold-emailing-which-is-better, https://firstsales.io/blog/cold-email-inbox-providers-beyond-google-microsoft/ |
| Open and click tracking | Avoid click tracking in cold email. Track opens only with a custom tracking domain, or not at all. The tracking pixel forces HTML, and Gmail may show a warning banner. Use replies as the main metric. | https://hunter.io/cold-email-guide/email-tracking, https://snov.io/knowledgebase/?p=49500, https://instantly.ai/blog/email-tracking-and-deliverability-why-tracking-pixels-can-hurt-your-inbox-placement/ |
| Custom tracking domain | If you track, use your own CNAME so you don't share reputation with other senders on the platform. The tracking domain needs warmup too. | https://snov.io/knowledgebase/?p=49500, https://woodpecker.co/blog/custom-tracking-email/ (Jan 2025) |
| Plain text vs HTML | Hunter reports that HTML cold emails bounce 674% more than plain text (internal data, method not disclosed). HubSpot's A/B tests found more HTML meant lower opens (marketing mail). One HTML vendor, Migma, claims the opposite. Consensus: plain text for cold email. | https://hunter.io/blog/is-html-harming-your-cold-email-deliverability/, https://blog.hubspot.com/marketing/plain-text-vs-html-emails-data, https://docs.migma.ai/case-studies/html-vs-plaintext |
| Links and images in the first email | Common practitioner advice is no links, no images and no attachments in touch 1. This follows from the tracking and HTML points above. FirstSales recommends plain text for the first three touches. I found no controlled study isolating links. | https://firstsales.io/blog/plain-text-vs-html-cold-email/, https://hunter.io/cold-email-guide/email-tracking |
| Spam trigger words | Secondary factor. Filters use machine-learning and intent models, so reputation, authentication, engagement, link patterns and content similarity outweigh single words. Avoid obvious phrases, but a word list won't save a bad sender. | https://folderly.com/blog/email-spam-words-to-avoid-2025-complete-guide-alternatives, https://mailreach.co/blog/spam-words, https://woodpecker.co/blog/deliverability/spam-words/ |
| Spintax | Disputed. Mailshake cites a CRMChat.ai study where spintax raised inbox placement from 59% to 83%. Others say modern classifiers detect mechanical variation. Consensus: vary at the sentence or phrase level, never swap individual synonyms. Real per-recipient variation (an AI-written first line) beats spintax. | https://mailshake.com/?p=18057, https://firstsales.io/blog/spintax-cold-email-2026/, https://www.mailreach.co/blog/spintax-cold-email, https://stamina-knowledge-base.help.usepylon.com/articles/1428936511-what-is-spintax |
| Bounce threshold | Keep hard bounces under 2%. 2–5% is a warning zone. Above 5% risks throttling, and above 10% effectively burns the domain. Neither Google nor Microsoft publishes a bounce threshold. | https://www.smartlead.ai/blog/cold-email-bounce-rate, https://www.startuphub.ai/ai-news/ai-tools/2026/reduce-cold-email-bounce-rate |
| List verification | Verify every list before sending. Re-verify active lists every 60–90 days. | https://www.startuphub.ai/ai-news/ai-tools/2026/reduce-cold-email-bounce-rate |
| Catch-all domains | Catch-all servers accept any address during verification, so an address can pass and still hard-bounce later. Exclude them by default, or send a small pilot batch first, or isolate them on separate sending domains. Cheap verifiers often miss catch-alls. | https://firstsales.io/blog/catch-all-email-addresses, https://docs.syncgtm.com/courses/waterfall-enrichment/03-verification-and-catch-alls |

### A3. Legal: what a cold email must include

**This is not legal advice.**

#### United States: CAN-SPAM (FTC)
- **No exemption for B2B** email. **[Primary]** https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- **Required:**
  - accurate header and From information
  - a subject line that isn't deceptive
  - identification of the message as an ad
  - a valid physical postal address (a street address, a registered PO box, or a private mailbox)
  - a clear opt-out that keeps working for at least 30 days after sending
  - opt-outs honored within 10 business days **[Primary]** same page
- **Penalty:** up to **$53,088 per violating email**, a figure the FTC adjusts for inflation. **[Primary]** same page
- CAN-SPAM is opt-out based, so prior consent is not required.

#### EU: GDPR plus national ePrivacy laws
- Recital 47 says direct marketing *may* be a legitimate interest under Art. 6(1)(f). Relying on it requires a documented balancing test (a Legitimate Interests Assessment). **[Secondary]** https://hunter.io/blog/how-to-do-cold-emailing-after-the-gdpr/, https://emaillistvalidation.com/blog/legitimate-interest-vs-consent-b2b-gdpr/
- **Art. 21(2)–(3):** the right to object to direct marketing is **absolute**. Processing must stop once someone objects. **Art. 21(4):** the right must be explicitly brought to the person's attention **no later than the first communication**, separately from other information. **[Secondary, quoting the Article]** https://rgpd.com/gdpr/chapter-3-rights-of-the-data-subject/article-21-right-to-object, https://noyb.eu/node/252
- **Art. 14** (data not collected from the person): when the data is used to contact them, the privacy notice is due at the first communication at the latest. This comes from my general knowledge of Art. 14(3)(b). The search did not verify it. Practical form: a short line in the email saying where you got their details plus a link to a privacy notice.
- **National ePrivacy rules vary.** Some member states, such as Germany, require consent even for B2B email. The search only surfaced an unsourced claim (naming Denmark) on this, so the agent needs a per-country rule table built from primary sources. **[Secondary, weak]** https://www.breakcold.com/en/blog/cold-email-gdpr

#### United Kingdom: PECR plus UK GDPR
- PECR's email consent rule does **not** apply to **corporate subscribers** (limited companies, LLPs, some public bodies). **[Primary]** https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/
- **Sole traders and non-LLP partnerships** (in England, Wales and Northern Ireland) are treated as individuals, so consent or the soft opt-in applies. **[Primary/Secondary]** same ICO page and https://harperjames.co.uk/article/b2b-marketing-and-gdpr-the-basics/
- UK GDPR still applies to named business addresses such as firstname@company. A generic info@ address generally isn't personal data. So the agent still needs a lawful basis (usually legitimate interests), an opt-out, and sender identification. **[Secondary]** https://www.warnergoodman.co.uk/site/blog/news/gdpr-news-update-on-b2b-communications
- **Data (Use and Access) Act 2025** (Royal Assent 19 June 2025):
  - raises the maximum PECR fine from £500k to **£17.5m or 4% of global turnover**, but only once secondary legislation commences it (status unconfirmed)
  - did **not** extend PECR consent rules to B2B **[Secondary/law firm]** https://www.mayerbrown.com/en/insights/publications/2025/06/the-data-use-and-access-act-pecr-reform-rules-relating-to-electronic-marketing-and-cookies-in-the-uk, https://ipandcommercial.howardkennedy.com/post/102kpuv/unlocking-new-privacy-standards-higher-fines-for-direct-marketing-and-cookie-bre

#### Canada: CASL
- CASL is **consent-based** (opt-in), unlike CAN-SPAM.
- For B2B cold email, the "conspicuous publication" route gives implied consent when all three conditions hold:
  1. the address is publicly published
  2. there is no statement refusing unsolicited messages
  3. the message is relevant to the person's business role
- The sender carries the burden of proof. **[Secondary]** https://blog.mystrika.com/casl-cold-email-canada-guide/, https://www.canadianelectricalwholesaler.ca/5-types-of-consent-part-4-implied-conspicuously-published/
- The unsubscribe must work fully. In the CRTC's CompuFinder decision, partly broken unsubscribe links counted as a violation. **[Secondary]** https://www.mltaikins.com/insights/casl-is-constitutional-and-some-guidance-on-how-to-interpret-it/
- The search did not cover sender-identification details or penalty amounts. Check them against CRTC guidance before relying on CASL.

#### Practical "must include" checklist for the agent (all jurisdictions)
1. A real sender name and company, and accurate headers.
2. A non-deceptive subject line.
3. A postal address (US).
4. A working opt-out: a plain-language line or link, plus RFC 8058 headers if bulk.
5. Opt-outs honored quickly: within 2 days for Gmail and Yahoo, 10 business days at most under CAN-SPAM.
6. For EU and UK recipients: a lawful-basis record (LIA), a right-to-object notice in the first email, the data source and a privacy notice link, and a suppression list.
7. Country rules: corporate vs sole-trader handling in the UK, conspicuous-publication evidence in Canada, and stricter consent countries in the EU.

### A4. Benchmarks and measurement

- **Reply rates (all vendor data, with different definitions):**
  - **Instantly 2026 report** (sends from 1 Jan to 18 Dec 2025): average **3.43%** reply rate. Top quartile 5.5%+, top 10% above 10.7%. Best results came from sequences of 4–7 steps with emails under 80 words. **[Vendor]** https://instantly.ai/cold-email-benchmark-report-2026. One summary attributes **42% of replies** to follow-up steps. I couldn't confirm that figure in a second search. **[Secondary]** https://billionverify.com/blog/instantly-cold-email-benchmark-report-2026
  - Woodpecker: median 1.5% across 56,614 campaigns. It calls 5–10% "good" and 10%+ "excellent". **[Vendor]** https://woodpecker.co/blog/cold-email-statistics/, https://lemlist.com/blog/cold-email-benchmarks/
  - Saleshandy 2026: 3.7% across 53.1M emails. Belkins 2025: 5.8% across 16.5M. Belkins reports 0.45% when auto-replies are stripped out. **[Secondary]** https://www.lemlist.com/blog/cold-email-benchmarks
  - Methodology warning: Instantly's "reply rate" includes auto-replies and out-of-office messages, while Gong strips them out. **[Secondary]** https://belkins.io/blog/b2b-cold-email-subject-line-statistics
  - **Recommended bands for the agent:** under 1% means a problem. 1–3% is typical. 3–5% is solid. 5–10% is good. 10%+ is top tier. Track positive reply rate separately.
- **Open tracking is unreliable (Apple Mail Privacy Protection, since 2021):**
  - SparkPost measured unique opens rising by about 12 percentage points for most senders. Just over a quarter of all opens come from MPP machine opens. Opens are "unsafe for judging individual behavior" but still usable in aggregate. **[Secondary, quoting SparkPost]** https://www.mediapost.com/publications/article/371789/
  - Other vendor estimates run from 15–20 points of inflation up to "half of opens". **[Vendor]** https://emaillistvalidation.com/blog/explaining-open-rate-decline-after-apple-mail-privacy/
  - Combined with the deliverability cost of tracking pixels, the agent should optimize for **replies and positive replies**, not opens.

---

## PART B: PERSUASION PSYCHOLOGY FOR REPLIES

### B1. Hard data on email form

| Finding | Data | Source |
|---|---|---|
| Interest CTA beats meeting ask on first touch | Gong Labs analyzed 304,174 emails, counting a meeting booked within 10 days as success. Interest CTA ("Interested in learning more?" or "Worth exploring?") succeeded 30% of the time, a specific-time ask 15%, and an open-ended meeting ask 13%. **In late-stage deal emails this reverses:** specific-time 37%, open-ended 32%, interest 25%. Data from 2020–21. | **[Primary, Gong blog]** https://www.gong.io/blog/cold-email-stats, https://www.gong.io/blog/these-are-the-best-sales-email-tips-youll-read-in-2021, CTA cheat sheet https://www.gong.io/files/gong-guide-cheat-sheet-43-highly-effective-email-ctas.pdf |
| Length | Gong: reply rates drop sharply above 100 words. The best emails run 50–100 words, and buzzwords and vague ROI claims lower replies. Gong 2025 (28M emails): best results at 100 words or fewer, in 3–4 sentences. Instantly: under 80 words. Hunter (34M emails): 20–39 words had the highest average reply rate, though Hunter warns this is correlation, not causation. Lavender: 0–50 word emails get 23% more replies. Boomerang (2016): 50–125 words had response rates above 50%. | https://www.gong.io/blog/do-execs-really-reply-to-cold-email-here-s-what-the-data-says, https://emailanalytics.com/ideal-email-length/, https://hunter.io/blog/cold-email-word-count, https://www.lavender.ai/blog/6879935-lavender-best-practices, https://blog.boomerangapp.com/2016/02/7-tips-for-getting-more-responses-to-your-emails-with-data/ |
| Reading level | Boomerang: third-grade reading level had a 53% response rate, 36% higher than college level. Lavender: emails at grade 3–7 clarity get 1.66x more replies. | Boomerang link above, https://learningenglish.voanews.com/a/tips-for-email/3842882.html, Lavender link above |
| Number of questions | Boomerang: emails with 1–3 questions were 50% more likely to get a response than emails with none. Emails with 8 or more questions did worse. | https://fortune.com/2016/03/02/ignored-emails-communication-work (quoting Boomerang) |
| Subject lines | Gong/30MPC (85M+ emails): short subject lines of 1–4 words that read like internal email. An empty subject line raised opens about 30% but lowered replies about 12%. "Salesy" subject lines cut opens by up to 17.9%. All of these figures are secondhand. | https://tactics.30mpc.com/hubfs/The%20Ultimate%20Cold%20Email%20Data%20Report-1.pdf, https://www.30mpc.com/newsletter/4-data-backed-subject-lines-to-get-your-cold-emails-opened |
| Personalization | Belkins (5.5M emails): 3% reply rate without personalization, 7% with it. 30MPC/Gong: executives don't care if you reference their alma mater. Reference business problems instead, and prioritize high-intent leads. | https://belkins.io/blog/b2b-cold-email-subject-line-statistics, 30MPC PDF above |
| Trigger and signal relevance | Backlinko (12M emails, as cited by Leadspace): generic outreach 3.4% vs 18% when a trigger event is referenced. Other 2026 vendor claims: 8–15% vs 1–3%. Apollo: the bar is now "relevant and timely vs. everything else", not "personalized vs generic". | https://www.leadspace.com/resources/why-your-cold-emails-aren-t-getting-replies-(it-s-not-your-copy), https://rivereditor.com/blogs/ai-cold-email-reply-rates-smb, https://www.apollo.io/insights/what-personalization-strategies-actually-improve-cold-email-reply-rates |
| Executives | Gong: lead with the executive's priorities and peer social proof, not product features. A claim that C-suite reply rates are about 30% lower is unverified. | https://www.gong.io/blog/do-execs-really-reply-to-cold-email-here-s-what-the-data-says, https://salesmotion.io/blog/cold-email-executives-reply-rates |
| Follow-ups and breakup | Best sequences run 4–7 steps, spaced 3–4 days apart (Instantly). HubSpot reportedly saw a 33% response rate to breakup emails, and vendors cite 10–33%. This is anecdotal and vendor-reported. | https://instantly.ai/blog/email-sequence-benchmarks-2026-whats-a-good-open-rate-reply-rate-and-cost-per-meeting/, https://firstsales.io/blog/breakup-email, https://instantly.ai/blog/7-high-converting-email-sequence-strategies-that-increase-reply-rates/ |
| Day of week | Instantly 2026: Wednesday is best, then Tuesday and Thursday. Cited via Lemlist. | https://lemlist.com/blog/cold-email-benchmarks/ |

### B2. Principles and the research behind them

**Cialdini's principles.** The 1984 book named six principles: reciprocity, commitment/consistency, social proof, authority, liking and scarcity. Unity was added later, which is why some lists have seven. **[Secondary]** https://yourstory.com/2024/05/persuasion-principles-cialdini, https://conversionxl.com/blog/cialdinis-principles-persuasion. Applied to cold email (practitioner heuristics, not tested on reply rates) **[Secondary]** https://hunter.io/blog/sales-email:
- **Reciprocity:** give something first, such as a specific insight, a teardown, a benchmark or a useful resource. A follow-up that concedes part of the original ask also triggers reciprocity ("rejection then retreat").
- **Social proof:** name a similar peer company or role that faced the same problem. Gong's executive data supports peer proof over features.
- **Authority:** one credible signal early, such as a relevant result or named customer. One signal, not a list of credentials.
- **Liking and similarity:** a genuine shared trait or a specific compliment. The 30MPC data warns that shallow rapport, like the alma mater line, doesn't move executives.
- **Unity:** shared identity ("fellow agency founders", "as another ex-operator"). This goes deeper than surface similarity.
- **Commitment/consistency:** start with a tiny "yes", such as an interest question, then build to a meeting. This is consistent with Gong's interest-CTA finding.
- **Scarcity:** use only when it is real. Fake urgency reads as salesy.

**Curiosity gap.** Loewenstein (1994, *Psychological Bulletin* 116(1):75–98) describes curiosity as "cognitively induced deprivation" arising from a perceived gap in knowledge. The gap must be neither too big nor too small, and the reader needs some prior knowledge for it to work. **[Primary abstract + secondary]** https://stafforini.com/works/loewenstein-1994-psychology-curiosity-review/, https://nautil.us/curiosity-depends-on-what-you-already-know-235803. Application: subject lines and openers should reference something the reader already knows about (their company or a trigger) and point to a specific missing piece. Gong's empty-subject result shows that curiosity alone can raise opens while lowering replies.

**Loss aversion.** Kahneman and Tversky (1979, prospect theory): losses weigh more than equivalent gains. Later estimates put the coefficient at about 2–2.5, though the effect is weaker for small or hypothetical stakes. A 2019 multi-country replication broadly confirmed it. **[Secondary]** https://en.wikipedia.org/wiki/Loss_aversion, https://www.publichealth.columbia.edu/news/global-study-confirms-influential-theory-behind-loss-aversion. Josh Braun's practice is to frame around what they're losing, not what they'd gain, and to name a specific problem before the product. **[Secondary]** https://skills.cat/skills/sachacoldiq/coldiq-s-gtm-skills/josh-braun-copywriting

**Cognitive ease and fluency.** Oppenheimer (2006), "Consequences of Erudite Vernacular Utilized Irrespective of Necessity": needlessly complex wording lowered readers' judgments of the author's intelligence, and processing fluency explained the effect. A hard-to-read font produced the same result. **[Primary abstract]** https://deepdyve.com/lp/doc/lPYnpsUrVG. Together with Boomerang (third-grade level) and Lavender (grade 3–7), the rule is short sentences and common words, which also suits mobile reading.

**Giving a reason ("because").** Langer, Blank and Chanowitz (1978, *JPSP* 36(6)): asked to let someone skip the copier queue for a 5-page job, 60% of people complied with no reason, 94% with a real reason, and 93% with a meaningless reason ("because I have to make copies"). For a large request (20 pages), only the real reason raised compliance. **[Secondary]** https://www.psychologytoday.com/ca/blog/brain-wise/201310/the-power-of-the-word-because-to-get-people-to-do-stuff. This is the research basis for "why you, why now": for a real ask, the reason has to be real and specific to the reader.

**"Why you, why now" and relevance over personalization.**
- The data in B1 shows the largest effects come from **relevance and timing** (trigger events: 18% vs 3.4% in the cited Backlinko data) and from **business-problem** personalization, not from personal trivia (30MPC/Gong).
- Apollo's framing: relevant and timely vs. everything else.
- Useful trigger events include funding, hiring for a role, a new executive, a product launch, a tech-stack change and expansion.
- I found no named primary source for the exact phrase "why you, why now". Treat it as a practitioner synthesis supported by the trigger data and Langer's study.

**Specificity.** Braun: be specific and show proof of homework. **[Secondary]** https://skills.cat/skills/sachacoldiq/coldiq-s-gtm-skills/josh-braun-copywriting. Gong: buzzwords and vague ROI claims reduce replies. **[Primary]** https://www.gong.io/blog/do-execs-really-reply-to-cold-email-here-s-what-the-data-says

**Pattern interrupt and the "doesn't feel like cold email" principle.**
- Gong/30MPC: short subject lines that look internal, and avoiding salesy subjects.
- Hunter: HTML makes an email look like a bulk blast.
- Braun: a peer-to-peer, light tone with a little personality, built to start a conversation rather than close a deal, with a humble ask.
- Sources: 30MPC links above, https://hunter.io/blog/is-html-harming-your-cold-email-deliverability/, https://app.thejuicehq.com/content/V1KoK9TWFQFmbZeQ1LKnzjaY
- Braun's four-sentence structure: proof of homework, then the problem you think they have, then light social proof, then a humble interest-based ask.
- I found no controlled study isolating "pattern interrupt". It is practitioner lore.

**Referral ask ("are you the right person?").** Vendor template collections report 6–10% replies for "Is [X] the right person for this?" and 3–8% when a referral ask is folded into the breakup email. These are unverified vendor numbers. **[Vendor]** https://syncgtm.com/blog/cold-email-template-examples

**Breakup email.** It works through loss aversion and closure: you take away the option of continuing. It only works if the sequence really stops afterward. **[Vendor]** https://firstsales.io/blog/breakup-email, https://hub.causo.ai/guides/sales-breakup-email-books-meetings-2026

### B3. Rules for the agent, distilled (each traced to the sources above)
1. **Infrastructure gates before copy:**
   - SPF, DKIM and DMARC aligned
   - secondary domains with warmed inboxes, sending 10–30 a day each
   - verified lists, catch-alls excluded or isolated
   - hard bounces under 2%, spam rate under 0.1%
   - plain text, no tracking pixels or click tracking, no links or images in touch 1
2. **Every email must answer "why you, why now"** with a real, specific signal or trigger.
3. **First-touch form:**
   - 50–100 words (aim for under 80)
   - 3–4 short sentences at grade 3–7 reading level
   - one question
   - a subject line of 1–4 words that reads like internal email
4. **Lead with their problem or a likely loss, not your features.** Add one line of peer social proof.
5. **Use an interest CTA on touch 1** ("Worth a look?"). Switch to a specific-time ask only after interest is shown.
6. **Sequence:**
   - 4–7 touches spaced 3–4 days apart
   - each follow-up adds new value (reciprocity), never "just bumping this"
   - include a referral or right-person touch
   - end with a real breakup email
7. **Tone:** a peer writing to a peer. No buzzwords or hype, and no fake urgency.
8. **Compliance footer logic by recipient country:**
   - US: postal address and opt-out
   - EU/UK: right-to-object notice, data source and privacy link
   - CA: evidence of conspicuous publication
   - honor opt-outs within 48 hours
9. **Measure replies and positive replies, not opens.**
