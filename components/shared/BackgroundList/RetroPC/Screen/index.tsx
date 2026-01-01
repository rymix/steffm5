import { useMixcloud } from "contexts/mixcloud";

import {
  StyledScreen,
  StyledScreenBanner,
  StyledScreenShadow,
} from "components/shared/BackgroundList/RetroPC/Screen/StyledScreen";

export const Screen: React.FC = () => {
  const {
    session: { background },
  } = useMixcloud();

  return (
    <StyledScreen
      key={background?.fileName || "default"}
      $background={background}
    >
      <StyledScreenBanner>
        {background?.name || ""}{" "}
        {background?.backgroundCategoryObject?.name || ""}
      </StyledScreenBanner>
      <StyledScreenShadow />
    </StyledScreen>
  );
};

export default Screen;
