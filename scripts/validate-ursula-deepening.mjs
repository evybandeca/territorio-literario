import fs from 'node:fs';
import vm from 'node:vm';

const file='js/corpus/ursula.js';
const context={window:{}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const corpus=context.window.CORPUS_PROFUNDO?.ursula;
if(!corpus) throw new Error('Corpus ausente: ursula');
if(corpus.status!=='COBERTURA_CONTINUA_AUDITADA') throw new Error(`Status ainda não profundo: ${corpus.status}`);
if(corpus.versao!=='1.0.0') throw new Error(`Versão esperada 1.0.0, recebida ${corpus.versao}`);
if(corpus.estrutura?.unidades!==22) throw new Error('Úrsula deve preservar prólogo + 20 capítulos + epílogo');
const audited=corpus.estrutura?.unidades_auditadas||[];
if(audited.length!==22||audited.some((n,i)=>n!==i+1)) throw new Error('As 22 unidades devem permanecer auditadas em sequência');
const mentions=corpus.place_mentions||[];
if(mentions.length<9) throw new Error(`Aprofundamento insuficiente: ${mentions.length}/9 ocorrências`);
const covered=new Set(mentions.map(m=>m.unidade));
if(covered.size<7) throw new Error(`Cobertura distribuída insuficiente: ${covered.size}/7 unidades`);
if((corpus.percursos||[]).length) throw new Error('Úrsula não pode ganhar rotas inferidas');
for(const entity of corpus.place_entities||[]){
  const text=`${entity.canonical_name||''} ${(entity.aliases||[]).join(' ')}`;
  if(/Maranh[aã]o/i.test(text)) throw new Error(`${entity.id}: não inferir Maranhão a partir de contexto editorial ou biográfico`);
  if(/comarca de \*\*\*|cidade de \*\*\*|convento de \*\*\*/i.test(text)) throw new Error(`${entity.id}: anonimização textual não deve virar identidade canônica`);
}
const beaches=mentions.find(m=>m.place_id==='urs-br-praias-brasileiras');
if(!beaches||beaches.certeza!=='ilustrativo') throw new Error('Praias brasileiras deve preservar localização não especificada');
console.log(`Úrsula deepening OK: ${mentions.length} ocorrências em ${covered.size} unidades; anonimizações preservadas; 0 rotas.`);
