import type { MixcloudContextState } from "contexts/mixcloud/types";
import useMixcloudContextState from "contexts/mixcloud/useMixcloudContextState";
import contextFactory from "utils/contextFactory";

const { Consumer, Provider, useContext } = contextFactory<MixcloudContextState>(
  useMixcloudContextState,
);

export {
  Consumer as MixcloudConsumer,
  Provider as MixcloudProvider,
  useContext as useMixcloud,
};
