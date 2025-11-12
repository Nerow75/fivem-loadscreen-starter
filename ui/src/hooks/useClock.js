// useClock.js
// Hook personnalisé permettant de fournir l’heure et la date courantes formatées pour l’affichage en temps réel.
// Utilise les API Intl pour un formatage localisé en français.

import { useEffect, useState } from "react";

// Format de l’heure : HH:MM en format 24h
const fmtTime = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
});

// Format de la date : jour de la semaine, jour et mois
const fmtDate = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export const useClock = () => {
  // États pour stocker l’heure et la date actuelles
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    let raf; // Identifiant pour requestAnimationFrame

    // Fonction de mise à jour du temps et de la date
    const update = () => {
      const now = new Date();
      const time = fmtTime.format(now);
      const date = fmtDate.format(now);

      // Mise à jour des états avec formatage de la date (majuscule initiale)
      setCurrentTime(time);
      setCurrentDate(date.charAt(0).toUpperCase() + date.slice(1));
    };

    update(); // Initialisation immédiate de la première valeur

    // Rafraîchissement chaque seconde
    const id = setInterval(update, 1000);

    // Synchronisation lors du retour de l’onglet en visibilité active
    const onVis = () => {
      if (!document.hidden) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
      }
    };

    document.addEventListener("visibilitychange", onVis);

    // Nettoyage des timers et des écouteurs à la désactivation du hook
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Retourne les valeurs courantes prêtes pour affichage
  return { currentTime, currentDate };
};
