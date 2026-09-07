import { chromium } from 'playwright-core';

const base=process.env.QA_BASE_URL||'http://127.0.0.1:4173';
const executablePath=process.env.CHROME_PATH||'/usr/bin/google-chrome';
const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});
const failures=[];

async function run(name,fn){
  try{await fn();console.log(`PASS ${name}`)}catch(error){failures.push(`${name}: ${error.message}`);console.error(`FAIL ${name}: ${error.stack||error.message}`)}
}
function assert(condition,message){if(!condition)throw new Error(message)}

await run('home sem erro e responsiva',async()=>{
  const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(`${base}/index.html`,{waitUntil:'networkidle'});assert(response?.ok(),'home HTTP inválida');
  const h1=(await page.locator('h1').first().textContent())?.trim();assert(h1,'home sem h1 visível');
  assert(errors.length===0,`erros JS: ${errors.join(' | ')}`);await page.close();
});

await run('lazy loading da obra individual',async()=>{
  const page=await browser.newPage({viewport:{width:1280,height:800}});const requests=[];const errors=[];
  page.on('request',r=>{const u=new URL(r.url());if(u.pathname.includes('/js/corpus/'))requests.push(u.pathname)});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${base}/obra.html?id=o-cortico`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('#titulo-obra')?.textContent?.trim().length>0,{timeout:15000});
  const title=(await page.locator('#titulo-obra').textContent())?.trim();assert(title==='O Cortiço',`obra inesperada: ${title}`);
  const loaded=await page.evaluate(()=>Object.keys(window.CORPUS_PROFUNDO||{}));assert(loaded.length===1&&loaded[0]==='o-cortico',`corpora carregados indevidamente: ${loaded.join(', ')}`);
  const unique=[...new Set(requests)];assert(unique.length===1&&unique[0].endsWith('/o-cortico.js'),`requests de corpus indevidos: ${unique.join(', ')}`);
  assert(errors.length===0,`erros JS: ${errors.join(' | ')}`);await page.close();
});

await run('Atlas carrega o registry completo',async()=>{
  const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${base}/atlas.html`,{waitUntil:'domcontentloaded'});
  const expected=await page.evaluate(()=>Object.keys(window.CORPUS_REGISTRY||{}).length);assert(expected>0,'registry vazio no Atlas');
  await page.waitForFunction(expected=>Object.keys(window.CORPUS_PROFUNDO||{}).length===expected,expected,{timeout:30000});
  const loaded=await page.evaluate(()=>Object.keys(window.CORPUS_PROFUNDO||{}).sort());
  assert(loaded.length===expected,`Atlas carregou ${loaded.length} corpora; esperado ${expected}`);
  await page.waitForFunction(()=>document.querySelector('#atlas-stats')?.textContent?.trim().length>0,{timeout:10000});
  assert(errors.length===0,`erros JS: ${errors.join(' | ')}`);await page.close();
});

await run('viewport móvel sem overflow estrutural',async()=>{
  for(const url of ['/index.html','/obra.html?id=memorias-postumas','/biblioteca.html']){
    const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true});await page.goto(base+url,{waitUntil:'domcontentloaded'});await page.waitForTimeout(700);
    const dims=await page.evaluate(()=>({innerWidth:window.innerWidth,scrollWidth:document.documentElement.scrollWidth}));
    assert(dims.scrollWidth<=dims.innerWidth+2,`${url}: overflow horizontal ${dims.scrollWidth}px > ${dims.innerWidth}px`);await page.close();
  }
});

await run('navegação por teclado alcança link',async()=>{
  const page=await browser.newPage({viewport:{width:1280,height:800}});await page.goto(`${base}/index.html`,{waitUntil:'domcontentloaded'});await page.waitForTimeout(300);
  let reached=false;
  for(let i=0;i<8;i++){await page.keyboard.press('Tab');const tag=await page.evaluate(()=>document.activeElement?.tagName);if(tag==='A'){reached=true;break}}
  assert(reached,'Tab não alcançou link navegável nos primeiros 8 focos');await page.close();
});

await browser.close();
if(failures.length){console.error(`\nBrowser QA: ${failures.length} falha(s)\n- ${failures.join('\n- ')}`);process.exit(1)}
console.log('Browser QA OK: shell, lazy loading, Atlas, mobile e teclado.');
