import { useMixcloud } from "contexts/mixcloud";
import React, { useCallback, useEffect, useRef } from "react";

import BurgerMenu from "@/components/BurgerMenu";
import CompactPlayer from "@/components/CompactPlayer";
import DisplayDevice from "@/components/DisplayDevice";
import Wallpaper from "@/components/Wallpaper";
import {
  StyledTrackArtist,
  StyledTrackHeader,
  StyledTrackItem,
  StyledTrackList,
  StyledTrackName,
  StyledTrackNumber,
  StyledTrackRemix,
  StyledTrackTime,
} from "components/DisplayDevice/styles";
import MainPlayer from "components/MainPlayer";
import MixcloudPlayerWrapper from "components/MixcloudPlayer/MixcloudPlayerWrapper";
import { useWallpaperManager } from "hooks/useWallpaperManager";

import {
  StyledDevicesContainer,
  StyledMobileContent,
  StyledMobileLayout,
  StyledMobileMixCard,
  StyledMobileMixImage,
  StyledMobileMixInfo,
  StyledMobileMixName,
  StyledMobilePlayerContainer,
  StyledMobileTrackListHeader,
  StyledNoMix,
  StyledPlayerPage,
} from "./styles";

const HomePage: React.FC = () => {
  const { state, actions } = useMixcloud();
  const { wallpaperState, changeWallpaper } = useWallpaperManager();

  // Track previous values to detect changes
  const prevCurrentKey = useRef<string | null>(null);
  const prevCurrentTrack = useRef<string | null>(null);
  const hasMadeInitialMixLoad = useRef(false);

  // Helper function to get current playing track
  const getCurrentPlayingTrack = useCallback(() => {
    const currentMix = actions.getCurrentMix();
    if (!currentMix?.tracks) return null;

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

    const currentPosition = state.position;
    const tolerance = 2;

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

  // Helper to convert time string to seconds
  const timeToSeconds = (timeString: string): number => {
    const parts = timeString.split(":");
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 3) {
      return (
        parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
      );
    }
    return 0;
  };

  // Get current mix
  const currentMix = actions.getCurrentMix();

  // Get sorted tracks
  const sortedTracks = currentMix?.tracks
    ? [...currentMix.tracks].sort(
        (a, b) => timeToSeconds(a.startTime) - timeToSeconds(b.startTime),
      )
    : [];

  // Determine currently playing track
  const currentTrackIndex = (() => {
    if (!sortedTracks.length || state.position <= 0) return -1;

    const tolerance = 2;
    for (let i = 0; i < sortedTracks.length; i++) {
      const track = sortedTracks[i];
      const trackStartSeconds = timeToSeconds(track.startTime);
      const nextTrack =
        i < sortedTracks.length - 1 ? sortedTracks[i + 1] : null;
      const nextTrackStartSeconds = nextTrack
        ? timeToSeconds(nextTrack.startTime)
        : state.duration;

      if (
        state.position >= trackStartSeconds - tolerance &&
        state.position < nextTrackStartSeconds - tolerance
      ) {
        return i;
      }
    }
    return -1;
  })();

  // Detect mix and track changes for wallpaper changes
  useEffect(() => {
    const currentKey = state.currentKey;
    const currentTrack = getCurrentPlayingTrack();

    if (!currentKey) {
      return;
    }

    if (!hasMadeInitialMixLoad.current) {
      console.log(
        "🎵 First mix load detected - allowing wallpaper changes from now on",
      );
      hasMadeInitialMixLoad.current = true;
      prevCurrentKey.current = currentKey;
      prevCurrentTrack.current = currentTrack;
      return;
    }

    const mixChanged = currentKey !== prevCurrentKey.current;
    const trackChanged = currentTrack !== prevCurrentTrack.current;

    console.log(
      `🎵 Mix changed: ${mixChanged}, Track changed: ${trackChanged}`,
    );

    if (trackChanged || mixChanged) {
      console.log("🎵 Track or mix changed - triggering wallpaper change");
      changeWallpaper();
    }

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
      <DisplayDevice />
      <MixcloudPlayerWrapper autoPlay={true} />

      <StyledPlayerPage>
        {/* Desktop Layout */}
        <StyledDevicesContainer>
          <MainPlayer />
        </StyledDevicesContainer>

        {/* Mobile Layout */}
        <StyledMobileLayout>
          <StyledMobilePlayerContainer>
            <CompactPlayer />
          </StyledMobilePlayerContainer>

          <StyledMobileContent>
            {currentMix ? (
              <>
                <StyledMobileMixCard>
                  {currentMix.pictures?.large && (
                    <StyledMobileMixImage
                      src={currentMix.pictures.large}
                      alt={currentMix.name}
                    />
                  )}

                  <StyledMobileMixName>{currentMix.name}</StyledMobileMixName>

                  {currentMix.user?.name && (
                    <StyledMobileMixInfo>
                      <strong>DJ:</strong> {currentMix.user.name}
                    </StyledMobileMixInfo>
                  )}

                  {currentMix.created_time && (
                    <StyledMobileMixInfo>
                      <strong>Date:</strong>{" "}
                      {new Date(currentMix.created_time).toLocaleDateString()}
                    </StyledMobileMixInfo>
                  )}

                  {currentMix.audio_length && (
                    <StyledMobileMixInfo>
                      <strong>Duration:</strong>{" "}
                      {Math.floor(currentMix.audio_length / 60)} minutes
                    </StyledMobileMixInfo>
                  )}

                  {currentMix.play_count !== undefined && (
                    <StyledMobileMixInfo>
                      <strong>Plays:</strong>{" "}
                      {currentMix.play_count.toLocaleString()}
                    </StyledMobileMixInfo>
                  )}

                  {currentMix.tags && currentMix.tags.length > 0 && (
                    <StyledMobileMixInfo>
                      <strong>Tags:</strong> {currentMix.tags.join(", ")}
                    </StyledMobileMixInfo>
                  )}
                </StyledMobileMixCard>

                {sortedTracks.length > 0 && (
                  <>
                    <StyledMobileTrackListHeader>
                      Track List ({sortedTracks.length})
                    </StyledMobileTrackListHeader>
                    <StyledTrackList>
                      {sortedTracks.map((track, index) => {
                        const isPlaying = index === currentTrackIndex;
                        return (
                          <StyledTrackItem key={index} $isPlaying={isPlaying}>
                            <StyledTrackHeader>
                              <StyledTrackNumber $isPlaying={isPlaying}>
                                {track.sectionNumber || index + 1}
                              </StyledTrackNumber>
                              <StyledTrackTime $isPlaying={isPlaying}>
                                {track.startTime}
                              </StyledTrackTime>
                            </StyledTrackHeader>
                            {track.trackName && (
                              <StyledTrackName $isPlaying={isPlaying}>
                                {track.trackName}
                              </StyledTrackName>
                            )}
                            {track.artistName && (
                              <StyledTrackArtist $isPlaying={isPlaying}>
                                {track.artistName}
                              </StyledTrackArtist>
                            )}
                            {track.remixArtist && (
                              <StyledTrackRemix $isPlaying={isPlaying}>
                                {track.remixArtist}
                              </StyledTrackRemix>
                            )}
                          </StyledTrackItem>
                        );
                      })}
                    </StyledTrackList>
                  </>
                )}
              </>
            ) : (
              <StyledNoMix>No mix currently playing</StyledNoMix>
            )}
          </StyledMobileContent>
        </StyledMobileLayout>
      </StyledPlayerPage>
    </>
  );
};

export default HomePage;
