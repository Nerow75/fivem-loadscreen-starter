// useNUIMessages.js
// Hook personnalisé permettant la gestion des messages NUI reçus depuis le contexte externe (ex : environnement GTA/FiveM).
// Fournit la progression de chargement, le texte d’état et le nombre de joueurs connectés.

import { useEffect, useState } from "react";

export const useNUIMessages = () => {
  // États réactifs pour la progression, le texte de chargement et le nombre de joueurs
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initialisation...");
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    // Gestionnaire d’événements pour l’écoute des messages postés depuis la fenêtre externe
    const handler = (e) => {
      const data = e?.data || {};

      // Détermination du pourcentage de progression à partir des données reçues
      let p =
        typeof data.loadFraction === "number"
          ? data.loadFraction * 100
          : typeof data.value === "number"
          ? data.value
          : null;

      // Mise à jour du pourcentage de progression avec bornes de sécurité (0–100)
      if (p != null && Number.isFinite(p)) {
        setProgress(Math.max(0, Math.min(100, p)));
      }

      // Mise à jour du texte de chargement si un message valide est transmis
      if (typeof data.message === "string" && data.message.trim().length) {
        setLoadingText(data.message);
      }

      // Mise à jour du nombre de joueurs connectés si la donnée est valide
      if (
        typeof data.playerCount === "number" &&
        Number.isFinite(data.playerCount)
      ) {
        setPlayerCount(Math.max(0, Math.floor(data.playerCount)));
      }
    };

    // Enregistrement du listener sur l’objet window
    window.addEventListener("message", handler);

    // Nettoyage lors du démontage du composant pour éviter les fuites de mémoire
    return () => window.removeEventListener("message", handler);
  }, []);

  // Retourne les valeurs d’état exploitées par le composant principal
  return { progress, loadingText, playerCount };
};
