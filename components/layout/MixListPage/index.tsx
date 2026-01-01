import React from "react";

import FilterStatus from "@/components/FilterStatus";
import MixFilter from "@/components/MixFilter";
import MixList from "@/components/MixList";
import { useModalTheme } from "hooks/useThemeMode";

import {
  StyledMixListPage,
  StyledMixListPageContent,
  StyledMixListPageFilters,
  StyledMixListPageHeader,
} from "./styles";

const MixListPage: React.FC = () => {
  const modalThemeMode = useModalTheme();

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
