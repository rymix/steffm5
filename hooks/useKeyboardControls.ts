import { useMixcloud } from "contexts/mixcloud";
import { useWindowManager } from "contexts/windowManager";
import { useCallback, useEffect } from "react";

interface KeyboardControlsOptions {
  enabled?: boolean;
}

const useKeyboardControls = (options: KeyboardControlsOptions = {}) => {
  const { enabled = true } = options;
  const { state, actions } = useMixcloud();
  const { hasGameFocus } = useWindowManager();

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // Don't handle keyboard shortcuts if a game window has focus
      if (hasGameFocus) {
        return;
      }

      // Don't handle keyboard shortcuts if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      // Prevent default behavior for handled keys
      const key = event.key.toLowerCase();

      switch (key) {
        case "k":
          event.preventDefault();
          actions.toggle();
          break;

        case "j":
          event.preventDefault();
          actions.previous();
          break;

        case "l":
          event.preventDefault();
          actions.next();
          break;

        case "m":
          event.preventDefault();
          actions.toggleMute();
          break;

        case "arrowup": {
          event.preventDefault();
          // Increase volume by 10% (0.1), max 100%
          const newVolumeUp = Math.min(1, state.volume + 0.1);
          actions.setVolume(newVolumeUp);
          break;
        }

        case "arrowdown": {
          event.preventDefault();
          // Decrease volume by 10% (0.1), min 0%
          const newVolumeDown = Math.max(0, state.volume - 0.1);
          actions.setVolume(newVolumeDown);
          break;
        }

        case "r":
          event.preventDefault();
          actions.playRandomFromCurrentList();
          break;

        case "s":
          event.preventDefault();
          actions.shareCurrentMix();
          break;

        default:
          // Don't prevent default for unhandled keys
          break;
      }
    },
    [state.volume, actions, hasGameFocus],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Add event listener
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [enabled, handleKeyPress]);

  return {
    // Return current state for debugging or UI feedback
    isEnabled: enabled,
    currentVolume: state.volume,
    isPlaying: state.isPlaying,
    isMuted: state.volume === 0,
  };
};

export default useKeyboardControls;
