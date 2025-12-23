import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useRef, useState } from "react";

import {
  StyledButton,
  StyledButtonIcon,
  StyledButtonLabel,
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
  StyledVolumeDial,
  StyledVolumeDialShadow,
  StyledVolumeDialWrapper,
} from "./styles";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

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

  const MOMENTARY_LED_DURATION = 300;

  // Button handlers
  const handlePrevClick = () => {
    setPrevPressed(true);
    setTimeout(() => setPrevPressed(false), MOMENTARY_LED_DURATION);
    actions.previous();
  };

  const handleNextClick = () => {
    setNextPressed(true);
    setTimeout(() => setNextPressed(false), MOMENTARY_LED_DURATION);
    actions.next();
  };

  const handleShuffleClick = () => {
    // TODO: Implement shuffle
  };

  const handleRandomClick = () => {
    actions.playRandomFromCurrentList();
  };

  const handleShareClick = () => {
    // TODO: Implement share functionality
  };

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

  const handleVolumeTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingVolumeRef.current = true;
    lastYRef.current = e.touches[0].clientY;
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

  const handleVolumeTouchMove = (e: TouchEvent) => {
    if (!isDraggingVolumeRef.current) return;

    const deltaY = lastYRef.current - e.touches[0].clientY;
    lastYRef.current = e.touches[0].clientY;

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

  const handleVolumeTouchEnd = () => {
    isDraggingVolumeRef.current = false;
  };

  // Mode dial handlers
  const handleModeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingModeRef.current = true;
    lastYRef.current = e.clientY;
  };

  const handleModeTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingModeRef.current = true;
    lastYRef.current = e.touches[0].clientY;
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

  const handleModeTouchMove = (e: TouchEvent) => {
    if (!isDraggingModeRef.current) return;

    const deltaY = lastYRef.current - e.touches[0].clientY;

    if (Math.abs(deltaY) >= 30) {
      const direction = deltaY > 0 ? 1 : -1;
      const newStep = Math.max(0, Math.min(5, modeStep + direction));
      isUserChangingDialRef.current = true;
      setModeStep(newStep);
      lastYRef.current = e.touches[0].clientY;
    }
  };

  const handleModeMouseUp = () => {
    isDraggingModeRef.current = false;
  };

  const handleModeTouchEnd = () => {
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

  // Mouse and touch move listeners
  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      handleVolumeMouseMove(e);
      handleModeMouseMove(e);
    };
    const upHandler = () => {
      handleVolumeMouseUp();
      handleModeMouseUp();
    };
    const touchMoveHandler = (e: TouchEvent) => {
      handleVolumeTouchMove(e);
      handleModeTouchMove(e);
    };
    const touchEndHandler = () => {
      handleVolumeTouchEnd();
      handleModeTouchEnd();
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
    document.addEventListener("touchmove", touchMoveHandler, {
      passive: false,
    });
    document.addEventListener("touchend", touchEndHandler);

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
      document.removeEventListener("touchmove", touchMoveHandler);
      document.removeEventListener("touchend", touchEndHandler);
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
              onTouchStart={handleVolumeTouchStart}
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
              onTouchStart={handleModeTouchStart}
              onWheel={handleModeWheel}
            />
          </StyledModeDialWrapper>
          <StyledDialLabelText>Category</StyledDialLabelText>
        </StyledDialContainer>

        <StyledButtonsContainer>
          <StyledButton
            $iconOnly
            onClick={handlePrevClick}
            disabled={state.keys.length <= 1}
          >
            <StyledButtonIcon $active={prevPressed} $momentary>
              <SkipPreviousIcon />
            </StyledButtonIcon>
          </StyledButton>

          <StyledButton
            $iconOnly
            onClick={actions.toggle}
            disabled={state.isLoading}
          >
            <StyledButtonIcon $active={state.isPlaying} $isPlaying>
              <PlayArrowIcon />
            </StyledButtonIcon>
            <StyledButtonIcon $active={!state.isPlaying} $isPaused>
              <PauseIcon />
            </StyledButtonIcon>
          </StyledButton>

          <StyledButton
            $iconOnly
            onClick={handleNextClick}
            disabled={state.keys.length <= 1}
          >
            <StyledButtonIcon $active={nextPressed} $momentary>
              <SkipNextIcon />
            </StyledButtonIcon>
          </StyledButton>

          <StyledButton onClick={handleShuffleClick}>
            <StyledButtonLabel>Shuffle</StyledButtonLabel>
          </StyledButton>

          <StyledButton onClick={handleRandomClick}>
            <StyledButtonLabel>Random</StyledButtonLabel>
          </StyledButton>

          <StyledButton onClick={handleShareClick}>
            <StyledButtonLabel>Share</StyledButtonLabel>
          </StyledButton>
        </StyledButtonsContainer>
      </StyledControls>
    </StyledControlsPanel>
  );
};

export default CompactControls;
