import fs from 'node:fs';
import vm from 'node:vm';

const path='js/corpus-registry.js';
if(!fs.existsSync(path))throw new Error('corpus-registry.js ausente');
const appended=[];
const context={window:{},document:{
  querySelector:()=>null,
  createElement:()=>({dataset:{},set src(v){this._src=v},get src(){return this._src}}),
  head:{appendChild(script){appended.push(script.src);context.window.CORPUS_PROFUNDO=context.window.CORPUS_PROFUNDO||{};const id=Object.entries(context.window.CORPUS_REGISTRY).find(([,e])=>e.scripts.includes(script.src))?.[0];if(id)context.window.CORPUS_PROFUNDO[id]={id};queueMicrotask(()=>script.onload?.())}}
},console,Map,Promise,queueMicrotask};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path,'utf8'),context,{filename:path});
const ids=Object.keys(context.window.CORPUS_REGISTRY||{});
if(ids.length!==6)throw new Error(`Registry esperado com 6 obras; recebeu ${ids.length}`);
for(const id of ['memorias-postumas','dom-casmurro','o-cortico','triste-fim-policarpo-quaresma','o-guarani','iracema'])if(!ids.includes(id))throw new Error(`Obra ausente no registry: ${id}`);
const unknown=await context.window.loadCorpusById('obra-inexistente');
if(unknown!==null)throw new Error('ID desconhecido deve retornar null');
const corpus=await context.window.loadCorpusById('o-cortico');
if(!corpus||corpus.id!=='o-cortico')throw new Error('Loader não retornou corpus esperado');
const before=appended.length;
await context.window.loadCorpusById('o-cortico');
if(appended.length!==before)throw new Error('Loader não é idempotente');
console.log(`Corpus registry OK: ${ids.length} obras; lazy loader idempotente.`);
