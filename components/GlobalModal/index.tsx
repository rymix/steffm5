import { useModal } from "contexts/modal";
import React from "react";

import Modal from "components/Modal";

const GlobalModal: React.FC = () => {
  const { state, actions } = useModal();

  if (!state.currentContent) {
    return null;
  }

  return (
    <Modal
      isOpen={state.isOpen}
      onClose={actions.closeModal}
      title={state.currentContent.title}
      autoCloseTimeout={state.currentContent.autoCloseTimeout}
    >
      {state.currentContent.component}
    </Modal>
  );
};

export default GlobalModal;
