import { chromium } from 'playwright-core';

const base=process.env.QA_BASE_URL||'http://127.0.0.1:4173';
const executablePath=process.env.CHROME_PATH||'/usr/bin/google-chrome';
const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1280,height:900}});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(new URL(r.url()).origin===new URL(base).origin&&r.status()>=400)errors.push(`HTTP ${r.status()} ${r.url()}`)});
function assert(c,m){if(!c)throw new Error(m)}
try{
  const response=await page.goto(`${base}/leitura.html?obra=memorias-postumas&capitulo=1`,{waitUntil:'domcontentloaded'});
  assert(response?.ok(),'leitor não respondeu HTTP 200');
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  assert((await page.locator('#reader-book-title').textContent())?.includes('Memórias Póstumas'),'título da obra ausente');
  assert((await page.locator('#reader-chapter-title').textContent())?.trim(),'título do capítulo ausente');
  const text=(await page.locator('#reader-text').textContent())||'';
  assert(text.includes('defunto autor')||text.includes('defunto-autor'),'capítulo I não contém o texto esperado');
  assert(await page.locator('#reader-next').count()===1,'controle de próximo capítulo ausente');
  const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
  assert(canonical?.includes('leitura.html?obra=memorias-postumas&capitulo=1'),'canonical do capítulo incorreto');
  assert(!errors.length,`erros no leitor: ${errors.join(' | ')}`);
  console.log('Reader runtime QA OK: capítulo local, navegação e canonical.');
}finally{await browser.close()}
