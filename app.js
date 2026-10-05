const reviewed = "5 October 2026";
const categories = ["All","Respiratory","ENT","Dermatology","Paediatrics","GI","GU","MSK","Emergency"];
let activeCategory = "All";
const cases = window.LOCUM_CASES || [];
const quickIds = ["influenza","aom","asthma-exacerbation","gastroenteritis","uti","dengue","anaphylaxis","rash-triage"];
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
  const tool=els.doseSelect.value, ageVal=parseFloat(els.age.value), weight=parseFloat(els.weight.value), conc=parseFloat(els.concentration.value), dehydrationVal=parseFloat(els.dehydration.value);
  const age=Number.isFinite(ageVal)?ageVal:null, dehydration=Number.isFinite(dehydrationVal)?dehydrationVal:null;
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
    note="Malaysia NAG: high-dose amoxicillin 80–90 mg/kg/day in 2–3 divided doses for selected paediatric AOM/CAP; this calculator uses 90 mg/kg/day divided twice daily, max 1 g/dose.";
    caution="Check penicillin allergy, renal function, diagnosis and duration. This is not a generic antibiotic calculator.";
  } else if(tool==="coamox14"){
    const daily=Math.min(weight*90,3000), mg=daily/2;
    answer=`14:1 formulation: <strong>${round(mg,1)} mg amoxicillin component per dose</strong>${liquidText(mg,conc)} every 12 hours.`;
    note="Malaysia NAG: 80–90 mg/kg/day of the amoxicillin component in 2 divided doses for selected paediatric pathways such as AOM failure/recent amoxicillin; this calculator uses 90 mg/kg/day.";
    caution="Enter the AMOXICILLIN COMPONENT in mg/5 mL, not the combined amoxicillin+clavulanate total. Confirm the exact formulation and indication-specific maximum.";
  } else if(tool==="azithro5"){
    const d1=Math.min(weight*10,500), d25=Math.min(weight*5,250);
    answer=`Day 1: <strong>${round(d1,1)} mg once daily</strong>${liquidText(d1,conc)}. Days 2–5: <strong>${round(d25,1)} mg once daily</strong>${liquidText(d25,conc)}.`;
    note="Malaysia NAG 5-day regimen: 10 mg/kg on Day 1 (max 500 mg), then 5 mg/kg once daily on Days 2–5 (max 250 mg/day) for specific indications.";
    caution="Do not use azithromycin as a default antibiotic for uncomplicated URTI. Confirm indication and allergy context.";
  } else if(tool==="cefuroxime"){
    const daily=Math.min(weight*30,1000), mg=daily/2;
    answer=`Reference dose: <strong>${round(mg,1)} mg per dose</strong>${liquidText(mg,conc)} every 12 hours.`;
    note="Malaysia NAG: cefuroxime 30 mg/kg/day PO in 2 divided doses, max 1 g/day, for selected paediatric AOM/rhinosinusitis pathways.";
    caution="Use only for the relevant diagnosis and allergy pathway; severe immediate beta-lactam allergy requires separate review.";
  } else if(tool==="cephalexin"){
    const low=Math.min(weight*25,2000)/2, high=Math.min(weight*50,2000)/2;
    answer=`Reference range: <strong>${round(low,1)}–${round(high,1)} mg per dose</strong>${conc?` ≈ ${round(low*5/conc,2)}–${round(high*5/conc,2)} mL at ${conc} mg/5 mL`:""} every 12 hours.`;
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
    note="Malaysia NAG: 40–50 mg/kg/day of the amoxicillin component in 2 divided doses for selected 7:1 paediatric pathways; this calculator applies a 2 g/day amoxicillin cap.";
    caution="Some indications such as AOM use a different maximum and may favor 14:1 high-dose formulation. Confirm the formulation ratio, diagnosis and duration.";
  } else if(tool==="amox-gas"){
    const total=Math.min(weight*50,1000), bid=total/2;
    answer=`GAS pharyngitis: <strong>${round(total,1)} mg once daily</strong>${liquidText(total,conc)} OR <strong>${round(bid,1)} mg twice daily</strong>${liquidText(bid,conc)} for 10 days.`;
    note="Malaysia NAG: amoxicillin 50 mg/kg/day in 1 or 2 divided doses, max 1 g/day, total duration 10 days for GAS tonsillitis/pharyngitis.";
    caution="Use only when bacterial/GAS pharyngitis is sufficiently likely or confirmed; most sore throats are viral.";
  } else if(tool==="nitrofurantoin-uti"){
    const sr=Math.min(weight*2,100), ir=Math.min(weight*1,100);
    answer=`Paediatric lower UTI: sustained-release <strong>${round(sr,1)} mg q12h</strong>; immediate-release <strong>${round(ir,1)} mg q6h</strong>.`;
    note="Malaysia NAG: SR 2 mg/kg/dose q12h or immediate-release 1 mg/kg/dose q6h, max 100 mg/dose; typical lower-UTI duration 3–5 days.";
    caution="Not for febrile UTI/pyelonephritis. Verify formulation, age, renal function and swallowing suitability.";
  } else if(tool==="cloxacillin-ssti"){
    if(weight>=25){
      answer="For a child ≥25 kg, the NAG mild-SSTI pathway uses the adult oral reference: <strong>500 mg every 6 hours</strong>.";
    } else {
      const low=weight*50/4, high=weight*100/4;
      answer=`Child <25 kg: <strong>${round(low,1)}–${round(high,1)} mg per dose q6h</strong>${conc?` ≈ ${round(low*5/conc,2)}–${round(high*5/conc,2)} mL at ${conc} mg/5 mL`:""}.`;
    }
    note="Malaysia NAG: cloxacillin 50–100 mg/kg/day PO in 4 divided doses for selected mild paediatric cellulitis/abscess; doses are specified for children <25 kg, then adult dosing is used.";
    caution="Abscess source control is central when indicated. Severe/systemic infection needs escalation and a different regimen.";
  } else if(tool==="acyclovir-varicella"){
    const mg=Math.min(weight*20,800);
    answer=`Varicella treatment reference: <strong>${round(mg,1)} mg per dose four times daily for 5 days</strong>${liquidText(mg,conc)}.`;
    note="Malaysian registered acyclovir product information: 20 mg/kg/dose QID for 5 days, maximum 800 mg per dose for paediatric varicella.";
    caution="Routine acyclovir is not required for every uncomplicated healthy child with chickenpox. Use when clinically indicated and adjust for renal impairment; maintain hydration.";
  } else if(tool==="prednisolone-asthma"){
    let cap=null;
    if(age!==null){ if(age<2) cap=10; else if(age<6) cap=20; else if(age<12) cap=40; else cap=50; }
    const low=cap===null?weight:Math.min(weight,cap), high=cap===null?weight*2:Math.min(weight*2,cap);
    answer=`Acute asthma reference: <strong>${round(low,1)}–${round(high,1)} mg/day</strong>${conc?` ≈ ${round(low*5/conc,2)}–${round(high*5/conc,2)} mL/day at ${conc} mg/5 mL`:""}.`;
    note="MOH Paediatric Protocols 5th ed.: prednisolone 1–2 mg/kg/day for 3–7 days, with age-specific maximum daily doses.";
    caution=age===null?"Enter age to apply the protocol age-specific maximum.":"Use within the acute asthma severity pathway; systemic steroid dosing is indication-specific.";
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
  els.dose.innerHTML=`<h3>Dose result</h3><p class="dose-answer">${answer}</p><p class="small">${note}</p><p class="dose-caution">${caution}</p>`; els.dose.classList.remove("hidden");
}
els.search.addEventListener("input",render);
els.clear.addEventListener("click",()=>{els.search.value="";activeCategory="All";renderCategories();render();els.search.focus();});
[els.age,els.weight,els.concentration,els.dehydration].forEach(el=>el.addEventListener("input",doseTool));
els.doseSelect.addEventListener("change",doseTool);
renderCategories();renderQuick();render();doseTool();
