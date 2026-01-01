import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useMemo, useState } from "react";

import DotMatrix from "components/display/DotMatrix";
import type { TransitionEffect } from "components/display/DotMatrix/types";
import type { MusicDotMatrixProps } from "components/display/MusicDotMatrix/types";
import { useCurrentTrack } from "hooks/useCurrentTrack";

const MusicDotMatrix: React.FC<MusicDotMatrixProps> = ({
  trackName,
  artistName,
  remixArtistName,
  publisher,
  mixName,
  showPlaybackStatus = true,
  cycleInterval = 3000,
  theme = "orange",
  autoTransition = true,
  transitionEffects = ["slideLeft", "slideRight", "slideUp", "slideDown"],
  ...dotMatrixProps
}) => {
  const { state, actions } = useMixcloud();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentEffectIndex, setCurrentEffectIndex] = useState(0);

  // Get current track information
  const currentMix = actions.getCurrentMix();
  const currentTrack = useCurrentTrack(
    currentMix?.tracks,
    state.position,
    state.duration,
    0, // No tolerance for this component
  );

  // Build message array
  const messages = useMemo(() => {
    const msgs: string[] = [];

    // Use provided props or current track data
    const track = currentTrack;
    const finalTrackName = trackName || track?.trackName;
    const finalArtistName = artistName || track?.artistName;
    const finalRemixArtistName = remixArtistName || track?.remixArtistName;
    const finalPublisher = publisher || track?.publisher;
    const finalMixName = mixName || currentMix?.name;

    // Add track info if available
    if (finalTrackName) {
      msgs.push(`TRACK: ${finalTrackName.toUpperCase()}`);
    }

    if (finalArtistName) {
      msgs.push(`ARTIST: ${finalArtistName.toUpperCase()}`);
    }

    if (finalRemixArtistName) {
      msgs.push(`REMIX: ${finalRemixArtistName.toUpperCase()}`);
    }

    if (finalPublisher) {
      msgs.push(`LABEL: ${finalPublisher.toUpperCase()}`);
    }

    if (finalMixName) {
      msgs.push(`MIX: ${finalMixName.toUpperCase()}`);
    }

    // Add playback status
    if (showPlaybackStatus) {
      if (state.isPlaying) {
        msgs.push("♪ PLAYING ♪");
      } else if (state.isLoading) {
        msgs.push("♫ LOADING ♫");
      } else {
        msgs.push("♪ PAUSED ♪");
      }

      // Add time info
      if (state.duration > 0) {
        const formatTime = (seconds: number) => {
          const mins = Math.floor(seconds / 60);
          const secs = Math.floor(seconds % 60);
          return `${mins}:${secs.toString().padStart(2, "0")}`;
        };

        msgs.push(
          `${formatTime(state.position)} / ${formatTime(state.duration)}`,
        );
      }
    }

    // Fallback message
    if (msgs.length === 0) {
      msgs.push("STEF.FM - ADVENTURES IN DECENT MUSIC");
    }

    return msgs;
  }, [
    trackName,
    artistName,
    remixArtistName,
    publisher,
    mixName,
    currentTrack,
    currentMix,
    state.isPlaying,
    state.isLoading,
    state.position,
    state.duration,
    showPlaybackStatus,
  ]);

  // Cycle through messages
  useEffect(() => {
    if (messages.length <= 1 || !autoTransition) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);

      // Also cycle through transition effects
      if (transitionEffects.length > 1) {
        setCurrentEffectIndex((prev) => (prev + 1) % transitionEffects.length);
      }
    }, cycleInterval);

    return () => clearInterval(interval);
  }, [
    messages.length,
    cycleInterval,
    autoTransition,
    transitionEffects.length,
  ]);

  // Reset message index when messages change
  useEffect(() => {
    setCurrentMessageIndex(0);
  }, [messages]);

  // Theme colors
  const getThemeColor = (themeName: string): string => {
    switch (themeName) {
      case "orange":
        return "#ff6b35";
      case "green":
        return "#00ff41";
      case "blue":
        return "#66aaff";
      case "red":
        return "#ff3333";
      default:
        return "#ff6b35";
    }
  };

  const currentMessage = messages[currentMessageIndex] || "";
  const currentEffect: TransitionEffect =
    transitionEffects[currentEffectIndex] || "slideLeft";

  return (
    <DotMatrix
      text={currentMessage}
      color={getThemeColor(theme)}
      transitionEffect={currentEffect}
      transitionDuration={800}
      {...dotMatrixProps}
    />
  );
};

export default MusicDotMatrix;
