import { TypedAction } from "redoodle";

export namespace BannerActions {
  export const set = TypedAction.define("banner::set")<string | undefined>();
}

export namespace BannerInternalActions {
  export const set = TypedAction.define("banner-internal::set")<string | undefined>();
}
