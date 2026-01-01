import { useEffect, useRef, useState } from "react";

export interface UseDragGestureOptions {
  /**
   * Minimum drag distance in pixels to trigger gesture (default: 50)
   */
  threshold?: number;

  /**
   * Callback when user drags left
   */
  onDragLeft?: () => void;

  /**
   * Callback when user drags right
   */
  onDragRight?: () => void;

  /**
   * Whether to prevent click events after a drag (default: true)
   */
  preventClick?: boolean;
}

export interface UseDragGestureReturn {
  /**
   * Whether a drag is currently in progress
   */
  isDragging: boolean;

  /**
   * Mouse down handler to attach to draggable element
   */
  handleMouseDown: (_e: React.MouseEvent) => void;

  /**
   * Touch start handler to attach to draggable element
   */
  handleTouchStart: (_e: React.TouchEvent) => void;

  /**
   * Click handler to attach to draggable element (prevents clicks after drags)
   */
  handleClick: () => void;
}

/**
 * Hook for handling horizontal drag gestures with mouse and touch support
 *
 * @example
 * const { isDragging, handleMouseDown, handleTouchStart, handleClick } = useDragGesture({
 *   threshold: 50,
 *   onDragLeft: () => console.log('Dragged left'),
 *   onDragRight: () => console.log('Dragged right'),
 * });
 *
 * return (
 *   <button
 *     onClick={handleClick}
 *     onMouseDown={handleMouseDown}
 *     onTouchStart={handleTouchStart}
 *   >
 *     Drag me
 *   </button>
 * );
 */
export function useDragGesture(
  options: UseDragGestureOptions = {},
): UseDragGestureReturn {
  const {
    threshold = 50,
    onDragLeft,
    onDragRight,
    preventClick = true,
  } = options;

  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const didDragRef = useRef(false);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStartXRef.current = clientX;
    didDragRef.current = false;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;

    const dragDistance = clientX - dragStartXRef.current;

    if (dragDistance > threshold && onDragRight) {
      // Dragging right
      didDragRef.current = true;
      onDragRight();
      setIsDragging(false);
    } else if (dragDistance < -threshold && onDragLeft) {
      // Dragging left
      didDragRef.current = true;
      onDragLeft();
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Reset didDrag after a short delay to allow click handler to check it
    if (preventClick) {
      setTimeout(() => {
        didDragRef.current = false;
      }, 100);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX);
    }
  };

  const handleClick = () => {
    // Only allow click if we didn't drag (or preventClick is disabled)
    if (!preventClick || !didDragRef.current) {
      // Click is handled by the component's onClick
      return;
    }
  };

  // Mouse and touch event listeners
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleDragMove(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    const handleTouchEnd = () => {
      handleDragEnd();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, threshold, onDragLeft, onDragRight]);

  return {
    isDragging,
    handleMouseDown,
    handleTouchStart,
    handleClick,
  };
}
