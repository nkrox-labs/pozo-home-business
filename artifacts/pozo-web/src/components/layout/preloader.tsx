import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHRASES = ["Construimos.", "Reparamos.", "Protegemos."];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }[] = [];

    const colors = ["#f59e0b", "#fbbf24", "#d97706", "#92400e", "#fef3c7"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(animate);
    };
    animate();

    const t1 = setTimeout(() => setPhraseIndex(1), 700);
    const t2 = setTimeout(() => setPhraseIndex(2), 1400);
    const t3 = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <motion.div
                className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-2xl shadow-primary/40"
                animate={{ rotateY: [0, 360] }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
              >
                <span className="text-background font-black text-4xl">P</span>
              </motion.div>
              <div className="text-left">
                <div className="text-white font-bold text-2xl tracking-tight leading-none">POZO</div>
                <div className="text-primary text-xs font-semibold tracking-widest uppercase leading-none mt-1">Home & Business</div>
              </div>
            </motion.div>

            <div className="h-10 overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-2xl md:text-3xl font-bold text-primary"
                >
                  {PHRASES[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 2.0, ease: "easeInOut" }}
              className="w-48 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
