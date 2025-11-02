import styled from "styled-components";

export const StyledMixListPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledMixListPageHeader = styled.div`
  margin-bottom: 20px;
  flex-shrink: 0;

  h2 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

export const StyledMixListPageFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  flex-shrink: 0;
`;

export const StyledMixListPageContent = styled.div`
  display: flex;
  flex-direction: column;
`;
