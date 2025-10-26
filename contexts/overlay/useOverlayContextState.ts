import { useCallback, useMemo, useState } from "react";

import type {
  OverlayActions,
  OverlayContextState,
  OverlayState,
} from "./types";

const useOverlayContextState = (): OverlayContextState => {
  const [state, setState] = useState<OverlayState>({
    isModalOpen: false,
    isMenuOpen: false,
    isDimmed: false,
  });

  const setModalOpen = useCallback((open: boolean) => {
    setState((prev) => ({
      ...prev,
      isModalOpen: open,
      isDimmed: open || prev.isMenuOpen,
    }));
  }, []);

  const setMenuOpen = useCallback((open: boolean) => {
    setState((prev) => ({
      ...prev,
      isMenuOpen: open,
      isDimmed: open || prev.isModalOpen,
    }));
  }, []);

  const closeAll = useCallback(() => {
    setState({
      isModalOpen: false,
      isMenuOpen: false,
      isDimmed: false,
    });
  }, []);

  const actions: OverlayActions = useMemo(
    () => ({
      setModalOpen,
      setMenuOpen,
      closeAll,
    }),
    [setModalOpen, setMenuOpen, closeAll],
  );

  return {
    state,
    actions,
  };
};

export default useOverlayContextState;
