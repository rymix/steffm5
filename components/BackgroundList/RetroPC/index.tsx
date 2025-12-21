import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import Screen from "components/BackgroundList/RetroPC/Screen";
import {
  StyledBadge,
  StyledLogo,
  StyledLogoText,
  StyledMonitor,
  StyledMonitorPanel,
  StyledMonitorStand,
  StyledMonitorWrapper,
} from "components/BackgroundList/RetroPC/StyledRetroPC";

const MonitorComponent: React.FC = () => {
  const {
    session: { scale },
  } = useMixcloud();

  return (
    <StyledMonitorWrapper $scale={scale || undefined}>
      <StyledMonitor>
        <StyledLogo>
          <StyledLogoText>
            <StyledBadge src="/favicon-32x32.png" alt="Stef.FM" />
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
