export const VideoBackground = ({ src }) => {
  if (!src) return null;

  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
        background: '#000',
      }}
      onError={(e) => console.warn('Video introuvable :', src, e)}
    />
  );
};
