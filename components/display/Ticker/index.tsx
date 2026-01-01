import React, { useEffect, useMemo, useRef, useState } from "react";

import { StyledCharacter, StyledTicker, StyledTickerViewport } from "./styles";
import type { TickerProps } from "./types";

const Ticker: React.FC<TickerProps> = ({
  messages,
  speed = 8, // Characters per second (slower for character switching)
  separator = " ••• ",
  width,
  height,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const viewport = containerRef.current.querySelector(
          "div",
        ) as HTMLDivElement;
        if (viewport) {
          setContainerWidth(viewport.clientWidth);
        }
      }
    };

    const timer = setTimeout(updateWidth, 100); // Small delay to ensure DOM is ready
    window.addEventListener("resize", updateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // Calculate character width for fixed-width font (20px Courier New bold)
  const characterWidth = 12; // Approximate width in pixels

  // Calculate how many characters fit in the container
  const charactersPerLine = useMemo(() => {
    return Math.floor(containerWidth / characterWidth);
  }, [containerWidth]);

  // Prepare the continuous message string with trailing padding
  const continuousMessage = useMemo(() => {
    if (messages.length === 0) return "";

    const joinedMessages = messages.join(separator);

    // Add trailing padding equal to screen width so last character scrolls out of view
    const trailingPadding = " ".repeat(charactersPerLine || 50);

    return joinedMessages + trailingPadding;
  }, [messages, separator, charactersPerLine]);

  // Character switching animation
  useEffect(() => {
    if (continuousMessage.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % continuousMessage.length);
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [continuousMessage.length, speed]);

  // Get visible characters based on current position
  const visibleText = useMemo(() => {
    if (!continuousMessage || charactersPerLine === 0) return "";

    const startIndex = currentIndex;
    let visibleChars = "";

    for (let i = 0; i < charactersPerLine; i++) {
      const charIndex = (startIndex + i) % continuousMessage.length;
      visibleChars += continuousMessage[charIndex];
    }

    return visibleChars;
  }, [continuousMessage, currentIndex, charactersPerLine]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <StyledTicker
      ref={containerRef}
      $width={width}
      $height={height}
      className={className}
    >
      <StyledTickerViewport>
        {visibleText.split("").map((char, index) => (
          <StyledCharacter key={index} $charWidth={characterWidth}>
            {char}
          </StyledCharacter>
        ))}
      </StyledTickerViewport>
    </StyledTicker>
  );
};

export default Ticker;
