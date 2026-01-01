import { useModal } from "contexts/modal";
import { useOverlay } from "contexts/overlay";
import React, { useEffect } from "react";

import { StyledBackdrop } from "./styles";

const SharedOverlay: React.FC = () => {
  const { state, actions } = useOverlay();
  const modal = useModal();

  // Prevent body scrolling when any overlay is open
  useEffect(() => {
    if (state.isDimmed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [state.isDimmed]);

  // Handle backdrop click - close all open overlays
  const handleBackdropClick = () => {
    if (state.isMenuOpen) {
      actions.setMenuOpen(false);
    }
    if (state.isModalOpen) {
      modal.actions.closeModal();
    }
  };

  if (!state.isDimmed) {
    return null;
  }

  return (
    <StyledBackdrop $isVisible={state.isDimmed} onClick={handleBackdropClick} />
  );
};

export default SharedOverlay;
