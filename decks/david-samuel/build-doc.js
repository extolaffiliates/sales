// Builds the 10-page Extol briefing document for David Samuel (A4, Word).
// Usage: node build-doc.js <out.docx>   (needs `docx` and `sharp` on NODE_PATH)
const fs = require("fs");
const sharp = require("sharp");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, AlignmentType, LineRuleType, LevelFormat, Footer, PositionalTab, PositionalTabAlignment,
  PositionalTabRelativeTo, PositionalTabLeader, PageNumber, VerticalAlign, TabStopType, TableLayoutType,
} = require("docx");

const SANS = "DM Sans", MONO = "DM Mono";
const C = { ink: "101F14", pine: "1D3524", forest: "2B4A34", moss: "7E9C6B", sage: "9EBB80", pist: "C6DE9F", cream: "E9F0C9", grey: "5B6B5E", paper: "F6F8EC" };
const CW = 9638; // content width in DXA (A4 minus 2 cm margins)
const PX = 642;  // same width in px at 96 dpi
const S = 1.2, SP = 1.5; // type and spacing scale, tuned so each section fills one page

// ---------- text helpers ----------
const run = (text, o = {}) => new TextRun({ text, font: o.font || SANS, size: Math.round((o.size || 21) * S), color: o.color || C.ink, bold: o.bold, italics: o.italics });
const p = (text, o = {}) => new Paragraph({
  spacing: (o.size || 21) >= 40
    ? { after: Math.round((o.after ?? 120) * SP), before: Math.round((o.before ?? 0) * SP), line: Math.round((o.size || 21) * S * 11.5), lineRule: LineRuleType.EXACT }
    : { after: Math.round((o.after ?? 120) * SP), before: Math.round((o.before ?? 0) * SP), line: o.line ?? 276 }, alignment: o.align, pageBreakBefore: o.pageBreak,
  keepNext: o.keepNext,
  children: Array.isArray(text) ? text : [run(text, o)],
});
const label = (text, o = {}) => p(text.toUpperCase(), { font: MONO, size: 16, color: o.color || C.forest, after: o.after ?? 80, before: o.before, pageBreak: o.pageBreak });
const h1 = (text, o = {}) => p(text, { size: 50, color: C.ink, after: 160, line: 240, ...o });
const h2 = (text, o = {}) => p(text, { size: 27, color: C.forest, after: 80, before: o.before ?? 200, keepNext: true, ...o });
const lead = (text, o = {}) => p(text, { size: 24, color: C.grey, after: 200, line: 300, ...o });
const rule = () => new Paragraph({ spacing: { after: 160 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.sage, space: 1 } }, children: [] });
const bullet = (text, o = {}) => new Paragraph({
  numbering: { reference: "dots", level: 0 }, spacing: { after: 100, line: 276 },
  children: Array.isArray(text) ? text : [run(text, o)],
});
const bold = (t) => run(t, { bold: true });

// ---------- table helpers ----------
const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none };
const cell = (children, w, o = {}) => new TableCell({
  width: { size: w, type: WidthType.DXA }, verticalAlign: o.vAlign || VerticalAlign.TOP,
  shading: o.fill ? { type: ShadingType.CLEAR, color: "auto", fill: o.fill } : undefined,
  margins: { top: o.pad ?? 140, bottom: o.pad ?? 140, left: o.padX ?? 180, right: o.padX ?? 180 },
  borders: o.borders || { top: none, bottom: none, left: none, right: none },
  children,
});
const grid = (rows, widths, o = {}) => new Table({
  width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED,
  borders: noBorders, rows: rows.map((r) => new TableRow({ cantSplit: true, children: r })),
});
const gap = (after = 160) => new Paragraph({ spacing: { after: Math.round(after * SP) }, children: [] });

// A row of cards: [{k, t, b}] -> mono kicker, title, body
const cards = (items, fill = C.paper) => {
  const n = items.length, g = 160, w = Math.floor((CW - g * (n - 1)) / n);
  const widths = []; const row = [];
  items.forEach((it, i) => {
    widths.push(w); row.push(cell([
      ...(it.k ? [label(it.k, { color: C.moss })] : []),
      p(it.t, { size: 24, after: 80, line: 250 }),
      ...[].concat(it.b).map((b) => p(b, { size: 19, color: C.grey, after: 60, line: 260 })),
    ], w, { fill }));
    if (i < n - 1) { widths.push(g); row.push(cell([p("")], g, { pad: 0, padX: 0 })); }
  });
  const sum = widths.reduce((a, b) => a + b, 0); widths[widths.length - 1] += CW - sum;
  return grid([row], widths);
};

// Numbered timeline / step list: [{n, t, b}]
const steps = (items, W = CW) => grid(items.map((it) => [
  cell([p(it.n, { font: MONO, size: 22, color: C.moss, after: 0 })], 900, { pad: 110, padX: 0, borders: { top: { style: BorderStyle.SINGLE, size: 4, color: C.pist } } }),
  cell([p(it.t, { size: 22, after: 40 }), p(it.b, { size: 19, color: C.grey, after: 0, line: 260 })], W - 900,
    { pad: 110, padX: 0, borders: { top: { style: BorderStyle.SINGLE, size: 4, color: C.pist } } }),
]), [900, W - 900]);

const callout = (text, o = {}) => grid([[cell([p(text, { size: o.size || 22, color: o.color || C.cream, after: 0, line: 290 })], CW,
  { fill: o.fill || C.pine, pad: 220, padX: 300 })]], [CW]);

// ---------- charts (SVG -> PNG) ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const svgText = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-family="${o.font || "DM Sans"}" font-size="${o.size || 14}" fill="#${o.color || C.ink}" text-anchor="${o.anchor || "start"}">${esc(s)}</text>`;
async function png(svg, w, h) {
  const buf = await sharp(Buffer.from(svg), { density: 288 }).png().toBuffer();
  return new Paragraph({ spacing: { after: 80 }, children: [new ImageRun({ type: "png", data: buf, transformation: { width: w, height: h } })] });
}
function svgWrap(w, h, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#FFFFFF"/>${title ? svgText(0, 14, title.toUpperCase(), { font: "DM Mono", size: 11, color: C.forest }) : ""}${body}</svg>`;
}
function colChart(labels, values, o) {
  const w = o.w, h = o.h, top = 44, base = h - 34, max = Math.max(...values) * 1.12, n = values.length;
  const slot = w / n, bw = slot * (o.bar || 0.5);
  let b = `<line x1="0" y1="${base}" x2="${w}" y2="${base}" stroke="#${C.sage}" stroke-width="1"/>`;
  values.forEach((v, i) => {
    const bh = (v / max) * (base - top), x = i * slot + (slot - bw) / 2;
    b += `<rect x="${x}" y="${base - bh}" width="${bw}" height="${bh}" fill="#${(o.colors || [])[i] || C.forest}"/>`;
    b += svgText(x + bw / 2, base - bh - 8, o.fmt ? o.fmt(v) : v, { anchor: "middle", size: 15 });
    b += svgText(x + bw / 2, base + 20, labels[i], { anchor: "middle", size: 13, color: C.grey });
  });
  return svgWrap(w, h, b, o.title);
}
function hbarChart(labels, values, o) {
  const w = o.w, h = o.h, left = o.left || 120, top = 34, max = Math.max(...values) * 1.15, n = values.length;
  const slot = (h - top) / n, bh = slot * 0.55;
  let b = `<line x1="${left}" y1="${top}" x2="${left}" y2="${h}" stroke="#${C.sage}" stroke-width="1"/>`;
  values.forEach((v, i) => {
    const y = top + i * slot + (slot - bh) / 2, bw = Math.max(2, (v / max) * (w - left - 50));
    b += svgText(left - 10, y + bh / 2 + 5, labels[i], { anchor: "end", size: 13, color: C.grey });
    b += `<rect x="${left}" y="${y}" width="${bw}" height="${bh}" fill="#${(o.colors || [])[i] || C.forest}"/>`;
    b += svgText(left + bw + 8, y + bh / 2 + 5, v, { size: 14 });
  });
  return svgWrap(w, h, b, o.title);
}
function donut(labels, values, o) {
  const w = o.w, h = o.h, r = Math.min(o.r || 70, (h - 40) / 2), cx = r + 10, cy = 34 + r, ri = r * 0.6;
  const total = values.reduce((a, b) => a + b, 0); let a0 = -Math.PI / 2, b = "";
  values.forEach((v, i) => {
    const a1 = a0 + (v / total) * Math.PI * 2, large = a1 - a0 > Math.PI ? 1 : 0;
    const P = (rr, a) => `${cx + rr * Math.cos(a)} ${cy + rr * Math.sin(a)}`;
    b += `<path d="M ${P(r, a0)} A ${r} ${r} 0 ${large} 1 ${P(r, a1)} L ${P(ri, a1)} A ${ri} ${ri} 0 ${large} 0 ${P(ri, a0)} Z" fill="#${o.colors[i]}"/>`;
    const am = (a0 + a1) / 2, lr = (r + ri) / 2;
    b += svgText(cx + lr * Math.cos(am), cy + lr * Math.sin(am) + 5, o.fmt ? o.fmt(v, total) : v, { anchor: "middle", size: 13, color: i === 0 ? "FFFFFF" : C.ink });
    a0 = a1;
  });
  if (o.centre) b += svgText(cx, cy + 6, o.centre, { anchor: "middle", size: 16 });
  labels.forEach((l, i) => {
    const y = cy - (labels.length * 24) / 2 + i * 24 + 12;
    b += `<rect x="${cx + r + 26}" y="${y - 10}" width="12" height="12" fill="#${o.colors[i]}"/>` + svgText(cx + r + 46, y + 1, l, { size: 13 });
  });
  return svgWrap(w, h, b, o.title);
}
function lineChart(labels, values, o) {
  const w = o.w, h = o.h, left = 20, right = 30, top = 50, base = h - 34, max = Math.max(...values) * 1.15, n = values.length;
  const X = (i) => left + (i * (w - left - right)) / (n - 1), Y = (v) => base - (v / max) * (base - top);
  let b = `<line x1="0" y1="${base}" x2="${w}" y2="${base}" stroke="#${C.sage}" stroke-width="1"/>`;
  b += `<polyline points="${values.map((v, i) => `${X(i)},${Y(v)}`).join(" ")}" fill="none" stroke="#${C.forest}" stroke-width="3"/>`;
  values.forEach((v, i) => {
    b += `<circle cx="${X(i)}" cy="${Y(v)}" r="5" fill="#${C.forest}"/>` + svgText(X(i), Y(v) - 12, v, { anchor: "middle", size: 15 });
    b += svgText(X(i), base + 20, labels[i], { anchor: "middle", size: 13, color: C.grey });
  });
  return svgWrap(w, h, b, o.title);
}
const source = (t) => p(t, { font: MONO, size: 14, color: C.grey, after: 120 });

// ---------- document ----------
async function build(out) {
  const ch = {
    audit: await png(colChart(["Posts with real people", "Framework posts"], [69, 11], { w: 300, h: 260, bar: 0.5, title: "Average reactions per post" }), 300, 260),
    comments: await png(donut(["Just “congrats”", "Made a real point"], [76, 24], { w: 300, h: 260, r: 70, colors: [C.forest, C.pist], fmt: (v) => v + "%", title: "What the comments said" }), 300, 230),
    time: await png(donut(["Weekly call · 60 min", "Approvals · ~50 min", "Raw note · 30 min"], [60, 50, 30], { w: 300, h: 230, r: 62, colors: [C.forest, C.sage, C.pist], centre: "2½ h", fmt: (v) => "", title: "Client time per week" }), 300, 230),
    funnel: await png(hbarChart(["Requests sent", "Accepted", "Replied", "Calls booked"], [400, 150, 27, 8], { w: 300, h: 240, left: 105, title: "One month of outreach (estimate)" }), 300, 240),
    leads: await png(lineChart(["Month 1", "Month 3", "Month 6", "Month 12"], [13, 71, 101, 126], { w: 300, h: 240, title: "Qualified leads per month (forecast)" }), 300, 240),
  };
  const half = (CW - 240) / 2;
  const pair = (a, b) => grid([[cell(a, half, { pad: 0, padX: 0 }), cell([p("")], 240, { pad: 0, padX: 0 }), cell(b, half, { pad: 0, padX: 0 })]], [half, 240, half]);

  const children = [
    // ---- Page 1: the initial page ----
    grid([[cell([
      p("EXTOL AFFILIATES", { font: MONO, size: 18, color: C.pist, after: 1700 }),
      p("Growth systems", { size: 76, color: C.cream, after: 0, line: 240 }),
      p("for B2B companies", { size: 76, color: C.sage, after: 400, line: 240 }),
      p("What we have built, what happened next, and how our systems work.", { size: 26, color: C.cream, after: 1500, line: 300 }),
      p("PREPARED FOR DAVID SAMUEL  ·  OCTOBER 2026  ·  CONFIDENTIAL", { font: MONO, size: 16, color: C.pist, after: 0 }),
    ], CW, { fill: C.pine, pad: 520, padX: 520 })]], [CW]),
    gap(240),
    label("Who we are"),
    p([run("Extol Affiliates was founded by "), bold("Devasya Dwivedi"), run(" and "), bold("Anshul Mikita Prajapati"),
      run(". We build growth systems for B2B experts and firms: AI agents we built ourselves do the daily work, and people check and approve every piece before it goes out.")], { size: 22, line: 300 }),
    p("Our aim is simple. We make experts the name buyers think of first.", { size: 22, line: 300, after: 200 }),
    label("What is in this document"),
    grid([[
      cell([p("Page 2–4", { font: MONO, size: 16, color: C.moss, after: 40 }), p("What happened after we started, the clients we work with and what we learnt.", { size: 19, color: C.grey, after: 0 })], 3212, { padX: 0 }),
      cell([p("Page 5–8", { font: MONO, size: 16, color: C.moss, after: 40 }), p("Our systems, one by one: what each is, why we use it and how it runs.", { size: 19, color: C.grey, after: 0 })], 3213, { padX: 120 }),
      cell([p("Page 9–10", { font: MONO, size: 16, color: C.moss, after: 40 }), p("How a client works with us, what to expect, and what comes next.", { size: 19, color: C.grey, after: 0 })], 3213, { padX: 0 }),
    ]], [3212, 3213, 3213]),

    // ---- Page 2: what happened next ----
    label("01 · What happened next", { pageBreak: true }),
    h1("From our own page to three clients"),
    lead("We did not start by selling. We built the system, ran it on Extol first, and let the results bring the first clients in."),
    steps([
      { n: "01", t: "We built the system on ourselves", b: "Before we offered anything, we built our own AI agents for LinkedIn, content and outreach, and ran them on Extol’s own accounts." },
      { n: "02", t: "Our own page started bringing in clients", b: "When Extol’s LinkedIn page reached about 50 followers, new clients started coming to us. That was the first proof the method works." },
      { n: "03", t: "Three clients in three very different markets", b: "3D Images AI (3D product models for Amazon sellers), Bloggerly (SEO articles for businesses) and a finance and SAP consultancy, which is under NDA." },
      { n: "04", t: "A plan the day after the first call", b: "For the consultancy, we delivered a full growth plan the day after our first conversation, built on a detailed audit of their LinkedIn." },
      { n: "05", t: "We studied what actually works", b: "We built Taste, a library of more than 200 proven posts, reels and websites, each broken down into why it works and when to use it." },
      { n: "06", t: "We researched and wrote targeted outbound", b: "We researched UK firms such as independent estate agents and financial advisers one by one, and wrote outreach around something real about each firm." },
      { n: "07", t: "Now: bringing in people who know the market", b: "The system works. The next step is the right introductions, which is why we are talking to advisers like David." },
    ]),

    // ---- Page 3: clients ----
    label("02 · The work so far", { pageBreak: true }),
    h1("Three clients, three markets, one method"),
    lead("Each client is in a different market, but the method underneath is the same: find what makes the expert worth hearing, then put it in front of the right buyers again and again."),
    cards([
      { k: "3D Images AI · public", t: "3D product models for Amazon sellers", b: ["What we did: built outreach to more than 2,100 Amazon brand owners.", "Why: brand owners are a clear, reachable market with a visible need for better product images."] },
      { k: "Bloggerly · public", t: "SEO articles for businesses", b: ["What we did: ran a LinkedIn campaign for the brand.", "Result so far: leads are now asking for calls."] },
      { k: "Consultancy · under NDA", t: "Finance and SAP advice", b: ["What we did: a full LinkedIn audit and a complete growth plan, delivered the day after the first call.", "Their name stays private."] },
    ]),
    gap(240),
    h2("What these clients taught us", { before: 0 }),
    bullet([bold("Experts are busy doing the work. "), run("Marketing always comes last, so it has to run without them.")]),
    bullet([bold("Referrals are not a plan. "), run("When new work only comes from referrals, growth cannot be planned or predicted.")]),
    bullet([bold("Generic AI content is ignored. "), run("Buyers scroll past posts and messages that could have been written by anyone.")]),
    bullet([bold("Real stories win. "), run("Posts and messages built on real people and real work get far more attention than generic advice.")]),
    gap(160),
    callout("Our own proof came first: when Extol’s LinkedIn page reached about 50 followers, new clients started coming to us. We now do the same for experts who are far better known in their field than we were."),

    // ---- Page 4: audit / problem ----
    label("03 · What we found", { pageBreak: true }),
    h1("Buyers don’t know great experts exist"),
    lead("A real audit from October 2026 shows the problem clearly. The client was a former Big Four partner, with 1,597 LinkedIn followers and about 9 reactions per post."),
    pair([ch.audit], [ch.comments]),
    source("Source: Extol LinkedIn audit, October 2026 (client name kept private)"),
    h2("What the numbers say"),
    bullet([bold("Real stories get about 6 times more attention. "), run("Posts with named people got 69 reactions on average. Framework posts got 11.")]),
    bullet([bold("Most engagement is polite, not interested. "), run("76% of comments just said “congrats”. Only 24% made a real point.")]),
    bullet([bold("The expertise is there. "), run("It simply is not reaching the people who would buy it.")]),
    h2("Why this happens to almost every expert"),
    p("Experts spend their time on client work, so their profile, posts and follow-ups get whatever time is left over, which is usually none. When they do post, it is often a framework or general advice, because it feels safer. Buyers do not remember frameworks. They remember people, opinions and stories."),
    callout("Our job is to close that gap: turn what the expert already knows into a steady stream of real, specific content and conversations, without taking up their week."),

    // ---- Page 5: approach + six systems ----
    label("04 · Our approach", { pageBreak: true }),
    h1("Position the client as a thoughtful leader"),
    lead("Thought leadership is the strategy. Every channel and every system serves it. The goal is not to make the client an influencer. It is to make them a voice buyers trust."),
    grid([[
      cell([label("The idea", { color: C.moss }), p("One clear point of view that people remember and repeat. Every post leans on it.", { size: 19, color: C.grey, after: 0 })], 3212, { fill: C.paper }),
      cell([label("The voice", { color: C.moss }), p("Weekly posts that take a side, written in the client’s own voice and from their own notes.", { size: 19, color: C.grey, after: 0 })], 3213, { fill: C.cream }),
      cell([label("The proof", { color: C.moss }), p("Client stories, named only with permission, seen in feeds, inboxes, webinars and communities.", { size: 19, color: C.grey, after: 0 })], 3213, { fill: C.paper }),
    ]], [3212, 3213, 3213]),
    gap(200),
    h2("The system has six parts, and we run all of them", { before: 0 }),
    grid([
      ["01", "LinkedIn, run by agents", "Profile, posts, comments, connections and follow-ups.", "Page 6"],
      ["02", "One idea, every platform", "X, Instagram, Threads, Substack and YouTube, each in its own format.", "Page 7"],
      ["03", "Taste system", "Every piece matched to a proven reference before it goes out.", "Page 7"],
      ["04", "Webinars and clips", "A monthly live session that turns followers into conversations.", "Page 8"],
      ["05", "Skool community", "A waitlist, cohorts and a self-paced membership.", "Page 8"],
      ["06", "Website, search and tracking", "One place to land, articles that rank, and a live dashboard.", "Page 8"],
    ].map((r) => {
      const bd = { top: { style: BorderStyle.SINGLE, size: 4, color: C.pist } };
      return [
        cell([p(r[0], { font: MONO, size: 18, color: C.moss, after: 0 })], 700, { padX: 0, pad: 100, borders: bd }),
        cell([p(r[1], { size: 21, after: 0 })], 3000, { padX: 0, pad: 100, borders: bd }),
        cell([p(r[2], { size: 19, color: C.grey, after: 0 })], 4938, { padX: 0, pad: 100, borders: bd }),
        cell([p(r[3], { font: MONO, size: 16, color: C.moss, after: 0, align: AlignmentType.RIGHT })], 1000, { padX: 0, pad: 100, borders: bd }),
      ];
    }), [700, 3000, 4938, 1000]),
    gap(200),
    callout("Agents do the repetitive work at a human pace. People decide what goes out. Nothing is ever published without the client’s yes."),

    // ---- Page 6: LinkedIn agents ----
    label("05 · System one", { pageBreak: true }),
    h1("LinkedIn, run by agents from end to end"),
    lead("LinkedIn is where most B2B buyers check out an expert before they reply. So it is the first system we set up, and the one that runs every day."),
    h2("What it is", { before: 0 }),
    p("A set of AI agents that look after the client’s whole LinkedIn presence: the profile, the weekly posts, thoughtful comments on the right people’s posts, new connection requests and every follow-up message. The agents draft; the client approves."),
    h2("Why we do it"),
    p("Consistency wins on LinkedIn, and consistency is exactly what busy experts cannot give. Agents never forget a follow-up and never skip a week, while the client keeps full control of what is said in their name."),
    h2("How it runs, step by step"),
    steps([
      { n: "01", t: "Set up the profile", b: "We rewrite the headline, about section and featured items around the client’s one clear idea." },
      { n: "02", t: "Find the right people", b: "Agents build a list of the buyers and peers the client should be talking to, and engage with their posts first." },
      { n: "03", t: "Connect at a human pace", b: "About 5 connection requests a day at the start, rising to 20. That stays well under LinkedIn’s limits." },
      { n: "04", t: "Post and comment every week", b: "Posts are drafted from the client’s weekly note, in their voice, and checked against Taste." },
      { n: "05", t: "Follow up every conversation", b: "Every reply gets a timely, personal follow-up, so no warm lead goes cold." },
    ]),
    gap(160),
    pair([
      label("What the client does"),
      p("About 10 minutes a day approving drafts on their phone: yes, edit or bin.", { size: 20, after: 0 }),
    ], [
      label("What the client never does"),
      p("Write from scratch, chase connections, or try to remember who to follow up.", { size: 20, after: 0 }),
    ]),

    // ---- Page 7: cross-platform + Taste ----
    label("06 · Systems two and three", { pageBreak: true }),
    h1("One idea, published everywhere buyers look"),
    lead("Buyers don’t all live on LinkedIn. One note from the client becomes a set of pieces, each made for its platform."),
    grid([[
      ...["LinkedIn", "X", "Instagram", "Threads", "Substack", "YouTube"].map((n, i) => cell([
        p(n, { size: 19, after: 0, align: AlignmentType.CENTER, color: i === 0 ? C.cream : C.ink }),
      ], 1606 + (i === 5 ? 2 : 0), { fill: i === 0 ? C.forest : i % 2 ? C.cream : C.paper, pad: 160, padX: 60 })),
    ]], [1606, 1606, 1606, 1606, 1606, 1608]),
    gap(120),
    bullet([bold("Each platform gets its own version, "), run("never a copy-paste: a thread on X, a carousel on Instagram, a short take on Threads, a longer essay on Substack and short clips on YouTube.")]),
    bullet([bold("Substack builds an audience the client owns. "), run("If a platform changes its rules, the newsletter list stays with the client.")]),
    bullet([bold("Write once, be seen in six places. "), run("The client’s 30-minute note does the work of a full content team.")]),
    gap(80),
    h2("The Taste system: why our work does not look like AI", { before: 120 }),
    p("Taste is Extol’s creative-direction library, curated by our team. It holds more than 200 proven posts, reels and websites, each one studied and broken down: why it works, who it works for, and when to use it."),
    cards([
      { k: "Match", t: "One reference per piece", b: "Before anything is made, it is matched to the single reference that fits it best." },
      { k: "Apply", t: "Borrow the craft", b: "We use the structure, pacing, type and layout that made the reference work." },
      { k: "Never copy", t: "The client stays the client", b: "Their assets stay theirs. Colours, voice and opinions are always the client’s own." },
    ]),
    gap(160),
    callout("This is the difference buyers notice: content that feels considered and human, built on what has already been proven to hold attention."),

    // ---- Page 8: webinars, Skool, website ----
    label("07 · Systems four to six", { pageBreak: true }),
    h1("Webinars and community turn followers into clients"),
    lead("Posts earn attention. Live sessions and a community turn that attention into real conversations and long-term trust."),
    h2("Webinars: the expert, solving real problems live", { before: 0 }),
    p("Once a month, the client runs a live session. In buyer sessions, prospects bring a real problem and the expert solves it on the spot, which shows the expertise far better than any post. Community sessions build the wider audience."),
    bullet("Every attendee is followed up personally within 48 hours."),
    bullet("Every session is cut into short clips for every platform, so one hour becomes a month of posts."),
    h2("Skool: a home for the client’s community"),
    p("Skool is a community platform where the client’s followers can gather, learn and stay close. It moves people from followers to members, and from members to clients."),
    steps([
      { n: "01", t: "Waitlist", b: "Interested people join a list, so demand is visible before anything launches." },
      { n: "02", t: "Free taster", b: "A free session or short course lets people experience the client’s thinking first-hand." },
      { n: "03", t: "Cohorts and membership", b: "Paid group cohorts and a self-paced membership. Agents handle sign-ups, reminders and admin." },
    ]),
    h2("Website, search and tracking"),
    bullet([bold("One place to land. "), run("A clean website that tells buyers who the client helps and how to start a conversation.")]),
    bullet([bold("Articles that rank. "), run("Search-focused articles, built with the same method we use for Bloggerly, bring in buyers who are already looking.")]),
    bullet([bold("A live dashboard. "), run("Every channel is tracked in one place, and we review what is working with the client every month.")]),

    // ---- Page 9: how a client works with us ----
    label("08 · How it works", { pageBreak: true }),
    h1("2½ hours a week from the client"),
    lead("The most common worry we hear is “I don’t have time.” The system is designed around that. Writing disappears from the client’s week; thinking, deciding and one conversation with us remain."),
    pair([ch.time], [
      gap(300),
      steps([
        { n: "01", t: "Raw note", b: "A voice note or a few lines, once a week." },
        { n: "02", t: "Agents draft", b: "Posts, clips and messages in the client’s voice." },
        { n: "03", t: "Client approves", b: "Yes, edit or bin, on their phone." },
        { n: "04", t: "We publish and track", b: "Everywhere, at a human pace." },
      ], half),
    ]),
    h2("The first 90 days"),
    grid([[
      cell([label("Days 1–30", { color: C.moss }), p("Voice interview, profile rewrite, website and the agents set up. First posts go live.", { size: 19, color: C.grey, after: 0 })], 3212, { fill: C.paper }),
      cell([label("Days 31–60", { color: C.moss }), p("Every platform running, first webinar, outreach at full pace. Day-60 results review.", { size: 19, color: C.grey, after: 0 })], 3213, { fill: C.cream }),
      cell([label("Days 61–90", { color: C.moss }), p("Skool community opens, clips flowing, and we double down on what the numbers show works.", { size: 19, color: C.grey, after: 0 })], 3213, { fill: C.paper }),
    ]], [3212, 3213, 3213]),
    gap(160),
    callout("Our promise: at day 60 we review the results together. If we are behind plan, we fix it in writing, or the client can leave."),

    // ---- Page 10: outcomes + next ----
    label("09 · What to expect, and what comes next", { pageBreak: true }),
    h1("Results that build month by month"),
    pair([ch.funnel, source("Planning estimates, not yet proven results")], [ch.leads, source("Forecast from our consultancy plan, not yet proven")]),
    p([bold("At full pace: "), run("20 connection requests a day, about 37% accepted, 18% of those reply and 30% of replies book a call. By month 6 the plan aims for around 100 qualified leads a month, 10 real sales calls and 2–3 new clients. A qualified lead replies, books or signs up; likes don’t count. Large contracts can take 6–12 months to close.")], { size: 19, color: C.grey }),
    h2("Where we are honest about our gaps"),
    bullet("We do not yet have a case study with hard numbers. The first ones are being built now."),
    bullet("We work across very different markets and need to choose one to own first."),
    bullet("Two founders currently lead both sales and delivery."),
    h2("Where David fits"),
    grid([[
      cell([label("Advise", { color: C.moss }), p("Sharpen our offer and pitch. Sit in on key pitches and debrief us.", { size: 19, color: C.grey, after: 0 })], 3212, { fill: C.paper }),
      cell([label("Guide", { color: C.moss }), p("Help us choose the one market to own first, and the proof your network trusts.", { size: 19, color: C.grey, after: 0 })], 3213, { fill: C.cream }),
      cell([label("Connect", { color: C.moss }), p("Introduce us to experts and firms who need this, and join first calls where your name helps.", { size: 19, color: C.grey, after: 0 })], 3213, { fill: C.paper }),
    ]], [3212, 3213, 3213]),
    gap(160),
    callout("You know the people. We build the system.", { size: 30 }),
  ];

  const doc = new Document({
    creator: "Extol Affiliates", title: "Extol Affiliates: growth systems briefing for David Samuel",
    styles: { default: { document: { run: { font: SANS, size: 21, color: C.ink } } } },
    numbering: { config: [{ reference: "dots", levels: [{ level: 0, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 300, hanging: 300 } }, run: { color: C.moss } } }] }] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134, footer: 560 } } },
      footers: { default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CW }], children: [
        new TextRun({ text: "EXTOL AFFILIATES  ·  GROWTH SYSTEMS FOR B2B COMPANIES", font: MONO, size: 14, color: C.moss }),
        new TextRun({ children: ["\t", PageNumber.CURRENT, " / 10"], font: MONO, size: 14, color: C.moss }),
      ] })] }) },
      children,
    }],
  });
  fs.writeFileSync(out, await Packer.toBuffer(doc));
  console.log("wrote", out);
}
build(process.argv[2] || "Extol-x-David-Samuel-Briefing.docx");
