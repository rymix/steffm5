import { useMixcloud } from "contexts/mixcloud";
import { useTheme } from "contexts/theme";
import React from "react";
import { getModalThemeMode } from "utils/themeHelpers";

import { StyledFilterStatus, StyledFilterStatusItem } from "./styles";

const FilterStatus: React.FC = () => {
  const { state } = useMixcloud();
  const theme = useTheme();
  const modalThemeMode = getModalThemeMode(theme.state.mode);
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
