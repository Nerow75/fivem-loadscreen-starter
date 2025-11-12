// useMouseTrail.js
import { useEffect, useRef } from "react";

export const useMouseTrail = () => {
  const canvasRef = useRef(null);
  const trailPointsRef = useRef([]);

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
    let last = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - last < 16) return;
      last = now;

      trailPointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
      });

      if (trailPointsRef.current.length > 30) {
        trailPointsRef.current.shift();
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let rafId;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      trailPointsRef.current = trailPointsRef.current
        .map((p) => ({ ...p, life: p.life - 0.03 }))
        .filter((p) => p.life > 0);
      const pts = trailPointsRef.current;
      if (pts.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.strokeStyle = "rgba(34, 167, 232, 0.6)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "rgba(34, 167, 232, 0.8)";
        ctx.shadowBlur = 8;
        ctx.stroke();

        pts.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(154, 220, 248, ${p.life * 0.8})`;
          ctx.shadowColor = `rgba(34, 167, 232, ${p.life})`;
          ctx.shadowBlur = 10;
          ctx.fill();
        });
        ctx.shadowBlur = 0;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return { canvasRef };
};
