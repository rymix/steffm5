import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import { StyledMixcloudPlayerVolumeControl } from "./styles";

const MixcloudPlayerVolumeControl: React.FC = () => {
  const { state, actions } = useMixcloud();

  return (
    <StyledMixcloudPlayerVolumeControl>
      <label>Volume: {Math.round(state.volume * 100)}%</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={state.volume}
        onChange={(e) => actions.setVolume(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </StyledMixcloudPlayerVolumeControl>
  );
};

export default MixcloudPlayerVolumeControl;
