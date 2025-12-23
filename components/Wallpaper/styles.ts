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
  z-index: -999;

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
      rgba(0, 0, 0, 0.3) 100%
    );
    pointer-events: none;
  }
`;
