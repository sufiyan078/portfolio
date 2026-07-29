import React, { useEffect, useRef } from 'react';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let scrollProgress = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Scroll tracker for warrior movement
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = docHeight > 0 ? window.scrollY / docHeight : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Stars in dark sky
    const starCount = 60;
    const stars: Array<{ x: number; y: number; size: number; alpha: number; speed: number }> = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.45),
        size: Math.random() < 0.3 ? 2 : 1.5,
        alpha: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.02
      });
    }

    // Moving Clouds Effect (7 animated drifting clouds across sky)
    const clouds = [
      { x: width * 0.02, y: height * 0.06, speed: 0.24, scale: 6.5, opacity: 0.92 },
      { x: width * 0.28, y: height * 0.16, speed: 0.18, scale: 5.5, opacity: 0.86 },
      { x: width * 0.52, y: height * 0.08, speed: 0.28, scale: 7, opacity: 0.90 },
      { x: width * 0.78, y: height * 0.22, speed: 0.15, scale: 6, opacity: 0.88 },
      { x: width * 0.15, y: height * 0.32, speed: 0.22, scale: 5, opacity: 0.82 },
      { x: width * 0.42, y: height * 0.38, speed: 0.19, scale: 6.5, opacity: 0.85 },
      { x: width * 0.88, y: height * 0.35, speed: 0.25, scale: 5.5, opacity: 0.87 }
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Dark Atmospheric Monochrome Sky Background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#070A10');
      skyGrad.addColorStop(0.5, '#111724');
      skyGrad.addColorStop(1, '#05070B');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Twinkling Sky Stars
      for (const s of stars) {
        s.alpha += s.speed;
        const opacity = (Math.sin(s.alpha) + 1) / 2;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.75})`;
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
      }

      // 3. Moving Clouds Layer (Upper & Mid Sky)
      for (const c of clouds) {
        c.x += c.speed;
        if (c.x > width + 160) c.x = -160;

        const p = c.scale;
        ctx.globalAlpha = c.opacity;

        const cloudLines = [
          { dx: 4, dy: 0, w: 4, color: '#2A3A5C' },
          { dx: 3, dy: 1, w: 7, color: '#253352' },
          { dx: 8, dy: 1, w: 3, color: '#2A3A5C' },
          { dx: 2, dy: 2, w: 11, color: '#1E2D4A' },
          { dx: 1, dy: 3, w: 14, color: '#192640' },
          { dx: 0, dy: 4, w: 16, color: '#142036' },
          { dx: 1, dy: 5, w: 15, color: '#101B2E' }
        ];

        for (const line of cloudLines) {
          ctx.fillStyle = line.color;
          ctx.fillRect(
            Math.floor(c.x + line.dx * p),
            Math.floor(c.y + line.dy * p),
            line.w * p,
            p
          );
        }
      }
      ctx.globalAlpha = 1.0;

      // 4. Moon Orb (Right side horizon)
      const sunX = width * 0.72;
      const sunY = height * 0.40;
      const sunR = Math.min(width, height) * 0.08;

      // Large ambient moonlight wash on the sky (drawn before mountains)
      const moonAmbient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 8);
      moonAmbient.addColorStop(0, 'rgba(180, 200, 220, 0.18)');
      moonAmbient.addColorStop(0.25, 'rgba(140, 165, 195, 0.10)');
      moonAmbient.addColorStop(0.5, 'rgba(100, 130, 170, 0.05)');
      moonAmbient.addColorStop(1, 'rgba(7, 10, 16, 0)');
      ctx.fillStyle = moonAmbient;
      ctx.fillRect(0, 0, width, height);

      // Moon inner glow halo
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 4);
      sunGlow.addColorStop(0, 'rgba(220, 230, 240, 0.50)');
      sunGlow.addColorStop(0.15, 'rgba(180, 200, 220, 0.30)');
      sunGlow.addColorStop(0.4, 'rgba(120, 150, 185, 0.12)');
      sunGlow.addColorStop(1, 'rgba(7, 10, 16, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR * 4, 0, Math.PI * 2);
      ctx.fill();

      // Moon Disc Core
      ctx.fillStyle = '#E2E8F0';
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
      ctx.fill();

      // 5. Far Distant Mountain Range (Layer 1)
      ctx.fillStyle = '#131A26';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.52);
      ctx.lineTo(width * 0.12, height * 0.44);
      ctx.lineTo(width * 0.28, height * 0.50);
      ctx.lineTo(width * 0.45, height * 0.38);
      ctx.lineTo(width * 0.60, height * 0.46);
      ctx.lineTo(width * 0.75, height * 0.35);
      ctx.lineTo(width * 0.88, height * 0.44);
      ctx.lineTo(width, height * 0.38);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Moonlight reflected on far mountains
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const farMountainLight = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 6);
      farMountainLight.addColorStop(0, 'rgba(160, 180, 210, 0.14)');
      farMountainLight.addColorStop(0.4, 'rgba(100, 130, 165, 0.06)');
      farMountainLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = farMountainLight;
      ctx.fillRect(width * 0.4, height * 0.3, width * 0.6, height * 0.4);
      ctx.restore();

      // 6. Mid-Ground Dark Mountain Ranges (Layer 2)
      ctx.fillStyle = '#0E1520';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.62);
      ctx.lineTo(width * 0.18, height * 0.48);
      ctx.lineTo(width * 0.32, height * 0.56);
      ctx.lineTo(width * 0.48, height * 0.42);
      ctx.lineTo(width * 0.68, height * 0.52);
      ctx.lineTo(width * 0.82, height * 0.40);
      ctx.lineTo(width, height * 0.48);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Moonlight reflected on mid mountains
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const midMountainLight = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 5);
      midMountainLight.addColorStop(0, 'rgba(140, 165, 200, 0.10)');
      midMountainLight.addColorStop(0.4, 'rgba(80, 110, 150, 0.04)');
      midMountainLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = midMountainLight;
      ctx.fillRect(width * 0.45, height * 0.35, width * 0.55, height * 0.35);
      ctx.restore();



      // 9. Low Smooth Horizon Mountain Range (Layer 5)
      ctx.fillStyle = '#111724';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.72);
      ctx.lineTo(width * 0.20, height * 0.64);
      ctx.lineTo(width * 0.40, height * 0.70);
      ctx.lineTo(width * 0.65, height * 0.62);
      ctx.lineTo(width * 0.85, height * 0.68);
      ctx.lineTo(width, height * 0.63);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // 10. Foreground Low Dark Ground Layer
      ctx.fillStyle = '#070A10';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.80);
      ctx.lineTo(width * 0.25, height * 0.74);
      ctx.lineTo(width * 0.55, height * 0.82);
      ctx.lineTo(width * 0.80, height * 0.76);
      ctx.lineTo(width, height * 0.82);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Helper functions for drawing dark silhouettes of trees
      const drawPineTree = (tx: number, ty: number, tHeight: number, tWidth: number) => {
        ctx.fillStyle = '#04060A';
        // Tier 1 (top)
        ctx.beginPath();
        ctx.moveTo(tx, ty - tHeight);
        ctx.lineTo(tx - tWidth * 0.4, ty - tHeight * 0.5);
        ctx.lineTo(tx + tWidth * 0.4, ty - tHeight * 0.5);
        ctx.closePath();
        ctx.fill();
        // Tier 2 (middle)
        ctx.beginPath();
        ctx.moveTo(tx, ty - tHeight * 0.65);
        ctx.lineTo(tx - tWidth * 0.5, ty - tHeight * 0.15);
        ctx.lineTo(tx + tWidth * 0.5, ty - tHeight * 0.15);
        ctx.closePath();
        ctx.fill();
        // Trunk
        ctx.fillRect(tx - 2, ty - tHeight * 0.15, 4, tHeight * 0.15);
      };

      const drawLeafyTree = (tx: number, ty: number, radius: number) => {
        ctx.fillStyle = '#04060A';
        ctx.beginPath();
        ctx.arc(tx, ty - radius * 1.2, radius, 0, Math.PI * 2);
        ctx.arc(tx - radius * 0.5, ty - radius * 0.8, radius * 0.7, 0, Math.PI * 2);
        ctx.arc(tx + radius * 0.5, ty - radius * 0.8, radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(tx - 3, ty - radius * 0.5, 6, radius * 0.9);
      };

      // 7. Render Forest Line across landscape (Left, Center, Right)
      // Left side trees
      drawLeafyTree(width * 0.05, height * 0.76, 18);
      drawPineTree(width * 0.09, height * 0.77, 45, 26);
      drawLeafyTree(width * 0.14, height * 0.78, 16);
      drawPineTree(width * 0.18, height * 0.79, 40, 22);
      drawPineTree(width * 0.22, height * 0.76, 35, 20);

      // Center horizon distant pine trees
      drawPineTree(width * 0.34, height * 0.76, 28, 16);
      drawPineTree(width * 0.38, height * 0.77, 32, 18);
      drawPineTree(width * 0.62, height * 0.78, 30, 16);
      drawPineTree(width * 0.67, height * 0.77, 34, 20);

      // Right side pine trees
      drawPineTree(width * 0.78, height * 0.78, 42, 24);
      drawPineTree(width * 0.83, height * 0.74, 52, 30);
      drawPineTree(width * 0.89, height * 0.75, 48, 28);
      drawPineTree(width * 0.94, height * 0.76, 38, 22);

      // 8. Bottom Foreground Shadow Bar
      ctx.fillStyle = '#020305';
      ctx.fillRect(0, height * 0.94, width, height * 0.06);

      // 9. Mounted Knight on Horseback (scroll-driven left → right)
      const warriorGroundY = height * 0.91;
      const startX = width * 0.02;
      const endX = width * 0.94;
      const warriorX = startX + (endX - startX) * scrollProgress;
      const p = 2; // pixel size
      const frame = Math.floor(Date.now() / 200) % 4; // 4-frame gallop animation

      const drawMountedKnight = (cx: number, cy: number) => {
        // === HORSE ===
        // Horse body (brown)
        ctx.fillStyle = '#A0652A';
        ctx.fillRect(cx - 8 * p, cy - 6 * p, 18 * p, 5 * p);
        ctx.fillRect(cx - 7 * p, cy - 7 * p, 16 * p, p);
        ctx.fillRect(cx - 6 * p, cy - 8 * p, 14 * p, p);
        // Belly
        ctx.fillStyle = '#8B5522';
        ctx.fillRect(cx - 6 * p, cy - 2 * p, 14 * p, 2 * p);

        // Horse dark shading
        ctx.fillStyle = '#7A4A1E';
        ctx.fillRect(cx - 7 * p, cy - 4 * p, 2 * p, 3 * p);
        ctx.fillRect(cx + 7 * p, cy - 4 * p, 2 * p, 3 * p);

        // Saddle (red)
        ctx.fillStyle = '#B22222';
        ctx.fillRect(cx - 3 * p, cy - 9 * p, 8 * p, 2 * p);
        ctx.fillRect(cx - 2 * p, cy - 10 * p, 6 * p, p);
        // Saddle blanket
        ctx.fillStyle = '#8B1A1A';
        ctx.fillRect(cx - 4 * p, cy - 8 * p, 10 * p, p);

        // Horse neck
        ctx.fillStyle = '#A0652A';
        ctx.fillRect(cx + 8 * p, cy - 10 * p, 3 * p, 5 * p);
        ctx.fillRect(cx + 9 * p, cy - 12 * p, 3 * p, 3 * p);
        ctx.fillRect(cx + 10 * p, cy - 14 * p, 2 * p, 3 * p);
        // Mane (dark brown)
        ctx.fillStyle = '#4A2A10';
        ctx.fillRect(cx + 8 * p, cy - 12 * p, p, 4 * p);
        ctx.fillRect(cx + 9 * p, cy - 14 * p, p, 3 * p);

        // Horse head
        ctx.fillStyle = '#B07030';
        ctx.fillRect(cx + 11 * p, cy - 16 * p, 3 * p, 4 * p);
        ctx.fillRect(cx + 12 * p, cy - 17 * p, 3 * p, 2 * p);
        // Nose
        ctx.fillStyle = '#8B5522';
        ctx.fillRect(cx + 13 * p, cy - 14 * p, 2 * p, 2 * p);
        // Eye
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(cx + 12 * p, cy - 16 * p, p, p);
        // Ear
        ctx.fillStyle = '#A0652A';
        ctx.fillRect(cx + 12 * p, cy - 18 * p, p, 2 * p);
        // Bridle
        ctx.fillStyle = '#2A1A0A';
        ctx.fillRect(cx + 11 * p, cy - 15 * p, 4 * p, p);

        // Horse tail
        ctx.fillStyle = '#3A1E0A';
        if (frame < 2) {
          ctx.fillRect(cx - 9 * p, cy - 7 * p, 2 * p, p);
          ctx.fillRect(cx - 11 * p, cy - 6 * p, 3 * p, p);
          ctx.fillRect(cx - 12 * p, cy - 5 * p, 3 * p, p);
          ctx.fillRect(cx - 12 * p, cy - 4 * p, 2 * p, p);
        } else {
          ctx.fillRect(cx - 9 * p, cy - 8 * p, 2 * p, p);
          ctx.fillRect(cx - 11 * p, cy - 7 * p, 3 * p, p);
          ctx.fillRect(cx - 13 * p, cy - 6 * p, 3 * p, p);
          ctx.fillRect(cx - 13 * p, cy - 5 * p, 2 * p, p);
        }

        // Horse legs (4-frame gallop animation)
        ctx.fillStyle = '#7A4A1E';
        const legTop = cy - p;
        const legLen = 5 * p;
        // Front legs
        if (frame === 0) {
          ctx.fillRect(cx + 5 * p, legTop, 2 * p, legLen);
          ctx.fillRect(cx + 7 * p, legTop, 2 * p, legLen - p);
        } else if (frame === 1) {
          ctx.fillRect(cx + 6 * p, legTop, 2 * p, legLen + p);
          ctx.fillRect(cx + 4 * p, legTop, 2 * p, legLen - 2 * p);
        } else if (frame === 2) {
          ctx.fillRect(cx + 7 * p, legTop, 2 * p, legLen);
          ctx.fillRect(cx + 5 * p, legTop, 2 * p, legLen);
        } else {
          ctx.fillRect(cx + 4 * p, legTop, 2 * p, legLen - 2 * p);
          ctx.fillRect(cx + 7 * p, legTop, 2 * p, legLen + p);
        }
        // Back legs
        if (frame === 0) {
          ctx.fillRect(cx - 6 * p, legTop, 2 * p, legLen - p);
          ctx.fillRect(cx - 4 * p, legTop, 2 * p, legLen);
        } else if (frame === 1) {
          ctx.fillRect(cx - 5 * p, legTop, 2 * p, legLen + p);
          ctx.fillRect(cx - 7 * p, legTop, 2 * p, legLen - 2 * p);
        } else if (frame === 2) {
          ctx.fillRect(cx - 4 * p, legTop, 2 * p, legLen);
          ctx.fillRect(cx - 6 * p, legTop, 2 * p, legLen);
        } else {
          ctx.fillRect(cx - 7 * p, legTop, 2 * p, legLen - 2 * p);
          ctx.fillRect(cx - 4 * p, legTop, 2 * p, legLen + p);
        }
        // Hooves
        ctx.fillStyle = '#1A1008';
        if (frame === 0) {
          ctx.fillRect(cx + 5 * p, legTop + legLen, 2 * p, p);
          ctx.fillRect(cx + 7 * p, legTop + legLen - p, 2 * p, p);
          ctx.fillRect(cx - 6 * p, legTop + legLen - p, 2 * p, p);
          ctx.fillRect(cx - 4 * p, legTop + legLen, 2 * p, p);
        } else if (frame === 1) {
          ctx.fillRect(cx + 6 * p, legTop + legLen + p, 2 * p, p);
          ctx.fillRect(cx + 4 * p, legTop + legLen - 2 * p, 2 * p, p);
          ctx.fillRect(cx - 5 * p, legTop + legLen + p, 2 * p, p);
          ctx.fillRect(cx - 7 * p, legTop + legLen - 2 * p, 2 * p, p);
        } else if (frame === 2) {
          ctx.fillRect(cx + 7 * p, legTop + legLen, 2 * p, p);
          ctx.fillRect(cx + 5 * p, legTop + legLen, 2 * p, p);
          ctx.fillRect(cx - 4 * p, legTop + legLen, 2 * p, p);
          ctx.fillRect(cx - 6 * p, legTop + legLen, 2 * p, p);
        } else {
          ctx.fillRect(cx + 4 * p, legTop + legLen - 2 * p, 2 * p, p);
          ctx.fillRect(cx + 7 * p, legTop + legLen + p, 2 * p, p);
          ctx.fillRect(cx - 7 * p, legTop + legLen - 2 * p, 2 * p, p);
          ctx.fillRect(cx - 4 * p, legTop + legLen + p, 2 * p, p);
        }

        // === KNIGHT (on horse) ===
        // Knight legs (over horse)
        ctx.fillStyle = '#778899';
        ctx.fillRect(cx - 2 * p, cy - 8 * p, 2 * p, 3 * p);
        ctx.fillRect(cx + 3 * p, cy - 8 * p, 2 * p, 3 * p);
        // Boots on stirrups
        ctx.fillStyle = '#555';
        ctx.fillRect(cx - 3 * p, cy - 5 * p, 2 * p, p);
        ctx.fillRect(cx + 4 * p, cy - 5 * p, 2 * p, p);

        // Body armor (silver/steel)
        ctx.fillStyle = '#A8B4C0';
        ctx.fillRect(cx - p, cy - 15 * p, 5 * p, 2 * p);
        ctx.fillRect(cx - 2 * p, cy - 13 * p, 6 * p, 3 * p);
        ctx.fillRect(cx - p, cy - 10 * p, 5 * p, 2 * p);
        // Armor highlights
        ctx.fillStyle = '#C8D4E0';
        ctx.fillRect(cx, cy - 14 * p, p, 3 * p);
        ctx.fillRect(cx + 2 * p, cy - 14 * p, p, 3 * p);
        // Armor red accent
        ctx.fillStyle = '#B22222';
        ctx.fillRect(cx + p, cy - 13 * p, p, 2 * p);

        // Shoulder plates
        ctx.fillStyle = '#8899AA';
        ctx.fillRect(cx - 3 * p, cy - 14 * p, 2 * p, 2 * p);
        ctx.fillRect(cx + 4 * p, cy - 14 * p, 2 * p, 2 * p);

        // Cape (red, flowing behind)
        ctx.fillStyle = '#CC2222';
        if (frame < 2) {
          ctx.fillRect(cx - 3 * p, cy - 15 * p, 2 * p, p);
          ctx.fillRect(cx - 4 * p, cy - 14 * p, 2 * p, 3 * p);
          ctx.fillRect(cx - 5 * p, cy - 12 * p, 2 * p, 4 * p);
          ctx.fillRect(cx - 6 * p, cy - 9 * p, 2 * p, 2 * p);
        } else {
          ctx.fillRect(cx - 3 * p, cy - 15 * p, 2 * p, p);
          ctx.fillRect(cx - 5 * p, cy - 14 * p, 3 * p, 3 * p);
          ctx.fillRect(cx - 6 * p, cy - 12 * p, 3 * p, 4 * p);
          ctx.fillRect(cx - 7 * p, cy - 9 * p, 2 * p, 3 * p);
        }
        ctx.fillStyle = '#991818';
        if (frame < 2) {
          ctx.fillRect(cx - 5 * p, cy - 10 * p, p, 2 * p);
        } else {
          ctx.fillRect(cx - 6 * p, cy - 10 * p, p, 2 * p);
        }

        // Helmet (steel)
        ctx.fillStyle = '#A8B4C0';
        ctx.fillRect(cx, cy - 19 * p, 3 * p, p);
        ctx.fillRect(cx - p, cy - 18 * p, 5 * p, p);
        ctx.fillRect(cx - p, cy - 17 * p, 5 * p, p);
        ctx.fillRect(cx, cy - 16 * p, 3 * p, p);
        // Visor slit
        ctx.fillStyle = '#1A1A2E';
        ctx.fillRect(cx, cy - 17 * p, 3 * p, p);
        // Helmet highlight
        ctx.fillStyle = '#C8D4E0';
        ctx.fillRect(cx + p, cy - 19 * p, p, p);

        // Red plume on helmet
        ctx.fillStyle = '#CC2222';
        ctx.fillRect(cx - p, cy - 22 * p, 2 * p, p);
        ctx.fillRect(cx - 2 * p, cy - 21 * p, 3 * p, p);
        ctx.fillRect(cx - 2 * p, cy - 20 * p, 3 * p, p);
        ctx.fillRect(cx - p, cy - 19 * p, 2 * p, p);
        ctx.fillStyle = '#991818';
        ctx.fillRect(cx - 2 * p, cy - 21 * p, p, 2 * p);

        // Lance / Sword (pointing forward-right)
        ctx.fillStyle = '#AAA';
        ctx.fillRect(cx + 6 * p, cy - 16 * p, 10 * p, p);
        ctx.fillRect(cx + 14 * p, cy - 17 * p, 3 * p, p);
        ctx.fillRect(cx + 15 * p, cy - 16 * p, 3 * p, p);
        ctx.fillRect(cx + 14 * p, cy - 15 * p, 3 * p, p);
        // Sword guard
        ctx.fillStyle = '#DAA520';
        ctx.fillRect(cx + 5 * p, cy - 17 * p, p, 3 * p);
        // Handle
        ctx.fillStyle = '#4A3520';
        ctx.fillRect(cx + 4 * p, cy - 16 * p, p, p);
      };

      drawMountedKnight(warriorX, warriorGroundY);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
};
