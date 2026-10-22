# 13 · Quality bar: how every email is graded

Source tags follow the legend in `00-philosophy-hierarchy.md`. Point weights and the 85 / 70 thresholds are **Extol house settings** (adapted from Eric's 0–100 rubric [SRC]); recalibrate them against our own campaign results in `14`.

Two layers: **the automatic linter** (`agents/cold-email/lint_email.py`, which catches mechanical errors) and **the critic's 100-point rubric** (judgment). Ship only when the **linter has no ERRORs and the critic scores 85 or more**.

## The critic's rubric (based on Eric's scoring rubric [SRC] `sk-campaign-copywriting.md` §Scoring Rubric (0-100), extended)
| Dimension | Points | 0 = | Full marks = | Sources |
|---|---|---|---|---|
| **Why you, why now** (situation recognition) | 20 | Generic or no reason | One real, specific, checkable signal in line 1 that implies a problem | [SRC]; [R02] (30MPC observation → problem); `01` |
| **Value clarity** (offer + proof) | 20 | Vague or invented | A clear offer (time / money / risk) with precise, matched, real proof or a credible risk reversal | [SRC] §3 Offers; [R06] offers; `02`, `05` |
| **Problem over pitch** | 10 | Feature dump or "about us" | Names their pain in their words; the product is barely mentioned | [R02] Gong: pitching −57% [DATA] |
| **Personalization quality** | 10 | Merge fields or flattery | A custom signal or AI insight that changes the meaning, or honest segment relevance | [R05]; [SRC] sk-campaign-copywriting §AI Personalization Decision Framework |
| **CTA effort** | 10 | A meeting or time ask, or 2+ questions | One question they can answer in 5 words or fewer | [R02] Gong ~304K emails: interest CTA 30% vs time 15% [DATA]; Eric 5-word rule [SRC] |
| **Brevity and readability** | 10 | Over 125 words or grade 9+ | 50–90 words, grade 3–7, short sentences, white space | [R02] Lavender 231,818 emails: grade 3–7 1.66x [DATA]; [R03] Boomerang: grade 3 +36% [DATA] |
| **Tone** | 10 | Corporate, needy, salesy, AI tells | Peer-to-peer, detached, reads naturally aloud in under 20 seconds | [SRC] sk-campaign-copywriting checklist ("reads naturally aloud, under 20 seconds"); [R04] Braun "neediness is repulsive"; [R05] AI tells |
| **Subject + preview** | 5 | Salesy, "Re:", "AI", long | 1–4 words a colleague could send, plus a strong preview line | [R04] 30MPC: "AI" in subject −17% opens [DATA]; `03` (Sahni first-name +20% [RCT]) |
| **Compliance and honesty** | 5 | Deceptive or missing an opt-out where required | Truthful; the right footer for the country; no fake familiarity | [R03] CAN-SPAM/GDPR/PECR/CASL; [R06] DE/AT; `11` |

**Thresholds:**
- **85+:** ship.
- **70–84:** one more pass, naming the weakest dimension.
- **Under 70:** start over with a different framework or offer.

**Hard fails (score capped at 50 whatever else):** any invented fact or proof; any deception; any linter ERROR. Sources: [R05] "never fabricate facts" (prompt rules) and the evidence-substring verifier; [R04] Eric's regretted "my friend needs this" bait; the 50 cap is an Extol house rule.

## Questions the critic must answer
Sources: the phone framing follows the Lavender mobile data [R02] (+24% on mobile) [DATA]; Q3 applies the "tailored observation" rule [R02] (30MPC). Q2 and Q4 are Extol house checks with no external source.
1. "Would I reply to this if I were {{persona}}, on my phone, between meetings?"
2. "If I forwarded this to a colleague, would it look like a note from a smart peer, or like marketing?"
3. "Could this first line be sent to anyone else?" If yes, it fails *why you, why now*.
4. "What's the single weakest line?" Rewrite that first.

## Output format the critic returns
```
SCORE: 78/100  (why-now 16, value 14, problem 8, personal 7, cta 10, brevity 9, tone 7, subject 4, compliance 5)
VERDICT: ONE MORE PASS
WEAKEST: value. The proof is "100+ companies", which is vague and unmatched
FIXES (max 3):
1. Replace the proof with a matched, precise result from the proof bank (e.g. "{{peer}} cut no-shows 18%→6% in 60 days")
2. ...
```
