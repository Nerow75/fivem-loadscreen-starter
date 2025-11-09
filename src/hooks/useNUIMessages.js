import { useEffect, useState } from 'react';

export const useNUIMessages = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initialisation...');
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    const handleMessage = (e) => {
      const data = e.data || {};
      
      // Gestion du progrès
      const progressValue = 
        typeof data.loadFraction === 'number' ? data.loadFraction * 100
        : typeof data.value === 'number' ? data.value
        : progress;
      
      setProgress(Math.max(0, Math.min(100, progressValue)));
      
      // Gestion du texte de chargement
      if (data.message) {
        setLoadingText(data.message);
      }
      
      // Gestion du nombre de joueurs
      if (typeof data.playerCount === 'number') {
        setPlayerCount(data.playerCount);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [progress]);

  return { progress, loadingText, playerCount };
};
