import styled from "styled-components";

export const StyledLauncher = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 12px;
  z-index: 10; /* Launcher icons - bottom layer (above wallpaper) */
  pointer-events: none;

  > * {
    pointer-events: auto;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const StyledLauncherIcon = styled.button<{
  $themeMode: "light" | "dark";
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100px;
  height: 80px;
  opacity: 0.3;
  background: ${(props) =>
    props.$themeMode === "dark"
      ? "rgba(30, 30, 30, 0.8)"
      : "rgba(255, 255, 255, 0.8)"};
  border: 2px solid
    ${(props) =>
      props.$themeMode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)"};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    opacity: 1;
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 1px 4px rgba(0, 0, 0, 0.15),
      0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .icon {
    font-size: 32px;
    line-height: 1;
  }

  .icon-image {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  .label {
    font-size: 11px;
    font-weight: 500;
    color: ${(props) => (props.$themeMode === "dark" ? "#e0e0e0" : "#333")};
    text-align: center;
    line-height: 1.2;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 4px;
  }
`;
