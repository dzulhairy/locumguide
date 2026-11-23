// Patient counselling / how-to-use instructions (BM + EN), added 23 Nov 2026.
// Shown as "💬 Kaunseling pesakit" on each card, with a copy button so the text can be shared with the patient.
// Drug-specific points follow the sources cited on each card (MOH scabies guideline 2015 via NAG/PPUKM bulletin,
// NAG 2024, PP5 2025, MSAI 2022, SIGN 155, T2DM CPG); device technique is standard pharmacy counselling.
(function(){
const C = {
  scabiesPerm: {
    ms:["<strong>Permethrin 5% — cara sapu:</strong>",
      "1. Potong kuku pendek. Mandi, kemudian keringkan badan dan tunggu kulit sejuk (jangan sapu sejurus selepas mandi air panas).",
      "2. Sapu lapisan nipis ke <strong>SELURUH badan dari leher hingga hujung kaki</strong> — bukan hanya di tempat gatal. Pastikan celah jari tangan & kaki, bawah kuku, pergelangan tangan, siku, ketiak, pusat, kemaluan, punggung dan tapak kaki.",
      "3. Bayi, kanak-kanak kecil, warga emas dan pesakit imunokompromi: sapu juga kepala, kulit kepala, muka, leher dan telinga (elak mata dan mulut).",
      "4. Biarkan <strong>8–12 jam</strong> (paling mudah: sapu waktu malam, biar semalaman). Jika basuh tangan dalam tempoh ini, sapu semula pada tangan.",
      "5. Mandi dan bilas selepas 8–12 jam, kemudian pakai baju bersih.",
      "6. <strong>Ulang sekali lagi selepas 7 hari.</strong>",
      "7. <strong>Semua ahli rumah & kontak rapat dirawat pada hari yang sama</strong>, walaupun tiada gatal.",
      "8. Cadar, tuala, baju, pakaian dalam & selipar yang digunakan 3 hari sebelum rawatan: basuh air panas (>50 °C) atau masukkan dalam beg plastik bertutup selama 3 hari.",
      "9. Gatal boleh berterusan 2–4 minggu selepas rawatan walaupun kutu sudah mati. Datang semula jika ada ruam/terowong baharu selepas 2–4 minggu."],
    en:["<strong>Permethrin 5% — how to apply:</strong>",
      "1. Cut nails short. Bathe, dry and let the skin cool (not straight after a hot bath).",
      "2. Apply a thin layer to the <strong>WHOLE body from the neck down to the toes</strong> — not only itchy areas. Include between fingers and toes, under nails, wrists, elbows, armpits, navel, genitals, buttocks and soles.",
      "3. Infants, young children, the elderly and immunocompromised: also treat scalp, face, neck and ears (avoid eyes and mouth).",
      "4. Leave on for <strong>8–12 hours</strong> (easiest overnight). Re-apply to hands if washed during this time.",
      "5. Wash off after 8–12 hours and put on clean clothes.",
      "6. <strong>Repeat once after 7 days.</strong>",
      "7. <strong>Treat all household members and close contacts on the same day</strong>, even without itch.",
      "8. Bedding, towels, clothes, underwear and slippers used in the 3 days before treatment: hot wash (>50 °C) or seal in a plastic bag for 3 days.",
      "9. Itch can last 2–4 weeks after successful treatment. Return if new burrows or rash appear after 2–4 weeks."]},
  scabiesOther: {
    ms:["<strong>Benzyl benzoate (25% dewasa; 12.5% kanak-kanak &lt;12 tahun):</strong> sapu dari leher ke bawah, biar 24 jam, bilas, kemudian sapu semula setiap hari untuk 3 hari berturut-turut. Biasanya rasa pedih/panas sekejap. Jangan sapu pada muka.",
      "<strong>Sulphur 6% (bayi &lt;2 bulan):</strong> sapu seluruh badan termasuk muka (elak mata & mulut), bilas selepas 24 jam dan sapu semula setiap 24 jam untuk 3 hari.",
      "<strong>Crotamiton 10% krim (scabies nodular):</strong> sapu pada nodul 3 kali sehari — 5–7 hari (&lt;2 tahun) atau 7–14 hari (&lt;12 tahun)."],
    en:["<strong>Benzyl benzoate (25% adults; 12.5% children &lt;12 y):</strong> apply from the neck down, leave 24 h, rinse, then re-apply daily for 3 consecutive days. Brief stinging/burning is common. Do not apply to the face.",
      "<strong>Sulphur 6% (infants &lt;2 months):</strong> whole body including face (avoid eyes and mouth), rinse after 24 h and re-apply every 24 h for 3 days.",
      "<strong>Crotamiton 10% cream (nodular scabies):</strong> apply to nodules three times daily for 5–7 days (&lt;2 y) or 7–14 days (&lt;12 y)."]},
  mdi: {
    ms:["<strong>Inhaler (pMDI) + spacer:</strong>",
      "1. Buka penutup, goncang inhaler, pasang pada spacer.",
      "2. Kanak-kanak kecil: guna spacer dengan topeng muka, pastikan rapat menutup hidung & mulut. Kanak-kanak lebih besar/dewasa: guna mulut spacer, bibir rapat.",
      "3. Tekan <strong>1 puff sahaja</strong> ke dalam spacer, kemudian bernafas biasa 5–6 kali (atau tarik nafas dalam perlahan dan tahan 10 saat).",
      "4. Goncang semula dan ulang untuk setiap puff seterusnya.",
      "5. Jika inhaler steroid: berkumur dan ludah selepas guna.",
      "6. Cuci spacer seminggu sekali dengan sabun, biar kering sendiri (jangan lap).",
      "<strong>Pergi kecemasan segera</strong> jika sesak tidak lega, tidak boleh bercakap/menyusu, bibir biru atau perlu ubat lebih kerap daripada setiap 4 jam."],
    en:["<strong>Inhaler (pMDI) + spacer:</strong>",
      "1. Remove the cap, shake the inhaler and fit it to the spacer.",
      "2. Young children: use a spacer with a face mask sealed over nose and mouth. Older children/adults: use the mouthpiece with lips sealed.",
      "3. Press <strong>one puff only</strong> into the spacer, then breathe normally 5–6 times (or one slow deep breath held for 10 seconds).",
      "4. Shake again and repeat for each puff.",
      "5. Steroid inhaler: rinse mouth and spit after use.",
      "6. Wash the spacer weekly with soapy water and let it air-dry (do not wipe).",
      "<strong>Go to emergency immediately</strong> if breathlessness is not relieved, unable to talk/feed, lips are blue, or reliever is needed more often than every 4 hours."]},
  nasal: {
    ms:["<strong>Semburan hidung steroid:</strong>",
      "1. Hembus hidung dulu. Goncang botol (cuba semburan pertama ke udara jika baru dibuka).",
      "2. Tunduk sedikit ke depan. Masukkan hujung ke lubang hidung, <strong>halakan ke arah luar (ke telinga), bukan ke tengah hidung</strong>.",
      "3. Sembur sambil tarik nafas perlahan — jangan sedut kuat.",
      "4. Guna setiap hari walaupun simptom kurang; kesan penuh ambil beberapa hari.",
      "5. Semburan dekongestan (jika diberi) jangan lebih 7 hari."],
    en:["<strong>Steroid nasal spray:</strong>",
      "1. Blow the nose first. Shake the bottle (prime into the air if new).",
      "2. Tilt the head slightly forward. Insert the nozzle and <strong>point it outwards (towards the ear), away from the middle of the nose</strong>.",
      "3. Spray while breathing in gently — do not sniff hard.",
      "4. Use every day even when symptoms improve; full effect takes several days.",
      "5. Decongestant spray (if given): no longer than 7 days."]},
  eye: {
    ms:["<strong>Ubat titis / salap mata:</strong>",
      "1. Basuh tangan. Bersihkan tahi mata dengan kapas + air masak yang disejukkan, dari bucu dalam ke luar.",
      "2. Dongak, tarik kelopak bawah, titis 1 titik ke dalam poket kelopak. Jangan sentuh hujung botol pada mata.",
      "3. Pejam 1–2 minit dan tekan bucu dalam mata perlahan.",
      "4. Salap: picit ~1 cm ke kelopak bawah, sebaiknya waktu malam (penglihatan kabur sekejap).",
      "5. Jangan kongsi ubat, tuala atau bantal. Berhenti pakai kanta lekap sehingga sembuh.",
      "<strong>Datang segera</strong> jika penglihatan kabur, sakit mata kuat atau silau cahaya."],
    en:["<strong>Eye drops / ointment:</strong>",
      "1. Wash hands. Clean discharge with cotton wool and cooled boiled water, inner corner outwards.",
      "2. Tilt head back, pull the lower lid down and put 1 drop into the pocket. Do not touch the tip to the eye.",
      "3. Close the eye for 1–2 minutes and press gently on the inner corner.",
      "4. Ointment: ~1 cm ribbon inside the lower lid, ideally at night (temporary blurring).",
      "5. Do not share drops, towels or pillows. Stop contact lenses until healed.",
      "<strong>Return urgently</strong> for blurred vision, severe pain or light sensitivity."]},
  lid: {
    ms:["<strong>Kebersihan kelopak mata:</strong> tuam suam 5–10 minit, kemudian bersihkan pangkal bulu mata dengan putik kapas dicelup syampu bayi yang dicairkan, 1–2 kali sehari."],
    en:["<strong>Lid hygiene:</strong> warm compress for 5–10 minutes, then clean the lash line with a cotton bud dipped in diluted baby shampoo, once or twice daily."]},
  ear: {
    ms:["<strong>Ubat titis telinga:</strong>",
      "1. Keringkan/lap nanah di luar telinga dengan kapas atau tisu bergulung (jangan korek dalam, jangan guna putik kapas).",
      "2. Suamkan botol dalam genggaman. Baring mengiring, telinga sakit di atas.",
      "3. Tarik cuping telinga — kanak-kanak kecil: ke bawah & belakang; dewasa: ke atas & belakang. Titis bilangan titik yang diberi.",
      "4. Tekan tonjolan depan telinga (tragus) beberapa kali, kekal baring 3–5 minit.",
      "5. Pastikan telinga kering semasa mandi (kapas disapu vaseline di lubang telinga); elak berenang sehingga sembuh.",
      "<strong>Datang segera</strong> jika bengkak/merah di belakang telinga, muka senget, demam tinggi atau anak lesu."],
    en:["<strong>Ear drops:</strong>",
      "1. Dry-mop discharge at the ear opening with rolled tissue/cotton wool (do not dig, no cotton buds).",
      "2. Warm the bottle in your hand. Lie on your side with the affected ear up.",
      "3. Pull the ear — young child: down and back; adult: up and back. Instil the prescribed number of drops.",
      "4. Press the tragus a few times and stay lying for 3–5 minutes.",
      "5. Keep the ear dry when bathing (cotton wool with Vaseline at the opening); no swimming until healed.",
      "<strong>Return urgently</strong> for swelling/redness behind the ear, facial droop, high fever or a lethargic child."]},
  syrup: {
    ms:["<strong>Sirap antibiotik:</strong> goncang botol, sukat dengan picagari/sudu sukat (bukan sudu dapur), simpan ikut label (sesetengah perlu peti sejuk), dan <strong>habiskan sepanjang tempoh</strong> walaupun anak sudah sihat."],
    en:["<strong>Antibiotic syrup:</strong> shake well, measure with an oral syringe or measuring spoon (not a kitchen spoon), store as labelled (some need the fridge) and <strong>finish the full course</strong> even if the child is better."]},
  doxy: {
    ms:["<strong>Doxycycline:</strong> telan dengan segelas penuh air, duduk/berdiri tegak sekurang-kurangnya 30 minit (jangan sejurus sebelum tidur). Jarakkan 2 jam dari susu, antasid, zat besi/kalsium. Elak cahaya matahari terik (kulit mudah terbakar). Tidak untuk wanita hamil atau kanak-kanak &lt;8 tahun."],
    en:["<strong>Doxycycline:</strong> swallow with a full glass of water and stay upright for at least 30 minutes (not just before bed). Separate by 2 hours from milk, antacids, iron/calcium. Avoid strong sun (photosensitivity). Not for pregnancy or children &lt;8 years."]},
  metro: {
    ms:["<strong>Metronidazole:</strong> makan selepas makan. <strong>Jangan minum alkohol</strong> semasa rawatan dan 48 jam selepas dos terakhir. Rasa logam di mulut adalah biasa."],
    en:["<strong>Metronidazole:</strong> take after food. <strong>No alcohol</strong> during treatment and for 48 hours after the last dose. A metallic taste is common."]},
  pessary: {
    ms:["<strong>Pessary faraj (clotrimazole):</strong> masukkan waktu malam sebelum tidur. Baring terlentang, lutut dibengkokkan, masukkan pessary sedalam yang selesa menggunakan aplikator. Basuh tangan sebelum & selepas. Boleh merosakkan kondom getah (latex) — guna kaedah lain sepanjang rawatan."],
    en:["<strong>Vaginal pessary (clotrimazole):</strong> insert at bedtime. Lie on your back with knees bent and insert as high as comfortable with the applicator. Wash hands before and after. May damage latex condoms — use another method during treatment."]},
  partner: {
    ms:["Pasangan seks perlu diperiksa dan dirawat. Elak hubungan seks sehingga anda dan pasangan habis rawatan dan simptom hilang."],
    en:["Sexual partners need examination and treatment. Avoid sex until you and your partner(s) have finished treatment and symptoms have gone."]},
  nitro: {
    ms:["<strong>Nitrofurantoin:</strong> makan bersama makanan. Air kencing mungkin berwarna kuning gelap/coklat — tidak berbahaya. Habiskan ubat. Datang semula jika demam, sakit pinggang atau muntah."],
    en:["<strong>Nitrofurantoin:</strong> take with food. Urine may turn dark yellow/brown — harmless. Finish the course. Return if fever, loin pain or vomiting."]},
  colch: {
    ms:["<strong>Colchicine:</strong> mula seawal mungkin bila serangan gout bermula. Ikut dos tepat — <strong>jangan tambah sendiri</strong>. Berhenti dan dapatkan nasihat jika cirit-birit atau muntah. Beritahu doktor/farmasi jika anda ambil ubat lain (cth. clarithromycin, ubat kolesterol). Elak jus limau gedang (grapefruit)."],
    en:["<strong>Colchicine:</strong> start as early as possible in the flare. Take exactly as prescribed — <strong>do not take extra</strong>. Stop and seek advice if diarrhoea or vomiting. Tell your doctor/pharmacist about other medicines (e.g. clarithromycin, cholesterol tablets). Avoid grapefruit juice."]},
  itra: {
    ms:["<strong>Itraconazole kapsul:</strong> ambil bersama makanan dan minuman berasid (cth. jus oren atau minuman bergas). Elak ubat gastrik jenis PPI/H2 blocker semasa rawatan (kurangkan penyerapan)."],
    en:["<strong>Itraconazole capsules:</strong> take with food and an acidic drink (e.g. orange juice or cola). Avoid PPI/H2-blocker acid medicines during treatment (they reduce absorption)."]},
  antifungal: {
    ms:["<strong>Krim antikulat:</strong> basuh dan keringkan kulit, sapu pada ruam dan ~2 cm di sekelilingnya, 2 kali sehari. <strong>Teruskan 2 minggu selepas ruam hilang.</strong> Pastikan kawasan kering; jangan kongsi tuala. Jangan guna krim steroid sahaja."],
    en:["<strong>Antifungal cream:</strong> wash and dry the skin, apply to the rash and ~2 cm around it twice daily. <strong>Continue for 2 weeks after the rash clears.</strong> Keep the area dry; do not share towels. Do not use steroid-only creams."]},
  shampoo: {
    ms:["<strong>Syampu selenium/ketoconazole untuk panau:</strong> sapu pada kulit yang terlibat (badan, bukan hanya kepala), buat buih, biar 10 minit, kemudian bilas. Tompok putih mengambil masa beberapa minggu–bulan untuk kembali normal walaupun jangkitan sudah sembuh. Boleh guna setiap 2–4 minggu untuk elak berulang."],
    en:["<strong>Selenium/ketoconazole shampoo for pityriasis versicolor:</strong> apply to affected skin (body, not only scalp), lather, leave for 10 minutes, then rinse. Pale patches take weeks–months to recover even after cure. Use every 2–4 weeks to prevent recurrence."]},
  impetigoTop: {
    ms:["<strong>Krim/salap antibiotik (fusidic acid/mupirocin):</strong> rendam kerak dengan air suam atau air garam, tanggalkan perlahan, keringkan, kemudian sapu nipis. Basuh tangan selepas. Potong kuku anak, jangan kongsi tuala."],
    en:["<strong>Antibiotic cream (fusidic acid/mupirocin):</strong> soak crusts with warm water or saline and remove gently, pat dry, then apply thinly. Wash hands afterwards. Keep the child's nails short; do not share towels."]},
  kmno4: {
    ms:["<strong>Rendaman potassium permanganate (1:10,000):</strong> larutkan sepenuhnya sehingga air <strong>merah jambu cair</strong> (bukan ungu). Jangan sapu kristal terus pada kulit. Tuam/rendam 20 minit, 2–3 kali sehari. Boleh mengotorkan kain/kuku. Untuk kepala/leher guna tuam air garam biasa."],
    en:["<strong>Potassium permanganate soaks (1:10,000):</strong> dissolve fully until the water is <strong>pale pink</strong> (not purple). Never put crystals directly on skin. Soak/compress for 20 minutes 2–3 times daily. It stains cloth and nails. Use plain saline compresses on the head/neck."]},
  ors: {
    ms:["<strong>ORS (garam galian):</strong> larutkan 1 paket dalam isipadu air masak yang disejukkan seperti tertulis pada paket — jangan tambah gula/air lebih. Beri sedikit-sedikit dengan sudu/cawan dengan kerap. Jika muntah, tunggu 10 minit kemudian beri lebih perlahan (1 sudu setiap 2–3 minit). Buang larutan selepas 24 jam. Teruskan susu ibu dan makanan.",
      "<strong>Datang segera</strong> jika anak lesu, tidak boleh minum, muntah berterusan, darah dalam najis atau kurang kencing."],
    en:["<strong>ORS:</strong> dissolve 1 sachet in the volume of cooled boiled water stated on the packet — do not add sugar or extra water. Give small, frequent sips by spoon/cup. If vomiting, wait 10 minutes then give more slowly (1 spoon every 2–3 minutes). Discard after 24 hours. Continue breastfeeding and food.",
      "<strong>Return urgently</strong> if the child is lethargic, cannot drink, keeps vomiting, has blood in the stool or passes little urine."]},
  rectalDiaz: {
    ms:["<strong>Diazepam rektal (jika dibekalkan):</strong> guna jika sawan <strong>lebih 5 minit</strong>. Baringkan anak mengiring, masukkan hujung tiub ke dubur, picit habis, keluarkan sambil masih memicit, rapatkan punggung beberapa saat. Catat masa. Hubungi 999 / bawa ke hospital.",
      "<strong>Semasa sawan:</strong> baringkan mengiring, jauhkan benda tajam, jangan masukkan apa-apa ke dalam mulut, jangan beri minum, catat tempoh sawan."],
    en:["<strong>Rectal diazepam (if supplied):</strong> use if the seizure lasts <strong>more than 5 minutes</strong>. Lay the child on their side, insert the tube tip into the bottom, squeeze fully, withdraw while still squeezing and hold the buttocks together briefly. Note the time. Call 999 / go to hospital.",
      "<strong>During a seizure:</strong> place on the side, move sharp objects away, put nothing in the mouth, give no drinks, time the seizure."]},
  triptan: {
    ms:["<strong>Sumatriptan:</strong> ambil sebaik sakit kepala bermula (bukan semasa aura). Jangan lebih dos maksimum pada label. Hadkan semua ubat sakit kepala kepada <strong>tidak lebih 2 hari seminggu</strong> untuk elak sakit kepala akibat ubat. Jangan guna jika ada sakit jantung/strok."],
    en:["<strong>Sumatriptan:</strong> take as soon as the headache starts (not during aura). Do not exceed the label maximum. Limit all headache medicines to <strong>no more than 2 days a week</strong> to avoid medication-overuse headache. Not for people with heart disease or previous stroke."]},
  hypo: {
    ms:["<strong>Jika gula rendah (&lt;3.9 mmol/L) dan sedar:</strong> ambil 15 g gula ringkas — 1 sudu besar madu, ATAU 150–200 mL jus/minuman bergas biasa, ATAU 3 sudu teh gula dalam air. Semak gula selepas 15 minit; ulang jika masih &lt;3.9. Kemudian makan makanan/snek seperti biasa. Pengguna acarbose: guna tablet glukosa (atau susu/madu).",
      "Sentiasa bawa gula/gula-gula. Beritahu keluarga cara bantu jika anda tidak sedar (jangan beri minum; bawa ke hospital)."],
    en:["<strong>If sugar is low (&lt;3.9 mmol/L) and you are awake:</strong> take 15 g fast sugar — 1 tablespoon honey, OR 150–200 mL juice/regular soft drink, OR 3 teaspoons sugar in water. Recheck after 15 minutes; repeat if still &lt;3.9. Then eat your usual meal/snack. On acarbose: use glucose tablets (or milk/honey).",
      "Always carry sugar. Teach family what to do if you are unconscious (no drinks by mouth; get to hospital)."]},
  hpylori: {
    ms:["<strong>Rawatan H. pylori (3 ubat):</strong> ambil <strong>semua ubat untuk 14 hari penuh</strong> walaupun rasa lega. Ubat gastrik (PPI) diambil 30 minit sebelum makan. Rasa pahit/logam dan najis lembut adalah biasa. Jangan minum alkohol jika ada metronidazole."],
    en:["<strong>H. pylori treatment:</strong> take <strong>all medicines for the full 14 days</strong> even if you feel better. Take the PPI 30 minutes before meals. A bitter/metallic taste and loose stools are common. No alcohol if metronidazole is included."]},
  benzathine: {
    ms:["<strong>Suntikan benzathine penicillin:</strong> tunggu 30 minit di klinik selepas suntikan. Dalam 24 jam pertama mungkin demam, menggigil dan sakit badan (reaksi Jarisch–Herxheimer) — biasanya hilang sendiri; boleh ambil paracetamol. Datang segera jika sesak nafas, bengkak muka atau ruam teruk."],
    en:["<strong>Benzathine penicillin injection:</strong> wait 30 minutes in clinic after the injection. Fever, chills and aches in the first 24 hours (Jarisch–Herxheimer reaction) are common and settle; paracetamol can help. Return urgently for breathing difficulty, facial swelling or severe rash."]},
  steroidCream: {
    ms:["<strong>Krim steroid:</strong> sapu nipis hanya pada kawasan aktif, 1–2 kali sehari, untuk tempoh yang diberi sahaja. Ukuran: 1 ruas hujung jari (fingertip unit) cukup untuk kawasan sebesar 2 tapak tangan dewasa. Teruskan pelembap. Elak steroid kuat pada muka/lipatan kecuali diarahkan."],
    en:["<strong>Steroid cream:</strong> apply thinly to active areas only, 1–2 times daily, for the prescribed period only. One fingertip unit covers an area of two adult palms. Keep using moisturiser. Avoid potent steroids on the face/skin folds unless told."]}
};
const MAP = {
  scabies:["scabiesPerm","scabiesOther"],
  "asthma-exacerbation":["mdi"], "aeba-paediatric":["mdi"], "copd-exacerbation":["mdi"],
  "allergic-rhinitis":["nasal"],
  conjunctivitis:["eye"], "stye-blepharitis":["eye","lid"],
  "otitis-externa":["ear"], otomycosis:["ear"], "otorrhoea-child":["ear","syrup"], aom:["syrup"],
  pharyngitis:["syrup"], cap:["syrup","doxy"], "uti-paeds":["syrup","nitro"], "preseptal-cellulitis":["syrup"],
  uti:["nitro"], "uti-pregnancy":["nitro"],
  "vaginal-discharge":["pessary","metro","partner"], "urethral-discharge":["doxy","partner"], pid:["metro","doxy","partner"],
  "genital-ulcer":["benzathine","doxy","partner"],
  "dental-abscess":["metro"], bites:["doxy","metro"], leptospirosis:["doxy"],
  "h-pylori-dyspepsia":["hpylori"],
  tinea:["antifungal","itra"], "cutaneous-candida":["antifungal","itra"], "tinea-versicolor":["shampoo","itra"],
  impetigo:["impetigoTop","syrup"], "skin-abscess":["impetigoTop","syrup"],
  varicella:["kmno4"], zoster:["kmno4"], "herpes-simplex-skin":["kmno4"],
  gastroenteritis:["ors"], "dengue-paeds":["ors"],
  "febrile-seizure":["rectalDiaz"],
  gout:["colch"], migraine:["triptan"], hypoglycaemia:["hypo"]
};
for (const [id, keys] of Object.entries(MAP)) {
  const c = (window.LOCUM_CASES || []).find(x => x.id === id); if (!c) continue;
  c.counsel = { ms: keys.flatMap(k => C[k].ms), en: keys.flatMap(k => C[k].en) };
}

// Scabies card: fuller regimen per MOH Guideline for Management of Scabies in Adults and Children (Feb 2015).
const sc = (window.LOCUM_CASES || []).find(x => x.id === "scabies");
if (sc) {
  sc.meds.push("<strong>Crusted (Norwegian) scabies (MOH 2015 guideline):</strong> often needs admission. Permethrin 5% every 2–3 days for 1–2 weeks PLUS oral ivermectin 200 mcg/kg with food — 3 doses (days 1, 2, 8), 5 doses (days 1, 2, 8, 9, 15) or 7 doses (add days 22, 29) by severity. Keratolytic (salicylic acid in Vaseline) for crusts; keep nails short and treat under nails. Ivermectin: not established <15 kg or in pregnancy; availability may be limited.",
    "<strong>Lindane:</strong> not first line (neurotoxic; seizures with misuse/overuse; contraindicated in pregnancy, breastfeeding, young children and seizure disorders). Avoid.");
  sc.sources.push(["MOH Guideline for Management of Scabies in Adults and Children (Feb 2015)","https://www.moh.gov.my/images/04-penerbitan/penerbitan-klinikal/pengurusan-kesihatan-dan-kawalan-penyakit/Guideline_For_Management_Of_Scabies_In_Adults_And_Children.pdf"],
    ["HCTM/PPUKM Pharmacy Bulletin 2016 — scabies treatment table reproduced from MOH 2015 guideline","https://hctm.ukm.my/farmasi/wp-content/uploads/2020/09/2.2016.-scabies.pdf"]);
}
})();
