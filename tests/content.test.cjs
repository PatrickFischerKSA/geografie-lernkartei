const test=require('node:test'), assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),data=require('../cards.json'),coverage=require('../coverage.json');
test('158 vollständige, eindeutig zugeordnete Karten; 11 Lernziele',()=>{
 assert.equal(data.cards.length,158);assert.equal(new Set(data.cards.map(c=>c.id)).size,158);assert.equal(data.goals.length,11);
 for(const c of data.cards){
  for(const k of ['id','question','pages','origin','topic'])assert.ok(c[k],c.id+' '+k);
  assert.ok(c.answer.length&&c.answer.every(p=>p.length>15),c.id);
  assert.ok(c.goals.every(id=>data.goals.some(g=>g.id===id)),c.id);
  assert.ok(['basis','vertieft','profi'].includes(c.level));
  assert.ok(['abgeglichen','praezisiert','ergaenzt','offen'].includes(c.status));
  assert.ok(c.links.every(id=>data.sources[id]?.url.startsWith('https://')));
  if(c.image)assert.ok(fs.existsSync(path.join(root,'assets',c.image)));
 }
 for(const g of data.goals)assert.ok(coverage.some(r=>r.id===g.id&&r.cards.length));
 for(const r of coverage)assert.ok(r.cards.every(id=>data.cards.some(c=>c.id===id)));
});
test('Browserdaten entsprechen dem redaktionellen JSON',()=>{const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),ctx);assert.equal(JSON.stringify(ctx.window.LEARNING_DATA),JSON.stringify(data));});
test('Sämtliche Kennzahlen und zehn Übertragungszeiten sind enthalten',()=>{
 for(let i=1;i<=9;i++)assert.ok(data.cards.some(c=>c.id===`R0${i}`));
 for(let i=1;i<=10;i++)assert.ok(data.cards.some(c=>c.id===`T${String(i).padStart(2,'0')}`));
 assert.deepEqual(data.cards.filter(c=>c.status==='offen').map(c=>c.id),['Z13','Z14']);
 assert.match(data.cards.find(c=>c.id==='T15').answer.join(' '),/511.*637/);
});
test('Historische UTC-Umrechnungen entsprechen den Modellantworten',()=>{
 const time=(iso,zone)=>new Intl.DateTimeFormat('en-GB',{timeZone:zone,dateStyle:'short',timeStyle:'short',hourCycle:'h23'}).format(new Date(iso));
 assert.match(time('2024-01-01T09:00:00+13:00','America/Los_Angeles'),/31\/12\/2023, 12:00/);
 assert.match(time('2024-05-12T08:00:00Z','America/Anchorage'),/12\/05\/2024, 00:00/);
 assert.match(time('2023-11-11T20:30:00Z','Pacific/Rarotonga'),/11\/11\/2023, 10:30/);
 const zones=['Asia/Tokyo','Asia/Shanghai','Africa/Johannesburg','America/Sao_Paulo','America/Lima','America/New_York','America/Los_Angeles','America/Anchorage','Europe/Oslo','America/Thule'];
 const expected=['03:00','02:00','20:00','15:00','13:00','14:00','11:00','10:00','20:00','15:00'];
 zones.forEach((z,i)=>{assert.ok(time('2023-08-31T18:00:00Z',z).endsWith(expected[i]));assert.ok(data.cards.find(c=>c.id===`T${String(i+1).padStart(2,'0')}`).answer.join(' ').includes(expected[i]));});
});
test('Getrennter Lernspeicher und kein versehentlich übernommener Geschichtsinhalt',()=>{
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.ok(app.includes('geografie-zum-wenden:v1'));assert.ok(!app.includes('geschichte-zum-wenden'));
 for(const text of ['Hunefer','Sirius','VOM NIL','Prüfungsantworten'])assert.ok(!html.includes(text));
});
