import React, { createContext, useCallback, useContext, useState } from "react";

export interface WindowInfo {
  id: string;
  label?: string;
  icon?: string;
  isVisible: boolean;
  openWindow: () => void;
}

interface WindowManagerContextType {
  windows: Map<string, WindowInfo>;
  registerWindow: (_window: WindowInfo) => void;
  unregisterWindow: (_id: string) => void;
  updateWindow: (_id: string, _updates: Partial<WindowInfo>) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(
  null,
);

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error(
      "useWindowManager must be used within WindowManagerProvider",
    );
  }
  return context;
};

export const WindowManagerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [windows, setWindows] = useState<Map<string, WindowInfo>>(new Map());

  const registerWindow = useCallback((window: WindowInfo) => {
    setWindows((prev) => {
      const next = new Map(prev);
      next.set(window.id, window);
      return next;
    });
  }, []);

  const unregisterWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const updateWindow = useCallback(
    (id: string, updates: Partial<WindowInfo>) => {
      setWindows((prev) => {
        const next = new Map(prev);
        const existingWindow = next.get(id);
        if (existingWindow) {
          next.set(id, { ...existingWindow, ...updates });
        }
        return next;
      });
    },
    [],
  );

  return (
    <WindowManagerContext.Provider
      value={{ windows, registerWindow, unregisterWindow, updateWindow }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};
