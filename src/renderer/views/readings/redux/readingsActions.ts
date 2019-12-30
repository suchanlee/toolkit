import { TypedAction } from "redoodle";
import { Reading, ReadingStatusFilter } from "../readingsTypes";

export namespace ReadingActions {
  export const setInputValue = TypedAction.define("reading::set-input-value")<string>();
  export const setFilter = TypedAction.define("reading::set-filter")<ReadingStatusFilter>();
  export const setActive = TypedAction.define("reading::set-active")<Reading | undefined>();
}
