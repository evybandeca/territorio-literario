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
exigir(html,'globo-poster','Home');          // globo visual existe no first paint
exigir(html,'assets/globe-nautical-poster.svg','Home');
exigir(css,'.globo-poster','UX CSS');
exigir(css,'.globo-hero.globo-ativo .globo-poster','UX CSS');


// Contrato visual do globo
proibir(globe,/https?:\/\//,'Globo','a cartografia é local; nenhuma textura remota deve voltar ao hero');
exigir(globe,'GLOBO_TERRA','Globo');       // litorais vetoriais (Natural Earth 110m)
exigir(globe,'wireframe','Globo');
exigir(globe,'group.position.x','Globo');
proibir(globe,/CanvasTexture|texturaCartografica/,'Globo','a textura voltou a ser desenhada em runtime');
exigir(globe,'TextureLoader','Globo');
exigir(globe,'assets/globe-nautical-map.svg','Globo');

exigir(globe,'ShaderMaterial','Globo');     // halo atmosférico
exigir(globe,'TorusGeometry','Globo');       // aro de latão do globo físico
exigir(globe,'rotasTour','Globo');           // rotas náuticas conectam as paradas do acervo
exigir(globe,'fresnel','Globo');
exigir(globe,'THREE.BackSide','Globo');

// Interação e correção
exigir(globe,'limiarFrente','Globo');       // marcadores do lado oculto não recebem clique
exigir(globe,'limiarArrasto','Globo');      // arrastar o globo não navega
exigir(globe,'prefers-reduced-motion','Globo');
exigir(globe,'encodeURIComponent','Globo');
// Controle físico livre: quaternion/trackball substitui o antigo yaw+pitch limitado.
exigir(globe,'THREE.Quaternion','Globo');
exigir(globe,'setFromUnitVectors','Globo');
exigir(globe,'mapearTrackball','Globo');
exigir(globe,'slerp','Globo');
exigir(globe,"addEventListener('wheel'",'Globo');
proibir(globe,/inclinacaoMax|\binc\s*=|qInc|EIXO_TELA/,'Globo','o controle voltou ao modelo yaw+pitch limitado em vez de trackball livre');

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
if(alocacoes>7)falhas.push(`Globo: ${alocacoes} alocações de geometria; o limite do hero é 7 (malhas compartilhadas e aro físico)`);

// Carregamento sob demanda: three.js jamais entra no caminho crítico da Home.
// Medido: carregar o globo sem interação leva a Home de 96 para 68 no Lighthouse
// (TBT de 0 para ~7 s), abaixo do orçamento de 70 exigido por audit-lighthouse.mjs.
proibir(html,/<script[^>]+src=["'][^"']*three[^"']*["']/i,'Home','three.js carregado direto no HTML');
proibir(html,/<script[^>]+src=["']js\/globo\.js["']/i,'Home','globo.js carregado direto no HTML');
proibir(loader,/\brequestAnimationFrame\s*\(\s*start|setTimeout\s*\(\s*start/,'Loader',
  'o globo não deve subir por temporizador agressivo; use hidratação ociosa e poster imediato');
exigir(loader,'requestIdleCallback','Loader');
exigir(loader,'pointerenter','Loader');
proibir(loader,/globo-terra\.js/,'Loader','o dataset bruto voltou ao caminho do usuário');
exigir(loader,'js/globo.js','Loader');

exigir(loader,'touchstart','Loader');
exigir(loader,'globo-ativo','Loader');

// Tour guiado: paradas derivadas do acervo, nada de texto inventado
exigir(globe,'construirParadas','Globo');
exigir(globe,'orientacaoParaLugar','Globo');
exigir(globe,'lugar.descricao','Globo');   // o texto da parada vem de data.js
proibir(globe,/paradas\s*=\s*\[\s*\{/,'Globo','as paradas do tour devem sair de OBRAS, não de uma lista fixa');
exigir(html,'data-globo-tour','Home');
exigir(html,'data-tour-pausa','Home');     // conteúdo que avança sozinho precisa de pausa
exigir(html,'data-tour-anterior','Home');
exigir(html,'data-tour-proximo','Home');
exigir(html,'aria-live','Home');
exigir(css,'.globo-tour','UX CSS');

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
console.log(`Landing globe UX contract OK (${alocacoes} geometrias compartilhadas, trackball quaternion).`);
