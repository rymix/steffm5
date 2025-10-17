import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { MixcloudPlayer } from "../../../components/MixcloudPlayer/MixcloudPlayer";

describe("MixcloudPlayer", () => {
  const sampleKeys = [
    "/rymixxx/test-track-1/",
    "/rymixxx/test-track-2/",
    "/rymixxx/test-track-3/",
  ];

  it("renders without crashing with empty keys", () => {
    render(<MixcloudPlayer keys={[]} />);
    expect(screen.getByText("No tracks provided")).toBeInTheDocument();
  });

  it("renders with single key", () => {
    const keys = ["/test-key"];
    render(<MixcloudPlayer keys={keys} />);
    expect(screen.getByText("Current Track: 1 of 1")).toBeInTheDocument();
    expect(screen.getByText("Key: /test-key")).toBeInTheDocument();
  });

  it("renders with multiple keys showing first track", () => {
    render(<MixcloudPlayer keys={sampleKeys} />);
    expect(screen.getByText("Current Track: 1 of 3")).toBeInTheDocument();
    expect(screen.getByText("Key: /rymixxx/test-track-1/")).toBeInTheDocument();
  });

  it("displays player controls", () => {
    render(<MixcloudPlayer keys={sampleKeys} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Play")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("displays volume control", () => {
    render(<MixcloudPlayer keys={sampleKeys} />);
    expect(screen.getAllByText(/Volume: \d+%/)).toHaveLength(2); // One in status, one in control
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("displays playlist with all tracks", () => {
    render(<MixcloudPlayer keys={sampleKeys} />);
    expect(screen.getByText("Playlist:")).toBeInTheDocument();
    expect(screen.getByText("/rymixxx/test-track-1/")).toBeInTheDocument();
    expect(screen.getByText("/rymixxx/test-track-2/")).toBeInTheDocument();
    expect(screen.getByText("/rymixxx/test-track-3/")).toBeInTheDocument();
  });

  it("shows current playing indicator", () => {
    render(<MixcloudPlayer keys={sampleKeys} />);
    const firstTrackItem = screen
      .getByText("/rymixxx/test-track-1/")
      .closest("li");
    expect(firstTrackItem).toHaveStyle("background-color: rgb(224, 224, 224)");
  });

  it("disables previous/next buttons with single track", () => {
    render(<MixcloudPlayer keys={["/single-track"]} />);
    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("enables previous/next buttons with multiple tracks", () => {
    render(<MixcloudPlayer keys={sampleKeys} />);
    expect(screen.getByText("Previous")).not.toBeDisabled();
    expect(screen.getByText("Next")).not.toBeDisabled();
  });
});
