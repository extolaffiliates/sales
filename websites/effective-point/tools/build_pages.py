"""Build EffectivePoint inner pages from the homepage's shell (header, menu, footer).
Usage: python3 -I build_pages.py <site-dir>
Every header/menu/footer string is copied from index.html, never retyped.
"""
import re, sys, pathlib

site = pathlib.Path(sys.argv[1])
home = (site / 'index.html').read_text()

head_tpl = home[:home.index('<title>')]
assets_head = home[home.index('<link rel="preload"'):home.index('</head>')]
shell_top = home[home.index('<body>'):home.index('<main')]
footer = home[home.index('</main>') + len('</main>'):]
cta_home = re.search(r'<section class="cta">.*?</section>', home, re.S).group(0)
values = re.search(r'<section class="values">.*?</section>', home, re.S).group(0)
proofbar = re.search(r'<div class="proofbar">.*?</div>\n</div>', home, re.S).group(0)[:-len('\n</div>')]
journey = re.search(r'<div class="journey">.*?</article></div>', home, re.S).group(0)
triggers = re.search(r'<div class="triggers">.*?</div>\n</div>', home, re.S).group(0)
cards_home = re.search(r'<div class="cards">.*?</article></div>', home, re.S).group(0)

SITE = 'https://effective-point.com'
BUILT = []

def page(name, title, desc, body, current=None, extra_head='', listed=True):
    top = shell_top
    if current:
        top = top.replace(f'<a href="{current}">', f'<a href="{current}" aria-current="page">', 1)
    url = f'{SITE}/{name}'
    seo = (f'<link rel="canonical" href="{url}"><meta property="og:type" content="website"><meta property="og:site_name" content="EffectivePoint">'
           f'<meta property="og:locale" content="en_GB"><meta property="og:title" content="{title}"><meta property="og:description" content="{desc}">'
           f'<meta property="og:url" content="{url}"><meta property="og:image" content="{SITE}/assets/og-image.jpg">'
           '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">') if listed else '<meta name="robots" content="noindex">'
    html = (head_tpl + f'<title>{title}</title><meta name="description" content="{desc}">\n' + extra_head + seo + '\n'
            + assets_head + '</head>' + top + '<main id="main">\n' + body + '\n</main>' + footer)
    if listed: BUILT.append(name)
    (site / name).write_text(html)
    print('wrote', name, len(html))

IMG = {  # page photos (Unsplash, see README for credits)
    'ft': 'assets/img/ft-hero.webp', 'ft-band': 'assets/img/ft-band.webp', 'assessment': 'assets/img/assessment-hero.webp',
    'insights': 'assets/img/insights-hero.webp', 'about': 'assets/img/about-hero.webp', 'contact': 'assets/img/contact-hero.webp',
    'define': 'assets/img/topic-define.webp', 'recover': 'assets/img/topic-recover.webp', 'ai': 'assets/img/topic-ai.webp', 'data': 'assets/img/topic-data.webp'}

def hero(eyebrow, h1, lede, actions='', jump='', tone='', img=None):
    media = f'<div class="hero-media"><img src="{IMG[img]}" alt="" fetchpriority="high"></div>' if img else ''
    return (f'<section class="hero page-hero{(" " + tone) if tone else ""}">' + media + '<div class="hero-body">'
            f'<div class="eyebrow">{eyebrow}</div><h1>{h1}</h1><p>{lede}</p>'
            + (f'<div class="hero-actions">{actions}</div>' if actions else '') + '</div>'
            + (f'<nav class="jump" aria-label="On this page">{jump}</nav>' if jump else '') + '</section>')

BTN_ASSESS = '<a class="btn green" href="assessment.html">Assess Your Finance Transformation →</a>'
BTN_TALK = '<a class="btn ghost" href="contact.html">Talk to EffectivePoint</a>'

def detail(id_, eyebrow, h2, lede, items, extra='', dark=False):
    lis = ''.join(f'<li><div><b>{b}</b>' + (f'<span>{s}</span>' if s else '') + '</div></li>' for b, s in items)
    return (f'<article class="detail reveal" id="{id_}"><div><div class="eyebrow">{eyebrow}</div><h2>{h2}</h2>'
            f'<p class="lede">{lede}</p>{extra}</div><ul class="points">{lis}</ul></article>')

# ---------------------------------------------------------------- Finance Transformation
ft = hero('FINANCE TRANSFORMATION · ERP · DATA · AI',
          'Finance Transformation is the core. <span>Technology enables the outcome.</span>',
          'Practical, senior-led Finance Transformation for organisations deciding where to start or seeking to recover value from change already underway.',
          BTN_ASSESS + BTN_TALK,
          '<a href="#define">Define the Change</a><a href="#recover">Recover the Value</a><a href="#core">Finance Transformation</a>'
          '<a href="#erp">ERP-enabled Transformation</a><a href="#data">Data &amp; Finance Insight</a><a href="#ai">AI &amp; Automation for Finance</a>', img='ft')
STACK = ('<section class="section dark stack-sec"><div class="wrap"><div class="section-head reveal"><h2>Value is built in layers.</h2>'
         '<p class="lede">Trusted data, the right systems and a clear operating model come first. AI and automation follow, only where they add value.</p></div>'
         '<figure class="stack" data-stack role="img" aria-label="Five layers stacking from data at the bottom to measurable value at the top">'
         '<ol class="stack-legend">'
         '<li data-title="DATA" data-sub="INFORMATION YOU CAN TRUST"><div><b>Data</b><span>Information you can trust</span></div></li>'
         '<li data-title="ERP &amp; SYSTEMS" data-sub="ANCHORED IN OUTCOMES"><div><b>ERP &amp; systems</b><span>Anchored in outcomes</span></div></li>'
         '<li data-title="OPERATING MODEL" data-sub="ALIGN PEOPLE AND PROCESS"><div><b>Operating model</b><span>Align people and process</span></div></li>'
         '<li data-title="AI &amp; AUTOMATION" data-sub="ONLY WHERE IT ADDS VALUE"><div><b>AI &amp; automation</b><span>Only where it adds value</span></div></li>'
         '<li data-title="MEASURABLE VALUE" data-sub="EVIDENCE BEFORE CLAIMS"><div><b>Measurable value</b><span>Evidence before claims</span></div></li>'
         '</ol></figure></div></section><script src="stack.js" defer></script>')
ft += STACK
jr = journey.replace('<article class="path define reveal">', '<article class="path define reveal" id="define">') \
            .replace('<article class="path recover reveal">', '<article class="path recover reveal" id="recover">') \
            .replace('href="finance-transformation.html#define"', 'href="assessment.html"') \
            .replace('href="finance-transformation.html#recover"', 'href="assessment.html"')
ft += ('<section class="section journey-sec"><div class="wrap"><div class="section-head reveal"><h2>Where are you on your Finance Transformation journey?</h2></div></div>'
       + jr + '</section>')
ft += ('<section class="section"><div class="wrap"><div class="section-head reveal"><h2>Common reasons to start a Finance transformation</h2></div>'
       + triggers + '</div></section>')
ft += f'<figure class="band reveal" aria-hidden="true"><img src="{IMG["ft-band"]}" alt="" loading="lazy"></figure>'
ft += '<section class="section paper"><div class="wrap">'
ft += detail('core', 'THE CORE', 'Finance Transformation',
             'Strategy, operating model, roadmap, assurance and value realisation.',
             [('Operating model and workflow design', ''), ('Process optimisation', ''),
              ('Adoption and governance', ''), ('Value realisation', '')])
ft += detail('erp', 'ENABLER', 'ERP-enabled Transformation',
             'S/4HANA and ERP decisions anchored in Finance outcomes rather than technology for its own sake.',
             [('S/4HANA RISE and GROW roadmaps', 'From benefits case assessment to deployment across end-to-end business processes.'),
              ('Separations and carve-outs', 'How you separate an organisation and make sure the technology is separated too.'),
              ('Data migration', 'Moving finance data into S/4HANA without losing control of it.'),
              ('Solution architecture', '')])
ft += detail('data', 'ENABLER', 'Data &amp; Finance Insight',
             'Data quality, models, controls and management information that leaders can trust.',
             [('Data quality and controls', ''), ('Data modelling', ''), ('Management information leaders can trust', '')],
             extra='<p class="lede" style="color:var(--ink)">“Before asking, ‘What AI agent should we build?’, leaders should ask, ‘Can our data support intelligent decisions at scale?’”<br><small style="font-size:15px;color:var(--muted)">Dr Uche A. Nnene FCCA</small></p>')
ft += detail('ai', 'ENABLER', 'AI &amp; Automation for Finance',
             'Practical use cases assessed against process readiness, control and measurable value.',
             [('Where does the work sit?', ''),
              ('What outcome should change, and what benefit should that create?', ''),
              ('What evidence will prove the benefit, costs and risk?', ''),
              ('What happens if the AI gets it wrong?', ''),
              ('Who owns the result and the value realisation?', '')],
             extra='<p class="lede">Every use case is tested with five questions, and ends in a clear decision: stop, refine or scale.</p>')
ft += '</div></section>'
ft += cta_home
page('finance-transformation.html', 'Finance Transformation | EffectivePoint',
     'Finance Transformation is the core. Technology enables the outcome. Define the change or recover the value from a programme already underway.',
     ft, 'finance-transformation.html')

# ---------------------------------------------------------------- Assessment
choices = lambda name, opts, typ='radio': ''.join(
    f'<label class="choice"><input type="{typ}" name="{name}" value="{o}"{" required" if typ=="radio" and i==0 else ""}><span>{o}</span></label>'
    for i, o in enumerate(opts))
form_done = ('<div class="form-done" role="status"><h3 data-ok>Thank you. Your request has been received.</h3>'
             '<h3 data-off>Your email is ready to send.</h3>'
             '<p class="form-note" data-ok>A senior EffectivePoint adviser will reply to arrange a conversation.</p>'
             '<p class="form-note" data-off>Your email app should have opened with your answers filled in. Press send to reach us. If nothing opened, email us at <b>info@effective-point.com</b>.</p></div>')
asx = hero('FINANCE TRANSFORMATION ASSESSMENT',
           'Clarify the problem <span>before prescribing the solution.</span>',
           'A lightweight diagnostic entry point for organisations defining change or recovering transformation value.',
           '<a class="btn green" href="#start">Start the assessment →</a>' + BTN_TALK, img='assessment')
asx += ('<section class="section"><div class="wrap"><div class="section-head reveal"><h2>Two starting points</h2>'
        '<p class="lede">The assessment works whether a transformation is still an idea or already underway.</p></div>'
        + journey.replace('href="finance-transformation.html#define"', 'href="#start"').replace('href="finance-transformation.html#recover"', 'href="#start"')
           .replace('Explore where to start →', 'Start here →').replace('Review transformation value →', 'Start here →')
        + '</div></section>')
asx += ('<section class="section dark"><div class="wrap"><div class="section-head reveal"><h2>What the assessment looks at</h2>'
        '<p class="lede">Finance Transformation is the core. Technology enables the outcome.</p></div><div class="caps">'
        '<a class="cap reveal" href="finance-transformation.html#core"><strong>Finance Transformation</strong><span>Strategy, operating model, roadmap, assurance and value realisation.</span></a>'
        '<a class="cap reveal" href="finance-transformation.html#erp"><strong>ERP-enabled Transformation</strong><span>S/4HANA and ERP decisions anchored in Finance outcomes rather than technology for its own sake.</span></a>'
        '<a class="cap reveal" href="finance-transformation.html#data"><strong>Data &amp; Finance Insight</strong><span>Data quality, models, controls and management information that leaders can trust.</span></a>'
        '<a class="cap reveal" href="finance-transformation.html#ai"><strong>AI &amp; Automation for Finance</strong><span>Practical use cases assessed against process readiness, control and measurable value.</span></a>'
        '</div></div></section>')
asx += ('<section class="section paper" id="start"><div class="wrap form-wrap"><div class="reveal">'
        '<div class="eyebrow" style="color:var(--green);margin-bottom:18px">START THE ASSESSMENT</div>'
        '<h2 style="font-size:clamp(34px,4.6vw,72px);max-width:12ch;margin-bottom:22px">Tell us where you are.</h2>'
        '<p class="lede">A few questions about your organisation and your transformation. A senior EffectivePoint adviser reviews every request.</p></div>'
        '<div class="form-area reveal"><form class="form" data-form data-endpoint="" data-email="info@effective-point.com" data-subject="Finance Transformation Assessment request" novalidate>'
        '<fieldset class="field full choices"><legend>Where are you on your Finance Transformation journey?</legend>'
        + choices('stage', ['Thinking about transformation', 'Already on the transformation path']) + '</fieldset>'
        '<fieldset class="field full choices"><legend>What is driving it? Choose any that apply.</legend>'
        + choices('drivers', ['Growth &amp; Scale', 'M&amp;A, PE or Separation', 'Regulatory &amp; Control', 'Efficiency &amp; Effectiveness', 'Technology &amp; AI Opportunity'], 'checkbox') + '</fieldset>'
        '<fieldset class="field full choices"><legend>Which areas matter most? Choose any that apply.</legend>'
        + choices('areas', ['Finance Transformation', 'ERP-enabled Transformation', 'Data &amp; Finance Insight', 'AI &amp; Automation for Finance'], 'checkbox') + '</fieldset>'
        '<div class="field"><label for="a-name">Name</label><input id="a-name" name="name" autocomplete="name" required></div>'
        '<div class="field"><label for="a-email">Work email</label><input id="a-email" name="email" type="email" autocomplete="email" required></div>'
        '<div class="field"><label for="a-org">Organisation</label><input id="a-org" name="organisation" autocomplete="organization" required></div>'
        '<div class="field"><label for="a-role">Role</label><input id="a-role" name="role" autocomplete="organization-title"></div>'
        '<div class="field full"><label for="a-msg">What would you most like to understand?</label><textarea id="a-msg" name="message"></textarea></div>'
        '<p class="form-note full">We use these details only to respond to your request. See our <a href="privacy.html" style="text-decoration:underline">Privacy notice</a>.</p>'
        '<button class="btn green" type="submit">Submit assessment request →</button></form>' + form_done + '</div></div></section>')
page('assessment.html', 'Finance Transformation Assessment | EffectivePoint',
     'A lightweight diagnostic entry point for organisations defining change or recovering transformation value.', asx)

# ---------------------------------------------------------------- Insights
ins = hero('CFO TRANSFORMATION DIGEST', 'CFO Transformation <span>Digest</span>',
           'Evidence-led perspectives on Finance transformation, ERP, data, AI and value realisation — designed to help leaders make better decisions.',
           '<a class="btn green" href="https://www.linkedin.com/company/effectivepoint-limited/" target="_blank" rel="noopener">Follow on LinkedIn →</a>', tone='navy', img='insights')
def card(topic, tag, title, text):
    return (f'<article class="card reveal" data-topic="{topic}"><figure class="thumb"><img src="{IMG[topic]}" alt="" loading="lazy"></figure><div class="tag">{tag}</div><h3>{title}</h3>'
            + (f'<p>{text}</p>' if text else '<p></p>')
            + '<a href="https://www.linkedin.com/company/effectivepoint-limited/" target="_blank" rel="noopener">Follow for new articles →</a></article>')
cards = ''.join([
    card('define', 'DEFINE THE CHANGE', 'When should an SME start a Finance transformation?', 'Five business triggers that signal the existing Finance model may no longer be fit for purpose.'),
    card('recover', 'RECOVER THE VALUE', 'Why transformation activity is not the same as transformation value', 'How to identify benefit leakage, adoption gaps and programme risk before value disappears.'),
    card('ai', 'AI &amp; FINANCE', 'Where does AI genuinely create Finance value?', 'A practical lens for separating useful automation from technology hype.'),
    card('ai', 'FUTURE OF FINANCE', 'The tool is the easy part of the business case.', ''),
    card('ai', 'FUTURE OF FINANCE', 'Your Finance team got faster. What did it buy?', ''),
    card('ai', 'FUTURE OF FINANCE', 'What I would map before expanding an AI agent’s authority', ''),
    card('ai', 'FUTURE OF FINANCE', 'Before AI Agents Act: Who Is Accountable?', ''),
    card('ai', 'FUTURE OF FINANCE', 'AI Automation Is Scaling. Finance Value Isn’t.', ''),
    card('data', 'DATA &amp; ERP', 'SAP + Dremio: A Turning Point', ''),
])
ins += ('<section class="section paper"><div class="wrap"><div class="filters" role="group" aria-label="Filter by topic">'
        '<button class="filter" type="button" data-filter="all" aria-pressed="true">All</button>'
        '<button class="filter" type="button" data-filter="define" aria-pressed="false">Define the Change</button>'
        '<button class="filter" type="button" data-filter="recover" aria-pressed="false">Recover the Value</button>'
        '<button class="filter" type="button" data-filter="ai" aria-pressed="false">AI &amp; Finance</button>'
        '<button class="filter" type="button" data-filter="data" aria-pressed="false">Data &amp; ERP</button></div>'
        f'<div class="cards">{cards}</div></div></section>')
ins += cta_home
page('insights.html', 'CFO Transformation Digest | EffectivePoint',
     'Evidence-led perspectives on Finance transformation, ERP, data, AI and value realisation — designed to help leaders make better decisions.', ins, 'insights.html')

# ---------------------------------------------------------------- About
ab = hero('ABOUT EFFECTIVEPOINT', 'Senior people, <span>visible and accountable.</span>',
          'EffectivePoint is deliberately senior-led. We use experience to ask better questions, make the evidence visible and recommend only what creates value.',
          BTN_TALK.replace('btn ghost', 'btn green') + '<a class="btn ghost" href="assessment.html">Assess Your Finance Transformation</a>',
          '<a href="#leadership">Leadership</a><a href="#experience">Experience</a><a href="#values">Values</a>', img='about')
ab += ('<section class="section"><div class="wrap"><div class="section-head reveal"><h2>People-centred transformation, simple and scalable</h2>'
       '<p class="lede">Our mission is to deliver people-centred transformation that is simple and scalable, one client at a time.</p></div></div></section>')
uche = ('<article class="founder reveal"><figure class="portrait"><span class="mono" aria-hidden="true">UN</span><img src="assets/founders/uche-nnene.jpg" alt="Portrait of Dr Uche A. Nnene FCCA" loading="lazy" onerror="this.remove()"><figcaption>FOUNDER</figcaption></figure><div class="role">FINANCE · ERP · DATA · VALUE</div><h3>Dr Uche A. Nnene FCCA</h3>'
        '<p>Founder and transformation adviser with Big Four partner-level experience across Finance, ERP, business architecture, data and value realisation.</p>'
        '<ul class="points" style="margin-top:22px"><li><div><b>20+ years</b><span>Finance, ERP and transformation leadership experience.</span></div></li>'
        '<li><div><b>Sectors</b><span>Energy and utilities, retail and the public sector.</span></div></li>'
        '<li><div><b>Specialisms</b><span>Operating model change, systems modernisation, business change, cost optimisation and efficiency savings.</span></div></li>'
        '<li><div><b>Author</b><span><i>Practical Guide to Data Migration with SAP S/4HANA Migration Cockpit</i></span></div></li></ul></article>')
chid = ('<article class="founder reveal"><figure class="portrait"><span class="mono" aria-hidden="true">NC</span><img src="assets/founders/chidube-nnene-anochie.jpg" alt="Portrait of Nnene-Anochie Chidube" loading="lazy" onerror="this.remove()"><figcaption>CO-FOUNDER / PARTNER</figcaption></figure><div class="role">OPERATIONS · HSE · BUSINESS TRANSFORMATION</div><h3>Nnene-Anochie Chidube</h3>'
        '<p>Co-founder / Partner with 30+ years of C-suite operational leadership across operations excellence, HSE, asset management, sustainability and transformational change.</p>'
        '<ul class="points" style="margin-top:22px"><li><div><b>30+ years</b><span>Operational, HSE and business-transformation leadership experience.</span></div></li>'
        '<li><div><b>Focus</b><span>Turning non-technical risk into strategic value.</span></div></li>'
        '<li><div><b>Approach</b><span>Translating HSE, ESG, leadership behaviour and stakeholder alignment into measurable growth levers.</span></div></li></ul></article>')
ab += ('<section class="section paper" id="leadership"><div class="wrap"><div class="section-head reveal"><h2>Leadership you can see and speak to</h2>'
       '<p class="lede">Collective capability, with Finance Transformation at the core.</p></div>'
       f'<div class="founders">{uche}{chid}</div></div></section>')
ab += ('<section class="section" id="experience"><div class="wrap"><div class="section-head reveal"><h2>Trusted experience behind EffectivePoint</h2></div>'
       + proofbar + '</div></section>')
ab += values.replace('<section class="values">', '<section class="values" id="values">')
ab += cta_home
page('about.html', 'About EffectivePoint | EffectivePoint',
     'EffectivePoint is deliberately senior-led. Meet the leadership team behind EffectivePoint’s Finance Transformation advisory.', ab, 'about.html')

# ---------------------------------------------------------------- Contact
ct = hero('TALK TO EFFECTIVEPOINT', 'Talk to <span>EffectivePoint</span>',
          'Start with a structured assessment or speak directly with a senior EffectivePoint adviser.',
          '<a class="btn green" href="#message">Send a message →</a><a class="btn ghost" href="assessment.html">Assess Your Finance Transformation</a>', img='contact')
ct += ('<section class="section"><div class="wrap"><div class="routes">'
       '<article class="route reveal"><div class="tag">STRUCTURED</div><h3>Assess your Finance Transformation</h3>'
       '<p>A lightweight diagnostic entry point for organisations defining change or recovering transformation value.</p>'
       '<a class="btn green" href="assessment.html">Start the assessment →</a></article>'
       '<article class="route reveal"><div class="tag">DIRECT</div><h3>Speak to a senior adviser</h3>'
       '<p>Senior people, visible and accountable. Tell us what is on your mind and we will reply personally.</p>'
       '<a class="btn outline" href="#message" style="color:var(--ink)">Send a message →</a></article></div></div></section>')
ct += ('<section class="section paper" id="message"><div class="wrap form-wrap"><div class="reveal">'
       '<div class="eyebrow" style="color:var(--green);margin-bottom:18px">SEND A MESSAGE</div>'
       '<h2 style="font-size:clamp(34px,4.6vw,72px);max-width:12ch;margin-bottom:22px">Useful insight before the sales pitch.</h2>'
       '<ul class="points"><li><div><b>Email</b><span>info@effective-point.com</span></div></li>'
       '<li><div><b>LinkedIn</b><span><a href="https://www.linkedin.com/company/effectivepoint-limited/" target="_blank" rel="noopener" style="text-decoration:underline">EffectivePoint Limited</a></span></div></li>'
       '<li><div><b>Based in</b><span>London, United Kingdom</span></div></li></ul></div>'
       '<div class="form-area reveal"><form class="form" data-form data-endpoint="" data-email="info@effective-point.com" data-subject="Website enquiry" novalidate>'
       '<div class="field"><label for="c-name">Name</label><input id="c-name" name="name" autocomplete="name" required></div>'
       '<div class="field"><label for="c-email">Work email</label><input id="c-email" name="email" type="email" autocomplete="email" required></div>'
       '<div class="field"><label for="c-org">Organisation</label><input id="c-org" name="organisation" autocomplete="organization"></div>'
       '<div class="field"><label for="c-role">Role</label><input id="c-role" name="role" autocomplete="organization-title"></div>'
       '<div class="field full"><label for="c-topic">Topic</label><select id="c-topic" name="topic">'
       '<option>Define the Change</option><option>Recover the Value</option><option>ERP-enabled Transformation</option>'
       '<option>Data &amp; Finance Insight</option><option>AI &amp; Automation for Finance</option><option>Something else</option></select></div>'
       '<div class="field full"><label for="c-msg">Message</label><textarea id="c-msg" name="message" required></textarea></div>'
       '<p class="form-note full">We use these details only to reply to your enquiry. See our <a href="privacy.html" style="text-decoration:underline">Privacy notice</a>.</p>'
       '<button class="btn green" type="submit">Send message →</button></form>'
       + form_done.replace('Your request has been received.', 'Your message has been received.').replace('will reply to arrange a conversation.', 'will reply personally.')
       + '</div></div></section>')
page('contact.html', 'Talk to EffectivePoint | EffectivePoint',
     'Start with a structured assessment or speak directly with a senior EffectivePoint adviser.', ct, 'contact.html')

# ---------------------------------------------------------------- Legal pages
CO = 'EffectivePoint Limited'
CO_DETAILS = ('EffectivePoint Limited is a company registered in England and Wales (company number 03637195). '
              'Our registered office is 30 Empire House, Great Cambridge Road, Edmonton, London, N18 1EA.')
EMAIL = 'info@effective-point.com'
UPDATED = '27 November 2026'

def legal(name, title, h1, intro, sections, desc):
    nav = ''.join(f'<a href="#s{i}">{h}</a>' for i, (h, _) in enumerate(sections, 1))
    body = ''.join(f'<h2 id="s{i}">{h}</h2>{b}' for i, (h, b) in enumerate(sections, 1))
    html = hero('LEGAL', h1, f'{CO} · Last updated {UPDATED}', '', '', tone='navy compact')
    html += ('<section class="section paper"><div class="wrap legal-body"><nav class="legal-nav" aria-label="Sections">' + nav + '</nav>'
             f'<div class="prose"><p class="lede" style="color:var(--ink);margin-bottom:8px">{intro}</p>{body}</div></div></section>')
    page(name, title, desc, html)

P = lambda *ps: ''.join(f'<p>{x}</p>' for x in ps)
UL = lambda *xs: '<ul>' + ''.join(f'<li>{x}</li>' for x in xs) + '</ul>'

legal('privacy.html', 'Privacy | EffectivePoint', 'Privacy',
      'This notice explains what personal information EffectivePoint collects through this website, why, and the choices you have.',
      [('Who we are', P(CO_DETAILS, f'We are the controller of the personal information described here. You can contact us about anything in this notice at {EMAIL}.')),
       ('What we collect', P('We only collect information you choose to give us. When you use our contact form or request an assessment, we ask for:')
          + UL('your name and work email address', 'your organisation and role', 'your answers about your Finance transformation (for example, where you are on the journey and what is driving it)', 'anything you write in your message')
          + P('This website does not use analytics, advertising trackers or cookies to follow your visit. The company that hosts the website may keep standard server logs, such as IP addresses and the pages requested, to keep the site secure and running.')),
       ('How we use it', P('We use your information to:')
          + UL('reply to your enquiry or assessment request', 'arrange and prepare for a conversation you have asked for', 'keep a record of our correspondence')
          + P('Our lawful basis is our legitimate interest in responding to business enquiries and, where you ask us to, taking steps before entering into a contract with your organisation.',
              'We do not sell your information. We do not add you to marketing emails unless you ask us to.')),
       ('Who we share it with', P('We share your information only with the service providers who help us run this website and our email, and only so they can provide that service. Where any of them process data outside the UK, we make sure appropriate safeguards are in place, as UK data protection law requires.',
          'We may also disclose information if the law requires it.')),
       ('How long we keep it', P('We keep enquiry details for up to 24 months after our last contact with you. If your organisation becomes a client, we keep the records we need for the engagement and for legal and accounting purposes, normally for six years after it ends.')),
       ('Your rights', P('Under UK data protection law you can ask to see the personal information we hold about you, and ask us to correct it, delete it, restrict how we use it, or send it to you or another organisation. You can also object to us using it.',
          f'To make a request, email {EMAIL}. We will reply within one month.',
          'If you are unhappy with how we have handled your information, you can complain to the Information Commissioner’s Office at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener" style="text-decoration:underline">ico.org.uk</a>. We would appreciate the chance to put things right first.')),
       ('Changes to this notice', P(f'We will update this notice if the way we use personal information changes. The date at the top shows when it was last updated.'))],
      'How EffectivePoint Limited collects, uses and protects personal information sent through this website.')

legal('cookies.html', 'Cookies | EffectivePoint', 'Cookies',
      'This website does not use cookies.',
      [('What cookies are', P('Cookies are small files a website can store on your device, for example to remember settings or measure visits.')),
       ('Our use of cookies', P('We do not set any cookies, and we do not use analytics, advertising or social media tracking on this website. Our fonts and images are served from our own website, not from third parties.',
          'Our hosting provider may set a strictly necessary cookie to protect the site from abuse. Cookies like this do not identify you and do not need your consent.')),
       ('If this changes', P('If we add analytics or any other non-essential cookies in future, we will update this page and ask for your consent before setting them.')),
       ('Contact', P(f'Questions about this notice can be sent to {EMAIL}.'))],
      'How the EffectivePoint website uses cookies.')

legal('terms.html', 'Terms | EffectivePoint', 'Terms',
      'These terms apply to your use of this website. By using it, you accept them.',
      [('About us', P(CO_DETAILS, f'You can contact us at {EMAIL}.')),
       ('Using this website', P('You may use this website for your own information and to contact us. You must not misuse it, for example by trying to gain unauthorised access, introducing harmful code or interfering with how it works.')),
       ('Information, not advice', P('The content on this website, including our insights, is general information. It is not professional advice for your organisation’s circumstances, and you should not rely on it as such. Advice is given only under a written engagement with us.')),
       ('Intellectual property', P(f'The content, design and branding of this website belong to {CO} or are used with permission. You may view and share pages for your own non-commercial purposes with a link back to us. Any other use needs our written permission.')),
       ('Links to other websites', P('Where we link to other websites, such as LinkedIn, we do so for your convenience. We are not responsible for their content or how they handle your information.')),
       ('Our liability', P('We take care to keep this website accurate and available, but we do not guarantee that it will always be complete, current or uninterrupted. As far as the law allows, we are not liable for any loss arising from your use of, or reliance on, this website.',
          'Nothing in these terms limits liability that cannot be limited by law, such as liability for death or personal injury caused by negligence, or for fraud.')),
       ('Changes and governing law', P('We may update these terms from time to time; the date at the top shows the latest version.',
          'These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction.'))],
      'Terms of use for the EffectivePoint website.')


# ---------------------------------------------------------------- 404, sitemap, robots
nf = hero('PAGE NOT FOUND', 'This page has <span>moved or never existed.</span>',
          'The link may be out of date. These are good places to start.',
          '<a class="btn green" href="index.html">Go to the homepage →</a><a class="btn ghost" href="contact.html">Talk to EffectivePoint</a>',
          '<a href="finance-transformation.html">Finance Transformation</a><a href="assessment.html">Assessment</a><a href="insights.html">Insights</a><a href="about.html">About</a>')
page('404.html', 'Page not found | EffectivePoint', 'The page you were looking for could not be found.', nf,
     extra_head='<base href="/">', listed=False)

import datetime
today = datetime.date.today().isoformat()
urls = [f'{SITE}/'] + [f'{SITE}/{n}' for n in BUILT]
(site / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + ''.join(f'  <url><loc>{u}</loc><lastmod>{today}</lastmod></url>\n' for u in urls) + '</urlset>\n')
(site / 'robots.txt').write_text(f'User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n')
print('wrote sitemap.xml with', len(urls), 'URLs, robots.txt')
