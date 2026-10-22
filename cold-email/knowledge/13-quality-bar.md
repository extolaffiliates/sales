# 13 · Quality bar: how every email is graded

Two layers: **the automatic linter** (`cold-email/lint_email.py`, which catches mechanical errors) and **the critic's 100-point rubric** (judgment). Ship only when the **linter has no ERRORs and the critic scores 85 or more**.

## The critic's rubric (based on Eric's scoring rubric [SRC], extended)
| Dimension | Points | 0 = | Full marks = |
|---|---|---|---|
| **Why you, why now** (situation recognition) | 20 | Generic or no reason | One real, specific, checkable signal in line 1 that implies a problem |
| **Value clarity** (offer + proof) | 20 | Vague or invented | A clear offer (time / money / risk) with precise, matched, real proof or a credible risk reversal |
| **Problem over pitch** | 10 | Feature dump or "about us" | Names their pain in their words; the product is barely mentioned |
| **Personalization quality** | 10 | Merge fields or flattery | A custom signal or AI insight that changes the meaning, or honest segment relevance |
| **CTA effort** | 10 | A meeting or time ask, or 2+ questions | One question they can answer in 5 words or fewer |
| **Brevity and readability** | 10 | Over 125 words or grade 9+ | 50–90 words, grade 3–7, short sentences, white space |
| **Tone** | 10 | Corporate, needy, salesy, AI tells | Peer-to-peer, detached, reads naturally aloud in under 20 seconds |
| **Subject + preview** | 5 | Salesy, "Re:", "AI", long | 1–4 words a colleague could send, plus a strong preview line |
| **Compliance and honesty** | 5 | Deceptive or missing an opt-out where required | Truthful; the right footer for the country; no fake familiarity |

**Thresholds:**
- **85+:** ship.
- **70–84:** one more pass, naming the weakest dimension.
- **Under 70:** start over with a different framework or offer.

**Hard fails (score capped at 50 whatever else):** any invented fact or proof; any deception; any linter ERROR.

## Questions the critic must answer
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
