import React from "react";

import { useDraggableWindow } from "../../hooks/useDraggableWindow";
import {
  StyledContent,
  StyledDummyWindow,
  StyledHeader,
  StyledResetButton,
  StyledResizeHandle,
} from "./styles";

const DummyWindow: React.FC = () => {
  const {
    windowRef,
    scale,
    isDragging,
    isResizing,
    handleMouseDown,
    handleTouchStart,
    handleResizeMouseDown,
    handleResizeTouchStart,
    resetWindow,
  } = useDraggableWindow({
    width: 400,
    height: 300,
    initialScale: 1.0,
    minScale: 0.5,
    maxScale: 2.0,
    autoCenter: true,
  });

  return (
    <StyledDummyWindow
      ref={windowRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      $isDragging={isDragging}
      $isResizing={isResizing}
    >
      <StyledHeader data-draggable="true">
        <h2>Dummy Window</h2>
        <StyledResetButton onClick={resetWindow}>Reset</StyledResetButton>
      </StyledHeader>
      <StyledContent>
        <p>This is a test window using the useDraggableWindow hook.</p>
        <p>Scale: {scale.toFixed(2)}x</p>
        <p>
          Status: {isDragging ? "Dragging" : isResizing ? "Resizing" : "Idle"}
        </p>
        <ul>
          <li>Drag the header to move</li>
          <li>Drag the corner handle to resize</li>
          <li>Click Reset to return to center</li>
        </ul>
      </StyledContent>
      <StyledResizeHandle
        onMouseDown={handleResizeMouseDown}
        onTouchStart={handleResizeTouchStart}
      />
    </StyledDummyWindow>
  );
};

export default DummyWindow;
