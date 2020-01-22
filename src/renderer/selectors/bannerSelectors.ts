import { RootState } from "../states/rootState";

export const selectBannerValue = (state: RootState) => state.banner.value;
export const selectBannerHasValue = (state: RootState) => state.banner.value != null;
