// useAudioPlayer.js
// Hook personnalisé de gestion de lecteur audio pour une playlist locale.
// Fournit un contrôle complet sur la lecture, le volume et la navigation entre les pistes.

import { useEffect, useRef, useState } from "react";

// Clés utilisées dans localStorage pour la gestion du volume
const FLAG_KEY = "nr:volume:init";
const VALUE_KEY = "nr:volume";

// Fonctions utilitaires de limitation des valeurs
const clamp01 = (v) => Math.min(1, Math.max(0, v)); // Bornage entre 0 et 1
const clamp100 = (v) => Math.min(100, Math.max(0, v)); // Bornage entre 0 et 100

// Fonction de mélange aléatoire (Fisher-Yates)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useAudioPlayer = (playlist = []) => {
  const audioRef = useRef(null); // Référence vers l’élément audio
  const [shuffledPlaylist] = useState(() => shuffleArray(playlist)); // Playlist mélangée au montage

  const [trackIndex, setTrackIndex] = useState(0); // Index de la piste courante
  const [isPlaying, setIsPlaying] = useState(true); // État de lecture

  // Initialisation du volume avec persistance dans localStorage
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

  // Application du volume au lecteur audio et mise à jour du stockage
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = clamp01(volume / 100);
    try {
      localStorage.setItem(VALUE_KEY, String(clamp100(volume)));
    } catch {}
  }, [volume]);

  // Gestion de la lecture en fonction de l’état et de la piste courante
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

  // Déblocage de la lecture automatique sur interaction utilisateur ou message externe
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

  // Gestion de fin de piste (lecture suivante)
  const handleEnded = () => {
    if (!shuffledPlaylist.length) return;
    setTrackIndex((i) => (i + 1) % shuffledPlaylist.length);
  };

  // Lecture de la piste suivante
  const nextTrack = () => {
    if (!shuffledPlaylist.length) return;
    setTrackIndex((i) => (i + 1) % shuffledPlaylist.length);
  };

  // Lecture de la piste précédente
  const previousTrack = () => {
    if (!shuffledPlaylist.length) return;
    setTrackIndex(
      (i) => (i - 1 + shuffledPlaylist.length) % shuffledPlaylist.length
    );
  };

  // Basculement lecture/pause
  const togglePlay = () => setIsPlaying((p) => !p);

  // Retour des propriétés et méthodes exposées
  return {
    audioRef, // Référence au lecteur audio
    trackIndex, // Index de la piste en cours
    isPlaying, // État de lecture
    volume, // Niveau de volume actuel
    setVolume: (v) => setVolume(clamp100(Number(v))), // Mise à jour sécurisée du volume
    handleEnded, // Gestionnaire d’événement fin de piste
    nextTrack, // Fonction suivante
    previousTrack, // Fonction précédente
    togglePlay, // Fonction de bascule lecture/pause
    currentTrack:
      Array.isArray(shuffledPlaylist) && shuffledPlaylist.length
        ? shuffledPlaylist[trackIndex % shuffledPlaylist.length]
        : null, // Piste courante
  };
};
