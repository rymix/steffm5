import styled from "styled-components";

export const StyledZXSpectrumWindow = styled.div<{
  $isDragging: boolean;
  $isResizing: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 640px;
  height: 530px;
  background: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  cursor: ${(props) =>
    props.$isDragging
      ? "grabbing"
      : props.$isResizing
        ? "nwse-resize"
        : "auto"};
  user-select: ${(props) =>
    props.$isDragging || props.$isResizing ? "none" : "auto"};
  z-index: 200; /* Other windows - below player window */
`;

export const StyledHeader = styled.div`
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }

  h2 {
    margin: 0;
    color: white;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const StyledContent = styled.div`
  padding: 0;
  margin: 0;
  height: calc(100% - 50px);
  overflow: hidden;
  background: #000;
  display: block;
  line-height: 0;

  > div {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    line-height: 0;
    display: block;
  }

  canvas {
    display: block;
    margin: 0;
    padding: 0;
  }
`;

export const StyledResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  cursor: nwse-resize;
  background: linear-gradient(
    135deg,
    transparent 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 100%
  );

  &:hover {
    background: linear-gradient(
      135deg,
      transparent 0%,
      transparent 50%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.4) 100%
    );
  }
`;

export const StyledResetButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &:active {
    background: rgba(255, 255, 255, 0.1);
  }
`;
