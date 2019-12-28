import { TypedAction } from "redoodle";

export namespace FloatingMenuActions {
  export const show = TypedAction.defineWithoutPayload("floating-menu::show")();
  export const hide = TypedAction.defineWithoutPayload("floating-menu::hide")();
  export const setQuery = TypedAction.define("floating-menu::set-query")<string>();
}
