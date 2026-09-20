(function(){
  const hero=document.getElementById('globo-hero'),canvas=document.getElementById('globo-canvas');
  if(!hero||!canvas)return;
  const THREE_CDN='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  let started=false;
  const loadScript=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.defer=true;s.onload=resolve;s.onerror=()=>reject(new Error(`Falha ao carregar ${src}`));document.head.appendChild(s)});
  async function start(){
    if(started)return;started=true;
    try{
      if(typeof THREE==='undefined')await loadScript(THREE_CDN);
      await loadScript('js/globo.js');
      hero.classList.add('globo-ativo');
    }catch(error){hero.classList.add('sem-globo');console.warn(error.message)}
  }
  const once={once:true,passive:true};
  hero.addEventListener('pointerenter',start,once);
  hero.addEventListener('pointerdown',start,once);
  hero.addEventListener('touchstart',start,once);
  hero.addEventListener('focusin',start,{once:true});
  canvas.style.cursor='grab';

  // Aquecimento ocioso: sem isso o hero fica vazio para quem rola a página sem
  // tocar no globo. Só em aparelhos e conexões que aguentam o custo extra.
  function aparelhoApto(){
    const c=navigator.connection;
    if(c&&(c.saveData||/(^|-)2g$/.test(c.effectiveType||'')))return false;
    if(navigator.deviceMemory&&navigator.deviceMemory<4)return false;
    if(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<4)return false;
    return true;
  }
  function aquecer(){
    if(started||!aparelhoApto())return;
    const r=hero.getBoundingClientRect();
    if(r.bottom<=0||r.top>=innerHeight)return;
    start();
  }
  const agendar=()=>(window.requestIdleCallback||(f=>setTimeout(f,1200)))(aquecer,{timeout:2500});
  if(document.readyState==='complete')agendar();
  else window.addEventListener('load',agendar,{once:true});
})();
