import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledCurrentMixInfo,
  StyledCurrentMixInfoContent,
  StyledCurrentMixInfoCoverArt,
  StyledCurrentMixInfoDetails,
  StyledCurrentMixInfoHeader,
  StyledCurrentMixInfoNotes,
  StyledCurrentMixInfoSubtitle,
  StyledCurrentMixInfoTagBadge,
  StyledCurrentMixInfoTagContainer,
} from "./styles";

const CurrentMixInfo: React.FC = () => {
  const { state, actions } = useMixcloud();
  const currentMix = actions.getCurrentMix();
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentMix) {
    return (
      <StyledCurrentMixInfo>
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
      </StyledCurrentMixInfo>
    );
  }

  return (
    <StyledCurrentMixInfo>
      <StyledCurrentMixInfoContent>
        <StyledCurrentMixInfoCoverArt>
          <img
            src={currentMix.coverArtSmall}
            alt={`Cover art for ${currentMix.name}`}
            width="80"
            height="80"
          />
        </StyledCurrentMixInfoCoverArt>

        <StyledCurrentMixInfoDetails>
          <StyledCurrentMixInfoHeader>
            <StyledCurrentMixInfoTagBadge category>
              {currentMix.category}
            </StyledCurrentMixInfoTagBadge>
            <h3>{currentMix.name}</h3>
          </StyledCurrentMixInfoHeader>

          <StyledCurrentMixInfoSubtitle>
            Released:{" "}
            {new Date(currentMix.releaseDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </StyledCurrentMixInfoSubtitle>

          <StyledCurrentMixInfoSubtitle>
            Duration: {formatTime(state.duration)}
          </StyledCurrentMixInfoSubtitle>

          {currentMix.notes && (
            <StyledCurrentMixInfoNotes>
              {currentMix.notes}
            </StyledCurrentMixInfoNotes>
          )}

          {currentMix.tags && currentMix.tags.length > 0 && (
            <StyledCurrentMixInfoTagContainer>
              {currentMix.tags.map((tag, index) => (
                <StyledCurrentMixInfoTagBadge key={index}>
                  {tag}
                </StyledCurrentMixInfoTagBadge>
              ))}
            </StyledCurrentMixInfoTagContainer>
          )}
        </StyledCurrentMixInfoDetails>
      </StyledCurrentMixInfoContent>
    </StyledCurrentMixInfo>
  );
};

export default CurrentMixInfo;
