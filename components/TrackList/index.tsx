import { useMixcloud } from "contexts/mixcloud";
import React, { useMemo } from "react";

import type { Track } from "db/types";

import {
  StyledTrackList,
  StyledTrackListContainer,
  StyledTrackListHeader,
  StyledTrackListItem,
  StyledTrackListItemArtist,
  StyledTrackListItemContent,
  StyledTrackListItemImage,
  StyledTrackListItemMeta,
  StyledTrackListItemPublisher,
  StyledTrackListItemStartTime,
  StyledTrackListItemStatus,
  StyledTrackListItemTitle,
} from "./styles";

const TrackList: React.FC = () => {
  const { state, actions } = useMixcloud();

  // Get current mix and memoize to ensure proper re-rendering
  const currentMix = useMemo(
    () => actions.getCurrentMix(),
    [state.currentKey, state.mixData],
  );

  // Convert MM:SS or H:MM:SS format to seconds
  const timeToSeconds = useMemo(() => {
    return (timeString: string): number => {
      const parts = timeString.split(":");
      if (parts.length === 2) {
        // MM:SS format
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
      } else if (parts.length === 3) {
        // H:MM:SS format
        return (
          parseInt(parts[0]) * 3600 +
          parseInt(parts[1]) * 60 +
          parseInt(parts[2])
        );
      }
      return 0;
    };
  }, []);

  // Sort tracks by their start time to ensure chronological order
  const sortedTracks = useMemo(() => {
    if (!currentMix?.tracks) return [];
    return [...currentMix.tracks].sort((a, b) => {
      return timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
    });
  }, [currentMix?.tracks, timeToSeconds]);

  // Memoize track statuses to ensure re-rendering on position/duration changes
  const trackStatuses = useMemo(() => {
    if (!sortedTracks.length) return [];

    return sortedTracks.map((track, trackIndex) => {
      const trackStartSeconds = timeToSeconds(track.startTime);

      // Get the next track in the sorted list for end boundary
      const nextTrack =
        trackIndex < sortedTracks.length - 1
          ? sortedTracks[trackIndex + 1]
          : null;
      const nextTrackStartSeconds = nextTrack
        ? timeToSeconds(nextTrack.startTime)
        : state.duration; // Use mix duration for last track

      // Add some tolerance for edge cases
      const tolerance = 2; // 2 seconds tolerance
      const currentPosition = state.position;

      let status: "played" | "playing" | "upcoming";
      if (currentPosition < trackStartSeconds - tolerance) {
        status = "upcoming";
      } else if (
        currentPosition >= trackStartSeconds - tolerance &&
        currentPosition < nextTrackStartSeconds - tolerance
      ) {
        status = "playing";
      } else {
        status = "played";
      }

      return {
        track,
        status,
        trackIndex,
      };
    });
  }, [sortedTracks, state.position, state.duration, timeToSeconds]);

  // Format time for display
  const formatTime = (timeString: string): string => {
    return timeString; // Already in MM:SS format
  };

  // Get artist display text
  const getArtistDisplay = (track: Track): string => {
    if (track.remixArtistName) {
      return `${track.artistName} (Remix: ${track.remixArtistName})`;
    }
    return track.artistName;
  };

  if (!currentMix || !trackStatuses || trackStatuses.length === 0) {
    return null;
  }

  return (
    <StyledTrackList>
      <StyledTrackListHeader>
        Tracks ({trackStatuses.length}) - Position: {Math.floor(state.position)}
        s / Duration: {Math.floor(state.duration)}s
      </StyledTrackListHeader>

      <StyledTrackListContainer>
        {trackStatuses.map(({ track, status, trackIndex }) => {
          return (
            <StyledTrackListItem
              key={`${currentMix.mixcloudKey}-${trackIndex}-${track.sectionNumber}`}
              $status={status}
            >
              <StyledTrackListItemImage>
                <img
                  src={track.localCoverArtLarge}
                  alt={`Cover art for ${track.trackName}`}
                  onError={(e) => {
                    // Fallback to remote image if local doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.src = track.coverArtLarge;
                  }}
                />
              </StyledTrackListItemImage>

              <StyledTrackListItemContent>
                <StyledTrackListItemTitle>
                  {track.trackName}
                </StyledTrackListItemTitle>

                <StyledTrackListItemArtist>
                  {getArtistDisplay(track)}
                </StyledTrackListItemArtist>

                {track.publisher && (
                  <StyledTrackListItemPublisher>
                    {track.publisher}
                  </StyledTrackListItemPublisher>
                )}
              </StyledTrackListItemContent>

              <StyledTrackListItemMeta>
                <StyledTrackListItemStartTime>
                  {formatTime(track.startTime)}
                </StyledTrackListItemStartTime>

                <StyledTrackListItemStatus $status={status}>
                  {status === "playing"
                    ? "Now Playing"
                    : status === "played"
                      ? "Played"
                      : "Upcoming"}
                </StyledTrackListItemStatus>
              </StyledTrackListItemMeta>
            </StyledTrackListItem>
          );
        })}
      </StyledTrackListContainer>
    </StyledTrackList>
  );
};

export default TrackList;
