// VolumeControl.jsx
// Composant de gestion du volume avec mémorisation locale et interface utilisateur personnalisée.
// Utilise un slider HTML stylisé pour ajuster le niveau sonore entre 0 et 100.

import { useEffect, useId, useMemo } from "react";
import PropTypes from "prop-types";
import { THEME } from "../../config";

// Génération des styles CSS dynamiques en fonction de la couleur principale du thème.
const styles = (primary) => `
  .nr-volume {
    position: relative;
    display: inline-block;
  }

  .nr-range {
    appearance: none;
    width: clamp(220px, 28vw, 320px);
    background: transparent;
  }

  /* Effet de focus visible */
  .nr-range:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255,255,255,.28);
    border-radius: 12px;
  }

  /* Style de la piste (WebKit) */
  .nr-range::-webkit-slider-runnable-track {
    height: 10px;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.14));
    box-shadow: inset 0 2px 4px rgba(0,0,0,.25);
  }

  /* Style du curseur (WebKit) */
  .nr-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-top: -5px;
    background: ${primary};
    border: 2px solid rgba(255,255,255,.9);
    box-shadow: 0 0 12px ${primary}, 0 2px 10px rgba(0,0,0,.4);
    transition: transform .15s ease;
  }

  .nr-range::-webkit-slider-thumb:hover {
    transform: scale(1.12);
  }

  /* Style de la piste (Mozilla) */
  .nr-range::-moz-range-track {
    height: 10px;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.14));
    box-shadow: inset 0 2px 4px rgba(0,0,0,.25);
  }

  /* Style du curseur (Mozilla) */
  .nr-range::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${primary};
    border: 2px solid rgba(255,255,255,.9);
    box-shadow: 0 0 12px ${primary}, 0 2px 10px rgba(0,0,0,.4);
    transition: transform .15s ease;
  }
`;

export const VolumeControl = ({ volume, onVolumeChange }) => {
  const id = useId(); // Génération d’un identifiant unique pour l’élément du slider
  const primary = THEME?.primary || "#22A7E8"; // Couleur principale issue du thème global

  // Valeur normalisée du volume (défaut à 50%)
  const val = useMemo(() => (Number.isFinite(volume) ? volume : 50), [volume]);

  // Initialisation du volume depuis le stockage local
  useEffect(() => {
    try {
      const FLAG = "nr:volume:init";
      const KEY = "nr:volume";

      // Initialisation du volume si aucune valeur enregistrée
      if (localStorage.getItem(FLAG) !== "1") {
        localStorage.setItem(FLAG, "1");
        localStorage.setItem(KEY, "50");
        onVolumeChange?.(50);
      } else {
        const saved = Number(localStorage.getItem(KEY));
        if (Number.isFinite(saved)) {
          onVolumeChange?.(Math.max(0, Math.min(100, saved)));
        }
      }
    } catch {
      // Silencieux : évite les erreurs liées à localStorage (ex. mode privé)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fonction de mise à jour du volume et sauvegarde locale
  const handle = (v) => {
    const n = Math.max(0, Math.min(100, Number(v)));
    try {
      localStorage.setItem("nr:volume", String(n));
    } catch {}
    onVolumeChange?.(n);
  };

  return (
    <div style={{ marginTop: 18, textAlign: "center" }}>
      {/* Libellé du contrôle de volume */}
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

      {/* Élément principal du contrôle */}
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

      {/* Affichage numérique du niveau de volume */}
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

      {/* Injection du style dynamique dépendant du thème */}
      <style>{styles(primary)}</style>
    </div>
  );
};

// Validation des propriétés attendues
VolumeControl.propTypes = {
  volume: PropTypes.number, // Niveau sonore actuel
  onVolumeChange: PropTypes.func, // Fonction de rappel à chaque modification
};
