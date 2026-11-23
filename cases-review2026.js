// Re-check of the original topics against the MOH NAG 2024 web edition (pathway PDFs dated
// Aug 2024 – Jan 2026), done 23 Nov 2026. Patches older cards in place; loaded after all case files.
(function(){
const NAG = "https://sites.google.com/moh.gov.my/nag/contents/";
const src = (p,l) => [`MOH NAG 2024 — ${l}`, NAG + p];
const C1 = src("section-c-clinical-pathways-in-primary-care/c1-acute-bronchitis-and-pneumonia","C1 Pathway: acute bronchitis & pneumonia (v. 30 Jan 2026)");
const C2 = src("section-c-clinical-pathways-in-primary-care/c2-acute-otitis-media","C2 Pathway: acute otitis media (v. 16 Oct 2025)");
const C4 = src("section-c-clinical-pathways-in-primary-care/c4-acute-rhinosinusitis","C4 Pathway: acute rhinosinusitis (v. 10 Sep 2025)");
const C5 = src("section-c-clinical-pathways-in-primary-care/c5-acute-gastroenteritis","C5 Pathway: acute gastroenteritis (v. 15 Aug 2024)");
const C7 = src("section-c-clinical-pathways-in-primary-care/c7-urinary-tract-infection-in-non-pregnancy","C7 Pathway: UTI in non-pregnancy (v. 30 Jan 2026)");
const A14 = src("section-a-adult/a14-skin-soft-tissue-infections","A14 Skin & soft tissue infections");
const B11 = src("section-b-paediatrics/b11-skin-soft-tissue-infections","B11 Skin & soft tissue infections (paediatric)");
const A10 = src("section-a-adult/a10-otorhinolaryngology-infections","A10 Otorhinolaryngology infections");
const STAMP = "23 November 2026 (re-checked against NAG)";

const patch = (id, fn) => { const c = (window.LOCUM_CASES||[]).find(x => x.id === id); if (c) { fn(c); c.reviewed = STAMP; } };
const addSrc = (c, s) => { if (!c.sources.some(x => x[1] === s[1])) c.sources.push(s); };

patch("influenza", c => {
  c.treatment = ["Supportive care: oral fluids, rest and antipyretic/analgesia.",
    "<strong>NAG C1:</strong> oseltamivir is indicated for high-risk patients regardless of symptom duration. For non-high-risk patients, benefit is greatest if started within 48 h.",
    "<strong>High risk:</strong> age <2 or ≥65 years, pregnancy, immunosuppression, chronic heart/lung/kidney/liver disease, asthma, diabetes, malignancy, BMI ≥40."];
  c.meds = ["<strong>Adult:</strong> oseltamivir 75 mg PO q12h for 5 days (adjust for renal impairment).",
    "<strong>Child:</strong> use the Dose Tool (age required).",
    "Antibiotics are not routine unless there is a bacterial complication."];
  addSrc(c, C1);
});

patch("acute-bronchitis", c => {
  c.assessment = [...(c.assessment||[]), "<strong>NAG C1:</strong> if HR >100, RR >24, T >38 °C or SpO₂ <95%, or chest signs of consolidation/effusion → treat or investigate as pneumonia (CXR if available)."];
  c.meds = [...c.meds, "<strong>Pertussis during an outbreak</strong> (cough ≥2 weeks with paroxysms, post-tussive vomiting or whoop): erythromycin ethylsuccinate 800 mg PO q12h for 14 days (adult)."];
  addSrc(c, C1);
});

patch("cap", c => {
  c.redFlags = [...c.redFlags, "<strong>CRB-65</strong> (confusion, RR ≥30, SBP <90 or DBP ≤60, age ≥65): consider hospital if ≥2. Also consider admission for SpO₂ <95%, comorbidities or inability to maintain oral intake.",
    "<strong>Child — admit:</strong> age ≤3 months, fever >38.5 °C, refusing feeds/vomiting, fast breathing ± cyanosis, convulsion/lethargy, failed antibiotics, recurrent pneumonia or immunodeficiency."];
  c.assessment = [...(c.assessment||[]), "<strong>Tachypnoea (child):</strong> <2 months >60/min; 2–12 months >50/min; 1–5 years >40/min. A child with runny nose and cough without severity signs usually does not have pneumonia — no antibiotic."];
  c.meds = ["<strong>Adult, no comorbidity (NAG C1):</strong> amoxicillin 500–1000 mg PO q8h for 5–7 days. Alternative: doxycycline 100 mg PO q12h for 5–7 days.",
    "<strong>Adult with comorbidity</strong> (chronic heart/lung/liver/kidney disease, DM, alcoholism, malignancy, asplenia): amoxicillin/clavulanate 625 mg PO q8h for 5–7 days; may add azithromycin 500 mg daily × 3 days or doxycycline if atypical pathogen suspected.",
    "<strong>Child outpatient:</strong> amoxicillin 80–90 mg/kg/day PO q8–12h (max 1 g/dose, 3 g/day) for 5 days. NAG weight bands: 3–5 kg 250 mg q12h; 6–9 kg 375 mg q12h; 10–14 kg 500 mg q12h; 15–19 kg 750 mg q12h; >20 kg 500 mg q8h or 1 g q12h.",
    "<strong>Child, atypical (mycoplasma/chlamydia) suspected:</strong> erythromycin ethylsuccinate 40–50 mg/kg/day PO q12h (max 800 mg/dose) for 5 days.",
    "Review the child in 2 days, or earlier if worse."];
  addSrc(c, C1);
});

patch("aom", c => {
  c.treatment = ["<strong>NAG C2:</strong> TM intact AND non-severe illness (mild otalgia, T <39 °C) → observe 48–72 h with paracetamol; start antibiotics if not resolving.",
    "<strong>Start antibiotics</strong> for perforated TM/otorrhoea, severe illness (moderate–severe otalgia, T ≥39 °C, systemically unwell), or risk factors: immunocompromised, age <6 months, bilateral AOM under 2 years, craniofacial abnormality (e.g. cleft palate).",
    "Review in 48–72 h; refer ENT if not resolving after antibiotics."];
  c.meds = ["<strong>Child (preferred):</strong> amoxicillin 80–90 mg/kg/day PO q8–12h (max 1 g/dose, 3 g/day). Duration: <2 years 7–10 days; ≥2 years 5–7 days.",
    "<strong>Child (amoxicillin in last 30 days):</strong> amoxicillin/clavulanate 14:1 80–90 mg/kg/day q12h (amoxicillin component, max 3 g/day). 7:1 at 40–50 mg/kg/day may not be adequate for resistant pneumococcus.",
    "<strong>Child alternative:</strong> erythromycin ethylsuccinate 40–50 mg/kg/day PO q12h (max 800 mg/dose).",
    "<strong>Adult:</strong> amoxicillin 500 mg PO q8h for 5–7 days; alternatives amoxicillin/clavulanate 625 mg q8h, or erythromycin ethylsuccinate 400 mg q6h / 800 mg q12h."];
  c.referral = [...c.referral, "<strong>NAG red flags for ENT:</strong> recurrent AOM, persistent otorrhoea, suspected mastoiditis/complication, abnormal hearing assessment."];
  addSrc(c, C2);
});

patch("rhinosinusitis", c => {
  c.assessment = [...(c.assessment||[]), "<strong>NAG C4 — likely ABRS if ≥3 of:</strong> fever >38 °C, discoloured mucus, double sickening, severe local pain, raised ESR/CRP. Symptoms <10 days without these = viral (no antibiotics).",
    "Symptoms continuously ≥12 weeks, or ≥3 ABRS episodes a year → ENT referral."];
  c.meds = ["<strong>Adult (NAG C4), 5 days:</strong> amoxicillin 500–1000 mg PO q8h OR amoxicillin/clavulanate 625 mg PO q8h. Alternative: doxycycline 100 mg q12h for 5–7 days; azithromycin 500 mg daily × 3 days (pregnant with penicillin allergy).",
    "<strong>Child (NAG C4), 5 days:</strong> amoxicillin 80–90 mg/kg/day PO q12h (max 2 g/day); alternative cefuroxime 30 mg/kg/day PO q12h (max 1 g/day) — Dose Tool."];
  addSrc(c, C4);
});

patch("uti", c => {
  c.redFlags = [...c.redFlags, "<strong>Complicated UTI risk factors (NAG C7):</strong> immunosuppression, poorly controlled DM, post-menopausal, obstruction, urolithiasis, UTI in men, CKD, catheter, neurogenic bladder, recurrent UTI → urinalysis + culture."];
  c.assessment = [...(c.assessment||[]), "Urinalysis: nitrite +ve = probable UTI. Nitrite −ve but leucocyte +ve = UTI or other diagnosis equally likely (check specimen; morning sample most reliable). Both −ve = consider vaginitis or other diagnoses.",
    "Non-severe (<3 urinary symptoms): send culture and consider a delayed antibiotic prescription."];
  c.meds = ["<strong>Preferred (NAG C7), 5 days:</strong> nitrofurantoin 50–100 mg PO q6h (immediate release) OR 100 mg PO q12h (modified release) — contraindicated if eGFR <30; OR cephalexin 500 mg PO q6–12h (q6h if risk of complicated UTI).",
    "<strong>Alternative, 3–5 days:</strong> amoxicillin/clavulanate 625 mg PO q8h, ampicillin/sulbactam 375–750 mg PO q12h, or cefuroxime 250–500 mg PO q12h.",
    "Avoid empirical amoxicillin/ampicillin alone because of resistance. Pyelonephritis signs → refer to hospital."];
  addSrc(c, C7);
});

patch("gastroenteritis", c => {
  c.referral = [...c.referral, "<strong>NAG C5 — refer to hospital for investigation and pathogen-directed therapy:</strong> high-grade fever >3 days or sepsis, suspected enteric fever, grossly bloody stool, recent international travel with T ≥38.5 °C/sepsis, or immunocompromised host. Without these, the cause is usually viral and antibiotics are not needed."];
  addSrc(c, C5);
});

patch("impetigo", c => {
  c.meds = ["<strong>Adult localised (NAG C6/A14):</strong> fusidic acid 2% q8–12h OR mupirocin 2% q8h for 5 days. Reserve topical antibiotics for localised lesions (resistance risk).",
    "<strong>Adult generalised:</strong> cephalexin 1000 mg PO q12h OR cloxacillin 500 mg PO q6h for 5–7 days; alternative amoxicillin/clavulanate 625 mg q8h.",
    "<strong>Child localised (NAG B11):</strong> fusidic acid 2% 2–3 times daily for 7 days; alternative mupirocin 2% 2–3 times daily for 7 days.",
    "<strong>Child generalised (NAG B11):</strong> cloxacillin 50–100 mg/kg/day PO in 4 doses (max 1 g/day for impetigo) OR cephalexin 25–50 mg/kg/day PO in 2 doses (max 2 g/day) for 5–7 days — Dose Tool."];
  addSrc(c, B11);
});

patch("scabies", c => {
  c.meds = ["<strong>Adult (NAG A14):</strong> benzyl benzoate emulsion 25% from the neck down, left 24 h, for 2–3 days; OR permethrin 5% left 8 h, repeated after 1 week.",
    "<strong>Pregnancy / immunocompromised:</strong> permethrin 5% for 8 h, repeat after 1 week.",
    "<strong>Child <12 years (NAG B11):</strong> permethrin 5% for 8–12 h, two applications one week apart. Alternative ≥2 years: benzyl benzoate 12.5% neck down for 3 consecutive days.",
    "<strong>Infant <2 months:</strong> sulphur 6% in petroleum/ointment base for 3 days. Children: treat the whole body including the face (avoid eyes and mouth).",
    "<strong>Nodular scabies:</strong> crotamiton cream TDS (<2 years 5–7 days; <12 years 7–14 days).",
    "Wash clothing and bedding in hot water; treat all household/close contacts at the same time."];
  addSrc(c, A14); addSrc(c, B11);
});

patch("tinea", c => {
  c.meds = ["<strong>Mild (NAG A14):</strong> clotrimazole 1% or miconazole 2% or terbinafine 1% cream q12h, until clinical clearance plus 2 more weeks.",
    "<strong>Extensive:</strong> terbinafine 250 mg PO daily for 2 weeks, OR itraconazole 200 mg PO daily for 2 weeks (take with food/acidic drink; avoid PPI/H2RA), OR griseofulvin 500 mg PO q12–24h for 4–6 weeks. Alternative: fluconazole 100 mg daily for 1–2 weeks or 200 mg weekly for 3–4 weeks.",
    "Terbinafine clearance falls in renal impairment; caution with systemic antifungals in liver/renal disease. Topical nystatin does not work for dermatophytes.",
    "Avoid steroid–antifungal combinations as a default for undiagnosed tinea."];
  addSrc(c, A14);
});

patch("otomycosis", c => {
  c.meds = ["<strong>NAG A10:</strong> clotrimazole 1% ear solution q6–8h for 10–14 days, with aural toilet.",
    "If tympanic membrane perforation/grommet is present or cannot be excluded, verify product suitability first."];
  addSrc(c, A10);
});
})();
