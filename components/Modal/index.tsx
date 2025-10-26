import React, { useEffect, useRef, useState } from "react";

import {
  StyledModal,
  StyledModalBackdrop,
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

  // Handle visibility for transitions
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // Delay hiding to allow fade out
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent background scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <StyledModalBackdrop $isOpen={isOpen} onClick={handleBackdropClick}>
      <StyledModal ref={modalRef} $isOpen={isOpen}>
        <StyledModalHeader>
          {title && <h2>{title}</h2>}
          <StyledModalCloseButton onClick={onClose} aria-label="Close modal">
            ×
          </StyledModalCloseButton>
        </StyledModalHeader>
        <StyledModalContent>{children}</StyledModalContent>
      </StyledModal>
    </StyledModalBackdrop>
  );
};

export default Modal;
