// Paediatric topics re-checked against MOH Paediatric Protocols for Malaysian Hospitals, 5th ed. (KKM 2025)
// on 23 Nov 2026. Replaces RCH/NICE-based content where PP5 now gives local guidance.
(function(){
const PP5URL = "https://mpaeds.my/wp-content/uploads/2026/03/Paediatric-Protocols-for-Malaysia-Hospital-1.pdf";
const pp5 = ch => [`MOH Paediatric Protocols for Malaysian Hospitals, 5th ed. (2025) — ${ch}`, PP5URL];
const STAMP = "23 November 2026 (Paediatric Protocols 5th ed.)";
const patch = (id, fn) => { const c = (window.LOCUM_CASES||[]).find(x => x.id === id); if (c) { fn(c); c.reviewed = STAMP; } };
const fixOldPP = c => { c.sources = c.sources.filter(s => !/Paediatric_Protocols_5th|mpaeds\.my\/guideline-protocols/.test(s[1])); };

patch("croup", c => {
  fixOldPP(c);
  c.evidence = "MOH Paeds Protocol 5th ed.";
  c.redFlags = ["Westley score ≥8 (severe) or >12 (impending respiratory failure): drowsy/disoriented, cyanosis, stridor at rest with marked recession, markedly reduced air entry.",
    "Consider life-threatening differentials: acute epiglottitis, retropharyngeal/parapharyngeal or peritonsillar abscess, foreign body, diphtheria, congenital airway anomaly.",
    "<strong>Admit (PP5):</strong> moderate or severe croup, age <6 months, poor oral intake, toxic/sick appearance, or family far from hospital without reliable transport."];
  c.assessment = ["<strong>Westley Croup Score:</strong> consciousness (normal 0, disoriented 5); cyanosis (none 0, with agitation 4, at rest 5); stridor (none 0, with agitation 1, at rest 2); air entry (normal 0, decreased 1, markedly decreased 2); retractions (none 0, mild 1, moderate 2, severe 3).",
    "Total ≤2 mild · 3–7 moderate · 8–11 severe · >12 impending respiratory failure.",
    "Neck X-ray not needed unless diagnosis in doubt (e.g. foreign body). ABG is not helpful and may distress the child; pulse oximetry helpful but not essential."];
  c.treatment = ["<strong>Mild (outpatient):</strong> single dose of steroid, then home if improving.",
    "<strong>Moderate (inpatient):</strong> dexamethasone and/or nebulised budesonide; nebulised adrenaline if no improvement or deterioration.",
    "<strong>Severe (inpatient):</strong> nebulised adrenaline + parenteral dexamethasone + nebulised budesonide + oxygen; involve ED physician/paediatrician/ENT/anaesthetist early.",
    "Antibiotics not recommended unless bacterial superinfection strongly suspected. IV fluids only if unable to drink. Minimise distress."];
  c.meds = ["<strong>Mild:</strong> dexamethasone 0.15 mg/kg PO/parenteral single dose (may repeat at 12 and 24 h) — preferred; OR prednisolone 1–2 mg/kg PO single dose; OR nebulised budesonide 2 mg single dose (if vomiting).",
    "<strong>Moderate:</strong> dexamethasone 0.3–0.6 mg/kg PO/parenteral single dose AND/OR nebulised budesonide 2 mg stat then 1 mg 12-hourly.",
    "<strong>Moderate not improving / severe:</strong> nebulised adrenaline 1:1000 0.5 mL/kg (max 5 mL); severe: dexamethasone 0.6 mg/kg parenteral.",
    "Use the Dose Tool (Dexamethasone — croup)."];
  c.sources = [pp5("Ch. 33 Viral Croup"), ...c.sources];
});

patch("bronchiolitis", c => {
  c.evidence = "MOH Paeds Protocol 5th ed.";
  c.redFlags = ["<strong>Hospital management (PP5):</strong> age <3 months, toxic-looking, moderate/severe chest recession, grunting, central cyanosis, inadequate feeding, apnoea, SpO₂ <95%, or high-risk group.",
    "<strong>High-risk group:</strong> age <12 weeks, prematurity, cardiopulmonary disease, immunodeficiency, neuromuscular disorder.",
    "Impending respiratory failure: exhaustion/listlessness, decreased respiratory effort, recurrent apnoea, or failure to maintain SpO₂ despite oxygen."];
  c.assessment = ["Clinical diagnosis: <2 years (peak 3–6 months), coryza + low-grade fever + cough, then tachypnoea, recession, wheeze; crackles/rhonchi. Infants <6 weeks may present with apnoea only.",
    "Consider pneumonia if fever >39 °C, persistent focal crackles or severe distress; consider viral-induced wheeze/asthma if persistent wheeze without crackles, recurrent wheeze or atopy.",
    "Routine FBC, cultures and chest X-ray are not recommended in typical cases."];
  c.treatment = ["Measure SpO₂ at presentation; give oxygen to keep SpO₂ 94–98% (PP5).",
    "Small frequent feeds; NG/OG feeds if feeding poorly; IV fluids only if NG not tolerated or impending respiratory failure.",
    "Gentle superficial nasal suction only if distressed or feeding poorly (not routinely). No chest physiotherapy."];
  c.meds = ["<strong>Not routinely recommended (PP5):</strong> nebulised hypertonic saline, inhaled bronchodilators, corticosteroids, antibiotics.",
    "A bronchodilator trial can be considered in older infants with persistent wheeze without crackles (possible asthma/viral wheeze), especially with atopy.",
    "Antibiotics only for recurrent apnoea with circulatory impairment, possible septicaemia, acute deterioration, high WCC or progressive CXR changes."];
  c.prevention = ["Hand hygiene; avoid sick contacts and smoke. Maternal RSV vaccination at 32–36 weeks; RSV monoclonal antibody (e.g. nirsevimab) for eligible high-risk infants."];
  c.referral = ["Admit for any PP5 hospital-management criterion above; HDU/PICU for impending respiratory failure (HFNC/CPAP)."];
  c.sources = [pp5("Ch. 32 Acute Bronchiolitis"), ...c.sources];
});

patch("febrile-seizure", c => {
  fixOldPP(c);
  c.evidence = "MOH Paeds Protocol 5th ed.";
  c.redFlags = ["Seizure lasting >5 minutes: start status epilepticus treatment (Dose Tool: Seizure — benzodiazepine).",
    "Complex features: >15 min, focal features, >1 seizure in the same febrile episode, or post-ictal deficit (Todd's paralysis).",
    "<strong>Lumbar puncture must be done</strong> (unless contraindicated) if any sign of intracranial infection or persistent lethargy/not fully interactive; consider if <12 months (especially without Hib/pneumococcal vaccine) or prior antibiotics."];
  c.assessment = ["<strong>PP5 definition:</strong> seizure with fever in a child aged 6 months – 5 years, with no intracranial pathology or metabolic derangement.",
    "Investigations depend on clinical assessment of the fever source. Serum calcium/electrolytes rarely needed. EEG is not indicated, even for recurrences or complex seizures."];
  c.treatment = ["Not every child needs admission. Admit to exclude intracranial infection, for fear of recurrence, to treat the fever source, or to allay anxiety (especially if far from hospital).",
    "Counsel parents on the benign nature and seizure first aid. Avoid excess clothing.",
    "Antiseizure medication is NOT recommended to prevent recurrence."];
  c.meds = ["<strong>Paracetamol</strong> 15 mg/kg 6-hourly (syrup or rectal) for comfort — it does not reduce recurrence (Dose Tool).",
    "<strong>Rectal diazepam 0.5 mg/kg</strong> may be supplied to parents of children at high risk of recurrence (including febrile status), to give if a seizure lasts >5 minutes."];
  c.prevention = ["<strong>Recurrence risk factors:</strong> family history, age <18 months, fever <40 °C at first seizure, <1 h from fever onset to seizure. 0 factors <15%; ≥2 >30%; ≥3 >60%.",
    "Epilepsy risk factors: neurodevelopmental abnormality, complex febrile seizure, family history of epilepsy. Prognosis excellent overall."];
  c.referral = ["Admit/paediatric review for complex seizures, suspected CNS infection, persistent lethargy, or status epilepticus."];
  c.sources = [pp5("Ch. 49 Febrile Seizures; Ch. 48 Status Epilepticus"), ...c.sources];
});

// Measles (campak) — new topic, WHO fact sheet + PP5 (vitamin A dosing, notification, post-exposure IG).
window.LOCUM_CASES.push({
  id:"measles", title:"Measles (campak)", category:"Infection", tags:["Paediatrics","Dermatology"],
  synonyms:["measles","campak","rubeola","koplik","morbilli","maculopapular rash fever","ruam demam"],
  evidence:"WHO + MOH Paeds Protocol 5th ed.",
  reviewed: STAMP,
  redFlags:["Breathing difficulty/pneumonia, seizures, drowsiness or confusion (encephalitis), severe diarrhoea with dehydration, eye pain/corneal clouding.",
    "Highest risk: infants and children <5 years, adults >30, pregnancy, malnutrition (especially vitamin A deficiency), immunocompromise (including HIV, leukaemia in remission).",
    "Measles is notifiable — notify the district health office (Pejabat Kesihatan)."],
  assessment:["Prodrome 4–7 days: high fever, runny nose, cough, red watery eyes (conjunctivitis), <strong>Koplik spots</strong> (small white spots inside the cheeks).",
    "Rash appears 3–5 days after the first symptoms, starting on the face and upper neck, spreading downwards over about 3 days to trunk and limbs; lasts 4–8 days.",
    "Infectious from 4 days before to 4 days after rash onset (airborne; virus stays in the air up to 2 hours). Check vaccination status (MMR at 9 and 12 months in the national schedule)."],
  treatment:["No specific antiviral treatment: fluids, nutrition, antipyretic, and treatment of complications (antibiotics for pneumonia, ear or eye infection).",
    "Isolate: keep away from school/taska and from infants, pregnant women and immunocompromised people during the infectious period.",
    "Admit complicated measles; an uncomplicated inpatient can be discharged (PP5)."],
  meds:["<strong>Vitamin A</strong> (WHO: 2 doses for all suspected measles in children <5 years — on diagnosis and again the next day; 3rd dose 4–6 weeks later if eye signs of vitamin A deficiency). <strong>PP5 doses:</strong> <6 months 50,000 IU; 6–12 months 100,000 IU; >12 months 200,000 IU (repeat on day 2 and day 14 in complicated measles or vitamin A deficiency signs).",
    "Paracetamol for fever (Dose Tool). ORS for diarrhoea.",
    "<strong>Post-exposure (PP5):</strong> unimmunised contacts — measles-containing vaccine within 72 h (aborts clinical measles in ~75%) or immunoglobulin; immunocompromised contacts — immunoglobulin (NHIG 0.25–0.5 mL/kg) / specialist advice."],
  prevention:["Two doses of measles-containing vaccine (MMR). Check and catch up household contacts."],
  referral:["Admit/refer for any complication, infants, pregnancy, malnutrition or immunocompromise."],
  sources:[["WHO Fact sheet — Measles","https://www.who.int/news-room/fact-sheets/detail/measles"], pp5("Ch. 2 Immunisation (measles exposure); SAM chapter (vitamin A doses)")]
});
patch("aeba-paediatric", c => {
  fixOldPP(c);
  c.evidence = "MOH Paeds Protocol 5th ed.";
  c.sources = [pp5("Ch. 31 Asthma — drug dosages for acute asthma"), ...c.sources];
});
patch("dengue-paeds", c => { c.sources = [...c.sources, pp5("Ch. 91 Dengue Viral Infections")]; });
patch("cap", c => { c.sources = [...c.sources, pp5("Ch. 34 Pneumonia (tachypnoea thresholds)")]; });
patch("gastroenteritis", c => {
  c.synonyms = [...new Set([...(c.synonyms||[]), "ORS", "Plan A", "Smecta", "diosmectite"])];
  c.meds = [...c.meds, "<strong>ORS Plan A (no dehydration):</strong> after each loose stool, age &lt;2 years: 50–100 mL; age ≥2 years: 100–200 mL; alternatively 10 mL/kg if weight known. Mix according to sachet instructions, give small frequent sips; if vomiting, wait 10 minutes and resume slowly. Continue usual feeds and breastfeeding. Reassess if poor intake, worsening illness, fever, blood in stool or dehydration.", "<strong>Paediatric Smecta (diosmectite 3 g/sachet, oral powder):</strong> optional adjunct to ORS for acute diarrhoea. Avoid below 2 years. Malaysian registered product leaflet: age ≥2 years, 4 sachets/day for 3 days, then 2 sachets/day for 4 days. PP5 specifies age >2 years; at exactly 2 years confirm suitability before prescribing. Distribute the daily dose throughout the day. Mix each sachet with 50 mL water or suitable semi-liquid food. Avoid simultaneous administration with other oral medicines. Stop if constipation occurs; avoid in hypersensitivity and check product-specific excipient contraindications. ORS and continued feeding remain first-line; reassess promptly for dehydration or other red flags."];
  c.sources = [...c.sources, pp5("Ch. 10 Acute Gastroenteritis (WHO dehydration chart, Plan B; antidiarrhoeal adjuncts)"), ["NPRA RiMUP — Smecta Orange-Vanilla 3 g (2025)", "https://quest3plus.bpfk.gov.my/front-end/attachment/791/pharma/234512/V_112255_20251031_163203_D4.pdf"], ["NPRA safety alert — diosmectite age restriction", "https://npra.gov.my/index.php/en/component/content/article/471-english/safety-alerts-main/dhpc/1527023-smecta-dioctahedral-smectite-not-recommended-for-use-in-children-aged-below-2-years-and-pregnant-or-breastfeeding-women.html?Itemid=1391"]];
});
patch("gout", c => {
  c.synonyms = [...new Set([...(c.synonyms||[]), "allopurinol", "urate lowering therapy", "ULT"])];
  c.meds = [...c.meds, "<strong>Allopurinol (adult gout, long-term ULT; not acute analgesia):</strong> when indicated, initial dose by stable eGFR (mL/min/1.73 m²): &gt;60: 100 mg PO daily; 30–60: 50 mg daily; &lt;30: 50 mg on alternate days (specialist advice for advanced CKD/dialysis). Start low and titrate slowly, generally every 4 weeks guided by serum urate, renal function and tolerability. Target serum urate &lt;360 µmol/L; consider &lt;300 µmol/L in severe gout. CPG ceiling 900 mg/day is not a routine target; higher doses require individual review and doses above 300 mg/day are divided. Check baseline renal/liver function and blood count; monitor during titration. Offer appropriate flare prophylaxis for 3–6 months. Continue existing ULT during a flare. Stop immediately and seek urgent assessment for rash, mucosal lesions, fever or facial swelling (SCAR/AHS risk). Avoid with known HLA-B*58:01 positivity or previous allopurinol hypersensitivity; avoid combination with azathioprine/mercaptopurine unless specialist-managed."];
  c.sources = [...c.sources, ["MOH Management of Gout 2nd edition — Appendix 5", "https://www.moh.gov.my/images/04-penerbitan/penerbitan-klinikal/panduan-amalan-klinikal/e-CPG_Management_of_Gout_Second_Edition.pdf"], ["FUKKM — allopurinol", "https://pharmacy.moh.gov.my/en/apps/fukkm?generic=allopurinol"]];
});
patch("anaphylaxis", c => {
  c.meds = [...c.meds, "<strong>PP5 child IM adrenaline 1:1000:</strong> in hospital 10 mcg/kg (0.01 mL/kg), repeat after 5 min if no improvement. Pre-hospital: <6 months and 6 months–6 years 150 mcg (0.15 mL); 6–12 years 300 mcg (0.3 mL); >12 years 500 mcg (0.5 mL)."];
  c.sources = [...c.sources, pp5("Ch. 116 Anaphylaxis")];
});
})();
