import { useMemo } from "react";
import { findTrackIndexAtPosition, sortTracksByTime } from "utils/trackHelpers";

/**
 * Hook to get the currently playing track based on playback position
 * @param tracks - Array of track objects from the current mix
 * @param position - Current playback position in seconds
 * @param duration - Total mix duration in seconds
 * @param tolerance - Time tolerance in seconds (default: 2)
 * @returns Current track object or null
 */
export function useCurrentTrack(
  tracks: any[] | undefined,
  position: number,
  duration: number,
  tolerance: number = 2,
): any | null {
  return useMemo(() => {
    if (!tracks || tracks.length === 0 || position <= 0) return null;

    const sortedTracks = sortTracksByTime(tracks);
    const trackIndex = findTrackIndexAtPosition(
      sortedTracks,
      position,
      duration,
      tolerance,
    );

    return trackIndex >= 0 ? sortedTracks[trackIndex] : null;
  }, [tracks, position, duration, tolerance]);
}

/**
 * Hook to get the index of the currently playing track
 * @param tracks - Array of track objects from the current mix
 * @param position - Current playback position in seconds
 * @param duration - Total mix duration in seconds
 * @param tolerance - Time tolerance in seconds (default: 2)
 * @returns Current track index or -1
 */
export function useCurrentTrackIndex(
  tracks: any[] | undefined,
  position: number,
  duration: number,
  tolerance: number = 2,
): number {
  return useMemo(() => {
    if (!tracks || tracks.length === 0 || position <= 0) return -1;

    const sortedTracks = sortTracksByTime(tracks);
    return findTrackIndexAtPosition(
      sortedTracks,
      position,
      duration,
      tolerance,
    );
  }, [tracks, position, duration, tolerance]);
}
