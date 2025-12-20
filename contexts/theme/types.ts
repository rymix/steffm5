export type ThemeMode = "dark" | "light" | "mixed";

export interface ThemeState {
  mode: ThemeMode;
}

export interface ThemeActions {
  setTheme: (_mode: ThemeMode) => void;
}

export interface ThemeContextState {
  state: ThemeState;
  actions: ThemeActions;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}
