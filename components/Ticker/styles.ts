import styled from "styled-components";

export const StyledTicker = styled.div<{
  $width?: string | number;
  $height?: string | number;
}>`
  width: ${({ $width }) =>
    typeof $width === "number" ? `${$width}px` : $width || "100%"};
  height: ${({ $height }) =>
    typeof $height === "number" ? `${$height}px` : $height || "50px"};

  background: #000;
  border: 2px inset #666;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  /* 90s tech aesthetic */
  box-shadow:
    inset 2px 2px 4px rgba(255, 255, 255, 0.2),
    inset -2px -2px 4px rgba(0, 0, 0, 0.5),
    0 1px 3px rgba(0, 0, 0, 0.3);
`;

export const StyledTickerViewport = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  font-family: "Courier New", "Monaco", "Lucida Console", monospace;
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
  letter-spacing: 0.05em;

  /* Classic green-on-black terminal look */
  color: #00ff41;
  text-shadow:
    0 0 8px #00ff41,
    0 0 12px #00ff41;
`;

export const StyledCharacter = styled.span<{
  $charWidth: number;
}>`
  display: inline-block;
  width: ${({ $charWidth }) => $charWidth}px;
  text-align: center;
  position: relative;
  white-space: pre;
`;

/* Alternative amber theme for variety */
export const StyledTickerAmber = styled(StyledTicker)`
  background: #2a1810;
  border-color: #8b4513;

  ${StyledTickerViewport} {
    color: #ffb000;
    text-shadow:
      0 0 8px #ffb000,
      0 0 12px #ffb000;
  }
`;

/* Blue terminal theme */
export const StyledTickerBlue = styled(StyledTicker)`
  background: #000040;
  border-color: #4444aa;

  ${StyledTickerViewport} {
    color: #66aaff;
    text-shadow:
      0 0 8px #66aaff,
      0 0 12px #66aaff;
  }
`;
