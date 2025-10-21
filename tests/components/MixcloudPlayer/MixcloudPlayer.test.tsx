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
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve()),
      },
    });

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
      // Now loads all tracks (3) and shows them all with random current index
      expect(screen.getByText(/Current Mix: \d+ of 3/)).toBeInTheDocument();
    });
  });

  it("renders with loaded tracks", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      // Now loads all tracks (3) and shows them all with random current index
      expect(screen.getByText(/Current Mix: \d+ of 3/)).toBeInTheDocument();
    });
    // Should have one of the tracks as current (random selection)
    expect(
      screen.getByText(/Key: \/rymixxx\/test-track-\d+\//),
    ).toBeInTheDocument();
  });

  it("displays player controls", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getByText("Previous")).toBeInTheDocument();
    });
    expect(screen.getByText("Play")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
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
    // Should show all 3 tracks in the playlist
    expect(screen.getByText("/rymixxx/test-track-1/")).toBeInTheDocument();
    expect(screen.getByText("/rymixxx/test-track-2/")).toBeInTheDocument();
    expect(screen.getByText("/rymixxx/test-track-3/")).toBeInTheDocument();
  });

  it("shows current playing indicator", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getByText("Playlist:")).toBeInTheDocument();
    });
    // Find the currently playing track (has the pause emoji)
    const playingIndicator = screen.getByText("⏸️");
    const currentTrackItem = playingIndicator.closest("li");
    expect(currentTrackItem).toHaveStyle(
      "background-color: rgb(224, 224, 224)",
    );
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

  it("enables previous/next buttons with multiple tracks", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getByText("Previous")).toBeInTheDocument();
    });
    // Now that we load all tracks, buttons should be enabled
    expect(screen.getByText("Previous")).toBeEnabled();
    expect(screen.getByText("Next")).toBeEnabled();
  });

  it("shows all tracks in playlist by default", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(screen.getByText("Playlist:")).toBeInTheDocument();
    });

    // Should show all tracks (3 in our mock)
    const playlistItems = screen.getAllByText(/^\d+\./);
    expect(playlistItems).toHaveLength(3);
  });
});
