import { useTheme } from "contexts/theme";
import React from "react";
import { getModalThemeMode } from "utils/themeHelpers";

import { StyledContact } from "components/Contact/StyledContact";

export const Contact: React.FC = () => {
  const theme = useTheme();
  const modalThemeMode = getModalThemeMode(theme.state.mode);

  return (
    <StyledContact $themeMode={modalThemeMode}>
      <p>
        <a href="mailto:webmaster@stef.fm">webmaster@stef.fm</a>
      </p>
    </StyledContact>
  );
};

export default Contact;
