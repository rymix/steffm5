import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import { StyledMixcloudPlayerCurrentMixInfo } from "./styles";
import type { MixcloudPlayerCurrentMixInfoProps } from "./types";

export const MixcloudPlayerCurrentMixInfo: React.FC<
  MixcloudPlayerCurrentMixInfoProps
> = ({ formatTime }) => {
  const { state } = useMixcloud();

  return (
    <StyledMixcloudPlayerCurrentMixInfo>
      <h3>
        Current Track: {state.currentIndex + 1} of {state.keys.length}
      </h3>
      <p>Key: {state.currentKey}</p>
      <p>
        Status:{" "}
        {state.isLoading
          ? "Loading..."
          : state.isPlaying
            ? "Playing"
            : "Paused"}
      </p>
      {state.duration > 0 && (
        <p>
          Time: {formatTime(state.position)} / {formatTime(state.duration)}
        </p>
      )}
      <p>Volume: {Math.round(state.volume * 100)}%</p>
    </StyledMixcloudPlayerCurrentMixInfo>
  );
};
