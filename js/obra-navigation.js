(function(){
  const corpo=document.getElementById('conteudo');if(!corpo)return;
  const overview=corpo.querySelector('.obra-texto');if(overview)overview.id='visao-geral';
  const territory=corpo.querySelector('.mapa-bloco');if(territory)territory.id='territorio';
  const blocos=[...corpo.querySelectorAll('.corpus-bloco')];
  const byHeading=(texto)=>blocos.find(b=>{const h=b.querySelector('h3');return h&&h.textContent.toLowerCase().includes(texto)});
  const chars=byHeading('personagens');if(chars)chars.id='personagens';
  const events=byHeading('eventos');if(events)events.id='eventos';
  const evidence=blocos.find(b=>b.querySelector('.mencoes-verificadas'))||byHeading('ocorrências');if(evidence)evidence.id='evidencias';
  const source=byHeading('edição-base');if(source&&!source.id)source.id='fonte-base';
  const items=[['visao-geral','Visão geral'],['territorio','Território'],['personagens','Personagens'],['eventos','Eventos'],['evidencias','Evidências']].filter(([id])=>document.getElementById(id));
  if(items.length<2)return;
  const nav=document.createElement('nav');nav.className='obra-subnav';nav.setAttribute('aria-label','Navegação interna da obra');nav.innerHTML=`<div class="container obra-subnav__inner">${items.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</div>`;
  const header=document.querySelector('.obra-header');header.insertAdjacentElement('afterend',nav);
  const links=[...nav.querySelectorAll('a')];const sections=items.map(([id])=>document.getElementById(id));
  const obs=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;links.forEach(a=>a.classList.toggle('is-active',a.getAttribute('href')===`#${visible.target.id}`))},{rootMargin:'-28% 0px -60% 0px',threshold:[0,.25,.5]});sections.forEach(s=>obs.observe(s));
})();