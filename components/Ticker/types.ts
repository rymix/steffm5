export type TickerProps = {
  messages: string[];
  speed?: number; // Characters per second
  separator?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
};

export type TickerState = {
  containerWidth: number;
  charactersPerLine: number;
  currentMessageIndex: number;
  scrollOffset: number;
};
