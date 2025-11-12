// SocialLinks.jsx
// Composant d’affichage des liens externes (Discord, boutique, panel).
// Utilise un style “glassmorphism” et gère l’ouverture sécurisée des liens externes.

import PropTypes from "prop-types";
import { THEME, LINKS } from "../../config";

// Fonction d’ouverture sécurisée d’un lien externe
// - Utilise invokeNative dans un environnement NUI (FiveM)
// - Fallback sur window.open pour le navigateur standard
const openExternal = (url) => {
  try {
    if (typeof window.invokeNative === "function") {
      window.invokeNative("openUrl", url);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  } catch {
    // Échec silencieux pour éviter les erreurs bloquantes
  }
};

// Style visuel des boutons de lien (effet verre et animation légère)
const linkBoxStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "clamp(38px, 4.8vw, 46px)",
  height: "clamp(38px, 4.8vw, 46px)",
  borderRadius: 999, // Forme circulaire
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
  color: THEME?.primary || "#fff",
  transition: "transform 120ms ease, box-shadow 120ms ease",
  textDecoration: "none",
  outlineOffset: 3,
};

// Composant bouton individuel représentant un lien social externe
const LinkButton = ({ href, title, icon, label }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      aria-label={label || title}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      // Ouverture sécurisée via la fonction utilitaire
      onClick={(e) => {
        e.preventDefault();
        openExternal(href);
      }}
      // Effets visuels au survol et focus
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      onFocus={(e) =>
        (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.25)")
      }
      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      style={linkBoxStyle}
    >
      {/* Icône du réseau ou service externe */}
      <i
        className={icon}
        aria-hidden="true"
        style={{ fontSize: "clamp(16px, 2vw, 18px)" }}
      />
    </a>
  );
};

// Définition des types de propriétés pour validation
LinkButton.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string,
};

// Composant principal regroupant les liens sociaux
export const SocialLinks = () => (
  <nav
    aria-label="Liens externes"
    style={{
      position: "fixed",
      top: "clamp(10px, 2vh, 18px)",
      right: "clamp(10px, 2vw, 18px)",
      zIndex: 5,
      display: "flex",
      gap: "clamp(8px, 1.2vw, 10px)",
    }}
  >
    {/* Bouton Discord */}
    <LinkButton
      href={LINKS?.discord}
      title="Rejoindre le Discord"
      label="Discord"
      icon="fa-brands fa-discord"
    />

    {/* Bouton Boutique */}
    <LinkButton
      href={LINKS?.shop}
      title="Accéder à la boutique"
      label="Boutique"
      icon="fa-solid fa-shop"
    />

    {/* Bouton Panel */}
    <LinkButton
      href={LINKS?.panel}
      title="Ouvrir le panel"
      label="Panel"
      icon="fa-solid fa-desktop"
    />
  </nav>
);
