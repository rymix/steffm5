  # CLAUDE.md

  This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

  ## Project Overview

  Mixmotion Player is a React audio player component with Mixcloud integration and dynamic visual effects. The project is
  structured as both a library component and a demo application, with support for immersive fullscreen music playback
  experiences.

  ## Essential Commands

  ### Development
  - `npm run dev` - Start development server (Vite)
  - `npm start` - Start dev server on port 3000 with host access
  - `npm run build` - Build library and demo (TypeScript compilation + Vite build)
  - `npm run preview` - Preview the built demo application

  ### Testing & Quality
  - `npm test` - Run Vitest test suite
  - `npm run lint` - Run ESLint with TypeScript extensions

  ### Build Configurations
  The project uses multiple Vite configurations:
  - `vite.config.ts` - Main demo application build
  - `vite.config.lib.ts` - Library build with CSS injection
  - `vite.config.demo.ts` - Demo-specific configuration

  ## Architecture

  ### Core Components
  - **MixmotionPlayer** (`src/lib/MixmotionPlayer/`) - Main player component with Mixcloud integration
  - **DynamicBackdrop** (`src/lib/DynamicBackdrop/`) - Visual effects component with canvas animations and video backgrounds
  - **MixmotionPlayerUI** - UI controls and player interface components

  ### State Management
  - Uses Zustand for global state management (`useStore` hook)
  - Local storage integration for user preferences (backdrop video, categories, order)
  - State includes: activity, playback status, show data, visual toggles, and user settings

  ### Key Libraries
  - **@noriginmedia/norigin-spatial-navigation** - TV/remote control navigation support
  - **Zustand** - State management
  - **FontAwesome React** - Icon system
  - **React Helmet Async** - Document head management
  - **Lodash** - Utility functions
  - **Classnames** - CSS class management

  ### Testing Setup
  - **Vitest** with jsdom environment
  - **@testing-library/react** for component testing
  - **vitest-canvas-mock** for canvas-related tests
  - Test setup in `tests/setup.js`

  ### API Integration
  - Mixcloud API integration via `services.ts`
  - Supports various Mixcloud URL formats (playlists, users, genres, individual shows)
  - Local storage for saved shows and user preferences

  ### Styling
  - SCSS modules for component-specific styles
  - CSS-in-JS injection for library builds (via vite-plugin-css-injected-by-js)
  - Mobile-first responsive design with TV/desktop support

  ### Build Output
  - Library: `dist/mixmotion-player.js` (ES modules) and `dist/mixmotion-player.umd.js` (UMD)
  - Demo: `demo/` directory
  - TypeScript declarations: `dist/index.d.ts`

  ### Development Patterns
  - TypeScript with strict mode enabled
  - React functional components with hooks
  - Custom hooks for state management, activity tracking, and saved items
  - Spatial navigation support for TV/remote interfaces
  - Canvas-based visual effects with video blend modes

  ## Theme System

  ### Theme Modes
  The application supports three theme modes:
  - **light** - All UI elements use light theme
  - **dark** - All UI elements use dark theme
  - **mixed** - Panels/display use dark theme, modals/menus use light theme

  Default mode is `mixed`. Theme preference is persisted in localStorage.

  ### Theme Helper Functions (`utils/themeHelpers.ts`)

  **getPanelThemeMode(themeMode: ThemeMode): "light" | "dark"**
  - Returns theme mode for main panels (mix/track display areas)
  - Returns `"light"` only when theme is `"light"`
  - Returns `"dark"` for both `"dark"` and `"mixed"` modes
  - Use for: DisplayDevice, HomePage mobile screens, track lists

  **getModalThemeMode(themeMode: ThemeMode): "light" | "dark"**
  - Returns theme mode for modals and menus
  - Returns `"light"` when theme is `"mixed"` or `"light"`
  - Returns `"dark"` only when theme is `"dark"`
  - Use for: BurgerMenu, modal dialogs

  **getCategoryName(categoryCode: string): string**
  - Maps category codes to display names
  - Mappings:
    - `""` → "All Mixes"
    - `"aidm"` → "Adventures in Decent Music"
    - `"mpos"` → "My Pair of Shoes"
    - `"cocksoup"` → "Cock Soup"
    - `"special"` → "Special"
    - `"fav"` → "Favourites"
  - Returns the code itself if not found in mapping

  ### Theme Implementation Guidelines

  **Components that should ALWAYS use light mode (never themed):**
  - MainPlayer wood panels and metal surfaces
  - All dials (Volume, Category)
  - Dial labels and text
  - Button labels
  - Metal control panels
  - Logo plates and text

  **Components that use theme:**
  - DisplayDevice screen and content
  - HomePage mobile screens
  - BurgerMenu background and items
  - Track lists and mix information cards
  - Scrollbars

  **Using transient props:**
  Always use `$themeMode` (with dollar sign) to prevent React DOM warnings:
  ```typescript
  interface ThemeProps {
    $themeMode: "light" | "dark";
  }

  const StyledComponent = styled.div<ThemeProps>`
    background: ${props => props.$themeMode === "dark" ? "#1a1a1a" : "#f5f5f5"};
  `;

  // Usage:
  <StyledComponent $themeMode={panelThemeMode} />
  ```

  ### Category System

  Categories are selected via the Category dial on MainPlayer. The dial has 6 positions:
  - Position 0: "All" → `""` (empty string)
  - Position 1: "Adv" → `"aidm"`
  - Position 2: "Shoes" → `"mpos"`
  - Position 3: "Cock" → `"cocksoup"`
  - Position 4: "Spec" → `"special"`
  - Position 5: "Fav" → `"fav"`

  When displaying category names in UI, always use `getCategoryName(category)` to show full names.

  ## UI Component Patterns

  ### LED Indicators

  **Play/Pause Button LED:**
  - Green (solid) when playing
  - Red (slowly flashing, 2s cycle) when paused/stopped
  - Implemented in `components/PlaybackButtons/styles.ts`

  **Other Button LEDs:**
  - Red when momentarily active (button press)
  - Dark (#3a0000) when inactive

  **Implementation Note:**
  When using keyframes in styled-components v4+, must wrap with `css` helper:
  ```typescript
  import styled, { css, keyframes } from "styled-components";

  const myAnimation = keyframes`...`;

  const Component = styled.div`
    ${props => props.animate && css`
      animation: ${myAnimation} 1s ease;
    `}
  `;
  ```

  ### Responsive Design

  Mobile breakpoint: `@media (max-width: 1024px)`

  **CompactPlayer (mobile view):**
  - Larger font sizes (20px vs 14px)
  - Increased padding (16px vs 8px)
  - Taller display area for better readability

  **HomePage Mobile Layout:**
  - Collapsible info panel with toggle
  - Full-width mix cards
  - Themed scrollable track list
  - CompactControls at bottom

  ### Mix Information Display

  Always show these fields when available:
  - DJ name (`user.name`)
  - Category (use `getCategoryName()`)
  - Duration
  - Release Date
  - Upload date (`created_time`)
  - Audio length (in minutes)
  - Play count
  - Tags (comma-separated)
  - Notes

  ## Context and State Management

  ### Mixcloud Context
  - `useMixcloud()` hook provides state and actions
  - `state.isPlaying` - current playback state
  - `state.position` - current position in seconds
  - `state.duration` - total duration in seconds
  - `state.filters.category` - current category filter
  - `actions.getCurrentMix()` - get current mix data
  - `actions.toggle()` - play/pause
  - `actions.next()` / `actions.previous()` - navigation
  - `actions.updateFilter()` / `actions.applyFilters()` - filtering

  ### Theme Context
  - `useTheme()` hook provides theme state and actions
  - `theme.state.mode` - current theme mode ("light" | "dark" | "mixed")
  - `theme.actions.setTheme(mode)` - change theme mode
  - Theme persisted to localStorage with key `"stef-fm-theme"`