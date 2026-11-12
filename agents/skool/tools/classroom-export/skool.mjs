import { readFileSync, writeFileSync } from "node:fs"; import { homedir } from "node:os";
const raw = process.env.SKOOL_COOKIES || JSON.parse(readFileSync(homedir()+"/.config/skool-mcp/config.json","utf8")).cookies;
const C = raw.includes("=") ? raw : "auth_token="+raw;
export const G = process.env.SKOOL_GROUP || "makerschool";
const UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const H={ "User-Agent":UA, Cookie:C, Accept:"application/json" };
let bid;
export const COOKIE = C;
export async function nd(path, q={}) {
  if(!bid){ const h=await (await fetch("https://www.skool.com/",{headers:H})).text(); bid=h.match(/"buildId"\s*:\s*"([^"]+)"/)[1]; }
  const u=new URL(`https://www.skool.com/_next/data/${bid}${path}.json`); for(const[k,v] of Object.entries(q)) u.searchParams.set(k,v);
  const r=await fetch(u,{headers:H}); if(!r.ok) throw new Error(r.status+" "+path); return (await r.json()).pageProps;
}
