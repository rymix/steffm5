import { useMixcloud } from "contexts/mixcloud";
import { useCallback, useEffect, useRef, useState } from "react";

import type { BackgroundExtended } from "db/types";

type WallpaperState = {
  currentWallpaper: string | null;
  tileType?: string;
  isLoading: boolean;
  error: string | null;
};

export const useWallpaperManager = () => {
  const { actions, session } = useMixcloud();
  const [wallpaperState, setWallpaperState] = useState<WallpaperState>({
    currentWallpaper: null,
    isLoading: false,
    error: null,
  });

  const hasLoadedInitially = useRef(false);
  const lastChangeTime = useRef<number>(0);
  const CHANGE_COOLDOWN = 1000; // 1 second cooldown between changes

  // Sync wallpaper state from session.background
  useEffect(() => {
    if (session.background) {
      const wallpaperUrl = `/${session.background.backgroundCategoryObject?.folder}/${session.background.fileName}`;
      setWallpaperState({
        currentWallpaper: wallpaperUrl,
        tileType: session.background.tileType,
        isLoading: false,
        error: null,
      });
    }
  }, [session.background]);

  const fetchRandomWallpaper = useCallback(async () => {
    const now = Date.now();

    // Prevent rapid successive changes
    if (now - lastChangeTime.current < CHANGE_COOLDOWN) {
      return;
    }

    setWallpaperState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/background/randomBackground");
      if (!response.ok) {
        throw new Error("Failed to fetch wallpaper");
      }

      const backgroundData: BackgroundExtended = await response.json();

      // Construct the wallpaper URL
      const wallpaperUrl = `/wallpapers/${backgroundData.backgroundCategoryObject.folder.replace("wallpapers/", "")}/${backgroundData.fileName}`;

      console.log("🖼️ Loading wallpaper:", wallpaperUrl);
      console.log("Background data:", backgroundData);

      // Update mixcloud context with the new background
      // The wallpaperState will auto-sync via the useEffect above
      actions.setBackground(backgroundData);

      lastChangeTime.current = now;
    } catch (error) {
      setWallpaperState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }));
    }
  }, [actions]);

  const changeWallpaper = useCallback(() => {
    console.log("🖼️ Changing wallpaper due to track/mix change");
    fetchRandomWallpaper();
  }, [fetchRandomWallpaper]);

  // Load initial wallpaper immediately
  useEffect(() => {
    if (!hasLoadedInitially.current) {
      console.log("🖼️ Initial wallpaper load");
      hasLoadedInitially.current = true;
      fetchRandomWallpaper();
    }
  }, []); // Empty dependency array - only run once on mount

  return {
    wallpaperState,
    changeWallpaper,
    fetchRandomWallpaper,
  };
};
