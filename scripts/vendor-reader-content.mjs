import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const registryCode=await fs.readFile('js/reader-registry.js','utf8');
const context={window:{},globalThis:{}};
vm.createContext(context);
vm.runInContext(registryCode,context);
const registry=context.window.READER_REGISTRY||context.globalThis.READER_REGISTRY||{};

for(const config of Object.values(registry)){
  const response=await fetch(config.source.url,{headers:{'user-agent':'Territorio-Literario/1.0 (+https://evybandeca.github.io/territorio-literario/)'}});
  if(!response.ok)throw new Error(`${config.id}: fonte respondeu HTTP ${response.status}`);
  const raw=await response.text();
  const required=[
    `Most recently updated: ${config.source.expectedUpdate}`,
    'MACHADO DE ASSIS',
    'CAPITULO I',
    'CAPITULO II'
  ];
  for(const marker of required)if(!raw.includes(marker))throw new Error(`${config.id}: marcador esperado ausente: ${marker}`);
  const startMarker='*** START OF THE PROJECT GUTENBERG EBOOK';
  const endMarker='*** END OF THE PROJECT GUTENBERG EBOOK';
  const start=raw.indexOf('\n',raw.indexOf(startMarker));
  const end=raw.indexOf(endMarker);
  if(start<0||end<0||end<=start)throw new Error(`${config.id}: envelope Gutenberg não reconhecido`);
  const text=raw.slice(start+1,end).trim()+"\n";
  const output=path.resolve(config.localPath);
  await fs.mkdir(path.dirname(output),{recursive:true});
  await fs.writeFile(output,text,'utf8');
  console.log(`Reader source OK: ${config.id} -> ${config.localPath} (${Buffer.byteLength(text)} bytes)`);
}
