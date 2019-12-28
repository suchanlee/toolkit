import { Nav } from "../types/types";

export interface NavigationState {
  active: Nav;
}

export function createInitialNavigationState(): NavigationState {
  return {
    active: Nav.TODOS
  };
}
