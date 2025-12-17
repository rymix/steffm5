import { useMixcloud } from "contexts/mixcloud";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  StyledCloseButton,
  StyledMiniControlButton,
  StyledMiniControls,
  StyledMiniPlayer,
  StyledMiniPlayerContent,
  StyledMiniPlayerHeader,
  StyledMiniPlayerTitle,
  StyledMiniProgressContainer,
  StyledMiniProgressFill,
  StyledMiniProgressTrack,
  StyledMiniVolumeSlider,
  StyledMixName,
  StyledTimeDisplay,
  StyledTrackInfo,
  StyledTrackName,
  StyledVolumeContainer,
  StyledVolumeIcon,
} from "./styles";
import type {
  MiniPlayerDragState,
  MiniPlayerPosition,
  MiniPlayerProps,
} from "./types";

const MiniPlayer: React.FC<MiniPlayerProps> = ({
  isVisible = true,
  onToggleVisibility,
}) => {
  const { state, actions } = useMixcloud();
  const [position, setPosition] = useState<MiniPlayerPosition>({
    x: 20,
    y: 100,
  });
  const [dragState, setDragState] = useState<MiniPlayerDragState>({
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    elementStart: { x: 0, y: 0 },
  });
  const miniPlayerRef = useRef<HTMLDivElement>(null);

  const currentMix = actions.getCurrentMix();

  // Find the currently playing track based on position
  const currentTrack = useMemo(() => {
    if (!currentMix?.tracks || state.position <= 0) return null;

    // Convert MM:SS or H:MM:SS format to seconds
    const timeToSeconds = (timeString: string): number => {
      const parts = timeString.split(":");
      if (parts.length === 2) {
        // MM:SS format
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
      } else if (parts.length === 3) {
        // H:MM:SS format
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

    const tolerance = 2; // 2 seconds tolerance

    // Find the currently playing track
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

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const getVolumeIcon = useCallback(() => {
    if (state.volume === 0) return "🔇";
    if (state.volume < 0.3) return "🔈";
    if (state.volume < 0.7) return "🔉";
    return "🔊";
  }, [state.volume]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (
      e.target === miniPlayerRef.current ||
      (miniPlayerRef.current &&
        miniPlayerRef.current.contains(e.target as Node))
    ) {
      const rect = miniPlayerRef.current.getBoundingClientRect();
      setDragState({
        isDragging: true,
        dragStart: { x: e.clientX, y: e.clientY },
        elementStart: { x: rect.left, y: rect.top },
      });
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState.isDragging) return;

      const deltaX = e.clientX - dragState.dragStart.x;
      const deltaY = e.clientY - dragState.dragStart.y;

      const newX = Math.max(
        0,
        Math.min(window.innerWidth - 320, dragState.elementStart.x + deltaX),
      );
      const newY = Math.max(
        0,
        Math.min(window.innerHeight - 200, dragState.elementStart.y + deltaY),
      );

      setPosition({ x: newX, y: newY });
    },
    [dragState],
  );

  const handleMouseUp = useCallback(() => {
    setDragState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  const handleProgressClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (state.duration <= 0) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const progressPercent = clickX / rect.width;
      const newPosition = progressPercent * state.duration;

      actions.seek(Math.max(0, Math.min(state.duration, newPosition)));
    },
    [state.duration, actions],
  );

  const progress =
    state.duration > 0 ? (state.position / state.duration) * 100 : 0;

  return (
    <StyledMiniPlayer
      ref={miniPlayerRef}
      $x={position.x}
      $y={position.y}
      $isDragging={dragState.isDragging}
      $isVisible={isVisible}
      onMouseDown={handleMouseDown}
    >
      <StyledMiniPlayerHeader>
        <StyledMiniPlayerTitle>Mini Player</StyledMiniPlayerTitle>
        <StyledCloseButton onClick={onToggleVisibility}>×</StyledCloseButton>
      </StyledMiniPlayerHeader>

      <StyledMiniPlayerContent>
        <StyledTrackInfo>
          <StyledMixName>{currentMix?.name || "No mix selected"}</StyledMixName>
          <StyledTrackName>
            {currentTrack?.artistName && currentTrack?.trackName
              ? `${currentTrack.artistName} - ${currentTrack.trackName}`
              : state.isLoading
                ? "Loading..."
                : "No track info"}
          </StyledTrackName>
        </StyledTrackInfo>

        <StyledMiniProgressContainer>
          <StyledMiniProgressTrack onClick={handleProgressClick}>
            <StyledMiniProgressFill $progress={progress} />
          </StyledMiniProgressTrack>
          <StyledTimeDisplay>
            <span>{formatTime(state.position)}</span>
            <span>{formatTime(state.duration)}</span>
          </StyledTimeDisplay>
        </StyledMiniProgressContainer>

        <StyledMiniControls>
          <StyledMiniControlButton
            onClick={actions.previous}
            disabled={state.keys.length <= 1}
            title="Previous"
          >
            ⏮
          </StyledMiniControlButton>

          <StyledMiniControlButton
            $variant="primary"
            onClick={actions.toggle}
            disabled={state.isLoading}
            title={state.isPlaying ? "Pause" : "Play"}
          >
            {state.isLoading ? "●●●" : state.isPlaying ? "⏸" : "▶"}
          </StyledMiniControlButton>

          <StyledMiniControlButton
            onClick={actions.next}
            disabled={state.keys.length <= 1}
            title="Next"
          >
            ⏭
          </StyledMiniControlButton>
        </StyledMiniControls>

        <StyledVolumeContainer>
          <StyledVolumeIcon
            onClick={actions.toggleMute}
            title={`${state.volume === 0 ? "Unmute" : "Mute"} (${Math.round(state.volume * 100)}%)`}
          >
            {getVolumeIcon()}
          </StyledVolumeIcon>
          <StyledMiniVolumeSlider
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={state.volume}
            onChange={(e) => actions.setVolume(Number(e.target.value))}
          />
        </StyledVolumeContainer>
      </StyledMiniPlayerContent>
    </StyledMiniPlayer>
  );
};

export default MiniPlayer;
