import { Z_INDEX } from "constants/zIndex";
import styled from "styled-components";

export const StyledLayoutWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  z-index: ${Z_INDEX.HOMEPAGE_LAYOUT};
  pointer-events: none; /* Allow clicks to pass through to launcher icons below */

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const StyledPlayerPage = styled.div<{ $panelOpen?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: auto;
  pointer-events: none; /* Inherit from parent, allow clicks through empty space */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${({ $panelOpen }) => ($panelOpen ? "calc(100vw - 420px)" : "100vw")};

  @media (max-width: 1024px) {
    width: 100vw;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const StyledDevicesContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  pointer-events: auto; /* Restore pointer events for interactive player */

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const StyledMobileLayout = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding: 10px 20px 20px 20px;
    overflow: hidden;
    pointer-events: none; /* Allow clicks to pass through to elements behind */
  }
`;

export const StyledMobileDevice = styled.div`
  width: 100%;
  max-width: 500px;
  max-height: calc(100vh - 30px);
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  pointer-events: auto; /* Restore pointer events for mobile device content */
`;

export const StyledMobileWoodSlats = styled.div`
  position: relative;
  height: 40px;
  flex-shrink: 0;
  background-image:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url("/textures/dark-walnut.jpg");
  background-size: cover;
  box-shadow:
    inset 2px 2px 4px rgba(255, 255, 255, 0.2),
    inset -1px -1px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-right: 20px;
  padding-top: 8px;

  &::before {
    content: "";
    position: absolute;
    inset: 0 0 0 0;
    background: repeating-linear-gradient(
      180deg,
      transparent 0%,
      transparent 45%,
      rgba(0, 0, 0, 0.8) 45%,
      rgba(0, 0, 0, 0.8) 100%
    );
    background-size: 100% 12px;
    pointer-events: none;
  }
`;

export const StyledMobileLogoPanel = styled.div`
  position: relative;
  width: 90px;
  height: 24px;
  background: #c8c8c8;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
  border-radius: 1px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.2),
    inset 0 -1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Lexend, sans-serif;
  font-optical-sizing: auto;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  color: #2a2a2a;
  letter-spacing: 1.2px;
  z-index: 1;
`;

export const StyledMobileDisplayContainer = styled.div`
  width: 100%;
  position: relative;
  flex-shrink: 0;
`;

interface ThemeProps {
  $themeMode?: "light" | "dark";
}

export const StyledMobileScreenWrapper = styled.div<ThemeProps>`
  flex: 2;
  min-height: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${(props) =>
    props.$themeMode === "dark" ? "#1a1a1a" : "#f5f5f5"};

  @media (max-width: 1024px) and (orientation: landscape) {
    display: none;
  }
`;

export const StyledMobileScreenToggle = styled.button<{ $collapsed: boolean }>`
  width: 100%;
  height: 16px;
  background: linear-gradient(180deg, #3a3a3a 0%, #454545 50%, #4a4a4a 100%);
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) and (orientation: landscape) {
    display: none;
  }

  &:hover {
    background: linear-gradient(180deg, #454545 0%, #505050 50%, #555555 100%);
  }

  &:active {
    background: linear-gradient(180deg, #2a2a2a 0%, #353535 50%, #3a3a3a 100%);
  }

  &::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: ${({ $collapsed }) =>
      $collapsed ? "none" : "5px solid rgba(255, 255, 255, 0.4)"};
    border-bottom: ${({ $collapsed }) =>
      $collapsed ? "5px solid rgba(255, 255, 255, 0.4)" : "none"};
    transition: all 0.3s ease;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6));
  }
`;

interface StyledMobileScreenProps extends ThemeProps {
  $collapsed: boolean;
}

export const StyledMobileScreen = styled.div<StyledMobileScreenProps>`
  flex: 1;
  background: ${(props) =>
    props.$themeMode === "dark" ? "#1a1a1a" : "#f5f5f5"};
  padding: ${({ $collapsed }) => ($collapsed ? "0 30px" : "30px")};
  overflow-y: ${({ $collapsed }) => ($collapsed ? "hidden" : "auto")};
  position: relative;
  max-height: ${({ $collapsed }) => ($collapsed ? "0" : "100%")};
  opacity: ${({ $collapsed }) => ($collapsed ? "0" : "1")};
  transition:
    max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s ease 0.1s,
    padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) =>
      props.$themeMode === "dark"
        ? "rgba(0, 0, 0, 0.3)"
        : "rgba(0, 0, 0, 0.1)"};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.$themeMode === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.3)"};
    border-radius: 4px;

    &:hover {
      background: ${(props) =>
        props.$themeMode === "dark"
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(0, 0, 0, 0.4)"};
    }
  }
`;

export const StyledMobileControlsContainer = styled.div`
  width: 100%;
  position: relative;
  flex-shrink: 0;
`;

export const StyledMobileContent = styled.div`
  flex: 1;
  background: #1a1a1a;
  padding: 20px;
  overflow-y: auto;
`;

export const StyledMobileMixCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

export const StyledMobileMixImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

export const StyledMobileMixName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #ffffff;
  line-height: 1.4;
`;

export const StyledMobileMixInfo = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledMobileTrackListHeader = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

export const StyledNoMix = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  padding: 40px 20px;
`;
