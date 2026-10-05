const reviewed = "5 October 2026";
const categories = ["All","Respiratory","ENT","Dermatology","Paediatrics","GI","GU","MSK","Emergency"];
let activeCategory = "All";
const cases = window.LOCUM_CASES || [];
const quickIds = ["influenza","aom","asthma-exacerbation","gastroenteritis","uti","dengue","anaphylaxis","rash-triage"];
const els = {
  search: document.getElementById("searchInput"), clear: document.getElementById("clearBtn"), results: document.getElementById("results"),
  chips: document.getElementById("quickChips"), categories: document.getElementById("categoryFilters"), count: document.getElementById("topicCount"),
  age: document.getElementById("ageInput"), weight: document.getElementById("weightInput"), concentration: document.getElementById("concentrationInput"),
  doseSelect: document.getElementById("doseToolSelect"), dose: document.getElementById("dosePanel")
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
  return q.split(/\s+/).filter(Boolean).reduce((n,t)=>n+(hay.includes(t)?5:0),0);
}
function section(title,items,cls="block"){
  if(!items?.length) return "";
  return `<section class="${cls}"><h3>${title}</h3><ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul></section>`;
}
function card(c){
  return `<article class="case-card">
    <div class="case-head"><div><h2>${c.title}</h2><div class="category">${[c.category,...(c.tags||[])].join(" · ")}</div></div><span class="evidence">${c.evidence}</span></div>
    ${section("🚩 Red flags / do not miss",c.redFlags,"redflags")}
    <div class="case-body">
      ${section("Assessment",c.assessment)}
      ${section("Treatment",c.treatment)}
      <section class="block"><h3>Medication</h3>${c.meds.map(x=>`<div class="med">${x}</div>`).join("")}</section>
      ${section("Prevention / counselling",c.prevention)}
      ${section("Referral / escalation",c.referral)}
      <section class="block source-list"><h3>Primary sources</h3>${c.sources.map(([t,u])=>`<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`).join("")}<p class="small">Content reviewed ${reviewed}. Recommendations can change; use the linked source for confirmation.</p></section>
    </div>
  </article>`;
}
function render(){
  const q=norm(els.search.value);
  const ranked=cases.filter(inCategory).map(c=>[c,scoreCase(c,q)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
  els.count.textContent=`${ranked.length} topic${ranked.length===1?"":"s"}`;
  if(!ranked.length){els.results.innerHTML=`<div class="empty"><strong>No topic found.</strong><br>Try another diagnosis, synonym or category. This app will not invent treatment for an unlisted condition.</div>`;return;}
  const shown=(q || activeCategory!=="All") ? ranked : ranked.slice(0,8);
  els.results.innerHTML=shown.map(card).join("");
}
function renderCategories(){
  els.categories.innerHTML="";
  categories.forEach(cat=>{const b=document.createElement("button"); b.type="button"; b.className=`chip ${activeCategory===cat?"active":""}`; b.textContent=cat; b.onclick=()=>{activeCategory=cat;renderCategories();render();}; els.categories.appendChild(b);});
}
function renderQuick(){
  els.chips.innerHTML="";
  quickIds.forEach(id=>{const c=cases.find(x=>x.id===id);if(!c)return;const b=document.createElement("button");b.type="button";b.className="chip";b.textContent=c.title;b.onclick=()=>{activeCategory="All";renderCategories();els.search.value=c.synonyms[0]||c.title;render();document.getElementById("results").scrollIntoView({behavior:"smooth",block:"start"});};els.chips.appendChild(b);});
}
function liquidText(mg,conc){if(!conc||conc<=0)return ""; return ` ≈ <strong>${round(mg*5/conc,2)} mL</strong> at ${conc} mg/5 mL`;}
function doseTool(){
  const tool=els.doseSelect.value, ageVal=parseFloat(els.age.value), weight=parseFloat(els.weight.value), conc=parseFloat(els.concentration.value);
  const age=Number.isFinite(ageVal)?ageVal:null;
  if(!tool){els.dose.classList.add("hidden");return;}
  if(!Number.isFinite(weight)||weight<=0){els.dose.innerHTML=`<h3>Dose result</h3><p class="dose-answer">Enter a valid weight in kg.</p>`;els.dose.classList.remove("hidden");return;}
  let answer="",note="",caution="";
  if(tool==="paracetamol"){
    const mg=Math.min(weight*15,1000); answer=`Reference single dose: <strong>${round(mg,1)} mg</strong>${liquidText(mg,conc)} every 4–6 hours when needed.`;
    note="Common paediatric reference: 15 mg/kg/dose; do not exceed 4 doses in 24 hours. Confirm age-specific/product instructions.";
    caution="Check duplicate paracetamol-containing products and liver disease/overdose risk.";
  } else if(tool==="ibuprofen"){
    const low=weight*5,high=weight*10; answer=`Reference range: <strong>${round(low,1)}–${round(high,1)} mg per dose</strong>${conc?` ≈ ${round(low*5/conc,2)}–${round(high*5/conc,2)} mL at ${conc} mg/5 mL`:""} every 6–8 hours.`;
    note="FUKKM: 5–10 mg/kg/dose; not recommended for children <7 kg. Use the lowest effective dose for the shortest duration.";
    caution="Avoid/seek advice in dehydration, renal impairment, GI bleeding risk, NSAID-sensitive asthma or suspected dengue. FUKKM does not indicate ibuprofen for fever due to infection.";
  } else if(tool==="oseltamivir"){
    const months=age===null?null:age*12; let mg;
    if(months!==null && months<9) mg=weight*3; else if(months!==null && months<12) mg=weight*3.5; else if(weight<=15) mg=30; else if(weight<=23) mg=45; else if(weight<=40) mg=60; else mg=75;
    answer=`Treatment dose: <strong>${round(mg,1)} mg PO twice daily for 5 days</strong>${liquidText(mg,conc)}.`;
    note="Malaysia NAG: <9 months 3 mg/kg BD; 9–11 months 3.5 mg/kg BD; age 1–12 years uses weight bands; >40 kg 75 mg BD.";
    caution="Renal dose adjustment may be required. Verify exact formulation/concentration.";
  } else if(tool==="adrenaline"){
    const mg=Math.min(weight*0.01,0.5); answer=`IM adrenaline 1 mg/mL: <strong>${round(mg,2)} mg = ${round(mg,2)} mL</strong> into the outer mid-thigh.`;
    note="0.01 mg/kg per dose, maximum 0.5 mg. Repeat after 5 minutes if life-threatening features persist while arranging emergency transfer.";
    caution="For suspected anaphylaxis only. Do not delay adrenaline for antihistamines or IV access.";
  } else if(tool==="amoxicillin-high"){
    const mg=Math.min(weight*45,1000); answer=`BID high-dose reference: <strong>${round(mg,1)} mg per dose</strong>${liquidText(mg,conc)} every 12 hours.`;
    note="This represents 90 mg/kg/day divided twice daily, capped at 1 g/dose. Use only when the diagnosis-specific NAG regimen calls for high-dose amoxicillin (e.g. selected paediatric AOM/CAP).";
    caution="Check penicillin allergy, renal function, diagnosis, duration and local formulation. This is not a generic antibiotic calculator.";
  }
  els.dose.innerHTML=`<h3>Dose result</h3><p class="dose-answer">${answer}</p><p class="small">${note}</p><p class="dose-caution">${caution}</p>`; els.dose.classList.remove("hidden");
}
els.search.addEventListener("input",render);
els.clear.addEventListener("click",()=>{els.search.value="";activeCategory="All";renderCategories();render();els.search.focus();});
[els.age,els.weight,els.concentration].forEach(el=>el.addEventListener("input",doseTool));
els.doseSelect.addEventListener("change",doseTool);
renderCategories();renderQuick();render();doseTool();
