# Theme Architecture

## Overview

Stef.FM uses a three-mode theme system with centralized color management for consistent styling across the application.

## Theme Modes

The application supports three theme modes:

1. **light** - All UI elements use light theme
2. **dark** - All UI elements use dark theme
3. **mixed** - Panels/display use dark theme, modals/menus use light theme (default)

Theme preference is persisted in localStorage with key `"stef-fm-theme"`.

## Centralized Color Management

### Location
`utils/themeColors.ts` - Single source of truth for all theme colors

### Benefits
- **Consistency**: All components use the same color palette
- **Maintainability**: Change colors in one place, updates everywhere
- **Type Safety**: TypeScript ensures valid color variants
- **Performance**: No runtime color calculations
- **DX**: Autocomplete for color variants in IDEs

### Color Categories

#### Text Colors
- `primary` - Main text color
- `secondary` - Secondary text (slightly lighter/darker)
- `tertiary` - Tertiary text
- `muted` - Less prominent text
- `disabled` - Disabled state text

#### Background Colors
- `primary` - Main background
- `secondary` - Secondary background
- `tertiary` - Tertiary background
- `modal` - Modal/overlay background
- `panel` - Panel background

#### Border Colors
- `primary` - Main borders
- `secondary` - Secondary borders
- `tertiary` - Accent borders
- `light` - Subtle borders

#### Accent Colors
Theme-independent colors for interactive elements:
- `green` / `greenHover` / `greenActive` - Success/primary actions
- `blue` / `blueHover` - Info/secondary actions
- `orange` / `orangeHover` - Warning/in-progress states
- `red` / `redDark` - Error/active states

#### Shadow Colors
- `light` - Subtle shadows
- `medium` - Standard shadows
- `strong` - Prominent shadows

## Usage Patterns

### Basic Usage

```typescript
import { getTextColor, getBackgroundColor, getBorderColor } from "utils/themeColors";
import styled from "styled-components";

interface ThemeProps {
  $themeMode: "light" | "dark";
}

const StyledComponent = styled.div<ThemeProps>`
  color: ${props => getTextColor(props.$themeMode, "primary")};
  background: ${props => getBackgroundColor(props.$themeMode, "primary")};
  border: 1px solid ${props => getBorderColor(props.$themeMode, "primary")};
`;
```

### In Components

```typescript
import { useTheme } from "contexts/theme";
import { getModalThemeMode } from "utils/themeHelpers";

export const MyComponent: React.FC = () => {
  const theme = useTheme();
  const modalThemeMode = getModalThemeMode(theme.state.mode);

  return (
    <StyledWrapper $themeMode={modalThemeMode}>
      Content
    </StyledWrapper>
  );
};
```

## Theme Helper Functions

Located in `utils/themeHelpers.ts`:

### getPanelThemeMode(themeMode)
Returns theme for main panels (mix/track display areas):
- Returns `"light"` only when theme is `"light"`
- Returns `"dark"` for both `"dark"` and `"mixed"` modes
- Use for: DisplayDevice, HomePage mobile screens, track lists

### getModalThemeMode(themeMode)
Returns theme for modals and menus:
- Returns `"light"` when theme is `"mixed"` or `"light"`
- Returns `"dark"` only when theme is `"dark"`
- Use for: BurgerMenu, modal dialogs, Manual

### getCategoryName(categoryCode)
Maps category codes to display names:
- `""` → "All Mixes"
- `"aidm"` → "Adventures in Decent Music"
- `"mpos"` → "My Pair of Shoes"
- `"cocksoup"` → "Cock Soup"
- `"special"` → "Special"
- `"fav"` → "Favourites"

## Components That Should NEVER Use Theme

These components should always use light mode (never themed):
- MainPlayer wood panels and metal surfaces
- All dials (Volume, Category)
- Dial labels and text
- Button labels
- Metal control panels
- Logo plates and text

## Migration Guide

### Before (Inline Colors)
```typescript
const StyledDiv = styled.div`
  color: #2a2a2a;
  background: #f5f5f5;
  border: 1px solid #c0c0c0;
`;
```

### After (Theme-Aware)
```typescript
import { getTextColor, getBackgroundColor, getBorderColor } from "utils/themeColors";

interface ThemeProps {
  $themeMode: "light" | "dark";
}

const StyledDiv = styled.div<ThemeProps>`
  color: ${props => getTextColor(props.$themeMode, "primary")};
  background: ${props => getBackgroundColor(props.$themeMode, "primary")};
  border: 1px solid ${props => getBorderColor(props.$themeMode, "primary")};
`;
```

## Best Practices

1. **Use Helper Functions**: Always use `getTextColor()`, `getBackgroundColor()`, etc. instead of hardcoded colors
2. **Transient Props**: Use `$themeMode` (with dollar sign) to prevent React DOM warnings
3. **Type Safety**: Import `ThemeProps` interface for consistent typing
4. **Appropriate Variants**: Choose semantic color variants (`primary`, `secondary`, etc.) not arbitrary values
5. **Test Both Modes**: Verify components work in both light and dark modes
6. **Document Exceptions**: Components that shouldn't be themed should be clearly documented

## Future Improvements

1. **CSS Variables**: Consider using CSS custom properties for runtime theme switching
2. **Theme Provider**: Wrap app in ThemeProvider to inject theme via context
3. **Auto Dark Mode**: Respect system preference with `prefers-color-scheme`
4. **Custom Themes**: Allow users to customize specific colors
5. **High Contrast Mode**: Additional mode for accessibility

## Color Reference

### Light Mode
| Category | Variant | Hex | Usage |
|----------|---------|-----|-------|
| Text | primary | #2a2a2a | Main text |
| Text | secondary | #3a3a3a | Subheadings |
| Text | muted | #5a5a5a | Less important text |
| Background | primary | #f5f5f5 | Main background |
| Background | secondary | #e8e8e8 | Cards/sections |
| Border | primary | #c0c0c0 | Standard borders |

### Dark Mode
| Category | Variant | Hex | Usage |
|----------|---------|-----|-------|
| Text | primary | #e8e8e8 | Main text |
| Text | secondary | #d8d8d8 | Subheadings |
| Text | muted | #a8a8a8 | Less important text |
| Background | primary | #1a1a1a | Main background |
| Background | secondary | #2a2a2a | Cards/sections |
| Border | primary | #404040 | Standard borders |

### Accent Colors (Both Modes)
| Variant | Hex | Usage |
|---------|-----|-------|
| green | #4a9f4a | Success, Play |
| greenHover | #3a8f3a | Hover state |
| blue | #4a8fc4 | Info, Navigation |
| orange | #e89542 | Warning, In Progress |
| red | #ff3333 | Error, Active LED |

## See Also

- `utils/themeColors.ts` - Color constants and helper functions
- `utils/themeHelpers.ts` - Theme mode helpers
- `contexts/theme.tsx` - Theme context provider
- `CLAUDE.md` - General project documentation
