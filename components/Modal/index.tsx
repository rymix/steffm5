import React, { useEffect, useRef } from "react";

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
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) {
    return null;
  }

  return (
    <StyledModalBackdrop onClick={handleBackdropClick}>
      <StyledModal ref={modalRef}>
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
