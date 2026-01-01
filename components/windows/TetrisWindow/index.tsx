import { useWindowManager } from "contexts/windowManager";
import React, { useRef } from "react";

import {
  StyledHeader,
  StyledIframe,
  StyledResetButton,
  StyledResizeHandle,
  StyledTetrisWindow,
} from "components/windows/TetrisWindow/styles";
import { useDraggableWindow } from "hooks/useDraggableWindow";
import { useIframeInteraction } from "hooks/useIframeInteraction";

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
  useIframeInteraction(iframeRef, isVisible, bringToFront, setGameFocus);

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
