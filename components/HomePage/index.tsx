import React, { useState } from "react";

import BurgerMenu from "@/components/BurgerMenu";
import Controls from "@/components/Controls";
import CurrentMixInfo from "@/components/CurrentMixInfo";
import FilterStatusWidget from "@/components/FilterStatusWidget";
import MiniPlayer from "@/components/MiniPlayer";
import ProgressBar from "@/components/ProgressBar";
import TrackList from "@/components/TrackList";
import VolumeControl from "@/components/VolumeControl";
import MixcloudPlayerWrapper from "components/MixcloudPlayer/MixcloudPlayerWrapper";

import { StyledHeaderRow, StyledMiniPlayerToggle } from "./styles";

const HomePage: React.FC = () => {
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  return (
    <>
      <BurgerMenu />
      <div className="container">
        <h1>Stef.FM</h1>
        <StyledHeaderRow>
          <FilterStatusWidget />
          <StyledMiniPlayerToggle
            onClick={() => setShowMiniPlayer(!showMiniPlayer)}
            $isActive={showMiniPlayer}
            title="Toggle Mini Player"
          >
            {showMiniPlayer ? "🎵 Hide Mini Player" : "🎵 Show Mini Player"}
          </StyledMiniPlayerToggle>
        </StyledHeaderRow>
        <MixcloudPlayerWrapper autoPlay={true} />
        <Controls />
        <ProgressBar />
        <VolumeControl />
        <CurrentMixInfo />
        <TrackList />
      </div>

      <MiniPlayer
        isVisible={showMiniPlayer}
        onToggleVisibility={() => setShowMiniPlayer(false)}
      />
    </>
  );
};

export default HomePage;
