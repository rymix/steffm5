import React, { useCallback, useEffect, useRef } from "react";

import { useWindowManager } from "../../../contexts/windowManager";
import { useDraggableWindow } from "../../../hooks/useDraggableWindow";
import {
  StyledContent,
  StyledHeader,
  StyledHeaderControls,
  StyledMuteButton,
  StyledResetButton,
  StyledResizeHandle,
  StyledVolumeControl,
  StyledVolumeSlider,
  StyledZXSpectrumWindow,
} from "./styles";

import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

// Global registry to track AudioContexts and their gain nodes
const globalAudioContexts = new Map<AudioContext, GainNode>();

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

// Monkey-patch AudioContext to intercept audio and control volume
if (typeof window !== "undefined" && !(window as any)._audioContextPatched) {
  const OriginalAudioContext =
    window.AudioContext || (window as any).webkitAudioContext;
  if (OriginalAudioContext) {
    const PatchedAudioContext = function (this: any, ...args: any[]) {
      const ctx = new OriginalAudioContext(...args);

      // Create a gain node for this context
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.7; // Default volume
      gainNode.connect(ctx.destination);

      // Store the gain node
      globalAudioContexts.set(ctx, gainNode);

      // Store the real destination
      const realDestination = ctx.destination;

      // Monkey-patch the connect method on AudioNode prototype for this context
      const originalConnect = AudioNode.prototype.connect;
      const patchedConnect = function (this: AudioNode, ...connectArgs: any[]) {
        // If connecting to the destination, redirect to our gain node
        if (connectArgs[0] === realDestination) {
          return (originalConnect as any).call(
            this,
            gainNode,
            ...connectArgs.slice(1),
          );
        }
        // Otherwise, use original connect
        return originalConnect.apply(this, connectArgs as any);
      };

      // Replace connect method (we need to do this per context to capture the right destination)
      // Store original for cleanup
      if (!(window as any)._originalAudioNodeConnect) {
        (window as any)._originalAudioNodeConnect = originalConnect;
      }
      AudioNode.prototype.connect = patchedConnect as any;

      return ctx;
    };
    PatchedAudioContext.prototype = OriginalAudioContext.prototype;
    window.AudioContext = PatchedAudioContext as any;
    (window as any).webkitAudioContext = PatchedAudioContext;
    (window as any)._audioContextPatched = true;
  }
}

const ZXSpectrumWindow: React.FC = () => {
  const { setGameFocus } = useWindowManager();
  const [isMuted, setIsMuted] = React.useState(false);
  const [volume, setVolume] = React.useState(0.7); // Default 70% volume

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
    bringToFront,
  } = useDraggableWindow({
    width: 640,
    height: 530,
    initialScale: 1.0,
    minScale: 0.5,
    maxScale: 2.0,
    autoCenter: false,
    defaultPosition: {
      x: typeof window !== "undefined" ? window.innerWidth - 660 : 0,
      y: typeof window !== "undefined" ? window.innerHeight - 550 : 0,
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

  // Update volume on all gain nodes
  const updateVolume = useCallback(
    (newVolume: number) => {
      globalAudioContexts.forEach((gainNode) => {
        const targetValue = isMuted ? 0 : newVolume;
        gainNode.gain.value = targetValue;
      });
    },
    [isMuted],
  );

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      globalAudioContexts.forEach((gainNode) => {
        gainNode.gain.value = newMuted ? 0 : volume;
      });
      return newMuted;
    });
  }, [volume]);

  // Handle volume change
  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      updateVolume(newVolume);
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    },
    [updateVolume, isMuted],
  );

  // Cleanup function to stop all audio and clear emulator
  const cleanupEmulator = useCallback(() => {
    // Close ALL AudioContexts from the global registry
    globalAudioContexts.forEach((_gainNode, ctx) => {
      try {
        if (ctx.state !== "closed") {
          ctx.close();
        }
        globalAudioContexts.delete(ctx);
      } catch {
        // Ignore errors
      }
    });

    if (emulatorContainerRef.current) {
      // Stop all audio elements
      const audioElements =
        emulatorContainerRef.current.querySelectorAll("audio");
      audioElements.forEach((audio) => {
        audio.pause();
        audio.src = "";
        audio.load();
      });

      // Clear the container completely
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

      // Initialize JSSpeccy with 48K mode and auto-load the game
      // The global AudioContext patch will automatically track any contexts it creates
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

  // Handle focus tracking for keyboard controls
  useEffect(() => {
    if (!isVisible) return;

    const handleContentClick = () => {
      // When user clicks in the emulator, bring window to front and set game focus
      bringToFront();
      setGameFocus(true);
    };

    const handleDocumentClick = (e: MouseEvent) => {
      // When user clicks outside the window, clear game focus
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        setGameFocus(false);
      }
    };

    // Listen for clicks on the emulator container
    const container = emulatorContainerRef.current;
    if (container) {
      container.addEventListener("mousedown", handleContentClick);
    }

    // Listen for clicks anywhere on the document
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      if (container) {
        container.removeEventListener("mousedown", handleContentClick);
      }
      document.removeEventListener("mousedown", handleDocumentClick);
      setGameFocus(false);
    };
  }, [isVisible, setGameFocus, windowRef, bringToFront]);

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
        <StyledHeaderControls>
          <StyledVolumeControl
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <StyledMuteButton
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeOffIcon style={{ fontSize: "20px" }} />
              ) : (
                <VolumeUpIcon style={{ fontSize: "20px" }} />
              )}
            </StyledMuteButton>
            <StyledVolumeSlider
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
          </StyledVolumeControl>
          <StyledResetButton
            onClick={resetWindow}
            title="Reset position and size"
          >
            <RestartAltIcon style={{ fontSize: "16px" }} />
          </StyledResetButton>
          <StyledResetButton
            onClick={closeWindow}
            style={{ marginLeft: "8px" }}
            title="Close window"
          >
            <CloseIcon style={{ fontSize: "16px" }} />
          </StyledResetButton>
        </StyledHeaderControls>
      </StyledHeader>
      <StyledContent onMouseDown={bringToFront} onTouchStart={bringToFront}>
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
