"""Build the Extol x David Samuel web deck from the guizang-ppt-skill Style A template.

Usage: python3 build.py <path-to-guizang-template.html>
Writes index.html next to this file.
"""
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent
TEMPLATE = Path(sys.argv[1])
src = TEMPLATE.read_text(encoding="utf-8")

# ---------------------------------------------------------------- theme
# Extol brand palette replaces the preset (Forest Ink is the closest preset).
src = src.replace("""    --ink:#0a0a0b;
    --ink-rgb:10,10,11;
    --paper:#f1efea;
    --paper-rgb:241,239,234;
    --paper-tint:#e8e5de;
    --ink-tint:#18181a;""", """    --ink:#101F14;
    --ink-rgb:16,31,20;
    --paper:#EEF3D6;
    --paper-rgb:238,243,214;
    --paper-tint:#E9F0C9;
    --ink-tint:#1D3524;
    --forest:#2B4A34;
    --moss:#7E9C6B;
    --sage:#9EBB80;
    --pistachio:#C6DE9F;""")

# English editorial type: Playfair headlines, Source Serif body serif, Inter sans, Plex mono.
src = re.sub(r'<link href="https://fonts.googleapis.com/css2\?[^"]+" rel="stylesheet">',
             '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">',
             src)
src = src.replace('--serif-zh:"Noto Serif SC",source-han-serif-sc,serif;', '--serif-zh:"Playfair Display","Source Serif 4",Georgia,serif;')
src = src.replace('--sans-zh:"Noto Sans SC",source-han-sans-sc,sans-serif;', '--sans-zh:"Inter","Helvetica Neue",Arial,sans-serif;')
src = src.replace('<html lang="zh-CN">', '<html lang="en">')
src = src.replace("<title>[必填] 替换为 PPT 标题 · Deck Title</title>", "<title>Extol Affiliates × David Samuel</title>")
# Inline the pinned icon library so the deck works offline and on file://.
LUCIDE = (HERE / "assets" / "lucide.min.js").read_text(encoding="utf-8")
src = src.replace('<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>', "<script>" + LUCIDE.replace("</script", "<\\/script") + "</script>")

# WebGL backgrounds: recolour the titanium/silver shaders into Extol greens.
src = src.replace("vec3 a=vec3(0.12,0.12,0.13);\n  vec3 b=vec3(0.03,0.04,0.05);", "vec3 a=vec3(0.10,0.17,0.12);\n  vec3 b=vec3(0.04,0.07,0.04);")
src = src.replace("vec3 d=vec3(0.1,0.2,0.4);", "vec3 d=vec3(0.15,0.25,0.35);")
src = src.replace("col+=vec3(disp*0.015,disp*0.01,disp*0.02);", "col+=vec3(disp*0.012,disp*0.022,disp*0.010);")
src = src.replace("vec3 base=vec3(0.05,0.05,0.06);", "vec3 base=vec3(0.063,0.122,0.078);")
src = src.replace("vec3 silverDark=vec3(0.86,0.85,0.84);\n  vec3 paper=vec3(0.955,0.945,0.925);",
                  "vec3 silverDark=vec3(0.80,0.87,0.66);\n  vec3 paper=vec3(0.933,0.953,0.839);")
src = src.replace("col+=vec3(0.78,0.62,0.92)*sin(ph)*0.055;\n  col+=vec3(0.55,0.72,0.95)*sin(ph*0.8+2.0)*0.05;",
                  "col+=vec3(0.49,0.61,0.42)*sin(ph)*0.05;\n  col+=vec3(0.62,0.73,0.50)*sin(ph*0.8+2.0)*0.045;")

# ---------------------------------------------------------------- UI strings (presenter runtime is Chinese)
UI = {
    "表示观众页面的软件同步状态，不代表 HDMI 等物理线缆状态": "Software sync state of the audience window, not the physical cable",
    "这里只能检查浏览器和观众页面的软件状态，不能确认 HDMI、转接器或投影仪线缆是否物理连接。": "This only checks the browser and audience window, not HDMI, adapters or projector cables.",
    "单页 autoAdvanceSeconds 优先于全局间隔；minutes 只是讲述计划。": "Per-slide autoAdvanceSeconds overrides the global interval; minutes is only the talk plan.",
    "宫格选页；标注工具激活时先退出工具": "Grid view; exits an active annotation tool first",
    "尚未全屏，可在演讲前进入": "Not fullscreen yet; enter before presenting",
    "根据屏幕宽度调整页面与备注的比例": "Balance slide previews and notes for your screen",
    "需要时手动开启，默认关闭": "Off by default; switch on when needed",
    "临时遮挡或冻结观众屏": "Blank or freeze the audience screen",
    "浏览器阻止了观众窗口": "The browser blocked the audience window",
    "浏览器不提供字体状态": "The browser doesn’t report font status",
    "没有记录到页面时间": "No slide times recorded",
    "自动翻页 · 等待时长": "Auto advance · waiting",
    "自动翻页 · 已结束": "Auto advance · finished",
    "自动翻页 · 关闭": "Auto advance · off",
    "自动翻页 · ": "Auto advance · ",
    "观众屏 · 未连接": "Audience · not connected",
    "观众屏 · ": "Audience · ",
    "已同步 · 第 ": "Synced · slide ",
    "演讲者视图 · ": "Presenter view · ",
    "宫格选页（Esc）": "Grid view (Esc)",
    "激光笔（L）": "Laser (L)",
    "圈选（C）": "Circle (C)",
    "清除标记（X）": "Clear marks (X)",
    "开启 / 关闭自动翻页": "Toggle auto advance",
    "开始 / 结束排练": "Start / end rehearsal",
    "观众屏黑屏 / 白屏": "Audience black / white screen",
    "冻结 / 恢复观众屏": "Freeze / resume audience",
    "已超出本页计划": "Over this slide’s plan",
    "未检测到弹窗拦截": "No popup blocking detected",
    "草稿（备注）": "Draft (notes)",
    "缩小备注字号": "Smaller notes text",
    "放大备注字号": "Larger notes text",
    "本页演讲备注": "Speaker notes for this slide",
    "保存自动翻页": "Save auto advance",
    "重新打开观众屏": "Reopen audience screen",
    "上一页 / 下一页": "Previous / next",
    "首页 / 尾页": "First / last",
    "等待观众屏同步": "Waiting for audience sync",
    "分钟 · 预计 ": "min · est. ",
    "与计划相比": "vs plan",
    "当前页预览": "Current slide preview",
    "演讲标注层": "Annotation layer",
    "下一页预览": "Next slide preview",
    "观众屏已暂停": "Audience paused",
    "观众屏连接": "Audience connection",
    "当前页 16:9": "Current slide 16:9",
    "距本页计划": "Left on this slide",
    "宫格选页中": "Grid view",
    "演讲者布局": "Presenter layout",
    "快捷键说明": "Keyboard shortcuts",
    "【讲述要点】": "[Talking points]",
    "【转场】": "[Transition]",
    "讲述要点】": "Talking points]",
    "转场】": "Transition]",
    "查看快捷键": "Shortcuts",
    "本次总时长": "Total time",
    "演前检查": "Pre-flight check",
    "重新检查": "Check again",
    "进入全屏": "Enter fullscreen",
    "弹窗被拦截": "Popup blocked",
    "演示已结束": "Presentation ended",
    "演示设置": "Presentation settings",
    "页面优先": "Slides first",
    "备注优先": "Notes first",
    "最近排练": "Recent rehearsals",
    "排练记录": "Rehearsal log",
    "结束排练": "End rehearsal",
    "继续计时": "Resume timer",
    "重置计时": "Reset timer",
    "开始计时": "Start timer",
    "全局间隔": "Global interval",
    "减少一秒": "One second less",
    "增加一秒": "One second more",
    "窗口不可见": "Window hidden",
    "已到尾页": "Last slide",
    "重新开始": "Restart",
    "已进入全屏": "Fullscreen on",
    "全屏状态": "Fullscreen",
    "弹窗权限": "Popup permission",
    "字体加载": "Font loading",
    "图片资源": "Images",
    "视频资源": "Video",
    "没有视频": "No video",
    "尚未渲染": "Not rendered yet",
    "演讲者视图": "Presenter view",
    "演讲模式": "Presenter",
    "快捷控制": "Quick controls",
    "舞台提示": "Stage cue",
    "表达提示": "Delivery",
    "翻页时机": "Advance cue",
    "备用方案": "Fallback",
    "读音提醒": "Pronunciation",
    "本页目的": "Purpose",
    "选择页面": "Choose slide",
    "返回预览": "Back to preview",
    "清除标记": "Clear marks",
    "当前状态：": "Status: ",
    "状态：": "Status: ",
    "未分组": "Ungrouped",
    "未设置": "Not set",
    "未连接": "Not connected",
    "已保存": "Saved",
    "保存中": "Saving",
    "当前页": "Current",
    "下一页": "Next",
    "上一页": "Previous",
    "首页": "First",
    "尾页": "Last",
    "已进行": "Elapsed",
    "总时长": "Total",
    "已加载": "Loaded",
    "可播放": "Playable",
    "标注中": "Annotating",
    "设置中": "Settings",
    "连接中": "Connecting",
    "未同步": "Not synced",
    "已冻结": "Frozen",
    "激光笔": "Laser",
    "快捷键": "Shortcuts",
    "观众屏": "Audience",
    "黑屏 B": "Black B",
    "白屏 W": "White W",
    "冻结 F": "Freeze F",
    "自动翻页": "Auto advance",
    "分钟 · ": "min · ",
    "计划 ": "Plan ",
    "建议 ": "Suggested ",
    "剩余 ": "Left ",
    "第 ": "Slide ",
    "翻页": "navigate",
    "总览": "overview",
    "静态": "static",
    "动态": "motion",
    "圈选": "Circle",
    "宫格": "Grid",
    "激光": "Laser",
    "清除": "Clear",
    "标题": "Title",
    "本页": "This slide",
    "关闭": "Close",
    "超时": "Over",
    "剩余": "Left",
    "暂停": "Pause",
    "排练": "Rehearse",
    "页面": "Slide",
    "实际": "Actual",
    "均衡": "Balanced",
    "建议": "Tip",
    "异常": "Problem",
    "检查": "Check",
    "设置": "Settings",
    "退出": "Exit",
    "正常": "OK",
    "计划": "Plan",
    "互动": "Interaction",
    "秒": "s",
    "页": "",
}
head, body = src.split("</head>", 1)
for k in sorted(UI, key=len, reverse=True):
    body = body.replace(k, UI[k])
src = head + "</head>" + body

# ---------------------------------------------------------------- extra brand CSS
CSS = r"""
  /* ============ Extol brand layer ============ */
  .lead,.body-serif,.callout{font-family:var(--serif-body-en)}
  .slide.light .acc{color:var(--forest)} .slide.dark .acc{color:var(--sage)}
  .slide.light .acc-bg{background:var(--forest);color:var(--paper)} .slide.dark .acc-bg{background:var(--sage);color:var(--ink)}
  .brand{display:inline-flex;align-items:center;gap:.7em}
  .brand i,.brand svg{width:1.15em;height:1.15em;stroke-width:1.6}
  .brand img{height:1.4em;width:auto;display:block}
  .logo-slot img{height:7vh;width:auto;display:block}
  .h-title{font-family:var(--serif-zh);font-weight:700;font-size:min(4vw,7.1vh);line-height:1.08;letter-spacing:-.015em;max-width:82vw}
  .h-title em{font-family:var(--serif-zh);font-style:italic;font-weight:500}
  .kick-row{display:flex;align-items:center;gap:1em;margin-bottom:1.6vh}
  .sub{font-family:var(--serif-body-en);font-style:italic;font-size:max(17px,1.45vw);opacity:.72;margin-top:1.4vh;max-width:70vw}
  .tile{display:flex;flex-direction:column;gap:1.5vh;padding-top:2.4vh;border-top:1px solid rgba(127,127,127,.35);min-width:0}
  .tile .ic{width:2.9vw;height:2.9vw;min-width:28px;min-height:28px;stroke-width:1.3}
  .slide.light .tile .ic{color:var(--forest)} .slide.dark .tile .ic{color:var(--sage)}
  .tile .tt{font-family:var(--serif-zh);font-weight:700;font-size:min(2.15vw,3.8vh);line-height:1.15}
  .tile .dd{font-family:var(--sans-zh);font-size:max(16px,1.24vw);line-height:1.55;opacity:.8}
  .tile .tag-s{font-family:var(--mono);font-size:max(11px,.75vw);letter-spacing:.2em;text-transform:uppercase;opacity:.6}
  .tile .q{font-family:var(--serif-body-en);font-style:italic;font-size:max(16px,1.3vw);line-height:1.45}
  .slide.light .tile .q{color:var(--forest)} .slide.dark .tile .q{color:var(--sage)}
  .tile.hl{border-top:3px solid var(--forest)} .slide.dark .tile.hl{border-top-color:var(--sage)}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:3vh 3vw}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:3vh 2.4vw}
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:3.4vh 4vw}
  .g5{display:grid;grid-template-columns:repeat(5,1fr);gap:1.6vw}
  .tbl{display:grid;grid-template-columns:1.05fr 1.6fr 1.6fr 1.35fr;column-gap:2vw}
  .tbl > div{padding:2vh 0;border-top:1px solid rgba(127,127,127,.28);font-family:var(--sans-zh);font-size:max(16px,1.18vw);line-height:1.45}
  .tbl > .th{font-family:var(--mono);font-size:max(11px,.74vw);letter-spacing:.2em;text-transform:uppercase;opacity:.6;border-top:0;padding:0 0 1vh}
  .tbl > .k{font-family:var(--serif-zh);font-weight:700;font-size:min(1.55vw,2.8vh)}
  .tbl > .o{font-family:var(--serif-body-en);font-style:italic}
  .slide.light .tbl > .o{color:var(--forest)} .slide.dark .tbl > .o{color:var(--sage)}
  .funnel{display:flex;flex-direction:column;gap:3.2vh}
  .frow{display:grid;grid-template-columns:11vw 1fr;align-items:center;gap:1.4vw}
  .frow .fl{font-family:var(--mono);font-size:max(11px,.8vw);letter-spacing:.18em;text-transform:uppercase;opacity:.7}
  .fbar{height:8.4vh;display:flex;align-items:center;padding-left:1vw;font-family:var(--serif-zh);font-weight:800;font-size:min(2.4vw,4.2vh);background:var(--forest);color:var(--paper);min-width:5.5vw;transform-origin:left center}
  .cols{display:flex;align-items:flex-end;gap:2.6vw;height:42vh;border-bottom:1px solid rgba(127,127,127,.4)}
  .cols .c{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:1vh}
  .cols .c .v{font-family:var(--serif-zh);font-weight:800;font-size:min(2.4vw,4.4vh)}
  .cols .c .b{width:100%;background:var(--sage);transform-origin:bottom center}
  .cols .c.hot .b{background:var(--pistachio)}
  .cols-l{display:flex;gap:2.6vw;margin-top:1.2vh}
  .cols-l div{flex:1;text-align:center;font-family:var(--mono);font-size:max(11px,.78vw);letter-spacing:.18em;text-transform:uppercase;opacity:.65}
  .bignum{font-family:var(--serif-zh);font-weight:800;line-height:.9;letter-spacing:-.03em;font-feature-settings:"tnum"}
  .slide.light .bignum{color:var(--forest)} .slide.dark .bignum{color:var(--sage)}
  .flow{display:grid;grid-template-columns:1fr auto 1fr auto 1.25fr;gap:1.6vw;align-items:stretch}
  .flow .arrow{display:flex;align-items:center;opacity:.5} .flow .arrow svg{width:2.4vw;height:2.4vw}
  .box{padding:2.6vh 1.6vw;border:1px solid rgba(127,127,127,.35)}
  .slide.dark .box.fill{background:rgba(var(--paper-rgb),.07)}
  .slide.light .box.fill{background:rgba(var(--ink-rgb),.05)}
  .outs{display:flex;flex-direction:column;gap:1.5vh}
  .outs div{padding:1.25vh 1vw;border-left:3px solid var(--sage);font-family:var(--sans-zh);font-size:max(16px,1.2vw);background:rgba(var(--paper-rgb),.05)}
  .tl{display:grid;grid-template-columns:repeat(4,1fr);gap:2vw;position:relative}
  .tl::before{content:"";position:absolute;left:0;right:12%;top:1.1vh;height:1px;background:currentColor;opacity:.3}
  .tl .n{width:2.2vh;height:2.2vh;border-radius:50%;background:var(--forest);margin-bottom:2vh;position:relative}
  .slide.dark .tl .n{background:var(--sage)}
  .banner{display:flex;align-items:center;gap:1.4vw;padding:2.8vh 1.8vw;font-family:var(--serif-body-en);font-size:max(17px,1.42vw);line-height:1.45}
  .slide.light .banner{background:var(--ink-tint);color:var(--paper)}
  .slide.dark .banner{background:rgba(var(--paper-rgb),.08)}
  .banner svg{flex-shrink:0;width:2vw;height:2vw;color:var(--sage)}
  .note-s{font-family:var(--mono);font-size:max(11px,.72vw);letter-spacing:.14em;text-transform:uppercase;opacity:.55}
"""
src = src.replace("</style>", CSS + "</style>", 1)

# ---------------------------------------------------------------- slides
TOTAL = 23
ACTS = {1: "Opening", 2: "Opening", 3: "Opening", 4: "Act I", 5: "Act I", 6: "Act I", 7: "Act I", 8: "Act I",
        9: "Act II", 10: "Act II", 11: "Act II", 12: "Act II", 13: "Act II", 14: "Act II", 15: "Act II",
        16: "Act II", 17: "Act II", 18: "Act III", 19: "Act III", 20: "Act III", 21: "Act III", 22: "Act III", 23: "Close"}
BRAND = '<span class="brand"><i data-lucide="sprout"></i>Extol Affiliates</span>'


def slide(n, theme, sid, title, inner, foot, anim=None):
    a = f' data-animate="{anim}"' if anim else ""
    return f'''
<section class="slide {theme}" data-slide-id="{sid}" data-title="{title}"{a}>
  <div class="chrome"><div>{BRAND}<span class="sep" style="display:inline-block;margin:0 1.2em;vertical-align:middle"></span>× David Samuel</div><div>{ACTS[n]} · {n:02d} / {TOTAL}</div></div>
{inner}
  <div class="foot"><div>{foot}</div><div>extolaffiliates.com</div></div>
</section>'''


def head(kicker, title, sub=None, mt="3.2vh"):
    s = f'<p class="sub" data-anim>{sub}</p>' if sub else ""
    return f'''    <div style="margin-top:{mt}">
      <div class="kicker" data-anim>{kicker}</div>
      <h2 class="h-title" data-anim>{title}</h2>
      {s}
    </div>'''


def tiles(items, cls="g3", mt="5.6vh", gap=None):
    out = []
    for it in items:
        ic, t, d = it[:3]
        extra = it[3] if len(it) > 3 else ""
        hl = " hl" if (len(it) > 4 and it[4]) else ""
        out.append(f'''      <div class="tile{hl}" data-anim>
        <i data-lucide="{ic}" class="ic"></i>
        <div class="tt">{t}</div>
        <div class="dd">{d}</div>{extra}
      </div>''')
    g = f"; row-gap:{gap}" if gap else ""
    return f'    <div class="{cls}" style="margin-top:{mt}{g}">\n' + "\n".join(out) + "\n    </div>"


S = []

# 1 COVER
S.append(slide(1, "hero dark", "cover", "Cover", '''  <div class="frame" style="display:grid; gap:3.4vh; align-content:center; min-height:76vh">
    <div class="logo-slot" data-anim><img src="images/logo.png" alt="Extol Affiliates" onerror="this.parentNode.style.display='none'"></div>
    <div class="kicker" data-anim>Advisory partnership briefing · Monday 26 October 2026</div>
    <h1 class="h-hero" style="font-size:min(7.4vw,13vh); line-height:1.02" data-anim>You know the rooms.<br><em class="acc" style="font-weight:600">We build the engine.</em></h1>
    <p class="lead" style="max-width:58vw" data-anim>What Extol has been doing, what a client gets in a deal, and where you come in.</p>
    <div class="meta-row" data-anim><span>Extol Affiliates</span><span>·</span><span>Growth systems for B2B companies</span><span>·</span><span>Prepared for David Samuel</span></div>
  </div>''', "A briefing for David Samuel"))

# 2 SHORT VERSION
S.append(slide(2, "light", "short-version", "The short version", head("If we only had five minutes", "The short version", "The whole meeting on one page.") + "\n" + tiles([
    ("sprout", "What we do", "We build growth systems for B2B experts and firms: the right buyers, the right message, every week, without eating the founder’s time."),
    ("package-open", "What a deal includes", "Positioning, trigger-based outreach, a content engine, website and articles, events and live reporting. One monthly fee from £2,500, every tool included."),
    ("handshake", "Where you come in", "Advise on the offer and pricing. Guide us on where to play. Open doors to the first right-fit clients, and share in what they bring.", "", True),
], mt="8vh").replace('class="tt"', 'class="tt" style="font-size:min(2.7vw,4.8vh)"').replace('class="dd"', 'class="dd" style="font-size:max(17px,1.45vw)"'), "Three parts, one meeting"))

# 3 WHO WE ARE
S.append(slide(3, "dark", "who-we-are", "Who we are", head("Who we are", "Growth systems for B2B companies.", "Small team, built-in leverage.") + '''
    <div class="grid-2-7-5" style="margin-top:5vh; gap:5vw">
      <div data-anim>
        <div class="kicker" style="margin-bottom:2vh">What we believe</div>
        <blockquote style="font-family:var(--serif-zh); font-weight:700; font-size:min(3.3vw,5.9vh); line-height:1.15">Businesses don’t buy AI.<br><em class="acc" style="font-weight:500">They buy revenue, time and lower risk.</em></blockquote>
        <ul style="margin-top:4vh; padding-left:1.1em; display:flex; flex-direction:column; gap:1.6vh; font-size:max(16px,1.25vw); line-height:1.5; opacity:.85">
          <li>AI is the mechanism. The outcome is the product.</li>
          <li>Agents draft, humans decide. Nothing leaves a client’s account without a yes.</li>
          <li>Quality over quantity: few buyers, each one researched.</li>
        </ul>
      </div>
      <div style="display:flex; flex-direction:column; gap:3.6vh">
        <div class="tile" data-anim><i data-lucide="compass" class="ic"></i><div class="tt">Devasya Dwivedi (Dave)</div><div class="dd">Strategy, discovery calls and client lead. Runs the outreach and agent systems.</div></div>
        <div class="tile" data-anim><i data-lucide="line-chart" class="ic"></i><div class="tt">Anshul Mikita Prajapati</div><div class="dd">Research, LinkedIn audits, dashboards and delivery. Presents the audit to clients.</div></div>
      </div>
    </div>''', "The team behind the engine"))

# 4 ACT I
S.append(slide(4, "hero light", "act-1", "Act I", '''  <div class="frame" style="display:grid; gap:4vh; align-content:center; min-height:76vh">
    <div class="kicker" data-anim>Act I</div>
    <h1 class="h-hero" style="font-size:min(7.6vw,13.5vh)" data-anim>What we’ve <em class="acc" style="font-weight:600">been doing</em></h1>
    <p class="lead" style="max-width:52vw" data-anim>Why we do this work, who we’ve done it for, and what we built along the way.</p>
  </div>''', "Act I · The work so far"))

# 5 WHY
stats = [("1,597", "Followers", "after a 20-year career"), ("9", "Median reactions", "on their own posts"), ("76%", "of comments", "were some form of “congrats”"), ("14", "Company page", "followers on the firm’s page")]
st = "\n".join(f'''      <div class="stat-card" data-anim><div class="stat-label">{l}</div><div class="stat-nb acc" style="font-size:min(6.4vw,11.4vh)">{n}</div><div class="stat-note">{d}</div></div>''' for n, l, d in stats)
S.append(slide(5, "light", "why", "Why we do this", head("Why we do this", "Expertise isn’t the problem. <em class=\"acc\">Distribution is.</em>", "From our October LinkedIn audit of a former Big Four partner, now running a UK consultancy.") + f'''
    <div class="g4" style="margin-top:3.4vh">
{st}
    </div>''' + "\n" + tiles([
    ("clock", "Time", "Experts can’t spend three hours a day on LinkedIn. So they don’t, and buyers never hear of them."),
    ("ban", "No system", "Work comes from referrals and old colleagues. Good, but it caps growth and can’t be planned."),
    ("bot", "Generic AI noise", "Buyers are drowning in AI-written outreach. Trust now goes to specific, human, sourced."),
], mt="3.6vh"), "Public LinkedIn data · captured 8 Oct 2026"))

# 6 CLIENTS
S.append(slide(6, "dark", "clients", "Who we've done it for", head("The work", "Three accounts. Three markets. <em class=\"acc\">One method.</em>") + "\n" + tiles([
    ("box", "3D Images AI", "LinkedIn and email outbound to Amazon brand owners. 2,100+ researched prospects, each connection note written for their product category.", '\n        <div class="tag-s">3D product models for Amazon listings</div>'),
    ("pen-tool", "Bloggerly", "LinkedIn campaign for the article service. Inbound SEO consultants now asking for examples and calls.", '\n        <div class="tag-s">Search-optimised articles for B2B sites</div>'),
    ("briefcase", "UK finance-transformation consultancy", "LinkedIn audit and discovery on 15 Oct. A 52-page outbound and brand strategy delivered the next day. Target: 100+ qualified leads a month by month 6.", '\n        <div class="tag-s">Former Big Four partner · SAP and AI value</div>'),
], mt="4vh") + '''
    <div class="banner" style="margin-top:3.6vh" data-anim><i data-lucide="home"></i><span>Our own engine first: once the Extol company page reached about 50 followers, inbound started. People had seen our 3D Images AI and Bloggerly work and asked for the same.</span></div>''', "Client work · Aug–Oct 2026"))

# 7 IP
S.append(slide(7, "light", "built", "What we built", head("The asset", "What we built along the way", "Every engagement leaves a reusable system behind.") + "\n" + tiles([
    ("mail-check", "Cold email system", "2 agents, 16 skills and an automatic checker. Every draft is scored 0–100 by an independent critic and ships only at 85+."),
    ("linkedin", "LinkedIn engine", "An agent reads buyers’ posts and drafts comments. Linked Helper sends requests at a human pace from a UK server."),
    ("scale", "Lead scoring", "A decisions model triages leads and replies for about 1.8 cents per thousand decisions."),
    ("clapperboard", "Content and creative", "Articles, visuals, video ads and webinar clips, all from one raw note."),
    ("gauge", "Live dashboards", "Followers, reactions, replies and calls tracked from day one. Every lead traces to its source."),
    ("radar", "Trigger research", "New-in-role leaders, hiring, M&amp;A, tenders and regulation turned into a reason to reach out this month."),
], mt="4vh", gap="3.4vh"), "Reusable IP · built in-house"))

# 8 LESSONS
lessons = [("triangle-alert", "We moved too fast", "Early on we sent too many connection requests in a few days, and an account was restricted for a day.", "Every account now starts at 5 requests a day and climbs to 20 by week six, from a UK address."),
           ("filter", "Volume isn’t pipeline", "A job title alone doesn’t make someone a buyer. Messaging everyone burns the account and the brand.", "One buying trigger earns a message. Two make someone a priority."),
           ("user-check", "AI slop kills trust", "Senior buyers spot generic AI copy in a line. One bad comment costs more than ten good ones earn.", "Every post and message waits for a human yes. Every number has a source.")]
S.append(slide(8, "dark", "lessons", "Lessons", head("Learned the hard way", "Mistakes we made, <em class=\"acc\">so clients don’t pay for them</em>") + "\n" + tiles(
    [(ic, t, d, f'\n        <div class="q" style="margin-top:1.4vh">Now: {fix}</div>') for ic, t, d, fix in lessons], mt="7vh"), "Lessons from our own accounts"))

# 9 ACT II
S.append(slide(9, "hero dark", "act-2", "Act II", '''  <div class="frame" style="display:grid; gap:4vh; align-content:center; min-height:76vh">
    <div class="kicker" data-anim>Act II</div>
    <h1 class="h-hero" style="font-size:min(6.6vw,12vh)" data-anim>What a client <em class="acc" style="font-weight:600">gets in a deal</em></h1>
    <p class="lead" style="max-width:56vw" data-anim>Each part: what it is, why we do it, what it produces, and how we run it.</p>
  </div>''', "Act II · The offer"))

# 10 ENGINE
S.append(slide(10, "light", "engine", "The engine", head("The engine", "One note a week becomes <em class=\"acc\">everything else</em>", "The client brings the expertise. We bring the leverage.") + '''
    <div class="flow" style="margin-top:3.8vh">
      <div class="box acc-bg" data-anim style="border:0"><i data-lucide="mic" style="width:2.4vw;height:2.4vw"></i><div class="tt" style="font-family:var(--serif-zh);font-weight:700;font-size:min(1.8vw,3.2vh);margin-top:2vh">Client’s raw note</div><div style="margin-top:1vh;font-size:max(15px,1.02vw);line-height:1.5;opacity:.85">A voice note or a few lines. About 30 minutes, once a week.</div></div>
      <div class="arrow" data-anim><i data-lucide="arrow-right"></i></div>
      <div class="box fill" data-anim><i data-lucide="pen-line" class="acc" style="width:2.4vw;height:2.4vw"></i><div style="font-family:var(--serif-zh);font-weight:700;font-size:min(1.8vw,3.2vh);margin-top:1.6vh">Extol drafts. Client approves.</div><div style="margin-top:1vh;font-size:max(15px,1.02vw);line-height:1.5;opacity:.8">In their voice, sources checked, proofread twice. Approved on their phone.</div></div>
      <div class="arrow" data-anim><i data-lucide="arrow-right"></i></div>
      <div class="outs" data-anim style="color:var(--ink)">
        <div>LinkedIn posts and company page</div><div>Comments on buyers’ posts</div><div>Monthly newsletter</div><div>Search articles on their site</div><div>Webinar clips and visuals</div><div>Personal welcome video for leads</div>
      </div>
    </div>
    <p class="lead acc" style="margin-top:3.4vh; font-style:italic; font-size:min(2vw,3.6vh)" data-anim>Client time: about 2½ hours a week.</p>''', "The content engine"))


def table(rows):
    cells = ['<div class="th">Component</div><div class="th">What it is</div><div class="th">Why we do it</div><div class="th">What it produces</div>']
    for k, w, y, o in rows:
        cells.append(f'<div class="k" data-anim>{k}</div><div data-anim>{w}</div><div data-anim>{y}</div><div class="o" data-anim>{o}</div>')
    return '    <div class="tbl" style="margin-top:4.4vh">\n      ' + "\n      ".join(cells) + "\n    </div>"


# 11 FOUNDATION
S.append(slide(11, "dark", "foundation", "Build the foundation", head("Part one · weeks 1 to 4", "Build the foundation", "Nothing launches into an empty room.") + "\n" + table([
    ("Audit and positioning", "Profile, company page and content audit. One positioning line used everywhere.", "Buyers check you before they reply. Four names and three locations kill trust.", "A profile and page a CFO believes, in week one"),
    ("Targeting and triggers", "A named buyer list built from signals: new in role, hiring, M&amp;A, tenders, regulation.", "A message with a reason gets a reply. A job title alone doesn’t.", "200+ named buyers, ranked by readiness"),
    ("Website and articles", "Site rebuilt around one first offer. Two search articles a month.", "Every channel needs one place to land. Search compounds for years.", "Tracked bookings; every lead traced to source"),
    ("Reporting", "Live dashboard plus a monthly review with the client.", "Cut what isn’t working, double what is.", "Decisions on data, and visible progress"),
]), "Part one · the foundation"))

# 12 RUN
S.append(slide(12, "light", "run", "Run the engine", head("Part two · every week from week 2", "Run the engine", "This is the recurring part of the fee.") + "\n" + table([
    ("LinkedIn outreach", "5 rising to 20 connection requests a day, half warm, half cold, with a follow-up.", "Gets the expert into the buyer’s network before the RFP or budget lands.", "About 8 booked calls a month at full pace"),
    ("Engagement", "3–5 drafted comments a day on buyers’ posts, approved by the client.", "Visibility with the exact buyers, without a cold pitch.", "Name recognition where it counts"),
    ("Content engine", "One raw note becomes posts, newsletter, articles and clips.", "Consistency without taking the founder’s week.", "Weekly proof and point-of-view posts"),
    ("Events and community", "Monthly webinar, small invite-only dinners, Substack or Skool where it fits.", "Be in rooms where buyers already are, and own a small one.", "Warm calls within 48 hours of every event"),
]), "Part two · the recurring engine"))

# 13 HOW
steps = [("eye", "Watch", "Agents read buyers’ posts, job moves and news for triggers"), ("pen-line", "Draft", "Posts, comments and notes in the client’s voice"),
         ("circle-check", "Approve", "The client says yes, edits or bins it, on their phone"), ("send", "Publish", "At a human pace, from a safe UK address"),
         ("bar-chart-3", "Measure", "Replies, calls and followers, reviewed monthly")]
stp = "\n".join(f'''        <div class="step{' tile hl' if i == 2 else ''}" data-anim="step"><div class="step-nb">0{i+1}</div><i data-lucide="{ic}" class="ico-md acc" style="margin:.6vh 0"></i><div class="step-title" style="font-family:var(--serif-zh);font-size:min(1.7vw,3vh)">{t}</div><div class="step-desc" style="font-size:max(15px,.98vw)">{d}</div></div>''' for i, (ic, t, d) in enumerate(steps))
rules = ["Clients are named only with written permission", "Every number has a linked source", "Two proofreads before the client sees a draft", "Mistakes come down the same day, and we log why"]
rl = "\n".join(f'<div data-anim style="display:flex;gap:.8vw;align-items:center;font-size:max(15px,1.05vw)"><i data-lucide="shield-check" class="ico-md acc"></i>{r}</div>' for r in rules)
S.append(slide(13, "dark", "how", "How we run it", head("How we run it", "Agents draft. <em class=\"acc\">People decide.</em>", "The same five-step loop for every channel and every client.") + f'''
    <div class="pipeline-section" style="margin-top:6vh">
      <div class="pipeline">
{stp}
      </div>
    </div>
    <div class="g2" style="margin-top:7vh; row-gap:3vh">
{rl}
    </div>''', "The operating loop · press → to step through", anim="pipeline"))

# 14 FUNNEL
fun = [("Requests sent", 400, 100), ("Accepted", 150, 37.5), ("Replied", 27, 6.75), ("Calls booked", 8, 2)]
fr = "\n".join(f'''        <div class="frow" data-anim><div class="fl">{l}</div><div><div class="fbar" style="width:{max(w,0)}%">{v}</div></div></div>''' for l, v, w in fun)
rates = [("37%", "accept", "Warm contacts accept far more than cold"), ("18%", "of acceptors reply", "Because every note names their trigger"), ("30%", "of replies book", "No pitch in the first message, just a question")]
rt = "\n".join(f'''        <div class="tile" data-anim><div style="display:flex;align-items:baseline;gap:1vw"><span class="bignum" style="font-size:min(3.4vw,6vh)">{n}</span><span class="tt" style="font-size:min(1.4vw,2.5vh)">{l}</span></div><div class="dd">{d}</div></div>''' for n, l, d in rates)
S.append(slide(14, "light", "funnel", "Funnel", head("The maths", "What 20 requests a day <em class=\"acc\">turn into</em>", "Monthly outreach funnel at full pace, once the account is warmed up. Our planning model, not yet track record.") + f'''
    <div class="grid-2-7-5" style="margin-top:4.6vh; gap:5vw">
      <div class="funnel">
{fr}
      </div>
      <div style="display:flex;flex-direction:column;gap:2.6vh">
{rt}
      </div>
    </div>''', "Planning model · to be proven"))

# 15 OUTCOMES
cols = [("Month 1", 13), ("Month 3", 71), ("Month 6", 101), ("Month 12", 126)]
cl = "\n".join(f'''          <div class="c{' hot' if v >= 100 else ''}" data-anim><div class="v">{v}</div><div class="b" style="height:{v/126*82:.0f}%"></div></div>''' for _, v in cols)
cll = "".join(f"<div>{m}</div>" for m, _ in cols)
S.append(slide(15, "dark", "outcomes", "Outcomes", head("The outcome", "A pipeline that <em class=\"acc\">compounds</em>", "Forecast for our consultancy client: qualified leads a month, mid-points.") + f'''
    <div class="grid-2-7-5" style="margin-top:4vh; gap:5vw; align-items:end">
      <div>
        <div class="cols" style="height:44vh">
{cl}
        </div>
        <div class="cols-l">{cll}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:2.4vh">
        <div class="stat-card" data-anim><div class="stat-label">Qualified leads a month</div><div class="stat-nb acc" style="font-size:min(4.4vw,7.6vh)">100</div></div>
        <div class="stat-card" data-anim><div class="stat-label">Worth pursuing · real buyer calls</div><div class="stat-nb acc" style="font-size:min(4.4vw,7.6vh)">10</div></div>
        <div class="stat-card" data-anim><div class="stat-label">Paying clients</div><div class="stat-nb acc" style="font-size:min(4.4vw,7.6vh)">2–3</div></div>
        <p class="note-s" data-anim style="line-height:1.6">Big-ticket sales take 6–12 months. First win usually lands in months 6–12.</p>
      </div>
    </div>''', "Forecast · not yet a result"))

# 16 COMMERCIALS
S.append(slide(16, "light", "commercials", "Commercials", head("The commercials", "One monthly fee. <em class=\"acc\">Every tool included.</em>") + '''
    <div class="grid-2-7-5" style="margin-top:7vh; gap:5vw">
      <div>
        <div class="g3" style="gap:2vw">
          <div class="stat-card" data-anim><div class="stat-label">Standard · month 4+</div><div class="stat-nb acc" style="font-size:min(4vw,7vh)">£2,500</div><div class="stat-note">a month</div></div>
          <div class="stat-card" data-anim><div class="stat-label">Founding · month 1</div><div class="stat-nb" style="font-size:min(4vw,7vh)">£1,500</div><div class="stat-note">Set-up, voice interview, website build</div></div>
          <div class="stat-card" data-anim><div class="stat-label">Founding · months 2–3</div><div class="stat-nb" style="font-size:min(4vw,7vh)">£1,200</div><div class="stat-note">Delivery and weekly call</div></div>
        </div>
        <div class="banner" style="margin-top:6vh" data-anim><i data-lucide="target"></i><span><b>Our accountability.</b> At day 60 we review the numbers together. If we’re behind, we agree a written fix plan, or the client gives 30 days’ notice and leaves before the standard fee starts.</span></div>
      </div>
      <div data-anim>
        <div class="kicker">If year one brings…</div>
        <div class="rowline" style="grid-template-columns:1.6fr 1fr .8fr"><div class="v">One small advisory piece</div><div class="v">£50,000</div><div class="k" style="justify-self:end">0.9×</div></div>
        <div class="rowline" style="grid-template-columns:1.6fr 1fr .8fr"><div class="v">One mid-size engagement</div><div class="v">£150,000</div><div class="k acc" style="justify-self:end">2.8×</div></div>
        <div class="rowline" style="grid-template-columns:1.6fr 1fr .8fr"><div class="v">Two engagements</div><div class="v">£500,000+</div><div class="k acc" style="justify-self:end">9.5×</div></div>
        <p class="note-s" style="margin-top:2vh;line-height:1.6">Year-one fee £26,400 · return on profit at a 50% margin · illustrative</p>
      </div>
    </div>''', "Founding-client terms · prices exclude VAT"))

# 17 GUARDRAILS
S.append(slide(17, "dark", "guardrails", "Guardrails", head("Guardrails", "What we <em class=\"acc\">take care of</em>") + "\n" + tiles([
    ("linkedin", "Their LinkedIn account", "Human pace, slow warm-up, a UK address. Always well under daily limits."),
    ("lock", "Their clients and NDA", "Named only with written permission. NDA and a data processing agreement before we start."),
    ("rotate-ccw", "Mistakes", "Anything wrong comes down the same day, gets fixed, and the cause is logged."),
    ("globe", "Their brand", "One name, one location, one story, everywhere, from week one."),
    ("shield", "Their data", "Confidential detail is stripped before drafting. Accounts and content are handed back if we stop."),
    ("users", "Their audiences", "Buyer and community content never share a post. A CFO should never feel sold a course."),
], mt="4.4vh", gap="3.6vh"), "Why an intro from you is safe with us"))

# 18 ACT III
S.append(slide(18, "hero light", "act-3", "Act III", '''  <div class="frame" style="display:grid; gap:4vh; align-content:center; min-height:76vh">
    <div class="kicker" data-anim>Act III</div>
    <h1 class="h-hero" style="font-size:min(7.6vw,13.5vh)" data-anim>Where <em class="acc" style="font-weight:600">you</em> come in</h1>
    <p class="lead" style="max-width:52vw" data-anim>Advise, guide and open doors, and how we make it worth your while.</p>
  </div>''', "Act III · The partnership"))


def bullets(items):
    return '\n        <ul style="margin-top:1vh;padding-left:1.1em;display:flex;flex-direction:column;gap:1.2vh;font-size:max(16px,1.22vw);line-height:1.5;opacity:.85">' + "".join(f"<li>{x}</li>" for x in items) + "</ul>"


# 19 ROLES
S.append(slide(19, "light", "roles", "Three roles", head("Working alongside us, not for us", "Three ways you can <em class=\"acc\">move the needle</em>") + "\n" + tiles([
    ("lightbulb", "Advise", "Make the offer and the pitch sharper.", bullets(["Pressure-test the offer and pricing", "Sharpen how we explain outcomes to senior buyers", "Sit in on key pitches and debrief us"])),
    ("compass", "Guide", "Point us at the right market.", bullets(["Help us pick the one market to own first", "Tell us which proof your network would trust", "A monthly strategy hour with the founders"])),
    ("door-open", "Open doors", "Bring us to the right people.", bullets(["Warm intros to founders and firms who fit", "Join first calls where your name helps", "Point us to the rooms and events that matter"]), True),
], mt="8vh").replace('class="tt"', 'class="tt" style="font-size:min(2.6vw,4.6vh)"'), "The advisor role"))

# 20 GAPS
S.append(slide(20, "dark", "gaps", "Honest gaps", head("An honest read", "Where we most need <em class=\"acc\">an outside view</em>", "Our own gaps, and the first questions we’d bring to you.") + "\n" + tiles([
    ("bar-chart-3", "Proof", "No published case study with hard numbers yet. Our results are early and mostly forecasts.", '\n        <div class="q">Which proof would your network trust first?</div>'),
    ("crosshair", "Focus", "Three very different markets so far: Amazon brands, SEO services, finance consulting.", '\n        <div class="q">Which one should we own, and which should we drop?</div>'),
    ("coins", "Pricing", "£2,500 a month has been offered to one founding client. It isn’t tested at scale.", '\n        <div class="q">Is it priced for the value, or leaving money on the table?</div>'),
    ("users", "Capacity", "Two founders run sales and delivery. Systems carry a lot, but not everything.", '\n        <div class="q">How many clients before we hire, and who first?</div>'),
], cls="g4", mt="7.5vh"), "Questions for our advisor"))

# 21 OPTIONS
S.append(slide(21, "light", "options", "Partnership options", head("A proposal to shape together", "How we could <em class=\"acc\">work together</em>", "Nothing here is fixed. Terms to agree on Monday.") + "\n" + tiles([
    ("handshake", "A · Referral partner", "A share of the fees from every client you introduce, for their first year.", '\n        <div class="q">Simple, no fixed cost, pays only on results.</div>'),
    ("messages-square", "B · Advisor", "A set number of hours a month, plus a smaller success fee on introduced clients.", '\n        <div class="q">Regular rhythm; good if advice is the main value.</div>'),
    ("sprout", "C · Strategic advisor", "A small equity stake, vesting over time, once the fit is proven.", '\n        <div class="q">Long-term alignment with where Extol is going.</div>'),
], mt="5vh") + '''
    <div class="banner" style="margin-top:4.6vh" data-anim><i data-lucide="circle-check"></i><span>Our suggestion: start as a referral partner for 90 days, then review together and move to B or C if it’s working for both sides.</span></div>''', "Options for discussion"))

# 22 90 DAYS
tl = [("Week 1", "Agree the role", "Role, terms and a monthly hour in the diary. NDA both ways."), ("Day 30", "Pick the market", "One market to lead with. A shortlist of 10 people you could introduce."),
      ("Day 60", "First intros", "First warm intros and calls, with you in the room where it helps."), ("Day 90", "Review", "First referred client signed or in proposal. Decide the long-term model.")]
tlh = "\n".join(f'''        <div data-anim><div class="n"></div><div class="kicker" style="margin-bottom:1.2vh">{w}</div><div class="tt" style="font-family:var(--serif-zh);font-weight:700;font-size:min(2.2vw,3.9vh)">{t}</div><div class="dd" style="margin-top:1.2vh;font-size:max(16px,1.24vw);line-height:1.55;opacity:.8">{d}</div></div>''' for w, t, d in tl)
S.append(slide(22, "dark", "ninety-days", "First 90 days", head("Next", "The first 90 days <em class=\"acc\">together</em>", "Small, concrete steps, so we both know quickly whether this works.") + f'''
    <div class="tl" style="margin-top:8vh">
{tlh}
    </div>
    <div class="banner" style="margin-top:7vh" data-anim><i data-lucide="messages-square"></i><span>Questions for you today: which market do you know best? Who comes to mind first? What would make this a clear yes for you?</span></div>''', "Next steps"))

# 23 CLOSE
S.append(slide(23, "hero dark", "close", "Close", '''  <div class="frame" style="display:grid; gap:3.6vh; align-content:center; min-height:76vh">
    <div class="logo-slot" data-anim><img src="images/logo.png" alt="Extol Affiliates" onerror="this.parentNode.style.display='none'"></div>
    <div class="kicker" data-anim>Thank you</div>
    <h1 class="h-hero" style="font-size:min(7.4vw,13vh); line-height:1.02" data-anim>You know the rooms.<br><em class="acc" style="font-weight:600">We build the engine.</em></h1>
    <p class="lead" style="max-width:58vw" data-anim>Together: the right clients, a system that delivers for them, and proof that compounds.</p>
    <div class="meta-row" data-anim><span>Devasya Dwivedi</span><span>·</span><span>Anshul Mikita Prajapati</span><span>·</span><span>admin@extolaffiliates.com</span></div>
  </div>''', "Extol Affiliates · Growth systems for B2B companies"))

assert len(S) == TOTAL
src = src.replace("<!-- SLIDES_HERE -->", "\n".join(S))

# ---------------------------------------------------------------- speaker notes
N = [
    ("cover", "Opening", 1, "Set the purpose of the meeting", ["David joins us to advise, guide and help bring in new clients.", "Three parts: what Extol has been doing, what a client gets in a deal, where David fits.", "Aim: leave with agreement on his role and the first 90 days."], "Start with the one-minute version."),
    ("short-version", "Opening", 2, "Give the whole meeting in one slide", ["Each column is one part of the meeting.", "Keep it to two minutes."], "First, who we are."),
    ("who-we-are", "Opening", 2, "Establish who Extol is and what it believes", ["Roles are as they appeared on the EffectivePoint discovery call; adjust if titles changed.", "The belief line is the whole philosophy: outcomes, not AI."], "Now the work itself."),
    ("act-1", "Act I", 0.5, "Transition into the track record", ["Pause here."], "Start with why the work exists."),
    ("why", "Act I", 2, "Show the problem with real numbers", ["Public LinkedIn data captured 8 Oct 2026 for our consultancy client.", "The client is under NDA, so it is described, not named.", "Point: our buyers are experts with a distribution problem, not a talent problem."], "Who we have done this for."),
    ("clients", "Act I", 2.5, "Show the live accounts", ["3D Images AI and Bloggerly are clients we already mention publicly.", "Name the consultancy (EffectivePoint, Dr Uche Nnene) only if Uche has agreed.", "No outcome numbers are claimed yet: none are published."], "What those accounts left behind."),
    ("built", "Act I", 2, "Present the reusable systems as the asset", ["This is the productisation story.", "These systems are why two people can deliver like a larger agency."], "And what went wrong on the way."),
    ("lessons", "Act I", 2, "Build credibility by naming mistakes", ["The restriction was temporary, about a day, on our own account, not a client's."], "Now the offer."),
    ("act-2", "Act II", 0.5, "Transition into the deal", ["Pause here."], "Start with the engine at the centre."),
    ("engine", "Act II", 2, "Answer the 'I don't have time' objection", ["The client never writes the same idea twice.", "2½ hours a week is the whole ask."], "What goes in the first month."),
    ("foundation", "Act II", 2, "Explain the foundation work", ["Front-loaded into month one.", "Most agencies skip this, which is why their outreach lands on a weak profile."], "Then the weekly engine."),
    ("run", "Act II", 2, "Explain the recurring work", ["Outreach numbers come from the funnel model on a later slide. They are forecasts."], "How every channel is run."),
    ("how", "Act II", 2, "Show the operating loop and the human approval step", ["Press → to light each step.", "Approval is the difference between us and 'AI outreach' tools; senior clients care about it most."], "What the outreach produces."),
    ("funnel", "Act II", 2, "Show the outreach maths", ["These are the planning assumptions from the consultancy strategy, not track record.", "Ask David: do they match what he has seen in his market?"], "Over a year, that compounds."),
    ("outcomes", "Act II", 2, "Show the 12-month lead forecast", ["A qualified lead is a buyer or shortlister who replies, messages, books or signs up.", "The 100 / 10 / 2-3 rule came from the client.", "Be explicit: this is a forecast; proving it is the next six months' job."], "What it costs."),
    ("commercials", "Act II", 2, "Lay out the price and the accountability", ["Founding-rate terms offered to our first consultancy client.", "Ask David: does this price fit the value for the clients he would introduce?"], "And how we protect the client."),
    ("guardrails", "Act II", 1.5, "Reassure that referred clients are safe", ["An advisor's reputation rides on every intro."], "Now, David's part."),
    ("act-3", "Act III", 0.5, "Transition to the partnership", ["Pause here."], "Three ways he can help."),
    ("roles", "Act III", 2, "Define the advisor role", ["Ask which of the three he wants to lead with. Most advisors are strongest at one."], "Where we need him most."),
    ("gaps", "Act III", 2.5, "Be candid about our gaps", ["Being candid builds trust and gets better advice.", "Update if any case study numbers land before Monday."], "How we could structure it."),
    ("options", "Act III", 2.5, "Put the partnership models on the table", ["Percentages, hours and equity are left open on purpose.", "Decide our walk-away numbers before the meeting."], "What the first 90 days look like."),
    ("ninety-days", "Act III", 3, "Agree concrete next steps and open the floor", ["Capture his answers to the three questions; they set the first 30 days."], "Close."),
    ("close", "Close", 1, "Close and confirm next steps", ["Terms by email this week; first monthly hour booked."], "Open the floor for questions."),
]
notes = []
for (sid, sec, mins, purpose, talk, trans), s in zip(N, S):
    title = re.search(r'data-title="([^"]+)"', s).group(1)
    assert f'data-slide-id="{sid}"' in s, sid
    notes.append({"id": sid, "title": title, "section": sec, "minutes": mins, "purpose": purpose, "talk": talk, "transition": trans})
src = re.sub(r"const SPEAKER_NOTES = \[.*?\n\];", "const SPEAKER_NOTES = " + json.dumps(notes, ensure_ascii=False, indent=1).replace("</", "<\\/") + ";", src, count=1, flags=re.S)

(HERE / "index.html").write_text(src, encoding="utf-8")
print("wrote", HERE / "index.html", len(src), "bytes")
