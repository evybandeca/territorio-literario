import fs from 'node:fs';
import vm from 'node:vm';

const strategy=JSON.parse(fs.readFileSync('data/deepening-strategy.json','utf8'));
if(strategy.schema_version!=='1.0.0'||!Array.isArray(strategy.strategy)) throw new Error('Estratégia de aprofundamento inválida');
const strategyById=new Map(strategy.strategy.map(x=>[x.work_id,x]));
if(strategyById.size!==strategy.strategy.length) throw new Error('work_id duplicado em deepening-strategy');

const registryContext={window:{}};vm.createContext(registryContext);
vm.runInContext(fs.readFileSync('js/corpus-registry.js','utf8'),registryContext,{filename:'js/corpus-registry.js'});
const registry=registryContext.window.CORPUS_REGISTRY||{};
const rows=[];
for(const [workId,entry] of Object.entries(registry)){
  const context={window:{}};vm.createContext(context);
  for(const file of entry.scripts) vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
  const corpus=context.window.CORPUS_PROFUNDO?.[workId];
  const isStructural=(corpus?.status==='COBERTURA_ESTRUTURAL_CONTINUA_AUDITADA');
  const structure=corpus?.estrutura||{};
  const total=Number.isInteger(structure.capitulos)?structure.capitulos:structure.unidades;
  const key=Number.isInteger(structure.capitulos)?'capitulo':'unidade';
  const mentions=corpus?.place_mentions||[];
  const covered=new Set(mentions.map(m=>m[key]).filter(Number.isInteger));
  const uncovered=[];for(let i=1;i<=total;i++)if(!covered.has(i))uncovered.push(i);
  if(isStructural&&!strategyById.has(workId)) throw new Error(`${workId}: corpus estrutural sem estratégia de aprofundamento`);
  if(!isStructural&&strategyById.has(workId)) throw new Error(`${workId}: estratégia residual para corpus já profundo`);
  if(isStructural){
    const s=strategyById.get(workId);
    rows.push({work_id:workId,version:corpus.versao,priority:s.priority,mode:s.mode,total_units:total,mentions:mentions.length,units_with_mentions:covered.size,units_without_mentions:uncovered.length,uncovered_units:uncovered,target:s.target,constraint:s.constraint});
  }
}
const priorities=rows.map(r=>r.priority);
if(new Set(priorities).size!==priorities.length) throw new Error('Prioridades de aprofundamento duplicadas');
rows.sort((a,b)=>a.priority-b.priority);
fs.mkdirSync('build',{recursive:true});
fs.writeFileSync('build/deepening-queue.json',JSON.stringify({generated_at:new Date().toISOString(),queue:rows},null,2));
console.log(`Deepening queue OK: ${rows.length} corpora estruturais.`);
for(const r of rows) console.log(`#${r.priority} ${r.work_id} v${r.version} — ${r.mentions} ocorrências; ${r.units_with_mentions}/${r.total_units} unidades com ocorrência; modo=${r.mode}`);
