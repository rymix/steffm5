import React, { useEffect, useRef } from "react";

import { useWindowManager } from "../../contexts/windowManager";
import { useDraggableWindow } from "../../hooks/useDraggableWindow";
import {
  StyledHeader,
  StyledIframe,
  StyledMinesweeperWindow,
  StyledResetButton,
} from "./styles";

import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const MinesweeperWindow: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { setGameFocus } = useWindowManager();
  const currentDimensionsRef = useRef<{ width: number; height: number } | null>(
    null,
  );

  const {
    windowRef,
    isDragging,
    isResizing,
    zIndex,
    isVisible,
    handleMouseDown,
    handleTouchStart,
    resetWindow,
    closeWindow,
    bringToFront,
  } = useDraggableWindow({
    width: 800,
    height: 600,
    initialScale: 1.0,
    minScale: 0.5,
    maxScale: 2.0,
    autoCenter: false,
    defaultPosition: {
      x: typeof window !== "undefined" ? window.innerWidth - 850 : 0,
      y: typeof window !== "undefined" ? 50 : 0,
    },
    closeable: true,
    initiallyOpen: false,
    windowLabel: "Minesweeper",
    windowIcon: "/icons/minesweeper.png",
    resizeMode: "dimensions",
    disableViewportResize: true,
  });

  // Detect when iframe is clicked/focused and bring window to front
  useEffect(() => {
    if (!isVisible) return;

    const handleWindowBlur = () => {
      // Check if focus moved to the iframe
      setTimeout(() => {
        if (iframeRef.current && document.activeElement === iframeRef.current) {
          bringToFront();
          setGameFocus(true);
        }
      }, 0);
    };

    const handleWindowFocus = () => {
      // Check if focus left the iframe
      setTimeout(() => {
        if (
          !iframeRef.current ||
          document.activeElement !== iframeRef.current
        ) {
          setGameFocus(false);
        }
      }, 0);
    };

    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      setGameFocus(false);
    };
  }, [isVisible, bringToFront, setGameFocus]);

  // Handle viewport resize - constrain window position to stay within viewport
  useEffect(() => {
    if (!isVisible) return;

    const handleViewportResize = () => {
      if (!windowRef.current || !currentDimensionsRef.current) return;

      const { width, height } = currentDimensionsRef.current;

      // Get current position from translate
      const computedStyle = window.getComputedStyle(windowRef.current);
      const translate = computedStyle.translate;
      const [currentX, currentY] = translate
        .split(" ")
        .map((v) => parseFloat(v) || 0);

      // Calculate constrained position to keep window fully within viewport
      const maxX = Math.max(0, window.innerWidth - width);
      const maxY = Math.max(0, window.innerHeight - height);

      const constrainedX = Math.max(0, Math.min(maxX, currentX));
      const constrainedY = Math.max(0, Math.min(maxY, currentY));

      // Update position if needed
      if (constrainedX !== currentX || constrainedY !== currentY) {
        windowRef.current.style.translate = `${constrainedX}px ${constrainedY}px`;
      }
    };

    window.addEventListener("resize", handleViewportResize);
    return () => {
      window.removeEventListener("resize", handleViewportResize);
    };
  }, [isVisible, windowRef]);

  // Listen for resize messages from iframe
  useEffect(() => {
    if (!isVisible) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "minesweeper-resize") {
        const { width, height } = event.data;
        if (windowRef.current && width && height) {
          // Add header height (50px) to the height
          const totalHeight = height + 50;

          // Store dimensions for viewport resize handler
          currentDimensionsRef.current = { width, height: totalHeight };

          // Set new dimensions
          windowRef.current.style.width = `${width}px`;
          windowRef.current.style.height = `${totalHeight}px`;

          // Manually constrain position using actual DOM dimensions
          // Use double requestAnimationFrame to ensure dimensions are fully applied
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!windowRef.current) return;

              // Get actual dimensions from DOM
              const rect = windowRef.current.getBoundingClientRect();
              const actualWidth = rect.width;
              const actualHeight = rect.height;

              // Get current position from translate
              const computedStyle = window.getComputedStyle(windowRef.current);
              const translate = computedStyle.translate;
              const [currentX, currentY] = translate
                .split(" ")
                .map((v) => parseFloat(v) || 0);

              // Calculate constrained position
              const maxX = Math.max(0, window.innerWidth - actualWidth);
              const maxY = Math.max(0, window.innerHeight - actualHeight);

              const constrainedX = Math.max(0, Math.min(maxX, currentX));
              const constrainedY = Math.max(0, Math.min(maxY, currentY));

              // Only update if position needs to change
              if (constrainedX !== currentX || constrainedY !== currentY) {
                windowRef.current.style.translate = `${constrainedX}px ${constrainedY}px`;
              }
            });
          });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isVisible, windowRef]);

  if (!isVisible) return null;

  return (
    <StyledMinesweeperWindow
      ref={windowRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      $isDragging={isDragging}
      $isResizing={isResizing}
      style={{ zIndex }}
    >
      <StyledHeader data-draggable="true">
        <h2>Minesweeper</h2>
        <div>
          <StyledResetButton
            onClick={resetWindow}
            title="Reset position and size"
          >
            <RestartAltIcon style={{ fontSize: "16px" }} />
          </StyledResetButton>
          <StyledResetButton
            onClick={closeWindow}
            style={{ marginLeft: "8px" }}
            title="Close window"
          >
            <CloseIcon style={{ fontSize: "16px" }} />
          </StyledResetButton>
        </div>
      </StyledHeader>
      <StyledIframe
        ref={iframeRef}
        src="/minesweeper/index.html"
        title="Minesweeper Game"
        $isResizing={isResizing}
      />
    </StyledMinesweeperWindow>
  );
};

export default MinesweeperWindow;
