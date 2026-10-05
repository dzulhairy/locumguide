# Locum Quick Guide MY

A lightweight, mobile-first clinical quick-reference app for locum / primary-care use.

## What it does
- Search a case by diagnosis, symptom, Malay/English synonym, or medication.
- Shows **red flags first**, then assessment, treatment, medications, prevention, and referral triggers.
- Includes small dose helpers for selected standardisable medicines.
- Works as a static site: no server, no login, no patient data, no API key.
- Content is structured so new cases can be added easily in `app.js`.

## Initial topics
- Influenza / oseltamivir
- Severe hypertension / hypertensive emergency
- Bee sting & anaphylaxis
- Herpes zoster (shingles / kayap)
- Varicella (chickenpox / cacar air)
- Fungal otitis externa
- Adult dengue
- Knee osteoarthritis
- Rash triage

## Important
This is a clinician quick-reference, not a substitute for clinical judgement or the original guideline. Verify allergy, pregnancy, renal/hepatic function, drug interactions, contraindications, local formulary and current MOH/facility policy before prescribing.

No patient-identifiable information should be entered into this app.

## Sources
Priority is given to:
1. Ministry of Health Malaysia / MaHTAS CPGs and Formulari Ubat KKM.
2. Current major professional guidance when no suitable Malaysian CPG is available.
3. Direct links are shown inside every topic.

Clinical content last reviewed: **5 October 2026**.

## GitHub Pages
After the files are committed:
1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose **main** and **/(root)**.
4. Save.

The expected Pages URL is:
`https://dzulhairy.github.io/research_progress1/`

You may later rename this repository to something like `locum-quick-guide`.

## Development
Pure HTML/CSS/JavaScript; no external dependencies.
