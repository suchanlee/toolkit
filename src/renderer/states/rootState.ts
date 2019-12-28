import { createInitiailFloatingMenuState, FloatingMenuState } from "./floatingMenuState";
import { createInitialNavigationState, NavigationState } from "./navigationState";
import { createInitialPersistedState, PersistedState } from "./persistedState";
import { TodoState } from "./todoState";

export interface RootState {
  navigation: NavigationState;
  persisted: PersistedState;
  floatingMenu: FloatingMenuState;
  todo: TodoState | undefined;
}

export function createInitialRootState(): RootState {
  return {
    navigation: createInitialNavigationState(),
    persisted: createInitialPersistedState(),
    floatingMenu: createInitiailFloatingMenuState(),
    todo: undefined
  };
}
