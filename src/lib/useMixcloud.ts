import { useEffect, useRef, useState, useCallback } from 'react';

export interface MixcloudState {
  isPlaying: boolean;
  isLoading: boolean;
  currentIndex: number;
  currentKey: string | null;
  duration: number;
  position: number;
  volume: number;
}

export interface MixcloudActions {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  goToTrack: (index: number) => void;
  seek: (position: number) => void;
  setVolume: (volume: number) => void;
}

export interface UseMixcloudOptions {
  keys: string[];
  autoPlay?: boolean;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onProgress?: (position: number, duration: number) => void;
}

export interface UseMixcloudReturn {
  state: MixcloudState;
  actions: MixcloudActions;
  iframeRef: React.RefObject<HTMLIFrameElement>;
  widgetUrl: string | null;
}

declare global {
  interface Window {
    onMixcloudWidgetReady?: () => void;
  }
}

export const useMixcloud = (options: UseMixcloudOptions): UseMixcloudReturn => {
  const {
    keys,
    autoPlay = true,
    onReady,
    onPlay,
    onPause,
    onEnded,
    onProgress,
  } = options;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  const [state, setState] = useState<MixcloudState>({
    isPlaying: false,
    isLoading: false,
    currentIndex: 0,
    currentKey: keys[0] || null,
    duration: 0,
    position: 0,
    volume: 0.8,
  });

  const widgetUrl = state.currentKey 
    ? `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${encodeURIComponent(state.currentKey)}&autoplay=${autoPlay ? '1' : '0'}`
    : null;

  // Load Mixcloud widget script
  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://widget.mixcloud.com/media/js/widgetApi.js';
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
    if (!scriptLoadedRef.current || !iframeRef.current || !state.currentKey) return;

    const initializeWidget = () => {
      if (window.Mixcloud && iframeRef.current) {
        widgetRef.current = window.Mixcloud.PlayerWidget(iframeRef.current);

        // Set up event listeners
        widgetRef.current.ready.then(() => {
          widgetRef.current.events.pause.on(() => {
            setState(prev => ({ ...prev, isPlaying: false }));
            onPause?.();
          });

          widgetRef.current.events.play.on(() => {
            setState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
            onPlay?.();
          });

          widgetRef.current.events.ended.on(() => {
            setState(prev => ({ ...prev, isPlaying: false }));
            onEnded?.();
          });

          widgetRef.current.events.buffering.on(() => {
            setState(prev => ({ ...prev, isLoading: true }));
          });

          widgetRef.current.events.progress.on((position: number, duration: number) => {
            setState(prev => ({ ...prev, position, duration, isLoading: false }));
            onProgress?.(position, duration);
          });

          // Set initial volume
          widgetRef.current.volume(state.volume);
          
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

  const goToTrack = useCallback((index: number) => {
    if (index >= 0 && index < keys.length) {
      setState(prev => ({
        ...prev,
        currentIndex: index,
        currentKey: keys[index],
        isPlaying: false,
        isLoading: true,
        position: 0,
        duration: 0,
      }));
    }
  }, [keys]);

  const next = useCallback(() => {
    const nextIndex = (state.currentIndex + 1) % keys.length;
    goToTrack(nextIndex);
  }, [state.currentIndex, keys.length, goToTrack]);

  const previous = useCallback(() => {
    const prevIndex = state.currentIndex === 0 ? keys.length - 1 : state.currentIndex - 1;
    goToTrack(prevIndex);
  }, [state.currentIndex, keys.length, goToTrack]);

  const seek = useCallback((position: number) => {
    if (widgetRef.current) {
      widgetRef.current.seek(position);
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setState(prev => ({ ...prev, volume: clampedVolume }));
    if (widgetRef.current) {
      widgetRef.current.volume(clampedVolume);
    }
  }, []);

  const actions: MixcloudActions = {
    play,
    pause,
    toggle,
    next,
    previous,
    goToTrack,
    seek,
    setVolume,
  };

  return {
    state,
    actions,
    iframeRef,
    widgetUrl,
  };
};

// Extend the global Window interface for TypeScript
declare global {
  interface Window {
    Mixcloud: any;
  }
}