const CACHE="locum-guide-v2-6-5-20261123";
const ASSETS=["./","./index.html","./styles.css","./app.js","./cases-respiratory.js","./cases-paeds-asthma.js","./cases-ent.js","./cases-acute.js","./cases-derm1.js","./cases-derm2.js","./cases-msk.js","./cases-locum2.js","./derm-guide.js","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener("fetch",e=>{
  const req=e.request;
  // Only handle same-origin GET; let Google Forms / external guideline links go straight to the network.
  if(req.method!=="GET"||new URL(req.url).origin!==self.location.origin) return;
  e.respondWith(fetch(req,{cache:"no-cache"}).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return r}).catch(()=>caches.match(req,{ignoreSearch:false}).then(m=>m||caches.match(req,{ignoreSearch:true}))));
});
