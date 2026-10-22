---
name: cold-email-write
description: Write a single first-touch cold email (or A/B variants) that doesn't read like cold email. 40–90 words, internal-looking subject, opens on them, names a problem, one proof line, one yes/no CTA. Linted and scored. Use when the user asks to "write a cold email", "draft outreach to X", "give me email variants", or "write a better subject line".
---

# Write a cold email

## Before writing
1. Read `cold-email/playbook.md` §2 (hard rules), §3 (frameworks) and §9 (quality bar).
2. Read `cold-email/swipe-file.md` for annotated examples.
3. Load `campaigns/<slug>/brief.md` if it exists. If not, get the minimum brief:
   - who (role and industry)
   - the offer and its outcome
   - one real proof point
   - the trigger or reason for reaching out
   - the recipients' country

   Mark anything you assume with `[ASSUMPTION]`.

## Pick the framework
Pick based on the data you have (playbook §3):
- **A website scrape or a real trigger:** Observation → Problem → Proof → CTA. Or Saraev's Icebreaker → Pitch → Proof → CTA.
- **A killer segment-matched case study:** Berman's specific observation → case study → ask.
- **A status-quo prospect:** Braun's 4T.
- **A big list with no signal:** Jed's diagnostic question.
- **An agency or service with a strong guarantee:** Saraev's Logistics → Background → Case study → Risk reversal.
- **A tier-1 executive:** SMYKM or Premise.
- **An agency that can generate ideas:** Nowoslawski's "3 ideas for {company}".

## Line-by-line recipe
1. **Subject:** 1–4 words, lowercase, should look like it came from a colleague. Write 3 options. Never use "quick question", a fake "Re:", "?" or a salesy subject.
2. **Line 1 (preview text):** a specific, checkable fact about them, then what it probably means ("If A, then B is probably true"). It must never start with "I", "My name" or a compliment.
3. **Line 2:** the problem or likely loss, in neutral words. Something they'd nod at.
4. **Line 3:** one proof line, either a peer client, result and timeframe matched to their segment, or a risk reversal.
5. **Line 4:** one closed CTA. Use an interest CTA ("Worth a look?") or an offer CTA ("Want me to send the 3 ideas?"). Never ask for a meeting time in email 1.
6. **Sign-off:** first name, title, company. Add the compliance line for the country (playbook §7).

## Self-edit pass
- Cut every word that doesn't earn its place. Then cut 20% more.
- Swap every buzzword for the plain outcome.
- Count "you" against "I/we"; the reader should win.
- Read it aloud as a text to a respected peer. If it sounds like marketing, rewrite it.

## Verify, then deliver
1. Save the draft to `campaigns/<slug>/emails.md` (or a scratch file).
2. Run `python3 cold-email/lint_email.py <file>`. Fix every ERROR, and fix WARNs unless you have a stated reason.
3. Score it on the 10-point bar (playbook §9). Rewrite until it scores 9/10 or above.
4. Deliver **2 variants** that differ in exactly one named variable, for example interest CTA vs offer CTA, or trigger angle vs problem angle. For each, show the subject, body, word count, grade, lint verdict, score, and one line on why it works.

Never invent proof, clients, numbers or personal details. If proof is missing, say so and use a risk-reversal offer instead.
