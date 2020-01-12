import { createInitialNotesState, NotesState } from "../views/notes/redux/notesState";
import { createInitialReadingsState, ReadingsState } from "../views/readings/redux/readingsState";
import { createInitialTodosState, TodosState } from "../views/todos/redux/todosState";
import {
  createInitiailFloatingMenuState as createInitialFloatingMenuState,
  FloatingMenuState
} from "./floatingMenuState";
import { createInitialKeyNavListState, KeyNavListState } from "./keyNavListState";
import { createInitialNavigationState, NavigationState } from "./navigationState";

export interface RootState {
  navigation: NavigationState;
  floatingMenu: FloatingMenuState;
  todos: TodosState;
  readings: ReadingsState;
  notes: NotesState;
  keyNavList: KeyNavListState;
}

export function createInitialRootState(): RootState {
  return {
    navigation: createInitialNavigationState(),
    floatingMenu: createInitialFloatingMenuState(),
    todos: createInitialTodosState(),
    readings: createInitialReadingsState(),
    notes: createInitialNotesState(),
    keyNavList: createInitialKeyNavListState()
  };
}
