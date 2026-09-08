import fs from 'node:fs';
import vm from 'node:vm';

const strategy=JSON.parse(fs.readFileSync('data/deepening-strategy.json','utf8'));
if(strategy.schema_version!=='1.0.0') throw new Error('deepening-strategy schema inválido');
if(!Array.isArray(strategy.strategy)||strategy.strategy.length!==0) throw new Error(`Fila estrutural ainda não está vazia: ${strategy.strategy?.length ?? 'inválida'}`);

const registryContext={window:{}};
vm.createContext(registryContext);
vm.runInContext(fs.readFileSync('js/corpus-registry.js','utf8'),registryContext,{filename:'js/corpus-registry.js'});
const registry=registryContext.window.CORPUS_REGISTRY||{};
const corpusIds=Object.keys(registry);
if(corpusIds.length!==12) throw new Error(`Release v1 exige 12 corpora; encontrados ${corpusIds.length}`);

let units=0,entities=0,mentions=0;
for(const [workId,entry] of Object.entries(registry)){
  const context={window:{}};
  vm.createContext(context);
  for(const file of entry.scripts) vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
  const corpus=context.window.CORPUS_PROFUNDO?.[workId];
  if(!corpus) throw new Error(`${workId}: corpus não inicializado`);
  if(corpus.status!=='COBERTURA_CONTINUA_AUDITADA') throw new Error(`${workId}: status incompatível com release v1 (${corpus.status})`);
  const structure=corpus.estrutura||{};
  const total=Number.isInteger(structure.capitulos)?structure.capitulos:structure.unidades;
  if(!Number.isInteger(total)||total<1) throw new Error(`${workId}: total estrutural inválido`);
  units+=total;
  entities+=(corpus.place_entities||[]).length;
  mentions+=(corpus.place_mentions||[]).length;
  if((corpus.percursos||[]).length) throw new Error(`${workId}: release não admite percursos inferidos`);
}

const readerContext={};
readerContext.globalThis=readerContext;
vm.createContext(readerContext);
vm.runInContext(fs.readFileSync('js/reader-registry.js','utf8'),readerContext,{filename:'js/reader-registry.js'});
const readers=Object.keys(readerContext.READER_REGISTRY||{});
if(readers.length<6) throw new Error(`Release v1 exige ao menos 6 leituras hospedadas; encontradas ${readers.length}`);

console.log(`RELEASE_V1_READY=true`);
console.log(`CORPORA_DEEP=${corpusIds.length}`);
console.log(`STRUCTURAL_QUEUE=0`);
console.log(`STRUCTURAL_UNITS=${units}`);
console.log(`PLACE_ENTITIES=${entities}`);
console.log(`PLACE_MENTIONS=${mentions}`);
console.log(`HOSTED_READERS=${readers.length}`);
