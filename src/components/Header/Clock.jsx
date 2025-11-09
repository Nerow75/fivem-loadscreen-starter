import { THEME } from '../../config';
import { glassBoxStyle } from '../../utils/constants';

export const Clock = ({ currentTime, currentDate, playerCount, maxPlayers }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 18,
        left: 18,
        zIndex: 5,
        color: '#fff',
        fontSize: 14,
        lineHeight: 1.4,
        textShadow: '0 2px 6px rgba(0,0,0,0.45)',
        padding: '12px 16px',
        borderRadius: 16,
        ...glassBoxStyle,
      }}
    >
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
        <i className="fa-solid fa-clock" style={{ color: THEME.primary, fontSize: 12 }} />
        <strong>{currentTime}</strong>
      </div>
      
      <div style={{ marginBottom: 8, fontSize: 12, opacity: 0.9 }}>
        {currentDate}
      </div>
      
      <div
        style={{
          paddingTop: 8,
          borderTop: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <i className="fa-solid fa-users" style={{ color: THEME.primary, fontSize: 12 }} />
        <strong>Joueurs :</strong> {playerCount}/{maxPlayers}
      </div>
    </div>
  );
};
