// useParticles.js
import { useEffect, useRef } from "react";

export const useParticles = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mql && mql.matches) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);
    const area = window.innerWidth * window.innerHeight;
    const base = Math.round(area / 25000);
    const count = Math.max(30, Math.min(90, base));

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.6,
      a: Math.random() * 2 * Math.PI,
      v: Math.random() * 0.3 + 0.2,
      o: Math.random() * 0.5 + 0.2,
    }));

    let rafId;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += Math.cos(p.a) * p.v;
        p.y += Math.sin(p.a) * p.v * 0.6;
        p.a += (Math.random() - 0.5) * 0.05;
        if (p.x < -5) p.x = window.innerWidth + 5;
        if (p.x > window.innerWidth + 5) p.x = -5;
        if (p.y < -5) p.y = window.innerHeight + 5;
        if (p.y > window.innerHeight + 5) p.y = -5;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const p1 = pts[i];
          const p2 = pts[j];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.3;
            ctx.strokeStyle = `rgba(34,167,232,${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,167,232,${p.o})`;
        ctx.shadowColor = "rgba(34,167,232,0.5)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { canvasRef };
};
