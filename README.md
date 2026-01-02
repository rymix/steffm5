### ☆。★。☆。★  
### ★。☆。★。☆
### ★。＼｜／。★ 
# &nbsp; [stef.fm](https://stef.fm)
### ★。／｜＼。★
### ☆。☆。★。☆   
### ☆。★。☆。★

Stef.FM is a Next.js-based immersive music player application with Mixcloud integration, dynamic visual effects, and retro-style hardware UI.

## Overview

STEF.FM is a full-stack web application that provides an immersive music playback experience with a unique retro hardware-inspired interface. Built with Next.js 15, TypeScript, and styled-components, it features a draggable and resizable player, category filtering, mix tracking, and comprehensive touch/mouse/keyboard controls.

## Features

### 🎛️ Hardware-Style Player Interface
- **Draggable & Resizable Player**: Desktop player with touch and mouse support for positioning and scaling
- **Retro Wood & Metal Design**: Authentic hardware aesthetic with wood panels, metal controls, and LED indicators
- **Physical Controls**:
  - Volume dial with mouse wheel and drag support
  - Category dial with 6 positions (All, Adventures in Decent Music, My Pair of Shoes, Cock Soup, Special, Favourites)
  - Playback buttons with LED indicators
  - Shuffle, Random Mix, and Share functionality

### 📱 Responsive Design
- **Desktop Mode**: Full draggable player with side panel for mix information
- **Mobile/Tablet Mode**: Optimized compact player with collapsible info panel
- **Landscape Support**: Adaptive layouts for landscape orientation
- **Touch-Optimized**: Full touch support for all controls including drag, resize, and dial manipulation

### 🎨 Theme System
- **Three Theme Modes**:
  - Light: All UI elements use light theme
  - Dark: All UI elements use dark theme
  - Mixed: Panels use dark theme, modals/menus use light theme
- **Theme Persistence**: User preferences saved to localStorage
- **Themed Components**: Contextual theming across panels, modals, menus, and content areas

### 🎵 Music Features
- **Mixcloud Integration**: Full API integration for mixes, tracks, and metadata
- **Category Filtering**: Filter mixes by predefined categories
- **Track Display**: Real-time track information with scrolling text display
- **Mix Information Panel**: Detailed mix metadata, DJ info, track lists, and cover art
- **Progress Tracking**: Visual progress bars and position indicators
- **Random Mix**: Play random mixes from filtered categories

### 🖥️ Technical Features
- **Server-Side Rendering**: Next.js with API routes
- **Database Integration**: SQLite with better-sqlite3 for mix and track storage
- **State Management**: React Context API for Mixcloud, Theme, and Modal state
- **TypeScript**: Full type safety throughout the application
- **Styled Components**: CSS-in-JS with transient props for optimal performance
- **Modal System**: Global modal management with auto-close, content switching, and smooth transitions

## Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 18**: UI library with hooks and context
- **TypeScript**: Type-safe JavaScript
- **Styled Components**: CSS-in-JS styling solution
- **React Context**: Global state management

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **better-sqlite3**: SQLite database for data persistence
- **Node.js**: Runtime environment

### Development Tools
- **ESLint**: Code linting with Prettier integration
- **Jest**: Unit testing framework
- **Testing Library**: React component testing
- **Vite**: Fast build tooling

## Project Structure

```
steffm5/
├── components/          # React components
│   ├── BurgerMenu/     # Navigation menu with theme controls
│   ├── CompactPlayer/  # Mobile-optimized player
│   ├── DisplayDevice/  # Side panel for mix information
│   ├── HomePage/       # Main page layout
│   ├── MainPlayer/     # Desktop player with dials and controls
│   ├── MixFilter/      # Category and tag filtering
│   ├── MixList/        # Mix list with playback controls
│   └── PlaybackButtons/ # Playback control buttons
├── contexts/           # React contexts
│   ├── mixcloud/       # Mixcloud state and actions
│   ├── modal/          # Global modal management
│   └── theme/          # Theme state and persistence
├── db/                 # Database files and migrations
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   └── player.tsx      # Main player page
├── public/             # Static assets
├── styles/             # Global styles
└── utils/              # Utility functions

```

## Getting Started

### Prerequisites
- Node.js 18+ or npm 9+
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd steffm5
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server (Vite)
- `npm start` - Start dev server on port 3000 with host access
- `npm run build` - Build for production
- `npm test` - Run Jest test suite
- `npm run eslint` - Run ESLint
- `npm run eslint:fix` - Run ESLint with auto-fix
- `npm run format:check` - Check Prettier formatting

## API Routes

### Mixes
- `GET /api/mixes` - Get filtered mixes
- `GET /api/mix/[mixcloudKey]` - Get specific mix details
- `GET /api/latestMixes` - Get latest mixes
- `GET /api/randomMix/[[...category]]` - Get random mix by category

### Categories & Tags
- `GET /api/categories` - Get all categories
- `GET /api/category/[code]` - Get category details
- `GET /api/tags` - Get all tags

### Tracks
- `GET /api/tracks/[mixcloudKey]` - Get tracks for a mix
- `GET /api/unknownTracks` - Get tracks without metadata

### Statistics
- `GET /api/stats` - Get playback statistics

### Search
- `GET /api/search` - Search mixes

### Background
- `GET /api/background/backgrounds` - Get available backgrounds
- `GET /api/background/categories` - Get background categories
- `GET /api/background/randomBackground` - Get random background

## Theme Helper Functions

The application uses utility functions for consistent theming:

### `getPanelThemeMode(themeMode)`
Returns theme mode for main panels (mix/track display areas).
- Returns `"light"` only when theme is `"light"`
- Returns `"dark"` for both `"dark"` and `"mixed"` modes

### `getModalThemeMode(themeMode)`
Returns theme mode for modals and menus.
- Returns `"light"` when theme is `"mixed"` or `"light"`
- Returns `"dark"` only when theme is `"dark"`

### `getCategoryName(categoryCode)`
Maps category codes to display names:
- `""` → "All Mixes"
- `"aidm"` → "Adventures in Decent Music"
- `"mpos"` → "My Pair of Shoes"
- `"cocksoup"` → "Cock Soup"
- `"special"` → "Special"
- `"fav"` → "Favourites"

## Database Schema

### Mixes Table
Stores mix metadata including name, category, DJ info, duration, and timestamps.

### Tracks Table
Stores track information including track name, artist, remix artist, start time, and timestamps.

### Mix_Track_Link Table
Links mixes to their tracks with ordering information.

## Deployment

The application is configured for deployment to Azure Web App using GitHub Actions. See `.github/workflows/main.yml` for the CI/CD pipeline configuration.

### Build Process
1. Install dependencies with Yarn
2. Run build (`next build`)
3. Run tests (Jest)
4. Create deployment package
5. Deploy to Azure

### Environment Variables
Configure the following in Azure Key Vault:
- `NEXT_PUBLIC_DISCOGS_API_TOKEN`
- `JWT_SECRET`
- `NEXT_PUBLIC_API_URL`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Keyboard Controls

- **Arrow Keys**: Navigate UI elements
- **Space**: Play/Pause
- **ESC**: Close modals
- **Mouse Wheel**: Adjust volume dial

## Touch Controls

- **Drag Player**: Touch and drag the wood panel to reposition
- **Resize Player**: Touch and drag the resize handle (bottom-right corner)
- **Dial Controls**: Touch and drag dials vertically to adjust
- **Display Panel Toggle**: Touch and drag the toggle handle to open/close

## License

This project uses the GPLv3 License.

## Contributing

This is a personal project, but feedback and suggestions are welcome. Please open an issue for any bugs or feature requests.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Music data from [Mixcloud API](https://www.mixcloud.com/developers/)
- Inspired by retro hardware audio equipment design

---

**Live URL**: [https://stef.fm](https://stef.fm)

**Repository**: [[GitHub Repository URL](https://github.com/rymix/steffm5)]
