export interface ModalContent {
  id: string;
  title?: string;
  component: React.ReactNode;
  autoCloseTimeout?: number;
}

export interface ModalState {
  isOpen: boolean;
  currentContent: ModalContent | null;
}

export interface ModalActions {
  openModal: (_content: ModalContent) => void;
  closeModal: () => void;
  switchContent: (_content: ModalContent) => void;
}

export interface ModalContextState {
  state: ModalState;
  actions: ModalActions;
}

export interface ModalProviderProps {
  children: React.ReactNode;
}
