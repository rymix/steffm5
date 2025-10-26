import styled from "styled-components";

export const StyledDotMatrix = styled.div<{
  $width: number;
  $height: number;
}>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;

  background: #000;
  border: 2px solid #333;
  border-radius: 6px;
  padding: 4px;

  /* Pinball machine aesthetic */
  box-shadow:
    inset 2px 2px 4px rgba(255, 255, 255, 0.1),
    inset -2px -2px 4px rgba(0, 0, 0, 0.8),
    0 2px 8px rgba(0, 0, 0, 0.5);

  canvas {
    display: block;
    border-radius: 2px;
  }

  /* Optional TV scan lines effect */
  &::after {
    content: "";
    position: absolute;
    inset: 0 0 0 0;
    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.05) 50%);
    background-size: 100% 3px;
    pointer-events: none;
    border-radius: inherit;
  }
`;

export const StyledMusicDotMatrix = styled(StyledDotMatrix)`
  /* Music-specific styling */
  border-color: #ff6b35;

  box-shadow:
    inset 2px 2px 4px rgba(255, 107, 53, 0.1),
    inset -2px -2px 4px rgba(0, 0, 0, 0.8),
    0 2px 8px rgba(255, 107, 53, 0.3),
    0 0 20px rgba(255, 107, 53, 0.1);
`;
