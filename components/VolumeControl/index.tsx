import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledVolumeControl,
  StyledVolumeControlContainer,
  StyledVolumeControlLabel,
  StyledVolumeControlSlider,
  StyledVolumeIcon,
} from "./styles";

const VolumeControl: React.FC = () => {
  const { state, actions } = useMixcloud();

  const getVolumeIcon = () => {
    if (state.volume === 0) return "🔇";
    if (state.volume < 0.3) return "🔈";
    if (state.volume < 0.7) return "🔉";
    return "🔊";
  };

  return (
    <StyledVolumeControl>
      <StyledVolumeControlLabel>
        Volume: {Math.round(state.volume * 100)}%
      </StyledVolumeControlLabel>
      <StyledVolumeControlContainer>
        <StyledVolumeIcon
          onClick={actions.toggleMute}
          title={`${state.volume === 0 ? "Unmute" : "Mute"} (Volume: ${Math.round(state.volume * 100)}%)`}
        >
          {getVolumeIcon()}
        </StyledVolumeIcon>
        <StyledVolumeControlSlider
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={state.volume}
          onChange={(e) => actions.setVolume(Number(e.target.value))}
        />
      </StyledVolumeControlContainer>
    </StyledVolumeControl>
  );
};

export default VolumeControl;
