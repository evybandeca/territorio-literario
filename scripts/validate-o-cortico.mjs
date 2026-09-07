import fs from 'node:fs';
import vm from 'node:vm';

const path = 'js/corpus/o-cortico.js';
if (!fs.existsSync(path)) {
  throw new Error('O Cortiço corpus file is missing');
}

const code = fs.readFileSync(path, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const corpus = sandbox.window.CORPUS_PROFUNDO?.['o-cortico'];
if (!corpus) throw new Error('window.CORPUS_PROFUNDO["o-cortico"] is missing');
if (corpus.versao !== '1.0.0') throw new Error(`Expected version 1.0.0, got ${corpus.versao}`);
if (corpus.estrutura?.capitulos !== 23) throw new Error('Expected 23 chapters');
const audited = corpus.estrutura?.capitulos_auditados || [];
if (audited.length !== 23 || audited.some((n, i) => n !== i + 1)) throw new Error('Expected continuous chapter audit 1..23');
if ((corpus.percursos || []).length !== 0) throw new Error('No inferred routes are allowed');
const entities = corpus.place_entities || [];
const mentions = corpus.place_mentions || [];
const entityIds = new Set(entities.map(x => x.id));
if (entityIds.size !== entities.length) throw new Error('Duplicate place entity ids');
const mentionIds = new Set(mentions.map(x => x.id));
if (mentionIds.size !== mentions.length) throw new Error('Duplicate place mention ids');
for (const m of mentions) {
  if (!entityIds.has(m.place_id)) throw new Error(`Orphan place_id: ${m.place_id}`);
  if (!Number.isInteger(m.capitulo) || m.capitulo < 1 || m.capitulo > 23) throw new Error(`Invalid chapter: ${m.id}`);
  if (!/^https:\/\/pt\.wikisource\.org\/wiki\/O_Corti/.test(m.evidencia?.url || '')) throw new Error(`Invalid evidence URL: ${m.id}`);
}
console.log(`O Cortiço corpus OK: ${entities.length} entities, ${mentions.length} mentions, 23 chapters, 0 routes.`);
