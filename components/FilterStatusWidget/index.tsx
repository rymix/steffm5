import { useMixcloud } from "contexts/mixcloud";
import { useModal } from "contexts/modal";
import React from "react";

import MixListPage from "components/MixListPage";

import {
  StyledClearButton,
  StyledFilterItem,
  StyledFiltersContainer,
  StyledFilterStatusWidget,
  StyledHeaderRow,
  StyledOpenModalButton,
  StyledTagLozenge,
  StyledTitle,
} from "./styles";

const FilterStatusWidget: React.FC = () => {
  const { state, actions } = useMixcloud();
  const modal = useModal();

  const hasActiveFilters =
    (state.filters.category && state.filters.category.trim() !== "") ||
    (state.filters.name && state.filters.name.trim() !== "") ||
    (state.filters.tags && state.filters.tags.trim() !== "");

  const getCategoryDisplayName = (code: string) => {
    const categoryMap: Record<string, string> = {
      aidm: "Adventures in Decent Music",
      mpos: "My Pair of Shoes",
      special: "Special",
      cocksoup: "Cocksoup",
      fav: "Favourites",
    };
    return categoryMap[code] || code;
  };

  const handleOpenModal = () => {
    modal.actions.openModal({
      id: "mix-list-modal",
      title: "Mix Library",
      component: <MixListPage />,
    });
  };

  const handleClearFilters = () => {
    actions.clearFilters();
  };

  if (!hasActiveFilters) {
    return (
      <StyledFilterStatusWidget>
        <StyledHeaderRow>
          <StyledTitle>Filters</StyledTitle>
          <StyledOpenModalButton onClick={handleOpenModal}>
            🔍 Browse & Filter
          </StyledOpenModalButton>
        </StyledHeaderRow>
        <div style={{ fontSize: "12px", color: "#666", fontStyle: "italic" }}>
          No filters applied - showing all mixes
        </div>
      </StyledFilterStatusWidget>
    );
  }

  return (
    <StyledFilterStatusWidget>
      <StyledHeaderRow>
        <StyledTitle>Active Filters</StyledTitle>
        <div style={{ display: "flex", gap: "8px" }}>
          <StyledClearButton onClick={handleClearFilters}>
            Clear All
          </StyledClearButton>
          <StyledOpenModalButton onClick={handleOpenModal}>
            🔍 Manage
          </StyledOpenModalButton>
        </div>
      </StyledHeaderRow>

      <StyledFiltersContainer>
        {state.filters.category && (
          <StyledFilterItem>
            <span style={{ fontWeight: "500" }}>Category:</span>
            <span>{getCategoryDisplayName(state.filters.category)}</span>
          </StyledFilterItem>
        )}

        {state.filters.name && (
          <StyledFilterItem>
            <span style={{ fontWeight: "500" }}>Name:</span>
            <span>"{state.filters.name}"</span>
          </StyledFilterItem>
        )}

        {state.filters.tags && (
          <StyledFilterItem>
            <span style={{ fontWeight: "500" }}>Tag:</span>
            <StyledTagLozenge>{state.filters.tags}</StyledTagLozenge>
          </StyledFilterItem>
        )}
      </StyledFiltersContainer>
    </StyledFilterStatusWidget>
  );
};

export default FilterStatusWidget;
