import React, { useRef } from "react";

import { useWindowManager } from "../../../contexts/windowManager";
import { useDraggableWindow } from "../../../hooks/useDraggableWindow";
import { useIframeInteraction } from "../../../hooks/useIframeInteraction";
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
    width: 720,
    height: 570,
    initialScale: 1.0,
    minScale: 0.5,
    maxScale: 2.0,
    autoCenter: false,
    defaultPosition: {
      x: typeof window !== "undefined" ? window.innerWidth - 740 : 0,
      y: typeof window !== "undefined" ? 30 : 0,
    },
    closeable: true,
    initiallyOpen: false,
    windowLabel: "Klondike Solitaire",
    windowIcon: "/icons/solitaire.png",
    resizeMode: "dimensions",
  });

  // Detect when iframe is clicked and bring window to front
  useIframeInteraction(iframeRef, isVisible, bringToFront, setGameFocus);

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
        <h2>Retro Card Game</h2>
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
        src="/solitaire/index.html"
        title="Klondike Solitaire Game"
        $isResizing={isResizing}
      />
      <StyledResizeHandle
        onMouseDown={handleResizeMouseDown}
        onTouchStart={handleResizeTouchStart}
      />
    </StyledSolitaireWindow>
  );
};

export default SolitaireWindow;
