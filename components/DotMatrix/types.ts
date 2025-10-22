export interface DotMatrixProps {
  width?: number;
  height?: number;
  dotSize?: number;
  dotSpacing?: number;
  text: string;
  color?: string;
  backgroundColor?: string;
  transitionEffect?: TransitionEffect;
  transitionDuration?: number;
  className?: string;
  onTransitionComplete?: () => void;
}

export interface DotMatrixState {
  currentText: string;
  previousText: string;
  isAnimating: boolean;
  animationProgress: number;
}

export type TransitionEffect =
  | "none"
  | "slideLeft"
  | "slideRight"
  | "slideUp"
  | "slideDown"
  | "explode"
  | "implode"
  | "wipeLeft"
  | "wipeRight"
  | "wipeUp"
  | "wipeDown"
  | "sineWave"
  | "spiral"
  | "randomReveal"
  | "typewriter"
  | "pixelRain";

export interface DotMatrixConfig {
  matrixWidth: number;
  matrixHeight: number;
  dotSize: number;
  dotSpacing: number;
  totalWidth: number;
  totalHeight: number;
}

export interface CharacterBitmap {
  char: string;
  width: number;
  height: number;
  data: boolean[][];
}

export interface FontDefinition {
  name: string;
  charWidth: number;
  charHeight: number;
  spacing: number;
  characters: Record<string, boolean[][]>;
}

export interface TransitionContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  config: DotMatrixConfig;
  currentMatrix: boolean[][];
  nextMatrix: boolean[][];
  progress: number;
  color: string;
  backgroundColor: string;
}

export interface EffectRenderer {
  render(_context: TransitionContext): void;
}
