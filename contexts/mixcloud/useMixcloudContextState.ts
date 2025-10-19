import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mcKeyFormatter } from "utils/functions";

import type { Mix } from "db/types";

import type {
  MixcloudActions,
  MixcloudContextState,
  MixcloudFilters,
  MixcloudState,
} from "./types";

declare global {
  interface Window {
    Mixcloud: any;
    onMixcloudWidgetReady?: () => void;
  }
}

interface UseMixcloudContextStateOptions {
  initialKeys?: string[];
  initialAutoPlay?: boolean;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onProgress?: (_position: number, _duration: number) => void;
}

const useMixcloudContextState = (
  options: UseMixcloudContextStateOptions = {},
): MixcloudContextState => {
  const {
    initialKeys = [],
    initialAutoPlay = true,
    onReady,
    onPlay,
    onPause,
    onEnded,
    onProgress,
  } = options;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);
  const [autoPlay, setAutoPlayState] = useState(initialAutoPlay);

  const [state, setState] = useState<MixcloudState>({
    isPlaying: false,
    isLoading: false,
    currentIndex: 0,
    currentKey: initialKeys[0] || null,
    duration: 0,
    position: 0,
    volume: 0.8,
    keys: initialKeys,
    isLoadingMixes: false,
    currentFilters: {},
    error: null,
  });

  const widgetUrl = state.currentKey
    ? `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${encodeURIComponent(
        state.currentKey,
      )}&autoplay=${autoPlay ? "1" : "0"}`
    : null;

  // Load Mixcloud widget script
  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const script = document.createElement("script");
    script.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
    script.async = true;

    script.onload = () => {
      scriptLoadedRef.current = true;
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Initialize widget when iframe loads
  useEffect(() => {
    if (!scriptLoadedRef.current || !iframeRef.current || !state.currentKey)
      return;

    const initializeWidget = () => {
      if (window.Mixcloud && iframeRef.current) {
        widgetRef.current = window.Mixcloud.PlayerWidget(iframeRef.current);

        // Set up event listeners
        widgetRef.current.ready.then(() => {
          widgetRef.current.events.pause.on(() => {
            setState((prev) => ({ ...prev, isPlaying: false }));
            onPause?.();
          });

          widgetRef.current.events.play.on(() => {
            setState((prev) => ({
              ...prev,
              isPlaying: true,
              isLoading: false,
            }));
            onPlay?.();
          });

          widgetRef.current.events.ended.on(() => {
            setState((prev) => ({ ...prev, isPlaying: false }));
            onEnded?.();
          });

          widgetRef.current.events.buffering.on(() => {
            setState((prev) => ({ ...prev, isLoading: true }));
          });

          widgetRef.current.events.progress.on(
            (position: number, duration: number) => {
              setState((prev) => ({
                ...prev,
                position,
                duration,
                isLoading: false,
              }));
              onProgress?.(position, duration);
            },
          );

          // Set initial volume
          widgetRef.current.setVolume(state.volume);

          onReady?.();
        });
      }
    };

    // Wait for script to load
    const checkScript = setInterval(() => {
      if (window.Mixcloud) {
        clearInterval(checkScript);
        initializeWidget();
      }
    }, 100);

    return () => clearInterval(checkScript);
  }, [state.currentKey, onReady, onPlay, onPause, onEnded, onProgress]);

  const play = useCallback(() => {
    if (widgetRef.current) {
      widgetRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (widgetRef.current) {
      widgetRef.current.pause();
    }
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const goToTrack = useCallback(
    (index: number) => {
      if (index >= 0 && index < state.keys.length) {
        setState((prev) => ({
          ...prev,
          currentIndex: index,
          currentKey: state.keys[index],
          isPlaying: false,
          isLoading: true,
          position: 0,
          duration: 0,
        }));
      }
    },
    [state.keys],
  );

  const next = useCallback(() => {
    const nextIndex = (state.currentIndex + 1) % state.keys.length;
    goToTrack(nextIndex);
  }, [state.currentIndex, state.keys.length, goToTrack]);

  const previous = useCallback(() => {
    const prevIndex =
      state.currentIndex === 0 ? state.keys.length - 1 : state.currentIndex - 1;
    goToTrack(prevIndex);
  }, [state.currentIndex, state.keys.length, goToTrack]);

  const seek = useCallback((position: number) => {
    if (widgetRef.current) {
      widgetRef.current.seek(position);
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setState((prev) => ({ ...prev, volume: clampedVolume }));
    if (widgetRef.current) {
      widgetRef.current.setVolume(clampedVolume);
    }
  }, []);

  const setKeys = useCallback((keys: string[]) => {
    setState((prev) => ({
      ...prev,
      keys,
      currentIndex: 0,
      currentKey: keys[0] || null,
      isPlaying: false,
      isLoading: keys.length > 0,
      position: 0,
      duration: 0,
    }));
  }, []);

  const setAutoPlay = useCallback((newAutoPlay: boolean) => {
    setAutoPlayState(newAutoPlay);
  }, []);

  // API functions
  const loadMixes = useCallback(async (filters: MixcloudFilters = {}) => {
    setState((prev) => ({ ...prev, isLoadingMixes: true, error: null }));

    try {
      const queryParams = new URLSearchParams();

      if (filters.category) queryParams.append("category", filters.category);
      if (filters.name) queryParams.append("name", filters.name);
      if (filters.notes) queryParams.append("notes", filters.notes);
      if (filters.tags) queryParams.append("tags", filters.tags);
      if (filters.date) queryParams.append("date", filters.date);

      const response = await fetch(`/api/mixes?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to load mixes: ${response.statusText}`);
      }

      const mixes: Mix[] = await response.json();
      const keys = mixes.map((mix) => mcKeyFormatter(mix.mixcloudKey));

      setState((prev) => ({
        ...prev,
        keys,
        currentFilters: filters,
        isLoadingMixes: false,
        error: null,
        currentIndex: 0,
        currentKey: keys[0] || null,
        isPlaying: false,
        position: 0,
        duration: 0,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoadingMixes: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }));
    }
  }, []);

  const applyFilters = useCallback(
    async (filters: MixcloudFilters) => {
      await loadMixes(filters);
    },
    [loadMixes],
  );

  const clearFilters = useCallback(async () => {
    await loadMixes({});
  }, [loadMixes]);

  const actions: MixcloudActions = useMemo(
    () => ({
      play,
      pause,
      toggle,
      next,
      previous,
      goToTrack,
      seek,
      setVolume,
      setKeys,
      setAutoPlay,
      loadMixes,
      applyFilters,
      clearFilters,
    }),
    [
      play,
      pause,
      toggle,
      next,
      previous,
      goToTrack,
      seek,
      setVolume,
      setKeys,
      setAutoPlay,
      loadMixes,
      applyFilters,
      clearFilters,
    ],
  );

  return {
    state,
    actions,
    iframeRef,
    widgetUrl,
    autoPlay,
  };
};

export default useMixcloudContextState;
