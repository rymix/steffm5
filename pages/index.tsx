import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import Controls from "@/components/Controls";
import CurrentMixInfo from "@/components/CurrentMixInfo";
import FilterStatus from "@/components/FilterStatus";
import MixList from "@/components/MixcloudPlayer/MixList";
import MixFilter from "@/components/MixFilter";
import MusicTicker from "@/components/MusicTicker";
import ProgressBar from "@/components/ProgressBar";
import TrackList from "@/components/TrackList";
import VolumeControl from "@/components/VolumeControl";
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
        <h1>Stef.FM</h1>
        <MusicTicker width="100%" height="50px" speed={5} />
        <MixcloudPlayerWrapper autoPlay={true} />
        <Controls />
        <ProgressBar />
        <VolumeControl />
        <MixFilter />
        <FilterStatus />
        <CurrentMixInfo />
        <TrackList />
        <MixList />
      </div>
    </>
  );
};

export default HomePage;
