import styled from "styled-components";

export const StyledStatisticsContainer = styled.div`
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
`;

export const StyledStatisticsTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
`;

export const StyledStatisticsSection = styled.div`
  margin-bottom: 24px;
`;

export const StyledStatisticsSubTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 500;
  color: #495057;
`;

export const StyledSummaryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

export const StyledStatisticsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledStatisticsListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #007bff;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
    transform: translateX(4px);
  }
`;

export const StyledStatisticsLabel = styled.span`
  font-size: 14px;
  color: #495057;
  font-weight: 500;
  flex: 1;
`;

export const StyledStatisticsValue = styled.span`
  font-size: 14px;
  color: #212529;
  font-weight: 600;
  margin-left: 8px;
`;

export const StyledShowHideBlock = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  margin-top: 12px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #5a6268;
    transform: translateY(-1px);
  }
`;

export const StyledArrowDropDown = styled.span`
  font-size: 16px;
  &::after {
    content: "▼";
  }
`;

export const StyledArrowDropUp = styled.span`
  font-size: 16px;
  &::after {
    content: "▲";
  }
`;

export const StyledLoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-size: 16px;
  color: #6c757d;
`;

export const StyledErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  padding: 12px;
  margin: 20px;
  text-align: center;
`;
