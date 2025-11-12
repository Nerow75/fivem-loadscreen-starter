// MouseTrail.jsx
// Composant d’affichage du canevas servant à dessiner la traînée du curseur.
// Utilisé conjointement avec le hook useMouseTrail pour le rendu graphique en temps réel.

import { memo } from "react";
import PropTypes from "prop-types";

export const MouseTrail = memo(function MouseTrail({
  canvasRef,
  zIndex = 2,
  opacity = 1,
}) {
  return (
    <canvas
      ref={canvasRef} // Référence transmise au hook pour la gestion du contexte graphique
      role="presentation" // Élément purement visuel sans rôle fonctionnel
      aria-hidden="true" // Masquage pour les technologies d’assistance
      style={{
        position: "fixed", // Positionnement global sur toute la fenêtre
        inset: 0, // Ancrage sur les quatre bords de l’écran
        width: "100%", // Largeur étendue à la taille de la fenêtre
        height: "100%", // Hauteur étendue à la taille de la fenêtre
        zIndex, // Ordre d’empilement configurable
        pointerEvents: "none", // Neutralisation des interactions utilisateur
        opacity, // Transparence ajustable pour effet visuel
      }}
    />
  );
});

// Validation des types de propriétés attendues
MouseTrail.propTypes = {
  canvasRef: PropTypes.oneOfType([
    PropTypes.func, // Fonction de callback pour référence dynamique
    PropTypes.shape({
      current:
        typeof window === "undefined"
          ? PropTypes.any
          : PropTypes.instanceOf(Element), // Référence DOM valide côté client
    }),
  ]),
  zIndex: PropTypes.number, // Niveau de superposition du canevas
  opacity: PropTypes.number, // Niveau de transparence du rendu
};
