import styled from "styled-components";

import { StyledMixFilterFormButtonProps } from "./types";

export const StyledMixFilter = styled.div`
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 16px;
`;

export const StyledMixFilterForm = styled.form`
  width: 100%;
`;

export const StyledMixFilterFormElements = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;

  select,
  input {
    margin-left: 4px;
    padding: 4px 6px;
    font-size: 13px;
    border: 1px solid #ced4da;
    border-radius: 4px;
  }

  label {
    font-size: 13px;
    font-weight: 500;
    color: #495057;
  }

  > div {
    display: flex;
    align-items: center;
    min-width: 0;
  }
`;

export const StyledMixFilterFormButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledMixFilterFormButton = styled.button<StyledMixFilterFormButtonProps>`
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: ${(props) => (props.$isLoadingMixes ? "not-allowed" : "pointer")};
`;

export const StyledMixFilterActiveFilters = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: #666;
`;

export const StyledTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
  max-height: 100px;
  overflow-y: auto;
  padding: 2px;
`;

export const StyledTagLozenge = styled.button<{ $isSelected: boolean }>`
  background-color: ${(props) => (props.$isSelected ? "#007bff" : "#e9ecef")};
  color: ${(props) => (props.$isSelected ? "white" : "#495057")};
  border: 1px solid ${(props) => (props.$isSelected ? "#007bff" : "#ced4da")};
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 10px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  white-space: nowrap;
  min-width: fit-content;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => (props.$isSelected ? "#0056b3" : "#dee2e6")};
  }

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 1px;
  }
`;
