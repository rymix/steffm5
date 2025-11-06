import { MixcloudProvider } from "contexts/mixcloud";
import { ModalProvider } from "contexts/modal";
import { OverlayProvider } from "contexts/overlay";
import type { AppProps } from "next/app";

import GlobalModal from "components/GlobalModal";
import SharedOverlay from "components/SharedOverlay";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MixcloudProvider initialKeys={[]} initialAutoPlay={true}>
      <OverlayProvider>
        <ModalProvider>
          <Component {...pageProps} />
          <SharedOverlay />
          <GlobalModal />
        </ModalProvider>
      </OverlayProvider>
    </MixcloudProvider>
  );
}
