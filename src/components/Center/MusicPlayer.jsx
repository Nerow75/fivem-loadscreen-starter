// MusicPlayer.jsx
import PropTypes from "prop-types";
import { THEME } from "../../config";

const baseBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "3.4em",
  height: "3.4em",
  borderRadius: "999px",
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
  color: "#fff",
  cursor: "pointer",
  userSelect: "none",
  outlineOffset: "0.2em",
  transition:
    "transform 120ms ease, box-shadow 120ms ease, background 150ms ease",
};

const iconStyle = {
  display: "block",
  width: "1.1em",
  height: "1.1em",
  fill: THEME?.primary || "#fff",
};

const IconPrevious = () => (
  <svg viewBox="0 0 24 24" style={iconStyle} aria-hidden="true">
    <path d="M6 6h2v12H6zM20 6v12L10 12l10-6z" />
  </svg>
);

const IconPlay = () => (
  <svg viewBox="0 0 24 24" style={iconStyle} aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const IconPause = () => (
  <svg viewBox="0 0 24 24" style={iconStyle} aria-hidden="true">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);

const IconNext = () => (
  <svg viewBox="0 0 24 24" style={iconStyle} aria-hidden="true">
    <path d="M4 6v12l10-6L4 6zM18 6h2v12h-2z" />
  </svg>
);

export const MusicPlayer = ({
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  currentTrack,
  volume = 50,
}) => {
  return (
    <div className="text-fluid">
      <div
        role="group"
        aria-label="Contrôles de lecture"
        style={{
          marginTop: "1.2em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1em",
        }}
      >
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Piste précédente"
          title="Précédent"
          style={baseBtn}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.06)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 0 0 0.2em rgba(255,255,255,0.25)")
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <IconPrevious />
        </button>

        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Mettre en pause" : "Lire"}
          title={isPlaying ? "Pause" : "Lecture"}
          style={{ ...baseBtn, width: "4.1em", height: "4.1em" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.06)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 0 0 0.2em rgba(255,255,255,0.25)")
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          {isPlaying ? <IconPause /> : <IconPlay />}
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Piste suivante"
          title="Suivant"
          style={baseBtn}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.06)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 0 0 0.2em rgba(255,255,255,0.25)")
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <IconNext />
        </button>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          marginTop: "0.9em",
          color: "#fff",
          opacity: 0.9,
          textShadow: "0 2px 10px rgba(0,0,0,0.4)",
          fontSize: "1em",
          letterSpacing: 0.3,
          textAlign: "center",
          paddingInline: "1em",
          maxWidth: "min(80ch, 90vw)",
          marginInline: "auto",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {currentTrack?.title || ""}
      </div>
    </div>
  );
};

MusicPlayer.propTypes = {
  isPlaying: PropTypes.bool,
  onTogglePlay: PropTypes.func,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  currentTrack: PropTypes.shape({
    title: PropTypes.string,
  }),
  volume: PropTypes.number,
};
