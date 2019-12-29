import { TypedAction } from "redoodle";

export namespace KeyNavListActions {
  export const reset = TypedAction.defineWithoutPayload("key-nav-list::reset")();
  export const moveUp = TypedAction.defineWithoutPayload("key-nav-list::move-up")();
  export const moveDown = TypedAction.defineWithoutPayload("key-nav-list::move-down")();
}
