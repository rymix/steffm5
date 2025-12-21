import { useCallback, useEffect, useMemo, useState } from "react";

import type {
  ThemeActions,
  ThemeContextState,
  ThemeMode,
  ThemeState,
} from "./types";

const THEME_STORAGE_KEY = "stef-fm-theme";

const useThemeContextState = (): ThemeContextState => {
  // Always start with default to ensure SSR matches client initial render
  const [state, setState] = useState<ThemeState>({ mode: "mixed" });

  // Load theme from localStorage after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (
        savedTheme === "dark" ||
        savedTheme === "light" ||
        savedTheme === "mixed"
      ) {
        setState({ mode: savedTheme });
      }
    }
  }, []);

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
