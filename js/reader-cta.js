(function(){
  function apply(){
    const id=new URLSearchParams(location.search).get('id'),config=typeof readerConfig==='function'?readerConfig(id):null,link=document.getElementById('link-leitura');
    if(!link||!config)return;
    link.href=`leitura.html?obra=${encodeURIComponent(config.id)}`;
    link.textContent='Ler esta obra';
    link.removeAttribute('target');
    link.removeAttribute('rel');
  }
  addEventListener('tl:page-ready',apply);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
  setTimeout(apply,0);
})();
