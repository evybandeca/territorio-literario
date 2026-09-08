(function(){
  if(window.__TL_PRODUCTION_POLISH__)return;window.__TL_PRODUCTION_POLISH__=true;
  const norm=s=>(s||'').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const live=document.createElement('div');live.className='tl-live-region';live.setAttribute('aria-live','polite');live.setAttribute('aria-atomic','true');document.body.appendChild(live);
  const announce=msg=>{live.textContent='';requestAnimationFrame(()=>live.textContent=msg)};
  const scriptPath=src=>new URL(src,location.href).pathname;
  const injectScript=src=>new Promise((resolve,reject)=>{const wanted=scriptPath(src),existing=[...document.scripts].find(s=>s.src&&new URL(s.src,location.href).pathname===wanted);if(existing){if(existing.dataset.tlLoaded==='true'||existing.readyState==='complete')return resolve();existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',reject,{once:true});setTimeout(resolve,0);return}const s=document.createElement('script');s.src=src;s.async=false;s.onload=()=>{s.dataset.tlLoaded='true';resolve()};s.onerror=reject;document.body.appendChild(s)});
  let catalogPromise=null,searchDataPromise=null;
  async function ensureCatalog(){if(!catalogPromise)catalogPromise=(async()=>{if(typeof OBRAS==='undefined')await injectScript('js/data.js')})();await catalogPromise}
  async function ensureSearchData(){
    if(!searchDataPromise)searchDataPromise=(async()=>{
      await ensureCatalog();
      if(typeof CORPUS_REGISTRY==='undefined'||typeof loadAllCorpora!=='function')await injectScript('js/corpus-registry.js');
      if(typeof loadAllCorpora==='function')await loadAllCorpora();
      if(typeof construirIndiceLugares!=='function')await injectScript('js/lugares.js');
    })();
    await searchDataPromise;
  }
  function searchEntries(){const entries=[
    {type:'Página',label:'Atlas',meta:'Cartografia literária',href:'atlas.html',text:'atlas mapa lugares territorio cartografia'},
    {type:'Página',label:'Biblioteca',meta:'Obras do acervo',href:'biblioteca.html',text:'biblioteca livros obras acervo'},
    {type:'Página',label:'Autores',meta:'Arquivo de autores',href:'autores.html',text:'autores escritores perfis'},
    {type:'Página',label:'Linha do Tempo',meta:'Cronologia do acervo',href:'linha-do-tempo.html',text:'linha tempo cronologia movimentos'},
    {type:'Página',label:'Sobre e Metodologia',meta:'Como pesquisamos',href:'sobre.html',text:'sobre metodologia pesquisa fonte evidencia'}
  ];
  if(typeof OBRAS==='undefined')return entries;
  OBRAS.forEach(o=>entries.push({type:'Obra',label:o.titulo,meta:`${o.autor} · ${o.movimento} · ${o.anoLabel||o.ano}`,href:`obra.html?id=${encodeURIComponent(o.id)}`,text:[o.titulo,o.autor,o.movimento,o.anoLabel||o.ano].join(' ')}));
  [...new Set(OBRAS.map(o=>o.autor))].forEach(a=>entries.push({type:'Autor',label:a,meta:`${OBRAS.filter(o=>o.autor===a).length} obra(s) no acervo`,href:`autor.html?nome=${encodeURIComponent(a)}`,text:a}));
  const places=new Map();
  if(typeof construirIndiceLugares==='function'){try{construirIndiceLugares().forEach(l=>{const key=norm(l.nome);if(!key)return;const p=places.get(key)||{nome:l.nome,obras:new Set()};(l.obras||[]).forEach(o=>p.obras.add(o.titulo));places.set(key,p)})}catch(_){}}
  if(!places.size)OBRAS.forEach(o=>(o.lugares||[]).forEach(l=>{const key=norm(l.nome);if(!key)return;const p=places.get(key)||{nome:l.nome,obras:new Set()};p.obras.add(o.titulo);places.set(key,p)}));
  places.forEach(p=>entries.push({type:'Lugar',label:p.nome,meta:`${p.obras.size} obra${p.obras.size===1?'':'s'} relacionada${p.obras.size===1?'':'s'}`,href:`atlas.html?busca=${encodeURIComponent(p.nome)}`,text:[p.nome,...p.obras].join(' ')}));
  return entries;
  }
  const dialog=document.createElement('dialog');dialog.className='global-search';dialog.setAttribute('aria-label','Busca global');dialog.innerHTML=`<div class="global-search__shell"><div class="global-search__head"><strong>Buscar no Território Literário</strong><button class="global-search__close" type="button" aria-label="Fechar busca">×</button></div><div class="global-search__input-wrap"><input class="global-search__input" type="search" autocomplete="off" placeholder="Obra, autor, lugar ou seção…" aria-label="Buscar no portal"></div><div class="global-search__results" role="listbox" aria-label="Resultados da busca"></div></div>`;document.body.appendChild(dialog);
  const input=dialog.querySelector('.global-search__input'),results=dialog.querySelector('.global-search__results');let active=-1,current=[];
  function renderSearch(){const q=norm(input.value);const all=searchEntries();current=(q?all.filter(e=>norm(e.text+' '+e.label+' '+e.meta).includes(q)):all.filter(e=>e.type==='Página')).slice(0,18);active=current.length?0:-1;const grouped=new Map();current.forEach((e,i)=>{const arr=grouped.get(e.type)||[];arr.push({...e,index:i});grouped.set(e.type,arr)});results.innerHTML=current.length?[...grouped.entries()].map(([type,arr])=>`<section class="global-search__group"><div class="global-search__group-title">${esc(type)}</div>${arr.map(e=>`<a class="global-search__item" role="option" aria-selected="${e.index===active}" data-index="${e.index}" href="${esc(e.href)}"><span><strong>${esc(e.label)}</strong><span>${esc(e.meta)}</span></span><span class="global-search__type">${esc(type)}</span></a>`).join('')}</section>`).join(''):`<div class="global-search__empty">Nenhum resultado para “${esc(input.value)}”.</div>`;announce(`${current.length} resultado${current.length===1?'':'s'} encontrado${current.length===1?'':'s'}.`)}
  function syncActive(){results.querySelectorAll('.global-search__item').forEach((el,i)=>el.setAttribute('aria-selected',String(i===active)));results.querySelector(`.global-search__item[data-index="${active}"]`)?.scrollIntoView({block:'nearest'})}
  async function openSearch(){await ensureSearchData().catch(()=>{});if(!dialog.open)dialog.showModal();renderSearch();requestAnimationFrame(()=>input.focus())}
  function closeSearch(){if(dialog.open)dialog.close()}
  document.querySelectorAll('.site-search-trigger').forEach(b=>b.addEventListener('click',openSearch));
  dialog.querySelector('.global-search__close').addEventListener('click',closeSearch);dialog.addEventListener('click',e=>{if(e.target===dialog)closeSearch()});
  input.addEventListener('input',renderSearch);input.addEventListener('keydown',e=>{if(!current.length)return;if(e.key==='ArrowDown'){e.preventDefault();active=(active+1)%current.length;syncActive()}else if(e.key==='ArrowUp'){e.preventDefault();active=(active-1+current.length)%current.length;syncActive()}else if(e.key==='Enter'){const target=results.querySelector(`.global-search__item[data-index="${active}"]`);if(target){e.preventDefault();target.click()}}});
  document.addEventListener('keydown',e=>{const tag=document.activeElement?.tagName;if((e.key==='k'&&(e.metaKey||e.ctrlKey))||(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(tag))){e.preventDefault();openSearch()}});
  document.addEventListener('click',e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const a=e.target.closest('a[href]');if(!a||a.target==='_blank'||a.hasAttribute('download')||a.getAttribute('href')?.startsWith('#'))return;try{const u=new URL(a.href,location.href);if(u.origin===location.origin){document.body.classList.add('tl-route-transition')}}catch(_){}});
  window.addEventListener('pageshow',()=>document.body.classList.remove('tl-route-transition'));
  function contextualRail(){const page=location.pathname.split('/').pop()||'index.html';if(!['obra.html','autor.html','atlas.html'].includes(page))return;const root=document.querySelector('[data-site-header]');if(!root||root.querySelector('.context-rail'))return;const rail=document.createElement('div');rail.className='context-rail';let content='';
    if(page==='obra.html'){const id=new URLSearchParams(location.search).get('id');if(typeof OBRAS!=='undefined'){const sorted=[...OBRAS].sort((a,b)=>a.ano-b.ano||a.titulo.localeCompare(b.titulo,'pt-BR')),i=sorted.findIndex(o=>o.id===id),o=sorted[i];if(o){const prev=sorted[i-1],next=sorted[i+1];content=`<a href="biblioteca.html">Biblioteca</a><span class="context-rail__sep">/</span><span class="context-rail__current">${esc(o.titulo)}</span><span class="context-rail__spacer"></span>${prev?`<a class="context-rail__neighbor" href="obra.html?id=${encodeURIComponent(prev.id)}">← ${esc(prev.titulo)}</a>`:''}${next?`<a class="context-rail__neighbor" href="obra.html?id=${encodeURIComponent(next.id)}">${esc(next.titulo)} →</a>`:''}`}}
    }else if(page==='autor.html'){const nome=new URLSearchParams(location.search).get('nome');content=`<a href="autores.html">Autores</a><span class="context-rail__sep">/</span><span class="context-rail__current">${esc(nome||'Perfil')}</span>`}
    else{const busca=new URLSearchParams(location.search).get('busca');content=`<a href="atlas.html">Atlas</a>${busca?`<span class="context-rail__sep">/</span><span class="context-rail__current">Busca: ${esc(busca)}</span>`:''}`}
    if(!content)return;rail.innerHTML=`<div class="container context-rail__inner">${content}</div>`;root.appendChild(rail)
  }
  window.addEventListener('load',async()=>{await ensureCatalog().catch(()=>{});contextualRail();document.querySelector('#conteudo')?.classList.add('page-ready-fade')},{once:true});
  document.addEventListener('tl:page-ready',()=>{document.querySelector('#conteudo')?.classList.add('page-ready-fade');announce('Conteúdo atualizado e pronto.')});
})();
