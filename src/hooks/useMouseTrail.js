import { useEffect, useRef } from 'react';

export const useMouseTrail = () => {
  const canvasRef = useRef(null);
  const trailPointsRef = useRef([]);

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

    const handleMouseMove = (e) => {
      trailPointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
      });

      // Limiter à 30 points
      if (trailPointsRef.current.length > 30) {
        trailPointsRef.current.shift();
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let rafId;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Dégrader la vie des points
      trailPointsRef.current = trailPointsRef.current
        .map((p) => ({
          ...p,
          life: p.life - 0.03,
        }))
        .filter((p) => p.life > 0);

      // Dessiner le trail
      if (trailPointsRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trailPointsRef.current[0].x, trailPointsRef.current[0].y);

        for (let i = 1; i < trailPointsRef.current.length; i++) {
          const p = trailPointsRef.current[i];
          ctx.lineTo(p.x, p.y);
        }

        ctx.strokeStyle = 'rgba(34, 167, 232, 0.6)';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(34, 167, 232, 0.8)';
        ctx.shadowBlur = 8;
        ctx.stroke();

        // Points lumineux
        trailPointsRef.current.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(154, 220, 248, ${p.life * 0.8})`;
          ctx.shadowColor = `rgba(34, 167, 232, ${p.life})`;
          ctx.shadowBlur = 10;
          ctx.fill();
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { canvasRef };
};
