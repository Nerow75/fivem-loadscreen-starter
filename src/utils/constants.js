// Constants et styles réutilisables

export const iconBtnStyle = {
  width: 44,
  height: 44,
  display: 'grid',
  placeItems: 'center',
  borderRadius: 12,
  background: 'rgba(0,0,0,0.35)',
  border: '1px solid rgba(255,255,255,0.12)',
  cursor: 'pointer',
  transition: 'transform .15s ease',
  backdropFilter: 'blur(6px)',
};

export const iconStyleBox = () => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 44,
  height: 44,
  borderRadius: 14,
  background: 'rgba(0,0,0,0.15)',
  border: '1px solid rgba(255,255,255,0.15)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.3), 0 0 14px rgba(34,167,232,0.25)',
  transition: 'transform .15s ease',
  textDecoration: 'none',
  cursor: 'pointer',
});

export const rangeStyle = () => ({
  appearance: 'none',
  width: 220,
  background: 'transparent',
  outline: 'none',
  cursor: 'pointer',
});

export const glassBoxStyle = {
  background: 'rgba(0,0,0,0.15)',
  border: '1px solid rgba(255,255,255,0.15)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
};
