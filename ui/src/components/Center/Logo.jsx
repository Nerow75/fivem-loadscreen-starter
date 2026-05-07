// Logo.jsx
// Composant d'affichage du logo principal de l'application ou du serveur.

import PropTypes from "prop-types";
import logoUrl from "../../assets/logo-dev.png";

export const Logo = ({ width = "clamp(240px, 55vw, 360px)" }) => {
  return (
    <img
      src={logoUrl}
      alt="Logo du serveur"
      loading="eager"
      decoding="async"
      style={{
        width,
        height: "auto",
        objectFit: "contain",
        display: "block",
        margin: "0 auto",
        zIndex: 5,
        filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.4))",
      }}
      onError={(e) => {
        console.warn("Logo introuvable:", logoUrl);
        e.currentTarget.style.border = "2px solid #B00020";
        e.currentTarget.alt = "Logo manquant";
      }}
    />
  );
};

Logo.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
