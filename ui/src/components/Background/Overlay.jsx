// Overlay.jsx
import { memo } from 'react';
import PropTypes from 'prop-types';

export const Overlay = memo(function Overlay({
  from = 'rgba(0,0,0,0.55)',
  to = 'rgba(0,0,0,0.65)',
  zIndex = 0,
  blur = 0,
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex,
        background: `linear-gradient(180deg, ${from}, ${to})`,
        backdropFilter: blur ? `blur(${blur}px)` : undefined,
      }}
    />
  );
});

Overlay.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  zIndex: PropTypes.number,
  blur: PropTypes.number,
};
