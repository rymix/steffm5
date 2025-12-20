import styled from "styled-components";

import { StyledMixFilterFormButtonProps } from "./types";

export const StyledMixFilter = styled.div`
  padding: 16px;
  background-color: #e8e8e8;
  border: 1px solid #c0c0c0;
  border-radius: 6px;
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
    padding: 6px 8px;
    font-size: 13px;
    border: 1px solid #b0b0b0;
    border-radius: 4px;
    background: #fafafa;
    color: #2a2a2a;

    &:focus {
      outline: 2px solid #4a9f4a;
      outline-offset: 1px;
      border-color: #4a9f4a;
    }
  }

  label {
    font-size: 13px;
    font-weight: 500;
    color: #3a3a3a;
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
  padding: 8px 16px;
  background-color: #4a9f4a;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: ${(props) => (props.$isLoadingMixes ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isLoadingMixes ? "#4a9f4a" : "#3a8f3a"};
  }

  &:active {
    background-color: #2a7f2a;
  }
`;

export const StyledMixFilterActiveFilters = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: #4a4a4a;
`;

export const StyledTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  max-height: 120px;
  overflow-y: auto;
  padding: 4px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #d8d8d8;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #a8a8a8;
    border-radius: 3px;

    &:hover {
      background: #888888;
    }
  }
`;

export const StyledTagLozenge = styled.button<{ $isSelected: boolean }>`
  background-color: ${(props) => (props.$isSelected ? "#4a9f4a" : "#d8d8d8")};
  color: ${(props) => (props.$isSelected ? "white" : "#3a3a3a")};
  border: 1px solid ${(props) => (props.$isSelected ? "#3a8f3a" : "#b0b0b0")};
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
  white-space: nowrap;
  min-width: fit-content;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => (props.$isSelected ? "#3a8f3a" : "#c8c8c8")};
    border-color: ${(props) => (props.$isSelected ? "#2a7f2a" : "#9a9a9a")};
  }

  &:focus {
    outline: 2px solid #4a9f4a;
    outline-offset: 1px;
  }
`;
