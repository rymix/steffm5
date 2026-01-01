import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledButton,
  StyledControlsContainer,
  StyledPersistentControls,
  StyledVolumeContainer,
  StyledVolumeIcon,
  StyledVolumeSlider,
} from "./styles";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeOff from "@mui/icons-material/VolumeOff";
import VolumeUp from "@mui/icons-material/VolumeUp";

interface PersistentControlsProps {
  isPanelOpen?: boolean;
}

const PersistentControls: React.FC<PersistentControlsProps> = ({
  isPanelOpen = false,
}) => {
  const { state, actions } = useMixcloud();

  const getVolumeIcon = () => {
    if (state.volume === 0) return VolumeOff;
    if (state.volume < 0.5) return VolumeDown;
    if (state.volume >= 0.5) return VolumeUp;
    return VolumeUp;
  };

  return (
    <StyledPersistentControls $isPanelOpen={isPanelOpen}>
      <StyledControlsContainer>
        <StyledVolumeContainer>
          <StyledVolumeIcon
            onClick={actions.toggleMute}
            title={`${state.volume === 0 ? "Unmute" : "Mute"} (Volume: ${Math.round(state.volume * 100)}%)`}
          >
            {React.createElement(getVolumeIcon())}
          </StyledVolumeIcon>
          <StyledVolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.volume}
            onChange={(e) => actions.setVolume(parseFloat(e.target.value))}
            title={`Volume: ${Math.round(state.volume * 100)}%`}
          />
        </StyledVolumeContainer>

        <StyledButton onClick={actions.previous} title="Previous Mix">
          <SkipPreviousIcon />
        </StyledButton>

        <StyledButton
          onClick={actions.toggle}
          title={state.isPlaying ? "Pause" : "Play"}
        >
          {state.isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </StyledButton>

        <StyledButton onClick={actions.next} title="Next Mix">
          <SkipNextIcon />
        </StyledButton>
      </StyledControlsContainer>
    </StyledPersistentControls>
  );
};

export default PersistentControls;
