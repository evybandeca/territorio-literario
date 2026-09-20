(function(){
  const canvas=document.getElementById('globo-canvas');
  if(!canvas||typeof THREE==='undefined')return;
  const hero=document.getElementById('globo-hero');
  if(!hero)return;
  const dica=document.getElementById('globo-dica');

  // Ajustes de cena concentrados num só lugar, alinhados à paleta editorial do portal.
  const CFG={
    raio:1,
    // Carta náutica antiga desenhada em runtime: pergaminho, hachura de mar,
    // linhas de rumo, rosa dos ventos e litoral gravado. Nenhuma imagem externa.
    papel:'#c3a878',        // pergaminho do mar, tingido e mais fundo que a terra
    papelClaro:'#f2e6c8',   // terra firme, o claro da folha
    tinta:'#6b4a25',        // sépia da gravura
    tintaFraca:'rgba(107,74,37,.30)',
    rumo:'rgba(92,64,32,.26)',
    foxing:'rgba(120,82,40,.055)',  // manchas de envelhecimento
    atmosferaCor:0xd9bd8a,
    atmosferaIntensidade:.34,
    atmosferaDifusao:1.5,   // maior = halo mais difuso; acima de ~2 vira névoa e transborda o hero
    rotacaoInicial:-.74,    // enquadra a América do Sul, onde está todo o acervo
    inclinacaoInicial:.22,  // leve mergulho: o acervo fica no hemisfério sul
    inclinacaoMax:1.15,     // ~66°, o bastante para alcançar os polos sem virar de cabeça para baixo
    sensibilidade:.005,     // rad por px arrastado
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

    // Desenha um planisfério equirretangular no idioma da cartografia de gabinete:
    // mar em pergaminho hachurado, linhas de rumo saindo de rosas dos ventos,
    // litoral gravado em sépia e manchas de envelhecimento. Tudo em <canvas>.
    function texturaCartografica(){
      const L=2048,A=1024,c=document.createElement('canvas');
      c.width=L;c.height=A;
      const g=c.getContext('2d');
      const px=(lon,lat)=>[(lon+180)/360*L,(90-lat)/180*A];

      // 1. Pergaminho do mar, com leve variação de banho
      g.fillStyle=CFG.papel;g.fillRect(0,0,L,A);
      const banho=g.createLinearGradient(0,0,L*.6,A);
      banho.addColorStop(0,'rgba(150,110,60,.10)');
      banho.addColorStop(.45,'rgba(150,110,60,0)');
      banho.addColorStop(1,'rgba(120,88,46,.12)');
      g.fillStyle=banho;g.fillRect(0,0,L,A);

      // 2. Hachura fina do mar (a terra será pintada por cima e a apagará)
      g.strokeStyle='rgba(88,60,28,.20)';g.lineWidth=1;
      for(let y=0;y<A;y+=5){g.beginPath();g.moveTo(0,y+.5);g.lineTo(L,y+.5);g.stroke()}

      // 3. Linhas de rumo a partir de rosas dos ventos, como nas cartas portulanas
      const rosas=[[-30,8],[-150,-20],[60,25]];
      g.strokeStyle=CFG.rumo;g.lineWidth=1;
      for(const [lon,lat] of rosas){
        const [cxr,cyr]=px(lon,lat);
        for(let i=0;i<16;i++){
          const a=i*Math.PI/8;
          g.beginPath();g.moveTo(cxr,cyr);
          g.lineTo(cxr+Math.cos(a)*L,cyr+Math.sin(a)*L);g.stroke();
        }
      }

      // 4. Rosa dos ventos desenhada no Atlântico, à vista de quem chega no Brasil
      (function rosaDosVentos(lon,lat,r){
        const [rx,ry]=px(lon,lat);
        g.save();g.translate(rx,ry);
        g.strokeStyle='rgba(84,56,26,.72)';g.fillStyle='rgba(84,56,26,.6)';g.lineWidth=1.6;
        for(const raio of [r,r*.62]){g.beginPath();g.arc(0,0,raio,0,Math.PI*2);g.stroke()}
        for(let i=0;i<8;i++){       // oito pontas principais em losango
          const a=i*Math.PI/4,pa=a+Math.PI/16,pb=a-Math.PI/16,p=i%2?r*.66:r;
          g.beginPath();
          g.moveTo(Math.cos(a)*p,Math.sin(a)*p);
          g.lineTo(Math.cos(pa)*r*.17,Math.sin(pa)*r*.17);
          g.lineTo(0,0);
          g.lineTo(Math.cos(pb)*r*.17,Math.sin(pb)*r*.17);
          g.closePath();
          g.fillStyle=i%2?'rgba(84,56,26,.34)':'rgba(84,56,26,.62)';
          g.fill();g.stroke();
        }
        g.restore();
      })(-30,8,84);

      // 5. Terra firme: pergaminho mais claro, litoral gravado em traço duplo
      if(typeof GLOBO_TERRA!=='undefined'){
        const caminho=desloc=>{
          const cam=new Path2D();
          for(const anel of GLOBO_TERRA){
            for(let i=0;i<anel.length;i+=2){
              const [x,y]=px(anel[i]+desloc,anel[i+1]);
              if(i===0)cam.moveTo(x,y);else cam.lineTo(x,y);
            }
            cam.closePath();
          }
          return cam;
        };
        // -360/0/+360 fecha corretamente os anéis que cruzam o antimeridiano
        for(const d of [-360,0,360]){
          const cam=caminho(d);
          g.fillStyle=CFG.papelClaro;g.fill(cam);
          g.strokeStyle='rgba(107,74,37,.22)';g.lineWidth=7;g.lineJoin='round';g.stroke(cam);
          g.strokeStyle=CFG.tinta;g.lineWidth=1.7;g.stroke(cam);
        }
      }

      // 6. Gratículo discreto por cima de tudo, como na gravura
      g.strokeStyle=CFG.tintaFraca;g.lineWidth=.9;
      for(let lon=-180;lon<=180;lon+=30){const[x]=px(lon,0);g.beginPath();g.moveTo(x,0);g.lineTo(x,A);g.stroke()}
      for(let lat=-80;lat<=80;lat+=20){const[,y]=px(0,lat);g.beginPath();g.moveTo(0,y);g.lineTo(L,y);g.stroke()}
      g.strokeStyle='rgba(107,74,37,.5)';g.lineWidth=2.2;
      const[,eq]=px(0,0);g.beginPath();g.moveTo(0,eq);g.lineTo(L,eq);g.stroke();
      g.setLineDash([9,7]);g.lineWidth=1.3;g.strokeStyle='rgba(107,74,37,.34)';
      for(const t of [23.4,-23.4]){const[,y]=px(0,t);g.beginPath();g.moveTo(0,y);g.lineTo(L,y);g.stroke()}
      g.setLineDash([]);

      // 7. Foxing: manchas de envelhecimento, determinísticas para não "piscar"
      let semente=20260920;
      const aleatorio=()=>(semente=(semente*1103515245+12345)&0x7fffffff)/0x7fffffff;
      g.fillStyle=CFG.foxing;
      for(let i=0;i<900;i++){
        const x=aleatorio()*L,y=aleatorio()*A,r=1+aleatorio()*7;
        g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();
      }

      const t=new THREE.CanvasTexture(c);
      t.encoding=THREE.sRGBEncoding;
      t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
      return registrar(t);
    }

    const geometry=registrar(new THREE.SphereGeometry(CFG.raio,48,32));
    const globeMaterial=registrar(new THREE.MeshPhongMaterial({map:texturaCartografica(),color:0xffffff,shininess:0,specular:0x000000}));
    group.add(new THREE.Mesh(geometry,globeMaterial));

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

    function layoutGlobe(){
      const compact=w<980;
      group.position.x=compact?.38:.72;
      group.position.y=compact?.05:.02;
      group.scale.setScalar(compact?.86:.92);
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
        const escala=z.tracejado?.017:.026;
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
      const porMovimento=new Map();
      for(const obra of OBRAS){
        const lugar=(obra.lugares||[]).find(l=>typeof l.lat==='number'&&typeof l.lon==='number');
        if(!lugar)continue;
        const atual=porMovimento.get(obra.movimento);
        if(!atual||obra.ano<atual.obra.ano)porMovimento.set(obra.movimento,{obra,lugar});
      }
      const ordem=typeof MOVIMENTOS!=='undefined'?MOVIMENTOS:[...porMovimento.keys()];
      return ordem.map(m=>porMovimento.get(m)).filter(Boolean);
    }
    const paradas=construirParadas();

    // Ângulos que colocam um ponto da esfera bem no meio do globo na tela.
    //
    // O globo é deslocado para a direita (layoutGlobe), então "virado para +Z" NÃO
    // é o mesmo que "no centro visível": há paralaxe. O alvo correto é a direção da
    // câmera vista do centro do globo. Com a orientação inclinação∘giro, isso é um
    // sistema de duas incógnitas com solução fechada:
    //   giro:       d.x·cos a + d.z·sin a = u.x
    //   inclinação: rotação de (d.y, z') até (u.y, u.z)
    function anguloDe(lat,lon){
      const d=latLon(lat,lon,1).normalize();
      const u=camera.position.clone().sub(group.position).normalize();
      const r=Math.hypot(d.x,d.z);
      const psi=Math.atan2(d.z,d.x);
      const razao=r>1e-6?Math.max(-1,Math.min(1,u.x/r)):0;
      const normalizar=x=>Math.atan2(Math.sin(x),Math.cos(x));
      let melhor=null;
      for(const sinal of [1,-1]){
        const a=psi+sinal*Math.acos(razao);
        const z=-r*Math.sin(a-psi);                                  // componente z após o giro
        const i=normalizar(Math.atan2(u.z,u.y)-Math.atan2(z,d.y));
        if(Math.abs(i)>CFG.inclinacaoMax)continue;
        const frente=d.y*Math.sin(i)+z*Math.cos(i);                  // >0 = voltado à câmera
        if(!melhor||frente>melhor.frente)melhor={rot:normalizar(a),inc:i,frente};
      }
      if(melhor)return melhor;
      // Sem solução dentro do limite de inclinação: aproxima o máximo possível.
      return {rot:Math.atan2(-d.x,d.z),
        inc:Math.max(-CFG.inclinacaoMax,Math.min(CFG.inclinacaoMax,Math.atan2(d.y,r)))};
    }

    let rot=CFG.rotacaoInicial,inc=CFG.inclinacaoInicial,vel=0,arrastando=false,pausado=false;
    let lastX=0,lastY=0,lastT=0,deslocamento=0,alvo=null;
    let visivel=true,sujo=false,ultimo=0,raf=0;
    let tourAtivo=false,tourIndice=-1,tourPausado=false,tourEspera=0,viagem=null;
    const reduzido=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const camLocal=new THREE.Vector3();

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

    const qGiro=new THREE.Quaternion(),qInc=new THREE.Quaternion();
    const EIXO_POLAR=new THREE.Vector3(0,1,0),EIXO_TELA=new THREE.Vector3(1,0,0);
    function orientar(){
      qGiro.setFromAxisAngle(EIXO_POLAR,rot);
      qInc.setFromAxisAngle(EIXO_TELA,inc);
      group.quaternion.copy(qInc).multiply(qGiro); // gira no próprio eixo, depois inclina
    }

    function desenhar(){
      orientar();
      group.updateMatrixWorld();
      atualizarFaces();
      renderer.render(scene,camera);
    }

    // Devolve true quando a rotação mudou: sem movimento não há motivo para redesenhar.
    function avancar(dt){
      if(arrastando)return false;
      if(viagem){
        viagem.t=Math.min(1,viagem.t+dt*1000/viagem.duracao);
        const e=viagem.t<.5?4*viagem.t**3:1-Math.pow(-2*viagem.t+2,3)/2; // easeInOutCubic
        rot=viagem.rot0+viagem.dRot*e;
        inc=viagem.inc0+viagem.dInc*e;
        if(viagem.t>=1)viagem=null;
        return true;
      }
      if(tourAtivo){
        if(!tourPausado&&(tourEspera-=dt*1000)<=0)irPara(tourIndice+1);
        return false;
      }
      if(Math.abs(vel)>.0008){rot+=vel*dt;vel*=Math.pow(.05,dt);return true}
      vel=0;
      if(reduzido||pausado)return false;
      rot+=CFG.velocidadeAuto*dt;
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
        vel=0; // pousar o cursor num marcador interrompe a deriva: o alvo não foge do clique
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
      const alvo=anguloDe(lugar.lat,lugar.lon);
      // Caminho curto: normaliza a diferença de giro para (-π, π]
      let dRot=alvo.rot-rot;
      dRot-=Math.round(dRot/(Math.PI*2))*Math.PI*2;
      if(animar&&!reduzido){
        viagem={t:0,duracao:CFG.tourDuracao,rot0:rot,inc0:inc,dRot,dInc:alvo.inc-inc};
      }else{
        rot=alvo.rot;inc=alvo.inc;viagem=null;sujo=true;
      }
      vel=0;tourEspera=CFG.tourEspera;
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

    const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
    function alvoEm(e){
      const r=canvas.getBoundingClientRect();
      pointer.x=((e.clientX-r.left)/r.width)*2-1;
      pointer.y=-((e.clientY-r.top)/r.height)*2+1;
      ray.setFromCamera(pointer,camera);
      return ray.intersectObjects(visiveis,false)[0]?.object||null;
    }

    canvas.addEventListener('pointerdown',e=>{
      arrastando=true;lastX=e.clientX;lastY=e.clientY;lastT=performance.now();deslocamento=0;vel=0;
      viagem=null;                       // a mão do usuário tem prioridade sobre a viagem
      if(tourAtivo&&!tourPausado)definirPausa(true);
      canvas.setPointerCapture?.(e.pointerId);canvas.style.cursor='grabbing';
    });
    canvas.addEventListener('pointermove',e=>{
      if(arrastando){
        const px=e.clientX-lastX,py=e.clientY-lastY;
        const dx=px*CFG.sensibilidade,agora=performance.now(),dt=(agora-lastT)/1000;
        rot+=dx;
        // Arrastar para baixo traz o hemisfério sul à frente: o gesto segue o dedo.
        inc=Math.max(-CFG.inclinacaoMax,Math.min(CFG.inclinacaoMax,inc+py*CFG.sensibilidade));
        deslocamento+=Math.abs(px)+Math.abs(py);
        if(dt>0)vel=Math.max(-4,Math.min(4,dx/Math.max(dt,.008)));
        lastX=e.clientX;lastY=e.clientY;lastT=agora;
        desenhar();
        return;
      }
      destacar(alvoEm(e));
    });
    const soltar=e=>{
      if(!arrastando)return;
      arrastando=false;
      canvas.releasePointerCapture?.(e.pointerId);
      canvas.style.cursor=alvo?'pointer':'grab';
    };
    canvas.addEventListener('pointerup',soltar);
    canvas.addEventListener('pointercancel',soltar);
    canvas.addEventListener('pointerleave',()=>{if(!arrastando)destacar(null)});

    canvas.addEventListener('click',e=>{
      if(deslocamento>CFG.limiarArrasto)return; // arrastar o globo não deve navegar
      const m=alvoEm(e);
      // O globo é a porta de entrada do território: o clique abre o lugar no Atlas.
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
    hero.dataset.globoPronto='true';
    if(hero.dataset.globoTourPedido==='1'){delete hero.dataset.globoTourPedido;abrirTour()}
  }catch(e){hero.classList.add('sem-globo')}
})();
