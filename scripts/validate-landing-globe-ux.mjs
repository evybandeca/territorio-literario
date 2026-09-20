import fs from 'node:fs';

const read=path=>fs.readFileSync(path,'utf8');
const html=read('index.html');
const globe=read('js/globo.js');
const loader=read('js/globo-loader.js');
const css=read('css/ux-v1-1.css');

const falhas=[];
const exigir=(fonte,token,rotulo)=>{if(!fonte.includes(token))falhas.push(`${rotulo}: ausente ${token}`)};
const proibir=(fonte,regex,rotulo,motivo)=>{if(regex.test(fonte))falhas.push(`${rotulo}: ${motivo}`)};

// Composição da landing
exigir(html,'hero-stats','Home');
exigir(html,'globo-canvas','Home');

// Contrato visual do globo
exigir(globe,'earth_atmos_2048.jpg','Globo');
exigir(globe,'wireframe','Globo');
exigir(globe,'group.position.x','Globo');
exigir(globe,'CanvasTexture','Globo');      // base procedural: nunca uma esfera cinza
exigir(globe,'ShaderMaterial','Globo');     // halo atmosférico
exigir(globe,'fresnel','Globo');
exigir(globe,'THREE.BackSide','Globo');

// Interação e correção
exigir(globe,'limiarFrente','Globo');       // marcadores do lado oculto não recebem clique
exigir(globe,'limiarArrasto','Globo');      // arrastar o globo não navega
exigir(globe,'prefers-reduced-motion','Globo');
exigir(globe,'encodeURIComponent','Globo');

// Orçamento de recursos de GPU
exigir(globe,'marcadorGeometry','Globo');   // geometria compartilhada entre marcadores
exigir(globe,'materiaisMarcador','Globo');  // materiais reaproveitados por tipo+certeza
exigir(globe,'IntersectionObserver','Globo');
exigir(globe,'ResizeObserver','Globo');
exigir(globe,'webglcontextlost','Globo');
exigir(globe,'renderer.dispose','Globo');
proibir(globe,/lugares\s*\|\|\s*\[\]\)\[0\]/,'Globo','voltou a mapear apenas o primeiro lugar de cada obra');
proibir(globe,/powerPreference\s*:\s*'high-performance'/,'Globo','hero decorativo não deve pedir GPU dedicada');

const alocacoes=(globe.match(/new THREE\.(Sphere|Ring|Cylinder|Cone|Box|Circle)Geometry/g)||[]).length;
if(alocacoes>5)falhas.push(`Globo: ${alocacoes} alocações de geometria; o limite do hero é 5 (uma por malha compartilhada)`);

// Carregamento sob demanda: three.js jamais entra no caminho crítico da Home
proibir(html,/<script[^>]+src=["'][^"']*three[^"']*["']/i,'Home','three.js carregado direto no HTML');
proibir(html,/<script[^>]+src=["']js\/globo\.js["']/i,'Home','globo.js carregado direto no HTML');
exigir(loader,'requestIdleCallback','Loader');
exigir(loader,'saveData','Loader');
exigir(loader,'deviceMemory','Loader');
exigir(loader,'globo-ativo','Loader');

// CSS: estados do globo precisam existir de verdade, não só como classe solta
exigir(css,'.globo-hero','UX CSS');
exigir(css,'backdrop-filter','UX CSS');
exigir(css,'height:auto','UX CSS');
exigir(css,'overflow:visible','UX CSS');
exigir(css,'rgba(241,235,221','UX CSS');
exigir(css,'.globo-hero.sem-globo','UX CSS');
exigir(css,'.globo-hero:not(.globo-ativo)','UX CSS');
exigir(css,'.globo-dica strong','UX CSS');

if(falhas.length){console.error(falhas.map(x=>`- ${x}`).join('\n'));throw new Error(`Contrato do globo falhou com ${falhas.length} problema(s).`)}
console.log(`Landing globe UX contract OK (${alocacoes} geometrias compartilhadas).`);
