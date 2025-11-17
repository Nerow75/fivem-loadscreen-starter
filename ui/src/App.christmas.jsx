// App.christmas.jsx
// Version Noël de l'application avec système de switch thème
// Remplace les composants standards par leurs équivalents thème Noël

import { useEffect, useState, useRef } from "react";
import "./index.css";
import "./styles/animations.css";
import "./styles/christmas.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Hooks personnalisés
import { useNUIMessages } from "./hooks/useNUIMessages";
import { useClock } from "./hooks/useClock";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useChristmasMouseTrail } from "./hooks/useChristmasMouseTrail";
import { useKeyboardControls } from "./hooks/useKeyboardControls";

// Composants standard
import { VideoBackground } from "./components/Background/VideoBackground";
import { Overlay } from "./components/Background/Overlay";
import { Clock } from "./components/Header/Clock";
import { TopPhrases } from "./components/Header/TopPhrases";
import { SocialLinks } from "./components/Header/SocialLinks";
import { Logo } from "./components/Center/Logo";
import { VolumeControl } from "./components/Center/VolumeControl";
import { MusicPlayer } from "./components/Center/MusicPlayer";
import { NewsPanel } from "./components/News/NewsPanel";
import { ProgressBar } from "./components/Footer/ProgressBar";
import { Version } from "./components/Footer/Version";

// Composants Noël
import { SnowParticles } from "./components/Christmas/SnowParticles";
import { SnowBorder } from "./components/Christmas/SnowBorder";
import { ChristmasLights } from "./components/Christmas/ChristmasLights";
import { ChristmasStars } from "./components/Christmas/ChristmasStars";
import { ChristmasMouseTrail } from "./components/Christmas/ChristmasMouseTrail";

// Configuration
import { VIDEOS, MUSIC, TOP_PHRASES, NEWS, SERVER } from "./config/config.js";
import {
  VIDEOS as CHRISTMAS_VIDEOS,
  MUSIC as CHRISTMAS_MUSIC,
  TOP_PHRASES as CHRISTMAS_PHRASES,
  NEWS as CHRISTMAS_NEWS,
  SERVER as CHRISTMAS_SERVER,
  SNOW_CONFIG,
  DECORATIONS_CONFIG,
} from "./config/config.christmas.js";

// Switch thème - modifier cette variable pour activer/désactiver le thème Noël
const CHRISTMAS_MODE = true;

export default function App() {
  const [maxPlayers] = useState(128);

  // Sélection de la configuration selon le thème
  const videos = CHRISTMAS_MODE
    ? Array.isArray(CHRISTMAS_VIDEOS?.list)
      ? CHRISTMAS_VIDEOS.list
      : []
    : Array.isArray(VIDEOS?.list)
    ? VIDEOS.list
    : [];

  const playlist = CHRISTMAS_MODE
    ? Array.isArray(CHRISTMAS_MUSIC?.list)
      ? CHRISTMAS_MUSIC.list
      : []
    : Array.isArray(MUSIC?.list)
    ? MUSIC.list
    : [];

  const phrases = CHRISTMAS_MODE ? CHRISTMAS_PHRASES : TOP_PHRASES;
  const news = CHRISTMAS_MODE ? CHRISTMAS_NEWS : NEWS;
  const serverInfo = CHRISTMAS_MODE ? CHRISTMAS_SERVER : SERVER;

  // Hooks
  const { progress, loadingText, playerCount } = useNUIMessages();
  const { currentTime, currentDate } = useClock();

  // Refs pour les canvas
  const snowCanvasRef = useRef(null);
  const { canvasRef: christmasTrailCanvasRef } = useChristmasMouseTrail();

  // Gestion audio
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

  // Contrôles clavier
  useKeyboardControls({
    onPrevious: previousTrack,
    onNext: nextTrack,
    onVolumeUp: () => setVolume(Math.min(100, volume + 5)),
    onVolumeDown: () => setVolume(Math.max(0, volume - 5)),
  });

  // Accessibilité
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#contenu") {
      const main = document.getElementById("contenu");
      if (main) main.focus();
    }
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* Arrière-plan */}
      <VideoBackground sources={videos} zIndex={1} />
      <Overlay zIndex={2} />

      {/* Effets selon le thème */}
      {CHRISTMAS_MODE ? (
        <>
          <ChristmasMouseTrail canvasRef={christmasTrailCanvasRef} zIndex={3} />
          <SnowParticles
            canvasRef={snowCanvasRef}
            zIndex={4}
            {...SNOW_CONFIG}
          />
          <SnowBorder zIndex={5} />
          {DECORATIONS_CONFIG.lights.enabled && (
            <ChristmasLights
              zIndex={6}
              colors={DECORATIONS_CONFIG.lights.colors}
              count={DECORATIONS_CONFIG.lights.count}
            />
          )}
          {DECORATIONS_CONFIG.stars.enabled && (
            <ChristmasStars
              zIndex={6}
              count={DECORATIONS_CONFIG.stars.count}
              sparkleInterval={DECORATIONS_CONFIG.stars.sparkleInterval}
            />
          )}
        </>
      ) : null}

      {/* Lien d'évitement */}
      <a
        href="#contenu"
        className="skip-link"
        style={{
          position: "absolute",
          left: "8px",
          top: "8px",
          padding: "8px 12px",
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          borderRadius: "8px",
          zIndex: 10,
          transform: "translateY(-150%)",
          transition: "transform .2s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        onBlur={(e) => (e.currentTarget.style.transform = "translateY(-150%)")}
      >
        Aller au contenu
      </a>

      {/* Structure principale */}
      <div
        className="ui-scale"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          animation: "nrFadeIn 600ms ease both",
        }}
      >
        {/* En-tête */}
        <header
          role="banner"
          aria-label="Informations serveur et navigation"
          style={{ position: "relative", width: "100%" }}
        >
          <Clock
            currentTime={currentTime}
            currentDate={currentDate}
            playerCount={playerCount}
            maxPlayers={maxPlayers}
          />
          <TopPhrases phrases={phrases} />
          <SocialLinks />
        </header>

        {/* Section principale */}
        <main
          id="contenu"
          tabIndex={-1}
          role="main"
          aria-live="polite"
          aria-busy={progress < 100}
          style={{
            position: "relative",
            zIndex: 4,
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            padding: "clamp(12px, 2vw, 24px)",
          }}
        >
          <div
            className="center-stack"
            style={{
              textAlign: "center",
              position: "relative",
              display: "grid",
              gap: "clamp(8px, 1.5vw, 16px)",
              justifyItems: "center",
              width: "min(960px, 100%)",
              margin: "0 auto",
            }}
          >
            <Logo progress={progress} />
            <MusicPlayer
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onPrevious={previousTrack}
              onNext={nextTrack}
              currentTrack={currentTrack}
            />
            <VolumeControl volume={volume} onVolumeChange={setVolume} />
          </div>
        </main>

        {/* Section actualités */}
        <section
          aria-label="Actualités"
          style={{ width: "min(1100px, 100%)", margin: "0 auto" }}
        >
          <NewsPanel news={news} />
        </section>

        {/* Pied de page */}
        <footer
          role="contentinfo"
          aria-label="Progression du chargement et version"
        >
          <ProgressBar progress={progress} loadingText={loadingText} />
          <Version version={serverInfo?.version} />
        </footer>
      </div>

      {/* Élément audio */}
      <audio ref={audioRef} onEnded={handleEnded} aria-hidden="true" />
    </div>
  );
}
