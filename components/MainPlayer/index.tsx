import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  GlobalFonts,
  StyledButton,
  StyledButtonIcon,
  StyledButtonLabel,
  StyledButtonLED,
  StyledButtonRowsWrapper,
  StyledButtonsContainer,
  StyledButtonWrapper,
  StyledControls,
  StyledDialLabel,
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
  StyledSlats,
  StyledVolumeDial,
  StyledVolumeDialShadow,
  StyledVolumeDialWrapper,
  StyledWoodPanel,
} from "./styles";

// Constants
const DISPLAY_WIDTH = 30; // Larger display
const SCROLL_SPEED = 300;

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
  const [prevLEDActive, setPrevLEDActive] = useState<boolean>(false);
  const [nextLEDActive, setNextLEDActive] = useState<boolean>(false);
  const [shuffleLEDActive, setShuffleLEDActive] = useState<boolean>(false);
  const prevTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const nextTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    if (currentTrack?.remixArtist) {
      parts.push(currentTrack.remixArtist);
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
    currentTrack?.remixArtist,
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

  // Button handlers
  const handlePrevClick = () => {
    actions.previous();
    setPrevLEDActive(true);
    if (prevTimeoutRef.current) {
      clearTimeout(prevTimeoutRef.current);
    }
    prevTimeoutRef.current = setTimeout(() => {
      setPrevLEDActive(false);
    }, 1000);
  };

  const handleNextClick = () => {
    actions.next();
    setNextLEDActive(true);
    if (nextTimeoutRef.current) {
      clearTimeout(nextTimeoutRef.current);
    }
    nextTimeoutRef.current = setTimeout(() => {
      setNextLEDActive(false);
    }, 1000);
  };

  const handleShuffleClick = () => {
    // TODO: Implement shuffle
    setShuffleLEDActive(!shuffleLEDActive);
  };

  const handleRandomClick = () => {
    // TODO: Implement random
    actions.next();
  };

  const handleShareClick = () => {
    // TODO: Implement share
    console.log("Share clicked");
  };

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (prevTimeoutRef.current) {
        clearTimeout(prevTimeoutRef.current);
      }
      if (nextTimeoutRef.current) {
        clearTimeout(nextTimeoutRef.current);
      }
    };
  }, []);

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
      <StyledMainPlayer>
        <StyledWoodPanel>
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

          <StyledButtonRowsWrapper>
            <StyledButtonsContainer>
              <StyledButtonWrapper>
                <StyledButtonLED $active={prevLEDActive} />
                <StyledButtonIcon>⏮</StyledButtonIcon>
                <StyledButton
                  onClick={handlePrevClick}
                  disabled={state.keys.length <= 1}
                />
                <StyledButtonLabel>Prev</StyledButtonLabel>
              </StyledButtonWrapper>

              <StyledButtonWrapper>
                <StyledButtonLED $active={state.isPlaying} />
                <StyledButtonIcon>▶ ⏸</StyledButtonIcon>
                <StyledButton
                  onClick={actions.toggle}
                  disabled={state.isLoading}
                />
                <StyledButtonLabel>Play / Pause</StyledButtonLabel>
              </StyledButtonWrapper>

              <StyledButtonWrapper>
                <StyledButtonLED $active={nextLEDActive} />
                <StyledButtonIcon>⏭</StyledButtonIcon>
                <StyledButton
                  onClick={handleNextClick}
                  disabled={state.keys.length <= 1}
                />
                <StyledButtonLabel>Next</StyledButtonLabel>
              </StyledButtonWrapper>
            </StyledButtonsContainer>

            <StyledButtonsContainer>
              <StyledButtonWrapper>
                <StyledButtonLED $active={shuffleLEDActive} />
                <StyledButtonIcon>🔀</StyledButtonIcon>
                <StyledButton onClick={handleShuffleClick} />
                <StyledButtonLabel>Shuffle</StyledButtonLabel>
              </StyledButtonWrapper>

              <StyledButtonWrapper>
                <StyledButtonLED $active={false} />
                <StyledButtonIcon>🎲</StyledButtonIcon>
                <StyledButton onClick={handleRandomClick} />
                <StyledButtonLabel>Random</StyledButtonLabel>
              </StyledButtonWrapper>

              <StyledButtonWrapper>
                <StyledButtonLED $active={false} />
                <StyledButtonIcon>🔗</StyledButtonIcon>
                <StyledButton onClick={handleShareClick} />
                <StyledButtonLabel>Share</StyledButtonLabel>
              </StyledButtonWrapper>
            </StyledButtonsContainer>
          </StyledButtonRowsWrapper>
        </StyledControls>
      </StyledMainPlayer>
    </>
  );
};

export default MainPlayer;
