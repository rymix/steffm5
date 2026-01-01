/**
 * Z-Index Hierarchy
 *
 * Defines the stacking order of all screen elements from top to bottom.
 * ALWAYS use these constants when setting z-index values.
 *
 * Order (highest to lowest):
 * 1. Burger menu (1000)
 * 2. Modal pages (900)
 * 3. Burger/modal semi-opaque overlay (800)
 * 4. Persistent controls (750)
 * 5. Pull-out panel (700)
 * 6. Windows - Main player (300)
 * 7. Windows - Game windows (200)
 * 8. HomePage layout (100)
 * 9. Launcher icons (10)
 * 10. Wallpaper info box (5)
 * 11. Wallpaper (-999)
 */

export const Z_INDEX = {
  // Top level UI
  BURGER_MENU: 1000,
  MODAL_PAGE: 900,
  OVERLAY: 800,
  PERSISTENT_CONTROLS: 750,
  PULL_OUT_PANEL: 700,

  // Windows (maintain relative stacking within this range)
  MAIN_PLAYER_WINDOW: 300,
  GAME_WINDOWS: 200, // Base z-index, actual windows use this + dynamic adjustment

  // Base layout
  HOMEPAGE_LAYOUT: 100,

  // Bottom layer
  LAUNCHER_ICONS: 10,
  WALLPAPER_INFO: 5,
  WALLPAPER: -999,
} as const;
