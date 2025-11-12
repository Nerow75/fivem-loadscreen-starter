// Particles.jsx
// Composant d’affichage du canevas utilisé pour le rendu des particules en fond d’écran.
// Utilisé conjointement avec un hook ou une logique de rendu WebGL/Canvas externe.

import { memo } from "react";
import PropTypes from "prop-types";

export const Particles = memo(function Particles({
  canvasRef, // Référence transmise pour la manipulation du canevas
  opacity = 0.55, // Transparence par défaut du rendu
  zIndex = 1, // Niveau d’empilement par défaut
}) {
  return (
    <canvas
      ref={canvasRef} // Liaison de la référence du canevas
      role="presentation" // Élément purement visuel sans rôle fonctionnel
      aria-hidden="true" // Exclusion de l’arbre d’accessibilité
      style={{
        position: "fixed", // Fixation sur l’ensemble de la fenêtre
        inset: 0, // Couverture totale de la zone visible
        width: "100%", // Largeur totale
        height: "100%", // Hauteur totale
        zIndex, // Gestion du plan d’empilement
        pointerEvents: "none", // Désactivation des interactions utilisateur
        opacity, // Application du niveau de transparence
        backgroundColor: "transparent", // Fond entièrement transparent
      }}
    />
  );
});

// Validation des types de propriétés pour cohérence typée
Particles.propTypes = {
  canvasRef: PropTypes.oneOfType([
    PropTypes.func, // Fonction de rappel pour référence dynamique
    PropTypes.shape({
      current:
        typeof window === "undefined"
          ? PropTypes.any
          : PropTypes.instanceOf(Element), // Référence DOM valide côté client
    }),
  ]),
  opacity: PropTypes.number, // Valeur numérique définissant la transparence
  zIndex: PropTypes.number, // Niveau d’empilement du canevas
};
