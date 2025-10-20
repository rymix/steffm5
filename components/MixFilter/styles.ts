import styled from "styled-components";

import { StyledMixFilterFormButtonProps } from "./types";

export const StyledMixFilter = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const StyledMixFilterForm = styled.form`
  width: 100%;
`;

export const StyledMixFilterFormElements = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 15px;

  select,
  input {
    margin-left: 5px;
    padding: 5px;
  }
`;

export const StyledMixFilterFormButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const StyledMixFilterFormButton = styled.button<StyledMixFilterFormButtonProps>`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.$isLoadingMixes ? "not-allowed" : "pointer")};
`;

export const StyledMixFilterActiveFilters = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: #666;
`;
