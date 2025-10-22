import type { TickerProps } from "../Ticker/types";

export type MusicTickerProps = Omit<TickerProps, "messages"> & {
  trackName?: string;
  artistName?: string;
  remixArtistName?: string;
  publisher?: string;
  mixName?: string;
  theme?: "green" | "amber" | "blue";
};
