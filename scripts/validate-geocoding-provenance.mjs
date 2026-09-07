import fs from 'node:fs';
import vm from 'node:vm';

const manifestPath='data/geocoding-provenance.json';
if(!fs.existsSync(manifestPath)) throw new Error('Manifest de proveniência de geocodificação ausente');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
if(manifest.schema_version!=='1.0.0') throw new Error('schema_version de geocodificação inválido');
if(!manifest.policy||manifest.policy.auto_geocoding!==false||manifest.policy.fuzzy_merge!==false) throw new Error('Política deve proibir auto-geocoding e fuzzy merge');
if(!Array.isArray(manifest.records)) throw new Error('records ausente');

const registryContext={window:{}};vm.createContext(registryContext);
vm.runInContext(fs.readFileSync('js/corpus-registry.js','utf8'),registryContext,{filename:'js/corpus-registry.js'});
const registry=registryContext.window.CORPUS_REGISTRY||{};
const entities=new Map();
for(const [workId,entry] of Object.entries(registry)){
  const context={window:{}};vm.createContext(context);
  for(const file of entry.scripts) vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
  const corpus=context.window.CORPUS_PROFUNDO?.[workId];
  for(const entity of corpus?.place_entities||[]){
    const ref=`${workId}:${entity.id}`;
    entities.set(ref,entity);
    const hasLat=typeof entity.lat==='number',hasLon=typeof entity.lon==='number';
    if(hasLat!==hasLon) throw new Error(`${ref}: latitude/longitude incompletas`);
    if(entity.ficcional&&(hasLat||hasLon)) throw new Error(`${ref}: entidade ficcional não pode ser geocodificada automaticamente`);
  }
}

const recordRefs=new Set();
for(const record of manifest.records){
  const ref=`${record.work_id}:${record.entity_id}`;
  if(recordRefs.has(ref)) throw new Error(`${ref}: registro de geocodificação duplicado`);
  recordRefs.add(ref);
  if(!entities.has(ref)) throw new Error(`${ref}: registro aponta para entidade inexistente`);
  if(!['approved','withheld'].includes(record.decision)) throw new Error(`${ref}: decision inválida`);
  if(!['exact','historical_site','centroid','context_only','not_geocodable'].includes(record.accuracy)) throw new Error(`${ref}: accuracy inválida`);
  if(!record.reviewed_at||!/^\d{4}-\d{2}-\d{2}$/.test(record.reviewed_at)) throw new Error(`${ref}: reviewed_at inválido`);
  if(record.decision==='approved'){
    if(typeof record.latitude!=='number'||typeof record.longitude!=='number') throw new Error(`${ref}: coordenadas aprovadas ausentes`);
    if(record.latitude < -90 || record.latitude > 90 || record.longitude < -180 || record.longitude > 180) throw new Error(`${ref}: coordenadas fora do intervalo`);
    if(!record.source_url?.startsWith('https://')) throw new Error(`${ref}: source_url HTTPS obrigatória`);
    if(!record.source_title||!record.rationale) throw new Error(`${ref}: fonte/justificativa obrigatórias`);
    if(record.accuracy==='context_only'||record.accuracy==='not_geocodable') throw new Error(`${ref}: accuracy incompatível com aprovação`);
  } else {
    if(record.latitude!=null||record.longitude!=null) throw new Error(`${ref}: registro withheld não pode publicar coordenadas`);
    if(!record.rationale) throw new Error(`${ref}: withheld exige justificativa`);
  }
}

for(const [ref,entity] of entities){
  const hasCoords=typeof entity.lat==='number'&&typeof entity.lon==='number';
  if(hasCoords){
    const record=manifest.records.find(r=>`${r.work_id}:${r.entity_id}`===ref&&r.decision==='approved');
    if(!record) throw new Error(`${ref}: coordenada publicada sem proveniência aprovada`);
    if(Math.abs(record.latitude-entity.lat)>1e-9||Math.abs(record.longitude-entity.lon)>1e-9) throw new Error(`${ref}: coordenada do corpus diverge da proveniência`);
  }
}

const approved=manifest.records.filter(r=>r.decision==='approved').length;
const withheld=manifest.records.filter(r=>r.decision==='withheld').length;
console.log(`Geocoding provenance OK: ${entities.size} entidades; ${approved} aprovadas; ${withheld} retidas; 0 auto-geocoding.`);
