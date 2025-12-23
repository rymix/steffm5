import { useCallback, useEffect, useRef, useState } from "react";

// Global z-index manager
let globalZIndex = 1000;
const getNextZIndex = () => ++globalZIndex;

export interface UseDraggableWindowOptions {
  /**
   * Base width of the window (at scale 1.0)
   */
  width: number;

  /**
   * Base height of the window (at scale 1.0)
   */
  height: number;

  /**
   * Initial scale factor (default: 1.0)
   */
  initialScale?: number;

  /**
   * Minimum scale factor (default: 0.5)
   */
  minScale?: number;

  /**
   * Maximum scale factor (default: 2.0)
   */
  maxScale?: number;

  /**
   * Resize sensitivity factor (default: 300)
   * Lower = more sensitive
   */
  resizeSensitivity?: number;

  /**
   * Whether to auto-center on mount (default: true)
   */
  autoCenter?: boolean;

  /**
   * Initial position (if autoCenter is false)
   */
  initialPosition?: { x: number; y: number };

  /**
   * Data attribute selector for draggable elements (default: '[data-draggable="true"]')
   */
  draggableSelector?: string;

  /**
   * Whether the window can be closed (default: false)
   */
  closeable?: boolean;

  /**
   * Callback when window is reset
   */
  onReset?: () => void;

  /**
   * Callback when window is closed
   */
  onClose?: () => void;
}

export interface UseDraggableWindowReturn {
  // Refs
  windowRef: React.RefObject<HTMLDivElement>;

  // State
  scale: number;
  isDragging: boolean;
  isResizing: boolean;
  position: { x: number; y: number };
  zIndex: number;
  isVisible: boolean;

  // Handlers for the window element
  handleMouseDown: (_e: React.MouseEvent) => void;
  handleTouchStart: (_e: React.TouchEvent) => void;

  // Handlers for the resize handle
  handleResizeMouseDown: (_e: React.MouseEvent) => void;
  handleResizeTouchStart: (_e: React.TouchEvent) => void;

  // Utility functions
  centerWindow: () => void;
  resetWindow: () => void;
  closeWindow: () => void;
  bringToFront: () => void;
}

export const useDraggableWindow = (
  options: UseDraggableWindowOptions,
): UseDraggableWindowReturn => {
  const {
    width,
    height,
    initialScale = 1.0,
    minScale = 0.5,
    maxScale = 2.0,
    resizeSensitivity = 300,
    autoCenter = true,
    initialPosition,
    draggableSelector = '[data-draggable="true"]',
    closeable = false,
    onReset,
    onClose,
  } = options;

  // Refs
  const windowRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const hasUserInteractedRef = useRef(false);

  // State
  const [scale, setScale] = useState(initialScale);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(getNextZIndex());
  const [isVisible, setIsVisible] = useState(true);
  const resizeStartRef = useRef({ x: 0, y: 0, scale: initialScale });

  // Center the window
  const centerWindow = useCallback(() => {
    const windowWidth = width * scale;
    const windowHeight = height * scale;

    positionRef.current = {
      x: (window.innerWidth - windowWidth) / 2,
      y: (window.innerHeight - windowHeight) / 2,
    };

    if (windowRef.current) {
      windowRef.current.style.transform = `scale(${scale})`;
      windowRef.current.style.transformOrigin = "0 0";
      windowRef.current.style.translate = `${positionRef.current.x}px ${positionRef.current.y}px`;
    }
  }, [width, height, scale]);

  // Reset window to initial state
  const resetWindow = useCallback(() => {
    hasUserInteractedRef.current = false;

    const resetScale = initialScale;
    const windowWidth = width * resetScale;
    const windowHeight = height * resetScale;

    positionRef.current = {
      x: (window.innerWidth - windowWidth) / 2,
      y: (window.innerHeight - windowHeight) / 2,
    };

    setScale(resetScale);

    if (windowRef.current) {
      windowRef.current.style.transform = `scale(${resetScale})`;
      windowRef.current.style.transformOrigin = "0 0";
      windowRef.current.style.translate = `${positionRef.current.x}px ${positionRef.current.y}px`;
    }

    onReset?.();
  }, [width, height, initialScale, onReset]);

  // Close window
  const closeWindow = useCallback(() => {
    if (!closeable) return;
    setIsVisible(false);
    onClose?.();
  }, [closeable, onClose]);

  // Bring window to front
  const bringToFront = useCallback(() => {
    setZIndex(getNextZIndex());
  }, []);

  // Drag handlers
  const handleMouseDown = (_e: React.MouseEvent) => {
    // Always bring to front on any click
    bringToFront();

    const target = _e.target as HTMLElement;
    const isDraggableArea = target.closest(draggableSelector);
    if (!isDraggableArea) return;

    _e.preventDefault();
    hasUserInteractedRef.current = true;
    setIsDragging(true);
    setDragStart({ x: _e.clientX, y: _e.clientY });
    setElementStart({ x: positionRef.current.x, y: positionRef.current.y });
  };

  const handleTouchStart = (_e: React.TouchEvent) => {
    // Always bring to front on any touch
    bringToFront();

    const target = _e.target as HTMLElement;
    const isDraggableArea = target.closest(draggableSelector);
    if (!isDraggableArea) return;

    if (_e.touches.length === 1) {
      const touch = _e.touches[0];
      hasUserInteractedRef.current = true;
      setIsDragging(true);
      setDragStart({ x: touch.clientX, y: touch.clientY });
      setElementStart({ x: positionRef.current.x, y: positionRef.current.y });
    }
  };

  // Resize handlers
  const handleResizeMouseDown = (_e: React.MouseEvent) => {
    _e.preventDefault();
    _e.stopPropagation();
    bringToFront(); // Bring to front on interaction
    hasUserInteractedRef.current = true;
    setIsResizing(true);
    resizeStartRef.current = {
      x: _e.clientX,
      y: _e.clientY,
      scale: scale,
    };
  };

  const handleResizeTouchStart = (_e: React.TouchEvent) => {
    if (_e.touches.length === 1) {
      _e.stopPropagation();
      const touch = _e.touches[0];
      bringToFront(); // Bring to front on interaction
      hasUserInteractedRef.current = true;
      setIsResizing(true);
      resizeStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        scale: scale,
      };
    }
  };

  // Initialize position on mount
  useEffect(() => {
    if (autoCenter) {
      centerWindow();
    } else if (initialPosition) {
      positionRef.current = initialPosition;
      if (windowRef.current) {
        windowRef.current.style.transform = `scale(${initialScale})`;
        windowRef.current.style.transformOrigin = "0 0";
        windowRef.current.style.translate = `${initialPosition.x}px ${initialPosition.y}px`;
      }
    }
  }, []);

  // Handle drag movement
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!windowRef.current) return;

      // Get the actual dimensions of the scaled window
      const rect = windowRef.current.getBoundingClientRect();
      const windowWidth = rect.width;
      const windowHeight = rect.height;

      // Calculate how much we want to move based on mouse delta
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      // Calculate desired new position (top-left corner)
      let newX = elementStart.x + deltaX;
      let newY = elementStart.y + deltaY;

      // Constrain top-left corner (must not go negative)
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;

      // Constrain bottom-right corner (top-left + dimensions must not exceed viewport)
      if (newX + windowWidth > window.innerWidth) {
        newX = window.innerWidth - windowWidth;
      }
      if (newY + windowHeight > window.innerHeight) {
        newY = window.innerHeight - windowHeight;
      }

      positionRef.current = { x: newX, y: newY };
      windowRef.current.style.transform = `scale(${scale})`;
      windowRef.current.style.transformOrigin = "0 0";
      windowRef.current.style.translate = `${newX}px ${newY}px`;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        if (!windowRef.current) return;

        const touch = e.touches[0];

        // Get the actual dimensions of the scaled window
        const rect = windowRef.current.getBoundingClientRect();
        const windowWidth = rect.width;
        const windowHeight = rect.height;

        // Calculate how much we want to move based on touch delta
        const deltaX = touch.clientX - dragStart.x;
        const deltaY = touch.clientY - dragStart.y;

        // Calculate desired new position (top-left corner)
        let newX = elementStart.x + deltaX;
        let newY = elementStart.y + deltaY;

        // Constrain top-left corner (must not go negative)
        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;

        // Constrain bottom-right corner (top-left + dimensions must not exceed viewport)
        if (newX + windowWidth > window.innerWidth) {
          newX = window.innerWidth - windowWidth;
        }
        if (newY + windowHeight > window.innerHeight) {
          newY = window.innerHeight - windowHeight;
        }

        positionRef.current = { x: newX, y: newY };
        windowRef.current.style.transform = `scale(${scale})`;
        windowRef.current.style.transformOrigin = "0 0";
        windowRef.current.style.translate = `${newX}px ${newY}px`;
      }
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

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
  }, [isDragging, dragStart, elementStart, scale, width, height]);

  // Handle resize movement
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartRef.current.x;
      const deltaY = e.clientY - resizeStartRef.current.y;

      // Average horizontal and vertical drag for diagonal scaling
      const delta = (deltaX + deltaY) / 2;
      const scaleDelta = delta / resizeSensitivity;

      const newScale = Math.max(
        minScale,
        Math.min(maxScale, resizeStartRef.current.scale + scaleDelta),
      );

      setScale(newScale);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - resizeStartRef.current.x;
        const deltaY = touch.clientY - resizeStartRef.current.y;

        const delta = (deltaX + deltaY) / 2;
        const scaleDelta = delta / resizeSensitivity;

        const newScale = Math.max(
          minScale,
          Math.min(maxScale, resizeStartRef.current.scale + scaleDelta),
        );

        setScale(newScale);
      }
    };

    const handleMouseUp = () => setIsResizing(false);
    const handleTouchEnd = () => setIsResizing(false);

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
  }, [isResizing, minScale, maxScale, resizeSensitivity]);

  // Update window dimensions when scale changes
  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.style.transform = `scale(${scale})`;
      windowRef.current.style.transformOrigin = "0 0";
      windowRef.current.style.translate = `${positionRef.current.x}px ${positionRef.current.y}px`;
    }
  }, [scale]);

  // Handle window resize - keep windows fully within viewport
  useEffect(() => {
    const handleResize = () => {
      if (!hasUserInteractedRef.current && autoCenter) {
        // Auto-center if user hasn't interacted
        centerWindow();
      } else {
        // Constrain window to stay fully within viewport
        const windowWidth = width * scale;
        const windowHeight = height * scale;

        const constrainedX = Math.max(
          0,
          Math.min(window.innerWidth - windowWidth, positionRef.current.x),
        );
        const constrainedY = Math.max(
          0,
          Math.min(window.innerHeight - windowHeight, positionRef.current.y),
        );

        if (
          constrainedX !== positionRef.current.x ||
          constrainedY !== positionRef.current.y
        ) {
          positionRef.current = { x: constrainedX, y: constrainedY };
          if (windowRef.current) {
            windowRef.current.style.transform = `scale(${scale})`;
            windowRef.current.style.transformOrigin = "0 0";
            windowRef.current.style.translate = `${constrainedX}px ${constrainedY}px`;
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [centerWindow, autoCenter, scale, width, height]);

  return {
    windowRef,
    scale,
    isDragging,
    isResizing,
    position: positionRef.current,
    zIndex,
    isVisible,
    handleMouseDown,
    handleTouchStart,
    handleResizeMouseDown,
    handleResizeTouchStart,
    centerWindow,
    resetWindow,
    closeWindow,
    bringToFront,
  };
};
