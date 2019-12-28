export interface FloatingMenuState {
  isShown: boolean;
  query: string;
}

export function createInitiailFloatingMenuState(): FloatingMenuState {
  return {
    isShown: false,
    query: ""
  };
}
