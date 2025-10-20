import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useRef } from "react";

import { MixcloudPlayerMixList } from "./MixList";
import { StyledMixcloudPlayer, StyledMixcloudPlayerWidget } from "./styles";
import { MixcloudPlayerProps } from "./types";

export const MixcloudPlayer: React.FC<MixcloudPlayerProps> = ({
  autoPlay = true,
}) => {
  const { state, actions, iframeRef, widgetUrl } = useMixcloud();
  const initializedRef = useRef(false);

  // Initialize by loading all mixes with random starting point (client-side only)
  useEffect(() => {
    if (!initializedRef.current) {
      actions.setAutoPlay(autoPlay);

      // Single API call approach: Load all mixes and start with random one
      // This avoids widget reinitialization issues
      actions.loadMixesWithRandomStart();

      initializedRef.current = true;
    }
  }, []); // Empty dependency array - only run on mount

  // Auto-start playback when widget is ready and autoPlay is enabled
  useEffect(() => {
    if (
      autoPlay &&
      !state.isLoadingMixes &&
      state.currentKey &&
      !state.isPlaying
    ) {
      // Small delay to ensure widget is fully loaded
      const timer = setTimeout(() => {
        actions.play();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [
    autoPlay,
    state.isLoadingMixes,
    state.currentKey,
    state.isPlaying,
    actions,
  ]);

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
      {/* Current mix info */}
      <div style={{ marginBottom: "20px" }}>
        <h3>
          Current Mix: {state.currentIndex + 1} of {state.keys.length}
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
      </div>

      {/* Mixcloud Widget */}
      {widgetUrl && (
        <StyledMixcloudPlayerWidget>
          {state.widgetInteractionRequired && (
            <div
              style={{
                backgroundColor: "#ffeb3b",
                padding: "8px",
                marginBottom: "8px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              ⚠️ Click the widget below to enable player controls
            </div>
          )}
          <iframe
            key={state.currentKey} // Force re-render when track changes
            ref={iframeRef}
            width="100%"
            height="120"
            src={widgetUrl}
            style={{
              border: "none",
              cursor: state.widgetInteractionRequired ? "pointer" : "default",
            }}
            allow="autoplay; encrypted-media"
            onClick={() => {
              if (state.widgetInteractionRequired) {
                // This click will enable the widget for programmatic control
                setTimeout(() => actions.play(), 100);
              }
            }}
          />
        </StyledMixcloudPlayerWidget>
      )}

      {/* Controls */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={actions.previous}
          disabled={state.keys.length <= 1}
          style={{ opacity: state.widgetInteractionRequired ? 0.5 : 1 }}
        >
          Previous
        </button>
        <button
          onClick={actions.toggle}
          disabled={state.isLoading}
          style={{
            opacity: state.widgetInteractionRequired ? 0.5 : 1,
            backgroundColor: state.widgetInteractionRequired ? "#ccc" : "",
          }}
          title={
            state.widgetInteractionRequired ? "Click widget above first" : ""
          }
        >
          {state.isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={actions.next}
          disabled={state.keys.length <= 1}
          style={{ opacity: state.widgetInteractionRequired ? 0.5 : 1 }}
        >
          Next
        </button>
      </div>

      {/* Progress bar */}
      {state.duration > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <label>Progress:</label>
          <input
            type="range"
            min={0}
            max={state.duration}
            value={state.position}
            onChange={(e) => actions.seek(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
      )}

      {/* Volume control */}
      <div style={{ marginBottom: "20px" }}>
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
      </div>

      {/* Track list */}
      <MixcloudPlayerMixList />
    </StyledMixcloudPlayer>
  );
};
