import { useOverlay } from "contexts/overlay";
import React, { useEffect, useRef, useState } from "react";

import { useEscapeKey } from "hooks/useEscapeKey";
import { useModalTheme } from "hooks/useThemeMode";

import {
  StyledModal,
  StyledModalCloseButton,
  StyledModalContent,
  StyledModalHeader,
} from "./styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  autoCloseTimeout?: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  autoCloseTimeout,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { actions: overlayActions } = useOverlay();
  const modalThemeMode = useModalTheme();

  // Handle auto-close timeout
  useEffect(() => {
    if (isOpen && autoCloseTimeout && autoCloseTimeout > 0) {
      timeoutRef.current = setTimeout(() => {
        onClose();
      }, autoCloseTimeout);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isOpen, autoCloseTimeout, onClose]);

  // Handle visibility for transitions and overlay state
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      overlayActions.setModalOpen(true);
    } else {
      overlayActions.setModalOpen(false);
      // Delay hiding to allow fade out
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, overlayActions]);

  // Handle ESC key press
  useEscapeKey(isOpen, onClose);

  if (!isVisible) {
    return null;
  }

  return (
    <StyledModal ref={modalRef} $isOpen={isOpen} $themeMode={modalThemeMode}>
      <StyledModalHeader $themeMode={modalThemeMode}>
        {title && <h2>{title}</h2>}
        <StyledModalCloseButton
          onClick={onClose}
          aria-label="Close modal"
          $themeMode={modalThemeMode}
        >
          ×
        </StyledModalCloseButton>
      </StyledModalHeader>
      <StyledModalContent $themeMode={modalThemeMode}>
        {children}
      </StyledModalContent>
    </StyledModal>
  );
};

export default Modal;
