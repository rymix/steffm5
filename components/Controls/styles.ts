import styled from "styled-components";

export const StyledMixcloudPlayerControls = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const StyledMixcloudPlayerControlButton = styled.button<{
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

export const StyledMixcloudPlayerShareMessage = styled.div<{
  $isError?: boolean;
}>`
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid;

  ${({ $isError }) =>
    $isError
      ? `
        background-color: #ffcdd2;
        color: #d32f2f;
        border-color: #f44336;
      `
      : `
        background-color: #c8e6c9;
        color: #2e7d32;
        border-color: #4caf50;
      `}
`;
