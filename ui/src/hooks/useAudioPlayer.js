// useAudioPlayer.js
import { useEffect, useRef, useState } from "react";

const FLAG_KEY = "nr:volume:init";
const VALUE_KEY = "nr:volume";

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const clamp100 = (v) => Math.min(100, Math.max(0, v));

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useAudioPlayer = (playlist = []) => {
  const audioRef = useRef(null);
  const [shuffledPlaylist] = useState(() => shuffleArray(playlist));

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [volume, setVolume] = useState(() => {
    try {
      const already = localStorage.getItem(FLAG_KEY) === "1";
      if (!already) {
        localStorage.setItem(FLAG_KEY, "1");
        localStorage.setItem(VALUE_KEY, "50");
        return 50;
      }
      const saved = Number(localStorage.getItem(VALUE_KEY));
      return Number.isFinite(saved) ? clamp100(saved) : 50;
    } catch {
      return 50;
    }
  });
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = clamp01(volume / 100);
    try {
      localStorage.setItem(VALUE_KEY, String(clamp100(volume)));
    } catch {}
  }, [volume]);

  useEffect(() => {
    const el = audioRef.current;
    if (
      !el ||
      !Array.isArray(shuffledPlaylist) ||
      shuffledPlaylist.length === 0
    )
      return;

    const track = shuffledPlaylist[trackIndex % shuffledPlaylist.length];
    if (!track?.url) return;

    el.src = track.url;
    el.loop = false;
    el.volume = clamp01(volume / 100);

    if (isPlaying) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [trackIndex, isPlaying, shuffledPlaylist]);

  useEffect(() => {
    let triggered = false;
    const tryPlay = () => {
      if (triggered) return;
      triggered = true;
      audioRef.current?.play().catch(() => {});
    };

    const onPointer = () => tryPlay();
    const onKey = () => tryPlay();
    const onMsg = () => tryPlay();

    window.addEventListener("pointerdown", onPointer, { once: true });
    window.addEventListener("keydown", onKey, { once: true });
    window.addEventListener("message", onMsg, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMsg);
    };
  }, []);

  const handleEnded = () => {
    if (!shuffledPlaylist.length) return;
    setTrackIndex((i) => (i + 1) % shuffledPlaylist.length);
  };

  const nextTrack = () => {
    if (!shuffledPlaylist.length) return;
    setTrackIndex((i) => (i + 1) % shuffledPlaylist.length);
  };

  const previousTrack = () => {
    if (!shuffledPlaylist.length) return;
    setTrackIndex(
      (i) => (i - 1 + shuffledPlaylist.length) % shuffledPlaylist.length
    );
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  return {
    audioRef,
    trackIndex,
    isPlaying,
    volume,
    setVolume: (v) => setVolume(clamp100(Number(v))),
    handleEnded,
    nextTrack,
    previousTrack,
    togglePlay,
    currentTrack:
      Array.isArray(shuffledPlaylist) && shuffledPlaylist.length
        ? shuffledPlaylist[trackIndex % shuffledPlaylist.length]
        : null,
  };
};
