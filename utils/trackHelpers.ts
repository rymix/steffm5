/**
 * Track Helper Utilities
 *
 * Centralized functions for track time parsing, sorting, and position detection.
 * Used across DisplayDevice, CompactPlayer, MainPlayer, MusicTicker, MusicDotMatrix, etc.
 */

/**
 * Converts a time string (MM:SS or HH:MM:SS) to total seconds
 * @param timeString - Time in format "MM:SS" or "HH:MM:SS"
 * @returns Total seconds as a number
 */
export function timeToSeconds(timeString: string): number {
  const parts = timeString.split(":");
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  } else if (parts.length === 3) {
    return (
      parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
    );
  }
  return 0;
}

/**
 * Sorts tracks by their start time in ascending order
 * @param tracks - Array of track objects with startTime property
 * @returns New sorted array (does not mutate original)
 */
export function sortTracksByTime(tracks: any[]): any[] {
  return [...tracks].sort((a, b) => {
    return timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
  });
}

/**
 * Calculates the duration of a track based on its start time and the next track's start time
 * @param track - Current track object with startTime
 * @param nextTrack - Next track object with startTime (or null if last track)
 * @param totalDuration - Total mix duration in seconds
 * @returns Track duration in seconds
 */
export function getTrackDuration(
  track: any,
  nextTrack: any | null,
  totalDuration: number,
): number {
  const trackStartSeconds = timeToSeconds(track.startTime);
  const nextTrackStartSeconds = nextTrack
    ? timeToSeconds(nextTrack.startTime)
    : totalDuration;
  return nextTrackStartSeconds - trackStartSeconds;
}

/**
 * Finds the index of the track playing at a given position
 * @param sortedTracks - Array of tracks sorted by startTime
 * @param position - Current playback position in seconds
 * @param duration - Total mix duration in seconds
 * @param tolerance - Time tolerance in seconds (default: 2)
 * @returns Track index, or -1 if no track found
 */
export function findTrackIndexAtPosition(
  sortedTracks: any[],
  position: number,
  duration: number,
  tolerance: number = 2,
): number {
  if (!sortedTracks.length || position <= 0) return -1;

  for (let i = 0; i < sortedTracks.length; i++) {
    const track = sortedTracks[i];
    const trackStartSeconds = timeToSeconds(track.startTime);
    const nextTrack = i < sortedTracks.length - 1 ? sortedTracks[i + 1] : null;
    const nextTrackStartSeconds = nextTrack
      ? timeToSeconds(nextTrack.startTime)
      : duration;

    if (
      position >= trackStartSeconds - tolerance &&
      position < nextTrackStartSeconds - tolerance
    ) {
      return i;
    }
  }

  return -1;
}

/**
 * Gets the currently playing track from a mix based on playback position
 * @param mix - Mix object with tracks array
 * @param position - Current playback position in seconds
 * @param duration - Total mix duration in seconds
 * @returns Current track object or null if no track found
 */
export function getCurrentTrack(
  mix: any,
  position: number,
  duration: number,
): any | null {
  if (!mix || !mix.tracks || mix.tracks.length === 0) {
    return null;
  }

  const sortedTracks = sortTracksByTime(mix.tracks);

  for (let i = 0; i < sortedTracks.length; i++) {
    const track = sortedTracks[i];
    const nextTrack = sortedTracks[i + 1];
    const trackStart = timeToSeconds(track.startTime);
    const trackEnd = nextTrack ? timeToSeconds(nextTrack.startTime) : duration;

    if (position >= trackStart && position < trackEnd) {
      return track;
    }
  }

  // Default to first track if position is before first track starts
  return sortedTracks[0];
}
