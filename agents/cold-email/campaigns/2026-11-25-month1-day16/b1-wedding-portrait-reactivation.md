# b1-wedding-portrait-reactivation

- **Niche:** B. Wedding/portrait photo-video studios
- **Persona:** Owner of a wedding or portrait studio
- **Signal / why now:** Old enquiries that never booked (segment-level, not verified per studio)
- **Offer:** O3 pay per booked session (database reactivation)
- **Proof used:** B001 only (founders ran outreach in-house at a London production house; company not named). No client results exist in proof-bank.md.
- **Structure (Nick, Month 1 Day 16):** personalization line, who I am, why trust me, offer. 2 emails only (offer + one casual follow-up). Subject per Nick: "{{first_name}}, question".
- **Linter:** no errors (see below). **Critic score: NOT RUN** (this session could not start the cold-email-critic agent). Must be scored 85+ before loading.

## Emails
```
Subject: {{first_name}}, question

Hey {{first_name}},

{{icebreaker}}

I'm Dev. I ran outreach in-house at a London production house. Now I help studios like yours get more bookings.

You probably have old enquiries that never booked. I'd write to them again for you, and you'd only pay for sessions that actually book.

Want to see how it would work for {{company}}?

Dev

--- Follow-up (day 3-4, same thread) ---

Hey {{first_name}},

Short version in case you missed it:

- your old enquiries, written to again
- you pay only per booked session
- nothing to set up on your side

Worth a look?

Dev

```

## Linter output
```
Email 1: PASS  | subject: '{{first_name}}, question' | 56 words | grade 3.4 | 1 question(s) | you:me 4:4
Email 2: PASS  | subject: None | 30 words | grade 1.3 | 1 question(s) | you:me 4:0
```
