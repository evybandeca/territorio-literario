import fs from 'node:fs';
import vm from 'node:vm';

const context={window:{}}; vm.createContext(context);
for(const file of ['js/corpus/os-sertoes.js','js/corpus/os-sertoes-canonical.js','js/corpus/os-sertoes-tl072.js','js/corpus/os-sertoes-v1.js']){
  if(fs.existsSync(file)) vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
}
const corpus=context.window.CORPUS_PROFUNDO?.['os-sertoes'];
if(!corpus) throw new Error('Corpus ausente: os-sertoes');
if(corpus.status!=='COBERTURA_CONTINUA_AUDITADA') throw new Error(`Status ainda não profundo: ${corpus.status}`);
if(corpus.versao!=='1.0.0') throw new Error(`Versão esperada 1.0.0, recebida ${corpus.versao}`);
if(corpus.estrutura?.unidades!==44) throw new Error('Os Sertões deve preservar 44 unidades estruturais');
const mentions=corpus.place_mentions||[];
if(mentions.length<50) throw new Error(`Aprofundamento insuficiente: ${mentions.length}/50 ocorrências mínimas`);
const covered=new Set(mentions.map(m=>m.unidade));
if(covered.size<18) throw new Error(`Cobertura interna insuficiente: ${covered.size}/18 unidades mínimas`);
const unitEvidence=mentions.filter(m=>m.evidencia?.url && m.evidencia.url!=='https://pt.wikisource.org/wiki/Os_Sert%C3%B5es_(1902)');
if(unitEvidence.length<25) throw new Error(`Evidência textual interna insuficiente: ${unitEvidence.length}/25`);
if((corpus.percursos||[]).length) throw new Error('Não é permitido converter sequência militar em rota');
console.log(`Os Sertões deepening OK: ${mentions.length} ocorrências, ${covered.size}/44 unidades representadas, ${unitEvidence.length} evidências internas, 0 rotas.`);
