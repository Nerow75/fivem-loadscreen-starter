// VolumeControl.jsx
import { useEffect, useId, useMemo } from "react";
import PropTypes from "prop-types";
import { THEME } from "../../config";

const styles = (primary) => `
  .nr-volume {
    position: relative; display: inline-block;
  }
  .nr-range {
    appearance: none; width: clamp(220px, 28vw, 320px); background: transparent;
  }
  .nr-range:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(255,255,255,.28); border-radius: 12px; }
  .nr-range::-webkit-slider-runnable-track {
    height: 10px; border-radius: 999px;
    background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.14));
    box-shadow: inset 0 2px 4px rgba(0,0,0,.25);
  }
  .nr-range::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 20px; height: 20px; border-radius: 50%;
    margin-top: -5px; background: ${primary}; border: 2px solid rgba(255,255,255,.9);
    box-shadow: 0 0 12px ${primary}, 0 2px 10px rgba(0,0,0,.4); transition: transform .15s ease;
  }
  .nr-range::-webkit-slider-thumb:hover { transform: scale(1.12); }
  .nr-range::-moz-range-track {
    height: 10px; border-radius: 999px;
    background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.14));
    box-shadow: inset 0 2px 4px rgba(0,0,0,.25);
  }
  .nr-range::-moz-range-thumb {
    width: 20px; height: 20px; border-radius: 50%; background: ${primary}; border: 2px solid rgba(255,255,255,.9);
    box-shadow: 0 0 12px ${primary}, 0 2px 10px rgba(0,0,0,.4); transition: transform .15s ease;
  }
`;

export const VolumeControl = ({ volume, onVolumeChange }) => {
  const id = useId();
  const primary = THEME?.primary || "#22A7E8";
  const val = useMemo(() => (Number.isFinite(volume) ? volume : 50), [volume]);

  useEffect(() => {
    try {
      const FLAG = "nr:volume:init";
      const KEY = "nr:volume";
      if (localStorage.getItem(FLAG) !== "1") {
        localStorage.setItem(FLAG, "1");
        localStorage.setItem(KEY, "50");
        onVolumeChange?.(50);
      } else {
        const saved = Number(localStorage.getItem(KEY));
        if (Number.isFinite(saved))
          onVolumeChange?.(Math.max(0, Math.min(100, saved)));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handle = (v) => {
    const n = Math.max(0, Math.min(100, Number(v)));
    try {
      localStorage.setItem("nr:volume", String(n));
    } catch {}
    onVolumeChange?.(n);
  };

  return (
    <div style={{ marginTop: 18, textAlign: "center" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          color: "#fff",
          opacity: 0.9,
          fontSize: "1em",
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        Volume
      </label>

      <div className="nr-volume">
        <input
          id={id}
          className="nr-range"
          type="range"
          min={0}
          max={100}
          value={val}
          onChange={(e) => handle(e.target.value)}
          aria-label="Régler le volume"
          title={`Volume : ${val}%`}
        />
      </div>

      <div
        style={{
          marginTop: 8,
          color: "rgba(255,255,255,0.85)",
          fontSize: "0.95em",
          fontWeight: 500,
        }}
      >
        {val}%
      </div>

      <style>{styles(primary)}</style>
    </div>
  );
};

VolumeControl.propTypes = {
  volume: PropTypes.number,
  onVolumeChange: PropTypes.func,
};
