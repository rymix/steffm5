import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import { useModalTheme } from "hooks/useThemeMode";

import { StyledFilterStatus, StyledFilterStatusItem } from "./styles";

const FilterStatus: React.FC = () => {
  const { state } = useMixcloud();
  const modalThemeMode = useModalTheme();
  const { filters } = state;

  const activeFilters = Object.entries(filters).filter(
    ([_, value]) => value && value.trim() !== "",
  );

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <StyledFilterStatus $themeMode={modalThemeMode}>
      <h4>Active Filters:</h4>
      {activeFilters.map(([key, value]) => (
        <StyledFilterStatusItem key={key} $themeMode={modalThemeMode}>
          <strong>{key}:</strong> {value}
        </StyledFilterStatusItem>
      ))}
    </StyledFilterStatus>
  );
};

export default FilterStatus;
