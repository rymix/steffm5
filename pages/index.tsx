import Head from "next/head";
import React from "react";

import MixcloudPlayerWrapper from "../components/MixcloudPlayer/MixcloudPlayerWrapper";

const HomePage: React.FC = () => {
  const sampleKeys = [
    "/rymixxx/adventures-in-decent-music-volume-1/",
    "/rymixxx/adventures-in-decent-music-volume-2/",
    "/rymixxx/stefs-disco-mix/",
    "/rymixxx/my-pair-of-shoes-volume-9-deep-n-soulful/",
  ];

  return (
    <>
      <Head>
        <title>Stef.FM - Funky House and Soul Music</title>
        <meta name="description" content="Adventures in Decent Music - Funky House and Soul Music" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <h1>Stef.FM - Adventures in Decent Music</h1>

        <div className="demo-info">
          <p>
            <strong>Welcome to Stef.FM!</strong> Funky House and Soul Music powered by Next.js and React.
          </p>
        </div>

        <MixcloudPlayerWrapper keys={sampleKeys} autoPlay={true} />
      </div>
    </>
  );
};

export default HomePage;
