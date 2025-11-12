// TopPhrases.jsx
// Composant d’affichage rotatif de phrases ou conseils dynamiques en haut de l’écran.
// Gère la transition en fondu entre les phrases avec prise en charge de l’accessibilité et de la réduction d’animations.

import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";

// Style de base avec effet verre liquide (glassmorphism)
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

export const TopPhrases = ({
  phrases = [], // Liste des phrases à afficher
  intervalMs = 3200, // Intervalle entre les changements de phrase (en ms)
  fadeMs = 240, // Durée de la transition de fondu (en ms)
}) => {
  const list = useMemo(() => phrases.filter(Boolean), [phrases]); // Filtrage des valeurs non valides
  const [index, setIndex] = useState(0); // Index de la phrase actuellement affichée
  const [opacity, setOpacity] = useState(1); // État d’opacité pour la transition
  const timerRef = useRef(null); // Référence du minuteur d’intervalle

  useEffect(() => {
    if (!list.length) return;

    // Détection de la préférence système pour la réduction des animations
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const allowAnim = !(mql && mql.matches);

    // Si les animations sont désactivées, affiche uniquement la première phrase
    if (!allowAnim) {
      setOpacity(1);
      setIndex(0);
      return;
    }

    // Fonction déclenchée à chaque intervalle pour gérer la transition
    const tick = () => {
      setOpacity(0); // Début du fondu de disparition
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % list.length); // Passage à la phrase suivante
        setOpacity(1); // Réapparition en fondu
      }, fadeMs);
    };

    // Mise en place de l’intervalle automatique
    timerRef.current = window.setInterval(tick, Math.max(1000, intervalMs));

    // Nettoyage du minuteur lors du démontage
    return () => window.clearInterval(timerRef.current);
  }, [list, intervalMs, fadeMs]);

  if (!list.length) return null;

  return (
    <section
      aria-label="Conseil" // Description sémantique pour les lecteurs d’écran
      aria-live="polite" // Actualisation non intrusive du contenu
      aria-atomic="true" // Lecture complète à chaque changement
      style={{
        position: "fixed",
        top: "clamp(10px, 2vh, 18px)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 5,
        color: "#fff",
        fontSize: "clamp(12px, 1.5vw, 14px)",
        letterSpacing: 0.3,
        textShadow: "0 2px 8px rgba(0,0,0,0.4)",
        textAlign: "center",
        opacity, // Transition de visibilité
        transition: "opacity .24s ease",
        padding: "8px 14px",
        borderRadius: 16,
        maxWidth: "min(90vw, 80ch)",
        ...liquidGlassStyle, // Application du style visuel
      }}
    >
      {list[index]} {/* Affichage de la phrase courante */}
    </section>
  );
};

// Validation des types de propriétés
TopPhrases.propTypes = {
  phrases: PropTypes.arrayOf(PropTypes.string), // Liste des phrases à afficher
  intervalMs: PropTypes.number, // Intervalle entre les changements
  fadeMs: PropTypes.number, // Durée de la transition de fondu
};
