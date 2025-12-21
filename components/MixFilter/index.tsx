import { useMixcloud } from "contexts/mixcloud";
import { useTheme } from "contexts/theme";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getModalThemeMode } from "utils/themeHelpers";

import {
  StyledFilterTitle,
  StyledMixFilter,
  StyledMixFilterForm,
  StyledMixFilterFormButton,
  StyledMixFilterFormButtons,
  StyledMixFilterFormElements,
  StyledSelectedTagIndicator,
  StyledTagContainer,
  StyledTagLozenge,
  StyledTagsFlexContainer,
  StyledTagsHeader,
  StyledToggleTagsButton,
} from "./styles";

const MixFilter: React.FC = () => {
  const { state, actions } = useMixcloud();
  const theme = useTheme();
  const modalThemeMode = getModalThemeMode(theme.state.mode);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [showTags, setShowTags] = useState(false);

  // Load available tags on component mount
  useEffect(() => {
    const loadTags = async () => {
      try {
        const response = await fetch("/api/tags");
        if (response.ok) {
          const tags = await response.json();
          setAvailableTags(tags);
        }
      } catch (error) {
        console.error("Failed to load tags:", error);
      }
    };
    loadTags();
  }, []);

  // Update selected tag when filter state changes
  useEffect(() => {
    const tagsString = state.filters.tags || "";
    setSelectedTag(tagsString);
  }, [state.filters.tags]);

  // Apply filters with cleaned values
  const applyFilters = useCallback(() => {
    const filtersWithTags = {
      ...state.filters,
      tags: selectedTag,
    };
    const cleanFilters = Object.fromEntries(
      Object.entries(filtersWithTags).filter(
        ([_, value]) => value?.trim() !== "",
      ),
    );
    actions.applyFilters(cleanFilters);
  }, [state.filters, selectedTag, actions]);

  // Debounced apply for text inputs
  const debouncedApplyFilters = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      applyFilters();
    }, 300); // 300ms delay for live search
  }, [applyFilters]);

  // Handle category change (immediate application)
  const handleCategoryChange = (value: string) => {
    actions.updateFilter("category", value);
    // Apply filters immediately for dropdown
    setTimeout(() => {
      const cleanFilters = Object.fromEntries(
        Object.entries({ ...state.filters, category: value }).filter(
          ([_, filterValue]) => filterValue?.trim() !== "",
        ),
      );
      actions.applyFilters(cleanFilters);
    }, 0);
  };

  // Handle text input change (debounced application)
  const handleTextInputChange = (key: string, value: string) => {
    actions.updateFilter(key, value);
    debouncedApplyFilters();
  };

  // Handle tag selection (single selection)
  const handleTagSelect = (tag: string) => {
    const newSelectedTag = selectedTag === tag ? "" : tag;
    setSelectedTag(newSelectedTag);

    // Apply filters immediately for tag selection
    const filtersWithTags = {
      ...state.filters,
      tags: newSelectedTag,
    };
    const cleanFilters = Object.fromEntries(
      Object.entries(filtersWithTags).filter(
        ([_, value]) => value?.trim() !== "",
      ),
    );
    actions.applyFilters(cleanFilters);
  };

  const handleClearFilters = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    setSelectedTag("");
    actions.clearFilters();
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <StyledMixFilter $themeMode={modalThemeMode}>
      <StyledFilterTitle $themeMode={modalThemeMode}>
        Filter Mixes
      </StyledFilterTitle>

      <StyledMixFilterForm>
        <StyledMixFilterFormElements $themeMode={modalThemeMode}>
          <div>
            <label>Category:</label>
            <select
              value={state.filters.category || ""}
              onChange={(e) => handleCategoryChange(e.target.value)}
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
              onChange={(e) => handleTextInputChange("name", e.target.value)}
              placeholder="Search by name (live search)..."
            />
          </div>

          <StyledTagsFlexContainer>
            <StyledTagsHeader>
              <label>Tags:</label>
              <StyledToggleTagsButton
                type="button"
                onClick={() => setShowTags(!showTags)}
                $themeMode={modalThemeMode}
              >
                {showTags ? "Hide" : "Show"}
              </StyledToggleTagsButton>
              {selectedTag && (
                <StyledSelectedTagIndicator></StyledSelectedTagIndicator>
              )}
            </StyledTagsHeader>
            {showTags && (
              <StyledTagContainer $themeMode={modalThemeMode}>
                {availableTags.map((tag) => (
                  <StyledTagLozenge
                    key={tag}
                    type="button"
                    $isSelected={selectedTag === tag}
                    $themeMode={modalThemeMode}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </StyledTagLozenge>
                ))}
              </StyledTagContainer>
            )}
          </StyledTagsFlexContainer>
        </StyledMixFilterFormElements>

        <StyledMixFilterFormButtons>
          <StyledMixFilterFormButton
            type="button"
            onClick={handleClearFilters}
            disabled={state.isLoadingMixes}
            $isLoadingMixes={state.isLoadingMixes}
            $themeMode={modalThemeMode}
          >
            Clear Filters
          </StyledMixFilterFormButton>
        </StyledMixFilterFormButtons>
      </StyledMixFilterForm>
    </StyledMixFilter>
  );
};

export default MixFilter;
