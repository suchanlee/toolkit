import { createInitiailFloatingMenuState, FloatingMenuState } from "./floatingMenuState";
import { createInitialNavigationState, NavigationState } from "./navigationState";
import { createInitialPersistedState, PersistedState } from "./persistedState";
import { createInitialReadingState, ReadingState } from "./readingState";
import { TodoState } from "./todoState";

export interface RootState {
  navigation: NavigationState;
  persisted: PersistedState;
  floatingMenu: FloatingMenuState;
  todo: TodoState | undefined;
  reading: ReadingState;
}

export function createInitialRootState(): RootState {
  return {
    navigation: createInitialNavigationState(),
    persisted: createInitialPersistedState(),
    floatingMenu: createInitiailFloatingMenuState(),
    todo: undefined,
    reading: createInitialReadingState()
  };
}
