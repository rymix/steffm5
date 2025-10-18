import { MixcloudProvider } from "contexts/mixcloud";

import { MixcloudPlayer } from "components/MixcloudPlayer/MixcloudPlayer";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("MixcloudPlayer", () => {
  const sampleKeys = [
    "/rymixxx/test-track-1/",
    "/rymixxx/test-track-2/",
    "/rymixxx/test-track-3/",
  ];

  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <MixcloudProvider initialKeys={[]} initialAutoPlay={false}>
        {component}
      </MixcloudProvider>,
    );
  };

  it("renders without crashing with empty keys", () => {
    renderWithProvider(<MixcloudPlayer keys={[]} />);
    expect(screen.getByText("No tracks provided")).toBeInTheDocument();
  });

  it("renders with single key", () => {
    const keys = ["/test-key"];
    renderWithProvider(<MixcloudPlayer keys={keys} />);
    expect(screen.getByText("Current Track: 1 of 1")).toBeInTheDocument();
    expect(screen.getByText("Key: /test-key")).toBeInTheDocument();
  });

  it("renders with multiple keys showing first track", () => {
    renderWithProvider(<MixcloudPlayer keys={sampleKeys} />);
    expect(screen.getByText("Current Track: 1 of 3")).toBeInTheDocument();
    expect(screen.getByText("Key: /rymixxx/test-track-1/")).toBeInTheDocument();
  });

  it("displays player controls", () => {
    renderWithProvider(<MixcloudPlayer keys={sampleKeys} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Play")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("displays volume control", () => {
    renderWithProvider(<MixcloudPlayer keys={sampleKeys} />);
    expect(screen.getAllByText(/Volume: \d+%/)).toHaveLength(2); // One in status, one in control
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("displays playlist with all tracks", () => {
    renderWithProvider(<MixcloudPlayer keys={sampleKeys} />);
    expect(screen.getByText("Playlist:")).toBeInTheDocument();
    expect(screen.getByText("/rymixxx/test-track-1/")).toBeInTheDocument();
    expect(screen.getByText("/rymixxx/test-track-2/")).toBeInTheDocument();
    expect(screen.getByText("/rymixxx/test-track-3/")).toBeInTheDocument();
  });

  it("shows current playing indicator", () => {
    renderWithProvider(<MixcloudPlayer keys={sampleKeys} />);
    const firstTrackItem = screen
      .getByText("/rymixxx/test-track-1/")
      .closest("li");
    expect(firstTrackItem).toHaveStyle("background-color: rgb(224, 224, 224)");
  });

  it("disables previous/next buttons with single track", () => {
    renderWithProvider(<MixcloudPlayer keys={["/single-track"]} />);
    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("enables previous/next buttons with multiple tracks", () => {
    renderWithProvider(<MixcloudPlayer keys={sampleKeys} />);
    expect(screen.getByText("Previous")).not.toBeDisabled();
    expect(screen.getByText("Next")).not.toBeDisabled();
  });
});
