import styled from "styled-components";

export const StyledDrivingMode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px 20px;
`;

export const StyledCurrentTrack = styled.div`
  text-align: center;
  max-width: 600px;
`;

export const StyledMixName = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const StyledTrackInfo = styled.div`
  font-size: 24px;
  line-height: 1.5;
  color: #666;

  div {
    margin: 8px 0;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

interface StyledButtonProps {
  $isPrimary?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  width: ${({ $isPrimary }) => ($isPrimary ? "180px" : "100px")};
  height: ${({ $isPrimary }) => ($isPrimary ? "180px" : "100px")};
  border-radius: 50%;
  border: none;
  background: ${({ $isPrimary }) => ($isPrimary ? "#666666" : "#999999")};
  color: white;
  font-size: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
    background: ${({ $isPrimary }) => ($isPrimary ? "#555555" : "#888888")};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: ${({ $isPrimary }) => ($isPrimary ? "100px" : "50px")};
    height: ${({ $isPrimary }) => ($isPrimary ? "100px" : "50px")};
  }

  @media (max-width: 768px) {
    width: ${({ $isPrimary }) => ($isPrimary ? "140px" : "80px")};
    height: ${({ $isPrimary }) => ($isPrimary ? "140px" : "80px")};

    svg {
      width: ${({ $isPrimary }) => ($isPrimary ? "80px" : "40px")};
      height: ${({ $isPrimary }) => ($isPrimary ? "80px" : "40px")};
    }
  }
`;
