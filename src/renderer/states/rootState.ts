import { createInitiailFloatingMenuState, FloatingMenuState } from "./floatingMenuState";
import { createInitialKeyNavListState, KeyNavListState } from "./keyNavListState";
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
  keyNavList: KeyNavListState;
}

export function createInitialRootState(): RootState {
  return {
    navigation: createInitialNavigationState(),
    persisted: createInitialPersistedState(),
    floatingMenu: createInitiailFloatingMenuState(),
    todo: undefined,
    reading: createInitialReadingState(),
    keyNavList: createInitialKeyNavListState()
  };
}
