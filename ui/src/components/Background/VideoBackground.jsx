// VideoBackground.jsx
import { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";

const extractYouTubeId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

export const VideoBackground = ({
  sources = [],
  poster = null,
  zIndex = -1,
  preload = "metadata",
}) => {
  const videoRef = useRef(null);

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

  const inferType = (url) => {
    const ext = url.split("?")[0].split("#")[0].split(".").pop()?.toLowerCase();
    if (ext === "mp4") return "video/mp4";
    if (ext === "webm") return "video/webm";
    if (ext === "ogg" || ext === "ogv") return "video/ogg";
    return undefined;
  };

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
          zIndex: 1,
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
            height: "56.25vw",
            minWidth: "177.78vh",
            minHeight: "100vh",
            transform: "translate(-50%, -50%)",
            border: "none",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  if (!cleanSources.length) return null;

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
      {cleanSources.map((src) => (
        <source key={src} src={src} type={inferType(src)} />
      ))}
    </video>
  );
};

VideoBackground.propTypes = {
  sources: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  poster: PropTypes.string,
  zIndex: PropTypes.number,
  preload: PropTypes.oneOf(["none", "metadata", "auto"]),
};
