import React from "react";

import { StyledContact } from "components/pages/Contact/StyledContact";
import { useModalTheme } from "hooks/useThemeMode";

export const Contact: React.FC = () => {
  const modalThemeMode = useModalTheme();

  return (
    <StyledContact $themeMode={modalThemeMode}>
      <p>
        <a href="mailto:webmaster@stef.fm">webmaster@stef.fm</a>
      </p>
    </StyledContact>
  );
};

export default Contact;
