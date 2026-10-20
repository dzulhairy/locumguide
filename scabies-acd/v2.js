"use strict";
(function(){
  const by = id => document.getElementById(id);
  const nav = document.querySelector(".nav-inner");
  if(!nav || !by("kawalan") || !by("ringkasan") || by("v2-unit")) return;
  nav.insertAdjacentHTML("beforeend",'<a href="#v2-operasi">Operasi</a><a href="#v2-klinikal">Bantuan IACS</a><a href="#v2-unit">Kontak & unit</a><a href="#v2-epi">Epi-curve</a><a href="#v2-susulan">Susulan</a><a href="#v2-report">Laporan v2.0</a>');
  const clinicalBlock = '<section class="section" id="v2-klinikal"><div class="kicker">08 · Bantuan klinikal</div><h2>Semakan kriteria IACS 2020</h2><p class="lead">Alat sokongan untuk petugas klinikal terlatih; bukan diagnosis automatik. Gunakan penilaian sejarah, pemeriksaan kulit dan pertimbangan diagnosis berbeza.</p><div class="v2-panel"><div class="v2-form">'+
  '<label>Hama / produk dilihat<select id="v2-direct"><option value="">Tidak / belum dinilai</option><option value="A1">A1 Mikroskopi</option><option value="A2">A2 Pengimejan berkuasa tinggi</option><option value="A3">A3 Dermoskopi hama</option></select></label>'+
  '<label>Burrow scabies<select id="v2-burrow"><option value="0">Tidak / tidak pasti</option><option value="1">Ya</option></select></label>'+
  '<label>Lesi genital lelaki tipikal<select id="v2-genital"><option value="0">Tidak / tidak dinilai</option><option value="1">Ya</option></select></label>'+
  '<label>Lesi & taburan tipikal<select id="v2-typical"><option value="0">Tidak</option><option value="1">Ya</option></select></label>'+
  '<label>Lesi / taburan atipikal<select id="v2-atypical"><option value="0">Tidak</option><option value="1">Ya</option></select></label>'+
  '<label>Gatal H1<select id="v2-itch"><option value="0">Tidak / tidak pasti</option><option value="1">Ya</option></select></label>'+
  '<label>Sejarah kontak H2<select id="v2-history"><option value="0">Tidak / tidak pasti</option><option value="1">Ya</option></select></label>'+
  '<label>Diagnosis lain kurang berkemungkinan?<select id="v2-diff"><option value="0">Belum disahkan</option><option value="1">Ya, telah dinilai</option></select></label>'+
  '</div><div class="v2-decision" id="v2-clinical-result" aria-live="polite">Masukkan pemerhatian untuk panduan klasifikasi.</div><p class="v2-muted">Rujukan imej lesi klinikal: <a target="_blank" rel="noopener noreferrer" href="https://moh.gov.my/images/04-penerbitan/penerbitan-klinikal/pengurusan-kesihatan-dan-kawalan-penyakit/Guideline_For_Management_Of_Scabies_In_Adults_And_Children.pdf">Panduan KKM (rajah manifestasi kulit scabies)</a>. Pemeriksaan mesti menjaga privasi dan kesesuaian umur.</p><div class="v2-note v2-warn"><b>Rujukan segera:</b> crusted scabies, jangkitan bakteria teruk, ketidakpastian diagnosis, tidak respons kepada rawatan adekuat. Kriteria IACS digunakan untuk common scabies, bukan semua varian.</div></div></section>';
  const opsBlock = '<section class="section" id="v2-operasi"><div class="kicker">07 · Operasi CDC</div><h2>Aliran kerja ACD untuk semua anggota CDC</h2><p class="lead">Peranan mengikut pelantikan penyelia; sesuaikan skop siasatan dengan arahan PKD/JKN serta penilaian risiko.</p><div class="v2-steps">'+
  '<article class="v2-step"><span class="n">01 · PRA-LAPANGAN</span><h3>Verifikasi & skop</h3><p>Kes indeks, onset, populasi, peta bilik/kelas, takrif kes dan jadual pasukan.</p></article>'+
  '<article class="v2-step"><span class="n">02 · SIASATAN</span><h3>Kes dan kontak</h3><p>Saringan berpandu risiko, pemeriksaan klinikal, line listing selamat, kes tanpa gejala.</p></article>'+
  '<article class="v2-step"><span class="n">03 · TINDAKAN</span><h3>Rawatan serentak</h3><p>Pengurusan kontak, arahan ubat, kebersihan linen dan komunikasi dengan institusi.</p></article>'+
  '<article class="v2-step"><span class="n">04 · PEMANTAUAN</span><h3>Susulan & audit</h3><p>Semak baki kontak, lesi baharu, liputan rawatan serta susulan minggu 2/4.</p></article></div>'+
  '<div class="v2-cards" style="margin-top:15px">'+
  '<details class="v2-acc" open><summary>PPKP / anggota CDC</summary><div>Susun ACD, telusuri kontak, buat line listing dalam storan rasmi, analisis mengikut unit dan onset, pantau tindakan serta pendidikan kesihatan.</div></details>'+
  '<details class="v2-acc"><summary>Penilaian klinikal / kejururawatan / farmasi</summary><div>Diagnosis dan preskripsi, teknik sapuan yang tepat, semakan kontraindikasi, rawatan kes berkomplikasi serta arahan susulan.</div></details>'+
  '<details class="v2-acc"><summary>Penyelaras CDC / penyelia</summary><div>Sahkan skop, tugasan, definisi dan denominator; keputusan peluasan, pelaporan, koordinasi dengan JKN dan semakan kawalan penularan.</div></details>'+
  '<details class="v2-acc"><summary>Pengurusan institusi / sekolah / asrama</summary><div>Sediakan daftar penghuni, privasi pemeriksaan, bantuan mencapai kontak, komunikasi penjaga, pengurusan linen dan pelaksanaan intervensi.</div></details></div></section>';
  const unitBlock = '<section class="section" id="v2-unit"><div class="kicker">09 · Surveilans data agregat</div><h2>Kes dan kontak mengikut kelas / dormitori / blok</h2><p class="lead">Input angka agregat bagi setiap unit sahaja. <b>Tiada rekod individu atau pengenalan pesakit.</b> Data disimpan pada tab semasa sahaja dan hilang selepas refresh. Data import diproses dalam pelayar, bukan dimuat naik ke pelayan.</p><div class="v2-panel"><h3>Tambah unit</h3><div class="v2-form">'+
  '<label>Unit (bukan nama orang)<input id="v2-name" maxlength="60" placeholder="Dorm A"></label>'+
  '<label>Populasi<input id="v2-pop" type="number" min="1" step="1" placeholder="80"></label>'+
  '<label>Disaring<input id="v2-screen" type="number" min="0" step="1" placeholder="75"></label>'+
  '<label>A · Confirmed<input id="v2-a" type="number" min="0" step="1" placeholder="0"></label>'+
  '<label>B · Clinical<input id="v2-b" type="number" min="0" step="1" placeholder="0"></label>'+
  '<label>C · Suspected<input id="v2-c" type="number" min="0" step="1" placeholder="0"></label>'+
  '<label>Kes telah dirawat<input id="v2-ct" type="number" min="0" step="1" placeholder="0"></label>'+
  '<label>Kontak rapat bukan kes<input id="v2-contact" type="number" min="0" step="1" placeholder="0"></label>'+
  '<label>Kontak dinilai<input id="v2-ca" type="number" min="0" step="1" placeholder="0"></label>'+
  '<label>Kontak telah dirawat<input id="v2-cr" type="number" min="0" step="1" placeholder="0"></label>'+
  '<label>Kes baharu minggu ke-2<input id="v2-w2" type="number" min="0" step="1" placeholder="0"></label>'+
  '<label>Kes baharu minggu ke-4<input id="v2-w4" type="number" min="0" step="1" placeholder="0"></label>'+
  '</div><div id="v2-unit-error" class="v2-validation" role="alert"></div><div class="v2-row v2-no-print">'+
  '<button class="btn primary" id="v2-add">Tambah unit</button><button class="btn" id="v2-demo">Contoh sintetik</button><button class="btn" id="v2-clear">Kosongkan</button></div>'+
  '<div class="v2-note"><b>Aturan denominator:</b> Kategori A, B dan C mestilah kes individu unik pada klasifikasi tertinggi; kontak bukan kes ialah individu unik yang tidak dikira sebagai kes. Unit mestilah saling eksklusif dan individu yang berpindah unit tidak boleh dikira dua kali. Jika kes ditemui di luar kumpulan disaring, selaraskan angka sebelum menggunakan analisis. Jumlah minggu 2 dan 4 ialah kes baharu dalam tempoh susulan yang dilaporkan, bukan kes kumulatif.</div></div>'+
  '<div class="v2-metrics"><div class="v2-metric"><span>Jumlah kes A+B+C</span><strong id="v2-total">—</strong><small>Jumlah unit</small></div><div class="v2-metric"><span>Liputan saringan</span><strong id="v2-coverage">—</strong><small>Disaring / populasi</small></div><div class="v2-metric"><span>Kontak belum dinilai</span><strong id="v2-assess-gap">—</strong><small>Keutamaan CDC</small></div><div class="v2-metric"><span>Kontak belum dirawat</span><strong id="v2-treat-gap">—</strong><small>Keutamaan CDC</small></div></div>'+
  '<div class="v2-table-scroll"><table class="v2-table"><thead><tr><th>Unit</th><th>Populasi</th><th>Saring</th><th>A</th><th>B</th><th>C</th><th>Kes</th><th>Kes rawat</th><th>Kontak</th><th>Kontak nilai</th><th>Kontak rawat</th><th>Kes / pop.</th><th>Baharu W2</th><th>Baharu W4</th><th class="v2-no-print">Hapus</th></tr></thead><tbody id="v2-rows"></tbody><tfoot id="v2-foot"></tfoot></table></div>'+
  '<p id="v2-qa" class="v2-status" aria-live="polite"></p><div class="v2-row v2-no-print"><button id="v2-sync" class="btn navy">Pindahkan jumlah ke laporan ringkas</button><button class="btn" id="v2-export">Eksport CSV agregat</button><button class="btn" id="v2-template">Templat CSV agregat</button><label class="btn">Import CSV agregat<input id="v2-file" style="display:none" type="file" accept=".csv,text/csv"></label></div>'+
  '<div class="v2-chart"><h3>Taburan kes mengikut unit</h3><svg id="v2-plot-units" viewBox="0 0 840 240" role="img" aria-label="Graf kes mengikut unit"></svg></div></section>';
  const epiBlock = '<section class="section" id="v2-epi"><div class="kicker">10 · Analisis person-place-time</div><h2>Epidemic curve berdasarkan tarikh onset</h2><p class="lead">Masukkan jumlah kes mengikut <b>tarikh mula gejala</b>, bukan tarikh rawatan/diagnosis. Tarikh onset yang tiada perlu direkod berasingan dalam sistem selamat.</p><div class="v2-panel"><label class="field">CSV harian: <code>date,cases</code>, format YYYY-MM-DD<textarea class="v2-textarea" id="v2-onset-text" placeholder="date,cases&#10;2026-10-01,2&#10;2026-10-02,3"></textarea></label><div class="v2-row v2-no-print"><button class="btn primary" id="v2-epi-draw">Jana graf</button><button class="btn" id="v2-epi-demo">Contoh sintetik</button><button class="btn" id="v2-epi-template">Templat CSV</button><label class="btn">Import CSV harian<input type="file" accept=".csv,text/csv" style="display:none" id="v2-epi-file"></label><button class="btn" id="v2-epi-clear">Kosongkan</button></div><div class="v2-validation" id="v2-epi-error" role="alert"></div><div class="v2-metrics"><div class="v2-metric"><span>Jumlah kes dengan onset</span><strong id="v2-onset-total">—</strong></div><div class="v2-metric"><span>Onset pertama</span><strong id="v2-first" style="font-size:17px">—</strong></div><div class="v2-metric"><span>Onset terakhir</span><strong id="v2-last" style="font-size:17px">—</strong></div><div class="v2-metric"><span>Puncak harian</span><strong id="v2-peak">—</strong></div></div><div class="v2-chart"><h3>Epidemic curve</h3><svg id="v2-plot-epi" role="img" aria-label="Kes mengikut tarikh mula gejala" viewBox="0 0 840 265"></svg></div></div></section>';
  const followBlock = '<section class="section" id="v2-susulan"><div class="kicker">11 · Action tracker</div><h2>Susulan dan tindakan yang belum selesai</h2><div class="v2-cards"><div class="v2-panel"><h3>Liputan susulan</h3><div class="v2-form" style="grid-template-columns:repeat(2,minmax(0,1fr))"><label>Unit dinilai semula minggu ke-2<input id="v2-review2" type="number" min="0" step="1" placeholder="0"></label><label>Unit dinilai semula minggu ke-4<input id="v2-review4" type="number" min="0" step="1" placeholder="0"></label></div><p style="margin-top:10px">Tarikh sasaran berdasarkan rawatan awal dipaparkan dalam dashboard utama. Semak arahan klinikal dan keadaan sebenar sebelum menandakan selesai.</p></div><div class="v2-panel"><h3>Perlu eskalasi jika</h3><ul class="v2-list"><li>Kontak belum dinilai atau belum dirawat.</li><li>Lesi baharu / kes baharu semasa susulan.</li><li>Suspek crusted scabies, jangkitan teruk atau kegagalan rawatan.</li><li>Rawatan kes/kontak tidak dapat diselaraskan.</li></ul></div></div><div class="v2-qa" id="v2-actions" aria-live="polite"></div><div class="v2-note v2-warn">Tiada peraturan automatik “wabak tamat” dalam kit ini. Penentuan penutupan/penamatan pemantauan memerlukan semakan epidemiologi dan arahan PKD/JKN.</div></section>';
  const reportBlock = '<section class="section" id="v2-report"><div class="kicker">12 · Pelaporan CDC</div><h2>Laporan gabungan ACD Scabies</h2><p class="lead">Menggabungkan ringkasan ACD, unit, kontak, tarikh onset, QA dan tindakan tertunggak. <b>Draf untuk semakan penyelia.</b></p><div id="v2-report-error" class="v2-validation"></div><div class="v2-preserve" id="v2-report-body" aria-live="polite">Masukkan angka agregat untuk menjana laporan.</div><div class="v2-row v2-no-print"><button class="btn primary" id="v2-copy">Salin laporan</button><button class="btn navy" id="v2-save">Simpan .txt</button><button class="btn" id="v2-print">Cetak / Simpan PDF</button></div><p class="v2-muted">Tiada data dihantar ke server. Simpan sebarang data individu dan laporan beridentiti hanya dalam sistem rasmi yang dibenarkan.</p></section>';
  by("kawalan").insertAdjacentHTML("afterend",opsBlock+clinicalBlock+unitBlock+epiBlock+followBlock);
  by("ringkasan").insertAdjacentHTML("afterend",reportBlock);
  const unitFields=["name","pop","screen","a","b","c","ct","contact","ca","cr","w2","w4"];
  const csvCols=["unit","population","screened","confirmed","clinical","suspected","cases_treated","contacts","contacts_assessed","contacts_treated","new_cases_week2","new_cases_week4"];
  const units=[];let daily=[];let unitDemo=false;let onsetDemo=false;
  const val=id=>by("v2-"+id).value.trim();
  const count=raw=>{if(!/^(0|[1-9][0-9]*)$/.test(String(raw)))return null;const x=Number(raw);return Number.isSafeInteger(x)&&x<=100000000?x:null;};
  const percent=(n,d)=>d>0?(100*n/d).toFixed(1)+"%":"—";
  const sum=(field)=>units.reduce((s,x)=>s+x[field],0);
  const cases=x=>x.a+x.b+x.c;
  function error(id,msg){by(id).textContent=msg;by(id).style.display=msg?"block":"none"}
  function alertText(msg){by("v2-qa").textContent=msg}
  function validateUnit(x){
    if(!x.name||x.name.length>60||/[<>@\/]/.test(x.name))return "Nama unit perlu label kumpulan, bukan nama/ID individu atau alamat.";
    if(unitFields.slice(1).some(k=>x[k]===null))return "Lengkapkan semua bilangan dengan nombor bulat bukan negatif (boleh 0).";
    if(x.pop<=0)return "Populasi unit mesti lebih daripada sifar.";
    if(x.screen>x.pop)return "Bilangan disaring melebihi populasi unit.";
    if(cases(x)>x.screen)return "Jumlah kes A+B+C melebihi bilangan disaring; selaraskan denominator dahulu.";
    if(x.ct>cases(x))return "Bilangan kes dirawat melebihi jumlah kes.";
    if(x.ca>x.contact||x.cr>x.contact)return "Kontak dinilai/dirawat melebihi kontak dikenal pasti.";
    if(x.w2>x.pop||x.w4>x.pop)return "Kes baharu minggu 2/4 melebihi populasi unit.";
    return "";
  }
  function readUnit(){
    const x={name:val("name")};
    unitFields.slice(1).forEach(k=>{x[k]=count(val(k));});
    return x;
  }
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function mkSvg(tag,attributes,txt){
    const el=document.createElementNS("http://www.w3.org/2000/svg",tag);
    Object.entries(attributes).forEach(([k,v])=>el.setAttribute(k,String(v)));
    if(txt!==undefined)el.textContent=String(txt);
    return el;
  }
  function chartUnit(){
    const svg=by("v2-plot-units");svg.replaceChildren();
    if(!units.length){svg.append(mkSvg("text",{x:30,y:80,fill:"#688093","font-size":16},"Tambah data unit untuk memaparkan graf"));return;}
    const display=units.slice(0,24),max=Math.max(1,...display.map(cases)),step=26,h=Math.max(170,display.length*step+45);
    svg.setAttribute("viewBox","0 0 840 "+h);
    display.forEach((x,i)=>{
      const y=i*step+18,barWidth=(cases(x)/max)*510;
      svg.append(mkSvg("text",{x:5,y:y+14,fill:"#274b61","font-size":12},x.name.length>19?x.name.slice(0,18)+"…":x.name));
      svg.append(mkSvg("rect",{x:162,y,width:Math.max(0,barWidth),height:17,rx:3,fill:"#0e8d83"}));
      svg.append(mkSvg("text",{x:170+barWidth,y:y+14,fill:"#19475f","font-size":12},cases(x)));
    });
    if(units.length>24)svg.append(mkSvg("text",{x:10,y:h-8,fill:"#79838c","font-size":12},"Graf memaparkan 24 unit pertama sahaja; jadual mengandungi semua unit."));
  }
  function totals(){
    if(!units.length)return null;
    return Object.fromEntries(unitFields.slice(1).map(k=>[k,sum(k)]));
  }
  function renderUnits(){
    const body=by("v2-rows");body.replaceChildren();
    const foot=by("v2-foot");foot.replaceChildren();
    if(!units.length){const tr=body.insertRow();const td=tr.insertCell();td.colSpan=15;td.textContent="Tiada data agregat unit dimasukkan."; }
    units.forEach((x,i)=>{
      const tr=body.insertRow();
      [x.name,x.pop,x.screen,x.a,x.b,x.c,cases(x),x.ct,x.contact,x.ca,x.cr,percent(cases(x),x.pop),x.w2,x.w4].forEach(v=>tr.insertCell().textContent=v);
      const cell=tr.insertCell(),b=document.createElement("button");b.type="button";b.className="v2-iconbtn v2-no-print";b.textContent="Hapus";b.setAttribute("aria-label","Hapus unit "+x.name);b.addEventListener("click",()=>{units.splice(i,1);renderUnits();});cell.append(b);
    });
    const t=totals();
    if(t){const row=foot.insertRow();["JUMLAH",t.pop,t.screen,t.a,t.b,t.c,t.a+t.b+t.c,t.ct,t.contact,t.ca,t.cr,percent(t.a+t.b+t.c,t.pop),t.w2,t.w4,""].forEach(v=>row.insertCell().textContent=v);}
    by("v2-total").textContent=t?t.a+t.b+t.c:"—";
    by("v2-coverage").textContent=t?percent(t.screen,t.pop):"—";
    by("v2-assess-gap").textContent=t?t.contact-t.ca:"—";
    by("v2-treat-gap").textContent=t?t.contact-t.cr:"—";
    chartUnit();
    alertText(t?"Data "+units.length+" unit. Kadar kes / populasi ialah ukuran deskriptif, bukan attack rate insiden.":"Tiada data unit.");
    updateActions();updateReport();
  }
  by("v2-add").addEventListener("click",()=>{
    const x=readUnit();const e=validateUnit(x);
    if(e){error("v2-unit-error",e);return;}
    if(units.some(u=>u.name.toLowerCase()===x.name.toLowerCase())){error("v2-unit-error","Nama unit berganda. Hapus unit lama sebelum menggantikan.");return;}
    if(units.length>=150){error("v2-unit-error","Had maksimum 150 unit bagi penggunaan responsif.");return;}
    units.push(x);unitDemo=false;error("v2-unit-error","");
    unitFields.forEach(k=>by("v2-"+k).value="");renderUnits();
  });
  const synthetic=[
   {name:"Demo Dorm A",pop:75,screen:70,a:1,b:6,c:4,ct:11,contact:22,ca:20,cr:18,w2:1,w4:0},
   {name:"Demo Dorm B",pop:82,screen:80,a:0,b:5,c:3,ct:8,contact:17,ca:17,cr:15,w2:2,w4:0},
   {name:"Demo Dorm C",pop:64,screen:62,a:0,b:2,c:2,ct:3,contact:10,ca:8,cr:7,w2:0,w4:1}
  ];
  by("v2-demo").addEventListener("click",()=>{
    if(units.length&&!confirm("Gantikan semua data unit semasa dengan contoh sintetik?"))return;
    units.splice(0,units.length,...synthetic.map(x=>({...x})));unitDemo=true;error("v2-unit-error","");renderUnits();
  });
  by("v2-clear").addEventListener("click",()=>{
    if(units.length&&!confirm("Kosongkan semua data unit dalam tab ini?"))return;
    units.length=0;unitDemo=false;renderUnits();
  });
  function asCsvCell(s){const t=String(s);return /[,"\r\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t;}
  function download(text,filename,mime){
    const blob=new Blob([text],{type:mime||"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
  }
  function unitCSV(data){
    return csvCols.join(",")+"\n"+data.map(x=>[x.name,x.pop,x.screen,x.a,x.b,x.c,x.ct,x.contact,x.ca,x.cr,x.w2,x.w4].map(asCsvCell).join(",")).join("\n")+"\n";
  }
  by("v2-export").addEventListener("click",()=>download("\ufeff"+unitCSV(units),"acd_scabies_unit_agregat.csv","text/csv;charset=utf-8"));
  by("v2-template").addEventListener("click",()=>download("\ufeff"+csvCols.join(",")+"\n","template_acd_scabies_unit_agregat.csv","text/csv;charset=utf-8"));
  function parseCsv(input){
    const txt=input.replace(/^\ufeff/,"").replace(/\r\n?/g,"\n"),rows=[];let row=[],field="",quotes=false;
    for(let i=0;i<txt.length;i++){
      const ch=txt[i];
      if(ch==='"'){if(quotes&&txt[i+1]==='"'){field+='"';i++;}else if(field===""||quotes){quotes=!quotes;}else throw Error("Petikan CSV tidak sah.");}
      else if(ch===","&&!quotes){row.push(field.trim());field="";}
      else if(ch==="\n"&&!quotes){row.push(field.trim());if(row.some(v=>v!==""))rows.push(row);row=[];field="";}
      else field+=ch;
    }
    if(quotes)throw Error("Petikan CSV tidak ditutup.");
    row.push(field.trim());if(row.some(v=>v!==""))rows.push(row);
    return rows;
  }
  function importUnits(text){
    const rows=parseCsv(text);
    if(rows.length>151)throw Error("CSV melebihi 150 unit.");
    if(!rows.length||rows[0].join(",").toLowerCase()!==csvCols.join(","))throw Error("Header CSV tidak sepadan dengan template agregat.");
    const result=[],names=new Set();
    rows.slice(1).forEach((row,i)=>{
      if(row.length!==csvCols.length)throw Error("Bilangan kolum salah pada baris "+(i+2));
      const x={name:row[0]};
      unitFields.slice(1).forEach((k,j)=>x[k]=count(row[j+1]));
      const e=validateUnit(x);if(e)throw Error("Baris "+(i+2)+": "+e);
      const key=x.name.toLowerCase();if(names.has(key))throw Error("Nama unit berganda: "+x.name);names.add(key);
      result.push(x);
    });
    return result;
  }
  by("v2-file").addEventListener("change",async e=>{
    const file=e.target.files&&e.target.files[0];if(!file)return;
    try{
      if(file.size>100000)throw Error("Had fail 100 KB.");
      const data=importUnits(await file.text());
      if(!confirm("Import "+data.length+" unit agregat? Ini menggantikan semua baris unit semasa."))return;
      units.splice(0,units.length,...data);unitDemo=false;error("v2-unit-error","");renderUnits();
    }catch(err){error("v2-unit-error",err.message)}finally{e.target.value="";}
  });
  by("v2-sync").addEventListener("click",()=>{
    const t=totals();if(!t){error("v2-unit-error","Tiada unit untuk dipindahkan.");return;}
    const pairs={population:t.pop,screened:t.screen,confirmed:t.a,clinical:t.b,suspected:t.c,treatedCases:t.ct,contacts:t.contact,treatedContacts:t.cr};
    Object.entries(pairs).forEach(([id,num])=>{by(id).value=String(num);by(id).dispatchEvent(new Event("input",{bubbles:true}));});
    error("v2-unit-error","");by("v2-qa").textContent="Jumlah unit disalin ke dashboard ringkasan. Semak angka sebelum kongsi laporan.";updateReport();
  });
  const clinicalIds=["direct","burrow","genital","typical","atypical","itch","history","diff"];
  function clinical(){
    const v=x=>by("v2-"+x).value,yes=x=>v(x)==="1";
    const histories=Number(yes("itch"))+Number(yes("history"));let code="",title="";
    if(v("direct")){code=v("direct");title="A · Confirmed scabies";}
    else if(!yes("diff")){title="Belum boleh klasifikasi B/C";code="Semak diagnosis berbeza terlebih dahulu.";}
    else if(yes("burrow")){code="B1";title="B · Clinical scabies";}
    else if(yes("genital")){code="B2";title="B · Clinical scabies";}
    else if(yes("typical")&&histories===2){code="B3";title="B · Clinical scabies";}
    else if(yes("typical")&&histories>=1){code="C1";title="C · Suspected scabies";}
    else if(yes("atypical")&&histories===2){code="C2";title="C · Suspected scabies";}
    else {title="Tidak memenuhi kriteria A/B/C daripada input";code="Periksa semula, pertimbangkan diagnosis lain / rujukan.";}
    by("v2-clinical-result").replaceChildren();
    const b=document.createElement("b");b.textContent=title;
    const small=document.createElement("div");small.textContent="Subkategori: "+code+". Pengesahan klinikal diperlukan sebelum tindakan rawatan.";
    by("v2-clinical-result").append(b,small);
  }
  clinicalIds.forEach(x=>by("v2-"+x).addEventListener("change",clinical));clinical();
  const isValidDate=s=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+"T12:00:00Z");return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===s;};
  function readDailyCsv(text){
    const rows=parseCsv(text);if(!rows.length)throw Error("Data onset belum dimasukkan.");
    if(rows[0].join(",").toLowerCase()!=="date,cases")throw Error("Header mesti tepat: date,cases");
    if(rows.length>367)throw Error("Maksimum 366 tarikh.");
    const found=new Set(),result=[];
    rows.slice(1).forEach((r,i)=>{
      if(r.length!==2||!isValidDate(r[0]))throw Error("Tarikh tidak sah di baris "+(i+2));
      const n=count(r[1]);if(n===null)throw Error("Bilangan kes tidak sah di baris "+(i+2));
      if(found.has(r[0]))throw Error("Tarikh berulang "+r[0]+". Gabungkan kiraan tarikh terlebih dahulu.");
      found.add(r[0]);result.push({date:r[0],cases:n});
    });
    result.sort((a,b)=>a.date.localeCompare(b.date));
    return result;
  }
  function chartEpi(){
    const svg=by("v2-plot-epi");svg.replaceChildren();svg.setAttribute("viewBox","0 0 840 265");
    if(!daily.length){svg.append(mkSvg("text",{x:30,y:90,fill:"#718394","font-size":17},"Import atau masukkan jumlah kes mengikut tarikh onset."));return;}
    const first=new Date(daily[0].date+"T12:00:00Z"),last=new Date(daily[daily.length-1].date+"T12:00:00Z");
    const span=Math.round((last-first)/86400000)+1;
    if(span>366){error("v2-epi-error","Jangka masa melebihi 366 hari; graf tidak dipaparkan.");return;}
    const series=Array.from({length:span},(_,i)=>{const d=new Date(first);d.setUTCDate(first.getUTCDate()+i);return {date:d.toISOString().slice(0,10),cases:0};});
    const idx=new Map(series.map((d,i)=>[d.date,i]));daily.forEach(r=>series[idx.get(r.date)].cases=r.cases);
    const max=Math.max(1,...series.map(r=>r.cases)),barW=750/span;
    svg.append(mkSvg("line",{x1:52,y1:220,x2:813,y2:220,stroke:"#b2c6d2","stroke-width":1}));
    for(let k=0;k<=4;k++){const y=220-k*45;svg.append(mkSvg("line",{x1:52,y1:y,x2:812,y2:y,stroke:"#e6edf1"}));svg.append(mkSvg("text",{x:5,y:y+4,fill:"#657b8e","font-size":12},Math.round(k*max/4)));}
    series.forEach((r,i)=>{
      const x=56+i*barW,h=r.cases/max*170,y=220-h;
      const rect=mkSvg("rect",{x,y,width:Math.max(.5,barW-1),height:h,fill:"#0d8c83"});
      rect.append(mkSvg("title",{},r.date+": "+r.cases+" kes"));svg.append(rect);
    });
    svg.append(mkSvg("text",{x:54,y:245,fill:"#546a7b","font-size":12},series[0].date));
    svg.append(mkSvg("text",{x:810,y:245,"text-anchor":"end",fill:"#546a7b","font-size":12},series[series.length-1].date));
  }
  function updateDaily(){
    if(daily.length){
      const total=daily.reduce((s,r)=>s+r.cases,0),peak=daily.reduce((p,r)=>r.cases>p.cases?r:p,daily[0]);
      by("v2-onset-total").textContent=total;by("v2-first").textContent=daily[0].date;by("v2-last").textContent=daily[daily.length-1].date;by("v2-peak").textContent=peak.cases+" kes";by("v2-peak").title=peak.date;
    }else["onset-total","first","last","peak"].forEach(id=>by("v2-"+id).textContent="—");
    chartEpi();updateReport();
  }
  by("v2-epi-draw").addEventListener("click",()=>{
    try{const rows=readDailyCsv(by("v2-onset-text").value);daily.splice(0,daily.length,...rows);onsetDemo=false;error("v2-epi-error","");updateDaily();}catch(e){error("v2-epi-error",e.message);}
  });
  by("v2-epi-demo").addEventListener("click",()=>{
    if(daily.length&&!confirm("Gantikan data onset dengan contoh sintetik?"))return;
    by("v2-onset-text").value="date,cases\n2026-10-01,1\n2026-10-02,2\n2026-10-03,4\n2026-10-04,2\n2026-10-05,3\n2026-10-06,1\n2026-10-07,0\n2026-10-08,1";
    daily=readDailyCsv(by("v2-onset-text").value);onsetDemo=true;updateDaily();
  });
  by("v2-epi-template").addEventListener("click",()=>download("\ufeffdate,cases\n","template_tarikh_onset_agregat.csv","text/csv;charset=utf-8"));
  by("v2-epi-clear").addEventListener("click",()=>{
    if(daily.length&&!confirm("Kosongkan data onset?"))return;
    daily=[];onsetDemo=false;by("v2-onset-text").value="";error("v2-epi-error","");updateDaily();
  });
  by("v2-epi-file").addEventListener("change",async e=>{
    const f=e.target.files&&e.target.files[0];if(!f)return;
    try{if(f.size>40000)throw Error("Fail terlalu besar (maksimum 40 KB).");
      const input=await f.text();const rows=readDailyCsv(input);
      if(!confirm("Import "+rows.length+" tarikh agregat? Ini menggantikan data onset semasa."))return;
      daily=rows;onsetDemo=false;by("v2-onset-text").value=input;error("v2-epi-error","");updateDaily();
    }catch(err){error("v2-epi-error",err.message)}finally{e.target.value="";}
  });
  function action(msg,urgent){
    const div=document.createElement("div");div.className="v2-action"+(urgent?" alert":"");
    const b=document.createElement("b");b.textContent=msg;
    div.append(b);return div;
  }
  function updateActions(){
    const t=totals(),box=by("v2-actions");box.replaceChildren();
    if(!t){box.append(action("Tiada unit didaftarkan. Mulakan data unit / populasi berisiko.",false));return;}
    if(t.contact>t.ca)box.append(action((t.contact-t.ca)+" kontak belum dinilai. Utamakan contact tracing.",true));
    if(t.contact>t.cr)box.append(action((t.contact-t.cr)+" kontak belum dirawat. Selaras rawatan serentak.",true));
    const c=t.a+t.b+t.c;if(c>t.ct)box.append(action((c-t.ct)+" kes belum direkod menerima rawatan.",true));
    if(t.screen<t.pop)box.append(action((t.pop-t.screen)+" individu belum diperiksa dalam skop dipilih.",false));
    if(t.w2+t.w4>0)box.append(action((t.w2+t.w4)+" kes baharu dalam jumlah laporan susulan minggu 2/4. Nilai semula penularan.",true));
    const r2=count(by("v2-review2").value.trim()),r4=count(by("v2-review4").value.trim());
    if(r2!==null&&r2>units.length)box.append(action("Bilangan unit susulan minggu 2 melebihi unit direkod.",true));
    if(r4!==null&&r4>units.length)box.append(action("Bilangan unit susulan minggu 4 melebihi unit direkod.",true));
    if(!box.children.length)box.append(action("Tiada jurang kuantitatif berdasarkan angka dimasukkan. Semakan kes baharu, pengesahan klinikal dan SOP masih diperlukan.",false));
  }
  ["v2-review2","v2-review4"].forEach(id=>by(id).addEventListener("input",()=>{updateActions();updateReport();}));
  function reportText(){
    const t=totals(),s=[],tCases=t?t.a+t.b+t.c:0;
    s.push("LAPORAN SITUASI ACD SCABIES — CDC, PKD BESUT | v2.0","STATUS: DRAF / SEMAKAN PENYELIA");
    if(unitDemo||onsetDemo)s.push("*** DATA CONTOH SINTETIK — JANGAN GUNA SEBAGAI LAPORAN SEBENAR ***");
    s.push("Tarikh rawatan awal: "+(by("firstDate").value||"Belum diisi"));
    s.push("Jenis lokaliti: "+by("siteType").value,"");
    s.push("1. CHECKLIST & SKOP","Checklist: "+by("taskProgress").textContent);
    s.push("Bilangan unit agregat: "+units.length);
    s.push("");
    s.push("2. KES DAN KONTAK (AGREGAT UNIT)");
    if(t){
      s.push("Populasi berisiko: "+t.pop,"Diperiksa: "+t.screen+" ("+percent(t.screen,t.pop)+")","Confirmed A: "+t.a,"Clinical B: "+t.b,"Suspected C: "+t.c,"Jumlah kes: "+tCases+" ("+percent(tCases,t.pop)+" populasi)","Kes telah dirawat: "+t.ct,"Kontak rapat bukan kes: "+t.contact,"Kontak dinilai: "+t.ca+" ("+percent(t.ca,t.contact)+")","Kontak dirawat: "+t.cr+" ("+percent(t.cr,t.contact)+")","Kontak belum dirawat: "+(t.contact-t.cr),"Kes baharu dilapor minggu 2: "+t.w2,"Kes baharu dilapor minggu 4: "+t.w4);
      s.push("Taburan mengikut unit:");
      units.forEach(u=>s.push("- "+u.name+": Pop "+u.pop+" | Saring "+u.screen+" | Kes "+cases(u)+" | Kontak "+u.contact+" | Dirawat "+u.cr));
    }else {s.push("Data unit belum diisi. Dashboard ringkasan manual:");["population","screened","confirmed","clinical","suspected","treatedCases","contacts","treatedContacts"].forEach(id=>s.push("- "+id+": "+(by(id).value||"belum diisi")));}
    s.push("","3. EPIDEMIOLOGI MASA");
    if(daily.length){
      const dTotal=daily.reduce((a,b)=>a+b.cases,0),peak=daily.reduce((p,r)=>r.cases>p.cases?r:p,daily[0]);
      s.push("Kes dengan onset diketahui: "+dTotal,"Onset pertama: "+daily[0].date,"Onset terakhir: "+daily[daily.length-1].date,"Puncak onset: "+peak.cases+" kes pada "+peak.date);
      if(t&&dTotal!==tCases)s.push("AMARAN QA: jumlah onset "+dTotal+" berbeza daripada jumlah kes unit "+tCases+". Selaraskan skop/tempoh, missing onset dan duplikasi.");
    }else s.push("Data onset belum diisi.");
    s.push("","4. SUSULAN DAN TINDAKAN");
    s.push("Sasaran minggu 2: "+by("follow14").textContent,"Sasaran minggu 4: "+by("follow28").textContent);
    s.push("Unit disusul minggu 2: "+(by("v2-review2").value||"Belum diisi"),"Unit disusul minggu 4: "+(by("v2-review4").value||"Belum diisi"));
    [...by("v2-actions").children].forEach(node=>s.push("- "+node.textContent));
    s.push("","5. NOTA PELAPORAN","Angka bersifat agregat dan sementara. Kadar kes / populasi bukan semestinya attack rate insiden.","Keputusan kes, kontak, rawatan, notifikasi dan penamatan wabak disahkan melalui sistem rasmi/SOP PKD/JKN.","Tiada pengenalan individu direkod dalam aplikasi. Laporan mesti disemak sebelum edaran.");
    return s.join("\n");
  }
  function updateReport(){
    if(!by("v2-report-body"))return;
    const t=totals();const errs=[];
    if(t&&daily.length){const d=daily.reduce((s,x)=>s+x.cases,0);if(d!==t.a+t.b+t.c)errs.push("Jumlah kes berdasarkan onset tidak sama dengan jumlah unit. Periksa skop, missing onset dan pertindihan.");}
    const r2=by("v2-review2").value,r4=by("v2-review4").value;
    if((r2&&count(r2)===null)||(r4&&count(r4)===null))errs.push("Bilangan unit susulan mesti nombor bulat bukan negatif.");
    if(t&&((r2&&Number(r2)>units.length)||(r4&&Number(r4)>units.length)))errs.push("Bilangan unit susulan melebihi jumlah unit.");
    error("v2-report-error",errs.join(" "));
    by("v2-report-body").textContent=reportText();
  }
  async function copyText(txt){
    try{await navigator.clipboard.writeText(txt);return true;}catch(e){
      const ta=document.createElement("textarea");ta.value=txt;ta.style.position="fixed";ta.style.left="-9999px";document.body.append(ta);ta.select();const ok=document.execCommand("copy");ta.remove();return ok;
    }
  }
  by("v2-copy").addEventListener("click",async()=>{const ok=await copyText(reportText());alert(ok?"Laporan disalin.":"Gagal menyalin. Sila pilih dan salin teks secara manual.");});
  by("v2-save").addEventListener("click",()=>download(reportText(),"laporan_acd_scabies_cdc_besut_DRAF.txt"));
  by("v2-print").addEventListener("click",()=>window.print());
  ["firstDate","siteType"].forEach(id=>by(id).addEventListener("change",updateReport));
  const origReport=by("reportText");
  if(origReport){new MutationObserver(()=>{if(by("v2-report-body"))updateReport()}).observe(origReport,{childList:true,characterData:true,subtree:true});}
  const checks=by("checkGroups");
  if(checks){new MutationObserver(()=>{if(by("v2-report-body"))updateReport()}).observe(by("taskProgress"),{childList:true,characterData:true});}
  renderUnits();updateDaily();updateActions();updateReport();
})();