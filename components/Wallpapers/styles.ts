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
  gap: 14px;
  align-items: center;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const StyledButtonLED = styled.div<{ $active?: boolean }>`
  width: 36px;
  height: 4px;
  border-radius: 1px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  background: ${(props) => (props.$active ? "#ff3333" : "#3a0000")};
  box-shadow: ${(props) =>
    props.$active
      ? "0 0 8px #ff3333, 0 0 3px #ff0000, inset 0 0.5px 1px rgba(255, 255, 255, 0.6)"
      : "inset 0 1px 2px rgba(0, 0, 0, 0.9)"};
  transition: all 0.15s ease;
`;

export const StyledButtonIcon = styled.div`
  font-size: 14px;
  color: #2a2a2a;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.button<{ $pressed?: boolean }>`
  position: relative;
  width: 60px;
  height: 26px;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  background: #8a8a8a;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.1) 45%,
    rgba(0, 0, 0, 0.05) 55%,
    rgba(0, 0, 0, 0.2) 100%
  );
  box-shadow: ${(props) =>
    props.$pressed
      ? "0 0 0 1px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(0, 0, 0, 0.4)"
      : "0 0 0 1px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.4), 0 2px 2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)"};
  transform: ${(props) =>
    props.$pressed ? "translateY(0.5px)" : "translateY(0)"};
  cursor: pointer;
  transition: all 0.04s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.3),
      inset 0 1px 2px rgba(0, 0, 0, 0.4);
    transform: translateY(0.5px);
  }
`;

export const StyledButtonLabel = styled.div`
  font-size: 8px;
  font-weight: bold;
  color: #2a2a2a;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: center;
  height: 14px;
  display: flex;
  align-items: center;
`;

export const StyledRandomButtonWrapper = styled(StyledButtonWrapper)`
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
