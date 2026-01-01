import {
  createStyledHeader,
  createStyledIframe,
  createStyledWindow,
  StyledResetButton,
  StyledResizeHandle,
} from "components/windows/shared/styles";

// Solitaire-specific window (no fixed dimensions)
export const StyledSolitaireWindow = createStyledWindow();

// Solitaire-specific header (green gradient)
export const StyledHeader = createStyledHeader("#286816", "#215f0f");

// Solitaire-specific iframe (white background for card table)
export const StyledIframe = createStyledIframe("#fff");

// Re-export shared components
export { StyledResetButton, StyledResizeHandle };
