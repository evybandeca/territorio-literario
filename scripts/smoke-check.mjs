import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const pages=['index.html','atlas.html','biblioteca.html','autores.html','linha-do-tempo.html','sobre.html','obra.html'];
const required=['assets/favicon.svg','robots.txt','sitemap.xml','README.md','css/style.css','css/tokens.css','css/base.css','css/components.css','css/pages.css','js/navigation.js'];
const errors=[];

for(const file of [...pages,...required]) if(!fs.existsSync(path.join(root,file))) errors.push(`missing: ${file}`);

for(const page of pages){
  const full=path.join(root,page); if(!fs.existsSync(full)) continue;
  const html=fs.readFileSync(full,'utf8');
  if(!/<title[^>]*>[^<]+<\/title>/i.test(html)) errors.push(`${page}: missing title`);
  if(!/<meta\s+name=["']description["']/i.test(html)) errors.push(`${page}: missing meta description`);
  if(!/js\/navigation\.js/.test(html)) errors.push(`${page}: missing global navigation shell`);
  const refs=[...html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)].map(m=>m[1]);
  for(const ref of refs){
    if(/^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(ref)) continue;
    const clean=ref.split('?')[0].split('#')[0]; if(!clean) continue;
    if(!fs.existsSync(path.join(root,clean))) errors.push(`${page}: broken local ref ${ref}`);
  }
}

const navigation=fs.existsSync(path.join(root,'js/navigation.js'))?fs.readFileSync(path.join(root,'js/navigation.js'),'utf8'):'';
for(const target of ['index.html','atlas.html','biblioteca.html','autores.html','linha-do-tempo.html','sobre.html']) if(!navigation.includes(target)) errors.push(`navigation missing route: ${target}`);
if(!navigation.includes('assets/favicon.svg')) errors.push('navigation shell does not register favicon');

if(errors.length){console.error('FAIL');errors.forEach(e=>console.error(`- ${e}`));process.exit(1)}
console.log(`PASS: ${pages.length} pages and ${required.length} required assets verified.`);
