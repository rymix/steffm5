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
    setTimeout(() => setPrevPressed(false), 100);
    actions.previous();
  };

  const handlePlayClick = () => {
    setPlayPressed(true);
    setTimeout(() => setPlayPressed(false), 100);
    actions.toggle();
  };

  const handleNextClick = () => {
    setNextPressed(true);
    setTimeout(() => setNextPressed(false), 100);
    actions.next();
  };

  return (
    <StyledButtonsContainer>
      <StyledButtonWrapper>
        <StyledButtonLED $active={prevPressed} />
        <StyledButtonIcon>⏮</StyledButtonIcon>
        <StyledButton
          $pressed={prevPressed}
          onClick={handlePrevClick}
          disabled={state.keys.length <= 1}
        />
        {showLabels && <StyledButtonLabel>Prev</StyledButtonLabel>}
      </StyledButtonWrapper>

      <StyledButtonWrapper>
        <StyledButtonLED $active={state.isPlaying} />
        <StyledButtonIcon>▶ ⏸</StyledButtonIcon>
        <StyledButton
          $pressed={playPressed}
          onClick={handlePlayClick}
          disabled={state.isLoading}
        />
        {showLabels && <StyledButtonLabel>Play / Pause</StyledButtonLabel>}
      </StyledButtonWrapper>

      <StyledButtonWrapper>
        <StyledButtonLED $active={nextPressed} />
        <StyledButtonIcon>⏭</StyledButtonIcon>
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
