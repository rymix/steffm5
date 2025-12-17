import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  GlobalFonts,
  StyledButton,
  StyledButtonIcon,
  StyledButtonLabel,
  StyledButtonLED,
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
const PADDING = "!!!!"; // 4 characters for padding between loops

interface MiniPlayerProps {
  isVisible?: boolean;
  onToggleVisibility?: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({
  isVisible = true,
  onToggleVisibility: _onToggleVisibility,
}) => {
  const { state, actions } = useMixcloud();

  if (!isVisible) return null;

  // Draggable player position
  const [position, setPosition] = useState({
    x: window.innerWidth - 520,
    y: window.innerHeight - 360,
  });
  const [isDraggingPlayer, setIsDraggingPlayer] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const playerRef = useRef<HTMLDivElement>(null);

  const volumeMaxAngle = 150; // Volume dial: 150° from vertical (300° total range)
  const modeMaxAngle = 90; // Mode dial: 90° from vertical (180° total range)

  // Momentary button LED timers
  const [prevLEDActive, setPrevLEDActive] = useState<boolean>(false);
  const [nextLEDActive, setNextLEDActive] = useState<boolean>(false);
  const prevTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const nextTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isDraggingVolumeRef = useRef(false);
  const isDraggingModeRef = useRef(false);
  const lastYRef = useRef(0);
  const currentRotationRef = useRef(-volumeMaxAngle);
  const volumeDialRef = useRef<HTMLDivElement>(null);
  const modeDialRef = useRef<HTMLDivElement>(null);

  // Convert volume (0-1) to dial rotation (-150 to 150)
  const volumeRotation = (state.volume * 2 - 1) * volumeMaxAngle;

  const [modeStep, setModeStep] = useState<number>(0); // 0-4 for 5 steps
  const modeLabels = ["Off", "Low", "Med", "High", "Max"];
  const modeTotalRange = modeMaxAngle * 2; // 180 degrees
  const modeStepAngle = modeTotalRange / 4; // 5 steps across range (4 intervals)

  // Get current mix and track
  const currentMix = actions.getCurrentMix();

  const currentTrack = useMemo(() => {
    if (!currentMix?.tracks || state.position <= 0) return null;

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
        return track;
      }
    }

    return null;
  }, [currentMix, state.position, state.duration]);

  // Scrolling text configuration - memoized to prevent null artifacts
  const trackName = useMemo(() => {
    let text = "";
    if (currentTrack?.artistName && currentTrack?.trackName) {
      text = `${currentTrack.artistName} - ${currentTrack.trackName}`;
    } else {
      text = currentMix?.name || "STEF.FM MIXCLOUD PLAYER";
    }
    return text.toUpperCase().replace(/ /g, "!");
  }, [currentTrack?.artistName, currentTrack?.trackName, currentMix?.name]);

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Prepare scrolling text with padding
  const scrollText = useMemo(() => trackName + PADDING, [trackName]);

  // Mix progress (0-100%)
  const mixProgress =
    state.duration > 0 ? (state.position / state.duration) * 100 : 0;

  // Generate progress bar string
  const getProgressBar = () => {
    const progressChars = Math.floor((mixProgress / 100) * DISPLAY_WIDTH);
    const playedPortion = "=".repeat(progressChars);
    const unplayedPortion = "_".repeat(DISPLAY_WIDTH - progressChars);
    return playedPortion + unplayedPortion;
  };

  // Player drag handlers
  const handlePlayerMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from the wood panel area (header/slats)
    const target = e.target as HTMLElement;
    const isWoodPanel = target.closest('[data-draggable="true"]');
    if (!isWoodPanel) return;

    e.preventDefault();
    setIsDraggingPlayer(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({ x: position.x, y: position.y });
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
      const newStep = Math.max(0, Math.min(4, modeStep + direction));
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
    const newStep = Math.max(0, Math.min(4, modeStep + direction));
    setModeStep(newStep);
  };

  // Momentary button handlers
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

  // Player drag effect
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

      setPosition({ x: newX, y: newY });
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

  // Scrolling text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const next = prev + 1;
        return next >= scrollText.length ? 0 : next;
      });
    }, SCROLL_SPEED);

    return () => clearInterval(interval);
  }, [scrollText.length]);

  // Get visible portion of scrolling text
  const getVisibleText = () => {
    const doubledText = scrollText + scrollText; // Double for seamless loop
    return doubledText.substring(
      scrollPosition,
      scrollPosition + DISPLAY_WIDTH,
    );
  };

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

  return (
    <>
      <GlobalFonts />
      <StyledPlayerPrototype
        ref={playerRef}
        $x={position.x}
        $y={position.y}
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
            <StyledDisplay>
              <StyledDisplayText>{getVisibleText()}</StyledDisplayText>
              <StyledDisplayProgress>{getProgressBar()}</StyledDisplayProgress>
            </StyledDisplay>
          </StyledMainPanel>
        </StyledWoodPanel>
        <StyledControls>
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
        </StyledControls>
      </StyledPlayerPrototype>
    </>
  );
};

export default MiniPlayer;
