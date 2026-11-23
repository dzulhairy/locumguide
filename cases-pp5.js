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

patch("aeba-paediatric", c => {
  fixOldPP(c);
  c.evidence = "MOH Paeds Protocol 5th ed.";
  c.sources = [pp5("Ch. 31 Asthma — drug dosages for acute asthma"), ...c.sources];
});
patch("dengue-paeds", c => { c.sources = [...c.sources, pp5("Ch. 91 Dengue Viral Infections")]; });
patch("cap", c => { c.sources = [...c.sources, pp5("Ch. 34 Pneumonia (tachypnoea thresholds)")]; });
patch("gastroenteritis", c => { c.sources = [...c.sources, pp5("Ch. 10 Acute Gastroenteritis (WHO dehydration chart, Plan B)")]; });
patch("anaphylaxis", c => {
  c.meds = [...c.meds, "<strong>PP5 child IM adrenaline 1:1000:</strong> in hospital 10 mcg/kg (0.01 mL/kg), repeat after 5 min if no improvement. Pre-hospital: <6 months and 6 months–6 years 150 mcg (0.15 mL); 6–12 years 300 mcg (0.3 mL); >12 years 500 mcg (0.5 mL)."];
  c.sources = [...c.sources, pp5("Ch. 116 Anaphylaxis")];
});
})();
