import type {
  MixcloudContextState,
  MixcloudProviderProps,
} from "contexts/mixcloud/types";
import useMixcloudContextState from "contexts/mixcloud/useMixcloudContextState";
import contextFactory from "utils/contextFactory";

const { Consumer, Provider, useContext } = contextFactory<
  MixcloudContextState,
  Omit<MixcloudProviderProps, "children">
>(useMixcloudContextState);

export {
  Consumer as MixcloudConsumer,
  Provider as MixcloudProvider,
  useContext as useMixcloud,
};
