const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require(process.env.APPLY_THEME || "./apply_theme.js");

const OUT = process.argv[2] || "deck.pptx";

// Extol brand palette (dark -> light)
const HEX = {
  forest: "101F14", pine: "1D3524", green: "2B4A34",
  moss: "7E9C6B", sage: "9EBB80", pistachio: "C6DE9F", cream: "E9F0C9",
};
const THEME = {
  name: "Extol Affiliates",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: HEX.forest, lt1: "FFFFFF", dk2: HEX.pine, lt2: HEX.cream,
    accent1: HEX.green, accent2: HEX.moss, accent3: HEX.sage,
    accent4: HEX.pistachio, accent5: "4E6E45", accent6: "F3F7E4",
    hlink: HEX.green, folHlink: HEX.moss,
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Extol Affiliates x David Samuel";
pres.author = "Extol Affiliates";
pres.company = "Extol Affiliates";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
// C.text1 forest, C.text2 pine, C.background1 white, C.background2 cream
// accent1 green, accent2 moss, accent3 sage, accent4 pistachio, accent5 deep moss, accent6 pale tint

const W = 13.333;
const FOOT = "EXTOL AFFILIATES × DAVID SAMUEL  ·  ADVISORY BRIEFING  ·  OCTOBER 2026";

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "COVER",
  background: { color: C.text1 },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: 0.8, y: 1.3, w: 11.7, h: 0.5, fontSize: 14, bold: true, color: C.accent3, charSpacing: 3, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 1.9, w: 11.7, h: 1.9, fontSize: 48, bold: true, color: C.background2, fontFace: "Cambria", valign: "top", margin: 0, align: "left" }, text: "" } },
    { placeholder: { options: { name: "sub", type: "body", x: 0.8, y: 3.95, w: 10.5, h: 1.2, fontSize: 22, color: C.accent4, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "meta", type: "body", x: 0.8, y: 6.2, w: 11.7, h: 0.6, fontSize: 14, color: C.accent3, valign: "top", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "SECTION",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "num", type: "body", x: 0.8, y: 1.9, w: 3, h: 1.2, fontSize: 60, bold: true, color: C.accent3, fontFace: "Cambria", margin: 0, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 3.15, w: 11.7, h: 1.1, fontSize: 40, bold: true, color: C.background2, fontFace: "Cambria", margin: 0, valign: "top", align: "left" }, text: "" } },
    { placeholder: { options: { name: "sub", type: "body", x: 0.8, y: 4.35, w: 10.5, h: 1.0, fontSize: 20, color: C.accent4, margin: 0, valign: "top" }, text: "" } },
  ],
  slideNumber: { x: 12.3, y: 6.95, w: 0.6, h: 0.3, fontSize: 10, color: C.accent3, align: "right" },
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  margin: [0.5, 0.6, 0.7, 0.6],
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.8, fontSize: 34, bold: true, color: C.text1, fontFace: "Cambria", margin: 0, valign: "bottom", align: "left" }, text: "" } },
    { placeholder: { options: { name: "sub", type: "body", x: 0.6, y: 1.2, w: 12.1, h: 0.45, fontSize: 16, italic: true, color: C.accent5, margin: 0, valign: "top" }, text: "" } },
    { text: { text: FOOT, options: { x: 0.6, y: 6.95, w: 10, h: 0.3, fontSize: 10, color: C.accent2, charSpacing: 1, margin: 0 } } },
  ],
  slideNumber: { x: 12.3, y: 6.95, w: 0.4, h: 0.3, fontSize: 10, color: C.accent2, align: "right" },
});

// ---------- Icons ----------
async function icon(name, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(fa[name], { color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
const ICONS = {};
async function loadIcons(names) { for (const n of names) ICONS[n] = await icon(n); }

let objN = 0;
const oid = (p) => `${p}-${++objN}`;

function iconCircle(slide, name, x, y, d = 0.6, fill = C.accent1) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill }, objectName: oid("icon-bg") });
  const p = d * 0.24;
  slide.addImage({ data: ICONS[name], x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, objectName: oid("icon") });
}
function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.08, fill: { color: opts.fill || C.background2 }, line: { color: opts.fill || C.background2 }, objectName: oid("card"),
  });
}
function txt(slide, text, o) {
  slide.addText(text, Object.assign({ isTextBox: true, margin: 0, valign: "top", fontSize: 14, color: C.text1, objectName: oid("text") }, o));
}
function content(section, title, sub) {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
  s.addText(title, { placeholder: "title" });
  if (sub) s.addText(sub, { placeholder: "sub" });
  return s;
}
function sectionSlide(section, num, title, sub) {
  pres.addSection({ title: section });
  const s = pres.addSlide({ masterName: "SECTION", sectionTitle: section });
  s.addText(num, { placeholder: "num" });
  s.addText(title, { placeholder: "title" });
  s.addText(sub, { placeholder: "sub" });
  return s;
}

(async () => {
  await loadIcons(["FaSeedling", "FaBoxOpen", "FaHandshake", "FaUserTie", "FaUserCog", "FaCube", "FaPenNib", "FaBriefcase",
    "FaHome", "FaEnvelopeOpenText", "FaLinkedin", "FaBalanceScale", "FaVideo", "FaChartLine", "FaExclamationTriangle",
    "FaFilter", "FaUserCheck", "FaCompass", "FaDoorOpen", "FaLightbulb", "FaShieldAlt", "FaUsers", "FaClock",
    "FaEye", "FaEdit", "FaCheckCircle", "FaPaperPlane", "FaChartBar", "FaBullseye", "FaCoins", "FaBan",
    "FaMicrophone", "FaRobot", "FaSearch", "FaGlobe", "FaCalendarAlt", "FaRedo", "FaTachometerAlt", "FaLock", "FaComments"]);

  // ================= 1. COVER =================
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "COVER", sectionTitle: "Opening" });
  s.addText("EXTOL AFFILIATES  ×  DAVID SAMUEL", { placeholder: "kicker" });
  s.addText("You know the rooms.\nWe build the engine.", { placeholder: "title" });
  s.addText("What we’ve been doing, what a client gets in a deal, and where you come in.", { placeholder: "sub" });
  s.addText("Advisory partnership briefing  ·  Monday 26 October 2026", { placeholder: "meta" });
  s.addNotes("Open with the purpose: David is joining us to advise, guide and help bring in new clients. Today: (1) what Extol has been doing, (2) exactly what a client gets in a deal and why, (3) where David fits and how we'd work together. Aim to leave with agreement on his role and the first 90 days.");

  // ================= 2. SHORT VERSION =================
  s = content("Opening", "The short version", "If we only had five minutes, this is the meeting.");
  const sv = [
    ["FaSeedling", "What we do", "We build growth systems for B2B experts and firms: the right buyers, the right message, every week, without eating the founder’s time."],
    ["FaBoxOpen", "What a deal includes", "Positioning, trigger-based outreach, a content engine, website and articles, events, and live reporting. One monthly fee from £2,500, every tool included."],
    ["FaHandshake", "Where you come in", "Advise on the offer and pricing. Guide us on where to play. Open doors to the first right-fit clients, and share in what they bring."],
  ];
  sv.forEach(([ic, h, b], i) => {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.85, 4.75);
    iconCircle(s, ic, x + 0.35, 2.35, 0.9);
    txt(s, h, { x: x + 0.35, y: 3.55, w: 3.2, h: 0.55, fontSize: 22, bold: true, fontFace: "Cambria" });
    txt(s, b, { x: x + 0.35, y: 4.2, w: 3.2, h: 2.3, fontSize: 17, color: C.text2 });
  });
  s.addNotes("Keep this to two minutes. The three columns are the three parts of the meeting.");

  // ================= 3. WHO WE ARE =================
  s = content("Opening", "Who we are", "Growth systems for B2B companies. Small team, built-in leverage.");
  card(s, 0.6, 1.95, 6.2, 4.6, { fill: C.text2 });
  txt(s, "WHAT WE BELIEVE", { x: 1.0, y: 2.3, w: 5.4, h: 0.4, fontSize: 12, bold: true, color: C.accent3, charSpacing: 2 });
  txt(s, "Businesses don’t buy AI.\nThey buy revenue, time and lower risk.", { x: 1.0, y: 2.75, w: 5.4, h: 1.3, fontSize: 24, bold: true, fontFace: "Cambria", color: C.background2 });
  txt(s, [
    { text: "AI is the mechanism, the outcome is the product.", options: { bullet: true, breakLine: true } },
    { text: "Agents draft. Humans decide. Nothing leaves a client’s account without a yes.", options: { bullet: true, breakLine: true } },
    { text: "Quality over quantity: few buyers, each one researched.", options: { bullet: true } },
  ], { x: 1.0, y: 4.3, w: 5.4, h: 2.0, fontSize: 15, color: C.accent4, paraSpaceAfter: 8 });
  const team = [
    ["FaUserTie", "Devasya Dwivedi (Dave)", "Strategy, discovery calls and client lead. Runs the outreach and agent systems."],
    ["FaUserCog", "Anshul Mikita Prajapati", "Research, LinkedIn audits, dashboards and delivery. Presents the audit to clients."],
  ];
  team.forEach(([ic, h, b], i) => {
    const y = 1.95 + i * 2.35;
    card(s, 7.1, y, 5.6, 2.15);
    iconCircle(s, ic, 7.45, y + 0.35, 0.75);
    txt(s, h, { x: 8.45, y: y + 0.35, w: 4.0, h: 0.5, fontSize: 18, bold: true, fontFace: "Cambria" });
    txt(s, b, { x: 8.45, y: y + 0.9, w: 4.0, h: 1.1, fontSize: 14, color: C.text2 });
  });
  s.addNotes("Roles are as they appeared on the EffectivePoint discovery call. Adjust if titles have changed.");

  // ================= SECTION 1 =================
  sectionSlide("What we’ve been doing", "01", "What we’ve been doing", "Why we do this work, who we’ve done it for, and what we built along the way.");

  // ================= 4. WHY =================
  s = content("What we’ve been doing", "Expertise isn’t the bottleneck. Distribution is.",
    "From our October LinkedIn audit of a former Big Four partner, now running a UK consultancy.");
  const stats = [["1,597", "followers after a 20-year career"], ["9", "median reactions on their own posts"], ["76%", "of their comments were some form of “congrats”"], ["14", "followers on the firm’s company page"]];
  stats.forEach(([n, l], i) => {
    const x = 0.6 + i * 3.075;
    card(s, x, 1.95, 2.85, 2.2);
    txt(s, n, { x: x + 0.3, y: 2.15, w: 2.3, h: 1.0, fontSize: 48, bold: true, fontFace: "Cambria", color: C.accent1 });
    txt(s, l, { x: x + 0.3, y: 3.2, w: 2.3, h: 0.8, fontSize: 14, color: C.text2 });
  });
  const why = [
    ["FaClock", "Time", "Experts can’t spend three hours a day on LinkedIn. So they don’t, and buyers never hear of them."],
    ["FaBan", "No system", "Work comes from referrals and old colleagues. Good, but it caps growth and can’t be planned."],
    ["FaRobot", "Generic AI noise", "Buyers are drowning in AI-written outreach. Trust now goes to specific, human, sourced."],
  ];
  why.forEach(([ic, h, b], i) => {
    const x = 0.6 + i * 4.1;
    iconCircle(s, ic, x, 4.55, 0.6);
    txt(s, h, { x: x + 0.8, y: 4.55, w: 3.0, h: 0.4, fontSize: 17, bold: true, fontFace: "Cambria" });
    txt(s, b, { x: x + 0.8, y: 5.0, w: 3.1, h: 1.6, fontSize: 14, color: C.text2 });
  });
  s.addNotes("Numbers are from public LinkedIn data captured 8 Oct 2026 for our consultancy client. The client is under NDA, so it's described, not named. The point for David: our buyers are already experts. They have a distribution problem, not a talent problem, and distribution can be fixed.");

  // ================= 5. CLIENT WORK =================
  s = content("What we’ve been doing", "Who we’ve been doing it for", "Three live accounts, three different markets, one method.");
  const work = [
    ["FaCube", "3D Images AI", "3D product models for Amazon listings",
      "LinkedIn and email outbound to Amazon brand owners. 2,100+ researched prospects, each connection note written for their product category."],
    ["FaPenNib", "Bloggerly", "Search-optimised articles for B2B sites",
      "LinkedIn campaign for the article service. Inbound SEO consultants are now asking for examples and calls."],
    ["FaBriefcase", "UK finance-transformation consultancy", "Former Big Four partner, SAP and AI value",
      "LinkedIn audit and discovery on 15 Oct. A 52-page outbound and brand strategy delivered the next day. Target: 100+ qualified leads a month by month 6."],
  ];
  work.forEach(([ic, h, tag, b], i) => {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.85, 4.0);
    iconCircle(s, ic, x + 0.35, 2.25, 0.75);
    txt(s, h, { x: x + 0.35, y: 3.15, w: 3.2, h: 0.75, fontSize: 18, bold: true, fontFace: "Cambria" });
    txt(s, tag, { x: x + 0.35, y: 3.9, w: 3.2, h: 0.5, fontSize: 13, italic: true, color: C.accent5 });
    txt(s, b, { x: x + 0.35, y: 4.45, w: 3.2, h: 1.4, fontSize: 14, color: C.text2 });
  });
  card(s, 0.6, 6.1, 12.1, 0.65, { fill: C.text2 });
  iconCircle(s, "FaHome", 0.8, 6.17, 0.5, C.accent2);
  txt(s, "Our own engine first: once the Extol company page reached about 50 followers, inbound started. People had seen our 3D Images AI and Bloggerly work and asked for the same.",
    { x: 1.5, y: 6.17, w: 11.0, h: 0.5, fontSize: 14, color: C.background2, valign: "middle" });
  s.addNotes("3D Images AI and Bloggerly are clients we already mention publicly. The consultancy (EffectivePoint, Dr Uche Nnene) is under NDA: name them only if Uche has agreed. No outcome numbers are claimed here yet because none are published. See the 'honest gaps' slide.");

  // ================= 6. IN-HOUSE IP =================
  s = content("What we’ve been doing", "What we built along the way", "Every engagement leaves a reusable system behind. That is the asset.");
  const ip = [
    ["FaEnvelopeOpenText", "Cold email system", "2 agents, 16 skills and an automatic checker. Every draft is scored 0–100 by an independent critic and ships only at 85+."],
    ["FaLinkedin", "LinkedIn engine", "An agent reads buyers’ posts and drafts comments. Linked Helper sends requests at a human pace from a UK server."],
    ["FaBalanceScale", "Lead scoring", "A decisions model triages leads and replies for about 1.8 cents per thousand decisions, so people spend time on the few that matter."],
    ["FaVideo", "Content and creative", "Articles (Bloggerly), visuals and video ads (Higgsfield), webinar clips (OpusClip), all from one raw note."],
    ["FaChartLine", "Live dashboards", "Followers, reactions, replies and calls tracked from day one, so every lead traces back to its source."],
    ["FaSearch", "Trigger research", "New-in-role leaders, hiring signals, M&A, tenders and regulation turned into a reason to reach out this month."],
  ];
  ip.forEach(([ic, h, b], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.1, y = 1.95 + row * 2.45;
    card(s, x, y, 3.85, 2.25);
    iconCircle(s, ic, x + 0.3, y + 0.3, 0.6);
    txt(s, h, { x: x + 1.1, y: y + 0.38, w: 2.6, h: 0.45, fontSize: 17, bold: true, fontFace: "Cambria" });
    txt(s, b, { x: x + 0.3, y: y + 1.05, w: 3.3, h: 1.1, fontSize: 13.5, color: C.text2 });
  });
  s.addNotes("This is the productisation story. Each client engagement adds a reusable component. For David: these systems are what lets a two-person team deliver like a larger agency.");

  // ================= 7. LESSONS =================
  s = content("What we’ve been doing", "What we learned the hard way", "Mistakes we made on our own accounts, so clients don’t pay for them.");
  const lessons = [
    ["FaExclamationTriangle", "We moved too fast", "Early on we sent too many connection requests in a few days, and an account was restricted for a day.",
      "Now: every account starts at 5 requests a day and climbs to 20 by week six, from a UK address, well under LinkedIn’s limits."],
    ["FaFilter", "Volume isn’t pipeline", "A job title alone doesn’t make someone a buyer. Messaging everyone burns the account and the brand.",
      "Now: one buying trigger earns a message, two make someone a priority. Nobody gets a note just for their title."],
    ["FaUserCheck", "AI slop kills trust", "Senior buyers can spot generic AI copy in a line, and one bad comment costs more than ten good ones earn.",
      "Now: every post, comment and message waits for a human yes. Every number has a source. Two proofreads before the client sees it."],
  ];
  lessons.forEach(([ic, h, b, fix], i) => {
    const x = 0.6 + i * 4.1;
    iconCircle(s, ic, x, 1.95, 0.7);
    txt(s, h, { x, y: 2.85, w: 3.85, h: 0.5, fontSize: 19, bold: true, fontFace: "Cambria" });
    txt(s, b, { x, y: 3.4, w: 3.85, h: 1.2, fontSize: 14, color: C.text2 });
    card(s, x, 4.75, 3.85, 1.6);
    txt(s, fix, { x: x + 0.25, y: 4.95, w: 3.35, h: 1.3, fontSize: 14, color: C.text1 });
  });
  s.addNotes("Credibility slide. Advisors trust teams who name their mistakes. The ban was temporary (about a day) and on our own account, not a client's.");

  // ================= SECTION 2 =================
  sectionSlide("What a deal includes", "02", "What a client gets in a deal", "Each part: what it is, why we do it, what it produces, and how we run it.");

  // ================= 8. ENGINE =================
  s = content("What a deal includes", "One raw note a week becomes everything else", "The client brings the expertise. We bring the leverage.");
  card(s, 0.6, 2.2, 2.9, 3.9, { fill: C.text2 });
  iconCircle(s, "FaMicrophone", 1.65, 2.55, 0.8, C.accent2);
  txt(s, "Client’s raw note", { x: 0.85, y: 3.55, w: 2.4, h: 0.5, fontSize: 18, bold: true, fontFace: "Cambria", color: C.background2, align: "center" });
  txt(s, "A voice note or a few lines, about 30 minutes, once a week", { x: 0.85, y: 4.1, w: 2.4, h: 1.5, fontSize: 14, color: C.accent4, align: "center" });
  s.addShape(pres.shapes.RIGHT_ARROW, { x: 3.65, y: 3.85, w: 0.6, h: 0.5, fill: { color: C.accent2 }, line: { color: C.accent2 }, objectName: oid("arrow") });
  card(s, 4.4, 2.2, 2.9, 3.9);
  iconCircle(s, "FaEdit", 5.45, 2.55, 0.8);
  txt(s, "Extol drafts", { x: 4.65, y: 3.55, w: 2.4, h: 0.5, fontSize: 18, bold: true, fontFace: "Cambria", align: "center" });
  txt(s, "In the client’s voice, sources checked, proofread twice", { x: 4.65, y: 4.1, w: 2.4, h: 1.5, fontSize: 14, color: C.text2, align: "center" });
  s.addShape(pres.shapes.RIGHT_ARROW, { x: 7.45, y: 3.85, w: 0.6, h: 0.5, fill: { color: C.accent2 }, line: { color: C.accent2 }, objectName: oid("arrow") });
  const outs = ["LinkedIn posts and company page", "Comments on buyers’ posts", "Monthly newsletter", "Search articles on their site", "Webinar clips and visuals", "Personal welcome video for leads"];
  outs.forEach((o, i) => {
    const y = 2.2 + i * 0.66;
    card(s, 8.2, y, 4.5, 0.56, { fill: i % 2 ? C.background2 : C.accent6 });
    txt(s, o, { x: 8.45, y, w: 4.1, h: 0.56, fontSize: 14, valign: "middle" });
  });
  txt(s, "Client time: about 2½ hours a week, approvals on their phone.", { x: 0.6, y: 6.35, w: 12.1, h: 0.4, fontSize: 15, bold: true, color: C.accent5 });
  s.addNotes("This answers the number one objection we hear: 'I don't have time.' The client never writes the same idea twice.");

  // ================= 9-10. COMPONENT TABLES =================
  const hdr = (t) => ({ text: t, options: { bold: true, color: C.background2, fill: { color: C.text2 }, fontSize: 14, fontFace: "Cambria" } });
  const cell = (t, b) => ({ text: t, options: { fontSize: 13.5, bold: !!b, color: C.text1, fill: { color: C.background1 } } });
  function compTable(title, sub, rows, notes) {
    const sl = content("What a deal includes", title, sub);
    const data = [[hdr("Component"), hdr("What it is"), hdr("Why we do it"), hdr("What it produces")]];
    rows.forEach((r) => data.push([cell(r[0], true), cell(r[1]), cell(r[2]), cell(r[3])]));
    sl.addTable(data, {
      x: 0.6, y: 1.95, w: 12.1, colW: [2.2, 3.5, 3.3, 3.1], rowH: [0.5, 1.05, 1.05, 1.05, 1.05],
      border: { type: "solid", pt: 0.75, color: HEX.pistachio }, valign: "middle", margin: [0.08, 0.12, 0.08, 0.12], objectName: oid("table"),
    });
    sl.addNotes(notes);
    return sl;
  }
  compTable("Part one: build the foundation", "Weeks 1 to 4. Nothing launches into an empty room.", [
    ["Audit and positioning", "Profile, company page and content audit. One positioning line used everywhere.", "Buyers check you before they reply. Four names and three locations kill trust.", "A profile and page a CFO believes, in week one"],
    ["Targeting and triggers", "A named buyer list built from signals: new in role, hiring, M&A, tenders, regulation.", "A message with a reason gets a reply. A job title alone doesn’t.", "200+ named buyers, ranked by how ready they are"],
    ["Website and articles", "Site rebuilt around one first offer. Two search articles a month.", "Every channel needs one place to land. Search compounds for years.", "Tracked bookings; every lead traced to its source"],
    ["Reporting", "Live dashboard plus a monthly review with the client.", "Cut what isn’t working, double what is. No guessing.", "Decisions on data, and a client who sees progress"],
  ], "Foundation work is front-loaded into the first month. It's also where most agencies skip ahead, and why their outreach lands on a weak profile.");
  compTable("Part two: run the engine", "Every week from week 2. This is the recurring part of the fee.", [
    ["LinkedIn outreach", "5 rising to 20 connection requests a day, half warm, half cold, with a follow-up.", "Gets the expert into the buyer’s network before the RFP or budget lands.", "About 8 booked calls a month at full pace"],
    ["Engagement", "3–5 drafted comments a day on buyers’ posts, approved by the client.", "Visibility with the exact buyers, without a cold pitch.", "Name recognition where it counts"],
    ["Content engine", "One raw note becomes posts, newsletter, articles and clips.", "Consistency without taking the founder’s week.", "Weekly proof and point-of-view posts"],
    ["Events and community", "Monthly webinar, small invite-only dinners, Substack or Skool where it fits.", "Be in rooms where buyers already are, and own a small one.", "Warm calls within 48 hours of every event"],
  ], "The outreach numbers come from our funnel model on the next slides. They are forecasts, not yet results.");

  // ================= 11. HOW =================
  s = content("What a deal includes", "How we run it: agents draft, people decide", "The same five-step loop for every channel and every client.");
  const loop = [["FaEye", "Watch", "Agents read buyers’ posts, job moves and news for triggers"], ["FaEdit", "Draft", "Posts, comments and notes in the client’s voice"],
    ["FaCheckCircle", "Approve", "The client says yes, edits or bins it, on their phone"], ["FaPaperPlane", "Publish", "At a human pace, from a safe UK address"], ["FaChartBar", "Measure", "Replies, calls and followers, reviewed monthly"]];
  loop.forEach(([ic, h, b], i) => {
    const x = 0.6 + i * 2.45;
    card(s, x, 1.95, 2.25, 2.9, { fill: i === 2 ? C.text2 : C.background2 });
    iconCircle(s, ic, x + 0.75, 2.2, 0.75, i === 2 ? C.accent2 : C.accent1);
    txt(s, h, { x: x + 0.15, y: 3.1, w: 1.95, h: 0.45, fontSize: 19, bold: true, fontFace: "Cambria", align: "center", color: i === 2 ? C.background2 : C.text1 });
    txt(s, b, { x: x + 0.15, y: 3.6, w: 1.95, h: 1.15, fontSize: 13.5, align: "center", color: i === 2 ? C.accent4 : C.text2 });
    if (i < 4) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + 2.27, y: 3.25, w: 0.16, h: 0.3, fill: { color: C.accent2 }, line: { color: C.accent2 }, objectName: oid("arrow") });
  });
  const rules = ["Clients are named only with written permission", "Every number has a linked source", "Two proofreads before the client sees a draft", "Mistakes come down the same day, and we log why"];
  rules.forEach((r, i) => {
    const x = 0.6 + (i % 2) * 6.1, y = 5.15 + Math.floor(i / 2) * 0.75;
    iconCircle(s, "FaShieldAlt", x, y, 0.5, C.accent2);
    txt(s, r, { x: x + 0.7, y, w: 5.2, h: 0.5, fontSize: 15, valign: "middle" });
  });
  s.addNotes("The approval step is highlighted because it's the difference between us and 'AI outreach' tools. Senior clients care about it most.");

  // ================= 12. FUNNEL =================
  s = content("What a deal includes", "What 20 requests a day turn into", "Monthly outreach funnel at full pace, once the account is warmed up. Our planning model.");
  s.addChart(pres.charts.BAR, [{ name: "Per month", labels: ["Requests sent", "Accepted", "Replied", "Calls booked"], values: [400, 150, 27, 8] }], {
    x: 0.6, y: 1.9, w: 7.4, h: 4.8, barDir: "bar", chartColors: [HEX.green],
    catAxisOrientation: "maxMin", showValue: true, dataLabelPosition: "outEnd", dataLabelColor: HEX.forest, dataLabelFontSize: 14, dataLabelFontFace: "+mn-lt",
    catAxisLabelColor: HEX.forest, catAxisLabelFontSize: 14, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true,
    valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 40, objectName: "funnel-chart",
  });
  const rates = [["37%", "accept", "Warm contacts accept far more than cold"], ["18%", "of acceptors reply", "Because every note names their trigger"], ["30%", "of replies book", "No pitch in the first message, just a question"]];
  rates.forEach(([n, l, b], i) => {
    const y = 1.95 + i * 1.6;
    card(s, 8.4, y, 4.3, 1.4);
    txt(s, n, { x: 8.65, y: y + 0.15, w: 1.5, h: 0.7, fontSize: 32, bold: true, fontFace: "Cambria", color: C.accent1, valign: "middle" });
    txt(s, l, { x: 10.15, y: y + 0.15, w: 2.4, h: 0.7, fontSize: 15, bold: true, valign: "middle" });
    txt(s, b, { x: 8.65, y: y + 0.88, w: 3.9, h: 0.45, fontSize: 13, color: C.text2 });
  });
  s.addNotes("These conversion rates are the planning assumptions used in the consultancy strategy. Treat them as a model to be proven, not track record. A key question for David: do they match what he has seen in his market?");

  // ================= 13. OUTCOMES =================
  s = content("What a deal includes", "The outcome: a pipeline that compounds", "Forecast for our consultancy client. Five lead sources, one inbox.");
  s.addChart(pres.charts.BAR, [{ name: "Qualified leads", labels: ["Month 1", "Month 3", "Month 6", "Month 12"], values: [13, 71, 101, 126] }], {
    x: 0.6, y: 1.9, w: 6.6, h: 4.8, barDir: "col", chartColors: [HEX.green],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: HEX.forest, dataLabelFontSize: 14, dataLabelFontFace: "+mn-lt",
    catAxisLabelColor: HEX.forest, catAxisLabelFontSize: 14, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true,
    valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 55,
    showTitle: true, title: "Qualified leads a month (forecast mid-points)", titleColor: HEX.forest, titleFontSize: 14, titleFontFace: "+mn-lt", objectName: "leads-chart",
  });
  const ladder = [["100", "qualified leads a month"], ["10", "worth pursuing: real buyer calls"], ["2–3", "paying clients"]];
  ladder.forEach(([n, l], i) => {
    const y = 1.95 + i * 1.25;
    card(s, 7.6, y, 5.1, 1.05);
    txt(s, n, { x: 7.85, y, w: 1.3, h: 1.05, fontSize: 30, bold: true, fontFace: "Cambria", color: C.accent1, valign: "middle" });
    txt(s, l, { x: 9.2, y, w: 3.4, h: 1.05, fontSize: 15, valign: "middle" });
  });
  card(s, 7.6, 5.75, 5.1, 0.95, { fill: C.text2 });
  txt(s, "Big-ticket sales take 6–12 months. The first win usually lands in months 6–12.", { x: 7.85, y: 5.75, w: 4.6, h: 0.95, fontSize: 14, color: C.background2, valign: "middle" });
  s.addNotes("A qualified lead = a buyer or shortlister who replies, messages, books or signs up. Likes don't count. The 100 / 10 / 2-3 rule came from the client themself. Be explicit with David that this is a forecast. Proving it is the job of the next six months.");

  // ================= 14. COMMERCIALS =================
  s = content("What a deal includes", "The commercials", "One monthly fee. Every tool, subscription and hosting cost included.");
  const fees = [["£2,500", "a month", "Standard fee, from month four"], ["£1,500", "month one", "Founding rate: set-up, voice interview, website build"], ["£1,200", "months two and three", "Founding rate: delivery and weekly call"]];
  fees.forEach(([n, l, b], i) => {
    const x = 0.6 + i * 2.75;
    card(s, x, 1.95, 2.55, 2.5, { fill: i === 0 ? C.text2 : C.background2 });
    txt(s, n, { x: x + 0.25, y: 2.15, w: 2.1, h: 0.8, fontSize: 34, bold: true, fontFace: "Cambria", color: i === 0 ? C.background2 : C.accent1 });
    txt(s, l, { x: x + 0.25, y: 2.95, w: 2.1, h: 0.4, fontSize: 14, bold: true, color: i === 0 ? C.accent4 : C.text1 });
    txt(s, b, { x: x + 0.25, y: 3.4, w: 2.1, h: 0.95, fontSize: 13, color: i === 0 ? C.accent4 : C.text2 });
  });
  card(s, 0.6, 4.7, 7.95, 2.0);
  iconCircle(s, "FaBullseye", 0.85, 4.95, 0.6);
  txt(s, "Our accountability", { x: 1.65, y: 4.98, w: 6.5, h: 0.45, fontSize: 17, bold: true, fontFace: "Cambria" });
  txt(s, "At day 60 we review the numbers together. If we’re behind, we agree a written fix plan, or the client gives 30 days’ notice and leaves before the standard fee starts.",
    { x: 1.65, y: 5.45, w: 6.7, h: 1.15, fontSize: 14, color: C.text2 });
  const roi = [hdr("If year one brings…"), hdr("Worth"), hdr("Return on profit")];
  s.addTable([roi,
    [cell("One small advisory piece"), cell("£50,000"), cell("≈ 0.9×")],
    [cell("One mid-size engagement"), cell("£150,000"), cell("≈ 2.8×", true)],
    [cell("Two engagements"), cell("£500,000+"), cell("≈ 9.5×", true)]], {
    x: 8.85, y: 1.95, w: 3.85, colW: [1.75, 1.0, 1.1], rowH: [0.6, 0.75, 0.75, 0.75],
    border: { type: "solid", pt: 0.75, color: HEX.pistachio }, valign: "middle", margin: [0.06, 0.08, 0.06, 0.08], objectName: oid("table"),
  });
  txt(s, "Year-one fee £26,400. Return assumes a 50% margin after delivery. Illustrative.", { x: 8.85, y: 5.0, w: 3.85, h: 1.0, fontSize: 12, italic: true, color: C.accent5 });
  s.addNotes("These are the terms offered to our first consultancy client (founding rate). Prices exclude VAT. Extras only if needed (e.g. Skool Pro, extra visual credits, paid ads) and always agreed first. Ask David: does this price fit the value for the clients he'd introduce?");

  // ================= 15. GUARDRAILS =================
  s = content("What a deal includes", "What we take care of, so the client doesn’t worry", "The things that could go wrong, and what we do about each one.");
  const guard = [
    ["FaLinkedin", "Their LinkedIn account", "Human pace, slow warm-up, a UK address. Always well under daily limits."],
    ["FaLock", "Their clients and NDA", "Named only with written permission. NDA and a data processing agreement before we start."],
    ["FaRedo", "Mistakes", "Anything wrong comes down the same day, gets fixed, and the cause is logged."],
    ["FaGlobe", "Their brand", "One name, one location, one story, everywhere, from week one."],
    ["FaShieldAlt", "Their data", "Confidential detail is stripped from notes before drafting. Accounts and content are handed back if we stop."],
    ["FaUsers", "Their audiences", "Buyer and community content never share a post. A CFO should never feel sold a course."],
  ];
  guard.forEach(([ic, h, b], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.1, y = 1.95 + row * 2.4;
    card(s, x, y, 3.85, 2.2);
    iconCircle(s, ic, x + 0.3, y + 0.3, 0.6);
    txt(s, h, { x: x + 1.1, y: y + 0.38, w: 2.6, h: 0.45, fontSize: 17, bold: true, fontFace: "Cambria" });
    txt(s, b, { x: x + 0.3, y: y + 1.05, w: 3.3, h: 1.05, fontSize: 14, color: C.text2 });
  });
  s.addNotes("Advisors put their own reputation on the line with every intro. This slide is the reassurance that a client he refers will be handled carefully.");

  // ================= SECTION 3 =================
  sectionSlide("Where you come in", "03", "Where you come in", "Advise, guide and open doors, and how we make it worth your while.");

  // ================= 16. ROLE =================
  s = content("Where you come in", "Three ways you can move the needle", "Working alongside us, not for us.");
  const roles = [
    ["FaLightbulb", "Advise", ["Pressure-test the offer and pricing", "Sharpen how we explain outcomes to senior buyers", "Sit in on key pitches and debrief us"]],
    ["FaCompass", "Guide", ["Help us pick the one market to own first", "Tell us which proof your network would trust", "A monthly strategy hour with the founders"]],
    ["FaDoorOpen", "Open doors", ["Warm intros to founders and firms who fit", "Join first calls where your name helps", "Point us to the rooms and events that matter"]],
  ];
  roles.forEach(([ic, h, items], i) => {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.85, 4.75, { fill: i === 2 ? C.text2 : C.background2 });
    iconCircle(s, ic, x + 0.35, 2.3, 0.85, i === 2 ? C.accent2 : C.accent1);
    txt(s, h, { x: x + 0.35, y: 3.35, w: 3.2, h: 0.55, fontSize: 24, bold: true, fontFace: "Cambria", color: i === 2 ? C.background2 : C.text1 });
    txt(s, items.map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < items.length - 1 } })),
      { x: x + 0.35, y: 4.05, w: 3.2, h: 2.5, fontSize: 15, color: i === 2 ? C.accent4 : C.text2, paraSpaceAfter: 10 });
  });
  s.addNotes("Ask David which of the three he wants to lead with. Most advisors are strongest at one. Don't assume all three.");

  // ================= 17. HONEST GAPS =================
  s = content("Where you come in", "Where we most need an outside view", "An honest read of our own gaps. These are the questions we’d bring to you first.");
  const gaps = [
    ["FaChartBar", "Proof", "No published case study with hard numbers yet. Our results are early and mostly forecasts.", "Which proof would your network trust first?"],
    ["FaBullseye", "Focus", "Three very different markets so far: Amazon brands, SEO services, finance consulting.", "Which one should we own, and which should we drop?"],
    ["FaCoins", "Pricing", "£2,500 a month has been offered to one founding client. It isn’t tested at scale.", "Is it priced for the value, or leaving money on the table?"],
    ["FaUsers", "Capacity", "Two founders run sales and delivery. Systems carry a lot, but not everything.", "How many clients before we hire, and who first?"],
  ];
  gaps.forEach(([ic, h, b, q], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 6.1, y = 1.95 + row * 2.4;
    card(s, x, y, 5.85, 2.2);
    iconCircle(s, ic, x + 0.3, y + 0.3, 0.6);
    txt(s, h, { x: x + 1.1, y: y + 0.38, w: 4.5, h: 0.45, fontSize: 18, bold: true, fontFace: "Cambria" });
    txt(s, b, { x: x + 0.3, y: y + 1.0, w: 5.3, h: 0.7, fontSize: 14, color: C.text2 });
    txt(s, q, { x: x + 0.3, y: y + 1.68, w: 5.3, h: 0.4, fontSize: 14, bold: true, italic: true, color: C.accent5 });
  });
  s.addNotes("Being candid here builds trust with an advisor and gets better advice. Update this slide if any case study numbers land before Monday.");

  // ================= 18. PARTNERSHIP OPTIONS =================
  s = content("Where you come in", "How we could work together", "A proposal to shape together on Monday. Nothing here is fixed.");
  const opts = [
    ["FaHandshake", "Referral partner", "A share of the fees from every client you introduce, for their first year.", "Simple, no fixed cost, pays only on results.", "Option A"],
    ["FaComments", "Advisor", "A set number of hours a month, plus a smaller success fee on introduced clients.", "Regular rhythm; good if advice is the main value.", "Option B"],
    ["FaSeedling", "Strategic advisor", "A small equity stake, vesting over time, once the fit is proven.", "Long-term alignment with where Extol is going.", "Option C"],
  ];
  opts.forEach(([ic, h, b, pro, tag], i) => {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.85, 3.6);
    txt(s, tag.toUpperCase(), { x: x + 0.35, y: 2.2, w: 2.0, h: 0.35, fontSize: 12, bold: true, color: C.accent5, charSpacing: 2 });
    iconCircle(s, ic, x + 2.85, 2.15, 0.65);
    txt(s, h, { x: x + 0.35, y: 2.95, w: 3.2, h: 0.5, fontSize: 20, bold: true, fontFace: "Cambria" });
    txt(s, b, { x: x + 0.35, y: 3.5, w: 3.2, h: 1.1, fontSize: 14, color: C.text2 });
    txt(s, pro, { x: x + 0.35, y: 4.65, w: 3.2, h: 0.8, fontSize: 13.5, italic: true, color: C.accent5 });
  });
  card(s, 0.6, 5.8, 12.1, 0.9, { fill: C.text2 });
  iconCircle(s, "FaCheckCircle", 0.85, 5.95, 0.6, C.accent2);
  txt(s, "Our suggestion: start as a referral partner for 90 days, then review together and move to B or C if it’s working for both sides.",
    { x: 1.65, y: 5.8, w: 10.8, h: 0.9, fontSize: 15, color: C.background2, valign: "middle" });
  s.addNotes("Percentages, hours and equity are deliberately left blank to agree in the room. Decide your walk-away numbers before Monday. A common referral range is a share of first-year fees. Equity normally only after a trial period.");

  // ================= 19. 90 DAYS =================
  s = content("Where you come in", "The first 90 days together", "Small, concrete steps, so we both know quickly whether this works.");
  const steps = [
    ["Week 1", "Agree the role", "Role, terms and a monthly hour in the diary. NDA both ways."],
    ["Day 30", "Pick the market", "One market to lead with. A shortlist of 10 people you could introduce."],
    ["Day 60", "First intros", "First warm intros and calls, with you in the room where it helps."],
    ["Day 90", "Review", "First referred client signed or in proposal. Decide the long-term model."],
  ];
  s.addShape(pres.shapes.LINE, { x: 1.0, y: 2.55, w: 9.2, h: 0, line: { color: C.accent3, width: 2 }, objectName: oid("timeline") });
  steps.forEach(([w, h, b], i) => {
    const x = 0.6 + i * 3.075;
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: 2.3, w: 0.5, h: 0.5, fill: { color: i === 3 ? C.text2 : C.accent1 }, line: { color: C.background1, width: 2 }, objectName: oid("dot") });
    txt(s, w.toUpperCase(), { x, y: 3.0, w: 2.85, h: 0.35, fontSize: 13, bold: true, color: C.accent5, charSpacing: 2 });
    card(s, x, 3.45, 2.85, 2.2);
    txt(s, h, { x: x + 0.25, y: 3.65, w: 2.4, h: 0.5, fontSize: 18, bold: true, fontFace: "Cambria" });
    txt(s, b, { x: x + 0.25, y: 4.2, w: 2.4, h: 1.35, fontSize: 14, color: C.text2 });
  });
  card(s, 0.6, 5.9, 12.1, 0.85, { fill: C.text2 });
  iconCircle(s, "FaComments", 0.85, 6.02, 0.6, C.accent2);
  txt(s, "Questions for you today: which market do you know best? Who comes to mind first? What would make this a clear yes for you?",
    { x: 1.65, y: 5.9, w: 10.8, h: 0.85, fontSize: 15, bold: true, color: C.background2, valign: "middle" });
  s.addNotes("End the content part here and open the floor. Capture David's answers to the three questions. They set the first 30 days.");

  // ================= 20. CLOSE =================
  pres.addSection({ title: "Close" });
  s = pres.addSlide({ masterName: "COVER", sectionTitle: "Close" });
  s.addText("THANK YOU", { placeholder: "kicker" });
  s.addText("You know the rooms.\nWe build the engine.", { placeholder: "title" });
  s.addText("Together: the right clients, a system that delivers for them, and proof that compounds.", { placeholder: "sub" });
  s.addText("Devasya Dwivedi  ·  Anshul Mikita Prajapati  ·  admin@extolaffiliates.com  ·  extolaffiliates.com", { placeholder: "meta" });
  s.addNotes("Agree next steps before leaving: terms by email this week, first monthly hour booked.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
