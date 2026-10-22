# The Cold Email Playbook

This is the knowledge base the `cold-email-master` agent and its `cold-email-*` skills work from. It combines what the strongest cold email practitioners teach with what the 2025–2026 data shows. Every rule traces back to the sourced research in [`research/cold-email/`](../research/cold-email/):

- `01-nick-saraev.md`
- `02-creators-and-benchmarks.md`
- `03-deliverability-compliance-psychology.md`

Some sources are tagged in the text: **[DATA]** is a measured study, **[CONSENSUS]** means three or more practitioners agree, **[CREATOR: name]** is one practitioner's method, and **[TEST]** means the sources disagree, so treat it as an A/B variable.

> **Status:** v1, built from web research (search extracts). The next version will be grounded in full video transcripts once they are in `research/transcripts/` (see `tools/yt-transcripts/`). Run the `cold-email-learn` skill to fold them in.

---

## 0. The one-sentence philosophy

**A cold email is a short, relevant note from one peer to another. It names a problem the reader probably has and asks a small yes/no question. Its only job is to start a conversation, not to close a sale.**

Every rule below follows from this:

- **Short:** they owe you nothing, so respect their time.
- **Relevant:** "why you, why now" has to be true.
- **Peer to peer:** it must not read like marketing.
- **Problem, not pitch:** they care about their world, not your product.
- **Small yes/no ask:** lower the cost of replying to almost zero.

---

## 1. The hierarchy of what moves results

Work from the top. Fixing a lower layer can't rescue a broken higher one.

| # | Layer | Why it ranks here |
|---|---|---|
| 1 | **Deliverability** | An email in spam has a 0% reply rate. Gate everything on this ([03 §A](../research/cold-email/03-deliverability-compliance-psychology.md)). |
| 2 | **List / targeting (who)** | The right person with a real, timely trigger: 18% vs 3.4% replies when a trigger event is referenced **[DATA: Backlinko via Leadspace]**. Saraev: one positive reply in 20,000 sends means "a copy **or audience** problem". |
| 3 | **Offer (what)** | "The offer matters more than personalization" (Eric Nowoslawski, Hormozi, Jed Mahrle) **[CONSENSUS]**. Saraev: "I'll save you time" is weak. Sell ROI with proof, or remove risk. |
| 4 | **Relevance / angle (why you, why now)** | Langer (1978): a real reason gets compliance on a big ask; a fake one doesn't **[DATA]**. |
| 5 | **Copy** | Length, clarity, CTA. Pitching cuts replies by up to 57% **[DATA: Gong/30MPC, 85M emails]**. |
| 6 | **Sequence** | About 42% of replies come after email 1 **[DATA: Instantly 2026]**. |
| 7 | **Personalization depth** | It multiplies a good offer and can't fix a bad one ("a multiplier, not a miracle worker", Nowoslawski). |

Diagnose a struggling campaign in this order (Saraev's layered diagnosis):

- Bounces or spam placement → layer 1.
- Replies but no positive ones → layers 2–3.
- 1,000+ sends with zero meetings → messaging (layers 3–5).

---

## 2. Hard rules for every first-touch email

These are defaults. Break one only for a stated reason.

### Format
1. **Body 40–90 words; never more than 120.** Gong: under 100, in 3–4 sentences. Instantly's elite senders: under 80. Lavender: 0–50 words get +23% replies. Hunter: 20–39 words have the highest average **[DATA]**.
2. **Reading level grade 3–7.** Lavender: 1.66x replies. Boomerang: third-grade level had a 53% response rate **[DATA]**. Use short sentences and common words.
3. **Mobile first.** About 80% of cold emails are opened on a phone (Lavender). No paragraph longer than 2 lines on a phone, and a blank line between ideas.
4. **Plain text.** No HTML, images, attachments or tracking pixels in email 1. **No links in email 1**, including no calendar link.
5. **One idea, one problem, one CTA per email** **[CONSENSUS]**.
6. **At most one question mark**, ideally the CTA. More than one question hurts (Lavender 2024).

### Subject line
7. **1–4 words, lowercase or sentence case. It should look like an internal email from a colleague** (Gong/30MPC; Lavender: two words is optimal) **[DATA]**.
8. No question marks, no punctuation tricks, no emojis (Lavender: questions in the subject −56% opens).
9. **Banned subjects:** "Quick question", "Thought this might be useful", fake "Re:"/"Fwd:", an empty subject, ALL CAPS, anything salesy ("Partnership opportunity", "Grow your revenue"). Berman now says "quick question" reads as automation. Fake "Re:" got +15% opens but −62% replies (unverified).
10. Good patterns:
    - `{first name}` or `{first name} + {company}` (Jed Mahrle)
    - `{their initiative}` (e.g. `new sdr team`)
    - `{trigger}` (e.g. `series b`)
    - `{peer company} + {company}`
    - `idea for {company}`

### Opening line (the first 1–2 lines, which also show as preview text)
11. **Start with them, not you.** Never "My name is" or "I'm reaching out because".
12. Use a **specific, checkable observation or trigger**, not a compliment. Braun: generic compliments "feel insincere". Business and activity signals beat personal trivia; executives don't care about your alma mater line (Gong/30MPC).
13. Becc Holland's premise ranking, best to worst:
    1. something they wrote or said
    2. a company initiative or trigger
    3. role or cohort relevance
    4. the "junk drawer" (hobbies, school), used last and only if it's real
14. A strong opener connects the observation to the problem: "Saw you're hiring 4 SDRs → usually means pipeline targets just went up." (This is Braun's "If A, then B is probably true".)

### Body
15. **Problem-first.** Name the problem or likely loss in neutral, non-accusatory words ("not sure if this is on your radar…"). Loss framing beats gain framing (Kahneman & Tversky) **[DATA]**.
16. **One proof line**: a specific peer client, a specific result and a specific timeframe, matched to the prospect's segment (Berman: "if you're targeting restaurants and your case study is a SaaS company, you've lost them") **[CONSENSUS]**.
17. **No pitch, no feature list, no buzzwords.** Ban: "AI-powered", "platform", "solution", "leverage", "synergy", "cutting-edge", "game-changer", "revolutionize", "streamline", "ROI" without a number. Gong: pitching −57%; emails with the word "AI" saw lower replies (secondary). *If you sell AI automation, describe the outcome, not the technology.*
18. **Count "you" against "I/we".** The reader should appear more often than the sender.

### CTA
19. **Ask for interest, not time, in email 1.** Interest CTA 30% vs specific time 15% vs open-ended 13% **[DATA: Gong, 304K emails]**. Use specific times only once they've shown interest (reversed in late stage: 37%).
20. Use closed yes/no questions:
    - "Worth a conversation?"
    - "Open to hearing more?"
    - "Opposed to a quick look?"
    - "Want me to send it over?"
    - "Is this on your radar?"
21. Offer-based CTA (give them something) **[TEST]**: "Want me to send the 3 ideas?" A secondary report of the 85M-email data says offer CTAs beat interest CTAs 4x. A/B test it against an interest CTA.

### Tone
22. **Peer to peer, "rawer and more personal" (Saraev).** Write it the way you'd text a respected colleague: contractions, no formality, no exclamation marks.
23. **Detach from the outcome (Braun: "sorting, not selling").** Make it easy to say no: "If not a priority, no worries."
24. **Banned openers and filler:**
    - "I hope this email finds you well"
    - "I hope you're doing well"
    - "My name is…"
    - "I wanted to reach out"
    - "I came across your profile"
    - "Just following up" / "just bumping this"
    - "Circling back"
    - "touch base"
    - "As per my last email"
    - "Let me know if you're interested"
    - "I'd love to…"

    The full list is in `cold-email/lint_email.py`.

### Signature
25. Name, title, company. Nothing else in email 1: no logo, no social links, no quotes. Add compliance lines per §7.

---

## 3. Frameworks (the agent picks one per angle)

All of these produce the same shape: **opener about them → problem → proof → small ask.** Pick based on what data you have.

| Framework | Source | Structure | Use when |
|---|---|---|---|
| **Icebreaker → Pitch → Proof → CTA** | Saraev (2025, own blog) | AI-researched personal opener (multi-line) → one-line elevator pitch → social proof → CTA | You can scrape their website (the deep personalization pipeline, §5) |
| **Logistics → Background → Case study → Risk reversal** | Saraev (older 4-step) | Where you found them and why it matters → who you are → case study → low-risk offer or guarantee | Agency or services offers; strong guarantee available |
| **Compliment → Case study → Ask** | Alex Berman | A specific (not generic) observation → specific client + result + timeframe → "Worth 15 min?" | You have a killer, segment-matched case study |
| **4T: Truth/Trigger → Think → Third-party → Talk** | Josh Braun | Factual trigger ("If A, B is probably true") → neutral question that makes them think → light credibility → "Worth a conversation?" | Status-quo prospects; you need to poke the bear without pitching |
| **Premise → Bridge → CTA** | Becc Holland | Premise from what they said or did → bridge to the value prop → one CTA tied to the premise | Top accounts; they've published content |
| **Show Me You Know Me** | Sam McKenna | Hyper-specific subject → "We've yet to be properly introduced, but I'm…" → bridge → ask | Tier-1 executives, low volume, high deal value |
| **Creative ideas** | Eric Nowoslawski | Three specific ideas for how you'd help *their* business (AI-generated from their data) → "Want me to expand on any?" | Agencies or consultancies; scales with Clay/AI research |
| **Diagnostic question** | Jed Mahrle (#147) | Opening question that exposes a capability gap → what that gap costs → offer details → interest CTA | Big lists with no signals; message quality must carry it |
| **Observation → Problem → Ask (3x3)** | 30MPC | One tailored observation → the one problem you solve → simple ask | General default for SDR-style outbound |
| **Value-first / big fast value** | Hormozi | Personal line → give something valuable for free (audit, teardown, Loom) → ask if they want more | Low trust or cold market; productized lead magnet available |

**Default when unsure:** Observation → Problem → Proof → Interest CTA, 50–80 words.

---

## 4. Offers that get replies

Saraev and Nowoslawski both put the offer first.

**Test every offer with the "why wouldn't they reply?" check (Nowoslawski).** List the hidden objections (cost, risk, effort, time, "we already have someone") and remove each one in the offer itself.

**The offer ladder for email 1.** The lower rungs are easier to say yes to:
1. **Something free and specific they can just receive:**
   - "3 ideas for {company}"
   - a 2-minute Loom teardown (Saraev's earlier tactic: 15 Looms led to 3 replies and a $1,900 deal)
   - a benchmark
   - a short audit
2. **A small conversation:** "worth a chat?"
3. **A meeting.** Never in email 1 unless they're warm.

**Make it strong:**
- **Sell an outcome with a number, not time saved.** Saraev: "save 10 hours a week" underperforms. Use "book 15 more calls a month" or "recover $X in no-shows".
- **Risk reversal.** Saraev's example: a $250 gift card if we don't deliver. Others: pay on results, first one free, cancel anytime. Avoid open-ended free trials (Saraev).
- **Specific beats impressive.** "Helped a 12-person HVAC company in Leeds add 31 jobs in 60 days" beats "Helped hundreds of businesses grow".
- **Productize it.** A named, fixed-scope, fixed-price thing is easier to understand and say yes to.

---

## 5. Personalization: depth by tier

Becc Holland and Will Allred both separate personalization from relevance:

- **Personalization** is 1:1: a line that couldn't be sent to anyone else.
- **Relevance** is 1:many: a message written for a cohort.

Use both, matched to the account's value:

| Tier | Volume | Method |
|---|---|---|
| **Tier 1** (dream accounts) | 10–50 per month | Hand-researched. SMYKM or Premise. A custom Loom or 3 ideas. |
| **Tier 2** | Hundreds | **Saraev's deep personalization pipeline:** scrape several pages of their site → AI summarizes each page → AI writes a 1–3 line opener from 2–3 verified facts. The rest of the email is a human-written template. |
| **Tier 3** | Thousands | Cohort relevance: segment by industry, role and trigger, and write one sharp email per segment. Jed's diagnostic-question style. No fake personalization. |

**AI personalization rules:**
- **AI writes the first line only, and the human template carries the rest** (Nowoslawski). Fully AI-written emails underperform (secondary: about 1–1.5% replies).
- **Every personalized fact must come from a source you actually read**, such as their site, a post or a job listing. Never invent. If research is thin, fall back to cohort relevance; never fake a compliment.
- **Ban the "AI tells":**
  - "I was impressed by…"
  - "I love what you're doing with…"
  - "Your commitment to excellence…"
  - restating their tagline back to them
  - "As a leader in {industry}…"
- **Constrain the model (Saraev on replies: "minimal freedom… to retain control over tone and quality").** Give it slots to fill, not a blank page.

**Signals worth more than personal trivia:**
- funding
- hiring for a role your product supports
- a new executive
- a product launch
- a new location
- a tech-stack change
- a recent post or podcast
- a negative review pattern
- a competitor's customer

Signal campaigns decay: 4% on 500 contacts can drop to 1.5% on 5,000 (Jed Mahrle). Rotate signals.

---

## 6. Sequences

- **3–5 emails over 2–3 weeks** by default. Every follow-up must add something new:
  - a new angle or problem
  - new proof
  - a resource
  - a screenshot
  - a referral ask

  Never "just bumping this".
- Spacing: about 3–4 days apart (Instantly). Gaps can widen as the sequence goes on.
- **Email 1 gets the most replies (58% in Instantly's data). Each later step gets fewer.** Short sequences suit big lists. Nowoslawski sends 1–2 emails, then rests the list 45+ days.
- **Follow-ups go in the same thread** (reply to email 1, no new subject) unless you're switching to a new angle on purpose. 30MPC switches the problem for the second half of a sequence.

**Default 4-step sequence:**

| Step | Day | Job | Shape |
|---|---|---|---|
| 1 | 0 | Open the loop | Observation → problem → proof → interest CTA (50–80 words) |
| 2 | 3 | New angle or value | 1–3 lines. A different problem or proof point, or "want me to send the 3 ideas?" A screenshot is OK here (Jed). |
| 3 | 7–8 | Referral / right person | "If this sits with someone else on your team, who should I ask?" |
| 4 | 12–14 | Breakup | Real closure. Take the offer away politely and leave the door open: "I'll stop here. If {problem} becomes a priority, just reply '{keyword}'." Only send it if you really stop. |

**Long multichannel variant (Tier 1):** 6–7 emails (Gong's sweet spot) plus LinkedIn and calls, across 30 days (30MPC).

---

## 7. Deliverability and compliance gates (check before writing)

Full detail and sources: [03 §A](../research/cold-email/03-deliverability-compliance-psychology.md).

**Provider rules (hard requirements):**
- **Authentication:** SPF, DKIM and DMARC set up and aligned with the From domain.
  - Gmail requires this from February 2024 for bulk senders (about 5,000 a day to personal Gmail addresses). Enforcement tightened in November 2025.
  - Yahoo: also from February 2024.
  - Outlook consumer mailboxes: from 5 May 2025.
- **Spam complaints:** keep the rate under 0.1% and never reach 0.3%.
- **Unsubscribe:** one-click unsubscribe (RFC 8058) for bulk mail, with opt-outs honored within 2 days.

**Infrastructure (practitioner consensus, not provider rules):**
- Send from secondary domains, never the main brand domain.
- 2–3 inboxes per domain.
- 10–30 cold sends per inbox per day.
- Warm up new inboxes for 2–4 weeks.
- Plain text, with click tracking off and open tracking off (or on a custom domain).
- Verify every list. Keep hard bounces under 2%, and exclude or isolate catch-all addresses.
- Vary wording only at the level of whole sentences, never by swapping single words. A real AI-written first line beats spintax.
- Spam trigger words matter less than sender reputation.

**Legal footer by recipient country:**
- **US (CAN-SPAM):** a real sender identity, a non-deceptive subject, a postal address and a working opt-out.
- **EU and UK (GDPR / PECR):** a documented legitimate-interest assessment and a right-to-object line in email 1. Say where you got their data and link a privacy notice.
- **UK:** sole traders need consent; limited companies don't.
- **Canada (CASL):** keep evidence the address was conspicuously published and the message relates to their role.

**A light opt-out line that doesn't kill the tone:** "Not relevant? Reply 'no' and I won't email again."

**Measure replies, not opens.**
- Track **positive reply rate per contact** and **meetings per 1,000 contacts**.
- Opens are unreliable: Apple Mail Privacy Protection and Gmail's image prefetching inflate them.

**Benchmarks** (they use different denominators, so compare like with like):

| Source | Measure | Figures |
|---|---|---|
| Instantly 2026 | Average reply rate | 3.43% average; top quartile above 5.5%; top 10% above 10.7% |
| Smartlead | Median reply rate per contact | 0.74% |
| Belkins | Replies per send | 0.45% |
| Saraev | His deep personalization system | 5–10% (self-reported) |

---

## 8. Replies (the conversation is the goal)

- Answer within minutes during business hours if you can.
- **Positive reply:** confirm, give two specific time options *or* a calendar link (a specific-time ask now wins: 37%), and restate one line of value.
- **"Send more info":** send 3 bullets and one question back. Don't attach a deck.
- **"Not now":** ask permission to check back on a specific month, then do it.
- **"Wrong person":** thank them and ask who the right person is.
- **"Unsubscribe" / "no":** confirm in one line, suppress them immediately and never argue.
- **Objection** ("we have someone", "no budget", "too expensive"): acknowledge it, ask one neutral question, and don't argue the point (Braun).
- **At scale (Saraev's #303):**
  1. Load the conversation history and a knowledge base.
  2. Pick the closest pre-approved reply template.
  3. Let the AI fill in only the template's variables.

---

## 9. The quality bar: the 10-point check every email must pass

The `cold-email-review` skill scores against this. `cold-email/lint_email.py` automates points 1–3 and 9.

1. **Length:** body 40–90 words (hard max 120).
2. **Clarity:** reading grade ≤ 7, sentences ≤ 20 words.
3. **Subject:** 1–4 words, no banned patterns, no "?".
4. **Why you, why now:** a real, specific, verifiable reason in the first 2 lines.
5. **Them over me:** opens on them, "you" ≥ "I/we", no "My name is".
6. **Problem, not pitch:** a named problem or loss; zero feature lists or buzzwords.
7. **Proof:** one specific, segment-matched result with a number (or a credible risk reversal).
8. **CTA:** exactly one, closed and low-friction (interest or offer), and no meeting ask in email 1.
9. **No filler or AI tells:** none of the banned phrases; no links, images or exclamation marks in email 1.
10. **The "forwarded by a colleague" test:** read it on a phone. Would it pass as a note from a smart peer? If it smells like marketing, rewrite it.

Score each point 0 or 1. **Ship at 9/10 or above.** Anything under that gets rewritten.

---

## 10. Testing like a scientist

- Change **one variable at a time**: offer, angle, CTA, subject or proof.
- Run at least 200–300 contacts per variant before judging, and judge on **positive replies and meetings**.
- Run several campaigns in parallel, like ad sets (Nowoslawski: "20–50").
- Make it a test variable when the sources disagree:
  - interest vs offer CTA
  - "I know you get a lot of these" disarm line (Jed says it lifts replies)
  - first-name subject vs topic subject
  - a screenshot in email 2
  - sequence length
- Don't abandon a campaign too early, and don't tweak too early either (Jed #79).
