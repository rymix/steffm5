import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mcKeyFormatter } from "utils/functions";

import type { Mix } from "db/types";
import usePersistedState from "hooks/usePersistedState";

import type {
  MixcloudActions,
  MixcloudContextState,
  MixcloudFilters,
  MixcloudState,
  MixProgress,
  MixProgressMap,
  MixProgressStatus,
  UseMixcloudContextStateOptions,
} from "./types";

declare global {
  interface Window {
    Mixcloud: any;
    onMixcloudWidgetReady?: () => void;
  }
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
  const widgetReadyRef = useRef(false);
  const [autoPlay, setAutoPlayState] = useState(initialAutoPlay);
  const [mixProgress, setMixProgress] = usePersistedState<MixProgressMap>(
    "mix-progress",
    {},
  );

  const [state, setState] = useState<MixcloudState>({
    isPlaying: false,
    isLoading: false,
    currentIndex: 0,
    currentKey: initialKeys.length > 0 ? initialKeys[0] : null,
    duration: 0,
    position: 0,
    volume: 0.8,
    keys: initialKeys.length > 0 ? initialKeys : [], // Start empty if no initial keys
    isLoadingMixes: initialKeys.length === 0, // Show loading if starting empty
    currentFilters: {},
    error: null,
    filters: {
      category: "",
      name: "",
      tags: "",
    },
    shareMessage: null,
    mixProgress,
    pendingSeekPosition: null,
  });

  // Sync state with persisted mix progress
  useEffect(() => {
    setState((prev) => ({ ...prev, mixProgress }));
  }, [mixProgress]);

  // Helper function to determine progress status
  const getProgressStatus = useCallback(
    (position: number, duration: number): MixProgressStatus => {
      if (position < 20) {
        return "unplayed";
      } else if (position >= duration - 20) {
        return "complete";
      } else {
        return "in_progress";
      }
    },
    [],
  );

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
        widgetReadyRef.current = false; // Reset ready state
        widgetRef.current = window.Mixcloud.PlayerWidget(iframeRef.current);

        // Set up event listeners
        widgetRef.current.ready.then(() => {
          widgetReadyRef.current = true;

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
              setState((prev) => {
                // Handle pending seek position
                if (prev.pendingSeekPosition !== null && duration > 0) {
                  // Seek to the saved position once we have duration info
                  setTimeout(() => {
                    if (widgetRef.current) {
                      widgetRef.current.seek(prev.pendingSeekPosition);
                    }
                  }, 500); // Small delay to ensure widget is ready

                  return {
                    ...prev,
                    position,
                    duration,
                    isLoading: false,
                    pendingSeekPosition: null, // Clear the pending seek
                  };
                }

                return {
                  ...prev,
                  position,
                  duration,
                  isLoading: false,
                };
              });

              // Update mix progress if we have a current key and valid duration
              if (state.currentKey && duration > 0) {
                const status = getProgressStatus(position, duration);
                const progressData: MixProgress = {
                  key: state.currentKey,
                  duration,
                  position,
                  lastPlayed: Date.now(),
                  status,
                };

                setMixProgress((prev) => ({
                  ...prev,
                  [state.currentKey!]: progressData,
                }));
              }

              onProgress?.(position, duration);
            },
          );

          // Set initial volume
          widgetRef.current.setVolume(state.volume);

          // Handle pending seek position if widget just became ready
          if (state.pendingSeekPosition !== null) {
            setTimeout(() => {
              if (widgetRef.current && state.pendingSeekPosition !== null) {
                widgetRef.current.seek(state.pendingSeekPosition);
                setState((prev) => ({ ...prev, pendingSeekPosition: null }));
              }
            }, 1000);
          }

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
    if (widgetRef.current && widgetReadyRef.current) {
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
    (index: number, fromSavedPosition: boolean = false) => {
      if (index >= 0 && index < state.keys.length) {
        const mixKey = state.keys[index];
        const progress = mixProgress[mixKey];

        // Determine if we should seek to saved position
        let seekPosition = null;
        if (fromSavedPosition && progress && progress.position > 20) {
          // Only seek if we have meaningful progress (more than 20 seconds)
          seekPosition = progress.position;
        }

        setState((prev) => ({
          ...prev,
          currentIndex: index,
          currentKey: mixKey,
          isPlaying: false,
          isLoading: true,
          position: 0,
          duration: 0,
          pendingSeekPosition: seekPosition,
          // Keep existing interaction state - don't reset it
        }));
      }
    },
    [state.keys, mixProgress],
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
    setState((prev) => ({
      ...prev,
      filters: {
        category: "",
        name: "",
        tags: "",
      },
    }));
    await loadMixes({});
  }, [loadMixes]);

  const setFilters = useCallback((filters: MixcloudFilters) => {
    setState((prev) => ({ ...prev, filters }));
  }, []);

  const updateFilter = useCallback((key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, [key]: value },
    }));
  }, []);

  const loadRandomMix = useCallback(async (category?: string) => {
    setState((prev) => ({ ...prev, isLoadingMixes: true, error: null }));

    try {
      const url =
        category && category !== "all"
          ? `/api/randomMix/${category}`
          : "/api/randomMix";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to load random mix: ${response.statusText}`);
      }

      const data = await response.json();
      const randomKey = mcKeyFormatter(data.mcKey);

      setState((prev) => ({
        ...prev,
        keys: [randomKey],
        currentIndex: 0,
        currentKey: randomKey,
        isLoadingMixes: false,
        error: null,
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

  const loadMixesPreserveCurrent = useCallback(
    async (filters: MixcloudFilters = {}) => {
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

        setState((prev) => {
          const currentKey = prev.currentKey;
          let newCurrentIndex = 0;

          // Find the current playing mix in the new list
          if (currentKey) {
            const foundIndex = keys.findIndex((key) => key === currentKey);
            if (foundIndex !== -1) {
              newCurrentIndex = foundIndex;
            } else {
              // Current mix not found in filtered list, keep it at the beginning
              keys.unshift(currentKey);
              newCurrentIndex = 0;
            }
          }

          return {
            ...prev,
            keys,
            currentFilters: filters,
            isLoadingMixes: false,
            error: null,
            currentIndex: newCurrentIndex,
            // IMPORTANT: Do NOT change currentKey to avoid widget reinitialization
            // This preserves the widget's autoplay capability
          };
        });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoadingMixes: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        }));
      }
    },
    [],
  );

  const loadMixesWithRandomStart = useCallback(
    async (filters: MixcloudFilters = {}) => {
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

        // Select a random starting index
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomIndex];

        setState((prev) => ({
          ...prev,
          keys,
          currentFilters: filters,
          isLoadingMixes: false,
          error: null,
          currentIndex: randomIndex,
          currentKey: randomKey,
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
    },
    [],
  );

  const loadSpecificMix = useCallback(async (mixKey: string) => {
    setState((prev) => ({ ...prev, isLoadingMixes: true, error: null }));

    try {
      // Load all mixes first to get the full list context
      const response = await fetch("/api/mixes");

      if (!response.ok) {
        throw new Error(`Failed to load mixes: ${response.statusText}`);
      }

      const mixes: Mix[] = await response.json();
      const keys = mixes.map((mix) => mcKeyFormatter(mix.mixcloudKey));

      // Find the specific mix in the list
      const targetIndex = keys.findIndex((key) => key === mixKey);

      if (targetIndex === -1) {
        throw new Error(`Mix "${mixKey}" not found`);
      }

      setState((prev) => ({
        ...prev,
        keys,
        currentFilters: {},
        isLoadingMixes: false,
        error: null,
        currentIndex: targetIndex,
        currentKey: mixKey,
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

  const shareCurrentMix = useCallback(() => {
    if (state.currentKey) {
      const shareUrl = `${window.location.origin}?mix=${encodeURIComponent(state.currentKey)}`;

      // Copy to clipboard
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          setState((prev) => ({
            ...prev,
            shareMessage: "Share URL copied to clipboard!",
          }));
          // Clear message after 3 seconds
          setTimeout(() => {
            setState((prev) => ({ ...prev, shareMessage: null }));
          }, 3000);
        })
        .catch((err) => {
          console.error("Failed to copy to clipboard:", err);
          setState((prev) => ({
            ...prev,
            shareMessage: "Failed to copy. URL: " + shareUrl,
          }));
          // Clear message after 5 seconds for error
          setTimeout(() => {
            setState((prev) => ({ ...prev, shareMessage: null }));
          }, 5000);
        });
    }
  }, [state.currentKey]);

  const getMixProgress = useCallback(
    (key: string): MixProgress => {
      return (
        mixProgress[key] || {
          key,
          duration: 0,
          position: 0,
          lastPlayed: 0,
          status: "unplayed",
        }
      );
    },
    [mixProgress],
  );

  const updateMixProgress = useCallback(
    (key: string, position: number, duration: number) => {
      const status = getProgressStatus(position, duration);
      const progressData: MixProgress = {
        key,
        duration,
        position,
        lastPlayed: Date.now(),
        status,
      };

      setMixProgress((prev) => ({
        ...prev,
        [key]: progressData,
      }));
    },
    [getProgressStatus],
  );

  const startMixOver = useCallback(
    (key: string) => {
      // Reset progress for the specified mix
      const resetProgress: MixProgress = {
        key,
        duration: 0,
        position: 0,
        lastPlayed: Date.now(),
        status: "unplayed",
      };

      setMixProgress((prev) => ({
        ...prev,
        [key]: resetProgress,
      }));

      // If this is the current playing mix, seek to the beginning
      if (state.currentKey === key && widgetRef.current) {
        widgetRef.current.seek(0);
      }
    },
    [state.currentKey],
  );

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
      setFilters,
      updateFilter,
      loadRandomMix,
      loadMixesPreserveCurrent,
      loadMixesWithRandomStart,
      loadSpecificMix,
      shareCurrentMix,
      getMixProgress,
      updateMixProgress,
      startMixOver,
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
      setFilters,
      updateFilter,
      loadRandomMix,
      loadMixesPreserveCurrent,
      loadMixesWithRandomStart,
      loadSpecificMix,
      shareCurrentMix,
      getMixProgress,
      updateMixProgress,
      startMixOver,
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
