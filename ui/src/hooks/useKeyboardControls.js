// useKeyboardControls.js
// Hook personnalisé permettant la gestion des interactions clavier pour la navigation et le contrôle du volume.
// Utilisé principalement pour un lecteur audio ou une interface de navigation simplifiée.

import { useEffect } from "react";

export const useKeyboardControls = ({
  onPrevious, // Fonction déclenchée avec la flèche gauche
  onNext, // Fonction déclenchée avec la flèche droite
  onVolumeUp, // Fonction déclenchée avec la flèche haut
  onVolumeDown, // Fonction déclenchée avec la flèche bas
  enabled = true, // Activation/désactivation globale des contrôles clavier
}) => {
  useEffect(() => {
    if (!enabled) return; // Sortie anticipée si les contrôles sont désactivés

    // Gestionnaire principal des pressions de touches
    const handleKeyDown = (e) => {
      // Ignore l’événement si la saisie provient d’un champ éditable
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }

      // Interprétation des touches directionnelles
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onPrevious?.(); // Appel du callback précédent si défini
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext?.(); // Appel du callback suivant si défini
          break;
        case "ArrowUp":
          e.preventDefault();
          onVolumeUp?.(); // Augmentation du volume
          break;
        case "ArrowDown":
          e.preventDefault();
          onVolumeDown?.(); // Diminution du volume
          break;
        default:
          break;
      }
    };

    // Ajout de l’écouteur global de touches
    window.addEventListener("keydown", handleKeyDown);

    // Nettoyage à la désactivation ou au démontage du hook
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onPrevious, onNext, onVolumeUp, onVolumeDown]);
};
