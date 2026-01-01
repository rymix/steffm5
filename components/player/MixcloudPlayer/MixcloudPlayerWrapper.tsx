import dynamic from "next/dynamic";
import React from "react";

import LoadingMessage from "components/shared/LoadingMessage";

import { MixcloudPlayerWrapperProps } from "./types";

// Dynamically import the MixcloudPlayer with no SSR since it uses browser APIs
const MixcloudPlayer = dynamic(() => import("./MixcloudPlayer"), {
  ssr: false,
  loading: () => <LoadingMessage message="Loading player..." fullScreen />,
});

const MixcloudPlayerWrapper: React.FC<MixcloudPlayerWrapperProps> = ({
  autoPlay = true,
}) => {
  return <MixcloudPlayer autoPlay={autoPlay} />;
};

export default MixcloudPlayerWrapper;
