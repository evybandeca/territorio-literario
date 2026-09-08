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
    if(url.pathname.endsWith('/reader-content/iracema.txt'))contentRequests.push(url);
  });

  const response=await page.goto(`${base}/leitura.html?obra=iracema&capitulo=1`,{waitUntil:'domcontentloaded'});
  assert(response?.ok(),'Iracema: leitor não respondeu HTTP 200');
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  assert(contentRequests.length===1,'Iracema: texto integral local não foi requisitado exatamente uma vez');
  assert(contentRequests[0].origin===new URL(base).origin,'Iracema: texto integral foi buscado fora do domínio do portal');
  assert((await page.locator('#reader-book-title').textContent())?.includes('Iracema'),'Iracema: título da obra ausente');
  assert(await page.locator('#reader-index a').count()===33,'Iracema: índice não contém os 33 capítulos');
  const firstText=(await page.locator('#reader-text').textContent())||'';
  assert(firstText.includes('Verdes mares bravios'),'Iracema: capítulo inicial não contém a abertura da edição');

  await page.goto(`${base}/leitura.html?obra=iracema&capitulo=2`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  await page.locator('#reader-next').click();
  await page.waitForFunction(()=>new URLSearchParams(location.search).get('capitulo')==='3',{timeout:20000});
  assert(new URL(page.url()).searchParams.get('capitulo')==='3','Iracema: botão próximo não avançou do capítulo 2 para o 3');
  await page.waitForFunction(()=>{
    const link=document.getElementById('reader-atlas-link');
    return Boolean(link&&!link.hidden&&(link.getAttribute('href')||'').startsWith('atlas.html?busca='));
  },{timeout:20000});
  const atlasHref=await page.locator('#reader-atlas-link').getAttribute('href');
  assert(atlasHref?.includes('Vale%20e%20taba%20dos%20Tabajaras'),'Iracema: capítulo 3 não integrou o lugar auditado ao Atlas');
  await page.locator('#reader-prev').click();
  await page.waitForFunction(()=>new URLSearchParams(location.search).get('capitulo')==='2',{timeout:20000});

  await page.goto(`${base}/leitura.html?obra=iracema&capitulo=33`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
  assert(canonical?.includes('leitura.html?obra=iracema&capitulo=33'),'Iracema: canonical do capítulo 33 incorreto');
  assert(await page.locator('#reader-next').isHidden(),'Iracema: botão próximo deveria estar oculto no último capítulo');

  await page.locator('#reader-search').fill('Bertoleza');
  await page.waitForTimeout(150);
  assert((await page.locator('#reader-search-results a').count())===0,'Iracema: busca retornou falso positivo de outra obra');
  await page.locator('#reader-search').fill('Iracema');
  await page.waitForFunction(()=>document.querySelectorAll('#reader-search-results a').length>0);
  assert(!errors.length,`Iracema: erros no leitor: ${errors.join(' | ')}`);
  await page.close();
  console.log('Iracema reader QA OK.');
}finally{
  await browser.close();
}
