import fs from 'node:fs';

const failures=[];
const mustExist=['js/motion-ux.js','css/motion-ux.css'];
for(const file of mustExist){
  if(!fs.existsSync(file))failures.push(`${file}: arquivo obrigatório ausente`);
}

const navigation=fs.readFileSync('js/navigation.js','utf8');
if(!/motion-ux\.css/.test(navigation))failures.push('navigation.js: motion-ux.css não é carregado globalmente');
if(!/motion-ux\.js/.test(navigation))failures.push('navigation.js: motion-ux.js não é carregado globalmente');

if(fs.existsSync('js/motion-ux.js')){
  const js=fs.readFileSync('js/motion-ux.js','utf8');
  const checks=[
    [/lenis@1\.3\.26/, 'Lenis deve estar fixado em 1.3.26'],
    [/gsap@3\.15(?:\.0)?/, 'GSAP deve estar fixado em 3.15.x'],
    [/prefers-reduced-motion:\s*reduce/, 'deve respeitar prefers-reduced-motion'],
    [/ScrollTrigger/, 'deve integrar ScrollTrigger somente na camada de motion'],
    [/autoRaf|ticker/, 'deve possuir loop de animação explícito'],
    [/document\.documentElement\.classList\.add\(['"]motion-ready['"]\)/, 'deve marcar inicialização progressiva com motion-ready']
  ];
  for(const [pattern,message] of checks)if(!pattern.test(js))failures.push(`motion-ux.js: ${message}`);
  if(/reactbits|from\s+['"]react|ReactDOM|createRoot/i.test(js))failures.push('motion-ux.js: não deve introduzir React/React Bits no portal estático');
}

if(fs.existsSync('css/motion-ux.css')){
  const css=fs.readFileSync('css/motion-ux.css','utf8');
  if(!/@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(css))failures.push('motion-ux.css: fallback reduced-motion ausente');
  if(!/content-visibility:\s*auto/.test(css))failures.push('motion-ux.css: content-visibility deve proteger seções abaixo da dobra');
  if(!/focus-visible/.test(css))failures.push('motion-ux.css: estados focus-visible devem permanecer explícitos');
}

if(failures.length){
  console.error(failures.map(item=>`- ${item}`).join('\n'));
  throw new Error(`Contrato Premium Motion UX falhou com ${failures.length} problema(s).`);
}
console.log('Contrato Premium Motion UX OK.');
