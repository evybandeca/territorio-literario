import fs from 'node:fs';
import path from 'node:path';

const pages=['index.html','atlas.html','biblioteca.html','autores.html','autor.html','obra.html','leitura.html','linha-do-tempo.html','sobre.html','404.html'];
const failures=[];
const localRefs=[];

function count(re,text){return [...text.matchAll(re)].length}
function localTarget(raw){
  if(!raw||raw.startsWith('#')||raw.startsWith('mailto:')||raw.startsWith('tel:')||raw.startsWith('javascript:'))return null;
  if(/^https?:\/\//i.test(raw)||raw.startsWith('//'))return null;
  const clean=raw.split('#')[0].split('?')[0];
  if(!clean)return null;
  return decodeURIComponent(clean).replace(/^\.\//,'');
}

for(const page of pages){
  if(!fs.existsSync(page)){failures.push(`${page}: arquivo ausente`);continue}
  const html=fs.readFileSync(page,'utf8');
  if(!/^<!doctype html>/i.test(html.trimStart()))failures.push(`${page}: doctype ausente`);
  if(!/<html[^>]+lang=["']pt-BR["']/i.test(html))failures.push(`${page}: lang pt-BR ausente`);
  if(!/<meta[^>]+name=["']viewport["']/i.test(html))failures.push(`${page}: viewport ausente`);
  if(!/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{20,}["']/i.test(html))failures.push(`${page}: meta description ausente/curta`);
  if(count(/<h1\b/gi,html)!==1)failures.push(`${page}: deve conter exatamente um h1`);
  if(count(/<main\b/gi,html)!==1)failures.push(`${page}: deve conter exatamente um main`);
  if(count(/<footer\b/gi,html)<1)failures.push(`${page}: footer ausente`);
  for(const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)){
    const tag=match[0],target=localTarget(match[1]);
    if(/target=["']_blank["']/i.test(tag)&&!/rel=["'][^"']*noopener/i.test(tag))failures.push(`${page}: target=_blank sem rel=noopener`);
    if(target)localRefs.push({page,target,type:'link'});
  }
  for(const match of html.matchAll(/<(?:script|link|img)\b[^>]*(?:src|href)=["']([^"']+)["'][^>]*>/gi)){
    const target=localTarget(match[1]);if(target)localRefs.push({page,target,type:'asset'});
  }
  for(const match of html.matchAll(/<img\b([^>]*)>/gi))if(!/\balt=["'][^"']*["']/i.test(match[1]))failures.push(`${page}: imagem sem atributo alt`);
}

for(const {page,target,type} of localRefs){
  let resolved=target;
  if(target.endsWith('/'))resolved=path.join(target,'index.html');
  if(!path.extname(resolved)&&type==='link')resolved=path.join(resolved,'index.html');
  if(!fs.existsSync(resolved))failures.push(`${page}: referência local inexistente -> ${target}`);
}

if(failures.length){console.error(failures.map(x=>`- ${x}`).join('\n'));throw new Error(`Auditoria pública falhou com ${failures.length} problema(s).`)}
console.log(`Public pages audit OK: ${pages.length} páginas; ${localRefs.length} referências locais verificadas.`);
