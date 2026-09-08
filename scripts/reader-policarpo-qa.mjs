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
    if(url.pathname.endsWith('/reader-content/triste-fim-policarpo-quaresma.txt'))contentRequests.push(url);
  });

  const response=await page.goto(`${base}/leitura.html?obra=triste-fim-policarpo-quaresma&capitulo=1`,{waitUntil:'domcontentloaded'});
  assert(response?.ok(),'Policarpo: leitor não respondeu HTTP 200');
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  assert(contentRequests.length===1,'Policarpo: texto integral local não foi requisitado exatamente uma vez');
  assert(contentRequests[0].origin===new URL(base).origin,'Policarpo: texto integral foi buscado fora do domínio do portal');
  assert((await page.locator('#reader-book-title').textContent())?.includes('Policarpo Quaresma'),'Policarpo: título da obra ausente');
  assert((await page.locator('#reader-chapter-number').textContent())?.includes('I'),'Policarpo: capítulo inicial não foi reconhecido');
  assert(await page.locator('#reader-index a').count()===15,'Policarpo: índice não contém os 15 capítulos das três partes');
  const firstText=(await page.locator('#reader-text').textContent())||'';
  assert(firstText.includes('Polycarpo Quaresma'),'Policarpo: capítulo inicial não contém o texto esperado');

  await page.goto(`${base}/leitura.html?obra=triste-fim-policarpo-quaresma&capitulo=6`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  assert(((await page.locator('#reader-chapter-number').textContent())||'').includes('Parte 2'),'Policarpo: capítulo 6 não foi associado à segunda parte');
  const secondPartText=(await page.locator('#reader-text').textContent())||'';
  assert(secondPartText.includes('Sossego'),'Policarpo: capítulo 6 não corresponde à abertura da segunda parte');
  const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
  assert(canonical?.includes('leitura.html?obra=triste-fim-policarpo-quaresma&capitulo=6'),'Policarpo: canonical do capítulo 6 incorreto');
  const atlasText=(await page.locator('#reader-atlas-link').textContent())||'';
  assert(atlasText.includes('lugar'),'Policarpo: integração contextual com Atlas ausente no capítulo 6');

  await page.goto(`${base}/leitura.html?obra=triste-fim-policarpo-quaresma&capitulo=11`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  assert(((await page.locator('#reader-chapter-number').textContent())||'').includes('Parte 3'),'Policarpo: capítulo 11 não foi associado à terceira parte');

  await page.locator('#reader-search').fill('Bertoleza');
  await page.waitForTimeout(150);
  assert((await page.locator('#reader-search-results a').count())===0,'Policarpo: busca retornou falso positivo de outra obra');
  await page.locator('#reader-search').fill('Ricardo Coração');
  await page.waitForFunction(()=>document.querySelectorAll('#reader-search-results a').length>0);
  assert(!errors.length,`Policarpo: erros no leitor: ${errors.join(' | ')}`);
  await page.close();
  console.log('Policarpo reader QA OK.');
}finally{
  await browser.close();
}
