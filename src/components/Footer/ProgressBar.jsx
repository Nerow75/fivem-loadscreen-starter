// ProgressBar.jsx
import PropTypes from "prop-types";
import { THEME as RAW } from "../../config";

const THEME = {
  primary: RAW?.primary || "#2ea9ff",
  primaryLight: RAW?.primaryLight || "#7cc7ff",
};

export const ProgressBar = ({ progress = 0, loadingText = "" }) => {
  const value = Math.max(0, Math.min(100, Number(progress) || 0));

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
        // Largeur qui se rÃ©duit progressivement selon la taille d'Ã©cran
        width: "clamp(280px, 85vw, 900px)",
        paddingInline: "clamp(8px, 2vw, 16px)",
      }}
    >
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
        <span style={srOnly}>
          {loadingText ? `${loadingText} Ã¢â‚¬â€ ` : ""}
          {Math.floor(value)} pour cent
        </span>

        <div
          style={{
            height: "100%",
            width: `${value}%`,
            borderRadius: 999,
            transition: "width .25s ease",
            background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.primaryLight})`,
            boxShadow: `0 0 18px ${THEME.primary}, 0 0 36px ${THEME.primary}80`,
            position: "relative",
          }}
        >
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

ProgressBar.propTypes = {
  progress: PropTypes.number,
  loadingText: PropTypes.string,
};
