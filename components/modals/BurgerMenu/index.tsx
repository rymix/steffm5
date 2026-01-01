import { useModal } from "contexts/modal";
import { useOverlay } from "contexts/overlay";
import { useTheme } from "contexts/theme";
import React, { useEffect, useRef, useState } from "react";

import MixListPage from "components/layout/MixListPage";
import Wallpapers from "components/layout/Wallpapers";
import About from "components/pages/About";
import Contact from "components/pages/Contact";
import Manual from "components/pages/Manual";
import Statistics from "components/pages/Statistics";
import { useEscapeKey } from "hooks/useEscapeKey";
import { useModalTheme } from "hooks/useThemeMode";

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

interface MenuItem {
  id: string;
  label: string;
  title: string;
  component: React.ReactNode;
  timeout?: number;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "about-modal",
    label: "About",
    title: "About STEF.FM",
    component: <About />,
  },
  {
    id: "manual-modal",
    label: "Manual",
    title: "User Manual",
    component: <Manual />,
  },
  {
    id: "mix-list-modal",
    label: "Mix List",
    title: "Mix Library",
    component: <MixListPage />,
  },
  {
    id: "wallpapers-modal",
    label: "Wallpapers",
    title: "Wallpapers",
    component: <Wallpapers />,
  },
  {
    id: "statistics-modal",
    label: "Statistics",
    title: "Statistics",
    component: <Statistics />,
  },
  {
    id: "contact-modal",
    label: "Contact",
    title: "Contact",
    component: <Contact />,
  },
];

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
              {MENU_ITEMS.map((item) => (
                <StyledMenuItem
                  key={item.id}
                  $themeMode={menuThemeMode}
                  onClick={() =>
                    handleModalDemo(
                      item.id,
                      item.title,
                      item.component,
                      item.timeout,
                    )
                  }
                >
                  {item.label}
                </StyledMenuItem>
              ))}
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
