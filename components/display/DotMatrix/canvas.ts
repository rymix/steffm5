import type { DotMatrixConfig, TransitionContext } from "./types";

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: DotMatrixConfig;

  constructor(canvas: HTMLCanvasElement, config: DotMatrixConfig) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.config = config;

    // Set canvas size
    canvas.width = config.totalWidth;
    canvas.height = config.totalHeight;

    // Set high DPI support
    const devicePixelRatio = window.devicePixelRatio || 1;
    if (devicePixelRatio > 1) {
      canvas.width = config.totalWidth * devicePixelRatio;
      canvas.height = config.totalHeight * devicePixelRatio;
      canvas.style.width = config.totalWidth + "px";
      canvas.style.height = config.totalHeight + "px";
      this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }
  }

  public clear(backgroundColor: string = "#000000"): void {
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, this.config.totalWidth, this.config.totalHeight);
  }

  public drawDot(
    x: number,
    y: number,
    isOn: boolean,
    color: string,
    alpha: number = 1,
  ): void {
    const pixelX = x * (this.config.dotSize + this.config.dotSpacing);
    const pixelY = y * (this.config.dotSize + this.config.dotSpacing);

    if (isOn) {
      // Draw lit dot
      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = alpha;
      this.ctx.fillRect(
        pixelX,
        pixelY,
        this.config.dotSize,
        this.config.dotSize,
      );

      // Add glow effect
      if (alpha > 0.5) {
        this.ctx.shadowBlur = 4;
        this.ctx.shadowColor = color;
        this.ctx.fillRect(
          pixelX,
          pixelY,
          this.config.dotSize,
          this.config.dotSize,
        );
        this.ctx.shadowBlur = 0;
      }
    } else {
      // Draw dim dot (off state)
      this.ctx.fillStyle = this.adjustColorBrightness(color, -0.8);
      this.ctx.globalAlpha = 0.1;
      this.ctx.fillRect(
        pixelX,
        pixelY,
        this.config.dotSize,
        this.config.dotSize,
      );
    }

    this.ctx.globalAlpha = 1;
  }

  public drawMatrix(matrix: boolean[][], color: string): void {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (row < this.config.matrixHeight && col < this.config.matrixWidth) {
          this.drawDot(col, row, matrix[row][col], color);
        }
      }
    }
  }

  public drawMatrixWithMask(
    matrix: boolean[][],
    maskMatrix: boolean[][],
    color: string,
    alpha: number = 1,
  ): void {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (row < this.config.matrixHeight && col < this.config.matrixWidth) {
          const shouldDraw =
            matrix[row][col] && maskMatrix[row] && maskMatrix[row][col];
          if (shouldDraw) {
            this.drawDot(col, row, true, color, alpha);
          }
        }
      }
    }
  }

  public drawMatrixCentered(matrix: boolean[][], color: string): void {
    if (matrix.length === 0) return;

    const matrixWidth = matrix[0].length;
    const matrixHeight = matrix.length;

    const offsetX = Math.floor((this.config.matrixWidth - matrixWidth) / 2);
    const offsetY = Math.floor((this.config.matrixHeight - matrixHeight) / 2);

    for (let row = 0; row < matrixHeight; row++) {
      for (let col = 0; col < matrixWidth; col++) {
        const targetX = col + offsetX;
        const targetY = row + offsetY;

        if (
          targetX >= 0 &&
          targetX < this.config.matrixWidth &&
          targetY >= 0 &&
          targetY < this.config.matrixHeight
        ) {
          this.drawDot(targetX, targetY, matrix[row][col], color);
        }
      }
    }
  }

  public createTransitionContext(
    currentMatrix: boolean[][],
    nextMatrix: boolean[][],
    progress: number,
    color: string,
    backgroundColor: string,
  ): TransitionContext {
    return {
      canvas: this.canvas,
      ctx: this.ctx,
      config: this.config,
      currentMatrix,
      nextMatrix,
      progress,
      color,
      backgroundColor,
    };
  }

  private adjustColorBrightness(color: string, amount: number): string {
    // Simple color brightness adjustment
    if (color.startsWith("#")) {
      const hex = color.slice(1);
      const num = parseInt(hex, 16);
      const r = Math.max(0, Math.min(255, (num >> 16) + amount * 255));
      const g = Math.max(
        0,
        Math.min(255, ((num >> 8) & 0x00ff) + amount * 255),
      );
      const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount * 255));
      return `rgb(${r}, ${g}, ${b})`;
    }
    return color;
  }

  public padMatrixToSize(
    matrix: boolean[][],
    targetWidth: number,
    targetHeight: number,
  ): boolean[][] {
    const result: boolean[][] = Array(targetHeight)
      .fill(null)
      .map(() => Array(targetWidth).fill(false));

    const offsetX = Math.floor((targetWidth - (matrix[0]?.length || 0)) / 2);
    const offsetY = Math.floor((targetHeight - matrix.length) / 2);

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < (matrix[row]?.length || 0); col++) {
        const targetX = col + offsetX;
        const targetY = row + offsetY;

        if (
          targetX >= 0 &&
          targetX < targetWidth &&
          targetY >= 0 &&
          targetY < targetHeight
        ) {
          result[targetY][targetX] = matrix[row][col];
        }
      }
    }

    return result;
  }
}
