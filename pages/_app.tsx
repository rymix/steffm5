import { MixcloudProvider } from "contexts/mixcloud";
import type { AppProps } from "next/app";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MixcloudProvider
      initialKeys={[]}
      initialAutoPlay={true}
      onReady={() => console.log("Widget ready")}
      onPlay={() => console.log("Playing")}
      onPause={() => console.log("Paused")}
      onEnded={() => console.log("Ended")}
      onProgress={(position, duration) =>
        console.log("Progress:", position, duration)
      }
    >
      <Component {...pageProps} />
    </MixcloudProvider>
  );
}
