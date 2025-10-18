import { useState } from "react";

import { MixcloudContextState } from "./types";

const useMixcloudContextState = (): MixcloudContextState => {
  const [mcKey] = useState<string>("foo");

  return {
    mcKey: mcKey,
  };
};

export default useMixcloudContextState;
