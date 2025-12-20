import styled from "styled-components";

export const StyledMixListPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #f5f5f5;
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0;
  }

  &::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border-radius: 4px;

    &:hover {
      background: #909090;
    }
  }
`;

export const StyledMixListPageHeader = styled.div`
  margin-bottom: 16px;
  flex-shrink: 0;

  h2 {
    margin: 0 0 8px 0;
    color: #2a2a2a;
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: #5a5a5a;
    font-size: 0.875rem;
  }
`;

export const StyledMixListPageFilters = styled.div`
  position: sticky;
  top: -20px;
  z-index: 10;
  background: #f5f5f5;
  border-bottom: 2px solid #d0d0d0;
  margin-bottom: 16px;
  padding-bottom: 12px;
  flex-shrink: 0;
`;

export const StyledMixListPageContent = styled.div`
  display: flex;
  flex-direction: column;
`;
