import { useEffect, useRef } from 'react';

export const useParticles = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialisation des particules
    const count = 60;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.6,
      a: Math.random() * 2 * Math.PI,
      v: Math.random() * 0.3 + 0.2,
      o: Math.random() * 0.5 + 0.2,
    }));

    let rafId;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Déplacement des particules
      particlesRef.current.forEach((p) => {
        p.x += Math.cos(p.a) * p.v;
        p.y += Math.sin(p.a) * p.v * 0.6;
        p.a += (Math.random() - 0.5) * 0.05;

        // Wrap around edges
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;
      });

      // Constellation : lignes entre particules proches
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
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

      // Dessin des particules
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,167,232,${p.o})`;
        ctx.shadowColor = 'rgba(34,167,232,0.5)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { canvasRef };
};
