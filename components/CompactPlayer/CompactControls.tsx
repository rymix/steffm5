import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useRef, useState } from "react";

import {
  StyledButton,
  StyledButtonIcon,
  StyledButtonsContainer,
  StyledControls,
  StyledControlsPanel,
  StyledDialContainer,
  StyledDialLabel,
  StyledDialLabelText,
  StyledDialTick,
  StyledModeDial,
  StyledModeDialShadow,
  StyledModeDialWrapper,
  StyledPlayPauseButton,
  StyledVolumeDial,
  StyledVolumeDialShadow,
  StyledVolumeDialWrapper,
} from "./styles";

const CompactControls: React.FC = () => {
  const { state, actions } = useMixcloud();

  const volumeMaxAngle = 150;
  const modeMaxAngle = 115;

  // Dial refs
  const isDraggingVolumeRef = useRef(false);
  const isDraggingModeRef = useRef(false);
  const lastYRef = useRef(0);
  const currentRotationRef = useRef(-volumeMaxAngle);
  const volumeDialRef = useRef<HTMLDivElement>(null);
  const modeDialRef = useRef<HTMLDivElement>(null);

  const volumeRotation = (state.volume * 2 - 1) * volumeMaxAngle;

  const [modeStep, setModeStep] = useState<number>(0);
  const modeLabels = ["All", "Adv", "Shoes", "Cock", "Spec", "Fav"];
  const categoryValues = ["", "aidm", "mpos", "cocksoup", "special", "fav"];
  const modeTotalRange = modeMaxAngle * 2;
  const modeStepAngle = modeTotalRange / 5;

  const isUserChangingDialRef = useRef(false);

  // Button press states
  const [prevPressed, setPrevPressed] = useState(false);
  const [nextPressed, setNextPressed] = useState(false);

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
    <StyledControlsPanel>
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

        <StyledButtonsContainer>
          <StyledButton
            $pressed={prevPressed}
            onMouseDown={() => setPrevPressed(true)}
            onMouseUp={() => setPrevPressed(false)}
            onMouseLeave={() => setPrevPressed(false)}
            onClick={actions.previous}
            disabled={state.keys.length <= 1}
          >
            <StyledButtonIcon $active={prevPressed}>⏮</StyledButtonIcon>
          </StyledButton>

          <StyledPlayPauseButton
            onClick={actions.toggle}
            disabled={state.isLoading}
          >
            <StyledButtonIcon $active={!state.isPlaying}>▶</StyledButtonIcon>
            <StyledButtonIcon $active={state.isPlaying}>⏸</StyledButtonIcon>
          </StyledPlayPauseButton>

          <StyledButton
            $pressed={nextPressed}
            onMouseDown={() => setNextPressed(true)}
            onMouseUp={() => setNextPressed(false)}
            onMouseLeave={() => setNextPressed(false)}
            onClick={actions.next}
            disabled={state.keys.length <= 1}
          >
            <StyledButtonIcon $active={nextPressed}>⏭</StyledButtonIcon>
          </StyledButton>
        </StyledButtonsContainer>
      </StyledControls>
    </StyledControlsPanel>
  );
};

export default CompactControls;
