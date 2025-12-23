import React from "react";

import { useDraggableWindow } from "../../hooks/useDraggableWindow";
import {
  StyledContent,
  StyledDummyWindow,
  StyledHeader,
  StyledResetButton,
  StyledResizeHandle,
} from "./styles";

const DummyWindow2: React.FC = () => {
  const {
    windowRef,
    scale,
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
    width: 450,
    height: 350,
    initialScale: 1.0,
    minScale: 0.5,
    maxScale: 2.0,
    autoCenter: false,
    defaultPosition: {
      x: 50,
      y: 50,
    },
    closeable: true,
    initiallyOpen: false,
    windowLabel: "Second Window",
    windowIcon: "🎨",
  });

  if (!isVisible) return null;

  return (
    <StyledDummyWindow
      ref={windowRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      $isDragging={isDragging}
      $isResizing={isResizing}
      style={{ zIndex }}
    >
      <StyledHeader data-draggable="true">
        <h2>Second Window</h2>
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
      <StyledContent>
        <p>This is the second test window.</p>
        <p>Scale: {scale.toFixed(2)}x</p>
        <p>
          Status: {isDragging ? "Dragging" : isResizing ? "Resizing" : "Idle"}
        </p>
        <p>Default position: Top-left (50px, 50px)</p>
        <ul>
          <li>Drag the header to move</li>
          <li>Drag the corner handle to resize</li>
          <li>Click Reset to return to default position</li>
        </ul>
      </StyledContent>
      <StyledResizeHandle
        onMouseDown={handleResizeMouseDown}
        onTouchStart={handleResizeTouchStart}
      />
    </StyledDummyWindow>
  );
};

export default DummyWindow2;
