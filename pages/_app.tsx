import { MixcloudProvider } from "contexts/mixcloud";
import { ModalProvider } from "contexts/modal";
import { OverlayProvider } from "contexts/overlay";
import { ThemeProvider } from "contexts/theme";
import type { AppProps } from "next/app";

import GlobalModal from "components/modals/GlobalModal";
import SharedOverlay from "components/modals/SharedOverlay";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <MixcloudProvider initialKeys={[]} initialAutoPlay={true}>
        <OverlayProvider>
          <ModalProvider>
            <Component {...pageProps} />
            <SharedOverlay />
            <GlobalModal />
          </ModalProvider>
        </OverlayProvider>
      </MixcloudProvider>
    </ThemeProvider>
  );
}
