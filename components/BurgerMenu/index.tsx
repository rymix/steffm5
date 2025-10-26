import { useModal } from "contexts/modal";
import React, { useEffect, useState } from "react";

import HelloWorldModal from "components/HelloWorldModal";
import SecondModal from "components/SecondModal";

import {
  StyledBackdrop,
  StyledBurgerButton,
  StyledBurgerLine,
  StyledMenu,
  StyledMenuContent,
  StyledMenuFooter,
  StyledMenuItem,
  StyledMenuSection,
  StyledMenuTitle,
} from "./styles";

interface BurgerMenuProps {
  className?: string;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modal = useModal();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
      // Prevent background scrolling when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeMenu();
    }
  };

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
        <StyledBackdrop $isOpen={isOpen} onClick={handleBackdropClick}>
          <StyledMenu $isOpen={isOpen}>
            <StyledMenuContent>
              <StyledMenuTitle>Menu</StyledMenuTitle>

              <StyledMenuSection>
                <h3>Navigation</h3>
                <StyledMenuItem onClick={() => console.log("Home clicked")}>
                  🏠 Home
                </StyledMenuItem>
                <StyledMenuItem onClick={() => console.log("About clicked")}>
                  ℹ️ About
                </StyledMenuItem>
                <StyledMenuItem onClick={() => console.log("Settings clicked")}>
                  ⚙️ Settings
                </StyledMenuItem>
              </StyledMenuSection>

              <StyledMenuSection>
                <h3>Modal Demos</h3>
                <StyledMenuItem
                  onClick={() =>
                    handleModalDemo(
                      "hello-world-menu",
                      "Hello World (from Menu)",
                      <HelloWorldModal />,
                      8000,
                    )
                  }
                >
                  👋 Hello World Modal
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() =>
                    handleModalDemo(
                      "second-modal-menu",
                      "Second Modal (from Menu)",
                      <SecondModal />,
                      12000,
                    )
                  }
                >
                  🎯 Second Modal Demo
                </StyledMenuItem>
              </StyledMenuSection>

              <StyledMenuSection>
                <h3>Music</h3>
                <StyledMenuItem
                  onClick={() => console.log("Playlists clicked")}
                >
                  🎵 Playlists
                </StyledMenuItem>
                <StyledMenuItem onClick={() => console.log("Browse clicked")}>
                  🔍 Browse
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() => console.log("Favorites clicked")}
                >
                  ❤️ Favorites
                </StyledMenuItem>
              </StyledMenuSection>

              <StyledMenuSection>
                <h3>Help</h3>
                <StyledMenuItem onClick={() => console.log("Support clicked")}>
                  💬 Support
                </StyledMenuItem>
                <StyledMenuItem onClick={() => console.log("Feedback clicked")}>
                  📝 Feedback
                </StyledMenuItem>
              </StyledMenuSection>
            </StyledMenuContent>

            <StyledMenuFooter>
              <p>Stef.FM v1.0</p>
              <p>Adventures in Decent Music</p>
            </StyledMenuFooter>
          </StyledMenu>
        </StyledBackdrop>
      )}
    </>
  );
};

export default BurgerMenu;
