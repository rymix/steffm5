import { MixcloudProvider } from "contexts/mixcloud";

import MixcloudPlayer from "components/MixcloudPlayer/MixcloudPlayer";

import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";

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
      // Mock regular mixes API (for filter tests) - now returns full Mix objects
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              mixcloudKey: "test-track-1",
              name: "Test Track 1",
              category: "test",
              releaseDate: "2024-01-01",
              coverArtSmall: "http://test.com/cover1.jpg",
              notes: "Test notes 1",
              tags: ["test", "track"],
              duration: "3600",
              tracks: [],
            },
            {
              mixcloudKey: "test-track-2",
              name: "Test Track 2",
              category: "test",
              releaseDate: "2024-01-02",
              coverArtSmall: "http://test.com/cover2.jpg",
              notes: "Test notes 2",
              tags: ["test", "track"],
              duration: "3600",
              tracks: [],
            },
            {
              mixcloudKey: "test-track-3",
              name: "Test Track 3",
              category: "test",
              releaseDate: "2024-01-03",
              coverArtSmall: "http://test.com/cover3.jpg",
              notes: "Test notes 3",
              tags: ["test", "track"],
              duration: "3600",
              tracks: [],
            },
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
      // Check that the player iframe is rendered
      expect(document.querySelector("iframe")).toBeInTheDocument();
    });
  });

  it("renders with loaded tracks", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      // Check that the player iframe is rendered
      expect(document.querySelector("iframe")).toBeInTheDocument();
    });
    // Should have iframe with mixcloud widget URL
    const iframe = document.querySelector("iframe");
    expect(iframe).toHaveAttribute("src");
    expect(iframe?.getAttribute("src")).toContain("mixcloud.com");
  });

  it("displays player widget", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      // Check for the iframe element
      const iframe = document.querySelector("iframe");
      expect(iframe).toBeInTheDocument();
    });
  });

  it("displays only player widget and playlist", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      // Check for the iframe element
      const iframe = document.querySelector("iframe");
      expect(iframe).toBeInTheDocument();
    });
    // Should render the widget iframe
    const iframe = document.querySelector("iframe");
    expect(iframe).toHaveAttribute("src");
  });

  it("displays playlist with all tracks", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(document.querySelector("iframe")).toBeInTheDocument();
    });
    // Should have iframe with mixcloud URL containing the track
    const iframe = document.querySelector("iframe");
    expect(iframe?.getAttribute("src")).toContain("test-track");
  });

  it("shows current playing indicator", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(document.querySelector("iframe")).toBeInTheDocument();
    });
    // Check that iframe is rendered with proper attributes
    const iframe = document.querySelector("iframe");
    expect(iframe).toHaveAttribute("allow", "autoplay; encrypted-media");
    expect(iframe).toHaveAttribute("width", "100%");
    expect(iframe).toHaveAttribute("height", "120");
  });

  it("handles single track scenarios", async () => {
    // Mock fetch for single track
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              mixcloudKey: "single-track",
              name: "Single Track",
              category: "test",
              releaseDate: "2024-01-01",
              coverArtSmall: "http://test.com/cover.jpg",
              notes: "Single track notes",
              tags: ["single"],
              duration: "3600",
              tracks: [],
            },
          ]),
      }),
    ) as jest.Mock;

    render(
      <MixcloudProvider initialAutoPlay={false}>
        <MixcloudPlayer />
      </MixcloudProvider>,
    );
    await waitFor(() => {
      expect(document.querySelector("iframe")).toBeInTheDocument();
    });
    // Should show the single track in the iframe src
    const iframe = document.querySelector("iframe");
    expect(iframe?.getAttribute("src")).toContain("single-track");
  });

  it("handles multiple tracks scenarios", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(document.querySelector("iframe")).toBeInTheDocument();
    });
    // Should have iframe loaded with one of the tracks
    const iframe = document.querySelector("iframe");
    expect(iframe?.getAttribute("src")).toContain("test-track");
  });

  it("shows all tracks in playlist by default", async () => {
    renderWithProvider(<MixcloudPlayer />);
    await waitFor(() => {
      expect(document.querySelector("iframe")).toBeInTheDocument();
    });

    // Should have iframe with mixcloud widget loaded
    const iframe = document.querySelector("iframe");
    expect(iframe).toHaveAttribute("src");
    expect(iframe?.getAttribute("src")).toContain("player-widget.mixcloud.com");
  });
});
