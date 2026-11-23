// Scores & renal function panel: CrCl (Cockcroft–Gault), eGFR (CKD-EPI 2021), CURB-65/CRB-65, WHO IMCI dehydration.
(function(){
const L = (ms, en) => (window.getLang && getLang() === "en") ? en : ms;
const r1 = x => Math.round(x * 10) / 10;

function renalHtml(){
  return `<div class="score-box" id="renalBox">
    <h3>${L("Fungsi buah pinggang (dewasa)","Renal function (adult)")}</h3>
    <div class="tool-grid score-grid">
      <label>${L("Umur (tahun)","Age (years)")}<input id="rAge" type="number" inputmode="decimal" min="18" max="110"></label>
      <label>${L("Berat (kg)","Weight (kg)")}<input id="rWt" type="number" inputmode="decimal" min="20" max="250"></label>
      <label>${L("Jantina","Sex")}<select id="rSex"><option value="m">${L("Lelaki","Male")}</option><option value="f">${L("Perempuan","Female")}</option></select></label>
      <label>${L("Kreatinin serum (µmol/L)","Serum creatinine (µmol/L)")}<input id="rCr" type="number" inputmode="decimal" min="20" max="2000"></label>
    </div>
    <div id="rOut" class="dose-panel hidden" aria-live="polite"></div>
  </div>`;
}
function renalCalc(){
  const age=parseFloat(rAge.value), wt=parseFloat(rWt.value), cr=parseFloat(rCr.value), f=rSex.value==="f", out=document.getElementById("rOut");
  if(!(age>=18&&cr>0)){ out.classList.add("hidden"); return; }
  const scr=cr/88.4, k=f?0.7:0.9, a=f?-0.241:-0.302;
  const egfr=142*Math.pow(Math.min(scr/k,1),a)*Math.pow(Math.max(scr/k,1),-1.2)*Math.pow(0.9938,age)*(f?1.012:1);
  const crcl= wt>0 ? (140-age)*wt*(f?1.04:1.23)/cr : null;
  const ref = crcl ?? egfr;
  const notes=[];
  if(egfr<30) notes.push(L("<strong>Nitrofurantoin: kontraindikasi</strong> (eGFR &lt;30 — NAG C7/C9).","<strong>Nitrofurantoin: contraindicated</strong> (eGFR &lt;30 — NAG C7/C9)."));
  if(ref<30) notes.push(L("<strong>Colchicine:</strong> CrCl &lt;30 — pertimbang alternatif (CPG Gout 2021).","<strong>Colchicine:</strong> CrCl &lt;30 — consider an alternative (Gout CPG 2021)."));
  if(ref<60) notes.push(L("<strong>NSAID:</strong> elak dalam CKD (CPG Gout 2021); semak dos antibiotik/antiviral (cth. acyclovir, oseltamivir) mengikut fungsi renal — NAG Appendix 2.","<strong>NSAIDs:</strong> avoid in CKD (Gout CPG 2021); check renal dosing of antibiotics/antivirals (e.g. acyclovir, oseltamivir) — NAG Appendix 2."));
  if(ref<15) notes.push(L("Fungsi renal sangat rendah — bincang dengan pakar.","Very low renal function — discuss with a specialist."));
  out.innerHTML=`<p class="dose-answer">eGFR (CKD-EPI 2021): <strong>${Math.round(egfr)} mL/min/1.73m²</strong>${crcl!=null?`<br>CrCl (Cockcroft–Gault): <strong>${Math.round(crcl)} mL/min</strong>`:`<br><span class="small">${L("Isi berat untuk CrCl.","Enter weight for CrCl.")}</span>`}</p>
    ${notes.length?`<ul class="score-notes">${notes.map(n=>`<li>${n}</li>`).join("")}</ul>`:`<p class="small">${L("Tiada amaran renal untuk ubat dalam app ini pada tahap ini.","No renal warnings for drugs in this app at this level.")}</p>`}
    <p class="small">${L("Cockcroft–Gault guna berat sebenar; dalam obesiti boleh terlebih anggar. NAG Appendix 2 guna CrCl untuk pelarasan dos antibiotik.","Cockcroft–Gault uses actual body weight and may overestimate in obesity. NAG Appendix 2 uses CrCl for antibiotic dose adjustment.")}</p>`;
  out.classList.remove("hidden");
}

function curbHtml(){
  const items=[["c",L("Keliru (baru)","New confusion")],["u",L("Urea &gt;7 mmol/L (jika ada)","Urea &gt;7 mmol/L (if available)")],["r",L("RR ≥30/min","RR ≥30/min")],["b",L("SBP &lt;90 atau DBP ≤60 mmHg","SBP &lt;90 or DBP ≤60 mmHg")],["a",L("Umur ≥65 tahun","Age ≥65 years")]];
  return `<div class="score-box"><h3>CURB-65 / CRB-65 — ${L("pneumonia dewasa","adult pneumonia")}</h3>
    <div class="checks">${items.map(([k,l])=>`<label class="check"><input type="checkbox" data-curb="${k}"> ${l}</label>`).join("")}</div>
    <div id="curbOut" class="dose-panel" aria-live="polite"></div></div>`;
}
function curbCalc(){
  const v=k=>document.querySelector(`[data-curb="${k}"]`).checked?1:0;
  const crb=v("c")+v("r")+v("b")+v("a"), curb=crb+v("u");
  const crbTxt = crb>=2 ? L("<strong>CRB-65 ≥2: pertimbang kemasukan hospital</strong> (NAG C1).","<strong>CRB-65 ≥2: consider hospital admission</strong> (NAG C1).")
                        : L("CRB-65 0–1: rawatan luar mungkin sesuai jika tiada faktor lain.","CRB-65 0–1: outpatient care may be suitable if no other concerns.");
  const curbTxt = curb>=3 ? L("CURB-65 3–5: pneumonia teruk — rujuk/masuk wad segera.","CURB-65 3–5: severe pneumonia — urgent admission.")
                 : curb===2 ? L("CURB-65 2: risiko sederhana — pertimbang kemasukan.","CURB-65 2: moderate risk — consider admission.")
                 : L("CURB-65 0–1: risiko rendah.","CURB-65 0–1: low risk.");
  document.getElementById("curbOut").innerHTML=`<p class="dose-answer">CRB-65 = <strong>${crb}</strong> · CURB-65 = <strong>${curb}</strong></p>
   <ul class="score-notes"><li>${crbTxt}</li><li>${curbTxt}</li><li>${L("Juga pertimbang kemasukan jika SpO₂ &lt;95%, ada komorbiditi atau tidak boleh makan/minum (NAG C1).","Also consider admission for SpO₂ &lt;95%, comorbidities or inability to maintain oral intake (NAG C1).")}</li></ul>`;
}

// IMCI: SEVERE = ≥2 of {lethargic/unconscious, sunken eyes, unable/poor drinking, pinch very slow};
// SOME = ≥2 of {restless/irritable, sunken eyes, drinks eagerly, pinch slow}.
const DH=[
  {k:"leth",g:"S",ms:"Lesu / tidak sedar",en:"Lethargic or unconscious"},
  {k:"rest",g:"M",ms:"Gelisah / mudah marah",en:"Restless, irritable"},
  {k:"eyes",g:"SM",ms:"Mata cengkung",en:"Sunken eyes"},
  {k:"nodr",g:"S",ms:"Tidak boleh minum / minum sedikit",en:"Not able to drink or drinking poorly"},
  {k:"thir",g:"M",ms:"Minum dengan rakus / dahaga",en:"Drinks eagerly, thirsty"},
  {k:"vslo",g:"S",ms:"Cubitan kulit kembali SANGAT perlahan (>2 s)",en:"Skin pinch goes back VERY slowly (>2 s)"},
  {k:"slow",g:"M",ms:"Cubitan kulit kembali perlahan (<2 s)",en:"Skin pinch goes back slowly (<2 s)"}
];
function dehydHtml(){
  return `<div class="score-box"><h3>${L("Dehidrasi kanak-kanak (PP5 / WHO)","Child dehydration (PP5 / WHO)")}</h3>
    <div class="checks">${DH.map(d=>`<label class="check"><input type="checkbox" data-dh="${d.k}"> ${L(d.ms,d.en)}</label>`).join("")}</div>
    <div id="dhOut" class="dose-panel" aria-live="polite"></div></div>`;
}
function dehydCalc(){
  const on=DH.filter(d=>document.querySelector(`[data-dh="${d.k}"]`).checked);
  const s=on.filter(d=>d.g.includes("S")).length, m=on.filter(d=>d.g.includes("M")).length;
  let cls, plan;
  if(s>=2){cls=L("<strong>DEHIDRASI TERUK</strong> (>10%)","<strong>SEVERE DEHYDRATION</strong> (>10%)"); plan=L("Plan C: cecair IV segera / rujuk kecemasan. Jangan guna kalkulator defisit sahaja untuk renjatan.","Plan C: urgent IV fluids / emergency referral. Do not rely on a deficit calculator in shock.");}
  else if(m>=2){cls=L("<strong>DEHIDRASI SEDERHANA</strong> (5–10%, IMCI 'some')","<strong>MODERATE / SOME DEHYDRATION</strong> (5–10%)"); plan=L(`Plan B: ORS 75 mL/kg dalam 4 jam, kemudian nilai semula. <button type="button" class="chip tool-link" data-tool="ors-plan-b">Kira ORS Plan B →</button>`,`Plan B: ORS 75 mL/kg over 4 h, then reassess. <button type="button" class="chip tool-link" data-tool="ors-plan-b">Calculate ORS Plan B →</button>`);}
  else {cls=L("<strong>DEHIDRASI RINGAN / TIADA TANDA</strong> (<5%)","<strong>MILD / NO SIGNS OF DEHYDRATION</strong> (<5%)"); plan=L("Plan A: cecair tambahan dan ORS di rumah, teruskan makan; beri nasihat bila perlu kembali.","Plan A: extra fluids and ORS at home, continue feeding; advise when to return.");}
  document.getElementById("dhOut").innerHTML=`<p class="dose-answer">${cls}</p><p>${plan}</p><p class="small">${L("Klasifikasi perlukan ≥2 tanda dalam kumpulan. Bayi &lt;2 bulan dan malnutrisi teruk perlu pendekatan berbeza.","Classification needs ≥2 signs in a group. Infants <2 months and severe malnutrition need a different approach.")}</p>`;
}

window.renderScores = function(root){
  root.innerHTML = `<div class="section-title-row"><div><p class="section-kicker">${L("Skor klinikal","Clinical scores")}</p><h2>${L("CrCl/eGFR, CURB-65, dehidrasi","CrCl/eGFR, CURB-65, dehydration")}</h2></div><span class="safe-badge">${L("sokongan keputusan","decision support")}</span></div>
    ${renalHtml()}${curbHtml()}${dehydHtml()}
    <div class="source-list"><h3>${L("Sumber","Sources")}</h3>
      <a href="https://sites.google.com/moh.gov.my/nag/contents/section-c-clinical-pathways-in-primary-care/c1-acute-bronchitis-and-pneumonia" target="_blank" rel="noopener noreferrer">MOH NAG 2024 — C1 Pathway: CRB-65</a>
      <a href="https://sites.google.com/moh.gov.my/nag/contents/section-c-clinical-pathways-in-primary-care/c7-urinary-tract-infection-in-non-pregnancy" target="_blank" rel="noopener noreferrer">MOH NAG 2024 — C7: nitrofurantoin and eGFR</a>
      <a href="https://mymahtas2.moh.gov.my/files/e-CPG_Management_of_Gout_(Second_Edition)%20(3).pdf" target="_blank" rel="noopener noreferrer">MaHTAS CPG Gout 2021 — colchicine/NSAID in renal impairment</a>
      <a href="https://www.nejm.org/doi/full/10.1056/NEJMoa2102953" target="_blank" rel="noopener noreferrer">Inker et al. NEJM 2021 — CKD-EPI 2021 creatinine equation</a>
      <a href="https://sites.google.com/moh.gov.my/nag/contents/section-a-adult/a11-respiratory-infections" target="_blank" rel="noopener noreferrer">MOH NAG 2024 — A11: CURB-65 interpretation</a>
      <a href="https://thorax.bmj.com/content/58/5/377" target="_blank" rel="noopener noreferrer">Lim et al. Thorax 2003 — CURB-65</a>
      <a href="https://mpaeds.my/wp-content/uploads/2026/03/Paediatric-Protocols-for-Malaysia-Hospital-1.pdf" target="_blank" rel="noopener noreferrer">MOH Paediatric Protocols 5th ed. (2025) — Ch. 10 dehydration chart & Plan B</a>
      <a href="https://www.who.int/publications/m/item/integrated-management-of-childhood-illness---chart-booklet-(march-2014)" target="_blank" rel="noopener noreferrer">WHO IMCI Chart Booklet 2014 — dehydration classification</a>
    </div>`;
  ["rAge","rWt","rSex","rCr"].forEach(id=>document.getElementById(id).addEventListener("input",renalCalc));
  document.getElementById("rSex").addEventListener("change",renalCalc);
  root.querySelectorAll("[data-curb]").forEach(x=>x.addEventListener("change",curbCalc));
  root.querySelectorAll("[data-dh]").forEach(x=>x.addEventListener("change",dehydCalc));
  curbCalc(); dehydCalc();
};
})();
