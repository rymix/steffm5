import { MixcloudProvider } from "contexts/mixcloud";

import { MixcloudPlayer } from "components/MixcloudPlayer/MixcloudPlayer";

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

describe("MixcloudPlayer", () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <MixcloudProvider initialAutoPlay={false}>{component}</MixcloudProvider>,
    );
  };

  // Mock fetch for API calls
  beforeEach(() => {
    global.fetch = jest.fn((url: string) => {
      if (url.includes("/api/randomMix")) {
        // Mock random mix API
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ mcKey: "test-track-1" }),
        });
      }
      // Mock regular mixes API (for filter tests)
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { mixcloudKey: "test-track-1" },
            { mixcloudKey: "test-track-2" },
            { mixcloudKey: "test-track-3" },
          ]),
      });
    }) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders without crashing", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getByText("Current Mix: 1 of 1")).toBeInTheDocument();
    });
  });

  it("renders with loaded tracks", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getByText("Current Mix: 1 of 1")).toBeInTheDocument();
    });
    expect(screen.getByText("Key: /rymixxx/test-track-1/")).toBeInTheDocument();
  });

  it("displays player controls", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getByText("Previous")).toBeInTheDocument();
    });
    expect(screen.getByText("Play")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("displays volume control", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getAllByText(/Volume: \d+%/)).toHaveLength(2); // One in status, one in control
    });
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("displays playlist with all tracks", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getByText("Playlist:")).toBeInTheDocument();
    });
    expect(screen.getByText("/rymixxx/test-track-1/")).toBeInTheDocument();
  });

  it("shows current playing indicator", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getByText("/rymixxx/test-track-1/")).toBeInTheDocument();
    });
    const firstTrackItem = screen
      .getByText("/rymixxx/test-track-1/")
      .closest("li");
    expect(firstTrackItem).toHaveStyle("background-color: rgb(224, 224, 224)");
  });

  it("disables previous/next buttons with single track", async () => {
    // Mock fetch for single track
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ mixcloudKey: "single-track" }]),
      }),
    ) as jest.Mock;

    render(
      <MixcloudProvider initialAutoPlay={false}>
        <MixcloudPlayer />
      </MixcloudProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText("Previous")).toBeInTheDocument();
    });
    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("disables previous/next buttons with single random track", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getByText("Previous")).toBeInTheDocument();
    });
    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("shows single track in playlist by default", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getByText("Playlist:")).toBeInTheDocument();
    });

    // Should only show one track (the random one)
    const playlistItems = screen.getAllByText(/^\d+\./);
    expect(playlistItems).toHaveLength(1);
  });
});
