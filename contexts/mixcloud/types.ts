import type { Mix } from "db/types";

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

export type MixProgressStatus = "unplayed" | "in_progress" | "complete";

export type MixProgress = {
  key: string;
  duration: number;
  position: number;
  lastPlayed: number; // timestamp
  status: MixProgressStatus;
};

export type MixProgressMap = Record<string, MixProgress>;

export type MixcloudState = {
  isPlaying: boolean;
  isLoading: boolean;
  currentIndex: number;
  currentKey: string | null;
  duration: number;
  position: number;
  volume: number;
  keys: string[];
  mixData: Mix[];
  isLoadingMixes: boolean;
  currentFilters: MixcloudFilters;
  error: string | null;
  filters: MixcloudFilters;
  shareMessage: string | null;
  mixProgress: MixProgressMap;
  pendingSeekPosition: number | null;
  shuffleMode: boolean;
};

export type MixcloudActions = {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  goToTrack: (_index: number, _fromSavedPosition?: boolean) => void;
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
  loadSpecificMix: (_mixKey: string) => Promise<void>;
  shareCurrentMix: () => void;
  getMixProgress: (_key: string) => MixProgress;
  updateMixProgress: (
    _key: string,
    _position: number,
    _duration: number,
  ) => void;
  startMixOver: (_key: string) => void;
  getCurrentMix: () => Mix | null;
  playRandomFromCurrentList: () => void;
  toggleShuffle: () => void;
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
