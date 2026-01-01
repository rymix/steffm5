import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface StyledLoadingMessageProps {
  $fullScreen: boolean;
}

export const StyledLoadingMessage = styled.div<StyledLoadingMessageProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 20px;
  color: #666;
  font-size: 16px;
  font-weight: 500;
  text-align: center;

  ${(props) =>
    props.$fullScreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 1000;
      color: #fff;
      font-size: 18px;
    `}
`;

export const StyledLoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(102, 102, 102, 0.2);
  border-top-color: #666;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  ${StyledLoadingMessage}[data-fullscreen="true"] & {
    border-color: rgba(255, 255, 255, 0.2);
    border-top-color: #fff;
  }
`;
