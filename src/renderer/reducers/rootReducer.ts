import { combineReducers } from "redoodle";
import { Reducer } from "redux";
import { View } from "../types/viewTypes";
import { bannerReducer } from "./bannerReducer";
import { floatingMenuReducer } from "./floatingMenuReducer";
import { keyNavListReducer } from "./keyNavListReducer";
import { navigationReducer } from "./navigationReducer";

export function createRootReducer(views: readonly View<any, any>[]) {
  const reducersByKey: Record<string, Reducer> = {
    floatingMenu: floatingMenuReducer,
    navigation: navigationReducer,
    keyNavList: keyNavListReducer,
    banner: bannerReducer
  };

  for (const view of views) {
    if (view.redux != null) {
      reducersByKey[view.redux.stateKey] = view.redux.reducer;
    }
  }

  return combineReducers<any>(reducersByKey);
}
