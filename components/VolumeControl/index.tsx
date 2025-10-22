import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledVolumeControl,
  StyledVolumeControlLabel,
  StyledVolumeControlSlider,
} from "./styles";

const VolumeControl: React.FC = () => {
  const { state, actions } = useMixcloud();

  return (
    <StyledVolumeControl>
      <StyledVolumeControlLabel>
        Volume: {Math.round(state.volume * 100)}%
      </StyledVolumeControlLabel>
      <StyledVolumeControlSlider
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={state.volume}
        onChange={(e) => actions.setVolume(Number(e.target.value))}
      />
    </StyledVolumeControl>
  );
};

export default VolumeControl;
