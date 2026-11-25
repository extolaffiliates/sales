# c2-production-agency-loom-teardown

- **Niche:** C. Video production companies / editing agencies
- **Persona:** Same as C1
- **Signal / why now:** No signal; the free video is the hook
- **Offer:** O4 free Loom teardown
- **Proof used:** B001 only (founders ran outreach in-house at a London production house; company not named). No client results exist in proof-bank.md.
- **Structure (Nick, Month 1 Day 16):** personalization line, who I am, why trust me, offer. 2 emails only (offer + one casual follow-up). Subject per Nick: "{{first_name}}, question".
- **Linter:** no errors (see below). **Critic score: NOT RUN** (this session could not start the cold-email-critic agent). Must be scored 85+ before loading.

## Emails
```
Subject: {{first_name}}, question

Hey {{first_name}},

{{icebreaker}}

I'm Dev. I ran outreach in-house at a London video production house. Now I build client-getting systems for studios like yours.

I'd record you a 3 minute video on how {{company}} could find new clients each month. You'd get three fixes to use yourself.

Want me to record it? No call needed.

Dev

--- Follow-up (day 3-4, same thread) ---

Hey {{first_name}},

Short recap for you:

- 3 minute video, made for {{company}}
- 3 ways to find new clients
- yours to keep, no call

Should I make it?

Dev

```

## Linter output
```
Email 1: REVIEW  | subject: '{{first_name}}, question' | 56 words | grade 2.5 | 1 question(s) | you:me 3:5
  [WARN] focus: Sender-focused: I/we/our=5 vs you/your=3.
Email 2: PASS  | subject: None | 26 words | grade 0.2 | 1 question(s) | you:me 2:1
```
