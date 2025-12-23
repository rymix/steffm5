import styled from "styled-components";

interface StyledBackdropProps {
  $isVisible: boolean;
}

export const StyledBackdrop = styled.div<StyledBackdropProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 450; /* Overlay - between pull-out panel and menu */
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};
`;
