import React from "react";

import { useWindowManager } from "../../contexts/windowManager";
import { StyledLauncher, StyledLauncherIcon } from "./styles";

const WindowLauncher: React.FC = () => {
  const { windows } = useWindowManager();

  // Get all closeable windows that are not visible
  const closedWindows = Array.from(windows.values()).filter(
    (window) => !window.isVisible && window.label,
  );

  if (closedWindows.length === 0) {
    return null;
  }

  return (
    <StyledLauncher>
      {closedWindows.map((window) => (
        <StyledLauncherIcon
          key={window.id}
          onClick={window.openWindow}
          title={window.label}
        >
          <span className="icon">{window.icon || "◻"}</span>
          <span className="label">{window.label}</span>
        </StyledLauncherIcon>
      ))}
    </StyledLauncher>
  );
};

export default WindowLauncher;
