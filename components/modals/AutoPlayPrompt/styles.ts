import styled from "styled-components";

export const StyledAutoPlayPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 40px 20px;
  gap: 60px;
`;

export const StyledMessage = styled.div`
  text-align: center;
  max-width: 500px;

  h2 {
    font-size: 32px;
    font-weight: 600;
    margin: 0 0 20px 0;
    color: #333;
  }

  p {
    font-size: 20px;
    line-height: 1.5;
    color: #666;
    margin: 0;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 24px;
    }

    p {
      font-size: 16px;
    }
  }
`;

export const StyledPlayButton = styled.button`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: none;
  background: #666666;
  color: white;
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
    background: #555555;
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 90px;
    height: 90px;
  }

  @media (max-width: 768px) {
    width: 130px;
    height: 130px;

    svg {
      width: 70px;
      height: 70px;
    }
  }
`;
