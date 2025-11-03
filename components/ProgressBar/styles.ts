import styled from "styled-components";

export const StyledProgressBar = styled.div`
  margin-bottom: 20px;
`;

export const StyledProgressBarLabel = styled.label<{
  $isPlaceholder?: boolean;
}>`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $isPlaceholder }) => ($isPlaceholder ? "#999" : "#333")};
  margin-bottom: 8px;
  opacity: ${({ $isPlaceholder }) => ($isPlaceholder ? 0.6 : 1)};
`;

export const StyledProgressBarTrack = styled.div<{
  $isPlaceholder?: boolean;
}>`
  width: 100%;
  height: 6px;
  background-color: ${({ $isPlaceholder }) =>
    $isPlaceholder ? "#f5f5f5" : "#f0f0f0"};
  border-radius: 3px;
  overflow: hidden;
  margin-top: 4px;
  cursor: ${({ $isPlaceholder }) => ($isPlaceholder ? "default" : "pointer")};
  opacity: ${({ $isPlaceholder }) => ($isPlaceholder ? 0.5 : 1)};

  &:hover {
    height: ${({ $isPlaceholder }) => ($isPlaceholder ? "6px" : "8px")};
    background-color: ${({ $isPlaceholder }) =>
      $isPlaceholder ? "#f5f5f5" : "#e0e0e0"};
  }
`;

export const StyledProgressBarFill = styled.div<{
  $progress: number;
  $isPlaceholder?: boolean;
}>`
  height: 100%;
  background-color: ${({ $isPlaceholder }) =>
    $isPlaceholder ? "#ddd" : "#2196f3"};
  border-radius: 3px;
  transition: width 0.5s ease;
  width: ${({ $progress }) => $progress}%;
  opacity: ${({ $isPlaceholder }) => ($isPlaceholder ? 0.3 : 1)};
`;
