(function(){
  const hero=document.getElementById('globo-hero'),canvas=document.getElementById('globo-canvas');
  if(!hero||!canvas)return;

  const THREE_SRC='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  let started=false,threePromise=null;

  const loadScript=src=>new Promise((resolve,reject)=>{
    const s=document.createElement('script');
    s.src=src;s.defer=true;s.onload=resolve;
    s.onerror=()=>reject(new Error(`Falha ao carregar ${src}`));
    document.head.appendChild(s);
  });

  function prefetchThree(){
    if(document.querySelector('link[data-globo-prefetch]')||typeof THREE!=='undefined')return;
    const l=document.createElement('link');
    l.rel='prefetch';l.as='script';l.href=THREE_SRC;l.crossOrigin='anonymous';
    l.dataset.globoPrefetch='1';
    document.head.appendChild(l);
  }

  async function start(){
    if(started)return;
    started=true;
    hero.dataset.globoLoading='true';
    try{
      if(typeof THREE==='undefined'){
        threePromise=threePromise||loadScript(THREE_SRC);
        await threePromise;
      }
      await loadScript('js/globo.js');
    }catch(error){
      hero.classList.add('sem-globo');
      console.warn(error.message);
    }finally{
      delete hero.dataset.globoLoading;
    }
  }

  // O poster torna o first paint imediato; a hidratação 3D ocorre quando o
  // navegador fica ocioso. Em Save-Data mantemos o poster até interação.
  const conn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  const economizar=!!conn?.saveData;
  if('requestIdleCallback' in window){
    requestIdleCallback(()=>{
      prefetchThree();
      if(!economizar)start();
    },{timeout:1400});
  }else{
    window.addEventListener('load',prefetchThree,{once:true});
  }

  const once={once:true,passive:true};
  hero.addEventListener('pointerenter',start,once);
  hero.addEventListener('pointerdown',start,once);
  hero.addEventListener('touchstart',start,once);
  hero.addEventListener('focusin',start,{once:true});
  canvas.style.cursor='grab';

  for(const b of document.querySelectorAll('[data-globo-tour]'))
    b.addEventListener('click',()=>{
      if(!hero.dataset.globoPronto){hero.dataset.globoTourPedido='1';start()}
    });
})();