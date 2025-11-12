// Particles.jsx
import { memo } from "react";
import PropTypes from "prop-types";

export const Particles = memo(function Particles({
  canvasRef,
  opacity = 0.55,
  zIndex = 1,
}) {
  return (
    <canvas
      ref={canvasRef}
      role="presentation"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex,
        pointerEvents: "none",
        opacity,
        backgroundColor: "transparent",
      }}
    />
  );
});

Particles.propTypes = {
  canvasRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current:
        typeof window === "undefined"
          ? PropTypes.any
          : PropTypes.instanceOf(Element),
    }),
  ]),
  opacity: PropTypes.number,
  zIndex: PropTypes.number,
};
