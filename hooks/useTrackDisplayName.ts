import { useMemo } from "react";

/**
 * Hook to generate a formatted display name for the current track/mix
 * Combines track name, artist name, remix artist name, and mix name
 * Returns uppercase text with apostrophes removed and spaces replaced with exclamation marks
 *
 * @param currentTrack - Current track object (may contain trackName, artistName, remixArtistName)
 * @param mixName - Current mix name
 * @returns Formatted display string (e.g., "TRACK!NAME!*!ARTIST!NAME!*!MIX!NAME")
 */
export function useTrackDisplayName(
  currentTrack: any | null,
  mixName?: string,
): string {
  return useMemo(() => {
    const parts = [];

    if (currentTrack?.trackName) {
      parts.push(currentTrack.trackName);
    }

    if (currentTrack?.artistName) {
      parts.push(currentTrack.artistName);
    }

    if (currentTrack?.remixArtistName) {
      parts.push(currentTrack.remixArtistName);
    }

    if (mixName) {
      parts.push(mixName);
    }

    const text =
      parts.length > 0 ? parts.join(" * ") : "STEF.FM MIXCLOUD PLAYER";

    return text.toUpperCase().replace(/'/g, "").replace(/ /g, "!");
  }, [
    currentTrack?.trackName,
    currentTrack?.artistName,
    currentTrack?.remixArtistName,
    mixName,
  ]);
}
