import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import { StyledFilterStatus, StyledFilterStatusItem } from "./styles";

const FilterStatus: React.FC = () => {
  const { state } = useMixcloud();
  const { filters } = state;

  const activeFilters = Object.entries(filters).filter(
    ([_, value]) => value && value.trim() !== "",
  );

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <StyledFilterStatus>
      <h4>Active Filters:</h4>
      {activeFilters.map(([key, value]) => (
        <StyledFilterStatusItem key={key}>
          <strong>{key}:</strong> {value}
        </StyledFilterStatusItem>
      ))}
    </StyledFilterStatus>
  );
};

export default FilterStatus;
