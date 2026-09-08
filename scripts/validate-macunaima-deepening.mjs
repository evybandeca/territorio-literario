import fs from 'node:fs';
import vm from 'node:vm';

const file='js/corpus/macunaima.js';
const context={window:{}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const corpus=context.window.CORPUS_PROFUNDO?.macunaima;
if(!corpus) throw new Error('Corpus ausente: macunaima');
if(corpus.status!=='COBERTURA_CONTINUA_AUDITADA') throw new Error(`Status ainda não profundo: ${corpus.status}`);
if(corpus.versao!=='1.0.0') throw new Error(`Versão esperada 1.0.0, recebida ${corpus.versao}`);
if(corpus.estrutura?.unidades!==19) throw new Error('Estrutura deve preservar 18 capítulos mais epílogo');
const audited=corpus.estrutura?.unidades_auditadas||[];
if(audited.length!==19||audited.some((n,i)=>n!==i+1)) throw new Error('As 19 unidades devem permanecer auditadas em sequência');
const mentions=corpus.place_mentions||[];
if(mentions.length<16) throw new Error(`Aprofundamento insuficiente: ${mentions.length}/16 ocorrências mínimas`);
const covered=new Set(mentions.map(m=>m.unidade));
if(covered.size<8) throw new Error(`Cobertura distribuída insuficiente: ${covered.size}/8 unidades mínimas`);
if((corpus.percursos||[]).length) throw new Error('Macunaíma não pode ganhar rota inferida');
for(const mention of mentions){
  if(!mention.evidencia?.url?.startsWith('https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/')) throw new Error(`${mention.id}: evidência deve apontar para unidade específica da edição de 1928`);
}
console.log(`Macunaíma deepening OK: ${mentions.length} ocorrências em ${covered.size} unidades; 0 rotas inferidas.`);
