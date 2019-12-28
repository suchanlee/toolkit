import { TypedAction } from "redoodle";
import { PersistedState } from "../states/persistedState";

export namespace PersistedActions {
  export const loadPersistedData = TypedAction.defineWithoutPayload(
    "persistence::load-persisted-data"
  )();
}

export namespace InternalPersistedActions {
  export const setPersistedState = TypedAction.define("internal-persistence::set-persisted-state")<
    PersistedState
  >();
}
