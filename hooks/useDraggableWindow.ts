import { useCallback, useEffect, useRef, useState } from "react";

import { useWindowManager } from "../contexts/windowManager";

// Global z-index manager
let globalZIndex = 1000;
const getNextZIndex = () => ++globalZIndex;

// Special function to ensure a window starts on top of all others
const getTopZIndex = () => {
  globalZIndex += 100; // Jump ahead to ensure it's on top
  return globalZIndex;
};

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
   * Default position for the window (used for initial position and reset)
   * If not provided and autoCenter is false, window starts at (0, 0)
   */
  defaultPosition?: { x: number; y: number };

  /**
   * Data attribute selector for draggable elements (default: '[data-draggable="true"]')
   */
  draggableSelector?: string;

  /**
   * Whether the window can be closed (default: false)
   */
  closeable?: boolean;

  /**
   * Whether the window starts open (default: true)
   */
  initiallyOpen?: boolean;

  /**
   * Whether the window should start on top of all others (default: false)
   */
  startOnTop?: boolean;

  /**
   * Window label for launcher icon
   */
  windowLabel?: string;

  /**
   * Window icon (emoji or short string) for launcher
   */
  windowIcon?: string;

  /**
   * Callback when window is reset
   */
  onReset?: () => void;

  /**
   * Callback when window is closed
   */
  onClose?: () => void;

  /**
   * Callback when window is opened
   */
  onOpen?: () => void;

  /**
   * Resize mode: "scale" uses CSS transform (better for canvas/DOM),
   * "dimensions" changes actual width/height (better for iframes)
   * (default: "scale")
   */
  resizeMode?: "scale" | "dimensions";
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
  windowId: string;

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
  openWindow: () => void;
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
    defaultPosition,
    draggableSelector = '[data-draggable="true"]',
    closeable = false,
    initiallyOpen = true,
    startOnTop = false,
    windowLabel,
    windowIcon,
    onReset,
    onClose,
    onOpen,
    resizeMode = "scale",
  } = options;

  // Window manager (optional - only if provider exists)
  let windowManager: ReturnType<typeof useWindowManager> | undefined;
  try {
    windowManager = useWindowManager();
  } catch {
    // No window manager provider - that's OK
    windowManager = undefined;
  }

  // Refs
  const windowRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const hasUserInteractedRef = useRef(false);
  const windowId = useRef(
    `window-${Math.random().toString(36).substr(2, 9)}`,
  ).current;

  // State
  const [scale, setScale] = useState(initialScale);
  const [dimensions, setDimensions] = useState({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(
    startOnTop ? getTopZIndex() : getNextZIndex(),
  );
  const [isVisible, setIsVisible] = useState(initiallyOpen);
  const resizeStartRef = useRef({
    x: 0,
    y: 0,
    scale: initialScale,
    width,
    height,
  });

  // Center the window
  const centerWindow = useCallback(() => {
    const windowWidth =
      resizeMode === "scale" ? width * scale : dimensions.width;
    const windowHeight =
      resizeMode === "scale" ? height * scale : dimensions.height;

    positionRef.current = {
      x: (window.innerWidth - windowWidth) / 2,
      y: (window.innerHeight - windowHeight) / 2,
    };

    if (windowRef.current) {
      if (resizeMode === "scale") {
        windowRef.current.style.transform = `scale(${scale})`;
        windowRef.current.style.transformOrigin = "0 0";
      } else {
        windowRef.current.style.width = `${dimensions.width}px`;
        windowRef.current.style.height = `${dimensions.height}px`;
      }
      windowRef.current.style.translate = `${positionRef.current.x}px ${positionRef.current.y}px`;
    }
  }, [width, height, scale, dimensions, resizeMode]);

  // Reset window to initial state
  const resetWindow = useCallback(() => {
    hasUserInteractedRef.current = false;

    const resetScale = initialScale;
    const resetDimensions = { width, height };
    const windowWidth = resizeMode === "scale" ? width * resetScale : width;
    const windowHeight = resizeMode === "scale" ? height * resetScale : height;

    // Use defaultPosition if provided, otherwise center
    if (defaultPosition) {
      positionRef.current = { ...defaultPosition };
    } else {
      positionRef.current = {
        x: (window.innerWidth - windowWidth) / 2,
        y: (window.innerHeight - windowHeight) / 2,
      };
    }

    setScale(resetScale);
    setDimensions(resetDimensions);

    if (windowRef.current) {
      if (resizeMode === "scale") {
        windowRef.current.style.transform = `scale(${resetScale})`;
        windowRef.current.style.transformOrigin = "0 0";
      } else {
        windowRef.current.style.width = `${width}px`;
        windowRef.current.style.height = `${height}px`;
      }
      windowRef.current.style.translate = `${positionRef.current.x}px ${positionRef.current.y}px`;
    }

    onReset?.();
  }, [width, height, initialScale, defaultPosition, onReset, resizeMode]);

  // Bring window to front
  const bringToFront = useCallback(() => {
    setZIndex(getNextZIndex());
  }, []);

  // Close window
  const closeWindow = useCallback(() => {
    if (!closeable) return;
    setIsVisible(false);
    windowManager?.updateWindow(windowId, { isVisible: false });
    onClose?.();
  }, [closeable, onClose, windowManager, windowId]);

  // Open window
  const openWindow = useCallback(() => {
    // Reset window to initial state when reopening
    hasUserInteractedRef.current = false;

    const resetScale = initialScale;
    const resetDimensions = { width, height };
    const windowWidth = resizeMode === "scale" ? width * resetScale : width;
    const windowHeight = resizeMode === "scale" ? height * resetScale : height;

    // Use defaultPosition if provided, otherwise center
    if (defaultPosition) {
      positionRef.current = { ...defaultPosition };
    } else {
      positionRef.current = {
        x: (window.innerWidth - windowWidth) / 2,
        y: (window.innerHeight - windowHeight) / 2,
      };
    }

    setScale(resetScale);
    setDimensions(resetDimensions);
    setIsVisible(true);
    bringToFront();

    // Apply the reset position to the element
    if (windowRef.current) {
      if (resizeMode === "scale") {
        windowRef.current.style.transform = `scale(${resetScale})`;
        windowRef.current.style.transformOrigin = "0 0";
      } else {
        windowRef.current.style.width = `${width}px`;
        windowRef.current.style.height = `${height}px`;
      }
      windowRef.current.style.translate = `${positionRef.current.x}px ${positionRef.current.y}px`;
    }

    windowManager?.updateWindow(windowId, { isVisible: true });
    onOpen?.();
  }, [
    bringToFront,
    onOpen,
    windowManager,
    windowId,
    initialScale,
    width,
    height,
    defaultPosition,
    resizeMode,
  ]);

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
      width: dimensions.width,
      height: dimensions.height,
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
        width: dimensions.width,
        height: dimensions.height,
      };
    }
  };

  // Register with window manager
  useEffect(() => {
    if (windowManager && closeable && windowLabel) {
      windowManager.registerWindow({
        id: windowId,
        label: windowLabel,
        icon: windowIcon,
        isVisible: initiallyOpen,
        openWindow,
      });

      return () => {
        windowManager.unregisterWindow(windowId);
      };
    }
  }, [
    windowManager,
    closeable,
    windowLabel,
    windowIcon,
    windowId,
    initiallyOpen,
    openWindow,
  ]);

  // Initialize position on mount
  useEffect(() => {
    if (autoCenter) {
      centerWindow();
    } else if (defaultPosition) {
      positionRef.current = { ...defaultPosition };
      if (windowRef.current) {
        if (resizeMode === "scale") {
          windowRef.current.style.transform = `scale(${initialScale})`;
          windowRef.current.style.transformOrigin = "0 0";
        } else {
          windowRef.current.style.width = `${width}px`;
          windowRef.current.style.height = `${height}px`;
        }
        windowRef.current.style.translate = `${defaultPosition.x}px ${defaultPosition.y}px`;
      }
    }
  }, []);

  // Apply position when window becomes visible (for reopening)
  useEffect(() => {
    if (isVisible && windowRef.current) {
      if (resizeMode === "scale") {
        windowRef.current.style.transform = `scale(${scale})`;
        windowRef.current.style.transformOrigin = "0 0";
      } else {
        windowRef.current.style.width = `${dimensions.width}px`;
        windowRef.current.style.height = `${dimensions.height}px`;
      }
      windowRef.current.style.translate = `${positionRef.current.x}px ${positionRef.current.y}px`;
    }
  }, [isVisible, scale, dimensions, resizeMode]);

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
      if (resizeMode === "scale") {
        windowRef.current.style.transform = `scale(${scale})`;
        windowRef.current.style.transformOrigin = "0 0";
      }
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
        if (resizeMode === "scale") {
          windowRef.current.style.transform = `scale(${scale})`;
          windowRef.current.style.transformOrigin = "0 0";
        }
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
  }, [isDragging, dragStart, elementStart, scale, width, height, resizeMode]);

  // Handle resize movement
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartRef.current.x;
      const deltaY = e.clientY - resizeStartRef.current.y;

      if (resizeMode === "scale") {
        // Calculate desired dimensions based on mouse position
        const desiredWidth = Math.max(
          width * minScale,
          Math.min(width * maxScale, resizeStartRef.current.width + deltaX),
        );
        const desiredHeight = Math.max(
          height * minScale,
          Math.min(height * maxScale, resizeStartRef.current.height + deltaY),
        );

        // Calculate scale from average of width and height ratios
        const scaleX = desiredWidth / width;
        const scaleY = desiredHeight / height;
        const newScale = (scaleX + scaleY) / 2;

        // Clamp to min/max
        const clampedScale = Math.max(minScale, Math.min(maxScale, newScale));

        setScale(clampedScale);

        // Update the element immediately
        if (windowRef.current) {
          windowRef.current.style.transform = `scale(${clampedScale})`;
          windowRef.current.style.transformOrigin = "0 0";
        }
      } else {
        // Dimensions mode: directly change width and height
        const newWidth = Math.max(
          width * minScale,
          Math.min(width * maxScale, resizeStartRef.current.width + deltaX),
        );
        const newHeight = Math.max(
          height * minScale,
          Math.min(height * maxScale, resizeStartRef.current.height + deltaY),
        );

        setDimensions({ width: newWidth, height: newHeight });

        // Update the element immediately
        if (windowRef.current) {
          windowRef.current.style.width = `${newWidth}px`;
          windowRef.current.style.height = `${newHeight}px`;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - resizeStartRef.current.x;
        const deltaY = touch.clientY - resizeStartRef.current.y;

        if (resizeMode === "scale") {
          // Calculate desired dimensions based on touch position
          const desiredWidth = Math.max(
            width * minScale,
            Math.min(width * maxScale, resizeStartRef.current.width + deltaX),
          );
          const desiredHeight = Math.max(
            height * minScale,
            Math.min(height * maxScale, resizeStartRef.current.height + deltaY),
          );

          // Calculate scale from average of width and height ratios
          const scaleX = desiredWidth / width;
          const scaleY = desiredHeight / height;
          const newScale = (scaleX + scaleY) / 2;

          // Clamp to min/max
          const clampedScale = Math.max(minScale, Math.min(maxScale, newScale));

          setScale(clampedScale);

          // Update the element immediately
          if (windowRef.current) {
            windowRef.current.style.transform = `scale(${clampedScale})`;
            windowRef.current.style.transformOrigin = "0 0";
          }
        } else {
          // Dimensions mode: directly change width and height
          const newWidth = Math.max(
            width * minScale,
            Math.min(width * maxScale, resizeStartRef.current.width + deltaX),
          );
          const newHeight = Math.max(
            height * minScale,
            Math.min(height * maxScale, resizeStartRef.current.height + deltaY),
          );

          setDimensions({ width: newWidth, height: newHeight });

          // Update the element immediately
          if (windowRef.current) {
            windowRef.current.style.width = `${newWidth}px`;
            windowRef.current.style.height = `${newHeight}px`;
          }
        }
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
  }, [
    isResizing,
    minScale,
    maxScale,
    resizeSensitivity,
    resizeMode,
    width,
    height,
  ]);

  // Update window dimensions when scale or dimensions change
  useEffect(() => {
    if (windowRef.current) {
      if (resizeMode === "scale") {
        windowRef.current.style.transform = `scale(${scale})`;
        windowRef.current.style.transformOrigin = "0 0";
      } else {
        windowRef.current.style.width = `${dimensions.width}px`;
        windowRef.current.style.height = `${dimensions.height}px`;
      }
      windowRef.current.style.translate = `${positionRef.current.x}px ${positionRef.current.y}px`;
    }
  }, [scale, dimensions, resizeMode]);

  // Handle window resize - keep windows fully within viewport
  useEffect(() => {
    const handleResize = () => {
      if (!hasUserInteractedRef.current && autoCenter) {
        // Auto-center if user hasn't interacted
        centerWindow();
      } else {
        // Constrain window to stay fully within viewport
        const windowWidth =
          resizeMode === "scale" ? width * scale : dimensions.width;
        const windowHeight =
          resizeMode === "scale" ? height * scale : dimensions.height;

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
            if (resizeMode === "scale") {
              windowRef.current.style.transform = `scale(${scale})`;
              windowRef.current.style.transformOrigin = "0 0";
            } else {
              windowRef.current.style.width = `${dimensions.width}px`;
              windowRef.current.style.height = `${dimensions.height}px`;
            }
            windowRef.current.style.translate = `${constrainedX}px ${constrainedY}px`;
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [centerWindow, autoCenter, scale, width, height, dimensions, resizeMode]);

  return {
    windowRef,
    scale,
    isDragging,
    isResizing,
    position: positionRef.current,
    zIndex,
    isVisible,
    windowId,
    handleMouseDown,
    handleTouchStart,
    handleResizeMouseDown,
    handleResizeTouchStart,
    centerWindow,
    resetWindow,
    closeWindow,
    openWindow,
    bringToFront,
  };
};
