import React from "react";

import { useDraggableWindow } from "../../hooks/useDraggableWindow";
import {
  StyledHeader,
  StyledIframe,
  StyledResetButton,
  StyledResizeHandle,
  StyledTetrisWindow,
} from "./styles";

const TetrisWindow: React.FC = () => {
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
  } = useDraggableWindow({
    width: 800,
    height: 650,
    initialScale: 1.0,
    minScale: 0.5,
    maxScale: 2.0,
    autoCenter: false,
    defaultPosition: {
      x: typeof window !== "undefined" ? 100 : 0,
      y: typeof window !== "undefined" ? 100 : 0,
    },
    closeable: true,
    initiallyOpen: false,
    windowLabel: "Tetris",
    windowIcon: "🧱",
  });

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
        <h2>Tetr.js - HTML5 Tetris</h2>
        <div>
          <StyledResetButton onClick={resetWindow}>Reset</StyledResetButton>
          <StyledResetButton
            onClick={closeWindow}
            style={{ marginLeft: "8px" }}
          >
            Close
          </StyledResetButton>
        </div>
      </StyledHeader>
      <StyledIframe src="/tetris/index.html" title="Tetris Game" />
      <StyledResizeHandle
        onMouseDown={handleResizeMouseDown}
        onTouchStart={handleResizeTouchStart}
      />
    </StyledTetrisWindow>
  );
};

export default TetrisWindow;
