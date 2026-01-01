# New Features TODO List

Generated: 2026-01-01

---

## 1. IMPROVE LOADING PLACEHOLDERS ✅

**Current Issue:** Loading states for "Loading player" and "Loading mixes" are unstyled and ugly.

**Goal:** Center placeholders both horizontally and vertically with better styling.

### Tasks:
- [x] **1.1** Locate current loading placeholder components
  - Found "Loading player..." in MixcloudPlayerWrapper.tsx
  - Found "Loading mixes..." in MixcloudPlayer.tsx
  - Found "Loading mixes..." in MixList/index.tsx

- [x] **1.2** Create shared LoadingMessage component
  - Created `/components/shared/LoadingMessage/` with index.tsx and styles.ts
  - Centered layout with flexbox (horizontal and vertical)
  - Added animated loading spinner (CSS animation)
  - Supports fullScreen mode with backdrop blur
  - Customizable message prop

- [x] **1.3** Update all loading states
  - Updated MixcloudPlayerWrapper to use LoadingMessage (fullScreen)
  - Updated MixcloudPlayer to use LoadingMessage (fullScreen)
  - Updated MixList to use LoadingMessage (inline)
  - Build succeeds ✅

**Files created:**
- `/components/shared/LoadingMessage/index.tsx`
- `/components/shared/LoadingMessage/styles.ts`

**Files modified:**
- `/components/player/MixcloudPlayer/MixcloudPlayerWrapper.tsx`
- `/components/player/MixcloudPlayer/MixcloudPlayer.tsx`
- `/components/layout/MixList/index.tsx`

---

## 2. CREATE DRIVING MODE ✅

**Goal:** Add a "Driving Mode" modal with three large, easy-to-tap buttons.

### Tasks:
- [x] **2.1** Create DrivingMode component
  - Location: `/components/modals/DrivingMode/`
  - Files: `index.tsx`, `styles.ts`
  - Clean, minimal design with large buttons

- [x] **2.2** Design DrivingMode layout
  - Three large buttons: Previous (120px), Play/Pause (140px primary), Next (120px)
  - Gradient backgrounds for visual appeal
  - Responsive design (smaller on mobile)
  - Current track info displayed above buttons

- [x] **2.3** Add button functionality
  - Wired up to `useMixcloud()` actions: `toggle()`, `previous()`, `next()`
  - Hover and active states for visual feedback
  - Shows current mix name and track info
  - Auto-detects current track based on playback position

- [x] **2.4** Add entry point for Driving Mode
  - Added "Driving Mode" as first item in BurgerMenu
  - Opens as modal dialog via existing modal system
  - Easy access for drivers

**Files created:**
- `/components/modals/DrivingMode/index.tsx`
- `/components/modals/DrivingMode/styles.ts`

**Files modified:**
- `/components/modals/BurgerMenu/index.tsx` (added menu item)
- Build succeeds ✅

---

## 3. AUTO-PLAY DETECTION & FALLBACK ✅

**Current Issue:** On some devices, when one mix ends and a new one loads, it doesn't auto-play due to browser constraints. The mix loads but immediately pauses.

**Goal:** Detect when auto-play fails and show a modal with a large play button.

### Tasks:
- [x] **3.1** Add auto-play detection logic
  - Added `autoPlayBlocked` state to MixcloudState type
  - Added `setAutoPlayBlocked` action to MixcloudActions
  - Implemented detection in MixcloudPlayer component
  - Waits 2 seconds after mix load to detect if playback starts

- [x] **3.2** Create AutoPlayPrompt modal component
  - Large circular play button (160px, gradient background)
  - Clear messaging ("Playback Paused", "Tap to continue playing")
  - Closes modal and starts playback on button click
  - Responsive design (smaller on mobile)

- [x] **3.3** Integrate detection with modal system
  - Opens AutoPlayPrompt modal when `autoPlayBlocked` becomes true
  - Closes modal and clears blocked state when user clicks play
  - Automatically clears blocked state when playback resumes

- [ ] **3.4** Test across different browsers/devices
  - Mobile Safari (most restrictive)
  - Chrome mobile
  - Desktop browsers
  - **Note:** Requires device testing (cannot be tested in build)

**Files created:**
- `/components/modals/AutoPlayPrompt/index.tsx`
- `/components/modals/AutoPlayPrompt/styles.ts`

**Files modified:**
- `/contexts/mixcloud/types.ts` (added autoPlayBlocked state and action)
- `/contexts/mixcloud/useMixcloudContextState.ts` (implemented setAutoPlayBlocked)
- `/components/player/MixcloudPlayer/MixcloudPlayer.tsx` (detection logic and modal integration)
- Build succeeds ✅

---

## 4. FIX DISPLAYDEVICE TOGGLE CLICK ✅

**Current Issue:** Pull-out panel gesture (drag) works fine, but regular click no longer works.

**Root Cause:** Recent useDragGesture refactoring broke click handling - the hook didn't have an `onClick` callback.

### Tasks:
- [x] **4.1** Debug DisplayDevice click handler
  - Check `handleClick` implementation in useDragGesture hook
  - Verify click event is not being prevented
  - Test that `didDragRef` logic is correct

- [x] **4.2** Fix click functionality
  - Added `onClick` callback to `UseDragGestureOptions` interface
  - Updated `handleClick` to call the callback when no drag occurred
  - DisplayDevice now passes `toggleDisplay` as `onClick`

- [x] **4.3** Test build
  - Build succeeds ✅
  - Ready for device testing

**Files modified:**
- `/hooks/useDragGesture.ts` - Added onClick callback support
- `/components/display/DisplayDevice/index.tsx` - Pass onClick to hook

---

## 5. CREATE PERSISTENT MINI CONTROLS ✅

**Goal:** Add a persistent control panel at top-right with volume, previous, play/pause, and next buttons.

### Design Requirements:
- Fixed position at top-right of page
- Lozenge shape with wooden slat motif (like DisplayDevice header)
- Contains: Volume control, Previous, Play/Pause, Next
- Higher z-index than DisplayDevice pull-out panel
- Background should disappear when DisplayDevice panel is open

### Tasks:
- [x] **5.1** Create PersistentControls component
  - Location: `/components/ui/PersistentControls/`
  - Files: `index.tsx`, `styles.ts`
  - Compact horizontal layout with all controls

- [x] **5.2** Design lozenge-shaped container
  - Rounded ends (border-radius: 50px)
  - Fixed position: top-right (20px, 20px)
  - Wooden texture with slat overlay effect
  - Smooth transitions for background changes

- [x] **5.3** Add control buttons
  - Inline volume control with icon and slider
  - Material-UI icons for playback buttons
  - Arranged horizontally: Volume | Prev | Play/Pause | Next
  - Circular buttons with hover effects

- [x] **5.4** Implement z-index layering
  - Added new Z_INDEX.PERSISTENT_CONTROLS = 750
  - Above DisplayDevice (700), below Modal Overlay (800)
  - Updated z-index hierarchy documentation

- [x] **5.5** Add conditional background removal
  - Accepts `isPanelOpen` prop
  - Background fades out when panel is open
  - Wood slat effect also fades with opacity transition
  - Buttons remain fully visible at all times

- [x] **5.6** Move Info logo plate to left side
  - Updated DisplayDevice StyledWoodSlats
  - Changed from right-aligned to left-aligned
  - Changed padding from right to left
  - No collision with new controls

**Files created:**
- `/components/ui/PersistentControls/index.tsx`
- `/components/ui/PersistentControls/styles.ts`

**Files modified:**
- `/constants/zIndex.ts` (added PERSISTENT_CONTROLS constant)
- `/components/display/DisplayDevice/styles.ts` (moved logo plate to left)
- `/components/layout/HomePage/index.tsx` (added PersistentControls)
- Build succeeds ✅

---

## IMPLEMENTATION ORDER ✅

Completed in the following order:

1. ✅ **Task 4** - Fix DisplayDevice click (quick bug fix)
2. ✅ **Task 1** - Improve loading placeholders (quick styling win)
3. ✅ **Task 5** - Create PersistentControls (visible improvement)
4. ✅ **Task 2** - Create Driving Mode (new feature)
5. ✅ **Task 3** - Auto-play detection (implementation complete, device testing pending)

**All features implemented successfully!** 🎉

---

## TESTING CHECKLIST

After each task, verify:
- [ ] No TypeScript errors
- [ ] `npm run build` succeeds
- [ ] Functionality works on desktop
- [ ] Functionality works on mobile
- [ ] No visual regressions
- [ ] Theme switching still works
- [ ] No console errors

---

## NOTES

- All new components should follow existing patterns
- Use theme helpers (usePanelTheme, useModalTheme) for theming
- Maintain accessibility (ARIA labels, keyboard navigation)
- Test on multiple browsers, especially mobile Safari for auto-play issues
