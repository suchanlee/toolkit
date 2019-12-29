import { RootState } from "../states/rootState";

export const selectNavigation = (state: RootState) => state.navigation;
export const selectNavigationActiveView = (state: RootState) => state.navigation.activeView;
