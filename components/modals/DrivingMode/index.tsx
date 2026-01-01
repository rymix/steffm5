import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledButton,
  StyledButtonsContainer,
  StyledCurrentTrack,
  StyledDrivingMode,
  StyledMixName,
  StyledTrackInfo,
} from "./styles";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const DrivingMode: React.FC = () => {
  const { state, actions } = useMixcloud();
  const currentMix = actions.getCurrentMix();

  // Get current track info
  const getCurrentTrackInfo = () => {
    if (!currentMix || !currentMix.tracks || currentMix.tracks.length === 0) {
      return null;
    }

    // Find current track based on position
    const sortedTracks = [...currentMix.tracks].sort((a, b) => {
      const timeToSeconds = (time: string) => {
        const parts = time.split(":");
        if (parts.length === 2) {
          return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }
        return 0;
      };
      return timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
    });

    for (let i = 0; i < sortedTracks.length; i++) {
      const track = sortedTracks[i];
      const nextTrack = sortedTracks[i + 1];
      const trackStart = track.startTime
        .split(":")
        .reduce((acc, time) => 60 * acc + +time, 0);
      const trackEnd = nextTrack
        ? nextTrack.startTime
            .split(":")
            .reduce((acc, time) => 60 * acc + +time, 0)
        : state.duration;

      if (state.position >= trackStart && state.position < trackEnd) {
        return track;
      }
    }

    return sortedTracks[0];
  };

  const currentTrack = getCurrentTrackInfo();

  return (
    <StyledDrivingMode>
      <StyledCurrentTrack>
        {currentMix && (
          <>
            <StyledMixName>{currentMix.name}</StyledMixName>
            {currentTrack && (
              <StyledTrackInfo>
                {currentTrack.trackName && <div>{currentTrack.trackName}</div>}
                {currentTrack.artistName && (
                  <div>{currentTrack.artistName}</div>
                )}
              </StyledTrackInfo>
            )}
          </>
        )}
      </StyledCurrentTrack>

      <StyledButtonsContainer>
        <StyledButton
          onClick={actions.previous}
          title="Previous Mix"
          aria-label="Previous Mix"
        >
          <SkipPreviousIcon />
        </StyledButton>

        <StyledButton
          onClick={actions.toggle}
          title={state.isPlaying ? "Pause" : "Play"}
          aria-label={state.isPlaying ? "Pause" : "Play"}
          $isPrimary
        >
          {state.isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </StyledButton>

        <StyledButton
          onClick={actions.next}
          title="Next Mix"
          aria-label="Next Mix"
        >
          <SkipNextIcon />
        </StyledButton>
      </StyledButtonsContainer>
    </StyledDrivingMode>
  );
};

export default DrivingMode;
