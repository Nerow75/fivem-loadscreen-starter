// SnowBorder.jsx
// Bordures de neige accumulée en bas et haut de l'écran
// Effet de gel et givre sur les bords

import PropTypes from "prop-types";

export const SnowBorder = ({ zIndex = 5 }) => {
  return (
    <>
      {/* Neige accumulée en haut */}
      <div
        className="snow-border-top"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          zIndex,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
          maskImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0,30 Q50,10 100,25 T200,30 Q250,15 300,28 T400,25 Q450,12 500,30 T600,28 Q650,15 700,25 T800,30 Q850,18 900,25 T1000,28 Q1050,15 1100,30 T1200,25 L1200,0 L0,0 Z" fill="white"/></svg>\')',
          WebkitMaskImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0,30 Q50,10 100,25 T200,30 Q250,15 300,28 T400,25 Q450,12 500,30 T600,28 Q650,15 700,25 T800,30 Q850,18 900,25 T1000,28 Q1050,15 1100,30 T1200,25 L1200,0 L0,0 Z" fill="white"/></svg>\')',
          maskSize: "cover",
          WebkitMaskSize: "cover",
          animation: "snowShimmer 3s ease-in-out infinite",
        }}
      />

      {/* Neige accumulée en bas */}
      <div
        className="snow-border-bottom"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          zIndex,
          pointerEvents: "none",
          background:
            "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 60%, transparent 100%)",
          maskImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 80" preserveAspectRatio="none"><path d="M0,80 L0,50 Q50,25 100,40 T200,45 Q250,30 300,50 T400,45 Q450,28 500,48 T600,50 Q650,32 700,45 T800,48 Q850,30 900,45 T1000,50 Q1050,35 1100,48 T1200,50 L1200,80 Z" fill="white"/></svg>\')',
          WebkitMaskSize: "cover",
          animation: "snowShimmer 4s ease-in-out infinite",
        }}
      />

      {/* Effet de givre sur les coins */}
      <div
        className="frost-corner-tl"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "200px",
          height: "200px",
          zIndex: zIndex - 1,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.3) 0%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      <div
        className="frost-corner-tr"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "200px",
          height: "200px",
          zIndex: zIndex - 1,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top right, rgba(255,255,255,0.3) 0%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      <div
        className="frost-corner-bl"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "200px",
          height: "200px",
          zIndex: zIndex - 1,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at bottom left, rgba(255,255,255,0.3) 0%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      <div
        className="frost-corner-br"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "200px",
          height: "200px",
          zIndex: zIndex - 1,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at bottom right, rgba(255,255,255,0.3) 0%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
    </>
  );
};

SnowBorder.propTypes = {
  zIndex: PropTypes.number,
};
