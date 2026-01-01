import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useRef } from "react";

import LoadingMessage from "components/shared/LoadingMessage";

import {
  StyledErrorMessage,
  StyledMixcloudPlayer,
  StyledMixcloudPlayerWidget,
  StyledPlayerIframe,
  StyledRetryButton,
} from "./styles";
import { MixcloudPlayerProps } from "./types";

const MixcloudPlayer: React.FC<MixcloudPlayerProps> = ({ autoPlay = true }) => {
  const { state, actions, iframeRef, widgetUrl } = useMixcloud();
  const initializedRef = useRef(false);
  const autoPlayTriggeredRef = useRef(false);

  // Initialize by loading all mixes with random starting point (client-side only)
  useEffect(() => {
    if (!initializedRef.current) {
      actions.setAutoPlay(autoPlay);

      // Check for shared mix in URL query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const sharedMixKey = urlParams.get("mix");

      if (sharedMixKey) {
        // Load specific shared mix
        actions.loadSpecificMix(decodeURIComponent(sharedMixKey));
      } else {
        // Single API call approach: Load all mixes and start with random one
        // This avoids widget reinitialization issues
        actions.loadMixesWithRandomStart();
      }

      initializedRef.current = true;
    }
  }, []); // Empty dependency array - only run on mount

  // Auto-start playback when widget is ready and autoPlay is enabled (only once)
  useEffect(() => {
    if (
      autoPlay &&
      !state.isLoadingMixes &&
      state.currentKey &&
      !state.isPlaying &&
      !autoPlayTriggeredRef.current
    ) {
      // Small delay to ensure widget is fully loaded
      const timer = setTimeout(() => {
        actions.play();
        autoPlayTriggeredRef.current = true; // Prevent re-triggering
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [
    autoPlay,
    state.isLoadingMixes,
    state.currentKey,
    state.isPlaying,
    actions,
  ]);

  if (state.isLoadingMixes) {
    return <LoadingMessage message="Loading mixes..." fullScreen />;
  }

  if (state.error) {
    return (
      <StyledErrorMessage>
        Error loading mixes: {state.error}
        <StyledRetryButton onClick={() => actions.clearFilters()}>
          Retry
        </StyledRetryButton>
      </StyledErrorMessage>
    );
  }

  if (state.keys.length === 0) {
    return <div>No mixes found</div>;
  }

  return (
    <StyledMixcloudPlayer>
      {/* Mixcloud Widget */}
      {widgetUrl && (
        <StyledMixcloudPlayerWidget>
          <StyledPlayerIframe
            key={state.currentKey} // Force re-render when track changes
            ref={iframeRef}
            width="100%"
            height="120"
            src={widgetUrl}
            allow="autoplay; encrypted-media"
          />
        </StyledMixcloudPlayerWidget>
      )}
    </StyledMixcloudPlayer>
  );
};

export default MixcloudPlayer;
