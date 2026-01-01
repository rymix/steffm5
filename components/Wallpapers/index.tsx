import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useState } from "react";

import type {
  Background,
  BackgroundCategory,
  BackgroundExtended,
} from "db/types";
import Macintosh from "components/BackgroundList/Macintosh";
import RetroPC from "components/BackgroundList/RetroPC";
import { useModalTheme } from "hooks/useThemeMode";

import {
  StyledButton,
  StyledControlsContainer,
  StyledLabel,
  StyledLoadingContainer,
  StyledLoadingText,
  StyledMonitorDisplay,
  StyledNavigationButtons,
  StyledSelect,
  StyledSelectContainer,
  StyledWallpapersContainer,
} from "./styles";

export const Wallpapers: React.FC = () => {
  const { actions } = useMixcloud();
  const modalThemeMode = useModalTheme();
  const [background, setBackground] = useState<BackgroundExtended | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<BackgroundCategory[]>([]);
  const [allBackgrounds, setAllBackgrounds] = useState<BackgroundExtended[]>(
    [],
  );
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loadingBackgrounds, setLoadingBackgrounds] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectLastBackground, setSelectLastBackground] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/background/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch all backgrounds on mount
  useEffect(() => {
    const fetchAllBackgrounds = async () => {
      try {
        const response = await fetch("/api/background/backgrounds");
        if (response.ok) {
          const data = await response.json();
          setAllBackgrounds(data);
        }
      } catch (error) {
        console.error("Failed to fetch all backgrounds:", error);
      }
    };

    fetchAllBackgrounds();
  }, []);

  // Fetch random background on mount (only once)
  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const response = await fetch("/api/background/randomBackground");
        if (response.ok) {
          const data = await response.json();
          setBackground(data);
          actions.setBackground(data);
          // Set the category and load backgrounds for that category
          setSelectedCategory(data.backgroundCategory);
        }
      } catch (error) {
        console.error("Failed to fetch random background:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch on initial mount
    fetchWallpapers();
  }, []); // Empty dependency array - only run once on mount

  const handleSelectBackground = React.useCallback(
    (bg: Background) => {
      const category = categories.find(
        (cat) => cat.code === bg.backgroundCategory,
      );
      if (category) {
        const extendedBg: BackgroundExtended = {
          ...bg,
          backgroundCategoryObject: category,
        };
        setBackground(extendedBg);
        actions.setBackground(extendedBg);

        // Find and set the current index in the all backgrounds list
        const index = allBackgrounds.findIndex(
          (b) =>
            b.fileName === bg.fileName &&
            b.backgroundCategory === bg.backgroundCategory,
        );
        if (index !== -1) {
          setCurrentIndex(index);
        }
      }
    },
    [categories, allBackgrounds, actions],
  );

  // Fetch backgrounds when category changes
  useEffect(() => {
    if (!selectedCategory) {
      setBackgrounds([]);
      return;
    }

    const fetchBackgrounds = async () => {
      setLoadingBackgrounds(true);
      try {
        const response = await fetch(
          `/api/background/backgrounds?backgroundCategory=${selectedCategory}`,
        );
        if (response.ok) {
          const data = await response.json();
          setBackgrounds(data);
          // Automatically select first or last background based on navigation direction
          if (data.length > 0) {
            const bg = selectLastBackground ? data[data.length - 1] : data[0];
            const category = categories.find(
              (cat) => cat.code === bg.backgroundCategory,
            );
            if (category) {
              const extendedBg: BackgroundExtended = {
                ...bg,
                backgroundCategoryObject: category,
              };
              setBackground(extendedBg);
              actions.setBackground(extendedBg);

              // Find and set the current index in the all backgrounds list
              const index = allBackgrounds.findIndex(
                (b) =>
                  b.fileName === bg.fileName &&
                  b.backgroundCategory === bg.backgroundCategory,
              );
              if (index !== -1) {
                setCurrentIndex(index);
              }
            }
            // Reset the flag
            setSelectLastBackground(false);
          }
        }
      } catch (error) {
        console.error("Failed to fetch backgrounds:", error);
      } finally {
        setLoadingBackgrounds(false);
      }
    };

    fetchBackgrounds();
  }, [selectedCategory]); // Only depend on selectedCategory to avoid loop

  const handleRandomBackground = async () => {
    setLoading(true);
    try {
      // If a category is selected, get a random background from that category
      const url = selectedCategory
        ? `/api/background/randomBackground?backgroundCategory=${selectedCategory}`
        : "/api/background/randomBackground";

      console.log("Fetching random background from:", url);
      console.log("Current background:", background?.fileName);

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log("Random background received:", data.fileName);

        setBackground(data);
        actions.setBackground(data);

        // Update the current index to match the randomly selected background
        const index = allBackgrounds.findIndex(
          (b) =>
            b.fileName === data.fileName &&
            b.backgroundCategory === data.backgroundCategory,
        );
        console.log("Setting index to:", index);
        if (index !== -1) {
          setCurrentIndex(index);
        }

        // Update category if it changed (when no category filter was applied)
        // The category will remain the same if already selected, preventing useEffect from overriding
        if (!selectedCategory && data.backgroundCategory !== selectedCategory) {
          setSelectedCategory(data.backgroundCategory);
        }
      }
    } catch (error) {
      console.error("Failed to fetch random background:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    // If category is selected, step through backgrounds in that category
    if (selectedCategory && backgrounds.length > 0) {
      const currentBgIndex = backgrounds.findIndex(
        (bg) => bg.fileName === background?.fileName,
      );

      // Check if we're at the last background in the category
      if (currentBgIndex >= backgrounds.length - 1) {
        // Move to next category
        const currentCategoryIndex = categories.findIndex(
          (cat) => cat.code === selectedCategory,
        );
        const nextCategoryIndex =
          (currentCategoryIndex + 1) % categories.length;
        const nextCategory = categories[nextCategoryIndex];

        // Set the new category (this will trigger the useEffect to load backgrounds)
        setSelectedCategory(nextCategory.code);
      } else {
        // Move to next background in current category
        const nextBg = backgrounds[currentBgIndex + 1];
        if (nextBg) {
          handleSelectBackground(nextBg);
        }
      }
    } else if (allBackgrounds.length > 0) {
      // No category selected, step through all backgrounds
      const nextIndex = (currentIndex + 1) % allBackgrounds.length;
      const nextBg = allBackgrounds[nextIndex];

      setCurrentIndex(nextIndex);
      setBackground(nextBg);
      actions.setBackground(nextBg);
      setSelectedCategory(nextBg.backgroundCategory);
    }
  };

  const handlePrevious = () => {
    // If category is selected, step through backgrounds in that category
    if (selectedCategory && backgrounds.length > 0) {
      const currentBgIndex = backgrounds.findIndex(
        (bg) => bg.fileName === background?.fileName,
      );

      // Check if we're at the first background in the category
      if (currentBgIndex <= 0) {
        // Move to previous category
        const currentCategoryIndex = categories.findIndex(
          (cat) => cat.code === selectedCategory,
        );
        const prevCategoryIndex =
          currentCategoryIndex <= 0
            ? categories.length - 1
            : currentCategoryIndex - 1;
        const prevCategory = categories[prevCategoryIndex];

        // Set the flag to select the last background in the new category
        setSelectLastBackground(true);
        setSelectedCategory(prevCategory.code);
      } else {
        // Move to previous background in current category
        const prevBg = backgrounds[currentBgIndex - 1];
        if (prevBg) {
          handleSelectBackground(prevBg);
        }
      }
    } else if (allBackgrounds.length > 0) {
      // No category selected, step through all backgrounds
      const prevIndex =
        currentIndex === 0 ? allBackgrounds.length - 1 : currentIndex - 1;
      const prevBg = allBackgrounds[prevIndex];

      setCurrentIndex(prevIndex);
      setBackground(prevBg);
      actions.setBackground(prevBg);
      setSelectedCategory(prevBg.backgroundCategory);
    }
  };

  const handleCategoryChange = (categoryCode: string) => {
    setSelectedCategory(categoryCode);
  };

  if (loading) {
    return (
      <StyledLoadingContainer>
        <StyledLoadingText $themeMode={modalThemeMode}>
          Loading...
        </StyledLoadingText>
      </StyledLoadingContainer>
    );
  }

  if (!background) {
    return (
      <StyledLoadingContainer>
        <StyledLoadingText $themeMode={modalThemeMode}>
          No background found
        </StyledLoadingText>
      </StyledLoadingContainer>
    );
  }

  const monitorType = background.backgroundCategoryObject?.type;

  return (
    <StyledWallpapersContainer>
      <StyledMonitorDisplay>
        {monitorType === "Macintosh" ? <Macintosh /> : <RetroPC />}
      </StyledMonitorDisplay>

      <StyledControlsContainer $themeMode={modalThemeMode}>
        <StyledNavigationButtons>
          <StyledButton $themeMode={modalThemeMode} onClick={handlePrevious}>
            Previous
          </StyledButton>
          <StyledButton $themeMode={modalThemeMode} onClick={handleNext}>
            Next
          </StyledButton>
          <StyledButton
            $themeMode={modalThemeMode}
            onClick={handleRandomBackground}
          >
            Random
          </StyledButton>
        </StyledNavigationButtons>

        <StyledSelectContainer>
          <StyledLabel $themeMode={modalThemeMode} htmlFor="category-select">
            Category:
          </StyledLabel>
          <StyledSelect
            $themeMode={modalThemeMode}
            id="category-select"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.code} value={cat.code}>
                {cat.name}
              </option>
            ))}
          </StyledSelect>
        </StyledSelectContainer>

        {selectedCategory && (
          <StyledSelectContainer>
            <StyledLabel
              $themeMode={modalThemeMode}
              htmlFor="background-select"
            >
              Background:
            </StyledLabel>
            {loadingBackgrounds ? (
              <StyledLoadingText $themeMode={modalThemeMode}>
                Loading backgrounds...
              </StyledLoadingText>
            ) : (
              <StyledSelect
                $themeMode={modalThemeMode}
                id="background-select"
                value={background?.fileName || ""}
                onChange={(e) => {
                  const bg = backgrounds.find(
                    (b) => b.fileName === e.target.value,
                  );
                  if (bg) handleSelectBackground(bg);
                }}
              >
                {backgrounds.map((bg) => (
                  <option key={bg.fileName} value={bg.fileName}>
                    {bg.name}
                  </option>
                ))}
              </StyledSelect>
            )}
          </StyledSelectContainer>
        )}
      </StyledControlsContainer>
    </StyledWallpapersContainer>
  );
};

export default Wallpapers;
