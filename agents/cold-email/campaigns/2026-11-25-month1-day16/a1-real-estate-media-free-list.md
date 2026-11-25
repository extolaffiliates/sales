# a1-real-estate-media-free-list

- **Niche:** A. Real estate photo/video businesses
- **Persona:** Owner of a small real estate photo/video business (e.g. MW Property Media type)
- **Signal / why now:** Agents near them who listed in the last 14 days (we supply it as the gift)
- **Offer:** O13 free list
- **Proof used:** B001 only (founders ran outreach in-house at a London production house; company not named). No client results exist in proof-bank.md.
- **Structure (Nick, Month 1 Day 16):** personalization line, who I am, why trust me, offer. 2 emails only (offer + one casual follow-up). Subject per Nick: "{{first_name}}, question".
- **Linter:** no errors (see below). **Critic score: NOT RUN** (this session could not start the cold-email-critic agent). Must be scored 85+ before loading.

## Emails
```
Subject: {{first_name}}, question

Hey {{first_name}},

{{icebreaker}}

I'm Dev. I ran outreach in-house at a London video production house, so I know how quiet it gets for you between listings.

I can pull together the agents near {{city}} who listed in the last 14 days. You'd get a name and email for each one.

Want your area's list? It's free.

Dev

--- Follow-up (day 3-4, same thread) ---

Hey {{first_name}},

Didn't want this to get buried, so here's the short version for you:

- 25 agents near {{city}} who just listed
- name and email for each
- free, no call needed

Should I send it over?

Dev

```

## Linter output
```
Email 1: REVIEW  | subject: '{{first_name}}, question' | 56 words | grade 2.5 | 1 question(s) | you:me 3:4
  [WARN] clarity: Long sentence (21 words): "I ran outreach in-house at a London video production house, so I know ..."
  [WARN] focus: Sender-focused: I/we/our=4 vs you/your=3.
Email 2: PASS  | subject: None | 35 words | grade 0.8 | 1 question(s) | you:me 1:1
```
