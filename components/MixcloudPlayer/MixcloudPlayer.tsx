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

      // Check for shared mix in URL query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const sharedMixKey = urlParams.get("mix");

      if (sharedMixKey) {
        // Load specific shared mix
        actions.loadSpecificMix(decodeURIComponent(sharedMixKey));
      } else {
        // Single API call approach: Load all mixes and start with random one
        // This avoids widget reinitialization issues
        actions.loadMixesWithRandomStart();
      }

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
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={actions.previous} disabled={state.keys.length <= 1}>
          Previous
        </button>
        <button onClick={actions.toggle} disabled={state.isLoading}>
          {state.isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={actions.next} disabled={state.keys.length <= 1}>
          Next
        </button>
        <button
          onClick={actions.shareCurrentMix}
          disabled={!state.currentKey}
          title="Copy share link to clipboard"
        >
          Share
        </button>
      </div>

      {/* Share message */}
      {state.shareMessage && (
        <div
          style={{
            backgroundColor: state.shareMessage.includes("Failed")
              ? "#ffcdd2"
              : "#c8e6c9",
            padding: "8px 12px",
            borderRadius: "4px",
            marginBottom: "20px",
            fontSize: "14px",
            border: `1px solid ${state.shareMessage.includes("Failed") ? "#f44336" : "#4caf50"}`,
          }}
        >
          {state.shareMessage}
        </div>
      )}

      {/* Progress bar - Display only (Mixcloud ToS compliance) */}
      {state.duration > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <label>
            Progress: {formatTime(state.position)} /{" "}
            {formatTime(state.duration)}
          </label>
          <div
            style={{
              width: "100%",
              height: "6px",
              backgroundColor: "#f0f0f0",
              borderRadius: "3px",
              overflow: "hidden",
              marginTop: "4px",
            }}
          >
            <div
              style={{
                width: `${(state.position / state.duration) * 100}%`,
                height: "100%",
                backgroundColor: "#2196f3",
                borderRadius: "3px",
                transition: "width 0.5s ease",
              }}
            />
          </div>
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
