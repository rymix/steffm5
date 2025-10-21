import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledMixcloudPlayerControlButton,
  StyledMixcloudPlayerControls,
  StyledMixcloudPlayerShareMessage,
} from "./styles";

const MixcloudPlayerControls: React.FC = () => {
  const { state, actions } = useMixcloud();

  return (
    <>
      <StyledMixcloudPlayerControls>
        <StyledMixcloudPlayerControlButton
          onClick={actions.previous}
          disabled={state.keys.length <= 1}
          $variant="secondary"
        >
          Previous
        </StyledMixcloudPlayerControlButton>
        <StyledMixcloudPlayerControlButton
          onClick={actions.toggle}
          disabled={state.isLoading}
          $variant="primary"
        >
          {state.isPlaying ? "Pause" : "Play"}
        </StyledMixcloudPlayerControlButton>
        <StyledMixcloudPlayerControlButton
          onClick={actions.next}
          disabled={state.keys.length <= 1}
          $variant="secondary"
        >
          Next
        </StyledMixcloudPlayerControlButton>
        <StyledMixcloudPlayerControlButton
          onClick={actions.shareCurrentMix}
          disabled={!state.currentKey}
          title="Copy share link to clipboard"
          $variant="share"
        >
          Share
        </StyledMixcloudPlayerControlButton>
      </StyledMixcloudPlayerControls>

      {state.shareMessage && (
        <StyledMixcloudPlayerShareMessage
          $isError={state.shareMessage.includes("Failed")}
        >
          {state.shareMessage}
        </StyledMixcloudPlayerShareMessage>
      )}
    </>
  );
};

export default MixcloudPlayerControls;
