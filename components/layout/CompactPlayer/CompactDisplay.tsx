import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useMemo, useRef } from "react";

import { useCurrentTrack } from "hooks/useCurrentTrack";
import { useTrackDisplayName } from "hooks/useTrackDisplayName";

import {
  GlobalFonts,
  StyledDisplay,
  StyledDisplayProgress,
  StyledDisplayText,
  StyledWoodPanel,
} from "./styles";

// Constants
const DISPLAY_WIDTH = 20;
const SCROLL_SPEED = 300;

const CompactDisplay: React.FC = () => {
  const { state, actions } = useMixcloud();

  // Display refs
  const displayTextRef = useRef<HTMLDivElement | null>(null);
  const displayProgressRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const statePositionRef = useRef(state.position);
  const stateDurationRef = useRef(state.duration);

  // Update refs
  useEffect(() => {
    statePositionRef.current = state.position;
    stateDurationRef.current = state.duration;
  }, [state.position, state.duration]);

  // Get current mix and track
  const currentMix = actions.getCurrentMix();
  const currentTrack = useCurrentTrack(
    currentMix?.tracks,
    state.position,
    state.duration,
  );

  // Track name for display
  const trackName = useTrackDisplayName(currentTrack, currentMix?.name);

  const scrollText = useMemo(
    () => (trackName + "!***!").repeat(3),
    [trackName],
  );

  // Direct DOM manipulation for display
  useEffect(() => {
    displayTextRef.current = document.querySelector(
      "[data-compact-display-text]",
    ) as HTMLDivElement;
    displayProgressRef.current = document.querySelector(
      "[data-compact-display-progress]",
    ) as HTMLDivElement;

    if (!displayTextRef.current || !displayProgressRef.current) {
      return;
    }

    let lastUpdateTime = 0;

    const updateDisplay = (timestamp: number) => {
      if (timestamp - lastUpdateTime >= SCROLL_SPEED) {
        const wrapPoint = Math.floor(scrollText.length / 3);
        scrollPositionRef.current = (scrollPositionRef.current + 1) % wrapPoint;
        lastUpdateTime = timestamp;
      }

      const visibleText = scrollText.substring(
        scrollPositionRef.current,
        scrollPositionRef.current + DISPLAY_WIDTH,
      );

      const mixProgress =
        stateDurationRef.current > 0
          ? (statePositionRef.current / stateDurationRef.current) * 100
          : 0;

      const progressChars = Math.floor((mixProgress / 100) * DISPLAY_WIDTH);
      const progressBar =
        "=".repeat(progressChars) + "_".repeat(DISPLAY_WIDTH - progressChars);

      if (displayTextRef.current) {
        displayTextRef.current.textContent = visibleText;
      }
      if (displayProgressRef.current) {
        displayProgressRef.current.textContent = progressBar;
      }

      animationFrameRef.current = requestAnimationFrame(updateDisplay);
    };

    animationFrameRef.current = requestAnimationFrame(updateDisplay);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollText]);

  return (
    <>
      <GlobalFonts />
      <StyledWoodPanel>
        <StyledDisplay>
          <StyledDisplayText data-compact-display-text />
          <StyledDisplayProgress data-compact-display-progress />
        </StyledDisplay>
      </StyledWoodPanel>
    </>
  );
};

export default CompactDisplay;
