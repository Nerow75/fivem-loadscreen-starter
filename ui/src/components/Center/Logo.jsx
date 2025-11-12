// Logo.jsx
// Composant d’affichage du logo principal de l’application ou du serveur.
// Gère le chargement optimisé et la tolérance aux erreurs d’affichage.

import PropTypes from "prop-types";
import logoUrl from "../../assets/logo.png"; // Importation de la ressource image locale

export const Logo = ({ width = "clamp(240px, 55vw, 360px)" }) => {
  return (
    <img
      src={logoUrl} // Source du logo importé
      alt="Logo" // Texte alternatif pour l’accessibilité
      loading="eager" // Chargement prioritaire (optimisé pour affichage immédiat)
      decoding="async" // Décodage asynchrone pour meilleures performances
      style={{
        width, // Largeur adaptative fournie en prop
        height: "auto", // Hauteur proportionnelle
        objectFit: "contain", // Maintien du ratio sans rognage
        display: "block", // Suppression des marges inline
        margin: "0 auto", // Centrage horizontal
        zIndex: 5, // Niveau d’empilement au-dessus du fond
        filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.4))", // Ombre portée pour contraste
      }}
      onError={(e) => {
        // Gestion de l’erreur si le logo ne se charge pas
        console.warn("Logo introuvable:", logoUrl); // Log technique en console
        e.currentTarget.style.border = "2px solid #B00020"; // Marquage visuel de l’erreur
        e.currentTarget.alt = "Logo manquant"; // Texte alternatif de secours
      }}
    />
  );
};

// Validation des types de propriétés pour cohérence typée
Logo.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string, // Largeur définie en unité CSS
    PropTypes.number, // Largeur définie en pixels
  ]),
};
