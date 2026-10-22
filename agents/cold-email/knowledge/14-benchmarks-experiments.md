# 14 · Benchmarks and experiments

## Know your denominator
Published averages differ by up to 7.6x because they use different methods [R02][R06]. Always state which you mean:

| Source | Measure |
|---|---|
| Instantly 2026 | **3.43%** average reply rate; top quartile 5.5%+; **top 10% 10.7%+** |
| Smartlead 2026 (850M emails) | **0.74% median** per contact; top 10% 2.63%+ |
| Belkins (7.5M, 2025 data) | **0.45%** replies per send |
| Eric / GEX (across clients) | **1 positive reply per 250–350 contacts** |
| Saraev (deep personalization) | 5–10% replies [SELF-REPORTED] |

## The metric that matters: positive reply rate (Eric) [R05]
`positive_reply_rate = (interested + soft + referral) / total sent`

| Campaign | Reply rate | Share positive | Positive reply rate |
|---|---|---|---|
| A | 1% | 70% | **0.7%** |
| B | 5% | 10% | 0.5% |

**Campaign A wins.**

- **Good: 1% or more. Great: 2% or more.**
- **Pause the campaign** if hostile replies exceed 0.3% of sends or unsubscribes exceed 2%.
- **Secondary metrics:** meetings per 1,000 contacts (1–3% of contacts is strong), the share of positive replies that become meetings (40–55%), and the show rate.
- **Never optimize for opens.** Apple Mail Privacy Protection and image prefetching make them unreliable [R03].

## Context benchmarks [R06]
- **By size (Belkins):** companies of 0–10 staff reply 0.72% vs 10,000+ staff 0.22%.
- **By seniority (Belkins):** founders 0.57% > C-level 0.42% > VPs 0.32%.
- **By region:** Europe tends to reply more than the US and UK (Poland 1.43% vs US 0.51%, Belkins; Sweden 6.1%, small sample). Saleshandy disagrees. This matches Saraev's "Europe 4–5x" direction, but **respect DE/AT consent laws**.
- **By day and time:** Tuesday–Thursday, 8–11am in the recipient's time zone. The gaps are tiny, so it's low priority.
- **By campaign size:** 50 recipients or fewer reply about 5.8% vs about 2.1% for 1,000+.

## Experiment design (Eric's `experiment-design`) [R05]
1. **Baseline check:** at least a 1% reply rate after 200+ sends. Otherwise fix deliverability or copy first.
2. **One variable at a time**: list-only or copy-only. A combined experiment never becomes the new baseline.
3. **Write the hypothesis and the success, failure and inconclusive criteria *before* launching.**
4. **Sample size per arm:**

   | Baseline (positive reply rate) | Lift to detect | Sends per arm |
   |---|---|---|
   | 1% | 2x | ~500 |
   | 1% | 1.5x | ~2,000 |
   | 1% | 1.2x | ~10,000 |
   | 2% | 2x | ~250 |

   **Default to 2,000 per arm.** Under 500 is noise.
5. **Launch both arms at the same time** on split inboxes with the same schedule.
6. **Read at day 21**, after the full sequence.
7. **Decide:**

   | Result | Action |
   |---|---|
   | 20% lift or more | Adopt |
   | 10–20% lift | Replicate with fresh leads |
   | Under 10% | Inconclusive |
   | A loss | Document why |

## What to test first (highest leverage first)
1. Offer (free work vs free test vs pay-per-result)
2. List or segment (trigger A vs trigger B)
3. Angle or framework
4. CTA type (interest vs offer vs no CTA)
5. Subject (`{first_name}` vs topic vs "quick question" as a control)
6. P.S. on/off
7. Image in email 2
8. Sequence length

## Logging results
Save every campaign's numbers to `agents/cold-email/campaigns/<slug>/results.md` and run `cold-email-learn`. Our own data outranks every creator.
