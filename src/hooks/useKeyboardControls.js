// useKeyboardControls.js
import { useEffect } from "react";

export const useKeyboardControls = ({
  onPrevious,
  onNext,
  onVolumeUp,
  onVolumeDown,
  enabled = true,
}) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      // Ignorer si l'utilisateur tape dans un input/textarea
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onPrevious?.();
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext?.();
          break;
        case "ArrowUp":
          e.preventDefault();
          onVolumeUp?.();
          break;
        case "ArrowDown":
          e.preventDefault();
          onVolumeDown?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onPrevious, onNext, onVolumeUp, onVolumeDown]);
};
