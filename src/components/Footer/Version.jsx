import { glassBoxStyle } from '../../utils/constants';

export const Version = ({ version }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: 18,
        zIndex: 5,
        color: '#fff',
        fontSize: 12,
        opacity: 0.85,
        textShadow: '0 2px 6px rgba(0,0,0,0.45)',
        padding: '8px 12px',
        borderRadius: 12,
        ...glassBoxStyle,
      }}
    >
      {version}
    </div>
  );
};
