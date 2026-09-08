import { chromium } from 'playwright-core';

const base=(process.env.PRODUCTION_BASE_URL||'https://evybandeca.github.io/territorio-literario').replace(/\/$/,'');
const executablePath=process.env.CHROME_PATH||'/usr/bin/google-chrome';
const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});
const failures=[];

function assert(condition,message){if(!condition)throw new Error(message)}
async function run(name,fn){try{await fn();console.log(`PASS ${name}`)}catch(error){failures.push(`${name}: ${error.message}`);console.error(`FAIL ${name}: ${error.stack||error.message}`)}}

await run('recursos públicos essenciais respondem',async()=>{
  const page=await browser.newPage();
  for(const path of ['/robots.txt','/sitemap.xml','/assets/favicon.svg']){
    const response=await page.request.get(base+path);assert(response.ok(),`${path}: HTTP ${response.status()}`);
  }
  await page.close();
});

await run('páginas essenciais sem erro de runtime ou HTTP interno',async()=>{
  const urls=['/','/atlas.html','/biblioteca.html','/obra.html?id=memorias-postumas','/autor.html?nome=Machado%20de%20Assis','/linha-do-tempo.html','/sobre.html'];
  for(const path of urls){
    const page=await browser.newPage({viewport:{width:1365,height:900}}),errors=[],bad=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',msg=>{if(msg.type()==='error')errors.push(`console: ${msg.text()}`)});
    page.on('response',response=>{const u=new URL(response.url());if(u.origin===new URL(base).origin&&response.status()>=400)bad.push(`${response.status()} ${u.pathname}`)});
    const response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:30000});
    assert(response?.ok(),`${path}: navegação HTTP inválida`);
    await page.waitForTimeout(path.includes('atlas')?1800:900);
    assert(await page.locator('main').count()===1,`${path}: main ausente`);
    assert((await page.title()).trim().length>5,`${path}: title vazio`);
    assert((await page.locator('link[rel="canonical"]').getAttribute('href'))?.startsWith(base),`${path}: canonical fora do domínio`);
    assert(!bad.length,`${path}: respostas internas inválidas: ${bad.join(', ')}`);
    assert(!errors.length,`${path}: erros de runtime: ${errors.join(' | ')}`);
    await page.close();
  }
});

await run('busca global funciona no ambiente publicado',async()=>{
  const page=await browser.newPage({viewport:{width:1365,height:900}});
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.locator('.site-search-trigger').click();
  await page.waitForFunction(()=>document.querySelector('.global-search')?.open,{timeout:30000});
  await page.locator('.global-search__input').fill('Rua dos Ourives');
  await page.waitForFunction(()=>[...document.querySelectorAll('.global-search__item')].some(el=>el.textContent?.includes('Rua dos Ourives')),{timeout:30000});
  await page.close();
});

await run('dados estruturados dinâmicos chegam à produção',async()=>{
  const page=await browser.newPage();
  await page.goto(base+'/obra.html?id=o-cortico',{waitUntil:'domcontentloaded'});await page.waitForTimeout(1000);
  const book=await page.evaluate(()=>[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{try{return JSON.parse(s.textContent||'null')}catch{return null}}).find(x=>x?.['@type']==='Book'));
  assert(book?.name==='O Cortiço','Book JSON-LD ausente/incorreto em produção');
  await page.goto(base+'/autor.html?nome=Machado%20de%20Assis',{waitUntil:'domcontentloaded'});await page.waitForTimeout(700);
  const person=await page.evaluate(()=>[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{try{return JSON.parse(s.textContent||'null')}catch{return null}}).find(x=>x?.['@type']==='Person'));
  assert(person?.name==='Machado de Assis','Person JSON-LD ausente/incorreto em produção');
  await page.close();
});

await run('leitor integral está hospedado e navegável',async()=>{
  const request=await browser.newPage();
  const textResponse=await request.request.get(base+'/reader-content/memorias-postumas.txt');
  assert(textResponse.ok(),`texto local: HTTP ${textResponse.status()}`);
  assert((await textResponse.text()).includes('CAPITULO I'),'texto local sem capítulo I');
  const errors=[];request.on('pageerror',e=>errors.push(e.message));
  const nav=await request.goto(base+'/leitura.html?obra=memorias-postumas&capitulo=1',{waitUntil:'domcontentloaded',timeout:30000});
  assert(nav?.ok(),'leitor: navegação HTTP inválida');
  await request.waitForFunction(()=>document.body.dataset.readerReady==='true',{timeout:30000});
  assert(((await request.locator('#reader-text').textContent())||'').includes('defunto autor'),'leitor: capítulo I não renderizado');
  assert((await request.locator('link[rel="canonical"]').getAttribute('href'))?.includes('capitulo=1'),'leitor: canonical sem capítulo');
  assert(!errors.length,`leitor: erros de runtime ${errors.join(' | ')}`);
  await request.close();
});

await browser.close();
if(failures.length){console.error(`\nProduction smoke: ${failures.length} falha(s)\n- ${failures.join('\n- ')}`);process.exit(1)}
console.log('Production smoke OK: runtime, HTTP interno, busca, SEO semântico e leitor no GitHub Pages.');
