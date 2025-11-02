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
    previousVolume: 0.8,
    keys: initialKeys.length > 0 ? initialKeys : [], // Start empty if no initial keys
    mixData: [],
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
    shuffleMode: false,
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

  // Helper functions for shuffle logic
  const getUnplayedMixes = useCallback(() => {
    return state.keys.filter((key) => {
      const progress = mixProgress[key];
      return !progress || progress.status === "unplayed";
    });
  }, [state.keys, mixProgress]);

  const playNextMix = useCallback(() => {
    if (state.keys.length === 0) return;

    if (state.shuffleMode) {
      // Shuffle mode: play random unplayed mix, or any random if all played
      const unplayedMixes = getUnplayedMixes();

      if (unplayedMixes.length > 0) {
        // Play random unplayed mix
        const randomIndex = Math.floor(Math.random() * unplayedMixes.length);
        const randomKey = unplayedMixes[randomIndex];
        const keyIndex = state.keys.indexOf(randomKey);

        setState((prev) => ({
          ...prev,
          currentIndex: keyIndex,
          currentKey: randomKey,
          isPlaying: false,
          position: 0,
          duration: 0,
        }));
      } else {
        // All mixes played, play any random mix
        const randomIndex = Math.floor(Math.random() * state.keys.length);
        const randomKey = state.keys[randomIndex];

        setState((prev) => ({
          ...prev,
          currentIndex: randomIndex,
          currentKey: randomKey,
          isPlaying: false,
          position: 0,
          duration: 0,
        }));
      }
    } else {
      // Normal mode: play next in order, loop to first when at end
      const nextIndex = (state.currentIndex + 1) % state.keys.length;
      const nextKey = state.keys[nextIndex];

      setState((prev) => ({
        ...prev,
        currentIndex: nextIndex,
        currentKey: nextKey,
        isPlaying: false,
        position: 0,
        duration: 0,
      }));
    }
  }, [state.keys, state.currentIndex, state.shuffleMode, getUnplayedMixes]);

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
            // Auto-advance to next mix
            playNextMix();
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
  }, [
    state.currentKey,
    onReady,
    onPlay,
    onPause,
    onEnded,
    onProgress,
    playNextMix,
  ]);

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
    playNextMix();
  }, [playNextMix]);

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
    setState((prev) => ({
      ...prev,
      previousVolume: prev.volume > 0 ? prev.volume : prev.previousVolume,
      volume: clampedVolume,
    }));
    if (widgetRef.current) {
      widgetRef.current.setVolume(clampedVolume);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setState((prev) => {
      const newVolume = prev.volume === 0 ? prev.previousVolume : 0;
      const newPreviousVolume =
        prev.volume > 0 ? prev.volume : prev.previousVolume;

      if (widgetRef.current) {
        widgetRef.current.setVolume(newVolume);
      }

      return {
        ...prev,
        volume: newVolume,
        previousVolume: newPreviousVolume,
      };
    });
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

  // Helper function to sort mixes by listOrder first, then name second
  const sortMixes = useCallback((mixes: Mix[]): Mix[] => {
    return [...mixes].sort((a, b) => {
      // First sort by listOrder
      if (a.listOrder !== b.listOrder) {
        return a.listOrder - b.listOrder;
      }
      // Then sort by name
      return a.name.localeCompare(b.name);
    });
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
      const sortedMixes = sortMixes(mixes);
      const keys = sortedMixes.map((mix) => mcKeyFormatter(mix.mixcloudKey));

      setState((prev) => ({
        ...prev,
        keys,
        mixData: sortedMixes,
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
        const sortedMixes = sortMixes(mixes);
        const keys = sortedMixes.map((mix) => mcKeyFormatter(mix.mixcloudKey));

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
            mixData: sortedMixes,
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

  const clearFilters = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoadingMixes: true, error: null }));

    try {
      // Reset the filter state
      setState((prev) => ({
        ...prev,
        filters: {
          category: "",
          name: "",
          tags: "",
        },
      }));

      // Load all mixes without filters
      const response = await fetch("/api/mixes");

      if (!response.ok) {
        throw new Error(`Failed to load mixes: ${response.statusText}`);
      }

      const mixes: Mix[] = await response.json();
      const sortedMixes = sortMixes(mixes);
      const keys = sortedMixes.map((mix) => mcKeyFormatter(mix.mixcloudKey));

      setState((prev) => {
        const currentKey = prev.currentKey;
        let newCurrentIndex = prev.currentIndex;

        // Find the current playing mix in the new unfiltered list
        if (currentKey) {
          const foundIndex = keys.findIndex((key) => key === currentKey);
          if (foundIndex !== -1) {
            newCurrentIndex = foundIndex;
          }
        }

        return {
          ...prev,
          keys,
          mixData: sortedMixes,
          currentFilters: {},
          isLoadingMixes: false,
          error: null,
          currentIndex: newCurrentIndex,
          // CRITICAL: Do NOT update currentKey - this prevents widget reload
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
  }, [sortMixes]);

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
        const sortedMixes = sortMixes(mixes);
        const keys = sortedMixes.map((mix) => mcKeyFormatter(mix.mixcloudKey));

        // Select a random starting index
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomIndex];

        setState((prev) => ({
          ...prev,
          keys,
          mixData: sortedMixes,
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
      // Convert clean mix key back to full format if needed
      const fullMixKey = mixKey.startsWith("/rymixxx/")
        ? mixKey
        : `/rymixxx/${mixKey}/`;

      // Load all mixes first to get the full list context
      const response = await fetch("/api/mixes");

      if (!response.ok) {
        throw new Error(`Failed to load mixes: ${response.statusText}`);
      }

      const mixes: Mix[] = await response.json();
      const sortedMixes = sortMixes(mixes);
      const keys = sortedMixes.map((mix) => mcKeyFormatter(mix.mixcloudKey));

      // Find the specific mix in the list using the full key
      const targetIndex = keys.findIndex((key) => key === fullMixKey);

      if (targetIndex === -1) {
        throw new Error(`Mix "${fullMixKey}" not found`);
      }

      setState((prev) => ({
        ...prev,
        keys,
        mixData: sortedMixes,
        currentFilters: {},
        isLoadingMixes: false,
        error: null,
        currentIndex: targetIndex,
        currentKey: fullMixKey,
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
      // Clean up the mix key for sharing - remove /rymixxx/ prefix and trailing slash
      const cleanMixKey = state.currentKey
        .replace(/^\/rymixxx\//, "") // Remove /rymixxx/ prefix
        .replace(/\/$/, ""); // Remove trailing slash

      const shareUrl = `${window.location.origin}?mix=${encodeURIComponent(cleanMixKey)}`;

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

  const getCurrentMix = useCallback((): Mix | null => {
    if (!state.currentKey || state.mixData.length === 0) {
      return null;
    }

    // Find the mix data based on the current key
    return (
      state.mixData.find((mix) => {
        const mixKey = mcKeyFormatter(mix.mixcloudKey);
        return mixKey === state.currentKey;
      }) || null
    );
  }, [state.currentKey, state.mixData]);

  const playRandomFromCurrentList = useCallback(() => {
    if (state.keys.length === 0) {
      return; // No mixes available
    }

    // Get a random index from the current filtered list
    const randomIndex = Math.floor(Math.random() * state.keys.length);
    const randomKey = state.keys[randomIndex];

    // Update state to play the random mix
    setState((prev) => ({
      ...prev,
      currentIndex: randomIndex,
      currentKey: randomKey,
      isPlaying: false,
      position: 0,
      duration: 0,
    }));
  }, [state.keys]);

  const toggleShuffle = useCallback(() => {
    setState((prev) => ({ ...prev, shuffleMode: !prev.shuffleMode }));
  }, []);

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
      toggleMute,
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
      getCurrentMix,
      playRandomFromCurrentList,
      toggleShuffle,
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
      toggleMute,
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
      getCurrentMix,
      playRandomFromCurrentList,
      toggleShuffle,
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
