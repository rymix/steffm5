import styled from "styled-components";

export const StyledControls = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  position: relative;
`;

export const StyledControlButton = styled.button<{
  $variant?: "primary" | "secondary" | "share";
}>`
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
  position: relative;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  ${({ $variant = "primary" }) => {
    switch ($variant) {
      case "primary":
        return `
          background: #2196f3;
          color: white;
          
          &:hover:not(:disabled) {
            background: #1976d2;
          }
        `;
      case "secondary":
        return `
          background: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
          
          &:hover:not(:disabled) {
            background: #e0e0e0;
            border-color: #bbb;
          }
        `;
      case "share":
        return `
          background: #4caf50;
          color: white;
          
          &:hover:not(:disabled) {
            background: #388e3c;
          }
        `;
      default:
        return "";
    }
  }}
`;

export const StyledShareTooltip = styled.div<{
  $show: boolean;
}>`
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1000;

  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  transform: translateX(-50%)
    translateY(${({ $show }) => ($show ? "0px" : "-10px")});
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #333;
  }

  ${({ $show }) =>
    $show &&
    `
    animation: fadeUpOut 2s ease-in-out forwards;
  `}

  @keyframes fadeUpOut {
    0% {
      opacity: 1;
      transform: translateX(-50%) translateY(0px);
    }
    70% {
      opacity: 1;
      transform: translateX(-50%) translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(-10px);
    }
  }
`;
