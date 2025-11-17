// useChristmasMouseTrail.js
// Hook personnalisé pour créer un trail de souris avec effet d'étoiles scintillantes
// Remplace le trail standard par des particules dorées et étoilées

import { useEffect, useRef } from "react";

export const useChristmasMouseTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuration du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Tableau des particules du trail
    const particles = [];
    const maxParticles = 30;

    // Classe Particule avec effet étoile
    class StarParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.color = Math.random() > 0.5 ? "#FFD700" : "#FFF8DC";
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.rotation += this.rotationSpeed;
        this.speedY += 0.05; // Légère gravité
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Dessin de l'étoile
        ctx.fillStyle = this.color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5;
          const radius = i % 2 === 0 ? this.size : this.size / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();

        // Effet de brillance au centre
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.5, this.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Gestion du mouvement de la souris
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Ajout de nouvelles particules
      for (let i = 0; i < 3; i++) {
        if (particles.length < maxParticles) {
          particles.push(new StarParticle(x, y));
        }
      }
    };

    // Animation du trail
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mise à jour et dessin des particules
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);

        // Suppression des particules mortes
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    // Nettoyage
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return { canvasRef };
};
