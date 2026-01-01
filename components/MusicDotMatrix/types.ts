import type {
  DotMatrixProps,
  TransitionEffect,
} from "components/DotMatrix/types";

export interface MusicDotMatrixProps extends Omit<DotMatrixProps, "text"> {
  trackName?: string;
  artistName?: string;
  remixArtistName?: string;
  publisher?: string;
  mixName?: string;
  showPlaybackStatus?: boolean;
  cycleInterval?: number; // Time between message cycles in ms
  theme?: "orange" | "green" | "blue" | "red";
  autoTransition?: boolean;
  transitionEffects?: TransitionEffect[]; // Array of effects to cycle through
}

export interface MessageCycle {
  messages: string[];
  currentIndex: number;
  lastUpdate: number;
}
