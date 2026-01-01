import { useEffect } from "react";

/**
 * Hook to handle ESC key press
 * @param isEnabled - Whether the ESC key handler is active
 * @param onEscape - Callback to invoke when ESC is pressed
 */
export function useEscapeKey(isEnabled: boolean, onEscape: () => void): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isEnabled) {
        onEscape();
      }
    };

    if (isEnabled) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEnabled, onEscape]);
}
