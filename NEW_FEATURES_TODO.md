# New Features TODO List

Generated: 2026-01-01

---

## 1. IMPROVE LOADING PLACEHOLDERS

**Current Issue:** Loading states for "Loading player" and "Loading mixes" are unstyled and ugly.

**Goal:** Center placeholders both horizontally and vertically with better styling.

### Tasks:
- [ ] **1.1** Locate current loading placeholder components
  - Find "Loading player" placeholder
  - Find "Loading mixes" placeholder

- [ ] **1.2** Update loading placeholder styles
  - Add flexbox centering (both horizontal and vertical)
  - Improve typography and spacing
  - Consider adding a loading spinner or animation
  - Match overall theme aesthetic

**Files to modify:**
- Components that show loading states (likely HomePage, MainPlayer, MixList)

---

## 2. CREATE DRIVING MODE

**Goal:** Add a "Driving Mode" modal with three large, easy-to-tap buttons.

### Tasks:
- [ ] **2.1** Create DrivingMode component
  - Location: `/components/modals/DrivingMode/`
  - Files: `index.tsx`, `styles.ts`

- [ ] **2.2** Design DrivingMode layout
  - Three large buttons: Play/Pause, Previous, Next
  - Buttons should be very large (easy to tap while driving)
  - Minimal UI, focus on usability
  - Full-screen or near full-screen modal

- [ ] **2.3** Add button functionality
  - Wire up to `useMixcloud()` actions: `toggle()`, `previous()`, `next()`
  - Visual feedback on button press
  - Show current track info (optional)

- [ ] **2.4** Add entry point for Driving Mode
  - Add menu item in BurgerMenu
  - Consider keyboard shortcut
  - Persist preference in localStorage?

**Files to create:**
- `/components/modals/DrivingMode/index.tsx`
- `/components/modals/DrivingMode/styles.ts`

**Files to modify:**
- `/components/modals/BurgerMenu/index.tsx` (add menu item)

---

## 3. AUTO-PLAY DETECTION & FALLBACK

**Current Issue:** On some devices, when one mix ends and a new one loads, it doesn't auto-play due to browser constraints. The mix loads but immediately pauses.

**Goal:** Detect when auto-play fails and show a modal with a large play button.

### Tasks:
- [ ] **3.1** Add auto-play detection logic
  - Location: Mixcloud context or player component
  - Detect when mix loads but doesn't play
  - Track if user interaction is required

- [ ] **3.2** Create AutoPlayPrompt modal component
  - Large "Play" button
  - Clear messaging ("Tap to continue playing")
  - Auto-dismiss when playback starts

- [ ] **3.3** Integrate detection with modal system
  - Open AutoPlayPrompt when auto-play fails
  - Close modal when user taps play
  - Special handling in Driving Mode

- [ ] **3.4** Test across different browsers/devices
  - Mobile Safari (most restrictive)
  - Chrome mobile
  - Desktop browsers

**Files to create:**
- `/components/modals/AutoPlayPrompt/index.tsx`
- `/components/modals/AutoPlayPrompt/styles.ts`

**Files to modify:**
- `/contexts/mixcloud/index.tsx` (add detection logic)
- `/components/player/MixcloudPlayer/index.tsx` (monitor playback state)

---

## 4. FIX DISPLAYDEVICE TOGGLE CLICK

**Current Issue:** Pull-out panel gesture (drag) works fine, but regular click no longer works.

**Root Cause:** Recent useDragGesture refactoring may have broken click handling.

### Tasks:
- [ ] **4.1** Debug DisplayDevice click handler
  - Check `handleClick` implementation in useDragGesture hook
  - Verify click event is not being prevented
  - Test that `didDragRef` logic is correct

- [ ] **4.2** Fix click functionality
  - Ensure click works when no drag occurred
  - Maintain existing drag gesture behavior

- [ ] **4.3** Test on multiple devices
  - Desktop mouse click
  - Mobile tap
  - Drag gesture (should still work)

**Files to modify:**
- `/hooks/useDragGesture.ts` (potential fix)
- `/components/display/DisplayDevice/index.tsx` (verify usage)

---

## 5. CREATE PERSISTENT MINI CONTROLS

**Goal:** Add a persistent control panel at top-right with volume, previous, play/pause, and next buttons.

### Design Requirements:
- Fixed position at top-right of page
- Lozenge shape with wooden slat motif (like DisplayDevice header)
- Contains: Volume control, Previous, Play/Pause, Next
- Higher z-index than DisplayDevice pull-out panel
- Background should disappear when DisplayDevice panel is open

### Tasks:
- [ ] **5.1** Create PersistentControls component
  - Location: `/components/ui/PersistentControls/`
  - Files: `index.tsx`, `styles.ts`

- [ ] **5.2** Design lozenge-shaped container
  - Use StyledWoodSlats from DisplayDevice as reference
  - Rounded ends (lozenge shape)
  - Fixed position: top-right
  - Appropriate padding and spacing

- [ ] **5.3** Add control buttons
  - Import existing VolumeControl component
  - Import existing playback button icons/logic
  - Arrange horizontally: Volume | Prev | Play/Pause | Next
  - Style for compact layout

- [ ] **5.4** Implement z-index layering
  - Higher than DisplayDevice (currently Z_INDEX.GAME_WINDOWS)
  - Lower than modals
  - Define new Z_INDEX constant if needed

- [ ] **5.5** Add conditional background removal
  - Accept `isPanelOpen` prop
  - Remove/fade background when DisplayDevice is open
  - Maintain button visibility

- [ ] **5.6** Move Info logo plate to left side
  - Update DisplayDevice StyledLogoPlate positioning
  - Change from centered/right to left alignment
  - Ensure no collision with new controls

**Files to create:**
- `/components/ui/PersistentControls/index.tsx`
- `/components/ui/PersistentControls/styles.ts`

**Files to modify:**
- `/components/display/DisplayDevice/styles.ts` (move logo plate)
- `/components/layout/MainPlayer/index.tsx` (add PersistentControls)
- `/components/layout/HomePage/index.tsx` (add PersistentControls)
- `/styles/constants.ts` (potentially add new z-index)

---

## IMPLEMENTATION ORDER

Suggested order of implementation:

1. **Task 4** - Fix DisplayDevice click (quick bug fix)
2. **Task 1** - Improve loading placeholders (quick styling win)
3. **Task 5** - Create PersistentControls (visible improvement)
4. **Task 2** - Create Driving Mode (new feature)
5. **Task 3** - Auto-play detection (complex, requires testing)

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
