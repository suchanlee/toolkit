import { createInitialNotesState, NotesState } from "../views/notes/redux/notesState";
import { createInitialReadingsState, ReadingsState } from "../views/readings/redux/readingsState";
import { createInitialTodosState, TodosState } from "../views/todos/redux/todosState";
import {
  createInitiailFloatingMenuState as createInitialFloatingMenuState,
  FloatingMenuState
} from "./floatingMenuState";
import { createInitialKeyNavListState, KeyNavListState } from "./keyNavListState";
import { createInitialNavigationState, NavigationState } from "./navigationState";
import { createInitialPersistedState, PersistedState } from "./persistedState";

export interface RootState {
  navigation: NavigationState;
  persisted: PersistedState;
  floatingMenu: FloatingMenuState;
  todos: TodosState;
  readings: ReadingsState;
  notes: NotesState;
  keyNavList: KeyNavListState;
}

export function createInitialRootState(): RootState {
  return {
    navigation: createInitialNavigationState(),
    persisted: createInitialPersistedState(),
    floatingMenu: createInitialFloatingMenuState(),
    todos: createInitialTodosState(),
    readings: createInitialReadingsState(),
    notes: createInitialNotesState(),
    keyNavList: createInitialKeyNavListState()
  };
}
