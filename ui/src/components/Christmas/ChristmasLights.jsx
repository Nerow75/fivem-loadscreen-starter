// ChristmasLights.jsx
// Guirlandes lumineuses animées en haut de l'écran
// Lumières colorées qui clignotent de manière aléatoire

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ChristmasLights = ({
  zIndex = 6,
  colors = ["#FFD700", "#FF6B6B", "#4CAF50", "#2196F3"],
  count = 20,
}) => {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    // Génération des positions des lumières
    const newLights = [];
    for (let i = 0; i < count; i++) {
      newLights.push({
        id: i,
        left: `${(100 / (count + 1)) * (i + 1)}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
      });
    }
    setLights(newLights);
  }, [count, colors]);

  return (
    <div
      className="christmas-lights-container"
      style={{
        position: "fixed",
        top: "20px",
        left: 0,
        right: 0,
        height: "40px",
        zIndex,
        pointerEvents: "none",
      }}
    >
      {/* Fil de la guirlande */}
      <svg
        width="100%"
        height="40"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <path
          d={`M 0,20 ${lights
            .map((light, i) => {
              const x = (100 / (count + 1)) * (i + 1);
              const y = 20 + Math.sin(i * 0.5) * 8;
              return `Q ${x - 2},${y - 5} ${x},${y}`;
            })
            .join(" ")} Q 100,15 100,20`}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Lumières */}
      {lights.map((light) => (
        <div
          key={light.id}
          className="christmas-light"
          style={{
            position: "absolute",
            left: light.left,
            top: `${20 + Math.sin(light.id * 0.5) * 8}px`,
            transform: "translate(-50%, -50%)",
            width: "12px",
            height: "16px",
            backgroundColor: light.color,
            borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
            boxShadow: `0 0 15px ${light.color}, 0 0 30px ${light.color}`,
            animation: `lightPulse 2s ease-in-out infinite`,
            animationDelay: `${light.delay}s`,
          }}
        >
          {/* Reflet sur l'ampoule */}
          <div
            style={{
              position: "absolute",
              top: "2px",
              left: "3px",
              width: "4px",
              height: "6px",
              background: "rgba(255,255,255,0.6)",
              borderRadius: "50%",
            }}
          />
        </div>
      ))}
    </div>
  );
};

ChristmasLights.propTypes = {
  zIndex: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.number,
};
