import { useEffect, useRef, useState } from 'react';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {
  THEME, LINKS, VIDEOS, MUSIC, TOP_PHRASES, SERVER, NEWS
} from './config';

const videos = Array.isArray(VIDEOS.list) ? VIDEOS.list : [];
const playlist = Array.isArray(MUSIC.list) ? MUSIC.list : [];

export default function App() {
  // --------- STATE ----------
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initialisation...');
  const [playerCount, setPlayerCount] = useState(0);
  const [maxPlayers] = useState(128);
  
  // ✨ Heure réelle + jour
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseOpacity, setPhraseOpacity] = useState(1);
  const [currentVideo, setCurrentVideo] = useState('');

  // Audio
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(() => Number(localStorage.getItem('nr_vol') ?? 30));

  const logoRef = useRef(null);

  // Particules
  const particlesCanvasRef = useRef(null);
  const particlesRef = useRef([]);
  
  // ✨ Trail souris (canvas)
  const trailCanvasRef = useRef(null);
  const trailPointsRef = useRef([]);

  // --------- EFFECTS ----------
  // NUI messages
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      const val = typeof d.loadFraction === 'number' ? d.loadFraction * 100
                : typeof d.value === 'number' ? d.value
                : progress;
      setProgress(Math.max(0, Math.min(100, val)));
      setLoadingText(d.message || 'Chargement en cours...');
      if (typeof d.playerCount === 'number') setPlayerCount(d.playerCount);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [progress]);

  // ✨ Horloge temps réel
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      const date = now.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      });
      setCurrentTime(time);
      setCurrentDate(date.charAt(0).toUpperCase() + date.slice(1)); // Capitalize
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

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

  // Vidéo aléatoire
  useEffect(() => {
    if (videos.length) {
      setCurrentVideo(videos[Math.floor(Math.random() * videos.length)]);
    }
  }, []);

  // Audio
  useEffect(() => {
    if (!audioRef.current || !playlist.length) return;
    audioRef.current.src = playlist[trackIndex].url;
    audioRef.current.loop = false;
    audioRef.current.volume = volume / 100;
    if (isPlaying) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [trackIndex, isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
    localStorage.setItem('nr_vol', String(volume));
  }, [volume]);

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

  // ✨ Particules avec constellation
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

    const count = 60;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.6,
      a: Math.random() * 2 * Math.PI,
      v: Math.random() * 0.3 + 0.2,
      o: Math.random() * 0.5 + 0.2,
    }));

    let rafId;
    const step = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Déplace les particules
      particlesRef.current.forEach(p => {
        p.x += Math.cos(p.a) * p.v;
        p.y += Math.sin(p.a) * p.v * 0.6;
        p.a += (Math.random() - 0.5) * 0.05;

        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;
      });
      
      // ✨ CONSTELLATION : Lignes entre particules proches
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.3;
            ctx.strokeStyle = `rgba(34,167,232,${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      // Dessine les particules
      particlesRef.current.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,167,232,${p.o})`;
        ctx.shadowColor = 'rgba(34,167,232,0.5)';
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

  // ✨ NOUVEAU : Trail souris fluide (canvas)
  useEffect(() => {
    const canvas = trailCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Ajouter points au mouvement
    const onMove = (e) => {
      trailPointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
      });
      
      // Limiter à 30 points
      if (trailPointsRef.current.length > 30) {
        trailPointsRef.current.shift();
      }
    };
    window.addEventListener('mousemove', onMove);

    let rafId;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Dégrader la vie des points
      trailPointsRef.current = trailPointsRef.current.map(p => ({
        ...p,
        life: p.life - 0.03,
      })).filter(p => p.life > 0);
      
      // Dessiner le trail
      if (trailPointsRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trailPointsRef.current[0].x, trailPointsRef.current[0].y);
        
        for (let i = 1; i < trailPointsRef.current.length; i++) {
          const p = trailPointsRef.current[i];
          ctx.lineTo(p.x, p.y);
        }
        
        ctx.strokeStyle = `rgba(34, 167, 232, 0.6)`;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(34, 167, 232, 0.8)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        
        // Points lumineux
        trailPointsRef.current.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(154, 220, 248, ${p.life * 0.8})`;
          ctx.shadowColor = `rgba(34, 167, 232, ${p.life})`;
          ctx.shadowBlur = 10;
          ctx.fill();
        });
      }
      
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const handleEnded = () => setTrackIndex((i) => (i + 1) % playlist.length);

  // --------- RENDER ----------
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Video background */}
      {currentVideo && (
        <video
          src={currentVideo}
          autoPlay muted loop playsInline preload="metadata"
          style={{
            position: 'fixed', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: -1, background: '#000'
          }}
          onError={(e) => console.warn('Video introuvable :', currentVideo, e)}
        />
      )}

      {/* Overlay */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.65))',
          zIndex: 0,
        }}
      />

      {/* Particules avec constellation */}
      <canvas
        ref={particlesCanvasRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.55
        }}
      />

      {/* ✨ Trail souris (canvas) */}
      <canvas
        ref={trailCanvasRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none'
        }}
      />

      {/* Container principal */}
      <div
        style={{
          animation: 'nrFadeIn 600ms ease both',
          position: 'relative',
          zIndex: 3,
          width: '100%',
          height: '100%',
        }}
      >
        {/* ✨ Haut gauche : Heure réelle + Joueurs */}
        <div
          style={{
            position: 'fixed', top: 18, left: 18, zIndex: 5,
            color: '#fff', fontSize: 14, lineHeight: 1.4,
            textShadow: '0 2px 6px rgba(0,0,0,0.45)',
            background: 'rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '12px 16px',
            borderRadius: 16,
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className="fa-solid fa-clock" style={{ color: THEME.primary, fontSize: 12 }} />
            <strong>{currentTime}</strong>
          </div>
          <div style={{ marginBottom: 8, fontSize: 12, opacity: 0.9 }}>
            {currentDate}
          </div>
          <div style={{ 
            paddingTop: 8, 
            borderTop: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <i className="fa-solid fa-users" style={{ color: THEME.primary, fontSize: 12 }} />
            <strong>Joueurs :</strong> {playerCount}/{maxPlayers}
          </div>
        </div>

        {/* Haut centre : Phrases */}
        {TOP_PHRASES.length > 0 && (
          <div
            style={{
              position: 'fixed', top: 18, left: '50%', transform: 'translateX(-50%)',
              zIndex: 5, color: '#fff', fontSize: 14, letterSpacing: 0.3,
              textShadow: '0 2px 8px rgba(0,0,0,0.4)', textAlign: 'center',
              opacity: phraseOpacity, transition: 'opacity .24s ease',
              padding: '10px 18px', 
              background: 'rgba(0,0,0,0.15)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              maxWidth: '80vw',
            }}
          >
            {TOP_PHRASES[phraseIndex]}
          </div>
        )}

        {/* Haut droit : Links */}
        <div style={{ position: 'fixed', top: 18, right: 18, zIndex: 5, display: 'flex', gap: 10 }}>
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            title="Rejoindre le Discord"
            style={{
              textDecoration: 'none',
              ...iconStyleBox(), color: THEME.primary, fontSize: 20,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          >
            <i className="fa-brands fa-discord" />
          </a>

          <a
            href={LINKS.shop}
            target="_blank"
            rel="noopener noreferrer"
            title="Boutique"
            style={{
              textDecoration: 'none',
              ...iconStyleBox(), color: THEME.primary, fontSize: 20,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          >
            <i className="fa-solid fa-shop" />
          </a>

          <a
            href={LINKS.panel}
            target="_blank"
            rel="noopener noreferrer"
            title="Panel"
            style={{
              textDecoration: 'none',
              ...iconStyleBox(), color: THEME.primary, fontSize: 20,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          >
            <i className="fa-solid fa-desktop" />
          </a>
        </div>

        {/* Centre : Logo simple */}
        <div
          style={{
            position: 'relative', zIndex: 4, width: '100%', height: '100%',
            display: 'grid', placeItems: 'center', padding: '0 24px'
          }}
        >
          <div style={{ textAlign: 'center', position: 'relative' }}>
            {/* Logo 400x400 - simple, pas de pulse */}
            <img
              ref={logoRef}
              src="logo.png"
              alt="Logo"
              style={{
                width: 400,
                height: 400,
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.6))',
                display: 'block', margin: '0 auto',
              }}
            />

            {/* Volume */}
            <div style={{ marginTop: 24 }}>
              <input
                className="nr-range"
                type="range"
                min={0} max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                title={`Volume: ${volume}%`}
                style={rangeStyle()}
              />
            </div>

            {/* Contrôles */}
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 14
              }}
            >
              <div
                style={iconBtnStyle}
                onClick={() => setTrackIndex((i) => (i - 1 + playlist.length) % playlist.length)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                title="Précédent"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.primary}>
                  <path d="M6 6h2v12H6zM20 6v12L10 12l10-6z" />
                </svg>
              </div>

              <div
                style={{ ...iconBtnStyle, width: 52, height: 52 }}
                onClick={() => setIsPlaying((p) => !p)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                title={isPlaying ? 'Pause' : 'Lecture'}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.primary}>
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.primary}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>

              <div
                style={iconBtnStyle}
                onClick={() => setTrackIndex((i) => (i + 1) % playlist.length)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                title="Suivant"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.primary}>
                  <path d="M4 6v12l10-6L4 6zM18 6h2v12h-2z" />
                </svg>
              </div>
            </div>

            <div
              style={{
                marginTop: 12, color: '#fff', opacity: 0.9,
                textShadow: '0 2px 10px rgba(0,0,0,0.4)', fontSize: 15, letterSpacing: 0.3
              }}
            >
              {playlist[trackIndex]?.title || ''}
            </div>
          </div>
        </div>

        {/* ✨ Actualités bas droite */}
        {NEWS && NEWS.length > 0 && (
          <div
            style={{
              position: 'fixed', bottom: 80, right: 18, zIndex: 5,
              width: 320,
              background: 'rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 16,
              padding: '14px 16px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ 
              color: THEME.accent, 
              fontSize: 13, 
              fontWeight: 600, 
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <i className="fa-solid fa-newspaper" style={{ fontSize: 12 }} />
              DERNIÈRES ACTUALITÉS
            </div>
            
            {NEWS.slice(0, 3).map((news, i) => (
              <div key={i} style={{ 
                marginBottom: i < 2 ? 10 : 0,
                paddingBottom: i < 2 ? 10 : 0,
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 8,
                  marginBottom: 4,
                }}>
                  <span style={{ fontSize: 16 }}>{news.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      color: '#fff', 
                      fontSize: 12, 
                      fontWeight: 600,
                      marginBottom: 2,
                    }}>
                      {news.title}
                    </div>
                    <div style={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      fontSize: 11,
                      lineHeight: 1.4,
                    }}>
                      {news.description}
                    </div>
                    <div style={{ 
                      color: THEME.primaryLight, 
                      fontSize: 10,
                      marginTop: 2,
                    }}>
                      {news.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Barre de progression */}
        <div
          style={{
            position: 'fixed', left: '50%', transform: 'translateX(-50%)',
            bottom: 40, zIndex: 5, width: '70vw', maxWidth: 900
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
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'progressShine 2s ease-in-out infinite',
              }} />
            </div>
          </div>
          <div
            style={{
              marginTop: 10, textAlign: 'center', 
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)', 
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {loadingText} · {Math.floor(progress)}%
          </div>
        </div>

        {/* Version */}
        <div
          style={{
            position: 'fixed', bottom: 16, left: 18, zIndex: 5,
            color: '#fff', fontSize: 12, opacity: 0.85,
            textShadow: '0 2px 6px rgba(0,0,0,0.45)',
            background: 'rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '8px 12px',
            borderRadius: 12,
            backdropFilter: 'blur(12px)',
          }}
        >
          {SERVER.version}
        </div>
      </div>

      <audio ref={audioRef} onEnded={handleEnded} />

      {/* Styles */}
      <style>{`
        @keyframes nrFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .nr-range::-webkit-slider-runnable-track {
          height: 6px; 
          background: rgba(255,255,255,0.15);
          border-radius: 999px;
        }
        .nr-range::-webkit-slider-thumb {
          -webkit-appearance: none; 
          appearance: none;
          width: 18px; 
          height: 18px; 
          border-radius: 50%;
          margin-top: -6px;
          background: ${THEME.primary};
          box-shadow: 0 0 12px rgba(34,167,232,0.8), 0 2px 8px rgba(0,0,0,0.3);
          border: 2px solid rgba(255,255,255,0.8);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .nr-range::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(34,167,232,1), 0 4px 12px rgba(0,0,0,0.4);
        }
        .nr-range { width: 220px; }
      `}</style>
    </div>
  );
}

const iconBtnStyle = {
  width: 44, height: 44, display: 'grid', placeItems: 'center',
  borderRadius: 12, background: 'rgba(0,0,0,0.35)',
  border: '1px solid rgba(255,255,255,0.12)',
  cursor: 'pointer', transition: 'transform .15s ease',
  backdropFilter: 'blur(6px)',
};

function iconStyleBox() {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 14,
    background: 'rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.15)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3), 0 0 14px rgba(34,167,232,0.25)',
    transition: 'transform .15s ease',
    textDecoration: 'none',
    cursor: 'pointer',
  };
}

function rangeStyle() {
  return {
    appearance: 'none',
    width: 220,
    background: 'transparent',
    outline: 'none',
    cursor: 'pointer',
  };
}