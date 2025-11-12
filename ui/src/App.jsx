// App.jsx
// Point d'entrée principal de l'interface utilisateur.
// Structure l'affichage global du loader et gère l'intégration des hooks et composants principaux.

// Importation des dépendances externes et des styles
import { useEffect, useState } from "react";
import "./index.css";
import "./styles/animations.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Importation des hooks personnalisés
import { useNUIMessages } from "./hooks/useNUIMessages";
import { useClock } from "./hooks/useClock";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useParticles } from "./hooks/useParticles";
import { useMouseTrail } from "./hooks/useMouseTrail";
import { useKeyboardControls } from "./hooks/useKeyboardControls";

// Importation des composants visuels
import { VideoBackground } from "./components/Background/VideoBackground";
import { Overlay } from "./components/Background/Overlay";
import { Particles } from "./components/Background/Particles";
import { MouseTrail } from "./components/Effects/MouseTrail";
import { Clock } from "./components/Header/Clock";
import { TopPhrases } from "./components/Header/TopPhrases";
import { SocialLinks } from "./components/Header/SocialLinks";
import { Logo } from "./components/Center/Logo";
import { VolumeControl } from "./components/Center/VolumeControl";
import { MusicPlayer } from "./components/Center/MusicPlayer";
import { NewsPanel } from "./components/News/NewsPanel";
import { ProgressBar } from "./components/Footer/ProgressBar";
import { Version } from "./components/Footer/Version";

// Importation de la configuration globale
import { VIDEOS, MUSIC, TOP_PHRASES, NEWS, SERVER } from "./config";

// Préparation des listes de vidéos et musiques avec vérification de type
const videos = Array.isArray(VIDEOS?.list) ? VIDEOS.list : [];
const playlist = Array.isArray(MUSIC?.list) ? MUSIC.list : [];

export default function App() {
  const [maxPlayers] = useState(128); // Nombre maximal de joueurs affiché

  // Initialisation des hooks custom
  const { progress, loadingText, playerCount } = useNUIMessages(); // Gestion des messages et progression du chargement
  const { currentTime, currentDate } = useClock(); // Gestion de l'horloge temps réel
  const { canvasRef: particlesCanvasRef } = useParticles(); // Initialisation du canvas des particules
  const { canvasRef: trailCanvasRef } = useMouseTrail(); // Initialisation du canvas pour la traînée de souris

  // Gestion du lecteur audio via hook dédié
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

  // Configuration des contrôles clavier (navigation musicale et volume)
  useKeyboardControls({
    onPrevious: previousTrack,
    onNext: nextTrack,
    onVolumeUp: () => setVolume(Math.min(100, volume + 5)),
    onVolumeDown: () => setVolume(Math.max(0, volume - 5)),
  });

  // Accessibilité : focus automatique sur la zone de contenu lors de l'utilisation du lien d'évitement
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
      {/* Arrière-plan multimédia */}
      <VideoBackground sources={videos} />
      <Overlay zIndex={2} />
      <MouseTrail canvasRef={trailCanvasRef} zIndex={3} />
      <Particles canvasRef={particlesCanvasRef} zIndex={4} opacity={1} />

      {/* Lien d’évitement pour la navigation clavier */}
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

      {/* Structure principale de l'interface */}
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
        {/* En-tête : affichage de l'heure, du nombre de joueurs et des liens sociaux */}
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
          <TopPhrases phrases={TOP_PHRASES} />
          <SocialLinks />
        </header>

        {/* Section principale : logo, lecteur musical, contrôle du volume */}
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

        {/* Section d'actualités et informations complémentaires */}
        <section
          aria-label="Actualités"
          style={{ width: "min(1100px, 100%)", margin: "0 auto" }}
        >
          <NewsPanel news={NEWS} />
        </section>

        {/* Pied de page : progression du chargement et version du serveur */}
        <footer
          role="contentinfo"
          aria-label="Progression du chargement et version"
        >
          <ProgressBar progress={progress} loadingText={loadingText} />
          <Version version={SERVER?.version} />
        </footer>
      </div>

      {/* Élément audio invisible contrôlé par les hooks */}
      <audio ref={audioRef} onEnded={handleEnded} aria-hidden="true" />
    </div>
  );
}
