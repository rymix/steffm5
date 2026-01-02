import { useMixcloud } from "contexts/mixcloud";
import { useModal } from "contexts/modal";
import React from "react";

import {
  StyledAutoPlayPrompt,
  StyledCurrentTrack,
  StyledMixName,
  StyledPlayButton,
} from "./styles";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const AutoPlayPrompt: React.FC = () => {
  const { actions } = useMixcloud();
  const modal = useModal();
  const currentMix = actions.getCurrentMix();

  const handlePlay = () => {
    actions.play();
    modal.actions.closeModal();
  };

  return (
    <StyledAutoPlayPrompt>
      <StyledCurrentTrack>
        {currentMix && (
          <>
            <StyledMixName>{currentMix.name}</StyledMixName>
          </>
        )}
      </StyledCurrentTrack>

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
