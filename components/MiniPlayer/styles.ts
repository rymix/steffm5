import styled from "styled-components";

export const StyledMiniPlayer = styled.div<{
  $x: number;
  $y: number;
  $isDragging: boolean;
  $isVisible: boolean;
}>`
  position: fixed;
  top: ${({ $y }) => $y}px;
  left: ${({ $x }) => $x}px;
  width: 320px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "grab")};
  user-select: none;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform: ${({ $isVisible }) => ($isVisible ? "scale(1)" : "scale(0.8)")};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};
  transition: ${({ $isDragging }) =>
    $isDragging ? "none" : "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"};

  &:hover {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
  }
`;

export const StyledMiniPlayerHeader = styled.div`
  padding: 12px 16px 8px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledMiniPlayerTitle = styled.div`
  color: white;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.9;
`;

export const StyledCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  opacity: 0.7;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const StyledMiniPlayerContent = styled.div`
  padding: 12px 16px 16px 16px;
`;

export const StyledTrackInfo = styled.div`
  margin-bottom: 12px;
`;

export const StyledMixName = styled.div`
  color: white;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledTrackName = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledMiniProgressContainer = styled.div`
  margin-bottom: 12px;
`;

export const StyledMiniProgressTrack = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
`;

export const StyledMiniProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: white;
  border-radius: 2px;
  transition: width 0.1s ease;
  width: ${({ $progress }) => $progress}%;
`;

export const StyledTimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.7);
  font-size: 9px;
  margin-top: 4px;
`;

export const StyledMiniControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const StyledMiniControlButton = styled.button<{ $variant?: string }>`
  background: ${({ $variant }) =>
    $variant === "primary"
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(255, 255, 255, 0.1)"};
  color: ${({ $variant }) => ($variant === "primary" ? "#667eea" : "white")};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: ${({ $variant }) => ($variant === "primary" ? "44px" : "32px")};
  height: ${({ $variant }) => ($variant === "primary" ? "44px" : "32px")};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $variant }) => ($variant === "primary" ? "14px" : "12px")};
  font-weight: 600;

  &:hover {
    background: ${({ $variant }) =>
      $variant === "primary" ? "white" : "rgba(255, 255, 255, 0.2)"};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

export const StyledVolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const StyledVolumeIcon = styled.span`
  color: white;
  font-size: 12px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

export const StyledMiniVolumeSlider = styled.input`
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
`;
