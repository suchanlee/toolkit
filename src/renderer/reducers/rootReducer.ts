import { combineReducers } from "redoodle";
import { RootState } from "../states/rootState";
import { floatingMenuReducer } from "./floatingMenuReducer";
import { keyNavListReducer } from "./keyNavListReducer";
import { navigationReducer } from "./navigationReducer";
import { persistedReducer } from "./persistedReducer";
import { readingReducer } from "./readingReducer";
import { todoReducer } from "./todoReducer";

export const rootReducer = combineReducers<RootState>({
  persisted: persistedReducer,
  floatingMenu: floatingMenuReducer,
  todo: todoReducer,
  navigation: navigationReducer,
  reading: readingReducer,
  keyNavList: keyNavListReducer
});
