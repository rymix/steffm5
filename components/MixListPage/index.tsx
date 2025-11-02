import React from "react";

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
  return (
    <StyledMixListPage>
      <StyledMixListPageHeader>
        <h2>Mix Library</h2>
        <p>Browse and explore your music collection</p>
      </StyledMixListPageHeader>

      <StyledMixListPageFilters>
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
