// Paediatric normal values — MOH Paediatric Protocols for Malaysian Hospitals, 5th ed. (2025).
// Chapter 1 (vital signs, BP, anthropometry, haematology), Ch. 9 (Na/K), neonatal hypoglycaemia,
// Ch. 61 (DKA), Ch. 71 (hypertension staging), pneumonia chapter (tachypnoea).
(function(){
const L = (ms, en) => (window.getLang && getLang() === "en") ? en : ms;
const PP5 = "https://mpaeds.my/wp-content/uploads/2026/03/Paediatric-Protocols-for-Malaysia-Hospital-1.pdf";

// RR & HR, 5th–95th centile (Ch.1). Blank cells in the printed table continue the band above.
const RRHR = [ // [fromMonths, toMonths, label, rrLo, rrHi, hrLo, hrHi]
  [0,3,{ms:"Lahir – <3 bulan",en:"Birth – <3 months"},25,50,120,170],
  [3,6,{ms:"3 – <6 bulan",en:"3 – <6 months"},25,45,115,160],
  [6,24,{ms:"6 – <24 bulan",en:"6 – <24 months"},20,40,110,160],
  [24,36,{ms:"2 tahun",en:"2 years"},20,30,100,150],
  [36,48,{ms:"3 tahun",en:"3 years"},20,30,90,140],
  [48,72,{ms:"4 – 5 tahun",en:"4 – 5 years"},20,30,80,135],
  [72,96,{ms:"6 – 7 tahun",en:"6 – 7 years"},20,30,80,130],
  [96,144,{ms:"8 – 11 tahun",en:"8 – 11 years"},15,25,70,120],
  [144,168,{ms:"12 – 13 tahun",en:"12 – 13 years"},12,24,65,115],
  [168,1e9,{ms:"≥14 tahun",en:"≥14 years"},12,24,60,110]
];
const BP5 = [[0,1,"< 1",65,75],[1,2,"1 – 2",70,75],[2,4,"2 – 3",70,80],[4,12,"4 – 11",80,90],[12,99,"≥ 12",90,105]];
// BP percentiles (Ch.1, from Nelson 18th ed.). For each age 1–14: heights [5%,50%,95%], SBP/DBP at 50/90/95th for each height column.
const BPT = {
 f:{1:{h:[75.4,80.8,86.1],s:[[84,86,88],[98,100,102],[101,103,105]],d:[[41,43,46],[54,56,58],[59,60,62]]},
    2:{h:[84.9,91.1,97.4],s:[[87,89,91],[101,103,106],[104,106,109]],d:[[45,48,51],[58,60,62],[62,64,66]]},
    3:{h:[91,97.6,104.6],s:[[88,90,93],[102,104,107],[106,108,110]],d:[[48,50,53],[60,62,65],[64,66,69]]},
    4:{h:[97.2,104.5,112.2],s:[[89,92,94],[103,106,108],[107,109,112]],d:[[50,53,55],[62,65,67],[66,69,71]]},
    5:{h:[103.6,111.5,120],s:[[90,93,96],[104,107,110],[108,110,113]],d:[[52,55,57],[64,67,70],[68,71,73]]},
    6:{h:[110,118.4,127.7],s:[[92,94,97],[105,108,111],[109,111,114]],d:[[54,56,59],[67,69,71],[70,72,74]]},
    7:{h:[115.9,124.9,134.7],s:[[92,95,99],[106,109,112],[109,112,115]],d:[[55,57,60],[68,70,72],[72,73,75]]},
    8:{h:[121,130.6,140.9],s:[[93,97,100],[107,110,113],[110,113,117]],d:[[56,59,61],[69,72,73],[72,74,75]]},
    9:{h:[125.3,135.6,146.6],s:[[95,98,101],[108,111,114],[112,114,118]],d:[[57,60,61],[71,73,73],[74,75,75]]},
    10:{h:[129.7,141,152.8],s:[[96,99,103],[109,112,116],[113,116,120]],d:[[58,60,62],[72,73,73],[75,76,76]]},
    11:{h:[135.6,147.8,160],s:[[98,102,106],[111,114,120],[115,118,124]],d:[[60,61,64],[74,74,75],[76,77,77]]},
    12:{h:[142.8,154.8,166.4],s:[[102,105,108],[114,118,122],[118,122,126]],d:[[61,62,65],[75,75,76],[78,78,79]]},
    13:{h:[148.1,159.2,170.2],s:[[104,107,109],[116,121,123],[121,124,127]],d:[[62,64,66],[75,76,76],[79,79,81]]},
    14:{h:[150.6,161.3,172.1],s:[[105,108,109],[118,122,123],[123,125,127]],d:[[63,65,66],[76,76,77],[80,80,82]]}},
 m:{1:{h:[77.2,82.4,87.9],s:[[85,86,88],[98,100,101],[102,103,105]],d:[[40,41,42],[52,53,54],[54,55,57]]},
    2:{h:[86.1,92.1,98.5],s:[[87,89,91],[100,102,104],[104,106,108]],d:[[43,44,46],[55,56,58],[57,59,61]]},
    3:{h:[92.5,99,105.8],s:[[88,90,92],[101,103,105],[106,107,109]],d:[[45,47,49],[58,59,61],[60,62,64]]},
    4:{h:[98.5,105.9,113.2],s:[[90,92,94],[102,105,107],[107,108,110]],d:[[48,50,52],[60,62,64],[63,66,68]]},
    5:{h:[104.4,112.4,120.3],s:[[91,94,96],[103,106,108],[107,109,112]],d:[[51,53,55],[63,65,67],[66,69,71]]},
    6:{h:[110.3,118.9,127.5],s:[[93,95,98],[105,107,110],[108,111,114]],d:[[54,56,58],[66,68,69],[69,71,73]]},
    7:{h:[116.1,125.1,134.5],s:[[94,97,99],[106,109,111],[110,112,116]],d:[[56,58,59],[68,70,71],[71,73,74]]},
    8:{h:[121.4,131,141],s:[[95,98,100],[107,110,112],[111,114,117]],d:[[57,59,60],[69,71,73],[72,74,75]]},
    9:{h:[126,136.3,147.1],s:[[96,99,101],[107,110,114],[112,115,119]],d:[[57,60,62],[70,73,74],[74,76,77]]},
    10:{h:[130.2,141.3,152.7],s:[[97,100,103],[108,112,116],[112,116,121]],d:[[59,62,63],[72,74,76],[76,77,78]]},
    11:{h:[134.7,146.4,158.6],s:[[99,102,106],[110,114,118],[114,118,124]],d:[[61,63,63],[74,75,76],[77,78,78]]},
    12:{h:[140.3,152.7,165.5],s:[[101,104,109],[113,117,122],[116,121,128]],d:[[61,62,63],[75,75,76],[78,78,79]]},
    13:{h:[147,160.3,173.4],s:[[103,108,112],[115,121,126],[119,125,131]],d:[[61,62,65],[74,75,77],[78,78,81]]},
    14:{h:[153.8,167.5,180.1],s:[[105,111,113],[119,126,129],[123,130,134]],d:[[60,64,67],[74,77,80],[77,81,84]]}}
};
// Haematology (Ch.1). [fromMonths,toMonths,label, Hb lo-hi, PCV lo-hi, TWBC lo-hi (x10^9/L), MCV lowest, MCH lowest]
const HAEM = [
  [0,1,{ms:"2 minggu (bayi <1 bulan)",en:"2 weeks (infant <1 month)"},[13.0,20.0],[42,66],[5,21],null,"29"],
  [1,6,{ms:"3 bulan (1 – <6 bulan)",en:"3 months (1 – <6 months)"},[9.5,14.5],[31,41],[6,18],null,"27"],
  [6,84,{ms:"6 bulan – 6 tahun",en:"6 months – 6 years"},[10.5,14.0],[33,42],[6,15],"70–74","25–31"],
  [84,156,{ms:"7 – 12 tahun",en:"7 – 12 years"},[11.0,16.0],[34,40],[4.5,13.5],"76–80","26–32"],
  [156,1e9,{ms:"Dewasa lelaki",en:"Adult male"},[14.0,18.0],[42,52],[5,10],"80","27–32","m"],
  [156,1e9,{ms:"Dewasa perempuan",en:"Adult female"},[12.0,16.0],[37,47],[5,10],"80","26–34","f"]
];
function kRange(m){ return m < 0.5 ? [3.7,6.0] : m < 3 ? [3.7,5.7] : [3.5,5.0]; }

const $ = id => document.getElementById(id);
const num = id => { const v = parseFloat($(id).value); return Number.isFinite(v) ? v : null; };
const pill = (cls, txt) => `<span class="flag ${cls}">${txt}</span>`;
const OK = () => pill("ok", L("Normal","Normal")), LO = t => pill("lo", "🔻 " + (t||L("Rendah","Low"))), HI = t => pill("hi", "🔺 " + (t||L("Tinggi","High")));
const DANGER = t => pill("danger", "⚠️ " + t);
function judge(v, lo, hi, loTxt, hiTxt){ return v < lo ? LO(loTxt) : v > hi ? HI(hiTxt) : OK(); }

function ageMonths(){
  const a = num("nAge"); if (a === null || a < 0) return null;
  return $("nAgeUnit").value === "m" ? a : a * 12;
}
function bpCols(sex, ageY, height){
  const row = BPT[sex][Math.min(14, Math.max(1, Math.floor(ageY)))];
  let col = 1;
  if (height) { let best = 1e9; row.h.forEach((h,i)=>{ const d=Math.abs(h-height); if(d<best){best=d;col=i;} }); }
  return { row, col, p50s:row.s[0][col], p90s:row.s[1][col], p95s:row.s[2][col], p50d:row.d[0][col], p90d:row.d[1][col], p95d:row.d[2][col] };
}
function stageBP(sbp, dbp, ageY, sex, height){
  if (ageY >= 13) {
    const st = (s,d) => (s>=140||d>=90) ? 3 : (s>=130||d>=80) ? 2 : (s>=120) ? 1 : 0;
    return { stage: st(sbp??0, dbp??0), ref: L("Dewasa (≥13 tahun): normal <120/<80","Adult cut-offs (≥13 y): normal <120/<80") };
  }
  const c = bpCols(sex, ageY, height);
  const thr = (p90,p95,elev,s1,s2) => ({e:Math.min(p90,elev), s1:Math.min(p95,s1), s2:Math.min(p95+12,s2)});
  const ts = thr(c.p90s,c.p95s,120,130,140), td = thr(c.p90d,c.p95d,80,80,90);
  const one = (v,t) => v==null ? 0 : v>=t.s2 ? 3 : v>=t.s1 ? 2 : v>=t.e ? 1 : 0;
  return { stage: Math.max(one(sbp,ts), one(dbp,td)),
    ref: L(`Umur ${Math.floor(ageY)} thn, ${sex==="f"?"perempuan":"lelaki"}, tinggi ~${c.row.h[c.col]} cm (${["5","50","95"][c.col]}th centile): 50th ${c.p50s}/${c.p50d}, 90th ${c.p90s}/${c.p90d}, 95th ${c.p95s}/${c.p95d} mmHg`,
           `Age ${Math.floor(ageY)} y, ${sex==="f"?"girl":"boy"}, height ~${c.row.h[c.col]} cm (${["5","50","95"][c.col]}th centile): 50th ${c.p50s}/${c.p50d}, 90th ${c.p90s}/${c.p90d}, 95th ${c.p95s}/${c.p95d} mmHg`) };
}
const STAGE = () => [L("Normal","Normal"), L("BP meningkat (elevated)","Elevated BP"), L("Julat HTN peringkat 1","Stage 1 HTN range"), L("Julat HTN peringkat 2","Stage 2 HTN range")];

function calc(){
  const m = ageMonths(), out = $("nOut");
  if (m === null) { out.innerHTML = `<p class="small">${L("Masukkan umur untuk melihat julat normal.","Enter age to see normal ranges.")}</p>`; return; }
  const ageY = m/12, sex = $("nSex").value, height = num("nHt");
  const rows = [];
  const add = (p, v, range, status) => rows.push(`<div class="nrow${v==null?" nrow-empty":""}"><div class="nhead"><span class="nparam">${p}</span>${v==null?"":`<strong class="nval">${v}</strong>${status}`}</div><div class="nrange">${L("Normal","Normal")}: ${range}</div></div>`);
  // weight estimate
  let wEst = null; if (m < 12) wEst = m*0.5+4; else if (ageY <= 10) wEst = (ageY+4)*2;
  // RR/HR
  const b = RRHR.find(r => m >= r[0] && m < r[1]);
  const rr = num("nRR"), hr = num("nHR");
  let rrStatus = rr==null ? "" : judge(rr, b[3], b[4]);
  const who = m < 2 ? 60 : m < 12 ? 50 : m < 60 ? 40 : null;
  if (rr!=null && who && rr > who) rrStatus += " " + DANGER(L(`Takipnea WHO (>${who}/min)`,`WHO tachypnoea (>${who}/min)`));
  add(L("Kadar pernafasan (RR)","Respiratory rate"), rr, `${b[3]}–${b[4]} /min${who?`<br><span class="small">${L("Takipnea (pneumonia)","Tachypnoea (pneumonia)")}: >${who}</span>`:""}`, rrStatus);
  add(L("Kadar nadi (HR)","Heart rate"), hr, `${b[5]}–${b[6]} /min`, hr==null?"":judge(hr, b[5], b[6], L("Bradikardia","Bradycardia"), L("Takikardia","Tachycardia")));
  // BP
  const sbp = num("nSBP"), dbp = num("nDBP");
  const sbp5 = Math.round(65 + 2*Math.min(ageY,15));
  const band = BP5.find(r => ageY >= r[0] && ageY < r[1]);
  let bpStatus = "", bpRange = `${L("SBP 5th centile","SBP 5th centile")}: ${band[3]}–${band[4]} (65 + 2×${L("umur","age")} ≈ ${sbp5})`;
  if (sbp!=null && sbp < sbp5) bpStatus = DANGER(L("SBP < 5th centile — TANDA BAHAYA","SBP < 5th centile — DANGER SIGN"));
  if ((sbp!=null||dbp!=null) && ageY >= 1) {
    const st = stageBP(sbp, dbp, ageY, sex, height);
    bpRange += `<br><span class="small">${st.ref}</span>`;
    if (!bpStatus) bpStatus = st.stage === 0 ? OK() : st.stage === 1 ? pill("hi", "🔺 " + STAGE()[1]) : pill(st.stage===3?"danger":"hi", (st.stage===3?"⚠️ ":"🔺 ") + STAGE()[st.stage]);
  } else if (sbp!=null && !bpStatus) bpStatus = OK();
  add(L("Tekanan darah","Blood pressure"), (sbp!=null||dbp!=null) ? `${sbp??"–"}/${dbp??"–"}` : null, bpRange, bpStatus);
  // haematology
  const h = HAEM.find(r => m >= r[0] && m < r[1] && (!r[8] || r[8] === sex));
  const hb = num("nHb"), pcv = num("nPCV"), wbc = num("nWBC");
  add("Hb (g/dL)", hb, `${h[3][0]}–${h[3][1]}`, hb==null?"":judge(hb, h[3][0], h[3][1], L("Anemia","Anaemia")));
  add("PCV / HCT (%)", pcv, `${h[4][0]}–${h[4][1]}`, pcv==null?"":judge(pcv, h[4][0], h[4][1]));
  add("TWBC (×10⁹/L)", wbc, `${h[5][0]}–${h[5][1]}`, wbc==null?"":judge(wbc, h[5][0], h[5][1], L("Leukopenia","Leucopenia"), L("Leukositosis","Leucocytosis")));
  // electrolytes / glucose
  const na = num("nNa"), k = num("nK"), glu = num("nGlu"), kr = kRange(m);
  let naS = ""; if (na!=null) naS = na < 135 ? LO(L("Hiponatremia","Hyponatraemia")) : na > 160 ? DANGER(L("Hipernatremia teruk","Severe hypernatraemia")) : na > 150 ? HI(L("Hipernatremia sederhana","Moderate hypernatraemia")) : na > 145 ? HI() : OK();
  add("Na⁺ (mmol/L)", na, "135–145", naS);
  let kS = ""; if (k!=null) kS = k < 3.0 ? DANGER(L("Hipokalemia — rawat","Hypokalaemia — treat")) : k < 3.4 ? LO(L("Hipokalemia","Hypokalaemia")) : k > Math.max(5.5, kr[1]) ? DANGER(L("Hiperkalemia","Hyperkalaemia")) : judge(k, kr[0], kr[1]);
  add("K⁺ (mmol/L)", k, `${kr[0]}–${kr[1]}<br><span class="small">${L("HipoK <3.4 (rawat <3.0); HiperK >"+Math.max(5.5,kr[1]),"HypoK <3.4 (treat <3.0); HyperK >"+Math.max(5.5,kr[1]))}</span>`, kS);
  let gRange, gS = "";
  if (m < 1) { gRange = L("Neonat: sasaran ≥2.6 (<48 jam), ≥3.3 (>48 jam); <1.5 = teruk","Neonate: target ≥2.6 (<48 h), ≥3.3 (>48 h); <1.5 = severe");
    if (glu!=null) gS = glu < 1.5 ? DANGER(L("Hipoglisemia teruk","Severe hypoglycaemia")) : glu < 2.6 ? LO(L("Hipoglisemia","Hypoglycaemia")) : glu < 3.3 ? pill("hi",L("Bawah sasaran jika >48 jam","Below target if >48 h")) : glu > 11 ? HI() : OK(); }
  else { gRange = L("Rawat hipoglisemia jika <3.0; >11 = hiperglisemia (semak keton/DKA)","Treat hypoglycaemia if <3.0; >11 = hyperglycaemia (check ketones/DKA)");
    if (glu!=null) gS = glu < 3.0 ? DANGER(L("Hipoglisemia — rawat","Hypoglycaemia — treat")) : glu > 11 ? HI(L("Hiperglisemia — semak keton","Hyperglycaemia — check ketones")) : OK(); }
  add(L("Glukosa (mmol/L)","Glucose (mmol/L)"), glu, gRange, gS);

  out.innerHTML = `<p class="small">${L("Kumpulan umur","Age band")}: <strong>${b[2][getLang()]}</strong> · ${L("Jadual darah","Blood table")}: <strong>${h[2][getLang()]}</strong>${wEst?` · ${L("Anggaran berat","Estimated weight")}: <strong>${Math.round(wEst*10)/10} kg</strong> <span class="small">(${m<12?`(${L("bulan","months")} × 0.5) + 4`:`(${L("umur","age")} + 4) × 2`})</span>`:""}</p>
   <div class="nlist">${rows.join("")}</div>
   <p class="small">${L("Diagnosis hipertensi perlukan BP >95th centile pada 3 lawatan berbeza (PP5 bab 71). Bacaan oscillometric >90th perlu disahkan secara auskultasi. Gunakan cuff saiz betul.","Hypertension needs BP >95th centile on 3 separate visits (PP5 ch. 71). Confirm oscillometric readings >90th by auscultation. Use the correct cuff size.")}</p>`;
}

function refTables(){
  const lg = getLang();
  const rrhr = RRHR.map(r=>`<tr><td>${r[2][lg]}</td><td>${r[3]}–${r[4]}</td><td>${r[5]}–${r[6]}</td></tr>`).join("");
  const bp5 = BP5.map(r=>`<tr><td>${r[2]} ${L("thn","y")}</td><td>${r[3]}–${r[4]}</td></tr>`).join("");
  return `<details class="block fold"><summary>${L("Jadual rujukan PP5: RR & HR","PP5 reference table: RR & HR")}</summary>
     <div class="table-scroll"><table class="clinical-table normals-table"><thead><tr><th>${L("Umur","Age")}</th><th>RR /min</th><th>HR /min</th></tr></thead><tbody>${rrhr}</tbody></table></div>
     <p class="small">${L("5th–95th centile semasa rehat (PP5 Bab 1, daripada APLS 7th ed.). Sel kosong dalam jadual asal disambung dari baris atas.","5th–95th centile at rest (PP5 Ch. 1, from APLS 7th ed.). Blank cells in the printed table continue the row above.")}</p></details>
   <details class="block fold"><summary>${L("Jadual rujukan PP5: BP 5th centile","PP5 reference table: BP 5th centile")}</summary>
     <div class="table-scroll"><table class="clinical-table normals-table"><thead><tr><th>${L("Umur","Age")}</th><th>SBP 5th centile</th></tr></thead><tbody>${bp5}</tbody></table></div>
     <p class="small">${L("Formula: 65 + (2 × umur dalam tahun) mmHg. BP < 5th centile ialah TANDA BAHAYA.","Formula: 65 + (2 × age in years) mmHg. BP < 5th centile is a DANGER SIGN.")}</p></details>
   <details class="block fold"><summary>${L("Jadual rujukan PP5: hematologi","PP5 reference table: haematology")}</summary>
     <div class="table-scroll"><table class="clinical-table normals-table"><thead><tr><th>${L("Umur","Age")}</th><th>Hb g/dL</th><th>PCV %</th><th>TWBC ×10⁹/L</th><th>MCV fL (${L("terendah","lowest")})</th></tr></thead><tbody>${HAEM.map(r=>`<tr><td>${r[2][lg]}</td><td>${r[3][0]}–${r[3][1]}</td><td>${r[4][0]}–${r[4][1]}</td><td>${r[5][0]}–${r[5][1]}</td><td>${r[6]??"—"}</td></tr>`).join("")}</tbody></table></div>
     <p class="small">${L("Darah tali pusat: Hb 13.7–20.1, PCV 45–65%, TWBC 9–30. Kiraan pembezaan: <7 hari neutrofil > limfosit; 1 minggu–4 tahun limfosit > neutrofil; 4–7 tahun sama; >7 tahun neutrofil > limfosit. Eosinofil 2–3%, monosit 6–9%. Platelet lebih rendah pada bulan pertama, normal menjelang 6 bulan. ESR <16 mm/jam jika PCV ≥35%.","Cord blood: Hb 13.7–20.1, PCV 45–65%, TWBC 9–30. Differential: <7 days neutrophils > lymphocytes; 1 week–4 years lymphocytes > neutrophils; 4–7 years equal; >7 years neutrophils > lymphocytes. Eosinophils 2–3%, monocytes 6–9%. Platelets lower in the first months, normal by 6 months. ESR <16 mm/h if PCV ≥35%.")}</p></details>
   <details class="block fold"><summary>${L("Elektrolit, glukosa, DKA & antropometri","Electrolytes, glucose, DKA & anthropometry")}</summary>
     <ul>
       <li>Na⁺ 135–145 mmol/L. ${L("Hiponatremia <135; hipernatremia >150 (sederhana 150–160, teruk >160).","Hyponatraemia <135; hypernatraemia >150 (moderate 150–160, severe >160).")}</li>
       <li>K⁺: ${L("lahir–2 minggu 3.7–6.0; 2 minggu–3 bulan 3.7–5.7; ≥3 bulan 3.5–5.0. Hipokalemia <3.4 (rawat jika <3.0 atau bergejala); hiperkalemia >5.5.","birth–2 weeks 3.7–6.0; 2 weeks–3 months 3.7–5.7; ≥3 months 3.5–5.0. Hypokalaemia <3.4 (treat if <3.0 or symptomatic); hyperkalaemia >5.5.")}</li>
       <li>${L("Glukosa neonat: sasaran ≥2.6 (<48 jam), ≥3.3 (>48 jam), ≥3.9 jika hipoglisemia berterusan/kongenital; <1.5 teruk. Kanak-kanak: betulkan jika glukosa kapilari <3 mmol/L.","Neonatal glucose: target ≥2.6 (<48 h), ≥3.3 (>48 h), ≥3.9 if persistent/congenital hypoglycaemia; <1.5 severe. Children: correct if capillary glucose <3 mmol/L.")}</li>
       <li>${L("DKA kanak-kanak: glukosa >11, pH vena <7.3 atau HCO₃ <18, keton ≥3 (atau ketonuria sederhana–banyak). Ringan pH <7.3/HCO₃ <18; sederhana pH <7.2/HCO₃ <10; teruk pH <7.1/HCO₃ <5.","Child DKA: glucose >11, venous pH <7.3 or HCO₃ <18, ketones ≥3 (or moderate–large ketonuria). Mild pH <7.3/HCO₃ <18; moderate pH <7.2/HCO₃ <10; severe pH <7.1/HCO₃ <5.")}</li>
       <li>${L("Anggaran berat: bayi (bulan × 0.5) + 4; 1–10 tahun (umur + 4) × 2. Purata: lahir 3.5 kg, 6 bulan 7 kg, 1 tahun 10 kg, 2 tahun 12 kg, 3 tahun 14 kg.","Weight estimate: infants (months × 0.5) + 4; 1–10 years (age + 4) × 2. Typical: birth 3.5 kg, 6 months 7 kg, 1 year 10 kg, 2 years 12 kg, 3 years 14 kg.")}</li>
     </ul></details>`;
}

window.renderNormals = function(root){
  root.innerHTML = `<div class="section-title-row"><div><p class="section-kicker">${L("Nilai normal kanak-kanak","Paediatric normal values")}</p><h2>${L("Vital sign & ujian darah ikut umur","Vital signs & blood tests by age")}</h2></div><span class="safe-badge">PP5 · KKM 2025</span></div>
   <div class="tool-grid normals-grid">
     <label>${L("Umur","Age")}<span class="age-row"><input id="nAge" type="number" inputmode="decimal" min="0" step="0.1"><select id="nAgeUnit"><option value="y">${L("tahun","years")}</option><option value="m">${L("bulan","months")}</option></select></span></label>
     <label>${L("Jantina","Sex")}<select id="nSex"><option value="m">${L("Lelaki","Boy")}</option><option value="f">${L("Perempuan","Girl")}</option></select></label>
     <label>${L("Tinggi (cm, untuk BP)","Height (cm, for BP)")}<input id="nHt" type="number" inputmode="decimal" placeholder="${L("pilihan","optional")}"></label>
     <label>RR (/min)<input id="nRR" type="number" inputmode="decimal"></label>
     <label>HR (/min)<input id="nHR" type="number" inputmode="decimal"></label>
     <label>SBP (mmHg)<input id="nSBP" type="number" inputmode="decimal"></label>
     <label>DBP (mmHg)<input id="nDBP" type="number" inputmode="decimal"></label>
     <label>Hb (g/dL)<input id="nHb" type="number" inputmode="decimal" step="0.1"></label>
     <label>PCV (%)<input id="nPCV" type="number" inputmode="decimal"></label>
     <label>TWBC (×10⁹/L)<input id="nWBC" type="number" inputmode="decimal" step="0.1"></label>
     <label>Na⁺ (mmol/L)<input id="nNa" type="number" inputmode="decimal"></label>
     <label>K⁺ (mmol/L)<input id="nK" type="number" inputmode="decimal" step="0.1"></label>
     <label>${L("Glukosa (mmol/L)","Glucose (mmol/L)")}<input id="nGlu" type="number" inputmode="decimal" step="0.1"></label>
   </div>
   <div id="nOut" class="dose-panel" aria-live="polite"></div>
   ${refTables()}
   <div class="source-list"><h3>${L("Sumber","Source")}</h3>
     <a href="${PP5}" target="_blank" rel="noopener noreferrer">MOH Paediatric Protocols for Malaysian Hospitals, 5th ed. (2025) — Ch. 1 Normal Values; Ch. 9 Na/K; Ch. 61 DKA; Ch. 71 Hypertension; neonatal hypoglycaemia; pneumonia</a>
     <p class="small">${L("BP centile dari Nelson 18th ed.; RR/HR dari APLS 7th ed. (seperti dipetik PP5). Sokongan keputusan sahaja — tafsir bersama keadaan klinikal.","BP centiles from Nelson 18th ed.; RR/HR from APLS 7th ed. (as cited in PP5). Decision support only — interpret with the clinical picture.")}</p></div>`;
  root.querySelectorAll("input,select").forEach(el => el.addEventListener("input", calc));
  root.querySelectorAll("select").forEach(el => el.addEventListener("change", calc));
  calc();
};
})();
