import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledMixFilter,
  StyledMixFilterForm,
  StyledMixFilterFormButton,
  StyledMixFilterFormButtons,
  StyledMixFilterFormElements,
} from "./styles";

const MixFilter: React.FC = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleApplyFilters();
  };

  return (
    <StyledMixFilter>
      <h3>Filter Mixes</h3>

      <StyledMixFilterForm onSubmit={handleSubmit}>
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
            type="submit"
            disabled={state.isLoadingMixes}
          >
            {state.isLoadingMixes ? "Applying..." : "Apply Filters"}
          </StyledMixFilterFormButton>

          <StyledMixFilterFormButton
            type="button"
            onClick={handleClearFilters}
            disabled={state.isLoadingMixes}
            $isLoadingMixes={state.isLoadingMixes}
          >
            Clear Filters
          </StyledMixFilterFormButton>
        </StyledMixFilterFormButtons>
      </StyledMixFilterForm>
    </StyledMixFilter>
  );
};

export default MixFilter;
