import type { AppProps } from "next/app";

import { MixcloudProvider } from "@/contexts/mixcloud";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MixcloudProvider>
      <Component {...pageProps} />{" "}
    </MixcloudProvider>
  );
}
