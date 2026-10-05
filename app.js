const reviewed = "5 October 2026";

const cases = [
  {
    id:"influenza",
    title:"Influenza (A or B)",
    category:"Respiratory / infectious disease",
    synonyms:["flu","influenza a","influenza b","tamiflu","oseltamivir","demam influenza"],
    evidence:"CDC 2026",
    redFlags:[
      "Respiratory distress, hypoxia, cyanosis, chest pain, haemodynamic instability.",
      "Altered mental status, severe dehydration, inability to maintain oral intake.",
      "Very young infant, pregnancy, significant chronic disease, immunocompromise, or rapidly progressive illness."
    ],
    assessment:[
      "Record onset time: antiviral benefit is greatest when started early, especially within 48 hours.",
      "Identify high-risk status and severity; do not rely on influenza A vs B alone to judge severity.",
      "Consider alternative/secondary diagnoses such as pneumonia when focal chest signs, hypoxia or deterioration are present."
    ],
    treatment:[
      "Supportive care: fluids, rest, antipyretic/analgesia where appropriate.",
      "Offer antiviral treatment promptly for severe/progressive disease or higher-risk patients; uncomplicated low-risk cases benefit most when treatment starts within 48 hours."
    ],
    meds:[
      "<strong>Oseltamivir treatment (5 days):</strong> age <1 year: 3 mg/kg/dose PO twice daily. Age ≥1 year: ≤15 kg 30 mg BD; >15–23 kg 45 mg BD; >23–40 kg 60 mg BD; >40 kg 75 mg BD. Adults: 75 mg BD.",
      "Renal dose adjustment may be required. Verify formulation/concentration before converting mg to mL."
    ],
    prevention:[
      "Annual influenza vaccination for eligible patients.",
      "Hand hygiene, respiratory etiquette/masking when symptomatic, avoid close contact with high-risk people while infectious."
    ],
    referral:[
      "Refer to ED/hospital for red flags, severe/progressive illness, hypoxia, inability to hydrate, or complications."
    ],
    dose:"oseltamivir",
    sources:[
      ["CDC: Influenza Antiviral Medications – Summary for Clinicians","https://www.cdc.gov/flu/hcp/antivirals/summary-clinicians.html"],
      ["CDC: Treatment of Flu in Children","https://www.cdc.gov/flu/treatment/children-antiviral.html"]
    ]
  },
  {
    id:"hypertension",
    title:"Severe hypertension / hypertensive emergency",
    category:"Cardiovascular",
    synonyms:["hpt urgency","hypertensive urgency","hypertensive emergency","severe hypertension","darah tinggi","bp 180","hypertension"],
    evidence:"MOH Malaysia CPG",
    redFlags:[
      "Any acute target-organ damage: neurological deficit/encephalopathy, ACS/chest pain, acute pulmonary oedema, AKI, aortic dissection, retinal emergency, eclampsia/preeclampsia.",
      "Persistent severe BP with concerning symptoms requires urgent escalation."
    ],
    assessment:[
      "Repeat BP with correct cuff/technique after brief rest; assess both symptoms and signs of acute target-organ damage.",
      "Review medication adherence, recent NSAIDs/decongestants/stimulants and secondary causes where relevant.",
      "Focused examination: neurological status, cardiovascular/heart failure signs, pulses; targeted investigations according to presentation."
    ],
    treatment:[
      "Hypertensive emergency: urgent hospital transfer for monitored IV titratable therapy and disease-specific BP targets.",
      "Asymptomatic severe hypertension without acute target-organ damage: avoid rapid BP reduction. Reinstitute/intensify appropriate oral therapy and arrange close follow-up according to local CPG and clinical context."
    ],
    meds:[
      "<strong>Do not use a one-size-fits-all drug shortcut.</strong> Agent selection depends on comorbidity, current treatment, pregnancy status, renal function and whether acute target-organ damage is present.",
      "Avoid precipitous BP lowering in an asymptomatic patient."
    ],
    prevention:[
      "Medication adherence, home BP monitoring where appropriate, salt reduction, weight management, physical activity and cardiovascular risk-factor control."
    ],
    referral:[
      "Immediate ED/hospital referral for suspected hypertensive emergency or other unstable features."
    ],
    sources:[
      ["MOH Malaysia: Management of Hypertension, 5th Edition","https://www.moh.gov.my/moh/resources/penerbitan/CPG/MSH%20Hypertension%20CPG%202018%20V3.8%20FA.pdf"],
      ["MOH Malaysia CPG directory","https://www.moh.gov.my/penerbitan-dan-laporan/dasar-akta-polisi-garis-panduan/penerbitan-klinikal/senarai-penerbitan-klinikal/panduan-amalan-klinikal-cpg"]
    ]
  },
  {
    id:"anaphylaxis",
    title:"Bee sting / allergic reaction / anaphylaxis",
    category:"Emergency / allergy",
    synonyms:["bee sting","sengatan lebah","anaphylaxis","anaphylactic","allergic reaction","urticaria after sting","adrenaline"],
    evidence:"RCUK 2025 / ASCIA",
    redFlags:[
      "Airway swelling/stridor, wheeze or severe breathing difficulty.",
      "Hypotension, collapse, syncope, shock, or rapidly progressive multi-system reaction.",
      "Anaphylaxis can occur without a skin rash."
    ],
    assessment:[
      "Differentiate a local reaction or isolated urticaria from anaphylaxis involving airway, breathing or circulation.",
      "Remove a visible stinger promptly if present; assess ABC and vital signs."
    ],
    treatment:[
      "Local sting reaction: cold compress, simple analgesia; oral non-sedating antihistamine may help itch/urticaria.",
      "Anaphylaxis: lay flat (or position for breathing/pregnancy as appropriate), call emergency help, give IM adrenaline into outer mid-thigh without delay, provide oxygen/IV access/fluids as clinically indicated."
    ],
    meds:[
      "<strong>IM adrenaline 1 mg/mL (1:1000):</strong> 0.01 mg/kg up to 0.5 mg per dose; adult standard 0.5 mg IM. Repeat after 5 minutes if life-threatening features persist.",
      "Antihistamines are adjuncts for skin symptoms; they must not delay adrenaline in anaphylaxis."
    ],
    prevention:[
      "Document trigger. Patients with systemic sting anaphylaxis may need allergy specialist assessment, emergency action plan and consideration of venom immunotherapy/adrenaline autoinjector."
    ],
    referral:[
      "All anaphylaxis requires emergency transfer/observation according to local protocol; escalate refractory reactions early."
    ],
    dose:"adrenaline",
    sources:[
      ["Resuscitation Council UK 2025: Special circumstances / anaphylaxis","https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/special-circumstances-guidelines"],
      ["ASCIA: Acute management of anaphylaxis","https://www.allergy.org.au/hp/anaphylaxis/acute-management-guidelines"]
    ]
  },
  {
    id:"zoster",
    title:"Herpes zoster (shingles / kayap)",
    category:"Dermatology / infectious disease",
    synonyms:["shingles","kayap","herpes zoster","acyclovir","aciclovir","zoster"],
    evidence:"Malaysia NAG / FUKKM",
    redFlags:[
      "Ophthalmic involvement (tip of nose/eye symptoms), facial or auricular involvement, neurological deficit.",
      "Disseminated rash, severe systemic illness or immunocompromised patient.",
      "Motor weakness, urinary retention, meningism or severe atypical pain."
    ],
    assessment:[
      "Confirm a painful unilateral dermatomal vesicular eruption; assess eye/ear/neurological involvement and immune status.",
      "Ask when rash began; antiviral benefit is greatest when started early."
    ],
    treatment:[
      "Analgesia and skin care; keep lesions clean/dry and reduce transmission risk until lesions crust.",
      "Systemic antiviral treatment is particularly indicated in immunocompromised patients and in immunocompetent patients with higher-risk features such as older age, moderate/severe pain/rash or non-truncal involvement."
    ],
    meds:[
      "<strong>Acyclovir adult reference:</strong> 800 mg PO five times daily for 7 days for varicella-zoster treatment in Malaysian antimicrobial/formulary references.",
      "Adjust for renal impairment and maintain hydration. Topical acyclovir is not recommended as treatment for herpes zoster."
    ],
    prevention:[
      "Cover lesions; avoid direct contact with susceptible pregnant people, neonates and immunocompromised individuals until crusted.",
      "Discuss zoster vaccination when age/risk-appropriate and available."
    ],
    referral:[
      "Urgent ophthalmology/ED for suspected herpes zoster ophthalmicus; hospital/specialist care for disseminated, complicated or severely immunocompromised cases."
    ],
    sources:[
      ["MOH Pharmaceutical Services: Formulari Ubat KKM – acyclovir","https://pharmacy.moh.gov.my/en/apps/fukkm?generic=acyclovir"],
      ["Malaysia National Antimicrobial Guideline (zoster section)","https://jknselangor.moh.gov.my/hbanting/phocadownload/Unit%20Kuliti/national-antimicrobial-guideline-2019-full-version-3rd-edition_0.pdf"]
    ]
  },
  {
    id:"varicella",
    title:"Varicella (chickenpox / cacar air)",
    category:"Paediatrics / infectious disease",
    synonyms:["chickenpox","cacar air","varicella","acyclovir chickenpox"],
    evidence:"CDC / FUKKM",
    redFlags:[
      "Respiratory distress/pneumonia, neurological symptoms, severe dehydration or toxic appearance.",
      "Immunocompromised patient, pregnancy, neonate, or extensive/severe disease.",
      "Secondary bacterial infection: rapidly worsening erythema, severe pain, purulence or systemic illness."
    ],
    assessment:[
      "Confirm typical crops of vesicles at different stages; identify immune status, pregnancy exposure and complications.",
      "Ask timing of rash onset if antiviral treatment is being considered."
    ],
    treatment:[
      "Otherwise healthy young children with uncomplicated typical varicella usually need supportive care rather than routine oral acyclovir.",
      "Use oral antiviral selectively for patients at increased risk of moderate/severe disease; severe or immunocompromised disease may require IV acyclovir/hospital care."
    ],
    meds:[
      "Symptomatic care: paracetamol for fever/pain where appropriate. Avoid aspirin in children; avoid NSAIDs if there is concern for varicella-associated invasive skin/soft-tissue infection.",
      "When acyclovir is indicated, verify exact age/weight indication, formulation, renal function and local guideline before prescribing."
    ],
    prevention:[
      "Exclude/avoid susceptible high-risk contacts until all lesions are crusted. Vaccination prevents varicella where available/appropriate.",
      "High-risk susceptible contacts may require post-exposure prophylaxis; seek current specialist/local guidance."
    ],
    referral:[
      "Refer/admit for red flags, pregnancy, neonates, significant immunocompromise or complicated disease."
    ],
    sources:[
      ["CDC: Clinical Guidance for People at Risk for Severe Varicella","https://www.cdc.gov/chickenpox/hcp/clinical-guidance/index.html"],
      ["MOH Pharmaceutical Services: Formulari Ubat KKM – acyclovir","https://pharmacy.moh.gov.my/en/apps/fukkm?generic=acyclovir"]
    ]
  },
  {
    id:"fungal-otitis",
    title:"Fungal otitis externa",
    category:"ENT",
    synonyms:["fungal ear","fungal otitis externa","otomycosis","kulat telinga","candid ear drop","clotrimazole ear"],
    evidence:"NHS ENT 2025",
    redFlags:[
      "Pain out of proportion, cranial nerve deficit/facial palsy, granulation tissue, systemic illness.",
      "Older diabetic or immunocompromised patient with severe persistent otalgia: consider necrotising otitis externa.",
      "Canal swollen shut, significant cellulitis, or suspected mastoid/complicated disease."
    ],
    assessment:[
      "Fungal disease is more likely with prominent itch, debris and failure after antibacterial drops; inspect tympanic membrane where possible.",
      "Consider swab/mycology if refractory or diagnosis is uncertain."
    ],
    treatment:[
      "Aural toilet/cleaning when feasible, keep ear dry, avoid cotton buds/trauma.",
      "Topical antifungal treatment is preferred for confirmed/suspected fungal otitis externa."
    ],
    meds:[
      "<strong>Clotrimazole 1% solution:</strong> a common specialist primary-care regimen is 2–3 drops 2–3 times daily, continued for at least 14 days after symptoms/infection have resolved.",
      "If tympanic membrane perforation/grommet is present or cannot be excluded, verify product ototoxicity/suitability or seek ENT/pharmacy advice."
    ],
    prevention:[
      "Keep canal dry during treatment; avoid instrumentation/cotton buds and manage eczema/dermatitis if contributing."
    ],
    referral:[
      "Emergency ENT for necrotising otitis externa concern or severe canal closure; routine ENT if persistent despite adequate treatment."
    ],
    sources:[
      ["NHS GGC 2025: Fungal otitis externa","https://www.rightdecisions.scot.nhs.uk/ggc-primary-care/ear-nose-and-throat-ent/ear-nose-and-throat-ent-referral-guidance/ear-conditions/otorrhoea/with-itch/"],
      ["NHS GGC 2025: Otitis externa referral guidance","https://www.rightdecisions.scot.nhs.uk/ggc-primary-care/ear-nose-and-throat-ent/ear-nose-and-throat-ent-referral-guidance/ear-conditions/otalgia/otitis-externa/"]
    ]
  },
  {
    id:"dengue",
    title:"Suspected dengue in adults",
    category:"Infectious disease / acute care",
    synonyms:["dengue","denggi","demam denggi","ns1","platelet dengue"],
    evidence:"MOH Malaysia",
    redFlags:[
      "Shock or haemodynamic instability, severe bleeding, respiratory distress/fluid accumulation.",
      "Severe abdominal pain, persistent vomiting, lethargy/restlessness, mucosal bleeding, organ impairment or rapid clinical deterioration.",
      "High-risk patient unable to maintain adequate oral intake or reliable monitoring."
    ],
    assessment:[
      "Assess illness day, hydration, haemodynamics, warning signs and comorbidities; trend rather than rely on one platelet count.",
      "Provide explicit return precautions because deterioration often occurs around defervescence/critical phase."
    ],
    treatment:[
      "Encourage appropriate oral fluids if stable and tolerating; use structured follow-up/monitoring.",
      "Fluid therapy for warning signs/shock must follow dengue-specific protocol—avoid indiscriminate IV fluids."
    ],
    meds:[
      "Paracetamol may be used for fever/pain within safe dosing limits.",
      "<strong>Avoid aspirin and NSAIDs</strong> because of bleeding risk."
    ],
    prevention:[
      "Mosquito bite prevention during illness to reduce onward transmission; eliminate breeding sites."
    ],
    referral:[
      "Refer/admit for warning signs, severe dengue, inability to maintain oral intake, significant comorbidity/pregnancy or unreliable follow-up."
    ],
    sources:[
      ["MOH Sabah: CPG Management of Dengue Infection in Adults resources","https://jknsabah.moh.gov.my/jkns/cpg-management-of-dengue-infection-in-adults"],
      ["MOH InfoSihat: Home care for dengue patients","https://infosihat.moh.gov.my/penerbitan-multimedia/risalah/item/panduan-penjagaan-2.html"]
    ]
  },
  {
    id:"oa-knee",
    title:"Knee osteoarthritis",
    category:"Musculoskeletal",
    synonyms:["oa knee","osteoarthritis knee","osteoarthritis lutut","knee pain","lutut sakit","glucosamine"],
    evidence:"NICE NG226",
    redFlags:[
      "Hot swollen joint, fever/systemic illness, acute inability to weight-bear, major trauma.",
      "Rapidly progressive deformity, suspected inflammatory arthritis, malignancy or referred pain."
    ],
    assessment:[
      "Typical OA can often be diagnosed clinically in adults ≥45 with activity-related pain and no/prolonged morning stiffness ≤30 minutes.",
      "Routine imaging is not required for a typical presentation unless atypical features suggest another diagnosis."
    ],
    treatment:[
      "Core treatment: tailored therapeutic exercise plus education; weight management where appropriate.",
      "Use medication to support function/exercise, at the lowest effective dose for the shortest necessary period."
    ],
    meds:[
      "<strong>Topical NSAID:</strong> offer for knee OA if no contraindication.",
      "If topical treatment is ineffective/unsuitable, consider oral NSAID after GI/renal/CV risk review and gastroprotection where indicated.",
      "Do not routinely offer glucosamine or strong opioids."
    ],
    prevention:[
      "Long-term exercise adherence, strengthening/aerobic activity, weight management and fall-risk optimisation where relevant."
    ],
    referral:[
      "Consider orthopaedic referral when symptoms substantially impair quality of life and appropriate non-surgical management is ineffective/unsuitable."
    ],
    sources:[
      ["NICE NG226: Osteoarthritis in over 16s","https://www.nice.org.uk/guidance/ng226/chapter/recommendations"]
    ]
  },
  {
    id:"rash-triage",
    title:"Rash: rapid primary-care triage",
    category:"Dermatology / symptom approach",
    synonyms:["rash","ruam","urticaria","eczema","tinea","scabies","impetigo","petechiae","purpura","vesicle"],
    evidence:"Clinical triage framework",
    redFlags:[
      "Non-blanching petechiae/purpura with fever or toxicity.",
      "Mucosal involvement, blistering or skin detachment (possible severe cutaneous adverse reaction).",
      "Facial/airway swelling, wheeze or hypotension (anaphylaxis).",
      "Rapidly progressive severe pain, crepitus or systemic toxicity (deep soft-tissue infection)."
    ],
    assessment:[
      "Describe morphology: maculopapular, urticarial, vesicular, pustular, scaly, petechial/purpuric, targetoid.",
      "Check blanching, distribution, itch vs pain, mucosal involvement, fever/systemic symptoms, new medicines and exposure/contact history.",
      "Common patterns to consider: urticaria, eczema, tinea, scabies, impetigo, cellulitis, viral exanthem and drug eruption."
    ],
    treatment:[
      "Treat the identified diagnosis rather than using a generic 'rash' prescription.",
      "Avoid empiric topical steroid on a possibly fungal lesion unless the diagnosis and combination strategy are clear."
    ],
    meds:[
      "Medication is diagnosis-specific. Use this topic to triage morphology and red flags, then search the specific diagnosis before prescribing."
    ],
    prevention:[
      "Advise infection-control measures where contagious disease is suspected and review new medication/exposure triggers."
    ],
    referral:[
      "Urgent ED/dermatology review for any red flag or rapidly progressive/uncertain severe eruption."
    ],
    sources:[
      ["MOH Malaysia CPG directory","https://www.moh.gov.my/penerbitan-dan-laporan/dasar-akta-polisi-garis-panduan/penerbitan-klinikal/senarai-penerbitan-klinikal/panduan-amalan-klinikal-cpg"]
    ]
  }
];

const quick = ["influenza","hypertension","anaphylaxis","zoster","fungal-otitis","dengue","oa-knee","rash-triage"];

const els = {
  search: document.getElementById("searchInput"),
  clear: document.getElementById("clearBtn"),
  results: document.getElementById("results"),
  chips: document.getElementById("quickChips"),
  age: document.getElementById("ageInput"),
  weight: document.getElementById("weightInput"),
  dose: document.getElementById("dosePanel")
};

function norm(s){ return (s||"").toLowerCase().trim(); }

function scoreCase(c,q){
  if(!q) return 1;
  const hay = [c.title,c.category,...c.synonyms,...c.meds].join(" ").toLowerCase();
  if(norm(c.title)===q) return 100;
  if(c.synonyms.some(s=>norm(s)===q)) return 90;
  if(hay.includes(q)) return 50;
  const terms=q.split(/\s+/).filter(Boolean);
  return terms.reduce((n,t)=>n+(hay.includes(t)?5:0),0);
}

function section(title, items, cls="block"){
  if(!items?.length) return "";
  return `<section class="${cls}"><h3>${title}</h3><ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul></section>`;
}

function card(c){
  return `
  <article class="case-card">
    <div class="case-head">
      <div><h2>${c.title}</h2><div class="category">${c.category}</div></div>
      <span class="evidence">${c.evidence}</span>
    </div>
    ${section("🚩 Red flags / do not miss",c.redFlags,"redflags")}
    <div class="case-body">
      ${section("Assessment",c.assessment)}
      ${section("Treatment",c.treatment)}
      <section class="block"><h3>Medication</h3>${c.meds.map(x=>`<div class="med">${x}</div>`).join("")}</section>
      ${section("Prevention / counselling",c.prevention)}
      ${section("Referral / escalation",c.referral)}
      <section class="block source-list"><h3>Primary sources</h3>
        ${c.sources.map(([t,u])=>`<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`).join("")}
        <p class="small">Content last reviewed ${reviewed}. Check the linked source if recommendations may have changed.</p>
      </section>
    </div>
  </article>`;
}

function render(){
  const q=norm(els.search.value);
  const matches=cases.map(c=>[c,scoreCase(c,q)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
  if(!matches.length){
    els.results.innerHTML=`<div class="empty"><strong>No topic found.</strong><br>Try another diagnosis/synonym. This MVP intentionally does not invent treatment for an unlisted case.</div>`;
    els.dose.classList.add("hidden");
    return;
  }
  const shown=q?matches.slice(0,4):matches.slice(0,5);
  els.results.innerHTML=shown.map(card).join("");
  renderDose(shown[0]);
}

function oseltamivirDose(age,weight){
  if(!weight || weight<=0) return "Enter weight to calculate.";
  if(age!==null && age<1) return `Treatment reference: ${round(weight*3)} mg per dose, PO twice daily for 5 days (age <1 year; verify exact infant-age recommendation and formulation).`;
  if(weight<=15) return "Treatment reference: 30 mg PO twice daily for 5 days.";
  if(weight<=23) return "Treatment reference: 45 mg PO twice daily for 5 days.";
  if(weight<=40) return "Treatment reference: 60 mg PO twice daily for 5 days.";
  return "Treatment reference: 75 mg PO twice daily for 5 days.";
}

function adrenalineDose(weight){
  if(!weight || weight<=0) return "Enter weight to calculate.";
  const mg=Math.min(weight*0.01,0.5);
  return `IM adrenaline 1 mg/mL (1:1000): ${round(mg)} mg = ${round(mg)} mL into outer mid-thigh. Repeat after 5 min if life-threatening features persist. Max 0.5 mg/dose.`;
}

function round(n){ return Math.round(n*100)/100; }

function renderDose(c){
  const ageRaw=parseFloat(els.age.value), weight=parseFloat(els.weight.value);
  const age=Number.isFinite(ageRaw)?ageRaw:null;
  let html="";
  if(c?.dose==="oseltamivir") html=`<h3>Quick dose helper — oseltamivir</h3><p>${oseltamivirDose(age,weight)}</p><p class="small">Dose helper does not apply renal adjustment and does not convert mg to mL. Verify product concentration.</p>`;
  if(c?.dose==="adrenaline") html=`<h3>Emergency dose helper — IM adrenaline</h3><p>${adrenalineDose(weight)}</p><p class="small">For suspected anaphylaxis. Do not delay emergency escalation.</p>`;
  if(html){ els.dose.innerHTML=html; els.dose.classList.remove("hidden"); }
  else els.dose.classList.add("hidden");
}

quick.forEach(id=>{
  const c=cases.find(x=>x.id===id);
  const b=document.createElement("button");
  b.type="button"; b.className="chip"; b.textContent=c.title;
  b.onclick=()=>{els.search.value=c.synonyms[0]||c.title; render(); window.scrollTo({top:0,behavior:"smooth"});};
  els.chips.appendChild(b);
});

els.search.addEventListener("input",render);
els.age.addEventListener("input",render);
els.weight.addEventListener("input",render);
els.clear.addEventListener("click",()=>{els.search.value="";els.age.value="";els.weight.value="";render();els.search.focus();});

render();
