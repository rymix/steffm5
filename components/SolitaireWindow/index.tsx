import React, { useEffect, useRef } from "react";

import { useDraggableWindow } from "../../hooks/useDraggableWindow";
import {
  StyledHeader,
  StyledIframe,
  StyledResetButton,
  StyledResizeHandle,
  StyledSolitaireWindow,
} from "./styles";

import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const SolitaireWindow: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
    width: 520,
    height: 620,
    initialScale: 1.0,
    minScale: 0.5,
    maxScale: 2.0,
    autoCenter: false,
    defaultPosition: {
      x: typeof window !== "undefined" ? window.innerWidth - 640 : 0,
      y: typeof window !== "undefined" ? 50 : 0,
    },
    closeable: true,
    initiallyOpen: false,
    windowLabel: "Solitaire",
    windowIcon: "/solitaire/icon.png",
    resizeMode: "dimensions",
  });

  // Detect when iframe gains focus (user clicked inside)
  useEffect(() => {
    if (!isVisible) return;

    const handleWindowBlur = () => {
      // Small delay to check if iframe is now focused
      setTimeout(() => {
        if (iframeRef.current && document.activeElement === iframeRef.current) {
          bringToFront();
        }
      }, 0);
    };

    window.addEventListener("blur", handleWindowBlur);
    return () => {
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [isVisible, bringToFront]);

  if (!isVisible) return null;

  return (
    <StyledSolitaireWindow
      ref={windowRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      $isDragging={isDragging}
      $isResizing={isResizing}
      style={{ zIndex }}
    >
      <StyledHeader data-draggable="true">
        <h2>Solitaire - Klondike</h2>
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
        src="/solitaire/index.html#klondike?stockDraws=3"
        title="Solitaire Game"
      />
      <StyledResizeHandle
        onMouseDown={handleResizeMouseDown}
        onTouchStart={handleResizeTouchStart}
      />
    </StyledSolitaireWindow>
  );
};

export default SolitaireWindow;
