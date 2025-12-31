# Z-Index System

This document explains the z-index stacking order for all screen elements in the application.

## Hierarchy (from top to bottom)

All z-index values are defined in `constants/zIndex.ts`. **ALWAYS use these constants** when setting z-index values. Never use hard-coded numbers.

### 1. Burger Menu (1000)
- **Components**: `BurgerMenu` button and menu panel
- **Purpose**: Highest level UI element, always accessible
- **Values**:
  - Burger button: `Z_INDEX.BURGER_MENU` (1000)
  - Menu panel: `Z_INDEX.BURGER_MENU - 1` (999)

### 2. Modal Pages (900)
- **Components**: `Modal` component
- **Purpose**: Full-screen modal dialogs that require user attention
- **Value**: `Z_INDEX.MODAL_PAGE`

### 3. Burger/Modal Semi-Opaque Overlay (800)
- **Components**: `SharedOverlay` backdrop
- **Purpose**: Dims background when menu or modal is open
- **Value**: `Z_INDEX.OVERLAY`

### 4. Pull-Out Panel (700)
- **Components**: `DisplayDevice` panel and toggle button
- **Purpose**: Secondary information panel, slides in from right
- **Value**: `Z_INDEX.PULL_OUT_PANEL`

### 5. Windows (200-300)
- **Components**: All draggable/resizable window components
- **Purpose**: Interactive game/app windows with relative stacking
- **Values**:
  - Main Player: `Z_INDEX.MAIN_PLAYER_WINDOW` (300)
  - Game Windows: `Z_INDEX.GAME_WINDOWS` (200)
    - TetrisWindow
    - MinesweeperWindow
    - ZXSpectrumWindow
    - SolitaireWindow

  Windows within the game windows layer use dynamic z-index adjustment for bring-to-front functionality.

### 6. HomePage Layout (100)
- **Components**: `HomePage` layout wrapper
- **Purpose**: Base layout structure
- **Value**: `Z_INDEX.HOMEPAGE_LAYOUT`

### 7. Launcher Icons (10)
- **Components**: `WindowLauncher` icons at bottom of screen
- **Purpose**: Quick access to open windows
- **Value**: `Z_INDEX.LAUNCHER_ICONS`

### 8. Wallpaper Info Box (5)
- **Components**: `Wallpaper` info display
- **Purpose**: Shows wallpaper/system info in bottom-right
- **Value**: `Z_INDEX.WALLPAPER_INFO`

### 9. Wallpaper (-999)
- **Components**: `Wallpaper` background
- **Purpose**: Lowest layer, background image/video
- **Value**: `Z_INDEX.WALLPAPER`

## Usage Example

```typescript
import { Z_INDEX } from "constants/zIndex";
import styled from "styled-components";

export const StyledComponent = styled.div`
  position: fixed;
  z-index: ${Z_INDEX.BURGER_MENU};
`;
```

## Important Rules

1. **Never use hard-coded z-index values** - Always import and use the constants
2. **Never modify the hierarchy** without updating this documentation
3. **Relative adjustments** - When you need to stack elements relative to a constant (e.g., menu panel below burger button), use arithmetic: `${Z_INDEX.BURGER_MENU - 1}`
4. **Dynamic stacking** - Windows use a base z-index plus dynamic adjustment for bring-to-front behavior
5. **Future additions** - If adding new UI layers, update both `zIndex.ts` and this README

## File Locations

- **Constants**: `/constants/zIndex.ts`
- **Documentation**: `/constants/README.md` (this file)
- **Components using z-index**:
  - `/components/BurgerMenu/styles.ts`
  - `/components/Modal/styles.ts`
  - `/components/SharedOverlay/styles.ts`
  - `/components/DisplayDevice/styles.ts`
  - `/components/MainPlayer/styles.ts`
  - `/components/Windows/*/styles.ts`
  - `/components/WindowLauncher/styles.ts`
  - `/components/HomePage/styles.ts`
  - `/components/Wallpaper/styles.ts`
