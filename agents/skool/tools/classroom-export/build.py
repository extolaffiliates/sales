import json, os, sys, html, re, shutil, zipfile, collections
D=sys.argv[1]; OUT=sys.argv[2]; os.makedirs(OUT, exist_ok=True)
E=html.escape
def inl(n):
    if n.get('type')=='text':
        t=E(n.get('text',''))
        for mk in n.get('marks',[]) or []:
            ty=mk.get('type')
            if ty=='bold': t=f'<b>{t}</b>'
            elif ty=='italic': t=f'<i>{t}</i>'
            elif ty=='code': t=f'<code>{t}</code>'
            elif ty=='link': t=f'<a href="{E(mk.get("attrs",{}).get("href",""))}">{t}</a>'
        return t
    if n.get('type')=='hardBreak': return '<br>'
    return ''.join(inl(c) for c in n.get('content',[]) or [])
def blk(n):
    ty=n.get('type'); c=n.get('content',[]) or []
    if ty=='paragraph': return f'<p>{inl(n)}</p>'
    if ty=='heading': l=min(6,(n.get('attrs') or {}).get('level',3)+2); return f'<h{l}>{inl(n)}</h{l}>'
    if ty in('bulletList','orderedList'): tg='ul' if ty=='bulletList' else 'ol'; return f'<{tg}>'+''.join(f'<li>{"".join(blk(x) for x in li.get("content",[]))}</li>' for li in c)+f'</{tg}>'
    if ty=='codeBlock': return f'<pre>{E("".join(x.get("text","") for x in c))}</pre>'
    if ty=='blockquote': return '<blockquote>'+''.join(blk(x) for x in c)+'</blockquote>'
    if ty=='image': return f'<p>[image: <a href="{E((n.get("attrs") or {}).get("src",""))}">link</a>]</p>'
    if ty=='horizontalRule': return '<hr>'
    return ''.join(blk(x) for x in c) or inl(n) and f'<p>{inl(n)}</p>'
def desc(s):
    if not s: return ''
    if s.startswith('[v2]'):
        try: return ''.join(blk(b) for b in json.loads(s[4:]))
        except Exception: return f'<p>{E(s[4:])}</p>'
    return f'<p>{E(s)}</p>'
def safe(s): return re.sub(r'[\\/:*?"<>|]+','-',s).strip()[:120]
cls=json.load(open(f'{D}/classroom.json'))['allCourses']
summary=[]; allfiles=[]; links=[]
for i,c in enumerate(cls,1):
    ct=c['metadata']['title']; f=f'{D}/course-{c["name"]}.json'
    if not os.path.exists(f): continue
    tree=json.load(open(f))['course']
    parts=[f'<h1>{E(ct)}</h1>', desc(c['metadata'].get('desc','')),
           f'<p><i>Source: skool.com/makerschool/classroom/{c["name"]}. Exported 12 Nov 2026 for internal use by Extol Affiliates. Content belongs to Maker School.</i></p>']
    st=collections.Counter(); fdir=f'{OUT}/files/{i:02d} {safe(ct)}'
    def walk(x, depth, path):
        u=x['course']; m=u.get('metadata',{}); t=m.get('title','')
        if u['unitType']=='set': parts.append(f'<h2>{E(t)}</h2>'); path=path+[t]
        elif u['unitType']=='module':
            st['lessons']+=1
            if m.get('hasAccess')!=1:
                st['locked']+=1; parts.append(f'<h3>{E(t)}</h3><p><i>Locked for this account (released on Skool\'s drip schedule).</i></p>'); return
            lf=f'{D}/lessons/{u["id"]}.json'
            if os.path.exists(lf): m=json.load(open(lf))['unit']['metadata']
            else: st['missing']+=1
            parts.append(f'<h3>{E(t)}</h3>')
            parts.append(f'<p><a href="https://www.skool.com/makerschool/classroom/{c["name"]}?md={u["id"]}">Open lesson in Skool</a>'+(f' · <a href="{E(m["videoLink"])}">Video</a> ({round(m.get("videoLenMs",0)/60000)} min)' if m.get('videoLink') else '')+'</p>')
            if m.get('videoLink'): st['videos']+=1
            parts.append(desc(m.get('desc','')))
            try: res=json.loads(m.get('resources') or '[]')
            except Exception: res=[]
            if res:
                li=[]
                for r in res:
                    if r.get('file_id'):
                        src=f'{D}/files/{r["file_id"]}'
                        if os.path.exists(src):
                            os.makedirs(fdir,exist_ok=True); name=safe(f'{t} - {r.get("file_name") or r["title"]}')
                            shutil.copy(src, f'{fdir}/{name}'); allfiles.append((ct,name)); st['files']+=1
                            li.append(f'<li>{E(r.get("title",""))}: file <b>{E(name)}</b> (in the "{i:02d} {E(safe(ct))}" files zip)</li>')
                        else: st['filefail']+=1; li.append(f'<li>{E(r.get("title",""))}: {E(r.get("file_name",""))} (download failed)</li>')
                    elif r.get('link'):
                        st['links']+=1; links.append((ct,t,r.get('title',''),r['link'])); li.append(f'<li><a href="{E(r["link"])}">{E(r.get("title") or r["link"])}</a></li>')
                parts.append('<p><b>Resources</b></p><ul>'+''.join(li)+'</ul>')
        for ch in x.get('children') or []: walk(ch, depth+1, path)
    walk(tree,0,[])
    open(f'{OUT}/{i:02d} {safe(ct)}.html','w').write('<html><head><meta charset="utf-8"></head><body>'+''.join(parts)+'</body></html>')
    summary.append((i,ct,dict(st)))
for i,ct,st in summary: print(f'{i:02d} {ct:28} {st}')
# zips
for d in sorted(os.listdir(f'{OUT}/files')) if os.path.exists(f'{OUT}/files') else []:
    with zipfile.ZipFile(f'{OUT}/{d} - files.zip','w',zipfile.ZIP_DEFLATED) as z:
        for fn in sorted(os.listdir(f'{OUT}/files/{d}')): z.write(f'{OUT}/files/{d}/{fn}', fn)
json.dump({'summary':summary,'links':links}, open(f'{OUT}/summary.json','w'))
print('links', len(links), 'files', len(allfiles))
