import { RootState } from "../states/rootState";

export const selectFloatingMenu = (state: RootState) => state.floatingMenu;
export const selectFloatingMenuIsShown = (state: RootState) => state.floatingMenu.isShown;
export const selectFloatingMenuQuery = (state: RootState) => state.floatingMenu.query;
