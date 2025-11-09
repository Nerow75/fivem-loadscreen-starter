import logoUrl from '../../assets/logo.png'; // ✅ chemin Vite bundlé

export const Logo = ({ progress = 0 }) => {
  return (
    <img
      src={logoUrl}
      alt="Logo"
      style={{
        width: 400,
        height: 'auto',
        objectFit: 'contain',
        display: 'block',
        margin: '0 auto',
        zIndex: 5,
        filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.4))',
      }}
      onError={(e) => {
        console.warn('Logo introuvable:', logoUrl);
        e.currentTarget.style.border = '2px solid red';
      }}
    />
  );
};
