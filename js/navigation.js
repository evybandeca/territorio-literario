(function(){
  const routes=[['index.html','Início'],['atlas.html','Atlas'],['biblioteca.html','Biblioteca'],['autores.html','Autores'],['linha-do-tempo.html','Linha do Tempo'],['sobre.html','Sobre']];
  const current=(location.pathname.split('/').pop()||'index.html').split('?')[0];
  if(!document.querySelector('link[rel="icon"]')){const l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href='assets/favicon.svg';document.head.appendChild(l)}
  const desc=document.querySelector('meta[name="description"]')?.content||'Território Literário — atlas cultural da literatura brasileira.';
  const canonicalUrl=`https://evybandeca.github.io/territorio-literario/${current==='index.html'?'':current}`;
  if(!document.querySelector('link[rel="canonical"]')){const c=document.createElement('link');c.rel='canonical';c.href=canonicalUrl;document.head.appendChild(c)}
  [['og:title',document.title],['og:description',desc],['og:type','website'],['og:url',canonicalUrl]].forEach(([property,content])=>{if(!document.querySelector(`meta[property="${property}"]`)){const m=document.createElement('meta');m.setAttribute('property',property);m.content=content;document.head.appendChild(m)}});
  document.querySelectorAll('[data-site-header]').forEach(root=>{
    const links=routes.map(([href,label])=>`<a href="${href}"${current===href?' aria-current="page"':''}>${label}</a>`).join('');
    root.innerHTML=`<a class="skip-link" href="#conteudo">Pular para o conteúdo</a><header class="site-header"><div class="container site-header__inner"><a class="brand" href="index.html" aria-label="Território Literário — início"><span class="brand__mark" aria-hidden="true">TL</span><span>Território Literário</span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button><nav class="site-nav" id="site-nav" aria-label="Navegação principal">${links}</nav></div></header>`;
    const btn=root.querySelector('.nav-toggle'),nav=root.querySelector('.site-nav');
    btn.addEventListener('click',()=>{const open=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open)});
    nav.addEventListener('click',e=>{if(e.target.closest('a')){btn.setAttribute('aria-expanded','false');nav.classList.remove('is-open')}});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){btn.setAttribute('aria-expanded','false');nav.classList.remove('is-open');btn.focus()}});
  });
})();
