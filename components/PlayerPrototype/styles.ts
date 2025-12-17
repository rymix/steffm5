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

export const StyledPlayerPrototype = styled.div`
  width: 480px;
  height: 320px;
`;

export const StyledWoodPanel = styled.div`
  background-image:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url("/textures/dark-walnut.jpg");
  background-size: cover;
  height: 200px;
  box-shadow:
    inset 2px 2px 4px rgba(255, 255, 255, 0.2),
    inset -1px -1px 3px rgba(0, 0, 0, 0.3);
`;

export const StyledHeader = styled.div`
  height: 12px;
`;

export const StyledSlats = styled.div`
  height: 70px;
  background: repeating-linear-gradient(
    180deg,
    transparent 0%,
    transparent 45%,
    rgba(0, 0, 0, 0.8) 45%,
    rgba(0, 0, 0, 0.8) 100%
  );
  background-size: 100% 10px;
`;

export const StyledMainPanel = styled.div`
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const StyledDisplay = styled.div`
  width: 100%;
  max-width: 400px;
  height: 60px;
  background: #2a3a2a;
  border: 2px solid #1a1a1a;
  border-radius: 3px;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.6),
    inset 0 -1px 2px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
`;

export const StyledDisplayText = styled.div`
  font-family: "DSEG14Classic", monospace;
  font-size: 20px;
  font-weight: normal;
  color: #9fdf9f;
  text-shadow: 0 0 8px rgba(159, 223, 159, 0.6);
  letter-spacing: 1px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
`;

export const StyledControls = styled.div`
  height: 120px;
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
  gap: 20px;
  padding: 0 20px;
`;

export const StyledVolumeDialShadow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow:
    0 5px 10px rgba(0, 0, 0, 0.5),
    0 2px 3px rgba(0, 0, 0, 0.3);
`;

export const StyledVolumeDial = styled.div<{ $rotation?: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
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
  transform: translate(-50%, -50%)
    rotate(${(props) => (props.$rotation || 0) + 270}deg);
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
    height: 10px;
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
      0 0 4px rgba(255, 0, 0, 0.6),
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

export const StyledVolumeDialWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
`;

export const StyledDialTick = styled.div<{ $angle: number }>`
  position: absolute;
  width: 2px;
  height: 7px;
  background: #2a2a2a;
  top: 3px;
  left: 50%;
  transform-origin: center 47px;
  transform: translateX(-50%) rotate(${(props) => props.$angle}deg);
  border-radius: 0.5px;
  box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.5);
`;

export const StyledModeDial = styled.div<{ $rotation?: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
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
  transform: translate(-50%, -50%)
    rotate(${(props) => (props.$rotation || 0) + 270}deg);
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
    height: 10px;
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
      0 0 4px rgba(255, 0, 0, 0.6),
      0 1px 2px rgba(0, 0, 0, 0.6),
      inset 0 0.5px 1px rgba(255, 150, 150, 0.8);
    z-index: 2;
  }
`;

export const StyledModeDialWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 100px;
  flex-shrink: 0;
`;

export const StyledModeDialShadow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow:
    0 5px 10px rgba(0, 0, 0, 0.5),
    0 2px 3px rgba(0, 0, 0, 0.3);
`;

export const StyledDialLabel = styled.div<{ $angle: number; $active: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  text-align: center;
  font-size: 8px;
  font-weight: bold;
  color: #2a2a2a;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  transform: translate(-50%, -50%) rotate(${(props) => props.$angle}deg)
    translate(0, -42px) rotate(${(props) => -props.$angle}deg);
  pointer-events: none;
  user-select: none;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

export const StyledButtonIcon = styled.div`
  font-size: 12px;
  color: #2a2a2a;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledButtonLED = styled.div<{ $active?: boolean }>`
  width: 30px;
  height: 3px;
  border-radius: 1px;
  background: ${(props) => (props.$active ? "#ff3333" : "#3a0000")};
  box-shadow: ${(props) =>
    props.$active
      ? "0 0 8px #ff3333, 0 0 3px #ff0000, inset 0 0.5px 1px rgba(255, 255, 255, 0.6)"
      : "inset 0 1px 2px rgba(0, 0, 0, 0.9)"};
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  transition: all 0.15s ease;
`;

export const StyledButtonLabel = styled.div`
  font-size: 7px;
  font-weight: bold;
  color: #2a2a2a;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: center;
  height: 12px;
  display: flex;
  align-items: center;
`;

export const StyledButton = styled.button<{ $pressed?: boolean }>`
  position: relative;
  width: 50px;
  height: 22px;
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
`;
