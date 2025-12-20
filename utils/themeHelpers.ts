import type { ThemeMode } from "contexts/theme/types";

/**
 * Get the theme mode for modal content
 * In mixed mode, modals use light theme while main panel uses dark
 */
export const getModalThemeMode = (themeMode: ThemeMode): "light" | "dark" => {
  return themeMode === "mixed" ? "light" : themeMode;
};

/**
 * Get the theme mode for the main panel (mix/tracks)
 * In mixed mode, panel uses dark theme while modals use light
 */
export const getPanelThemeMode = (themeMode: ThemeMode): "light" | "dark" => {
  return themeMode === "light" ? "light" : "dark";
};
