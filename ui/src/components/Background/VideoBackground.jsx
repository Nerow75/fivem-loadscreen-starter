// VideoBackground.jsx
// Composant de fond vidéo adaptable prenant en charge les sources locales et YouTube.
// Gère les préférences d’accessibilité liées à la réduction des animations.

import { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";

// Extraction sécurisée de l’ID YouTube à partir d’une URL
const extractYouTubeId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/, // Format standard et raccourci
    /youtube\.com\/embed\/([^&\n?#]+)/, // Format intégré (embed)
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

export const VideoBackground = ({
  sources = [], // Tableau ou chaîne représentant les sources vidéo
  poster = null, // Image d’attente avant le chargement de la vidéo
  zIndex = -1, // Niveau d’empilement par défaut sous les autres éléments
  preload = "metadata", // Mode de préchargement (optimisation performance)
}) => {
  const videoRef = useRef(null); // Référence DOM du composant vidéo

  // Analyse des sources pour détecter les URLs YouTube et filtrer les autres
  const { youtubeId, cleanSources } = useMemo(() => {
    const list = Array.isArray(sources) ? sources : [sources];
    const filtered = [];

    for (const source of list) {
      if (!source) continue;
      const ytId = extractYouTubeId(source);
      if (ytId) {
        console.log("[VideoBackground] Found YouTube ID:", ytId);
        return { youtubeId: ytId, cleanSources: [] };
      }
      filtered.push(source);
    }

    return { youtubeId: null, cleanSources: filtered };
  }, [sources]);

  // Détermination automatique du type MIME à partir de l’extension
  const inferType = (url) => {
    const ext = url.split("?")[0].split("#")[0].split(".").pop()?.toLowerCase();
    if (ext === "mp4") return "video/mp4";
    if (ext === "webm") return "video/webm";
    if (ext === "ogg" || ext === "ogv") return "video/ogg";
    return undefined;
  };

  // Application du respect des préférences utilisateur (réduction de mouvement)
  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const el = videoRef.current;
    if (!mql || !el) return;

    const apply = () => {
      if (mql.matches) {
        el.pause();
        el.removeAttribute("autoplay");
      } else {
        el.play().catch(() => {});
      }
    };

    apply();
    mql.addEventListener?.("change", apply);
    return () => mql.removeEventListener?.("change", apply);
  }, []);

  // Cas d’intégration YouTube via iframe en fond
  if (youtubeId) {
    const iframeSrc = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`;

    console.log("[VideoBackground] Rendering iframe with src:", iframeSrc);

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          overflow: "hidden",
          pointerEvents: "none",
          backgroundColor: "#000",
        }}
      >
        <iframe
          src={iframeSrc}
          allow="autoplay; encrypted-media"
          frameBorder="0"
          title="Background video"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "56.25vw", // Ratio 16:9
            minWidth: "177.78vh", // Maintien de la couverture en hauteur
            minHeight: "100vh",
            transform: "translate(-50%, -50%)",
            border: "none",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  // Si aucune source exploitable n’est fournie, ne rien afficher
  if (!cleanSources.length) return null;

  // Rendu HTML5 de la vidéo locale
  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      playsInline
      muted
      autoPlay
      loop
      preload={preload}
      poster={poster || undefined}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex,
        backgroundColor: "#000",
      }}
      onError={(e) => {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "Aucune source vidéo lisible :",
            cleanSources,
            e?.nativeEvent || e
          );
        }
      }}
    >
      {/* Déclaration des balises <source> pour compatibilité multi-format */}
      {cleanSources.map((src) => (
        <source key={src} src={src} type={inferType(src)} />
      ))}
    </video>
  );
};

// Validation des types de propriétés attendues
VideoBackground.propTypes = {
  sources: PropTypes.oneOfType([
    PropTypes.string, // Source unique
    PropTypes.arrayOf(PropTypes.string), // Liste de sources
  ]),
  poster: PropTypes.string, // Image d’attente
  zIndex: PropTypes.number, // Niveau d’empilement
  preload: PropTypes.oneOf(["none", "metadata", "auto"]), // Mode de préchargement
};
