import { useEffect, useState } from 'react';
import { glassBoxStyle } from '../../utils/constants';

export const TopPhrases = ({ phrases }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseOpacity, setPhraseOpacity] = useState(1);

  useEffect(() => {
    if (!phrases.length) return;

    const interval = setInterval(() => {
      setPhraseOpacity(0);
      setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setPhraseOpacity(1);
      }, 240);
    }, 3200);

    return () => clearInterval(interval);
  }, [phrases.length]);

  if (!phrases.length) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 18,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        color: '#fff',
        fontSize: 14,
        letterSpacing: 0.3,
        textShadow: '0 2px 8px rgba(0,0,0,0.4)',
        textAlign: 'center',
        opacity: phraseOpacity,
        transition: 'opacity .24s ease',
        padding: '10px 18px',
        borderRadius: 16,
        maxWidth: '80vw',
        ...glassBoxStyle,
      }}
    >
      {phrases[phraseIndex]}
    </div>
  );
};
