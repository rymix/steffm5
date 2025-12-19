import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useMemo, useRef } from "react";

import {
  GlobalFonts,
  StyledButton,
  StyledCompactPlayer,
  StyledControls,
  StyledDisplay,
  StyledDisplayProgress,
  StyledDisplayText,
  StyledPlayButton,
} from "./styles";

// Constants
const DISPLAY_WIDTH = 20;
const SCROLL_SPEED = 300;

const CompactPlayer: React.FC = () => {
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

  const currentTrack = useMemo(() => {
    if (!currentMix?.tracks || state.position <= 0) return null;

    const timeToSeconds = (timeString: string): number => {
      const parts = timeString.split(":");
      if (parts.length === 2) {
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
      } else if (parts.length === 3) {
        return (
          parseInt(parts[0]) * 3600 +
          parseInt(parts[1]) * 60 +
          parseInt(parts[2])
        );
      }
      return 0;
    };

    const sortedTracks = [...currentMix.tracks].sort((a, b) => {
      return timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
    });

    const tolerance = 2;

    for (let i = 0; i < sortedTracks.length; i++) {
      const track = sortedTracks[i];
      const nextTrack =
        i < sortedTracks.length - 1 ? sortedTracks[i + 1] : null;

      const trackStartSeconds = timeToSeconds(track.startTime);
      const nextTrackStartSeconds = nextTrack
        ? timeToSeconds(nextTrack.startTime)
        : state.duration;

      if (
        state.position >= trackStartSeconds - tolerance &&
        state.position < nextTrackStartSeconds - tolerance
      ) {
        return track;
      }
    }

    return null;
  }, [currentMix, state.position, state.duration]);

  // Track name for display
  const trackName = useMemo(() => {
    const parts = [];

    if (currentTrack?.trackName) {
      parts.push(currentTrack.trackName);
    }

    if (currentTrack?.artistName) {
      parts.push(currentTrack.artistName);
    }

    if (currentTrack?.remixArtist) {
      parts.push(currentTrack.remixArtist);
    }

    if (currentMix?.name) {
      parts.push(currentMix.name);
    }

    const text =
      parts.length > 0 ? parts.join(" * ") : "STEF.FM MIXCLOUD PLAYER";

    return text.toUpperCase().replace(/'/g, "").replace(/ /g, "!");
  }, [
    currentTrack?.trackName,
    currentTrack?.artistName,
    currentTrack?.remixArtist,
    currentMix?.name,
  ]);

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
      <StyledCompactPlayer>
        <StyledDisplay>
          <StyledDisplayText data-compact-display-text />
          <StyledDisplayProgress data-compact-display-progress />
        </StyledDisplay>

        <StyledControls>
          <StyledButton
            onClick={actions.previous}
            disabled={state.keys.length <= 1}
          >
            ⏮
          </StyledButton>

          <StyledPlayButton onClick={actions.toggle} disabled={state.isLoading}>
            {state.isPlaying ? "⏸" : "▶"}
          </StyledPlayButton>

          <StyledButton
            onClick={actions.next}
            disabled={state.keys.length <= 1}
          >
            ⏭
          </StyledButton>
        </StyledControls>
      </StyledCompactPlayer>
    </>
  );
};

export default CompactPlayer;
