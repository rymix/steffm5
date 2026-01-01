import { useModal } from "contexts/modal";
import { useOverlay } from "contexts/overlay";
import { useTheme } from "contexts/theme";
import React, { useEffect, useRef, useState } from "react";

import MixListPage from "components/MixListPage";
import { useEscapeKey } from "hooks/useEscapeKey";
import { useModalTheme } from "hooks/useThemeMode";

import Contact from "../Contact";
import About from "../ContentPages/About";
import Statistics from "../ContentPages/Statistics";
import Manual from "../Manual";
import Wallpapers from "../Wallpapers";
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
  const menuThemeMode = useModalTheme();
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
  useEscapeKey(isOpen, closeMenu);

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
                    "About STEF.FM",
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
                    "mix-list-modal",
                    "Mix Library",
                    <MixListPage />,
                    undefined,
                  )
                }
              >
                Mix List
              </StyledMenuItem>
              <StyledMenuItem
                $themeMode={menuThemeMode}
                onClick={() =>
                  handleModalDemo(
                    "wallpapers-modal",
                    "Wallpapers",
                    <Wallpapers />,
                    undefined,
                  )
                }
              >
                Wallpapers
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
                    "contact-modal",
                    "Contact",
                    <Contact />,
                    undefined,
                  )
                }
              >
                Contact
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
            <p>STEF.FM v5.0</p>
            <p>Funky House Coming In Your Ears</p>
          </StyledMenuFooter>
        </StyledMenu>
      )}
    </>
  );
};

export default BurgerMenu;
