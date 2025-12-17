import React, { useRef, useState } from "react";

import {
  StyledButton,
  StyledButtonIcon,
  StyledButtonLabel,
  StyledButtonLED,
  StyledButtonsContainer,
  StyledButtonWrapper,
  StyledControls,
  StyledDialLabel,
  StyledDialTick,
  StyledHeader,
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
    <StyledPlayerPrototype>
      <StyledWoodPanel>
        <StyledHeader></StyledHeader>
        <StyledSlats></StyledSlats>
        <StyledMainPanel></StyledMainPanel>
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
              <StyledDialLabel key={i} $angle={angle} $active={modeStep === i}>
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
  );
};

export default PlayerPrototype;
