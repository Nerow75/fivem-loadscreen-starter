// ProgressBar.jsx
// Composant d’affichage de la barre de progression du chargement.
// Intègre un effet lumineux animé et un texte d’état associé.

import PropTypes from "prop-types";
import { THEME as RAW } from "../../config";

// Définition du thème visuel (couleurs principales et secondaires)
const THEME = {
  primary: RAW?.primary || "#2ea9ff",
  primaryLight: RAW?.primaryLight || "#7cc7ff",
};

export const ProgressBar = ({ progress = 0, loadingText = "" }) => {
  // Normalisation de la valeur de progression entre 0 et 100
  const value = Math.max(0, Math.min(100, Number(progress) || 0));

  // Style d’accessibilité (contenu uniquement visible par les lecteurs d’écran)
  const srOnly = {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    border: 0,
  };

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "clamp(14px, 6vh, 42px)",
        zIndex: 5,
        width: "clamp(280px, 85vw, 900px)", // Largeur adaptative selon la taille d’écran
        paddingInline: "clamp(8px, 2vw, 16px)",
      }}
    >
      {/* Conteneur principal de la barre de progression */}
      <div
        role="progressbar"
        aria-label="Progression du chargement"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.floor(value)}
        style={{
          height: 12,
          width: "100%",
          borderRadius: 999,
          overflow: "hidden",
          background: "rgba(255,255,255,.12)",
          boxShadow:
            "0 6px 30px rgba(0,0,0,.35), inset 0 2px 4px rgba(0,0,0,.3)",
          border: "1px solid rgba(255,255,255,.1)",
          position: "relative",
        }}
      >
        {/* Texte caché pour les technologies d’assistance */}
        <span style={srOnly}>
          {loadingText ? `${loadingText} — ` : ""}
          {Math.floor(value)} pour cent
        </span>

        {/* Remplissage de la barre en fonction de la progression */}
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            borderRadius: 999,
            transition: "width .25s ease", // Animation fluide de progression
            background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.primaryLight})`,
            boxShadow: `0 0 18px ${THEME.primary}, 0 0 36px ${THEME.primary}80`,
            position: "relative",
          }}
        >
          {/* Effet lumineux animé (dégradé en translation) */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent)",
              animation: "progressShine 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Affichage du texte descriptif sous la barre */}
      <div
        style={{
          marginTop: 8,
          textAlign: "center",
          color: "rgba(255,255,255,.95)",
          textShadow: "0 2px 10px rgba(0,0,0,.4)",
          fontSize: "clamp(12px, 3.2vw, 14px)",
          fontWeight: 500,
          letterSpacing: 0.2,
        }}
      >
        {loadingText ? `${loadingText} · ` : ""}
        {Math.floor(value)}%
      </div>

      {/* Règles de responsivité pour écrans de petite taille */}
      <style>{`
        @media (max-width: 720px) {
          [role="progressbar"]{ height: 10px !important; }
          [role="progressbar"] + div { font-size: clamp(11px, 3.6vw, 13px) !important; }
        }
        @media (max-width: 420px) {
          [role="progressbar"]{ height: 9px !important; }
        }
      `}</style>
    </div>
  );
};

// Validation des types de propriétés
ProgressBar.propTypes = {
  progress: PropTypes.number, // Valeur numérique entre 0 et 100
  loadingText: PropTypes.string, // Texte facultatif d’état de chargement
};
