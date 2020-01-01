import { combineReducers } from "redoodle";
import { RootState } from "../states/rootState";
import { notesReducer } from "../views/notes/redux/notesReducer";
import { readingsReducer } from "../views/readings/redux/readingsReducer";
import { todoReducer } from "../views/todos/redux/todoReducer";
import { floatingMenuReducer } from "./floatingMenuReducer";
import { keyNavListReducer } from "./keyNavListReducer";
import { navigationReducer } from "./navigationReducer";
import { persistedReducer } from "./persistedReducer";

export const rootReducer = combineReducers<RootState>({
  persisted: persistedReducer,
  floatingMenu: floatingMenuReducer,
  todos: todoReducer,
  navigation: navigationReducer,
  readings: readingsReducer,
  notes: notesReducer,
  keyNavList: keyNavListReducer
});
