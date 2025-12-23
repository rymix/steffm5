import type { ThemeMode } from "contexts/theme/types";
import styled from "styled-components";

interface StyledBurgerButtonProps {
  $isOpen: boolean;
  $themeMode: ThemeMode;
}

interface StyledBurgerLineProps {
  $isOpen: boolean;
  $line: "top" | "middle" | "bottom";
  $themeMode: ThemeMode;
}

interface StyledMenuProps {
  $isOpen: boolean;
  $themeMode: ThemeMode;
}

export const StyledBurgerButton = styled.button<StyledBurgerButtonProps>`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 500; /* Menu level - highest */
  width: 48px;
  height: 48px;
  background: ${(props) =>
    props.$themeMode === "light" ? "#e8e8e8" : "#2a2a2a"};
  border: 1px solid
    ${(props) => (props.$themeMode === "light" ? "#b0b0b0" : "#404040")};
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
    background: ${(props) =>
      props.$themeMode === "light" ? "#d8d8d8" : "#3a3a3a"};
    border-color: ${(props) =>
      props.$themeMode === "light" ? "#a0a0a0" : "#505050"};
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
  background: ${(props) =>
    props.$themeMode === "light" ? "#3a3a3a" : "#e8e8e8"};
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
  background: ${(props) =>
    props.$themeMode === "light" ? "#f5f5f5" : "#1a1a1a"};
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
  z-index: 499; /* Menu level - below burger button */
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

interface StyledMenuContentProps {
  $themeMode: ThemeMode;
}

export const StyledMenuContent = styled.div<StyledMenuContentProps>`
  flex: 1;
  overflow-y: auto;
  padding: 80px 20px 20px 20px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) =>
      props.$themeMode === "light" ? "#e0e0e0" : "#2a2a2a"};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.$themeMode === "light" ? "#b0b0b0" : "#404040"};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) =>
      props.$themeMode === "light" ? "#909090" : "#505050"};
  }
`;

interface StyledMenuTitleProps {
  $themeMode: ThemeMode;
}

export const StyledMenuTitle = styled.h1<StyledMenuTitleProps>`
  margin: 0 0 30px 0;
  padding: 0 24px;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => (props.$themeMode === "light" ? "#2a2a2a" : "#e8e8e8")};
  border-bottom: 2px solid
    ${(props) => (props.$themeMode === "light" ? "#d0d0d0" : "#3a3a3a")};
  padding-bottom: 20px;
`;

interface StyledMenuSectionProps {
  $themeMode: ThemeMode;
}

export const StyledMenuSection = styled.section<StyledMenuSectionProps>`
  margin-bottom: 24px;

  h3 {
    margin: 0 0 12px 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => (props.$themeMode === "light" ? "#5a5a5a" : "#a8a8a8")};
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

interface StyledMenuItemProps {
  $themeMode: ThemeMode;
}

export const StyledMenuItem = styled.button<StyledMenuItemProps>`
  width: 100%;
  padding: 18px 16px;
  background: ${(props) =>
    props.$themeMode === "light" ? "#e8e8e8" : "#2a2a2a"};
  border: 2px solid
    ${(props) => (props.$themeMode === "light" ? "#c0c0c0" : "#404040")};
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => (props.$themeMode === "light" ? "#2a2a2a" : "#e8e8e8")};
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

  &:hover {
    background: ${(props) =>
      props.$themeMode === "light" ? "#b8b8b8" : "#3a3a3a"};
    border-color: ${(props) =>
      props.$themeMode === "light" ? "#989898" : "#505050"};
    color: ${(props) => (props.$themeMode === "light" ? "#1a1a1a" : "#ffffff")};
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

interface StyledMenuFooterProps {
  $themeMode: ThemeMode;
}

interface StyledThemeToggleContainerProps {
  $themeMode: ThemeMode;
}

export const StyledThemeToggleContainer = styled.div<StyledThemeToggleContainerProps>`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 16px 20px;

  @media (max-width: 1024px) and (orientation: landscape) {
    padding: 4px 20px;
    gap: 8px;
  }
`;

interface StyledThemeButtonProps {
  $themeMode: ThemeMode;
  $isActive: boolean;
}

interface StyledThemeButtonInnerProps {
  $isMixed?: boolean;
}

export const StyledThemeButton = styled.button<StyledThemeButtonProps>`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 2px solid
    ${(props) => {
      if (props.$isActive) return "#4a9f4a";
      return props.$themeMode === "light" ? "#c0c0c0" : "#404040";
    }};
  background: ${(props) => {
    if (props.$isActive) {
      return props.$themeMode === "light" ? "#e8f5e8" : "#1a3a1a";
    }
    return props.$themeMode === "light" ? "#f5f5f5" : "#1a1a1a";
  }};
  color: ${(props) => {
    if (props.$isActive) return "#4a9f4a";
    return props.$themeMode === "light" ? "#3a3a3a" : "#e8e8e8";
  }};
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  @media (max-width: 1024px) and (orientation: landscape) {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  &:hover {
    border-color: ${(props) => (props.$isActive ? "#3a8f3a" : "#4a9f4a")};
    background: ${(props) => {
      if (props.$isActive) {
        return props.$themeMode === "light" ? "#d8ead8" : "#1a4a1a";
      }
      return props.$themeMode === "light" ? "#e8e8e8" : "#2a2a2a";
    }};
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid #4a9f4a;
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const StyledThemeButtonInner = styled.span<StyledThemeButtonInnerProps>`
  font-size: ${(props) => (props.$isMixed ? "16px" : "inherit")};
  letter-spacing: ${(props) => (props.$isMixed ? "-2px" : "normal")};
`;

export const StyledMenuFooter = styled.footer<StyledMenuFooterProps>`
  padding: 20px 24px;
  border-top: 1px solid
    ${(props) => (props.$themeMode === "light" ? "#d0d0d0" : "#3a3a3a")};
  background: ${(props) =>
    props.$themeMode === "light" ? "#e8e8e8" : "#2a2a2a"};

  @media (max-width: 1024px) and (orientation: landscape) {
    padding: 10px 24px;
  }

  p {
    margin: 0;
    font-size: 0.8rem;
    color: ${(props) => (props.$themeMode === "light" ? "#5a5a5a" : "#a8a8a8")};
    text-align: center;

    &:first-child {
      font-weight: 600;
      color: ${(props) =>
        props.$themeMode === "light" ? "#3a3a3a" : "#d8d8d8"};
      margin-bottom: 4px;
    }
  }
`;
