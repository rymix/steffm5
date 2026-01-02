import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledButton,
  StyledButtonsContainer,
  StyledCurrentTrack,
  StyledDrivingMode,
  StyledMixName,
} from "./styles";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const DrivingMode: React.FC = () => {
  const { state, actions } = useMixcloud();
  const currentMix = actions.getCurrentMix();

  return (
    <StyledDrivingMode>
      <StyledCurrentTrack>
        {currentMix && (
          <>
            <StyledMixName>{currentMix.name}</StyledMixName>
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
