import { View } from "../types/viewTypes";
import { WithNotesState } from "../views/notes/redux/notesState";
import { WithReadingsState } from "../views/readings/redux/readingsState";
import { WithTodosState } from "../views/todos/redux/todosState";
import { BannerState, createInitialBannerState } from "./bannerState";
import {
  createInitiailFloatingMenuState as createInitialFloatingMenuState,
  FloatingMenuState
} from "./floatingMenuState";
import { createInitialKeyNavListState, KeyNavListState } from "./keyNavListState";
import { createInitialNavigationState, NavigationState } from "./navigationState";

export type RootState = {
  navigation: NavigationState;
  floatingMenu: FloatingMenuState;
  keyNavList: KeyNavListState;
  banner: BannerState;
} & WithNotesState &
  WithReadingsState &
  WithTodosState;

export function createInitialRootState(views: readonly View<any, any>[]): RootState {
  const rootState: Record<string, any> = {
    navigation: createInitialNavigationState(),
    floatingMenu: createInitialFloatingMenuState(),
    keyNavList: createInitialKeyNavListState(),
    banner: createInitialBannerState()
  };

  for (const view of views) {
    if (view.redux != null) {
      rootState[view.redux.stateKey] = view.redux.initialState;
    }
  }

  return rootState as RootState;
}
