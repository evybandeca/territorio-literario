import fs from 'node:fs';
import vm from 'node:vm';

const registryPath='js/corpus-registry.js';
if(!fs.existsSync(registryPath))throw new Error('Corpus registry ausente');
const registryContext={window:{}};
vm.createContext(registryContext);
vm.runInContext(fs.readFileSync(registryPath,'utf8'),registryContext,{filename:registryPath});
const registry=registryContext.window.CORPUS_REGISTRY||{};
const ids=Object.keys(registry);
if(!ids.length)throw new Error('Registry sem obras');

const allowedTipo=new Set(['narrativo','historico','biografico','mencionado','ficcional']);
const allowedEscala=new Set(['ponto','bairro','cidade','regiao','estado','rota']);
const allowedCerteza=new Set(['identificado','ilustrativo']);
let totalEntities=0,totalMentions=0,totalUnits=0;

function estruturaAuditada(c,id){
  const s=c.estrutura||{};
  if(Number.isInteger(s.capitulos)&&s.capitulos>0){
    const audited=s.capitulos_auditados||[];
    if(audited.length!==s.capitulos||audited.some((n,i)=>n!==i+1))throw new Error(`${id}: cobertura de capítulos não é contínua 1..${s.capitulos}`);
    return {kind:'capitulo',label:'capítulos',total:s.capitulos,audited};
  }
  if(Number.isInteger(s.unidades)&&s.unidades>0){
    const audited=s.unidades_auditadas||[];
    if(audited.length!==s.unidades||audited.some((n,i)=>n!==i+1))throw new Error(`${id}: cobertura de unidades não é contínua 1..${s.unidades}`);
    if(!s.unidade_tipo)throw new Error(`${id}: unidade_tipo ausente`);
    return {kind:'unidade',label:'unidades',total:s.unidades,audited};
  }
  throw new Error(`${id}: estrutura auditável ausente`);
}

for(const id of ids){
  const context={window:{}};vm.createContext(context);
  for(const file of registry[id].scripts){
    if(!fs.existsSync(file))throw new Error(`${id}: arquivo ausente ${file}`);
    vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
  }
  const c=context.window.CORPUS_PROFUNDO?.[id];
  if(!c)throw new Error(`${id}: objeto canônico ausente`);
  if(!/^\d+\.\d+\.\d+$/.test(c.versao||''))throw new Error(`${id}: versão inválida ${c.versao}`);
  if(c.status!=='COBERTURA_CONTINUA_AUDITADA')throw new Error(`${id}: status inválido ${c.status}`);
  const structure=estruturaAuditada(c,id);
  if((c.percursos||[]).length!==0)throw new Error(`${id}: rotas inferidas não permitidas`);
  const entities=c.place_entities||[],mentions=c.place_mentions||[];
  const entityIds=new Set();
  for(const e of entities){
    if(!e.id||entityIds.has(e.id))throw new Error(`${id}: entity id inválido/duplicado ${e.id}`);
    entityIds.add(e.id);
  }
  const mentionIds=new Set();
  for(const m of mentions){
    if(!m.id||mentionIds.has(m.id))throw new Error(`${id}: mention id inválido/duplicado ${m.id}`);
    mentionIds.add(m.id);
    if(!entityIds.has(m.place_id))throw new Error(`${id}: place_id órfão ${m.place_id}`);
    const position=structure.kind==='capitulo'?m.capitulo:m.unidade;
    if(!Number.isInteger(position)||position<1||position>structure.total)throw new Error(`${id}: ${structure.kind} inválida em ${m.id}`);
    if(!allowedTipo.has(m.tipo))throw new Error(`${id}: tipo inválido ${m.tipo} em ${m.id}`);
    if(!allowedEscala.has(m.escala))throw new Error(`${id}: escala inválida ${m.escala} em ${m.id}`);
    if(!allowedCerteza.has(m.certeza))throw new Error(`${id}: certeza inválida ${m.certeza} em ${m.id}`);
    if(!m.evidencia?.url)throw new Error(`${id}: evidência ausente em ${m.id}`);
  }
  totalEntities+=entities.length;totalMentions+=mentions.length;totalUnits+=structure.audited.length;
  console.log(`${id}: OK — ${structure.audited.length} ${structure.label}, ${entities.length} entidades, ${mentions.length} ocorrências.`);
}
console.log(`Corpora OK: ${ids.length} obras, ${totalUnits} unidades estruturais auditadas, ${totalEntities} entidades, ${totalMentions} ocorrências, 0 rotas.`);
