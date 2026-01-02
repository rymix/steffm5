import { useMixcloud } from "contexts/mixcloud";
import { useModal } from "contexts/modal";
import React, { useEffect, useRef } from "react";

import AutoPlayPrompt from "components/modals/AutoPlayPrompt";
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
  const {
    state,
    actions,
    iframeRef,
    widgetUrl,
    autoPlay: autoPlayEnabled,
  } = useMixcloud();
  const modal = useModal();
  const initializedRef = useRef(false);
  const autoPlayTriggeredRef = useRef(false);
  const currentKeyRef = useRef<string | null>(null);
  const hasPlayedOnceRef = useRef(false); // Track if we've had successful playback
  const promptShownForKeysRef = useRef<Set<string>>(new Set()); // Track which mixes we've shown prompt for

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

  // Track when playback starts (to know we're past initial load)
  useEffect(() => {
    if (state.isPlaying) {
      hasPlayedOnceRef.current = true;
    }
  }, [state.isPlaying]);

  // Auto-play detection: Detect when a new mix loads but doesn't auto-play
  useEffect(() => {
    // Only check if:
    // 1. AutoPlay is enabled
    // 2. Mix has loaded (not loading)
    // 3. Current key has changed (new mix)
    // 4. Not currently playing
    // 5. We've had successful playback before (not initial load)
    // 6. Haven't already shown prompt for this mix
    if (
      autoPlayEnabled &&
      !state.isLoadingMixes &&
      state.currentKey &&
      currentKeyRef.current !== state.currentKey &&
      !state.isPlaying &&
      hasPlayedOnceRef.current && // Only after initial playback
      !promptShownForKeysRef.current.has(state.currentKey) // Only once per mix
    ) {
      // Wait 2 seconds to see if playback starts automatically
      const timer = setTimeout(() => {
        // If still not playing after 2 seconds, auto-play is blocked
        if (!state.isPlaying && state.currentKey) {
          actions.setAutoPlayBlocked(true);
          // Mark that we've shown the prompt for this mix
          promptShownForKeysRef.current.add(state.currentKey);
        }
      }, 2000);

      // Update the ref to track this mix
      currentKeyRef.current = state.currentKey;

      return () => clearTimeout(timer);
    }

    // Update ref when key changes
    if (state.currentKey !== currentKeyRef.current) {
      currentKeyRef.current = state.currentKey;
    }

    // Clear blocked state when playback starts
    if (state.isPlaying && state.autoPlayBlocked) {
      actions.setAutoPlayBlocked(false);
    }
  }, [
    autoPlayEnabled,
    state.isLoadingMixes,
    state.currentKey,
    state.isPlaying,
    state.autoPlayBlocked,
    actions,
  ]);

  // Open AutoPlayPrompt modal when auto-play is blocked
  useEffect(() => {
    if (state.autoPlayBlocked && !modal.state.isOpen) {
      modal.actions.openModal({
        id: "auto-play-prompt",
        title: "Tap to Continue Playing",
        component: <AutoPlayPrompt />,
      });
    }
  }, [state.autoPlayBlocked, modal.state.isOpen, modal.actions]);

  // Clear autoPlayBlocked when modal closes (so it doesn't reopen)
  useEffect(() => {
    if (!modal.state.isOpen && state.autoPlayBlocked) {
      actions.setAutoPlayBlocked(false);
    }
  }, [modal.state.isOpen, state.autoPlayBlocked, actions]);

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
