(function(){
  const hero=document.getElementById('globo-hero'),canvas=document.getElementById('globo-canvas');
  if(!hero||!canvas)return;
  let started=false;
  const loadScript=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.defer=true;s.onload=resolve;s.onerror=()=>reject(new Error(`Falha ao carregar ${src}`));document.head.appendChild(s)});
  async function start(){
    if(started)return;started=true;
    try{
      if(typeof THREE==='undefined')await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
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
})();
