import type {
  OverlayContextState,
  OverlayProviderProps,
} from "contexts/overlay/types";
import useOverlayContextState from "contexts/overlay/useOverlayContextState";
import contextFactory from "utils/contextFactory";

const { Consumer, Provider, useContext } = contextFactory<
  OverlayContextState,
  Omit<OverlayProviderProps, "children">
>(useOverlayContextState);

export {
  Consumer as OverlayConsumer,
  Provider as OverlayProvider,
  useContext as useOverlay,
};
