import type { RefObject } from "react";
import { useEffect } from "react";

/**
 * Hook to manage iframe interactions for game windows
 *
 * Handles:
 * - Bringing window to front when iframe is clicked
 * - Setting/clearing game focus state
 * - Cross-origin iframe safety
 *
 * @param iframeRef - Ref to the iframe element
 * @param isVisible - Whether the window is currently visible
 * @param bringToFront - Callback to bring window to front
 * @param setGameFocus - Callback to set game focus state
 */
export function useIframeInteraction(
  iframeRef: RefObject<HTMLIFrameElement>,
  isVisible: boolean,
  bringToFront: () => void,
  setGameFocus: (_focused: boolean) => void,
): void {
  useEffect(() => {
    if (!isVisible || !iframeRef.current) return;

    const iframe = iframeRef.current;

    const handleIframeInteraction = () => {
      bringToFront();
      setGameFocus(true);
    };

    const handleBlur = () => {
      if (document.activeElement !== iframe) {
        setGameFocus(false);
      }
    };

    // Add event listener to iframe's content document when it loads
    const setupIframeListeners = () => {
      try {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.addEventListener("mousedown", handleIframeInteraction);
          iframeDoc.addEventListener("touchstart", handleIframeInteraction);
        }
      } catch {
        // Cross-origin iframe, can't access content
      }
    };

    // Setup listeners when iframe loads
    iframe.addEventListener("load", setupIframeListeners);
    // Try to setup immediately in case already loaded
    setupIframeListeners();

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleBlur);

    return () => {
      iframe.removeEventListener("load", setupIframeListeners);
      try {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.removeEventListener("mousedown", handleIframeInteraction);
          iframeDoc.removeEventListener("touchstart", handleIframeInteraction);
        }
      } catch {
        // Ignore cleanup errors
      }
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleBlur);
      setGameFocus(false);
    };
  }, [isVisible, bringToFront, setGameFocus, iframeRef]);
}
