(function(){
  const busca=document.getElementById('busca-autores'),lista=document.getElementById('lista-autores'),contador=document.getElementById('contador-autores');if(!busca||!lista)return;
  const mapa=new Map();OBRAS.forEach(o=>{const atual=mapa.get(o.autor)||{nome:o.autor,obras:[],movimentos:new Set(),anos:[]};atual.obras.push(o);atual.movimentos.add(o.movimento);atual.anos.push(o.ano);mapa.set(o.autor,atual)});
  const autores=[...mapa.values()].sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'));
  const norm=s=>(s||'').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  function render(){const q=norm(busca.value),dados=autores.filter(a=>!q||norm(a.nome).includes(q));contador.textContent=`${dados.length} ${dados.length===1?'autor':'autores'} no resultado.`;lista.innerHTML=dados.length?dados.map(a=>{const min=Math.min(...a.anos),max=Math.max(...a.anos);return `<a class="card author-card" href="biblioteca.html?autor=${encodeURIComponent(a.nome)}"><span class="card__meta">${[...a.movimentos].join(' · ')}</span><h2 class="card__title">${a.nome}</h2><p class="card__body">${a.obras.length} ${a.obras.length===1?'obra':'obras'} no acervo · ${min===max?min:`${min}–${max}`}</p><span class="badge">Ver obras</span></a>`}).join(''):'<div class="empty-state">Nenhum autor corresponde à busca.</div>'}
  busca.addEventListener('input',render);render();
})();
