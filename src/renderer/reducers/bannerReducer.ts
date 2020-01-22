import { setWith, TypedReducer } from "redoodle";
import { BannerInternalActions } from "../actions/bannerActions";
import { BannerState } from "../states/bannerState";

export const bannerReducer = TypedReducer.builder<BannerState>()
  .withHandler(BannerInternalActions.set.TYPE, (state, value) => {
    return setWith(state, { value });
  })
  .build();
