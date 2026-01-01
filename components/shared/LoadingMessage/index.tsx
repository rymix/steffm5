import React from "react";

import { StyledLoadingMessage, StyledLoadingSpinner } from "./styles";

interface LoadingMessageProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({
  message = "Loading...",
  fullScreen = false,
}) => {
  return (
    <StyledLoadingMessage $fullScreen={fullScreen}>
      <StyledLoadingSpinner />
      <div>{message}</div>
    </StyledLoadingMessage>
  );
};

export default LoadingMessage;
