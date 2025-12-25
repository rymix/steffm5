import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import HomePage from "@/components/HomePage";

const IndexPage: React.FC = () => {
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
        <title>STEF.FM - Funky House and Soul Music</title>
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
