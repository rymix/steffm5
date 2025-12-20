import { useMixcloud } from "contexts/mixcloud";
import { useTheme } from "contexts/theme";
import React, { useMemo, useState } from "react";
import { getCategoryName, getPanelThemeMode } from "utils/themeHelpers";

import {
  StyledDisplayDevice,
  StyledDisplayDeviceWrapper,
  StyledLogoPlate,
  StyledLogoText,
  StyledMixCard,
  StyledMixCoverArt,
  StyledMixInfo,
  StyledMixName,
  StyledNoMix,
  StyledNoTracks,
  StyledScreen,
  StyledToggleButton,
  StyledTrackArtist,
  StyledTrackContent,
  StyledTrackCoverArt,
  StyledTrackExpandedInfo,
  StyledTrackExtraInfo,
  StyledTrackHeader,
  StyledTrackItem,
  StyledTrackList,
  StyledTrackListHeader,
  StyledTrackListSection,
  StyledTrackName,
  StyledTrackNumber,
  StyledTrackRemix,
  StyledTrackTime,
  StyledWoodSlats,
} from "./styles";

interface DisplayDeviceProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const DisplayDevice: React.FC<DisplayDeviceProps> = ({
  isOpen: isOpenProp,
  onToggle: onToggleProp,
}) => {
  const { state, actions } = useMixcloud();
  const theme = useTheme();
  const panelThemeMode = getPanelThemeMode(theme.state.mode);
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const [expandedTrackIndex, setExpandedTrackIndex] = useState<number | null>(
    null,
  );

  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenInternal;
  const toggleDisplay =
    onToggleProp || (() => setIsOpenInternal(!isOpenInternal));

  const currentMix = actions.getCurrentMix();

  const toggleTrackExpanded = (index: number) => {
    setExpandedTrackIndex(expandedTrackIndex === index ? null : index);
  };

  // Helper to calculate track duration
  const getTrackDuration = (index: number): string => {
    if (!sortedTracks[index]) {
      return "";
    }
    const currentStart = timeToSeconds(sortedTracks[index].startTime);
    const nextStart = sortedTracks[index + 1]
      ? timeToSeconds(sortedTracks[index + 1].startTime)
      : state.duration;
    const durationSeconds = nextStart - currentStart;
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Helper to convert time string to seconds
  const timeToSeconds = (timeString: string): number => {
    const parts = timeString.split(":");
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 3) {
      return (
        parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
      );
    }
    return 0;
  };

  // Get sorted tracks
  const sortedTracks = useMemo(() => {
    if (!currentMix?.tracks) return [];
    return [...currentMix.tracks].sort(
      (a, b) => timeToSeconds(a.startTime) - timeToSeconds(b.startTime),
    );
  }, [currentMix]);

  // Determine currently playing track
  const currentTrackIndex = useMemo(() => {
    if (!sortedTracks.length || state.position <= 0) return -1;

    const tolerance = 2;
    for (let i = 0; i < sortedTracks.length; i++) {
      const track = sortedTracks[i];
      const trackStartSeconds = timeToSeconds(track.startTime);
      const nextTrack =
        i < sortedTracks.length - 1 ? sortedTracks[i + 1] : null;
      const nextTrackStartSeconds = nextTrack
        ? timeToSeconds(nextTrack.startTime)
        : state.duration;

      if (
        state.position >= trackStartSeconds - tolerance &&
        state.position < nextTrackStartSeconds - tolerance
      ) {
        return i;
      }
    }
    return -1;
  }, [sortedTracks, state.position, state.duration]);

  return (
    <StyledDisplayDeviceWrapper>
      <StyledToggleButton $isOpen={isOpen} onClick={toggleDisplay}>
        {isOpen ? "▶" : "◀"}
      </StyledToggleButton>

      <StyledDisplayDevice $isOpen={isOpen}>
        <StyledWoodSlats>
          <StyledLogoPlate>
            <StyledLogoText>INFO</StyledLogoText>
          </StyledLogoPlate>
        </StyledWoodSlats>

        <StyledScreen $themeMode={panelThemeMode}>
          {currentMix ? (
            <StyledMixCard $themeMode={panelThemeMode}>
              {currentMix.coverArtLarge && (
                <StyledMixCoverArt
                  src={currentMix.coverArtLarge}
                  alt={currentMix.name}
                />
              )}

              <StyledMixName $themeMode={panelThemeMode}>
                {currentMix.name}
              </StyledMixName>

              {currentMix.user?.name && (
                <StyledMixInfo $themeMode={panelThemeMode}>
                  <strong>DJ:</strong> {currentMix.user.name}
                </StyledMixInfo>
              )}

              {currentMix.category && (
                <StyledMixInfo $themeMode={panelThemeMode}>
                  <strong>Category:</strong>{" "}
                  {getCategoryName(currentMix.category)}
                </StyledMixInfo>
              )}

              {currentMix.duration && (
                <StyledMixInfo $themeMode={panelThemeMode}>
                  <strong>Duration:</strong> {currentMix.duration}
                </StyledMixInfo>
              )}

              {currentMix.releaseDate && (
                <StyledMixInfo $themeMode={panelThemeMode}>
                  <strong>Release Date:</strong> {currentMix.releaseDate}
                </StyledMixInfo>
              )}

              {currentMix.created_time && (
                <StyledMixInfo $themeMode={panelThemeMode}>
                  <strong>Uploaded:</strong>{" "}
                  {new Date(currentMix.created_time).toLocaleDateString()}
                </StyledMixInfo>
              )}

              {currentMix.audio_length && (
                <StyledMixInfo $themeMode={panelThemeMode}>
                  <strong>Length:</strong>{" "}
                  {Math.floor(currentMix.audio_length / 60)} minutes
                </StyledMixInfo>
              )}

              {currentMix.play_count !== undefined && (
                <StyledMixInfo $themeMode={panelThemeMode}>
                  <strong>Plays:</strong>{" "}
                  {currentMix.play_count.toLocaleString()}
                </StyledMixInfo>
              )}

              {currentMix.tags && currentMix.tags.length > 0 && (
                <StyledMixInfo $themeMode={panelThemeMode}>
                  <strong>Tags:</strong> {currentMix.tags.join(", ")}
                </StyledMixInfo>
              )}

              {currentMix.notes && (
                <StyledMixInfo $themeMode={panelThemeMode}>
                  <strong>Notes:</strong> {currentMix.notes}
                </StyledMixInfo>
              )}
            </StyledMixCard>
          ) : (
            <StyledNoMix $themeMode={panelThemeMode}>
              No mix currently playing
            </StyledNoMix>
          )}

          {currentMix && (
            <StyledTrackListSection>
              <StyledTrackListHeader $themeMode={panelThemeMode}>
                Track List{" "}
                {sortedTracks.length > 0 && `(${sortedTracks.length})`}
              </StyledTrackListHeader>
              {sortedTracks.length > 0 ? (
                <StyledTrackList>
                  {sortedTracks.map((track, index) => {
                    const isPlaying = index === currentTrackIndex;
                    const isExpanded = expandedTrackIndex === index;
                    const duration = getTrackDuration(index);
                    return (
                      <StyledTrackItem
                        key={index}
                        $isPlaying={isPlaying}
                        $isExpanded={isExpanded}
                        $themeMode={panelThemeMode}
                        onClick={() => toggleTrackExpanded(index)}
                      >
                        {track.coverArtLarge && (
                          <StyledTrackCoverArt
                            src={track.coverArtLarge}
                            alt={track.trackName}
                            $isPlaying={isPlaying}
                            $isExpanded={isExpanded}
                          />
                        )}
                        <StyledTrackContent>
                          <StyledTrackHeader>
                            <StyledTrackNumber
                              $isPlaying={isPlaying}
                              $themeMode={panelThemeMode}
                            >
                              {track.sectionNumber || index + 1}
                            </StyledTrackNumber>
                            <StyledTrackTime
                              $isPlaying={isPlaying}
                              $themeMode={panelThemeMode}
                            >
                              {track.startTime}
                            </StyledTrackTime>
                          </StyledTrackHeader>
                          {track.trackName && (
                            <StyledTrackName
                              $isPlaying={isPlaying}
                              $themeMode={panelThemeMode}
                            >
                              {track.trackName}
                            </StyledTrackName>
                          )}
                          {track.artistName && (
                            <StyledTrackArtist
                              $isPlaying={isPlaying}
                              $themeMode={panelThemeMode}
                            >
                              {track.artistName}
                            </StyledTrackArtist>
                          )}
                          {track.remixArtist && (
                            <StyledTrackRemix
                              $isPlaying={isPlaying}
                              $themeMode={panelThemeMode}
                            >
                              {track.remixArtist}
                            </StyledTrackRemix>
                          )}
                          <StyledTrackExpandedInfo
                            $isExpanded={isExpanded}
                            $themeMode={panelThemeMode}
                          >
                            {duration && (
                              <StyledTrackExtraInfo
                                $isPlaying={isPlaying}
                                $themeMode={panelThemeMode}
                              >
                                <strong>Length:</strong>
                                {duration}
                              </StyledTrackExtraInfo>
                            )}
                            {track.publisher && (
                              <StyledTrackExtraInfo
                                $isPlaying={isPlaying}
                                $themeMode={panelThemeMode}
                              >
                                <strong>Publisher:</strong>
                                {track.publisher}
                              </StyledTrackExtraInfo>
                            )}
                          </StyledTrackExpandedInfo>
                        </StyledTrackContent>
                      </StyledTrackItem>
                    );
                  })}
                </StyledTrackList>
              ) : (
                <StyledNoTracks $themeMode={panelThemeMode}>
                  No track information available
                </StyledNoTracks>
              )}
            </StyledTrackListSection>
          )}
        </StyledScreen>

        {/* <StyledMetalPanel>
          <PlaybackButtons showLabels={false} />
        </StyledMetalPanel> */}
      </StyledDisplayDevice>
    </StyledDisplayDeviceWrapper>
  );
};

export default DisplayDevice;
