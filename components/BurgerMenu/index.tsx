import { useModal } from "contexts/modal";
import { useOverlay } from "contexts/overlay";
import { useTheme } from "contexts/theme";
import React, { useEffect, useRef, useState } from "react";
import { getModalThemeMode } from "utils/themeHelpers";

import MixListPage from "components/MixListPage";

import About from "../ContentPages/About";
import Statistics from "../ContentPages/Statistics";
import Manual from "../Manual";
import RandomBackground from "../RandomBackground";
import {
  StyledBurgerButton,
  StyledBurgerLine,
  StyledMenu,
  StyledMenuContent,
  StyledMenuFooter,
  StyledMenuItem,
  StyledMenuSection,
  StyledThemeButton,
  StyledThemeButtonInner,
  StyledThemeToggleContainer,
} from "./styles";

interface BurgerMenuProps {
  className?: string;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevModalOpen, setPrevModalOpen] = useState(false);
  const modal = useModal();
  const overlay = useOverlay();
  const theme = useTheme();
  const menuThemeMode = getModalThemeMode(theme.state.mode);
  const justOpenedMenuRef = useRef(false);

  const toggleMenu = () => {
    const newOpenState = !isOpen;
    if (newOpenState) {
      justOpenedMenuRef.current = true;
      // Clear the flag after a short delay
      setTimeout(() => {
        justOpenedMenuRef.current = false;
      }, 200);
    }
    setIsOpen(newOpenState);
    overlay.actions.setMenuOpen(newOpenState);
  };

  const closeMenu = () => {
    setIsOpen(false);
    overlay.actions.setMenuOpen(false);
  };

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Sync local state with overlay state (for external close commands like backdrop clicks)
  useEffect(() => {
    if (!overlay.state.isMenuOpen && isOpen) {
      setIsOpen(false);
    }
  }, [overlay.state.isMenuOpen, isOpen]);

  // Auto-close menu when modal opens, but not if menu was just opened by user
  useEffect(() => {
    const modalJustOpened = modal.state.isOpen && !prevModalOpen;

    if (modalJustOpened && isOpen && !justOpenedMenuRef.current) {
      closeMenu();
    }

    setPrevModalOpen(modal.state.isOpen);
  }, [modal.state.isOpen, prevModalOpen, isOpen]);

  const handleModalDemo = (
    id: string,
    title: string,
    component: React.ReactNode,
    timeout?: number,
  ) => {
    closeMenu(); // Close menu first
    modal.actions.openModal({
      id,
      title,
      component,
      autoCloseTimeout: timeout,
    });
  };

  return (
    <>
      <StyledBurgerButton
        onClick={toggleMenu}
        className={className}
        $isOpen={isOpen}
        $themeMode={menuThemeMode}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <StyledBurgerLine
          $isOpen={isOpen}
          $line="top"
          $themeMode={menuThemeMode}
        />
        <StyledBurgerLine
          $isOpen={isOpen}
          $line="middle"
          $themeMode={menuThemeMode}
        />
        <StyledBurgerLine
          $isOpen={isOpen}
          $line="bottom"
          $themeMode={menuThemeMode}
        />
      </StyledBurgerButton>

      {isOpen && (
        <StyledMenu
          $isOpen={isOpen}
          $themeMode={menuThemeMode}
          onClick={(e) => e.stopPropagation()}
        >
          <StyledMenuContent $themeMode={theme.state.mode}>
            <StyledMenuSection $themeMode={theme.state.mode}>
              <StyledMenuItem
                $themeMode={menuThemeMode}
                onClick={() =>
                  handleModalDemo(
                    "about-modal",
                    "About Stef.FM",
                    <About />,
                    undefined,
                  )
                }
              >
                About
              </StyledMenuItem>
              <StyledMenuItem
                $themeMode={menuThemeMode}
                onClick={() =>
                  handleModalDemo(
                    "statistics-modal",
                    "Statistics",
                    <Statistics />,
                    undefined,
                  )
                }
              >
                Statistics
              </StyledMenuItem>
              <StyledMenuItem
                $themeMode={menuThemeMode}
                onClick={() =>
                  handleModalDemo(
                    "manual-modal",
                    "User Manual",
                    <Manual />,
                    undefined,
                  )
                }
              >
                Manual
              </StyledMenuItem>
              <StyledMenuItem
                $themeMode={menuThemeMode}
                onClick={() =>
                  handleModalDemo(
                    "random-background-modal",
                    "Random Background",
                    <RandomBackground />,
                    undefined,
                  )
                }
              >
                Random Background
              </StyledMenuItem>
              <StyledMenuItem
                $themeMode={menuThemeMode}
                onClick={() =>
                  handleModalDemo(
                    "mix-list-modal",
                    "Mix Library",
                    <MixListPage />,
                    undefined,
                  )
                }
              >
                Mix List
              </StyledMenuItem>
            </StyledMenuSection>
          </StyledMenuContent>

          <StyledThemeToggleContainer $themeMode={theme.state.mode}>
            <StyledThemeButton
              $themeMode={menuThemeMode}
              $isActive={theme.state.mode === "light"}
              onClick={() => theme.actions.setTheme("light")}
              aria-label="Light mode"
              title="Light mode"
            >
              <StyledThemeButtonInner>☀</StyledThemeButtonInner>
            </StyledThemeButton>
            <StyledThemeButton
              $themeMode={menuThemeMode}
              $isActive={theme.state.mode === "dark"}
              onClick={() => theme.actions.setTheme("dark")}
              aria-label="Dark mode"
              title="Dark mode"
            >
              <StyledThemeButtonInner>☾</StyledThemeButtonInner>
            </StyledThemeButton>
            <StyledThemeButton
              $themeMode={menuThemeMode}
              $isActive={theme.state.mode === "mixed"}
              onClick={() => theme.actions.setTheme("mixed")}
              aria-label="Mixed mode"
              title="Mixed mode"
            >
              <StyledThemeButtonInner $isMixed>☀☾</StyledThemeButtonInner>
            </StyledThemeButton>
          </StyledThemeToggleContainer>

          <StyledMenuFooter $themeMode={menuThemeMode}>
            <p>Stef.FM v5.0</p>
            <p>Funky House Coming In Your Ears</p>
          </StyledMenuFooter>
        </StyledMenu>
      )}
    </>
  );
};

export default BurgerMenu;
