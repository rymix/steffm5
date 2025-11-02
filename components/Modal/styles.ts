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
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
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
    color: #333;
  }
`;

export const StyledModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  font-weight: bold;
  color: #999;
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
    color: #333;
    background-color: #f0f0f0;
  }

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`;

export const StyledModalContent = styled.div`
  padding: 20px 24px 24px 24px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;

  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;
