import { chromium } from 'playwright-core';

const base=process.env.QA_BASE_URL||'http://127.0.0.1:4173';
const executablePath=process.env.CHROME_PATH||'/usr/bin/google-chrome';
const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});
function assert(c,m){if(!c)throw new Error(m)}

async function readerPage(viewport={width:1280,height:900}){
  const page=await browser.newPage({viewport});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(new URL(r.url()).origin===new URL(base).origin&&r.status()>=400)errors.push(`HTTP ${r.status()} ${r.url()}`)});
  return {page,errors};
}

try{
  {
    const {page,errors}=await readerPage();
    const response=await page.goto(`${base}/leitura.html?obra=memorias-postumas&capitulo=1`,{waitUntil:'domcontentloaded'});
    assert(response?.ok(),'leitor não respondeu HTTP 200');
    await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
    assert((await page.locator('#reader-book-title').textContent())?.includes('Memórias Póstumas'),'título da obra ausente');
    assert((await page.locator('#reader-chapter-title').textContent())?.trim(),'título do capítulo ausente');
    const text=(await page.locator('#reader-text').textContent())||'';
    assert(text.includes('defunto autor')||text.includes('defunto-autor'),'capítulo I não contém o texto esperado');
    assert(!(await page.locator('#reader-atlas-link').isHidden()),'capítulo I deveria expor contexto do Atlas');
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
    assert(canonical?.includes('leitura.html?obra=memorias-postumas&capitulo=1'),'canonical do capítulo incorreto');
    await page.locator('#reader-next').click();
    await page.waitForFunction(()=>new URLSearchParams(location.search).get('capitulo')==='2');
    assert((await page.locator('#reader-chapter-number').textContent())?.includes('II'),'navegação não abriu capítulo II');
    await page.locator('#reader-search').fill('emplasto');
    await page.waitForFunction(()=>document.querySelectorAll('#reader-search-results a').length>0);
    assert((await page.locator('#reader-search-results').textContent())?.toLocaleLowerCase('pt-BR').includes('cap.'),'busca não retornou capítulos');
    assert(!errors.length,`erros no leitor: ${errors.join(' | ')}`);
    await page.close();
  }

  {
    const {page,errors}=await readerPage();
    await page.goto(`${base}/leitura.html?obra=memorias-postumas&capitulo=2`,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
    await page.goto(`${base}/leitura.html?obra=memorias-postumas`,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
    assert((await page.locator('#reader-chapter-number').textContent())?.includes('II'),'último capítulo lido não foi restaurado');
    assert(!errors.length,`erros ao restaurar progresso: ${errors.join(' | ')}`);
    await page.close();
  }

  {
    const {page,errors}=await readerPage({width:390,height:844});
    await page.goto(`${base}/leitura.html?obra=memorias-postumas&capitulo=1`,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
    const dims=await page.evaluate(()=>({inner:innerWidth,scroll:document.documentElement.scrollWidth}));
    assert(dims.scroll<=dims.inner+2,`leitor móvel com overflow ${dims.scroll}>${dims.inner}`);
    assert(!errors.length,`erros no leitor móvel: ${errors.join(' | ')}`);
    await page.close();
  }

  {
    const {page,errors}=await readerPage();
    await page.goto(`${base}/obra.html?id=memorias-postumas`,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.getElementById('link-leitura')?.textContent?.includes('Ler esta obra'),{timeout:20000});
    const href=await page.locator('#link-leitura').getAttribute('href');
    assert(href==='leitura.html?obra=memorias-postumas','CTA da obra não aponta para o leitor interno');
    assert(!errors.length,`erros na integração da obra: ${errors.join(' | ')}`);
    await page.close();
  }

  console.log('Reader runtime QA OK: leitura local, navegação, busca, progresso, Atlas, mobile e CTA interno.');
}finally{await browser.close()}
