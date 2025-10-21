import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledMixcloudPlayerMixList,
  StyledMixcloudPlayerMixListItem,
  StyledMixcloudPlayerMixListItemContent,
  StyledMixcloudPlayerMixListItemInfo,
  StyledMixcloudPlayerMixListProgressBar,
  StyledMixcloudPlayerMixListProgressBarContainer,
  StyledMixcloudPlayerMixListStatusDot,
} from "./styles";

export const MixcloudPlayerMixList: React.FC = () => {
  const { state, actions } = useMixcloud();

  return (
    <StyledMixcloudPlayerMixList>
      <h4>Playlist:</h4>
      <ul>
        {state.keys.map((key, index) => {
          const progress = actions.getMixProgress(key);
          const progressPercentage =
            progress.duration > 0
              ? Math.round((progress.position / progress.duration) * 100)
              : 0;

          return (
            <StyledMixcloudPlayerMixListItem
              key={key}
              $isCurrent={index === state.currentIndex}
              onClick={() => actions.goToTrack(index)}
            >
              <StyledMixcloudPlayerMixListItemContent>
                <StyledMixcloudPlayerMixListItemInfo>
                  <StyledMixcloudPlayerMixListStatusDot
                    $status={progress.status}
                  />
                  <span>
                    <strong>{index + 1}.</strong> {key}
                  </span>
                </StyledMixcloudPlayerMixListItemInfo>
                {index === state.currentIndex && (
                  <span style={{ marginLeft: "10px" }}>
                    {state.isPlaying ? "▶️" : "⏸️"}
                  </span>
                )}
              </StyledMixcloudPlayerMixListItemContent>
              <StyledMixcloudPlayerMixListProgressBarContainer>
                <StyledMixcloudPlayerMixListProgressBar
                  $progress={progressPercentage}
                />
              </StyledMixcloudPlayerMixListProgressBarContainer>
            </StyledMixcloudPlayerMixListItem>
          );
        })}
      </ul>
    </StyledMixcloudPlayerMixList>
  );
};
