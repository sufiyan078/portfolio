import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface DimensionalWarpCanvasProps {
  mode: 'enter' | 'exit';
  onComplete: () => void;
}

export const DimensionalWarpCanvas: React.FC<DimensionalWarpCanvasProps> = ({
  mode,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flashOpacity, setFlashOpacity] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animFrameId: number;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.015);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 600);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x030712, 1);
    container.appendChild(renderer.domElement);

    // 4. 3D Spline Path for Tube Traversal
    const curvePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2.5, -1.8, -35),
      new THREE.Vector3(-3.8, 2.5, -80),
      new THREE.Vector3(4.2, 1.0, -135),
      new THREE.Vector3(-2.2, -2.8, -190),
      new THREE.Vector3(0, 0, -250),
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5);

    // 5. Tube Geometry (Tube along 3D curve with BackSide rendering)
    const tubeGeometry = new THREE.TubeGeometry(curve, 180, 3.5, 28, false);

    // 6. Ancient Technological ShaderMaterial (Black/Void -> Deep Amber -> Orange -> Gold -> White-Hot)
    const shaderMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uDirection: { value: mode === 'enter' ? 1.0 : -1.0 },
        uColorVoid: { value: new THREE.Color('#030712') },
        uColorDeepAmber: { value: new THREE.Color('#78350F') },
        uColorOrange: { value: new THREE.Color('#FF8F00') },
        uColorGold: { value: new THREE.Color('#FBBF24') },
        uColorWhiteHot: { value: new THREE.Color('#FFF6E0') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform float uDirection;
        uniform vec3 uColorVoid;
        uniform vec3 uColorDeepAmber;
        uniform vec3 uColorOrange;
        uniform vec3 uColorGold;
        uniform vec3 uColorWhiteHot;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          // Longitudinal and circumferential coordinates
          float speed = (uDirection > 0.0) 
            ? (uTime * 16.0 + uProgress * 28.0) 
            : (-uTime * 22.0 - (1.0 - uProgress) * 32.0);

          // Dynamic longitudinal energy waves
          float stream1 = sin(vUv.x * 65.0 - speed) * cos(vUv.y * 16.0 + uTime * 2.5);
          float stream2 = sin(vUv.x * 130.0 - speed * 1.6 + 1.57) * sin(vUv.y * 32.0 - uTime * 3.5);

          // Ancient technological geometric conduits / circuit ribs
          float ringRibs = smoothstep(0.86, 0.96, sin(vUv.x * 90.0 - speed * 0.4));
          float longConduits = smoothstep(0.88, 0.96, sin(vUv.y * 24.0));
          float techGrid = ringRibs * 0.65 + longConduits * 0.55;

          // High-speed energy filaments
          float energyPattern = pow((stream1 * 0.5 + 0.5) * 0.6 + (stream2 * 0.5 + 0.5) * 0.4, 2.4);

          // Total energy density
          float totalEnergy = energyPattern * 1.35 + techGrid * 0.85;

          // Portfolio ancient palette gradient: Void -> Deep Amber -> Orange -> Gold -> White Hot
          vec3 color = uColorVoid;
          if (totalEnergy < 0.32) {
            color = mix(uColorVoid, uColorDeepAmber, totalEnergy / 0.32);
          } else if (totalEnergy < 0.68) {
            color = mix(uColorDeepAmber, uColorOrange, (totalEnergy - 0.32) / 0.36);
          } else if (totalEnergy < 0.90) {
            color = mix(uColorOrange, uColorGold, (totalEnergy - 0.68) / 0.22);
          } else {
            color = mix(uColorGold, uColorWhiteHot, clamp((totalEnergy - 0.90) / 0.25, 0.0, 1.0));
          }

          // Longitudinal fade at tunnel start and end
          float edgeFade = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
          float pulse = sin(uTime * 9.0 + vUv.x * 12.0) * 0.15 + 0.85;

          gl_FragColor = vec4(color * pulse, edgeFade);
        }
      `,
    });

    const tubeMesh = new THREE.Mesh(tubeGeometry, shaderMaterial);
    scene.add(tubeMesh);

    // 7. Dimensional Energy Dust Particles (1,200 points inside tube)
    const particleCount = 1200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleOffsets: number[] = [];

    const goldColor = new THREE.Color('#FBBF24');
    const orangeColor = new THREE.Color('#FF8F00');
    const whiteColor = new THREE.Color('#FFF6E0');

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      particleOffsets.push(t);
      const point = curve.getPointAt(t);
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2.6 + 0.3; // inside tube
      particlePositions[i * 3] = point.x + Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = point.y + Math.sin(angle) * radius;
      particlePositions[i * 3 + 2] = point.z;

      const cRand = Math.random();
      const col = cRand > 0.65 ? whiteColor : cRand > 0.3 ? orangeColor : goldColor;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlePoints);

    // 8. Animation & Traversal Parameters
    const startTime = performance.now();
    const duration = mode === 'enter' ? 1450 : 1150; // Milliseconds
    let isFinished = false;

    // 9. Render Loop (Runs monotonically 0.0 -> 1.0, NO CONTINUOUS LOOP)
    const animate = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);

      // Traversal Curves
      let cameraT: number;
      let fov: number;

      if (mode === 'enter') {
        // Accelerate into portal, peak velocity in middle-end, then threshold
        const ease = Math.pow(progress, 2.3);
        cameraT = Math.min(0.96, ease * 0.95);
        // Dynamic FOV: 65 -> 106 at hyper-speed peak -> 70 at arrival
        fov = 65 + Math.sin(progress * Math.PI) * 41;

        // White-hot threshold flash as progress nears 1.0
        if (progress > 0.85) {
          setFlashOpacity(Math.min(1.0, (progress - 0.85) / 0.15));
        }
      } else {
        // Reverse explosive ejection from void to world
        const ease = 1.0 - Math.pow(1.0 - progress, 2.2);
        cameraT = Math.max(0.02, 0.96 - ease * 0.94);
        // Ejection FOV: 105 -> 65
        fov = 105 - progress * 40;

        if (progress < 0.25) {
          setFlashOpacity(1.0 - progress / 0.25);
        } else {
          setFlashOpacity(0);
        }
      }

      // Update Camera along 3D Curve
      const camPos = curve.getPointAt(cameraT);
      const lookAheadT = mode === 'enter' ? Math.min(1.0, cameraT + 0.04) : Math.max(0.0, cameraT - 0.04);
      const targetPos = curve.getPointAt(lookAheadT);

      camera.position.copy(camPos);
      camera.lookAt(targetPos);
      camera.fov = fov;
      // Banking roll effect
      camera.rotation.z = Math.sin(progress * Math.PI * 2.0) * (mode === 'enter' ? 0.3 : -0.3);
      camera.updateProjectionMatrix();

      // Update Shader Uniforms
      shaderMaterial.uniforms.uTime.value = elapsed * 0.001;
      shaderMaterial.uniforms.uProgress.value = progress;

      // Animate Particles Past Camera
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      const speedFactor = mode === 'enter' ? (progress * 0.015 + 0.003) : -((1.0 - progress) * 0.018 + 0.003);

      for (let i = 0; i < particleCount; i++) {
        let t = particleOffsets[i] + speedFactor;
        if (t > 1.0) t -= 1.0;
        if (t < 0.0) t += 1.0;
        particleOffsets[i] = t;

        const pt = curve.getPointAt(t);
        positions[i * 3 + 2] = pt.z;
      }
      posAttr.needsUpdate = true;

      // Render Frame
      renderer.render(scene, camera);

      // Check Completion (Progress reaches 1.0: Stop renderer, DO NOT LOOP)
      if (progress >= 1.0 && !isFinished) {
        isFinished = true;
        onComplete();
        return;
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    // 10. Handle Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 11. Cleanup & WebGL Disposal
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);

      scene.remove(tubeMesh);
      scene.remove(particlePoints);

      tubeGeometry.dispose();
      shaderMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mode, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none pointer-events-auto"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        background: '#030712',
      }}
    >
      {/* Dimensional Threshold Flash (White-Hot Burst at destination) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-75"
        style={{
          opacity: flashOpacity,
          background:
            'radial-gradient(circle at center, rgba(255,246,224,1) 0%, rgba(255,143,0,0.92) 35%, rgba(120,53,15,0.95) 70%, #030712 100%)',
        }}
      />
    </div>
  );
};
