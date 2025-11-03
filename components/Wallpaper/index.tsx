import React from "react";

import { StyledWallpaper } from "./styles";
import type { WallpaperProps } from "./types";

const Wallpaper: React.FC<WallpaperProps> = ({
  wallpaperUrl,
  tileType = "tile",
  isLoading = false,
}) => {
  if (!wallpaperUrl && !isLoading) {
    return null;
  }

  return (
    <StyledWallpaper
      $wallpaperUrl={wallpaperUrl}
      $tileType={tileType}
      $isLoading={isLoading}
      role="presentation"
      aria-hidden="true"
    />
  );
};

export default Wallpaper;
