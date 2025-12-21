import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useState } from "react";

import type { BackgroundExtended } from "db/types";
import Macintosh from "components/BackgroundList/Macintosh";
import RetroPC from "components/BackgroundList/RetroPC";

export const RandomBackground: React.FC = () => {
  const { actions } = useMixcloud();
  const [background, setBackground] = useState<BackgroundExtended | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomBackground = async () => {
      try {
        const response = await fetch("/api/background/randomBackground");
        if (response.ok) {
          const data = await response.json();
          setBackground(data);
          actions.setBackground(data);
        }
      } catch (error) {
        console.error("Failed to fetch random background:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomBackground();
  }, [actions]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "455px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!background) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "455px",
        }}
      >
        No background found
      </div>
    );
  }

  const monitorType = background.backgroundCategoryObject?.type;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {monitorType === "Macintosh" ? <Macintosh /> : <RetroPC />}
    </div>
  );
};

export default RandomBackground;
