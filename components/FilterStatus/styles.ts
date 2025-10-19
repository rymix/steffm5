import styled from "styled-components";

export const StyledFilterStatus = styled.div`
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 6px;
  margin-bottom: 15px;
  border-left: 4px solid #007bff;

  h4 {
    margin: 0 0 10px 0;
    color: #495057;
    font-size: 14px;
    font-weight: 600;
  }
`;

export const StyledFilterStatusItem = styled.div`
  display: inline-block;
  margin: 2px 8px 2px 0;
  padding: 4px 8px;
  background-color: #007bff;
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;

  strong {
    text-transform: capitalize;
  }
`;
