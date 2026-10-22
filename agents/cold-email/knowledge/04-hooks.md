# 04 · Hooks: the opening line and preview text

The first 1–2 lines decide whether the email gets read, and they show as preview text. Real examples are in `libraries/hook-bank.md`.

## Rules
1. **Start on them, never on you.** No "I", "My name is", "We", "I'm reaching out", "I came across", "Based on your title", "I saw your profile", "Sorry to bother you" (Kyle Coleman, Jason Bay) [R04].
2. **No greeting line that wastes the preview.** Jason Bay: "Hey Jason / Hi Jason… scream THIS IS AN EXTERNAL EMAIL". Either start with the observation, or use "{{first_name}} –" followed straight by the point [R04].
3. **Specific and checkable.** Test: "could this line apply to anyone else? If yes, rewrite." (Tuwiner) [R04]
4. **Observation, not flattery.** Generic compliments are an AI tell, and readers classify them as mass-produced in about 2 seconds [R05]. If you praise, praise something specific and verifiable, without "!".
5. **Connect the observation to the problem:** "If A, then B is probably true" (Braun) [R02].
6. **Casual compression:** "Maki", not "Maki Agency Ltd"; "San Fran" (Saraev #5388) [R05]. Contractions. A little imperfect grammar is fine ("Caught your take on X") [R04].
7. **One signal only** (see `01-intent-signals.md`).

## Hook taxonomy (pick one per email)
| # | Hook type | Template | Source |
|---|---|---|---|
| 1 | **Specific observation** | "Jason, you mentioned digital sales were down 13% last quarter." | Jason Bay [R04] |
| 2 | **Problem spotted** | "See this? The chatbot on the Canada Goose page doesn't work after 6pm PT." | Jason Bay [R04] |
| 3 | **Curiosity question** | "how's the search for a freelance podcast editor going?" | Jason Bay [R04] |
| 4 | **Truth + implication** | "noticed your SDRs target HR directors at companies over 500 employees." | Braun 4T [R04] |
| 5 | **Trigger + hedged hypothesis** | "Saw you're hiring for several roles. Curious if I'm wrong to guess a % will be backfills." | Allred [R04] |
| 6 | **Poke the bear** | "How do you keep track of varying commission rates for each role and their accelerators?" | Braun via Eric [R04] |
| 7 | **Soft humility** | "I may be wrong, but do you have something in place for {{area}}?" | Eric [SRC] |
| 8 | **Inherited problem (new role)** | "when you took over at {{company}}, did you inherit {{problem}}?" | Eric [SRC] |
| 9 | **Silly question (expert opinion)** | a genuine "maybe silly" question about their field | Tatulea, claims 30% [R04] |
| 10 | **Familiarity** | "Curious if you remember {{us}} from your time at {{client}}?" | Jason Bay [R04] |
| 11 | **Deep research (multi-line)** | "Love {thing}. Also {otherThing}… I creeped your site a bit, and know {anotherThing} matters to you" | Saraev #5388 [R05] **[TEST]**: it's long, and "Love X" is risky at scale |
| 12 | **Situation recognition** | "Noticed {{company}} doesn't have a dedicated IT team." | Eric [SRC] |
| 13 | **Customer's "before story"** | "You shouldn't have to manually map financials from QBO…" | Braun [R04] |
| 14 | **Timeline / outcome** | "{{first_name}}, most {{role}} leaders want {{outcome}} in the first 90 days." | Digital Bloom timeline hooks [R06] **[TEST]** |
| 15 | **Honest no-signal** | "Most teams your size still {{manual task}} by hand." | Harvey [SRC] |

## Banned openers
"I hope this email finds you well", "I hope you're doing well", "My name is…", "I wanted to reach out", "I'm reaching out because", "I came across", "I was impressed by", "I love what you're doing", "As a leader in…", "In today's fast-paced…", "Picture this", "Imagine if", "What if I told you", "Here's what I keep seeing" [R04][R05][SRC].

The linter enforces most of these.
