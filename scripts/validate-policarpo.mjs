import fs from 'node:fs';
import vm from 'node:vm';

const path = 'js/corpus/triste-fim-policarpo-quaresma.js';
if (!fs.existsSync(path)) throw new Error('Corpus de Triste Fim de Policarpo Quaresma ausente');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path, 'utf8'), context, { filename: path });
const c = context.window.CORPUS_PROFUNDO?.['triste-fim-policarpo-quaresma'];
if (!c) throw new Error('Objeto canônico de Policarpo Quaresma ausente');
if (c.versao !== '1.0.0') throw new Error(`Versão esperada 1.0.0; recebida ${c.versao}`);
if (c.status !== 'COBERTURA_CONTINUA_AUDITADA') throw new Error(`Status inválido: ${c.status}`);
if (c.estrutura?.capitulos !== 15) throw new Error('A obra deve registrar 15 capítulos');
const audited = c.estrutura?.capitulos_auditados || [];
if (audited.length !== 15 || audited.some((n,i)=>n!==i+1)) throw new Error('Cobertura deve ser contínua de 1 a 15');
if ((c.percursos || []).length !== 0) throw new Error('Rotas inferidas não são permitidas');
const entities = c.place_entities || [];
const mentions = c.place_mentions || [];
if (!entities.length || !mentions.length) throw new Error('Entidades e ocorrências são obrigatórias');
const eids = new Set();
for (const e of entities) {
  if (!e.id || eids.has(e.id)) throw new Error(`ID de entidade inválido/duplicado: ${e.id}`);
  eids.add(e.id);
}
const mids = new Set();
for (const m of mentions) {
  if (!m.id || mids.has(m.id)) throw new Error(`ID de ocorrência inválido/duplicado: ${m.id}`);
  mids.add(m.id);
  if (!eids.has(m.place_id)) throw new Error(`place_id órfão: ${m.place_id}`);
  if (!(m.capitulo >= 1 && m.capitulo <= 15)) throw new Error(`Capítulo fora do intervalo: ${m.capitulo}`);
  if (!m.evidencia?.url?.startsWith('https://pt.wikisource.org/wiki/Triste_Fim_de_Policarpo_Quaresma/')) throw new Error(`URL de evidência inválida: ${m.id}`);
}
console.log(`Policarpo corpus OK: ${entities.length} entities, ${mentions.length} mentions, 15 chapters, 0 routes.`);
