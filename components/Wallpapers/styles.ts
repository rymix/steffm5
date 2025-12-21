import styled from "styled-components";

export const StyledWallpapersContainer = styled.div`
  width: 100%;
`;

export const StyledMonitorDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

export const StyledControlsContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const StyledNavigationButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #6c757d;

  &:hover {
    opacity: 0.9;
  }
`;

export const StyledRandomButton = styled(StyledButton)`
  background-color: #007bff;
  margin-left: auto;
`;

export const StyledSelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 200px;
`;

export const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 455px;
`;

export const StyledLoadingText = styled.span`
  color: #666;
`;
