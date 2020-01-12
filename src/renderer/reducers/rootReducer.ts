import { combineReducers } from "redoodle";
import { RootState } from "../states/rootState";
import { notesReducer } from "../views/notes/redux/notesReducer";
import { readingsReducer } from "../views/readings/redux/readingsReducer";
import { todosReducer } from "../views/todos/redux/todosReducer";
import { floatingMenuReducer } from "./floatingMenuReducer";
import { keyNavListReducer } from "./keyNavListReducer";
import { navigationReducer } from "./navigationReducer";

export const rootReducer = combineReducers<RootState>({
  floatingMenu: floatingMenuReducer,
  todos: todosReducer,
  navigation: navigationReducer,
  readings: readingsReducer,
  notes: notesReducer,
  keyNavList: keyNavListReducer
});
