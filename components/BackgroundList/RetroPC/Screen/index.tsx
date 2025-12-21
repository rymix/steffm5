import { useMixcloud } from "contexts/mixcloud";

import {
  StyledScreen,
  StyledScreenBanner,
  StyledScreenShadow,
} from "components/BackgroundList/RetroPC/Screen/StyledScreen";

export const Screen: React.FC = () => {
  const {
    session: { background },
  } = useMixcloud();

  return (
    <StyledScreen $background={background}>
      <StyledScreenBanner>
        {background?.name || ""}{" "}
        {background?.backgroundCategoryObject?.name || ""}
      </StyledScreenBanner>
      <StyledScreenShadow />
    </StyledScreen>
  );
};

export default Screen;
