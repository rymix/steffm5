import React from "react";

import { StyledInfoBox, StyledWallpaper } from "./styles";
import type { WallpaperProps } from "./types";

const Wallpaper: React.FC<WallpaperProps> = ({
  wallpaperUrl,
  tileType = "tile",
  isLoading = false,
  systemName,
  wallpaperName,
}) => {
  if (!wallpaperUrl && !isLoading) {
    return null;
  }

  return (
    <>
      <StyledWallpaper
        $wallpaperUrl={wallpaperUrl}
        $tileType={tileType}
        $isLoading={isLoading}
        role="presentation"
        aria-hidden="true"
      />
      {systemName && wallpaperName && (
        <StyledInfoBox>
          <div className="system-name">{systemName}</div>
          <div className="wallpaper-name">{wallpaperName}</div>
        </StyledInfoBox>
      )}
    </>
  );
};

export default Wallpaper;
