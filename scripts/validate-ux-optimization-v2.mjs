import fs from 'node:fs';

const read=path=>fs.readFileSync(path,'utf8');
const navigation=read('js/navigation.js');
const motion=read('js/motion-ux.js');
const library=read('js/biblioteca.js');
const atlas=read('js/atlas.js');
const css=read('css/motion-ux.css');
const failures=[];

const requireMatch=(source,pattern,label)=>{if(!pattern.test(source))failures.push(label)};

requireMatch(navigation,/site-header--hidden|is-header-hidden/,'header inteligente ausente');
requireMatch(navigation,/scrollY|pageYOffset/,'detecção de direção de scroll ausente');
requireMatch(navigation,/focusin|focus-within|document\.activeElement/,'header não protege interação por teclado');
requireMatch(motion,/saveData|navigator\.connection/,'motion não respeita save-data');
requireMatch(motion,/pointer:\s*coarse|hover:\s*none/,'motion não adapta efeitos a ponteiro coarse');
requireMatch(motion,/duration:\s*\.?(8|9)|duration:\s*0\.[89]/,'Lenis sem calibração mais rápida');
requireMatch(library,/aria-live|tl:results-updated|results-updated/,'biblioteca sem feedback acessível de resultados');
requireMatch(library,/history\.replaceState|URLSearchParams/,'biblioteca não sincroniza filtros com URL');
requireMatch(atlas,/aria-live|tl:results-updated|results-updated/,'atlas sem feedback acessível de resultados');
requireMatch(atlas,/history\.replaceState/,'atlas não sincroniza filtros com URL');
requireMatch(css,/site-header--hidden|is-header-hidden/,'CSS do header inteligente ausente');
requireMatch(css,/prefers-reduced-motion/,'fallback reduced-motion ausente');

if(failures.length){
  console.error(failures.map(item=>`- ${item}`).join('\n'));
  throw new Error(`UX optimization v2 falhou com ${failures.length} requisito(s).`);
}

console.log('UX optimization v2 contract OK.');
