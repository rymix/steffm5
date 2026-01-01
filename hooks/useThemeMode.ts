import { useTheme } from "contexts/theme";
import { getModalThemeMode, getPanelThemeMode } from "utils/themeHelpers";

/**
 * Hook to get the theme mode for modal/menu content
 * In mixed mode, modals use light theme while main panel uses dark
 *
 * Simplifies:
 * ```typescript
 * const theme = useTheme();
 * const modalTheme = getModalThemeMode(theme.state.mode);
 * ```
 *
 * To:
 * ```typescript
 * const modalTheme = useModalTheme();
 * ```
 *
 * @returns "light" | "dark"
 */
export function useModalTheme(): "light" | "dark" {
  const theme = useTheme();
  return getModalThemeMode(theme.state.mode);
}

/**
 * Hook to get the theme mode for main panel content (mix/tracks)
 * In mixed mode, panel uses dark theme while modals use light
 *
 * Simplifies:
 * ```typescript
 * const theme = useTheme();
 * const panelTheme = getPanelThemeMode(theme.state.mode);
 * ```
 *
 * To:
 * ```typescript
 * const panelTheme = usePanelTheme();
 * ```
 *
 * @returns "light" | "dark"
 */
export function usePanelTheme(): "light" | "dark" {
  const theme = useTheme();
  return getPanelThemeMode(theme.state.mode);
}
