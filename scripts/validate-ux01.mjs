import fs from 'node:fs';

const read = path => fs.readFileSync(path, 'utf8');
const home = read('index.html');
const library = read('biblioteca.html');
const nav = read('js/navigation.js');
const libraryJs = read('js/biblioteca.js');
const readerJs = read('js/leitura.js');

const requireText = (source, token, label) => {
  if (!source.includes(token)) throw new Error(`${label}: ausente ${token}`);
};

requireText(home, 'data-continue-reading', 'Home');
requireText(home, 'Começar por uma obra', 'Home');
requireText(library, 'id="biblioteca-filtros-toggle"', 'Biblioteca');
requireText(library, 'js/reader-registry.js', 'Biblioteca');
requireText(nav, 'aria-current="page"', 'Navegação');
requireText(nav, 'tl-reader:last', 'Navegação');
requireText(libraryJs, 'READER_REGISTRY', 'Biblioteca');
requireText(libraryJs, 'Ler agora', 'Biblioteca');
requireText(readerJs, 'tl-reader:last', 'Leitor');

const searchPos=library.indexOf('id="busca-obras"');
const collapsedFiltersPos=library.indexOf('id="biblioteca-filtros"');
if(searchPos<0||collapsedFiltersPos<0||searchPos>collapsedFiltersPos){
  throw new Error('Biblioteca: busca mobile deve permanecer fora do painel recolhível de filtros');
}

console.log('UX-01 contract OK');
