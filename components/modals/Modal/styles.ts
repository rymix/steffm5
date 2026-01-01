import { Z_INDEX } from "constants/zIndex";
import type { ThemeMode } from "contexts/theme/types";
import styled from "styled-components";

interface StyledModalProps {
  $isOpen: boolean;
  $themeMode: ThemeMode;
}

export const StyledModal = styled.div<StyledModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    ${(props) => (props.$isOpen ? "scale(1)" : "scale(0.9) translateY(-20px)")};
  z-index: ${Z_INDEX.MODAL_PAGE};
  background: ${(props) =>
    props.$themeMode === "dark" ? "#1a1a1a" : "#f5f5f5"};
  border: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#3a3a3a" : "#d0d0d0")};
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

interface StyledModalHeaderProps {
  $themeMode: ThemeMode;
}

export const StyledModalHeader = styled.div<StyledModalHeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 0 24px;
  flex-shrink: 0;

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
  }
`;

interface StyledModalCloseButtonProps {
  $themeMode: ThemeMode;
}

export const StyledModalCloseButton = styled.button<StyledModalCloseButtonProps>`
  background: none;
  border: none;
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => (props.$themeMode === "dark" ? "#a8a8a8" : "#7a7a7a")};
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
    color: ${(props) => (props.$themeMode === "dark" ? "#ffffff" : "#2a2a2a")};
    background-color: ${(props) =>
      props.$themeMode === "dark" ? "#2a2a2a" : "#e0e0e0"};
  }

  &:focus {
    outline: 2px solid #4a9f4a;
    outline-offset: 2px;
  }
`;

interface StyledModalContentProps {
  $themeMode: ThemeMode;
}

export const StyledModalContent = styled.div<StyledModalContentProps>`
  padding: 0;
  overflow-y: auto;
  flex: 1;
  min-height: 0;

  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#2a2a2a" : "#e0e0e0"};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#404040" : "#b0b0b0"};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#505050" : "#909090"};
  }
`;
