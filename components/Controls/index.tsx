import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import { StyledMixcloudPlayerControls } from "./styles";

const MixcloudPlayerControls: React.FC = () => {
  const { state, actions } = useMixcloud();

  return (
    <StyledMixcloudPlayerControls>
      <button onClick={actions.previous} disabled={state.keys.length <= 1}>
        Previous
      </button>
      <button onClick={actions.toggle} disabled={state.isLoading}>
        {state.isPlaying ? "Pause" : "Play"}
      </button>
      <button onClick={actions.next} disabled={state.keys.length <= 1}>
        Next
      </button>
    </StyledMixcloudPlayerControls>
  );
};

export default MixcloudPlayerControls;
