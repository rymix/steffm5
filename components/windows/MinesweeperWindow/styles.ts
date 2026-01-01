import {
  createStyledHeader,
  createStyledIframe,
  createStyledWindow,
  StyledResetButton,
} from "components/windows/shared/styles";

// Minesweeper-specific window (no fixed dimensions, dynamic sizing)
export const StyledMinesweeperWindow = createStyledWindow();

// Minesweeper-specific header (purple gradient)
export const StyledHeader = createStyledHeader("#6b46c1", "#9333ea");

// Minesweeper-specific iframe (white background)
export const StyledIframe = createStyledIframe("#fff");

// Re-export shared components
export { StyledResetButton };
