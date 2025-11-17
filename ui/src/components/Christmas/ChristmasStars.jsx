// ChristmasStars.jsx
// Étoiles scintillantes qui apparaissent aléatoirement
// Effet de brillance et disparition progressive

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ChristmasStars = ({
  zIndex = 6,
  count = 10,
  sparkleInterval = 2000,
}) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Ajout d'une nouvelle étoile
      const newStar = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 20 + 15,
        rotation: Math.random() * 360,
      };

      setStars((prev) => {
        const updated = [...prev, newStar];
        // Limiter le nombre d'étoiles affichées
        return updated.slice(-count);
      });

      // Suppression automatique après animation
      setTimeout(() => {
        setStars((prev) => prev.filter((star) => star.id !== newStar.id));
      }, 3000);
    }, sparkleInterval);

    return () => clearInterval(interval);
  }, [count, sparkleInterval]);

  return (
    <div
      className="christmas-stars-container"
      style={{
        position: "fixed",
        inset: 0,
        zIndex,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="christmas-star"
          style={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: "starSparkle 3s ease-out forwards",
          }}
        >
          {/* Étoile SVG */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 51 48"
            style={{
              transform: `rotate(${star.rotation}deg)`,
              filter: "drop-shadow(0 0 8px rgba(255,215,0,0.8))",
            }}
          >
            <path
              d="M25.5 0L31.5 18H51L35.5 29L41.5 48L25.5 37L9.5 48L15.5 29L0 18H19.5L25.5 0Z"
              fill="#FFD700"
            />
            <path
              d="M25.5 6L29.5 18H41L31.5 25L35.5 38L25.5 31L15.5 38L19.5 25L10 18H21.5L25.5 6Z"
              fill="#FFF8DC"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

ChristmasStars.propTypes = {
  zIndex: PropTypes.number,
  count: PropTypes.number,
  sparkleInterval: PropTypes.number,
};
