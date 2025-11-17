// SnowParticles.jsx
// Composant de particules de neige animées pour thème Noël
// Remplace le système de particules standard avec des flocons réalistes

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export const SnowParticles = ({
  canvasRef,
  zIndex = 4,
  count = 150,
  minSize = 2,
  maxSize = 6,
  minSpeed = 0.5,
  maxSpeed = 2,
  wind = 0.3,
  opacity = 0.8,
}) => {
  const animationFrameId = useRef(null);
  const snowflakes = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuration initiale du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Création des flocons de neige
    const createSnowflakes = () => {
      snowflakes.current = [];
      for (let i = 0; i < count; i++) {
        snowflakes.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
          drift: (Math.random() - 0.5) * wind * 2,
          opacity: Math.random() * 0.3 + opacity * 0.7,
        });
      }
    };
    createSnowflakes();

    // Animation des flocons
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.current.forEach((flake) => {
        // Mise à jour de la position
        flake.y += flake.speed;
        flake.x += flake.drift;

        // Réinitialisation si le flocon sort de l'écran
        if (flake.y > canvas.height) {
          flake.y = -flake.size;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width) {
          flake.x = 0;
        } else if (flake.x < 0) {
          flake.x = canvas.width;
        }

        // Dessin du flocon
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fill();

        // Effet de brillance aléatoire
        if (Math.random() > 0.98) {
          ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity * 1.5})`;
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Nettoyage
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [canvasRef, count, minSize, maxSize, minSpeed, maxSpeed, wind, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex,
      }}
    />
  );
};

SnowParticles.propTypes = {
  canvasRef: PropTypes.object.isRequired,
  zIndex: PropTypes.number,
  count: PropTypes.number,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  minSpeed: PropTypes.number,
  maxSpeed: PropTypes.number,
  wind: PropTypes.number,
  opacity: PropTypes.number,
};
