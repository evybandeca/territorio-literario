(function(){
  const canvas=document.getElementById('globo-canvas');
  if(!canvas||typeof THREE==='undefined')return;
  const hero=document.getElementById('globo-hero');
  if(!hero)return;
  const dica=document.getElementById('globo-dica');

  // Ajustes de cena concentrados num só lugar, alinhados à paleta editorial do portal.
  const CFG={
    raio:1,
    // Cartografia própria em vez de uma foto da Terra: nada de hotlink externo de
    // ~1 MB, e o globo passa a falar a mesma língua visual do resto do portal.
    oceano:['#2d5866','#1d3f4c','#16323c'],
    terra:'#e3d9c0',
    terraBorda:'#b9a57e',
    graticuloTextura:'rgba(241,235,221,.16)',
    atmosferaCor:0x9fb9ad,
    atmosferaIntensidade:.5,
    atmosferaDifusao:1.5,   // maior = halo mais difuso; acima de ~2 vira névoa e transborda o hero
    rotacaoInicial:-.74,    // enquadra a América do Sul, onde está todo o acervo
    inclinacaoInicial:.22,  // leve mergulho: o acervo fica no hemisfério sul
    inclinacaoMax:1.15,     // ~66°, o bastante para alcançar os polos sem virar de cabeça para baixo
    sensibilidade:.005,     // rad por px arrastado
    velocidadeAuto:.05,     // rad/s
    fpsMax:30,
    limiarFrente:.12,       // produto escalar mínimo para o marcador estar voltado à câmera
    limiarArrasto:6         // px de deslocamento que já não contam como clique
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

    // Desenha um planisfério equirretangular: oceano em degradê, terras emersas
    // preenchidas em tom de papel e grade de 30°/20°. Sem rede, sem espera.
    function texturaCartografica(){
      const L=2048,A=1024,c=document.createElement('canvas');
      c.width=L;c.height=A;
      const g=c.getContext('2d');
      const oc=g.createLinearGradient(0,0,0,A);
      oc.addColorStop(0,CFG.oceano[2]);oc.addColorStop(.5,CFG.oceano[0]);oc.addColorStop(1,CFG.oceano[2]);
      g.fillStyle=oc;g.fillRect(0,0,L,A);

      const px=(lon,lat)=>[(lon+180)/360*L,(90-lat)/180*A];
      // Cada anel é desenhado deslocado em -360/0/+360 para que os que cruzam o
      // antimeridiano fechem corretamente em vez de riscar o mapa.
      g.fillStyle=CFG.terra;g.strokeStyle=CFG.terraBorda;g.lineWidth=1.1;g.lineJoin='round';
      if(typeof GLOBO_TERRA!=='undefined'){
        for(const desloc of [-360,0,360]){
          for(const anel of GLOBO_TERRA){
            g.beginPath();
            for(let i=0;i<anel.length;i+=2){
              const [x,y]=px(anel[i]+desloc,anel[i+1]);
              if(i===0)g.moveTo(x,y);else g.lineTo(x,y);
            }
            g.closePath();g.fill();g.stroke();
          }
        }
      }

      g.strokeStyle=CFG.graticuloTextura;g.lineWidth=1;
      for(let lon=-180;lon<=180;lon+=30){const[x]=px(lon,0);g.beginPath();g.moveTo(x,0);g.lineTo(x,A);g.stroke()}
      for(let lat=-80;lat<=80;lat+=20){const[,y]=px(0,lat);g.beginPath();g.moveTo(0,y);g.lineTo(L,y);g.stroke()}
      g.strokeStyle='rgba(241,235,221,.3)';g.lineWidth=1.6;
      const[,eq]=px(0,0);g.beginPath();g.moveTo(0,eq);g.lineTo(L,eq);g.stroke();

      const t=new THREE.CanvasTexture(c);
      t.encoding=THREE.sRGBEncoding;
      t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
      return registrar(t);
    }

    const geometry=registrar(new THREE.SphereGeometry(CFG.raio,48,32));
    const globeMaterial=registrar(new THREE.MeshPhongMaterial({map:texturaCartografica(),color:0xffffff,shininess:4,specular:0x1c3a44}));
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

    scene.add(new THREE.AmbientLight(0xfff6e7,1.18));
    const light=new THREE.DirectionalLight(0xf6e8cf,.78);
    light.position.set(4,3,5);
    scene.add(light);
    const rim=new THREE.DirectionalLight(0x9fb9ad,.35);
    rim.position.set(-4,1,-2);
    scene.add(rim);

    function layoutGlobe(){
      const compact=w<980;
      group.position.x=compact?.38:.72;
      group.position.y=compact?.05:.02;
      group.scale.setScalar(compact?.86:.92);
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

    let rot=CFG.rotacaoInicial,inc=CFG.inclinacaoInicial,vel=0,arrastando=false,pausado=false;
    let lastX=0,lastY=0,lastT=0,deslocamento=0,alvo=null;
    let visivel=true,sujo=false,ultimo=0,raf=0;
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
  }catch(e){hero.classList.add('sem-globo')}
})();
