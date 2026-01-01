import React from "react";

import MixList from "@/components/layout/MixList";
import FilterStatus from "@/components/ui/FilterStatus";
import MixFilter from "@/components/ui/MixFilter";
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
