import { useMixcloud } from "contexts/mixcloud";
import { useModal } from "contexts/modal";
import React from "react";

import MixListPage from "components/MixListPage";

import {
  StyledButtonGroup,
  StyledClearButton,
  StyledFilterItem,
  StyledFilterLabel,
  StyledFiltersContainer,
  StyledFilterStatusWidget,
  StyledHeaderRow,
  StyledNoFiltersText,
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
        <StyledNoFiltersText>
          No filters applied - showing all mixes
        </StyledNoFiltersText>
      </StyledFilterStatusWidget>
    );
  }

  return (
    <StyledFilterStatusWidget>
      <StyledHeaderRow>
        <StyledTitle>Active Filters</StyledTitle>
        <StyledButtonGroup>
          <StyledClearButton onClick={handleClearFilters}>
            Clear All
          </StyledClearButton>
          <StyledOpenModalButton onClick={handleOpenModal}>
            🔍 Manage
          </StyledOpenModalButton>
        </StyledButtonGroup>
      </StyledHeaderRow>

      <StyledFiltersContainer>
        {state.filters.category && (
          <StyledFilterItem>
            <StyledFilterLabel>Category:</StyledFilterLabel>
            <span>{getCategoryDisplayName(state.filters.category)}</span>
          </StyledFilterItem>
        )}

        {state.filters.name && (
          <StyledFilterItem>
            <StyledFilterLabel>Name:</StyledFilterLabel>
            <span>"{state.filters.name}"</span>
          </StyledFilterItem>
        )}

        {state.filters.tags && (
          <StyledFilterItem>
            <StyledFilterLabel>Tag:</StyledFilterLabel>
            <StyledTagLozenge>{state.filters.tags}</StyledTagLozenge>
          </StyledFilterItem>
        )}
      </StyledFiltersContainer>
    </StyledFilterStatusWidget>
  );
};

export default FilterStatusWidget;
