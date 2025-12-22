import { useMixcloud } from "contexts/mixcloud";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import PlaybackButtons from "@/components/PlaybackButtons";

import {
  GlobalFonts,
  StyledButton,
  StyledButtonLabel,
  StyledButtonLED,
  StyledButtonRowsWrapper,
  StyledButtonsContainer,
  StyledButtonWrapper,
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
  StyledMainPlayer,
  StyledModeDial,
  StyledModeDialShadow,
  StyledModeDialWrapper,
  StyledResetButton,
  StyledResizeHandle,
  StyledSlats,
  StyledVolumeDial,
  StyledVolumeDialShadow,
  StyledVolumeDialWrapper,
  StyledWoodPanel,
} from "./styles";

// Constants
const DISPLAY_WIDTH = 30; // Larger display
const SCROLL_SPEED = 300;
const MOMENTARY_LED_DURATION = 300; // Duration in ms for momentary button LED flash

// Display component
const DisplayContent = React.memo(() => {
  return (
    <StyledDisplay>
      <StyledDisplayText data-display-text />
      <StyledDisplayProgress data-display-progress />
    </StyledDisplay>
  );
});

DisplayContent.displayName = "DisplayContent";

const MainPlayer: React.FC = () => {
  const { state, actions } = useMixcloud();

  const volumeMaxAngle = 150;
  const modeMaxAngle = 115;

  // Button LED states
  const [shuffleLEDActive, setShuffleLEDActive] = useState<boolean>(false);
  const [randomPressed, setRandomPressed] = useState<boolean>(false);
  const [sharePressed, setSharePressed] = useState<boolean>(false);

  // Player drag states
  const positionRef = useRef({ x: 0, y: 0 });
  const [isDraggingPlayer, setIsDraggingPlayer] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const playerRef = useRef<HTMLDivElement>(null);
  const hasUserDraggedRef = useRef(false);
  const previousLayoutRef = useRef<"mobile" | "desktop">("desktop");

  // Player resize states
  const [scale, setScale] = useState(1);
  const [isDraggingResize, setIsDraggingResize] = useState(false);
  const resizeStartRef = useRef({ x: 0, y: 0, scale: 1 });

  // Dial refs
  const isDraggingVolumeRef = useRef(false);
  const isDraggingModeRef = useRef(false);
  const lastYRef = useRef(0);
  const currentRotationRef = useRef(-volumeMaxAngle);
  const volumeDialRef = useRef<HTMLDivElement>(null);
  const modeDialRef = useRef<HTMLDivElement>(null);

  // Display refs
  const displayTextRef = useRef<HTMLDivElement | null>(null);
  const displayProgressRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const statePositionRef = useRef(state.position);
  const stateDurationRef = useRef(state.duration);
  const isUserChangingDialRef = useRef(false);

  const volumeRotation = (state.volume * 2 - 1) * volumeMaxAngle;

  const [modeStep, setModeStep] = useState<number>(0);
  const modeLabels = ["All", "Adv", "Shoes", "Cock", "Spec", "Fav"];
  const categoryValues = ["", "aidm", "mpos", "cocksoup", "special", "fav"];
  const modeTotalRange = modeMaxAngle * 2;
  const modeStepAngle = modeTotalRange / 5;

  // Update refs
  useEffect(() => {
    statePositionRef.current = state.position;
    stateDurationRef.current = state.duration;
  }, [state.position, state.duration]);

  // Initialize dial position
  useEffect(() => {
    const currentCategory = state.filters.category || "";
    const categoryIndex = categoryValues.indexOf(currentCategory);
    if (categoryIndex !== -1) {
      setModeStep(categoryIndex);
    }
  }, []);

  // Sync dial with category
  useEffect(() => {
    if (isUserChangingDialRef.current) return;

    const currentCategory = state.filters.category || "";
    const categoryIndex = categoryValues.indexOf(currentCategory);
    if (categoryIndex !== -1 && categoryIndex !== modeStep) {
      setModeStep(categoryIndex);
    }
  }, [state.filters.category, categoryValues, modeStep]);

  // Apply category filter
  useEffect(() => {
    if (!isUserChangingDialRef.current) return;

    const categoryValue = categoryValues[modeStep];
    const currentCategory = state.filters.category || "";

    if (categoryValue !== currentCategory) {
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

    isUserChangingDialRef.current = false;
  }, [modeStep, categoryValues, state.filters, actions]);

  // Get current mix and track
  const currentMix = actions.getCurrentMix();

  const [currentTrack, setCurrentTrack] = useState<any>(null);

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

  // Track name for display
  const trackName = useMemo(() => {
    const parts = [];

    if (currentTrack?.trackName) {
      parts.push(currentTrack.trackName);
    }

    if (currentTrack?.artistName) {
      parts.push(currentTrack.artistName);
    }

    if (currentTrack?.remixArtistName) {
      parts.push(currentTrack.remixArtistName);
    }

    if (currentMix?.name) {
      parts.push(currentMix.name);
    }

    const text =
      parts.length > 0 ? parts.join(" * ") : "STEF.FM MIXCLOUD PLAYER";

    return text.toUpperCase().replace(/'/g, "").replace(/ /g, "!");
  }, [
    currentTrack?.trackName,
    currentTrack?.artistName,
    currentTrack?.remixArtistName,
    currentMix?.name,
  ]);

  const scrollText = useMemo(
    () => (trackName + "!***!").repeat(3),
    [trackName],
  );

  // Volume dial handlers
  const handleVolumeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingVolumeRef.current = true;
    lastYRef.current = e.clientY;
    currentRotationRef.current = volumeRotation;
  };

  const handleVolumeMouseMove = (e: MouseEvent) => {
    if (!isDraggingVolumeRef.current) return;

    const deltaY = lastYRef.current - e.clientY;
    lastYRef.current = e.clientY;

    const newRotation = currentRotationRef.current + deltaY;

    const constrainedDegrees = Math.max(
      -volumeMaxAngle,
      Math.min(volumeMaxAngle, newRotation),
    );
    currentRotationRef.current = constrainedDegrees;

    const newVolume = (constrainedDegrees / volumeMaxAngle + 1) / 2;
    actions.setVolume(newVolume);
  };

  const handleVolumeMouseUp = () => {
    isDraggingVolumeRef.current = false;
  };

  // Mode dial handlers
  const handleModeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingModeRef.current = true;
    lastYRef.current = e.clientY;
  };

  const handleModeMouseMove = (e: MouseEvent) => {
    if (!isDraggingModeRef.current) return;

    const deltaY = lastYRef.current - e.clientY;

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
    const delta = -e.deltaY * 0.2;
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

  // Center player function
  const centerPlayer = useCallback(() => {
    const playerWidth = 640 * scale;
    const playerHeight = 500 * scale;

    positionRef.current = {
      x: (window.innerWidth - playerWidth) / 2,
      y: (window.innerHeight - playerHeight) / 2,
    };
    if (playerRef.current) {
      playerRef.current.style.transform = `scale(${scale})`;
      playerRef.current.style.transformOrigin = "0 0";
      playerRef.current.style.translate = `${positionRef.current.x}px ${positionRef.current.y}px`;
    }
  }, [scale]);

  // Player drag handlers
  const handlePlayerMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isWoodPanel = target.closest('[data-draggable="true"]');
    if (!isWoodPanel) return;

    e.preventDefault();
    hasUserDraggedRef.current = true;
    setIsDraggingPlayer(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({ x: positionRef.current.x, y: positionRef.current.y });
  };

  // Button handlers

  const handleShuffleClick = () => {
    // TODO: Implement shuffle
    setShuffleLEDActive(!shuffleLEDActive);
  };

  const handleRandomClick = () => {
    setRandomPressed(true);
    setTimeout(() => setRandomPressed(false), MOMENTARY_LED_DURATION);
    actions.playRandomFromCurrentList();
  };

  const handleShareClick = () => {
    setSharePressed(true);
    setTimeout(() => setSharePressed(false), MOMENTARY_LED_DURATION);
    // TODO: Implement share functionality
  };

  const handleResetPosition = () => {
    hasUserDraggedRef.current = false;

    // Calculate center position with scale = 1
    const resetScale = 1;
    const playerWidth = 640 * resetScale;
    const playerHeight = 500 * resetScale;

    positionRef.current = {
      x: (window.innerWidth - playerWidth) / 2,
      y: (window.innerHeight - playerHeight) / 2,
    };

    setScale(resetScale);

    if (playerRef.current) {
      playerRef.current.style.transform = `scale(${resetScale})`;
      playerRef.current.style.transformOrigin = "0 0";
      playerRef.current.style.translate = `${positionRef.current.x}px ${positionRef.current.y}px`;
    }
  };

  // Resize handle handlers
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    hasUserDraggedRef.current = true; // Mark as user-interacted to prevent auto-centering
    setIsDraggingResize(true);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scale: scale,
    };
  };

  // Initialize position centered on mount
  useEffect(() => {
    centerPlayer();
  }, []); // Only run on mount

  // Player drag effect - direct DOM manipulation for performance
  useEffect(() => {
    if (!isDraggingPlayer) return;

    const handlePlayerMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const playerWidth = 640 * scale;
      const playerHeight = 500 * scale;

      const newX = Math.max(
        0,
        Math.min(window.innerWidth - playerWidth, elementStart.x + deltaX),
      );
      const newY = Math.max(
        0,
        Math.min(window.innerHeight - playerHeight, elementStart.y + deltaY),
      );

      positionRef.current = { x: newX, y: newY };
      if (playerRef.current) {
        playerRef.current.style.transform = `scale(${scale})`;
        playerRef.current.style.transformOrigin = "0 0";
        playerRef.current.style.translate = `${newX}px ${newY}px`;
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
  }, [isDraggingPlayer, dragStart, elementStart, scale]);

  // Resize drag effect
  useEffect(() => {
    if (!isDraggingResize) return;

    const handleResizeMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartRef.current.x;
      const deltaY = e.clientY - resizeStartRef.current.y;

      // Average horizontal and vertical drag for diagonal scaling
      const delta = (deltaX + deltaY) / 2;
      const scaleDelta = delta / 300; // Sensitivity factor

      const newScale = Math.max(
        0.5,
        Math.min(2, resizeStartRef.current.scale + scaleDelta),
      );

      // Just update scale - position stays the same, top-left stays anchored
      setScale(newScale);
    };

    const handleResizeMouseUp = () => {
      setIsDraggingResize(false);
    };

    document.addEventListener("mousemove", handleResizeMouseMove);
    document.addEventListener("mouseup", handleResizeMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleResizeMouseMove);
      document.removeEventListener("mouseup", handleResizeMouseUp);
    };
  }, [isDraggingResize]);

  // Keep player in bounds on window resize, recenter on breakpoint change
  useEffect(() => {
    const handleResize = () => {
      const playerWidth = 640 * scale;
      const playerHeight = 500 * scale;
      const isMobile = window.innerWidth <= 1024;
      const currentLayout = isMobile ? "mobile" : "desktop";

      // Check if layout changed (breakpoint crossed)
      if (currentLayout !== previousLayoutRef.current) {
        previousLayoutRef.current = currentLayout;
        // Reset size and position when switching from responsive to regular
        if (currentLayout === "desktop") {
          hasUserDraggedRef.current = false;
          setScale(1);
          centerPlayer();
          return;
        }
      }

      // If user hasn't dragged yet, keep centered
      if (!hasUserDraggedRef.current) {
        centerPlayer();
        return;
      }

      // Otherwise, constrain to bounds
      const constrainedX = Math.max(
        0,
        Math.min(window.innerWidth - playerWidth, positionRef.current.x),
      );
      const constrainedY = Math.max(
        0,
        Math.min(window.innerHeight - playerHeight, positionRef.current.y),
      );

      if (
        constrainedX !== positionRef.current.x ||
        constrainedY !== positionRef.current.y
      ) {
        positionRef.current = { x: constrainedX, y: constrainedY };
        if (playerRef.current) {
          playerRef.current.style.transform = `scale(${scale})`;
          playerRef.current.style.transformOrigin = "0 0";
          playerRef.current.style.translate = `${constrainedX}px ${constrainedY}px`;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [centerPlayer, scale]);

  // Direct DOM manipulation for display
  useEffect(() => {
    displayTextRef.current = document.querySelector(
      "[data-display-text]",
    ) as HTMLDivElement;
    displayProgressRef.current = document.querySelector(
      "[data-display-progress]",
    ) as HTMLDivElement;

    if (!displayTextRef.current || !displayProgressRef.current) {
      return;
    }

    let lastUpdateTime = 0;

    const updateDisplay = (timestamp: number) => {
      if (timestamp - lastUpdateTime >= SCROLL_SPEED) {
        const wrapPoint = Math.floor(scrollText.length / 3);
        scrollPositionRef.current = (scrollPositionRef.current + 1) % wrapPoint;
        lastUpdateTime = timestamp;
      }

      const visibleText = scrollText.substring(
        scrollPositionRef.current,
        scrollPositionRef.current + DISPLAY_WIDTH,
      );

      const mixProgress =
        stateDurationRef.current > 0
          ? (statePositionRef.current / stateDurationRef.current) * 100
          : 0;

      const progressChars = Math.floor((mixProgress / 100) * DISPLAY_WIDTH);
      const progressBar =
        "=".repeat(progressChars) + "_".repeat(DISPLAY_WIDTH - progressChars);

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
  }, [scrollText]);

  // Mouse move listeners
  useEffect(() => {
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

  return (
    <>
      <GlobalFonts />
      <StyledMainPlayer
        ref={playerRef}
        onMouseDown={handlePlayerMouseDown}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          translate: `${positionRef.current.x}px ${positionRef.current.y}px`,
        }}
      >
        <StyledWoodPanel data-draggable="true">
          <StyledHeader>
            <StyledResetButton
              onClick={handleResetPosition}
              title="Reset position"
            >
              ⟲
            </StyledResetButton>
          </StyledHeader>
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

          <StyledButtonRowsWrapper>
            <PlaybackButtons showLabels={false} />

            <StyledButtonsContainer>
              <StyledButtonWrapper>
                <StyledButtonLED $active={shuffleLEDActive} />
                <StyledButtonLabel>Shuffle</StyledButtonLabel>
                <StyledButton onClick={handleShuffleClick} />
              </StyledButtonWrapper>

              <StyledButtonWrapper>
                <StyledButtonLED $active={randomPressed} />
                <StyledButtonLabel>Random</StyledButtonLabel>
                <StyledButton onClick={handleRandomClick} />
              </StyledButtonWrapper>

              <StyledButtonWrapper>
                <StyledButtonLED $active={sharePressed} />
                <StyledButtonLabel>Share</StyledButtonLabel>
                <StyledButton onClick={handleShareClick} />
              </StyledButtonWrapper>
            </StyledButtonsContainer>
          </StyledButtonRowsWrapper>
        </StyledControls>
        <StyledResizeHandle
          onMouseDown={handleResizeMouseDown}
          title="Resize player"
        />
      </StyledMainPlayer>
    </>
  );
};

export default MainPlayer;
