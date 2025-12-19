import styled from "styled-components";

export const StyledDisplayDevice = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-420px")};
  width: 420px;
  height: 100vh;
  z-index: 1000;
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? "-4px 0 24px rgba(0, 0, 0, 0.5)" : "none"};
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    display: none;
  }
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
  }
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
  z-index: 999;
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

export const StyledMixCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  color: #ffffff;
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
`;

export const StyledMixInfo = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;

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

export const StyledTrackItem = styled.div<{ $isPlaying: boolean }>`
  background: ${({ $isPlaying }) =>
    $isPlaying ? "rgba(159, 223, 159, 0.15)" : "rgba(255, 255, 255, 0.03)"};
  border: 1px solid
    ${({ $isPlaying }) =>
      $isPlaying ? "rgba(159, 223, 159, 0.3)" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 6px;
  padding: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $isPlaying }) =>
      $isPlaying ? "rgba(159, 223, 159, 0.2)" : "rgba(255, 255, 255, 0.08)"};
    border-color: ${({ $isPlaying }) =>
      $isPlaying ? "rgba(159, 223, 159, 0.4)" : "rgba(255, 255, 255, 0.15)"};
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

export const StyledNoTracks = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  padding: 20px;
  font-style: italic;
`;
