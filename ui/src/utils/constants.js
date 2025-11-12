// constants.js
// Regroupe les styles réutilisables de l’UI.
// Convention : objets immuables pour les styles statiques, fonctions pour styles calculés.

export const iconBtnStyle = {
  // Style de bouton icône principal (taille réactive via clamp)
  width: "clamp(38px, 4.4vw, 46px)",
  height: "clamp(38px, 4.4vw, 46px)",
  display: "grid", // Centrement via grid
  placeItems: "center",
  borderRadius: 12, // Rayon constant pour cohérence visuelle
  background: "rgba(0,0,0,0.35)", // Fond semi-transparent (effet verre)
  border: "1px solid rgba(255,255,255,0.14)",
  cursor: "pointer",
  transition: "transform .15s ease, box-shadow .15s ease, background .15s ease",
  backdropFilter: "blur(6px)", // Flou d’arrière-plan (glassmorphism)
  outlineOffset: 3, // Accessibilité : espacement du contour focus
};

export const iconStyleBox = () => ({
  // Conteneur d’icône interactif (usage : liens/boutons ronds)
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "clamp(38px, 4.4vw, 46px)",
  height: "clamp(38px, 4.4vw, 46px)",
  borderRadius: 14, // Légère variation pour différenciation visuelle
  background: "rgba(0,0,0,0.15)",
  border: "1px solid rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)", // Flou plus prononcé pour profondeur
  boxShadow: "0 8px 24px rgba(0,0,0,0.3), 0 0 14px rgba(34,167,232,0.25)", // Ombres portée + halo
  transition: "transform .15s ease, box-shadow .15s ease",
  textDecoration: "none",
  cursor: "pointer",
  outlineOffset: 3, // Focus visible sans chevauchement
});

export const rangeStyle = () => ({
  // Style de base pour input[type="range"] compatible multi-navigateurs
  appearance: "none", // Neutralise le style natif
  width: "clamp(200px, 24vw, 260px)",
  background: "transparent", // Laisse la piste/poignée personnalisées en CSS
  outline: "none",
  cursor: "pointer",
});

export const glassBoxStyle = {
  // Conteneur “glass” pour cartes/panels (fond, bordure, ombres)
  background:
    "linear-gradient( to bottom right, rgba(255,255,255,0.08), rgba(255,255,255,0.04) )",
  border: "1px solid rgba(255,255,255,0.14)",
  backdropFilter: "blur(10px)",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)", // Ombre externe + liseré interne
};
