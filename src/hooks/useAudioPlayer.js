import { useEffect, useRef, useState } from 'react';

export const useAudioPlayer = (playlist) => {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(() => 
    Number(localStorage.getItem('nr_vol') ?? 30)
  );

  // Gestion du changement de piste
  useEffect(() => {
    if (!audioRef.current || !playlist.length) return;
    
    audioRef.current.src = playlist[trackIndex].url;
    audioRef.current.loop = false;
    audioRef.current.volume = volume / 100;
    
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [trackIndex, isPlaying, playlist, volume]);

  // Gestion du volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
    localStorage.setItem('nr_vol', String(volume));
  }, [volume]);

  // Auto-play au premier clic/message
  useEffect(() => {
    const tryPlay = () => audioRef.current?.play().catch(() => {});
    
    const handlePointer = () => {
      tryPlay();
      window.removeEventListener('pointerdown', handlePointer);
    };
    
    const handleMessage = () => {
      tryPlay();
      window.removeEventListener('message', handleMessage);
    };

    window.addEventListener('pointerdown', handlePointer);
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('pointerdown', handlePointer);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleEnded = () => {
    setTrackIndex((i) => (i + 1) % playlist.length);
  };

  const nextTrack = () => {
    setTrackIndex((i) => (i + 1) % playlist.length);
  };

  const previousTrack = () => {
    setTrackIndex((i) => (i - 1 + playlist.length) % playlist.length);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    audioRef,
    trackIndex,
    isPlaying,
    volume,
    setVolume,
    handleEnded,
    nextTrack,
    previousTrack,
    togglePlay,
    currentTrack: playlist[trackIndex] || null,
  };
};
