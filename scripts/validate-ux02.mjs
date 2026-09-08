import fs from 'node:fs';

const read=path=>fs.readFileSync(path,'utf8');
const work=read('obra.html');
const workJs=read('js/obra.js');
const cta=read('js/reader-cta.js');
const reader=read('leitura.html');
const readerJs=read('js/leitura.js');
const readerCss=read('css/reader.css');
const registry=read('js/reader-registry.js');

const requireText=(source,token,label)=>{if(!source.includes(token))throw new Error(`${label}: ausente ${token}`)};

requireText(work,'id="obra-territory-summary"','Obra');
requireText(workJs,'data-reader-available','Obra JS');
requireText(cta,'Continuar leitura','Reader CTA');
requireText(cta,'tl-reader:last','Reader CTA');
requireText(reader,'id="reader-index-toggle"','Leitor');
requireText(reader,'id="reader-progress-text"','Leitor');
requireText(reader,'id="reader-progress-bar"','Leitor');
requireText(reader,'id="reader-backdrop"','Leitor');
requireText(readerJs,'reader-index-toggle','Leitor JS');
requireText(readerJs,'aria-expanded','Leitor JS');
requireText(readerJs,'reader-progress-text','Leitor JS');
requireText(readerCss,'.reader-sidebar.is-open','Leitor CSS');
requireText(registry,"'policarpo-quaresma':'triste-fim-policarpo-quaresma'",'Reader registry');

console.log('UX-02 contract OK');
