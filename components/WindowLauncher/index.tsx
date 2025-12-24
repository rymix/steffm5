import React from "react";

import { useTheme } from "../../contexts/theme";
import { useWindowManager } from "../../contexts/windowManager";
import { StyledLauncher, StyledLauncherIcon } from "./styles";

const WindowLauncher: React.FC = () => {
  const { windows } = useWindowManager();
  const theme = useTheme();
  // Mixed and dark modes should use dark launcher icons
  const launcherThemeMode = theme.state.mode === "light" ? "light" : "dark";

  // Get all windows
  const allWindows = Array.from(windows.values());

  if (allWindows.length === 0) {
    return null;
  }

  return (
    <StyledLauncher>
      {allWindows.map((window) => (
        <StyledLauncherIcon
          key={window.id}
          onClick={window.openWindow}
          title={window.label}
          $themeMode={launcherThemeMode}
        >
          {window.icon?.startsWith("/") ? (
            <img src={window.icon} alt={window.label} className="icon-image" />
          ) : (
            <span className="icon">{window.icon || "◻"}</span>
          )}
          <span className="label">{window.label}</span>
        </StyledLauncherIcon>
      ))}
    </StyledLauncher>
  );
};

export default WindowLauncher;
