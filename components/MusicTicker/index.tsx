import { useMixcloud } from "contexts/mixcloud";
import React, { useMemo } from "react";

import { useCurrentTrack } from "hooks/useCurrentTrack";

import Ticker from "../Ticker";
import type { MusicTickerProps } from "./types";

const MusicTicker: React.FC<MusicTickerProps> = ({
  trackName,
  artistName,
  remixArtistName,
  publisher,
  mixName,
  theme = "green",
  speed = 6,
  separator = " ••• ",
  ...tickerProps
}) => {
  const { state, actions } = useMixcloud();

  // Get current track information if not provided as props
  const currentMix = actions.getCurrentMix();
  const currentTrack = useCurrentTrack(
    currentMix?.tracks,
    state.position,
    state.duration,
    0, // No tolerance for this component
  );

  // Build the message array with available information
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
      msgs.push(`♪ TRACK: ${finalTrackName.toUpperCase()}`);
    }

    if (finalArtistName) {
      msgs.push(`♫ ARTIST: ${finalArtistName.toUpperCase()}`);
    }

    if (finalRemixArtistName) {
      msgs.push(`♪ REMIX: ${finalRemixArtistName.toUpperCase()}`);
    }

    if (finalPublisher) {
      msgs.push(`♫ LABEL: ${finalPublisher.toUpperCase()}`);
    }

    if (finalMixName) {
      msgs.push(`♪ MIX: ${finalMixName.toUpperCase()}`);
    }

    // Add status information
    if (state.isPlaying) {
      msgs.push("♪ NOW PLAYING ♪");
    } else if (state.isLoading) {
      msgs.push("♫ LOADING ♫");
    } else {
      msgs.push("♪ PAUSED ♪");
    }

    // Add position info if available
    if (state.duration > 0) {
      const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
      };

      msgs.push(
        `♫ TIME: ${formatTime(state.position)} / ${formatTime(state.duration)}`,
      );
    }

    // Fallback message if no track info
    if (
      msgs.length === 0 ||
      msgs.every(
        (msg) =>
          msg.includes("PLAYING") ||
          msg.includes("LOADING") ||
          msg.includes("PAUSED") ||
          msg.includes("TIME"),
      )
    ) {
      msgs.unshift("♪ STEF.FM - ADVENTURES IN DECENT MUSIC ♪");
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
  ]);

  return (
    <Ticker
      messages={messages}
      speed={speed}
      separator={separator}
      className={
        theme === "amber"
          ? "ticker-amber"
          : theme === "blue"
            ? "ticker-blue"
            : undefined
      }
      {...tickerProps}
    />
  );
};

export default MusicTicker;
