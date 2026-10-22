# 00 · Philosophy, hierarchy and diagnosis

**Source tags** in all knowledge files:

| Tag | Source |
|---|---|
| `[R01]` | `agents/cold-email/research/01-nick-saraev.md` |
| `[R02]` | `agents/cold-email/research/02-creators-and-benchmarks.md` |
| `[R03]` | `agents/cold-email/research/03-deliverability-compliance-psychology.md` |
| `[R04]` | `agents/cold-email/research/web/04-copywriting-swipe-library.md` |
| `[R05]` | `agents/cold-email/research/web/05-ai-personalization-signals-stack.md` |
| `[R06]` | `agents/cold-email/research/web/06-offers-niches-studies-replies.md` |
| `[SRC]` | `agents/cold-email/research/sources/` (MIT files) |
| `[T]` | `agents/cold-email/research/transcripts/` |

**Evidence labels:** `[DATA]` is measured; `[RCT]` is a randomized study; `[CONSENSUS]` means 3+ practitioners agree; `[TEST]` means sources disagree, so A/B test it.

## The one-sentence philosophy
**A cold email is a short, relevant note from one peer to another. It names a problem the reader probably has and asks a small question. Its only job is to start a conversation.**

## What moves results, in order
Fix the higher layer before polishing a lower one.

| # | Layer | Evidence |
|---|---|---|
| 1 | **Deliverability** | In spam, the reply rate is 0%. Harvey: "deliverability > list quality/relevance > copy. Copy is the last 20%." [R05] |
| 2 | **List and segment** | Mark Colgan: 13–17% replies from segments of 82–400 contacts [R04]. Segments of 50 or fewer reply about 5.8% vs about 2.1% for 1,000+ [R06]. "The list is the strategy" (Lieben) [R04] |
| 3 | **Offer** | Forbes interview offer: 30–48% replies with "no fancy copy" (Nowoslawski) [R04]. "The client's offer is king" (Haren) [R04]. Saraev: "save time" offers are weak [R01] |
| 4 | **Relevance / why now** | A trigger event lifts replies from 3.4% to 18% (Backlinko via Leadspace) [R03]. Langer: a real reason gets compliance on big asks [RCT][R03] |
| 5 | **Copy** | Pitching cuts replies by up to 57% (Gong) [R02]. 49 words vs 127 words: 4.8% vs 2.7% replies [RCT][R06] |
| 6 | **Sequence** | About 42–59% of replies come after email 1 [R02] |
| 7 | **Personalization depth** | AI rewriting alone didn't change reply rates (16,880-message field test) [R05]. In one 873K-email test, AI personalization made no measurable difference [R04]. It amplifies the layers above it; it can't replace them |

## Diagnosing a campaign (Saraev, Nowoslawski, Eric's 1% rule) [R01][R05]
| Symptom | Layer | Action |
|---|---|---|
| Bounces above 2%, or 550 errors | Deliverability or list | Re-verify the list, skip catch-alls, swap inboxes, change the copy |
| Under 1% replies (excluding out-of-office) after 200+ sends | Deliverability, or a broken baseline | Audit before testing anything else |
| Replies, but under 30% of them positive | List or offer | Re-target; reframe the offer |
| 1,000+ sends and 0 meetings | Messaging (Saraev) | New angle or offer, not small wording edits |
| Positive replies, but no meetings | Reply handling | Reply within an hour; give one clear next step |
| Started well, now declining | Segment exhausted (Jed) | New trigger or segment; rest the list for 3 months |

## Realistic ceilings [R04][R05]
- **At scale**, expect about **1 positive reply per 250–350 contacts** (GEX average across clients).
- **About 30% is the practical maximum reply rate.** Anything higher means a tiny niche list, an event, or a no-brainer free offer.
- **Positive reply rate (positive replies ÷ sends):** 1% or more is good, 2% or more is great.

## The ten commandments for the agent
1. **Relevance beats personalization.** Every email answers "why you, why now" with one real signal.
2. **Talk about the problem, not the product.** The product can be absent from email 1.
3. **Short:** 50–90 words, grade 3–7 reading level, written for a phone screen.
4. **One idea, one signal, one question.**
5. **Precise proof only** (3.72x, not 4x), and only real proof from `libraries/proof-bank.md`.
6. **A small yes/no ask.** The reader should be able to reply in 5 words.
7. **Every follow-up adds something new.** No "just checking in".
8. **Never invent, never deceive.** A wrong specific is worse than a right generic.
9. **Measure positive replies per send, not opens.**
10. **A human approves before anything is sent.**
