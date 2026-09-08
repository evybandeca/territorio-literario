import { chromium } from 'playwright-core';

const base=process.env.QA_BASE_URL||'http://127.0.0.1:4173';
const executablePath=process.env.CHROME_PATH||'/usr/bin/google-chrome';
const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});
function assert(condition,message){if(!condition)throw new Error(message)}

try{
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  const errors=[];
  const contentRequests=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{
    if(new URL(response.url()).origin===new URL(base).origin&&response.status()>=400)errors.push(`HTTP ${response.status()} ${response.url()}`);
  });
  page.on('request',request=>{
    const url=new URL(request.url());
    if(url.pathname.endsWith('/reader-content/o-cortico.txt'))contentRequests.push(url);
  });

  const response=await page.goto(`${base}/leitura.html?obra=o-cortico&capitulo=1`,{waitUntil:'domcontentloaded'});
  assert(response?.ok(),'O Cortiço: leitor não respondeu HTTP 200');
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  assert(contentRequests.length===1,'O Cortiço: texto integral local não foi requisitado exatamente uma vez');
  assert(contentRequests[0].origin===new URL(base).origin,'O Cortiço: texto integral foi buscado fora do domínio do portal');
  assert((await page.locator('#reader-book-title').textContent())?.includes('O Cortiço'),'O Cortiço: título da obra ausente');
  assert((await page.locator('#reader-chapter-number').textContent())?.includes('I'),'O Cortiço: capítulo I não foi reconhecido');
  const text=(await page.locator('#reader-text').textContent())||'';
  assert(text.includes('João Romão'),'O Cortiço: capítulo I não contém o texto esperado');
  const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
  assert(canonical?.includes('leitura.html?obra=o-cortico&capitulo=1'),'O Cortiço: canonical do capítulo incorreto');
  await page.locator('#reader-next').click();
  await page.waitForFunction(()=>new URLSearchParams(location.search).get('capitulo')==='2');
  assert((await page.locator('#reader-chapter-number').textContent())?.includes('II'),'O Cortiço: navegação não abriu capítulo II');
  await page.locator('#reader-search').fill('Bertoleza');
  await page.waitForFunction(()=>document.querySelectorAll('#reader-search-results a').length>0);
  assert(!errors.length,`O Cortiço: erros no leitor: ${errors.join(' | ')}`);
  await page.close();
  console.log('O Cortiço reader QA OK.');
}finally{
  await browser.close();
}
