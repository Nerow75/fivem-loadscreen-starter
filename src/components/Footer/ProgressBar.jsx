import { THEME } from '../../config';

export const ProgressBar = ({ progress, loadingText }) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 40,
        zIndex: 5,
        width: '70vw',
        maxWidth: 900,
      }}
    >
      <div
        style={{
          height: 8,
          width: '100%',
          borderRadius: 999,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.1)',
          boxShadow: '0 6px 30px rgba(0,0,0,0.35), inset 0 2px 4px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            borderRadius: 999,
            transition: 'width .3s ease',
            background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.primaryLight})`,
            boxShadow: `0 0 20px ${THEME.primary}, 0 0 40px ${THEME.primary}80`,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: 'progressShine 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
      
      <div
        style={{
          marginTop: 10,
          textAlign: 'center',
          color: 'rgba(255,255,255,0.9)',
          textShadow: '0 2px 10px rgba(0,0,0,0.4)',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        {loadingText} · {Math.floor(progress)}%
      </div>
    </div>
  );
};
