import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import Screen from "components/shared/BackgroundList/RetroPC/Screen";
import {
  StyledBadge,
  StyledLogo,
  StyledLogoText,
  StyledMonitor,
  StyledMonitorPanel,
  StyledMonitorStand,
  StyledMonitorWrapper,
} from "components/shared/BackgroundList/RetroPC/StyledRetroPC";

const MonitorComponent: React.FC = () => {
  const {
    session: { scale },
  } = useMixcloud();

  return (
    <StyledMonitorWrapper $scale={scale || undefined}>
      <StyledMonitor>
        <StyledLogo>
          <StyledLogoText>
            <StyledBadge src="/favicon-32x32.png" alt="STEF.FM" />
          </StyledLogoText>
        </StyledLogo>
        <StyledMonitorPanel />
        <Screen />
        <StyledMonitorStand />
      </StyledMonitor>
    </StyledMonitorWrapper>
  );
};

export default MonitorComponent;
