import { createInitiailFloatingMenuState, FloatingMenuState } from "./floatingMenuState";
import { createInitialPersistedState, PersistedState } from "./persistedState";
import { TodoState } from "./todoState";

export interface RootState {
  persisted: PersistedState;
  floatingMenu: FloatingMenuState;
  todo: TodoState | undefined;
}

export function createInitialRootState(): RootState {
  return {
    persisted: createInitialPersistedState(),
    floatingMenu: createInitiailFloatingMenuState(),
    todo: undefined
  };
}
