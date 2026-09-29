import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

type Pose = { x: number; y: number; z: number; sx: number; sy: number; sz: number; rz: number };
const count = 64;
function pose(i: number, phase: number): Pose {
  const a = i / count * Math.PI * 2;
  if (phase === 0) return { x: Math.cos(a) * 2.05, y: Math.sin(a) * 2.2, z: Math.sin(a * 2) * .72, sx: .105, sy: 1.18 + Math.sin(a * 3) * .22, sz: .64, rz: a - .5 };
  if (phase === 1) return { x: (i % 8 - 3.5) * .6, y: (Math.floor(i / 8) - 3.5) * .54, z: Math.sin(i / 8) * .2, sx: .47, sy: .35, sz: .25, rz: 0 };
  if (phase === 2) return { x: (i % 4 - 1.5) * 1.05, y: (Math.floor(i / 4) % 4 - 1.5) * 1.05, z: (Math.floor(i / 16) - 1.5) * 1.05, sx: .46, sy: .46, sz: .46, rz: 0 };
  if (phase === 3) { const col = i % 8, row = Math.floor(i / 8); const h = [2.1,3.7,2.7,4.1,3.3,4.6,3.5,4.3][col]; return { x: (col - 3.5) * .64, y: -2 + row / 8 * h, z: 0, sx: .43, sy: h / 8 * .84, sz: .62, rz: 0 }; }
  const col = i % 8, row = Math.floor(i / 8);
  return { x: (col - 3.5) * .62, y: (3.5 - row) * .49, z: row < 2 ? .25 : 0, sx: row < 2 ? .51 : .44, sy: row < 2 ? .3 : .12 + ((i * 7) % 4) * .065, sz: .18, rz: 0 };
}

/** A single instanced sculpture. Frames run only while the view is changing. */
export function createSystemSculpture(host: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 40);
  camera.position.set(0, .2, 11.5);
  const room = new RoomEnvironment();
  const generator = new THREE.PMREMGenerator(renderer);
  const environment = generator.fromScene(room, .04);
  scene.environment = environment.texture;
  room.dispose(); generator.dispose();
  const geometry = new RoundedBoxGeometry(1, 1, 1, 2, .08);
  const material = new THREE.MeshStandardMaterial({ color: '#FFFBD4', metalness: .8, roughness: .23 });
  const pieces = new THREE.InstancedMesh(geometry, material, count);
  pieces.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const ivory = new THREE.Color('#FFFBD4'), copper = new THREE.Color('#C87740');
  for (let i = 0; i < count; i++) pieces.setColorAt(i, i > 36 && i < 53 ? copper : ivory);
  pieces.frustumCulled = false;
  const group = new THREE.Group(); group.add(pieces); scene.add(group);
  const key = new THREE.DirectionalLight('#FFFBD4', 4); key.position.set(-3, 6, 5); scene.add(key);
  const rim = new THREE.DirectionalLight('#CAE8E8', 3); rim.position.set(5, -2, 3); scene.add(rim);
  const object = new THREE.Object3D();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, target = 0, px = 0, py = 0, tx = 0, ty = 0;
  let frame = 0, disposed = false, visible = true, lost = false;
  const canDraw = () => !disposed && !lost && visible && !document.hidden && !host.closest('[inert]');
  const draw = () => {
    frame = 0;
    if (!canDraw()) {host.dataset.motion='paused';return;}
    current = motion.matches ? target : THREE.MathUtils.lerp(current, target, .095);
    px = motion.matches ? 0 : THREE.MathUtils.lerp(px, tx, .08);
    py = motion.matches ? 0 : THREE.MathUtils.lerp(py, ty, .08);
    if (Math.abs(current - target) < .001) current = target;
    const from = Math.min(3, Math.floor(current)), mix = current - from;
    const t = mix * mix * (3 - 2 * mix);
    for (let i = 0; i < count; i++) {
      const a = pose(i, from), b = pose(i, from + 1);
      const lerp = (x: number, y: number) => THREE.MathUtils.lerp(x, y, t);
      object.position.set(lerp(a.x,b.x),lerp(a.y,b.y),lerp(a.z,b.z));
      object.scale.set(lerp(a.sx,b.sx),lerp(a.sy,b.sy),lerp(a.sz,b.sz));
      object.rotation.set(0,0,lerp(a.rz,b.rz)); object.updateMatrix(); pieces.setMatrixAt(i,object.matrix);
    }
    pieces.instanceMatrix.needsUpdate = true;
    group.rotation.set(-.2 + py * .12, -.38 + px * .22, -.18 * (1 - Math.min(current,1)));
    renderer.render(scene,camera);
    const changing = !motion.matches && (Math.abs(current-target)>.001 || Math.abs(px-tx)>.001 || Math.abs(py-ty)>.001);
    host.dataset.motion=changing?'transforming':'settled';
    if (changing) frame=requestAnimationFrame(draw);
  };
  const schedule = () => { if (!frame && canDraw()) frame=requestAnimationFrame(draw); };
  const resize = new ResizeObserver(() => { const {width,height}=host.getBoundingClientRect(); if(!width||!height)return; renderer.setSize(width,height,false); camera.aspect=width/height; camera.position.z=camera.aspect<.9?13:11.5; camera.updateProjectionMatrix(); schedule(); });
  resize.observe(host);
  const intersection = new IntersectionObserver(([entry]) => {visible=entry.isIntersecting; if(!visible){cancelAnimationFrame(frame);frame=0;host.dataset.motion='paused';}else schedule();}); intersection.observe(host);
  const root = document.getElementById('root'); const inert = new MutationObserver(schedule); if(root)inert.observe(root,{attributes:true,attributeFilter:['inert']});
  const onLost = (event: Event) => { event.preventDefault(); lost=true; cancelAnimationFrame(frame);frame=0;host.dataset.renderer='fallback'; };
  const onRestored = () => {lost=false;host.dataset.renderer='ready';schedule();};
  renderer.domElement.addEventListener('webglcontextlost',onLost); renderer.domElement.addEventListener('webglcontextrestored',onRestored);
  document.addEventListener('visibilitychange',schedule); motion.addEventListener('change',schedule);
  host.dataset.renderer='ready'; schedule();
  return {
    setPhase(value:number){ target=Math.max(0,Math.min(4,value));schedule(); },
    setPointer(x:number,y:number){tx=x;ty=y;schedule();},
    dispose(){disposed=true;cancelAnimationFrame(frame);resize.disconnect();intersection.disconnect();inert.disconnect();document.removeEventListener('visibilitychange',schedule);motion.removeEventListener('change',schedule);renderer.domElement.removeEventListener('webglcontextlost',onLost);renderer.domElement.removeEventListener('webglcontextrestored',onRestored);pieces.dispose();geometry.dispose();material.dispose();environment.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();},
  };
}

