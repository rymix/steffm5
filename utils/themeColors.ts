/**
 * Centralized theme colors for the Stef.FM application
 *
 * This file provides a single source of truth for all theme-related colors.
 * Instead of inline color values throughout styled components, import these
 * constants for consistent theming.
 *
 * Usage:
 * ```typescript
 * import { getTextColor, getBorderColor } from "utils/themeColors";
 *
 * const StyledComponent = styled.div<{ $themeMode: "light" | "dark" }>`
 *   color: ${props => getTextColor(props.$themeMode, "primary")};
 *   border: 1px solid ${props => getBorderColor(props.$themeMode, "primary")};
 * `;
 * ```
 */

export type ThemeMode = "light" | "dark";

/**
 * Color palette for light and dark themes
 */
export const THEME_COLORS = {
  light: {
    // Text colors
    text: {
      primary: "#2a2a2a",
      secondary: "#3a3a3a",
      tertiary: "#4a4a4a",
      muted: "#5a5a5a",
      disabled: "#888888",
    },
    // Background colors
    background: {
      primary: "#f5f5f5",
      secondary: "#e8e8e8",
      tertiary: "#d8d8d8",
      modal: "#fafafa",
      panel: "#e9ecef",
    },
    // Border colors
    border: {
      primary: "#c0c0c0",
      secondary: "#b0b0b0",
      tertiary: "#a8a8a8",
      light: "#d0d0d0",
    },
    // Accent colors (theme-independent)
    accent: {
      green: "#4a9f4a",
      greenHover: "#3a8f3a",
      greenActive: "#2a7f2a",
      blue: "#4a8fc4",
      blueHover: "#3a7fb4",
      orange: "#e89542",
      orangeHover: "#d88532",
      red: "#ff3333",
      redDark: "#8a0000",
    },
    // Shadow colors
    shadow: {
      light: "rgba(0, 0, 0, 0.05)",
      medium: "rgba(0, 0, 0, 0.1)",
      strong: "rgba(0, 0, 0, 0.2)",
    },
  },
  dark: {
    // Text colors
    text: {
      primary: "#e8e8e8",
      secondary: "#d8d8d8",
      tertiary: "#c8c8c8",
      muted: "#a8a8a8",
      disabled: "#707070",
    },
    // Background colors
    background: {
      primary: "#1a1a1a",
      secondary: "#2a2a2a",
      tertiary: "#3a3a3a",
      modal: "#343434",
      panel: "#424242",
    },
    // Border colors
    border: {
      primary: "#404040",
      secondary: "#505050",
      tertiary: "#585858",
      light: "#4a4a4a",
    },
    // Accent colors (same as light theme)
    accent: {
      green: "#4a9f4a",
      greenHover: "#3a8f3a",
      greenActive: "#2a7f2a",
      blue: "#4a8fc4",
      blueHover: "#3a7fb4",
      orange: "#e89542",
      orangeHover: "#d88532",
      red: "#ff3333",
      redDark: "#8a0000",
    },
    // Shadow colors
    shadow: {
      light: "rgba(0, 0, 0, 0.5)",
      medium: "rgba(0, 0, 0, 0.7)",
      strong: "rgba(0, 0, 0, 0.9)",
    },
  },
} as const;

/**
 * Get text color for the given theme mode
 */
export function getTextColor(
  themeMode: ThemeMode,
  variant: keyof typeof THEME_COLORS.light.text = "primary",
): string {
  return THEME_COLORS[themeMode].text[variant];
}

/**
 * Get background color for the given theme mode
 */
export function getBackgroundColor(
  themeMode: ThemeMode,
  variant: keyof typeof THEME_COLORS.light.background = "primary",
): string {
  return THEME_COLORS[themeMode].background[variant];
}

/**
 * Get border color for the given theme mode
 */
export function getBorderColor(
  themeMode: ThemeMode,
  variant: keyof typeof THEME_COLORS.light.border = "primary",
): string {
  return THEME_COLORS[themeMode].border[variant];
}

/**
 * Get accent color (theme-independent)
 */
export function getAccentColor(
  themeMode: ThemeMode,
  variant: keyof typeof THEME_COLORS.light.accent,
): string {
  return THEME_COLORS[themeMode].accent[variant];
}

/**
 * Get shadow color for the given theme mode
 */
export function getShadowColor(
  themeMode: ThemeMode,
  variant: keyof typeof THEME_COLORS.light.shadow = "light",
): string {
  return THEME_COLORS[themeMode].shadow[variant];
}

/**
 * Helper to create a styled component with theme support
 *
 * Example:
 * ```typescript
 * const StyledDiv = styled.div<ThemeProps>`
 *   ${themeStyles({
 *     color: (mode) => getTextColor(mode, "primary"),
 *     background: (mode) => getBackgroundColor(mode, "primary"),
 *   })}
 * `;
 * ```
 */
export interface ThemeProps {
  $themeMode: ThemeMode;
}

export function themeStyles(
  styles: Record<string, (_mode: ThemeMode) => string>,
): string {
  return Object.entries(styles)
    .map(([property, getValue]) => {
      return `${property}: \${props => ${JSON.stringify(getValue("light"))} === props.$themeMode ? ${JSON.stringify(getValue("light"))} : ${JSON.stringify(getValue("dark"))}};`;
    })
    .join("\n  ");
}
