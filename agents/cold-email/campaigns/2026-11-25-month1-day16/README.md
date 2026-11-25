# Month 1 Day 16: six cold email sequences (2026-11-25)

Nick's Day 16 lesson: six sequences, **two per niche**, one offer each so the two compete. Structure: personalization, who I am, why trust me, offer. Keep them short. Schedule Mon-Sat, 7am-7pm in the recipient's time zone.

**Status: DRAFTS, none at 85. Do not load.** Each sequence went through 3 rewrite rounds (rounds 2-4) with an independent `cold-email-critic` score every round. The critic saw only the email text, the persona and the icebreaker spec; its logs are in `critic/`. The email 1s stall at 77-83. The critic's remaining fixes need **real data we don't have** (listed below), not better wording.

## Final critic scores (round 4, the versions saved in the `.txt` files)
| File | Niche | Offer | E1 | E2 | E3 (close) | Pass 85? |
|---|---|---|---|---|---|---|
| a1-real-estate-media-free-list | Real estate photo/video | Free list of agents who just listed | 83 | 79 | 70 | No |
| a2-real-estate-media-free-test | Real estate photo/video | Free test campaign to new agents | 79 | 72 | 70 | No |
| b1-wedding-portrait-reactivation | Wedding studios | Pay per booked couple (old enquiries) | 79 | 75 | 72 | No |
| b2-wedding-portrait-partner-list | Wedding studios | Free list of venues with suppliers pages | 81 | 78 | 73 | No |
| c1-production-agency-brand-list | Production cos / editing agencies | Free list of brands posting video weekly | 82 | 82 | 73 | No |
| c2-production-agency-loom-teardown | Production cos / editing agencies | Free 3-min video: 3 brands like their client | 77 | 71 | 68 | No |

Score history (E1/E2/E3): round 1 a1 59/45, a2 63/51, b1 59/48, b2 62/48, c1 63/49, c2 57/47 (2 emails, all START OVER). Round 3 peaks: a1 84/82/72, c1 81/80/73. Every `.md` has its own per-round table. No hard fails in rounds 2-4, and the linter shows no ERRORs.

## What changed from round 1
1. Each email opens on the prospect: a scraped `{{icebreaker}}` with a defined source, followed by a hedged pain line. The credential now comes after the offer, worded exactly as B001 allows ("a London production house"). No email implies existing studio clients.
2. Subjects are 1-4 lowercase words tied to the offer: `agents in {{city}}`, `winter shoots`, `couples who went quiet`, `{{city}} venues`, `{{vertical}} brands`, `clients like {{case_study_client}}`.
3. Email 2 adds something new each time: a row spec, a sample line, a smaller 5-row ask, a seasonal reason, or a lower-effort format. There are no recaps and no invented counts.
4. There are now 3 steps, with a clean close (no guilt, a standing offer, an opt-out).
5. Compliance: "Dev, Extol Affiliates" in every signature, a light opt-out in every email, a data-source P.S., and the footer `{{sender_postal_address}} · {{privacy_url}}`. PECR exclusions are noted in each `.md`.
6. The offers are checkable: b2 uses venues' published suppliers pages, a1 explains that the list targets an agent's *next* listing, and c1 dropped "no in-house editor".
7. Each `.md` defines its icebreaker source and gives 2 clearly labelled **invented** example rows. Rows where the icebreaker can't be built are excluded.

## Real data needed before any of these can reach 85
**Common to all six:**
- **A real client result in `proof-bank.md`.** Value is capped at about 15/20 on background (B001) alone.
- **The true lead source per row**, for the P.S. "I found you via …".
- **Extol's real postal address and privacy URL** for the footer.
- **Dated per-prospect signals** (for example a publish date). The current signals are checkable but static, so why-now sits at about 15-16/20.

**Per sequence:**
- **a1:** a `{{top_credit}}` field (the most-credited agent), a per-city count of agents who listed in the last 14 days, and a listings data source.
- **a2:** the test size (number of agents and days) and the sending domain, plus a per-prospect recent-shoot field for the sample line.
- **b1:** the fee per booked couple, the delivery mechanics (whose inbox, and a DPA for the studio's enquiry data), and one real tip from Dev's in-house work.
- **b2:** (optional) a sourced figure on when couples choose suppliers. Send step 2 in Nov-Dec only.
- **c1:** a dated signal (the case-study publish month), proof that each city × vertical yields 5+ weekly-posting brands, and a lawful basis for sharing UK marketing leads' emails.
- **c2:** one real pre-researched brand per prospect (`{{brand_1}}`) so the close can give one away.

## Before any of this is sent
1. **Nick's rule: "do not use AI for this."** These are AI drafts for the founders to **rewrite in their own words** (imperfect is fine). Each `.md` lists the round-4 copy fixes that need no new data. Apply them in the rewrite, then re-run the critic.
2. **Critic:** 85+ is required by the sales repo CLAUDE.md. None passes yet.
3. **Proof:** B001 only. Never add numbers or clients that aren't in `proof-bank.md`.
4. **Deliverability and law** (Days 18-19, 21): secondary domains, warm-up, a verified list, no tracking, and the footer. Send only to US businesses and UK limited companies. **UK sole traders and partnerships need consent under PECR**, and DE/AT are excluded.
5. **Promised gifts must be deliverable:** the agent list (a1), the test campaign (a2), the drafts (b1), the venue list (b2), the brand list (c1) and the video (c2) each need a data source and a person to make them.
6. Nothing has been sent and no contacts were added anywhere.

Files: `<slug>.txt` holds the load-ready copy (`===` separates the steps; step 1 is a new thread on day 0, step 2 replies in thread on day 3-4, step 3 closes in thread on day 8-10). `<slug>-r1.txt` keeps round 1. `<slug>.md` has the spec, compliance and scores. `critic/` holds the raw critic output per round plus the persona/spec the critic was given.
