import * as THREE from 'three';

/** Owned, isolated dimensional scene. No renderer or GPU resource escapes dispose(). */
export function createGateScene(canvas: HTMLCanvasElement, traversal = false) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power', failIfMajorPerformanceCaveat: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, traversal ? 1 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 250);
  const machine = new THREE.Group(); scene.add(machine);
  const bronze = new THREE.MeshStandardMaterial({ color: '#60452b', metalness: 0.65, roughness: 0.38 });
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
  // Bevelled octagonal bulkhead with an actual hole, thickness and recessed lining.
  const frame = new THREE.Shape();
  frame.moveTo(-2.7, -3.4); frame.lineTo(2.7, -3.4); frame.lineTo(2.7, 2.35); frame.lineTo(1.65, 3.4);
  frame.lineTo(-1.65, 3.4); frame.lineTo(-2.7, 2.35); frame.closePath();
  const hole = new THREE.Path();
  hole.moveTo(-1.75, -2.65); hole.lineTo(-1.75, 1.9); hole.lineTo(-1.05, 2.65);
  hole.lineTo(1.05, 2.65); hole.lineTo(1.75, 1.9); hole.lineTo(1.75, -2.65); hole.closePath(); frame.holes.push(hole);
  const archGeometry = new THREE.ExtrudeGeometry(frame, { depth: 0.7, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.09, bevelThickness: 0.09 });
  for (let i = 0; i < 3; i++) {
    const arch = new THREE.Mesh(archGeometry, i === 1 ? trim : bronze);
    arch.position.z = -i * 0.65; arch.scale.setScalar(1 + i * 0.06); machine.add(arch);
  }
  for (const side of [-1, 1]) {
    box(0.7, 5.1, 1.5, side * 3.05, -0.65, -0.45, dark);
    for (let i = 0; i < 6; i++) {
      const tooth = box(0.84, 0.25, 1.75, side * 3.05, i * 0.8 - 2.9, -0.35, bronze); tooth.rotation.z = side * 0.1;
      box(0.12, 0.35, 0.09, side * 2.65, i * 0.78 - 2.55, 0.84, energy);
    }
    box(0.09, 3.5, 0.12, side * 1.99, -0.25, 0.85, energy);
  }
  box(7.7, 0.36, 4.2, 0, -3.85, 0.3, dark);
  box(6.8, 0.3, 3.4, 0, -3.55, 0.3, bronze);
  box(3.8, 0.1, 0.08, 0, -3.35, 1.5, energy);
  const left = box(1.65, 5.15, 0.4, -0.88, -0.08, 0.22, dark);
  const right = box(1.65, 5.15, 0.4, 0.88, -0.08, 0.22, dark);
  for (const shutter of [left, right]) {
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(shutter.geometry), new THREE.LineBasicMaterial({ color: '#a37842' })); shutter.add(edge);
  }
  const surfaceMaterial = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, charge: { value: 0 } }, transparent: true, side: THREE.DoubleSide,
    vertexShader: 'varying vec2 uvPoint; void main(){uvPoint=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: `
      varying vec2 uvPoint; uniform float time; uniform float charge;
      void main(){
        vec2 p=uvPoint*2.0-1.0;
        float veins=sin(p.x*13.0+sin(p.y*9.0+time)*1.8+time*.7)*sin(p.y*17.0-p.x*4.0-time*.9);
        float fracture=pow(abs(veins),14.0);
        float edge=pow(abs(p.x),7.0)+pow(abs(p.y),7.0);
        vec3 c=mix(vec3(.012,.009,.018),vec3(.9,.34,.045),fracture*(.18+charge*.65)+edge*.22);
        gl_FragColor=vec4(c,.95);
      }`,
  });
  const surface = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 5.25), surfaceMaterial); surface.position.z = -0.4; machine.add(surface);
  const dustGeometry = new THREE.BufferGeometry(), positions = new Float32Array(150 * 3);
  for (let i = 0; i < 150; i++) { positions[i * 3] = Math.sin(i * 7.1) * 4.4; positions[i * 3 + 1] = Math.cos(i * 3.3) * 4; positions[i * 3 + 2] = -1 + (i % 11) / 4; }
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: '#dcb16c', size: 0.035, transparent: true, opacity: 0.55 })); scene.add(dust);
  const corridor = new THREE.Group(); scene.add(corridor); corridor.visible = traversal;
  if (traversal) {
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
      const open = travel < 0 ? charge * 0.35 : Math.min(1, travel / 0.28);
      left.position.x = -0.88 - open * 2; right.position.x = 0.88 + open * 2;
      energy.emissiveIntensity = 0.45 + charge * 1.6; rim.intensity = 15 + charge * 20;
      dust.rotation.z = Math.sin(time * 0.15) * 0.05;
      if (travel < 0) {
        camera.position.set(7 + nx * 1.5, 3.7 - ny * 0.7, 14.5);
        camera.lookAt(0, -0.25, 0); scene.background = null;
      } else {
        scene.background = travel < 0.34 ? null : new THREE.Color('#03030a');
        const approach = Math.min(1, travel / 0.34), crossing = Math.max(0, (travel - 0.34) / 0.66);
        const distance = exit ? Math.pow(crossing, 0.65) : Math.pow(crossing, 1.6);
        corridor.rotation.y = exit && crossing > 0 ? Math.PI : 0;
        machine.position.z = exit && crossing > 0 ? 135 : 0;
        machine.rotation.y = exit && crossing > 0 ? Math.PI : 0;
        camera.position.set((1 - approach) * 7 + Math.sin(crossing * Math.PI) * 0.8, (1 - approach) * 3.7, crossing > 0 ? (exit ? distance * 160 : -distance * 120) : 14.5 * (1 - approach));
        camera.lookAt(camera.position.x * 0.3, 0, camera.position.z + (exit && crossing > 0 ? 8 : -8));
        camera.rotation.z += Math.sin(crossing * Math.PI) * (exit ? -0.16 : 0.09);
        camera.fov = 42 + Math.sin(crossing * Math.PI) * (exit ? 38 : 28); camera.updateProjectionMatrix();
        surface.visible = travel < 0.3; dust.visible = travel < 0.34;
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
