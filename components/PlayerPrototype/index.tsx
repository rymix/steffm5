import React, { useRef, useState } from "react";

import {
  StyledButton,
  StyledButtonIcon,
  StyledButtonLabel,
  StyledButtonLED,
  StyledButtonsContainer,
  StyledButtonWrapper,
  StyledControls,
  StyledDialMarker,
  StyledDialTick,
  StyledHeader,
  StyledMainPanel,
  StyledModeDial,
  StyledPlayerPrototype,
  StyledSlats,
  StyledVolumeDial,
  StyledVolumeDialShadow,
  StyledVolumeDialWrapper,
  StyledWoodPanel,
} from "./styles";

const PlayerPrototype: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [volumeRotation, setVolumeRotation] = useState<number>(-150); // Start at 7 o'clock
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startRotationRef = useRef(0);
  const volumeDialRef = useRef<HTMLDivElement>(null);

  const handleVolumeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startRotationRef.current = volumeRotation;
  };

  const handleVolumeMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;

    // Combined vertical and horizontal drag
    // Vertical movement (primary) and horizontal movement (secondary)
    const deltaY = startPosRef.current.y - e.clientY;
    const deltaX = e.clientX - startPosRef.current.x;

    // Use the larger delta for more responsive control
    const combinedDelta = deltaY + deltaX * 0.5;

    const newRotation = startRotationRef.current + combinedDelta * 0.8;

    // Constrain rotation from -150° (7 o'clock) to 150° (5 o'clock)
    const constrainedDegrees = Math.max(-150, Math.min(150, newRotation));
    setVolumeRotation(constrainedDegrees);
  };

  const handleVolumeMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleVolumeWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.2; // Sensitivity factor
    const newRotation = volumeRotation + delta;
    const constrainedDegrees = Math.max(-150, Math.min(150, newRotation));
    setVolumeRotation(constrainedDegrees);
  };

  React.useEffect(() => {
    const moveHandler = (e: MouseEvent) => handleVolumeMouseMove(e);
    const upHandler = () => handleVolumeMouseUp();

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };
  }, []);

  return (
    <StyledPlayerPrototype>
      <StyledWoodPanel>
        <StyledHeader></StyledHeader>
        <StyledSlats></StyledSlats>
        <StyledMainPanel></StyledMainPanel>
      </StyledWoodPanel>
      <StyledControls>
        <StyledVolumeDialWrapper>
          {/* Tick marks from -150° to 150° (7 o'clock to 5 o'clock) */}
          {Array.from({ length: 13 }).map((_, i) => {
            const angle = -150 + i * 25;
            return <StyledDialTick key={i} $angle={angle} />;
          })}
          <StyledVolumeDialShadow />
          <StyledVolumeDial
            ref={volumeDialRef}
            $rotation={volumeRotation}
            onMouseDown={handleVolumeMouseDown}
            onWheel={handleVolumeWheel}
          >
            <StyledDialMarker />
          </StyledVolumeDial>
        </StyledVolumeDialWrapper>
        <StyledModeDial></StyledModeDial>

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
