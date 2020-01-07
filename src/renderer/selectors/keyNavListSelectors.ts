import { RootState } from "../states/rootState";

export const selectKeyNavList = (state: RootState) => state.keyNavList;
export const selectKeyNavListLocations = (state: RootState) => state.keyNavList.locationsById;
