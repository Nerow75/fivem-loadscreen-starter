// TopPhrases.jsx
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";

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
  phrases = [],
  intervalMs = 3200,
  fadeMs = 240,
}) => {
  const list = useMemo(() => phrases.filter(Boolean), [phrases]);
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!list.length) return;

    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const allowAnim = !(mql && mql.matches);

    if (!allowAnim) {
      setOpacity(1);
      setIndex(0);
      return;
    }

    const tick = () => {
      setOpacity(0);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % list.length);
        setOpacity(1);
      }, fadeMs);
    };

    timerRef.current = window.setInterval(tick, Math.max(1000, intervalMs));
    return () => window.clearInterval(timerRef.current);
  }, [list, intervalMs, fadeMs]);

  if (!list.length) return null;

  return (
    <section
      aria-label="Conseil"
      aria-live="polite"
      aria-atomic="true"
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
        opacity,
        transition: "opacity .24s ease",
        padding: "8px 14px",
        borderRadius: 16,
        maxWidth: "min(90vw, 80ch)",
        ...liquidGlassStyle,
      }}
    >
      {list[index]}
    </section>
  );
};

TopPhrases.propTypes = {
  phrases: PropTypes.arrayOf(PropTypes.string),
  intervalMs: PropTypes.number,
  fadeMs: PropTypes.number,
};
