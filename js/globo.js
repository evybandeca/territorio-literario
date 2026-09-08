(function(){
  const canvas=document.getElementById('globo-canvas');
  if(!canvas||typeof THREE==='undefined')return;
  const hero=document.getElementById('globo-hero'),dica=document.getElementById('globo-dica');
  try{
    const scene=new THREE.Scene();
    const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});
    let w=hero.clientWidth,h=hero.clientHeight;
    renderer.setSize(w,h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
    renderer.outputEncoding=THREE.sRGBEncoding;

    const camera=new THREE.PerspectiveCamera(42,w/h,.1,100);
    camera.position.z=3.35;
    const group=new THREE.Group();
    scene.add(group);

    const geometry=new THREE.SphereGeometry(1,48,48);
    const globeMaterial=new THREE.MeshPhongMaterial({color:0xa8b3a7,transparent:true,opacity:.82,shininess:3});
    const globe=new THREE.Mesh(geometry,globeMaterial);
    group.add(globe);

    const graticule=new THREE.Mesh(
      new THREE.SphereGeometry(1.006,24,16),
      new THREE.MeshBasicMaterial({color:0xd7c6a5,wireframe:true,transparent:true,opacity:.075,depthWrite:false})
    );
    group.add(graticule);

    const textureLoader=new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');
    textureLoader.load(
      'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
      texture=>{
        texture.encoding=THREE.sRGBEncoding;
        globeMaterial.map=texture;
        globeMaterial.color.setHex(0xa8b3a7);
        globeMaterial.opacity=.88;
        globeMaterial.needsUpdate=true;
        render();
      },
      undefined,
      ()=>hero.classList.add('globo-texture-fallback')
    );

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
      const scale=compact?1.02:1.08;
      group.scale.setScalar(scale);
    }
    layoutGlobe();

    function latLon(lat,lon,r=1.025){
      const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;
      return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));
    }

    const markers=[];
    OBRAS.forEach(o=>{
      const l=(o.lugares||[])[0];
      if(!l)return;
      const z=CERTEZAS[l.certeza]||CERTEZAS.ilustrativo;
      const m=new THREE.Mesh(
        new THREE.SphereGeometry(z.tracejado?.014:.022,10,10),
        new THREE.MeshBasicMaterial({color:0xc85b3d,transparent:true,opacity:z.tracejado?.55:.95})
      );
      m.position.copy(latLon(l.lat,l.lon));
      m.userData.obra=o;
      group.add(m);
      markers.push(m);
    });

    let dragging=false,lastX=0,rot=-.74,visible=true,lastFrame=0,autoUntil=performance.now()+12000,raf=0;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    function render(){group.rotation.y=rot;renderer.render(scene,camera)}
    function loop(ts){
      raf=requestAnimationFrame(loop);
      if(!visible||document.hidden)return;
      if(ts-lastFrame<50)return;
      lastFrame=ts;
      if(!dragging&&!reduced&&ts<autoUntil)rot+=.0022;
      render();
    }

    const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting!==false;if(visible)render()},{rootMargin:'120px'});
    observer.observe(canvas);

    canvas.addEventListener('pointerdown',e=>{
      dragging=true;lastX=e.clientX;autoUntil=performance.now()+4000;
      canvas.setPointerCapture?.(e.pointerId);canvas.style.cursor='grabbing';
    });
    canvas.addEventListener('pointermove',e=>{
      if(dragging){rot+=(e.clientX-lastX)*.005;lastX=e.clientX;render();return}
      setPointer(e);const hit=ray.intersectObjects(markers)[0];
      if(hit&&dica){const o=hit.object.userData.obra;dica.textContent=`${o.titulo} — ${o.autor}`;dica.style.opacity='1';canvas.style.cursor='pointer'}
      else if(dica){dica.style.opacity='0';canvas.style.cursor='grab'}
    });
    const release=e=>{dragging=false;canvas.releasePointerCapture?.(e.pointerId);canvas.style.cursor='grab'};
    canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);

    const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
    function setPointer(e){
      const r=canvas.getBoundingClientRect();
      pointer.x=((e.clientX-r.left)/r.width)*2-1;
      pointer.y=-((e.clientY-r.top)/r.height)*2+1;
      ray.setFromCamera(pointer,camera);
    }
    canvas.addEventListener('click',e=>{setPointer(e);const hit=ray.intersectObjects(markers)[0];if(hit)location.href=`obra.html?id=${hit.object.userData.obra.id}`});

    render();
    raf=requestAnimationFrame(loop);
    window.addEventListener('resize',()=>{
      w=hero.clientWidth;h=hero.clientHeight;
      camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);layoutGlobe();render();
    },{passive:true});
    window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);observer.disconnect();geometry.dispose();globeMaterial.dispose()},{once:true});
  }catch(e){hero.classList.add('sem-globo')}
})();
