import styled from "styled-components";

export const StyledPlayerPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

export const StyledDevicesContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const StyledMobileLayout = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
  }
`;

export const StyledMobilePlayerContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url("/textures/dark-walnut.jpg");
  background-size: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

export const StyledMobileContent = styled.div`
  flex: 1;
  background: #1a1a1a;
  padding: 20px;
  overflow-y: auto;
`;

export const StyledMobileMixCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

export const StyledMobileMixImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

export const StyledMobileMixName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #ffffff;
  line-height: 1.4;
`;

export const StyledMobileMixInfo = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledMobileTrackListHeader = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

export const StyledNoMix = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  padding: 40px 20px;
`;
