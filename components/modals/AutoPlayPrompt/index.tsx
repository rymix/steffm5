import { useMixcloud } from "contexts/mixcloud";
import { useModal } from "contexts/modal";
import React from "react";

import {
  StyledAutoPlayPrompt,
  StyledMessage,
  StyledPlayButton,
} from "./styles";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const AutoPlayPrompt: React.FC = () => {
  const { actions } = useMixcloud();
  const modal = useModal();

  const handlePlay = () => {
    actions.play();
    actions.setAutoPlayBlocked(false);
    modal.actions.closeModal();
  };

  return (
    <StyledAutoPlayPrompt>
      <StyledMessage>
        <h2>Playback Paused</h2>
        <p>Tap the button below to continue playing</p>
      </StyledMessage>

      <StyledPlayButton
        onClick={handlePlay}
        title="Continue Playing"
        aria-label="Continue Playing"
      >
        <PlayArrowIcon />
      </StyledPlayButton>
    </StyledAutoPlayPrompt>
  );
};

export default AutoPlayPrompt;
