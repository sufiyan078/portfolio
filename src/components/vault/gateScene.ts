import * as THREE from 'three';

/** Owned, isolated dimensional scene. No renderer or GPU resource escapes dispose(). */
export function createGateScene(canvas: HTMLCanvasElement, traversal = false) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power', failIfMajorPerformanceCaveat: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, traversal ? 1 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 250);
  const machine = new THREE.Group(); scene.add(machine);
  const bronze = new THREE.MeshStandardMaterial({ color: '#45433e', metalness: 0.4, roughness: 0.72 });
  const dark = new THREE.MeshStandardMaterial({ color: '#17191e', metalness: 0.7, roughness: 0.48 });
  const trim = new THREE.MeshStandardMaterial({ color: '#b5884f', metalness: 0.8, roughness: 0.32 });
  const energy = new THREE.MeshStandardMaterial({ color: '#ffc06a', emissive: '#ff850f', emissiveIntensity: 0.8 });
  scene.add(new THREE.HemisphereLight('#c6d4e0', '#1a0a00', 2));
  const key = new THREE.DirectionalLight('#ffd3a0', 5); key.position.set(-4, 7, 6); scene.add(key);
  const rim = new THREE.PointLight('#ff9c30', 28, 18); rim.position.set(0, 0, 3); scene.add(rim);
  function box(w: number, h: number, d: number, x: number, y: number, z: number, material = dark) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z); machine.add(mesh); return mesh;
  }
  // Individual bevelled masonry blocks surround a recessed, living aperture.
  function segment(inner: number, outer: number, a: number, b: number, depth: number, material: THREE.Material) {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outer, a, b, false);
    shape.absarc(0, 0, inner, b, a, true); shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: .035, bevelThickness: .035, curveSegments: 5 });
    const mesh = new THREE.Mesh(geometry, material); machine.add(mesh); return mesh;
  }
  const runeMaterial = new THREE.LineBasicMaterial({ color: '#ffc77a', transparent: true, opacity: .7 });
  const runePoints: THREE.Vector3[] = [];
  for (let i = 0; i < 20; i++) {
    const angle = i * Math.PI / 10;
    const stone = segment(2.5, 3.18, angle + .022, angle + Math.PI / 10 - .022, .62, bronze);
    stone.position.z = -.18 + Math.sin(i * 3.1) * .035;
    const inset = segment(2.68, 2.99, angle + .054, angle + Math.PI / 10 - .054, .035, dark); inset.position.z = .49;
    const mid = angle + Math.PI / 20;
    const glyph = [[-.08,-.12],[.08,-.02],[-.08,.08],[.07,.14],[0,-.12],[0,.14]];
    for (const [x,y] of glyph) runePoints.push(new THREE.Vector3(Math.cos(mid)*(2.83+y)-Math.sin(mid)*x, Math.sin(mid)*(2.83+y)+Math.cos(mid)*x, .59));
  }
  machine.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(runePoints), runeMaterial));
  for (const [radius, thickness, z, material] of [[2.48,.065,.44,trim],[3.19,.08,.1,dark],[2.44,.09,-.35,dark],[2.4,.045,-.64,energy]] as const) {
    const lip = new THREE.Mesh(new THREE.TorusGeometry(radius, thickness, 6, 80), material); lip.position.z=z; machine.add(lip);
  }
  for (const side of [-1, 1]) {
    const support = box(.66, 1.65, 1.15, side*2.45, -2.63, -.15, bronze); support.rotation.z = side*-.22;
    box(1.35,.25,1.75,side*2.6,-3.49,.12,dark);
    box(1.12,.2,1.5,side*2.6,-3.27,.12,trim);
    for (let j=0;j<3;j++) {
      const brace=box(.09,1.05,.09,side*2.45+(j-1)*.17,-2.65,.47,trim); brace.rotation.z=side*-.22;
    }
  }
  for (let i=0;i<9;i++) {
    const angle = i*Math.PI/8;
    const spike = new THREE.Mesh(new THREE.ConeGeometry(i===4?.18:.12,i===4?.76:.42,4),bronze);
    spike.position.set(Math.cos(angle)*3.25, Math.sin(angle)*3.25,.2); spike.rotation.z=angle-Math.PI/2; machine.add(spike);
  }
  for (let i=0;i<3;i++) box(3.9-i*.45,.14,1.35-i*.2,0,-3.55+i*.14,1.1-i*.32,bronze);
  for (let i=0;i<4;i++) {
    const angle=i*Math.PI/2;
    const boss=new THREE.Mesh(new THREE.CylinderGeometry(.22,.28,.2,8),trim); boss.rotation.x=Math.PI/2;
    boss.position.set(Math.cos(angle)*2.88,Math.sin(angle)*2.88,.68); machine.add(boss);
    const jewel=new THREE.Mesh(new THREE.OctahedronGeometry(.12),energy); jewel.position.copy(boss.position); jewel.position.z=.83; machine.add(jewel);
  }
  const surfaceMaterial = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, charge: { value: 0 } }, side: THREE.DoubleSide,
    vertexShader: 'varying vec2 uvPoint; void main(){uvPoint=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: `
      varying vec2 uvPoint; uniform float time; uniform float charge;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f); return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float n=0.,a=.5; for(int i=0;i<4;i++){n+=noise(p)*a;p=mat2(.8,-.6,.6,.8)*p*2.1+2.7;a*=.5;}return n;}
      void main(){
        vec2 p=(uvPoint-.5)*2.; float r=length(p); float t=time*(.13+charge*.17);
        float bend=3.3/(r+.32)-t;
        vec2 q=mat2(cos(bend),-sin(bend),sin(bend),cos(bend))*p;
        float mist=fbm(q*5.+vec2(t*.2,-t*.3));
        float whorl=fbm(q*10.+mist*2.8);
        float filaments=pow(max(0.,1.-abs(whorl-.5)*6.),5.);
        float arm=pow(.5+.5*sin(atan(q.y,q.x)*3.+mist*3.),3.);
        float rim=exp(-abs(r-.94)*45.);
        float heart=exp(-length(p-vec2(.015,-.025))*20.);
        float depth=smoothstep(.04,.55,r);
        vec3 c=mix(vec3(.008,.014,.033),vec3(.024,.13,.23),mist*depth);
        c+=vec3(.12,.58,.9)*(filaments*.75+arm*.3)*depth*(.7+charge*.65);
        c+=vec3(.14,.55,.75)*rim*(.28+charge*.5);
        c+=vec3(.85,.94,1.)*heart*(.55+charge);
        c+=vec3(.48,.2,.045)*pow(arm,3.)*mist*.23;
        gl_FragColor=vec4(c,1.);
      }`,
  });
  const surface = new THREE.Mesh(new THREE.CircleGeometry(2.42, 80), surfaceMaterial); surface.position.z=-.66; machine.add(surface);
  const filaments = new THREE.Group(); machine.add(filaments);
  const filamentMaterial = new THREE.MeshBasicMaterial({color:'#69c9f3',transparent:true,opacity:.24,depthWrite:false,blending:THREE.AdditiveBlending});
  for(let i=0;i<7;i++) {
    const points: THREE.Vector3[]=[];
    for(let j=0;j<=64;j++) { const u=j/64, angle=i*Math.PI*2/7+u*3.4, radius=2.35*(1-u*.93); points.push(new THREE.Vector3(Math.cos(angle)*radius,Math.sin(angle)*radius,-.55-u*.06)); }
    filaments.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),64,.009,3,false),filamentMaterial));
  }
  const dustGeometry = new THREE.BufferGeometry(), positions = new Float32Array(150 * 3);
  for (let i = 0; i < 150; i++) { positions[i * 3] = Math.sin(i * 7.1) * 4.4; positions[i * 3 + 1] = Math.cos(i * 3.3) * 4; positions[i * 3 + 2] = -1 + (i % 11) / 4; }
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: '#dcb16c', size: 0.035, transparent: true, opacity: 0.55 })); scene.add(dust);
  const corridor = new THREE.Group(); scene.add(corridor); corridor.visible = traversal;
  if (traversal) {
    // Long irregular currents provide continuous depth instead of repeated tunnel rings.
    const currentMaterial = new THREE.MeshBasicMaterial({ color: '#3585bd', transparent: true, opacity: .32, blending: THREE.AdditiveBlending, depthWrite: false });
    for (let i = 0; i < 9; i++) {
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 140; j++) {
        const a = i * Math.PI * 2 / 9 + j * .048;
        const r = 3.5 + Math.sin(j * .11 + i) * .38;
        points.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, -j - 3));
      }
      corridor.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 180, .025 + (i % 3) * .014, 4, false), currentMaterial));
    }
    const rockGeometry = new THREE.IcosahedronGeometry(1, 0);
    const rockMaterial = new THREE.MeshStandardMaterial({ color: '#171822', roughness: 0.9, metalness: 0.25 });
    for (let i = 0; i < 120; i++) {
      const angle = i * 2.39996, radius = 4.7 + Math.sin(i) * 0.6;
      const rock = new THREE.Mesh(rockGeometry, rockMaterial);
      rock.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, -7 - i * 1.15);
      rock.scale.set(1.4, 2.2, 3.5); rock.rotation.set(i, i * 0.5, i * 0.12); corridor.add(rock);
      if (i % 3 === 0) {
        const shard = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.08, 6), energy);
        shard.position.copy(rock.position).multiplyScalar(0.85); shard.rotation.z = angle; corridor.add(shard);
      }
    }
    scene.fog = new THREE.FogExp2('#03030a', 0.022);
  }
  let disposed = false;
  return {
    resize(w: number, h: number) { renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); },
    render(time: number, charge: number, nx = 0, ny = 0, travel = -1, exit = false) {
      if (disposed) return;
      surfaceMaterial.uniforms.time.value = time; surfaceMaterial.uniforms.charge.value = charge;
      filaments.rotation.z = -time * (.06 + charge * .08);
      filamentMaterial.opacity = .12 + charge * .22;
      runeMaterial.opacity = .4 + charge * .6;
      energy.emissiveIntensity = 0.45 + charge * 1.6; rim.intensity = 15 + charge * 20;
      dust.rotation.z = Math.sin(time * 0.15) * 0.05;
      if (travel < 0) {
        camera.position.set(1.4 + nx * .8, 1.2 - ny * .5, 11.6 / Math.min(1, camera.aspect));
        camera.lookAt(0, -0.25, 0); scene.background = null;
      } else {
        scene.background = travel < 0.34 ? null : new THREE.Color('#03030a');
        const approach = Math.min(1, travel / 0.34), crossing = Math.max(0, (travel - 0.34) / 0.66);
        const distance = exit ? Math.pow(crossing, 0.65) : Math.pow(crossing, 1.6);
        corridor.rotation.y = exit && crossing > 0 ? Math.PI : 0;
        machine.position.z = exit && crossing > 0 ? 135 : 0;
        machine.rotation.y = exit && crossing > 0 ? Math.PI : 0;
        camera.position.set((1 - approach) * 1.4 + Math.sin(crossing * Math.PI) * 0.8, (1 - approach) * 1.2, crossing > 0 ? (exit ? distance * 160 : -distance * 120) : 11.6 * (1 - approach));
        camera.lookAt(camera.position.x * 0.3, 0, camera.position.z + (exit && crossing > 0 ? 8 : -8));
        camera.rotation.z += Math.sin(crossing * Math.PI) * (exit ? -0.16 : 0.09);
        camera.fov = 42 + Math.sin(crossing * Math.PI) * (exit ? 38 : 28); camera.updateProjectionMatrix();
        surface.visible = travel < 0.3; filaments.visible = travel < 0.3; dust.visible = travel < 0.34;
        rim.position.copy(camera.position); rim.position.z -= 2; rim.intensity = 40;
      }
      renderer.render(scene, camera);
    },
    dispose() {
      if (disposed) return; disposed = true;
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
      scene.traverse(object => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(material => materials.add(material));
      });
      geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose());
      renderer.dispose(); renderer.forceContextLoss(); scene.clear();
    },
  };
}
