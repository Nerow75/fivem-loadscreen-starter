// useMouseTrail.js
// Hook personnalisé permettant d'afficher une traînée lumineuse suivant le curseur de la souris.
// Utilise un canvas HTML5 et un effet de dégradation progressive pour un rendu fluide.

import { useEffect, useRef } from "react";

export const useMouseTrail = () => {
  const canvasRef = useRef(null); // Référence vers le canvas utilisé pour le rendu
  const trailPointsRef = useRef([]); // Liste des points constituant la traînée

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Interruption si le canvas n'est pas initialisé

    // Vérifie la préférence utilisateur de réduction des mouvements
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mql && mql.matches) return;

    const ctx = canvas.getContext("2d"); // Contexte 2D du canvas
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // Gestion du ratio de pixels pour écrans haute densité

    let w = 0;
    let h = 0;

    // Fonction de redimensionnement dynamique du canvas
    const resize = () => {
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Ajustement du contexte pour le ratio
    };

    resize();
    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    let last = 0; // Horodatage du dernier événement pour limiter la fréquence de mise à jour

    // Gestion du mouvement de la souris
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - last < 16) return; // Limite à ~60 FPS
      last = now;

      // Ajout d’un nouveau point à la traînée
      trailPointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1, // Durée de vie initiale du point
      });

      // Limitation du nombre maximum de points pour préserver les performances
      if (trailPointsRef.current.length > 30) {
        trailPointsRef.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let rafId; // Identifiant de la boucle d’animation

    // Fonction d’animation du tracé de la traînée
    const animate = () => {
      ctx.clearRect(0, 0, w, h); // Effacement du canvas à chaque frame

      // Mise à jour de la durée de vie des points
      trailPointsRef.current = trailPointsRef.current
        .map((p) => ({ ...p, life: p.life - 0.03 }))
        .filter((p) => p.life > 0); // Suppression des points expirés

      const pts = trailPointsRef.current;

      // Dessin de la ligne principale reliant les points de la traînée
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

        // Dessin des particules lumineuses sur la ligne
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

    // Lancement de l’animation
    rafId = requestAnimationFrame(animate);

    // Nettoyage des écouteurs et arrêt de l’animation lors du démontage du hook
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Retourne la référence du canvas pour intégration dans un composant React
  return { canvasRef };
};
