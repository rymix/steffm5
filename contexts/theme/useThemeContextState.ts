import { useCallback, useMemo, useState } from "react";

import type {
  ThemeActions,
  ThemeContextState,
  ThemeMode,
  ThemeState,
} from "./types";

const THEME_STORAGE_KEY = "stef-fm-theme";

const useThemeContextState = (): ThemeContextState => {
  const [state, setState] = useState<ThemeState>(() => {
    // Load theme from localStorage or default to mixed
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (
        savedTheme === "dark" ||
        savedTheme === "light" ||
        savedTheme === "mixed"
      ) {
        return { mode: savedTheme };
      }
    }
    return { mode: "mixed" };
  });

  const setTheme = useCallback((mode: ThemeMode) => {
    setState({ mode });
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
  }, []);

  const actions: ThemeActions = useMemo(
    () => ({
      setTheme,
    }),
    [setTheme],
  );

  return {
    state,
    actions,
  };
};

export default useThemeContextState;
