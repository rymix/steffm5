import { useMixcloud } from "contexts/mixcloud";
import React, { useCallback, useEffect, useRef, useState } from "react";

import BurgerMenu from "@/components/BurgerMenu";
import Controls from "@/components/Controls";
import CurrentMixInfo from "@/components/CurrentMixInfo";
import FilterStatusWidget from "@/components/FilterStatusWidget";
import MiniPlayer from "@/components/MiniPlayer";
import ProgressBar from "@/components/ProgressBar";
import TrackList from "@/components/TrackList";
import VolumeControl from "@/components/VolumeControl";
import Wallpaper from "@/components/Wallpaper";
import MixcloudPlayerWrapper from "components/MixcloudPlayer/MixcloudPlayerWrapper";
import { useWallpaperManager } from "hooks/useWallpaperManager";

import { StyledMiniPlayerToggle } from "./styles";

const HomePage: React.FC = () => {
  const { state, actions } = useMixcloud();
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const { wallpaperState, changeWallpaper } = useWallpaperManager();

  // Track previous values to detect changes
  const prevCurrentKey = useRef<string | null>(null);
  const prevCurrentTrack = useRef<string | null>(null);
  const hasMadeInitialMixLoad = useRef(false);

  // Helper function to get current playing track (same logic as TrackList)
  const getCurrentPlayingTrack = useCallback(() => {
    const currentMix = actions.getCurrentMix();
    if (!currentMix?.tracks) return null;

    // Convert MM:SS or H:MM:SS format to seconds
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

    // Sort tracks by start time
    const sortedTracks = [...currentMix.tracks].sort((a, b) => {
      return timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
    });

    const currentPosition = state.position;
    const tolerance = 2; // 2 seconds tolerance

    // Find the currently playing track
    for (let trackIndex = 0; trackIndex < sortedTracks.length; trackIndex++) {
      const track = sortedTracks[trackIndex];
      const trackStartSeconds = timeToSeconds(track.startTime);

      const nextTrack =
        trackIndex < sortedTracks.length - 1
          ? sortedTracks[trackIndex + 1]
          : null;
      const nextTrackStartSeconds = nextTrack
        ? timeToSeconds(nextTrack.startTime)
        : state.duration;

      if (
        currentPosition >= trackStartSeconds - tolerance &&
        currentPosition < nextTrackStartSeconds - tolerance
      ) {
        return `${track.sectionNumber}-${track.trackName}-${track.artistName}`;
      }
    }

    return null;
  }, [state.position, state.duration, actions]);

  // Detect mix and track changes
  useEffect(() => {
    const currentKey = state.currentKey;
    const currentTrack = getCurrentPlayingTrack();

    console.log(
      `🎵 Track change detection - Key: ${currentKey}, Track: ${currentTrack}`,
    );
    console.log(
      `🎵 Previous - Key: ${prevCurrentKey.current}, Track: ${prevCurrentTrack.current}`,
    );

    // Skip if no mix is loaded
    if (!currentKey) {
      console.log("🎵 No mix loaded, skipping");
      return;
    }

    // Mark that we've had our first mix load, but don't skip wallpaper change after this
    if (!hasMadeInitialMixLoad.current) {
      console.log(
        "🎵 First mix load detected - allowing wallpaper changes from now on",
      );
      hasMadeInitialMixLoad.current = true;
      prevCurrentKey.current = currentKey;
      prevCurrentTrack.current = currentTrack;
      return;
    }

    // Detect mix change
    const mixChanged = prevCurrentKey.current !== currentKey;

    // Detect track change within the same mix
    const trackChanged =
      prevCurrentKey.current === currentKey &&
      prevCurrentTrack.current !== currentTrack &&
      currentTrack !== null;

    console.log(
      `🎵 Mix changed: ${mixChanged}, Track changed: ${trackChanged}`,
    );

    // Change wallpaper on either mix change or track change
    if (mixChanged || trackChanged) {
      console.log("🎵 Triggering wallpaper change");
      changeWallpaper();
    }

    // Update previous values
    prevCurrentKey.current = currentKey;
    prevCurrentTrack.current = currentTrack;
  }, [
    state.currentKey,
    state.position,
    state.duration,
    getCurrentPlayingTrack,
    changeWallpaper,
  ]);

  return (
    <>
      <Wallpaper
        wallpaperUrl={wallpaperState.currentWallpaper}
        tileType={wallpaperState.tileType}
        isLoading={wallpaperState.isLoading}
      />
      <BurgerMenu />
      <div className="container">
        <h1>Stef.FM</h1>
        <FilterStatusWidget />
        <StyledMiniPlayerToggle
          onClick={() => setShowMiniPlayer(!showMiniPlayer)}
          $isActive={showMiniPlayer}
          title="Toggle Mini Player"
        >
          {showMiniPlayer ? "🎵 Hide Mini Player" : "🎵 Show Mini Player"}
        </StyledMiniPlayerToggle>
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
