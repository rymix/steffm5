import { useMixcloud } from "contexts/mixcloud";
import { useTheme } from "contexts/theme";
import React, { useCallback, useState } from "react";
import { getModalThemeMode } from "utils/themeHelpers";

import type { Track } from "db/types";

import {
  StyledControlButton,
  StyledControlsContainer,
  StyledCurrentMixStatus,
  StyledDetailRow,
  StyledHoverControls,
  StyledLoadingText,
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
  StyledTrackArtist,
  StyledTrackItem,
  StyledTrackList,
  StyledTrackListHeader,
  StyledTrackLoadingText,
  StyledTrackName,
  StyledTrackPlaceholder,
  StyledTracksContainer,
} from "./styles";

type MixItemState = {
  expanded: boolean;
  tracksLoaded: boolean;
  loadingTracks: boolean;
  tracks: Track[];
};

const MixList: React.FC = () => {
  const { state, actions } = useMixcloud();
  const theme = useTheme();
  const modalThemeMode = getModalThemeMode(theme.state.mode);
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

  const toggleExpanded = useCallback(
    async (key: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const currentState = mixStates[key];
      const willBeExpanded = !currentState?.expanded;

      setMixStates((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          expanded: willBeExpanded,
          tracksLoaded: prev[key]?.tracksLoaded || false,
          loadingTracks:
            willBeExpanded && !prev[key]?.tracksLoaded ? true : false,
          tracks: prev[key]?.tracks || [],
        },
      }));

      // Auto-load tracks when expanding if they haven't been loaded yet
      if (
        willBeExpanded &&
        !currentState?.tracksLoaded &&
        !currentState?.loadingTracks
      ) {
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
                expanded: true,
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
              expanded: true,
              tracksLoaded: false,
              loadingTracks: false,
              tracks: prev[key]?.tracks || [],
            },
          }));
        }
      }
    },
    [mixStates],
  );

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
      <StyledMixList $themeMode={modalThemeMode}>
        <h4>Mix List</h4>
        <div>Loading mixes...</div>
      </StyledMixList>
    );
  }

  // Don't render if no keys are available after loading
  if (!state.keys || state.keys.length === 0) {
    return (
      <StyledMixList $themeMode={modalThemeMode}>
        <h4>Mix List</h4>
        <div>No mixes available</div>
      </StyledMixList>
    );
  }

  return (
    <StyledMixList $themeMode={modalThemeMode}>
      <h4>Mix List</h4>
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
              $themeMode={modalThemeMode}
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
                    <StyledMixListStatusDot
                      $status={progress.status}
                      $themeMode={modalThemeMode}
                    />
                    <div>
                      <StyledMixTitle $themeMode={modalThemeMode}>
                        {index + 1}. {mix?.name || key}
                        {index === state.currentIndex && state.isPlaying && (
                          <StyledPlayingIcon>🔊</StyledPlayingIcon>
                        )}
                      </StyledMixTitle>
                      {mix && (
                        <StyledMixMetadata $themeMode={modalThemeMode}>
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
                      {/* Only show Play button if this mix is not currently playing or loading */}
                      {!(
                        index === state.currentIndex &&
                        (state.isPlaying || state.isLoading)
                      ) && (
                        <StyledControlButton
                          $variant="play"
                          onClick={() => actions?.goToTrack?.(index)}
                          title="Play this mix"
                        >
                          Play
                        </StyledControlButton>
                      )}
                      {progress.status === "in_progress" &&
                        !(
                          index === state.currentIndex &&
                          (state.isPlaying || state.isLoading)
                        ) && (
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
                      {mix?.fileName && (
                        <StyledControlButton
                          as="a"
                          href={`https://steffm.blob.core.windows.net/steffm/${mix.fileName}`}
                          download
                          $variant="download"
                          title="Download this mix"
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          Download
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
                        {!state.isPlaying && state.isLoading && (
                          <StyledLoadingText $themeMode={modalThemeMode}>
                            Loading...
                          </StyledLoadingText>
                        )}
                        {!state.isPlaying && !state.isLoading && (
                          <StyledPausedText $themeMode={modalThemeMode}>
                            Paused
                          </StyledPausedText>
                        )}
                      </StyledCurrentMixStatus>
                    )}

                    {/* Toggle icon - changed from arrow to plus/minus */}
                    <StyledToggleIcon
                      $themeMode={modalThemeMode}
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
                <StyledMixListProgressBarContainer $themeMode={modalThemeMode}>
                  <StyledMixListProgressBar
                    $progress={progressPercentage}
                    $themeMode={modalThemeMode}
                  />
                </StyledMixListProgressBarContainer>
              </StyledMixHeader>

              {isExpanded && mix && (
                <StyledMixDetails $themeMode={modalThemeMode}>
                  <StyledDetailRow $themeMode={modalThemeMode}>
                    <strong>Category:</strong> {mix.category}
                  </StyledDetailRow>
                  <StyledDetailRow $themeMode={modalThemeMode}>
                    <strong>Release Date:</strong> {formatDate(mix.releaseDate)}
                  </StyledDetailRow>
                  <StyledDetailRow $themeMode={modalThemeMode}>
                    <strong>Duration:</strong> {formatDuration(mix.duration)}
                  </StyledDetailRow>
                  <StyledDetailRow $themeMode={modalThemeMode}>
                    <strong>Tracks:</strong> {mix.tracks?.length || 0}
                  </StyledDetailRow>
                  {mix.tags && mix.tags.length > 0 && (
                    <StyledDetailRow $themeMode={modalThemeMode}>
                      <strong>Tags:</strong> {mix.tags.join(", ")}
                    </StyledDetailRow>
                  )}
                  {mix.notes && (
                    <StyledDetailRow $themeMode={modalThemeMode}>
                      <strong>Notes:</strong> {mix.notes}
                    </StyledDetailRow>
                  )}

                  <StyledTracksContainer>
                    {mixState?.loadingTracks && (
                      <StyledTrackLoadingText $themeMode={modalThemeMode}>
                        Loading tracks...
                      </StyledTrackLoadingText>
                    )}

                    {mixState?.tracksLoaded && mixState.tracks.length > 0 && (
                      <StyledTrackList $themeMode={modalThemeMode}>
                        <StyledTrackListHeader>
                          Track List:
                        </StyledTrackListHeader>
                        {mixState.tracks.map((track, trackIndex) => (
                          <StyledTrackItem
                            key={trackIndex}
                            $themeMode={modalThemeMode}
                          >
                            <StyledTrackName>
                              {track.startTime} - {track.trackName}
                            </StyledTrackName>
                            <StyledTrackArtist $themeMode={modalThemeMode}>
                              by {track.artistName}
                              {track.remixArtistName &&
                                ` (${track.remixArtistName} Remix)`}
                              {track.publisher && ` • ${track.publisher}`}
                            </StyledTrackArtist>
                          </StyledTrackItem>
                        ))}
                      </StyledTrackList>
                    )}

                    {!mixState?.tracksLoaded && !mixState?.loadingTracks && (
                      <StyledTrackPlaceholder>
                        Track details will load automatically
                      </StyledTrackPlaceholder>
                    )}
                  </StyledTracksContainer>
                </StyledMixDetails>
              )}
            </StyledMixListItem>
          );
        })}
      </ul>
    </StyledMixList>
  );
};

export default MixList;
