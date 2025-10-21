import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import MixcloudPlayerControls from "@/components/Controls";
import MixcloudPlayerCurrentMixInfo from "@/components/CurrentMixInfo";
import FilterStatus from "@/components/FilterStatus";
import MixFilter from "@/components/MixFilter";
import MixcloudPlayerMixList from "@/components/MixList";
import MixcloudPlayerProgressBar from "@/components/ProgressBar";
import TrackList from "@/components/TrackList";
import MixcloudPlayerVolumeControl from "@/components/VolumeControl";
import MixcloudPlayerWrapper from "components/MixcloudPlayer/MixcloudPlayerWrapper";

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Clean up URL if it has a mix query parameter
    if (router.query.mix) {
      // Store the mix key for the player component to use
      window.history.replaceState({}, "", "/");
    }
  }, [router.query.mix]);

  return (
    <>
      <Head>
        <title>Stef.FM - Funky House and Soul Music</title>
        <meta
          name="description"
          content="Adventures in Decent Music - Funky House and Soul Music"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <h1>Stef.FM - Adventures in Decent Music</h1>

        <div className="demo-info">
          <p>
            <strong>Welcome to Stef.FM!</strong> Funky House and Soul Music
            powered by Next.js and React.
          </p>
        </div>

        <MixcloudPlayerWrapper autoPlay={true} />
        <MixcloudPlayerControls />
        <MixcloudPlayerProgressBar />
        <MixcloudPlayerVolumeControl />
        <MixFilter />
        <FilterStatus />
        <MixcloudPlayerCurrentMixInfo />
        <TrackList />
        <MixcloudPlayerMixList />
      </div>
    </>
  );
};

export default HomePage;
