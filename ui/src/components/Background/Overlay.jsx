// Overlay.jsx
// Composant d’affichage d’un calque de superposition avec dégradé linéaire et option de flou.
// Utilisé pour renforcer la lisibilité des éléments sur fond vidéo ou image.

import { memo } from "react";
import PropTypes from "prop-types";

export const Overlay = memo(function Overlay({
  from = "rgba(0,0,0,0.55)", // Couleur de départ du dégradé
  to = "rgba(0,0,0,0.65)", // Couleur d’arrivée du dégradé
  zIndex = 0, // Niveau d’empilement par défaut
  blur = 0, // Intensité du flou appliqué via backdrop-filter
}) {
  return (
    <div
      aria-hidden="true" // Élément décoratif, exclu de l’accessibilité
      style={{
        position: "fixed", // Recouvrement complet de la fenêtre
        inset: 0, // Ancrage sur les quatre bords
        pointerEvents: "none", // Neutralisation des interactions utilisateur
        zIndex, // Position dans la pile d’affichage
        background: `linear-gradient(180deg, ${from}, ${to})`, // Application du dégradé
        backdropFilter: blur ? `blur(${blur}px)` : undefined, // Flou optionnel si défini
      }}
    />
  );
});

// Validation des propriétés pour cohérence typée
Overlay.propTypes = {
  from: PropTypes.string, // Couleur initiale du dégradé
  to: PropTypes.string, // Couleur finale du dégradé
  zIndex: PropTypes.number, // Niveau d’empilement
  blur: PropTypes.number, // Valeur du flou appliqué
};
