import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledMixFilter,
  StyledMixFilterFormButton,
  StyledMixFilterFormButtons,
  StyledMixFilterFormElements,
} from "./styles";

export const MixFilter: React.FC = () => {
  const { state, actions } = useMixcloud();

  const handleFilterChange = (key: string, value: string) => {
    actions.updateFilter(key, value);
  };

  const handleApplyFilters = () => {
    const cleanFilters = Object.fromEntries(
      Object.entries(state.filters).filter(
        ([_, value]) => value?.trim() !== "",
      ),
    );
    actions.applyFilters(cleanFilters);
  };

  const handleClearFilters = () => {
    actions.clearFilters();
  };

  return (
    <StyledMixFilter>
      <h3>Filter Mixes</h3>

      <StyledMixFilterFormElements>
        <div>
          <label>Category:</label>
          <select
            value={state.filters.category || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">All</option>
            <option value="aidm">Adventures in Decent Music</option>
            <option value="mpos">My Pair of Shoes</option>
            <option value="special">Special</option>
            <option value="cocksoup">Cocksoup</option>
            <option value="fav">Favourites</option>
          </select>
        </div>

        <div>
          <label>Name:</label>
          <input
            type="text"
            value={state.filters.name || ""}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            placeholder="Search by name..."
          />
        </div>

        <div>
          <label>Tags:</label>
          <input
            type="text"
            value={state.filters.tags || ""}
            onChange={(e) => handleFilterChange("tags", e.target.value)}
            placeholder="Search by tag..."
          />
        </div>
      </StyledMixFilterFormElements>

      <StyledMixFilterFormButtons>
        <StyledMixFilterFormButton
          onClick={handleApplyFilters}
          disabled={state.isLoadingMixes}
        >
          {state.isLoadingMixes ? "Applying..." : "Apply Filters"}
        </StyledMixFilterFormButton>

        <StyledMixFilterFormButton
          onClick={handleClearFilters}
          disabled={state.isLoadingMixes}
          $isLoadingMixes={state.isLoadingMixes}
        >
          Clear Filters
        </StyledMixFilterFormButton>
      </StyledMixFilterFormButtons>
    </StyledMixFilter>
  );
};
