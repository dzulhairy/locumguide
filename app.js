const reviewed = "5 October 2026";
const categories = ["All","Respiratory","ENT","Eye","Dental","Dermatology","Paediatrics","GI","GU","O&G","Sexual health","MSK","Neurology","Endocrine","Infection","Emergency"];
let activeCategory = "All";
const cases = window.LOCUM_CASES || [];
const caseTools = {
  "influenza":[["oseltamivir","Oseltamivir"],["paracetamol","Paracetamol"]],
  "cap":[["amoxicillin-high","High-dose amoxicillin"]],
  "aeba-paediatric":[["aeba-bundle","AEBA bundle"],["prednisolone-asthma","Prednisolone"],["salbutamol-neb","Salbutamol neb"]],
  "aom":[["amoxicillin-high","High-dose amoxicillin"],["coamox14","Co-amoxiclav 14:1"],["cefuroxime","Cefuroxime"]],
  "rhinosinusitis":[["cefuroxime","Cefuroxime (child)"]],
  "pharyngitis":[["amox-gas","Amoxicillin GAS"],["azithro5","Azithromycin"]],
  "gastroenteritis":[["ors-plan-b","ORS Plan B"],["maintenance-deficit","Maintenance + deficit"]],
  "dengue":[["paracetamol","Paracetamol"]],
  "anaphylaxis":[["adrenaline","IM adrenaline"]],
  "varicella":[["acyclovir-varicella","Acyclovir"],["paracetamol","Paracetamol"]],
  "impetigo":[["cloxacillin-ssti","Cloxacillin (child)"]],
  "cellulitis":[["cloxacillin-ssti","Cloxacillin (child)"],["cephalexin","Cephalexin (child)"]],
  "dengue-paeds":[["paracetamol-dengue","Paracetamol (dengue 10 mg/kg)"],["maintenance-fluid","Maintenance fluid"]],
  "hfmd":[["paracetamol","Paracetamol"]],
  "measles":[["paracetamol","Paracetamol"],["ors-plan-b","ORS Plan B"]],
  "croup":[["dexamethasone-croup","Croup (PP5)"]],
  "febrile-seizure":[["seizure-benzo","Seizure >5 min (benzodiazepine)"],["paracetamol","Paracetamol"]],
  "preseptal-cellulitis":[["coamox14","Co-amoxiclav 14:1"],["coamox7","Co-amoxiclav 7:1"],["cephalexin","Cephalexin"]],
  "uti-paeds":[["nitrofurantoin-uti","Nitrofurantoin"],["coamox14","Co-amoxiclav 14:1"],["coamox7","Co-amoxiclav 7:1"],["cephalexin","Cephalexin"]],
  "skin-abscess":[["cephalexin","Cephalexin (child)"],["cloxacillin-ssti","Cloxacillin (child)"]],
  "bronchiolitis":[["maintenance-fluid","Maintenance fluid"]],
  "otorrhoea-child":[["amoxicillin-high","High-dose amoxicillin"],["coamox14","Co-amoxiclav 14:1"],["cefuroxime","Cefuroxime"],["paracetamol","Paracetamol"]]
};
const quickIds = ["aeba-paediatric","influenza","aom","pharyngitis","gastroenteritis","uti","dengue","dengue-paeds","hfmd","croup","conjunctivitis","gout","migraine","acs","anaphylaxis"];
const els = {
  search: document.getElementById("searchInput"), clear: document.getElementById("clearBtn"), results: document.getElementById("results"),
  chips: document.getElementById("quickChips"), categories: document.getElementById("categoryFilters"), count: document.getElementById("topicCount"),
  age: document.getElementById("ageInput"), weight: document.getElementById("weightInput"), concentration: document.getElementById("concentrationInput"),
  dehydration: document.getElementById("dehydrationInput"), doseSelect: document.getElementById("doseToolSelect"), dose: document.getElementById("dosePanel")
};
function norm(s){return (s||"").toLowerCase().trim();}
function round(n,d=2){const p=10**d; return Math.round(n*p)/p;}
function inCategory(c){return activeCategory==="All" || c.category===activeCategory || (c.tags||[]).includes(activeCategory);}
function scoreCase(c,q){
  if(!q) return 1;
  const hay=[c.title,c.category,...(c.tags||[]),...c.synonyms,...c.assessment,...c.treatment,...c.meds].join(" ").toLowerCase();
  if(norm(c.title)===q) return 100;
  if(c.synonyms.some(s=>norm(s)===q)) return 90;
  if(hay.includes(q)) return 50;
  const toks=q.split(/\s+/).filter(Boolean), hits=toks.filter(t=>hay.includes(t)).length;
  if(toks.length>1 && hits===toks.length) return 30;
  return looseSearch ? hits*5 : 0;
}
let looseSearch=false;
function section(title,items,cls="block"){
  if(!items?.length) return "";
  return `<section class="${cls}"><h3>${title}</h3><ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul></section>`;
}
function fold(title,items){
  if(!items?.length) return "";
  return `<details class="block fold"><summary>${title}</summary><ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul></details>`;
}
function toolButtons(c){
  const tl=caseTools[c.id]; if(!tl) return "";
  return `<div class="case-tools"><span class="small">${t("doseTool")}</span>${tl.map(([v,l])=>`<button type="button" class="chip tool-link" data-tool="${v}">${l} →</button>`).join("")}</div>`;
}
// ---- favourites & recently viewed (stored only in this browser) ----
function loadList(k){try{const v=JSON.parse(localStorage.getItem(k)||"[]");return Array.isArray(v)?v.filter(id=>cases.some(c=>c.id===id)):[];}catch(e){return [];}}
function saveList(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
let favs=loadList("lqg-fav"), recents=loadList("lqg-recent");
function toggleFav(id){favs=favs.includes(id)?favs.filter(x=>x!==id):[id,...favs];saveList("lqg-fav",favs);renderPersonal();
  document.querySelectorAll(`.star[data-id="${id}"]`).forEach(b=>{const on=favs.includes(id);b.classList.toggle("on",on);b.textContent=on?"★":"☆";b.setAttribute("aria-label",t(on?"unstar":"star"));b.setAttribute("aria-pressed",String(on));});}
function addRecent(id){recents=[id,...recents.filter(x=>x!==id)].slice(0,6);saveList("lqg-recent",recents);renderPersonal();}
function showCase(c){openCase(c.id);}
function chipFor(c){const b=document.createElement("button");b.type="button";b.className="chip";b.textContent=c.title;b.onclick=()=>showCase(c);return b;}
function renderPersonal(){
  [["favRow","favChips",favs],["recentRow","recentChips",recents]].forEach(([row,box,list])=>{
    const r=document.getElementById(row), el=document.getElementById(box); el.innerHTML="";
    list.forEach(id=>{const c=cases.find(x=>x.id===id); if(c) el.appendChild(chipFor(c));});
    r.classList.toggle("hidden",!list.length);
  });
}
function openLightbox(im){
  let lb=document.getElementById("lightbox");
  if(!lb){lb=document.createElement("div");lb.id="lightbox";lb.className="lightbox";lb.setAttribute("role","dialog");lb.setAttribute("aria-modal","true");document.body.appendChild(lb);
    lb.addEventListener("click",e=>{if(e.target===lb||e.target.closest(".lb-close")) lb.classList.remove("show");});
    document.addEventListener("keydown",e=>{if(e.key==="Escape") lb.classList.remove("show");});}
  const lg=getLang();
  lb.innerHTML=`<figure><button type="button" class="lb-close" aria-label="Close">✕</button><img src="${im.src}" alt="${im.cap[lg]}"><figcaption>${im.cap[lg]}<br><span class="credit">${t("photoBy")}: <a href="${im.page}" target="_blank" rel="noopener noreferrer">${im.author}</a>, ${im.license}</span></figcaption></figure>`;
  lb.classList.add("show");
}
function gallery(c){
  const imgs=(window.CASE_IMAGES||{})[c.id]; if(!imgs||!imgs.length) return "";
  const lg=getLang(), sensitive=c.id==="genital-ulcer";
  return `<details class="block fold gallery"${sensitive?"":" open"}><summary>📷 ${t("photos")} (${imgs.length})${sensitive?` — ${t("sensitive")}`:""}</summary>
    <div class="gal-row">${imgs.map((im,i)=>`<figure class="gal-item"><button type="button" class="gal-open" data-id="${c.id}" data-i="${i}" aria-label="${t("enlarge")}"><img src="${im.src}" alt="${im.cap[lg]||im.cap.ms}" loading="lazy" width="${im.w}" height="${im.h}"></button><figcaption>${im.cap[lg]||im.cap.ms}<span class="credit">${t("photoBy")}: <a href="${im.page}" target="_blank" rel="noopener noreferrer">${im.author}</a>, ${im.license}</span></figcaption></figure>`).join("")}</div>
  </details>`;
}
function counselBlock(c){
  if(!c.counsel) return "";
  const items=c.counsel[getLang()]||c.counsel.ms;
  return `<details class="block fold counsel" open><summary>${t("counsel")}</summary><ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul><button type="button" class="rx-copy counsel-copy" data-id="${c.id}">📋 ${t("copyCounsel")}</button></details>`;
}
function counselText(c){
  const items=c.counsel[getLang()]||c.counsel.ms; const tmp=document.createElement("div");
  return `${c.title}\n`+items.map(x=>{tmp.innerHTML=x;return "• "+tmp.textContent;}).join("\n");
}
function card(c){
  const on=favs.includes(c.id);
  return `<article class="case-card" data-id="${c.id}">
    <div class="case-head"><div><h2>${c.title}</h2><div class="category">${[c.category,...(c.tags||[])].join(" · ")}</div></div>
      <div class="head-side"><button type="button" class="star${on?" on":""}" data-id="${c.id}" aria-pressed="${on}" aria-label="${t(on?"unstar":"star")}">${on?"★":"☆"}</button><span class="evidence">${c.evidence}</span></div></div>
    ${section(t("redFlags"),c.redFlags,"redflags")}
    ${gallery(c)}
    ${toolButtons(c)}
    <div class="case-body">
      ${section(t("treatment"),c.treatment)}
      <section class="block"><h3>${t("medication")}</h3>${c.meds.map(x=>`<div class="med">${x}</div>`).join("")}</section>
      ${counselBlock(c)}
      ${fold(t("assessment"),c.assessment)}
      ${fold(t("prevention"),c.prevention)}
      ${fold(t("referral"),c.referral)}
      <details class="block fold source-list"><summary>${t("sources")}</summary>${c.sources.map(([tt,u])=>`<a href="${u}" target="_blank" rel="noopener noreferrer">${tt}</a>`).join("")}<p class="small">${t("reviewedOn")} ${c.reviewed||reviewed}. ${t("reviewNote")}</p></details>
    </div>
  </article>`;
}
// Age group per topic: A = adult, C = child, B = both (shown in both lists).
const AGE={
  "asthma-exacerbation":"A","uti":"A","dengue":"A","hypertension":"A","zoster":"A","oa-knee":"A","low-back-pain":"A",
  "uti-pregnancy":"A","vaginal-discharge":"A","urethral-discharge":"A","genital-ulcer":"A","pid":"A","mastitis":"A",
  "h-pylori-dyspepsia":"A","gout":"A","hypoglycaemia":"A","acs":"A","migraine":"A","renal-colic":"A","dysmenorrhoea":"A",
  "hyperglycaemic-crisis":"A","copd-exacerbation":"A","herpes-simplex-skin":"A","dental-abscess":"A",
  "aeba-paediatric":"C","measles":"B","dengue-paeds":"C","hfmd":"C","croup":"C","bronchiolitis":"C","febrile-seizure":"C","uti-paeds":"C","otorrhoea-child":"C"
};
const ageOf=c=>AGE[c.id]||"B";
let openId=null;
function row(c){
  const ag=ageOf(c), badge=ag==="A"?t("adultShort"):ag==="C"?t("childShort"):t("bothShort");
  return `<button type="button" class="case-row" data-open="${c.id}"><span class="row-main"><span class="row-title">${favs.includes(c.id)?"★ ":""}${c.title}</span><span class="row-meta">${[c.category,...(c.tags||[])].filter(x=>x!=="Paediatrics").join(" · ")} · <span class="age-pill age-${ag}">${badge}</span></span></span><span class="chev" aria-hidden="true">›</span></button>`;
}
function listSection(title,items){
  if(!items.length) return "";
  return `<section class="case-list"><h3 class="list-head">${title} <span class="count-badge">${items.length}</span></h3>${items.map(row).join("")}</section>`;
}
function openCase(id,scroll=true){
  openId=id; addRecent(id); render();
  if(scroll) document.getElementById("results").scrollIntoView({behavior:"smooth",block:"start"});
}
function render(){
  const q=norm(els.search.value);
  const rank=()=>cases.filter(inCategory).map(c=>[c,scoreCase(c,q)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
  looseSearch=false; let ranked=rank();
  let partial=false;
  if(!ranked.length && q){looseSearch=true; ranked=rank(); looseSearch=false; partial=ranked.length>0;}
  els.count.textContent=`${ranked.length} ${ranked.length===1?t("topic1"):t("topics")}`;
  // detail view
  const open=openId && cases.find(c=>c.id===openId);
  if(open){
    els.results.innerHTML=`<button type="button" class="back-btn" id="backToList">← ${t("backToList")}</button>${card(open)}`;
    return;
  }
  if(!ranked.length){els.results.innerHTML=`<div class="empty"><strong>${t("noTopic")}</strong><br>${t("noTopicBody")}</div>`;return;}
  // a precise search (single match) opens the card directly
  if(q && ranked.length===1 && !partial){ openId=ranked[0].id; addRecent(openId); return render(); }
  const pre=partial?`<div class="empty"><strong>${t("partial")}</strong> ${t("partialBody")}</div>`:"";
  let body;
  if(q){ body=listSection(t("results"),ranked); }
  else {
    const byTitle=[...ranked].sort((a,b)=>a.title.localeCompare(b.title));
    const adult=byTitle.filter(c=>ageOf(c)!=="C"), child=byTitle.filter(c=>ageOf(c)!=="A");
    body = activeCategory==="All" ? listSection(t("allTopics"),byTitle)
         : activeCategory==="Paediatrics" ? listSection("👶 "+t("child"),child)
         : listSection("🧑 "+t("adult"),adult)+listSection("👶 "+t("child"),child);
  }
  els.results.innerHTML=pre+body;
}
function renderCategories(){
  els.categories.innerHTML="";
  const qr=document.getElementById("quickChips"); if(qr&&qr.parentElement) qr.parentElement.classList.toggle("hidden",activeCategory!=="All");
  categories.forEach(cat=>{const b=document.createElement("button"); b.type="button"; b.className=`chip ${activeCategory===cat?"active":""}`; b.textContent=cat==="All"?(getLang()==="ms"?"Semua":"All"):cat; b.onclick=()=>{activeCategory=cat;openId=null;renderCategories();render();if(cat!=="All") els.results.scrollIntoView({behavior:"smooth",block:"start"});}; els.categories.appendChild(b);});
}
function renderQuick(){
  els.chips.innerHTML="";
  quickIds.forEach(id=>{const c=cases.find(x=>x.id===id);if(c) els.chips.appendChild(chipFor(c));});
}
// Syrup / tablet strengths stocked (confirmed against clinic stock 23 Nov 2026).
// s = mg active drug per 5 mL (amoxicillin component for co-amoxiclav). Edit here if stock changes.
const STOCK={
  paracetamol:{rx:"Paracetamol",syr:[{s:120},{s:250}],tab:[500]},
  ibuprofen:{rx:"Ibuprofen",syr:[{s:100}]},
  amoxicillin:{rx:"Amoxicillin",syr:[{s:125},{s:250}]},
  coamox7:{rx:"Co-amoxiclav",syr:[{s:200,name:"228 mg/5 mL (amox 200)",rxs:"228mg/5ml"},{s:400,name:"457 mg/5 mL (amox 400)",rxs:"457mg/5ml"}]},
  coamox14:{rx:"Co-amoxiclav ES",syr:[{s:600,name:"642.9 mg/5 mL ES (amox 600)",rxs:"642.9mg/5ml"}]},
  azithromycin:{rx:"Azithromycin",syr:[{s:200}]},
  cefuroxime:{rx:"Cefuroxime",syr:[{s:125}]},
  cephalexin:{rx:"Cephalexin",syr:[{s:125},{s:250}]},
  cloxacillin:{rx:"Cloxacillin",syr:[{s:125}]},
  acyclovir:{rx:"Acyclovir",syr:[{s:200}],tab:[200,800]},
  oseltamivir:{rx:"Oseltamivir",syr:[{s:30,name:"6 mg/mL (30 mg/5 mL)",rxs:"6mg/ml"}],tab:[30,45,75],cap:true},
  prednisolone:{rx:"Prednisolone",tab:[5]}
};
function mlFmt(x){return round(x,1);}
function stepOf(ml){return ml<5?0.1:ml<10?0.2:0.5;}
function roundStep(ml,dir="near"){if(Math.abs(ml*2-Math.round(ml*2))<0.02) return round(Math.round(ml*2)/2,1);const st=stepOf(ml),f=dir==="up"?Math.ceil:dir==="down"?Math.floor:Math.round;return round(f(ml/st-1e-9*(dir==="up"?1:dir==="down"?-1:0))*st,1);}
function escAttr(x){return String(x).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");}
function copyBtn(text){return `<button type="button" class="rx-copy" data-rx="${escAttr(text)}" aria-label="${t("copyRx")}: ${escAttr(text)}">📋 ${t("copy")}</button>`;}
function syrupBlock(o){
  const st=STOCK[o.drug]; if(!st) return "";
  const rxTail=(o.rx?.code?" "+o.rx.code:"")+(o.rx?.dur?" x "+o.rx.dur:"");
  let rows="", rxAll=[];
  (st.syr||[]).forEach(v=>{
    o.rows.forEach(r=>{
      const lo=r.low*5/v.s, hi=(r.high??r.low)*5/v.s, range=r.high!=null&&Math.abs(hi-lo)>0.05;
      let prac, rxMl;
      if(range){const a=roundStep(lo,"up"),b=roundStep(hi,"down"); prac=a<=b?`${a===b?a:a+"–"+b} mL`:"—"; rxMl=a<=b?(a===b?`${a}ml`:`${a}-${b}ml`):`${mlFmt(lo)}-${mlFmt(hi)}ml`;}
      else {let m=roundStep(lo); if(o.maxMg&&m*v.s/5>o.maxMg) m=roundStep(lo,"down"); prac=Math.abs(m-lo)>0.05?`${m} mL (${round(m*v.s/5,0)} mg)`:"—"; rxMl=`${m}ml`;}
      const rxText=`Syr ${st.rx} ${v.rxs||v.s+"mg/5ml"} ${rxMl}${r.rxCode?" "+r.rxCode:rxTail}`;
      rxAll.push(rxText);
      rows+=`<tr><td>${o.rows.length>1?`<strong>${r.name}</strong><br>`:""}${v.name||v.s+" mg/5 mL"}</td><td><strong class="ml-big">${range?mlFmt(lo)+"–"+mlFmt(hi):mlFmt(lo)} mL</strong><br><span class="prac">${prac==="—"?"":t("measure")+" "+prac}</span></td><td>${copyBtn(rxText)}</td></tr>`;
    });
  });
  let tabs="";
  if(st.tab) o.rows.forEach(r=>{
    const mg=r.high!=null?r.high:r.low;
    const opts=st.tab.map(x=>{const n=st.cap?Math.round(mg/x):Math.round(mg/x*2)/2; return {t:x,n,d:n*x};}).filter(x=>x.n>0&&Math.abs(x.d-mg)/mg<=0.1&&(r.high==null||x.d>=r.low-0.01));
    if(opts.length){const x=opts[0], form=st.cap?"Cap":"Tab", rxText=`${form} ${st.rx} ${x.t}mg ${x.n} ${st.cap?"cap":"tab"}${r.rxCode?" "+r.rxCode:rxTail}`;
      tabs+=`<p class="freq-line">💊 ${o.rows.length>1?r.name+": ":""}${st.cap?t("capsule"):t("tablet")} ${x.t} mg: <strong>${x.n} ${t("pcs")}</strong> (${round(x.d,1)} mg) ${copyBtn(rxText)}</p>`;}
  });
  return `${rows?`<div class="table-scroll syrup-table"><table class="clinical-table" style="min-width:0"><thead><tr><th>${t("syrup")}</th><th>${t("perDose")}</th><th>Rx</th></tr></thead><tbody>${rows}</tbody></table></div>`:""}
  ${tabs}${o.freq?`<p class="freq-line">⏱ <strong>${o.freq}</strong></p>`:""}
  ${rows?`<p class="small">${t("roundNote")}${o.maxMg?t("roundMax"):""}. ${t("checkLabel")}</p>`:""}`;
}
async function copyText(text){
  try{ await navigator.clipboard.writeText(text); return true; }catch(e){
    try{ const ta=document.createElement("textarea"); ta.value=text; ta.setAttribute("readonly",""); ta.style.position="fixed"; ta.style.opacity="0"; document.body.appendChild(ta); ta.select(); const ok=document.execCommand("copy"); ta.remove(); return ok; }catch(_){ return false; }
  }
}
function liquidText(mg,conc){if(!conc||conc<=0)return ""; return ` ≈ <strong>${round(mg*5/conc,2)} mL</strong> at ${conc} mg/5 mL`;}
function doseTool(){
  const tool=els.doseSelect.value, ageVal=parseFloat(els.age.value), weight=parseFloat(els.weight.value), conc=parseFloat(els.concentration.value), dehydrationVal=parseFloat(els.dehydration.value);
  const age=Number.isFinite(ageVal)?ageVal:null, dehydration=Number.isFinite(dehydrationVal)?dehydrationVal:null;
  if(!tool){els.dose.classList.add("hidden");return;}
  if(!Number.isFinite(weight)||weight<=0){els.dose.innerHTML=`<h3>${t("doseResult")}</h3><p class="dose-answer">${t("enterWeight")}</p>`;els.dose.classList.remove("hidden");return;}
  let answer="",note="",caution="",syr=null;
  let weightWarn="";
  if(weight>150) weightWarn="Weight above 150 kg — check for a typing error.";
  else if(age!==null && age<1 && weight>15) weightWarn="Weight looks high for an infant — check age (years) and weight (kg).";
  else if(age!==null && age<12 && weight>90) weightWarn="Weight looks high for this age — check entry.";
  if(tool==="paracetamol"){
    const mg=Math.min(weight*15,1000);
    answer=`${t("singleDose")}: <strong>${round(mg,1)} mg</strong> (15 mg/kg${weight*15>1000?", max 1 g":""})${liquidText(mg,conc)}`;
    syr={drug:"paracetamol",rows:[{low:mg}],freq:t("f_pcm"),maxMg:1000,rx:{code:"4-6 hourly PRN (max 4x/day)"}};
    note="Common paediatric reference: 15 mg/kg/dose; do not exceed 4 doses in 24 hours. Confirm age-specific/product instructions.";
    caution="Check duplicate paracetamol-containing products and liver disease/overdose risk.";
  } else if(tool==="paracetamol-dengue"){
    const mg=Math.min(weight*10,1000);
    answer=`${t("dengue")} — ${t("singleDose")}: <strong>${round(mg,1)} mg</strong> (10 mg/kg)${liquidText(mg,conc)}`;
    syr={drug:"paracetamol",rows:[{low:mg}],freq:t("f_pcmDengue"),maxMg:1000,rx:{code:"6-8 hourly PRN (max 3-4x/day)"}};
    note="MaHTAS CPG Dengue in Children (2nd ed.): paracetamol 10 mg/kg/dose, max 3–4 doses/24 h — dose reduced because of the theoretical risk of liver injury. Tepid sponge if still febrile.";
    caution="Do NOT give aspirin, ibuprofen/other NSAIDs or IM injections in suspected dengue.";
  } else if(tool==="dexamethasone-croup"){
    const mild=weight*0.15, modLo=weight*0.3, modHi=weight*0.6, predLo=weight*1, predHi=weight*2, adrMl=Math.min(weight*0.5,5);
    answer=`<strong>Mild (Westley ≤2):</strong> dexamethasone <strong>${round(mild,2)} mg</strong> PO/parenteral single dose (0.15 mg/kg; may repeat at 12 and 24 h)${liquidText(mild,conc)}; OR prednisolone ${round(predLo,1)}–${round(predHi,1)} mg PO single dose (1–2 mg/kg); OR nebulised budesonide 2 mg (if vomiting).<br>
      <strong>Moderate (3–7):</strong> dexamethasone <strong>${round(modLo,1)}–${round(modHi,1)} mg</strong> single dose (0.3–0.6 mg/kg) and/or nebulised budesonide 2 mg stat then 1 mg 12-hourly.<br>
      <strong>Severe (8–11) / not improving:</strong> nebulised adrenaline 1:1000 <strong>${round(adrMl,1)} mL</strong> (0.5 mL/kg, max 5 mL) + dexamethasone <strong>${round(modHi,1)} mg</strong> parenteral (0.6 mg/kg) + budesonide + oxygen.`;
    note=`MOH Paediatric Protocols 5th ed. (2025), Ch. 33 Viral Croup algorithm. The croup algorithm gives no maximum dexamethasone dose${modHi>12?"; other guidelines (e.g. RCH) cap at 12 mg — check unit policy":""}. Admit moderate/severe croup, age <6 months, poor intake or toxic appearance.`;
    caution="Drooling, toxic appearance or soft stridor in a deteriorating child: airway emergency — keep the child calm; senior/anaesthetic/ENT help.";
  } else if(tool==="seizure-benzo"){
    const mid=Math.min(weight*0.2,10), diazMax=(age!==null&&age<1)?5:10, diazLo=Math.min(weight*0.15,diazMax), diazHi=Math.min(weight*0.2,diazMax);
    let prKg=null, prTxt;
    if(age===null){prTxt="Enter age for the rectal diazepam age band.";}
    else if(age<5){prKg=[0.5,0.5];prTxt="<5 years: 0.5 mg/kg";}
    else if(age<6){prKg=[0.3,0.5];prTxt="age 5: PP5 bands are <5 y 0.5 mg/kg and 6–11 y 0.3 mg/kg";}
    else if(age<12){prKg=[0.3,0.3];prTxt="6–11 years: 0.3 mg/kg";}
    else {prKg=[0.2,0.2];prTxt="≥12 years: 0.2 mg/kg";}
    const pr=prKg?[Math.min(weight*prKg[0],10),Math.min(weight*prKg[1],10)]:null;
    const buc=[Math.min(weight*0.2,10),Math.min(weight*0.5,10)];
    const im=weight>40?10:weight>=13?5:Math.min(weight*0.2,10);
    answer=`<strong>1st line (5–10 min of seizure) — max 2 benzodiazepine doses including pre-hospital:</strong>
      <ul>
        <li><strong>IV midazolam:</strong> ${round(mid,1)} mg (0.2 mg/kg, max 10 mg) at 2 mg/min</li>
        <li><strong>IV diazepam:</strong> ${round(diazLo,1)}–${round(diazHi,1)} mg (0.15–0.2 mg/kg; max ${diazMax} mg)</li>
        <li><strong>Rectal diazepam:</strong> ${pr?`${round(pr[0],1)}${pr[1]!==pr[0]?`–${round(pr[1],1)}`:""} mg`:"—"} (${prTxt}; max 10 mg)</li>
        <li><strong>Buccal midazolam:</strong> ${round(buc[0],1)}–${round(buc[1],1)} mg (0.2–0.5 mg/kg, max 10 mg)</li>
        <li><strong>Intranasal midazolam:</strong> ${round(Math.min(weight*0.2,10),1)} mg (0.2 mg/kg, max 10 mg)</li>
        <li><strong>IM midazolam:</strong> ${round(im,1)} mg (${weight>40?">40 kg: 10 mg":weight>=13?"13–40 kg: 5 mg":"0.2 mg/kg"})</li>
      </ul>
      <strong>2nd line (still seizing 5 min after 2nd benzodiazepine) — choose ONE:</strong>
      <ul>
        <li>IV phenytoin <strong>${round(Math.min(weight*20,1250),0)} mg</strong> (20 mg/kg, max 1.25 g) over 20–30 min with cardiac monitoring</li>
        <li>IV levetiracetam <strong>${round(weight*40,0)} mg</strong> (40 mg/kg) over 5–10 min</li>
        <li>IV phenobarbitone <strong>${round(Math.min(weight*20,1000),0)} mg</strong> (20 mg/kg, max 1 g) over 20–30 min</li>
        <li>IV sodium valproate <strong>${round(Math.min(weight*20,1250),0)} mg</strong> (20 mg/kg, max 1.25 g) over 5–10 min</li>
      </ul>`;
    note="MOH Paediatric Protocols 5th ed. (2025), Ch. 48 Convulsive Status Epilepticus algorithm and Table 1. An individual emergency plan takes precedence; pre-hospital benzodiazepine doses count. Check glucose and electrolytes.";
    caution="Avoid valproate if inborn error of metabolism or liver dysfunction is suspected; avoid phenytoin in Dravet syndrome; do not give phenytoin too fast (bradycardia/asystole). Refractory (30–60 min): PICU, midazolam infusion, intubation.";
  } else if(tool==="ibuprofen"){
    if(weight<7){ answer="<strong>Not recommended below 7 kg</strong> (FUKKM). Use paracetamol instead."; note="FUKKM: ibuprofen 5–10 mg/kg/dose; not recommended for children <7 kg."; caution="Avoid in suspected dengue, dehydration or renal impairment."; }
    else {
    const low=Math.min(weight*5,400),high=Math.min(weight*10,400); answer=`Reference range: <strong>${round(low,1)}–${round(high,1)} mg per dose</strong>${conc?` ≈ ${round(low*5/conc,2)}–${round(high*5/conc,2)} mL at ${conc} mg/5 mL`:""} every 6–8 hours.`;
    syr={drug:"ibuprofen",rows:[{low,high}],freq:t("f_ibu"),maxMg:400,rx:{code:"TDS PRN"}};
    note="FUKKM: 5–10 mg/kg/dose; not recommended for children <7 kg. Use the lowest effective dose for the shortest duration.";
    caution="Avoid/seek advice in dehydration, renal impairment, GI bleeding risk, NSAID-sensitive asthma or suspected dengue. FUKKM does not indicate ibuprofen for fever due to infection. Calculator caps at 400 mg/dose.";
    }
  } else if(tool==="oseltamivir"){
    if(age===null){ els.dose.innerHTML=`<h3>Dose result</h3><p class="dose-answer">Enter age as well — infants &lt;1 year use mg/kg dosing, not weight bands.</p>`;els.dose.classList.remove("hidden");return; }
    const months=age*12; let mg;
    if(months!==null && months<9) mg=weight*3; else if(months!==null && months<12) mg=weight*3.5; else if(weight<=15) mg=30; else if(weight<=23) mg=45; else if(weight<=40) mg=60; else mg=75;
    answer=`Treatment dose: <strong>${round(mg,1)} mg PO twice daily for 5 days</strong>${liquidText(mg,conc)}.`;
    syr={drug:"oseltamivir",rows:[{low:mg}],freq:t("f_bd5"),rx:{code:"BD",dur:"5/7"}};
    note="Malaysia NAG: <9 months 3 mg/kg BD; 9–11 months 3.5 mg/kg BD; age 1–12 years uses weight bands; >40 kg 75 mg BD.";
    caution="Renal dose adjustment may be required. Verify exact formulation/concentration.";
  } else if(tool==="adrenaline"){
    const mg=Math.min(weight*0.01,0.5); answer=`IM adrenaline 1 mg/mL (1:1000): <strong>${round(mg,2)} mg = ${round(mg,2)} mL</strong> into the outer mid-thigh.${age!==null?`<br>PP5 pre-hospital age-band dose: <strong>${age<6?"150 mcg (0.15 mL)":age<=12?"300 mcg (0.3 mL)":"500 mcg (0.5 mL)"}</strong>.`:""}`;
    note="PP5 Ch. 116: in hospital 10 mcg/kg (0.01 mL/kg of 1:1000), repeat after 5 min if no improvement; pre-hospital <6 y 150 mcg, 6–12 y 300 mcg, >12 y 500 mcg. Maximum 0.5 mg per dose.";
    caution="For suspected anaphylaxis only. Do not delay adrenaline for antihistamines or IV access.";
  } else if(tool==="amoxicillin-high"){
    const mg=Math.min(weight*45,1000); answer=`BID high-dose reference: <strong>${round(mg,1)} mg per dose</strong>${liquidText(mg,conc)} every 12 hours.`;
    syr={drug:"amoxicillin",rows:[{low:mg}],freq:t("f_bd"),maxMg:1000,rx:{code:"BD"}};
    note="Malaysia NAG: high-dose amoxicillin 80–90 mg/kg/day in 2–3 divided doses for selected paediatric AOM/CAP; this calculator uses 90 mg/kg/day divided twice daily, max 1 g/dose.";
    caution="Check penicillin allergy, renal function, diagnosis and duration. This is not a generic antibiotic calculator.";
  } else if(tool==="coamox14"){
    const daily=Math.min(weight*90,3000), mg=daily/2;
    answer=`14:1 formulation: <strong>${round(mg,1)} mg amoxicillin component per dose</strong>${liquidText(mg,conc)} every 12 hours.`;
    syr={drug:"coamox14",rows:[{low:mg}],freq:t("f_bd"),rx:{code:"BD"}};
    note="Malaysia NAG: 80–90 mg/kg/day of the amoxicillin component in 2 divided doses; this calculator uses 90 mg/kg/day with the AOM cap of 3 g/day (NAG C2). For paediatric UTI and preseptal cellulitis NAG caps at 2 g/day (1 g/dose BD).";
    caution="Enter the AMOXICILLIN COMPONENT in mg/5 mL, not the combined amoxicillin+clavulanate total. Confirm the exact formulation and indication-specific maximum.";
  } else if(tool==="azithro5"){
    const d1=Math.min(weight*10,500), d25=Math.min(weight*5,250);
    answer=`Day 1: <strong>${round(d1,1)} mg once daily</strong>${liquidText(d1,conc)}. Days 2–5: <strong>${round(d25,1)} mg once daily</strong>${liquidText(d25,conc)}.`;
    syr={drug:"azithromycin",rows:[{name:t("day1"),low:d1,rxCode:"OD day 1"},{name:t("day25"),low:d25,rxCode:"OD day 2-5"}],freq:t("f_od5")};
    note="Malaysia NAG 5-day regimen: 10 mg/kg on Day 1 (max 500 mg), then 5 mg/kg once daily on Days 2–5 (max 250 mg/day) for specific indications.";
    caution="Do not use azithromycin as a default antibiotic for uncomplicated URTI. Confirm indication and allergy context.";
  } else if(tool==="cefuroxime"){
    const daily=Math.min(weight*30,1000), mg=daily/2;
    answer=`Reference dose: <strong>${round(mg,1)} mg per dose</strong>${liquidText(mg,conc)} every 12 hours.`;
    syr={drug:"cefuroxime",rows:[{low:mg}],freq:t("f_bd"),rx:{code:"BD"}};
    note="Malaysia NAG: cefuroxime 30 mg/kg/day PO in 2 divided doses, max 1 g/day, for selected paediatric AOM/rhinosinusitis pathways.";
    caution="Use only for the relevant diagnosis and allergy pathway; severe immediate beta-lactam allergy requires separate review.";
  } else if(tool==="cephalexin"){
    const low=Math.min(weight*25,2000)/2, high=Math.min(weight*50,2000)/2;
    answer=`Reference range: <strong>${round(low,1)}–${round(high,1)} mg per dose</strong>${conc?` ≈ ${round(low*5/conc,2)}–${round(high*5/conc,2)} mL at ${conc} mg/5 mL`:""} every 12 hours.`;
    syr={drug:"cephalexin",rows:[{low,high}],freq:t("f_bd"),rx:{code:"BD"}};
    note="Malaysia NAG: cephalexin 25–50 mg/kg/day PO in 2 divided doses, max 2 g/day, for selected paediatric UTI/SSTI pathways.";
    caution="Select the exact dose and duration from the diagnosis-specific pathway; febrile/complicated UTI or severe SSTI needs separate assessment.";
  } else if(tool==="augmentin228"){
    if(age!==null && age<2/12){
      answer="<strong>Do not calculate from this tool for age under 2 months.</strong>";
      note="The Malaysian Augmentin 228/457 mg per 5 mL product information does not provide dosage recommendations for children under 2 months.";
      caution="Use an age-appropriate neonatal/young-infant regimen and guideline.";
    } else if(weight>40){
      answer="<strong>Weight exceeds the paediatric product-information table range.</strong>";
      note="Augmentin 228 mg/5 mL contains 200 mg amoxicillin + 28.5 mg clavulanate per 5 mL (7:1).";
      caution="Review the adult/adolescent regimen rather than extrapolating this paediatric calculator.";
    } else {
      const nagLow=weight*40/2, nagHigh=weight*50/2;
      const mlLow=nagLow*5/200, mlHigh=nagHigh*5/200;
      const piMild=weight*25/2, piSerious=weight*45/2;
      answer=`<strong>NAG 7:1 selected-pathway range:</strong> ${round(nagLow,1)}–${round(nagHigh,1)} mg amoxicillin component per dose = <strong>${round(mlLow,2)}–${round(mlHigh,2)} mL BD</strong> of Augmentin 228 mg/5 mL.`;
      note=`This product is 200 mg amoxicillin + 28.5 mg clavulanate per 5 mL. Product PI usual total daily doses are 25/3.6 mg/kg/day for mild–moderate infection and 45/6.4 mg/kg/day for more serious infection, both divided BD (weight-based amoxicillin volumes here would be about ${round(piMild*5/200,2)} mL BD and ${round(piSerious*5/200,2)} mL BD respectively).`;
      caution="Use the diagnosis-specific NAG pathway. Maximum amoxicillin/day differs by indication (for example AOM vs UTI/SSTI). Give at the start of a meal; avoid in significant beta-lactam allergy and review renal function.";
    }
  } else if(tool==="coamox7"){
    const lowDaily=Math.min(weight*40,2000), highDaily=Math.min(weight*50,2000), low=lowDaily/2, high=highDaily/2;
    answer=`7:1 formulation: <strong>${round(low,1)}–${round(high,1)} mg amoxicillin component per dose</strong>${conc?` ≈ ${round(low*5/conc,2)}–${round(high*5/conc,2)} mL at ${conc} mg amoxicillin/5 mL`:""} every 12 hours.`;
    syr={drug:"coamox7",rows:[{low,high}],freq:t("f_bd"),rx:{code:"BD"}};
    note="Malaysia NAG: 40–50 mg/kg/day of the amoxicillin component in 2 divided doses for selected 7:1 paediatric pathways; this calculator applies a 2 g/day amoxicillin cap.";
    caution="Some indications such as AOM use a different maximum and may favor 14:1 high-dose formulation. Confirm the formulation ratio, diagnosis and duration.";
  } else if(tool==="amox-gas"){
    const total=Math.min(weight*50,1000), bid=total/2;
    answer=`GAS pharyngitis: <strong>${round(total,1)} mg once daily</strong>${liquidText(total,conc)} OR <strong>${round(bid,1)} mg twice daily</strong>${liquidText(bid,conc)} for 10 days.`;
    syr={drug:"amoxicillin",rows:[{name:t("onceDaily"),low:total,rxCode:"OD x 10/7"},{name:t("orTwiceDaily"),low:bid,rxCode:"BD x 10/7"}],freq:t("f_10d"),maxMg:1000};
    note="Malaysia NAG: amoxicillin 50 mg/kg/day in 1 or 2 divided doses, max 1 g/day, total duration 10 days for GAS tonsillitis/pharyngitis.";
    caution="Use only when bacterial/GAS pharyngitis is sufficiently likely or confirmed; most sore throats are viral.";
  } else if(tool==="nitrofurantoin-uti"){
    const sr=Math.min(weight*2,100), ir=Math.min(weight*1,100);
    answer=`Paediatric lower UTI: sustained-release <strong>${round(sr,1)} mg q12h</strong>; immediate-release <strong>${round(ir,1)} mg q6h</strong>.`;
    note="Malaysia NAG: SR 2 mg/kg/dose q12h or immediate-release 1 mg/kg/dose q6h, max 100 mg/dose; typical lower-UTI duration 3–5 days.";
    caution="Not for febrile UTI/pyelonephritis. Verify formulation, age, renal function and swallowing suitability. FUKKM lists nitrofurantoin 100 mg tablet only — no syrup.";
  } else if(tool==="cloxacillin-ssti"){
    if(weight>=25){
      answer="For a child ≥25 kg, the NAG mild-SSTI pathway uses the adult oral reference: <strong>500 mg every 6 hours</strong>.";
    } else {
      const low=Math.min(weight*50/4,500), high=Math.min(weight*100/4,500), impHigh=Math.min(weight*100/4,250);
      answer=`Child <25 kg (abscess/cellulitis): <strong>${round(low,1)}–${round(high,1)} mg per dose q6h</strong> (max 2 g/day)${conc?` ≈ ${round(low*5/conc,2)}–${round(high*5/conc,2)} mL at ${conc} mg/5 mL`:""}.<br>Generalised impetigo: max 1 g/day → <strong>${Math.min(low,impHigh)>=impHigh?round(impHigh,1):round(Math.min(low,impHigh),1)+"–"+round(impHigh,1)} mg per dose q6h</strong>.`;
      syr={drug:"cloxacillin",rows:[{low,high}],freq:t("f_qid"),maxMg:500,rx:{code:"QID"}};
    }
    note="Malaysia NAG: cloxacillin 50–100 mg/kg/day PO in 4 divided doses for selected mild paediatric cellulitis/abscess; doses are specified for children <25 kg, then adult dosing is used.";
    caution="Abscess source control is central when indicated. Severe/systemic infection needs escalation and a different regimen.";
  } else if(tool==="acyclovir-varicella"){
    const mg=Math.min(weight*20,800);
    answer=`Varicella treatment reference: <strong>${round(mg,1)} mg per dose four times daily for 5 days</strong>${liquidText(mg,conc)}.`;
    syr={drug:"acyclovir",rows:[{low:mg}],freq:t("f_qid5"),maxMg:800,rx:{code:"QID",dur:"5/7"}};
    note="Malaysian registered acyclovir product information: 20 mg/kg/dose QID for 5 days, maximum 800 mg per dose for paediatric varicella.";
    caution="Routine acyclovir is not required for every uncomplicated healthy child with chickenpox. Use when clinically indicated and adjust for renal impairment; maintain hydration.";
  } else if(tool==="aeba-bundle"){
    const salbWeight=Math.min(weight*0.15,5);
    const salbBand=age===null?null:(age<=5?2.5:5);
    const mdi=age===null?"Enter age for MDI age-band dose.":(age<=6?"4–6 puffs via spacer":"8–10 puffs via spacer");
    const iprat=age===null?"Enter age for ipratropium age-band dose.":(age<6?"125–250 mcg nebulised":"250–500 mcg nebulised");
    let predCap=null, predCapText="Enter age for age-specific prednisolone maximum.";
    if(age!==null){
      if(age<2){predCap=10;predCapText="max 10 mg/day (<2 y)";}
      else if(age<6){predCap=20;predCapText="max 20 mg/day (2–5 y)";}
      else if(age<12){predCap=40;predCapText="age-specific max 30–40 mg/day (6–11 y)";}
      else {predCap=50;predCapText="age-specific max 40–50 mg/day (≥12 y)";}
    }
    const predLow=predCap===null?weight:Math.min(weight,predCap), predHigh=predCap===null?weight*2:Math.min(weight*2,predCap);
    const hydLow=Math.min(weight*4,100), hydHigh=Math.min(weight*5,100);
    const mgso4=Math.min(weight*50,2000), mgso4ml=mgso4/500;
    answer=`<strong>AEBA quick-dose bundle</strong>
      <ul>
        <li><strong>Salbutamol MDI + spacer:</strong> ${mdi}; may repeat q20 min ×3 in the first hour.</li>
        <li><strong>Salbutamol neb:</strong> 0.15 mg/kg = ${round(salbWeight,2)} mg (max 5 mg)${salbBand!==null?`; protocol age-band ${salbBand} mg`:""}. If 5 mg/mL solution, ${round(salbWeight/5,2)} mL by weight.</li>
        <li><strong>Ipratropium neb (severe):</strong> ${iprat}; q20 min ×3 in first hour.</li>
        <li><strong>Prednisolone PO:</strong> ${round(predLow,1)}–${round(predHigh,1)} mg/day (1–2 mg/kg/day; ${predCapText}).</li>
        <li><strong>Hydrocortisone IV:</strong> ${round(hydLow,1)}–${round(hydHigh,1)} mg/dose q6h (4–5 mg/kg/dose; max 100 mg).</li>
        <li><strong>MgSO₄ 50% IV:</strong> ${round(mgso4,0)} mg = ${round(mgso4ml,2)} mL over 20 min (50 mg/kg, max 2 g).</li>
        <li><strong>Budesonide neb adjunct:</strong> 0.5 mg/dose ×3 within first hour in severe/life-threatening AEBA; max 2 mg/day.</li>
      </ul>`;
    note="MOH/MPA Paediatric Protocols 5th ed. Use pMDI + spacer preferentially in mild–moderate AEBA; oxygen-driven nebulisation + ipratropium is used in severe/life-threatening AEBA. Give systemic corticosteroid early.";
    caution="This bundle does not replace severity assessment. Oxygen if SpO₂ <94%, target 94–98%. Life-threatening signs or failure to improve require immediate ED/PICU-level escalation.";
  } else if(tool==="hydrocortisone-iv-asthma"){
    const low=Math.min(weight*4,100), high=Math.min(weight*5,100);
    answer=`Hydrocortisone IV: <strong>${round(low,1)}–${round(high,1)} mg per dose every 6 hours</strong> (4–5 mg/kg/dose; max 100 mg/dose).`;
    note="MOH/MPA Paediatric Protocols 5th ed.: IV corticosteroid is indicated when the child is vomiting/unable to tolerate oral therapy or has severe/life-threatening AEBA.";
    caution="Oral and IV systemic corticosteroids have similar efficacy when oral medication can be tolerated; oral route is preferred when appropriate.";
  } else if(tool==="ipratropium-neb-asthma"){
    const dose=age===null?"Enter age to select dose.":(age<6?"125–250 mcg":"250–500 mcg");
    answer=`Ipratropium nebuliser: <strong>${dose}</strong>. In severe AEBA, may administer every 20 minutes ×3 in the first hour.`;
    note="Frequent ipratropium with SABA may continue for up to the second hour in severe attacks, then should be spaced to q4–6h or discontinued according to response.";
    caution="Ipratropium is an add-on to SABA in severe/life-threatening AEBA, not a substitute for salbutamol.";
  } else if(tool==="magnesium-iv-asthma"){
    const mg=Math.min(weight*50,2000), ml=mg/500;
    answer=`Magnesium sulphate 50%: <strong>${round(mg,0)} mg = ${round(ml,2)} mL IV over 20 minutes</strong> (50 mg/kg, max 2 g).`;
    note="MOH/MPA Paediatric Protocols 5th ed.: IV MgSO₄ is an adjunct/second-line option for severe or life-threatening AEBA not responding adequately to first-line inhaled therapy.";
    caution="Monitor blood pressure and cardiorespiratory status; calculator caps at 2 g single dose; verify local unit policy.";
  } else if(tool==="budesonide-neb-asthma"){
    answer="<strong>Budesonide nebulised 0.5 mg/dose ×3 doses within the first hour</strong>; maximum total daily dose 2 mg.";
    note="MOH/MPA Paediatric Protocols 5th ed.: may be mixed with SABA/SAMA and considered in severe/life-threatening AEBA.";
    caution="Nebulised budesonide is an adjunct; it does not replace systemic corticosteroid in severe/life-threatening AEBA.";
  } else if(tool==="prednisolone-asthma"){
    let cap=null, capText="Enter age to apply the age-specific maximum.";
    if(age!==null){ 
      if(age<2){cap=10;capText="max 10 mg/day (<2 years)";}
      else if(age<6){cap=20;capText="max 20 mg/day (2–5 years)";}
      else if(age<12){cap=40;capText="age-specific maximum 30–40 mg/day (6–11 years)";}
      else {cap=50;capText="age-specific maximum 40–50 mg/day (≥12 years)";}
    }
    const low=cap===null?weight:Math.min(weight,cap), high=cap===null?weight*2:Math.min(weight*2,cap);
    answer=`Acute asthma: <strong>${round(low,1)}–${round(high,1)} mg/day</strong>${conc?` ≈ ${round(low*5/conc,2)}–${round(high*5/conc,2)} mL/day at ${conc} mg/5 mL`:""} (${capText}).`;
    syr={drug:"prednisolone",rows:[{name:t("lowDose"),low},{name:t("highDose"),low:high}],freq:t("f_pred"),rx:{code:"OD",dur:"3-5/7"}};
    note="MOH/MPA Paediatric Protocols 5th ed.: prednisolone 1–2 mg/kg/day; usually 3–5 days in children and 5–7 days in adolescents ≥12 years. Weaning is unnecessary unless systemic steroid exceeds 14 days.";
    caution="Give systemic corticosteroid early in AEBA. Use IV hydrocortisone if vomiting/unable to tolerate PO or in severe/life-threatening exacerbation.";
  } else if(tool==="salbutamol-neb"){
    const mg=Math.min(weight*0.15,5), band=age===null?"Enter age for the protocol age-band reference.":(age<=5?"Age-band reference: 2.5 mg/dose for age ≤5 years.":"Age-band reference: 5 mg/dose for age >5 years.");
    answer=`Weight-based reference: <strong>${round(mg,2)} mg/dose</strong>. If using 5 mg/mL solution: <strong>${round(mg/5,2)} mL</strong>. ${band}`;
    note="MOH Paediatric Protocols 5th ed.: nebulised salbutamol 0.15 mg/kg; ≤5 years 2.5 mg/dose and >5 years 5 mg/dose.";
    caution="Acute asthma requires severity assessment and escalation when indicated. The generic mg/5 mL field is not used for this calculator.";
  } else if(tool==="ors-plan-b"){
    const total=weight*75, hourly=total/4;
    answer=`Plan B ORS: <strong>${round(total,0)} mL over 4 hours</strong> (about <strong>${round(hourly,0)} mL/hour</strong> if evenly distributed).`;
    note="MOH Paediatric Protocols 5th ed.: for some dehydration, approximate ORS volume over the first 4 hours = weight (kg) × 75 mL, followed by reassessment.";
    caution="Shock/severe dehydration requires a different resuscitation pathway.";
  } else if(tool==="maintenance-fluid"){
    let daily;
    if(weight<=10) daily=weight*100;
    else if(weight<=20) daily=1000+(weight-10)*50;
    else daily=1500+(weight-20)*20;
    answer=`Holliday–Segar maintenance: <strong>${round(daily,0)} mL/24 h</strong> ≈ <strong>${round(daily/24,1)} mL/h</strong>.`;
    note="MOH Paediatric Protocols: 100 mL/kg for the first 10 kg, 50 mL/kg for the next 10 kg, then 20 mL/kg for each kg above 20.";
    caution="This estimates maintenance for a generally well child. Clinical states such as cardiac/renal disease, CNS disease, sepsis, bronchiolitis, DKA or electrolyte disorders may require restriction or a different fluid plan.";
  } else if(tool==="maintenance-deficit"){
    let daily;
    if(weight<=10) daily=weight*100;
    else if(weight<=20) daily=1000+(weight-10)*50;
    else daily=1500+(weight-20)*20;
    if(dehydration===null || dehydration<=0){
      answer=`Maintenance: <strong>${round(daily,0)} mL/24 h</strong> ≈ <strong>${round(daily/24,1)} mL/h</strong>. Enter dehydration % to calculate deficit.`;
      note="Deficit (mL) = dehydration fraction × weight (kg) × 1000.";
      caution="Do not use a calculated deficit alone to manage shock or severe dehydration.";
    } else {
      const deficit=dehydration/100*weight*1000;
      const combined=daily+deficit;
      answer=`Maintenance <strong>${round(daily,0)} mL/24 h</strong> + estimated ${round(dehydration,1)}% deficit <strong>${round(deficit,0)} mL</strong> = <strong>${round(combined,0)} mL</strong> before ongoing losses, if the deficit were replaced over 24 h.`;
      note=`Illustrative 24-h average: ${round(combined/24,1)} mL/h. MOH Paediatric Protocols notes that the actual deficit replacement period depends on the condition and ongoing reassessment.`;
      caution="Shock requires immediate resuscitation first. Hypernatraemia, DKA, meningitis and other special states need slower/specific correction; replace ongoing losses separately.";
    }
  }
  const label=els.doseSelect.options[els.doseSelect.selectedIndex].text;
  els.dose.innerHTML=`<h3>${t("doseResult")} — ${label}</h3>${weightWarn?`<p class="dose-warn">⚠️ ${weightWarn}</p>`:""}<div class="dose-answer">${answer}${syr?syrupBlock(syr):""}</div><p class="small">${note}</p><p class="dose-caution">${caution}</p>`; els.dose.classList.remove("hidden");
}
els.search.addEventListener("input",()=>{openId=null; if(els.search.value.trim() && activeCategory!=="All"){activeCategory="All";renderCategories();} render();});
els.clear.addEventListener("click",()=>{els.search.value="";activeCategory="All";openId=null;renderCategories();render();els.search.focus();});
[els.age,els.weight,els.concentration,els.dehydration].forEach(el=>el.addEventListener("input",doseTool));
els.dose.addEventListener("click",async e=>{
  const b=e.target.closest(".rx-copy"); if(!b) return;
  const ok=await copyText(b.dataset.rx);
  const old=b.innerHTML; b.innerHTML=ok?`✓ ${t("copied")}`:t("copyFail"); b.classList.add("done");
  setTimeout(()=>{b.innerHTML=old;b.classList.remove("done");},1600);
});
els.doseSelect.addEventListener("change",()=>{els.concentration.value="";doseTool();});
const doseToggle=document.getElementById("doseToggle"), dosePanelWrap=document.getElementById("doseTools");
function setDoseOpen(open,scroll=true){
  dosePanelWrap.classList.toggle("hidden",!open);
  doseToggle.setAttribute("aria-expanded",String(open));
  doseToggle.textContent=t(open?"doseBtnClose":"doseBtn");
  if(open&&scroll){dosePanelWrap.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>els.doseSelect.focus({preventScroll:true}),350);}
}
doseToggle.addEventListener("click",()=>setDoseOpen(dosePanelWrap.classList.contains("hidden")));
els.results.addEventListener("click",e=>{
  const b=e.target.closest(".tool-link"); if(!b) return;
  setDoseOpen(true,false);
  els.doseSelect.value=b.dataset.tool; els.concentration.value=""; doseTool();
  document.getElementById("doseTools").scrollIntoView({behavior:"smooth",block:"start"});
  if(!els.weight.value) setTimeout(()=>els.weight.focus({preventScroll:true}),400);
});
// card interactions: favourite star + record as recently viewed
els.results.addEventListener("click",e=>{
  const rw=e.target.closest(".case-row"); if(rw){openCase(rw.dataset.open);return;}
  const go=e.target.closest(".gal-open"); if(go){const im=(window.CASE_IMAGES[go.dataset.id]||[])[+go.dataset.i]; if(im) openLightbox(im); return;}
  if(e.target.closest("#backToList")){const id=openId; openId=null; render(); const el=els.results.querySelector(`[data-open="${id}"]`); if(el) el.scrollIntoView({block:"center"}); else document.getElementById("results").scrollIntoView({block:"start"}); return;}
  const st=e.target.closest(".star"); if(st){toggleFav(st.dataset.id);return;}
  const cc=e.target.closest(".counsel-copy"); if(cc){const c=cases.find(x=>x.id===cc.dataset.id); if(c){copyText(counselText(c)).then(ok=>{const old=cc.innerHTML;cc.innerHTML=ok?`✓ ${t("copied")}`:t("copyFail");cc.classList.add("done");setTimeout(()=>{cc.innerHTML=old;cc.classList.remove("done");},1600);});} return;}
  const cd=e.target.closest(".case-card"); if(cd && !e.target.closest("a")) addRecent(cd.dataset.id);
});
// scores & CrCl panel
const scoreToggle=document.getElementById("scoreToggle"), scoreWrap=document.getElementById("scoreTools");
function setScoreOpen(open){
  scoreWrap.classList.toggle("hidden",!open); scoreToggle.setAttribute("aria-expanded",String(open));
  scoreToggle.textContent=t(open?"toolsBtnClose":"toolsBtn");
  if(open){ if(window.renderScores) renderScores(scoreWrap); scoreWrap.scrollIntoView({behavior:"smooth",block:"start"}); }
}
scoreToggle.addEventListener("click",()=>setScoreOpen(scoreWrap.classList.contains("hidden")));
const normToggle=document.getElementById("normToggle"), normWrap=document.getElementById("normTools");
function setNormOpen(open){
  normWrap.classList.toggle("hidden",!open); normToggle.setAttribute("aria-expanded",String(open));
  normToggle.textContent=t(open?"normBtnClose":"normBtn");
  if(open){ if(window.renderNormals) renderNormals(normWrap); normWrap.scrollIntoView({behavior:"smooth",block:"start"}); }
}
normToggle.addEventListener("click",()=>setNormOpen(normWrap.classList.contains("hidden")));
scoreWrap.addEventListener("click",e=>{const b=e.target.closest(".tool-link"); if(!b) return; setDoseOpen(true,false); els.doseSelect.value=b.dataset.tool; els.concentration.value=""; doseTool(); dosePanelWrap.scrollIntoView({behavior:"smooth",block:"start"});});
// language
const langBtn=document.getElementById("langToggle");
function syncLangUi(){
  applyI18n(); langBtn.textContent=t("langBtn");
  document.getElementById("versionBadge").textContent=`v2.12 · ${cases.length} ${t("topics")} · NAG 23 Nov 2026`;
  doseToggle.textContent=t(dosePanelWrap.classList.contains("hidden")?"doseBtn":"doseBtnClose");
  scoreToggle.textContent=t(scoreWrap.classList.contains("hidden")?"toolsBtn":"toolsBtnClose");
  normToggle.textContent=t(normWrap.classList.contains("hidden")?"normBtn":"normBtnClose");
}
langBtn.addEventListener("click",()=>setLang(getLang()==="ms"?"en":"ms"));
document.addEventListener("langchange",()=>{syncLangUi();renderCategories();render();doseTool();if(!scoreWrap.classList.contains("hidden")&&window.renderScores) renderScores(scoreWrap);if(!normWrap.classList.contains("hidden")&&window.renderNormals) renderNormals(normWrap);});
syncLangUi();renderCategories();renderQuick();renderPersonal();render();doseTool();
