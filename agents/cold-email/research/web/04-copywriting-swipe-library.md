# Copywriting: Swipe Library and Component Teardowns

Research track 1 of 3 for the cold-email-master agent. Compiled on 2026-10-22.

## How this was gathered (read first)

- **Origin:** a research agent downloaded **71 LinkedIn posts and articles in full** and ran 45 searches before it was accidentally stopped. This report was written from that recovered material.
- **Additional primary material:**
  - Eric Nowoslawski's **GEX Wrapped 2024** public Google Doc.
  - The MIT-licensed `campaign-copywriting` skill in [growthenginenowoslawski/coldoutboundskills](https://github.com/growthenginenowoslawski/coldoutboundskills); copies are in `../sources/`.
- **Quote labels:**
  - **[V-FILE]**: verbatim from a fully downloaded page.
  - **[V]**: verbatim from a search snippet.
  - **[P]**: paraphrase.
- **Claims:** results quoted in the emails are the author's own claims **[SELF-REPORTED]** unless noted.
- **Dates:** many LinkedIn posts are from 2021–2023. Each date is listed so the agent can weigh how current a source is.
- **What isn't covered:** LinkedIn posts that were image-only (where the email was a screenshot) had no recoverable text and are left out.

---

## Part A: Component teardowns

### A1. Subject lines

**Consensus formula:** 1–4 words that a colleague or customer could plausibly have sent, lowercase, specific to them.

- **Eric Nowoslawski (GEX 2024)** [V-FILE]: "2-3 words that a customer or a colleague could have also reasonably sent. **Always test against the tried and true 'question for {{first_name}}', {{company_name}} <> {{your company name}}, even the dreaded 'quick question'. Sometimes, these still outperform our best ideas.**"
  - Note the conflict: his own `campaign-copywriting` skill bans "Quick question" as overused, and Alex Berman says it now "reads as automation" (report 02).
  - **Agent rule: "quick question" is banned as a default but allowed as a test control.**
- **Eric's `campaign-copywriting` skill** [V-FILE]: three approaches.
  - **A. 2–4 words, intrigue:** "question for {{first_name}}", "{{company_name}} equipment", "Saw your post", "Competitor insights".
  - **B. The whole offer in subject plus preview:** "Ever chase renters to pay on time?" with the preview "We built a platform that rewards renters for paying on time…".
  - **C. Problem indicator:** "Looked you up on ChatGPT", "Review from Karen", "Starter vs. Professional".
  - **Banned:** "Curious", "Quick question".
  - **Test:** "Can a colleague or potential customer send this? If yes, good." Personalized subjects go in lowercase.
- **Real GEX subject lines** [V-FILE]: "cheers to the role" (new in role), "emails in spam?", "list?", "more customers like {{case study}}?", "growth", "show and tell".
- **Heather Morgan (2015)** [V-FILE]: three subjects with measured results (old data).
  - "how competitive is {!Company}'s sales team?": **45.5% open rate**, using fear of loss.
  - "10x {!Company}'s traction in 10 minutes": generated **16 new customers**, a value promise with numbers.
  - "Question about employee loyalty at {!Company}": intrigue through a question.
- **Kyle Gawley (2015)** [V-FILE]: "Tickets for Break Conference 2015 in November" got a **50% open rate vs a 21% average**, by naming the prospect's own event.
- **Chris Orlob** [V-FILE]: "Make the subject line 3–4 emotionally-packed words… What words do they use to describe that pain? Use those words." He also says to make it read like an internal email by naming their direct reports.
- **30MPC/Gong, 85M+ emails** [V-FILE, Nick Cegelski post, July 2025]: "**Remove the word 'AI' from your subject lines (17% decrease in opens).**"
- **Sam Nelson (2018)** [V-FILE]: "can I call you at 3:00?" (all lowercase) worked "surprisingly well" for a *middle* template email.
- **Sendspark (vendor, 2026)** [V-FILE]: 3–7 words that reference something specific. This is longer than the others recommend; treat it as a test variant.

### A2. Preview text and opening lines

The first line shows in the inbox preview, which makes it the second subject line.

- **Jason Bay ("Part 2: Optimizing preview text")** [V-FILE]: "Hey Jason / Hi Jason… scream 'THIS IS AN EXTERNAL EMAIL!'. Match internal communication style." Three frameworks, each with a bad and a good version:

  | Framework | ⛔ Bad | ✅ Good |
  |---|---|---|
  | 1. Curiosity question | "Hi Jason, it's John. I manage a social enterprise that connects business owners with talented freelancers…" | "Jason—how's the search for a freelance podcast/video editor going?" |
  | 2. Point out a problem | "Hi Jason, We noticed that there are opportunities for improvement on your website. Specifically, the chatbots are not working after business hours." | "**See this? The chatbot on the Canada Goose page doesn't work after 6pm PT.**" |
  | 3. Specific observation | "Hi Jason, I took a look at the recent quarterly report." | "Jason—you mentioned that digital sales were down 13% this last quarter." |
- **Kyle Coleman: openers to avoid** [V-FILE]: "Based on your title", "I saw your profile on LinkedIn", "Sorry to bother you", "My company does xyz". "Instead, open your emails with something that compelled you to reach out."
- **Jacob Tuwiner, Experiment 27 (Alex Berman's agency, 2021)**: the specific-compliment school.
  - **Rules** [V-FILE]: never start with "I". Instead of "I love your interview with…", write "Love your interview with…". Test: "consider whether or not this first line could apply to anyone else. If the answer is yes… rewrite it." Never lie. No disingenuous compliments.
  - **Examples** [V-FILE]:
    - "Love One Rockwell's front-end designs - the Trish McEvoy site looks terrific, especially considering it boosted conversion by 62%! Great work."
    - "The work you did for American Express is awesome, especially how you saved the Small Business Saturday program over $1.5MM year-over-year!"
    - "Read your interview with Jenny Rooney on Forbes - loved your point about CMOs inheriting expectations they're mostly unequipped to meet. Great read!"
    - Turning a generic line specific: "your website design is amazing" becomes "your website design is amazing, especially how you used Walmart's blue, spark yellow and white colors throughout."
  - ⚠️ *This 2021 style (compliments plus exclamation marks) is now flagged as an AI tell at scale (reports 05, 02). Keep the specificity test; drop the gushing and the "!".*
- **Josh Braun: "Truth" opener types** [V-FILE]:
  - "James, noticed your SDRs target HR/Benefit Directors in companies > 500 employees."
  - Context: "Josh, looks like you're using Logic, Zubtitles and Headliner to edit and promote your podcast. Have you tried Descript?"
  - Crispy: "John, noticed you have a fleet of 23,500 in the EU and a goal of reaching zero emissions by 2025."
  - Conversational, not formal: "Your post on lowering resistance was spot on." beats "I noticed your post on X, which triggered me to reach out."
  - "Don't worry too much about grammar": "Caught your take on X." "Seems like you're using Outreach." "Scanned your jobs page and noticed …"
- **Chris Orlob** [P]: replace "I noticed" with "Looks like you…" (e.g. "Looks like you're hiring across your revenue org").
- **Florin Tatulea** [P]: the "silly question" opener asks the prospect's expert opinion on a genuine, possibly silly question about the topic. He claims **a 30% reply rate** [SELF-REPORTED, about 2023]. It must be genuine, not a disguised sales question.
- **Eric's opener patterns, "Poke the Bear"** (`campaign-copywriting`) [V-FILE]:

  | Style | Example |
  |---|---|
  | Classic | "Do you already have a reliable way to {{problem}}?" |
  | Status pressure | "Have you solved {{problem}} yet or is it still manual?" |
  | Soft humility | "I may be wrong, but do you have something in place for {{area}}?" |
  | Efficiency | "How are you doing {{task}} without adding headcount?" |
  | Binary | "Will your current setup scale 12 more months?" |
  | Redirect | "Let me know if {{employee_1}} or {{employee_2}} would be better to speak about {{problem}}" |
- **Will Allred: hedged hypotheses (Chris Voss style)** [V-FILE]: "Curious if I'm wrong to guess that…", "I'm willing to bet", "I imagine", "I suspect".

### A3. Problem, bridge and pain

- **Chris Orlob** [V-FILE]:
  - "If you can articulate the buyers' pain better than they can, they will always meet with you."
  - "Describe the pain. Agitate the pain. Speak to the outcome. Offer social proof. Then ask 'interested in talking about solving [pain]?'… You'd be shocked at how absent the product is from the highest-performing cold emails."
  - His 4-part formula (used "in over 100,000 sends", including scaling Gong) [V-FILE]:
    1. **Relevant intro:** "Looks like you're hiring across your revenue org — congrats."
    2. **Agitate:** "You either hit your headcount targets and sacrifice quality… Or you hire strong reps but miss your number."
    3. **Future state:** "We've helped 100+ VPs reduce their miss-hire rate to single digits."
    4. **'Solve' CTA:** "Is reducing sales mis-hires this quarter worth a quick chat?"
- **Will Allred: "Safe Space"** [V-FILE]: Observation → Problem → *Safe Space* → Solution → CTA. The safe space is "I've seen this problem with others… you're not alone", followed by restating the problem in their words. "Getting their Problems = Credibility."
- **Josh Braun: "Let your customers write your email"** [V-FILE]: mine case studies for the **before story** (what they did before switching), contrast it with the after story, and steal the customer's own words. "Good cold email copy isn't written, it's found."
- **Josh Braun: emotional language** [V-FILE]: "Does using spreadsheets to determine payouts feel like sipping peanut butter through a straw?"
- **Josh Braun: curiosity gap** [V-FILE]: "Are you paying for subscriptions you forgot about?" "Can your bike lock be picked with a paperclip in 15 seconds?" "Do 82% of your cold emails land in spam?"
- **Eric (GEX 2024), reframe the assumption** [V-FILE]:
  - For a tax client, "hey if you need to get your taxes done, we can help you" became (Josh Braun's suggestion) "**How do you know your current tax accountant is using every legal loophole to get you as much back from the government as possible**".
  - "Change our assumption that they need an accountant to we know they have one and they should get a second opinion." He calls it one of "the most dramatic changes in response rate" from a change under 15 words.
- **Jed Mahrle (2021)** [V-FILE]: "Less is more… I started experimenting with just addressing one pain point at a time… If that pain didn't hit, I'd pick a new one and use it in my second email… I started getting wayyy more replies."
- **Nick Cegelski** [V-FILE]: "If you need to ask Chat GPT 'What are the main challenges a CMO is facing?' your email will sound remarkably generic. Get dangerously specific in describing the problem you solve." Also: "Use caution with proactive objection handling. Your email real estate is precious."
- **Eric's "chunking" (GEX 2024)** [V-FILE]: if the core value prop is saturated ("we help you add pipeline"), either:
  - **chunk up** to broader outcomes ("No need to train SDRs anymore", scale without headcount), or
  - **chunk down** to small jobs-to-be-done ("We manage your email deliverability", "You don't have to enter expensive long term contracts with data providers").

### A4. Proof

- **Eric (GEX 2024)** [V-FILE]:
  - "Make sure to use real numbers. **Helping someone increase their ROAS by 3.72x is much more believable than by 4x.**"
  - Test naming the client vs just the result. "If your case study is with Google and you're reaching out to small companies, they will think 'Wow they must be expensive.'"
  - Match case studies to the audience (he uses lookalikes from Ocean.io).
  - **"Case study overwhelm" template:** a punchy body, then many case studies after the signature (see S24).
- **Eric's 3 offer types and their rotation** (`campaign-copywriting`) [V-FILE]: every offer is **save time / make money / save money**. GEX 2024 adds reduce risk, raise status and live longer, and drops the last two for B2B. **Rotate the type across follow-ups.**
- **Josh Braun: third-party credibility** [V-FILE]: "4k+ reps are seeing an uptick." "'How it works' makes your email high-res… the difference between 'We fix computers' and 'We fix MacBook Pros.'"
- **Nick Cegelski** [V-FILE]: "Don't over-rotate on social proof/name-dropping customers. If you're gonna name drop current customers, make sure they are similar size/industry as your prospect."
- **Josh Braun: cut the fluff** [V-FILE]: "ACME was able to reduce customer hold times by 46%" becomes "ACME reduced hold times by 46%."

### A5. CTAs

- **Josh Braun's CTA list** [V-FILE]:

  | Type | Example |
  |---|---|
  | ❌ Big ask (time) | "Are you available for a brief call at {time options}?" |
  | ❌ Big ask (time) | "I'm available tomorrow {2 times}. Can we sync up?" |
  | ❌ Big ask (time) | "What's the best day/time this week or next for a quick 15-minute conversation?" |
  | ✅ Small ask (interest) | "Are you interested in learning more?" |
  | ✅ Small ask (interest) | "Worth exploring in Q1/Q2?" |
  | ✅ Small ask (interest) | "Open to learning more?" |
  | ✅ Small ask (interest) | "Would an email exchange make sense?" |
  | ✅ Small ask (interest) | "Opposed to learning more?" |
  | ✅ Small ask (interest) | "Is this of interest, or am I way off base?" |
- **Josh Braun's counterpoint, "Do cold email CTAs sound needy?" (2023)** [V-FILE]: "Neediness is repulsive… Lean back. Detach. Be indifferent to the outcome. **Stop gauging interest or asking for time.**" End on an expert question instead, e.g. "Have you looked into Pop Card?" or "Are you familiar with tech that enables restaurants to get 5-star reviews instantly without asking?" **[TEST]**: the no-CTA expert question vs an interest CTA.
- **Kyle Coleman** [V-FILE]: "Curious to learn more?" "Interested in exploring?", ending with "**Either way, thanks for reading.**" to take the pressure off.
- **Chris Orlob** [V-FILE]: "'Interested in exploring more?' That's easy to say yes to. 'Interested in a 30 minute demo?' That's hard to say yes to."
- **Nick Abraham, the risk-minimizer CTA** [V-FILE]: "If I could {generate X result} {risk minimizer} would you be interested in speaking?" For example: "If I could generate meeting-ready leads on a performance basis, would you be interested in speaking?" He calls "Are you taking on more clients?" "the worst cold email pitch of all time… It just sounds so scammy."
- **Eric's three CTA categories** (`campaign-copywriting`) [V-FILE]:

  | Category | Examples |
  |---|---|
  | Confirmation | "Is this still the case?", "Worth exploring?" |
  | Value exchange | "...to walk you through 3 custom ideas specific to {{company_name}}" |
  | Resource offer | "Could I send you access to try it out?", "Want to see a video of how this works?" |

  **The test: "Can they reply in 5 words or less?"**
- **Sameer, agency (vendor-hosted post)** [V-FILE]: CTAs that worked across "475 meetings… in the last 90 days" include "open to learning more?", "mind if I share more info?", and "Open to a call where I can share the Facebook ad tweaks I had in mind for you?" (the call is framed as giving value).

### A6. P.S. lines

- **Josh Braun** [V-FILE]: "Most people read the PS line first" (the Zeigarnik effect). Four uses:

  | Use | Example |
  |---|---|
  | Poke the bear | "PS - How do you know SDRs that interview well will perform well?" |
  | Future pacing | "PS - How would it feel to calculate & run commission statements for 100+ reps in 5 minutes?" |
  | Make a deposit | "PS - Here's a cold call framework that will motivate skeptical prospects to want to learn more." |
  | Testimonial | "PS - Here's what changed for the better after Albert, Business Operations Manager at Gong, switched." |
- **Chris Orlob** [V-FILE]: "Add a P.S. to every cold email… The P.S. is the most-read part of any message."
- **Jacob Tuwiner** [V-FILE]: a custom first line *plus* a PS line ("PS, awesome work with {portfolio item}") **doubled meeting rate from 10% to 20%** in one campaign [SELF-REPORTED].
- **Eric (GEX)** [V-FILE]: a P.S. that removes friction ("That free test is really free and we can get it launched in less than 15 minutes on a call together") or adds a technical hook (see S20).
- **Jason Bay** [V-FILE]: "P.S. At a minimum, we work with thousands of [types of companies] and can share some insights you're free to steal."

### A7. Signature and formatting

- **Nick Cegelski** [V-FILE]: "Simplify your signature. Fancy signatures get routed to spam."
- **30MPC/Gong 85M+ (July 2025)** [V-FILE]:
  - "the better-formatted your cold email, the fewer replies you're going to get. There's one big exception: **Images. Cold emails with an image embedded see a 17% increase in replies.**"
  - Cut italics, bold and underline. Bullets "scream 'feature dump'". Links and attachments hurt deliverability.
- **Eric (GEX 2024)** [V-FILE]: "if an image will increase your response rate, you should test it". He uses screenshots of case-study results in the P.S.
- **Harvey** [V-FILE]: no bold, italics, bullets, headers or links in email 1 (report 05).
- **Agent synthesis:**
  - Email 1 is plain text.
  - **A single relevant image or screenshot is allowed in email 2 or 3 as a [TEST]** (supported by 30MPC +17%, Jed, and Eric).
  - Never bullets, except in the creative-ideas format.

### A8. Follow-ups (emails 2–4)

**Eric's sequence architecture (GEX 2024)** [V-FILE]:
- "For most campaigns, we send **4 emails** in a sequence at most. Your best performing email in your sequence is Email 1 and 2… All others have a MASSIVE drop off."
- Structure:

  | Email | Thread |
  |---|---|
  | 1 | New |
  | 2 | Threaded to 1 |
  | 3 | New |
  | 4 | Threaded to 3 |

  "The reason we don't follow up with everything in one thread is because That just reminds the prospect they didn't respond."
- **What each email does:**
  - **Email 2** adds the depth that was cut from email 1: how the case study was achieved.
  - **Email 3** lowers friction and **changes the value prop**, e.g. "if I were to make a video going over our process for you, would you watch it?"
  - **Email 4** is the "right person" check (S23).
- **"If email 3 has a better response than email 1, move that to email 1."**
- **Large markets (80K+ contacts) with yes-or-no offers** (selling a business, tax planning): send 2 emails, then move on. "Follow up is key in sales, but not in outbound marketing."
- **Reuse the list (TAM) every 3 months**, 2 months at minimum. "No one actually remembers a cold email."
- **TAM maths:** at 1 positive reply per 250 contacts, 10 meetings a month needs about 2,500 contacts a month.

**Eric's follow-up templates (`campaign-copywriting`)** [V-FILE]:
- **Rule:** never open with "Following up on my last note", "One more thought", "{{first_name}}, quick one" or "Just checking in". "Every email must stand alone."
- **Email 2:**
  - Whole offer: "{{first_name}}, from my experience, most [role] leaders are focused on [quick win]…"
  - Creative ideas.
  - Stats hook: "here's what we found about {{company_name}}: • … • … •".
- **Email 3 (new thread):** "question for {{first_name}}: when you took over at {{company_name}}, did you inherit [specific problem]?"; or a case-study story ("quick story. [Customer type] was struggling with…").
- **Email 4:**
  - (A) Redirect.
  - (B) Offer a resource: "last note from me… we have a quick guide on [topic]… Would it be useful if I sent it over?"
  - (C) Value bomb ("show and tell"): give them 3 real contacts pulled by your system. "No human wrote this email… Want to see a video of how I did this automatically?"

**Other follow-up evidence:**
- **Florin Tatulea** [V-FILE]: "40%+ of replies come after the 8th step in an outbound sequence" (2023, his own data; this conflicts with Eric's 4-email view). Context: Florin runs SDR teams with high-value accounts; Eric runs agency volume. **Agent rule: 4 emails for volume campaigns; longer multichannel sequences only for tier-1 accounts.**
- **Kyle Coleman** [V-FILE]: "'Bubbling this back to the top…', 'Checking in on my last email…', 'Making sure you saw…' — Every email touch should add value… None of these 'bump' emails do any of that."
- **Morgan Ingram** [V-FILE]: 🚩 "I just wanted to touch base and check-in with you real quick…". Good follow-up intros instead: "Noticed in the news lately that you all..." and "As I take a deeper dive into your organization...".
- **Conflict, Sam Nelson (2018)** [V-FILE]: one-line reply bumps ("Just seeing if you got this...") "consistently sends the open and response rate through the ceiling", because the personalized email stays visible underneath. Harvey (2026) agrees that 1–2 sentence bumps nearly double replies vs long re-pitches.
  - **Synthesis:** a *short* follow-up is good. A *content-free* one ("just checking in") is bad.
  - Allowed: a short follow-up that adds a new micro-reason or asks a new question.
- **Jason Bay: client-centric follow-up** [V-FILE]:
  - ⛔ "Are you still interested in the outbound accelerator program?"
  - ✅ "Staying on top of this for you. You mentioned that helping AEs self-source 30% of pipeline is the #1 priority. Is that still the case? Or did something more important come up?"
- **Smartlead benchmark** [V]: one email gets about 12 replies per 1,000 contacts, three emails about 25, seven about 40. Follow-ups bring 38% of replies in a 2-step sequence and 52% in a 3-step one.
- **Hunter 2025** [V]: campaigns with follow-ups 4.9% vs without 3.0%.

### A9. Breakup, "right person" and "bye for now" emails

- **Eric's email 4 / Greg Martignoni / Adam Rahmouni (2025)**, the same pattern posted by several people [V-FILE]:
  > Hi John,
  > With over 55 employees at the company, I understand this might not be your top priority.
  > Should I reach out to Mike, the Director of Sales?
  > Best, Greg
  > P.S. If this isn't relevant, let me know and I'll stop.

  "They work because you signal this is the last email… a follow-up should always: Add value, Or indicate you're done emailing." Eric: "Make sure you use that person's whole name."
- **Will Allred, "bye for now"** [V-FILE]: Kristina Finseth's data showed **12–15% reply rates** on a late-stage breakup [SELF-REPORTED]. "it's not a break up. It's a bye for now".
- **Florin Tatulea, one-sentence step 16** [V-FILE]: **2% reply rate on step 16 across 1,000 prospects**.
  - "If compensation management isn't top of mind right now, I'm happy to put this on the back-burner. Let me know either way"
  - "Throughout all this, I actually forgot to ask...are you the right person to be speaking with?"
- **Sam Nelson, "I don't want to be rude but"** [V-FILE]: adding that phrase to an old breakup email suddenly produced "passionate responses".
  - "In a breakup email it is better to be remembered than liked."
  - ⚠️ The email ("I've called you 6 times… I KNOW Outreach can be a game changer") is guilt-based. Harvey and Eric explicitly reject guilt and desperation. **[DO NOT USE AS DEFAULT]**; it's here as a contrast.
- **Harvey** [V-FILE]: a clean close. "sounds like the timing isn't right. Totally get it. If this ever becomes a priority, I'm around."

### A10. Before and after rewrites

1. **Will Allred, the "me me me" email rewritten with Safe Space** [V-FILE]: see S6/S7 in Part B. The before version opens with the Great Resignation, tells the sender's life story (cafés, juice stands, Hotel Olympia), and asks for 15 minutes. The after version is 5 sentences on their hiring and backfill problem.
2. **Eric (`campaign-copywriting`): 94 → 52 words** [V-FILE]:
   - *Before:* "Hey Sarah, I hope this email finds you well! I wanted to reach out because I noticed on your website that you seem to be selling to sales leaders and marketing executives. I saw that you recently raised a Series B and I had to assume you are probably using outbound tactics since I saw John Smith is a BDR on the team. I was wondering if you're thinking about how your team could be leveraging better data enrichment and GPT-4 to help make their prospecting more efficient?"
   - *After:* "Sarah, saw you sell to sales leaders. / Noticed John is a BDR on the team. Have you figured out how he could leverage better data and GPT-4 for prospecting, or still manual? / Most teams save 10 min per prospect and 3x volume without adding headcount. / Worth a look?"
   - *The three cutting passes:*
     1. Delete fluff (−20%).
     2. Compress sentences (−15%).
     3. Cut adjectives (−10%).

     Plus: no "that" or "which", active voice, numerals instead of words.
3. **Eric/Josh Braun, the tax reframe** (A3).
4. **Jason Bay, three preview-text rewrites** (A2).
5. **Josh Braun:** "ACME was able to reduce customer hold times by 46%" → "ACME reduced hold times by 46%." (A4).
6. **Kyle Coleman** [V]: cut 106 words from a cold email he received, down to 53. "50 words is a great target". The text itself wasn't retrieved.
7. **Harvey, a good vs bad first email and a good vs bad breakup** (report 05 §1.6).

### A11. Words and patterns: what lifts and what kills

| Lifts replies | Kills replies |
|---|---|
| A specific, checkable observation in line 1 (Coleman, Braun, Jason Bay) | "Based on your title", "I saw your profile", "Sorry to bother you", "My company does…" (Coleman) |
| Prospect's own words for the pain (Braun, Orlob) | Informative tone: **−26% replies** (Lavender, via Allred [V-FILE]) |
| Conversational, slightly ungrammatical (Braun) | Formatting (bold, italics, bullets) (30MPC 85M) |
| One image in a follow-up (+17% replies; 30MPC) | "AI" in the subject (−17% opens; 30MPC) |
| Real, precise numbers (3.72x beats 4x) (Eric) | Round, unbelievable claims ("increase sales 120%!!!") (Eric) |
| A hedged hypothesis ("curious if I'm wrong to guess") (Allred) | "I hope you're doing well", "My name is Jason and I'm with…", "This is my fourth attempt" (Jason Bay) |
| A "they did this, are you?" competitor tease (vendor; test) | Deceptive bait (Eric's "my friend needs this" test, which he regrets) |
| Detachment: "Either way, thanks for reading", "let me know and I'll stop" (Coleman, Martignoni) | Neediness ("Please, please, please, respond") (Braun) |

**On spam words vs reputation:** Eric (GEX 2024) says spammers use words like "Free" and "Guarantee", so avoid them, and that reputation and behaviour matter more than words (report 03, report 05 §4.1). His `spam-word-checker` skill in `../sources/` has the full banned list.

**Response-rate ceilings (Eric, GEX 2024)** [V-FILE]: "I believe the max response rate of a campaign is 30%."
- His evidence: a deceptive "can you confirm you do X" test got 10%; a free gift with a wrong address got 11%; a free Forbes interview offered 3 days before a conference got 30%. "All positive."
- **"On average across all of our customers, we get a positive response for every 350 contacts we reach out to."**
- Campaigns posting huge numbers are usually "a super niche list or an event coming up" or "giving away something for free that is a no brainer."

---

## Part B: Swipe library (verbatim emails)

Each entry has the source, date, a framework label, the claimed result, and a one-line teardown. The agent should **study why each works, not copy it word for word**. Replace every placeholder with real data. Entries marked ⚠️ are anti-examples or need adapting.

### S1. Josh Braun: 4T, full email (2022) [V-FILE]
Source: [LinkedIn](https://www.linkedin.com/posts/josh-braun_heres-a-cold-email-copywriting-framework-activity-6963097038074880000-uqFf). Framework: **Truth → Think → Third-party → Talk**.
> James, noticed your SDRs target HR/Benefit Directors in companies > 500 employees.
>
> Have you tried reverse engineering high-performing cold emails to boost response rates?
>
> 4k+ reps are seeing an uptick. It involves a guide with copywriting + underlying psychology of cold emails with proof of positive responses you can steal.
>
> Here's a peek.

**Teardown:**
- Opens on a fact about their team, then asks a status-quo question.
- Peer proof follows, and the CTA offers a "free taste" instead of time.

### S2. Josh Braun: before/after story, Datarails (2024) [V-FILE]
Source: [LinkedIn](https://www.linkedin.com/posts/josh-braun_cold-email-tip-let-your-customers-write-activity-7165457730516824064-hZCB). Framework: **Before story → After story → soft question**.
> Kim,
> You shouldn't have to manually map financials from QBO, put them in a spreadsheet, and change all of the formulas to complete financial close.
>
> CFOs use Datarails to download reports in a day. No adjusting, mapping, calculating, or recalculating data. Use your Excel models without having to change anything.
>
> Think this might help?

**Teardown:**
- The pain is described in the customer's own words, specific enough to feel "fly on the wall".
- The after state is concrete. About 50 words.

### S3. Josh Braun: detached expert question, Pop Card (2023) [V-FILE]
Source: [LinkedIn](https://www.linkedin.com/posts/josh-braun_do-cold-email-ctas-sound-needy-cold-emails-activity-7089925816607731712-iC4Q). Framework: **Observation → hidden problem → expert question (no CTA)**.
> Hey James - I saw that Mario's has four positive Google reviews. Some customers don't leave a review because it takes too much time or because they don't know where/how to post it on the Internet.
>
> Have you looked into Pop Card?

**Teardown:**
- Uses a checkable public fact and names a problem the owner didn't know they had.
- Ends with zero neediness. **[TEST]** against an interest CTA.

### S4. Josh Braun: context opener, Descript (2023) [V-FILE]
> Josh, looks like you're using Logic, Zubtitles and Headliner to edit and promote your podcast. Have you tried Descript?

**Teardown:** shows why *this* person (social loafing: people act when they feel uniquely qualified). Two sentences.

### S5. Josh Braun: crispy specifics, fleet telematics (2023) [V-FILE]
> John, noticed you have a fleet of 23,500 in the EU and a goal of reaching zero emissions by 2025. DHL reduced fuel consumption by 10% across their grey fleet. Have you looked into in-cab feedback?

**Teardown:** exact numbers about them, an exact peer result, and a curiosity question. "When you're crispy, you're more believable."

### S6. ⚠️ Will Allred: the "before", a "me me me" email (2021) [V-FILE]
Source: [LinkedIn](https://www.linkedin.com/posts/williamallred_yesterday-i-showed-a-cold-email-using-bar-activity-6873960117277118464-bCrc). An **anti-example**.
> Will,
> The almost two year lockdown has triggered a large increase in resignations of people seeking a new direction in life.
> I'm willing to bet that the Food and Bev Industry has also seen an exodus of some key players.
> Have you had a key person leave?
> Are you looking to hire some great "A" players for 2022?
> I started in this industry when I was still at school helping my Mum and Dad in their cafes and restaurant. […]
> Are you open for a quick 15 minute chat to see how we could help?

**Teardown:** "ME, ME, ME, MY STORY". Buzzy terms, two questions, and a 15-minute ask.

### S7. Will Allred: the "after", Safe Space rewrite [V-FILE]
Framework: **Observation → Problem → Safe Space → Solution → CTA**.
> Hey Will,
> Saw you're hiring for several different roles. Curious if I'm wrong to guess that a % of that will be to backfill roles.
> We're seeing this across the board with recruiting leaders in Food and Bev.
> They need to keep growing, but they're now also having to account for folks leaving.
> We've been helping folks in your space find great talent.
> Worth a chat to see how we can help your team?

**Teardown:**
- A hiring trigger plus a hedged hypothesis.
- "You're not alone" (peer safety), then restating the problem in their terms. The "%" sign is a deliberate pattern break.

### S8. Will Allred: "The Mouse Trap" (2022) [V-FILE]
Framework: **Personalized trigger → value-prop question** (1–2 sentences).
> Will, looks like you're hiring reps.
> Would it be helpful to get a more granular look at how they're ramping on email?

**Teardown:** "Painfully short… Drives an impulsive reply based on priority & curiosity." Ideal for email 2 or for mobile.

### S9. Will Allred: closed-lost opportunity, new leader (2024) [V-FILE]
Source: [LinkedIn](https://www.linkedin.com/posts/williamallred_big-fan-of-usergems-over-at-lavender-activity-7176927308073553920-JqBB). Framework: **Context of the last conversation → what changed → defer option**.
> Hi ~~~,
> Spent time with your team last August. Wanted to see if it made sense to reconnect given you've been in seat for a few months.
> When we spoke the team was at capacity. Focus was on their SEP migration. Tack on spinning up a new dialer. That's a lot.
> Given your background of working with bigger orgs, I imagine {CEO's first name} brought you on with even more ambition to scale.
> Pipeline seems to be on everyone's mind. We can help make email an understandably better channel for that.
> Given your technical personas, I imagine that would be a huge win for your 2nd quarter.
> Would you open to chat? I can also reach out to Julia if you think she'd be better to run this.

**Teardown:**
- A warm-ish re-engagement: the reason it closed-lost, then the new leader as the trigger.
- Offers a redirect to another person. Longer, but "short and choppy" sentences.

### S10. Will Allred: "bye for now" breakup (2023) [V-FILE]
> Hey Kristina -
> With the team's expansion, I thought it might be the right time to dig deeper into why email is working for outbound.
> I'll chalk it up to my timing being off. Would love to know if I've got it all wrong. But, I'll stop by outreach for now.
> Thanks!

**Teardown:**
- Gives the story closure and takes the blame ("my timing").
- Invites correction. 12–15% reply rate reported [SELF-REPORTED].

### S11–S14. Eric Nowoslawski: 4-step Clay + GPT-4 sequence for Taplio (2023) [V-FILE]
Source: [LinkedIn](https://www.linkedin.com/posts/outboundphd_i-used-clay-and-gpt-4-to-write-a-4-step-email-activity-7075515676223754240-q2Zv). First positive reply came within the first 25 emails [SELF-REPORTED].

**S11, Email 1:**
> {{First name}} – Saw one of your recent LinkedIn posts about {{AI generation}}. Seems like the last time you posted was {{number of days}} days before that though.
>
> If you're trying to build your brand on LinkedIn, have you considered using a scheduling tool?
>
> Our scheduling tool can help write your posts and help you monitor social trends that you can riff on as well.
>
> Let me know if this would be useful to you and I can send over access!

Teardown: the data point *is* the problem (inconsistent posting).

**S12, Email 2 (threaded):**
> {{First Name}} – I just saw your post about {{AI generation}}. It reminded me to follow up and see if you saw this!

Teardown: "I despise follow ups that don't add value". The new post gives a real reason to follow up.

**S13, Email 3:**
> {{First Name}} – I keep seeing your content online so I made some more post ideas considering what your company does and how you promote it.
> {{Creative Ideas}}
> This is just some examples of what our AI can generate for you (and you haven't even given it your insights yet!)
> Let me know if I could send over some access for you to try it out.

Teardown: show, don't tell.

**S14, Email 4:**
> {{First Name}} – just like how Facebook pages killed their organic reach, it can be expected that LinkedIn will do the same one day.
> I saw your LinkedIn company page had {{number of Followers}} followers and you had about {{number of followers}} followers.
> As you are building your following, are you maximizing the platform's organic reach before it gets oversaturated?
> We helped companies like Lemlist and Outreach double down on their social content with our analytics, scheduling, and content generation tool.
> Could I send you access to try it out?

Teardown: an analogy-based loss frame, their own numbers, and peer logos.

⚠️ Exclamation marks and "Let me know if…" CTAs are from 2023. Eric's 2026 skill bans weak CTAs, so modernize them.

### S15–S17. Eric Nowoslawski: GEX "basic template" × 3 offer types (GEX Wrapped 2024) [V-FILE]
"These are actually real variations of emails that we send that get positive responses every day." The subject for all three is **"cheers to the role"**.

**S15, Make more money:**
> Hey {{first_name}} - LinkedIn told me you took over the VP of Sales role at {{company_name}}. I did some digging and saw you don't have an SDR team yet.
> Do you have a plan to build pipeline with such a lean team?
> In the past year, we've helped companies like Prospeo build over $3M in pipeline selling a $99 product with our outbound service that's half the cost of an SDR.
> We always start with a free test to validate your offer works with cold email.
> If we could help you generate pipeline for 2025, would it be useful to connect?
> P.S. That free test is really free and we can get it launched in less than 15 minutes on a call together. Just to test out for you if cold email is a channel you should jump into.

**S16, Save money:** identical, but line 2 becomes:
> Have you thought about outbound automation so you can save money from hiring a team of SDRs?

**S17, Save time:** line 2 becomes:
> Do you have any outbound systems running yet or are you looking to get started?

and the proof becomes:
> Last week alone, we helped Boundless Macs, Donut, and Reputation Cure validate that they could get leads with cold email by launching a free campaign for them on one 30 minute call.

and the CTA adds:
> …without sinking tons of time into getting things started…

**Teardown:**
- **The same email, with one line swapped per offer type.** This is how to A/B test offer framing.
- Trigger: new in role plus no SDR team. Then a poke-the-bear question, specific proof (a $3M pipeline on a $99 product), and a free-test risk reversal. The P.S. removes friction.

### S18. Eric: free lists offer (GEX 2024) [V-FILE]
> Subject: list?
> Hey {{first_name}} – saw you had folks like {{employee name mention}} as SDRs on the team and had to figure you were doing some cold emailing.
> We help companies generate more opportunities with cold email and the most popular list is a list of the people in their target market who are newly hired in their roles.
> Looks like you target {{job titles}}.
> Would it be useful if I made a list of these folks and sent it to you?

**Result:** "worked a little better and had some scale to it but was very hard to convert people to a meeting." **Lesson:** a lead magnet needs a **straight line to cash**.

### S19. Eric: free campaign launch, the winner (GEX 2024) [V-FILE]
> Subject: more customers like {{case study}}?
> Hey {{first_name}} – saw that work you did with {{case study}} and wanted to connect.
> We help companies get leads with emails just like this and everything starts with a free campaign.
> We launch the campaign for you and give any leads generated straight to your inbox.
> We've already done this for 7 companies last week and wanted to see if we could run a test for you.
> Want to meet next week about what a test could look like?
> P.S. How you helped {{insert how they helped the case study}} was a great showcase of your value props. Would be great to feature that in the test!

**Result:** "Much more responses here… I very intentionally made an offer that people couldn't refuse and to do this scalably has taken me 4 months of effort."

### S20. ⚠️ Eric: free deliverability audit, a loser (GEX 2024) [V-FILE]
> Subject: emails in spam?
> Hey {{first_name}} – saw you had folks like {{employee name mention}} as SDRs on the team and had to figure you were doing some cold emailing.
> I ran a report and saw your domain doesn't have DMARC on it and that could lead to some problems when your team is sending cold emails (and your exec team is speaking to customers).
> We send 1.5 million emails per month on behalf of our customers.
> Would it be useful to meet and we can do a free deliverability audit to make sure your team is landing in the primary inbox?
> P.S. the reason I point out the DMARC is because if you send an email to someone that has their policy enabled and you don't, your emails instantly go to spam. Turning it on takes 5 minutes.

**Result:** "not a winner… People just didn't really care about the audit." **Lesson:** a real, specific problem is not enough if the reader isn't *aware* of the pain. Problem awareness matters.

### S21. Eric: generic baseline that fails (GEX 2024) [V-FILE]
> Subject: growth
> Hey {{first_name}} – when you brought Sam and John onto the team as SDRs last month, could I assume that adding pipeline for Acme Corp. is a priority?
> We've helped over 100 companies add pipeline in the last 2 years with our cold email system.
> Want to chat about how we could help you do the same?

**Verdict (Eric's own):** "How many of you would respond to that email though? I wouldn't… that basic message has been sent over and over again." **Lesson:** a good structure can't save a saturated value prop. Chunk up or down, or reframe it (A3).

### S22. Eric: email 4, "right person" [V-FILE]
> {{first_name}} – I know there's about {{employee count}} employees over at {{company_name}} and perhaps {{job to be done}} is not your responsibility. Should I reach out to {{name other person on team}} instead given their role?

**Teardown:** signals the end of the sequence and looks hand-made because it names a real colleague.

### S23. Greg Martignoni / Adam Rahmouni: breakup (2025) [V-FILE]
> Hi John,
> With over 55 employees at the company, I understand this might not be your top priority.
> Should I reach out to Mike, the Director of Sales?
> Best,
> Greg
> P.S. If this isn't relevant, let me know and I'll stop.

**Teardown:** Eric's email 4, plus an explicit opt-out in the P.S. It's both compliant and disarming.

### S24. Eric: "case study overwhelm" (GEX 2024) [V-FILE]
> Hey {{first_name}} – are you looking for more ways to scale your outbound without hiring more people?
> We've helped over 125 customers in the last year do that and I think we could help you as well.
> I know you get emails like this all the time, so I'll just drop our past work in the P.S. and if any of it is of interest to you, maybe we can connect Tuesday this week.
> Signature
> P.S. Here's just some case studies we accomplished in 2024.
> FlipCx closed a $385k deal from the system we set up for them.
> We helped Instantly.ai generate $4.2M in pipeline in 2024.
> This is what Owner.com said about the leads we generated for them. [screenshot]

**Teardown:**
- The body stays short and the proof sits below the fold.
- "I know you get emails like this all the time" is the disarm line Jed Mahrle also reports lifts replies.

### S25. Florin Tatulea: step-16 one-liners (2023) [V-FILE]
Source: [LinkedIn](https://www.linkedin.com/posts/florintatulea_sales-outbound-prospecting-activity-7069742022873546753-XCZ1). **2% reply rate at step 16 across 1,000 prospects** [SELF-REPORTED].
> "If compensation management isn't top of mind right now, I'm happy to put this on the back-burner.
> Let me know either way"

> "Throughout all this, I actually forgot to ask...are you the right person to be speaking with?"

### S26. Josh Braun's "not interested" reply, via Florin (2023) [V-FILE]
Reportedly gets about 50% of "not interested" people to respond [SELF-REPORTED].
> "Totally understand. I'm sure you probably get dozens of emails offering solutions to help with compensation. And I'm sure you delete most of them.
>
> Here's my ask. (And I know it's an ask because you don't owe me anything). Is timing off, or are you highly skeptical that a tool can handle the complexities of your compensation structure?"

**Teardown:**
- Validates the objection and admits the imbalance ("you don't owe me anything").
- Then offers a two-option diagnostic question. Use it in the `cold-email-replies` skill.

### S27. Jason Bay: past-employee-of-a-customer play (2023) [V-FILE]
Source: [LinkedIn](https://www.linkedin.com/posts/jasondbay_sales-prospecting-outbound-activity-7038856467197624320-FzcG). Result: booked an intro call with Birkenstock [SELF-REPORTED].
> Curious if you remember [your company] from your time at [current client]?
> I imagine a huge focus for you right now is [typical priorities for your persona].
> As you know, with [area your solution helps] it's difficult to [problem].
> [social proof and example customers] are using our help to [outcomes].
> Open to learning more?
> [your name]
> P.S. At a minimum, we work with thousands of [types of companies you help] orgs and can share some insights you're free to steal.

**Teardown:**
- A familiarity trigger (they used you before), then an "I imagine" priority line.
- The P.S. offers a free deposit (insights).

### S28. Nick Abraham: risk-minimizer CTA email (2023) [V-FILE]
> If I could generate meeting-ready leads on a performance basis, would you be interested in speaking?

Formula: "If I could {generate X result} {risk minimizer} would you be interested in speaking?" Teardown: the whole offer and the risk reversal fit in one sentence. Pair it with a trigger first line.

### S29. Howie Busch: "75% response" product pitch (2017) [V-FILE]
> SUBJECT: New Product
> Hi John, nice to "meet" you.
> I'm a product developer and I've developed a cool product that solves the problem of __________. I think it fits in really well with ABC's product line.
> If you're open to learning more, I'm happy to send over a Sell Sheet. Looking forward to seeing if you agree it's a good fit for you guys.
> Thanks John!

**Teardown:**
- Works in a niche where retailers *want* new products to stock.
- The permission-based CTA ("happy to send over a Sell Sheet") is strong. ⚠️ It opens with "I" and has an exclamation mark, so it's dated (2017). **Use the CTA idea, not the opener.**

### S30. Sameer (agency): Facebook ads email, "475 meetings in 90 days" [V-FILE]
Framework: **opening line → value prop → case study → CTA**.
> Hey {{firstName}}, I came across {{companyName}}'s ad on Facebook, and wanted to reach out...
> If your advertising isn't netting you a 2x ROAS at minimum, I noticed a few tweaks you can make to improve your Facebook ads which will increase your results.
> For context, we helped another business similar to {{companyName}} called XYZ, increase their ROAS from 0.7x to 3.4X in 30 days. Generating them an extra $30,000 in revenue.
> Open to a call where I can share the Facebook ad tweaks I had in mind for you?

**Teardown:**
- Strengths: a specific threshold (2x ROAS), a precise peer result (0.7x → 3.4x in 30 days), and a call framed as *getting* value.
- ⚠️ "I came across… and wanted to reach out" is a banned opener. Rewrite it as "Saw {{companyName}}'s Facebook ad for {{product}}."

### S31. Chris Orlob: 4-part Gong-style email (assembled from his post) [V-FILE]
> Looks like you're hiring across your revenue org — congrats.
> You either hit your headcount targets and sacrifice quality… Or you hire strong reps but miss your number.
> We've helped 100+ VPs reduce their miss-hire rate to single digits.
> Is reducing sales mis-hires this quarter worth a quick chat?

**Teardown:**
- A dilemma ("either… or…") makes the pain vivid.
- The proof is an outcome, not a feature. A yes/no "Solve" CTA.

### S32. Jason Bay: preview-text openers (2023) [V-FILE]
> See this? The chatbot on the Canada Goose page doesn't work after 6pm PT.

> Jason—you mentioned that digital sales were down 13% this last quarter.

> Jason—how's the search for a freelance podcast/video editor going?

**Teardown:** they read like internal messages, and the preview alone earns the open.

### S33. Jacob Tuwiner (Experiment 27): Berman-school template (2021) [V-FILE]
> Hi {first name},
> {custom first line}
> {your one sentence case study mentioning a company like theirs, how you helped them and the result}
> {call to action asking for a meeting}

Plus "PS, awesome work with {portfolio item}", which doubled meetings from 10% to 20% in one campaign [SELF-REPORTED]. ⚠️ Modern CTAs ask about interest, not for a meeting.

### S34. Heather Morgan: three subject lines (2015) [V-FILE]
- "how competitive is {!Company}'s sales team?" (45.5% opens)
- "10x {!Company}'s traction in 10 minutes" (16 customers)
- "Question about employee loyalty at {!Company}"

⚠️ These are long by today's 1–4 word norm, and the open rates predate Apple's Mail Privacy Protection. They're useful only as **loss and curiosity patterns**.

### S35. Vendor template: competitor tease ("1-2 Punch", Maildoso-sponsored) [V-FILE]
> Subject: "They just did this. Are you?"
> Hey [First Name],
> Saw [Competitor] pull off [Specific Result] in [X weeks]—without the usual headaches.
> Made me wonder if [Company] is already doing this, or if you want the breakdown.

**Teardown:** a competitor result creates FOMO and the CTA offers info. **[TEST]**. ⚠️ Never invent a competitor's result; use it only with a real, public one.

### S36. Signal relevance line (anonymous LinkedIn "top content") [V-FILE]
> Noticed you just rolled out HubSpot and are hiring a RevOps lead. That shift often breaks lead routing. We've helped a similar team boost SQLs by 32% in 30 days — want me to walk you through it?

**Teardown:** two stacked signals (tech plus hiring), then the implied problem, specific proof and an offer CTA. ⚠️ Harvey's rule says use ONE signal, so test it.

### S37. ⚠️ Eric: deceptive "my friend" test (GEX 2024), an anti-example [V-FILE]
> "Hey I saw you help people {{in some way generated by AI}}. My friend is looking for help with that. Can you confirm that's what you do and I can connect you?"

**Verdict (Eric's own):** "we were lying and baiting for a response… I'm never going to do this again." It got 10% replies (all positive) even with the bait. **Lesson:** deception doesn't even beat honest no-brainer offers (the 30% Forbes interview). **Banned for our agent.**

### S38. Eric: Forbes speaker campaign (2023) [V-FILE]
The offer was a free interview with Forbes, at the Forbes booth, at a conference the speakers were attending in 3 days. **48% response rate** in the LinkedIn post; 30% in GEX Wrapped. "No AI written lines. No fancy copy. Just a list of speakers and the offer… nothing is more important in your cold outreach than putting an offer in front of someone that is a no brainer."

### S39. Taylor Haren: Retention.com waitlist launch (2024) [V-FILE]
2,116 emails sent → 34 sign-ups. **2.65% reply rate, under 1.7% bounce rate, more than 60% of replies positive** [SELF-REPORTED]. Infrastructure: 34 domains on Microsoft Outlook licences. "The clients offer is king 👑" (a free tool that identifies anonymous website visitors). Related: a Taylor Haren test of 873,641 emails across 26 variants reportedly found **AI personalization made no measurable difference**, with the most granular personalization often performing worst [V, SELF-REPORTED, unverified].

### S40. Michel Lieben: "give first" list campaign (2025) [V-FILE]
"How it started: 4,000 cold emails sent. 1 lead generated. How it's going: $4M+ ARR."
- For recruitment firms, he built the list of Talent Acquisition Directors at companies hiring for 10+ roles and **sent it to them along with a tutorial**.
- "Think about the first thing you would do for them if you signed them as clients. And do it already… for free."
- "When I start a new outreach campaign, I manually write 25 messages, 1 by 1… you uncover patterns, that you can later on scale with the help of tech & AI."
- Deliverability: under 50 emails a day per mailbox, SPF/DKIM/DMARC, **no open tracking**, secondary domains, warmup.

### S41. Mark Colgan: segmentation for 13–17% replies (2023) [V-FILE]
"It all comes down to list building and segmentation (to increase relevancy)."
- Campaigns ran 82 to under 400 prospects each; the lowest reply rate was **13.2%** [SELF-REPORTED].
- He builds 6–10 triggers or segments per client:
  - new role
  - hiring in their department
  - attended the same event
  - engaged with an aligned influencer
  - new tech
  - new office
  - an industry with a case study
  - a size band
  - ad spend
  - traffic
- "don't track open rates these days". "you can skip the trashy AI icebreakers for now though. Please."

### S42. Kyle Gawley: event-specific subject (2015) [V-FILE]
"Tickets for Break Conference 2015 in November": 50% open rate, 29% response, 5% conversion [SELF-REPORTED]. **Lesson:** a subject that names the prospect's own event or product is the strongest relevance signal. ⚠️ The rest of the email (photo, bullets, links, "Hello from Belfast!") is from 2015 and fails modern deliverability rules.

---

## Part C: Rules this research adds or changes

1. **Use the email-4 "right person" pattern by default:** employee count, "perhaps not your responsibility", a named colleague, and "let me know and I'll stop" (Eric, Martignoni).
2. **Use 4 emails as threaded pairs (1 new, 2 threaded, 3 new, 4 threaded)** for volume campaigns, rotating the offer type between them. Send 2 emails for huge yes-or-no markets. Re-touch the list every 3 months.
3. **Test one offer type per variant:** the same email with one line swapped for save time / make money / save money (S15–S17).
4. **The subject test control set:** "question for {{first_name}}", "{{company}} <> {{us}}", "{{trigger}}" (e.g. "cheers to the role"), plus "quick question" as a control only.
5. **Write the preview text as an internal note.** No "Hi Jason," lead-in; start with the observation or problem (Jason Bay).
6. **Pain beats product.** The product may be absent from email 1 (Orlob, Harvey). Reframe the market assumption when replies stall (the tax example).
7. **Use precise numbers** (3.72x, 23,500 vehicles), matched to the prospect's size (Eric, Braun, Cegelski).
8. **P.S. lines are a slot to test:** poke the bear, future pacing, a deposit, a testimonial, or removing friction (Braun, Orlob, Eric).
9. **Images:** none in email 1. Test one relevant screenshot in email 2 or 3 (30MPC +17%; Eric).
10. **Short follow-ups, never empty ones.** One or two sentences with a new micro-reason (Allred's Mouse Trap, Florin's one-liners); never "just checking in".
11. **Plan around the ceiling:** about 1 positive reply per 250–350 contacts at scale (Eric). A higher rate means a niche list, an event, or a no-brainer offer, so look for those.
12. **Never use deception** (fake friends, fake Re:, fake videos). Eric's own test shows it isn't even necessary.

## Part D: Gaps

- Not retrieved:
  - Image-only LinkedIn emails: Kyle Coleman's "best two cold emails", Josh Braun's teardown screenshots, and Nick Abraham's "never stops working" script and 5 subject lines.
  - Sam Nelson's Agoge sequence copy, which he withheld "for competitive reasons".
  - The text of Kyle Coleman's 106→53 rewrite.
  - Nick Abraham's "Obvious Yes" steps.
- Eric's **GEX Wrapped 2023** (17K words) contains 3 more full sequences (GEX "Outbound edge" with a creative-ideas email and "show and tell", Taplio, and others). Only its outline was used here; mine it next with `cold-email-learn`.
- Saraev's own copy examples are still pending the remaining Nick Saraev Daily transcripts ("the cold email copy that's going to kill it in 2026", "how to personalize cold emails without AI slop", "\"quick question\" is killing your cold email").
