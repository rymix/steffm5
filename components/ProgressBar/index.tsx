import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import { StyledMixcloudPlayerProgressBar } from "./styles";

const MixcloudPlayerProgressBar: React.FC = () => {
  const { state, actions } = useMixcloud();

  if (state.duration <= 0) {
    return null;
  }

  return (
    <StyledMixcloudPlayerProgressBar>
      <label>Progress:</label>
      <input
        type="range"
        min={0}
        max={state.duration}
        value={state.position}
        onChange={(e) => actions.seek(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </StyledMixcloudPlayerProgressBar>
  );
};

export default MixcloudPlayerProgressBar;
