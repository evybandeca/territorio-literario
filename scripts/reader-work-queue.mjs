import fs from 'node:fs';
import vm from 'node:vm';

const registryPath = 'js/reader-registry.js';
const priority = [
  { id: 'dom-casmurro', title: 'Dom Casmurro' },
  { id: 'o-cortico', title: 'O Cortiço' },
  { id: 'triste-fim-policarpo-quaresma', title: 'Triste Fim de Policarpo Quaresma' },
  { id: 'o-guarani', title: 'O Guarani' },
  { id: 'iracema', title: 'Iracema' }
];

if (!fs.existsSync(registryPath)) {
  console.error(`Reader registry ausente: ${registryPath}`);
  process.exit(2);
}

const source = fs.readFileSync(registryPath, 'utf8');
const context = {};
context.globalThis = context;
vm.createContext(context);

try {
  vm.runInContext(source, context, { filename: registryPath });
} catch (error) {
  console.error(`Reader registry inválido: ${error.message}`);
  process.exit(2);
}

const registry = context.READER_REGISTRY;
if (!registry || typeof registry !== 'object') {
  console.error('READER_REGISTRY não foi inicializado corretamente.');
  process.exit(2);
}

const queue = priority.map(item => ({
  ...item,
  integrated: Boolean(registry[item.id]),
  localPath: registry[item.id]?.localPath || null,
  sourceProvider: registry[item.id]?.source?.provider || null
}));
const pending = queue.filter(item => !item.integrated);
const next = pending[0] || null;

const result = {
  generatedAt: new Date().toISOString(),
  integratedCount: queue.length - pending.length,
  pendingCount: pending.length,
  next,
  queue
};

console.log(JSON.stringify(result, null, 2));

if (next) {
  console.log(`\nNEXT_READER=${next.id}`);
  console.log(`NEXT_TITLE=${next.title}`);
  console.log(`SUGGESTED_BRANCH=feature/reader-${next.id}`);
} else {
  console.log('\nREADER_EXPANSION_COMPLETE=true');
}
