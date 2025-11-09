import { useEffect, useState } from 'react';
import './index.css';
import './styles/animations.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Hooks
import { useNUIMessages } from './hooks/useNUIMessages';
import { useClock } from './hooks/useClock';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useParticles } from './hooks/useParticles';
import { useMouseTrail } from './hooks/useMouseTrail';

// Components
import { VideoBackground } from './components/Background/VideoBackground';
import { Overlay } from './components/Background/Overlay';
import { Particles } from './components/Background/Particles';
import { MouseTrail } from './components/Effects/MouseTrail';
import { Clock } from './components/Header/Clock';
import { TopPhrases } from './components/Header/TopPhrases';
import { SocialLinks } from './components/Header/SocialLinks';
import { Logo } from './components/Center/Logo';
import { VolumeControl } from './components/Center/VolumeControl';
import { MusicPlayer } from './components/Center/MusicPlayer';
import { NewsPanel } from './components/News/NewsPanel';
import { ProgressBar } from './components/Footer/ProgressBar';
import { Version } from './components/Footer/Version';

// Config
import { VIDEOS, MUSIC, TOP_PHRASES, NEWS, SERVER } from './config';

const videos = Array.isArray(VIDEOS.list) ? VIDEOS.list : [];
const playlist = Array.isArray(MUSIC.list) ? MUSIC.list : [];

export default function App() {
  const [maxPlayers] = useState(128);
  const [currentVideo, setCurrentVideo] = useState('');

  // Custom Hooks
  const { progress, loadingText, playerCount } = useNUIMessages();
  const { currentTime, currentDate } = useClock();
  const { canvasRef: particlesCanvasRef } = useParticles();
  const { canvasRef: trailCanvasRef } = useMouseTrail();
  
  const {
    audioRef,
    isPlaying,
    volume,
    setVolume,
    handleEnded,
    nextTrack,
    previousTrack,
    togglePlay,
    currentTrack,
  } = useAudioPlayer(playlist);

  // Sélection vidéo aléatoire
  useEffect(() => {
    if (videos.length) {
      setCurrentVideo(videos[Math.floor(Math.random() * videos.length)]);
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Background */}
      <VideoBackground src={currentVideo} />
      <Overlay />
      <Particles canvasRef={particlesCanvasRef} />
      <MouseTrail canvasRef={trailCanvasRef} />

      {/* Main Container */}
      <div
        style={{
          animation: 'nrFadeIn 600ms ease both',
          position: 'relative',
          zIndex: 3,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Header */}
        <Clock
          currentTime={currentTime}
          currentDate={currentDate}
          playerCount={playerCount}
          maxPlayers={maxPlayers}
        />
        <TopPhrases phrases={TOP_PHRASES} />
        <SocialLinks />

        {/* Center Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            padding: '0 24px',
          }}
        >
          <div className="center-stack" style={{ textAlign: 'center', position: 'relative' }}>
            <Logo progress={progress} />
            <VolumeControl volume={volume} onVolumeChange={setVolume} />
            <MusicPlayer
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onPrevious={previousTrack}
              onNext={nextTrack}
              currentTrack={currentTrack}
            />
          </div>
        </div>

        {/* News */}
        <NewsPanel news={NEWS} />

        {/* Footer */}
        <ProgressBar progress={progress} loadingText={loadingText} />
        <Version version={SERVER.version} />
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} onEnded={handleEnded} />
    </div>
  );
}
