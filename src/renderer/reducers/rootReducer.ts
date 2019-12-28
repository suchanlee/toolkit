import { combineReducers } from "redoodle";
import { RootState } from "../states/rootState";
import { persistedReducer } from "./persistedReducer";
import { todoReducer } from "./todoReducer";
import { floatingMenuReducer } from "./floatingMenuReducer";

export const rootReducer = combineReducers<RootState>({
  persisted: persistedReducer,
  floatingMenu: floatingMenuReducer,
  todo: todoReducer
});
