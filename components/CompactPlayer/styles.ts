import styled, { createGlobalStyle } from "styled-components";

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'DSEG14Classic';
    src: url('/fonts/DSEG14Classic-Regular.woff2') format('woff2'),
         url('/fonts/DSEG14Classic-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

export const StyledCompactPlayer = styled.div`
  width: 100%;
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url("/textures/dark-walnut.jpg");
  background-size: cover;
  padding: 16px;
  box-shadow:
    inset 2px 2px 4px rgba(255, 255, 255, 0.2),
    inset -1px -1px 3px rgba(0, 0, 0, 0.3);
`;

export const StyledDisplay = styled.div`
  width: 100%;
  background: #2a3a2a;
  border: 2px solid #1a1a1a;
  border-radius: 3px;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.6),
    inset 0 -1px 2px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  margin-bottom: 12px;
`;

export const StyledDisplayText = styled.div`
  font-family: "DSEG14Classic", monospace;
  font-size: 14px;
  font-weight: normal;
  color: #9fdf9f;
  text-shadow:
    0 0 8px rgba(159, 223, 159, 0.8),
    0 0 4px rgba(159, 223, 159, 0.6);
  letter-spacing: 0.8px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 4px;
  position: relative;

  &::after {
    content: "~~~~~~~~~~~~~~~~~~~~"; /* 20 tildes for unlit segments */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: rgba(159, 223, 159, 0.08);
    text-shadow: none;
    pointer-events: none;
    z-index: 0;
  }

  & {
    position: relative;
    z-index: 1;
  }
`;

export const StyledDisplayProgress = styled.div`
  font-family: "DSEG14Classic", monospace;
  font-size: 14px;
  font-weight: normal;
  color: #9fdf9f;
  text-shadow:
    0 0 8px rgba(159, 223, 159, 0.8),
    0 0 4px rgba(159, 223, 159, 0.6);
  letter-spacing: 0.8px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  position: relative;

  &::after {
    content: "===================="; /* 20 equals signs for unlit segments */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: rgba(159, 223, 159, 0.08);
    text-shadow: none;
    pointer-events: none;
    z-index: 0;
  }

  & {
    position: relative;
    z-index: 1;
  }
`;

export const StyledControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const StyledButton = styled.button<{ $pressed?: boolean }>`
  position: relative;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  background: #8a8a8a;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.1) 45%,
    rgba(0, 0, 0, 0.05) 55%,
    rgba(0, 0, 0, 0.2) 100%
  );
  box-shadow: ${(props) =>
    props.$pressed
      ? "0 0 0 1px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(0, 0, 0, 0.4)"
      : "0 0 0 1px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.4), 0 2px 2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)"};
  transform: ${(props) =>
    props.$pressed ? "translateY(0.5px)" : "translateY(0)"};
  cursor: pointer;
  transition: all 0.04s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  &:active {
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.3),
      inset 0 1px 2px rgba(0, 0, 0, 0.4);
    transform: translateY(0.5px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledPlayButton = styled(StyledButton)`
  width: 56px;
  height: 56px;
  font-size: 24px;
`;
