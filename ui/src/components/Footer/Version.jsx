// Version.jsx
// Composant d’affichage de la version du serveur ou de l’application.
// Positionné en bas à gauche de l’écran avec un style “glassmorphism”.

import PropTypes from "prop-types";

export const Version = ({ version }) => {
  // Vérification de la présence d’une version avant affichage
  if (!version) return null;

  // Style visuel avec effet de transparence et de flou
  const liquidGlassStyle = {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: `
      0 8px 32px rgba(0,0,0,0.4),
      inset 0 1px 1px rgba(255,255,255,0.25),
      inset 0 -1px 1px rgba(0,0,0,0.1),
      0 0 0 1px rgba(34,167,232,0.15)
    `,
    backdropFilter: "blur(12px) saturate(180%)",
    WebkitBackdropFilter: "blur(12px) saturate(180%)",
  };

  return (
    <div
      role="note" // Élément informatif sans importance critique
      aria-label={`Version ${version}`} // Accessibilité : lecture du numéro de version
      style={{
        position: "fixed",
        bottom: "clamp(8px, 2vh, 16px)",
        left: "clamp(10px, 2vw, 18px)",
        zIndex: 5,
        color: "#fff",
        fontSize: "clamp(11px, 1.4vw, 12px)",
        opacity: 0.9,
        textShadow: "0 2px 6px rgba(0,0,0,0.45)",
        padding: "6px 10px",
        borderRadius: 10,
        ...liquidGlassStyle,
      }}
    >
      {/* Affichage du numéro ou libellé de version */}
      {version}
    </div>
  );
};

// Validation des types de propriétés
Version.propTypes = {
  version: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
