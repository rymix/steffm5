export interface OverlayState {
  isModalOpen: boolean;
  isMenuOpen: boolean;
  isDimmed: boolean;
}

export interface OverlayActions {
  setModalOpen: (_open: boolean) => void;
  setMenuOpen: (_open: boolean) => void;
  closeAll: () => void;
}

export interface OverlayContextState {
  state: OverlayState;
  actions: OverlayActions;
}

export interface OverlayProviderProps {
  children: React.ReactNode;
}
