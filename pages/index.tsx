import { useMixcloud } from "contexts/mixcloud";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import HomePage from "@/components/layout/HomePage";
import { useCurrentTrack } from "@/hooks/useCurrentTrack";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { state, actions } = useMixcloud();
  const [pageTitle, setPageTitle] = useState(
    "STEF.FM - Funky House and Soul Music",
  );

  // Get current mix and track
  const currentMix = actions.getCurrentMix();
  const currentTrack = useCurrentTrack(
    currentMix?.tracks,
    state.position,
    state.duration,
  );

  useEffect(() => {
    // Clean up URL if it has a mix query parameter
    if (router.query.mix) {
      // Store the mix key for the player component to use
      window.history.replaceState({}, "", "/");
    }
  }, [router.query.mix]);

  // Update page title based on current track and mix
  useEffect(() => {
    if (!currentMix) {
      setPageTitle("STEF.FM - Funky House and Soul Music");
      return;
    }

    if (currentTrack && currentTrack.trackName) {
      // Format: {Track Name} - {Mix Name} - Stef.FM
      setPageTitle(`${currentTrack.trackName} - ${currentMix.name} - Stef.FM`);
    } else {
      // Format: {Mix Name} - Stef.FM (if no track info)
      setPageTitle(`${currentMix.name} - Stef.FM`);
    }
  }, [currentMix, currentTrack]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Adventures in Decent Music - Funky House and Soul Music"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <HomePage />
    </>
  );
};

export default IndexPage;
