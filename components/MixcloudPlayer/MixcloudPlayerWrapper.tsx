import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the MixcloudPlayer with no SSR since it uses browser APIs
const MixcloudPlayer = dynamic(
  () =>
    import("./MixcloudPlayer").then((mod) => ({ default: mod.MixcloudPlayer })),
  {
    ssr: false,
    loading: () => <div>Loading player...</div>,
  },
);

interface MixcloudPlayerWrapperProps {
  autoPlay?: boolean;
}

const MixcloudPlayerWrapper: React.FC<MixcloudPlayerWrapperProps> = ({
  autoPlay = true,
}) => {
  return <MixcloudPlayer autoPlay={autoPlay} />;
};

export default MixcloudPlayerWrapper;
