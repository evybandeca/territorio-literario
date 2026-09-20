(function(){
  const canvas=document.getElementById('globo-canvas');
  if(!canvas||typeof THREE==='undefined')return;
  const hero=document.getElementById('globo-hero');
  if(!hero)return;
  const dica=document.getElementById('globo-dica');

  // Ajustes de cena concentrados num só lugar, alinhados à paleta editorial do portal.
  const CFG={
    raio:1,
    // A carta náutica vem de um asset vetorial local pré-computado.
    atmosferaCor:0xd9bd8a,
    atmosferaIntensidade:.34,
    atmosferaDifusao:1.5,   // maior = halo mais difuso; acima de ~2 vira névoa e transborda o hero
    rotacaoInicial:-.74,    // enquadra a América do Sul, onde está todo o acervo
    inclinacaoInicial:.22,  // leve mergulho inicial; depois o trackball é totalmente livre
    trackballRaio:.94,      // esfera virtual de manipulação sob o cursor
    zoomMin:2.72,
    zoomMax:4.20,
    zoomSensibilidade:.0022,
    velocidadeAuto:.05,     // rad/s
    fpsMax:30,
    limiarFrente:.12,       // produto escalar mínimo para o marcador estar voltado à câmera
    limiarArrasto:6,        // px de deslocamento que já não contam como clique
    tourDuracao:1500,       // ms de viagem entre paradas
    tourEspera:9000         // ms de permanência em cada parada
  };

  const descartaveis=[];
  const registrar=o=>{descartaveis.push(o);return o};

  try{
    const scene=new THREE.Scene();
    const baixaDensidade=window.devicePixelRatio<1.5;
    const renderer=new THREE.WebGLRenderer({canvas,antialias:baixaDensidade,alpha:true,powerPreference:'low-power'});
    let w=hero.clientWidth,h=hero.clientHeight;
    renderer.setSize(w,h,false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
    renderer.outputEncoding=THREE.sRGBEncoding;

    const camera=new THREE.PerspectiveCamera(42,w/h,.1,100);
    camera.position.z=3.35;
    const group=new THREE.Group();
    scene.add(group);

    // A cartografia é pré-computada como SVG versionado: o navegador não precisa
    // reconstruir 2.048×1.024 px nem percorrer o dataset Natural Earth no first use.
    const textureLoader=new THREE.TextureLoader();
    const geometry=registrar(new THREE.SphereGeometry(CFG.raio,48,32));
    const globeMaterial=registrar(new THREE.MeshPhongMaterial({
      color:0xe7d5ae,shininess:2,specular:0x2a2117
    }));
    const globeMesh=new THREE.Mesh(geometry,globeMaterial);
    group.add(globeMesh);
    let texturaPronta=false;
    textureLoader.load('assets/globe-nautical-map.svg',texture=>{
      texture.encoding=THREE.sRGBEncoding;
      texture.anisotropy=Math.min(6,renderer.capabilities.getMaxAnisotropy());
      registrar(texture);
      globeMaterial.map=texture;
      globeMaterial.color.set(0xffffff);
      globeMaterial.needsUpdate=true;
      texturaPronta=true;
      hero.dataset.globoTextura='ready';
      desenhar();
      requestAnimationFrame(()=>{
        hero.classList.add('globo-ativo');
        hero.dataset.globoPronto='true';
        if(hero.dataset.globoTourPedido==='1'){delete hero.dataset.globoTourPedido;abrirTour()}
      });
    },undefined,()=>{
      hero.classList.add('sem-globo');
      console.warn('Falha ao carregar a cartografia do globo.');
    });

    const graticuleGeometry=registrar(new THREE.SphereGeometry(CFG.raio*1.006,24,16));
    const graticuleMaterial=registrar(new THREE.MeshBasicMaterial({color:new THREE.Color(0xd7c6a5).convertSRGBToLinear(),wireframe:true,transparent:true,opacity:.07,depthWrite:false}));
    group.add(new THREE.Mesh(graticuleGeometry,graticuleMaterial));

    // Halo atmosférico por Fresnel (BackSide): custo de um shader simples, sem textura adicional.
    const atmosferaGeometry=registrar(new THREE.SphereGeometry(CFG.raio*1.045,32,24));
    const atmosferaMaterial=registrar(new THREE.ShaderMaterial({
      uniforms:{
        corAtmosfera:{value:new THREE.Color(CFG.atmosferaCor).convertSRGBToLinear()},
        intensidade:{value:CFG.atmosferaIntensidade},
        expoente:{value:Math.max(.5,5-CFG.atmosferaDifusao)}
      },
      vertexShader:'varying vec3 vNormal;varying vec3 vPosicao;void main(){vNormal=normalize(normalMatrix*normal);vPosicao=(modelViewMatrix*vec4(position,1.0)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader:'uniform vec3 corAtmosfera;uniform float intensidade;uniform float expoente;varying vec3 vNormal;varying vec3 vPosicao;void main(){float fresnel=pow(1.0-abs(dot(vNormal,normalize(-vPosicao))),expoente);gl_FragColor=vec4(corAtmosfera,fresnel*intensidade);}',
      side:THREE.BackSide,transparent:true,depthWrite:false
    }));
    group.add(new THREE.Mesh(atmosferaGeometry,atmosferaMaterial));

    scene.add(new THREE.AmbientLight(0xfff4e2,.82));
    const light=new THREE.DirectionalLight(0xfff1d8,.85);
    light.position.set(4,3,5);
    scene.add(light);
    const rim=new THREE.DirectionalLight(0xc79a5c,.3);
    rim.position.set(-4,1,-2);
    scene.add(rim);

    // Aro de latão: o globo passa a ter presença de objeto cartográfico físico,
    // em vez de parecer apenas uma esfera WebGL solta no fundo do hero.
    const aroGeometry=registrar(new THREE.TorusGeometry(CFG.raio*1.09,.012,8,160));
    const aroMaterial=registrar(new THREE.MeshPhongMaterial({color:0xb78a50,shininess:42,specular:0x5f3d1b,transparent:true,opacity:.88}));
    const aro=new THREE.Mesh(aroGeometry,aroMaterial);
    aro.rotation.y=-.18;
    scene.add(aro);

    function layoutGlobe(){
      const compact=w<980;
      group.position.x=compact?.38:.72;
      group.position.y=compact?.05:.02;
      group.scale.setScalar(compact?.86:.92);
      aro.position.copy(group.position);
      aro.scale.copy(group.scale);
      // Convenção data-globo-*: permite que a QA afirme sobre o enquadramento
      // sem replicar a matemática de projeção.
      camera.updateMatrixWorld();
      const v=group.position.clone().project(camera);
      hero.dataset.globoCentro=`${((v.x+1)/2).toFixed(4)},${((1-v.y)/2).toFixed(4)}`;
    }
    layoutGlobe();

    function latLon(lat,lon,r=CFG.raio*1.025){
      const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;
      return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));
    }

    // Geometria única compartilhada e um material por combinação tipo+certeza:
    // 52 marcadores deixam de alocar 104 objetos de GPU para alocar meia dúzia.
    const marcadorGeometry=registrar(new THREE.SphereGeometry(1,7,5));
    const materiaisMarcador=new Map();
    function materialMarcador(tipo,certeza){
      const chave=`${tipo}|${certeza}`;
      let m=materiaisMarcador.get(chave);
      if(!m){
        const cor=(typeof TIPOS_LUGAR!=='undefined'&&TIPOS_LUGAR[tipo]?.cor)||'#a45535';
        m=registrar(new THREE.MeshBasicMaterial({color:new THREE.Color(cor).convertSRGBToLinear(),transparent:true,opacity:certeza?.8:1}));
        materiaisMarcador.set(chave,m);
      }
      return m;
    }

    const marcadores=[],visiveis=[];
    OBRAS.forEach(obra=>{
      (obra.lugares||[]).forEach(lugar=>{
        if(typeof lugar.lat!=='number'||typeof lugar.lon!=='number')return;
        const z=(typeof CERTEZAS!=='undefined'&&CERTEZAS[lugar.certeza])||{tracejado:true};
        const escala=z.tracejado?.028:.040;
        const m=new THREE.Mesh(marcadorGeometry,materialMarcador(lugar.tipo,z.tracejado));
        m.position.copy(latLon(lugar.lat,lugar.lon));
        m.scale.setScalar(escala);
        m.userData={obra,lugar,escala,dir:m.position.clone().normalize()};
        group.add(m);
        marcadores.push(m);
      });
    });

    // Realce reaproveitado: um único halo é reposicionado sobre o marcador sob o cursor.
    const haloGeometry=registrar(new THREE.SphereGeometry(1,10,8));
    const haloMaterial=registrar(new THREE.MeshBasicMaterial({color:new THREE.Color(0xf1ebdd).convertSRGBToLinear(),transparent:true,opacity:.3,depthWrite:false}));
    const halo=new THREE.Mesh(haloGeometry,haloMaterial);
    halo.visible=false;
    group.add(halo);

    // ---- Tour guiado -------------------------------------------------------
    // As paradas saem do próprio acervo, sem texto inventado: percorre os
    // movimentos literários em ordem cronológica e, em cada um, toma a obra mais
    // antiga com lugar localizado. O texto da parada é a descrição já auditada
    // do lugar em data.js.
    function construirParadas(){
      const unicos=new Map();
      for(const obra of OBRAS){
        for(const lugar of obra.lugares||[]){
          if(typeof lugar.lat!=='number'||typeof lugar.lon!=='number')continue;
          const chave=lugar.entity_id||`${lugar.nome}|${lugar.lat.toFixed(3)}|${lugar.lon.toFixed(3)}`;
          const atual=unicos.get(chave);
          if(!atual)unicos.set(chave,{obra,lugar,peso:1});
          else{
            atual.peso+=1;
            if(obra.ano<atual.obra.ano)atual.obra=obra;
          }
        }
      }
      const todos=[...unicos.values()];
      if(todos.length<=9)return todos.sort((a,b)=>a.obra.ano-b.obra.ano);
      const rad=x=>x*Math.PI/180;
      const distancia=(a,b)=>{
        const p1=rad(a.lugar.lat),p2=rad(b.lugar.lat),dp=p2-p1,dl=rad(b.lugar.lon-a.lugar.lon);
        const h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;
        return 2*6371*Math.asin(Math.min(1,Math.sqrt(h)));
      };
      const rio=todos.find(x=>/rio de janeiro/i.test(x.lugar.nome));
      const inicio=rio||todos.slice().sort((a,b)=>b.peso-a.peso||a.obra.ano-b.obra.ano)[0];
      const escolhidas=[inicio],restantes=todos.filter(x=>x!==inicio);
      while(escolhidas.length<9&&restantes.length){
        let melhor=0,melhorScore=-1;
        for(let i=0;i<restantes.length;i++){
          const minimo=Math.min(...escolhidas.map(s=>distancia(restantes[i],s)));
          const score=minimo*(1+Math.min(.28,(restantes[i].peso-1)*.055));
          if(score>melhorScore){melhor=i;melhorScore=score}
        }
        escolhidas.push(restantes.splice(melhor,1)[0]);
      }
      // Depois de escolher pontos espacialmente diversos, organiza a viagem por
      // vizinhança para que o tour pareça um percurso e não saltos aleatórios.
      const rota=[escolhidas[0]],faltam=escolhidas.slice(1);
      while(faltam.length){
        const ultimo=rota.at(-1);
        let idx=0,menor=Infinity;
        for(let i=0;i<faltam.length;i++){const d=distancia(ultimo,faltam[i]);if(d<menor){menor=d;idx=i}}
        rota.push(faltam.splice(idx,1)[0]);
      }
      return rota;
    }
    const paradas=construirParadas();

    // Rotas náuticas discretas conectam as paradas do tour e giram junto com
    // o mapa. Elas usam apenas os pontos já georreferenciados do acervo.
    const rotasTour=new THREE.Group();
    const rotaMaterial=registrar(new THREE.LineBasicMaterial({color:0xb8894d,transparent:true,opacity:.34,depthWrite:false}));
    for(let i=0;i<paradas.length-1;i++){
      const a=latLon(paradas[i].lugar.lat,paradas[i].lugar.lon,CFG.raio*1.018);
      const b=latLon(paradas[i+1].lugar.lat,paradas[i+1].lugar.lon,CFG.raio*1.018);
      const meio=a.clone().add(b).normalize().multiplyScalar(CFG.raio*1.10);
      const curva=new THREE.QuadraticBezierCurve3(a,meio,b);
      const geo=registrar(new THREE.BufferGeometry().setFromPoints(curva.getPoints(28)));
      rotasTour.add(new THREE.Line(geo,rotaMaterial));
    }
    group.add(rotasTour);

    // A orientação agora é um quaternion real. Não há teto artificial de latitude:
    // qualquer ponto da esfera pode atravessar o centro visível sem singularidade.

    //
    const orientacao=new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(CFG.inclinacaoInicial,CFG.rotacaoInicial,0,'XYZ'))
      .normalize();
    const orientacaoPadrao=orientacao.clone(),zoomPadrao=camera.position.z;
    const eixoInercia=new THREE.Vector3(0,1,0),eixoAuto=new THREE.Vector3(0,1,0);
    const qPasso=new THREE.Quaternion(),qAuto=new THREE.Quaternion();
    let velocidadeAngular=0,arrastando=false,pausado=false;
    let lastX=0,lastY=0,lastT=0,deslocamento=0,alvo=null;
    let visivel=true,sujo=false,ultimo=0,raf=0;
    let tourAtivo=false,tourIndice=-1,tourPausado=false,tourEspera=0,viagem=null;
    const reduzido=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const camLocal=new THREE.Vector3();
    const ponteiros=new Map();
    let distanciaPinch=0;

    function orientacaoParaLugar(lat,lon){
      const direcaoLocal=latLon(lat,lon,1).normalize();
      const direcaoAtual=direcaoLocal.clone().applyQuaternion(orientacao).normalize();
      const direcaoVista=camera.position.clone().sub(group.position).normalize();
      const delta=new THREE.Quaternion().setFromUnitVectors(direcaoAtual,direcaoVista);
      return delta.multiply(orientacao.clone()).normalize();
    }

    function atualizarFaces(){
      camLocal.copy(camera.position);
      group.worldToLocal(camLocal);
      camLocal.normalize();
      visiveis.length=0;
      for(const m of marcadores){
        const frente=m.userData.dir.dot(camLocal)>CFG.limiarFrente;
        m.visible=frente;
        if(frente)visiveis.push(m);
      }
      if(alvo&&!alvo.visible)destacar(null);
    }

    function atualizarDiagnostico(){
      const q=orientacao;
      hero.dataset.globoControle='trackball-quaternion';
      hero.dataset.globoQuaternion=[q.x,q.y,q.z,q.w].map(v=>v.toFixed(5)).join(',');
      hero.dataset.globoZoom=camera.position.z.toFixed(3);
    }
    function orientar(){
      group.quaternion.copy(orientacao);
      atualizarDiagnostico();
    }

    function desenhar(){
      orientar();
      group.updateMatrixWorld();
      atualizarFaces();
      renderer.render(scene,camera);
    }

    // Devolve true quando a orientação mudou: sem movimento não há motivo para redesenhar.
    function avancar(dt){
      if(arrastando||ponteiros.size>1)return false;
      if(viagem){
        viagem.t=Math.min(1,viagem.t+dt*1000/viagem.duracao);
        const e=viagem.t<.5?4*viagem.t**3:1-Math.pow(-2*viagem.t+2,3)/2;
        orientacao.copy(viagem.q0).slerp(viagem.q1,e).normalize();
        if(viagem.t>=1)viagem=null;
        return true;
      }
      if(tourAtivo){
        if(!tourPausado&&(tourEspera-=dt*1000)<=0)irPara(tourIndice+1);
        return false;
      }
      if(velocidadeAngular>.002){
        qPasso.setFromAxisAngle(eixoInercia,velocidadeAngular*dt);
        orientacao.premultiply(qPasso).normalize();
        velocidadeAngular*=Math.pow(.045,dt);
        return true;
      }
      velocidadeAngular=0;
      if(reduzido||pausado)return false;
      qAuto.setFromAxisAngle(eixoAuto,CFG.velocidadeAuto*dt);
      orientacao.premultiply(qAuto).normalize();
      return true;
    }

    function loop(ts){
      raf=requestAnimationFrame(loop);
      if(!visivel||document.hidden){ultimo=ts;return}
      const dt=(ts-ultimo)/1000;
      if(dt<1/CFG.fpsMax)return;
      ultimo=ts;
      if(avancar(Math.min(dt,.1))||sujo){sujo=false;desenhar()}
    }

    let dicaLugar,dicaObra;
    if(dica){
      dica.textContent='';
      dicaLugar=dica.appendChild(document.createElement('strong'));
      dicaObra=dica.appendChild(document.createElement('span'));
    }

    function destacar(m){
      if(alvo===m)return;
      alvo=m;
      pausado=!!m;
      sujo=true;
      if(m){
        velocidadeAngular=0; // o alvo não foge do clique
        halo.position.copy(m.position);
        halo.scale.setScalar(m.userData.escala*2.4);
        halo.visible=true;
        canvas.style.cursor='pointer';
      }else{
        halo.visible=false;
        canvas.style.cursor=arrastando?'grabbing':'grab';
      }
      if(dica){
        if(m){
          const {obra,lugar}=m.userData;
          dicaLugar.textContent=lugar.nome;
          dicaObra.textContent=`${obra.titulo} · ${obra.autor}`;
          dica.style.opacity='1';
        }else dica.style.opacity='0';
      }
    }

    // ---- Interface do tour -------------------------------------------------
    const painel=document.getElementById('globo-tour');
    const elContador=document.getElementById('globo-tour-contador');
    const elLugar=document.getElementById('globo-tour-lugar');
    const elObra=document.getElementById('globo-tour-obra');
    const elNota=document.getElementById('globo-tour-nota');
    const elLinks=document.getElementById('globo-tour-links');
    const btPausa=painel?.querySelector('[data-tour-pausa]');

    function irPara(indice,{animar=true}={}){
      if(!paradas.length)return;
      tourIndice=(indice+paradas.length)%paradas.length;
      const {obra,lugar}=paradas[tourIndice];
      const destino=orientacaoParaLugar(lugar.lat,lugar.lon);
      if(animar&&!reduzido){
        viagem={t:0,duracao:CFG.tourDuracao,q0:orientacao.clone(),q1:destino};
      }else{
        orientacao.copy(destino);viagem=null;sujo=true;
      }
      velocidadeAngular=0;tourEspera=CFG.tourEspera;
      destacar(null);
      pintarParada(obra,lugar);
      hero.dataset.globoParada=String(tourIndice);
    }

    function pintarParada(obra,lugar){
      if(!painel)return;
      elContador.textContent=`Parada ${tourIndice+1} de ${paradas.length} · ${obra.movimento}`;
      elLugar.textContent=lugar.nome;
      elObra.textContent=`${obra.titulo} · ${obra.autor} · ${obra.anoLabel||obra.ano}`;
      elNota.textContent=lugar.descricao||obra.sinopse||'';
      elLinks.textContent='';
      const link=(href,texto)=>{const a=document.createElement('a');a.href=href;a.textContent=texto;elLinks.appendChild(a)};
      link(`atlas.html?busca=${encodeURIComponent(lugar.nome)}`,'Ver o lugar no Atlas');
      link(`obra.html?id=${encodeURIComponent(obra.id)}`,'Abrir a obra');
    }

    function definirPausa(valor){
      tourPausado=valor;
      if(btPausa){
        btPausa.textContent=valor?'Retomar':'Pausar';
        btPausa.setAttribute('aria-pressed',String(valor));
      }
    }

    function abrirTour(){
      if(!paradas.length)return;
      tourAtivo=true;
      if(painel)painel.hidden=false;
      hero.classList.add('tour-ativo');
      // Conteúdo que avança sozinho precisa de controle de pausa; sob
      // prefers-reduced-motion começa pausado e só avança por comando.
      definirPausa(reduzido);
      // Primeira parada sem viagem: ao abrir o tour o leitor quer chegar, não
      // assistir ao globo girar enquanto o resto ainda inicializa.
      irPara(0,{animar:false});
    }

    function fecharTour(){
      tourAtivo=false;viagem=null;
      if(painel)painel.hidden=true;
      hero.classList.remove('tour-ativo');
      delete hero.dataset.globoParada;
      sujo=true;
    }

    if(painel){
      painel.querySelector('[data-tour-proximo]')?.addEventListener('click',()=>irPara(tourIndice+1));
      painel.querySelector('[data-tour-anterior]')?.addEventListener('click',()=>irPara(tourIndice-1));
      btPausa?.addEventListener('click',()=>definirPausa(!tourPausado));
      painel.querySelector('[data-tour-sair]')?.addEventListener('click',fecharTour);
    }
    for(const b of document.querySelectorAll('[data-globo-tour]'))
      b.addEventListener('click',()=>tourAtivo?fecharTour():abrirTour());

    for(const b of document.querySelectorAll('[data-globo-reset]'))
      b.addEventListener('click',()=>{
        fecharTour();
        velocidadeAngular=0;
        camera.position.z=zoomPadrao;
        viagem={t:0,duracao:650,q0:orientacao.clone(),q1:orientacaoPadrao.clone()};
        sujo=true;
      });

    const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
    function alvoEm(e){
      const r=canvas.getBoundingClientRect();
      pointer.x=((e.clientX-r.left)/r.width)*2-1;
      pointer.y=-((e.clientY-r.top)/r.height)*2+1;
      ray.setFromCamera(pointer,camera);
      return ray.intersectObjects(visiveis,false)[0]?.object||null;
    }

    const centroProjetado=new THREE.Vector3(),bordaProjetada=new THREE.Vector3();
    function metricasTrackball(){
      const r=canvas.getBoundingClientRect();
      centroProjetado.copy(group.position).project(camera);
      bordaProjetada.copy(group.position).add(new THREE.Vector3(CFG.raio*group.scale.x,0,0)).project(camera);
      const cx=r.left+(centroProjetado.x+1)*.5*r.width;
      const cy=r.top+(1-centroProjetado.y)*.5*r.height;
      const bx=r.left+(bordaProjetada.x+1)*.5*r.width;
      return {cx,cy,raio:Math.max(72,Math.abs(bx-cx)*CFG.trackballRaio)};
    }
    function mapearTrackball(clientX,clientY){
      const m=metricasTrackball();
      let x=(clientX-m.cx)/m.raio,y=(m.cy-clientY)/m.raio;
      const d=x*x+y*y;
      let z;
      if(d<=1)z=Math.sqrt(1-d);
      else{const inv=1/Math.sqrt(d);x*=inv;y*=inv;z=0}
      return new THREE.Vector3(x,y,z).normalize();
    }
    const trackAnterior=new THREE.Vector3(),trackAtual=new THREE.Vector3();
    const limitar=(v,a,b)=>Math.max(a,Math.min(b,v));
    function aplicarZoom(novoZ){
      camera.position.z=limitar(novoZ,CFG.zoomMin,CFG.zoomMax);
      sujo=true;desenhar();
    }
    function distanciaEntrePonteiros(){
      const pts=[...ponteiros.values()];
      return pts.length<2?0:Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y);
    }

    canvas.addEventListener('pointerdown',e=>{
      ponteiros.set(e.pointerId,{x:e.clientX,y:e.clientY});
      deslocamento=0;velocidadeAngular=0;viagem=null;
      if(tourAtivo&&!tourPausado)definirPausa(true);
      canvas.setPointerCapture?.(e.pointerId);
      if(ponteiros.size===1){
        arrastando=true;lastX=e.clientX;lastY=e.clientY;lastT=performance.now();
        trackAnterior.copy(mapearTrackball(e.clientX,e.clientY));
        canvas.style.cursor='grabbing';
      }else{
        arrastando=false;distanciaPinch=distanciaEntrePonteiros();
      }
      hero.classList.add('globo-interagindo');
    });
    canvas.addEventListener('pointermove',e=>{
      if(ponteiros.has(e.pointerId))ponteiros.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(ponteiros.size>=2){
        const d=distanciaEntrePonteiros();
        if(distanciaPinch>0&&d>0){
          aplicarZoom(camera.position.z*(distanciaPinch/d));
          deslocamento+=Math.abs(d-distanciaPinch);
        }
        distanciaPinch=d;
        return;
      }
      if(arrastando){
        const agora=performance.now(),dt=Math.max((agora-lastT)/1000,.008);
        trackAtual.copy(mapearTrackball(e.clientX,e.clientY));
        qPasso.setFromUnitVectors(trackAnterior,trackAtual);
        orientacao.premultiply(qPasso).normalize();
        const w=limitar(qPasso.w,-1,1),angulo=2*Math.acos(w),s=Math.sqrt(Math.max(0,1-w*w));
        if(angulo>1e-5&&s>1e-5){
          eixoInercia.set(qPasso.x/s,qPasso.y/s,qPasso.z/s).normalize();
          velocidadeAngular=Math.min(5,angulo/dt);
        }
        deslocamento+=Math.abs(e.clientX-lastX)+Math.abs(e.clientY-lastY);
        trackAnterior.copy(trackAtual);
        lastX=e.clientX;lastY=e.clientY;lastT=agora;
        desenhar();
        return;
      }
      destacar(alvoEm(e));
    });
    const soltar=e=>{
      ponteiros.delete(e.pointerId);
      canvas.releasePointerCapture?.(e.pointerId);
      if(ponteiros.size===1){
        const p=[...ponteiros.values()][0];
        arrastando=true;trackAnterior.copy(mapearTrackball(p.x,p.y));lastX=p.x;lastY=p.y;lastT=performance.now();
      }else{
        arrastando=false;distanciaPinch=0;
        hero.classList.remove('globo-interagindo');
        canvas.style.cursor=alvo?'pointer':'grab';
      }
    };
    canvas.addEventListener('pointerup',soltar);
    canvas.addEventListener('pointercancel',soltar);
    canvas.addEventListener('pointerleave',()=>{if(!arrastando&&!ponteiros.size)destacar(null)});
    canvas.addEventListener('wheel',e=>{
      e.preventDefault();
      velocidadeAngular=0;
      aplicarZoom(camera.position.z+e.deltaY*CFG.zoomSensibilidade);
    },{passive:false});

    canvas.addEventListener('click',e=>{
      if(deslocamento>CFG.limiarArrasto)return;
      const m=alvoEm(e);
      if(m)location.href=`atlas.html?busca=${encodeURIComponent(m.userData.lugar.nome)}`;
    });

    const observer=new IntersectionObserver(entries=>{
      visivel=entries[0]?.isIntersecting!==false;
      if(visivel)desenhar();
    },{rootMargin:'120px'});
    observer.observe(canvas);

    function redimensionar(){
      const nw=hero.clientWidth,nh=hero.clientHeight;
      if(!nw||!nh||(nw===w&&nh===h))return;
      w=nw;h=nh;
      camera.aspect=w/h;camera.updateProjectionMatrix();
      renderer.setSize(w,h,false);
      layoutGlobe();desenhar();
    }
    const ro=typeof ResizeObserver!=='undefined'?new ResizeObserver(redimensionar):null;
    if(ro)ro.observe(hero);else window.addEventListener('resize',redimensionar,{passive:true});

    function encerrar(){
      cancelAnimationFrame(raf);
      observer.disconnect();
      ro?.disconnect();
      for(const o of descartaveis)o.dispose?.();
      renderer.dispose();
    }
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf);hero.classList.add('sem-globo')});
    window.addEventListener('pagehide',encerrar,{once:true});

    desenhar();
    raf=requestAnimationFrame(loop);
    // Mesma convenção de diagnóstico usada pelo leitor (data-reader-ready): permite
    // que a QA de navegador afirme sobre o globo sem depender de inspeção de pixels.
    hero.dataset.globoMarcadores=String(marcadores.length);
    hero.dataset.globoTextura=texturaPronta?'ready':'loading';
  }catch(e){hero.classList.add('sem-globo')}
})();
