(function(){
  if(window.__TL_MOTION_UX__)return;
  window.__TL_MOTION_UX__=true;

  const root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const readerPage=(location.pathname.split('/').pop()||'index.html')==='leitura.html';
  const canSmooth=matchMedia('(min-width: 768px)').matches&&!readerPage;
  const CDN={
    lenis:'https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js',
    gsap:'https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js',
    scrollTrigger:'https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js'
  };

  const markReady=(mode='enhanced')=>{
    root.dataset.motion=mode;
    document.documentElement.classList.add('motion-ready');
    document.dispatchEvent(new CustomEvent('tl:motion-ready',{detail:{mode}}));
  };

  if(reduced.matches){
    root.classList.add('motion-reduced');
    markReady('reduced');
    return;
  }

  function loadScript(src,test){
    if(test())return Promise.resolve();
    const existing=[...document.scripts].find(script=>script.src===src);
    if(existing)return new Promise((resolve,reject)=>{
      if(test())return resolve();
      existing.addEventListener('load',resolve,{once:true});
      existing.addEventListener('error',reject,{once:true});
    });
    return new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=src;
      script.async=true;
      script.crossOrigin='anonymous';
      script.onload=resolve;
      script.onerror=()=>reject(new Error(`Falha ao carregar ${src}`));
      document.head.appendChild(script);
    });
  }

  function setupCardSpotlight(){
    if(!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
    const cards=document.querySelectorAll('.entry-card,.collection-card,.book-object,.author-catalog-card,.timeline-card');
    cards.forEach(card=>{
      card.addEventListener('pointermove',event=>{
        const box=card.getBoundingClientRect();
        card.style.setProperty('--motion-x',`${event.clientX-box.left}px`);
        card.style.setProperty('--motion-y',`${event.clientY-box.top}px`);
      },{passive:true});
    });
  }

  function setupGsap(){
    const {gsap,ScrollTrigger}=window;
    if(!gsap||!ScrollTrigger)return;
    gsap.registerPlugin(ScrollTrigger);

    const mm=gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      const hero=document.querySelector('.globo-texto');
      if(hero){
        gsap.from(hero.children,{opacity:0,y:18,duration:.72,stagger:.075,ease:'power2.out',clearProps:'opacity,transform'});
      }else{
        const pageHead=document.querySelector('.page-hero,.obra-hero,.reader-header,.atlas-intro');
        if(pageHead)gsap.from(pageHead,{opacity:0,y:12,duration:.55,ease:'power2.out',clearProps:'opacity,transform'});
      }

      const revealGroups=document.querySelectorAll('.section,.content-section,.obra-section');
      revealGroups.forEach(section=>{
        const targets=section.querySelectorAll(':scope > .container > .eyebrow,:scope > .container > .section-title,:scope > .container > .section-intro,.entry-card,.collection-card,.book-object,.author-catalog-card,.timeline-card');
        if(!targets.length)return;
        gsap.from(targets,{scrollTrigger:{trigger:section,start:'top 88%',once:true},opacity:0,y:14,duration:.5,stagger:.045,ease:'power2.out',clearProps:'opacity,transform'});
      });

      gsap.utils.toArray('.map-frame,.atlas-map-shell,.reader-surface').forEach(surface=>{
        gsap.from(surface,{scrollTrigger:{trigger:surface,start:'top 92%',once:true},opacity:0,scale:.992,duration:.6,ease:'power2.out',clearProps:'opacity,transform'});
      });

      return()=>ScrollTrigger.getAll().forEach(trigger=>trigger.kill());
    });
  }

  function setupLenis(){
    if(!canSmooth||!window.Lenis||!window.gsap||!window.ScrollTrigger)return null;
    const lenis=new window.Lenis({
      autoRaf:false,
      smoothWheel:true,
      syncTouch:false,
      duration:1.05,
      anchors:{offset:-72},
      prevent:node=>Boolean(node?.closest?.('.leaflet-container,dialog,.global-search__results,.reader-shell,[data-lenis-prevent]'))
    });
    lenis.on('scroll',window.ScrollTrigger.update);
    const tick=time=>lenis.raf(time*1000);
    window.gsap.ticker.add(tick);
    window.gsap.ticker.lagSmoothing(0);
    window.__TL_LENIS__=lenis;
    return()=>{
      window.gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__TL_LENIS__;
    };
  }

  async function init(){
    try{
      await Promise.all([
        loadScript(CDN.gsap,()=>Boolean(window.gsap)),
        canSmooth?loadScript(CDN.lenis,()=>Boolean(window.Lenis)):Promise.resolve()
      ]);
      await loadScript(CDN.scrollTrigger,()=>Boolean(window.ScrollTrigger));
      setupGsap();
      setupLenis();
      setupCardSpotlight();
      requestAnimationFrame(()=>window.ScrollTrigger?.refresh());
      markReady('enhanced');
    }catch(error){
      console.warn('[Território Literário] Motion UX em fallback nativo.',error);
      setupCardSpotlight();
      markReady('native');
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
