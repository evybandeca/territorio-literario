import fs from 'node:fs';
import vm from 'node:vm';

const registryPath='js/corpus-registry.js';
const registryContext={window:{}};vm.createContext(registryContext);vm.runInContext(fs.readFileSync(registryPath,'utf8'),registryContext,{filename:registryPath});
const registry=registryContext.window.CORPUS_REGISTRY||{};
const allowedHosts=new Set(['pt.wikisource.org','brasiliana.usp.br','www.brasiliana.usp.br','digital.bbm.usp.br','commons.wikimedia.org']);
let links=0;const hosts=new Map();
for(const [id,entry] of Object.entries(registry)){
  const context={window:{}};vm.createContext(context);
  for(const file of entry.scripts)vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
  const c=context.window.CORPUS_PROFUNDO?.[id];
  if(!c)throw new Error(`${id}: corpus ausente`);
  const seenIds=new Set();
  for(const m of c.place_mentions||[]){
    if(seenIds.has(m.id))throw new Error(`${id}: ocorrência duplicada ${m.id}`);seenIds.add(m.id);
    const raw=m.evidencia?.url;
    if(!raw)throw new Error(`${id}: URL de evidência ausente em ${m.id}`);
    let url;try{url=new URL(raw)}catch{throw new Error(`${id}: URL malformada em ${m.id}: ${raw}`)}
    if(url.protocol!=='https:')throw new Error(`${id}: evidência sem HTTPS em ${m.id}`);
    if(!allowedHosts.has(url.hostname))throw new Error(`${id}: host de evidência não autorizado ${url.hostname} em ${m.id}`);
    hosts.set(url.hostname,(hosts.get(url.hostname)||0)+1);links++;
  }
}
console.log(`Evidence audit OK: ${links} URLs estruturais válidas.`);
for(const [host,count] of [...hosts.entries()].sort())console.log(`- ${host}: ${count}`);
