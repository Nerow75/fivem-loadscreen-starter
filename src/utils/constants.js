// constants.js
export const iconBtnStyle = {
  width: "clamp(38px, 4.4vw, 46px)",
  height: "clamp(38px, 4.4vw, 46px)",
  display: "grid",
  placeItems: "center",
  borderRadius: 12,
  background: "rgba(0,0,0,0.35)",
  border: "1px solid rgba(255,255,255,0.14)",
  cursor: "pointer",
  transition: "transform .15s ease, box-shadow .15s ease, background .15s ease",
  backdropFilter: "blur(6px)",
  outlineOffset: 3,
};

export const iconStyleBox = () => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "clamp(38px, 4.4vw, 46px)",
  height: "clamp(38px, 4.4vw, 46px)",
  borderRadius: 14,
  background: "rgba(0,0,0,0.15)",
  border: "1px solid rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.3), 0 0 14px rgba(34,167,232,0.25)",
  transition: "transform .15s ease, box-shadow .15s ease",
  textDecoration: "none",
  cursor: "pointer",
  outlineOffset: 3,
});

export const rangeStyle = () => ({
  appearance: "none",
  width: "clamp(200px, 24vw, 260px)",
  background: "transparent",
  outline: "none",
  cursor: "pointer",
});

export const glassBoxStyle = {
  background:
    "linear-gradient( to bottom right, rgba(255,255,255,0.08), rgba(255,255,255,0.04) )",
  border: "1px solid rgba(255,255,255,0.14)",
  backdropFilter: "blur(10px)",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
};
