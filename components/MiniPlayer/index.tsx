import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useMemo, useRef, useState } from "react";

import PlaybackButtons from "@/components/PlaybackButtons";

import {
  GlobalFonts,
  StyledControls,
  StyledDialContainer,
  StyledDialLabel,
  StyledDialLabelText,
  StyledDialTick,
  StyledDisplay,
  StyledDisplayProgress,
  StyledDisplayText,
  StyledHeader,
  StyledLogoPlate,
  StyledLogoText,
  StyledMainPanel,
  StyledModeDial,
  StyledModeDialShadow,
  StyledModeDialWrapper,
  StyledPlayerPrototype,
  StyledSlats,
  StyledVolumeDial,
  StyledVolumeDialShadow,
  StyledVolumeDialWrapper,
  StyledWoodPanel,
} from "./styles";

// Constants defined outside component to prevent re-creation on every render
const DISPLAY_WIDTH = 20; // Number of characters visible at once
const SCROLL_SPEED = 300; // Milliseconds per character scroll

interface MiniPlayerProps {
  isVisible?: boolean;
  onToggleVisibility?: () => void;
}

// Display component without dynamic props to prevent styled-components recalculation
const DisplayContent = React.memo(() => {
  return (
    <StyledDisplay>
      <StyledDisplayText data-display-text />
      <StyledDisplayProgress data-display-progress />
    </StyledDisplay>
  );
});

DisplayContent.displayName = "DisplayContent";

const MiniPlayerInner: React.FC<MiniPlayerProps> = ({
  isVisible = true,
  onToggleVisibility: _onToggleVisibility,
}) => {
  const { state, actions } = useMixcloud();

  // Draggable player position (direct DOM manipulation for performance)
  const positionRef = useRef({
    x: 0,
    y: 0,
  });
  const [isDraggingPlayer, setIsDraggingPlayer] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const playerRef = useRef<HTMLDivElement>(null);

  const volumeMaxAngle = 150; // Volume dial: 150° from vertical (300° total range)
  const modeMaxAngle = 115; // Mode dial: 135° from vertical (270° total range)

  const isDraggingVolumeRef = useRef(false);
  const isDraggingModeRef = useRef(false);
  const lastYRef = useRef(0);
  const currentRotationRef = useRef(-volumeMaxAngle);
  const volumeDialRef = useRef<HTMLDivElement>(null);
  const modeDialRef = useRef<HTMLDivElement>(null);
  const displayTextRef = useRef<HTMLDivElement | null>(null);
  const displayProgressRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const statePositionRef = useRef(state.position);
  const stateDurationRef = useRef(state.duration);
  const isUserChangingDialRef = useRef(false);

  // Convert volume (0-1) to dial rotation (-150 to 150)
  const volumeRotation = (state.volume * 2 - 1) * volumeMaxAngle;

  const [modeStep, setModeStep] = useState<number>(0); // 0-5 for 6 steps
  const modeLabels = ["All", "Adv", "Shoes", "Cock", "Spec", "Fav"];
  const categoryValues = ["", "aidm", "mpos", "cocksoup", "special", "fav"];
  const modeTotalRange = modeMaxAngle * 2; // 180 degrees
  const modeStepAngle = modeTotalRange / 5; // 6 steps across range (5 intervals)

  // Update refs without triggering re-render
  useEffect(() => {
    statePositionRef.current = state.position;
    stateDurationRef.current = state.duration;
  }, [state.position, state.duration]);

  // Initialize dial position to match current category on mount
  useEffect(() => {
    const currentCategory = state.filters.category || "";
    const categoryIndex = categoryValues.indexOf(currentCategory);
    if (categoryIndex !== -1) {
      setModeStep(categoryIndex);
    }
  }, []); // Only run on mount

  // Sync mode dial with current category filter (only when changed externally)
  useEffect(() => {
    if (isUserChangingDialRef.current) return;

    const currentCategory = state.filters.category || "";
    const categoryIndex = categoryValues.indexOf(currentCategory);
    if (categoryIndex !== -1 && categoryIndex !== modeStep) {
      setModeStep(categoryIndex);
    }
  }, [state.filters.category, categoryValues, modeStep]);

  // Apply category filter when mode dial changes
  useEffect(() => {
    if (!isUserChangingDialRef.current) return;

    const categoryValue = categoryValues[modeStep];
    const currentCategory = state.filters.category || "";

    if (categoryValue !== currentCategory) {
      // Update filter and apply
      actions.updateFilter("category", categoryValue);
      const filtersWithCategory = {
        ...state.filters,
        category: categoryValue,
      };
      const cleanFilters = Object.fromEntries(
        Object.entries(filtersWithCategory).filter(
          ([_, value]) => value?.trim() !== "",
        ),
      );
      actions.applyFilters(cleanFilters);
    }

    // Reset flag after applying
    isUserChangingDialRef.current = false;
  }, [modeStep, categoryValues, state.filters, actions]);

  // Get current mix and track
  const currentMix = actions.getCurrentMix();

  // Store current track in ref and update independently
  const [currentTrack, setCurrentTrack] = useState<any>(null);

  // Update current track based on position changes (throttled to avoid re-renders)
  useEffect(() => {
    if (!currentMix?.tracks || state.position <= 0) {
      setCurrentTrack(null);
      return;
    }

    const timeToSeconds = (timeString: string): number => {
      const parts = timeString.split(":");
      if (parts.length === 2) {
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
      } else if (parts.length === 3) {
        return (
          parseInt(parts[0]) * 3600 +
          parseInt(parts[1]) * 60 +
          parseInt(parts[2])
        );
      }
      return 0;
    };

    const sortedTracks = [...currentMix.tracks].sort((a, b) => {
      return timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
    });

    const tolerance = 2;

    for (let i = 0; i < sortedTracks.length; i++) {
      const track = sortedTracks[i];
      const nextTrack =
        i < sortedTracks.length - 1 ? sortedTracks[i + 1] : null;

      const trackStartSeconds = timeToSeconds(track.startTime);
      const nextTrackStartSeconds = nextTrack
        ? timeToSeconds(nextTrack.startTime)
        : state.duration;

      if (
        state.position >= trackStartSeconds - tolerance &&
        state.position < nextTrackStartSeconds - tolerance
      ) {
        // Only update if track changed to avoid unnecessary re-renders
        setCurrentTrack((prev: any) => {
          if (prev?.trackName !== track.trackName) {
            return track;
          }
          return prev;
        });
        return;
      }
    }

    setCurrentTrack(null);
  }, [currentMix, state.position, state.duration]);

  // Scrolling text configuration - memoized to prevent null artifacts
  const trackName = useMemo(() => {
    const parts = [];

    if (currentTrack?.trackName) {
      parts.push(currentTrack.trackName);
    }

    if (currentTrack?.artistName) {
      parts.push(currentTrack.artistName);
    }

    // Add remix artist if present
    if (currentTrack?.remixArtist) {
      parts.push(currentTrack.remixArtist);
    }

    if (currentMix?.name) {
      parts.push(currentMix.name);
    }

    // If no track info, show default
    const text =
      parts.length > 0 ? parts.join(" * ") : "STEF.FM MIXCLOUD PLAYER";

    return text
      .toUpperCase()
      .replace(/'/g, "") // Remove apostrophes entirely for fixed-width display
      .replace(/ /g, "!");
  }, [
    currentTrack?.trackName,
    currentTrack?.artistName,
    currentTrack?.remixArtist,
    currentMix?.name,
  ]);

  // Prepare scrolling text with padding - triple the text to prevent jump on wrap
  const scrollText = useMemo(
    () => (trackName + "!***!").repeat(3),
    [trackName],
  );

  // Player drag handlers
  const handlePlayerMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from the wood panel area (header/slats)
    const target = e.target as HTMLElement;
    const isWoodPanel = target.closest('[data-draggable="true"]');
    if (!isWoodPanel) return;

    e.preventDefault();
    setIsDraggingPlayer(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({ x: positionRef.current.x, y: positionRef.current.y });
  };

  const handleVolumeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingVolumeRef.current = true;
    lastYRef.current = e.clientY;
    currentRotationRef.current = volumeRotation;
  };

  const handleVolumeMouseMove = (e: MouseEvent) => {
    if (!isDraggingVolumeRef.current) return;

    // Linear vertical mode: drag up to increase, down to decrease
    const deltaY = lastYRef.current - e.clientY;
    lastYRef.current = e.clientY;

    // Sensitivity: 1 pixel of mouse movement = 1 degree of rotation
    const newRotation = currentRotationRef.current + deltaY;

    // Constrain rotation within max range
    const constrainedDegrees = Math.max(
      -volumeMaxAngle,
      Math.min(volumeMaxAngle, newRotation),
    );
    currentRotationRef.current = constrainedDegrees;

    // Convert rotation to volume (0-1)
    const newVolume = (constrainedDegrees / volumeMaxAngle + 1) / 2;
    actions.setVolume(newVolume);
  };

  const handleVolumeMouseUp = () => {
    isDraggingVolumeRef.current = false;
  };

  const handleModeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingModeRef.current = true;
    lastYRef.current = e.clientY;
  };

  const handleModeMouseMove = (e: MouseEvent) => {
    if (!isDraggingModeRef.current) return;

    // Linear vertical mode with snapping
    const deltaY = lastYRef.current - e.clientY;

    // Determine if we should change step (every 30 pixels)
    if (Math.abs(deltaY) >= 30) {
      const direction = deltaY > 0 ? 1 : -1;
      const newStep = Math.max(0, Math.min(5, modeStep + direction));
      isUserChangingDialRef.current = true;
      setModeStep(newStep);
      lastYRef.current = e.clientY;
    }
  };

  const handleModeMouseUp = () => {
    isDraggingModeRef.current = false;
  };

  const handleVolumeWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.2; // Sensitivity factor
    const newRotation = volumeRotation + delta;
    const constrainedDegrees = Math.max(
      -volumeMaxAngle,
      Math.min(volumeMaxAngle, newRotation),
    );
    const newVolume = (constrainedDegrees / volumeMaxAngle + 1) / 2;
    actions.setVolume(newVolume);
  };

  const handleModeWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY < 0 ? 1 : -1;
    const newStep = Math.max(0, Math.min(5, modeStep + direction));
    isUserChangingDialRef.current = true;
    setModeStep(newStep);
  };

  // Player drag effect - direct DOM manipulation for performance
  useEffect(() => {
    if (!isDraggingPlayer) return;

    const handlePlayerMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const newX = Math.max(
        0,
        Math.min(window.innerWidth - 480, elementStart.x + deltaX),
      );
      const newY = Math.max(
        0,
        Math.min(window.innerHeight - 320, elementStart.y + deltaY),
      );

      // Direct DOM manipulation to avoid React re-render and styled-components recalculation
      positionRef.current = { x: newX, y: newY };
      if (playerRef.current) {
        playerRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      }
    };

    const handlePlayerMouseUp = () => {
      setIsDraggingPlayer(false);
    };

    document.addEventListener("mousemove", handlePlayerMouseMove);
    document.addEventListener("mouseup", handlePlayerMouseUp);

    return () => {
      document.removeEventListener("mousemove", handlePlayerMouseMove);
      document.removeEventListener("mouseup", handlePlayerMouseUp);
    };
  }, [isDraggingPlayer, dragStart, elementStart]);

  // Initialize position on client side only (avoid SSR window error)
  useEffect(() => {
    if (!isVisible) return;

    positionRef.current = {
      x: window.innerWidth - 520,
      y: window.innerHeight - 360,
    };
    if (playerRef.current) {
      playerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
    }
  }, [isVisible]);

  // Keep player in bounds on window resize
  useEffect(() => {
    if (!isVisible) return;

    const handleResize = () => {
      const playerWidth = 480;
      const playerHeight = 320;

      // Constrain position to keep player fully visible
      const constrainedX = Math.max(
        0,
        Math.min(window.innerWidth - playerWidth, positionRef.current.x),
      );
      const constrainedY = Math.max(
        0,
        Math.min(window.innerHeight - playerHeight, positionRef.current.y),
      );

      // Update ref and DOM if position changed
      if (
        constrainedX !== positionRef.current.x ||
        constrainedY !== positionRef.current.y
      ) {
        positionRef.current = { x: constrainedX, y: constrainedY };
        if (playerRef.current) {
          playerRef.current.style.transform = `translate3d(${constrainedX}px, ${constrainedY}px, 0)`;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible]);

  // Direct DOM manipulation for display updates to avoid React re-renders and FOUC
  useEffect(() => {
    // Don't run if not visible
    if (!isVisible) return;

    // Capture display element refs
    displayTextRef.current = document.querySelector(
      "[data-display-text]",
    ) as HTMLDivElement;
    displayProgressRef.current = document.querySelector(
      "[data-display-progress]",
    ) as HTMLDivElement;

    // Wait for refs to be found
    if (!displayTextRef.current || !displayProgressRef.current) {
      console.warn("[MiniPlayer] Display refs not found");
      return;
    }

    let lastUpdateTime = 0;

    const updateDisplay = (timestamp: number) => {
      // Update scroll position every SCROLL_SPEED ms
      if (timestamp - lastUpdateTime >= SCROLL_SPEED) {
        // Wrap at 1/3 of scrollText length since it's repeated 3 times
        const wrapPoint = Math.floor(scrollText.length / 3);
        scrollPositionRef.current = (scrollPositionRef.current + 1) % wrapPoint;
        lastUpdateTime = timestamp;
      }

      // Get visible text - scrollText is already repeated 3x, so no need to double
      const visibleText = scrollText.substring(
        scrollPositionRef.current,
        scrollPositionRef.current + DISPLAY_WIDTH,
      );

      // Calculate mix progress from refs (no re-render)
      const mixProgress =
        stateDurationRef.current > 0
          ? (statePositionRef.current / stateDurationRef.current) * 100
          : 0;

      // Generate progress bar
      const progressChars = Math.floor((mixProgress / 100) * DISPLAY_WIDTH);
      const progressBar =
        "=".repeat(progressChars) + "_".repeat(DISPLAY_WIDTH - progressChars);

      // Update DOM directly
      if (displayTextRef.current) {
        displayTextRef.current.textContent = visibleText;
      }
      if (displayProgressRef.current) {
        displayProgressRef.current.textContent = progressBar;
      }

      animationFrameRef.current = requestAnimationFrame(updateDisplay);
    };

    animationFrameRef.current = requestAnimationFrame(updateDisplay);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollText, isVisible]);

  React.useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      handleVolumeMouseMove(e);
      handleModeMouseMove(e);
    };
    const upHandler = () => {
      handleVolumeMouseUp();
      handleModeMouseUp();
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };
  }, [modeStep]);

  // Early return after all hooks to avoid Rules of Hooks violation
  if (!isVisible) return null;

  return (
    <>
      <GlobalFonts />
      <StyledPlayerPrototype
        ref={playerRef}
        style={{
          transform: `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`,
        }}
        $isDragging={isDraggingPlayer}
        onMouseDown={handlePlayerMouseDown}
      >
        <StyledWoodPanel data-draggable="true">
          <StyledHeader></StyledHeader>
          <StyledSlats>
            <StyledLogoPlate>
              <StyledLogoText>STEF.FM</StyledLogoText>
            </StyledLogoPlate>
          </StyledSlats>
          <StyledMainPanel>
            <DisplayContent />
          </StyledMainPanel>
        </StyledWoodPanel>
        <StyledControls>
          <StyledDialContainer>
            <StyledVolumeDialWrapper>
              {/* Tick marks across the volume dial's range */}
              {Array.from({ length: 11 }).map((_, i) => {
                const angle = -volumeMaxAngle + (i * (volumeMaxAngle * 2)) / 10;
                return <StyledDialTick key={i} $angle={angle} />;
              })}
              <StyledVolumeDialShadow />
              <StyledVolumeDial
                ref={volumeDialRef}
                $rotation={volumeRotation}
                onMouseDown={handleVolumeMouseDown}
                onWheel={handleVolumeWheel}
              />
            </StyledVolumeDialWrapper>
            <StyledDialLabelText>Volume</StyledDialLabelText>
          </StyledDialContainer>

          <StyledDialContainer>
            <StyledModeDialWrapper>
              {/* Labels for each step */}
              {modeLabels.map((label, i) => {
                const angle = -modeMaxAngle + i * modeStepAngle;
                return (
                  <StyledDialLabel
                    key={i}
                    $angle={angle}
                    $active={modeStep === i}
                  >
                    {label}
                  </StyledDialLabel>
                );
              })}
              <StyledModeDialShadow />
              <StyledModeDial
                ref={modeDialRef}
                $rotation={-modeMaxAngle + modeStep * modeStepAngle}
                onMouseDown={handleModeMouseDown}
                onWheel={handleModeWheel}
              />
            </StyledModeDialWrapper>
            <StyledDialLabelText>Category</StyledDialLabelText>
          </StyledDialContainer>

          <PlaybackButtons showLabels={true} />
        </StyledControls>
      </StyledPlayerPrototype>
    </>
  );
};

// Memoize to prevent unnecessary re-renders from parent
const MiniPlayer = React.memo(MiniPlayerInner);

export default MiniPlayer;
