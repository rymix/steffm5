import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useRef } from "react";

import {
  StyledMixcloudPlayer,
  StyledMixcloudPlayerControls,
  StyledMixcloudPlayerCurrentTrackInfo,
  StyledMixcloudPlayerProgressBar,
  StyledMixcloudPlayerTrackList,
  StyledMixcloudPlayerTrackListItem,
  StyledMixcloudPlayerVolumeControl,
  StyledMixcloudPlayerWidget,
} from "./styles";
import { MixcloudPlayerProps } from "./types";

export const MixcloudPlayer: React.FC<MixcloudPlayerProps> = ({
  autoPlay = true,
}) => {
  const { state, actions, iframeRef, widgetUrl } = useMixcloud();
  const initializedRef = useRef(false);

  // Initialize by loading mixes from API on mount
  useEffect(() => {
    if (!initializedRef.current) {
      actions.setAutoPlay(autoPlay);
      actions.loadMixes(); // Load all mixes initially
      initializedRef.current = true;
    }
  }, []); // Empty dependency array - only run on mount

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (state.isLoadingMixes) {
    return <div>Loading mixes...</div>;
  }

  if (state.error) {
    return (
      <div style={{ color: "red" }}>
        Error loading mixes: {state.error}
        <button
          onClick={() => actions.clearFilters()}
          style={{ marginLeft: "10px" }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (state.keys.length === 0) {
    return <div>No mixes found</div>;
  }

  return (
    <StyledMixcloudPlayer>
      {/* Current track info */}
      <StyledMixcloudPlayerCurrentTrackInfo>
        <h3>
          Current Track: {state.currentIndex + 1} of {state.keys.length}
        </h3>
        <p>Key: {state.currentKey}</p>
        <p>
          Status:{" "}
          {state.isLoading
            ? "Loading..."
            : state.isPlaying
              ? "Playing"
              : "Paused"}
        </p>
        {state.duration > 0 && (
          <p>
            Time: {formatTime(state.position)} / {formatTime(state.duration)}
          </p>
        )}
        <p>Volume: {Math.round(state.volume * 100)}%</p>
      </StyledMixcloudPlayerCurrentTrackInfo>

      {/* Mixcloud Widget */}
      {widgetUrl && (
        <StyledMixcloudPlayerWidget>
          <iframe
            key={state.currentKey} // Force re-render when track changes
            ref={iframeRef}
            width="100%"
            height="120"
            src={widgetUrl}
            style={{ border: "none" }}
            allow="autoplay; encrypted-media"
          />
        </StyledMixcloudPlayerWidget>
      )}

      {/* Controls */}
      <StyledMixcloudPlayerControls>
        <button onClick={actions.previous} disabled={state.keys.length <= 1}>
          Previous
        </button>
        <button onClick={actions.toggle} disabled={state.isLoading}>
          {state.isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={actions.next} disabled={state.keys.length <= 1}>
          Next
        </button>
      </StyledMixcloudPlayerControls>

      {/* Progress bar */}
      {state.duration > 0 && (
        <StyledMixcloudPlayerProgressBar>
          <label>Progress:</label>
          <input
            type="range"
            min={0}
            max={state.duration}
            value={state.position}
            onChange={(e) => actions.seek(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </StyledMixcloudPlayerProgressBar>
      )}

      {/* Volume control */}
      <StyledMixcloudPlayerVolumeControl>
        <label>Volume: {Math.round(state.volume * 100)}%</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={state.volume}
          onChange={(e) => actions.setVolume(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </StyledMixcloudPlayerVolumeControl>

      {/* Track list */}
      <StyledMixcloudPlayerTrackList>
        <h4>Playlist:</h4>
        <ul>
          {state.keys.map((key, index) => (
            <StyledMixcloudPlayerTrackListItem
              key={key}
              $isCurrent={index === state.currentIndex ? true : false}
              onClick={() => actions.goToTrack(index)}
            >
              <strong>{index + 1}.</strong> {key}
              {index === state.currentIndex && (
                <span style={{ marginLeft: "10px" }}>
                  {state.isPlaying ? "▶️" : "⏸️"}
                </span>
              )}
            </StyledMixcloudPlayerTrackListItem>
          ))}
        </ul>
      </StyledMixcloudPlayerTrackList>
    </StyledMixcloudPlayer>
  );
};
