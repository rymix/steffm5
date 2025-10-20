export type UseMixcloudContextStateOptions = {
  initialKeys?: string[];
  initialAutoPlay?: boolean;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onProgress?: (_position: number, _duration: number) => void;
};

export type MixcloudFilters = {
  category?: string;
  name?: string;
  notes?: string;
  tags?: string;
  date?: string;
};

export type MixcloudState = {
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
  widgetInteractionRequired: boolean;
};

export type MixcloudActions = {
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
  loadRandomMix: (_category?: string) => Promise<void>;
  loadMixesPreserveCurrent: (_filters?: MixcloudFilters) => Promise<void>;
  loadMixesWithRandomStart: (_filters?: MixcloudFilters) => Promise<void>;
};

export type MixcloudContextState = {
  state: MixcloudState;
  actions: MixcloudActions;
  iframeRef: React.RefObject<HTMLIFrameElement>;
  widgetUrl: string | null;
  autoPlay: boolean;
};

export type MixcloudProviderProps = {
  children: React.ReactNode;
  initialKeys?: string[];
  initialAutoPlay?: boolean;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onProgress?: (_position: number, _duration: number) => void;
};
