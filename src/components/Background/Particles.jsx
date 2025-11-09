export const Particles = ({ canvasRef }) => {
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    />
  );
};
