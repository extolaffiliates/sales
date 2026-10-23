// Extol x David Samuel: minimal, self-explanatory deck.
// Build: NODE_PATH=<node_modules with pptxgenjs, react, react-dom, react-icons, sharp> \
//        APPLY_THEME=<pptx skill>/scripts/apply_theme.js node build.js out.pptx
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require(process.env.APPLY_THEME || "./apply_theme.js");

const OUT = process.argv[2] || "deck.pptx";
const HEX = { forest: "101F14", pine: "1D3524", green: "2B4A34", moss: "7E9C6B", sage: "9EBB80", pistachio: "C6DE9F", cream: "E9F0C9", grey: "5B6B5E" };
const THEME = {
  name: "Extol Affiliates", headFontFace: "Cambria", bodyFontFace: "Calibri",
  colors: { dk1: HEX.forest, lt1: "FFFFFF", dk2: HEX.pine, lt2: HEX.cream, accent1: HEX.green, accent2: HEX.moss,
    accent3: HEX.sage, accent4: HEX.pistachio, accent5: HEX.grey, accent6: "F4F7EA", hlink: HEX.green, folHlink: HEX.moss },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Extol Affiliates x David Samuel";
pres.author = "Extol Affiliates";
pres.company = "Extol Affiliates";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
// text1 forest · text2 pine · background1 white · background2 cream
// accent1 green · accent2 moss · accent3 sage · accent4 pistachio · accent5 grey · accent6 pale tint

const SECTIONS = ["Who we are", "What we’ve done", "What we offer", "Your role"];

// ---------- layouts ----------
pres.defineSlideMaster({
  title: "COVER",
  background: { color: C.text1 },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: 0.9, y: 1.5, w: 11.5, h: 0.45, fontSize: 14, bold: true, color: C.accent3, charSpacing: 3, margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.9, y: 2.1, w: 11.5, h: 2.0, fontSize: 48, bold: true, color: C.background2, fontFace: "Cambria", margin: 0, valign: "top", align: "left" }, text: "" } },
    { placeholder: { options: { name: "sub", type: "body", x: 0.9, y: 4.25, w: 10, h: 1.0, fontSize: 22, color: C.accent4, margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "meta", type: "body", x: 0.9, y: 6.3, w: 11.5, h: 0.5, fontSize: 14, color: C.accent3, margin: 0, valign: "top" }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "SECTION",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "num", type: "body", x: 0.9, y: 2.0, w: 3, h: 1.2, fontSize: 66, bold: true, color: C.accent3, fontFace: "Cambria", margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.9, y: 3.3, w: 11.5, h: 1.0, fontSize: 42, bold: true, color: C.background2, fontFace: "Cambria", margin: 0, valign: "top", align: "left" }, text: "" } },
    { placeholder: { options: { name: "sub", type: "body", x: 0.9, y: 4.4, w: 10, h: 0.8, fontSize: 22, color: C.accent4, margin: 0, valign: "top" }, text: "" } },
  ],
  slideNumber: { x: 12.3, y: 6.95, w: 0.5, h: 0.3, fontSize: 10, color: C.accent3, align: "right" },
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "tag", type: "body", x: 0.7, y: 0.45, w: 9, h: 0.35, fontSize: 12, bold: true, color: C.accent2, charSpacing: 2, margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 0.85, w: 11.9, h: 1.0, fontSize: 34, bold: true, color: C.text1, fontFace: "Cambria", margin: 0, valign: "top", align: "left" }, text: "" } },
    { text: { text: "EXTOL AFFILIATES  ×  DAVID SAMUEL", options: { x: 0.7, y: 6.95, w: 8, h: 0.3, fontSize: 10, color: C.accent2, charSpacing: 1, margin: 0 } } },
  ],
  slideNumber: { x: 12.2, y: 6.95, w: 0.45, h: 0.3, fontSize: 10, color: C.accent2, align: "right" },
});

// ---------- helpers ----------
const ICONS = {};
async function loadIcons(names) {
  for (const n of names) {
    const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(fa[n], { color: "#FFFFFF", size: "256" }));
    ICONS[n] = "image/png;base64," + (await sharp(Buffer.from(svg)).png().toBuffer()).toString("base64");
  }
}
let k = 0;
const id = (p) => `${p}-${++k}`;
function icon(s, name, x, y, d = 0.7, fill = C.accent1) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill }, objectName: id("icon-bg") });
  const p = d * 0.25;
  s.addImage({ data: ICONS[name], x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, objectName: id("icon") });
}
function box(s, x, y, w, h, fill = C.background2) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: fill }, objectName: id("box") });
}
function t(s, text, o) {
  s.addText(text, Object.assign({ isTextBox: true, margin: 0, valign: "top", fontSize: 18, color: C.text1, objectName: id("text") }, o));
}
// Every content slide: a section tracker ("2 / 4 · WHAT WE'VE DONE") and a title that states the point.
function content(sec, title, notes) {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: SECTIONS[sec - 1] });
  s.addText(`${sec} / ${SECTIONS.length}  ·  ${SECTIONS[sec - 1].toUpperCase()}`, { placeholder: "tag" });
  s.addText(title, { placeholder: "title" });
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
// Three (or four) equal cards: icon, heading, one or two short lines.
function cards(s, items, y = 2.4, h = 3.3) {
  const n = items.length, gap = 0.35, w = (11.9 - gap * (n - 1)) / n;
  items.forEach(([ic, head, body, dark], i) => {
    const x = 0.7 + i * (w + gap);
    box(s, x, y, w, h, dark ? C.text2 : C.background2);
    icon(s, ic, x + 0.4, y + 0.4, 0.8, dark ? C.accent2 : C.accent1);
    t(s, head, { x: x + 0.4, y: y + 1.45, w: w - 0.8, h: 0.6, fontSize: 22, bold: true, fontFace: "Cambria", color: dark ? C.background2 : C.text1 });
    t(s, body, { x: x + 0.4, y: y + 2.15, w: w - 0.8, h: h - 2.4, fontSize: 17, color: dark ? C.accent4 : C.text2 });
  });
}
function footnote(s, text) {
  t(s, text, { x: 0.7, y: 6.45, w: 11.9, h: 0.35, fontSize: 13, italic: true, color: C.accent5 });
}

(async () => {
  await loadIcons(["FaSeedling", "FaClock", "FaRandom", "FaRobot", "FaUserTie", "FaSearch", "FaBullhorn", "FaChartLine",
    "FaMicrophone", "FaPenNib", "FaCheckCircle", "FaPaperPlane", "FaLightbulb", "FaCompass", "FaDoorOpen", "FaHandshake", "FaUsers", "FaComments"]);

  // 1 · COVER
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "COVER", sectionTitle: "Opening" });
  s.addText("EXTOL AFFILIATES  ×  DAVID SAMUEL", { placeholder: "kicker" });
  s.addText("Working together\nto win new clients", { placeholder: "title" });
  s.addText("Who we are, what we offer, and how you can help.", { placeholder: "sub" });
  s.addText("Monday 26 October 2026", { placeholder: "meta" });
  s.addNotes("Purpose: agree how David works alongside Extol to advise, guide and bring in new clients.");

  // 2 · AGENDA
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Opening" });
  s.addText("TODAY", { placeholder: "tag" });
  s.addText("Four questions, answered in order", { placeholder: "title" });
  const qs = [["Who we are", "What Extol does, in one line"], ["What we’ve done", "The clients we’ve worked with so far"],
    ["What we offer", "What a client gets, why, and what it costs"], ["Your role", "How you can help, and how we’d work together"]];
  qs.forEach(([h, d], i) => {
    const y = 2.25 + i * 1.08;
    s.addShape(pres.shapes.OVAL, { x: 0.7, y, w: 0.75, h: 0.75, fill: { color: C.accent1 }, line: { color: C.accent1 }, objectName: id("num") });
    t(s, String(i + 1), { x: 0.7, y, w: 0.75, h: 0.75, fontSize: 22, bold: true, color: C.background1, align: "center", valign: "middle", fontFace: "Cambria" });
    t(s, h, { x: 1.75, y: y + 0.02, w: 4.2, h: 0.75, fontSize: 24, bold: true, fontFace: "Cambria", valign: "middle" });
    t(s, d, { x: 6.0, y: y + 0.02, w: 6.6, h: 0.75, fontSize: 18, color: C.accent5, valign: "middle" });
  });

  // ===== 1 · WHO WE ARE =====
  section(1, "What Extol does, in one line.");

  s = content(1, "We help experts win clients, without using their time",
    "Extol is two founders plus a set of AI tools we built ourselves. AI drafts; people approve.");
  cards(s, [
    ["FaSeedling", "What we do", "Find the right buyers, reach them, and keep the expert visible every week."],
    ["FaUsers", "Who we are", "Two founders: Dave runs strategy, Anshul runs delivery."],
    ["FaCheckCircle", "How we work", "AI does the heavy lifting. Nothing goes out without the client’s approval."],
  ]);

  s = content(1, "The problem: buyers don’t know great experts exist",
    "Example from a real October audit of a client (name kept private): 1,597 followers, 9 reactions per post.");
  cards(s, [
    ["FaClock", "No time", "Experts are busy doing the work. Marketing comes last."],
    ["FaRandom", "No system", "New work comes only from referrals, so growth can’t be planned."],
    ["FaRobot", "Too much noise", "Buyers ignore generic, AI-written messages."],
  ], 2.4, 3.3);
  footnote(s, "Real example: a former Big Four partner had 1,597 LinkedIn followers and 9 reactions per post. Expert, but invisible.");

  // ===== 2 · WHAT WE'VE DONE =====
  section(2, "The clients we’ve worked with so far.");

  s = content(2, "Three clients, three different markets, one method",
    "3D Images AI and Bloggerly are public. The consultancy is under NDA, so it is not named.");
  const hdr = (x) => ({ text: x, options: { bold: true, color: C.background1, fill: { color: C.text2 }, fontSize: 16, fontFace: "Cambria" } });
  const cell = (x, b) => ({ text: x, options: { fontSize: 16, bold: !!b, color: C.text1, fill: { color: C.background1 } } });
  s.addTable([
    [hdr("Client"), hdr("What they sell"), hdr("What we did")],
    [cell("3D Images AI", true), cell("3D product models for Amazon"), cell("Outreach to 2,100+ Amazon brand owners")],
    [cell("Bloggerly", true), cell("SEO articles for businesses"), cell("LinkedIn campaign; leads now asking for calls")],
    [cell("UK consultancy", true), cell("Finance and SAP advice"), cell("Full growth plan, delivered the day after the first call")],
  ], { x: 0.7, y: 2.3, w: 11.9, colW: [2.9, 4.0, 5.0], rowH: [0.6, 0.85, 0.85, 0.85],
    border: { type: "solid", pt: 1, color: HEX.pistachio }, valign: "middle", margin: [0.08, 0.2, 0.08, 0.2], objectName: id("table") });
  box(s, 0.7, 5.75, 11.9, 0.7, C.background2);
  t(s, "Our own proof: when Extol’s LinkedIn page reached about 50 followers, new clients started coming to us.",
    { x: 1.0, y: 5.75, w: 11.4, h: 0.7, fontSize: 16, valign: "middle", color: C.text2 });

  // ===== 3 · WHAT WE OFFER =====
  section(3, "What a client gets, why, and what it costs.");

  s = content(3, "A client gets four things",
    "Each card: what we do, then why. Steps 1 and 4 are set up in the first month; 2 and 3 run every week.");
  const offer = [["FaUserTie", "1. Look credible", "Fix the profile and website.", "Buyers check you before they reply."],
    ["FaSearch", "2. Reach buyers", "Message the right people daily.", "A reason to talk gets replies."],
    ["FaBullhorn", "3. Stay visible", "Post and comment every week.", "Buyers remember who they see."],
    ["FaChartLine", "4. Track results", "Live dashboard, monthly review.", "Keep what works, drop what doesn’t."]];
  const w4 = (11.9 - 0.35 * 3) / 4;
  offer.forEach(([ic, h, what, why], i) => {
    const x = 0.7 + i * (w4 + 0.35);
    box(s, x, 2.3, w4, 3.9);
    icon(s, ic, x + 0.35, 2.65, 0.8);
    t(s, h, { x: x + 0.35, y: 3.7, w: w4 - 0.6, h: 0.55, fontSize: 21, bold: true, fontFace: "Cambria" });
    t(s, what, { x: x + 0.35, y: 4.3, w: w4 - 0.6, h: 0.8, fontSize: 17, color: C.text2 });
    t(s, "Why: " + why, { x: x + 0.35, y: 5.15, w: w4 - 0.6, h: 0.9, fontSize: 15, italic: true, color: C.accent1 });
  });

  s = content(3, "How it works: the client spends about 2½ hours a week",
    "This answers the most common worry: 'I don't have time.'");
  const steps = [["FaMicrophone", "Client", "Sends one short note a week"], ["FaPenNib", "Extol", "Turns it into posts and messages"],
    ["FaCheckCircle", "Client", "Approves on their phone"], ["FaPaperPlane", "Extol", "Publishes and reports results"]];
  const ws = 2.6;
  steps.forEach(([ic, who, what], i) => {
    const x = 0.7 + i * (ws + 0.5);
    const mine = who === "Client";
    box(s, x, 2.5, ws, 3.0, mine ? C.text2 : C.background2);
    icon(s, ic, x + ws / 2 - 0.45, 2.85, 0.9, mine ? C.accent2 : C.accent1);
    t(s, who.toUpperCase(), { x, y: 3.95, w: ws, h: 0.35, fontSize: 13, bold: true, charSpacing: 2, align: "center", color: mine ? C.accent3 : C.accent2 });
    t(s, what, { x: x + 0.25, y: 4.35, w: ws - 0.5, h: 0.95, fontSize: 18, align: "center", color: mine ? C.background2 : C.text1 });
    if (i < 3) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + ws + 0.1, y: 3.8, w: 0.3, h: 0.4, fill: { color: C.accent3 }, line: { color: C.accent3 }, objectName: id("arrow") });
  });
  footnote(s, "Nothing is ever published without the client’s yes.");

  s = content(3, "What we expect it to produce each month",
    "These are planning estimates from our consultancy client's plan, not proven results yet.");
  s.addChart(pres.charts.BAR, [{ name: "Per month", labels: ["Connection requests", "Accepted", "Replied", "Calls booked"], values: [400, 150, 27, 8] }], {
    x: 0.7, y: 2.2, w: 7.6, h: 4.1, barDir: "bar", chartColors: [HEX.green], catAxisOrientation: "maxMin",
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: HEX.forest, dataLabelFontSize: 16, dataLabelFontFace: "+mn-lt",
    catAxisLabelColor: HEX.forest, catAxisLabelFontSize: 16, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true,
    valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 45, objectName: "funnel-chart",
  });
  box(s, 8.7, 2.3, 3.9, 3.9, C.text2);
  t(s, "BY MONTH 6", { x: 9.0, y: 2.6, w: 3.3, h: 0.35, fontSize: 13, bold: true, charSpacing: 2, color: C.accent3 });
  [["100", "leads a month"], ["10", "real sales calls"], ["2–3", "new clients"]].forEach(([n, l], i) => {
    const y = 3.05 + i * 1.0;
    t(s, n, { x: 9.0, y, w: 1.5, h: 0.8, fontSize: 36, bold: true, fontFace: "Cambria", color: C.accent4, valign: "middle" });
    t(s, l, { x: 10.5, y, w: 2.0, h: 0.8, fontSize: 17, color: C.background2, valign: "middle" });
  });
  footnote(s, "Planning estimates, not yet proven results. Big contracts take 6–12 months to close.");

  s = content(3, "What it costs: one monthly fee, every tool included",
    "Founding-client price. Prices exclude VAT.");
  const fees = [["£1,500", "Month 1", "Set-up and website"], ["£1,200", "Months 2–3", "Founding price"], ["£2,500", "Month 4 onwards", "Standard price"]];
  fees.forEach(([n, when, what], i) => {
    const x = 0.7 + i * 4.08, last = i === 2;
    box(s, x, 2.3, 3.75, 2.6, last ? C.text2 : C.background2);
    t(s, when.toUpperCase(), { x: x + 0.4, y: 2.6, w: 3.0, h: 0.35, fontSize: 13, bold: true, charSpacing: 2, color: last ? C.accent3 : C.accent2 });
    t(s, n, { x: x + 0.4, y: 3.0, w: 3.0, h: 0.9, fontSize: 44, bold: true, fontFace: "Cambria", color: last ? C.background2 : C.accent1 });
    t(s, what, { x: x + 0.4, y: 4.0, w: 3.0, h: 0.5, fontSize: 17, color: last ? C.accent4 : C.text2 });
  });
  icon(s, "FaCheckCircle", 0.7, 5.35, 0.6);
  t(s, "Our promise: at day 60 we review the results together. If we’re behind plan, we fix it in writing, or the client can leave.",
    { x: 1.5, y: 5.3, w: 11.1, h: 0.75, fontSize: 18, valign: "middle", color: C.text2 });

  // ===== 4 · YOUR ROLE =====
  section(4, "How you can help, and how we’d work together.");

  s = content(4, "Three ways you can help us grow",
    "Ask David which of the three he wants to lead with.");
  cards(s, [
    ["FaLightbulb", "Advise", "Sharpen our offer, pricing and pitch."],
    ["FaCompass", "Guide", "Help us choose the one market to focus on."],
    ["FaDoorOpen", "Introduce", "Connect us with businesses that need us.", true],
  ]);

  s = content(4, "Where your experience matters most",
    "Being honest about our gaps gets better advice.");
  const gaps = [["Proof", "We don’t yet have a case study with hard numbers.", "What proof would your network trust?"],
    ["Focus", "We work in three very different markets.", "Which one should we own?"],
    ["Pricing", "Our price is tested with only one client.", "Is it right for the value?"],
    ["Growth", "Two founders do sales and delivery.", "When should we hire, and who?"]];
  gaps.forEach(([h, now, q], i) => {
    const x = 0.7 + (i % 2) * 6.1, y = 2.25 + Math.floor(i / 2) * 2.1;
    box(s, x, y, 5.8, 1.85);
    t(s, h, { x: x + 0.35, y: y + 0.25, w: 5.1, h: 0.45, fontSize: 21, bold: true, fontFace: "Cambria" });
    t(s, now, { x: x + 0.35, y: y + 0.75, w: 5.1, h: 0.45, fontSize: 17, color: C.text2 });
    t(s, q, { x: x + 0.35, y: y + 1.2, w: 5.1, h: 0.45, fontSize: 17, italic: true, color: C.accent1 });
  });

  s = content(4, "How we could work together: three options",
    "Terms are deliberately left open to agree in the meeting. Decide our walk-away numbers beforehand.");
  const opts = [["FaHandshake", "A. Referral partner", "A share of fees from clients you introduce.", true],
    ["FaComments", "B. Advisor", "Set hours each month, plus a smaller share of fees."],
    ["FaSeedling", "C. Strategic advisor", "A small stake in Extol, once the fit is proven."]];
  const w3 = (11.9 - 0.7) / 3;
  opts.forEach(([ic, h, d, rec], i) => {
    const x = 0.7 + i * (w3 + 0.35);
    box(s, x, 2.3, w3, 3.3, rec ? C.text2 : C.background2);
    icon(s, ic, x + 0.4, 2.65, 0.8, rec ? C.accent2 : C.accent1);
    if (rec) t(s, "OUR SUGGESTION TO START", { x: x + 1.4, y: 2.85, w: w3 - 1.6, h: 0.4, fontSize: 12, bold: true, charSpacing: 1, color: C.accent3, valign: "middle" });
    t(s, h, { x: x + 0.4, y: 3.75, w: w3 - 0.8, h: 0.55, fontSize: 21, bold: true, fontFace: "Cambria", color: rec ? C.background2 : C.text1 });
    t(s, d, { x: x + 0.4, y: 4.35, w: w3 - 0.8, h: 1.1, fontSize: 17, color: rec ? C.accent4 : C.text2 });
  });
  footnote(s, "Start with A for 90 days, then review together and move to B or C if it works for both sides.");

  s = content(4, "The first 90 days together",
    "Close by asking: which market do you know best, and who comes to mind first?");
  const tl = [["Week 1", "Agree the role and terms"], ["Day 30", "Choose one market and list 10 people to introduce"],
    ["Day 60", "First introductions and calls"], ["Day 90", "First new client, then review"]];
  s.addShape(pres.shapes.LINE, { x: 1.05, y: 2.75, w: 9.3, h: 0, line: { color: C.accent3, width: 2 }, objectName: id("line") });
  tl.forEach(([when, what], i) => {
    const x = 0.7 + i * 3.1;
    s.addShape(pres.shapes.OVAL, { x: x + 0.1, y: 2.5, w: 0.5, h: 0.5, fill: { color: C.accent1 }, line: { color: C.background1, width: 2 }, objectName: id("dot") });
    t(s, when.toUpperCase(), { x, y: 3.25, w: 2.8, h: 0.4, fontSize: 14, bold: true, charSpacing: 2, color: C.accent2 });
    t(s, what, { x, y: 3.7, w: 2.8, h: 1.3, fontSize: 20, bold: true, fontFace: "Cambria" });
  });
  box(s, 0.7, 5.35, 11.9, 0.9, C.text2);
  t(s, "Today: which market do you know best? Who comes to mind first?",
    { x: 1.05, y: 5.35, w: 11.3, h: 0.9, fontSize: 19, color: C.background2, valign: "middle" });

  // CLOSE
  pres.addSection({ title: "Close" });
  s = pres.addSlide({ masterName: "COVER", sectionTitle: "Close" });
  s.addText("THANK YOU", { placeholder: "kicker" });
  s.addText("You know the people.\nWe build the system.", { placeholder: "title" });
  s.addText("Together we can win the right clients, faster.", { placeholder: "sub" });
  s.addText("Devasya Dwivedi  ·  Anshul Mikita Prajapati  ·  admin@extolaffiliates.com", { placeholder: "meta" });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
