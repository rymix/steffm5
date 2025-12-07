import styled from "styled-components";

export const StyledMixListPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledMixListPageHeader = styled.div`
  margin-bottom: 12px;
  flex-shrink: 0;

  h2 {
    margin: 0 0 4px 0;
    color: #333;
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.85rem;
  }
`;

export const StyledMixListPageFilters = styled.div`
  position: sticky;
  top: -22px;
  z-index: 10;
  background: white;
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 16px;
  flex-shrink: 0;
`;

export const StyledMixListPageContent = styled.div`
  display: flex;
  flex-direction: column;
`;
