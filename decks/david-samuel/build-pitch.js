// Extol x David Samuel, built to match Pitch's "Competitor Analysis" gallery template
// (template 80368163-3e5e-429f-b1c8-fabdaf2456b7) from screenshots of it:
// pure white ground, black type, no accent colour; DM Sans (regular) for titles, numbers and body;
// DM Mono for meta labels (brand · date · Confidential, section names, small stats).
// Layouts copied from the template: brand cover with mono stats, centred monogram with mono corners,
// "Agenda" with four bottom columns, section title bottom-left with a ↘ arrow, centred big numbers.
//
// Build: NODE_PATH=<node_modules with pptxgenjs, jszip> APPLY_THEME=<pptx skill>/scripts/apply_theme.js \
//        node build-pitch.js out.pptx
const pptxgen = require("pptxgenjs");
const { applyTheme } = require(process.env.APPLY_THEME || "./apply_theme.js");

const OUT = process.argv[2] || "deck.pptx";
const SANS = "DM Sans", MONO = "DM Mono";
const THEME = {
  name: "Competitor Analysis", headFontFace: SANS, bodyFontFace: SANS,
  colors: { dk1: "000000", lt1: "FFFFFF", dk2: "000000", lt2: "F2F2F2", accent1: "000000", accent2: "6B6B6B",
    accent3: "BDBDBD", accent4: "E6E6E6", accent5: "4D4D4D", accent6: "F5F5F5", hlink: "000000", folHlink: "4D4D4D" },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Extol Affiliates x David Samuel";
pres.author = "Extol Affiliates";
pres.company = "Extol Affiliates";
pres.theme = { headFontFace: SANS, bodyFontFace: SANS };
const C = pres.SchemeColor;
// text1 black · background1 white · accent2 mid grey · accent3 light grey · accent5 dark grey

const X = 0.64, R = 12.69, W = R - X;             // template margins (69px of 1440)
const BRAND = "Extol Affiliates", DATE = "October 2026", CONF = "Confidential";

pres.defineSlideMaster({ title: "BLANK", background: { color: C.background1 }, objects: [] });

let k = 0;
const id = (p) => `${p}-${++k}`;
function t(s, text, o) {
  s.addText(text, Object.assign({ isTextBox: true, margin: 0, valign: "top", fontFace: SANS, fontSize: 16, color: C.text1, objectName: id("text") }, o));
}
const mono = (s, text, o) => t(s, text, Object.assign({ fontFace: MONO, fontSize: 13 }, o));
function rule(s, x, y, w, weight = 0.75) {
  s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color: C.text1, width: weight }, objectName: id("rule") });
}
// Template's top meta row: brand left, then date and Confidential on the right.
function metaRow(s, right) {
  mono(s, BRAND, { x: X, y: 0.72, w: 4, h: 0.3 });
  if (right) mono(s, right, { x: R - 6, y: 0.72, w: 6, h: 0.3, align: "right" });
}
function slide(notes) {
  const s = pres.addSlide({ masterName: "BLANK" });
  if (notes) s.addNotes(notes);
  return s;
}
// Section divider (template "Market Analysis"): meta row, huge title bottom-left, ↘ arrow bottom-right.
function section(title) {
  const s = slide();
  mono(s, BRAND, { x: X, y: 0.72, w: 4, h: 0.3 });
  mono(s, DATE, { x: 8.1, y: 0.72, w: 2.5, h: 0.3 });
  mono(s, CONF, { x: R - 2.5, y: 0.72, w: 2.5, h: 0.3, align: "right" });
  t(s, title, { x: X - 0.04, y: 3.2, w: 10.2, h: 3.75, fontSize: 112, valign: "bottom", lineSpacingMultiple: 0.86 });
  s.addShape(pres.shapes.LINE, { x: 11.95, y: 5.95, w: 0.72, h: 0.72, line: { color: C.text1, width: 7, endArrowType: "arrow" }, objectName: id("arrow") });
  return s;
}
// Content slide: meta row (brand · section), title top-left in DM Sans.
function content(sectionName, title, notes) {
  const s = slide(notes);
  metaRow(s, sectionName);
  t(s, title, { x: X - 0.02, y: 1.2, w: W, h: 1.3, fontSize: 40, lineSpacingMultiple: 0.95 });
  return s;
}
// Columns with a hairline on top, mono index, sans heading and body.
function cols(s, items, y = 3.0, h = 3.6) {
  const n = items.length, gap = 0.4, w = (W - gap * (n - 1)) / n;
  items.forEach(([label, head, body], i) => {
    const x = X + i * (w + gap);
    rule(s, x, y, w);
    mono(s, label, { x, y: y + 0.2, w, h: 0.3 });
    t(s, head, { x, y: y + 0.65, w, h: 0.9, fontSize: 24 });
    t(s, body, { x, y: y + 1.55, w, h: h - 1.6, fontSize: 15, color: C.accent5 });
  });
}
function chartOpts(o) {
  return Object.assign({ showValue: true, dataLabelColor: "000000", dataLabelFontSize: 14, dataLabelFontFace: "+mn-lt",
    catAxisLabelColor: "000000", catAxisLabelFontSize: 13, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true, valAxisLabelFontFace: "+mn-lt",
    valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, chartColors: ["000000"] }, o);
}
// Template chart slides: "Insights" text on the left, chart on the right, mono caption and source.
function chartSlide(sectionName, title, insight, caption, source, chart) {
  const s = content(sectionName, title);
  mono(s, "Insights", { x: X, y: 2.9, w: 3.6, h: 0.3 });
  rule(s, X, 3.3, 3.6);
  t(s, insight, { x: X, y: 3.5, w: 3.6, h: 3.1, fontSize: 15, color: C.accent5 });
  mono(s, caption, { x: 4.9, y: 2.9, w: 7.8, h: 0.3 });
  s.addChart(chart.type, chart.data, chartOpts(Object.assign({ x: 4.9, y: 3.25, w: 7.8, h: 3.35 }, chart.opts)));
  mono(s, source, { x: 4.9, y: 6.75, w: 7.8, h: 0.3, fontSize: 10, color: C.accent2 });
  return s;
}
// Hairline table, mono header row.
function table(s, header, rows, colW, y = 2.9, rowH = 0.7) {
  const hdr = (x) => ({ text: x, options: { fontFace: MONO, fontSize: 12, color: C.text1 } });
  const cell = (x, j) => ({ text: x, options: { fontFace: SANS, fontSize: j === 0 ? 18 : 15, color: j === 0 ? C.text1 : C.accent5 } });
  s.addTable([header.map(hdr), ...rows.map((r) => r.map(cell))], {
    x: X, y, w: W, colW, rowH: [0.45, ...rows.map(() => rowH)],
    border: [{ type: "solid", pt: 0.75, color: "000000" }, { type: "none" }, { type: "none" }, { type: "none" }],
    valign: "middle", margin: [0.05, 0.1, 0.05, 0], objectName: id("table") });
}
// Hub: outline circle in the centre, hairline boxes around it.
function hub(s, cx, cy, centre, sats, rx = 3.0, ry = 1.75, bw = 2.5) {
  const pts = sats.map((_, i) => { const a = (-90 + i * 360 / sats.length) * Math.PI / 180; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
  pts.forEach(([sx, sy]) => s.addShape(pres.shapes.LINE, { x: Math.min(cx, sx), y: Math.min(cy, sy), w: Math.max(Math.abs(sx - cx), 0.001), h: Math.max(Math.abs(sy - cy), 0.001),
    flipH: (sx < cx) !== (sy < cy), line: { color: C.accent3, width: 0.75 }, objectName: id("spoke") }));
  sats.forEach(([h, d], i) => {
    const [sx, sy] = pts[i];
    s.addShape(pres.shapes.RECTANGLE, { x: sx - bw / 2, y: sy - 0.4, w: bw, h: 0.8, fill: { color: C.background1 }, line: { color: C.text1, width: 0.75 }, objectName: id("sat") });
    t(s, h, { x: sx - bw / 2 + 0.18, y: sy - 0.32, w: bw - 0.3, h: 0.32, fontSize: 15 });
    mono(s, d, { x: sx - bw / 2 + 0.18, y: sy + 0.02, w: bw - 0.3, h: 0.3, fontSize: 10, color: C.accent2 });
  });
  s.addShape(pres.shapes.OVAL, { x: cx - 1.1, y: cy - 1.1, w: 2.2, h: 2.2, fill: { color: C.background1 }, line: { color: C.text1, width: 1 }, objectName: id("hub") });
  t(s, centre, { x: cx - 1.0, y: cy - 0.6, w: 2.0, h: 1.2, fontSize: 17, align: "center", valign: "middle" });
}

(async () => {
  // 1 · Cover (template brand slide: tagline, huge name, mono stats along the bottom)
  let s = slide("Purpose: agree how David works alongside Extol to advise, guide and bring in new clients.");
  t(s, "Working together to win new clients.", { x: X, y: 1.72, w: 9, h: 0.5, fontSize: 21 });
  t(s, "Extol × David", { x: X - 0.06, y: 2.15, w: 12.2, h: 2.2, fontSize: 112 });
  [["26 October 2026", "Partner briefing"], ["David Samuel", "Advisor"], ["Extol Affiliates", "Growth systems"]].forEach(([a, b], i) =>
    mono(s, a + "\n" + b, { x: X + i * 4.08, y: 6.18, w: 3.9, h: 0.6, fontSize: 15 }));

  // 2 · Monogram (template "C — A")
  s = slide();
  mono(s, BRAND, { x: X, y: 0.6, w: 4, h: 0.3 });
  mono(s, "Partner Briefing", { x: R - 4, y: 0.6, w: 4, h: 0.3, align: "right" });
  t(s, "E — D", { x: 0, y: 2.55, w: 13.333, h: 2.0, fontSize: 118, align: "center", valign: "middle" });
  mono(s, DATE, { x: X, y: 6.42, w: 4, h: 0.3 });
  mono(s, CONF, { x: R - 4, y: 6.42, w: 4, h: 0.3, align: "right" });

  // 3 · Agenda (template: huge title, four columns at the bottom)
  s = slide();
  t(s, "Agenda", { x: X - 0.04, y: 0.42, w: 8, h: 1.5, fontSize: 88 });
  const ag = [["Extol", ["Who we are", "What we’ve done", "What we offer", "Results and pricing"]],
    ["Together", ["Your role", "Where you can help", "How we work together", "The first 90 days"]]];
  ag.forEach(([label, items], i) => {
    mono(s, label, { x: X + i * 6.13, y: 4.72, w: 2.9, h: 0.35, fontSize: 15 });
    t(s, items.map((it, j) => ({ text: `${j + 1}. ${it}`, options: { breakLine: j < items.length - 1 } })),
      { x: X + 3.06 + i * 6.13, y: 4.68, w: 3.0, h: 2.2, fontSize: 18, lineSpacingMultiple: 1.25 });
  });

  // ===== Who we are =====
  section("Who\nwe are");

  // Big numbers (template: mono brand left + mono tagline right, centred numbers with sans labels)
  s = slide("Extol is two founders plus AI agents we built ourselves. Agents do the work; people approve it.");
  mono(s, BRAND, { x: X, y: 0.72, w: 4, h: 0.3, fontSize: 15 });
  mono(s, "We make experts the name buyers think of first.", { x: R - 7, y: 0.72, w: 7, h: 0.3, fontSize: 15, align: "right" });
  [["2", "Founders"], ["6", "Platforms per client"], ["2½h", "A week of client time"]].forEach(([n, l], i) => {
    const x = 0.75 + i * 4.0;
    t(s, n, { x, y: 2.75, w: 4.0, h: 1.4, fontSize: 92, align: "center", valign: "bottom" });
    t(s, l, { x, y: 4.2, w: 4.0, h: 0.45, fontSize: 18, align: "center" });
  });
  mono(s, "Devasya Dwivedi · Anshul Mikita Prajapati", { x: 0, y: 6.4, w: 13.333, h: 0.3, align: "center", color: C.accent2 });

  s = content("Who we are", "The problem: buyers don’t know great experts exist",
    "Example from a real October audit of a client (name kept private).");
  cols(s, [["01", "No time", "Experts are busy doing the work. Marketing comes last."],
    ["02", "No system", "New work comes only from referrals, so growth can’t be planned."],
    ["03", "Too much noise", "Buyers ignore generic, AI-written posts and messages."]], 3.0, 2.6);
  mono(s, "Real example: a former Big Four partner had 1,597 LinkedIn followers and 9 reactions per post.", { x: X, y: 6.3, w: W, h: 0.3, color: C.accent2 });

  s = chartSlide("Who we are", "The audit shows it: real stories get 6× more attention",
    "Posts with named people got 69 reactions on average. Framework posts got 11.\n\n76% of their comments were just “congrats”.\n\nThe expertise is there. It isn’t reaching buyers.",
    "Average reactions per post", "Source: Extol LinkedIn audit, October 2026 (client name kept private)",
    { type: pres.charts.BAR, data: [{ name: "Reactions", labels: ["Posts with real people", "Framework posts"], values: [69, 11] }],
      opts: { w: 4.5, barDir: "col", dataLabelPosition: "outEnd", barGapWidthPct: 70, objectName: "stories-chart" } });
  mono(s, "What their comments said", { x: 9.75, y: 2.9, w: 2.95, h: 0.3 });
  s.addChart(pres.charts.DOUGHNUT, [{ name: "Comments", labels: ["Just “congrats”", "Made a real point"], values: [76, 24] }], {
    x: 9.6, y: 3.25, w: 3.1, h: 3.35, holeSize: 62, chartColors: ["000000", "BDBDBD"], showPercent: true, showValue: false,
    dataLabelColor: "FFFFFF", dataLabelFontSize: 13, dataLabelFontFace: "+mn-lt", showLegend: true, legendPos: "b",
    legendFontSize: 11, legendFontFace: "+mn-lt", legendColor: "000000", objectName: "comments-chart" });

  // ===== What we've done =====
  section("What\nwe’ve done");

  s = content("What we’ve done", "Three clients, three markets, one method",
    "3D Images AI and Bloggerly are public. The consultancy is under NDA.");
  table(s, ["Client", "What they sell", "What we did"], [
    ["3D Images AI", "3D product models for Amazon", "Outreach to 2,100+ Amazon brand owners"],
    ["Bloggerly", "SEO articles for businesses", "LinkedIn campaign; leads now asking for calls"],
    ["UK consultancy", "Finance and SAP advice (under NDA)", "Full growth plan, delivered the day after the first call"],
  ], [3.0, 3.9, 5.15]);
  rule(s, X, 5.65, W);
  t(s, "Our own proof: when Extol’s LinkedIn page reached about 50 followers, new clients started coming to us.", { x: X, y: 5.85, w: W, h: 0.5, fontSize: 18 });

  // ===== What we offer =====
  section("What\nwe offer");

  s = content("What we offer", "The goal: position the client as a thoughtful leader",
    "Thought leadership is the strategy; every channel serves it.");
  cols(s, [["Layer 01", "One signature idea", "The line people remember and repeat. Every post leans on it."],
    ["Layer 02", "A clear point of view", "Weekly posts that take a side, in the client’s own voice."],
    ["Layer 03", "Proof and presence", "Client stories, named only with permission, seen in feeds, inboxes, webinars and communities."]], 2.95, 2.9);
  mono(s, "Not an influencer. A voice buyers trust.", { x: X, y: 6.3, w: W, h: 0.3, color: C.accent2 });

  s = content("What we offer", "The system has six parts, and we run all of them");
  const parts = [["01", "LinkedIn, run by agents", "Profile, posts, comments, connections, follow-ups."],
    ["02", "Cross-platform posting", "One idea out to X, Instagram, Threads, Substack, YouTube."],
    ["03", "Webinars", "A monthly session that turns followers into conversations."],
    ["04", "Community on Skool", "Waitlist, cohorts and a self-paced membership."],
    ["05", "Website and articles", "One place to land, and articles that rank in search."],
    ["06", "Reporting", "A live dashboard and a monthly review of what works."]];
  const pw = (W - 0.8) / 3;
  parts.forEach(([n, h, d], i) => {
    const x = X + (i % 3) * (pw + 0.4), y = 2.75 + Math.floor(i / 3) * 1.95;
    rule(s, x, y, pw);
    mono(s, n, { x, y: y + 0.18, w: pw, h: 0.3 });
    t(s, h, { x, y: y + 0.55, w: pw, h: 0.45, fontSize: 21 });
    t(s, d, { x, y: y + 1.05, w: pw, h: 0.65, fontSize: 14, color: C.accent5 });
  });

  s = content("What we offer", "LinkedIn runs on agents, end to end",
    "Pace stays well under LinkedIn's limits: 5 requests a day, rising to 20.");
  hub(s, 4.5, 4.75, "The client\napproves", [["Research", "buyers with a reason"], ["Connect", "at a human pace"], ["Comment", "3–5 a day"],
    ["Post", "weekly, in their voice"], ["Follow up", "DMs, never a pitch"], ["Report", "who replied and booked"]]);
  mono(s, "Client time", { x: 9.45, y: 3.0, w: 3.2, h: 0.3 });
  rule(s, 9.45, 3.4, 3.24);
  t(s, "About 10 minutes a day, approving drafts on their phone.", { x: 9.45, y: 3.6, w: 3.24, h: 1.3, fontSize: 20 });
  t(s, "They never write from scratch, chase connections, or remember who to follow up.", { x: 9.45, y: 5.0, w: 3.24, h: 1.2, fontSize: 14, color: C.accent5 });

  s = content("What we offer", "One idea, published everywhere buyers look",
    "Each platform gets its own version, never a copy-paste.");
  hub(s, 4.5, 4.75, "One note\nfrom the client", [["LinkedIn", "posts, newsletter"], ["X", "takes and threads"], ["Instagram", "carousels and clips"],
    ["Threads", "text versions"], ["Substack", "a list they own"], ["YouTube", "webinar replays"]]);
  mono(s, "Why", { x: 9.45, y: 3.0, w: 3.2, h: 0.3 });
  rule(s, 9.45, 3.4, 3.24);
  t(s, "Write once. Be seen in six places.", { x: 9.45, y: 3.6, w: 3.24, h: 1.0, fontSize: 20 });
  t(s, "Buyers don’t all live on LinkedIn. The newsletter builds an audience the client owns.", { x: 9.45, y: 4.7, w: 3.24, h: 1.4, fontSize: 14, color: C.accent5 });

  s = content("What we offer", "Webinars and community turn followers into clients",
    "Buyer sessions sell the expertise; community sessions build the audience.");
  cols(s, [["Webinars", "Monthly, 45 minutes", "Buyers bring a real problem; the expert solves it live. Every attendee followed up within 48 hours."],
    ["Clips", "One hour, a month of posts", "Every session is cut into short clips for every platform."],
    ["Skool", "The audience’s home", "Waitlist, free taster, paid cohorts and a self-paced membership. Agents handle admin."]], 2.95, 3.4);

  s = content("What we offer", "Every piece passes our Taste system",
    "Taste is Extol's creative-direction library, curated by our team.");
  t(s, "200+", { x: X - 0.04, y: 2.85, w: 4, h: 1.3, fontSize: 80 });
  t(s, "proven posts, reels and websites studied and broken down: why each one works, and when to use it.", { x: X, y: 4.25, w: 3.5, h: 1.6, fontSize: 15, color: C.accent5 });
  [["01", "Match", "Each piece is matched to the one reference that fits it."],
    ["02", "Apply", "We use its craft: structure, pacing, type and layout."],
    ["03", "Never copy", "Their assets stay theirs. Colours and voice stay the client’s."]].forEach(([n, h, d], i) => {
    const y = 2.95 + i * 1.2;
    rule(s, 5.0, y, 7.69);
    mono(s, n, { x: 5.0, y: y + 0.22, w: 0.8, h: 0.3 });
    t(s, h, { x: 5.9, y: y + 0.15, w: 2.4, h: 0.45, fontSize: 21 });
    t(s, d, { x: 8.4, y: y + 0.2, w: 4.29, h: 0.8, fontSize: 15, color: C.accent5 });
  });

  s = content("What we offer", "How it works: 2½ hours a week from the client",
    "This answers the most common worry: 'I don't have time.'");
  cols(s, [["01 · Client", "Sends one short note", "A voice note or a few lines, once a week."],
    ["02 · Extol", "Agents draft", "Posts, clips and messages in the client’s voice."],
    ["03 · Client", "Approves", "Yes, edit or bin, on their phone."],
    ["04 · Extol", "Publishes and reports", "Everywhere, at a human pace, with results tracked."]], 3.0, 2.8);
  mono(s, "Nothing is ever published without the client’s yes.", { x: X, y: 6.3, w: W, h: 0.3, color: C.accent2 });

  chartSlide("What we offer", "Where the client’s 2½ hours a week go",
    "Writing is gone from the client’s week. What’s left is thinking, deciding and one conversation with us.\n\nRaw note: 30 minutes.\nApprovals: about 10 minutes a day.\nWeekly call: 1 hour.",
    "Client time per week (minutes)", "From the consultancy plan: raw note 30 min, approvals about 10 min a day, weekly call 1 hour",
    { type: pres.charts.DOUGHNUT, data: [{ name: "Minutes", labels: ["Weekly call", "Approvals", "Raw note"], values: [60, 50, 30] }],
      opts: { holeSize: 60, chartColors: ["000000", "6B6B6B", "BDBDBD"], showValue: true, dataLabelColor: "FFFFFF", showLegend: true, legendPos: "r",
        legendFontSize: 14, legendFontFace: "+mn-lt", legendColor: "000000", objectName: "time-chart" } });

  chartSlide("What we offer", "What we expect outreach to produce each month",
    "At full pace: 20 connection requests a day.\n\n37% accepted.\n18% of those reply.\n30% of replies book a call.",
    "Outreach in one month (estimate)", "Planning estimates from our consultancy client’s plan, not yet proven results",
    { type: pres.charts.BAR, data: [{ name: "Per month", labels: ["Requests", "Accepted", "Replied", "Calls booked"], values: [400, 150, 27, 8] }],
      opts: { barDir: "bar", catAxisOrientation: "maxMin", dataLabelPosition: "outEnd", barGapWidthPct: 60, objectName: "funnel-chart" } });

  chartSlide("What we offer", "Leads should build up month by month",
    "By month 6: 100 qualified leads a month, 10 real sales calls, 2–3 new clients.\n\nA qualified lead replies, books or signs up. Likes don’t count.\n\nBig contracts take 6–12 months to close.",
    "Qualified leads per month (forecast)", "Forecast mid-points from our consultancy client’s plan, not yet proven",
    { type: pres.charts.LINE, data: [{ name: "Leads", labels: ["Month 1", "Month 3", "Month 6", "Month 12"], values: [13, 71, 101, 126] }],
      opts: { dataLabelPosition: "t", lineSize: 2, lineDataSymbol: "circle", lineDataSymbolSize: 8, objectName: "leads-chart" } });

  s = content("What we offer", "What it costs: one fee, every tool included",
    "Founding-client price. Prices exclude VAT.");
  [["£1,500", "Month 1", "Set-up, voice interview and website build"], ["£1,200", "Months 2–3", "Founding price, full delivery"], ["£2,500", "Month 4 onwards", "Every platform, agent, Skool and webinar tool"]].forEach(([n, when, d], i) => {
    const x = 0.75 + i * 4.0;
    t(s, n, { x, y: 2.75, w: 4.0, h: 1.3, fontSize: 72, align: "center", valign: "bottom" });
    mono(s, when, { x, y: 4.15, w: 4.0, h: 0.3, align: "center" });
    t(s, d, { x: x + 0.4, y: 4.55, w: 3.2, h: 0.8, fontSize: 15, align: "center", color: C.accent5 });
  });
  rule(s, X, 5.75, W);
  t(s, "Our promise: at day 60 we review the results together. If we’re behind plan, we fix it in writing, or the client can leave.", { x: X, y: 5.95, w: W, h: 0.7, fontSize: 16 });

  chartSlide("What we offer", "How the year-one fee adds up",
    "Months 1–3 cost £3,900 at the founding price, instead of £7,500 at the standard fee.\n\nFrom month 4 the fee is £2,500 a month, with every tool included.\n\nYear one in total: £26,400.",
    "Cumulative fee by month (£ thousand)", "Founding-client price. Prices exclude VAT",
    { type: pres.charts.BAR, data: [{ name: "Cumulative fee", labels: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"],
        values: [1.5, 2.7, 3.9, 6.4, 8.9, 11.4, 13.9, 16.4, 18.9, 21.4, 23.9, 26.4] }],
      opts: { barDir: "col", dataLabelPosition: "outEnd", dataLabelFormatCode: "0.0", dataLabelFontSize: 11, barGapWidthPct: 45, objectName: "fee-chart" } });

  chartSlide("What we offer", "One client win can pay for the whole year",
    "Year-one fee: £26,400.\n\nReturn on the fee, on profit at a 50% margin:\n0.9× one small piece\n2.8× one mid-size engagement\n9.5× two engagements",
    "Year-one fee vs. value of a client win (£)", "Illustrative figures from the consultancy plan, not results",
    { type: pres.charts.BAR, data: [{ name: "£", labels: ["Year-one fee", "Small advisory piece", "Mid-size engagement", "Two engagements"], values: [26400, 50000, 150000, 500000] }],
      opts: { barDir: "bar", catAxisOrientation: "maxMin", dataLabelPosition: "outEnd", dataLabelFormatCode: "£#,##0", barGapWidthPct: 60, objectName: "payback-chart" } });

  // ===== Your role =====
  section("Your\nrole");

  s = content("Your role", "Three ways you can help us grow", "Ask David which of the three he wants to lead with.");
  cols(s, [["#1", "Advise", "Sharpen our offer, pricing and pitch. Sit in on key pitches and debrief us."],
    ["#2", "Guide", "Help us choose the one market to own first, and tell us which proof your network trusts."],
    ["#3", "Introduce", "Connect us with experts and firms who need us, and join first calls where your name helps."]], 3.0, 3.0);

  s = content("Your role", "Where your experience matters most", "Being honest about our gaps gets better advice.");
  [["Proof", "No case study with hard numbers yet.", "What proof would your network trust?"],
    ["Focus", "We work in three very different markets.", "Which one should we own?"],
    ["Pricing", "Our price is tested with only one client.", "Is it right for the value?"],
    ["Growth", "Two founders do sales and delivery.", "When should we hire, and who?"]].forEach(([h, now, q], i) => {
    const x = X + (i % 2) * 6.25, y = 2.85 + Math.floor(i / 2) * 1.95, w = 5.8;
    rule(s, x, y, w);
    t(s, h, { x, y: y + 0.18, w, h: 0.45, fontSize: 22 });
    t(s, now, { x, y: y + 0.72, w, h: 0.4, fontSize: 15, color: C.accent5 });
    mono(s, q, { x, y: y + 1.17, w, h: 0.35 });
  });

  s = content("Your role", "How we could work together: three options",
    "Terms deliberately left open to agree in the meeting. Decide our walk-away numbers beforehand.");
  table(s, ["Option", "How it works", "Best when"], [
    ["A. Referral partner", "A share of fees from clients you introduce, for their first year", "Simple, results-only terms (our suggestion to start)"],
    ["B. Advisor", "Set hours each month, plus a smaller share of fees", "Advice is the main value"],
    ["C. Strategic advisor", "A small stake in Extol, once the fit is proven", "Long-term alignment for both sides"],
  ], [3.1, 5.2, 3.75], 2.9, 0.85);
  mono(s, "Start with A for 90 days, then review together.", { x: X, y: 6.3, w: W, h: 0.3, color: C.accent2 });

  s = content("Your role", "The first 90 days together", "Close by asking: which market do you know best, and who comes to mind first?");
  cols(s, [["Week 1", "Agree the role", "Role, terms and a monthly hour in the diary."],
    ["Day 30", "Pick the market", "One market to lead with, and 10 people you could introduce."],
    ["Day 60", "First intros", "First introductions and calls, with you in the room where it helps."],
    ["Day 90", "Review", "First new client signed or in proposal. Decide the long-term model."]], 3.0, 2.8);
  mono(s, "Which market do you know best? Who comes to mind first?", { x: X, y: 6.3, w: W, h: 0.3, color: C.accent2 });

  // End (template brand-slide style)
  s = slide();
  t(s, "You know the people. We build the system.", { x: X, y: 1.72, w: 11, h: 0.5, fontSize: 21 });
  t(s, "Thank you", { x: X - 0.06, y: 2.15, w: 12.2, h: 2.2, fontSize: 132 });
  [["Devasya Dwivedi", "Extol Affiliates"], ["Anshul Mikita Prajapati", "Extol Affiliates"], ["admin@", "extolaffiliates.com"]].forEach(([a, b], i) =>
    mono(s, a + "\n" + b, { x: X + i * 4.08, y: 6.18, w: 3.9, h: 0.6, fontSize: 15 }));

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  // pptxgenjs hard-codes Arial in a few chart labels and the bullet glyph font.
  const JSZip = require("jszip");
  const fs = require("fs");
  const zip = await JSZip.loadAsync(fs.readFileSync(OUT));
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/(charts\/chart\d+|slideMasters\/slideMaster\d+|slideLayouts\/slideLayout\d+)\.xml$/.test(n))) {
    const xml = await zip.file(name).async("string");
    zip.file(name, xml.replace(/typeface="Arial"/g, `typeface="${SANS}"`));
  }
  fs.writeFileSync(OUT, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  console.log("wrote", OUT);
})();
