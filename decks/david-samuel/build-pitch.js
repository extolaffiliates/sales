// Extol x David Samuel, rebuilt on the slide structure of Pitch's "Competitor Analysis" gallery template
// (template 80368163-3e5e-429f-b1c8-fabdaf2456b7): cover, monogram, two-list agenda, section dividers,
// big-number stats, question + bullets, chart with insights panel, comparison table, three-column trends,
// four-box types grid, central hub ("five forces"), nested market-size squares, line chart, profile table, end.
// Visual look is Pitch-like (big bold sans, generous space) in Extol's brand greens.
//
// Build: NODE_PATH=<node_modules with pptxgenjs, react, react-dom, react-icons, sharp, jszip> \
//        APPLY_THEME=<pptx skill>/scripts/apply_theme.js node build-pitch.js out.pptx
const pptxgen = require("pptxgenjs");
const { applyTheme } = require(process.env.APPLY_THEME || "./apply_theme.js");

const OUT = process.argv[2] || "deck.pptx";
const HEX = { forest: "101F14", pine: "1D3524", green: "2B4A34", moss: "7E9C6B", sage: "9EBB80", pistachio: "C6DE9F", cream: "E9F0C9", grey: "5B6B5E", tint: "F2F6E6" };
const FONT = "Helvetica";
const THEME = {
  name: "Extol Affiliates", headFontFace: FONT, bodyFontFace: FONT,
  colors: { dk1: HEX.forest, lt1: "FFFFFF", dk2: HEX.pine, lt2: HEX.cream, accent1: HEX.green, accent2: HEX.moss,
    accent3: HEX.sage, accent4: HEX.pistachio, accent5: HEX.grey, accent6: HEX.tint, hlink: HEX.green, folHlink: HEX.moss },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Extol Affiliates x David Samuel";
pres.author = "Extol Affiliates";
pres.company = "Extol Affiliates";
pres.theme = { headFontFace: FONT, bodyFontFace: FONT };
const C = pres.SchemeColor;
// text1 forest · text2 pine · background1 white · background2 cream
// accent1 green · accent2 moss · accent3 sage · accent4 pistachio · accent5 grey · accent6 tint

// The template repeats a three-part meta row (brand · Confidential · date) on its cover and dividers.
const META = ["Extol Affiliates", "Confidential", "October 2026"];
function metaRow(dark) {
  return META.map((m, i) => ({ text: { text: m, options: { x: 0.7 + i * 4.1, y: 6.75, w: 3.9, h: 0.35, fontSize: 13, bold: i === 0, color: dark ? C.accent4 : C.text1, margin: 0 } } }));
}

// ---------- layouts ----------
pres.defineSlideMaster({
  title: "COVER",
  background: { color: C.accent1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 0.7, w: 12, h: 4.6, fontSize: 96, bold: true, color: C.background2, fontFace: FONT, margin: 0, valign: "top", align: "left", charSpacing: -2 }, text: "" } },
    { line: { x: 0.7, y: 6.55, w: 11.93, h: 0, line: { color: C.accent3, width: 1 } } },
    ...metaRow(true),
  ],
});
pres.defineSlideMaster({
  title: "DIVIDER",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 2.2, w: 12, h: 1.6, fontSize: 80, bold: true, color: C.background2, fontFace: FONT, margin: 0, valign: "top", align: "left", charSpacing: -2 }, text: "" } },
    { placeholder: { options: { name: "sub", type: "body", x: 0.7, y: 3.9, w: 10, h: 0.8, fontSize: 24, color: C.accent3, margin: 0, valign: "top" }, text: "" } },
    { line: { x: 0.7, y: 6.55, w: 11.93, h: 0, line: { color: C.accent1, width: 1 } } },
    ...metaRow(true),
  ],
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 0.55, w: 11.9, h: 0.85, fontSize: 36, bold: true, color: C.text1, fontFace: FONT, margin: 0, valign: "top", align: "left", charSpacing: -1 }, text: "" } },
    { placeholder: { options: { name: "sub", type: "body", x: 0.7, y: 1.4, w: 11.9, h: 0.45, fontSize: 18, color: C.accent2, margin: 0, valign: "top" }, text: "" } },
    { text: { text: "Extol Affiliates  ×  David Samuel", options: { x: 0.7, y: 7.0, w: 6, h: 0.25, fontSize: 9, color: C.accent3, margin: 0 } } },
  ],
  slideNumber: { x: 12.2, y: 7.0, w: 0.45, h: 0.25, fontSize: 9, color: C.accent3, align: "right" },
});

// ---------- helpers ----------
let k = 0;
const id = (p) => `${p}-${++k}`;
function t(s, text, o) {
  s.addText(text, Object.assign({ isTextBox: true, margin: 0, valign: "top", fontSize: 16, color: C.text1, objectName: id("text") }, o));
}
function box(s, x, y, w, h, fill = C.accent6, line) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { color: line || fill, width: 1 }, objectName: id("box") });
}
function content(title, sub, notes) {
  const s = pres.addSlide({ masterName: "CONTENT" });
  s.addText(title, { placeholder: "title" });
  if (sub) s.addText(sub, { placeholder: "sub" });
  if (notes) s.addNotes(notes);
  return s;
}
function divider(title, sub) {
  const s = pres.addSlide({ masterName: "DIVIDER" });
  s.addText(title, { placeholder: "title" });
  s.addText(sub, { placeholder: "sub" });
  return s;
}
// Template's three-column "Trend #n" slides: label, bold heading, short body.
function threeCols(s, items, y = 2.3, label = "") {
  const w = (11.93 - 0.4 * 2) / 3;
  items.forEach(([h, d], i) => {
    const x = 0.7 + i * (w + 0.4);
    s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color: C.accent1, width: 2.5 }, objectName: id("rule") });
    t(s, `${label}${label ? " #" + (i + 1) : String(i + 1).padStart(2, "0")}`, { x, y: y + 0.25, w, h: 0.35, fontSize: 13, bold: true, color: C.accent2 });
    t(s, h, { x, y: y + 0.65, w, h: 0.9, fontSize: 24, bold: true });
    t(s, d, { x, y: y + 1.6, w, h: 2.2, fontSize: 16, color: C.accent5 });
  });
}
// Template's chart slides: an "Insights" panel on the left, the chart on the right, a source line.
function chartSlide(title, sub, insight, source, chart) {
  const s = content(title, sub);
  box(s, 0.7, 2.2, 3.8, 4.4, C.accent6);
  t(s, "Insights", { x: 1.0, y: 2.5, w: 3.2, h: 0.4, fontSize: 18, bold: true, color: C.accent1 });
  t(s, insight, { x: 1.0, y: 3.0, w: 3.2, h: 3.4, fontSize: 15, color: C.text2 });
  s.addChart(chart.type, chart.data, Object.assign({
    x: 4.9, y: 2.2, w: 7.7, h: 4.1, showValue: true, dataLabelColor: HEX.forest, dataLabelFontSize: 14, dataLabelFontFace: "+mn-lt",
    catAxisLabelColor: HEX.forest, catAxisLabelFontSize: 13, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true, valAxisLabelFontFace: "+mn-lt",
    valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, chartColors: [HEX.green],
    showTitle: true, titleColor: HEX.grey, titleFontSize: 13, titleFontFace: "+mn-lt" }, chart.opts));
  t(s, source, { x: 4.9, y: 6.35, w: 7.7, h: 0.3, fontSize: 11, italic: true, color: C.accent5 });
  return s;
}
// Template's tables: dark header row, light rows.
function table(s, header, rows, colW, y = 2.2, rowH = 0.75) {
  const hdr = (x) => ({ text: x, options: { bold: true, color: C.background1, fill: { color: C.accent1 }, fontSize: 14 } });
  const cell = (x, i, j) => ({ text: x, options: { fontSize: 15, bold: j === 0, color: C.text1, fill: { color: i % 2 ? C.background1 : C.accent6 } } });
  s.addTable([header.map(hdr), ...rows.map((r, i) => r.map((c, j) => cell(c, i, j)))], {
    x: 0.7, y, w: 11.93, colW, rowH: [0.55, ...rows.map(() => rowH)], border: { type: "none" }, valign: "middle", margin: [0.06, 0.18, 0.06, 0.18], objectName: id("table") });
}

(async () => {
  // 1 · Cover (template slide 1)
  let s = pres.addSlide({ masterName: "COVER" });
  s.addText("Extol × David Samuel", { placeholder: "title" });
  t(s, "Working together to win new clients.", { x: 0.7, y: 4.6, w: 11, h: 0.8, fontSize: 30, color: C.accent4 });
  s.addNotes("Purpose: agree how David works alongside Extol to advise, guide and bring in new clients.");

  // 2 · Monogram (template slide 2, "C — A")
  s = pres.addSlide({ masterName: "COVER" });
  t(s, "E — D", { x: 0.7, y: 1.2, w: 12, h: 3.2, fontSize: 200, bold: true, color: C.accent4, charSpacing: -6 });
  t(s, "Extol Affiliates and David Samuel. Monday 26 October 2026.", { x: 0.7, y: 4.75, w: 11, h: 0.6, fontSize: 22, color: C.background2 });

  // 3 · Agenda (template slide 3: two numbered lists)
  s = content("Agenda", "Two halves: where Extol is today, and how we grow together.");
  const lists = [["Who we are and what we’ve done", ["What Extol does", "The problem we solve", "What the audit showed", "Our clients so far"]],
    ["What we offer and your role", ["Thought leadership", "The six-part system", "Results and pricing", "Your role", "The first 90 days"]]];
  lists.forEach(([h, items], i) => {
    const x = 0.7 + i * 6.12;
    box(s, x, 2.2, 5.81, 4.4, i ? C.text2 : C.accent6);
    t(s, h, { x: x + 0.4, y: 2.5, w: 5.0, h: 0.5, fontSize: 20, bold: true, color: i ? C.background2 : C.accent1 });
    items.forEach((it, j) => {
      t(s, String(j + 1), { x: x + 0.4, y: 3.25 + j * 0.62, w: 0.5, h: 0.5, fontSize: 18, bold: true, color: i ? C.accent3 : C.accent2 });
      t(s, it, { x: x + 0.95, y: 3.25 + j * 0.62, w: 4.5, h: 0.5, fontSize: 18, color: i ? C.background2 : C.text1 });
    });
  });

  // ===== Who we are =====
  divider("Who we are", "What Extol does, and why it matters.");

  // Big numbers (template slide 5)
  s = content("We make experts the name buyers think of first", "AI agents do the work. Nothing goes out without the client’s approval.");
  [["2", "founders", "Devasya Dwivedi\nAnshul Mikita Prajapati"], ["6", "platforms run per client", "LinkedIn, X, Instagram,\nThreads, Substack, YouTube"], ["2½ h", "a week of client time", "One short note, then\napprovals on their phone"]].forEach(([n, l, d], i) => {
    const x = 0.7 + i * 4.1;
    t(s, n, { x, y: 2.3, w: 3.8, h: 1.7, fontSize: 110, bold: true, color: C.accent1, charSpacing: -4 });
    t(s, l, { x, y: 4.1, w: 3.8, h: 0.45, fontSize: 20, bold: true });
    t(s, d, { x, y: 4.65, w: 3.8, h: 1.0, fontSize: 15, color: C.accent5 });
  });

  // Question + bullets (template slide 7, "Target Market")
  s = content("The problem: buyers don’t know great experts exist");
  box(s, 0.7, 2.0, 4.6, 4.6, C.accent1);
  t(s, "Why do great experts stay invisible to the buyers who need them?", { x: 1.05, y: 2.4, w: 3.9, h: 3.6, fontSize: 30, bold: true, color: C.background2 });
  [["No time", "Experts are busy doing the work. Marketing comes last."],
    ["No system", "New work comes only from referrals, so growth can’t be planned."],
    ["Too much noise", "Buyers ignore generic, AI-written posts and messages."],
    ["Real example", "A former Big Four partner had 1,597 LinkedIn followers and 9 reactions per post."]].forEach(([h, d], i) => {
    const y = 2.05 + i * 1.15;
    t(s, h, { x: 5.8, y, w: 6.8, h: 0.4, fontSize: 20, bold: true, color: i === 3 ? C.accent2 : C.text1 });
    t(s, d, { x: 5.8, y: y + 0.45, w: 6.8, h: 0.55, fontSize: 16, color: C.accent5 });
  });

  // Chart + insights (template slide 19)
  chartSlide("The audit shows it: real stories get 6× more attention", "Same person, same audience, this year’s posts.",
    "Posts with named people in them got 69 reactions on average. Framework posts got 11.\n\n76% of their comments were just “congrats”.\n\nThe expertise is there. It isn’t reaching buyers in a way they notice.",
    "Source: Extol LinkedIn audit, October 2026 (client name kept private)",
    { type: pres.charts.BAR, data: [{ name: "Average reactions", labels: ["Posts with real people", "Framework posts"], values: [69, 11] }],
      opts: { barDir: "col", dataLabelPosition: "outEnd", barGapWidthPct: 70, title: "Average reactions per post", objectName: "stories-chart" } });

  // ===== What we've done =====
  divider("What we’ve done", "The clients we’ve worked with so far.");

  // Comparison table (template slide 17)
  s = content("Three clients, three markets, one method", "3D Images AI and Bloggerly are public. The consultancy is under NDA.");
  table(s, ["Client", "What they sell", "What we did"], [
    ["3D Images AI", "3D product models for Amazon", "Outreach to 2,100+ Amazon brand owners"],
    ["Bloggerly", "SEO articles for businesses", "LinkedIn campaign; leads now asking for calls"],
    ["UK consultancy", "Finance and SAP advice", "Full growth plan, delivered the day after the first call"],
  ], [2.9, 3.9, 5.13], 2.2, 0.85);
  box(s, 0.7, 5.55, 11.93, 0.9, C.accent1);
  t(s, "Our own proof: when Extol’s LinkedIn page reached about 50 followers, new clients started coming to us.",
    { x: 1.05, y: 5.55, w: 11.3, h: 0.9, fontSize: 17, bold: true, color: C.background2, valign: "middle" });

  // ===== What we offer =====
  divider("What we offer", "The system, why each part exists, and what it costs.");

  // Trends (template slide 11)
  s = content("The goal: position the client as a thoughtful leader", "Not an influencer. A voice buyers trust.");
  threeCols(s, [["One signature idea", "The line people remember and repeat. Every post leans on it."],
    ["A clear point of view", "Weekly posts that take a side, in the client’s own voice. Never AI slop."],
    ["Proof and presence", "Client stories (named only with permission), seen in feeds, inboxes, webinars and communities."]], 2.3, "Layer");

  // Types grid (template slide 15)
  s = content("The system has six parts, and we run all of them", "Grouped into four jobs. The next slides go deeper on each.");
  const groups = [["LinkedIn, run by agents", ["Profile and posts", "Comments and connections", "Follow-ups and DMs"]],
    ["Cross-platform posting", ["X and Threads", "Instagram and YouTube", "Substack newsletter"]],
    ["Webinars and community", ["Monthly buyer webinars", "Skool community", "Clips from every session"]],
    ["Website and reporting", ["One place to land", "Articles that rank", "Live dashboard, monthly review"]]];
  groups.forEach(([h, items], i) => {
    const x = 0.7 + (i % 2) * 6.12, y = 2.15 + Math.floor(i / 2) * 2.3, dark = i === 0;
    box(s, x, y, 5.81, 2.05, dark ? C.accent1 : C.accent6);
    t(s, h, { x: x + 0.35, y: y + 0.25, w: 5.1, h: 0.45, fontSize: 20, bold: true, color: dark ? C.background2 : C.accent1 });
    items.forEach((it, j) => t(s, "•  " + it, { x: x + 0.35, y: y + 0.85 + j * 0.37, w: 5.1, h: 0.35, fontSize: 15, color: dark ? C.accent4 : C.text2 }));
  });

  // Hub (template slide 10, Porter's five forces)
  s = content("LinkedIn runs on agents, end to end", "The client spends about 10 minutes a day approving drafts on their phone.");
  const cx = 6.67, cy = 4.3;
  const corners = [["Research", "Finds buyers with a reason to talk this month", 0.7, 2.1], ["Connect", "Personal requests at a human pace: 5 a day, rising to 20", 9.13, 2.1],
    ["Comment and post", "3–5 comments a day, weekly posts in their voice", 0.7, 5.0], ["Follow up and report", "DMs that never pitch; who replied and who booked", 9.13, 5.0]];
  corners.forEach(([h, d, x, y]) => {
    const ex = x < cx ? x + 3.5 : x, ey = y < cy ? y + 1.55 : y;
    s.addShape(pres.shapes.LINE, { x: Math.min(ex, cx), y: Math.min(ey, cy), w: Math.abs(cx - ex), h: Math.abs(cy - ey), flipH: (ex < cx) !== (ey < cy),
      line: { color: C.accent3, width: 1.25 }, objectName: id("spoke") });
    box(s, x, y, 3.5, 1.55, C.accent6, HEX.pistachio);
    t(s, h, { x: x + 0.3, y: y + 0.22, w: 2.9, h: 0.4, fontSize: 18, bold: true, color: C.accent1 });
    t(s, d, { x: x + 0.3, y: y + 0.7, w: 2.9, h: 0.75, fontSize: 14, color: C.text2 });
  });
  s.addShape(pres.shapes.OVAL, { x: cx - 1.6, y: cy - 1.25, w: 3.2, h: 2.5, fill: { color: C.accent1 }, line: { color: C.accent1 }, objectName: id("hub") });
  t(s, "The client approves", { x: cx - 1.4, y: cy - 0.75, w: 2.8, h: 0.5, fontSize: 19, bold: true, color: C.background2, align: "center" });
  t(s, "Nothing goes out without a yes", { x: cx - 1.4, y: cy - 0.15, w: 2.8, h: 0.6, fontSize: 13, color: C.accent4, align: "center" });

  // Success factors (template slide 12)
  s = content("One idea, published everywhere buyers look", "LinkedIn, X, Instagram, Threads, Substack and YouTube.");
  threeCols(s, [["Write once", "The client sends one short note a week: a voice note or a few lines."],
    ["Adapt per platform", "Each platform gets its own version, never a copy-paste. Buyers and community audiences stay separate."],
    ["Own the audience", "The Substack newsletter builds a list the client owns, not one an algorithm owns."]], 2.3, "Step");

  // Market leaders (template slide 14)
  s = content("Webinars and community turn followers into clients", "Buyer sessions sell the expertise. Community sessions build the audience.");
  [["#1  Webinars", "Monthly, 45 minutes. Buyers bring a real problem; the expert solves it live. Every attendee followed up within 48 hours."],
    ["#2  Clips", "Every session is cut into short clips for every platform, so one hour feeds a month of posts."],
    ["#3  Skool community", "Waitlist, free taster, paid cohorts and a self-paced membership. Agents handle admin and reminders."]].forEach(([h, d], i) => {
    const x = 0.7 + i * 4.1, dark = i === 2;
    box(s, x, 2.2, 3.81, 3.2, dark ? C.accent1 : C.accent6);
    t(s, h, { x: x + 0.35, y: 2.55, w: 3.1, h: 0.5, fontSize: 22, bold: true, color: dark ? C.background2 : C.accent1 });
    t(s, d, { x: x + 0.35, y: 3.25, w: 3.1, h: 2.9, fontSize: 16, color: dark ? C.accent4 : C.text2 });
  });

  // Trends (Taste)
  s = content("Every piece passes our Taste system", "Taste is Extol’s creative-direction library: 200+ proven posts, reels and websites, each broken down.");
  threeCols(s, [["Match", "Each new piece is matched to the one reference that fits its goal."],
    ["Apply", "We use that reference’s craft: structure, pacing, type and layout."],
    ["Never copy", "Their assets stay theirs. Colours and voice stay the client’s."]], 2.3, "Rule");

  // Chart + insights: outreach
  chartSlide("What we expect outreach to produce each month", "At full pace: 20 connection requests a day.",
    "37% of requests accepted. Warm contacts accept far more than cold.\n\n18% of those reply, because every note names a reason to talk.\n\n30% of replies book a call. No pitch in the first message.",
    "Planning estimates from our consultancy client’s plan, not yet proven results",
    { type: pres.charts.BAR, data: [{ name: "Per month", labels: ["Requests", "Accepted", "Replied", "Calls booked"], values: [400, 150, 27, 8] }],
      opts: { barDir: "bar", catAxisOrientation: "maxMin", dataLabelPosition: "outEnd", barGapWidthPct: 55, title: "Outreach in one month (estimate)", objectName: "funnel-chart" } });

  // Line chart + insights (template slide 18)
  chartSlide("Leads should build up month by month", "Qualified leads per month: buyers who reply, book or sign up. Likes don’t count.",
    "Month 1 is set-up and warm-up, so leads start small.\n\nBy month 6 the system passes 100 qualified leads a month.\n\nBig contracts take 6–12 months to close, so the first win usually lands in months 6–12.",
    "Forecast mid-points from our consultancy client’s plan, not yet proven",
    { type: pres.charts.LINE, data: [{ name: "Qualified leads", labels: ["Month 1", "Month 3", "Month 6", "Month 12"], values: [13, 71, 101, 126] }],
      opts: { dataLabelPosition: "t", lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 9, title: "Qualified leads per month (forecast)", objectName: "leads-chart" } });

  // Nested squares (template slide 9, market size)
  s = content("From 100 leads to 2–3 clients a month", "The client’s own rule of thumb, by month 6.");
  const nest = [["100", "qualified leads a month", 4.6, C.accent6, C.accent1], ["10", "real sales calls", 3.3, C.accent4, C.accent1], ["2–3", "new clients", 2.0, C.accent1, C.background2]];
  nest.forEach(([n, l, d, fill, col], i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 6.6 - d, w: d, h: d, fill: { color: fill }, line: { color: HEX.green, width: 1 }, objectName: id("nest") });
    t(s, n, { x: 0.95, y: 6.6 - d + 0.2, w: d - 0.4, h: 0.7, fontSize: 30, bold: true, color: col });
    t(s, l, { x: 0.95, y: 6.6 - d + 0.85, w: d - 0.4, h: 0.35, fontSize: 13, color: col });
  });
  [["Leads", "Buyers and shortlisters who reply, message, book or sign up. Quality over quantity."],
    ["Calls", "About 1 in 10 leads is worth a real sales conversation."],
    ["Clients", "2–3 paying clients, at the pace the firm can deliver well."]].forEach(([h, d], i) => {
    const y = 2.2 + i * 1.45;
    t(s, h, { x: 6.0, y, w: 6.6, h: 0.45, fontSize: 22, bold: true, color: C.accent1 });
    t(s, d, { x: 6.0, y: y + 0.5, w: 6.6, h: 0.8, fontSize: 16, color: C.accent5 });
  });

  // Profile table (template slide 20): pricing
  s = content("What it costs: one fee, every tool included", "Founding-client price. Prices exclude VAT.");
  table(s, ["When", "Fee", "What it covers"], [
    ["Month 1", "£1,500", "Set-up, voice interview and website build"],
    ["Months 2–3", "£1,200 a month", "Founding price: full delivery and weekly call"],
    ["Month 4 onwards", "£2,500 a month", "Every platform, agent, Skool, webinar tool and report"],
  ], [3.0, 3.2, 5.73], 2.2, 0.8);
  box(s, 0.7, 5.35, 11.93, 1.05, C.accent1);
  t(s, "Our promise: at day 60 we review the results together. If we’re behind plan, we fix it in writing, or the client can leave.",
    { x: 1.05, y: 5.35, w: 11.3, h: 1.05, fontSize: 17, bold: true, color: C.background2, valign: "middle" });

  // Chart + insights: payback
  chartSlide("One client win can pay for the whole year", "Year-one fee: £26,400.",
    "Return on the fee, on profit at a 50% margin:\n\n0.9×  one small advisory piece\n2.8×  one mid-size engagement\n9.5×  two engagements\n\nMost cash from big contracts lands in year two.",
    "Illustrative figures from the consultancy plan, not results",
    { type: pres.charts.BAR, data: [{ name: "Value", labels: ["Year-one fee", "Small advisory piece", "Mid-size engagement", "Two engagements"], values: [26400, 50000, 150000, 500000] }],
      opts: { barDir: "bar", catAxisOrientation: "maxMin", dataLabelPosition: "outEnd", dataLabelFormatCode: "£#,##0", barGapWidthPct: 55, title: "Fee vs. value of a client win (£)", objectName: "payback-chart" } });

  // ===== Your role =====
  divider("Your role", "How you can help, and how we’d work together.");

  // Market leaders (template slide 14)
  s = content("Three ways you can help us grow", "Working alongside us, not for us.");
  [["#1  Advise", "Sharpen our offer, pricing and pitch. Sit in on key pitches and debrief us."],
    ["#2  Guide", "Help us choose the one market to own first, and tell us which proof your network trusts."],
    ["#3  Introduce", "Connect us with experts and firms who need us, and join first calls where your name helps."]].forEach(([h, d], i) => {
    const x = 0.7 + i * 4.1, dark = i === 2;
    box(s, x, 2.2, 3.81, 3.2, dark ? C.accent1 : C.accent6);
    t(s, h, { x: x + 0.35, y: 2.55, w: 3.1, h: 0.5, fontSize: 24, bold: true, color: dark ? C.background2 : C.accent1 });
    t(s, d, { x: x + 0.35, y: 3.3, w: 3.1, h: 2.8, fontSize: 17, color: dark ? C.accent4 : C.text2 });
  });

  // Types grid (template slide 15)
  s = content("Where your experience matters most", "Being honest about our gaps gets better advice.");
  [["Proof", "No case study with hard numbers yet.", "What proof would your network trust?"],
    ["Focus", "We work in three very different markets.", "Which one should we own?"],
    ["Pricing", "Our price is tested with only one client.", "Is it right for the value?"],
    ["Growth", "Two founders do sales and delivery.", "When should we hire, and who?"]].forEach(([h, now, q], i) => {
    const x = 0.7 + (i % 2) * 6.12, y = 2.15 + Math.floor(i / 2) * 2.3;
    box(s, x, y, 5.81, 2.05, C.accent6);
    t(s, h, { x: x + 0.35, y: y + 0.25, w: 5.1, h: 0.45, fontSize: 22, bold: true, color: C.accent1 });
    t(s, now, { x: x + 0.35, y: y + 0.85, w: 5.1, h: 0.45, fontSize: 16, color: C.text2 });
    t(s, q, { x: x + 0.35, y: y + 1.3, w: 5.1, h: 0.45, fontSize: 16, bold: true, color: C.accent2 });
  });

  // Profile table (template slide 20): options
  s = content("How we could work together: three options", "Terms to agree together. We suggest starting with A for 90 days.");
  table(s, ["Option", "How it works", "Best when"], [
    ["A. Referral partner", "A share of fees from clients you introduce, for their first year", "You want simple, results-only terms"],
    ["B. Advisor", "Set hours each month, plus a smaller share of fees", "Advice is the main value"],
    ["C. Strategic advisor", "A small stake in Extol, once the fit is proven", "We both want long-term alignment"],
  ], [3.0, 5.4, 3.53], 2.2, 0.95);
  t(s, "Review together at day 90, then move to B or C if it works for both sides.", { x: 0.7, y: 5.75, w: 11.9, h: 0.4, fontSize: 15, italic: true, color: C.accent5 });

  // Trends: 90 days
  s = content("The first 90 days together", "Which market do you know best? Who comes to mind first?");
  const tl = [["Week 1", "Agree the role and terms"], ["Day 30", "Choose one market; list 10 people to introduce"],
    ["Day 60", "First introductions and calls"], ["Day 90", "First new client, then review"]];
  const w4 = (11.93 - 0.3 * 3) / 4;
  tl.forEach(([when, what], i) => {
    const x = 0.7 + i * (w4 + 0.3), last = i === 3;
    box(s, x, 2.3, w4, 3.6, last ? C.accent1 : C.accent6);
    t(s, when, { x: x + 0.3, y: 2.6, w: w4 - 0.6, h: 0.9, fontSize: 36, bold: true, color: last ? C.background2 : C.accent1 });
    t(s, what, { x: x + 0.3, y: 3.65, w: w4 - 0.6, h: 2.0, fontSize: 18, color: last ? C.accent4 : C.text2 });
  });

  // End (template slide 21)
  s = pres.addSlide({ masterName: "COVER" });
  s.addText("End", { placeholder: "title" });
  t(s, "You know the people. We build the system.", { x: 0.7, y: 2.65, w: 11.5, h: 0.8, fontSize: 34, bold: true, color: C.accent4 });
  t(s, "Devasya Dwivedi  ·  Anshul Mikita Prajapati\nadmin@extolaffiliates.com", { x: 0.7, y: 4.4, w: 11, h: 1.0, fontSize: 20, color: C.background2 });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  // Helvetica only: pptxgenjs hard-codes Arial in a few chart labels and the bullet glyph font.
  const JSZip = require("jszip");
  const fs = require("fs");
  const zip = await JSZip.loadAsync(fs.readFileSync(OUT));
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/(charts\/chart\d+|slideMasters\/slideMaster\d+|slideLayouts\/slideLayout\d+)\.xml$/.test(n))) {
    const xml = await zip.file(name).async("string");
    zip.file(name, xml.replace(/typeface="Arial"/g, `typeface="${FONT}"`));
  }
  fs.writeFileSync(OUT, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  console.log("wrote", OUT);
})();
