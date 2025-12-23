import styled from "styled-components";

export const StyledTetrisWindow = styled.div<{
  $isDragging: boolean;
  $isResizing: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 800px;
  height: 650px;
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
  z-index: 1000;
`;

export const StyledHeader = styled.div`
  height: 50px;
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
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
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

export const StyledIframe = styled.iframe`
  width: 100%;
  height: calc(100% - 50px);
  border: none;
  display: block;
  background: #000;
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
