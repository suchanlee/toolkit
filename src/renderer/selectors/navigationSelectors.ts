import { RootState } from "../states/rootState";

export const selectNavigation = (state: RootState) => state.navigation;
export const selectNavigationActive = (state: RootState) => state.navigation.active;
