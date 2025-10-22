import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledProgressBar,
  StyledProgressBarFill,
  StyledProgressBarLabel,
  StyledProgressBarTrack,
} from "./styles";

const ProgressBar: React.FC = () => {
  const { state, actions } = useMixcloud();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (state.duration <= 0) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const progressPercent = clickX / rect.width;
    const newPosition = progressPercent * state.duration;

    actions.seek(Math.max(0, Math.min(state.duration, newPosition)));
  };

  if (state.duration <= 0) {
    return null;
  }

  const progress = (state.position / state.duration) * 100;

  return (
    <StyledProgressBar>
      <StyledProgressBarLabel>
        Progress: {formatTime(state.position)} / {formatTime(state.duration)}
      </StyledProgressBarLabel>
      <StyledProgressBarTrack onClick={handleProgressClick}>
        <StyledProgressBarFill $progress={progress} />
      </StyledProgressBarTrack>
    </StyledProgressBar>
  );
};

export default ProgressBar;
