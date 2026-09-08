import { chromium } from 'playwright-core';

const base=process.env.QA_BASE_URL||'http://127.0.0.1:4173';
const executablePath=process.env.CHROME_PATH||'/usr/bin/google-chrome';
const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});

function assert(condition,message){if(!condition)throw new Error(message)}

async function inspect(url){
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  await page.goto(base+url,{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(800);
  const data=await page.evaluate(()=>{
    const json=[...document.querySelectorAll('script[type="application/ld+json"]')].map(el=>{try{return JSON.parse(el.textContent||'null')}catch{return null}}).filter(Boolean);
    return {
      canonical:document.querySelector('link[rel="canonical"]')?.href||'',
      ogTitle:document.querySelector('meta[property="og:title"]')?.content||'',
      ogDescription:document.querySelector('meta[property="og:description"]')?.content||'',
      ogUrl:document.querySelector('meta[property="og:url"]')?.content||'',
      ogType:document.querySelector('meta[property="og:type"]')?.content||'',
      twitterCard:document.querySelector('meta[name="twitter:card"]')?.content||'',
      json
    };
  });
  await page.close();
  return data;
}

try{
  const home=await inspect('/index.html');
  assert(home.canonical,'home sem canonical');
  assert(home.ogTitle&&home.ogDescription&&home.ogUrl,'home sem Open Graph completo');
  assert(home.twitterCard==='summary_large_image','home sem twitter:card adequado');
  assert(home.json.some(x=>x['@type']==='WebSite'),'home sem JSON-LD WebSite');

  const obra=await inspect('/obra.html?id=o-cortico');
  assert(obra.canonical.includes('obra.html?id=o-cortico'),'canonical da obra incorreto');
  const book=obra.json.find(x=>x['@type']==='Book');
  assert(book,'obra sem JSON-LD Book');
  assert(book.name==='O Cortiço','Book.name incorreto');
  assert(book.author?.name==='Aluísio Azevedo','Book.author incorreto');

  const autor=await inspect('/autor.html?nome=Machado%20de%20Assis');
  assert(autor.canonical.includes('autor.html?nome=Machado%20de%20Assis'),'canonical do autor incorreto');
  const person=autor.json.find(x=>x['@type']==='Person');
  assert(person,'autor sem JSON-LD Person');
  assert(person.name==='Machado de Assis','Person.name incorreto');

  console.log('SEO runtime QA OK: canonical, Open Graph e JSON-LD validados.');
} finally {
  await browser.close();
}
