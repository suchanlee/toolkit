import { RootState } from "../states/rootState";

export const selectKeyNavList = (state: RootState) => state.keyNavList;
export const selectKeyNavListCurrent = (state: RootState) => state.keyNavList.current;
