# Video editing and photo/video agencies: first-touch emails (Nov 2026)

Status: DRAFT. Not sent, no contacts added anywhere. A human must approve before sending.
CRITIC: pending for all 4 emails and both follow-ups. The writing agent had no Agent tool, so the independent cold-email-critic run was not done. The main session must run it (send the email text + persona only). Ship only at 85/100 or above. Do not treat any email below as cleared.
Linter: run with --template (allows {{first_name}} and {{company}}). All four email 1s: 0 errors, 0 warnings (PASS). Proof bank is empty, so no client results are cited.

Persona for the critic: owner or managing director of a small UK creative agency (video editing, or photography and videography). Busy, gets many vendor emails, sceptical of AI pitches. Reads on a phone between jobs.

## NICHE 1: Video editing agencies

### 1A (angle: referral dependence + founders background; CTA = interest question)
```
Subject: referrals

Hi {{first_name}},

Video editing agencies tend to be either flat out or quiet, with little in between.

That often comes from relying on referrals. They're great, but you can't turn them on when your diary thins.

We build systems that find the right clients, research them and book the conversation. We both worked in-house at a London media production house, so we know how you win work.

Is {{company}} mostly referral-led?

Dev

P.S. If this isn't relevant, say so and I'll leave you alone.
```
85 words, grade 4.2, lint PASS, critic: pending
Why it should work: honest segment observation plus real background in place of proof (knowledge/02, 05); one small closed question (Gong interest CTA, knowledge/06).

### 1B (angle: free work first; CTA = "Want it?")
```
Subject: 20 brands for {{company}}

Hi {{first_name}},

Finding your next client usually falls to you, and it's the first job dropped when edits pile up.

We build systems that find and research the right prospects for creative agencies. I'd rather show you than tell you.

I can send you 20 brands likely to need an edit partner. Each gets a line on why, and who to contact. Free, no strings.

Want it?

Dev

P.S. If not, no problem at all.
```
74 words, grade 2.0, lint PASS, critic: pending
Why it should work: top of the offer ladder, free work they simply receive (knowledge/02; Lieben "do it already, for free"). Product kept to one line. Ask is the lowest friction possible.

### Email 2 for 1B (threaded reply, blank subject, send about day 3 to 4)
```
Hi {{first_name}},

For the 20, I'd pick brands that publish video often and have no obvious in-house editor.

Then I'd name whoever commissions it, so you know who to speak to.

Shall I send the list?

Dev
```
36 words, lint REVIEW (one WARN: sender-focus ratio, accepted for a 36-word reply), critic: pending
Adds something new: how the 20 would be chosen and that a named commissioner comes with each (knowledge/09: every follow-up adds something new).

## NICHE 2: Photography and videography agencies

### 2A (angle: feast-and-famine / referrals arrive on their schedule; CTA = interest question)
```
Subject: quiet months

Hi {{first_name}},

Photo and video agencies often have a busy quarter followed by a quiet one.

Referrals are great, but they arrive when they like, not when you need them.

We build systems that find the right clients, research them and book the conversation. We both worked in-house at a London media production house, so we know how you win and lose work.

Does new work mostly come by referral for you?

Dev

P.S. If this isn't relevant, say so and I'll leave you alone.
```
85 words, grade 4.1, lint PASS, critic: pending
Why it should work: names the pain in their terms (busy then quiet) with a loss frame, then honest background in place of proof (knowledge/05).

### 2B (angle: risk reversal / free pilot; CTA = open to hearing how)
```
Subject: pilot for {{company}}

Hi {{first_name}},

You probably never get time to chase new clients properly. The shoots come first, which is fair.

We build systems that find the right prospects, research them and book conversations for you. We both worked in-house at a London media production house, so we know the work.

We'd run a free pilot for {{company}}. You'd keep going only if it books conversations you actually want.

Open to hearing how it would work?

Dev

P.S. If not, no problem at all.
```
82 words, grade 3.3, lint PASS, critic: pending
Why it should work: no proof available, so risk reversal carries the value (offer ladder step 2, knowledge/02). WARNING: the pilot terms are not confirmed by the founders.

### Email 2 for 2A (threaded reply, blank subject, send about day 3 to 4)
```
Hi {{first_name}},

Brand and comms teams often hire whoever turns up at the right moment, rather than running a formal search.

Would a free list of ten such teams for {{company}} be useful?

Dev
```
32 words, lint PASS, critic: pending
Adds something new: a fresh micro-reason plus a lower-friction free-work offer (offer type rotates, knowledge/09).

## Provisional picks (before critic): video = 1B, photo/video = 2A. Re-pick once the critic scores arrive.

## A/B plan
Per niche, 1A vs 1B and 2A vs 2B differ in one variable: the offer (background + question vs free work or pilot). Launch both arms together, 500 to 2,000 sends per arm, read at day 21, adopt at a 20% or greater lift in positive reply rate (knowledge/14). Subject is held per email as written.

## Critic scores (2026-11-18): none cleared to send
| Email | Score | Verdict | Main reasons |
|---|---|---|---|
| 1A video agencies, referrals | 48 | Start over | Background claim ("we both worked in-house at a London media production house") not in proof-bank.md; generic opener; vague "we build systems"; no sender identity or opt-out |
| 1B video agencies, free list of 20 brands | 50 | One more pass | Offer is sound; opener generic; "we build systems" reads like an AI pitch; cut P.S.; add sender identity and opt-out; define what the list contains |
| 2A photo/video, quiet months | 46 | Start over | Same background-claim problem; generic opener; value line vague |
| 2B photo/video, free pilot | 39 | Start over | Background claim; generic opener; pilot terms unconfirmed; subject uses "pilot" |
| Email 2 for 1B (follow-up) | 58 | Start over | Describes method only, no new angle, no example; offer not yet defined |
| Email 2 for 2A (follow-up) | 62 | Start over | Generic opener; "such teams" undefined; list contents and deliverability unconfirmed |

Linter "errors" were only the unfilled {{first_name}} and {{company}} merge fields (the drafts were linted with --template; the critic linted without it).

## What it takes to pass 85
1. Record the founders' media-production background in proof-bank.md (with their confirmation and what "we both" covers), or remove it.
2. One real, checkable signal per prospect (recent project, client win, hiring or showreel post), found by research before writing.
3. Confirm the free offer (what the list contains and that Extol can build it per recipient).
4. Cut the P.S. lines; add sender name, company, postal address and an opt-out line (UK B2B).
5. Replace "we build systems" with one concrete outcome in plain English.
