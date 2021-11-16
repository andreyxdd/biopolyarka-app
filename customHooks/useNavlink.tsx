import { useRef, useEffect } from "react";
import { useOnScreen } from "./useOnScreen";
import { useContextTypes } from "./useContextTypes";

export const useNavlink = (navLinkId: string) => {
  const ref = useRef<HTMLElement | null>(null);

  const { setActiveNavLinkId } = useContextTypes();

  const isOnScreen = useOnScreen(ref);

  useEffect(() => {
    if (isOnScreen) {
      setActiveNavLinkId(navLinkId);
    }
  }, [isOnScreen, setActiveNavLinkId, navLinkId]);

  return ref;
};
