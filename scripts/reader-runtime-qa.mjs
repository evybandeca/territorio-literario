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
    const contentRequests=[];
    page.on('request',request=>{
      const url=new URL(request.url());
      if(url.pathname.endsWith('/reader-content/memorias-postumas.txt'))contentRequests.push(url);
    });
    const response=await page.goto(`${base}/leitura.html?obra=memorias-postumas&capitulo=1`,{waitUntil:'domcontentloaded'});
    assert(response?.ok(),'leitor não respondeu HTTP 200');
    await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
    assert(contentRequests.length===1,'texto integral não foi requisitado exatamente uma vez do artefato local');
    assert(contentRequests[0].origin===new URL(base).origin,'texto integral foi buscado fora do domínio do portal');
    assert(contentRequests[0].pathname.endsWith('/reader-content/memorias-postumas.txt'),'caminho do artefato local inesperado');
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
    await page.locator('#reader-prev').click();
    await page.waitForFunction(()=>new URLSearchParams(location.search).get('capitulo')==='1');
    assert((await page.locator('#reader-chapter-number').textContent())?.includes('I'),'navegação anterior não retornou ao capítulo I');
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
    const toggle=page.locator('#reader-index-toggle');
    assert(await toggle.isVisible(),'toggle de capítulos não está visível no mobile');
    assert(await toggle.getAttribute('aria-expanded')==='false','drawer deveria iniciar fechado');
    assert((await page.locator('#reader-progress-text').textContent())?.includes(' de '),'progresso estrutural não foi renderizado');
    await toggle.click();
    assert(await toggle.getAttribute('aria-expanded')==='true','drawer não abriu');
    assert(await page.locator('#reader-sidebar').evaluate(el=>el.classList.contains('is-open')),'sidebar não entrou em estado aberto');
    await page.keyboard.press('Escape');
    assert(await toggle.getAttribute('aria-expanded')==='false','Escape não fechou o drawer');
    assert(!errors.length,`erros no leitor móvel: ${errors.join(' | ')}`);
    await page.close();
  }

  {
    const {page,errors}=await readerPage();
    await page.goto(`${base}/obra.html?id=memorias-postumas`,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>['Ler agora','Continuar leitura'].includes(document.getElementById('link-leitura')?.textContent?.trim()),{timeout:20000});
    const href=await page.locator('#link-leitura').getAttribute('href');
    assert(href?.startsWith('leitura.html?obra=memorias-postumas'),'CTA da obra não aponta para o leitor interno');
    assert(await page.locator('.work-hero__actions').getAttribute('data-reader-available')==='true','obra não sinaliza reader hospedado');
    assert(!errors.length,`erros na integração da obra: ${errors.join(' | ')}`);
    await page.close();
  }

  {
    const {page,errors}=await readerPage();
    const contentRequests=[];
    page.on('request',request=>{
      const url=new URL(request.url());
      if(url.pathname.endsWith('/reader-content/dom-casmurro.txt'))contentRequests.push(url);
    });
    const response=await page.goto(`${base}/leitura.html?obra=dom-casmurro&capitulo=1`,{waitUntil:'domcontentloaded'});
    assert(response?.ok(),'Dom Casmurro: leitor não respondeu HTTP 200');
    await page.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:20000});
    assert(contentRequests.length===1,'Dom Casmurro: texto integral local não foi requisitado exatamente uma vez');
    assert(contentRequests[0].origin===new URL(base).origin,'Dom Casmurro: texto integral foi buscado fora do domínio do portal');
    assert((await page.locator('#reader-book-title').textContent())?.includes('Dom Casmurro'),'Dom Casmurro: título da obra ausente');
    assert((await page.locator('#reader-chapter-title').textContent())?.toLocaleLowerCase('pt-BR').includes('titulo'),'Dom Casmurro: capítulo I não foi reconhecido');
    const text=(await page.locator('#reader-text').textContent())||'';
    assert(text.includes('Engenho Novo'),'Dom Casmurro: capítulo I não contém o texto esperado');
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
    assert(canonical?.includes('leitura.html?obra=dom-casmurro&capitulo=1'),'Dom Casmurro: canonical do capítulo incorreto');
    await page.locator('#reader-next').click();
    await page.waitForFunction(()=>new URLSearchParams(location.search).get('capitulo')==='2');
    assert((await page.locator('#reader-chapter-number').textContent())?.includes('II'),'Dom Casmurro: navegação não abriu capítulo II');
    await page.locator('#reader-search').fill('Matacavallos');
    await page.waitForFunction(()=>document.querySelectorAll('#reader-search-results a').length>0);
    assert(!errors.length,`Dom Casmurro: erros no leitor: ${errors.join(' | ')}`);
    await page.close();
  }

  console.log('Reader runtime QA OK: origem local, navegação, busca, progresso, drawer mobile, Atlas, CTA retomável e Dom Casmurro.');
}finally{await browser.close()}
