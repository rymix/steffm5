import { Z_INDEX } from "constants/zIndex";
import styled from "styled-components";

/**
 * Shared styled components for game windows
 * Used by: TetrisWindow, SolitaireWindow, MinesweeperWindow, ZXSpectrumWindow
 */

interface WindowProps {
  $isDragging: boolean;
  $isResizing: boolean;
}

/**
 * Creates a styled window component with optional fixed dimensions
 * @param fixedWidth - Optional fixed width (e.g., "640px")
 * @param fixedHeight - Optional fixed height (e.g., "530px")
 */
export const createStyledWindow = (
  fixedWidth?: string,
  fixedHeight?: string,
) => styled.div<WindowProps>`
  position: fixed;
  top: 0;
  left: 0;
  ${fixedWidth ? `width: ${fixedWidth};` : ""}
  ${fixedHeight ? `height: ${fixedHeight};` : ""}
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
  z-index: ${Z_INDEX.GAME_WINDOWS};
`;

/**
 * Creates a styled header with custom gradient colors
 * @param gradientStart - Start color of gradient (e.g., "#fa8072")
 * @param gradientEnd - End color of gradient (e.g., "#ff8c00")
 * @param includeTextShadow - Whether to include text shadow (default: true)
 */
export const createStyledHeader = (
  gradientStart: string,
  gradientEnd: string,
  includeTextShadow: boolean = true,
) => styled.div`
  height: 50px;
  background: linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%);
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
    ${includeTextShadow ? "text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);" : ""}
  }
`;

/**
 * Creates a styled iframe with custom background color
 * @param backgroundColor - Background color (e.g., "#000", "#fff")
 */
export const createStyledIframe = (backgroundColor: string) => styled.iframe<{
  $isResizing: boolean;
}>`
  width: 100%;
  height: calc(100% - 50px);
  border: none;
  display: block;
  background: ${backgroundColor};
  pointer-events: ${(props) => (props.$isResizing ? "none" : "auto")};
`;

/**
 * Shared resize handle component
 * 100% identical across all windows
 */
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

/**
 * Shared reset button component
 * 100% identical across all windows
 */
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

/**
 * Shared header controls container
 * Used for grouping buttons in header (e.g., volume controls + reset/close)
 */
export const StyledHeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

/**
 * Content container for non-iframe windows (e.g., ZXSpectrum with canvas)
 */
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
