import fs from 'node:fs';
import vm from 'node:vm';

const file='js/corpus/vidas-secas.js';
const context={window:{}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const corpus=context.window.CORPUS_PROFUNDO?.['vidas-secas'];
if(!corpus) throw new Error('Corpus ausente: vidas-secas');
if(corpus.status!=='COBERTURA_CONTINUA_AUDITADA') throw new Error(`Status ainda não profundo: ${corpus.status}`);
if(corpus.versao!=='1.0.0') throw new Error(`Versão esperada 1.0.0, recebida ${corpus.versao}`);
if(corpus.estrutura?.unidades!==13) throw new Error('Vidas Secas deve preservar 13 capítulos');
const audited=corpus.estrutura?.unidades_auditadas||[];
if(audited.length!==13||audited.some((n,i)=>n!==i+1)) throw new Error('Os 13 capítulos devem permanecer auditados em sequência');
const mentions=corpus.place_mentions||[];
if(mentions.length<14) throw new Error(`Aprofundamento funcional insuficiente: ${mentions.length}/14 ocorrências`);
const covered=new Set(mentions.map(m=>m.unidade));
if(covered.size<8) throw new Error(`Cobertura distribuída insuficiente: ${covered.size}/8 capítulos`);
if((corpus.percursos||[]).length) throw new Error('Direção de migração não pode ser convertida em rota');
const forbidden=/\b(Pernambuco|Alagoas|Para[ií]ba|Cear[aá]|Bahia|Sergipe|Piau[ií]|Rio Grande do Norte)\b/i;
for(const entity of corpus.place_entities||[]){
  const text=`${entity.canonical_name||''} ${(entity.aliases||[]).join(' ')}`;
  if(forbidden.test(text)) throw new Error(`${entity.id}: não inferir estado para espacialidade anônima`);
  if(['cidade','regiao','ponto','rota','bairro'].includes(entity.escala) && !entity.canonical_name) throw new Error(`${entity.id}: entidade sem rótulo editorial`);
}
for(const mention of mentions){
  if(!mention.evidencia?.url?.startsWith('https://pt.wikisource.org/wiki/Vidas_seccas/')) throw new Error(`${mention.id}: evidência deve apontar para capítulo específico`);
}
console.log(`Vidas Secas deepening OK: ${mentions.length} ocorrências funcionais em ${covered.size} capítulos; 0 estados inferidos; 0 rotas.`);
