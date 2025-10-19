import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useRef } from "react";

interface MixcloudPlayerProps {
  autoPlay?: boolean;
}

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
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {/* Current track info */}
      <div style={{ marginBottom: "20px" }}>
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
      </div>

      {/* Mixcloud Widget */}
      {widgetUrl && (
        <div style={{ marginBottom: "20px" }}>
          <iframe
            key={state.currentKey} // Force re-render when track changes
            ref={iframeRef}
            width="100%"
            height="120"
            src={widgetUrl}
            style={{ border: "none" }}
            allow="autoplay; encrypted-media"
          />
        </div>
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
      <div>
        <h4>Playlist:</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {state.keys.map((key, index) => (
            <li
              key={key}
              style={{
                padding: "10px",
                margin: "5px 0",
                backgroundColor:
                  index === state.currentIndex ? "#e0e0e0" : "#f5f5f5",
                cursor: "pointer",
                borderRadius: "4px",
              }}
              onClick={() => actions.goToTrack(index)}
            >
              <strong>{index + 1}.</strong> {key}
              {index === state.currentIndex && (
                <span style={{ marginLeft: "10px" }}>
                  {state.isPlaying ? "▶️" : "⏸️"}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
