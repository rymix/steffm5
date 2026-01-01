import { useEffect, useRef } from "react";

/**
 * Hook to detect when the current mix or track changes
 * Calls the provided callback when a change is detected
 *
 * @param mixKey - Unique identifier for the current mix
 * @param trackKey - Unique identifier for the current track (can be track name, index, or null)
 * @param onMixChange - Callback function called when mix changes
 * @param onTrackChange - Callback function called when track changes (optional)
 */
export function useTrackChangeDetection(
  mixKey: string | null | undefined,
  trackKey: string | number | null | undefined,
  onMixChange?: () => void,
  onTrackChange?: () => void,
): void {
  const prevMixRef = useRef<string | null | undefined>(mixKey);
  const prevTrackRef = useRef<string | number | null | undefined>(trackKey);

  useEffect(() => {
    // Detect mix change
    if (mixKey !== prevMixRef.current) {
      prevMixRef.current = mixKey;
      if (onMixChange) {
        onMixChange();
      }
    }

    // Detect track change
    if (trackKey !== prevTrackRef.current) {
      prevTrackRef.current = trackKey;
      if (onTrackChange) {
        onTrackChange();
      }
    }
  }, [mixKey, trackKey, onMixChange, onTrackChange]);
}
