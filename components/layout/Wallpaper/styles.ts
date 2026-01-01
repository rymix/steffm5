import { Z_INDEX } from "constants/zIndex";
import styled from "styled-components";

export const StyledWallpaper = styled.div<{
  $wallpaperUrl?: string | null;
  $tileType?: string;
  $isLoading: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${Z_INDEX.WALLPAPER};

  background-image: ${({ $wallpaperUrl }) =>
    $wallpaperUrl ? `url(${$wallpaperUrl})` : "none"};

  /* Apply different background styles based on tileType */
  ${({ $tileType }) => {
    switch ($tileType) {
      case "stretch":
        return `
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        `;
      case "tile":
        return `
          background-size: auto;
          background-position: top left;
          background-repeat: repeat;
        `;
      case "center":
        return `
          background-size: auto;
          background-position: center center;
          background-repeat: no-repeat;
        `;
      default:
        return `
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        `;
    }
  }}

  background-attachment: fixed;

  transition: opacity 0.5s ease-in-out;
  opacity: ${({ $isLoading, $wallpaperUrl }) =>
    $isLoading || !$wallpaperUrl ? 0.7 : 1};

  /* Fallback gradient when no wallpaper is loaded */
  background-color: #667eea;
  ${({ $wallpaperUrl }) =>
    !$wallpaperUrl &&
    `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  `}

  /* Subtle vignette overlay */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.5) 100%
    );
    pointer-events: none;
  }
`;

export const StyledInfoBox = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  padding: 12px 16px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  z-index: ${Z_INDEX.WALLPAPER_INFO};
  pointer-events: auto;
  user-select: none;
  opacity: 0.3;
  transition: opacity 0.3s ease;
  cursor: default;

  /* Only apply hover on devices with hover capability (not touch) */
  @media (hover: hover) {
    &:hover {
      opacity: 1;
    }
  }

  &.active {
    opacity: 1;
  }

  .system-name {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 4px;
    line-height: 1.2;
  }

  .wallpaper-name {
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    padding: 8px 12px;

    .system-name {
      font-size: 12px;
    }

    .wallpaper-name {
      font-size: 11px;
    }
  }
`;
