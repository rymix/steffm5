import { useMixcloud } from "contexts/mixcloud";
import { useMemo } from "react";

import {
  StyledMixcloudConnected,
  StyledMixcloudConnectedWrapper,
} from "components/MixcloudConnected/StyledMixcloudConnected";
import type { MixcloudConnectedProps } from "components/MixcloudConnected/types";

const MixcloudConnected: React.FC<MixcloudConnectedProps> = ({ style }) => {
  const { state } = useMixcloud();

  // Determine connection status based on context state
  const isConnected = useMemo(() => {
    // Widget is ready when we have a current mix loaded and duration is known
    // This indicates the Mixcloud iframe has loaded and communicated back
    return !!(state.currentKey && state.duration > 0 && !state.isLoading);
  }, [state.currentKey, state.duration, state.isLoading]);

  return (
    <StyledMixcloudConnectedWrapper style={style}>
      <StyledMixcloudConnected $connected={isConnected} />
    </StyledMixcloudConnectedWrapper>
  );
};

export default MixcloudConnected;
