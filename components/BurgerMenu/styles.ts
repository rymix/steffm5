import styled from "styled-components";

interface StyledBurgerButtonProps {
  $isOpen: boolean;
}

interface StyledBurgerLineProps {
  $isOpen: boolean;
  $line: "top" | "middle" | "bottom";
}

interface StyledMenuProps {
  $isOpen: boolean;
}

export const StyledBurgerButton = styled.button<StyledBurgerButtonProps>`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1002; /* Above shared overlay and menu */
  width: 48px;
  height: 48px;
  background: #e8e8e8;
  border: 1px solid #b0b0b0;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #d8d8d8;
    border-color: #a0a0a0;
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid #4a9f4a;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    top: 16px;
    left: 16px;
    width: 44px;
    height: 44px;
  }
`;

export const StyledBurgerLine = styled.div<StyledBurgerLineProps>`
  width: 24px;
  height: 3px;
  background: #3a3a3a;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;

  ${({ $isOpen, $line }) => {
    if (!$isOpen) return "";

    switch ($line) {
      case "top":
        return `
          transform: translateY(7px) rotate(45deg);
        `;
      case "middle":
        return `
          opacity: 0;
          transform: scale(0);
        `;
      case "bottom":
        return `
          transform: translateY(-7px) rotate(-45deg);
        `;
      default:
        return "";
    }
  }}
`;

export const StyledMenu = styled.div<StyledMenuProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 320px;
  max-width: 80vw;
  background: #f5f5f5;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
  z-index: 1001; /* Above shared overlay, below burger button */
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  transform: ${(props) =>
    props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 280px;
  }
`;

export const StyledMenuContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 80px 20px 20px 20px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0;
  }

  &::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #909090;
  }
`;

export const StyledMenuTitle = styled.h1`
  margin: 0 0 30px 0;
  padding: 0 24px;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2a2a2a;
  border-bottom: 2px solid #d0d0d0;
  padding-bottom: 20px;
`;

export const StyledMenuSection = styled.section`
  margin-bottom: 24px;

  h3 {
    margin: 0 0 12px 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #5a5a5a;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const StyledMenuItem = styled.button`
  width: 100%;
  padding: 18px 16px;
  background: #e8e8e8;
  border: 2px solid #c0c0c0;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2a2a2a;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

  &:hover {
    background: #b8b8b8;
    border-color: #989898;
    color: #1a1a1a;
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: 2px solid #4a9f4a;
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const StyledMenuFooter = styled.footer`
  padding: 20px 24px;
  border-top: 1px solid #d0d0d0;
  background: #e8e8e8;

  p {
    margin: 0;
    font-size: 0.8rem;
    color: #5a5a5a;
    text-align: center;

    &:first-child {
      font-weight: 600;
      color: #3a3a3a;
      margin-bottom: 4px;
    }
  }
`;
