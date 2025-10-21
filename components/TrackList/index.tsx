import { useMixcloud } from "contexts/mixcloud";
import React from "react";

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
  const currentMix = actions.getCurrentMix();

  // Convert MM:SS format to seconds
  const timeToSeconds = (timeString: string): number => {
    const parts = timeString.split(":");
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return 0;
  };

  // Determine track status based on current position
  const getTrackStatus = (
    track: Track,
    nextTrack: Track | null,
    currentPosition: number,
  ): "played" | "playing" | "upcoming" => {
    const trackStartSeconds = timeToSeconds(track.startTime);
    const nextTrackStartSeconds = nextTrack
      ? timeToSeconds(nextTrack.startTime)
      : state.duration; // Use mix duration for last track

    if (currentPosition < trackStartSeconds) {
      return "upcoming";
    } else if (
      currentPosition >= trackStartSeconds &&
      currentPosition < nextTrackStartSeconds
    ) {
      return "playing";
    } else {
      return "played";
    }
  };

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

  if (!currentMix || !currentMix.tracks || currentMix.tracks.length === 0) {
    return null;
  }

  return (
    <StyledTrackList>
      <StyledTrackListHeader>
        Tracks ({currentMix.tracks.length})
      </StyledTrackListHeader>

      <StyledTrackListContainer>
        {currentMix.tracks.map((track, index) => {
          const nextTrack =
            index < currentMix.tracks.length - 1
              ? currentMix.tracks[index + 1]
              : null;
          const status = getTrackStatus(track, nextTrack, state.position);

          return (
            <StyledTrackListItem
              key={`${track.sectionNumber}-${track.trackName}`}
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
