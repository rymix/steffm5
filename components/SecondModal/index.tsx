import { useModal } from "contexts/modal";
import React from "react";

import HelloWorldModal from "components/HelloWorldModal";

import { StyledButton, StyledContent, StyledSection } from "./styles";

const SecondModal: React.FC = () => {
  const modal = useModal();

  return (
    <StyledContent>
      <StyledSection>
        <h1>Second Modal Demo!</h1>
        <p>
          This is a demonstration of the modal switching feature. This modal was
          opened from within another modal, automatically switching the content
          while keeping the same modal instance.
        </p>
      </StyledSection>

      <StyledSection>
        <h2>Modal Management Features</h2>
        <ul>
          <li>✅ Auto-close timeout (this modal auto-closes in 15 seconds)</li>
          <li>✅ External modal control and switching</li>
          <li>✅ Smooth fade transitions</li>
          <li>✅ Single modal instance with content switching</li>
          <li>✅ Context-based modal management</li>
        </ul>
      </StyledSection>

      <StyledSection>
        <h2>Test Modal Switching</h2>
        <p>Click the button below to switch back to the Hello World modal:</p>
        <StyledButton
          onClick={() =>
            modal.actions.switchContent({
              id: "hello-world-switched",
              title: "Hello World (Switched Back)",
              component: <HelloWorldModal />,
            })
          }
        >
          Switch to Hello World Modal
        </StyledButton>
      </StyledSection>

      <StyledSection>
        <h2>How It Works</h2>
        <p>
          The modal system uses a React Context to manage global modal state.
          This allows any component to:
        </p>
        <ol>
          <li>Open a new modal (replacing any existing one)</li>
          <li>Switch modal content without closing/reopening</li>
          <li>Close modals from anywhere in the app</li>
          <li>Set auto-close timeouts</li>
        </ol>
      </StyledSection>
    </StyledContent>
  );
};

export default SecondModal;
