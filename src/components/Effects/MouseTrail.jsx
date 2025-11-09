export const MouseTrail = ({ canvasRef }) => {
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  );
};
