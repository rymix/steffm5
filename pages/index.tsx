import Head from "next/head";
import React from "react";

import { MixFilter } from "@/components/MixFilter";
import MixList from "@/components/MixList";
import MixcloudPlayerWrapper from "components/MixcloudPlayer/MixcloudPlayerWrapper";

const HomePage: React.FC = () => {
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

        <MixFilter />
        <MixcloudPlayerWrapper autoPlay={true} />
        <MixList />
      </div>
    </>
  );
};

export default HomePage;
