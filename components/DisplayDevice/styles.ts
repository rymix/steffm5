import styled from "styled-components";

export const StyledDisplayDeviceWrapper = styled.div`
  position: relative;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const StyledDisplayDevice = styled.div<{ $isOpen: boolean }>`
  width: ${({ $isOpen }) => ($isOpen ? "420px" : "0")};
  height: 100%;
  z-index: 1000;
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? "-4px 0 24px rgba(0, 0, 0, 0.5)" : "none"};
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

export const StyledScreen = styled.div`
  flex: 1;
  background: #1a1a1a;
  padding: 30px;
  overflow-y: auto;
  position: relative;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
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
  position: absolute;
  top: 50%;
  left: -40px;
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
  z-index: 1001;
  user-select: none;

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

export const StyledMixCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  color: #ffffff;
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

export const StyledMixName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #ffffff;
  line-height: 1.4;
  position: relative;
  z-index: 1;
`;

export const StyledMixInfo = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  position: relative;
  z-index: 1;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledNoMix = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  padding: 40px 20px;
`;

export const StyledTrackListSection = styled.div`
  margin-top: 24px;
`;

export const StyledTrackListHeader = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
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

export const StyledTrackItem = styled.div<{
  $isPlaying: boolean;
  $isExpanded?: boolean;
}>`
  background: ${({ $isPlaying }) =>
    $isPlaying ? "rgba(159, 223, 159, 0.15)" : "rgba(255, 255, 255, 0.03)"};
  border: 1px solid
    ${({ $isPlaying }) =>
      $isPlaying ? "rgba(159, 223, 159, 0.3)" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 6px;
  padding: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${({ $isPlaying }) =>
      $isPlaying ? "rgba(159, 223, 159, 0.2)" : "rgba(255, 255, 255, 0.08)"};
    border-color: ${({ $isPlaying }) =>
      $isPlaying ? "rgba(159, 223, 159, 0.4)" : "rgba(255, 255, 255, 0.15)"};

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

export const StyledTrackNumber = styled.div<{ $isPlaying: boolean }>`
  font-size: 11px;
  font-weight: 600;
  color: ${({ $isPlaying }) =>
    $isPlaying ? "#9fdf9f" : "rgba(255, 255, 255, 0.5)"};
  min-width: 28px;
  text-align: center;
  background: ${({ $isPlaying }) =>
    $isPlaying ? "rgba(159, 223, 159, 0.15)" : "rgba(255, 255, 255, 0.05)"};
  padding: 4px 6px;
  border-radius: 4px;
`;

export const StyledTrackTime = styled.div<{ $isPlaying: boolean }>`
  font-size: 11px;
  font-weight: 500;
  color: ${({ $isPlaying }) =>
    $isPlaying ? "#9fdf9f" : "rgba(255, 255, 255, 0.5)"};
  font-family: "DSEG14Classic", monospace;
  letter-spacing: 0.5px;
`;

export const StyledTrackName = styled.div<{ $isPlaying: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $isPlaying }) => ($isPlaying ? "#9fdf9f" : "#ffffff")};
  margin-bottom: 4px;
  line-height: 1.3;
`;

export const StyledTrackArtist = styled.div<{ $isPlaying: boolean }>`
  font-size: 13px;
  color: ${({ $isPlaying }) =>
    $isPlaying ? "rgba(159, 223, 159, 0.8)" : "rgba(255, 255, 255, 0.7)"};
  line-height: 1.3;
`;

export const StyledTrackRemix = styled.div<{ $isPlaying: boolean }>`
  font-size: 12px;
  color: ${({ $isPlaying }) =>
    $isPlaying ? "rgba(159, 223, 159, 0.6)" : "rgba(255, 255, 255, 0.5)"};
  font-style: italic;
  margin-top: 2px;
`;

export const StyledTrackContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const StyledTrackExpandedInfo = styled.div<{ $isExpanded: boolean }>`
  max-height: ${({ $isExpanded }) => ($isExpanded ? "100px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  margin-top: ${({ $isExpanded }) => ($isExpanded ? "8px" : "0")};
  padding-top: ${({ $isExpanded }) => ($isExpanded ? "8px" : "0")};
  border-top: ${({ $isExpanded }) =>
    $isExpanded ? "1px solid rgba(255, 255, 255, 0.1)" : "none"};
`;

export const StyledTrackExtraInfo = styled.div<{ $isPlaying: boolean }>`
  font-size: 12px;
  color: ${({ $isPlaying }) =>
    $isPlaying ? "rgba(159, 223, 159, 0.7)" : "rgba(255, 255, 255, 0.6)"};
  margin-bottom: 4px;
  line-height: 1.4;

  strong {
    color: ${({ $isPlaying }) =>
      $isPlaying ? "rgba(159, 223, 159, 0.9)" : "rgba(255, 255, 255, 0.8)"};
    margin-right: 4px;
  }
`;

export const StyledNoTracks = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  padding: 20px;
  font-style: italic;
`;
