import { useMixcloud } from "contexts/mixcloud";
import React, { useCallback, useEffect, useRef, useState } from "react";

import BurgerMenu from "@/components/BurgerMenu";
import CompactControls from "@/components/CompactPlayer/CompactControls";
import CompactDisplay from "@/components/CompactPlayer/CompactDisplay";
import DisplayDevice from "@/components/DisplayDevice";
import {
  StyledMixCard,
  StyledMixCoverArt,
  StyledMixInfo,
  StyledMixName,
  StyledNoMix,
  StyledNoTracks,
  StyledTrackArtist,
  StyledTrackContent,
  StyledTrackCoverArt,
  StyledTrackExpandedInfo,
  StyledTrackExtraInfo,
  StyledTrackHeader,
  StyledTrackItem,
  StyledTrackList,
  StyledTrackListHeader,
  StyledTrackListSection,
  StyledTrackName,
  StyledTrackNumber,
  StyledTrackRemix,
  StyledTrackTime,
} from "@/components/DisplayDevice/styles";
import Wallpaper from "@/components/Wallpaper";
import MainPlayer from "components/MainPlayer";
import MixcloudPlayerWrapper from "components/MixcloudPlayer/MixcloudPlayerWrapper";
import { useWallpaperManager } from "hooks/useWallpaperManager";

import {
  StyledDevicesContainer,
  StyledLayoutWrapper,
  StyledMobileControlsContainer,
  StyledMobileDevice,
  StyledMobileDisplayContainer,
  StyledMobileLayout,
  StyledMobileLogoPanel,
  StyledMobileScreen,
  StyledMobileScreenToggle,
  StyledMobileScreenWrapper,
  StyledMobileWoodSlats,
  StyledPlayerPage,
} from "./styles";

const HomePage: React.FC = () => {
  const { state, actions } = useMixcloud();
  const { wallpaperState, changeWallpaper } = useWallpaperManager();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMobileInfoCollapsed, setIsMobileInfoCollapsed] = useState(false);
  const [expandedTrackIndex, setExpandedTrackIndex] = useState<number | null>(
    null,
  );

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

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  const toggleMobileInfo = () =>
    setIsMobileInfoCollapsed(!isMobileInfoCollapsed);
  const toggleTrackExpanded = (index: number) => {
    setExpandedTrackIndex(expandedTrackIndex === index ? null : index);
  };

  // Helper to calculate track duration
  const getTrackDuration = (index: number): string => {
    if (!sortedTracks[index]) {
      return "";
    }
    const currentStart = timeToSeconds(sortedTracks[index].startTime);
    const nextStart = sortedTracks[index + 1]
      ? timeToSeconds(sortedTracks[index + 1].startTime)
      : state.duration;
    const durationSeconds = nextStart - currentStart;
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Wallpaper
        wallpaperUrl={wallpaperState.currentWallpaper}
        tileType={wallpaperState.tileType}
        isLoading={wallpaperState.isLoading}
      />
      <BurgerMenu />
      <MixcloudPlayerWrapper autoPlay={true} />

      <StyledLayoutWrapper>
        <StyledPlayerPage $panelOpen={isPanelOpen}>
          {/* Desktop Layout */}
          <StyledDevicesContainer>
            <MainPlayer />
          </StyledDevicesContainer>

          {/* Mobile Layout */}
          <StyledMobileLayout>
            <StyledMobileDevice>
              <StyledMobileWoodSlats>
                <StyledMobileLogoPanel>STEF.FM</StyledMobileLogoPanel>
              </StyledMobileWoodSlats>

              <StyledMobileDisplayContainer>
                <CompactDisplay />
              </StyledMobileDisplayContainer>

              <StyledMobileScreenWrapper>
                <StyledMobileScreenToggle
                  $collapsed={isMobileInfoCollapsed}
                  onClick={toggleMobileInfo}
                />

                <StyledMobileScreen $collapsed={isMobileInfoCollapsed}>
                  {currentMix ? (
                    <StyledMixCard>
                      {currentMix.coverArtLarge && (
                        <StyledMixCoverArt
                          src={currentMix.coverArtLarge}
                          alt={currentMix.name}
                        />
                      )}

                      <StyledMixName>{currentMix.name}</StyledMixName>

                      {currentMix.user?.name && (
                        <StyledMixInfo>
                          <strong>DJ:</strong> {currentMix.user.name}
                        </StyledMixInfo>
                      )}

                      {currentMix.created_time && (
                        <StyledMixInfo>
                          <strong>Date:</strong>{" "}
                          {new Date(
                            currentMix.created_time,
                          ).toLocaleDateString()}
                        </StyledMixInfo>
                      )}

                      {currentMix.audio_length && (
                        <StyledMixInfo>
                          <strong>Duration:</strong>{" "}
                          {Math.floor(currentMix.audio_length / 60)} minutes
                        </StyledMixInfo>
                      )}

                      {currentMix.play_count !== undefined && (
                        <StyledMixInfo>
                          <strong>Plays:</strong>{" "}
                          {currentMix.play_count.toLocaleString()}
                        </StyledMixInfo>
                      )}

                      {currentMix.tags && currentMix.tags.length > 0 && (
                        <StyledMixInfo>
                          <strong>Tags:</strong> {currentMix.tags.join(", ")}
                        </StyledMixInfo>
                      )}
                    </StyledMixCard>
                  ) : (
                    <StyledNoMix>No mix currently playing</StyledNoMix>
                  )}

                  {currentMix && (
                    <StyledTrackListSection>
                      <StyledTrackListHeader>
                        Track List{" "}
                        {sortedTracks.length > 0 && `(${sortedTracks.length})`}
                      </StyledTrackListHeader>
                      {sortedTracks.length > 0 ? (
                        <StyledTrackList>
                          {sortedTracks.map((track, index) => {
                            const isPlaying = index === currentTrackIndex;
                            const isExpanded = expandedTrackIndex === index;
                            const duration = getTrackDuration(index);
                            return (
                              <StyledTrackItem
                                key={index}
                                $isPlaying={isPlaying}
                                $isExpanded={isExpanded}
                                onClick={() => toggleTrackExpanded(index)}
                              >
                                {track.coverArtLarge && (
                                  <StyledTrackCoverArt
                                    src={track.coverArtLarge}
                                    alt={track.trackName}
                                    $isPlaying={isPlaying}
                                    $isExpanded={isExpanded}
                                  />
                                )}
                                <StyledTrackContent>
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
                                  <StyledTrackExpandedInfo
                                    $isExpanded={isExpanded}
                                  >
                                    {duration && (
                                      <StyledTrackExtraInfo
                                        $isPlaying={isPlaying}
                                      >
                                        <strong>Length:</strong>
                                        {duration}
                                      </StyledTrackExtraInfo>
                                    )}
                                    {track.publisher && (
                                      <StyledTrackExtraInfo
                                        $isPlaying={isPlaying}
                                      >
                                        <strong>Publisher:</strong>
                                        {track.publisher}
                                      </StyledTrackExtraInfo>
                                    )}
                                  </StyledTrackExpandedInfo>
                                </StyledTrackContent>
                              </StyledTrackItem>
                            );
                          })}
                        </StyledTrackList>
                      ) : (
                        <StyledNoTracks>
                          No track information available
                        </StyledNoTracks>
                      )}
                    </StyledTrackListSection>
                  )}
                </StyledMobileScreen>
              </StyledMobileScreenWrapper>

              <StyledMobileControlsContainer>
                <CompactControls />
              </StyledMobileControlsContainer>
            </StyledMobileDevice>
          </StyledMobileLayout>
        </StyledPlayerPage>

        <DisplayDevice isOpen={isPanelOpen} onToggle={togglePanel} />
      </StyledLayoutWrapper>
    </>
  );
};

export default HomePage;
