(function(){
  const self=document.currentScript;
  const mode=self?.dataset.mode||'all';
  const pageScript=self?.dataset.pageScript;
  const afterScript=self?.dataset.afterScript;
  document.body.dataset.loading='true';
  function inject(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error(`Falha ao iniciar módulo: ${src}`));document.body.appendChild(s)})}
  (async()=>{
    try{
      if(mode==='single'){
        const id=new URLSearchParams(location.search).get('id');
        if(id)await window.loadCorpusById(id);
      }else await window.loadAllCorpora();
    }catch(error){console.warn('[Território Literário] corpus parcial:',error)}
    if(pageScript)await inject(pageScript);
    if(afterScript)await inject(afterScript);
    delete document.body.dataset.loading;
    document.dispatchEvent(new CustomEvent('tl:page-ready',{detail:{mode,pageScript}}));
  })().catch(error=>{delete document.body.dataset.loading;document.dispatchEvent(new CustomEvent('tl:page-ready',{detail:{mode,pageScript,error:true}}));console.error('[Território Literário] falha de inicialização:',error)});
})();
