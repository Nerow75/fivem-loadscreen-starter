import { THEME } from '../../config';
import { rangeStyle } from '../../utils/constants';

export const VolumeControl = ({ volume, onVolumeChange }) => {
  return (
    <div style={{ marginTop: 24 }}>
      <input
        className="nr-range"
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        title={`Volume: ${volume}%`}
        style={rangeStyle()}
      />
      <style>{`
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
        .nr-range {
          width: 220px;
        }
      `}</style>
    </div>
  );
};
