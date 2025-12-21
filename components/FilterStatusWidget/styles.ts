import styled from "styled-components";

export const StyledFilterStatusWidget = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const StyledTitle = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
`;

export const StyledFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

export const StyledFilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #495057;

  span:first-child {
    color: #6c757d;
  }

  span:last-child {
    color: #212529;
  }
`;

export const StyledTagLozenge = styled.span`
  background-color: #007bff;
  color: white;
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 500;
`;

export const StyledClearButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #c82333;
  }
`;

export const StyledOpenModalButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #0056b3;
  }
`;

export const StyledNoFiltersText = styled.div`
  font-size: 12px;
  color: #666;
  font-style: italic;
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledFilterLabel = styled.span`
  font-weight: 500;
`;
