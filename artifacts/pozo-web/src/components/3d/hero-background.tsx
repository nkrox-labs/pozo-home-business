import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(100, Math.floor((canvas.width * canvas.height) / 14000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random(),
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const drawGrid = () => {
      const gs = 90;
      const cols = Math.ceil(canvas.width / gs) + 1;
      const rows = Math.ceil(canvas.height / gs) + 1;
      const ox = (time * 8) % gs;
      const oy = (time * 4) % gs;
      ctx.strokeStyle = "rgba(245,158,11,0.035)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gs - ox, 0);
        ctx.lineTo(i * gs - ox, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * gs - oy);
        ctx.lineTo(canvas.width, j * gs - oy);
        ctx.stroke();
      }
    };

    const drawConnections = () => {
      const maxDist = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i]!;
          const q = particles[j]!;
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(245,158,11,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawParticles = () => {
      for (const p of particles) {
        const pulse = Math.sin(time * 2 + p.z * Math.PI * 2) * 0.3 + 0.7;
        const alpha = p.opacity * pulse;
        const r = p.size * 3;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `rgba(245,158,11,${alpha})`);
        g.addColorStop(0.5, `rgba(251,191,36,${alpha * 0.4})`);
        g.addColorStop(1, `rgba(245,158,11,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0, "rgb(8,6,3)");
      bg.addColorStop(0.5, "rgb(12,9,4)");
      bg.addColorStop(1, "rgb(5,5,5)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawConnections();

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
      }

      drawParticles();

      const gx = canvas.width * 0.5 + Math.sin(time * 0.3) * canvas.width * 0.15;
      const gy = canvas.height * 0.4 + Math.cos(time * 0.2) * canvas.height * 0.1;
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, canvas.width * 0.45);
      glow.addColorStop(0, "rgba(245,158,11,0.025)");
      glow.addColorStop(0.6, "rgba(180,83,9,0.01)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    const onResize = () => { resize(); initParticles(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
