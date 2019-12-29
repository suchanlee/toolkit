import { Views } from "../views/view";

export interface NavigationState {
  activeView: string;
}

export function createInitialNavigationState(): NavigationState {
  return {
    activeView: Views[0].name
  };
}
