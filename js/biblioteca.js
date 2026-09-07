(function(){
  const busca=document.getElementById('busca-obras'),mov=document.getElementById('filtro-movimento'),ord=document.getElementById('ordenar-obras'),lista=document.getElementById('lista-obras'),contador=document.getElementById('contador-obras');
  if(!busca||!mov||!ord||!lista)return;
  const norm=s=>(s||'').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  [...new Set(OBRAS.map(o=>o.movimento))].sort((a,b)=>a.localeCompare(b,'pt-BR')).forEach(m=>{const op=document.createElement('option');op.value=m;op.textContent=m;mov.appendChild(op)});
  const params=new URLSearchParams(location.search);const autorInicial=params.get('autor');
  function render(){
    const q=norm(busca.value),m=mov.value;
    let dados=OBRAS.filter(o=>(!q||norm(o.titulo).includes(q)||norm(o.autor).includes(q))&&(!m||o.movimento===m)&&(!autorInicial||o.autor===autorInicial));
    dados=[...dados].sort((a,b)=>ord.value==='titulo'?a.titulo.localeCompare(b.titulo,'pt-BR'):ord.value==='autor'?a.autor.localeCompare(b.autor,'pt-BR')||a.ano-b.ano:a.ano-b.ano);
    contador.textContent=`${dados.length} ${dados.length===1?'obra encontrada':'obras encontradas'}${autorInicial?` para ${autorInicial}`:''}.`;
    if(!dados.length){lista.innerHTML='<div class="empty-state">Nenhuma obra corresponde aos filtros atuais.</div>';return}
    lista.innerHTML=dados.map(o=>`<a class="card library-card" href="obra.html?id=${encodeURIComponent(o.id)}"><span class="card__meta">${o.movimento} · ${o.anoLabel||o.ano}</span><h2 class="card__title">${o.titulo}</h2><p class="card__body"><strong>${o.autor}</strong><br>${o.sinopse}</p>${o.lugares?.length?`<span class="badge">${o.lugares.length} ${o.lugares.length===1?'território':'territórios'}</span>`:''}</a>`).join('');
  }
  [busca,mov,ord].forEach(el=>el.addEventListener(el===busca?'input':'change',render));render();
})();
