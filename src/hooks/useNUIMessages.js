// useNUIMessages.js
import { useEffect, useState } from "react";

export const useNUIMessages = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initialisation...");
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      const data = e?.data || {};
      let p =
        typeof data.loadFraction === "number"
          ? data.loadFraction * 100
          : typeof data.value === "number"
          ? data.value
          : null;

      if (p != null && Number.isFinite(p)) {
        setProgress(Math.max(0, Math.min(100, p)));
      }

      if (typeof data.message === "string" && data.message.trim().length) {
        setLoadingText(data.message);
      }

      if (
        typeof data.playerCount === "number" &&
        Number.isFinite(data.playerCount)
      ) {
        setPlayerCount(Math.max(0, Math.floor(data.playerCount)));
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return { progress, loadingText, playerCount };
};
