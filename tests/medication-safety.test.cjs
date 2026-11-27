const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const src=fs.readFileSync('app.js','utf8');
const register=require('../clinical-validation-register.json');
test('all calculator branches are inventoried',()=>assert.deepEqual([...new Set([...src.matchAll(/tool==="([^"]+)"/g)].map(x=>x[1]))].sort(),register.calculators.map(x=>x.id).sort()));
test('no unreviewed tool marked clinically validated',()=>{for(const x of register.calculators)assert.equal(x.status,'pending_validation')});
test('all suspended calculators remain blocked',()=>{const m=src.match(/const blocked = (\[[^\n]+\]);/);assert.ok(m);const blocked=JSON.parse(m[1]);for(const x of register.calculators.filter(x=>x.availability==='suspended'))assert.ok(blocked.includes(x.id));});
test('actual safety guard rejects invalid inputs and suspended tools',()=>{const guard=src.slice(src.indexOf('  const blocked ='),src.indexOf('  let answer="",note=""'));assert.ok(guard.includes('safetyError'));const run=(age,weight,conc,tool)=>{const el=(value)=>({value,validity:{}});const dose={innerHTML:'',classList:{remove(){}}};const result=vm.runInNewContext('(function(){'+guard+';return "allowed";})()', {age,weight,conc,tool,els:{age:el(age),weight:el(weight),concentration:el(conc),dehydration:el(''),dose}});return result;};assert.equal(run(null,15,'','paracetamol'),undefined);assert.equal(run(4,151,'','paracetamol'),undefined);assert.equal(run(4,15,0,'paracetamol'),undefined);for(const x of register.calculators.filter(x=>x.availability==='suspended'))assert.equal(run(4,15,'',x.id),undefined);assert.equal(run(4,15,'','paracetamol'),'allowed');});


test('dose-specific arithmetic boundaries in actual calculator branches (not clinical approval)',()=>{
 const evaluate=(id,body,weight)=>{const start=src.indexOf('if(tool==="'+id+'"){');assert.ok(start>=0);const tail=src.slice(start);const m=tail.match(body);assert.ok(m,'formula missing: '+id);return vm.runInNewContext(m[1],{weight,Math});};
 for(const [w,expected] of [[10,450],[22,990],[23,1000],[40,1000]])assert.equal(evaluate('amoxicillin-high',/const mg=([^;]+);/,w),expected);
 for(const [w,expected] of [[10,150],[70,1000]])assert.equal(evaluate('paracetamol',/const mg=([^;]+);/,w),expected);
 for(const [w,expected] of [[10,100],[110,1000]])assert.equal(evaluate('paracetamol-dengue',/const mg=([^;]+);/,w),expected);
 for(const [w,expected] of [[10,100],[40,400],[50,500],[60,500]])assert.equal(evaluate('azithro5',/const d1=(Math\.min\(weight\*10,500\)), d25=/,w),expected);
 for(const [w,expected] of [[10,750],[20,1500]])assert.equal(evaluate('ors-plan-b',/const total=([^,]+), hourly=/,w),expected);
});
