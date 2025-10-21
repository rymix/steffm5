import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledMixcloudPlayerCurrentMixInfo,
  StyledMixcloudPlayerCurrentMixInfoContent,
  StyledMixcloudPlayerCurrentMixInfoCoverArt,
  StyledMixcloudPlayerCurrentMixInfoDetails,
  StyledMixcloudPlayerCurrentMixInfoHeader,
  StyledMixcloudPlayerCurrentMixInfoMeta,
  StyledMixcloudPlayerCurrentMixInfoNotes,
  StyledMixcloudPlayerCurrentMixInfoSubtitle,
  StyledMixcloudPlayerCurrentMixInfoTagBadge,
  StyledMixcloudPlayerCurrentMixInfoTagContainer,
} from "./styles";

const MixcloudPlayerCurrentMixInfo: React.FC = () => {
  const { state, actions } = useMixcloud();
  const currentMix = actions.getCurrentMix();
  const currentProgress = state.currentKey
    ? actions.getMixProgress(state.currentKey)
    : null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentMix) {
    return (
      <StyledMixcloudPlayerCurrentMixInfo>
        <h3>
          Current Mix: {state.currentIndex + 1} of {state.keys.length}
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
  }

  return (
    <StyledMixcloudPlayerCurrentMixInfo>
      <StyledMixcloudPlayerCurrentMixInfoContent>
        <StyledMixcloudPlayerCurrentMixInfoCoverArt>
          <img
            src={currentMix.coverArtSmall}
            alt={`Cover art for ${currentMix.name}`}
            width="80"
            height="80"
          />
        </StyledMixcloudPlayerCurrentMixInfoCoverArt>

        <StyledMixcloudPlayerCurrentMixInfoDetails>
          <StyledMixcloudPlayerCurrentMixInfoHeader>
            <StyledMixcloudPlayerCurrentMixInfoTagBadge category>
              {currentMix.category}
            </StyledMixcloudPlayerCurrentMixInfoTagBadge>
            <h3>{currentMix.name}</h3>
          </StyledMixcloudPlayerCurrentMixInfoHeader>

          <StyledMixcloudPlayerCurrentMixInfoSubtitle>
            Released: {new Date(currentMix.releaseDate).toLocaleDateString()}
          </StyledMixcloudPlayerCurrentMixInfoSubtitle>

          <StyledMixcloudPlayerCurrentMixInfoMeta>
            <span>
              Status:{" "}
              {state.isLoading
                ? "Loading..."
                : state.isPlaying
                  ? "Playing"
                  : "Paused"}
            </span>
            {state.duration > 0 && (
              <span>
                {formatTime(state.position)} / {formatTime(state.duration)}
              </span>
            )}
            {currentProgress && currentProgress.status !== "unplayed" && (
              <span>Progress: {currentProgress.status.replace("_", " ")}</span>
            )}
            <span>Volume: {Math.round(state.volume * 100)}%</span>
            <span>
              Track: {state.currentIndex + 1} of {state.keys.length}
            </span>
          </StyledMixcloudPlayerCurrentMixInfoMeta>

          {currentMix.notes && (
            <StyledMixcloudPlayerCurrentMixInfoNotes>
              {currentMix.notes}
            </StyledMixcloudPlayerCurrentMixInfoNotes>
          )}

          {currentMix.tags && currentMix.tags.length > 0 && (
            <StyledMixcloudPlayerCurrentMixInfoTagContainer>
              {currentMix.tags.map((tag, index) => (
                <StyledMixcloudPlayerCurrentMixInfoTagBadge key={index}>
                  {tag}
                </StyledMixcloudPlayerCurrentMixInfoTagBadge>
              ))}
            </StyledMixcloudPlayerCurrentMixInfoTagContainer>
          )}
        </StyledMixcloudPlayerCurrentMixInfoDetails>
      </StyledMixcloudPlayerCurrentMixInfoContent>
    </StyledMixcloudPlayerCurrentMixInfo>
  );
};

export default MixcloudPlayerCurrentMixInfo;
