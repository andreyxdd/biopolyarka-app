import { useState, useEffect, RefObject } from "react";

export const useOnScreen = (ref: RefObject<HTMLElement>) => {
  const [isOnScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    observer.observe(ref.current!);
    return () => {
      observer.disconnect();
    };
  }, []);

  return isOnScreen;
};
