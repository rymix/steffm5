import { useMixcloud } from "contexts/mixcloud";
import React, { useRef, useState } from "react";

import {
  StyledControlButton,
  StyledControls,
  StyledShareTooltip,
} from "./styles";

const Controls: React.FC = () => {
  const { state, actions } = useMixcloud();
  const [showTooltip, setShowTooltip] = useState(false);
  const shareButtonRef = useRef<HTMLButtonElement>(null);

  const handleShare = () => {
    actions.shareCurrentMix();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <>
      <StyledControls>
        <StyledControlButton
          onClick={actions.previous}
          disabled={state.keys.length <= 1}
          $variant="secondary"
        >
          Previous
        </StyledControlButton>
        <StyledControlButton
          onClick={actions.toggle}
          disabled={state.isLoading}
          $variant="primary"
        >
          {state.isPlaying ? "Pause" : "Play"}
        </StyledControlButton>
        <StyledControlButton
          onClick={actions.next}
          disabled={state.keys.length <= 1}
          $variant="secondary"
        >
          Next
        </StyledControlButton>
        <StyledControlButton
          onClick={actions.playRandomFromCurrentList}
          disabled={state.keys.length === 0}
          title="Play random mix from current filtered list"
          $variant="secondary"
        >
          Random
        </StyledControlButton>
        <StyledControlButton
          onClick={actions.toggleShuffle}
          title={`Shuffle mode: ${state.shuffleMode ? "ON" : "OFF"}`}
          $variant={state.shuffleMode ? "primary" : "secondary"}
        >
          Shuffle: {state.shuffleMode ? "ON" : "OFF"}
        </StyledControlButton>
        <StyledControlButton
          ref={shareButtonRef}
          onClick={handleShare}
          disabled={!state.currentKey}
          title="Copy share link to clipboard"
          $variant="share"
        >
          Share
          <StyledShareTooltip $show={showTooltip}>
            Share URL copied to clipboard!
          </StyledShareTooltip>
        </StyledControlButton>
      </StyledControls>
    </>
  );
};

export default Controls;
