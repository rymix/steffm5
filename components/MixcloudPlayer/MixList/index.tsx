import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledMixList,
  StyledMixListItem,
  StyledMixListItemContent,
  StyledMixListItemInfo,
  StyledMixListProgressBar,
  StyledMixListProgressBarContainer,
  StyledMixListStatusDot,
} from "./styles";

const MixcloudPlayerMixList: React.FC = () => {
  const { state, actions } = useMixcloud();

  return (
    <StyledMixList>
      <h4>Playlist:</h4>
      <ul>
        {state.keys.map((key, index) => {
          const progress = actions.getMixProgress(key);
          const progressPercentage =
            progress.duration > 0
              ? Math.round((progress.position / progress.duration) * 100)
              : 0;

          return (
            <StyledMixListItem
              key={key}
              $isCurrent={index === state.currentIndex}
              onClick={() => actions.goToTrack(index)}
            >
              <StyledMixListItemContent>
                <StyledMixListItemInfo>
                  <StyledMixListStatusDot $status={progress.status} />
                  <span>
                    <strong>{index + 1}.</strong> {key}
                  </span>
                </StyledMixListItemInfo>
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
              </StyledMixListItemContent>
              <StyledMixListProgressBarContainer>
                <StyledMixListProgressBar $progress={progressPercentage} />
              </StyledMixListProgressBarContainer>
            </StyledMixListItem>
          );
        })}
      </ul>
    </StyledMixList>
  );
};

export default MixcloudPlayerMixList;
