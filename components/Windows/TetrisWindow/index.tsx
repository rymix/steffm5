import React, { useEffect, useRef } from "react";

import { useWindowManager } from "../../../contexts/windowManager";
import { useDraggableWindow } from "../../../hooks/useDraggableWindow";
import {
  StyledHeader,
  StyledIframe,
  StyledResetButton,
  StyledResizeHandle,
  StyledTetrisWindow,
} from "./styles";

import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const TetrisWindow: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { setGameFocus } = useWindowManager();

  const {
    windowRef,
    isDragging,
    isResizing,
    zIndex,
    isVisible,
    handleMouseDown,
    handleTouchStart,
    handleResizeMouseDown,
    handleResizeTouchStart,
    resetWindow,
    closeWindow,
    bringToFront,
  } = useDraggableWindow({
    width: 640,
    height: 550,
    initialScale: 1.0,
    minScale: 0.5,
    maxScale: 2.0,
    autoCenter: false,
    defaultPosition: {
      x: typeof window !== "undefined" ? 50 : 0,
      y: typeof window !== "undefined" ? 50 : 0,
    },
    closeable: true,
    initiallyOpen: false,
    windowLabel: "Tetris",
    windowIcon: "/icons/tetris.png",
    resizeMode: "dimensions",
  });

  // Detect when iframe is clicked and bring window to front
  useEffect(() => {
    if (!isVisible || !iframeRef.current) return;

    const iframe = iframeRef.current;

    const handleIframeInteraction = () => {
      bringToFront();
      setGameFocus(true);
    };

    const handleBlur = () => {
      if (document.activeElement !== iframe) {
        setGameFocus(false);
      }
    };

    // Add event listener to iframe's content document when it loads
    const setupIframeListeners = () => {
      try {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.addEventListener("mousedown", handleIframeInteraction);
          iframeDoc.addEventListener("touchstart", handleIframeInteraction);
        }
      } catch {
        // Cross-origin iframe, can't access content
      }
    };

    // Setup listeners when iframe loads
    iframe.addEventListener("load", setupIframeListeners);
    // Try to setup immediately in case already loaded
    setupIframeListeners();

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleBlur);

    return () => {
      iframe.removeEventListener("load", setupIframeListeners);
      try {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.removeEventListener("mousedown", handleIframeInteraction);
          iframeDoc.removeEventListener("touchstart", handleIframeInteraction);
        }
      } catch {
        // Ignore cleanup errors
      }
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleBlur);
      setGameFocus(false);
    };
  }, [isVisible, bringToFront, setGameFocus]);

  if (!isVisible) return null;

  return (
    <StyledTetrisWindow
      ref={windowRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      $isDragging={isDragging}
      $isResizing={isResizing}
      style={{ zIndex }}
    >
      <StyledHeader data-draggable="true">
        <h2>Alexey Pajitnov's Tetris - Tetr.js</h2>
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
        src="/tetris/index.html"
        title="Tetris Game"
        $isResizing={isResizing}
      />
      <StyledResizeHandle
        onMouseDown={handleResizeMouseDown}
        onTouchStart={handleResizeTouchStart}
      />
    </StyledTetrisWindow>
  );
};

export default TetrisWindow;
