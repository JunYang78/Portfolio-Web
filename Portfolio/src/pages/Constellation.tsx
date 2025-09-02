import { useEffect, useRef, useState } from "react";

type Dot = { 
  x: number; 
  y: number; 
  size: number; 
  intensity: number; 
  vx: number; 
  vy: number; 
};
type Ripple = { x: number; y: number; radius: number; alpha: number };

const Constellation = () => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const fgCanvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const ripplesRef = useRef<Ripple[]>([]);

  // Orb pulse animation
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    let pulseFrame: number;
    const animatePulse = () => {
      const scale = Math.sin(Date.now() / 500) * 0.2 + 1; // 0.8 – 1.2
      setPulse(scale);
      pulseFrame = requestAnimationFrame(animatePulse);
    };
    animatePulse();
    return () => cancelAnimationFrame(pulseFrame);
  }, []);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const fgCanvas = fgCanvasRef.current;
    if (!bgCanvas || !fgCanvas) return;

    const bgCtx = bgCanvas.getContext("2d");
    const fgCtx = fgCanvas.getContext("2d");
    if (!bgCtx || !fgCtx) return;

    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    fgCanvas.width = window.innerWidth;
    fgCanvas.height = window.innerHeight;

    // === Generate dots ONCE ===
    const totalDots = 500;
    dotsRef.current = Array.from({ length: totalDots }, () => ({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      size: 2,
      intensity: 0,
      vx: 0,
      vy: 0,
    }));

    // === Draw static starfield once on bgCanvas ===
    dotsRef.current.forEach((dot) => {
      bgCtx.fillStyle = `rgba(255,255,255,0.25)`;
      bgCtx.beginPath();
      bgCtx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      bgCtx.fill();
    });

    const animate = () => {
      fgCtx.clearRect(0, 0, fgCanvas.width, fgCanvas.height);

      const { x: cx, y: cy } = cursorRef.current;

      // Find nearest 6 dots
      type Near = { dot: Dot; distSq: number };
      let nearest: Near[] = [];
      dotsRef.current.forEach((dot) => {
        const distSq = (dot.x - cx) ** 2 + (dot.y - cy) ** 2;
        if (nearest.length < 6) {
          nearest.push({ dot, distSq });
          nearest.sort((a, b) => a.distSq - b.distSq);
        } else if (distSq < nearest[5].distSq) {
          nearest[5] = { dot, distSq };
          nearest.sort((a, b) => a.distSq - b.distSq);
        }
      });

      const connectedIds = new Set(nearest.map(({ dot }) => dot));

      // Update dot intensities smoothly
      dotsRef.current.forEach((dot) => {
        const target = connectedIds.has(dot) ? 1 : 0;
        dot.intensity += (target - dot.intensity) * 0.05;

        // Apply velocity decay
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.vx *= 0.95;
        dot.vy *= 0.95;
      });

      // === Draw gradient connections with smoother transitions ===
      nearest.forEach(({ dot }, i) => {
        const midX = (cx + dot.x) / 2;
        const midY = (cy + dot.y) / 2;
        const waveOffset = Math.sin(Date.now() / 300 + i) * 20;

        const gradient = fgCtx.createLinearGradient(cx, cy, dot.x, dot.y);
        gradient.addColorStop(0.0, "rgba(0, 220, 255, 1)");   // bright cyan
        gradient.addColorStop(0.25, "rgba(0, 180, 255, 0.9)"); // aqua
        gradient.addColorStop(0.5, "rgba(0, 150, 255, 0.7)");  // blue
        gradient.addColorStop(0.75, "rgba(0, 120, 255, 0.4)"); // soft blue
        gradient.addColorStop(1.0, "rgba(0, 80, 200, 0)");     // fade out

        fgCtx.beginPath();
        fgCtx.moveTo(cx, cy);
        fgCtx.quadraticCurveTo(midX + waveOffset, midY - waveOffset, dot.x, dot.y);
        fgCtx.strokeStyle = gradient;
        fgCtx.lineWidth = 2;
        fgCtx.shadowBlur = 18;
        fgCtx.shadowColor = "rgba(0,200,255,1)";
        fgCtx.stroke();
      });

      // Draw dots with intensity
      dotsRef.current.forEach((dot) => {
        if (dot.intensity > 0.01) {
          const glow = dot.intensity * 15;
          fgCtx.beginPath();
          fgCtx.arc(dot.x, dot.y, dot.size * (1 + dot.intensity), 0, Math.PI * 2);
          fgCtx.fillStyle = `rgba(0,200,255,${0.5 + 0.5 * dot.intensity})`;
          fgCtx.shadowBlur = glow;
          fgCtx.shadowColor = "rgba(0,200,255,1)";
          fgCtx.fill();
        }
      });

      // === CLICK EFFECT: ripples WITHOUT push, with smooth fade ===
      ripplesRef.current.forEach((r) => {
        r.radius += 3; // expand
        r.alpha -= 0.02; // fade

        // Draw ripple
        fgCtx.beginPath();
        fgCtx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        fgCtx.strokeStyle = `rgba(0,150,255,${r.alpha})`;
        fgCtx.lineWidth = 3;
        fgCtx.shadowBlur = 25;
        fgCtx.shadowColor = "rgba(0,150,255,1)";
        fgCtx.stroke();

        // Light up stars inside ripple
        dotsRef.current.forEach((dot) => {
          const dx = dot.x - r.x;
          const dy = dot.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < r.radius + 20 && dist > 5) {
            dot.intensity = Math.max(dot.intensity, 1); // bump intensity up
          }
        });
      });

      // Remove faded ripples
      ripplesRef.current = ripplesRef.current.filter((r) => r.alpha > 0);

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <main
      className="relative min-h-screen bg-black overflow-hidden cursor-none"
      onMouseMove={(e) => {
        cursorRef.current = { x: e.clientX, y: e.clientY };
        setCursor({ x: e.clientX, y: e.clientY });
      }}
      onClick={() => {
        ripplesRef.current.push({
          x: cursorRef.current.x,
          y: cursorRef.current.y,
          radius: 0,
          alpha: 1,
        });
      }}
    >
      {/* Background stars */}
      <canvas ref={bgCanvasRef} className="absolute top-0 left-0" />

      {/* Foreground connections + glowing dots */}
      <canvas ref={fgCanvasRef} className="absolute top-0 left-0" />

      {/* Pulsing blue orb */}
      <div
        className="pointer-events-none absolute rounded-full bg-blue-400 z-10"
        style={{
          top: cursor.y,
          left: cursor.x,
          width: `${20 * pulse}px`,
          height: `${20 * pulse}px`,
          boxShadow: `
            0 0 ${25 * pulse}px ${10 * pulse}px rgba(0, 180, 255, 0.9),
            0 0 ${50 * pulse}px ${15 * pulse}px rgba(0, 150, 255, 0.6)
          `,
          transform: "translate(-50%, -50%)",
          transition: "width 0.05s linear, height 0.05s linear, box-shadow 0.05s linear",
        }}
      />
    </main>
  );
};

export default Constellation;
