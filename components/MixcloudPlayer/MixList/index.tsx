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

const MixcloudPlayerMixList: React.FC = () => {
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
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {progress.status === "in_progress" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.goToTrack(index, true);
                      }}
                      style={{
                        fontSize: "12px",
                        padding: "2px 6px",
                        backgroundColor: "#ff9800",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                      title="Resume from saved position"
                    >
                      Resume
                    </button>
                  )}
                  {progress.status !== "unplayed" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.startMixOver(key);
                      }}
                      style={{
                        fontSize: "12px",
                        padding: "2px 6px",
                        backgroundColor: "#2196f3",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                      title="Start from beginning"
                    >
                      Start Over
                    </button>
                  )}
                  {index === state.currentIndex && (
                    <span style={{ marginLeft: "4px" }}>
                      {state.isPlaying ? "▶️" : "⏸️"}
                    </span>
                  )}
                </div>
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

export default MixcloudPlayerMixList;
