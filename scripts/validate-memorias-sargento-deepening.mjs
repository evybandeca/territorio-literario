import fs from 'node:fs';
import vm from 'node:vm';

const file='js/corpus/memorias-sargento-milicias.js';
const context={window:{}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const corpus=context.window.CORPUS_PROFUNDO?.['memorias-sargento-milicias'];
if(!corpus) throw new Error('Corpus ausente: memorias-sargento-milicias');
if(corpus.status!=='COBERTURA_CONTINUA_AUDITADA') throw new Error(`Status ainda não profundo: ${corpus.status}`);
if(corpus.versao!=='1.0.0') throw new Error(`Versão esperada 1.0.0, recebida ${corpus.versao}`);
if(corpus.estrutura?.unidades!==48) throw new Error('Estrutura deve preservar 48 capítulos');
const audited=corpus.estrutura?.unidades_auditadas||[];
if(audited.length!==48||audited.some((n,i)=>n!==i+1)) throw new Error('As 48 unidades devem estar auditadas em sequência');
const mentions=corpus.place_mentions||[];
if(mentions.length<12) throw new Error(`Aprofundamento insuficiente: ${mentions.length}/12 ocorrências mínimas`);
const covered=new Set(mentions.map(m=>m.unidade));
if(covered.size<8) throw new Error(`Cobertura distribuída insuficiente: ${covered.size}/8 capítulos mínimos`);
for(const mention of mentions){
  if(!Number.isInteger(mention.unidade)||mention.unidade<1||mention.unidade>48) throw new Error(`${mention.id}: unidade inválida`);
  if(!mention.place_id||!mention.canonical_name||!mention.evidencia?.url||!mention.evidencia?.nota) throw new Error(`${mention.id}: proveniência incompleta`);
  if(!mention.evidencia.url.includes('/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/')) throw new Error(`${mention.id}: evidência deve apontar para capítulo específico da edição congelada`);
}
console.log(`Memórias de um Sargento de Milícias deepening OK: ${mentions.length} ocorrências em ${covered.size} capítulos.`);
