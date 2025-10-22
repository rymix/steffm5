import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useMemo, useState } from "react";

import DotMatrix from "../DotMatrix";
import type { TransitionEffect } from "../DotMatrix/types";
import type { MusicDotMatrixProps } from "./types";

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

    for (let i = 0; i < sortedTracks.length; i++) {
      const track = sortedTracks[i];
      const nextTrack =
        i < sortedTracks.length - 1 ? sortedTracks[i + 1] : null;

      const trackStartSeconds = timeToSeconds(track.startTime);
      const nextTrackStartSeconds = nextTrack
        ? timeToSeconds(nextTrack.startTime)
        : state.duration;

      if (
        state.position >= trackStartSeconds &&
        state.position < nextTrackStartSeconds
      ) {
        return track;
      }
    }

    return null;
  }, [currentMix, state.position, state.duration]);

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
