import { useMixcloud } from "contexts/mixcloud";
import React, { useCallback, useState } from "react";

import type { Track } from "db/types";

import {
  StyledControlButton,
  StyledControlsContainer,
  StyledCurrentMixStatus,
  StyledDetailRow,
  StyledHoverControls,
  StyledLoadTracksButton,
  StyledMixDetails,
  StyledMixHeader,
  StyledMixList,
  StyledMixListItem,
  StyledMixListItemContent,
  StyledMixListItemInfo,
  StyledMixListProgressBar,
  StyledMixListProgressBarContainer,
  StyledMixListStatusDot,
  StyledMixMetadata,
  StyledMixTitle,
  StyledPausedText,
  StyledPlayingIcon,
  StyledToggleIcon,
  StyledTrackItem,
  StyledTrackList,
} from "./styles";

type MixItemState = {
  expanded: boolean;
  tracksLoaded: boolean;
  loadingTracks: boolean;
  tracks: Track[];
};

const MixcloudPlayerMixList: React.FC = () => {
  const { state, actions } = useMixcloud();
  const [mixStates, setMixStates] = useState<Record<string, MixItemState>>({});

  // Early return if context is not properly initialized
  if (!state || !actions) {
    return <div>Loading...</div>;
  }

  const getMixByKey = useCallback(
    (key: string) => {
      // Remove the /rymixxx/ prefix and trailing / to match with original mixcloudKey
      const originalKey = key.replace(/^\/rymixxx\/|\/$/g, "");
      return state.mixData?.find((mix) => mix.mixcloudKey === originalKey);
    },
    [state.mixData],
  );

  const toggleExpanded = useCallback((key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMixStates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        expanded: !prev[key]?.expanded,
        tracksLoaded: prev[key]?.tracksLoaded || false,
        loadingTracks: false,
        tracks: prev[key]?.tracks || [],
      },
    }));
  }, []);

  const loadTracks = useCallback(async (key: string, e: React.MouseEvent) => {
    e.stopPropagation();

    setMixStates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        expanded: prev[key]?.expanded || false,
        tracksLoaded: false,
        loadingTracks: true,
        tracks: prev[key]?.tracks || [],
      },
    }));

    try {
      // Remove the /rymixxx/ prefix and trailing / for API call
      const originalKey = key.replace(/^\/rymixxx\/|\/$/g, "");
      const response = await fetch(
        `/api/tracks/${encodeURIComponent(originalKey)}`,
      );
      if (response.ok) {
        const tracks: Track[] = await response.json();
        setMixStates((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            expanded: prev[key]?.expanded || false,
            tracksLoaded: true,
            loadingTracks: false,
            tracks,
          },
        }));
      } else {
        throw new Error("Failed to load tracks");
      }
    } catch (error) {
      console.error("Error loading tracks:", error);
      setMixStates((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          expanded: prev[key]?.expanded || false,
          tracksLoaded: false,
          loadingTracks: false,
          tracks: prev[key]?.tracks || [],
        },
      }));
    }
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  const formatDuration = useCallback((duration: string) => {
    // Convert duration string to human readable format
    const seconds = parseInt(duration);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, []);

  // Show loading state while mixes are being loaded
  if (state.isLoadingMixes) {
    return (
      <StyledMixList>
        <h4>Playlist:</h4>
        <div>Loading mixes...</div>
      </StyledMixList>
    );
  }

  // Don't render if no keys are available after loading
  if (!state.keys || state.keys.length === 0) {
    return (
      <StyledMixList>
        <h4>Playlist:</h4>
        <div>No mixes available</div>
      </StyledMixList>
    );
  }

  return (
    <StyledMixList>
      <h4>Playlist:</h4>
      <ul>
        {state.keys.map((key, index) => {
          const progress = actions?.getMixProgress?.(key) || {
            position: 0,
            duration: 0,
            status: "unplayed" as const,
          };
          const progressPercentage =
            progress.duration > 0
              ? Math.round((progress.position / progress.duration) * 100)
              : 0;

          const mix = getMixByKey(key);
          const mixState = mixStates[key];
          const isExpanded = mixState?.expanded || false;

          return (
            <StyledMixListItem
              key={key}
              $isCurrent={index === state.currentIndex}
              $isExpanded={isExpanded}
            >
              <StyledMixHeader
                onClick={(e: React.MouseEvent) => {
                  // Only toggle if the click wasn't on a button or control
                  if ((e.target as HTMLElement).tagName !== "BUTTON") {
                    toggleExpanded(key, e);
                  }
                }}
              >
                <StyledMixListItemContent>
                  <StyledMixListItemInfo>
                    <StyledMixListStatusDot $status={progress.status} />
                    <div>
                      <StyledMixTitle>
                        {index + 1}. {mix?.name || key}
                        {index === state.currentIndex && state.isPlaying && (
                          <StyledPlayingIcon>🔊</StyledPlayingIcon>
                        )}
                      </StyledMixTitle>
                      {mix && (
                        <StyledMixMetadata>
                          {mix.category} • {formatDate(mix.releaseDate)} •{" "}
                          {formatDuration(mix.duration)} •{" "}
                          {mix.tracks?.length || 0} tracks
                        </StyledMixMetadata>
                      )}
                    </div>
                  </StyledMixListItemInfo>
                  <StyledControlsContainer>
                    {/* Control buttons - only show on hover */}
                    <StyledHoverControls>
                      {/* Only show Play button if this mix is not currently playing */}
                      {!(index === state.currentIndex && state.isPlaying) && (
                        <StyledControlButton
                          $variant="play"
                          onClick={() => actions?.goToTrack?.(index)}
                          title="Play this mix"
                        >
                          Play
                        </StyledControlButton>
                      )}
                      {progress.status === "in_progress" && (
                        <StyledControlButton
                          $variant="resume"
                          onClick={() => actions?.goToTrack?.(index, true)}
                          title="Resume from saved position"
                        >
                          Resume
                        </StyledControlButton>
                      )}
                      {progress.status !== "unplayed" && (
                        <StyledControlButton
                          $variant="restart"
                          onClick={() => actions?.startMixOver?.(key)}
                          title="Start from beginning"
                        >
                          Start Over
                        </StyledControlButton>
                      )}
                    </StyledHoverControls>

                    {/* Playing status and pause button - moved to the right */}
                    {index === state.currentIndex && (
                      <StyledCurrentMixStatus>
                        {state.isPlaying && (
                          <StyledControlButton
                            $variant="pause"
                            onClick={() => actions?.pause?.()}
                            title="Pause playback"
                          >
                            Pause
                          </StyledControlButton>
                        )}
                        {!state.isPlaying && (
                          <StyledPausedText>Paused</StyledPausedText>
                        )}
                      </StyledCurrentMixStatus>
                    )}

                    {/* Toggle icon - changed from arrow to plus/minus */}
                    <StyledToggleIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(key, e);
                      }}
                      title={isExpanded ? "Hide details" : "Show details"}
                    >
                      {isExpanded ? "−" : "+"}
                    </StyledToggleIcon>
                  </StyledControlsContainer>
                </StyledMixListItemContent>
                <StyledMixListProgressBarContainer>
                  <StyledMixListProgressBar $progress={progressPercentage} />
                </StyledMixListProgressBarContainer>
              </StyledMixHeader>

              {isExpanded && mix && (
                <StyledMixDetails>
                  <StyledDetailRow>
                    <strong>Category:</strong> {mix.category}
                  </StyledDetailRow>
                  <StyledDetailRow>
                    <strong>Release Date:</strong> {formatDate(mix.releaseDate)}
                  </StyledDetailRow>
                  <StyledDetailRow>
                    <strong>Duration:</strong> {formatDuration(mix.duration)}
                  </StyledDetailRow>
                  <StyledDetailRow>
                    <strong>Tracks:</strong> {mix.tracks?.length || 0}
                  </StyledDetailRow>
                  {mix.tags && mix.tags.length > 0 && (
                    <StyledDetailRow>
                      <strong>Tags:</strong> {mix.tags.join(", ")}
                    </StyledDetailRow>
                  )}
                  {mix.notes && (
                    <StyledDetailRow>
                      <strong>Notes:</strong> {mix.notes}
                    </StyledDetailRow>
                  )}

                  <div style={{ marginTop: "12px" }}>
                    {!mixState?.tracksLoaded && !mixState?.loadingTracks && (
                      <StyledLoadTracksButton
                        onClick={(e: React.MouseEvent) => loadTracks(key, e)}
                      >
                        Load Track Details
                      </StyledLoadTracksButton>
                    )}

                    {mixState?.loadingTracks && (
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        Loading tracks...
                      </div>
                    )}

                    {mixState?.tracksLoaded && mixState.tracks.length > 0 && (
                      <StyledTrackList>
                        <div
                          style={{ fontWeight: "bold", marginBottom: "8px" }}
                        >
                          Track List:
                        </div>
                        {mixState.tracks.map((track, trackIndex) => (
                          <StyledTrackItem key={trackIndex}>
                            <div
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              {track.startTime} - {track.trackName}
                            </div>
                            <div style={{ fontSize: "11px", color: "#666" }}>
                              by {track.artistName}
                              {track.remixArtistName &&
                                ` (${track.remixArtistName} Remix)`}
                              {track.publisher && ` • ${track.publisher}`}
                            </div>
                          </StyledTrackItem>
                        ))}
                      </StyledTrackList>
                    )}
                  </div>
                </StyledMixDetails>
              )}
            </StyledMixListItem>
          );
        })}
      </ul>
    </StyledMixList>
  );
};

export default MixcloudPlayerMixList;
