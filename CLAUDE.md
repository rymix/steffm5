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