import fs from 'node:fs';
import vm from 'node:vm';

const registryPath='js/corpus-registry.js';
const registryContext={window:{}};vm.createContext(registryContext);vm.runInContext(fs.readFileSync(registryPath,'utf8'),registryContext,{filename:registryPath});
const registry=registryContext.window.CORPUS_REGISTRY||{};

function normalize(value=''){
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\([^)]*\)/g,' ').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
}
function loadCorpus(id,entry){
  const context={window:{}};vm.createContext(context);
  for(const file of entry.scripts)vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
  const corpus=context.window.CORPUS_PROFUNDO?.[id];if(!corpus)throw new Error(`${id}: corpus ausente`);return corpus;
}

const entities=[];const globalIds=new Map();
for(const [workId,entry] of Object.entries(registry)){
  const corpus=loadCorpus(workId,entry);
  for(const entity of corpus.place_entities||[]){
    if(globalIds.has(entity.id))throw new Error(`entity id global reutilizado: ${entity.id} em ${globalIds.get(entity.id)} e ${workId}`);
    globalIds.set(entity.id,workId);
    const forms=[entity.canonical_name,...(entity.aliases||[])].filter(Boolean);
    entities.push({work_id:workId,entity_id:entity.id,canonical_name:entity.canonical_name,escala:entity.escala,forms,normalized:[...new Set(forms.map(normalize).filter(Boolean))]});
  }
}

const exact=new Map();
for(const entity of entities){for(const key of entity.normalized){const arr=exact.get(key)||[];arr.push(entity);exact.set(key,arr)}}
const candidateMap=new Map();
for(const [key,arr] of exact){
  const works=new Set(arr.map(e=>e.work_id));if(works.size<2)continue;
  const unique=[...new Map(arr.map(e=>[`${e.work_id}:${e.entity_id}`,e])).values()];
  const signature=unique.map(e=>`${e.work_id}:${e.entity_id}`).sort().join('|');
  const item=candidateMap.get(signature)||{matched_forms:new Set(),entities:unique};item.matched_forms.add(key);candidateMap.set(signature,item);
}
const candidates=[...candidateMap.values()].map(item=>({matched_forms:[...item.matched_forms].sort(),entities:item.entities.map(({normalized,forms,...rest})=>rest)})).sort((a,b)=>b.entities.length-a.entities.length||a.matched_forms[0].localeCompare(b.matched_forms[0],'pt-BR'));

fs.mkdirSync('build',{recursive:true});
const report={generated_at:new Date().toISOString(),policy:'candidate_detection_only_no_automatic_merge',works:Object.keys(registry).length,entities:entities.length,candidates};
fs.writeFileSync('build/place-identity-candidates.json',JSON.stringify(report,null,2)+'\n');
console.log(`Place identity audit OK: ${entities.length} entidades em ${report.works} obras; ${candidates.length} grupos candidatos por nome/alias normalizado; 0 fusões automáticas.`);
for(const c of candidates.slice(0,20))console.log(`- ${c.matched_forms.join(' / ')} => ${c.entities.map(e=>`${e.work_id}:${e.canonical_name}`).join(' | ')}`);
if(candidates.length>20)console.log(`... +${candidates.length-20} grupos no artefato build/place-identity-candidates.json`);
