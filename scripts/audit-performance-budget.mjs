import fs from 'node:fs';
import path from 'node:path';

function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)])}
const jsFiles=walk('js').filter(f=>f.endsWith('.js'));
const cssFiles=walk('css').filter(f=>f.endsWith('.css'));
const size=f=>fs.statSync(f).size;
const failures=[];
const totalJs=jsFiles.reduce((n,f)=>n+size(f),0),totalCss=cssFiles.reduce((n,f)=>n+size(f),0);
if(totalJs>1024*1024)failures.push(`JS próprio excede 1 MiB: ${totalJs} bytes`);
if(totalCss>512*1024)failures.push(`CSS próprio excede 512 KiB: ${totalCss} bytes`);
for(const f of jsFiles)if(size(f)>256*1024)failures.push(`${f} excede 256 KiB`);
for(const f of cssFiles)if(size(f)>200*1024)failures.push(`${f} excede 200 KiB`);
for(const page of ['obra.html','atlas.html','biblioteca.html','autores.html','autor.html']){
  const html=fs.readFileSync(page,'utf8');
  if(/<script[^>]+src=["']js\/corpus\//i.test(html))failures.push(`${page}: voltou a carregar corpus diretamente`);
  if(!/js\/corpus-registry\.js/.test(html))failures.push(`${page}: corpus registry ausente`);
}
if(failures.length){console.error(failures.map(x=>`- ${x}`).join('\n'));throw new Error(`Performance budget falhou com ${failures.length} problema(s).`)}
console.log(`Performance budget OK: JS ${(totalJs/1024).toFixed(1)} KiB; CSS ${(totalCss/1024).toFixed(1)} KiB; ${jsFiles.length} JS e ${cssFiles.length} CSS.`);
