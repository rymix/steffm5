import { useModal } from "contexts/modal";
import { useOverlay } from "contexts/overlay";
import React, { useEffect, useRef, useState } from "react";

import MixListPage from "components/MixListPage";

import About from "../ContentPages/About";
import Statistics from "../ContentPages/Statistics";
import {
  StyledBurgerButton,
  StyledBurgerLine,
  StyledMenu,
  StyledMenuContent,
  StyledMenuFooter,
  StyledMenuItem,
  StyledMenuSection,
} from "./styles";

interface BurgerMenuProps {
  className?: string;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevModalOpen, setPrevModalOpen] = useState(false);
  const modal = useModal();
  const overlay = useOverlay();
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
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <StyledBurgerLine $isOpen={isOpen} $line="top" />
        <StyledBurgerLine $isOpen={isOpen} $line="middle" />
        <StyledBurgerLine $isOpen={isOpen} $line="bottom" />
      </StyledBurgerButton>

      {isOpen && (
        <StyledMenu $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
          <StyledMenuContent>
            <StyledMenuSection>
              <StyledMenuItem
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

          <StyledMenuFooter>
            <p>Stef.FM v5.0</p>
            <p>Funky House Coming In Your Ears</p>
          </StyledMenuFooter>
        </StyledMenu>
      )}
    </>
  );
};

export default BurgerMenu;
