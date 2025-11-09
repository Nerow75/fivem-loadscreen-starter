import { THEME } from '../../config';
import { iconBtnStyle } from '../../utils/constants';

const ControlButton = ({ onClick, title, children, large = false }) => {
  const style = large
    ? { ...iconBtnStyle, width: 52, height: 52 }
    : iconBtnStyle;

  return (
    <div
      style={style}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
      title={title}
    >
      {children}
    </div>
  );
};

const PreviousIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.primary}>
    <path d="M6 6h2v12H6zM20 6v12L10 12l10-6z" />
  </svg>
);

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.primary}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.primary}>
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);

const NextIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.primary}>
    <path d="M4 6v12l10-6L4 6zM18 6h2v12h-2z" />
  </svg>
);

export const MusicPlayer = ({ 
  isPlaying, 
  onTogglePlay, 
  onPrevious, 
  onNext, 
  currentTrack 
}) => {
  return (
    <>
      <div
        style={{
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
        }}
      >
        <ControlButton onClick={onPrevious} title="Précédent">
          <PreviousIcon />
        </ControlButton>

        <ControlButton onClick={onTogglePlay} title={isPlaying ? 'Pause' : 'Lecture'} large>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </ControlButton>

        <ControlButton onClick={onNext} title="Suivant">
          <NextIcon />
        </ControlButton>
      </div>

      <div
        style={{
          marginTop: 12,
          color: '#fff',
          opacity: 0.9,
          textShadow: '0 2px 10px rgba(0,0,0,0.4)',
          fontSize: 15,
          letterSpacing: 0.3,
        }}
      >
        {currentTrack?.title || ''}
      </div>
    </>
  );
};
