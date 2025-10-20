import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledMixcloudPlayerMixList,
  StyledMixcloudPlayerMixListItem,
} from "./styles";

export const MixcloudPlayerMixList: React.FC = () => {
  const { state, actions } = useMixcloud();

  return (
    <StyledMixcloudPlayerMixList>
      <h4>Playlist:</h4>
      <ul>
        {state.keys.map((key, index) => (
          <StyledMixcloudPlayerMixListItem
            key={key}
            $isCurrent={index === state.currentIndex}
            onClick={() => actions.goToTrack(index)}
          >
            <strong>{index + 1}.</strong> {key}
            {index === state.currentIndex && (
              <span style={{ marginLeft: "10px" }}>
                {state.isPlaying ? "▶️" : "⏸️"}
              </span>
            )}
          </StyledMixcloudPlayerMixListItem>
        ))}
      </ul>
    </StyledMixcloudPlayerMixList>
  );
};
