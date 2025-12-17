export interface MiniPlayerProps {
  isVisible?: boolean;
  onToggleVisibility?: () => void;
}

export interface MiniPlayerPosition {
  x: number;
  y: number;
}

export interface MiniPlayerDragState {
  isDragging: boolean;
  dragStart: MiniPlayerPosition;
  elementStart: MiniPlayerPosition;
}
