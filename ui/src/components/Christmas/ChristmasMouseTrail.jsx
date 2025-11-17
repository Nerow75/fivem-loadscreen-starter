// ChristmasMouseTrail.jsx
// Composant wrapper pour le trail de souris thème Noël
// Affiche des étoiles scintillantes qui suivent le curseur

import PropTypes from "prop-types";

export const ChristmasMouseTrail = ({ canvasRef, zIndex = 3 }) => {
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

ChristmasMouseTrail.propTypes = {
  canvasRef: PropTypes.object.isRequired,
  zIndex: PropTypes.number,
};
