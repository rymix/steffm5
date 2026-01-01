# Refactoring TODO List

Generated: 2026-01-01

## Priority Legend
- 🔴 HIGH - Significant impact, large duplication
- 🟡 MEDIUM - Moderate impact, good improvements
- 🟢 LOW - Nice to have, future-proofing

---

## 1. UNUSED CODE CLEANUP

### 🔴 Remove Unused Demo/Prototype Components
- [x] **1.1** Remove `/components/HomePageArchive/` (archived old version)
  - Files: `index.tsx`, `styles.ts`
  - Never imported anywhere

- [x] **1.2** Remove `/components/HelloWorldModal/`
  - Files: `index.tsx`, `styles.ts`
  - Only used in demo component

- [x] **1.3** Remove `/components/SecondModal/`
  - Files: `index.tsx`, `styles.ts`
  - Demo modal, not in production

- [x] **1.4** Evaluate `/components/PlayerPrototype/`
  - Files: `index.tsx`, `styles.ts`
  - Only imported in `/pages/player.tsx`
  - Decision: **KEPT** as test/dev page (isolated, not affecting production)

### 🟢 Audit Type Files for Unused Exports
- [ ] **1.5** Review 16 type files for unused exports
  - Use "Find All References" for each export
  - Remove exports with 0 references
  - Files to check: All `types.ts` files in component directories

---

## 2. EXTRACT REPEATED CODE

### 🔴🔴🔴 CRITICAL: Extract CurrentTrack & Track Utilities (HIGHEST PRIORITY)
**Impact:** Eliminates 400+ duplicate lines across 8 files

This is the **most duplicated code** in the entire codebase. The same track detection, sorting, and formatting logic appears in 8+ files with minor variations.

#### 2.A Create Track Utility Functions

- [x] **2.A.1** Create `/utils/trackHelpers.ts` with shared utilities:

```typescript
/**
 * Converts time string (MM:SS or HH:MM:SS) to seconds
 */
export function timeToSeconds(timeString: string): number {
  const parts = timeString.split(":");
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  } else if (parts.length === 3) {
    return (
      parseInt(parts[0]) * 3600 +
      parseInt(parts[1]) * 60 +
      parseInt(parts[2])
    );
  }
  return 0;
}

/**
 * Sorts tracks by start time
 */
export function sortTracksByTime(tracks: any[]): any[] {
  return [...tracks].sort((a, b) => {
    return timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
  });
}

/**
 * Calculates track duration (end time - start time)
 */
export function getTrackDuration(
  track: any,
  nextTrack: any | null,
  totalDuration: number
): string {
  const currentStart = timeToSeconds(track.startTime);
  const nextStart = nextTrack
    ? timeToSeconds(nextTrack.startTime)
    : totalDuration;
  const durationSeconds = nextStart - currentStart;
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.floor(durationSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Finds track index at given position
 */
export function findTrackIndexAtPosition(
  sortedTracks: any[],
  position: number,
  duration: number,
  tolerance: number = 2
): number {
  if (!sortedTracks.length || position <= 0) return -1;

  for (let i = 0; i < sortedTracks.length; i++) {
    const track = sortedTracks[i];
    const trackStartSeconds = timeToSeconds(track.startTime);
    const nextTrack = i < sortedTracks.length - 1 ? sortedTracks[i + 1] : null;
    const nextTrackStartSeconds = nextTrack
      ? timeToSeconds(nextTrack.startTime)
      : duration;

    if (
      position >= trackStartSeconds - tolerance &&
      position < nextTrackStartSeconds - tolerance
    ) {
      return i;
    }
  }
  return -1;
}
```

**Files to refactor after creating utility:**
- ✅ Remove duplicate `timeToSeconds` from 8 files
- ✅ Remove duplicate sorting logic from 8 files
- ✅ Remove duplicate `getTrackDuration` from HomePage & DisplayDevice

#### 2.A.2 Create `useCurrentTrack` Hook

- [x] **2.A.2** Create `/hooks/useCurrentTrack.ts`:

```typescript
import { useMemo } from 'react';
import { sortTracksByTime, findTrackIndexAtPosition, timeToSeconds } from 'utils/trackHelpers';

/**
 * Returns the currently playing track based on position
 */
export function useCurrentTrack(
  currentMix: any,
  position: number,
  duration: number,
  tolerance: number = 2
): any | null {
  return useMemo(() => {
    if (!currentMix?.tracks || position <= 0) return null;

    const sortedTracks = sortTracksByTime(currentMix.tracks);
    const index = findTrackIndexAtPosition(sortedTracks, position, duration, tolerance);

    return index >= 0 ? sortedTracks[index] : null;
  }, [currentMix, position, duration, tolerance]);
}

/**
 * Returns the index of the currently playing track
 */
export function useCurrentTrackIndex(
  currentMix: any,
  position: number,
  duration: number,
  tolerance: number = 2
): number {
  return useMemo(() => {
    if (!currentMix?.tracks || position <= 0) return -1;

    const sortedTracks = sortTracksByTime(currentMix.tracks);
    return findTrackIndexAtPosition(sortedTracks, position, duration, tolerance);
  }, [currentMix, position, duration, tolerance]);
}
```

**Files to refactor (8 files):**
1. `/components/CompactPlayer/CompactDisplay.tsx` (lines 36-78) - Replace with `useCurrentTrack`
2. `/components/CompactPlayer/index.tsx` (lines 211-253) - Replace with `useCurrentTrack`
3. `/components/MusicTicker/index.tsx` (lines 22-63) - Replace with `useCurrentTrack`
4. `/components/MusicDotMatrix/index.tsx` (lines 27-67) - Replace with `useCurrentTrack`
5. `/components/MainPlayer/index.tsx` (lines 192-243) - Replace with `useCurrentTrack`
6. `/components/HomePage/index.tsx` (lines 164-185) - Replace with `useCurrentTrackIndex`
7. `/components/DisplayDevice/index.tsx` (lines 183-204) - Replace with `useCurrentTrackIndex`
8. `/components/TrackList/index.tsx` - Replace with helper functions

#### 2.A.3 Create `useTrackDisplayName` Hook

- [x] **2.A.3** Create `/hooks/useTrackDisplayName.ts`:

```typescript
import { useMemo } from 'react';

/**
 * Builds formatted display name from track parts
 * Format: TRACK!NAME!*!ARTIST!*!REMIX!*!MIX!NAME
 */
export function useTrackDisplayName(
  currentTrack: any,
  currentMix: any,
  fallback: string = "STEF.FM MIXCLOUD PLAYER"
): string {
  return useMemo(() => {
    const parts = [];

    if (currentTrack?.trackName) {
      parts.push(currentTrack.trackName);
    }

    if (currentTrack?.artistName) {
      parts.push(currentTrack.artistName);
    }

    if (currentTrack?.remixArtistName) {
      parts.push(currentTrack.remixArtistName);
    }

    if (currentMix?.name) {
      parts.push(currentMix.name);
    }

    const text = parts.length > 0 ? parts.join(" * ") : fallback;
    return text.toUpperCase().replace(/'/g, "").replace(/ /g, "!");
  }, [
    currentTrack?.trackName,
    currentTrack?.artistName,
    currentTrack?.remixArtistName,
    currentMix?.name,
    fallback,
  ]);
}
```

**Files to refactor (3 files with 100% identical code):**
1. `/components/CompactPlayer/CompactDisplay.tsx` (lines 81-109) - Replace with `useTrackDisplayName`
2. `/components/CompactPlayer/index.tsx` (lines 256-284) - Replace with `useTrackDisplayName`
3. `/components/MainPlayer/index.tsx` (lines 246-274) - Replace with `useTrackDisplayName`

#### 2.A.4 Create `useTrackChangeDetection` Hook

- [x] **2.A.4** Create `/hooks/useTrackChangeDetection.ts`:

```typescript
import { useEffect, useRef, useCallback } from 'react';
import { useMixcloud } from 'contexts/mixcloud';
import { sortTracksByTime, findTrackIndexAtPosition, timeToSeconds } from 'utils/trackHelpers';

/**
 * Detects when mix or track changes and triggers callback
 */
export function useTrackChangeDetection(
  onMixOrTrackChange: () => void
): void {
  const { state, actions } = useMixcloud();
  const prevCurrentKey = useRef<string | null>(null);
  const prevCurrentTrack = useRef<string | null>(null);
  const hasMadeInitialMixLoad = useRef(false);

  const getCurrentPlayingTrackIdentifier = useCallback(() => {
    const currentMix = actions.getCurrentMix();
    if (!currentMix?.tracks) return null;

    const sortedTracks = sortTracksByTime(currentMix.tracks);
    const index = findTrackIndexAtPosition(
      sortedTracks,
      state.position,
      state.duration,
      2 // tolerance
    );

    if (index >= 0) {
      const track = sortedTracks[index];
      return `${track.sectionNumber}-${track.trackName}-${track.artistName}`;
    }

    return null;
  }, [state.position, state.duration, actions]);

  useEffect(() => {
    const currentKey = state.currentKey;
    const currentTrack = getCurrentPlayingTrackIdentifier();

    if (!currentKey) {
      return;
    }

    if (!hasMadeInitialMixLoad.current) {
      hasMadeInitialMixLoad.current = true;
      prevCurrentKey.current = currentKey;
      prevCurrentTrack.current = currentTrack;
      return;
    }

    const mixChanged = currentKey !== prevCurrentKey.current;
    const trackChanged = currentTrack !== prevCurrentTrack.current;

    if (trackChanged || mixChanged) {
      onMixOrTrackChange();
    }

    prevCurrentKey.current = currentKey;
    prevCurrentTrack.current = currentTrack;
  }, [
    state.currentKey,
    state.position,
    state.duration,
    getCurrentPlayingTrackIdentifier,
    onMixOrTrackChange,
  ]);
}
```

**Files to refactor (2 files):**
1. `/components/HomePage/index.tsx` (lines 76-218) - Replace with `useTrackChangeDetection`
2. `/components/HomePageArchive/index.tsx` (lines 77-113) - Replace with `useTrackChangeDetection`

---

### 🔴 Create `useIframeInteraction` Hook
**Impact:** Eliminates 165 duplicate lines across 3 files

- [x] **2.1** Create `/hooks/useIframeInteraction.ts`
  ```typescript
  export function useIframeInteraction(
    iframeRef: RefObject<HTMLIFrameElement>,
    isVisible: boolean,
    bringToFront: () => void
  ): void
  ```

- [x] **2.2** Replace duplicate code in:
  - `/components/Windows/TetrisWindow/index.tsx` (lines 52-106)
  - `/components/Windows/SolitaireWindow/index.tsx` (lines 52-106)
  - `/components/Windows/MinesweeperWindow/index.tsx` (lines 76-130)

### 🔴 Create Shared Window Styled Components
**Impact:** Eliminates 400+ duplicate lines across 4 files

- [x] **2.3** Create `/components/Windows/shared/styles.ts` with:
  - `createStyledWindow(gradientColors: string)`
  - `StyledHeader` (parameterized for gradient)
  - `StyledIframe`
  - `StyledResizeHandle`
  - `StyledResetButton`
  - `StyledHeaderControls`
  - `StyledContent`

- [x] **2.4** Refactor window styles to use shared components:
  - `/components/Windows/TetrisWindow/styles.ts` (102 → 19 lines, 81% reduction)
  - `/components/Windows/SolitaireWindow/styles.ts` (102 → 19 lines, 81% reduction)
  - `/components/Windows/MinesweeperWindow/styles.ts` (102 → 18 lines, 82% reduction)
  - `/components/Windows/ZXSpectrumWindow/styles.ts` (193 → 89 lines, 54% reduction)

### 🔴 Create Theme Helper Hooks
**Impact:** Improves readability in 12 files

- [ ] **2.5** Add to `/hooks/useTheme.ts` (or create new file):
  ```typescript
  export function usePanelTheme(): "light" | "dark"
  export function useModalTheme(): "light" | "dark"
  ```

- [ ] **2.6** Replace theme calculations in:
  - `/components/BurgerMenu/index.tsx`
  - `/components/Modal/index.tsx`
  - `/components/DisplayDevice/index.tsx`
  - `/components/HomePage/index.tsx`
  - `/components/MixList/index.tsx`
  - `/components/Wallpapers/index.tsx`
  - `/components/Contact/index.tsx`
  - `/components/ContentPages/About/index.tsx`
  - `/components/ContentPages/Statistics/index.tsx`
  - `/components/Manual/index.tsx`
  - `/components/MixFilter/index.tsx`
  - `/components/MixListPage/index.tsx`

### 🟡 Create `useEscapeKey` Hook
**Impact:** Eliminates 30 duplicate lines across 2 files

- [ ] **2.7** Create `/hooks/useEscapeKey.ts`
  ```typescript
  export function useEscapeKey(
    isOpen: boolean,
    onClose: () => void
  ): void
  ```

- [ ] **2.8** Replace duplicate code in:
  - `/components/Modal/index.tsx` (lines 69-83)
  - `/components/BurgerMenu/index.tsx` (lines 58-73)

### 🟡 Refactor BurgerMenu Menu Items
**Impact:** Reduces 60 lines of repetition

- [ ] **2.9** Create menu configuration array in `/components/BurgerMenu/menuConfig.ts`
  ```typescript
  export interface MenuItem {
    id: string;
    label: string;
    title: string;
    component: React.ReactNode;
    autoCloseTimeout?: number;
  }
  export const menuItems: MenuItem[] = [...]
  ```

- [ ] **2.10** Update `/components/BurgerMenu/index.tsx` to map over config

### 🟢 Create `useDragGesture` Hook (Future-Proofing)
- [ ] **2.11** Create `/hooks/useDragGesture.ts`
  ```typescript
  export function useDragGesture(options: {
    threshold?: number;
    onDragLeft?: () => void;
    onDragRight?: () => void;
    preventClick?: boolean;
  }): {
    isDragging: boolean;
    handleMouseDown: (e: React.MouseEvent) => void;
    handleTouchStart: (e: React.TouchEvent) => void;
    handleClick: () => void;
  }
  ```

- [ ] **2.12** Optionally refactor `/components/DisplayDevice/index.tsx` (lines 67-98)

---

## 3. REORGANIZE COMPONENTS

### 🔴 Create Component Category Directories

Current structure:
```
/components
  ├── Controls/
  ├── PlaybackButtons/
  ├── VolumeControl/
  ├── ... (all mixed together)
  └── Windows/ ✅ (already organized)
```

Proposed structure:
```
/components
  ├── ui/              # UI Controls & Widgets
  ├── windows/         # Game Windows (exists)
  ├── modals/          # Modal & Overlay Components
  ├── display/         # Display & Visualization
  ├── layout/          # Layout & Container Components
  ├── pages/           # Content Pages
  ├── player/          # Player Integration
  └── shared/          # Shared/Common Components
```

- [ ] **3.1** Create new directory structure

- [ ] **3.2** Move UI Controls to `/components/ui/`:
  - Controls/
  - PlaybackButtons/
  - VolumeControl/
  - ProgressBar/
  - FilterStatus/
  - FilterStatusWidget/
  - MixFilter/

- [ ] **3.3** Rename `/components/Windows/` to `/components/windows/` (lowercase consistency)

- [ ] **3.4** Move Modal components to `/components/modals/`:
  - Modal/
  - GlobalModal/
  - SharedOverlay/
  - BurgerMenu/

- [ ] **3.5** Move Display components to `/components/display/`:
  - DisplayDevice/
  - DotMatrix/
  - MusicDotMatrix/
  - Ticker/
  - MusicTicker/
  - CurrentMixInfo/

- [ ] **3.6** Move Layout components to `/components/layout/`:
  - MainPlayer/
  - CompactPlayer/
  - HomePage/
  - MixList/
  - MixListPage/
  - TrackList/
  - WindowLauncher/
  - Wallpaper/
  - Wallpapers/

- [ ] **3.7** Move Content Pages to `/components/pages/`:
  - ContentPages/About/
  - ContentPages/Statistics/
  - Contact/
  - Manual/

- [ ] **3.8** Move Player Integration to `/components/player/`:
  - MixcloudPlayer/
  - MixcloudConnected/

- [ ] **3.9** Move Background Lists to `/components/shared/`:
  - BackgroundList/

---

## 4. CONVERT TO ABSOLUTE IMPORTS

### 🔴 Convert All Relative Imports to Absolute Paths

**Files with relative imports (22 occurrences):**

#### Window Components
- [ ] **4.1** `/components/Windows/TetrisWindow/index.tsx`
  - Line 3: `../../../contexts/windowManager` → `contexts/windowManager`
  - Line 4: `../../../hooks/useDraggableWindow` → `hooks/useDraggableWindow`
  - Lines 5-11: `./styles` → `components/Windows/TetrisWindow/styles`

- [ ] **4.2** `/components/Windows/SolitaireWindow/index.tsx`
  - Line 3: `../../../contexts/windowManager` → `contexts/windowManager`
  - Line 4: `../../../hooks/useDraggableWindow` → `hooks/useDraggableWindow`
  - Lines 5-9: `./styles` → `components/Windows/SolitaireWindow/styles`

- [ ] **4.3** `/components/Windows/MinesweeperWindow/index.tsx`
  - Line 3: `../../../contexts/windowManager` → `contexts/windowManager`
  - Line 4: `../../../hooks/useDraggableWindow` → `hooks/useDraggableWindow`
  - Lines 5-9: `./styles` → `components/Windows/MinesweeperWindow/styles`

- [ ] **4.4** `/components/Windows/ZXSpectrumWindow/index.tsx`
  - Line 3: `../../../contexts/windowManager` → `contexts/windowManager`
  - Line 4: `../../../hooks/useDraggableWindow` → `hooks/useDraggableWindow`
  - Lines 5-14: `./styles` → `components/Windows/ZXSpectrumWindow/styles`

#### Other Components with Relative Imports
- [ ] **4.5** `/components/WindowLauncher/index.tsx`
  - Convert `./styles` → `components/WindowLauncher/styles`

- [ ] **4.6** `/components/DotMatrix/` subdirectories
  - Convert all relative imports to absolute

- [ ] **4.7** `/components/BackgroundList/Macintosh/` files
  - Convert all relative imports to absolute

- [ ] **4.8** `/components/BackgroundList/RetroPC/` files
  - Convert all relative imports to absolute

- [ ] **4.9** `/components/MusicDotMatrix/`
  - Convert all relative imports to absolute

### 🟡 Update Import Paths After Component Reorganization

After completing sections 3.1-3.9 above:

- [ ] **4.10** Update all imports throughout codebase to reflect new component locations
  - Use VSCode's "Find and Replace in Files"
  - Pattern: `from "components/OldPath"` → `from "components/category/OldPath"`

- [ ] **4.11** Update path aliases in `tsconfig.json` if needed
  - Add component category aliases if beneficial:
    ```json
    {
      "@ui/*": ["components/ui/*"],
      "@modals/*": ["components/modals/*"],
      "@display/*": ["components/display/*"],
      // etc.
    }
    ```

---

## EXECUTION ORDER

### Phase 1: Quick Wins (Can be done independently)
1. Task 1.1-1.4: Remove unused components
2. Task 2.7-2.8: Create `useEscapeKey` hook
3. Task 2.9-2.10: Refactor BurgerMenu config

### Phase 2: High-Impact Refactoring (Do in order)
1. Task 2.1-2.2: Create `useIframeInteraction` hook
2. Task 2.5-2.6: Create theme helper hooks
3. Task 2.3-2.4: Create shared Window components

### Phase 3: Import Standardization
1. Task 4.1-4.9: Convert relative to absolute imports

### Phase 4: Major Restructuring (Do last)
1. Task 3.1-3.9: Reorganize component directories
2. Task 4.10-4.11: Update all import paths

### Phase 5: Polish
1. Task 1.5: Audit type files
2. Task 2.11-2.12: Create `useDragGesture` hook (optional)

---

## TESTING CHECKLIST

After each task, verify:
- [ ] No TypeScript errors
- [ ] `npm run build` succeeds
- [ ] All windows open/close correctly
- [ ] Theme switching works
- [ ] No console errors
- [ ] Game interactions work (iframe focus, clicks)

---

## METRICS

### Before Refactoring
- Total component files: 119
- Duplicate code: ~687 lines
- Relative imports: 22 occurrences
- Unused files: 4 components (8 files)

### After Refactoring Goals
- Duplicate code: ~250 lines (63% reduction)
- All imports: Absolute paths
- Unused files: 0
- Better organized: 8 category directories

---

## NOTES

- Keep this file updated as you complete tasks
- Mark completed items with ✅
- Add any discoveries or blockers as you go
- Consider creating feature branches for major changes
