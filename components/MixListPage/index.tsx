import { useTheme } from "contexts/theme";
import React from "react";
import { getModalThemeMode } from "utils/themeHelpers";

import FilterStatus from "@/components/FilterStatus";
import MixFilter from "@/components/MixFilter";
import MixList from "@/components/MixList";

import {
  StyledMixListPage,
  StyledMixListPageContent,
  StyledMixListPageFilters,
  StyledMixListPageHeader,
} from "./styles";

const MixListPage: React.FC = () => {
  const theme = useTheme();
  const modalThemeMode = getModalThemeMode(theme.state.mode);

  return (
    <StyledMixListPage $themeMode={modalThemeMode}>
      <StyledMixListPageHeader $themeMode={modalThemeMode}>
        <p>Browse and explore your music collection</p>
      </StyledMixListPageHeader>

      <StyledMixListPageFilters $themeMode={modalThemeMode}>
        <MixFilter />
        <FilterStatus />
      </StyledMixListPageFilters>

      <StyledMixListPageContent>
        <MixList />
      </StyledMixListPageContent>
    </StyledMixListPage>
  );
};

export default MixListPage;
