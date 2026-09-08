(function(){
  const id=new URLSearchParams(location.search).get('id'),config=typeof readerConfig==='function'?readerConfig(id):null;
  if(!config)return;
  const desired=`leitura.html?obra=${encodeURIComponent(config.id)}`;
  function apply(){
    const link=document.getElementById('link-leitura');
    if(!link)return false;
    if(link.getAttribute('href')!==desired)link.setAttribute('href',desired);
    if(link.textContent!=='Ler esta obra')link.textContent='Ler esta obra';
    link.removeAttribute('target');
    link.removeAttribute('rel');
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
  setTimeout(watch,0);
  setTimeout(watch,250);
})();
