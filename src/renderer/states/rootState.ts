import { TodoState } from "./todoState";
import { PersistedState, createInitialPersistedState } from "./persistedState";
import { FloatingMenuState, createInitiailFloatingMenuState } from "./floatingMenuState";

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
