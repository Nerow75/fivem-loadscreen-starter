// useClock.js
import { useEffect, useState } from "react";

const fmtTime = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
});
const fmtDate = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export const useClock = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    let raf;
    const update = () => {
      const now = new Date();
      const time = fmtTime.format(now);
      const date = fmtDate.format(now);
      setCurrentTime(time);
      setCurrentDate(date.charAt(0).toUpperCase() + date.slice(1));
    };
    update();
    const id = setInterval(update, 1000);
    const onVis = () => {
      if (!document.hidden) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { currentTime, currentDate };
};
