const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {cards,goals}=require('../cards.json'),root=path.join(__dirname,'..');
const server=http.createServer((req,res)=>{const rel=decodeURIComponent(req.url.split('?')[0]);const p=path.join(root,rel==='/'?'index.html':rel);if(!p.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(p,(e,b)=>{if(e){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json'})[path.extname(p)]||'text/plain');res.end(b);});});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const out=path.join(root,'test-results');fs.mkdirSync(out,{recursive:true});
  await page.goto(process.env.TEST_URL||`http://127.0.0.1:${server.address().port}`);
  for(const [level,rank] of [['basis',0],['vertieft',1],['profi',2]]){
   await page.locator(`[data-level="${level}"]`).click();
   const expected=cards.filter(c=>['basis','vertieft','profi'].indexOf(c.level)<=rank).length;
   assert.match(await page.locator('#deck-count').innerText(),new RegExp(`^${expected} Karten`));
   await page.reload();assert.equal(await page.locator(`[data-level="${level}"]`).getAttribute('aria-pressed'),'true');
  }
  await page.screenshot({path:path.join(out,'desktop.png'),fullPage:true});
  await page.locator('#flip').click();await page.locator('#known').click();await page.reload();assert.equal(await page.locator('#progress-text').innerText(),`1 / ${cards.length}`);
  await page.locator('#mode').selectOption('known');assert.match(await page.locator('#deck-count').innerText(),/^1 Karte/);
  await page.locator('#flip').click();await page.locator('#again').click();assert.equal(await page.locator('#empty').isVisible(),true);
  await page.locator('#clear-filters').click();await page.locator('#search').fill('Zenit');assert.ok(parseInt(await page.locator('#deck-count').innerText())>0);
  await page.locator('#search').fill('unfindbarzzzz');assert.equal(await page.locator('#empty').isVisible(),true);
  await page.locator('#clear-filters').click();await page.locator('#mode').selectOption('open');assert.match(await page.locator('#deck-count').innerText(),/^2 Karten/);
  await page.locator('[data-play="game"]').click();assert.equal(await page.locator('#start-round').isDisabled(),true);
  await page.locator('[data-play="free"]').click();await page.locator('#mode').selectOption('all');
  await page.locator('#goals-tab').click();assert.equal(await page.locator('.goal-item').count(),goals.length);
  await page.locator('.goal-item').first().locator('button').click();assert.equal(await page.locator('#goal-filter').inputValue(),'L01');await page.locator('#goal-filter').selectOption('all');
  // Both faces of every card must fit at desktop and mobile widths.
  for(const width of [1440,390]){
   await page.setViewportSize({width,height:1100});
   if(width===390)await page.locator('#filters-toggle').click();
   await page.locator('#search').fill('G01');
   await page.locator('#search').fill('');
   if(width===390)await page.locator('#filters-toggle').click();
   for(let i=0;i<cards.length;i++){
    assert.equal(await page.locator('#card-id').innerText(),cards[i].id);
    if(i%40===0)console.log(`Prüfe ${width}px: Karte ${i+1}/${cards.length}`);
    if(await page.locator('#question-figure').isVisible())await page.locator('#question-image').evaluate(img=>img.decode());
    for(let face=0;face<2;face++){
     const bounds=await page.evaluate(()=>{let c=document.querySelector('#card'),f=document.querySelector(c.classList.contains('flipped')?'#back':'#front');return {scroll:f.scrollHeight,height:c.offsetHeight,width:document.documentElement.scrollWidth,view:innerWidth};});
     assert.ok(bounds.scroll<=bounds.height+2,`${width}: height ${cards[i].id} face ${face}`);assert.ok(bounds.width<=bounds.view,`${width}: width ${cards[i].id}`);
     if(face===0)await page.locator('#flip').click();
    }
    if(i<cards.length-1)await page.locator('#next').click();
   }
  }
  await page.locator('#filters-toggle').click();await page.locator('#search').fill('J10');await page.locator('#filters-toggle').click();await page.locator('#question-image').evaluate(img=>img.decode());
  await page.screenshot({path:path.join(out,'mobile-diagram.png'),fullPage:true});await page.locator('#flip').click();await page.screenshot({path:path.join(out,'mobile-answer.png'),fullPage:true});
  // Isolate one card to check retry scoring and repetition persistence.
  await page.setViewportSize({width:1440,height:1100});await page.locator('#search').fill('G01');await page.locator('[data-play="game"]').click();await page.locator('#start-round').click();
  assert.equal(await page.locator('#search').isDisabled(),true);assert.equal(await page.locator('[data-level="basis"]').isDisabled(),true);
  await page.locator('#flip').click();await page.locator('#again').click();await page.locator('#flip').click();await page.locator('#known').click();assert.equal(await page.locator('#round-result').isVisible(),true);
  await page.screenshot({path:path.join(out,'game-result.png'),fullPage:true});
  await page.locator('#result-review').click();assert.equal(await page.locator('#start-round').isDisabled(),true);
  await page.reload();await page.locator('[data-play="game"]').click();assert.equal(await page.locator('#total-xp').innerText(),'5');
  await page.evaluate(()=>{localStorage.removeItem('geografie-zum-wenden:training:v1');localStorage.setItem('geografie-zum-wenden:v1',JSON.stringify({G01:'again',G03:'again',G08:'again'}));});
  await page.reload();await page.locator('[data-play="review"]').click();
  for(const [level,n] of [['basis',1],['vertieft',2],['profi',3]]){await page.locator(`[data-level="${level}"]`).click();assert.equal(await page.locator('#due-count').innerText(),String(n));}
  await page.locator('#start-round').click();for(let i=0;i<3;i++){await page.locator('#flip').click();await page.locator('#known').click();}assert.equal(await page.locator('#round-result').isVisible(),true);
  await page.locator('[data-play="free"]').click();await page.locator('#reset').click();await page.locator('#reset-no').click();assert.equal(await page.locator('#progress-text').innerText(),`3 / ${cards.length}`);
  await page.locator('#reset').click();await page.locator('#reset-yes').click();assert.equal(await page.locator('#progress-text').innerText(),`0 / ${cards.length}`);
  await page.evaluate(()=>localStorage.setItem('geografie-zum-wenden:v1','{invalid'));await page.reload();assert.equal(await page.locator('#question').isVisible(),true);
  assert.deepEqual(errors,[]);console.log('Browserprüfung bestanden: 158 Karten, beide Seiten auf Desktop/Mobil, Bild, Filter, Niveaus, Speicherung, Punkte, Repetition, Reset.');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exit(1)});
