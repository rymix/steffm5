import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useRef } from "react";

import { MixcloudPlayerControls } from "../Controls";
import { MixcloudPlayerCurrentMixInfo } from "../CurrentMixInfo";
import { MixcloudPlayerMixList } from "../MixList";
import { MixcloudPlayerProgressBar } from "../ProgressBar";
import { MixcloudPlayerVolumeControl } from "../VolumeControl";
import { StyledMixcloudPlayer, StyledMixcloudPlayerWidget } from "./styles";
import { MixcloudPlayerProps } from "./types";

export const MixcloudPlayer: React.FC<MixcloudPlayerProps> = ({
  autoPlay = true,
}) => {
  const { state, actions, iframeRef, widgetUrl } = useMixcloud();
  const initializedRef = useRef(false);

  // Initialize by loading mixes from API on mount
  useEffect(() => {
    if (!initializedRef.current) {
      actions.setAutoPlay(autoPlay);
      actions.loadMixes(); // Load all mixes initially
      initializedRef.current = true;
    }
  }, []); // Empty dependency array - only run on mount

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (state.isLoadingMixes) {
    return <div>Loading mixes...</div>;
  }

  if (state.error) {
    return (
      <div style={{ color: "red" }}>
        Error loading mixes: {state.error}
        <button
          onClick={() => actions.clearFilters()}
          style={{ marginLeft: "10px" }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (state.keys.length === 0) {
    return <div>No mixes found</div>;
  }

  return (
    <StyledMixcloudPlayer>
      {/* Current mix info */}
      <MixcloudPlayerCurrentMixInfo formatTime={formatTime} />

      {/* Mixcloud Widget */}
      {widgetUrl && (
        <StyledMixcloudPlayerWidget>
          <iframe
            key={state.currentKey} // Force re-render when track changes
            ref={iframeRef}
            width="100%"
            height="120"
            src={widgetUrl}
            style={{ border: "none" }}
            allow="autoplay; encrypted-media"
          />
        </StyledMixcloudPlayerWidget>
      )}

      {/* Controls */}
      <MixcloudPlayerControls />

      {/* Progress bar */}
      <MixcloudPlayerProgressBar />

      {/* Volume control */}
      <MixcloudPlayerVolumeControl />

      {/* Track list */}
      <MixcloudPlayerMixList />
    </StyledMixcloudPlayer>
  );
};
