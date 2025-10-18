export interface MixcloudState {
  isPlaying: boolean;
  isLoading: boolean;
  currentIndex: number;
  currentKey: string | null;
  duration: number;
  position: number;
  volume: number;
  keys: string[];
}

export interface MixcloudActions {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  goToTrack: (_index: number) => void;
  seek: (_position: number) => void;
  setVolume: (_volume: number) => void;
  setKeys: (_keys: string[]) => void;
  setAutoPlay: (_autoPlay: boolean) => void;
}

export interface MixcloudContextState {
  state: MixcloudState;
  actions: MixcloudActions;
  iframeRef: React.RefObject<HTMLIFrameElement>;
  widgetUrl: string | null;
  autoPlay: boolean;
}

export interface MixcloudProviderProps {
  children: React.ReactNode;
  initialKeys?: string[];
  initialAutoPlay?: boolean;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onProgress?: (_position: number, _duration: number) => void;
}
