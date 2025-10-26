import { useCallback, useMemo, useRef, useState } from "react";

import type {
  ModalActions,
  ModalContent,
  ModalContextState,
  ModalState,
} from "./types";

const useModalContextState = (): ModalContextState => {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    currentContent: null,
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoCloseTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const setAutoCloseTimeout = useCallback(
    (timeout: number) => {
      clearAutoCloseTimeout();
      timeoutRef.current = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          isOpen: false,
        }));
        // Keep content for a moment to allow fade out transition
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            currentContent: null,
          }));
        }, 300); // Match transition duration
      }, timeout);
    },
    [clearAutoCloseTimeout],
  );

  const openModal = useCallback(
    (content: ModalContent) => {
      // If a modal is already open, close it first
      if (state.isOpen) {
        clearAutoCloseTimeout();
      }

      setState((prev) => ({
        ...prev,
        currentContent: content,
        isOpen: true,
      }));

      // Set auto-close timeout if specified
      if (content.autoCloseTimeout && content.autoCloseTimeout > 0) {
        setAutoCloseTimeout(content.autoCloseTimeout);
      }
    },
    [state.isOpen, clearAutoCloseTimeout, setAutoCloseTimeout],
  );

  const closeModal = useCallback(() => {
    clearAutoCloseTimeout();
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
    // Keep content for a moment to allow fade out transition
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        currentContent: null,
      }));
    }, 300); // Match transition duration
  }, [clearAutoCloseTimeout]);

  const switchContent = useCallback(
    (content: ModalContent) => {
      clearAutoCloseTimeout();
      setState((prev) => ({
        ...prev,
        currentContent: content,
      }));

      // Set new auto-close timeout if specified
      if (content.autoCloseTimeout && content.autoCloseTimeout > 0) {
        setAutoCloseTimeout(content.autoCloseTimeout);
      }
    },
    [clearAutoCloseTimeout, setAutoCloseTimeout],
  );

  const actions: ModalActions = useMemo(
    () => ({
      openModal,
      closeModal,
      switchContent,
    }),
    [openModal, closeModal, switchContent],
  );

  return {
    state,
    actions,
  };
};

export default useModalContextState;
