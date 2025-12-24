import styled from "styled-components";

interface ThemeProps {
  $themeMode: "light" | "dark";
}

export const StyledDisplayDeviceWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  pointer-events: none; /* Don't block clicks, children will re-enable */
  z-index: 9999;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const StyledDisplayDevice = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ $isOpen }) => ($isOpen ? "420px" : "0")};
  height: 100vh;
  z-index: 9999; /* Pull-out panel - always above all windows */
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? "-4px 0 24px rgba(0, 0, 0, 0.5)" : "none"};
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
`;

export const StyledWoodSlats = styled.div`
  position: relative;
  height: 60px;
  background-image:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url("/textures/dark-walnut.jpg");
  background-size: cover;
  box-shadow:
    inset 2px 2px 4px rgba(255, 255, 255, 0.2),
    inset -1px -1px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-right: 26px;
  padding-top: 17px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      180deg,
      transparent 0%,
      transparent 45%,
      rgba(0, 0, 0, 0.8) 45%,
      rgba(0, 0, 0, 0.8) 100%
    );
    background-size: 100% 10px;
    pointer-events: none;
  }
`;

export const StyledLogoPlate = styled.div`
  width: 80px;
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
  position: relative;
  z-index: 1;
`;

export const StyledLogoText = styled.div`
  font-family: "Lexend", sans-serif;
  font-optical-sizing: auto;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  color: #2a2a2a;
  letter-spacing: 1.2px;
`;

export const StyledScreen = styled.div<ThemeProps>`
  flex: 1;
  background: ${(props) =>
    props.$themeMode === "dark" ? "#1a1a1a" : "#f5f5f5"};
  padding: 30px;
  overflow-y: auto;
  position: relative;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) =>
      props.$themeMode === "dark"
        ? "rgba(0, 0, 0, 0.3)"
        : "rgba(0, 0, 0, 0.1)"};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.$themeMode === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)"};
    border-radius: 4px;

    &:hover {
      background: ${(props) =>
        props.$themeMode === "dark"
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(0, 0, 0, 0.3)"};
    }
  }
`;

export const StyledMetalPanel = styled.div`
  height: 80px;
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
`;

export const StyledToggleButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  top: 50%;
  right: ${({ $isOpen }) => ($isOpen ? "420px" : "0")};
  transform: translateY(-50%);
  width: 40px;
  height: 80px;
  background: #c8c8c8;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(0, 0, 0, 0.15) 100%
    );
  border: none;
  border-radius: 8px 0 0 8px;
  box-shadow:
    -2px 0 8px rgba(0, 0, 0, 0.3),
    inset 1px 1px 2px rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #2a2a2a;
  z-index: 9999; /* Same as pull-out panel */
  user-select: none;
  pointer-events: auto; /* Always clickable */
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #d8d8d8;
  }

  &:active {
    box-shadow:
      -2px 0 8px rgba(0, 0, 0, 0.3),
      inset 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const StyledMixCoverArt = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  filter: grayscale(50%) saturate(0.9);
  transition: all 0.4s ease;
  mask-image: linear-gradient(to right, transparent 0%, black 40%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 40%);
  pointer-events: none;
`;

export const StyledMixCard = styled.div<ThemeProps>`
  background: ${(props) =>
    props.$themeMode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.03)"};
  border: 1px solid
    ${(props) =>
      props.$themeMode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)"};
  border-radius: 8px;
  padding: 20px;
  color: ${(props) => (props.$themeMode === "dark" ? "#ffffff" : "#2a2a2a")};
  position: relative;
  overflow: hidden;

  &:hover {
    ${StyledMixCoverArt} {
      filter: grayscale(10%) saturate(1.2) brightness(1.05);
    }
  }
`;

export const StyledMixImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

export const StyledMixName = styled.h2<ThemeProps>`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: ${(props) => (props.$themeMode === "dark" ? "#ffffff" : "#2a2a2a")};
  line-height: 1.4;
  position: relative;
  z-index: 1;
`;

export const StyledMixInfo = styled.div<ThemeProps>`
  font-size: 14px;
  color: ${(props) =>
    props.$themeMode === "dark"
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(0, 0, 0, 0.6)"};
  margin-bottom: 8px;
  position: relative;
  z-index: 1;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: ${(props) =>
      props.$themeMode === "dark"
        ? "rgba(255, 255, 255, 0.9)"
        : "rgba(0, 0, 0, 0.8)"};
  }
`;

export const StyledNoMix = styled.div<ThemeProps>`
  text-align: center;
  color: ${(props) =>
    props.$themeMode === "dark"
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(0, 0, 0, 0.5)"};
  font-size: 16px;
  padding: 40px 20px;
`;

export const StyledTrackListSection = styled.div`
  margin-top: 24px;
`;

export const StyledTrackListHeader = styled.h3<ThemeProps>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.$themeMode === "dark" ? "#ffffff" : "#2a2a2a")};
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid
    ${(props) =>
      props.$themeMode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)"};
`;

export const StyledTrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledTrackCoverArt = styled.img<{
  $isPlaying: boolean;
  $isExpanded: boolean;
}>`
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  filter: ${({ $isPlaying, $isExpanded }) =>
    $isPlaying || $isExpanded
      ? "grayscale(0%) saturate(1.3) brightness(1.05)"
      : "grayscale(100%)"};
  transition: all 0.4s ease;
  mask-image: linear-gradient(to right, transparent 0%, black 40%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 40%);
  pointer-events: none;
`;

interface StyledTrackItemProps extends ThemeProps {
  $isPlaying: boolean;
  $isExpanded?: boolean;
}

export const StyledTrackItem = styled.div<StyledTrackItemProps>`
  background: ${({ $isPlaying, $themeMode }) =>
    $isPlaying
      ? $themeMode === "dark"
        ? "rgba(159, 223, 159, 0.15)"
        : "rgba(74, 159, 74, 0.25)"
      : $themeMode === "dark"
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(0, 0, 0, 0.03)"};
  border: 1px solid
    ${({ $isPlaying, $themeMode }) =>
      $isPlaying
        ? $themeMode === "dark"
          ? "rgba(159, 223, 159, 0.3)"
          : "rgba(74, 159, 74, 0.4)"
        : $themeMode === "dark"
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(0, 0, 0, 0.08)"};
  border-radius: 6px;
  padding: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${({ $isPlaying, $themeMode }) =>
      $isPlaying
        ? $themeMode === "dark"
          ? "rgba(159, 223, 159, 0.2)"
          : "rgba(74, 159, 74, 0.3)"
        : $themeMode === "dark"
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(0, 0, 0, 0.06)"};
    border-color: ${({ $isPlaying, $themeMode }) =>
      $isPlaying
        ? $themeMode === "dark"
          ? "rgba(159, 223, 159, 0.4)"
          : "rgba(74, 159, 74, 0.5)"
        : $themeMode === "dark"
          ? "rgba(255, 255, 255, 0.15)"
          : "rgba(0, 0, 0, 0.15)"};

    ${StyledTrackCoverArt} {
      filter: ${({ $isPlaying, $isExpanded }) =>
        $isPlaying || $isExpanded
          ? "grayscale(0%) saturate(1.3) brightness(1.05)"
          : "grayscale(20%) saturate(1.1)"};
    }
  }
`;

export const StyledTrackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
  gap: 8px;
`;

interface StyledTrackTextProps extends ThemeProps {
  $isPlaying: boolean;
}

export const StyledTrackNumber = styled.div<StyledTrackTextProps>`
  font-size: 11px;
  font-weight: 600;
  color: ${({ $themeMode }) =>
    $themeMode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"};
  min-width: 28px;
  text-align: center;
  background: ${({ $isPlaying, $themeMode }) =>
    $isPlaying
      ? "rgba(159, 223, 159, 0.15)"
      : $themeMode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.05)"};
  padding: 4px 6px;
  border-radius: 4px;
`;

export const StyledTrackTime = styled.div<StyledTrackTextProps>`
  font-size: 11px;
  font-weight: 500;
  color: ${({ $themeMode }) =>
    $themeMode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"};
  font-family: "DSEG14Classic", monospace;
  letter-spacing: 0.5px;
`;

export const StyledTrackName = styled.div<StyledTrackTextProps>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $themeMode }) => ($themeMode === "dark" ? "#ffffff" : "#2a2a2a")};
  margin-bottom: 4px;
  line-height: 1.3;
`;

export const StyledTrackArtist = styled.div<StyledTrackTextProps>`
  font-size: 13px;
  color: ${({ $themeMode }) =>
    $themeMode === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)"};
  line-height: 1.3;
`;

export const StyledTrackRemix = styled.div<StyledTrackTextProps>`
  font-size: 12px;
  color: ${({ $themeMode }) =>
    $themeMode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"};
  font-style: italic;
  margin-top: 2px;
`;

export const StyledTrackContent = styled.div`
  position: relative;
  z-index: 1;
`;

interface StyledTrackExpandedInfoProps extends ThemeProps {
  $isExpanded: boolean;
}

export const StyledTrackExpandedInfo = styled.div<StyledTrackExpandedInfoProps>`
  max-height: ${({ $isExpanded }) => ($isExpanded ? "100px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  margin-top: ${({ $isExpanded }) => ($isExpanded ? "8px" : "0")};
  padding-top: ${({ $isExpanded }) => ($isExpanded ? "8px" : "0")};
  border-top: ${({ $isExpanded, $themeMode }) =>
    $isExpanded
      ? $themeMode === "dark"
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid rgba(0, 0, 0, 0.1)"
      : "none"};
`;

export const StyledTrackExtraInfo = styled.div<StyledTrackTextProps>`
  font-size: 12px;
  color: ${({ $themeMode }) =>
    $themeMode === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"};
  margin-bottom: 4px;
  line-height: 1.4;

  strong {
    color: ${({ $themeMode }) =>
      $themeMode === "dark"
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(0, 0, 0, 0.8)"};
    margin-right: 4px;
  }
`;

export const StyledNoTracks = styled.div<ThemeProps>`
  text-align: center;
  color: ${(props) =>
    props.$themeMode === "dark"
      ? "rgba(255, 255, 255, 0.4)"
      : "rgba(0, 0, 0, 0.4)"};
  font-size: 13px;
  padding: 20px;
  font-style: italic;
`;
