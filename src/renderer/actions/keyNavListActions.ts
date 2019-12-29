import { TypedAction } from "redoodle";
import { KeyNavListLocation } from "../types/types";

export namespace KeyNavListActions {
  export const reset = TypedAction.defineWithoutPayload("key-nav-list::reset")();
  export const setCurrent = TypedAction.define("key-nav-list::set-current")<KeyNavListLocation>();
  export const moveUp = TypedAction.defineWithoutPayload("key-nav-list::move-up")();
  export const moveDown = TypedAction.defineWithoutPayload("key-nav-list::move-down")();
}
