# Locum Quick Guide MY — v2.3

Mobile-first clinician quick-reference for common primary-care / locum presentations in Malaysia.

## Version 2.3 features
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

Every case links to its source guideline. Core clinical content last reviewed: **5 October 2026**. Dermatology module added/reviewed: **7 October 2026**.

## Safety
This app is clinician decision support, not autonomous prescribing software. Before prescribing, verify diagnosis, allergy, pregnancy, renal/hepatic function, interactions, contraindications, product strength, local formulary and current MOH/facility policy.

Do **not** enter patient-identifiable information.

Antibiotic dose tools are intentionally diagnosis-linked. The app does not provide a free-form antibiotic calculator. For generic co-amoxiclav, enter the **amoxicillin component** in mg/5 mL rather than the combined product total. The Augmentin 228 mg/5 mL calculator is preset internally to **200 mg amoxicillin + 28.5 mg clavulanate per 5 mL**.

## GitHub Pages
Published from the `main` branch root. Expected URL:

`https://dzulhairy.github.io/locumguide/`

## Development
Pure HTML/CSS/JavaScript with no external dependencies.
