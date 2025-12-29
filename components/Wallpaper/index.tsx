import React, { useState } from "react";

import { StyledInfoBox, StyledWallpaper } from "./styles";
import type { WallpaperProps } from "./types";

const Wallpaper: React.FC<WallpaperProps> = ({
  wallpaperUrl,
  tileType = "tile",
  isLoading = false,
  systemName,
  wallpaperName,
}) => {
  const [infoBoxActive, setInfoBoxActive] = useState(false);

  if (!wallpaperUrl && !isLoading) {
    return null;
  }

  const handleInfoBoxTap = () => {
    setInfoBoxActive(true);
    setTimeout(() => setInfoBoxActive(false), 3000);
  };

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
        <StyledInfoBox
          className={infoBoxActive ? "active" : ""}
          onClick={handleInfoBoxTap}
        >
          <div className="system-name">{systemName}</div>
          <div className="wallpaper-name">{wallpaperName}</div>
        </StyledInfoBox>
      )}
    </>
  );
};

export default Wallpaper;
