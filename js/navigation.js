(function(){
  const routes=[['index.html','Início'],['atlas.html','Atlas'],['biblioteca.html','Biblioteca'],['autores.html','Autores'],['linha-do-tempo.html','Linha do Tempo'],['sobre.html','Sobre']];
  const current=(location.pathname.split('/').pop()||'index.html').split('?')[0],params=new URLSearchParams(location.search),SITE='https://evybandeca.github.io/territorio-literario/';
  if(!document.querySelector('link[rel="icon"]')){const l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href='assets/favicon.svg';document.head.appendChild(l)}
  if(!document.querySelector('link[href="css/production-polish.css"]')){const l=document.createElement('link');l.rel='stylesheet';l.href='css/production-polish.css';document.head.appendChild(l)}
  const canonicalPath=()=>{if(current==='index.html')return '';if(current==='obra.html'&&params.get('id'))return `obra.html?id=${encodeURIComponent(params.get('id'))}`;if(current==='autor.html'&&params.get('nome'))return `autor.html?nome=${encodeURIComponent(params.get('nome'))}`;return current};
  const canonicalUrl=SITE+canonicalPath();
  let canonical=document.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}canonical.href=canonicalUrl;
  function meta(attr,key,content){let m=document.querySelector(`meta[${attr}="${key}"]`);if(!m){m=document.createElement('meta');m.setAttribute(attr,key);document.head.appendChild(m)}m.content=content||'';return m}
  function baseMeta(){const desc=document.querySelector('meta[name="description"]')?.content||'Território Literário — atlas cultural da literatura brasileira.';meta('property','og:title',document.title);meta('property','og:description',desc);meta('property','og:type','website');meta('property','og:url',canonicalUrl);meta('property','og:site_name','Território Literário');meta('name','twitter:card','summary_large_image');meta('name','twitter:title',document.title);meta('name','twitter:description',desc)}
  function putJsonLd(id,data){let s=document.getElementById(id);if(!s){s=document.createElement('script');s.id=id;s.type='application/ld+json';document.head.appendChild(s)}s.textContent=JSON.stringify(data)}
  function structuredData(){
    if(current==='index.html')putJsonLd('tl-jsonld-site',{'@context':'https://schema.org','@type':'WebSite',name:'Território Literário',url:SITE,inLanguage:'pt-BR',description:document.querySelector('meta[name="description"]')?.content||''});
    if(current==='obra.html'&&typeof OBRAS!=='undefined'){const id=params.get('id'),o=OBRAS.find(x=>x.id===id);if(o){const title=`${o.titulo} — Território Literário`,desc=o.sinopse||document.querySelector('meta[name="description"]')?.content||'';meta('property','og:title',title);meta('property','og:description',desc);meta('property','og:type','book');meta('name','twitter:title',title);meta('name','twitter:description',desc);putJsonLd('tl-jsonld-entity',{'@context':'https://schema.org','@type':'Book',name:o.titulo,author:{'@type':'Person',name:o.autor},datePublished:String(o.ano),genre:o.movimento,description:desc,url:canonicalUrl,sameAs:o.link||undefined,inLanguage:'pt-BR'})}}
    else if(current==='autor.html'){const nome=params.get('nome');if(nome){const title=`${nome} — Território Literário`;meta('property','og:title',title);meta('property','og:type','profile');meta('name','twitter:title',title);putJsonLd('tl-jsonld-entity',{'@context':'https://schema.org','@type':'Person',name:nome,url:canonicalUrl})}}
    else if(current!=='index.html')putJsonLd('tl-jsonld-page',{'@context':'https://schema.org','@type':'CreativeWork',name:document.title,url:canonicalUrl,inLanguage:'pt-BR',isPartOf:{'@type':'WebSite',name:'Território Literário',url:SITE}});
  }
  baseMeta();structuredData();
  document.querySelectorAll('[data-site-header]').forEach(root=>{
    const links=routes.map(([href,label])=>`<a href="${href}"${current===href?' aria-current="page"':''}>${label}</a>`).join('');
    root.innerHTML=`<a class="skip-link" href="#conteudo">Pular para o conteúdo</a><header class="site-header"><div class="container site-header__inner"><a class="brand" href="index.html" aria-label="Território Literário — início"><span class="brand__mark" aria-hidden="true">TL</span><span>Território Literário</span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button><nav class="site-nav" id="site-nav" aria-label="Navegação principal">${links}</nav><button class="site-search-trigger" type="button" aria-label="Buscar em todo o portal"><span>Buscar</span><kbd>⌘K</kbd><span aria-hidden="true">⌕</span></button></div></header>`;
    const btn=root.querySelector('.nav-toggle'),nav=root.querySelector('.site-nav');
    btn.addEventListener('click',()=>{const open=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open)});
    nav.addEventListener('click',e=>{if(e.target.closest('a')){btn.setAttribute('aria-expanded','false');nav.classList.remove('is-open')}});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){btn.setAttribute('aria-expanded','false');nav.classList.remove('is-open');btn.focus()}});
  });
  window.addEventListener('load',()=>{baseMeta();structuredData()},{once:true});document.addEventListener('tl:page-ready',()=>{baseMeta();structuredData()});
  if(!document.querySelector('script[src="js/production-polish.js"]')){const s=document.createElement('script');s.src='js/production-polish.js';document.body.appendChild(s)}
})();
