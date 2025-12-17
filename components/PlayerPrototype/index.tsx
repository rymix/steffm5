import React, { useEffect, useRef, useState } from "react";

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

const PlayerPrototype: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const volumeMaxAngle = 150; // Volume dial: 150° from vertical (300° total range)
  const modeMaxAngle = 90; // Mode dial: 90° from vertical (180° total range)

  const [volumeRotation, setVolumeRotation] = useState<number>(-volumeMaxAngle);
  const [modeStep, setModeStep] = useState<number>(0); // 0-4 for 5 steps
  const isDraggingVolumeRef = useRef(false);
  const isDraggingModeRef = useRef(false);
  const lastYRef = useRef(0);
  const currentRotationRef = useRef(-volumeMaxAngle);
  const volumeDialRef = useRef<HTMLDivElement>(null);
  const modeDialRef = useRef<HTMLDivElement>(null);

  const modeLabels = ["Off", "Low", "Med", "High", "Max"];
  const modeTotalRange = modeMaxAngle * 2; // 180 degrees
  const modeStepAngle = modeTotalRange / 4; // 5 steps across range (4 intervals)

  // Scrolling text configuration
  const trackName = "CLASSIC!VINTAGE!AUDIO!PLAYER!-!NOW!PLAYING";
  const displayWidth = 20; // Number of characters visible at once
  const scrollSpeed = 300; // Milliseconds per character scroll
  const padding = "!!!!"; // 4 characters for padding between loops

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Prepare scrolling text with padding
  const scrollText = trackName + padding;

  // Mix progress (0-100%)
  const [mixProgress, setMixProgress] = useState<number>(35); // Demo value

  // Generate progress bar string
  const getProgressBar = () => {
    const progressChars = Math.floor((mixProgress / 100) * displayWidth);
    const playedPortion = "=".repeat(progressChars);
    const unplayedPortion = "_".repeat(displayWidth - progressChars);
    return playedPortion + unplayedPortion;
  };

  const handleVolumeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
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
    setVolumeRotation(constrainedDegrees);
  };

  const handleVolumeMouseUp = () => {
    isDraggingVolumeRef.current = false;
  };

  const handleModeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
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
    setVolumeRotation(constrainedDegrees);
  };

  const handleModeWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY < 0 ? 1 : -1;
    const newStep = Math.max(0, Math.min(4, modeStep + direction));
    setModeStep(newStep);
  };

  // Scrolling text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const next = prev + 1;
        return next >= scrollText.length ? 0 : next;
      });
    }, scrollSpeed);

    return () => clearInterval(interval);
  }, [scrollText.length, scrollSpeed]);

  // Demo: Animate progress (remove this when connecting real data)
  useEffect(() => {
    const interval = setInterval(() => {
      setMixProgress((prev) => {
        const next = prev + 1;
        return next > 100 ? 0 : next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Get visible portion of scrolling text
  const getVisibleText = () => {
    const doubledText = scrollText + scrollText; // Double for seamless loop
    return doubledText.substring(scrollPosition, scrollPosition + displayWidth);
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
      <StyledPlayerPrototype>
        <StyledWoodPanel>
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
              <StyledButtonLED $active={activeButton === "prev"} />
              <StyledButtonIcon>⏮</StyledButtonIcon>
              <StyledButton
                onClick={() =>
                  setActiveButton((prev) => (prev === "prev" ? null : "prev"))
                }
              />
              <StyledButtonLabel>Prev</StyledButtonLabel>
            </StyledButtonWrapper>

            <StyledButtonWrapper>
              <StyledButtonLED $active={activeButton === "play"} />
              <StyledButtonIcon>▶</StyledButtonIcon>
              <StyledButton
                onClick={() =>
                  setActiveButton((prev) => (prev === "play" ? null : "play"))
                }
              />
              <StyledButtonLabel>Play</StyledButtonLabel>
            </StyledButtonWrapper>

            <StyledButtonWrapper>
              <StyledButtonLED $active={activeButton === "next"} />
              <StyledButtonIcon>⏭</StyledButtonIcon>
              <StyledButton
                onClick={() =>
                  setActiveButton((prev) => (prev === "next" ? null : "next"))
                }
              />
              <StyledButtonLabel>Next</StyledButtonLabel>
            </StyledButtonWrapper>
          </StyledButtonsContainer>
        </StyledControls>
      </StyledPlayerPrototype>
    </>
  );
};

export default PlayerPrototype;
