import styled from "styled-components";

interface StyledModalProps {
  $isOpen: boolean;
}

export const StyledModal = styled.div<StyledModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    ${(props) => (props.$isOpen ? "scale(1)" : "scale(0.9) translateY(-20px)")};
  z-index: 1000; /* Above shared overlay, below menu */
  background: #f5f5f5;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-width: 95vw;
  max-height: 90vh;
  width: 800px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 0 24px;
  flex-shrink: 0;

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #2a2a2a;
  }
`;

export const StyledModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  font-weight: bold;
  color: #7a7a7a;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #2a2a2a;
    background-color: #e0e0e0;
  }

  &:focus {
    outline: 2px solid #4a9f4a;
    outline-offset: 2px;
  }
`;

export const StyledModalContent = styled.div`
  padding: 0;
  overflow-y: auto;
  flex: 1;
  min-height: 0;

  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #909090;
  }
`;
