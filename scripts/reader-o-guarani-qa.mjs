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
    if(url.pathname.endsWith('/reader-content/o-guarani.txt'))contentRequests.push(url);
  });

  const response=await page.goto(`${base}/leitura.html?obra=o-guarani&capitulo=1`,{waitUntil:'domcontentloaded'});
  assert(response?.ok(),'O Guarani: leitor não respondeu HTTP 200');
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  assert(contentRequests.length===1,'O Guarani: texto integral local não foi requisitado exatamente uma vez');
  assert(contentRequests[0].origin===new URL(base).origin,'O Guarani: texto integral foi buscado fora do domínio do portal');
  assert((await page.locator('#reader-book-title').textContent())?.includes('O Guarani'),'O Guarani: título da obra ausente');
  assert((await page.locator('#reader-chapter-number').textContent())?.includes('Parte 1'),'O Guarani: capítulo inicial não foi associado à primeira parte');
  assert(await page.locator('#reader-index a').count()===54,'O Guarani: índice não contém os 54 capítulos das quatro partes');
  const firstText=(await page.locator('#reader-text').textContent())||'';
  assert(firstText.includes('Paquequer'),'O Guarani: capítulo inicial não contém o cenário do Paquequer');
  await page.waitForFunction(()=>{
    const link=document.getElementById('reader-atlas-link');
    return Boolean(link&&!link.hidden&&(link.getAttribute('href')||'').startsWith('atlas.html?busca='));
  },{timeout:20000});
  const atlasHref=await page.locator('#reader-atlas-link').getAttribute('href');
  assert(atlasHref?.startsWith('atlas.html?busca='),'O Guarani: capítulo 1 não ativou integração contextual com Atlas');

  await page.goto(`${base}/leitura.html?obra=o-guarani&capitulo=15`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  assert(((await page.locator('#reader-chapter-number').textContent())||'').includes('Parte 1'),'O Guarani: capítulo 15 não permaneceu na primeira parte');
  await page.locator('#reader-next').click();
  await page.waitForFunction(()=>new URLSearchParams(location.search).get('capitulo')==='16',{timeout:20000});
  assert(new URL(page.url()).searchParams.get('capitulo')==='16','O Guarani: botão próximo não avançou da fronteira 15 para 16');
  assert(((await page.locator('#reader-chapter-number').textContent())||'').includes('Parte 2'),'O Guarani: navegação 15→16 não entrou na segunda parte');
  await page.locator('#reader-prev').click();
  await page.waitForFunction(()=>new URLSearchParams(location.search).get('capitulo')==='15',{timeout:20000});
  assert(((await page.locator('#reader-chapter-number').textContent())||'').includes('Parte 1'),'O Guarani: botão anterior não retornou à primeira parte');

  await page.goto(`${base}/leitura.html?obra=o-guarani&capitulo=30`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  assert(((await page.locator('#reader-chapter-number').textContent())||'').includes('Parte 3'),'O Guarani: capítulo 30 não foi associado à terceira parte');

  await page.goto(`${base}/leitura.html?obra=o-guarani&capitulo=44`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
  assert(((await page.locator('#reader-chapter-number').textContent())||'').includes('Parte 4'),'O Guarani: capítulo 44 não foi associado à quarta parte');
  const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
  assert(canonical?.includes('leitura.html?obra=o-guarani&capitulo=44'),'O Guarani: canonical do capítulo 44 incorreto');

  await page.locator('#reader-search').fill('Bertoleza');
  await page.waitForTimeout(150);
  assert((await page.locator('#reader-search-results a').count())===0,'O Guarani: busca retornou falso positivo de outra obra');
  await page.locator('#reader-search').fill('Paquequer');
  await page.waitForFunction(()=>document.querySelectorAll('#reader-search-results a').length>0);
  assert(!errors.length,`O Guarani: erros no leitor: ${errors.join(' | ')}`);
  await page.close();
  console.log('O Guarani reader QA OK.');
}finally{
  await browser.close();
}
