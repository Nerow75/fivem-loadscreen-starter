// Clock.jsx
// Composant d’affichage des informations principales du header : heure, date et nombre de joueurs.
// Présente un style “glassmorphism” et un effet d’animation liquide décoratif.

import PropTypes from "prop-types";
import { THEME } from "../../config";

// Style visuel principal avec effet verre et ombres internes
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
  position: "relative",
  overflow: "hidden",
};

export const Clock = ({
  currentTime, // Heure actuelle formatée
  currentDate, // Date actuelle formatée
  playerCount, // Nombre de joueurs connectés
  maxPlayers, // Capacité maximale du serveur
}) => {
  // Sécurisation de l’affichage du ratio de joueurs
  const safePlayers =
    Number.isFinite(playerCount) &&
    Number.isFinite(maxPlayers) &&
    maxPlayers > 0
      ? `${playerCount}/${maxPlayers}`
      : null;

  return (
    <section
      role="note"
      aria-label="Informations en-tête : heure, date et joueurs en ligne"
      style={{
        position: "fixed",
        top: "clamp(10px, 2vh, 18px)",
        left: "clamp(10px, 2vw, 18px)",
        zIndex: 5,
        color: "#fff",
        fontSize: "clamp(12px, 1.5vw, 14px)",
        lineHeight: 1.4,
        textShadow: "0 2px 6px rgba(0,0,0,0.45)",
        padding: "10px 14px",
        borderRadius: 16,
        maxWidth: "max-content",
        width: "auto",
        ...liquidGlassStyle,
      }}
    >
      {/* Effet visuel de brillance animée sur le fond */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          animation: "liquidShine 8s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* Animation CSS de déplacement et variation d’opacité */}
      <style>{`
        @keyframes liquidShine {
          0%, 100% {
            transform: translate(-25%, -25%) rotate(0deg);
            opacity: 0.5;
          }
          25% {
            transform: translate(0%, -10%) rotate(90deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(-10%, 0%) rotate(180deg);
            opacity: 0.5;
          }
          75% {
            transform: translate(-20%, -20%) rotate(270deg);
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Bloc affichant l’heure actuelle */}
      {currentTime && (
        <div
          style={{
            marginBottom: 6,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <i
            className="fa-solid fa-clock"
            aria-hidden="true"
            style={{
              color: THEME?.primary,
              fontSize: "clamp(11px, 1.4vw, 12px)",
            }}
          />
          <strong>
            <time aria-label={`Heure ${currentTime}`}>{currentTime}</time>
          </strong>
        </div>
      )}

      {/* Bloc affichant la date textuelle */}
      {currentDate && (
        <div
          style={{
            marginBottom: 6,
            fontSize: "clamp(11px, 1.4vw, 12px)",
            opacity: 0.9,
          }}
        >
          {/* Texte brut (format non normé pour l’attribut dateTime) */}
          {currentDate}
        </div>
      )}

      {/* Bloc affichant le nombre de joueurs connectés */}
      {safePlayers && (
        <div
          style={{
            paddingTop: 6,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <i
            className="fa-solid fa-users"
            aria-hidden="true"
            style={{
              color: THEME?.primary,
              fontSize: "clamp(11px, 1.4vw, 12px)",
            }}
          />
          <strong>Joueurs :</strong>&nbsp;{safePlayers}
        </div>
      )}
    </section>
  );
};

// Validation des propriétés pour cohérence typée
Clock.propTypes = {
  currentTime: PropTypes.string,
  currentDate: PropTypes.string,
  playerCount: PropTypes.number,
  maxPlayers: PropTypes.number,
};
