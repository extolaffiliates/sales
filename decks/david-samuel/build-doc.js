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
  spacing: (o.size || 21) >= 26
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
    audit: await png(colChart(["Posts with real people", "Generic framework posts"], [69, 11], { w: 640, h: 380, bar: 0.32, title: "Average reactions per post" }), 640, 380),
    time: await png(donut(["Weekly call · 1 hour", "Approvals · 10 min a day", "Raw note · 30 min"], [60, 50, 30], { w: 640, h: 360, r: 150, colors: [C.forest, C.sage, C.pist], centre: "2½ hours", fmt: () => "", title: "Client time per week" }), 640, 360),
  };
  // Big headline page opener
  const open = (k, title, line, first) => [
    label(k, { pageBreak: !first }),
    p(title, { size: 72, after: 240 }),
    p(line, { size: 30, color: C.grey, after: 700 }),
  ];
  // Short cards: [{k, t}] with big text
  const tiles = (items, fills) => {
    const n = items.length, g = 160, w = Math.floor((CW - g * (n - 1)) / n), widths = [], row = [];
    items.forEach((it, i) => {
      widths.push(w);
      row.push(cell([label(it.k, { color: C.moss, after: 160 }), p(it.t, { size: 32, after: 0 })], w, { fill: (fills || [C.paper, C.cream])[i % 2], pad: 520, padX: 260 }));
      if (i < n - 1) { widths.push(g); row.push(cell([p("")], g, { pad: 0, padX: 0 })); }
    });
    widths[widths.length - 1] += CW - widths.reduce((a, b) => a + b, 0);
    return grid([row], widths);
  };
  // Vertical list of short steps with big text
  const flow = (items) => grid(items.map((it, i) => {
    const bd = { top: { style: BorderStyle.SINGLE, size: 6, color: C.pist } };
    return [
      cell([p(String(i + 1).padStart(2, "0"), { font: MONO, size: 26, color: C.moss, after: 0 })], 1100, { padX: 0, pad: 420, borders: bd }),
      cell([p(it[0], { size: 36, after: 80 }), p(it[1], { size: 26, color: C.grey, after: 0 })], CW - 1100, { padX: 0, pad: 420, borders: bd }),
    ];
  }), [1100, CW - 1100]);
  const big = (text) => callout(text, { size: 36 });

  const children = [
    // 1 · Cover
    grid([[cell([
      p("EXTOL AFFILIATES", { font: MONO, size: 18, color: C.pist, after: 2600 }),
      p("Growth systems", { size: 76, color: C.cream, after: 0 }),
      p("for B2B companies", { size: 76, color: C.sage, after: 2600 }),
      p("PREPARED FOR DAVID SAMUEL  ·  OCTOBER 2026", { font: MONO, size: 16, color: C.pist, after: 0 }),
    ], CW, { fill: C.pine, pad: 600, padX: 560 })]], [CW]),
    gap(500),
    label("Founders"),
    p("Devasya Dwivedi  ·  Anshul Mikita Prajapati", { size: 36, after: 200 }),
    p("We make experts the name buyers think of first.", { size: 30, color: C.grey }),

    // 2 · What happened next
    ...open("01 · What happened next", "We built it on ourselves first", "Then the clients came to us."),
    flow([
      ["Built our own AI agents", "Ran them on Extol’s own LinkedIn."],
      ["Clients started coming in", "When our page reached about 50 followers."],
      ["Three clients, three markets", "3D Images AI · Bloggerly · a consultancy (NDA)."],
      ["Now: the right introductions", "That’s where David comes in."],
    ]),

    // 3 · Clients
    ...open("02 · The work so far", "Three clients, one method", "Different markets. Same system underneath."),
    tiles([
      { k: "3D Images AI", t: "Outreach to 2,100+ Amazon brand owners" },
      { k: "Bloggerly", t: "LinkedIn campaign. Leads now asking for calls" },
      { k: "Consultancy · NDA", t: "Full growth plan, the day after the first call" },
    ]),

    // 4 · The problem
    ...open("03 · What we found", "Real stories get 6× more attention", "From a real client audit, October 2026."),
    ch.audit,
    gap(200),
    big("76% of their comments just said “congrats”. The expertise is there. It isn’t reaching buyers."),

    // 5 · Approach
    ...open("04 · Our approach", "Make the client a thoughtful leader", "Six systems. We run all of them."),
    tiles([{ k: "01", t: "LinkedIn, run by agents" }, { k: "02", t: "One idea, every platform" }, { k: "03", t: "Taste system" }]),
    gap(160),
    tiles([{ k: "04", t: "Webinars and clips" }, { k: "05", t: "Skool community" }, { k: "06", t: "Website and tracking" }], [C.cream, C.paper]),

    // 6 · LinkedIn
    ...open("05 · System one", "LinkedIn, run by agents", "The agents do the work. The client approves."),
    flow([
      ["Profile", "Rewritten around one clear idea."],
      ["Posts and comments", "Every week, in the client’s voice."],
      ["Connections", "5 a day, rising to 20. Safe pace."],
      ["Follow-ups", "No warm lead goes cold."],
    ]),

    // 7 · Everywhere + Taste
    ...open("06 · Systems two and three", "One note, six platforms", "Each platform gets its own version."),
    grid([[
      ...["LinkedIn", "X", "Instagram", "Threads", "Substack", "YouTube"].map((n, i) => cell([
        p(n, { size: 24, after: 0, align: AlignmentType.CENTER, color: i === 0 ? C.cream : C.ink }),
      ], 1606 + (i === 5 ? 2 : 0), { fill: i === 0 ? C.forest : i % 2 ? C.cream : C.paper, pad: 420, padX: 40 })),
    ]], [1606, 1606, 1606, 1606, 1606, 1608]),
    gap(500),
    p("Taste: 200+ proven references", { size: 44, after: 300 }),
    tiles([{ k: "Match", t: "One reference per piece" }, { k: "Apply", t: "Borrow the craft" }, { k: "Never copy", t: "The voice stays theirs" }]),

    // 8 · Webinars + community
    ...open("07 · Systems four to six", "Followers become clients", "Live sessions and community build trust."),
    tiles([
      { k: "Webinar", t: "Monthly. Solve real problems live" },
      { k: "Clips", t: "One hour becomes a month of posts" },
      { k: "Skool", t: "Waitlist, cohorts, membership" },
    ]),
    gap(400),
    big("Every attendee is followed up within 48 hours."),

    // 9 · How it works
    ...open("08 · How it works", "2½ hours a week from the client", "Note → drafts → approve → publish."),
    ch.time,
    gap(300),
    big("Nothing goes out without the client’s yes."),

    // 10 · Next
    ...open("09 · What comes next", "Where David fits", "Three ways to help us grow."),
    tiles([{ k: "Advise", t: "Sharpen our offer and pitch" }, { k: "Guide", t: "Pick the one market to own" }, { k: "Connect", t: "Introduce us to the right people" }]),
    gap(600),
    big("You know the people. We build the system."),
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
