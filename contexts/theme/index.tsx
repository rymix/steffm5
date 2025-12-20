import type {
  ThemeContextState,
  ThemeProviderProps,
} from "contexts/theme/types";
import useThemeContextState from "contexts/theme/useThemeContextState";
import contextFactory from "utils/contextFactory";

const { Consumer, Provider, useContext } = contextFactory<
  ThemeContextState,
  Omit<ThemeProviderProps, "children">
>(useThemeContextState);

export {
  Consumer as ThemeConsumer,
  Provider as ThemeProvider,
  useContext as useTheme,
};
