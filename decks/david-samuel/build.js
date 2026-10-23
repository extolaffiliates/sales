// Extol x David Samuel: self-explanatory partner deck.
// Creative direction: Taste Sheet row T-003 (editorial-paper carousel that sells the system, not the content):
// serif headline with one italic accent word, monoline marginalia diagrams, one green accent, paper ground,
// centred page numbers. Do-not-copy honoured: no content-volume claims we have not earned.
// Colour from Extol's brand palette, not the reference.
//
// Build: NODE_PATH=<node_modules with pptxgenjs, react, react-dom, react-icons, sharp, jszip> \
//        APPLY_THEME=<pptx skill>/scripts/apply_theme.js node build.js out.pptx
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fi = require("react-icons/fi");
const { applyTheme } = require(process.env.APPLY_THEME || "./apply_theme.js");

const OUT = process.argv[2] || "deck.pptx";
const HEX = { forest: "101F14", pine: "1D3524", green: "2B4A34", moss: "7E9C6B", sage: "9EBB80", pistachio: "C6DE9F", cream: "E9F0C9", grey: "5B6B5E", paper: "F6F8EE" };
const HEAD = "Georgia", BODY = "Helvetica";
const THEME = {
  name: "Extol Affiliates", headFontFace: HEAD, bodyFontFace: BODY,
  colors: { dk1: HEX.forest, lt1: "FFFFFF", dk2: HEX.pine, lt2: HEX.cream, accent1: HEX.green, accent2: HEX.moss,
    accent3: HEX.sage, accent4: HEX.pistachio, accent5: HEX.grey, accent6: HEX.paper, hlink: HEX.green, folHlink: HEX.moss },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Extol Affiliates x David Samuel";
pres.author = "Extol Affiliates";
pres.company = "Extol Affiliates";
pres.theme = { headFontFace: HEAD, bodyFontFace: BODY };
const C = pres.SchemeColor;
// text1 forest · text2 pine · background1 white · background2 cream
// accent1 green · accent2 moss · accent3 sage · accent4 pistachio · accent5 grey · accent6 paper

const SECTIONS = ["Who we are", "What we’ve done", "What we offer", "Your role"];

// ---------- layouts ----------
pres.defineSlideMaster({
  title: "COVER",
  background: { color: C.text1 },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: 0.9, y: 1.4, w: 11.5, h: 0.45, fontSize: 13, bold: true, color: C.accent3, charSpacing: 4, margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.9, y: 2.0, w: 11.5, h: 2.4, fontSize: 54, color: C.background2, fontFace: HEAD, margin: 0, valign: "top", align: "left" }, text: "" } },
    { placeholder: { options: { name: "sub", type: "body", x: 0.9, y: 4.55, w: 9.5, h: 1.0, fontSize: 20, color: C.accent4, margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "meta", type: "body", x: 0.9, y: 6.35, w: 11.5, h: 0.4, fontSize: 12, color: C.accent3, charSpacing: 2, margin: 0, valign: "top" }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "SECTION",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "num", type: "body", x: 0.9, y: 1.7, w: 4, h: 1.6, fontSize: 96, italic: true, color: C.accent3, fontFace: HEAD, margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.9, y: 3.45, w: 11.5, h: 1.0, fontSize: 44, color: C.background2, fontFace: HEAD, margin: 0, valign: "top", align: "left" }, text: "" } },
    { placeholder: { options: { name: "sub", type: "body", x: 0.9, y: 4.6, w: 10, h: 0.8, fontSize: 20, color: C.accent4, margin: 0, valign: "top" }, text: "" } },
  ],
  slideNumber: { x: 6.42, y: 6.95, w: 0.5, h: 0.3, fontSize: 10, color: C.accent3, align: "center" },
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.accent6 },
  objects: [
    { placeholder: { options: { name: "tag", type: "body", x: 0.7, y: 0.5, w: 9, h: 0.3, fontSize: 11, bold: true, color: C.accent2, charSpacing: 3, margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 0.88, w: 11.9, h: 0.95, fontSize: 32, color: C.text1, fontFace: HEAD, margin: 0, valign: "top", align: "left" }, text: "" } },
    { line: { x: 0.7, y: 6.85, w: 11.93, h: 0, line: { color: C.accent4, width: 0.75 } } },
    { text: { text: "EXTOL AFFILIATES", options: { x: 0.7, y: 6.97, w: 4, h: 0.28, fontSize: 9, color: C.accent2, charSpacing: 3, margin: 0 } } },
    { text: { text: "× DAVID SAMUEL", options: { x: 8.63, y: 6.97, w: 4, h: 0.28, fontSize: 9, color: C.accent2, charSpacing: 3, margin: 0, align: "right" } } },
  ],
  slideNumber: { x: 6.42, y: 6.97, w: 0.5, h: 0.28, fontSize: 9, color: C.accent2, align: "center" },
});

// ---------- helpers ----------
const ICONS = {};
async function loadIcons(names, colors) {
  for (const n of names) for (const [key, col] of Object.entries(colors)) {
    const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(fi[n], { color: col, size: "256", strokeWidth: 1.4 }));
    ICONS[n + key] = "image/png;base64," + (await sharp(Buffer.from(svg)).png().toBuffer()).toString("base64");
  }
}
let k = 0;
const id = (p) => `${p}-${++k}`;
// Monoline icon, no fill: the marginalia look from T-003.
function ico(s, name, x, y, d = 0.5, dark = false) {
  s.addImage({ data: ICONS[name + (dark ? "L" : "D")], x, y, w: d, h: d, objectName: id("icon") });
}
function card(s, x, y, w, h, dark = false) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: dark ? C.text2 : C.background1 }, line: { color: dark ? C.text2 : C.accent4, width: 0.75 }, objectName: id("card") });
}
function t(s, text, o) {
  s.addText(text, Object.assign({ isTextBox: true, margin: 0, valign: "top", fontSize: 16, color: C.text1, objectName: id("text") }, o));
}
// "*word*" in a title becomes the one italic, green accent word.
function runs(str, base = {}) {
  const { accentColor, ...rest } = base;
  const out = [];
  str.split("\n").forEach((line, li, lines) => {
    const parts = line.split(/(\*[^*]+\*)/).filter(Boolean).map((p) => p.startsWith("*")
      ? { text: p.slice(1, -1), options: Object.assign({}, rest, { italic: true, color: accentColor || C.accent1 }) }
      : { text: p, options: Object.assign({}, rest) });
    if (li < lines.length - 1) parts[parts.length - 1].options.breakLine = true;
    out.push(...parts);
  });
  return out;
}
function content(sec, title, notes) {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: SECTIONS[sec - 1] });
  // Ghost section number as paper texture, top right.
  t(s, String(sec).padStart(2, "0"), { x: 10.3, y: 0.2, w: 2.4, h: 1.5, fontSize: 96, italic: true, fontFace: HEAD, color: C.background2, align: "right" });
  s.addText(`${sec} / ${SECTIONS.length}  ·  ${SECTIONS[sec - 1].toUpperCase()}`, { placeholder: "tag" });
  s.addText(runs(title), { placeholder: "title" });
  if (notes) s.addNotes(notes);
  return s;
}
function section(sec, sub) {
  pres.addSection({ title: SECTIONS[sec - 1] });
  const s = pres.addSlide({ masterName: "SECTION", sectionTitle: SECTIONS[sec - 1] });
  s.addText(String(sec).padStart(2, "0"), { placeholder: "num" });
  s.addText(SECTIONS[sec - 1], { placeholder: "title" });
  s.addText(sub, { placeholder: "sub" });
}
// Equal cards: monoline icon, serif heading, one short line.
function cards(s, items, y = 2.35, h = 3.2) {
  const n = items.length, gap = 0.3, w = (11.93 - gap * (n - 1)) / n;
  items.forEach(([ic, head, body, dark], i) => {
    const x = 0.7 + i * (w + gap);
    card(s, x, y, w, h, dark);
    ico(s, ic, x + 0.35, y + 0.35, 0.55, dark);
    t(s, head, { x: x + 0.35, y: y + 1.15, w: w - 0.7, h: 0.55, fontSize: 21, fontFace: HEAD, color: dark ? C.background2 : C.text1 });
    t(s, body, { x: x + 0.35, y: y + 1.75, w: w - 0.7, h: h - 1.95, fontSize: 15, color: dark ? C.accent4 : C.accent5 });
  });
}
function footnote(s, text) {
  t(s, text, { x: 0.7, y: 6.4, w: 11.9, h: 0.32, fontSize: 12, italic: true, color: C.accent5 });
}
// Shared chart styling so every chart reads the same.
function chartOpts(o) {
  return Object.assign({ showValue: true, dataLabelColor: HEX.forest, dataLabelFontSize: 15, dataLabelFontFace: "+mn-lt",
    catAxisLabelColor: HEX.forest, catAxisLabelFontSize: 14, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true,
    valAxisLabelFontFace: "+mn-lt", valGridLine: { style: "none" }, catGridLine: { style: "none" }, catAxisLineShow: false,
    showLegend: false, chartColors: [HEX.green], showTitle: true, titleColor: HEX.grey, titleFontSize: 13, titleFontFace: "+mn-lt" }, o);
}
// Hub diagram: a centre circle with satellites joined by dashed hairlines.
function hub(s, cx, cy, r, centre, sats, satW = 2.3) {
  const pts = sats.map((_, i) => {
    const a = (-90 + i * (360 / sats.length)) * Math.PI / 180;
    return [cx + r * Math.cos(a), cy + r * 0.62 * Math.sin(a)];
  });
  pts.forEach(([sx, sy]) => {
    s.addShape(pres.shapes.LINE, { x: Math.min(cx, sx), y: Math.min(cy, sy), w: Math.max(Math.abs(sx - cx), 0.001), h: Math.max(Math.abs(sy - cy), 0.001),
      flipH: (sx < cx) !== (sy < cy), line: { color: C.accent3, width: 0.75, dashType: "dash" }, objectName: id("spoke") });
  });
  sats.forEach(([ic, label, sub], i) => {
    const [sx, sy] = pts[i];
    card(s, sx - satW / 2, sy - 0.42, satW, 0.84);
    ico(s, ic, sx - satW / 2 + 0.18, sy - 0.2, 0.4);
    t(s, label, { x: sx - satW / 2 + 0.68, y: sy - 0.33, w: satW - 0.8, h: 0.34, fontSize: 14, bold: true });
    t(s, sub, { x: sx - satW / 2 + 0.68, y: sy + 0.01, w: satW - 0.8, h: 0.3, fontSize: 11, color: C.accent5 });
  });
  s.addShape(pres.shapes.OVAL, { x: cx - 1.05, y: cy - 1.05, w: 2.1, h: 2.1, fill: { color: C.text2 }, line: { color: C.text2 }, objectName: id("hub") });
  t(s, centre, { x: cx - 0.95, y: cy - 0.6, w: 1.9, h: 1.2, fontSize: 16, fontFace: HEAD, italic: true, color: C.background2, align: "center", valign: "middle" });
}

(async () => {
  await loadIcons(["FiFeather", "FiClock", "FiShuffle", "FiCpu", "FiUsers", "FiCheckCircle", "FiSearch", "FiUserPlus", "FiMessageSquare",
    "FiEdit3", "FiSend", "FiBarChart2", "FiLinkedin", "FiTwitter", "FiInstagram", "FiAtSign", "FiMail", "FiYoutube", "FiVideo",
    "FiGlobe", "FiCompass", "FiLayers", "FiStar", "FiMic", "FiLogIn", "FiAward", "FiHeart", "FiTarget", "FiSliders", "FiBookOpen", "FiRepeat"],
    { D: "#" + HEX.green, L: "#" + HEX.sage });

  // 1 · COVER
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "COVER", sectionTitle: "Opening" });
  s.addText("EXTOL AFFILIATES  ×  DAVID SAMUEL", { placeholder: "kicker" });
  s.addText(runs("Working together to\nwin *new* clients", { accentColor: C.accent3 }), { placeholder: "title" });
  s.addText("Who we are, what we offer, and how you can help.", { placeholder: "sub" });
  s.addText("MONDAY 26 OCTOBER 2026", { placeholder: "meta" });
  s.addNotes("Purpose: agree how David works alongside Extol to advise, guide and bring in new clients.");

  // 2 · AGENDA
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Opening" });
  s.addText("TODAY", { placeholder: "tag" });
  s.addText(runs("Four questions, answered *in order*"), { placeholder: "title" });
  const qs = [["Who we are", "What Extol does, in one line"], ["What we’ve done", "The clients we’ve worked with so far"],
    ["What we offer", "The system, why each part exists, and what it costs"], ["Your role", "How you can help, and how we’d work together"]];
  qs.forEach(([h, d], i) => {
    const y = 2.25 + i * 1.08;
    t(s, String(i + 1).padStart(2, "0"), { x: 0.7, y, w: 1.0, h: 0.8, fontSize: 36, italic: true, fontFace: HEAD, color: C.accent3, valign: "middle" });
    t(s, h, { x: 1.85, y, w: 4.2, h: 0.8, fontSize: 24, fontFace: HEAD, valign: "middle" });
    t(s, d, { x: 6.2, y, w: 6.4, h: 0.8, fontSize: 16, color: C.accent5, valign: "middle" });
    if (i < 3) s.addShape(pres.shapes.LINE, { x: 1.85, y: y + 0.94, w: 10.78, h: 0, line: { color: C.accent4, width: 0.75 }, objectName: id("rule") });
  });

  // ===== 1 · WHO WE ARE =====
  section(1, "What Extol does, in one line.");

  s = content(1, "We make experts the name buyers *think of first*",
    "Extol is two founders plus AI agents we built ourselves. Agents do the work; people approve it.");
  cards(s, [
    ["FiFeather", "What we do", "Position the expert as a thought leader, then put them in front of the right buyers every week."],
    ["FiUsers", "Who we are", "Devasya Dwivedi\nAnshul Mikita Prajapati"],
    ["FiCheckCircle", "How we work", "AI agents do the heavy lifting. Nothing goes out without the client’s approval."],
  ]);

  s = content(1, "The problem: buyers don’t know *great experts* exist",
    "Example from a real October audit of a client (name kept private).");
  cards(s, [
    ["FiClock", "No time", "Experts are busy doing the work. Marketing comes last."],
    ["FiShuffle", "No system", "New work comes only from referrals, so growth can’t be planned."],
    ["FiCpu", "Too much noise", "Buyers ignore generic, AI-written posts and messages."],
  ], 2.35, 3.0);
  footnote(s, "Real example: a former Big Four partner had 1,597 LinkedIn followers and 9 reactions per post. Expert, but invisible.");

  s = content(1, "The audit shows it: real stories get *6×* more attention",
    "Same person, same audience: posts with named people got 69 reactions on average; framework posts got 11.");
  s.addChart(pres.charts.BAR, [{ name: "Average reactions", labels: ["Posts with real people", "Framework posts"], values: [69, 11] }], chartOpts({
    x: 0.7, y: 2.2, w: 6.2, h: 4.0, barDir: "col", dataLabelPosition: "outEnd", barGapWidthPct: 70,
    title: "Average reactions per post", objectName: "stories-chart" }));
  s.addChart(pres.charts.DOUGHNUT, [{ name: "Comments", labels: ["Just “congrats”", "Made a real point"], values: [76, 24] }], {
    x: 7.3, y: 2.2, w: 5.3, h: 4.0, holeSize: 62, chartColors: [HEX.pistachio, HEX.moss], showPercent: true, showValue: false,
    dataLabelColor: HEX.forest, dataLabelFontSize: 14, dataLabelFontFace: "+mn-lt", showLegend: true, legendPos: "b",
    legendFontSize: 13, legendFontFace: "+mn-lt", legendColor: HEX.forest, showTitle: true, title: "What their comments said",
    titleColor: HEX.grey, titleFontSize: 13, titleFontFace: "+mn-lt", objectName: "comments-chart" });
  footnote(s, "The expertise is there. It just isn’t reaching buyers in a way they notice.");

  // ===== 2 · WHAT WE'VE DONE =====
  section(2, "The clients we’ve worked with so far.");

  s = content(2, "Three clients, three markets, *one method*",
    "3D Images AI and Bloggerly are public. The consultancy is under NDA, so it is not named.");
  const hdr = (x) => ({ text: x, options: { bold: true, color: C.accent2, fill: { color: C.accent6 }, fontSize: 11, charSpacing: 2 } });
  const cell = (x, b) => ({ text: x, options: { fontSize: b ? 18 : 15, fontFace: b ? HEAD : BODY, color: C.text1, fill: { color: C.accent6 } } });
  s.addTable([
    [hdr("CLIENT"), hdr("WHAT THEY SELL"), hdr("WHAT WE DID")],
    [cell("3D Images AI", true), cell("3D product models for Amazon"), cell("Outreach to 2,100+ Amazon brand owners")],
    [cell("Bloggerly", true), cell("SEO articles for businesses"), cell("LinkedIn campaign; leads now asking for calls")],
    [cell("UK consultancy", true), cell("Finance and SAP advice"), cell("Full growth plan, delivered the day after the first call")],
  ], { x: 0.7, y: 2.25, w: 11.93, colW: [2.9, 3.9, 5.13], rowH: [0.5, 0.85, 0.85, 0.85],
    border: [{ type: "none" }, { type: "none" }, { type: "solid", pt: 0.75, color: HEX.pistachio }, { type: "none" }], valign: "middle", margin: [0.06, 0.1, 0.06, 0], objectName: id("table") });
  card(s, 0.7, 5.6, 11.93, 0.7, true);
  t(s, runs("Our own proof: when Extol’s LinkedIn page reached about 50 followers, *new clients started coming to us.*", { accentColor: C.accent4 }),
    { x: 1.0, y: 5.6, w: 11.4, h: 0.7, fontSize: 15, valign: "middle", color: C.background2 });

  // ===== 3 · WHAT WE OFFER =====
  section(3, "The system, why each part exists, and what it costs.");

  s = content(3, "The goal: position the client as a *thoughtful leader*",
    "Thought leadership is the strategy; every channel after this slide serves it. We build it in four layers, bottom up.");
  const ladder = [["FiTarget", "One signature idea", "The line people remember and repeat."],
    ["FiBookOpen", "A clear point of view", "Weekly posts that take a side, in their own voice."],
    ["FiAward", "Proof", "Client stories and results, named only with permission."],
    ["FiGlobe", "Presence", "Feeds, inboxes, webinars and communities."]];
  ladder.slice().reverse().forEach(([ic, h, d], i) => {
    const y = 2.25 + i * 1.0, inset = (3 - i) * 0.5, w = 7.4 - inset * 2;
    card(s, 0.7 + inset, y, w, 0.82, i === 0);
    ico(s, ic, 0.95 + inset, y + 0.2, 0.42, i === 0);
    t(s, h, { x: 1.55 + inset, y: y + 0.08, w: w - 1.1, h: 0.36, fontSize: 17, fontFace: HEAD, color: i === 0 ? C.background2 : C.text1 });
    t(s, d, { x: 1.55 + inset, y: y + 0.44, w: w - 1.1, h: 0.3, fontSize: 12, color: i === 0 ? C.accent4 : C.accent5 });
  });
  t(s, "Not an influencer.\nA voice buyers trust.", { x: 8.75, y: 2.4, w: 3.9, h: 1.3, fontSize: 26, fontFace: HEAD, italic: true, color: C.accent1 });
  t(s, "Buyers of big contracts never buy from one post. They buy from the person whose thinking they have followed for months, so when a budget lands, that is the first name they call.",
    { x: 8.75, y: 3.85, w: 3.85, h: 2.2, fontSize: 15, color: C.accent5 });

  s = content(3, "The system has *six parts*, and we run all of them",
    "Each part feeds the next. The next slides explain the four that are newest to most clients.");
  const parts = [["FiLinkedin", "LinkedIn, run by agents", "Profile, posts, comments, connections and follow-ups."],
    ["FiRepeat", "Cross-platform posting", "One idea out to X, Instagram, Threads and Substack."],
    ["FiVideo", "Webinars", "A monthly session that turns followers into conversations."],
    ["FiUsers", "Community on Skool", "A home for the audience: waitlist, cohorts, membership."],
    ["FiGlobe", "Website and articles", "One place to land, and articles that rank in search."],
    ["FiBarChart2", "Reporting", "A live dashboard and a monthly review of what works."]];
  const pw = (11.93 - 0.3 * 2) / 3;
  parts.forEach(([ic, h, d], i) => {
    const x = 0.7 + (i % 3) * (pw + 0.3), y = 2.25 + Math.floor(i / 3) * 2.05;
    card(s, x, y, pw, 1.8);
    ico(s, ic, x + 0.3, y + 0.3, 0.45);
    t(s, h, { x: x + 0.95, y: y + 0.3, w: pw - 1.2, h: 0.5, fontSize: 18, fontFace: HEAD, valign: "middle" });
    t(s, d, { x: x + 0.3, y: y + 0.98, w: pw - 0.6, h: 0.7, fontSize: 14, color: C.accent5 });
  });

  s = content(3, "LinkedIn runs on *agents*, end to end",
    "Agents handle the daily work; the client only approves. Pace stays well under LinkedIn's limits (5 requests a day, rising to 20).");
  hub(s, 4.3, 4.3, 2.85, "The client\napproves", [
    ["FiSearch", "Research", "buyers with a reason"],
    ["FiUserPlus", "Connect", "at a human pace"],
    ["FiMessageSquare", "Comment", "3–5 comments a day"],
    ["FiEdit3", "Post", "weekly, in their voice"],
    ["FiSend", "Follow up", "DMs, never a pitch"],
    ["FiBarChart2", "Report", "who replied and booked"],
  ], 2.5);
  t(s, "WHAT THE CLIENT DOES", { x: 8.9, y: 2.35, w: 3.7, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: C.accent2 });
  t(s, "About 10 minutes a day, approving drafts on their phone.", { x: 8.9, y: 2.8, w: 3.7, h: 1.0, fontSize: 20, fontFace: HEAD, color: C.text1 });
  t(s, "WHAT THEY NEVER DO", { x: 8.9, y: 4.15, w: 3.7, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: C.accent2 });
  t(s, "Write from scratch, chase connections, or remember who to follow up.", { x: 8.9, y: 4.6, w: 3.7, h: 1.2, fontSize: 15, color: C.accent5 });

  s = content(3, "One idea, published *everywhere* buyers look",
    "Each platform gets its own version, never a copy-paste. Buyer and community audiences are kept separate.");
  hub(s, 4.3, 4.3, 2.85, "One note\nfrom the\nclient", [
    ["FiLinkedin", "LinkedIn", "posts, newsletter"],
    ["FiTwitter", "X", "takes and threads"],
    ["FiInstagram", "Instagram", "carousels and clips"],
    ["FiAtSign", "Threads", "text versions"],
    ["FiMail", "Substack", "a newsletter they own"],
    ["FiYoutube", "YouTube", "webinar replays"],
  ], 2.5);
  t(s, "WHY", { x: 8.9, y: 2.35, w: 3.7, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: C.accent2 });
  t(s, "Write once. Be seen in six places.", { x: 8.9, y: 2.8, w: 3.7, h: 1.0, fontSize: 20, fontFace: HEAD, color: C.text1 });
  t(s, "Buyers don’t all live on LinkedIn. The same thinking reaches them wherever they read, and the newsletter builds an audience the client owns.",
    { x: 8.9, y: 3.95, w: 3.7, h: 1.9, fontSize: 15, color: C.accent5 });

  s = content(3, "Webinars and community turn followers into *clients*",
    "Two webinar formats never share a room: buyer sessions sell the expertise; community sessions build the audience.");
  const halves = [["FiVideo", "Webinars", "Monthly, 45 minutes", [
      "Buyers bring a real problem; the expert solves it live",
      "Every session cut into clips for all platforms",
      "Every attendee followed up within 48 hours"]],
    ["FiUsers", "Community on Skool", "The audience’s home", [
      "A waitlist and a free taster to start",
      "Paid cohorts and a self-paced membership",
      "Agents handle admin, prompts and reminders"]]];
  halves.forEach(([ic, h, sub, items], i) => {
    const x = 0.7 + i * 6.12, dark = i === 1;
    card(s, x, 2.25, 5.81, 3.95, dark);
    ico(s, ic, x + 0.4, 2.6, 0.55, dark);
    t(s, h, { x: x + 1.15, y: 2.55, w: 4.4, h: 0.45, fontSize: 22, fontFace: HEAD, color: dark ? C.background2 : C.text1 });
    t(s, sub.toUpperCase(), { x: x + 1.15, y: 3.02, w: 4.4, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: dark ? C.accent3 : C.accent2 });
    items.forEach((it, j) => {
      const y = 3.7 + j * 0.78;
      t(s, "—", { x: x + 0.4, y, w: 0.4, h: 0.6, fontSize: 15, color: dark ? C.accent3 : C.accent2 });
      t(s, it, { x: x + 0.85, y, w: 4.6, h: 0.65, fontSize: 15, color: dark ? C.accent4 : C.text2 });
    });
  });

  s = content(3, "Every piece passes our *Taste* system",
    "Taste is Extol's creative-direction library, curated by our team. It is why nothing we make looks like generic AI output.");
  t(s, "200+", { x: 0.7, y: 2.2, w: 4.2, h: 1.3, fontSize: 80, fontFace: HEAD, italic: true, color: C.accent1 });
  t(s, "proven posts, reels and websites studied and broken down: why each one works, and when to use it.",
    { x: 0.7, y: 3.6, w: 4.0, h: 1.4, fontSize: 16, color: C.accent5 });
  const tsteps = [["FiTarget", "Match", "Each piece is matched to the one reference that fits it."],
    ["FiSliders", "Apply", "We use its craft: structure, pacing, type and layout."],
    ["FiHeart", "Never copy", "Their assets stay theirs. Colours and voice stay the client’s."]];
  tsteps.forEach(([ic, h, d], i) => {
    const y = 2.25 + i * 1.33;
    card(s, 5.4, y, 7.23, 1.15);
    t(s, String(i + 1), { x: 5.65, y: y + 0.2, w: 0.5, h: 0.75, fontSize: 30, fontFace: HEAD, italic: true, color: C.accent3 });
    ico(s, ic, 6.3, y + 0.35, 0.45);
    t(s, h, { x: 7.0, y: y + 0.18, w: 5.4, h: 0.4, fontSize: 18, fontFace: HEAD });
    t(s, d, { x: 7.0, y: y + 0.6, w: 5.4, h: 0.45, fontSize: 14, color: C.accent5 });
  });
  footnote(s, "This deck itself was designed from one Taste reference.");

  s = content(3, "How it works: *2½ hours* a week from the client",
    "This answers the most common worry: 'I don't have time.'");
  const steps = [["FiMic", "Client", "Sends one short note a week"], ["FiEdit3", "Extol", "Agents turn it into posts, clips and messages"],
    ["FiCheckCircle", "Client", "Approves on their phone"], ["FiSend", "Extol", "Publishes everywhere and reports results"]];
  const ws = 2.7;
  steps.forEach(([ic, who, what], i) => {
    const x = 0.7 + i * (ws + 0.38), mine = who === "Client";
    card(s, x, 2.4, ws, 3.1, mine);
    ico(s, ic, x + ws / 2 - 0.3, 2.75, 0.6, mine);
    t(s, who.toUpperCase(), { x, y: 3.6, w: ws, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, align: "center", color: mine ? C.accent3 : C.accent2 });
    t(s, what, { x: x + 0.25, y: 4.0, w: ws - 0.5, h: 1.2, fontSize: 18, fontFace: HEAD, align: "center", color: mine ? C.background2 : C.text1 });
    if (i < 3) t(s, "→", { x: x + ws, y: 3.7, w: 0.38, h: 0.5, fontSize: 20, align: "center", color: C.accent3 });
  });
  footnote(s, "Nothing is ever published without the client’s yes.");

  s = content(3, "What we expect outreach to produce *each month*",
    "These are planning estimates from our consultancy client's plan, not proven results yet.");
  s.addChart(pres.charts.BAR, [{ name: "Per month", labels: ["Connection requests", "Accepted", "Replied", "Calls booked"], values: [400, 150, 27, 8] }], chartOpts({
    x: 0.7, y: 2.2, w: 11.9, h: 4.05, barDir: "bar", catAxisOrientation: "maxMin", dataLabelPosition: "outEnd", barGapWidthPct: 55,
    title: "Outreach in one month, at full pace (estimate)", objectName: "funnel-chart" }));
  footnote(s, "Planning estimates at full pace (20 requests a day), not yet proven results.");

  s = content(3, "Leads should *build up* month by month",
    "Forecast mid-points from our consultancy client's plan. A qualified lead is a buyer who replies, books or signs up. Likes don't count.");
  s.addChart(pres.charts.BAR, [{ name: "Qualified leads", labels: ["Month 1", "Month 3", "Month 6", "Month 12"], values: [13, 71, 101, 126] }], chartOpts({
    x: 0.7, y: 2.2, w: 7.6, h: 4.05, barDir: "col", dataLabelPosition: "outEnd", barGapWidthPct: 60,
    title: "Qualified leads per month (forecast)", objectName: "leads-chart" }));
  card(s, 8.7, 2.3, 3.93, 3.9, true);
  t(s, "BY MONTH 6", { x: 9.05, y: 2.6, w: 3.3, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: C.accent3 });
  [["100", "leads a month"], ["10", "real sales calls"], ["2–3", "new clients"]].forEach(([n, l], i) => {
    const y = 3.05 + i * 1.0;
    t(s, n, { x: 9.05, y, w: 1.55, h: 0.8, fontSize: 36, fontFace: HEAD, italic: true, color: C.accent4, valign: "middle" });
    t(s, l, { x: 10.6, y, w: 1.9, h: 0.8, fontSize: 16, color: C.background2, valign: "middle" });
  });
  footnote(s, "Forecast, not yet proven. Big contracts take 6–12 months to close.");

  s = content(3, "What it costs: one fee, *every* tool included",
    "Founding-client price. Prices exclude VAT. Covers every platform, agent, Skool and webinar tool.");
  const fees = [["£1,500", "Month 1", "Set-up and website"], ["£1,200", "Months 2–3", "Founding price"], ["£2,500", "Month 4 onwards", "Standard price"]];
  fees.forEach(([n, when, what], i) => {
    const x = 0.7 + i * 4.06, last = i === 2;
    card(s, x, 2.3, 3.81, 2.6, last);
    t(s, when.toUpperCase(), { x: x + 0.4, y: 2.6, w: 3.0, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: last ? C.accent3 : C.accent2 });
    t(s, n, { x: x + 0.4, y: 3.0, w: 3.0, h: 0.95, fontSize: 46, fontFace: HEAD, color: last ? C.background2 : C.accent1 });
    t(s, what, { x: x + 0.4, y: 4.1, w: 3.0, h: 0.45, fontSize: 16, color: last ? C.accent4 : C.accent5 });
  });
  ico(s, "FiCheckCircle", 0.7, 5.42, 0.45);
  t(s, "Our promise: at day 60 we review the results together. If we’re behind plan, we fix it in writing, or the client can leave.",
    { x: 1.35, y: 5.3, w: 11.2, h: 0.7, fontSize: 16, valign: "middle", color: C.text2 });

  s = content(3, "One client win can pay for *the whole year*",
    "Illustrative, from the consultancy plan. Return is on profit at a 50% margin. Most cash from big contracts lands in year two.");
  s.addChart(pres.charts.BAR, [{ name: "Value", labels: ["Year-one fee", "One small advisory piece", "One mid-size engagement", "Two engagements"], values: [26400, 50000, 150000, 500000] }], chartOpts({
    x: 0.7, y: 2.2, w: 7.6, h: 4.05, barDir: "bar", catAxisOrientation: "maxMin", dataLabelPosition: "outEnd", dataLabelFormatCode: "£#,##0",
    barGapWidthPct: 55, title: "Year-one fee vs. value of a client win (£)", objectName: "payback-chart" }));
  card(s, 8.7, 2.3, 3.93, 3.9, true);
  t(s, "RETURN ON THE FEE", { x: 9.05, y: 2.6, w: 3.3, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: C.accent3 });
  [["0.9×", "small piece"], ["2.8×", "mid-size win"], ["9.5×", "two wins"]].forEach(([n, l], i) => {
    const y = 3.05 + i * 1.0;
    t(s, n, { x: 9.05, y, w: 1.65, h: 0.8, fontSize: 36, fontFace: HEAD, italic: true, color: C.accent4, valign: "middle" });
    t(s, l, { x: 10.7, y, w: 1.8, h: 0.8, fontSize: 16, color: C.background2, valign: "middle" });
  });
  footnote(s, "Illustrative figures, not results. Year-one fee: £26,400.");

  // ===== 4 · YOUR ROLE =====
  section(4, "How you can help, and how we’d work together.");

  s = content(4, "Three ways you can help us *grow*",
    "Ask David which of the three he wants to lead with.");
  cards(s, [
    ["FiCompass", "Advise", "Sharpen our offer, pricing and pitch."],
    ["FiTarget", "Guide", "Help us choose the one market to focus on."],
    ["FiLogIn", "Introduce", "Connect us with experts and firms who need us.", true],
  ]);

  s = content(4, "Where your experience *matters* most",
    "Being honest about our gaps gets better advice.");
  const gaps = [["Proof", "No case study with hard numbers yet.", "What proof would your network trust?"],
    ["Focus", "We work in three very different markets.", "Which one should we own?"],
    ["Pricing", "Our price is tested with only one client.", "Is it right for the value?"],
    ["Growth", "Two founders do sales and delivery.", "When should we hire, and who?"]];
  gaps.forEach(([h, now, q], i) => {
    const x = 0.7 + (i % 2) * 6.12, y = 2.25 + Math.floor(i / 2) * 2.05;
    card(s, x, y, 5.81, 1.8);
    t(s, h, { x: x + 0.35, y: y + 0.25, w: 5.1, h: 0.45, fontSize: 21, fontFace: HEAD });
    t(s, now, { x: x + 0.35, y: y + 0.78, w: 5.1, h: 0.4, fontSize: 15, color: C.accent5 });
    t(s, q, { x: x + 0.35, y: y + 1.2, w: 5.1, h: 0.4, fontSize: 15, italic: true, fontFace: HEAD, color: C.accent1 });
  });

  s = content(4, "How we could work together: *three* options",
    "Terms are deliberately left open to agree in the meeting. Decide our walk-away numbers beforehand.");
  const opts = [["FiStar", "A. Referral partner", "A share of fees from clients you introduce.", true],
    ["FiMessageSquare", "B. Advisor", "Set hours each month, plus a smaller share of fees."],
    ["FiLayers", "C. Strategic advisor", "A small stake in Extol, once the fit is proven."]];
  const w3 = (11.93 - 0.6) / 3;
  opts.forEach(([ic, h, d, rec], i) => {
    const x = 0.7 + i * (w3 + 0.3);
    card(s, x, 2.3, w3, 3.3, rec);
    ico(s, ic, x + 0.35, 2.65, 0.55, rec);
    if (rec) t(s, "OUR SUGGESTION TO START", { x: x + 1.1, y: 2.75, w: w3 - 1.3, h: 0.35, fontSize: 10, bold: true, charSpacing: 2, color: C.accent3, valign: "middle" });
    t(s, h, { x: x + 0.35, y: 3.5, w: w3 - 0.7, h: 0.55, fontSize: 21, fontFace: HEAD, color: rec ? C.background2 : C.text1 });
    t(s, d, { x: x + 0.35, y: 4.15, w: w3 - 0.7, h: 1.1, fontSize: 15, color: rec ? C.accent4 : C.accent5 });
  });
  footnote(s, "Start with A for 90 days, then review together and move to B or C if it works for both sides.");

  s = content(4, "The first *90 days* together",
    "Close by asking: which market do you know best, and who comes to mind first?");
  const tl = [["Week 1", "Agree the role and terms"], ["Day 30", "Choose one market; list 10 people to introduce"],
    ["Day 60", "First introductions and calls"], ["Day 90", "First new client, then review"]];
  s.addShape(pres.shapes.LINE, { x: 0.95, y: 2.65, w: 9.3, h: 0, line: { color: C.accent3, width: 0.75, dashType: "dash" }, objectName: id("line") });
  tl.forEach(([when, what], i) => {
    const x = 0.7 + i * 3.1;
    s.addShape(pres.shapes.OVAL, { x: x + 0.1, y: 2.5, w: 0.3, h: 0.3, fill: { color: i === 3 ? C.accent1 : C.accent6 }, line: { color: C.accent1, width: 1 }, objectName: id("dot") });
    t(s, when.toUpperCase(), { x, y: 3.1, w: 2.8, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: C.accent2 });
    t(s, what, { x, y: 3.5, w: 2.8, h: 1.3, fontSize: 19, fontFace: HEAD });
  });
  card(s, 0.7, 5.3, 11.93, 0.9, true);
  t(s, runs("Today: which market do you know best? *Who comes to mind first?*", { accentColor: C.accent3 }),
    { x: 1.05, y: 5.3, w: 11.3, h: 0.9, fontSize: 18, fontFace: HEAD, color: C.background2, valign: "middle" });

  // CLOSE
  pres.addSection({ title: "Close" });
  s = pres.addSlide({ masterName: "COVER", sectionTitle: "Close" });
  s.addText("THANK YOU", { placeholder: "kicker" });
  s.addText(runs("You know the people.\nWe build the *system*.", { accentColor: C.accent3 }), { placeholder: "title" });
  s.addText("Together we can win the right clients, faster.", { placeholder: "sub" });
  s.addText("DEVASYA DWIVEDI  ·  ANSHUL MIKITA PRAJAPATI  ·  ADMIN@EXTOLAFFILIATES.COM", { placeholder: "meta" });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  // Fonts: pptxgenjs hard-codes Arial in a few chart labels and the bullet glyph font.
  const JSZip = require("jszip");
  const fs = require("fs");
  const zip = await JSZip.loadAsync(fs.readFileSync(OUT));
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/(charts\/chart\d+|slideMasters\/slideMaster\d+|slideLayouts\/slideLayout\d+)\.xml$/.test(n))) {
    const xml = await zip.file(name).async("string");
    zip.file(name, xml.replace(/typeface="Arial"/g, `typeface="${BODY}"`));
  }
  fs.writeFileSync(OUT, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  console.log("wrote", OUT);
})();
