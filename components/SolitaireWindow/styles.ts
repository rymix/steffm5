import styled from "styled-components";

interface WindowProps {
  $isDragging: boolean;
  $isResizing: boolean;
}

export const StyledSolitaireWindow = styled.div<WindowProps>`
  position: fixed;
  background: #1a5f1a;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "default")};
  user-select: none;
  display: flex;
  flex-direction: column;
  opacity: ${({ $isResizing }) => ($isResizing ? "0.8" : "1")};
  transition: opacity 0.2s;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const StyledHeader = styled.div`
  background: linear-gradient(to bottom, #2d8f2d 0%, #1a5f1a 100%);
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);

  &:active {
    cursor: grabbing;
  }

  h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  div {
    display: flex;
    gap: 8px;
  }
`;

export const StyledResetButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 6px 10px;
  color: #ffffff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:active {
    background: rgba(255, 255, 255, 0.4);
  }
`;

export const StyledIframe = styled.iframe`
  flex: 1;
  border: none;
  width: 100%;
  height: 100%;
  background: #1a5f1a;
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
    transparent 50%,
    rgba(255, 255, 255, 0.3) 50%
  );
  border-radius: 0 0 8px 0;

  &:hover {
    background: linear-gradient(
      135deg,
      transparent 50%,
      rgba(255, 255, 255, 0.5) 50%
    );
  }
`;
