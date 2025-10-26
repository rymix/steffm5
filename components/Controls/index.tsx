import { useMixcloud } from "contexts/mixcloud";
import { useModal } from "contexts/modal";
import React from "react";

import HelloWorldModal from "components/HelloWorldModal";

import {
  StyledControlButton,
  StyledControls,
  StyledShareMessage,
} from "./styles";

const Controls: React.FC = () => {
  const { state, actions } = useMixcloud();
  const modal = useModal();

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
          onClick={actions.toggleMute}
          title={`${state.volume === 0 ? "Unmute" : "Mute"} (Volume: ${Math.round(state.volume * 100)}%)`}
          $variant={state.volume === 0 ? "primary" : "secondary"}
        >
          {state.volume === 0 ? "Unmute" : "Mute"}
        </StyledControlButton>
        <StyledControlButton
          onClick={() =>
            modal.actions.openModal({
              id: "hello-world",
              title: "Hello World Demo",
              component: <HelloWorldModal />,
              autoCloseTimeout: 10000, // Auto-close after 10 seconds
            })
          }
          title="Open Hello World modal demo (auto-closes in 10s)"
          $variant="secondary"
        >
          Hello World
        </StyledControlButton>
        <StyledControlButton
          onClick={actions.shareCurrentMix}
          disabled={!state.currentKey}
          title="Copy share link to clipboard"
          $variant="share"
        >
          Share
        </StyledControlButton>
      </StyledControls>

      {state.shareMessage && (
        <StyledShareMessage $isError={state.shareMessage.includes("Failed")}>
          {state.shareMessage}
        </StyledShareMessage>
      )}
    </>
  );
};

export default Controls;
