import { useEffect, useRef, useState } from 'react';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {
  THEME, LINKS, ICONS,
  VIDEOS, MUSIC, TOP_PHRASES, SERVER
} from './config';

// Listes explicites
const videos = Array.isArray(VIDEOS.list) ? VIDEOS.list : [];
const playlist = Array.isArray(MUSIC.list) ? MUSIC.list : [];

export default function App() {
  // --------- STATE GLOBAL ----------
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initialisation...');

  // Heure/météo In-Game (placeholders + écoute NUI)
  const [igTime, setIgTime] = useState('--:--');
  const [igWeather, setIgWeather] = useState('Inconnu');

  // Texte haut-centre (rotateur)
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseOpacity, setPhraseOpacity] = useState(1);

  // Vidéo de fond
  const [currentVideo, setCurrentVideo] = useState('');

  // Audio
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(
    () => Number(localStorage.getItem('nr_vol') ?? 30)
  );

  // Spectrum (AudioContext)
  const analyserRef = useRef(null);
  const audioCtxRef = useRef(null);
  const dataArrayRef = useRef(null);
  const spectrumCanvasRef = useRef(null);

  // Particules canvas
  const particlesCanvasRef = useRef(null);
  const particlesRef = useRef([]);

  // --------- EFFECTS ----------
  // NUI messages (progress + time/weather)
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      // Progress
      const val = typeof d.loadFraction === 'number' ? d.loadFraction * 100
                : typeof d.value === 'number' ? d.value
                : progress;
      setProgress(Math.max(0, Math.min(100, val)));
      setLoadingText(d.message || 'Chargement en cours...');

      // Heure / météo
      // Supporte plusieurs formats possibles selon ton script serveur:
      // d.time -> "12:34", d.weather -> "CLEAR"
      // ou d.igTime / d.igWeather
      if (typeof d.time === 'string') setIgTime(d.time);
      if (typeof d.weather === 'string') setIgWeather(normalizeWeather(d.weather));
      if (typeof d.igTime === 'string') setIgTime(d.igTime);
      if (typeof d.igWeather === 'string') setIgWeather(normalizeWeather(d.igWeather));
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [progress]);

  // Rotateur de phrases
  useEffect(() => {
    if (!TOP_PHRASES.length) return;
    const itv = setInterval(() => {
      setPhraseOpacity(0);
      setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % TOP_PHRASES.length);
        setPhraseOpacity(1);
      }, 240);
    }, 3200);
    return () => clearInterval(itv);
  }, []);

  // Choix vidéo
  useEffect(() => {
    if (videos.length) {
      const pick = videos[Math.floor(Math.random() * videos.length)];
      setCurrentVideo(pick);
    }
  }, []);

  // Audio initialisation / changement de piste / volume
  useEffect(() => {
    if (!audioRef.current || !playlist.length) return;
    audioRef.current.src = playlist[trackIndex].url;
    audioRef.current.loop = false;
    audioRef.current.volume = volume / 100;
    if (isPlaying) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [trackIndex, isPlaying]);

  // Volume persistant
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
    localStorage.setItem('nr_vol', String(volume));
  }, [volume]);

  // Débloque autoplay au 1er clic / 1er message
  useEffect(() => {
    const tryPlay = () => audioRef.current?.play().catch(() => {});
    const pointer = () => { tryPlay(); window.removeEventListener('pointerdown', pointer); };
    const msg = () => { tryPlay(); window.removeEventListener('message', msg); };
    window.addEventListener('pointerdown', pointer);
    window.addEventListener('message', msg);
    return () => {
      window.removeEventListener('pointerdown', pointer);
      window.removeEventListener('message', msg);
    };
  }, []);

  // AudioContext + Analyser pour spectrum
  useEffect(() => {
    if (!audioRef.current) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const src = ctx.createMediaElementSource(audioRef.current);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount; // 128
    const dataArray = new Uint8Array(bufferLength);

    src.connect(analyser);
    analyser.connect(ctx.destination);

    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    let rafId;
    const render = () => {
      drawCircularSpectrum();
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      try {
        src.disconnect();
        analyser.disconnect();
        ctx.close();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist.length]);

  // Particules
  useEffect(() => {
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // init particles
    const count = 60;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.6,
      a: Math.random() * 2 * Math.PI,
      v: Math.random() * 0.3 + 0.2,
      o: Math.random() * 0.5 + 0.2, // opacity
    }));

    let rafId;
    const step = () => {
      ctx.clearRect(0, 0, w, h);
      particlesRef.current.forEach(p => {
        p.x += Math.cos(p.a) * p.v;
        p.y += Math.sin(p.a) * p.v * 0.6;
        p.a += (Math.random() - 0.5) * 0.05;

        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,140,0,${p.o})`;
        ctx.shadowColor = 'rgba(255,140,0,0.5)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // --------- HELPERS UI ----------
  const iconBtnStyle = {
    width: 44, height: 44, display: 'grid', placeItems: 'center',
    borderRadius: 12, background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.12)',
    cursor: 'pointer', transition: 'transform .15s ease',
    backdropFilter: 'blur(6px)',
  };

  function normalizeWeather(w) {
    const m = String(w || '').toUpperCase();
    const map = {
      CLEAR: 'Claire',
      EXTRASUNNY: 'Soleil',
      CLOUDS: 'Nuageux',
      OVERCAST: 'Couvert',
      RAIN: 'Pluie',
      THUNDER: 'Orage',
      SMOG: 'Brouillard',
      FOGGY: 'Brume',
      NEUTRAL: 'Variable',
      SNOW: 'Neige',
      BLIZZARD: 'Tempête de neige',
      XMAS: 'Neige (Noël)',
    };
    return map[m] || w;
  }

  function drawCircularSpectrum() {
    const canvas = spectrumCanvasRef.current;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    if (!canvas || !analyser || !dataArray) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width = 420;
    const h = canvas.height = 420;
    const cx = w / 2, cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Glow autour du logo
    ctx.beginPath();
    ctx.arc(cx, cy, 110, 0, Math.PI * 2);
    ctx.shadowColor = 'rgba(255,140,0,0.65)';
    ctx.shadowBlur = 28;
    ctx.strokeStyle = 'rgba(255,140,0,0.35)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;

    analyser.getByteFrequencyData(dataArray);
    const bars = 64;
    const radius = 120;
    for (let i = 0; i < bars; i++) {
      const angle = (i / bars) * Math.PI * 2;
      const v = dataArray[i];
      const len = 24 + (v / 255) * 36; // hauteur barres
      const x1 = cx + Math.cos(angle) * radius;
      const y1 = cy + Math.sin(angle) * radius;
      const x2 = cx + Math.cos(angle) * (radius + len);
      const y2 = cy + Math.sin(angle) * (radius + len);

      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, 'rgba(255,140,0,0.2)');
      grad.addColorStop(1, 'rgba(255,208,138,0.9)');

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  const handleEnded = () => setTrackIndex((i) => (i + 1) % playlist.length);

  // --------- RENDER ----------
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Video background */}
      {currentVideo && (
        <video
          src={currentVideo}
          autoPlay muted loop playsInline
          style={{
            position: 'fixed', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: -1
          }}
        />
      )}

      {/* Overlay sombre */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.65))',
          zIndex: 0,
        }}
      />

      {/* Particules */}
      <canvas
        ref={particlesCanvasRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.55
        }}
      />

      {/* Entrée fade-in container */}
      <div
        style={{
          animation: 'nrFadeIn 600ms ease both',
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%'
        }}
      >
        {/* Haut gauche : Heure + Météo */}
        <div
          style={{
            position: 'fixed', top: 18, left: 18, zIndex: 5,
            color: '#fff', fontSize: 14, lineHeight: 1.15,
            textShadow: '0 2px 6px rgba(0,0,0,0.45)',
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '8px 12px',
            borderRadius: 10,
            backdropFilter: 'blur(6px)',
          }}
        >
          <div><strong>Heure In-Game :</strong> {igTime}</div>
          <div><strong>Météo :</strong> {igWeather}</div>
        </div>

        {/* Haut centre : Phrases */}
        {TOP_PHRASES.length > 0 && (
          <div
            style={{
              position: 'fixed', top: 18, left: '50%', transform: 'translateX(-50%)',
              zIndex: 5, color: '#fff', fontSize: 14, letterSpacing: 0.3,
              textShadow: '0 2px 8px rgba(0,0,0,0.4)', textAlign: 'center',
              opacity: phraseOpacity, transition: 'opacity .24s ease',
              padding: '6px 12px', background: 'rgba(0,0,0,0.25)',
              borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(6px)',
            }}
          >
            {TOP_PHRASES[phraseIndex]}
          </div>
        )}

        {/* Haut droit : Discord / Boutique / Panel (Font Awesome) */}
        <div style={{ position: 'fixed', top: 18, right: 18, zIndex: 5, display: 'flex', gap: 10 }}>
          {/* Discord */}
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            title="Rejoindre le Discord"
            style={{
              textDecoration: 'none',
              ...iconStyleBox(), color: THEME.sunAndreas, fontSize: 20,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          >
            <i className="fa-brands fa-discord" />
          </a>

          {/* Boutique */}
          <a
            href={LINKS.shop}
            target="_blank"
            rel="noopener noreferrer"
            title="Boutique"
            style={{
              textDecoration: 'none',
              ...iconStyleBox(), color: THEME.sunAndreas, fontSize: 20,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          >
            <i className="fa-solid fa-shop" />
          </a>

          {/* Panel */}
          <a
            href={LINKS.panel}
            target="_blank"
            rel="noopener noreferrer"
            title="Panel"
            style={{
              textDecoration: 'none',
              ...iconStyleBox(), color: THEME.sunAndreas, fontSize: 20,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          >
            <i className="fa-solid fa-desktop" />
          </a>
        </div>

        {/* Centre : Logo + Spectrum + contrôles + volume + titre */}
        <div
          style={{
            position: 'relative', zIndex: 3, width: '100%', height: '100%',
            display: 'grid', placeItems: 'center', padding: '0 24px'
          }}
        >
          <div style={{ textAlign: 'center', position: 'relative' }}>
            {/* Spectrum circulaire */}
            <canvas
              ref={spectrumCanvasRef}
              width={420}
              height={420}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                transform: 'translate(-50%,-50%)',
                pointerEvents: 'none'
              }}
            />

            {/* Logo central */}
            <img
              src="logo.png"
              alt="Logo"
              style={{
                width: 200, height: 200, objectFit: 'contain',
                filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.6))',
                display: 'block', margin: '0 auto',
                position: 'relative', zIndex: 2,
              }}
            />

            {/* Volume slider */}
            <div style={{ marginTop: 18 }}>
              <input
                type="range"
                min={0} max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                title={`Volume: ${volume}%`}
                style={rangeStyle()}
              />
            </div>

            {/* Contrôles audio */}
            <div
              style={{
                marginTop: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 14
              }}
            >
              {/* Précédent */}
              <div
                style={iconBtnStyle}
                onClick={() => setTrackIndex((i) => (i - 1 + playlist.length) % playlist.length)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                title="Précédent"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.sunAndreas}>
                  <path d="M6 6h2v12H6zM20 6v12L10 12l10-6z" />
                </svg>
              </div>

              {/* Play/Pause */}
              <div
                style={{ ...iconBtnStyle, width: 52, height: 52 }}
                onClick={() => setIsPlaying((p) => !p)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                title={isPlaying ? 'Pause' : 'Lecture'}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.sunAndreas}>
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.sunAndreas}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>

              {/* Suivant */}
              <div
                style={iconBtnStyle}
                onClick={() => setTrackIndex((i) => (i + 1) % playlist.length)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                title="Suivant"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.sunAndreas}>
                  <path d="M4 6v12l10-6L4 6zM18 6h2v12h-2z" />
                </svg>
              </div>
            </div>

            {/* Titre piste */}
            <div
              style={{
                marginTop: 10, color: '#fff', opacity: 0.9,
                textShadow: '0 2px 10px rgba(0,0,0,0.4)', fontSize: 14, letterSpacing: 0.3
              }}
            >
              {playlist[trackIndex]?.title || ''}
            </div>
          </div>
        </div>

        {/* Barre de chargement en bas */}
        <div
          style={{
            position: 'fixed', left: '50%', transform: 'translateX(-50%)',
            bottom: 40, zIndex: 4, width: '70vw', maxWidth: 900
          }}
        >
          <div
            style={{
              height: 6, width: '100%', borderRadius: 999, overflow: 'hidden',
              background: 'rgba(255,255,255,0.15)', boxShadow: '0 6px 30px rgba(0,0,0,0.35)'
            }}
          >
            <div
              style={{
                height: '100%', width: `${progress}%`, borderRadius: 999,
                transition: 'width .3s ease',
                background: `linear-gradient(90deg, ${THEME.sunAndreas}, #FFD08A)`,
                boxShadow: '0 4px 18px rgba(255,140,0,0.55)'
              }}
            />
          </div>
          <div
            style={{
              marginTop: 10, textAlign: 'center', color: 'rgba(255,255,255,0.85)',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)', fontSize: 13
            }}
          >
            {loadingText} · {Math.floor(progress)}%
          </div>
        </div>

        {/* Bas gauche : version serveur */}
        <div
          style={{
            position: 'fixed', bottom: 16, left: 18, zIndex: 4,
            color: '#fff', fontSize: 12, opacity: 0.85,
            textShadow: '0 2px 6px rgba(0,0,0,0.45)',
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '6px 10px',
            borderRadius: 9,
            backdropFilter: 'blur(6px)',
          }}
        >
          {SERVER.version}
        </div>
      </div>

      {/* Élément audio */}
      <audio ref={audioRef} onEnded={handleEnded} />

      {/* Styles clés (fade-in + range + glow) */}
      <style>{`
        @keyframes nrFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Slider stylé */
        .nr-range::-webkit-slider-runnable-track {
          height: 6px; background: rgba(255,255,255,0.15);
          border-radius: 999px;
        }
        .nr-range::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 16px; height: 16px; border-radius: 50%;
          margin-top: -5px;
          background: ${THEME.sunAndreas};
          box-shadow: 0 0 12px rgba(255,140,0,0.8);
          border: 1px solid rgba(255,255,255,0.6);
        }
        .nr-range { width: 220px; }
      `}</style>
    </div>
  );
}

// ------- styles helpers -------
function iconStyleBox() {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3), 0 0 14px rgba(255,140,0,0.25)', // léger glow orange
    transition: 'transform .15s ease',
    textDecoration: 'none',
  };
}

function rangeStyle() {
  return {
    appearance: 'none',
    width: 220,
    background: 'transparent',
    outline: 'none',
  };
}
