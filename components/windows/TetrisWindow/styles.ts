import {
  createStyledHeader,
  createStyledIframe,
  createStyledWindow,
  StyledResetButton,
  StyledResizeHandle,
} from "components/windows/shared/styles";

// Tetris-specific window (no fixed dimensions)
export const StyledTetrisWindow = createStyledWindow();

// Tetris-specific header (orange gradient)
export const StyledHeader = createStyledHeader("#fa8072", "#ff8c00");

// Tetris-specific iframe (black background)
export const StyledIframe = createStyledIframe("#000");

// Re-export shared components
export { StyledResetButton, StyledResizeHandle };
