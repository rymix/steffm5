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
  background: rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid #007bff;
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
  background: white;
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
  background: white;
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
  padding: 80px 0 20px 0;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const StyledMenuTitle = styled.h1`
  margin: 0 0 30px 0;
  padding: 0 24px;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 20px;
`;

export const StyledMenuSection = styled.section`
  margin-bottom: 24px;
  padding: 0 24px;

  h3 {
    margin: 0 0 12px 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #7f8c8d;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const StyledMenuItem = styled.button`
  width: 100%;
  padding: 12px 0;
  background: none;
  border: none;
  text-align: left;
  font-size: 1rem;
  color: #34495e;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-bottom: 4px;

  &:hover {
    background: #f8f9fa;
    color: #2c3e50;
    padding-left: 8px;
  }

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
    background: #e3f2fd;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const StyledMenuFooter = styled.footer`
  padding: 20px 24px;
  border-top: 1px solid #ecf0f1;
  background: #f8f9fa;

  p {
    margin: 0;
    font-size: 0.8rem;
    color: #95a5a6;
    text-align: center;

    &:first-child {
      font-weight: 600;
      color: #7f8c8d;
      margin-bottom: 4px;
    }
  }
`;
