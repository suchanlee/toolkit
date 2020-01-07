import { TypedAction } from "redoodle";
import { KeyNavListLocation } from "../types/types";

export namespace KeyNavListActions {
  export const init = TypedAction.define("key-nav-list::init")<IdPayload>();
  export const remove = TypedAction.define("key-nav-list::remove")<IdPayload>();
  export const set = TypedAction.define("key-nav-list::set")<
    IdPayload & {
      location: KeyNavListLocation;
    }
  >();
  export const moveUp = TypedAction.define("key-nav-list::move-up")<IdPayload>();
  export const moveDown = TypedAction.define("key-nav-list::move-down")<IdPayload>();

  export interface IdPayload {
    id: string;
  }
}
