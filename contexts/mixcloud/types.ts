export interface MixcloudFilters {
  category?: string;
  name?: string;
  notes?: string;
  tags?: string;
  date?: string;
}

export interface MixcloudState {
  isPlaying: boolean;
  isLoading: boolean;
  currentIndex: number;
  currentKey: string | null;
  duration: number;
  position: number;
  volume: number;
  keys: string[];
  isLoadingMixes: boolean;
  currentFilters: MixcloudFilters;
  error: string | null;
  filters: MixcloudFilters;
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
  loadMixes: (_filters?: MixcloudFilters) => Promise<void>;
  applyFilters: (_filters: MixcloudFilters) => Promise<void>;
  clearFilters: () => Promise<void>;
  setFilters: (_filters: MixcloudFilters) => void;
  updateFilter: (_key: string, _value: string) => void;
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
