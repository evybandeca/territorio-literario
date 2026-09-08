(function(){
  const id=new URLSearchParams(location.search).get('id');
  function hydrate(){
    if(typeof OBRAS==='undefined')return;
    const obra=OBRAS.find(o=>o.id===id),actions=document.querySelector('.work-hero__actions'),read=document.getElementById('link-leitura'),atlas=document.getElementById('link-atlas'),summary=document.getElementById('obra-territory-summary');
    if(!obra||!actions||!read||!atlas||!summary)return;
    const reader=typeof readerConfig==='function'?readerConfig(obra.id):null;
    actions.setAttribute('data-reader-available',reader?'true':'false');
    atlas.href=`atlas.html?busca=${encodeURIComponent(obra.titulo)}`;
    if(!reader){
      atlas.className='button';
      read.className='button button--ghost';
      read.textContent='Consultar texto externo';
      read.href=obra.link||'#';
      if(obra.link){read.target='_blank';read.rel='noopener'}
    }
    const corpora=window.CORPUS_PROFUNDO||{},corpus=corpora[obra.id]||(reader?corpora[reader.id]:null),entities=corpus?.place_entities||[],mentions=corpus?.place_mentions||[];
    const publicCount=obra.lugares?.length||0;
    const names=[...new Set(entities.map(e=>e.canonical_name||e.nome).filter(Boolean))].slice(0,3);
    const description=entities.length?`${entities.length} lugares textuais e ${mentions.length} ocorrências documentadas${names.length?`, incluindo ${names.join(', ')}`:''}.`:`${publicCount} ${publicCount===1?'lugar cartografado':'lugares cartografados'} nesta camada pública. Lugares sem geocodificação defensável permanecem no corpus textual.`;
    summary.innerHTML=`<div><div class="eyebrow">Território da obra</div><h2>Do texto ao mapa, sem inventar precisão.</h2><p>${description}</p><div class="work-territory-summary__stats"><span class="work-territory-summary__stat"><strong>${entities.length||publicCount}</strong> lugares</span><span class="work-territory-summary__stat"><strong>${mentions.length}</strong> ocorrências auditadas</span></div></div><a class="button button--ghost" href="${atlas.href}">Explorar território</a>`;
    summary.hidden=false;
  }
  addEventListener('tl:page-ready',hydrate);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(hydrate,0));else setTimeout(hydrate,0);
})();
