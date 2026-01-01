import { Z_INDEX } from "constants/zIndex";
import styled from "styled-components";

interface StyledBackdropProps {
  $isVisible: boolean;
}

export const StyledBackdrop = styled.div<StyledBackdropProps>`
  position: fixed;
  inset: 0 0 0 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: ${Z_INDEX.OVERLAY};
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};
`;
