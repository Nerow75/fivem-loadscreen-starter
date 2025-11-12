// MouseTrail.jsx
import { memo } from 'react';
import PropTypes from 'prop-types';

export const MouseTrail = memo(function MouseTrail({ canvasRef, zIndex = 2, opacity = 1 }) {
  return (
    <canvas
      ref={canvasRef}
      role="presentation"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex,
        pointerEvents: 'none',
        opacity,
      }}
    />
  );
});

MouseTrail.propTypes = {
  canvasRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: typeof window === 'undefined' ? PropTypes.any : PropTypes.instanceOf(Element) }),
  ]),
  zIndex: PropTypes.number,
  opacity: PropTypes.number,
};
