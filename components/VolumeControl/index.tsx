import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledMixcloudPlayerVolumeControl,
  StyledMixcloudPlayerVolumeControlLabel,
  StyledMixcloudPlayerVolumeControlSlider,
} from "./styles";

const MixcloudPlayerVolumeControl: React.FC = () => {
  const { state, actions } = useMixcloud();

  return (
    <StyledMixcloudPlayerVolumeControl>
      <StyledMixcloudPlayerVolumeControlLabel>
        Volume: {Math.round(state.volume * 100)}%
      </StyledMixcloudPlayerVolumeControlLabel>
      <StyledMixcloudPlayerVolumeControlSlider
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={state.volume}
        onChange={(e) => actions.setVolume(Number(e.target.value))}
      />
    </StyledMixcloudPlayerVolumeControl>
  );
};

export default MixcloudPlayerVolumeControl;
