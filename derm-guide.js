const DERM_CASES = {
  "facial-eczema":{
    title:"Facial / eyelid eczema",
    adult:{
      suggested:"Hydrocortisone 1% cream/ointment (mild potency) + regular emollient.",
      how:"Apply a thin layer once or twice daily to active eczema for a short course, then stop when controlled.",
      caution:"Use the weakest effective steroid on face/eyelids. Avoid prolonged or repeated potent steroid use near the eyes because of skin atrophy and ocular risk."
    },
    child:{
      suggested:"Hydrocortisone 1% (mild potency) + regular emollient.",
      how:"Mild potency is preferred for face/neck. For a severe flare, NICE allows a moderate-potency steroid only briefly (3–5 days) under appropriate clinical supervision.",
      caution:"Do not use potent topical corticosteroids in children under 12 months without specialist dermatology supervision."
    }
  },
  "flexural-eczema":{
    title:"Flexural / groin / axillary eczema",
    adult:{
      suggested:"Hydrocortisone 1% for mild disease; a moderate-potency steroid may be used briefly if inflammation is more marked.",
      how:"Use short courses and step down once controlled; maintain emollients.",
      caution:"Skin folds absorb steroid more readily. Avoid prolonged potent/very potent therapy and exclude fungal intertrigo."
    },
    child:{
      suggested:"Mild potency for mild disease. Moderate or potent preparations should only be used for short courses when clinically necessary.",
      how:"NICE advises moderate/potent topical steroids in vulnerable sites such as axillae/groin for short periods only (7–14 days).",
      caution:"Exclude candidiasis/tinea if the eruption has a sharply defined advancing edge, satellite pustules or poor response to steroid."
    }
  },
  "mild-body-eczema":{
    title:"Mild eczema — trunk / limbs",
    adult:{
      suggested:"Hydrocortisone 1% cream/ointment + emollient.",
      how:"Apply sparingly to active inflamed areas; use the mildest potency that controls symptoms.",
      caution:"Review the diagnosis if not improving; consider infection, tinea or contact allergy."
    },
    child:{
      suggested:"Hydrocortisone 1% (mild potency) + frequent emollient.",
      how:"NICE recommends mild potency for mild atopic eczema; use once or twice daily to active eczema.",
      caution:"Escalate potency only according to severity/site and reassess if uncontrolled within 7–14 days."
    }
  },
  "moderate-body-eczema":{
    title:"Moderate eczema / contact dermatitis — trunk / limbs",
    adult:{
      suggested:"Moderate-potency topical steroid; a lower-strength betamethasone valerate preparation is one option, depending on the available formulation.",
      how:"Short course to active areas, then step down to a milder agent once controlled. Continue emollient/barrier care and remove the trigger in contact dermatitis.",
      caution:"Potency is determined by the specific preparation—not simply the percentage on the tube."
    },
    child:{
      suggested:"Moderate-potency topical steroid for moderate eczema on trunk/limbs, with emollient.",
      how:"Use once or twice daily for the shortest effective course. If not controlled within 7–14 days, exclude infection and review diagnosis.",
      caution:"Potent therapy in children requires extra caution; under 12 months, potent steroids require specialist supervision."
    }
  },
  "severe-lichenified-eczema":{
    title:"Severe / lichenified eczema — trunk / limbs",
    adult:{
      suggested:"A potent topical corticosteroid such as betamethasone valerate 0.1% or mometasone furoate 0.1%, short course.",
      how:"Apply thinly to active thickened lesions; step down as soon as control is achieved. FUKKM lists mometasone 0.1% once daily, up to 3 weeks or until healed.",
      caution:"Avoid potent agents on face, eyelids and skin folds unless specifically indicated. Consider dermatology review for recurrent or treatment-resistant disease."
    },
    child:{
      suggested:"Potent steroid only when disease is severe and age/site make it appropriate.",
      how:"For children ≥12 months whose eczema is not controlled with mild/moderate steroid, NICE allows a potent steroid for as short a time as possible, no longer than 14 days, and not on face/neck.",
      caution:"Do not use potent steroid in children <12 months without specialist supervision."
    }
  },
  "insect-bite":{
    title:"Local inflammatory insect-bite reaction",
    adult:{
      suggested:"Hydrocortisone 1% cream for local itch/inflammation if skin is intact; cold compress and oral antihistamine may also help.",
      how:"Short course only to the inflamed area.",
      caution:"Do not treat anaphylaxis or cellulitis with topical steroid. Escalate for systemic reaction, rapidly spreading erythema or severe pain."
    },
    child:{
      suggested:"Hydrocortisone 1% can be considered for a short course on intact skin for a limited local reaction.",
      how:"Use sparingly; avoid eyes, broken skin and extensive areas.",
      caution:"Assess for anaphylaxis, secondary infection or significant facial swelling."
    }
  },
  "plaque-psoriasis":{
    title:"Limited plaque psoriasis — body",
    adult:{
      suggested:"Potent topical steroid such as betamethasone valerate 0.1% may be used on appropriate body sites; psoriasis often benefits from a vitamin-D analogue strategy rather than steroid alone long term.",
      how:"Use short/intermittent courses and avoid continuous prolonged high-potency therapy.",
      caution:"Avoid potent steroid on face/flexures. Clobetasol 0.05% is very potent and FUKKM restricts it to short-term resistant dermatoses."
    },
    child:{
      suggested:"Do not default to potent steroid without confirming diagnosis and age/site-appropriate psoriasis guidance.",
      how:"Use specialist/paediatric dermatology guidance for moderate–severe disease.",
      caution:"Very potent topical corticosteroids should not be used in children without specialist dermatological advice."
    }
  },
  "seb-derm-face":{
    title:"Seborrhoeic dermatitis — face",
    adult:{
      suggested:"Antifungal treatment (e.g. ketoconazole/clotrimazole where appropriate) is primary; add hydrocortisone 1% briefly if markedly inflamed.",
      how:"Use mild steroid only for a few days during an inflammatory flare, not as long-term monotherapy.",
      caution:"Persistent facial steroid use can cause atrophy, telangiectasia, steroid rosacea or perioral dermatitis."
    },
    child:{
      suggested:"Usually emollient/gentle scale care; antifungal treatment if clinically indicated. Avoid routine topical steroid unless the diagnosis and severity justify it.",
      how:"If a mild steroid is needed, use the shortest appropriate course.",
      caution:"Review infants with extensive, atypical, infected or treatment-resistant disease."
    }
  },
  "tinea":{
    title:"Tinea corporis / cruris / faciei",
    adult:{
      suggested:"Antifungal—not steroid. Clotrimazole 1% is a common option for localised tinea.",
      how:"Treat the fungal infection adequately and keep the area dry.",
      caution:"Avoid steroid monotherapy or empiric steroid-antifungal combinations: steroid can mask/worsen tinea (tinea incognito)."
    },
    child:{
      suggested:"Antifungal—not steroid. Use an age-appropriate topical antifungal for localised disease.",
      how:"Treat according to site and extent; scalp disease generally requires systemic therapy.",
      caution:"Avoid steroid monotherapy on suspected fungal rash."
    }
  },
  "candidal-intertrigo":{
    title:"Candidal intertrigo",
    adult:{
      suggested:"Topical antifungal plus moisture/friction control; do not use steroid alone.",
      how:"A very short course of hydrocortisone 1% may occasionally be added for marked inflammation after antifungal therapy is in place.",
      caution:"Avoid potent steroid in folds; it can worsen infection and cause atrophy/striae."
    },
    child:{
      suggested:"Barrier care plus appropriate topical antifungal; steroid is not primary therapy.",
      how:"If inflammation is severe, use only a mild steroid briefly and only when fungal treatment is also being addressed.",
      caution:"In infants, reassess persistent diaper/intertriginous rash for Candida, bacterial infection or another diagnosis."
    }
  },
  "scabies":{
    title:"Scabies",
    adult:{
      suggested:"Permethrin 5% is treatment; topical steroid is not the scabicide.",
      how:"Treat close contacts simultaneously and repeat treatment according to the scabies regimen.",
      caution:"A mild topical steroid may be used briefly for post-scabetic inflammation/itch after adequate scabicide treatment."
    },
    child:{
      suggested:"Permethrin 5% for age-appropriate scabies treatment; topical steroid is not primary therapy.",
      how:"Treat household/close contacts at the same time.",
      caution:"Use only mild steroid briefly for residual eczema/itch after treating the infestation."
    }
  },
  "impetigo-cellulitis":{
    title:"Impetigo / cellulitis / infected skin",
    adult:{
      suggested:"Do not use topical steroid as primary treatment.",
      how:"Treat the bacterial infection according to local/NAG guidance; abscess may need source control.",
      caution:"Steroid can mask progression of infection."
    },
    child:{
      suggested:"Do not use topical steroid as primary treatment.",
      how:"Treat the bacterial infection according to paediatric SSTI guidance.",
      caution:"Escalate rapidly progressive infection, fever/toxicity, severe pain or facial/orbital involvement."
    }
  },
  "acne-rosacea-perioral":{
    title:"Acne / rosacea / perioral dermatitis",
    adult:{
      suggested:"Avoid topical corticosteroids unless there is a separate confirmed steroid-responsive dermatosis.",
      how:"Use diagnosis-specific therapy instead.",
      caution:"Topical steroids can aggravate acneiform eruptions, rosacea and perioral dermatitis."
    },
    child:{
      suggested:"Avoid empiric topical steroid for acneiform/perioral eruptions.",
      how:"Confirm diagnosis and use age-appropriate therapy.",
      caution:"Facial steroid exposure can itself cause or worsen perioral dermatitis."
    }
  }
};

const STEROID_TABLE = [
  {potency:"Mild",examples:"Hydrocortisone 1% cream / ointment",role:"Face/neck and mild eczema; preferred first steroid in many paediatric/facial situations.",caution:"Still use sparingly; prolonged eyelid use can cause atrophy/ocular complications."},
  {potency:"Moderate",examples:"Lower-strength betamethasone valerate (e.g. 0.025%; potency depends on exact product)",role:"Moderate eczema/contact dermatitis on appropriate body sites.",caution:"Short courses in flexures/groin; avoid assuming potency from % alone."},
  {potency:"Potent",examples:"Betamethasone valerate 0.1%; Mometasone furoate 0.1%",role:"Severe/lichenified steroid-responsive dermatoses on thicker body sites.",caution:"Avoid face/eyelids/flexures unless specifically directed; extra caution in children."},
  {potency:"Very potent",examples:"Clobetasol propionate 0.05%",role:"Short-term resistant dermatoses such as recalcitrant eczema/psoriasis.",caution:"Not routine primary-care treatment for children; FUKKM: short-term only, max 50 g/week."}
];

function dermCaseOptions(){
  return Object.entries(DERM_CASES).map(([id,x])=>`<option value="${id}">${x.title}</option>`).join("");
}
function renderDermPotency(){
  const body=STEROID_TABLE.map(x=>`<tr><td><strong>${x.potency}</strong></td><td>${x.examples}</td><td>${x.role}</td><td>${x.caution}</td></tr>`).join("");
  document.getElementById("steroidPotencyTable").innerHTML=`<div class="table-scroll"><table class="clinical-table"><thead><tr><th>Potency</th><th>Examples</th><th>Typical role</th><th>Key caution</th></tr></thead><tbody>${body}</tbody></table></div>`;
}
function renderDermAdvice(){
  const caseId=document.getElementById("dermCaseSelect").value;
  const group=document.getElementById("dermAgeGroup").value;
  const out=document.getElementById("dermAdvice");
  if(!caseId){out.classList.add("hidden"); return;}
  const c=DERM_CASES[caseId], a=c[group];
  out.innerHTML=`
    <h3>${c.title} — ${group==="child"?"Paediatric":"Adult"}</h3>
    <div class="med"><strong>Suggested topical:</strong> ${a.suggested}</div>
    <section class="block"><h3>How to use the recommendation</h3><p>${a.how}</p></section>
    <section class="redflags"><h3>Important caution</h3><p>${a.caution}</p></section>
    <p class="small">This module suggests a topical strategy after a diagnosis has been made. It does not diagnose a rash from appearance alone. Potency depends on the exact molecule, strength and formulation.</p>
  `;
  out.classList.remove("hidden");
}
document.getElementById("dermCaseSelect").innerHTML=`<option value="">Choose a dermatology case</option>${dermCaseOptions()}`;
document.getElementById("dermCaseSelect").addEventListener("change",renderDermAdvice);
document.getElementById("dermAgeGroup").addEventListener("change",renderDermAdvice);
renderDermPotency();
