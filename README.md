# MyClinicalGuide.MY — v2.8 (formerly Locum Quick Guide MY)

Mobile-first clinician quick-reference for common primary-care / locum presentations in Malaysia.

## Version 2.8 changes (23 Nov 2026) — Paediatric Protocols 5th ed.
- **🩺 Normal values panel**, based on MOH *Paediatric Protocols for Malaysian Hospitals*, 5th ed. (KKM 2025):
  - Enter age (months/years), sex and height with any measured values: RR, HR, BP, Hb, PCV, TWBC, Na⁺, K⁺, glucose.
  - Each value is flagged normal/low/high/danger against the age-specific PP5 range:
    - RR/HR 5th–95th centile
    - BP 5th centile (danger sign) and Ch. 71 hypertension staging using the age/sex/height BP centile tables
    - haematology by age
    - Na/K
    - neonatal and child glucose
    - WHO tachypnoea
  - Also shows an estimated weight. The PP5 reference tables are included.
- **Croup:** card and calculator follow the PP5 Westley algorithm (dexamethasone 0.15 / 0.3–0.6 mg/kg, budesonide, nebulised adrenaline 0.5 mL/kg max 5 mL).
- **Bronchiolitis:** card follows PP5 — admission table, SpO₂ target 94–98%, what not to give.
- **Febrile seizure:** card follows PP5 (6 months–5 years, LP indications, rectal diazepam 0.5 mg/kg, recurrence risks).
- **New seizure calculator (PP5 Ch. 48):** first-line benzodiazepines by route (IV/rectal/buccal/intranasal/IM) and second-line agents.
- **Adrenaline calculator:** adds PP5 pre-hospital age-band doses.
- **Dehydration panel:** adds PP5 % dehydration bands.
- **New topic: ear discharge (otorrhoea) in children/infants** — differential diagnosis, red flags, NAG C2/B9 treatment. Paediatric otitis externa drops (NAG B9) added to the otitis externa card.
- AEBA calculators re-checked against the PP5 acute asthma dosage table (unchanged).

## Version 2.7 changes (23 Nov 2026)
- **Re-check against NAG:** 15 older infection topics re-checked against the current NAG pathways (Aug 2024 – Jan 2026); see `cases-review2026.js`. Main changes:
  - AOM: observe 48–72 h when the eardrum is intact and the illness is not severe.
  - CAP: adult regimens, CRB-65, NAG paediatric amoxicillin weight bands and admission criteria.
  - Rhinosinusitis: bacterial sinusitis criteria and paediatric regimens.
  - Adult UTI: NAG C7 options; influenza: high-risk groups.
  - Also updated: scabies, tinea, impetigo and otomycosis.
- **Cloxacillin calculator** now caps at 2 g/day, and shows the 1 g/day maximum for impetigo.
- **8 new topics (58 total):** headache/migraine, allergic rhinitis, urticaria, renal colic, dysmenorrhoea, DKA/HHS triage, COPD exacerbation, tetanus-prone wounds.
- **Copy prescription:** a 📋 button on every syrup/tablet row copies text such as `Syr Paracetamol 120mg/5ml 7.5ml 4-6 hourly PRN (max 4x/day)`.
- **Scores & CrCl panel** includes:
  - Cockcroft–Gault CrCl and CKD-EPI 2021 eGFR (creatinine in µmol/L), with renal warnings for nitrofurantoin, colchicine and NSAIDs
  - CURB-65/CRB-65
  - WHO IMCI dehydration, linked to the ORS Plan B calculator
- **Case cards:** red flags, treatment and medication stay open; assessment, prevention, referral and sources fold away.
- **BM/EN toggle** for all interface text. Clinical content keeps the wording of its source guideline.
- **⭐ Favourites and 🕘 recently viewed** topics are stored only in this browser.

## Version 2.6 changes (23 Nov 2026)
- 27 new topics (50 total), NAG-checked: conjunctivitis, stye/blepharitis, preseptal cellulitis, otitis externa, dental abscess, bites, leptospirosis, paediatric dengue, HFMD, croup, bronchiolitis, febrile seizure, paediatric UTI, UTI in pregnancy, vaginal discharge, urethral discharge/STI, genital ulcer, PID, mastitis, H. pylori/dyspepsia, boils/abscess, tinea versicolor, cutaneous candidiasis, HSV skin, gout, hypoglycaemia, chest pain/ACS.
- Concrete NAG regimens added to pharyngitis (Strep score), cellulitis, varicella, zoster and adult gastroenteritis.
- New categories: Eye, Dental, O&G, Sexual health, Endocrine, Infection.
- New dose tools: dexamethasone for croup; paracetamol 10 mg/kg for dengue in children.
- Multi-word Malay/English searches now require all words to match.
- Paracetamol calculators show mL per dose for 120 mg/5 mL and 250 mg/5 mL syrup automatically, with frequency, 24-h maximum and a 500 mg tablet option.
- Every oral calculator now shows mL per dose for the syrups in stock, plus frequency and a tablet/capsule option where one fits within ±10%. The strengths are listed in `STOCK` at the top of the calculator code in `app.js`; edit that list if your clinic stocks different products:
  - ibuprofen 100 mg/5 mL
  - amoxicillin 125 and 250 mg/5 mL
  - co-amoxiclav 228 and 457 mg/5 mL (7:1), 642.9 mg/5 mL ES (14:1)
  - azithromycin 200 mg/5 mL
  - cefuroxime 125 mg/5 mL (FUKKM-confirmed)
  - cephalexin 125 and 250 mg/5 mL
  - cloxacillin 125 mg/5 mL
  - acyclovir 200 mg/5 mL (FUKKM-confirmed)
  - oseltamivir 6 mg/mL
  - prednisolone 5 mg tablets
  - Strengths confirmed against clinic stock on 23 Nov 2026.
- Dose calculators are hidden behind a "Dose calculator" button at the top; tapping it (or a dose-tool link on a case card) opens them.
- Full reference list: [REFERENCES.md](REFERENCES.md).
- CDC PKD Besut ACD Scabies module and its Google Form link removed (the clinical Scabies topic remains).

## Version 2.5 changes (23 Nov 2026)
- Search results now appear directly under the search box (mobile-friendly).
- Case cards link straight to the relevant dose calculator.
- Liquid-strength field is cleared when switching calculators (prevents a stale mg/5 mL being applied to a different drug).
- Weight sanity warnings (e.g. 80 kg entered for an infant).
- Ibuprofen: blocked <7 kg, capped at 400 mg/dose. Oseltamivir: age required (infant mg/kg dosing). IV MgSO₄: capped at 2 g.
- Service worker: same-origin GET only; app icon added.

## Version 2.4 features
- Search by diagnosis, symptom, Malay/English synonym or medicine.
- Category filters: Respiratory, ENT, Dermatology, Paediatrics, GI, GU, MSK and Emergency.
- 20+ quick-reference topics with **red flags first**, then assessment, treatment, medication, prevention and referral triggers.
- Diagnosis-linked dose tools for selected paediatric/emergency medicines:
  - Paracetamol
  - Ibuprofen
  - Oseltamivir
  - IM adrenaline for anaphylaxis
  - High-dose amoxicillin for selected paediatric AOM/CAP regimens
  - Co-amoxiclav 14:1 for selected paediatric pathways
  - Azithromycin 5-day regimen
  - Cefuroxime for selected paediatric AOM/rhinosinusitis
  - Cephalexin for selected paediatric UTI/SSTI
  - Prednisolone for acute paediatric asthma
  - Nebulised salbutamol for acute paediatric asthma
  - ORS Plan B volume for some dehydration
  - Nitrofurantoin for paediatric lower UTI
  - Cloxacillin for selected mild paediatric SSTI
  - Amoxicillin for GAS pharyngitis
  - Co-amoxiclav 7:1 for selected paediatric pathways
  - Augmentin 228 mg/5 mL preset (200 mg amoxicillin + 28.5 mg clavulanate per 5 mL)
  - Acyclovir for paediatric varicella
  - Holliday-Segar maintenance fluid
  - Maintenance + dehydration-deficit calculator
- Optional mg/5 mL conversion using the exact bottle strength entered by the clinician.
- Full paediatric AEBA (acute exacerbation of bronchial asthma) module based on MOH/MPA Paediatric Protocols 5th Edition:
  - PAS severity (mild / moderate / severe) and life-threatening features
  - pMDI + spacer versus nebulised salbutamol pathways
  - oxygen target 94–98%
  - ipratropium for severe attacks
  - early oral prednisolone
  - IV hydrocortisone when PO is not tolerated or in severe/life-threatening AEBA
  - IV magnesium sulphate and nebulised budesonide adjuncts
  - admission / escalation criteria
  - AEBA emergency dose bundle plus individual calculators
- Dermatology quick guide for adult and paediatric patients:
  - case → suggested topical treatment
  - topical corticosteroid potency reference
  - face/flexure/child-specific cautions
  - explicit "avoid steroid" guidance for tinea, scabies primary treatment, infected skin, acne/rosacea/perioral dermatitis
  - examples include hydrocortisone 1%, lower-strength betamethasone valerate, betamethasone valerate 0.1%, mometasone 0.1% and clobetasol 0.05%.
- Offline-capable static web app; no backend, no login and no patient data transmission.

## Evidence approach
Priority is given to:
1. MOH Malaysia National Antimicrobial Guideline (NAG), including updates current to 2026.
2. MaHTAS / MOH Clinical Practice Guidelines.
3. Formulari Ubat KKM (FUKKM).
4. Major current professional guidance where a Malaysian source is unavailable.

Every case links to its source guideline. Core clinical content last reviewed: **5 October 2026**. Dermatology and paediatric AEBA modules added/reviewed: **7 October 2026**.

## Safety
This app is clinician decision support, not autonomous prescribing software. Before prescribing, verify diagnosis, allergy, pregnancy, renal/hepatic function, interactions, contraindications, product strength, local formulary and current MOH/facility policy.

Do **not** enter patient-identifiable information.

Antibiotic dose tools are intentionally diagnosis-linked. The app does not provide a free-form antibiotic calculator. For generic co-amoxiclav, enter the **amoxicillin component** in mg/5 mL rather than the combined product total. The Augmentin 228 mg/5 mL calculator is preset internally to **200 mg amoxicillin + 28.5 mg clavulanate per 5 mL**.

## GitHub Pages
Published from the `main` branch root. Expected URL:

`https://dzulhairy.github.io/locumguide/`

## Development
Pure HTML/CSS/JavaScript with no external dependencies.
