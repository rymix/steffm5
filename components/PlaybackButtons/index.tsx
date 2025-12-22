import { useMixcloud } from "contexts/mixcloud";
import React, { useState } from "react";

import {
  StyledButton,
  StyledButtonIcon,
  StyledButtonLabel,
  StyledButtonLED,
  StyledButtonsContainer,
  StyledButtonWrapper,
} from "./styles";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

// Constants
const MOMENTARY_LED_DURATION = 300; // Duration in ms for momentary button LED flash

interface PlaybackButtonsProps {
  showLabels?: boolean;
}

const PlaybackButtons: React.FC<PlaybackButtonsProps> = ({
  showLabels = true,
}) => {
  const { state, actions } = useMixcloud();
  const [prevPressed, setPrevPressed] = useState(false);
  const [playPressed, setPlayPressed] = useState(false);
  const [nextPressed, setNextPressed] = useState(false);

  const handlePrevClick = () => {
    setPrevPressed(true);
    setTimeout(() => setPrevPressed(false), MOMENTARY_LED_DURATION);
    actions.previous();
  };

  const handlePlayClick = () => {
    setPlayPressed(true);
    setTimeout(() => setPlayPressed(false), MOMENTARY_LED_DURATION);
    actions.toggle();
  };

  const handleNextClick = () => {
    setNextPressed(true);
    setTimeout(() => setNextPressed(false), MOMENTARY_LED_DURATION);
    actions.next();
  };

  return (
    <StyledButtonsContainer>
      <StyledButtonWrapper>
        <StyledButtonLED $active={prevPressed} />
        <StyledButtonIcon>
          <SkipPreviousIcon />
        </StyledButtonIcon>
        <StyledButton
          $pressed={prevPressed}
          onClick={handlePrevClick}
          disabled={state.keys.length <= 1}
        />
        {showLabels && <StyledButtonLabel>Prev</StyledButtonLabel>}
      </StyledButtonWrapper>

      <StyledButtonWrapper>
        <StyledButtonLED $active={state.isPlaying} $isPlayButton={true} />
        <StyledButtonIcon>
          <PlayArrowIcon /> <PauseIcon />
        </StyledButtonIcon>
        <StyledButton
          $pressed={playPressed}
          onClick={handlePlayClick}
          disabled={state.isLoading}
        />
        {showLabels && <StyledButtonLabel>Play / Pause</StyledButtonLabel>}
      </StyledButtonWrapper>

      <StyledButtonWrapper>
        <StyledButtonLED $active={nextPressed} />
        <StyledButtonIcon>
          <SkipNextIcon />
        </StyledButtonIcon>
        <StyledButton
          $pressed={nextPressed}
          onClick={handleNextClick}
          disabled={state.keys.length <= 1}
        />
        {showLabels && <StyledButtonLabel>Next</StyledButtonLabel>}
      </StyledButtonWrapper>
    </StyledButtonsContainer>
  );
};

export default PlaybackButtons;
