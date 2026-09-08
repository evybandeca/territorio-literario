(function(){
  const busca=document.getElementById('busca-obras'),mov=document.getElementById('filtro-movimento'),ord=document.getElementById('ordenar-obras'),lista=document.getElementById('lista-obras'),contador=document.getElementById('contador-obras'),metricas=document.getElementById('biblioteca-metricas'),rail=document.getElementById('movimentos-rail');
  if(!busca||!mov||!ord||!lista)return;
  const STORE='tl:biblioteca:filtros';
  const norm=s=>(s||'').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const movimentos=[...new Set(OBRAS.map(o=>o.movimento))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
  movimentos.forEach(m=>{const op=document.createElement('option');op.value=m;op.textContent=m;mov.appendChild(op)});
  const corpus=window.CORPUS_PROFUNDO||{},corpusIds=new Set(Object.keys(corpus)),autores=new Set(OBRAS.map(o=>o.autor));
  if(metricas)metricas.innerHTML=`<div class="page-metric"><strong>${OBRAS.length}</strong><span>obras no acervo</span></div><div class="page-metric"><strong>${autores.size}</strong><span>autores</span></div><div class="page-metric"><strong>${movimentos.length}</strong><span>movimentos</span></div><div class="page-metric"><strong>${corpusIds.size}</strong><span>corpora em pesquisa</span></div>`;
  const params=new URLSearchParams(location.search),autorInicial=params.get('autor');
  try{const saved=JSON.parse(localStorage.getItem(STORE)||'{}');if(!autorInicial){busca.value=saved.busca||'';if(movimentos.includes(saved.movimento))mov.value=saved.movimento||'';if(['ano','titulo','autor'].includes(saved.ordem))ord.value=saved.ordem}}catch(_){ }
  const persist=()=>{if(autorInicial)return;localStorage.setItem(STORE,JSON.stringify({busca:busca.value,movimento:mov.value,ordem:ord.value}))};
  const tons=['#183a32','#274c59','#7a4933','#59463b','#3e5547','#6f4a51','#425a66','#745a36'];
  if(rail){rail.innerHTML=`<button type="button" class="movement-chip is-active" data-movement="">Todos</button>${movimentos.map(m=>`<button type="button" class="movement-chip" data-movement="${m}">${m}</button>`).join('')}`;rail.addEventListener('click',e=>{const b=e.target.closest('.movement-chip');if(!b)return;mov.value=b.dataset.movement||'';rail.querySelectorAll('.movement-chip').forEach(x=>x.classList.toggle('is-active',x===b));persist();render()})}
  function syncRail(){if(!rail)return;rail.querySelectorAll('.movement-chip').forEach(b=>b.classList.toggle('is-active',(b.dataset.movement||'')===mov.value))}
  function render(){
    const q=norm(busca.value),m=mov.value;
    let dados=OBRAS.filter(o=>(!q||norm(o.titulo).includes(q)||norm(o.autor).includes(q))&&(!m||o.movimento===m)&&(!autorInicial||o.autor===autorInicial));
    dados=[...dados].sort((a,b)=>ord.value==='titulo'?a.titulo.localeCompare(b.titulo,'pt-BR'):ord.value==='autor'?a.autor.localeCompare(b.autor,'pt-BR')||a.ano-b.ano:a.ano-b.ano);
    contador.textContent=`${dados.length} ${dados.length===1?'obra em exibição':'obras em exibição'}${autorInicial?` · ${autorInicial}`:''}`;
    syncRail();
    if(!dados.length){lista.innerHTML='<div class="empty-state">Nenhuma obra corresponde aos filtros atuais.</div>';return}
    lista.innerHTML=dados.map((o,i)=>{const profundo=corpus[o.id],mentions=(profundo?.place_mentions||[]).length,entities=(profundo?.place_entities||[]).length,tom=tons[Math.abs((o.movimento||'').split('').reduce((a,c)=>a+c.charCodeAt(0),0))%tons.length];return `<a class="book-object" href="obra.html?id=${encodeURIComponent(o.id)}" style="--book-tone:${tom}"><div class="book-cover"><span class="book-index">Acervo ${String(i+1).padStart(2,'0')} · ${o.movimento}</span><h2 class="book-title">${o.titulo}</h2><span class="book-author">${o.autor}</span><span class="book-year">${o.anoLabel||o.ano}</span></div><div class="book-info"><div class="book-info-top"><span>${o.movimento}</span><span>${o.anoLabel||o.ano}</span></div><p class="book-description">${o.sinopse}</p><div class="book-research">${o.lugares?.length?`<span class="book-pill">${o.lugares.length} cartografado${o.lugares.length===1?'':'s'}</span>`:''}${profundo?`<span class="book-pill">${entities} entidades</span><span class="book-pill">${mentions} ocorrências</span>`:'<span class="book-pill">cobertura editorial</span>'}</div></div></a>`}).join('');
  }
  busca.addEventListener('input',()=>{persist();render()});mov.addEventListener('change',()=>{persist();render()});ord.addEventListener('change',()=>{persist();render()});render();
})();