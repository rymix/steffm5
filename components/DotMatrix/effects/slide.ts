import type { EffectRenderer, TransitionContext } from "../types";

export class SlideLeftEffect implements EffectRenderer {
  render(context: TransitionContext): void {
    const {
      ctx,
      config,
      currentMatrix,
      nextMatrix,
      progress,
      color,
      backgroundColor,
    } = context;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, config.totalWidth, config.totalHeight);

    const slideDistance = config.matrixWidth;
    const currentOffset = Math.floor(progress * slideDistance);
    const nextOffset = currentOffset - slideDistance;

    // Draw current matrix sliding out to the left
    this.drawMatrixWithOffset(context, currentMatrix, currentOffset, 0, color);

    // Draw next matrix sliding in from the right
    this.drawMatrixWithOffset(context, nextMatrix, nextOffset, 0, color);
  }

  private drawMatrixWithOffset(
    context: TransitionContext,
    matrix: boolean[][],
    offsetX: number,
    offsetY: number,
    color: string,
  ): void {
    const { config } = context;

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        const targetX = col + offsetX;
        const targetY = row + offsetY;

        if (
          targetX >= 0 &&
          targetX < config.matrixWidth &&
          targetY >= 0 &&
          targetY < config.matrixHeight &&
          matrix[row][col]
        ) {
          this.drawDot(context, targetX, targetY, color);
        }
      }
    }
  }

  private drawDot(
    context: TransitionContext,
    x: number,
    y: number,
    color: string,
  ): void {
    const { ctx, config } = context;
    const pixelX = x * (config.dotSize + config.dotSpacing);
    const pixelY = y * (config.dotSize + config.dotSpacing);

    ctx.fillStyle = color;
    ctx.fillRect(pixelX, pixelY, config.dotSize, config.dotSize);

    // Add glow
    ctx.shadowBlur = 4;
    ctx.shadowColor = color;
    ctx.fillRect(pixelX, pixelY, config.dotSize, config.dotSize);
    ctx.shadowBlur = 0;
  }
}

export class SlideRightEffect implements EffectRenderer {
  render(context: TransitionContext): void {
    const {
      ctx,
      config,
      currentMatrix,
      nextMatrix,
      progress,
      color,
      backgroundColor,
    } = context;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, config.totalWidth, config.totalHeight);

    const slideDistance = config.matrixWidth;
    const currentOffset = -Math.floor(progress * slideDistance);
    const nextOffset = slideDistance + currentOffset;

    // Draw current matrix sliding out to the right
    this.drawMatrixWithOffset(context, currentMatrix, currentOffset, 0, color);

    // Draw next matrix sliding in from the left
    this.drawMatrixWithOffset(context, nextMatrix, nextOffset, 0, color);
  }

  private drawMatrixWithOffset(
    context: TransitionContext,
    matrix: boolean[][],
    offsetX: number,
    offsetY: number,
    color: string,
  ): void {
    const { config } = context;

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        const targetX = col + offsetX;
        const targetY = row + offsetY;

        if (
          targetX >= 0 &&
          targetX < config.matrixWidth &&
          targetY >= 0 &&
          targetY < config.matrixHeight &&
          matrix[row][col]
        ) {
          this.drawDot(context, targetX, targetY, color);
        }
      }
    }
  }

  private drawDot(
    context: TransitionContext,
    x: number,
    y: number,
    color: string,
  ): void {
    const { ctx, config } = context;
    const pixelX = x * (config.dotSize + config.dotSpacing);
    const pixelY = y * (config.dotSize + config.dotSpacing);

    ctx.fillStyle = color;
    ctx.fillRect(pixelX, pixelY, config.dotSize, config.dotSize);

    // Add glow
    ctx.shadowBlur = 4;
    ctx.shadowColor = color;
    ctx.fillRect(pixelX, pixelY, config.dotSize, config.dotSize);
    ctx.shadowBlur = 0;
  }
}

export class SlideUpEffect implements EffectRenderer {
  render(context: TransitionContext): void {
    const {
      ctx,
      config,
      currentMatrix,
      nextMatrix,
      progress,
      color,
      backgroundColor,
    } = context;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, config.totalWidth, config.totalHeight);

    const slideDistance = config.matrixHeight;
    const currentOffset = Math.floor(progress * slideDistance);
    const nextOffset = currentOffset - slideDistance;

    // Draw current matrix sliding up
    this.drawMatrixWithOffset(context, currentMatrix, 0, currentOffset, color);

    // Draw next matrix sliding in from bottom
    this.drawMatrixWithOffset(context, nextMatrix, 0, nextOffset, color);
  }

  private drawMatrixWithOffset(
    context: TransitionContext,
    matrix: boolean[][],
    offsetX: number,
    offsetY: number,
    color: string,
  ): void {
    const { config } = context;

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        const targetX = col + offsetX;
        const targetY = row + offsetY;

        if (
          targetX >= 0 &&
          targetX < config.matrixWidth &&
          targetY >= 0 &&
          targetY < config.matrixHeight &&
          matrix[row][col]
        ) {
          this.drawDot(context, targetX, targetY, color);
        }
      }
    }
  }

  private drawDot(
    context: TransitionContext,
    x: number,
    y: number,
    color: string,
  ): void {
    const { ctx, config } = context;
    const pixelX = x * (config.dotSize + config.dotSpacing);
    const pixelY = y * (config.dotSize + config.dotSpacing);

    ctx.fillStyle = color;
    ctx.fillRect(pixelX, pixelY, config.dotSize, config.dotSize);

    // Add glow
    ctx.shadowBlur = 4;
    ctx.shadowColor = color;
    ctx.fillRect(pixelX, pixelY, config.dotSize, config.dotSize);
    ctx.shadowBlur = 0;
  }
}

export class SlideDownEffect implements EffectRenderer {
  render(context: TransitionContext): void {
    const {
      ctx,
      config,
      currentMatrix,
      nextMatrix,
      progress,
      color,
      backgroundColor,
    } = context;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, config.totalWidth, config.totalHeight);

    const slideDistance = config.matrixHeight;
    const currentOffset = -Math.floor(progress * slideDistance);
    const nextOffset = slideDistance + currentOffset;

    // Draw current matrix sliding down
    this.drawMatrixWithOffset(context, currentMatrix, 0, currentOffset, color);

    // Draw next matrix sliding in from top
    this.drawMatrixWithOffset(context, nextMatrix, 0, nextOffset, color);
  }

  private drawMatrixWithOffset(
    context: TransitionContext,
    matrix: boolean[][],
    offsetX: number,
    offsetY: number,
    color: string,
  ): void {
    const { config } = context;

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        const targetX = col + offsetX;
        const targetY = row + offsetY;

        if (
          targetX >= 0 &&
          targetX < config.matrixWidth &&
          targetY >= 0 &&
          targetY < config.matrixHeight &&
          matrix[row][col]
        ) {
          this.drawDot(context, targetX, targetY, color);
        }
      }
    }
  }

  private drawDot(
    context: TransitionContext,
    x: number,
    y: number,
    color: string,
  ): void {
    const { ctx, config } = context;
    const pixelX = x * (config.dotSize + config.dotSpacing);
    const pixelY = y * (config.dotSize + config.dotSpacing);

    ctx.fillStyle = color;
    ctx.fillRect(pixelX, pixelY, config.dotSize, config.dotSize);

    // Add glow
    ctx.shadowBlur = 4;
    ctx.shadowColor = color;
    ctx.fillRect(pixelX, pixelY, config.dotSize, config.dotSize);
    ctx.shadowBlur = 0;
  }
}
