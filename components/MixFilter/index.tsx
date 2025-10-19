import { useMixcloud } from "contexts/mixcloud";
import React, { useState } from "react";

import {
  StyledMixFilter,
  StyledMixFilterActiveFilters,
  StyledMixFilterFormButton,
  StyledMixFilterFormButtons,
  StyledMixFilterFormElements,
} from "./styles";

export const MixFilter: React.FC = () => {
  const { state, actions } = useMixcloud();
  const [filters, setFilters] = useState({
    category: "",
    name: "",
    tags: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value.trim() !== ""),
    );
    actions.applyFilters(cleanFilters);
  };

  const handleClearFilters = () => {
    setFilters({ category: "", name: "", tags: "" });
    actions.clearFilters();
  };

  return (
    <StyledMixFilter>
      <h3>Filter Mixes</h3>

      <StyledMixFilterFormElements>
        <div>
          <label>Category:</label>
          <select
            value={filters.category}
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
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            placeholder="Search by name..."
          />
        </div>

        <div>
          <label>Tags:</label>
          <input
            type="text"
            value={filters.tags}
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

      {Object.keys(state.currentFilters).length > 0 && (
        <StyledMixFilterActiveFilters>
          <strong>Active filters:</strong>{" "}
          {JSON.stringify(state.currentFilters, null, 2)}
        </StyledMixFilterActiveFilters>
      )}
    </StyledMixFilter>
  );
};
