(function(){
  const id=new URLSearchParams(location.search).get('id'),config=typeof readerConfig==='function'?readerConfig(id):null;
  if(!config)return;
  const safeGet=key=>{try{return localStorage.getItem(key)}catch{return null}};
  function state(){
    try{
      const raw=safeGet('tl-reader:last');
      if(!raw)return null;
      const parsed=JSON.parse(raw);
      return parsed?.workId===config.id&&Number.isFinite(Number(parsed.chapter))?parsed:null;
    }catch{return null}
  }
  function apply(){
    const link=document.getElementById('link-leitura'),actions=document.querySelector('.work-hero__actions');
    if(!link)return false;
    const progress=state(),desired=progress?`leitura.html?obra=${encodeURIComponent(config.id)}&capitulo=${encodeURIComponent(progress.chapter)}`:`leitura.html?obra=${encodeURIComponent(config.id)}`;
    if(link.getAttribute('href')!==desired)link.setAttribute('href',desired);
    const label=progress?'Continuar leitura':'Ler agora';
    if(link.textContent!==label)link.textContent=label;
    link.removeAttribute('target');
    link.removeAttribute('rel');
    actions?.setAttribute('data-reader-available','true');
    return true;
  }
  let observer;
  function watch(){
    const link=document.getElementById('link-leitura');
    if(!link)return;
    apply();
    observer?.disconnect();
    observer=new MutationObserver(()=>apply());
    observer.observe(link,{attributes:true,attributeFilter:['href','target','rel'],childList:true,characterData:true,subtree:true});
  }
  addEventListener('tl:page-ready',watch);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch);else watch();
  addEventListener('storage',e=>{if(e.key==='tl-reader:last')apply()});
  setTimeout(watch,0);
  setTimeout(watch,250);
})();
