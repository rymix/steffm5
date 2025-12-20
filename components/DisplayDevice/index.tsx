import { useMixcloud } from "contexts/mixcloud";
import React, { useMemo, useState } from "react";

import PlaybackButtons from "@/components/PlaybackButtons";

import {
  StyledDisplayDevice,
  StyledDisplayDeviceWrapper,
  StyledLogoPlate,
  StyledLogoText,
  StyledMetalPanel,
  StyledMixCard,
  StyledMixImage,
  StyledMixInfo,
  StyledMixName,
  StyledNoMix,
  StyledNoTracks,
  StyledScreen,
  StyledToggleButton,
  StyledTrackArtist,
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
  const [isOpenInternal, setIsOpenInternal] = useState(false);

  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenInternal;
  const toggleDisplay =
    onToggleProp || (() => setIsOpenInternal(!isOpenInternal));

  const currentMix = actions.getCurrentMix();

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

        <StyledScreen>
          {currentMix ? (
            <StyledMixCard>
              {currentMix.pictures?.large && (
                <StyledMixImage
                  src={currentMix.pictures.large}
                  alt={currentMix.name}
                />
              )}

              <StyledMixName>{currentMix.name}</StyledMixName>

              {currentMix.user?.name && (
                <StyledMixInfo>
                  <strong>DJ:</strong> {currentMix.user.name}
                </StyledMixInfo>
              )}

              {currentMix.created_time && (
                <StyledMixInfo>
                  <strong>Date:</strong>{" "}
                  {new Date(currentMix.created_time).toLocaleDateString()}
                </StyledMixInfo>
              )}

              {currentMix.audio_length && (
                <StyledMixInfo>
                  <strong>Duration:</strong>{" "}
                  {Math.floor(currentMix.audio_length / 60)} minutes
                </StyledMixInfo>
              )}

              {currentMix.play_count !== undefined && (
                <StyledMixInfo>
                  <strong>Plays:</strong>{" "}
                  {currentMix.play_count.toLocaleString()}
                </StyledMixInfo>
              )}

              {currentMix.tags && currentMix.tags.length > 0 && (
                <StyledMixInfo>
                  <strong>Tags:</strong> {currentMix.tags.join(", ")}
                </StyledMixInfo>
              )}
            </StyledMixCard>
          ) : (
            <StyledNoMix>No mix currently playing</StyledNoMix>
          )}

          {currentMix && (
            <StyledTrackListSection>
              <StyledTrackListHeader>
                Track List{" "}
                {sortedTracks.length > 0 && `(${sortedTracks.length})`}
              </StyledTrackListHeader>
              {sortedTracks.length > 0 ? (
                <StyledTrackList>
                  {sortedTracks.map((track, index) => {
                    const isPlaying = index === currentTrackIndex;
                    return (
                      <StyledTrackItem key={index} $isPlaying={isPlaying}>
                        <StyledTrackHeader>
                          <StyledTrackNumber $isPlaying={isPlaying}>
                            {track.sectionNumber || index + 1}
                          </StyledTrackNumber>
                          <StyledTrackTime $isPlaying={isPlaying}>
                            {track.startTime}
                          </StyledTrackTime>
                        </StyledTrackHeader>
                        {track.trackName && (
                          <StyledTrackName $isPlaying={isPlaying}>
                            {track.trackName}
                          </StyledTrackName>
                        )}
                        {track.artistName && (
                          <StyledTrackArtist $isPlaying={isPlaying}>
                            {track.artistName}
                          </StyledTrackArtist>
                        )}
                        {track.remixArtist && (
                          <StyledTrackRemix $isPlaying={isPlaying}>
                            {track.remixArtist}
                          </StyledTrackRemix>
                        )}
                      </StyledTrackItem>
                    );
                  })}
                </StyledTrackList>
              ) : (
                <StyledNoTracks>No track information available</StyledNoTracks>
              )}
            </StyledTrackListSection>
          )}
        </StyledScreen>

        <StyledMetalPanel>
          <PlaybackButtons showLabels={false} />
        </StyledMetalPanel>
      </StyledDisplayDevice>
    </StyledDisplayDeviceWrapper>
  );
};

export default DisplayDevice;
