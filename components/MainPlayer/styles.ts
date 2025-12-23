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

export const StyledMainPlayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 640px;
  height: 500px;
  z-index: 100;
  box-shadow:
    0 12px 48px rgba(0, 0, 0, 0.5),
    0 6px 24px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  overflow: hidden;
  user-select: none;
  will-change: transform;
`;

export const StyledWoodPanel = styled.div`
  position: relative;
  background-image:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url("/textures/dark-walnut.jpg");
  background-size: cover;
  height: 280px;
  box-shadow:
    inset 2px 2px 4px rgba(255, 255, 255, 0.2),
    inset -1px -1px 3px rgba(0, 0, 0, 0.3);
  cursor: move;
`;

export const StyledHeader = styled.div`
  height: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 8px;
`;

export const StyledResetButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 26px;
  height: 26px;
  background: #5a5a5a;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 45%,
    rgba(0, 0, 0, 0.05) 55%,
    rgba(0, 0, 0, 0.15) 100%
  );
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  cursor: pointer;
  font-size: 18px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.4),
    0 2px 2px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: all 0.04s ease;
  z-index: 20;

  &:hover {
    background: #6a6a6a;
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.3),
      0 1px 0 rgba(255, 255, 255, 0.5),
      0 3px 4px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }

  &:active {
    background: #4a4a4a;
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.3),
      inset 0 1px 2px rgba(0, 0, 0, 0.4);
    transform: translateY(0.5px);
  }
`;

export const StyledResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 2px;
  user-select: none;
  z-index: 10;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(
        135deg,
        transparent 0%,
        transparent 28%,
        #888 28%,
        #888 35%,
        transparent 35%
      ),
      linear-gradient(
        135deg,
        transparent 0%,
        transparent 48%,
        #888 48%,
        #888 55%,
        transparent 55%
      ),
      linear-gradient(
        135deg,
        transparent 0%,
        transparent 68%,
        #888 68%,
        #888 75%,
        transparent 75%
      );
    background-repeat: no-repeat;
  }

  &:hover::before {
    background-image:
      linear-gradient(
        135deg,
        transparent 0%,
        transparent 28%,
        #666 28%,
        #666 35%,
        transparent 35%
      ),
      linear-gradient(
        135deg,
        transparent 0%,
        transparent 48%,
        #666 48%,
        #666 55%,
        transparent 55%
      ),
      linear-gradient(
        135deg,
        transparent 0%,
        transparent 68%,
        #666 68%,
        #666 75%,
        transparent 75%
      );
  }
`;

export const StyledSlats = styled.div`
  position: relative;
  height: 90px;
  background: repeating-linear-gradient(
    180deg,
    transparent 0%,
    transparent 45%,
    rgba(0, 0, 0, 0.8) 45%,
    rgba(0, 0, 0, 0.8) 100%
  );
  background-size: 100% 12px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-left: 26px;
  padding-right: 26px;
  padding-top: 12px;
`;

export const StyledLogoPlate = styled.div`
  width: 100px;
  height: 26px;
  background: #c8c8c8;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
  border-radius: 1px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.2),
    inset 0 -1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLogoText = styled.div`
  font-family: "Lexend", sans-serif;
  font-optical-sizing: auto;
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  color: #2a2a2a;
  letter-spacing: 1.2px;
`;

export const StyledMainPanel = styled.div`
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 26px;
`;

export const StyledDisplay = styled.div`
  width: 100%;
  max-width: 560px;
  height: 90px;
  background: #2a3a2a;
  border: 2px solid #1a1a1a;
  border-radius: 3px;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.6),
    inset 0 -1px 2px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  gap: 6px;
`;

export const StyledDisplayText = styled.div`
  font-family: "DSEG14Classic", monospace;
  font-size: 24px;
  font-weight: normal;
  color: #9fdf9f;
  text-shadow:
    0 0 12px rgba(159, 223, 159, 0.8),
    0 0 5px rgba(159, 223, 159, 0.6);
  letter-spacing: 1.2px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  position: relative;

  &::after {
    content: "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"; /* 30 tildes for unlit segments */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: rgba(159, 223, 159, 0.08);
    text-shadow: none;
    pointer-events: none;
    z-index: 0;
  }

  /* Text content renders on top */
  & {
    position: relative;
    z-index: 1;
  }
`;

export const StyledDisplayProgress = styled.div`
  font-family: "DSEG14Classic", monospace;
  font-size: 24px;
  font-weight: normal;
  color: #9fdf9f;
  text-shadow:
    0 0 12px rgba(159, 223, 159, 0.8),
    0 0 5px rgba(159, 223, 159, 0.6);
  letter-spacing: 1.2px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  position: relative;

  &::after {
    content: "=============================="; /* 30 equals signs for unlit segments */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: rgba(159, 223, 159, 0.08);
    text-shadow: none;
    pointer-events: none;
    z-index: 0;
  }

  /* Text content renders on top */
  & {
    position: relative;
    z-index: 1;
  }
`;

export const StyledControls = styled.div`
  position: relative;
  height: 220px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 0 26px;
`;

export const StyledVolumeDialShadow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow:
    0 6px 12px rgba(0, 0, 0, 0.5),
    0 3px 4px rgba(0, 0, 0, 0.3);
`;

interface StyledVolumeDialProps {
  $rotation?: number;
}

export const StyledVolumeDial = styled.div.attrs<StyledVolumeDialProps>(
  ({ $rotation }) => ({
    style: {
      transform: `translate(-50%, -50%) rotate(${($rotation || 0) + 270}deg)`,
    },
  }),
)<StyledVolumeDialProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
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
    inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.35),
    inset -1px -1px 2px rgba(0, 0, 0, 0.15);
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
    height: 12px;
    background: #c8c8c8;
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(0, 0, 0, 0.1) 100%
      );
    box-shadow:
      0 2px 3px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 8%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    background: radial-gradient(
      circle at 35% 35%,
      #ff4444 0%,
      #dd0000 70%,
      #aa0000 100%
    );
    border-radius: 50%;
    box-shadow:
      0 0 5px rgba(255, 0, 0, 0.6),
      0 1px 2px rgba(0, 0, 0, 0.6),
      inset 0 0.5px 1px rgba(255, 150, 150, 0.8);
    z-index: 2;
  }
`;

export const StyledDialMarker = styled.div`
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: radial-gradient(
    circle at 30% 30%,
    #ffffff 0%,
    #f8f8f8 20%,
    #d8d8d8 50%,
    #b0b0b0 80%,
    #909090 100%
  );
  border-radius: 50%;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.8),
    0 0.5px 0 rgba(255, 255, 255, 0.9),
    inset 0 1px 1px rgba(255, 255, 255, 0.8),
    inset 0 -1px 1px rgba(0, 0, 0, 0.4);
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

export const StyledDialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 140px;
  flex-shrink: 0;
`;

export const StyledDialLabelText = styled.div`
  font-family: "Helvetica Neue", "Arial", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #2a2a2a;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 8px;
  height: 14px;
  line-height: 14px;
`;

export const StyledVolumeDialWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
`;

interface StyledDialTickProps {
  $angle: number;
}

export const StyledDialTick = styled.div.attrs<StyledDialTickProps>(
  ({ $angle }) => ({
    style: {
      transform: `translateX(-50%) rotate(${$angle}deg)`,
    },
  }),
)<StyledDialTickProps>`
  position: absolute;
  width: 2.5px;
  height: 9px;
  background: #7a7a7a;
  top: 9px;
  left: 50%;
  transform-origin: center 51px;
  border-radius: 0.5px;
  box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.3);
`;

interface StyledModeDialProps {
  $rotation?: number;
}

export const StyledModeDial = styled.div.attrs<StyledModeDialProps>(
  ({ $rotation }) => ({
    style: {
      transform: `translate(-50%, -50%) rotate(${($rotation || 0) + 270}deg)`,
    },
  }),
)<StyledModeDialProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
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
    inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.35),
    inset -1px -1px 2px rgba(0, 0, 0, 0.15);
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
    height: 12px;
    background: #c8c8c8;
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(0, 0, 0, 0.1) 100%
      );
    box-shadow:
      0 2px 3px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 8%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    background: radial-gradient(
      circle at 35% 35%,
      #ff4444 0%,
      #dd0000 70%,
      #aa0000 100%
    );
    border-radius: 50%;
    box-shadow:
      0 0 5px rgba(255, 0, 0, 0.6),
      0 1px 2px rgba(0, 0, 0, 0.6),
      inset 0 0.5px 1px rgba(255, 150, 150, 0.8);
    z-index: 2;
  }
`;

export const StyledModeDialWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 120px;
  flex-shrink: 0;
`;

export const StyledModeDialShadow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow:
    0 6px 12px rgba(0, 0, 0, 0.5),
    0 3px 4px rgba(0, 0, 0, 0.3);
`;

interface StyledDialLabelProps {
  $angle: number;
  $active: boolean;
}

export const StyledDialLabel = styled.div.attrs<StyledDialLabelProps>(
  ({ $angle }) => ({
    style: {
      transform: `translate(-50%, -50%) rotate(${$angle}deg) translate(0, -62px) rotate(${-$angle}deg)`,
    },
  }),
)<StyledDialLabelProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  color: #2a2a2a;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  pointer-events: none;
  user-select: none;
`;

export const StyledButtonRowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  flex-shrink: 0;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  flex-shrink: 0;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const StyledButtonIcon = styled.div`
  font-size: 14px;
  color: #2a2a2a;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledButtonLED = styled.div.attrs<{ $active?: boolean }>(
  ({ $active }) => ({
    style: {
      background: $active ? "#ff3333" : "#3a0000",
      boxShadow: $active
        ? "0 0 8px #ff3333, 0 0 3px #ff0000, inset 0 0.5px 1px rgba(255, 255, 255, 0.6)"
        : "inset 0 1px 2px rgba(0, 0, 0, 0.9)",
    },
  }),
)<{ $active?: boolean }>`
  width: 36px;
  height: 4px;
  border-radius: 1px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  transition: all 0.15s ease;
`;

export const StyledButtonLabel = styled.div`
  font-size: 8px;
  font-weight: bold;
  color: #2a2a2a;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: center;
  height: 14px;
  display: flex;
  align-items: center;
`;

export const StyledButton = styled.button<{ $pressed?: boolean }>`
  position: relative;
  width: 60px;
  height: 26px;
  padding: 0;
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
