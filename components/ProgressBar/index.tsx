import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledMixcloudPlayerProgressBar,
  StyledMixcloudPlayerProgressBarFill,
  StyledMixcloudPlayerProgressBarLabel,
  StyledMixcloudPlayerProgressBarTrack,
} from "./styles";

const MixcloudPlayerProgressBar: React.FC = () => {
  const { state } = useMixcloud();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (state.duration <= 0) {
    return null;
  }

  const progress = (state.position / state.duration) * 100;

  return (
    <StyledMixcloudPlayerProgressBar>
      <StyledMixcloudPlayerProgressBarLabel>
        Progress: {formatTime(state.position)} / {formatTime(state.duration)}
      </StyledMixcloudPlayerProgressBarLabel>
      <StyledMixcloudPlayerProgressBarTrack>
        <StyledMixcloudPlayerProgressBarFill $progress={progress} />
      </StyledMixcloudPlayerProgressBarTrack>
    </StyledMixcloudPlayerProgressBar>
  );
};

export default MixcloudPlayerProgressBar;
