// Step 1: download the classroom tree, every open lesson and every attached file.
// Usage: node export.mjs <out-dir>   (SKOOL_GROUP defaults to makerschool)
import { nd, G, COOKIE } from "./skool.mjs";
import { writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
const dir = process.argv[2]; if (!dir) throw new Error("usage: node export.mjs <out-dir>");
mkdirSync(`${dir}/lessons`, { recursive: true }); mkdirSync(`${dir}/files`, { recursive: true });
const H = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36", Cookie: COOKIE, Accept: "application/json", Origin: "https://www.skool.com", Referer: "https://www.skool.com/" };
const sleep = ms => new Promise(r => setTimeout(r, ms)); // keep requests gentle
const cls = await nd(`/${G}/classroom`, { group: G });
writeFileSync(`${dir}/classroom.json`, JSON.stringify(cls));
let lessons = 0, files = 0, fails = 0;
for (const c of cls.allCourses) {
  let pp = await nd(`/${G}/classroom/${c.name}`, { group: G, course: c.name });
  if (pp.__N_REDIRECT) { const md = new URL(pp.__N_REDIRECT, "https://x").searchParams.get("md"); await sleep(700); pp = await nd(`/${G}/classroom/${c.name}`, { group: G, course: c.name, ...(md ? { md } : {}) }); }
  if (!pp.course) { console.log("skipped course", c.metadata.title); continue; }
  writeFileSync(`${dir}/course-${c.name}.json`, JSON.stringify(pp));
  const mods = []; const walk = x => { if (x.course.unitType === "module" && x.course.metadata.hasAccess === 1) mods.push(x.course); (x.children || []).forEach(walk); }; walk(pp.course);
  for (const m of mods) {
    const out = `${dir}/lessons/${m.id}.json`;
    if (!existsSync(out)) {
      try { const p = await nd(`/${G}/classroom/${c.name}`, { group: G, course: c.name, md: m.id });
        let sel; const w = x => { if (x.course.id === m.id) sel = x.course; (x.children || []).forEach(w); }; w(p.course);
        writeFileSync(out, JSON.stringify({ course: c.name, unit: sel, video: p.video ?? null })); lessons++;
      } catch (e) { fails++; console.log("lesson failed", m.id, e.message); await sleep(5000); }
      await sleep(800);
    }
    let res = []; try { res = JSON.parse(m.metadata.resources || "[]"); } catch {}
    for (const r of res) {
      if (!r.file_id || existsSync(`${dir}/files/${r.file_id}`)) continue;
      try { const u = (await (await fetch(`https://api2.skool.com/files/${r.file_id}/download-url?expire=28800`, { method: "POST", headers: H })).text()).trim().replace(/^"|"$/g, "");
        const f = await fetch(u); if (!f.ok) throw new Error("download " + f.status);
        writeFileSync(`${dir}/files/${r.file_id}`, Buffer.from(await f.arrayBuffer())); files++;
      } catch (e) { fails++; console.log("file failed", r.file_name, e.message); }
      await sleep(600);
    }
  }
  console.log(c.metadata.title, "done");
}
console.log(`new lessons ${lessons}, new files ${files}, failures ${fails}, files total ${readdirSync(dir + "/files").length}`);
