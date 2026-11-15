/* Projeto Lelouch: modo offline. Coloque este arquivo na mesma pasta do index.html. */
const C="lelouch-v1",CORE=["./","./index.html","./manifest.json","./stockfish-19-lite-single.js","./stockfish-19-lite-single.wasm"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>0)))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
if(/lichess/.test(u.hostname)||u.protocol.indexOf("http")!==0)return;
const nav=r.mode==="navigate"||/\/index\.html$/.test(u.pathname);
const keep=res=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>0)}return res};
if(nav){e.respondWith(fetch(r).then(keep).catch(()=>caches.match(r).then(h=>h||caches.match("./index.html")||caches.match("./"))));return}
e.respondWith(caches.match(r).then(h=>{const n=fetch(r).then(keep).catch(()=>h);return h||n}))});
