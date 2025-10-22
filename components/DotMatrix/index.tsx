import React, { useCallback, useEffect, useRef, useState } from "react";

import { CanvasRenderer } from "./canvas";
import {
  SlideDownEffect,
  SlideLeftEffect,
  SlideRightEffect,
  SlideUpEffect,
} from "./effects/slide";
import { textToBitmap } from "./fonts/matrix-font";
import { StyledDotMatrix } from "./styles";
import type {
  DotMatrixConfig,
  DotMatrixProps,
  TransitionEffect,
} from "./types";

const DotMatrix: React.FC<DotMatrixProps> = ({
  width = 120,
  height = 32,
  dotSize = 2,
  dotSpacing = 1,
  text,
  color = "#ff6b35",
  backgroundColor = "#000000",
  transitionEffect = "slideLeft",
  transitionDuration = 1000,
  className,
  onTransitionComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [nextText, setNextText] = useState<string | null>(null);
  const [animationStart, setAnimationStart] = useState<number>(0);

  // Calculate matrix configuration
  const config: DotMatrixConfig = {
    matrixWidth: Math.floor(width / (dotSize + dotSpacing)),
    matrixHeight: Math.floor(height / (dotSize + dotSpacing)),
    dotSize,
    dotSpacing,
    totalWidth: width,
    totalHeight: height,
  };

  // Initialize canvas renderer
  useEffect(() => {
    if (canvasRef.current) {
      rendererRef.current = new CanvasRenderer(canvasRef.current, config);
    }
  }, [config]);

  // Effect renderers
  const getEffectRenderer = useCallback((effect: TransitionEffect) => {
    switch (effect) {
      case "slideLeft":
        return new SlideLeftEffect();
      case "slideRight":
        return new SlideRightEffect();
      case "slideUp":
        return new SlideUpEffect();
      case "slideDown":
        return new SlideDownEffect();
      default:
        return new SlideLeftEffect();
    }
  }, []);

  // Animation loop
  const animate = useCallback(
    (timestamp: number) => {
      if (!rendererRef.current || !nextText) return;

      const elapsed = timestamp - animationStart;
      const progress = Math.min(elapsed / transitionDuration, 1);

      const currentMatrix = rendererRef.current.padMatrixToSize(
        textToBitmap(currentText),
        config.matrixWidth,
        config.matrixHeight,
      );

      const nextMatrix = rendererRef.current.padMatrixToSize(
        textToBitmap(nextText),
        config.matrixWidth,
        config.matrixHeight,
      );

      const context = rendererRef.current.createTransitionContext(
        currentMatrix,
        nextMatrix,
        progress,
        color,
        backgroundColor,
      );

      const utils = getEffectRenderer(transitionEffect);
      utils.render(context);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        setCurrentText(nextText);
        setNextText(null);
        setIsAnimating(false);
        onTransitionComplete?.();
      }
    },
    [
      animationStart,
      transitionDuration,
      currentText,
      nextText,
      config,
      color,
      backgroundColor,
      transitionEffect,
      getEffectRenderer,
      onTransitionComplete,
    ],
  );

  // Handle text changes
  useEffect(() => {
    if (text !== currentText && !isAnimating) {
      if (transitionEffect === "none") {
        setCurrentText(text);
        if (rendererRef.current) {
          rendererRef.current.clear(backgroundColor);
          const matrix = rendererRef.current.padMatrixToSize(
            textToBitmap(text),
            config.matrixWidth,
            config.matrixHeight,
          );
          rendererRef.current.drawMatrix(matrix, color);
        }
      } else {
        setNextText(text);
        setIsAnimating(true);
        setAnimationStart(performance.now());
      }
    }
  }, [
    text,
    currentText,
    isAnimating,
    transitionEffect,
    backgroundColor,
    config,
    color,
  ]);

  // Start animation when nextText is set
  useEffect(() => {
    if (nextText && isAnimating) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [nextText, isAnimating, animate]);

  // Initial render
  useEffect(() => {
    if (rendererRef.current && !isAnimating) {
      rendererRef.current.clear(backgroundColor);
      const matrix = rendererRef.current.padMatrixToSize(
        textToBitmap(currentText),
        config.matrixWidth,
        config.matrixHeight,
      );
      rendererRef.current.drawMatrix(matrix, color);
    }
  }, [currentText, backgroundColor, config, color, isAnimating]);

  return (
    <StyledDotMatrix $width={width} $height={height} className={className}>
      <canvas
        ref={canvasRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          imageRendering: "pixelated",
        }}
      />
    </StyledDotMatrix>
  );
};

export default DotMatrix;
