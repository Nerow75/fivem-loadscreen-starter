// SocialLinks.jsx
import PropTypes from "prop-types";
import { THEME, LINKS } from "../../config";

const openExternal = (url) => {
  try {
    if (typeof window.invokeNative === "function") {
      window.invokeNative("openUrl", url);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  } catch {
    // si l'ouverture Ã©choue, on ne jette pas.
  }
};

const linkBoxStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "clamp(38px, 4.8vw, 46px)",
  height: "clamp(38px, 4.8vw, 46px)",
  borderRadius: 999,
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

const LinkButton = ({ href, title, icon, label }) => {
  if (!href) return null;
  return (
    <a
      href={href}
      aria-label={label || title}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        openExternal(href);
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      onFocus={(e) =>
        (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.25)")
      }
      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      style={linkBoxStyle}
    >
      <i
        className={icon}
        aria-hidden="true"
        style={{ fontSize: "clamp(16px, 2vw, 18px)" }}
      />
    </a>
  );
};

LinkButton.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string,
};

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
    <LinkButton
      href={LINKS?.discord}
      title="Rejoindre le Discord"
      label="Discord"
      icon="fa-brands fa-discord"
    />
    <LinkButton
      href={LINKS?.shop}
      title="AccÃ©der Ã  la boutique"
      label="Boutique"
      icon="fa-solid fa-shop"
    />
    <LinkButton
      href={LINKS?.panel}
      title="Ouvrir le panel"
      label="Panel"
      icon="fa-solid fa-desktop"
    />
  </nav>
);
