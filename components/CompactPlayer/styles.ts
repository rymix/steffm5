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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  overflow: hidden;
`;

export const StyledWoodPanel = styled.div`
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

  @media (max-width: 1024px) {
    padding: 16px 16px;
  }
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

  @media (max-width: 1024px) {
    font-size: 20px;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

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

  @media (max-width: 1024px) {
    font-size: 20px;
    letter-spacing: 1px;
  }

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

export const StyledControlsPanel = styled.div`
  width: 100%;
  background: #c8c8c8;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(0, 0, 0, 0.15) 100%
    );
  box-shadow:
    inset 2px 2px 4px rgba(255, 255, 255, 0.4),
    inset -1px -1px 3px rgba(0, 0, 0, 0.2);
  padding: 20px 16px;
`;

export const StyledControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  gap: 16px;
  flex-wrap: wrap;

  @media (min-width: 520px) {
    flex-wrap: nowrap;
    justify-content: space-between;
  }
`;

export const StyledDialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 94px;
  flex-shrink: 0;
  order: 2;

  @media (min-width: 520px) {
    order: 0;
  }
`;

export const StyledDialLabelText = styled.div`
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: #2a2a2a;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 6px;
  height: 12px;
  line-height: 12px;
`;

export const StyledVolumeDialWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  flex-shrink: 0;
`;

export const StyledVolumeDialShadow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.5),
    0 1px 2px rgba(0, 0, 0, 0.3);
`;

export const StyledVolumeDial = styled.div.attrs<{ $rotation?: number }>(
  ({ $rotation }) => ({
    style: {
      transform: `translate(-50%, -50%) rotate(${($rotation || 0) + 270}deg)`,
    },
  }),
)<{ $rotation?: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #c8c8c8;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(0, 0, 0, 0.12) 100%
    );
  box-shadow:
    inset 1px 1px 2px rgba(255, 255, 255, 0.35),
    inset -0.5px -0.5px 1px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: grab;
  user-select: none;
  transition: transform 0.08s ease-out;

  &:active {
    cursor: grabbing;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    width: 90%;
    height: 7px;
    background: #c8c8c8;
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(0, 0, 0, 0.1) 100%
      );
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.25),
      inset 0 0.5px 0 rgba(255, 255, 255, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 8%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: radial-gradient(
      circle at 35% 35%,
      #ff4444 0%,
      #dd0000 70%,
      #aa0000 100%
    );
    border-radius: 50%;
    box-shadow:
      0 0 3px rgba(255, 0, 0, 0.6),
      0 0.5px 1px rgba(0, 0, 0, 0.6),
      inset 0 0.25px 0.5px rgba(255, 150, 150, 0.8);
    z-index: 2;
  }
`;

export const StyledDialTick = styled.div.attrs<{ $angle: number }>(
  ({ $angle }) => ({
    style: {
      transform: `translateX(-50%) rotate(${$angle}deg)`,
    },
  }),
)<{ $angle: number }>`
  position: absolute;
  width: 2px;
  height: 7px;
  background: #7a7a7a;
  top: 2px;
  left: 50%;
  transform-origin: center 33px;
  border-radius: 0.5px;
  box-shadow: 0 0.25px 0.5px rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

export const StyledModeDialWrapper = styled.div`
  position: relative;
  top: -5px;
  width: 72px;
  height: 60px;
  flex-shrink: 0;
`;

export const StyledModeDialShadow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.5),
    0 1px 2px rgba(0, 0, 0, 0.3);
`;

export const StyledModeDial = styled.div.attrs<{ $rotation?: number }>(
  ({ $rotation }) => ({
    style: {
      transform: `translate(-50%, -50%) rotate(${($rotation || 0) + 270}deg)`,
    },
  }),
)<{ $rotation?: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #c8c8c8;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(0, 0, 0, 0.12) 100%
    );
  box-shadow:
    inset 1px 1px 2px rgba(255, 255, 255, 0.35),
    inset -0.5px -0.5px 1px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: grab;
  user-select: none;
  transition: transform 0.15s ease-out;

  &:active {
    cursor: grabbing;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    width: 90%;
    height: 7px;
    background: #c8c8c8;
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(0, 0, 0, 0.1) 100%
      );
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.25),
      inset 0 0.5px 0 rgba(255, 255, 255, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 8%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: radial-gradient(
      circle at 35% 35%,
      #ff4444 0%,
      #dd0000 70%,
      #aa0000 100%
    );
    border-radius: 50%;
    box-shadow:
      0 0 3px rgba(255, 0, 0, 0.6),
      0 0.5px 1px rgba(0, 0, 0, 0.6),
      inset 0 0.25px 0.5px rgba(255, 150, 150, 0.8);
    z-index: 2;
  }
`;

export const StyledDialLabel = styled.div.attrs<{
  $angle: number;
  $active: boolean;
}>(({ $angle }) => ({
  style: {
    transform: `translate(-50%, -50%) rotate(${$angle}deg) translate(0, -44px) rotate(${-$angle}deg)`,
  },
}))<{ $angle: number; $active: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  text-align: center;
  font-size: 9px;
  font-weight: bold;
  color: #2a2a2a;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  pointer-events: none;
  user-select: none;
`;

export const StyledButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  flex-shrink: 0;
  order: 1;
  width: 100%;
  max-width: 280px;

  @media (min-width: 520px) {
    order: 3;
  }
`;

export const StyledButton = styled.button<{
  $pressed?: boolean;
  $iconOnly?: boolean;
}>`
  position: relative;
  width: 100%;
  min-width: ${(props) => (props.$iconOnly ? "40px" : "60px")};
  height: ${(props) => (props.$iconOnly ? "38px" : "30px")};
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 2px;
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
  flex-direction: ${(props) => (props.$iconOnly ? "row" : "column")};
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.$iconOnly ? "4px" : "2px")};
  font-size: 14px;

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

export const StyledButtonIcon = styled.div<{
  $active?: boolean;
  $momentary?: boolean;
  $isPlaying?: boolean;
  $isPaused?: boolean;
}>`
  font-size: 12px;
  color: ${(props) => {
    if (props.$momentary && props.$active) return "#ff3333";
    if (props.$isPlaying && props.$active) return "#33ff33";
    if (props.$isPaused && props.$active) return "#ffaa00";
    return "#2a2a2a";
  }};
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  filter: ${(props) => {
    if (props.$momentary && props.$active)
      return "drop-shadow(0 0 4px #ff3333) drop-shadow(0 0 2px #ff0000)";
    if (props.$isPlaying && props.$active)
      return "drop-shadow(0 0 4px #33ff33) drop-shadow(0 0 2px #00ff00)";
    if (props.$isPaused && props.$active)
      return "drop-shadow(0 0 4px #ffaa00) drop-shadow(0 0 2px #ff8800)";
    return "none";
  }};
  transition: all 0.15s ease;

  svg {
    font-size: 26px;
  }
`;

export const StyledButtonLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #2a2a2a;
  text-transform: uppercase;
  letter-spacing: 0.1px;
  text-align: center;
  line-height: 1;
  white-space: nowrap;
`;
