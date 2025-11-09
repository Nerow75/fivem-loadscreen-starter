// SocialLinks.jsx
import { THEME, LINKS } from '../../config';
import { iconStyleBox } from '../../utils/constants';

const openExternal = (url) => {
  if (typeof window.invokeNative === 'function') {
    window.invokeNative('openUrl', url);
  } else {
    window.open(url, '_blank');
  }
};

const LinkButton = ({ href, title, icon }) => {
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); openExternal(href); }}
      title={title}
      style={{
        textDecoration: 'none',
        ...iconStyleBox(),
        color: THEME.primary,
        fontSize: 20,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
    >
      <i className={icon} />
    </a>
  );
};

export const SocialLinks = () => (
  <div style={{ position: 'fixed', top: 18, right: 18, zIndex: 5, display: 'flex', gap: 10 }}>
    <LinkButton href={LINKS.discord} title="Rejoindre le Discord" icon="fa-brands fa-discord" />
    <LinkButton href={LINKS.shop}    title="Boutique"             icon="fa-solid fa-shop" />
    <LinkButton href={LINKS.panel}   title="Panel"                icon="fa-solid fa-desktop" />
  </div>
);
