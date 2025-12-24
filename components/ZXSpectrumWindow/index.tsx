import React, { useCallback, useEffect, useRef } from "react";

import { useDraggableWindow } from "../../hooks/useDraggableWindow";
import {
  StyledContent,
  StyledHeader,
  StyledResetButton,
  StyledResizeHandle,
  StyledZXSpectrumWindow,
} from "./styles";

declare global {
  interface Window {
    JSSpeccy: (
      _element: HTMLElement,
      _options?: {
        machine?: 48 | 128 | 5;
        zoom?: number;
        openUrl?: string | string[];
        autoStart?: boolean;
        autoLoadTapes?: boolean;
        tapeAutoLoadMode?: string;
        sandbox?: boolean;
        keyboardEnabled?: boolean;
        uiEnabled?: boolean;
      },
    ) => {
      onReady: (_callback: () => void) => void;
      openUrl: (_url: string) => void;
    };
  }
}

const ZXSpectrumWindow: React.FC = () => {
  const {
    windowRef,
    isDragging,
    isResizing,
    zIndex,
    isVisible,
    handleMouseDown,
    handleTouchStart,
    handleResizeMouseDown,
    handleResizeTouchStart,
    resetWindow,
    closeWindow,
  } = useDraggableWindow({
    width: 640,
    height: 530,
    initialScale: 1.0,
    minScale: 0.5,
    maxScale: 2.0,
    autoCenter: false,
    defaultPosition: {
      x: typeof window !== "undefined" ? window.innerWidth - 660 : 0,
      y: typeof window !== "undefined" ? 50 : 0,
    },
    closeable: true,
    initiallyOpen: false,
    windowLabel: "Chuckie Egg",
    windowIcon: "/icons/chuckieegg.png",
  });

  const emulatorContainerRef = useRef<HTMLDivElement>(null);
  const jsSpeccyInstanceRef = useRef<ReturnType<typeof window.JSSpeccy> | null>(
    null,
  );
  const scriptLoadedRef = useRef(false);
  const audioContextsRef = useRef<AudioContext[]>([]);

  // Cleanup function to stop all audio and clear emulator
  const cleanupEmulator = useCallback(() => {
    // Close all tracked Audio Contexts
    audioContextsRef.current.forEach((ctx) => {
      if (ctx.state !== "closed") {
        ctx.close().catch(() => {
          // Ignore errors if already closed
        });
      }
    });
    audioContextsRef.current = [];

    if (emulatorContainerRef.current) {
      // Stop all audio elements
      const audioElements =
        emulatorContainerRef.current.querySelectorAll("audio");
      audioElements.forEach((audio) => {
        audio.pause();
        audio.src = "";
        audio.load(); // Reset the audio element
      });

      // Clear the container completely to destroy all DOM elements
      emulatorContainerRef.current.innerHTML = "";
    }
    jsSpeccyInstanceRef.current = null;
  }, []);

  useEffect(() => {
    if (!isVisible) {
      // Clean up emulator when window becomes invisible
      cleanupEmulator();
      return;
    }

    const initializeEmulator = () => {
      if (
        !emulatorContainerRef.current ||
        !window.JSSpeccy ||
        jsSpeccyInstanceRef.current
      )
        return;

      // Clear any existing content
      emulatorContainerRef.current.innerHTML = "";

      // Intercept AudioContext creation to track it
      const OriginalAudioContext =
        window.AudioContext || (window as any).webkitAudioContext;
      if (OriginalAudioContext) {
        const TrackedAudioContext = function (
          this: AudioContext,
          ...args: any[]
        ) {
          const ctx = new OriginalAudioContext(...args);
          audioContextsRef.current.push(ctx);
          return ctx;
        } as any;
        TrackedAudioContext.prototype = OriginalAudioContext.prototype;
        const tempContext = window.AudioContext;
        window.AudioContext = TrackedAudioContext as typeof AudioContext;
        (window as any).webkitAudioContext = TrackedAudioContext;

        // Initialize JSSpeccy with 48K mode and auto-load the game
        jsSpeccyInstanceRef.current = window.JSSpeccy(
          emulatorContainerRef.current,
          {
            machine: 48,
            zoom: 2,
            openUrl: "/roms/zxspectrum/chuckieegg.tzx.zip",
            autoStart: true,
            autoLoadTapes: true,
            tapeAutoLoadMode: "usr0",
            keyboardEnabled: true,
            uiEnabled: false,
          },
        );

        // Restore original AudioContext
        window.AudioContext = tempContext;
        (window as any).webkitAudioContext = OriginalAudioContext;
      } else {
        // Fallback if AudioContext doesn't exist
        jsSpeccyInstanceRef.current = window.JSSpeccy(
          emulatorContainerRef.current,
          {
            machine: 48,
            zoom: 2,
            openUrl: "/roms/zxspectrum/chuckieegg.tzx.zip",
            autoStart: true,
            autoLoadTapes: true,
            tapeAutoLoadMode: "usr0",
            keyboardEnabled: true,
            uiEnabled: false,
          },
        );
      }
    };

    // Load JSSpeccy script if not already loaded
    if (!scriptLoadedRef.current) {
      const script = document.createElement("script");
      script.src = "/jsspeccy/jsspeccy.js";
      script.async = true;
      script.onload = () => {
        scriptLoadedRef.current = true;
        initializeEmulator();
      };
      document.head.appendChild(script);
    } else if (
      typeof window.JSSpeccy !== "undefined" &&
      emulatorContainerRef.current
    ) {
      initializeEmulator();
    }

    return () => {
      // Cleanup when component unmounts
      cleanupEmulator();
    };
  }, [isVisible, cleanupEmulator]);

  if (!isVisible) return null;

  return (
    <StyledZXSpectrumWindow
      ref={windowRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      $isDragging={isDragging}
      $isResizing={isResizing}
      style={{ zIndex }}
    >
      <StyledHeader data-draggable="true">
        <h2>ZX Spectrum 48K - Chuckie Egg</h2>
        <div>
          <StyledResetButton onClick={resetWindow}>Reset</StyledResetButton>
          <StyledResetButton
            onClick={closeWindow}
            style={{ marginLeft: "8px" }}
          >
            Close
          </StyledResetButton>
        </div>
      </StyledHeader>
      <StyledContent>
        <div ref={emulatorContainerRef} />
      </StyledContent>
      <StyledResizeHandle
        onMouseDown={handleResizeMouseDown}
        onTouchStart={handleResizeTouchStart}
      />
    </StyledZXSpectrumWindow>
  );
};

export default ZXSpectrumWindow;
